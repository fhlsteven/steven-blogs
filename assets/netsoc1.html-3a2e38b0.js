import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-a2b6e588.js";const l={},k={id:"socket-好像也挺简单-可是-真够烦",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#socket-好像也挺简单-可是-真够烦","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/heroman/archive/2004/12/02/71920.html",target:"_blank",rel:"noopener noreferrer"},m=u(`<p>虽然思路简单,可是实现起来可真麻烦,因为要用到好多类来实现DNS解析,IP辨别,数据格式变换,解码等,比较烦呢</p><p>用到了</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding
System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Dns
System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>Socket
System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPHostEntry
System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPAddress
System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPEndPoint
<span class="token range operator">..</span>
</code></pre></div><p>是不是很麻烦?下面的代码运用Socket建立加接,然后朝目标计算机的指定端口发送GET请求,然后将请求返回的头256数据返回</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">MyControl</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// SocketTest 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SocketTest</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">SocketTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
            <span class="token comment">//            </span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 连接SOCKET</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Server<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>服务器名<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Port<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>端口<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name">Socket</span> <span class="token function">Connection</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Server<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> Port<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Socket</span> HttpSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">IPHostEntry</span> HostIp <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            HostIp <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span>Server<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">IPAddress</span> TempIp <span class="token keyword">in</span> HostIp<span class="token punctuation">.</span>AddressList<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">IPEndPoint</span> Iep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>TempIp<span class="token punctuation">,</span> Port<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Socket</span> TempSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>Iep<span class="token punctuation">.</span>AddressFamily<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
                TempSocket<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>Iep<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>TempSocket<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    HttpSocket <span class="token operator">=</span> TempSocket<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>HttpSocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetHomePageByeSocket</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Server<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> Port<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strHomePage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">Encoding</span> AscEncode <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strGetString <span class="token operator">=</span> <span class="token string">&quot;GET / HTTP/1.1\\r\\nHost: &quot;</span> <span class="token operator">+</span> Server <span class="token operator">+</span> <span class="token string">&quot;\\r\\nConnection: Close\\r\\n\\r\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> BtGetByte <span class="token operator">=</span> AscEncode<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>strGetString<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> BtRevByte <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token class-name">Socket</span> HttpSocket <span class="token operator">=</span> <span class="token function">Connection</span><span class="token punctuation">(</span>Server<span class="token punctuation">,</span> Port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>HttpSocket <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Connection Fail!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            HttpSocket<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>BtGetByte<span class="token punctuation">,</span> BtGetByte<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> SocketFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Int32</span> IntRevByte <span class="token operator">=</span> HttpSocket<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>BtRevByte<span class="token punctuation">,</span> BtRevByte<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> SocketFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">;</span>

            strHomePage <span class="token operator">+=</span> AscEncode<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>BtRevByte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> IntRevByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>strHomePage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5);function d(y,g){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("Socket,好像也挺简单,可是,真够烦"),c(a)])]),m])}const w=t(l,[["render",d],["__file","netsoc1.html.vue"]]);export{w as default};
