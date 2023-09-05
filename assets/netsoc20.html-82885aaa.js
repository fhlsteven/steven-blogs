import{_ as n,o as s,c as a,a as t}from"./app-382facc7.js";const p={},o=t(`<h1 id="socket异步处理问题" tabindex="-1"><a class="header-anchor" href="#socket异步处理问题" aria-hidden="true">#</a> socket异步处理问题</h1><p>由于一个项目要和第三方软件做接口，第三方软件是Unix的操作系统，所以用了Socket来传输数据。<br> 具体结构是这样的：本项目作为服务器端，第三方软件是客户端，并且有多个客户端。</p><p>通常情况下，要开多个线程来处理多个客户端，并且一个客户端要占用一个端口，每个客户端在访问服务端时，服务器端要找到当前空闲的端口返回给客户端进行调用。<br> msdn上提供了这种的解决方案：<br><code>http://www.microsoft.com/china/msdn/archives/library/dncscol/html/csharp09182003.asp</code></p><p>但是，经过我今天的摸索，发现用socket异步处理也能解决这个问题，只要一个端口就可以给n个客户端访问了。<br> 并且客户不需要做异步处理，只是服务端做异步处理就可以了。这样的话，第三方软件改动量就很小，主要控制权在我这里。</p><p><strong>客户端</strong>做法的代码片断：</p><p>创建连接：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>mobj_stSend <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span> <span class="token punctuation">(</span> AddressFamily<span class="token punctuation">.</span>InterNetwork <span class="token punctuation">,</span>
                    SocketType<span class="token punctuation">.</span>Stream <span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">//初始化一个Socket实例</span>

<span class="token class-name">IPEndPoint</span> tempRemoteIP <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span>
    <span class="token punctuation">(</span> IPAddress<span class="token punctuation">.</span>Parse <span class="token punctuation">(</span> textBox1<span class="token punctuation">.</span>Text <span class="token punctuation">)</span> <span class="token punctuation">,</span> mi_port <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">//根据IP地址和端口号创建远程终结点</span>

<span class="token class-name">EndPoint</span> epTemp <span class="token operator">=</span> <span class="token punctuation">(</span> EndPoint <span class="token punctuation">)</span> tempRemoteIP<span class="token punctuation">;</span>
mobj_stSend<span class="token punctuation">.</span>Connect <span class="token punctuation">(</span> epTemp <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">//连接远程主机的8000端口号</span>
</code></pre></div><p>发送数据：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> iLength <span class="token operator">=</span> textBox2<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Length <span class="token punctuation">;</span> <span class="token comment">//获取要发送的数据的长度</span>
<span class="token class-name">Byte <span class="token punctuation">[</span> <span class="token punctuation">]</span></span> bySend <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span> <span class="token punctuation">[</span> iLength <span class="token punctuation">]</span> <span class="token punctuation">;</span> <span class="token comment">//根据获取的长度定义一个Byte类型数组</span>
bySend <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span>GetBytes <span class="token punctuation">(</span> textBox2<span class="token punctuation">.</span>Text <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">//按照指定编码类型把字符串指定到指定的Byte数组</span>

<span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> mobj_stSend<span class="token punctuation">.</span>Send <span class="token punctuation">(</span> bySend <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">//发送数据</span>
</code></pre></div><p><strong>服务器</strong>端做了一个Socket数组来存放所有客户端的连接：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">Socket</span> ListenSoc <span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ManualResetEvent</span> allDone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Socket <span class="token punctuation">[</span><span class="token punctuation">]</span></span> SocClient<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_SOCKET<span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token class-name">Thread</span> mobj_thTreadRead<span class="token punctuation">;</span>
</code></pre></div><p>启动监听线程：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>mobj_thTreadRead <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span> <span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span> <span class="token punctuation">(</span> Listen <span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span><span class="token comment">//以Listen过程来初始化Thread实例</span>
mobj_thTreadRead<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span><span class="token comment">//启动线程</span>
button1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span>  <span class="token punctuation">;</span>
</code></pre></div><p>在Listen方法中使用异步访问：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> nPort <span class="token operator">=</span> <span class="token number">8000</span><span class="token punctuation">;</span>
    <span class="token class-name">IPEndPoint</span> ipLocalEndPoint<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// IPAddress ipAddress = Dns.Resolve(&quot;localhost&quot;).AddressList[0];</span>
        ipLocalEndPoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span><span class="token function">GetServerIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> nPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SocketException</span> socErr <span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>socErr<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>                
        ListenSoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span>ProtocolType<span class="token punctuation">.</span>Tcp <span class="token punctuation">)</span><span class="token punctuation">;</span>
        ListenSoc<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>ipLocalEndPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ListenSoc<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            allDone<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ListenSoc<span class="token punctuation">.</span>Soc<span class="token punctuation">.</span><span class="token function">BeginAccept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>AcceptCallback<span class="token punctuation">)</span><span class="token punctuation">,</span>ListenSoc<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//异步访问，并定义回调方法</span>
            allDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> err<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>实现回调方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AcceptCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        allDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WSocket</span> listener <span class="token operator">=</span> <span class="token punctuation">(</span>WSocket<span class="token punctuation">)</span> ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nSoc <span class="token operator">=</span> <span class="token function">GetAvailbleSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取有效的Socket，即一个新的Socket实例</span>
        SocClient<span class="token punctuation">[</span>nSoc<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span>ListenSoc<span class="token punctuation">.</span><span class="token function">EndAccept</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//在这里处理接收过来得数据</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetAvailbleSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>MAX_SOCKET<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>SocClient<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>SocClient<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Soc<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> err<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;GetSock :&quot;</span><span class="token operator">+</span>err<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i<span class="token operator">&gt;</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span>MAX_SOCKET<span class="token punctuation">)</span><span class="token punctuation">)</span>  
        <span class="token function">InitSocket</span><span class="token punctuation">(</span><span class="token keyword">ref</span> SocClient<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> i<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,18),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netsoc20.html.vue"]]);export{i as default};
