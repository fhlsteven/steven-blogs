import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},o=t(`<h1 id="在winform程序中嵌入asp-net" tabindex="-1"><a class="header-anchor" href="#在winform程序中嵌入asp-net" aria-hidden="true">#</a> 在WinForm程序中嵌入ASP.NET</h1><p>现在的流行趋势是桌面程序Web化，Web程序桌面化，呵呵。最终目标就是你中有我，我中有你。例如MSN Explorer就是一个很好的展示，让用户在使用的时候分不清什么时候是在本地什么时候是在网络。而这类程序往往需要有一个后台服务器如IIS的支持，这对大多数桌面应用来说too heavy了。本着简单就是美的设计思想，这里给出一个轻量级的解决方法，把ASP.NET嵌入到普通WinForm桌面程序中去。</p><p>因为安全以及其它一些方面的原因，在使用ASP.NET引擎之前，必须建立一个新的AppDomain。简单的方法是直接使用ApplicationHost.CreateApplicationHost函数为指定的虚拟目录和物理路径建立ASP.NET引擎宿主的实例，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// should create a subdirectory ./bin and copy the assembly to it</span>
<span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>name<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>AltDirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        name <span class="token operator">=</span> Path<span class="token punctuation">.</span>AltDirectorySeparatorChar <span class="token operator">+</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">WebHost</span> host <span class="token operator">=</span> <span class="token punctuation">(</span>WebHost<span class="token punctuation">)</span>ApplicationHost<span class="token punctuation">.</span><span class="token function">CreateApplicationHost</span><span class="token punctuation">(</span>
        <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    host<span class="token punctuation">.</span><span class="token function">setVirtualDirectory</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    host<span class="token punctuation">.</span><span class="token function">setBaseDirectory</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> host<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>但这样建立的程序有个BT的要求，他会在指定目录的bin子目录中去尝试载入宿主类型(WebHost)的assembly，也就是说你必须把程序在bin子目录下复制一份，非常不爽。解决方法是自己手工完成整个建立过程，如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> virtualDir<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> physicalDir<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>virtualDir<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>AltDirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    virtualDir <span class="token operator">=</span> Path<span class="token punctuation">.</span>AltDirectorySeparatorChar <span class="token operator">+</span> virtualDir<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>physicalDir<span class="token punctuation">.</span><span class="token function">EndsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>DirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    physicalDir <span class="token operator">+=</span> Path<span class="token punctuation">.</span>DirectorySeparatorChar<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token class-name">AppDomainSetup</span> setup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppDomainSetup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  setup<span class="token punctuation">.</span>ApplicationName <span class="token operator">=</span> <span class="token string">&quot;APP_&quot;</span> <span class="token operator">+</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  setup<span class="token punctuation">.</span>ConfigurationFile <span class="token operator">=</span> <span class="token string">&quot;web.config&quot;</span><span class="token punctuation">;</span>
  <span class="token class-name">AppDomain</span> domain <span class="token operator">=</span> AppDomain<span class="token punctuation">.</span><span class="token function">CreateDomain</span><span class="token punctuation">(</span><span class="token string">&quot;ASPHOST_&quot;</span> <span class="token operator">+</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> setup<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appDomain&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appPath&quot;</span><span class="token punctuation">,</span> physicalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appVPath&quot;</span><span class="token punctuation">,</span> virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.domainId&quot;</span><span class="token punctuation">,</span> domain<span class="token punctuation">.</span>FriendlyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.hostingVirtualPath&quot;</span><span class="token punctuation">,</span> virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.hostingInstallDir&quot;</span><span class="token punctuation">,</span> HttpRuntime<span class="token punctuation">.</span>AspInstallDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">WebHost</span> host <span class="token operator">=</span> <span class="token punctuation">(</span>WebHost<span class="token punctuation">)</span>domain<span class="token punctuation">.</span><span class="token function">CreateInstanceAndUnwrap</span><span class="token punctuation">(</span>
    <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Module<span class="token punctuation">.</span>Assembly<span class="token punctuation">.</span>FullName<span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  host<span class="token punctuation">.</span><span class="token function">setApplicationDomain</span><span class="token punctuation">(</span>domain<span class="token punctuation">)</span><span class="token punctuation">;</span>
  host<span class="token punctuation">.</span><span class="token function">setVirtualDirectory</span><span class="token punctuation">(</span>virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  host<span class="token punctuation">.</span><span class="token function">setBaseDirectory</span><span class="token punctuation">(</span>physicalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> host<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这儿的一堆domain.SetData是传递参数给ASP.NET引擎。然后在那个appdomain中建立新的宿主类型的实例。这样就避免多份代码的尴尬。而使用ASP.NET就比较简单了，在宿主类中使用HttpRuntime.ProcessRequest函数处理特定请求。简单一点的话，可以直接用SimpleWorkerRequest包装请求，生成页面到一个指定的TextWriter中，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoRequest</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">,</span> <span class="token class-name">TextWriter</span> writer<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  HttpRuntime<span class="token punctuation">.</span><span class="token function">ProcessRequest</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SimpleWorkerRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
<span class="token punctuation">{</span>      
  <span class="token function">DoRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">RequestPage</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">using</span><span class="token punctuation">(</span><span class="token class-name">StringWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>      
  <span class="token punctuation">{</span>
    <span class="token function">DoRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> writer<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">RequestPage</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个缺省的请求包装使用是简单，但对中文的兼容性不太好，过两天有空再自己写个强一点的吧，呵呵</p><p>最终类的使用就比较简单了，在WinForm程序中建立一个singleton模式的属性</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token keyword">private</span> <span class="token class-name">WebHost<span class="token punctuation">.</span>WebHost</span> _host <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name">WebHost<span class="token punctuation">.</span>WebHost</span> Host
<span class="token punctuation">{</span>
  <span class="token keyword">get</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>_host <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      _host <span class="token operator">=</span> WebHost<span class="token punctuation">.</span>WebHost<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> _host<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后请求指定的asp.net页面，如</p><p><code>HTML = Host.RequestPage(_page);</code></p><p>即可完成从动态的asp.net脚本到静态html的转换。嵌入WinForm程序中，还可以通过Host类型完成两者之间的双向通讯，实现互相控制。下次有空继续，呵呵</p><p>参考资料：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>1.Using the ASP.Net Runtime for extending desktop applications with dynamic HTML Scripts
  ::URL::http://www.west-wind.com/presentations/aspnetruntime/aspnetruntime.asp 

2.Executing ASMX files without a web server 
  ::URL::http://radio.weblogs.com/0105476/stories/2002/10/24/executingAsmxFilesWithoutAWebServer.html 

3.ASP. NET Client-side Hosting with Cassini
  ::URL::http://msdn.microsoft.com/msdnmag/issues/03/01/CuttingEdge/ 

4.Using ASP.NET Runtime in Desktop Applications 
  ::URL::http://www.codeguru.com/cs_internet/UsingAspRuntime.html 
</code></pre></div><hr><p>放下</p><p>flier_lu 发表于 &gt;2004-2-9 20:32:17← 保存该日志到本地</p><hr><hr><p>作者：Kriss</p><blockquote><p>大侠有空还是写个功能完善点的WEB宿主吧：）<br> cassini里的那个是针对http和socket的，我似乎用不到啊<br> 我是在一个类似于新闻系统里用到，准备根据ASPX文件产生HTML文件，所以只要用这个宿主把解析结果存起来就行了<br> 现在的问题还是子目录的问题<br> 实在不行就只好把文件移到根目录解析了：（<br><br><br> flier_lu 在 Kriss 的文章中回复道：<br> 呵呵，列入计划吧，技术上是问题不大的。不过最近手头工作比较忙，一堆技术预研工作和BLog的功课要做，只能说争取了 😛</p></blockquote><p>作者：Kriss</p><blockquote><p>但这样解决似乎仍有一个问题，Create(vPath,pPath) 创建的是一个Web应用程序宿主，肯定会在其目录寻找dll以及web.config等文件。如果我指定目录为 d:hooyeehelp，那help因为不是独立的web应用程序，应该会出错，说找不到dll和web.config<br><br> 我从asp.net网站下载过微软自己的那个WEB宿主的例子看过，它那里创建好宿主后，好像是可以访问直接子目录的文件的<br><br><br> flier_lu 在 Kriss 的文章中回复道：<br> 你是指 ASP.NET 上实现的 cassini 那个 ASP.NET 宿主 Web 服务器的例子吗？人家可以实现了一个完整的 SimpleWorkerRequest 的子类，而我例子中偷懒直接用SimpleWorkerRequest 完成，功能上当然会有很大差距，呵呵，差了近千行代码呢 😛</p></blockquote><p>作者：Kriss</p><blockquote><p>我使用了这个方法，利用WebHost从aspx产生静态html，但是有一个问题，如果我请求的文件不是默认路径，而是某个子目录下面的，会出现无法找到aspx文件的信息：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">WebHost</span> host <span class="token operator">=</span> WebHost<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;/hooyee&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;c:\\hooyee\\web&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> html<span class="token punctuation">;</span>
html <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token string">&quot;Default.aspx&quot;</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>这样是没有问题的<br><code>html = host.RequestPage(&quot;Help/Default.aspx&quot;;</code><br> 这样产生的HTML文本里是错误信息：404错误，无法找到指定资源<br> 我查了一些文章但还是找不到解决方法。特来请教<br><br> 另外，中文问题我也碰到了，如果从RequestPage中获取 Stream 的话，中文是乱码。但如果利用上面的方法，先返回到 string ,再把这个string保存到文件里，就没有问题了。有没有别的解决方案？<br><br><br> flier_lu 在 Kriss 的文章中回复道：<br> 这个404错误的原因是你指定虚拟路径的地方错误。host.RequestPage的参数应该只是页面的名字，如果需要打开子目录下页面，则应该在WebHost.Create下面指定，如将<br><br><code>WebHost host = WebHost.Create(&quot;/hooyee&quot;,&quot;c:\\hooyee\\web&quot;);</code><br><br> 改为<br><br><code>WebHost host = WebHost.Create(&quot;/hooyee&quot;,&quot;c:\\hooyee\\web\\Help&quot;);</code><br><br> 就可以打开 Help 子目录下的页面了<br><br> 至于那个中文问题，我现在也没有什么好的解决办法，希望等有空把ASP.NET的机制完整分析一遍后，能找到解决方法。😃</p></blockquote><p>作者：lionsky_net@hotmail.com</p><blockquote><p>哦，一时马虎，没有注意到，呵呵</p></blockquote><p>作者：lionskynet_@hotmail.com</p><blockquote><p>好文章，不过为什么我的SDK找不到WebHost？<br><br><br> flier_lu 在 lionskynet_@hotmail.com 的文章中回复道：<br> 这个WebHost是我自己写的一个简单的包装类啊，呵呵。主要是对host的建立和页面请求做了简单的封装。<br><br> 以下为引用：<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Hosting</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>Remoting</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Navigator<span class="token punctuation">.</span>WebHost</span>
<span class="token punctuation">{</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// Summary description for WebHost.</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebHost</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MarshalByRefObject</span></span>
<span class="token punctuation">{</span>    
  <span class="token preprocessor property">#<span class="token directive keyword">if</span> false</span>
    <span class="token comment">// should create a subdirectory ./bin and copy the assembly to it</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> 
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>name<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>AltDirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        name <span class="token operator">=</span> Path<span class="token punctuation">.</span>AltDirectorySeparatorChar <span class="token operator">+</span> name<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
 
      <span class="token class-name">WebHost</span> host <span class="token operator">=</span> <span class="token punctuation">(</span>WebHost<span class="token punctuation">)</span>ApplicationHost<span class="token punctuation">.</span><span class="token function">CreateApplicationHost</span><span class="token punctuation">(</span>
        <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">;</span>

      host<span class="token punctuation">.</span><span class="token function">setVirtualDirectory</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      host<span class="token punctuation">.</span><span class="token function">setBaseDirectory</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> host<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token preprocessor property">#<span class="token directive keyword">else</span></span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> virtualDir<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> physicalDir<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>virtualDir<span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>AltDirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        virtualDir <span class="token operator">=</span> Path<span class="token punctuation">.</span>AltDirectorySeparatorChar <span class="token operator">+</span> virtualDir<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>physicalDir<span class="token punctuation">.</span><span class="token function">EndsWith</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span>DirectorySeparatorChar<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        physicalDir <span class="token operator">+=</span> Path<span class="token punctuation">.</span>DirectorySeparatorChar<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token class-name">AppDomainSetup</span> setup <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppDomainSetup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      setup<span class="token punctuation">.</span>ApplicationName <span class="token operator">=</span> <span class="token string">&quot;APP_&quot;</span> <span class="token operator">+</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      setup<span class="token punctuation">.</span>ConfigurationFile <span class="token operator">=</span> <span class="token string">&quot;web.config&quot;</span><span class="token punctuation">;</span>

      <span class="token class-name">AppDomain</span> domain <span class="token operator">=</span> AppDomain<span class="token punctuation">.</span><span class="token function">CreateDomain</span><span class="token punctuation">(</span><span class="token string">&quot;ASPHOST_&quot;</span> <span class="token operator">+</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> setup<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appDomain&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">;</span>
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appPath&quot;</span><span class="token punctuation">,</span> physicalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.appVPath&quot;</span><span class="token punctuation">,</span> virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.domainId&quot;</span><span class="token punctuation">,</span> domain<span class="token punctuation">.</span>FriendlyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.hostingVirtualPath&quot;</span><span class="token punctuation">,</span> virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
      domain<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span><span class="token string">&quot;.hostingInstallDir&quot;</span><span class="token punctuation">,</span> HttpRuntime<span class="token punctuation">.</span>AspInstallDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">WebHost</span> host <span class="token operator">=</span> <span class="token punctuation">(</span>WebHost<span class="token punctuation">)</span>domain<span class="token punctuation">.</span><span class="token function">CreateInstanceAndUnwrap</span><span class="token punctuation">(</span>
        <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Module<span class="token punctuation">.</span>Assembly<span class="token punctuation">.</span>FullName<span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">WebHost</span><span class="token punctuation">)</span><span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>

      host<span class="token punctuation">.</span><span class="token function">setApplicationDomain</span><span class="token punctuation">(</span>domain<span class="token punctuation">)</span><span class="token punctuation">;</span>
      host<span class="token punctuation">.</span><span class="token function">setVirtualDirectory</span><span class="token punctuation">(</span>virtualDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
      host<span class="token punctuation">.</span><span class="token function">setBaseDirectory</span><span class="token punctuation">(</span>physicalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> host<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
  <span class="token preprocessor property">#<span class="token directive keyword">endif</span></span>

    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">Create</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> Environment<span class="token punctuation">.</span>CurrentDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name">WebHost</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">,</span> Environment<span class="token punctuation">.</span>CurrentDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token keyword">private</span> <span class="token class-name">AppDomain</span> _appDomain <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _virtualDir<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _baseDir<span class="token punctuation">;</span>

    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setApplicationDomain</span><span class="token punctuation">(</span><span class="token class-name">AppDomain</span> domain<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      _appDomain <span class="token operator">=</span> domain<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setVirtualDirectory</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dir<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      _virtualDir <span class="token operator">=</span> dir<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setBaseDirectory</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dir<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      _baseDir <span class="token operator">=</span> dir<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">AppDomain</span> ApplicationDomain
    <span class="token punctuation">{</span>
      <span class="token keyword">get</span>
      <span class="token punctuation">{</span>
        <span class="token keyword">return</span> _appDomain<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> VirtualDirectory
    <span class="token punctuation">{</span>
      <span class="token keyword">get</span>
      <span class="token punctuation">{</span>
        <span class="token keyword">return</span> _virtualDir<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> BaseDirectory
    <span class="token punctuation">{</span>
      <span class="token keyword">get</span>
      <span class="token punctuation">{</span>
        <span class="token keyword">return</span> _baseDir<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoRequest</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">,</span> <span class="token class-name">TextWriter</span> writer<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      HttpRuntime<span class="token punctuation">.</span><span class="token function">ProcessRequest</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SimpleWorkerRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>      
      <span class="token function">DoRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token function">RequestPage</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> query<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">using</span><span class="token punctuation">(</span><span class="token class-name">StringWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>      
      <span class="token punctuation">{</span>
        <span class="token function">DoRequest</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> query<span class="token punctuation">,</span> writer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> writer<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">RequestPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> page<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">RequestPage</span><span class="token punctuation">(</span>page<span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,34),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netinter6.html.vue"]]);export{i as default};
