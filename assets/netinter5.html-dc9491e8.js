import{_ as p,r as o,o as e,c,b as s,d as n,e as t,a as u}from"./app-8e5157a8.js";const l={},k={id:"在-winform-中完整支持在多级目录中保存的-asp-net",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#在-winform-中完整支持在多级目录中保存的-asp-net","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/flier/archive/2004/07/08/22401.html",target:"_blank",rel:"noopener noreferrer"},d=s("blockquote",null,[s("p",null,[n("Posted on 2004-07-08 12:01 Flier Lu 阅读(1085) 评论(0)"),s("br"),n(" http://www.blogcn.com/user8/flier_lu/index.html?id=2573246&run=.0A2F3E7")])],-1),h={href:"https://www.cnblogs.com/flier/archive/2004/07/08/22269.html",target:"_blank",rel:"noopener noreferrer"},y={href:"http://www.asp.net/Projects/Cassini/Download/Default.aspx?tabindex=0&tabid=1",target:"_blank",rel:"noopener noreferrer"},m=u(`<p>首先来看看 Cassini 的程序结构。</p><p>与我前文例子中采用的结构类似，Cassini 包括界面(CassiniForm)、服务器(Server)、宿主(Host)和请求处理器(Request)等几个主要部分，并通过 Connection 等几个工具类，完成 Web 请求的解析与应答功能。</p><p>总体工作流程图如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>以下内容为程序代码:

    +-------+ [1] +-------------+ [2] +--------+
    | Admin |----&gt;| CassiniForm |----&gt;| Server |
    +-------+     +-------------+     +--------+
                                          | [3]
                                          V
                       +--------+ [4] +------+
                       | Client |----&gt;| Host |
                       +--------+     +------+
                           ^              | [5]
                           |              V
                           |        +------------+ [6] +---------+
                        [7]|        | Connection |----&gt;| Request |--+
                           |        +------------+     +---------+  | [7]
                           +----------------------------------------+
</code></pre></div><p>[1] Cassini 的管理者(Admin)首先通过 CassiniForm 的界面，设定 Web 服务器端口、页面物理目录和虚拟目录等配置信息； [2] 然后以配置信息构造 Server 对象，并调用 Server.Start 方法启动 Web 服务器；</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CassiniForm</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            _server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Cassini<span class="token punctuation">.</span>Server</span><span class="token punctuation">(</span>portNumber<span class="token punctuation">,</span> _virtRoot<span class="token punctuation">,</span> _appPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            _server<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">{</span>
            <span class="token comment">// 显示错误信息</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>[3] Server 对象在建立时，将获取或自动初始化 ASP.NET 的注册表配置。这个工作是通过 Server.GetInstallPathAndConfigureAspNetIfNeeded 方法完成的。工作原理是通过 HttpRuntime 所在 Assembly (System.Web.dll) 的版本获得合适的 ASP.NET 版本；然后从注册表中查询 HKEY_LOCAL_MACHINESOFTWAREMicrosoftASP.NET 下是否有正确的 ASP.NET 的安装路径；如果有则返回之；否则会根据 System.Web.dll 的版本，以及 HKEY_LOCAL_MACHINESOFTWAREMicrosoft.NETFramework 下 .NET Framework 按照目录等信息，动态构造一个合适的 ASP.NET 注册表配置。进行这个工作的原因是 ASP.NET 可以在按照 .NET Framework 后，使用 aspnet_regiis.exe 手工注销掉，而运行支持 ASP.NET 的 Web 服务器，又必须有合适的设置。</p><p>在完成配置和 ASP.NET 安装路径后，Server 将建立并配置 Host 对象作为 ASP.NET 的宿主。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Server</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MarshalByRefObject</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CreateHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        _host <span class="token operator">=</span> <span class="token punctuation">(</span>Host<span class="token punctuation">)</span>ApplicationHost<span class="token punctuation">.</span><span class="token function">CreateApplicationHost</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">Host</span><span class="token punctuation">)</span><span class="token punctuation">,</span> _virtualPath<span class="token punctuation">,</span> _physicalPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        _host<span class="token punctuation">.</span><span class="token function">Configure</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> _port<span class="token punctuation">,</span> _virtualPath<span class="token punctuation">,</span> _physicalPath<span class="token punctuation">,</span> _installPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_host <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            _host<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>[4] Host 类作为 ASP.NET 的宿主类，主要完成三部分工作：配置 ASP.NET 的运行时环境、响应客户端(Client)发起的 Web 页面请求、以及判断客户端请求的有效性。</p><p>配置 ASP.NET 的运行时环境主要工作是，为 ASP.NET 的执行和后面请求有效性的判断获取足够的配置信息。例如 Server 能够提供的 Web 服务端口、页面虚拟路径、页面物理路径以及 ASP.NET 程序安装路径等等，以及 Host 根据这些信息计算出的 ASP.NET 客户端脚本的虚拟和物理路径等等。此外还会接管线程所在 AppDomain 的卸载事件 AppDomain.DomainUnload，在 Web 服务器停止的时候自动终止 Web 服务。</p><p>响应客户端(Client)发起的 Web 页面请求功能，是通过建立 Socket 监听 Server 对象指定的 Web 服务 TCP 端口来完成的。Host.Start 方法建立 Socket，并通过线程池异步调用 Host.OnStart 方法在后台监听请求；Host.OnStart 方法则在 接收到 Web 请求后，通过线程池异步调用 Host.OnSocketAccept 方法完成请求的响应工作；Host.OnSocketAccept 则负责在处理 Web 请求的时候，建立 Connection 对象，并进一步调用 Connection.ProcessOneRequest 方法处理 Web 请求。虽然 Host 没有使用复杂的请求分配算法，但因为线程池的灵活使用，使得其性能完全不受处理瓶颈的限制，也是线程池使用的良好范例。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">Host</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MarshalByRefObject</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_started<span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvalidOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 建立 Socket 监听 Web 服务端口</span>
        _socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        _socket<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> _port<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _socket<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>SocketOptionName<span class="token punctuation">.</span>MaxConnections<span class="token punctuation">)</span><span class="token punctuation">;</span>

        _started <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        ThreadPool<span class="token punctuation">.</span><span class="token function">QueueUserWorkItem</span><span class="token punctuation">(</span>_onStart<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过线程池异步调用</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStart</span><span class="token punctuation">(</span><span class="token class-name">Object</span> unused<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>_started<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token class-name">Socket</span> socket <span class="token operator">=</span> _socket<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 响应客户端请求</span>
                ThreadPool<span class="token punctuation">.</span><span class="token function">QueueUserWorkItem</span><span class="token punctuation">(</span>_onSocketAccept<span class="token punctuation">,</span> socket<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过线程池异步调用</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">{</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        _stopped <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnSocketAccept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> acceptedSocket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Connection</span> conn <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Connection</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span>acceptedSocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
        conn<span class="token punctuation">.</span><span class="token function">ProcessOneRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 处理客户端请求</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，判断客户端请求的有效性的功能，是通过三个重载的 Host.IsVirtualPathInApp 方法，提供给 Connection 在具体处理客户端请求时调用，来判断请求的有效性，下面讨论 Connection 时再详细解释。</p><p>[5] Host 在建立 Connection 对象并调用其 ProcessOneRequest 方法处理用户请求时，Connection 对象会首先等待客户端请求数据(WaitForRequestBytes)，然后创建 Request 对象，并调用 Request.Process 方法处理请求。而其自身，则通过一堆 WaitXXX 函数，为 Request 类提供支持。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">Connection</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessOneRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// wait for at least some input</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">WaitForRequestBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 等待客户端请求数据</span>
      <span class="token function">WriteErrorAndClose</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 发送 HTTP 400 错误给客户端</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Request</span><span class="token punctuation">(</span>_host<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    request<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">WaitForRequestBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> availBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_socket<span class="token punctuation">.</span>Available <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// poll until there is data</span>
        _socket<span class="token punctuation">.</span><span class="token function">Poll</span><span class="token punctuation">(</span><span class="token number">100000</span> <span class="token comment">/* 100ms */</span><span class="token punctuation">,</span> SelectMode<span class="token punctuation">.</span>SelectRead<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待客户端数据 100ms 时间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_socket<span class="token punctuation">.</span>Available <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> _socket<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
          _socket<span class="token punctuation">.</span><span class="token function">Poll</span><span class="token punctuation">(</span><span class="token number">10000000</span> <span class="token comment">/* 10sec */</span><span class="token punctuation">,</span> SelectMode<span class="token punctuation">.</span>SelectRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      availBytes <span class="token operator">=</span> _socket<span class="token punctuation">.</span>Available<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> availBytes<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>[6] Request 在接收到 Connection 的请求后，将从客户端读取请求内容，并按照 HTTP 协议进行分析。因为本文不是做 HTTP 协议的分析工作，所以这部分代码就不详细讨论了。</p><p>在 Request.ParseRequestLine 函数分析 HTTP 请求获得请求页面路径后，会调用前面提到过的 Host.IsVirtualPathInApp 函数判断此路径是否在 Web 服务器提供的虚拟路径下级，并且返回此虚拟路径是否指向 ASP.NET 的客户端脚本。如果 Web 请求的虚拟路径以 &quot;/&quot; 结尾，则调用 Request.ProcessDirectoryListingRequest 方法返回列目录的响应；否则调用 HttpRuntime.ProcessRequest 方法完成实际的 ASP.NET 请求处理工作。</p><p>HttpRuntime 通过 Request 的基类 HttpWorkerRequest 提供的统一接口，采用 IoC 的策略获取最终页面的所在。与我前面文章中使用的 SimpleWorkerRequest 实现最大不同在于 Request.MapPath 完成了一个较为完整的虚拟目录到物理目录映射机制。</p><p>SimpleWorkerRequest.MapPath 实现相对简陋：</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> SimpleWorkerRequest<span class="token punctuation">.</span><span class="token function">MapPath</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_hasRuntimeInfo<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name"><span class="token keyword">string</span></span> physPath <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token class-name"><span class="token keyword">string</span></span> appPhysPath <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_appPhysPath<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_appPhysPath<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 去掉末尾斜杠</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    physPath <span class="token operator">=</span> appPhysPath<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_appVirtPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    physPath <span class="token operator">=</span> appPhysPath <span class="token operator">+</span> path<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_appVirtPath<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;\\\\&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  InternalSecurityPermissions<span class="token punctuation">.</span><span class="token function">PathDiscovery</span><span class="token punctuation">(</span>physPath<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Demand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> physPath<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Request.MapPath 的实现则相对要完善许多，考虑了很多 SimpleWorkerRequest 无法处理的情况，使得 Request 的适应性更强。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">String</span> Request<span class="token punctuation">.</span><span class="token function">MapPath</span><span class="token punctuation">(</span><span class="token class-name">String</span> path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> mappedPath <span class="token operator">=</span> String<span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> path<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// asking for the site root</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_host<span class="token punctuation">.</span>VirtualPath <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// app at the site root</span>
      mappedPath <span class="token operator">=</span> _host<span class="token punctuation">.</span>PhysicalPath<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// unknown site root - don&#39;t point to app root to avoid double config inclusion</span>
      mappedPath <span class="token operator">=</span> Environment<span class="token punctuation">.</span>SystemDirectory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>_host<span class="token punctuation">.</span><span class="token function">IsVirtualPathAppPath</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// application path</span>
    mappedPath <span class="token operator">=</span> _host<span class="token punctuation">.</span>PhysicalPath<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>_host<span class="token punctuation">.</span><span class="token function">IsVirtualPathInApp</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// inside app but not the app path itself</span>
    mappedPath <span class="token operator">=</span> _host<span class="token punctuation">.</span>PhysicalPath <span class="token operator">+</span> path<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>_host<span class="token punctuation">.</span>NormalizedVirtualPath<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// outside of app -- make relative to app path</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      mappedPath <span class="token operator">=</span> _host<span class="token punctuation">.</span>PhysicalPath <span class="token operator">+</span> path<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
      mappedPath <span class="token operator">=</span> _host<span class="token punctuation">.</span>PhysicalPath <span class="token operator">+</span> path<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  mappedPath <span class="token operator">=</span> mappedPath<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span> &#39;\\&#39;<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>mappedPath<span class="token punctuation">.</span><span class="token function">EndsWith</span><span class="token punctuation">(</span><span class="token string">&quot;\\&quot;) &amp;&amp; !mappedPath.EndsWith(&quot;</span><span class="token punctuation">:</span>\\&quot;<span class="token punctuation">)</span><span class="token punctuation">)</span>
    mappedPath <span class="token operator">=</span> mappedPath<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> mappedPath<span class="token punctuation">.</span>Length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> mappedPath<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>关于 Cassini 的进一步讨论，可以参考 www.asp.net 上的讨论专版。</p><p>[7] 在 HttRuntime 完成具体的 ASP.NET 页面处理工作后，会通过 Request.SendResponseFromXXX 系列函数，将页面结果返回给客户端。</p><p>虽然 SimpleWorkerRequest.MapPath 方法实现简单，但理论上完全可以处理多级目录的情况。之所以在使用 SimpleWorkerRequest 时，无法处理嵌套目录，是因为 SimpleWorkerRequest 在构造函数中错误地分解了请求的页面所在虚拟目录等信息。</p><p>SimpleWorkerRequest 的两个构造函数，在将请求页面虚拟路径（如&quot;/help/about.aspx&quot;）保存后，都调用了 ExtractPagePathInfo 方法对页面路径做进一步的分解工作。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> SimpleWorkerRequest<span class="token punctuation">.</span><span class="token function">ExtractPagePathInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name"><span class="token keyword">int</span></span> idx <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_page<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_pathInfo <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_page<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_page <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_page<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> idx<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>this._pathInfo 是为实现 HttpWorkerRequest.GetPathInfo 提供的存储字段。而 GetPathInfo 将返回 URL 中在页面后的路径信息，例如对 &quot;path/virdir/page.html/tail&quot; 将返回 &quot;/tail&quot;。早期的许多 HTTP 客户端程序，如 Delphi 中 WebAction 的分发，都利用了这个路径信息的特性，在 Web 页面或 ISAPI 一级之后，再次进行请求分发。但因为 SimpleWorkerRequest 实现上或者设计上的限制，导致在处理 PathInfo 时会将 &quot;/help/about.aspx&quot; 类似的多级 url 错误切断。最终返回给 HttpRuntime 的 this._path 将变成空字符串，而 this._pathInfo 被设置为 &quot;/help/about.aspx&quot;，而单级路径如 &quot;about.aspx&quot; 不受影响。</p><p>知道了这个原理后，就可以对 SimpleWorkerRequest 稍作修改，重载受到 ExtractPagePathInfo 影响的几个方法，即可完成对多级目录结构下页面的支持。如果需要进一步的映射支持，如同时支持多个虚拟子目录，可以参照 Cassini 的 Request 实现 MapPath 等方法。</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Request</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">SimpleWorkerRequest</span></span>
<span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _appPhysPath<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _appVirtPath<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _page<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _pathInfo<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">Request</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">,</span> <span class="token class-name">TextWriter</span> output<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> output<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_appPhysPath <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appPath&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_appVirtPath <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetDomain</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span><span class="token string">&quot;.hostingVirtualPath&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>_page <span class="token operator">=</span> page<span class="token punctuation">;</span>

    <span class="token comment">// TODO: 从 page 中进一步解析 Path Info</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetPathInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_pathInfo <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pathInfo<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetPathInternal</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> includePathInfo<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> path <span class="token operator">=</span> <span class="token punctuation">(</span>_appVirtPath<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">?</span> _page <span class="token punctuation">:</span> _appVirtPath <span class="token operator">+</span> _page<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>includePathInfo <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>_pathInfo <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> path <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pathInfo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> path<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetUriPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">GetPathInternal</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetFilePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">GetPathInternal</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRawUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> query <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetQueryString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>query <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>query<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">GetPathInternal</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;?&quot;</span> <span class="token operator">+</span> query<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">GetPathInternal</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetFilePathTranslated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">return</span> _appPhysPath <span class="token operator">+</span> _page<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;\\\\&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">MapPath</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> physPath <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> path<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      physPath <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_appPhysPath<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_appVirtPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      physPath <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_appPhysPath <span class="token operator">+</span> path<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_appVirtPath<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;\\\\&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> physPath<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,39);function w(P,f){const a=o("ExternalLinkIcon");return e(),c("div",null,[s("h1",k,[i,n(),s("a",r,[n("在 WinForm 中完整支持在多级目录中保存的 ASP.NET"),t(a)])]),d,s("p",null,[n("大概半年前曾写过一个在 WinForm 程序中嵌入 ASP.NET 的简单例子，"),s("a",h,[n("《在WinForm程序中嵌入ASP.NET》"),t(a)]),n('。因为是试验性质的工作，所以当时偷懒直接使用系统自带的 SimpleWorkerRequest 完成 ASP.NET 页面请求的处理工作。使用自带工具类在实现上虽然简单，但受到系统的诸多功能限制，如后面有朋友提到无法直接处理多级子目录的问题等等。（如虚拟目录为 "/" 时无法处理 "/help/about.aspx" 类型的页面请求）')]),s("p",null,[n("对于此类需求，一个最好的实现实例就是 www.asp.net 提供的 "),s("a",y,[n("Cassini"),t(a)]),n("。这个例子完整地演示了如何实现一个支持 ASP.NET 的简单 Web 服务器功能，并被 Borland 的 Delphi.NET 等许多开源项目，当作调试用 Web 服务器。虽然只有几十 K 的源代码，但麻雀虽小五脏俱全，还是非常值得一看的。但因为 Cassini 是为处理 Web 服务而设计，因此需要在了解其结构的基础上，做一些定制来满足我们的需求。")]),m])}const _=p(l,[["render",w],["__file","netinter5.html.vue"]]);export{_ as default};
