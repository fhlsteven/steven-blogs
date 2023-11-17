import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="用浏览器来接收c-的程序返回的时间cool" tabindex="-1"><a class="header-anchor" href="#用浏览器来接收c-的程序返回的时间cool" aria-hidden="true">#</a> 用浏览器来接收C# 的程序返回的时间cool</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*
豆腐制作 都是精品
http://www.asp888.net 豆腐技术站
如转载 请保留版权信息
*/</span>
</code></pre></div><p>今天早上 我写了一篇 用socket 做的 时间服务器，当时我说准备用一段时间作个不需要客户端接收数据</p><p>而是用 浏览器 接收数据的程序，很顺利，一天的时间 我就做好了：）</p><p>闲话不说，先看程序。。。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">HttpProcessor</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Socket</span> s<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">BufferedStream</span> bs<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">StreamReader</span> sr<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">StreamWriter</span> sw<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> method<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> url<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> protocol<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Hashtable</span> hashTable<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">HttpProcessor</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>s <span class="token operator">=</span> s<span class="token punctuation">;</span>
        hashTable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>ReadWrite<span class="token punctuation">)</span><span class="token punctuation">;</span>
        bs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BufferedStream</span><span class="token punctuation">(</span>ns<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>bs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>bs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">writeURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        s<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>SdBoth<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ns<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">writeURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token function">writeSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">writeFailure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;File not found: &quot;</span> <span class="token operator">+</span> url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sw<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">writeSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP/1.1 200 OK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Server: Microsoft-IIS/5.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Date: Mon, 27 Nov 2000 08:19:43 GMT&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Length: 6&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: text/html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> strDateLine<span class="token punctuation">;</span>
        <span class="token class-name">DateTime</span> now<span class="token punctuation">;</span>
        now <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
        strDateLine <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">ToShortDateString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> now<span class="token punctuation">.</span><span class="token function">ToLongTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strDateLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">writeFailure</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP/1.0 404 File not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connection: close&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HttpServer</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">HttpServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token number">81</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">HttpServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>port <span class="token operator">=</span> port<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Socket</span> listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>SockStream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>ProtTCP<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPAddress</span> ipaddress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPAddress</span><span class="token punctuation">(</span><span class="token string">&quot;169.254.0.244&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> endpoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>ipaddress<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span>Blocking <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Press Ctrl+c to Quit...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Socket</span> s <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">HttpProcessor</span> processor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpProcessor</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>processor<span class="token punctuation">.</span>process<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            thread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">HttpServer</span> httpServer<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span><span class="token function">GetLength</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            httpServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpServer</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToUInt16</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            httpServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>httpServer<span class="token punctuation">.</span>listen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        thread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,6),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode38.html.vue"]]);export{i as default};
