import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="两个获取http页面的c-函数" tabindex="-1"><a class="header-anchor" href="#两个获取http页面的c-函数" aria-hidden="true">#</a> 两个获取http页面的c#函数</h1><blockquote><p>你是第76位浏览该文章的人 不详 2003-3-31</p></blockquote><p>埋头苦干一天终于搞定！一个用C#写的windows应用程序，作用嘛，就是对asp程序已知的20种漏洞进行扫描，显示源程序。在这个应用程序中用到两种获得http页面的方法，一种是直接用httpwebrequest类，而另一种是同服务器通过tcp/ip建立socket连接，直接查询端口80 ， 为此我写了以下两个函数，第一个比较简单，参数只有一个，就是要求的url , 另外一个比较复杂，也很通用，不仅可以请求http页面，还可以和其他端口通信，如端口43的whois，端口25的smtp，端口21的ftp甚至pop3等等，三个参数分别是主机名，请求命令和端口。好了，看程序吧。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//获取http页面函数</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Get_Http</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> a_strUrl<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> strResult<span class="token punctuation">;</span>
    <span class="token class-name">HttpWebRequest</span> myReq <span class="token operator">=</span> <span class="token punctuation">(</span>HttpWebRequest<span class="token punctuation">)</span>
    WebRequestFactory<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>a_strUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">HttpWebResponse</span> HttpWResp <span class="token operator">=</span> <span class="token punctuation">(</span>HttpWebResponse<span class="token punctuation">)</span>myReq<span class="token punctuation">.</span><span class="token function">GetResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Stream</span> myStream <span class="token operator">=</span> HttpWResp<span class="token punctuation">.</span><span class="token function">GetResponseStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>myStream<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StringBuilder</span> strBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">!=</span> sr<span class="token punctuation">.</span><span class="token function">Peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            strBuilder<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        strResult <span class="token operator">=</span> strBuilder<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exp<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        strResult <span class="token operator">=</span> <span class="token string">&quot;错误：&quot;</span> <span class="token operator">+</span> exp<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> strResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//通过同server建立tcp/ip连接，发送socket命令</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Get_Socket_Request</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> a_strServer<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> a_strRequest<span class="token punctuation">,</span> <span class="token class-name">Int32</span> a_intPort<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//Set up variables and String to write to the server</span>
    <span class="token class-name">Encoding</span> ASCII <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Get <span class="token operator">=</span> a_strRequest <span class="token operator">+</span> <span class="token string">&quot;Connection: Close\\r\\n\\r\\n&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//string Get = </span>
    <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ByteGet <span class="token operator">=</span> ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>Get<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> RecvBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> strRetPage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// IPAddress and IPEndPoint represent the endpoint that will</span>
    <span class="token comment">// receive the request</span>
    <span class="token class-name">IPAddress</span> hostadd <span class="token operator">=</span> DNS<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span>a_strServer<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> a_strServer<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IPEndPoint</span> EPhost <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>hostadd<span class="token punctuation">,</span> a_intPort<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Create the Socket for sending data over TCP</span>
    <span class="token class-name">Socket</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>AfINet<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>SockStream<span class="token punctuation">,</span>
    ProtocolType<span class="token punctuation">.</span>ProtTCP<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Connect to host using IPEndPoint</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>EPhost<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        strRetPage <span class="token operator">=</span> <span class="token string">&quot;Unable to connect to host&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> strRetPage<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Sent the GET text to the host</span>
    s<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>ByteGet<span class="token punctuation">,</span> ByteGet<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Receive the page, loop until all bytes are received</span>
    <span class="token class-name">Int32</span> bytes <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> RecvBytes<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    strRetPage <span class="token operator">=</span> strRetPage <span class="token operator">+</span> ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>bytes <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        bytes <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> RecvBytes<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        strRetPage <span class="token operator">=</span> strRetPage <span class="token operator">+</span> ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> strRetPage<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode14.html.vue"]]);export{i as default};
