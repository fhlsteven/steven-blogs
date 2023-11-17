import{_ as t,r as p,o,c,b as n,d as s,e,a as u}from"./app-a2b6e588.js";const l={},k={id:"写了一个udp信息收发静态类",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#写了一个udp信息收发静态类","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/xspin/archive/2004/08/13/33126.aspx",target:"_blank",rel:"noopener noreferrer"},d=u(`<p>最近准备利用.NET的套接字开发一个类似QQ的IM组件，先写了一个Udp信息收发静态类！也不是很完善，暂时先储备着，以后重构用！</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">XChatLib</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// MessageUtility 消息工具类,该类是一个静态工具类。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageUtility</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//缺省端口号</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DEFAULT_PORT <span class="token operator">=</span> <span class="token number">9050</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token function">MessageUtility</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//发送消息方法</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendMessage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> msg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//本机主机信息</span>
            <span class="token class-name">IPHostEntry</span> host <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//端口号参数以后重构时可以做成一个方法从配置文件中读取端口号</span>
            <span class="token class-name">IPEndPoint</span> ipep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>host<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> DEFAULT_PORT<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//创建一个udp套接字</span>
            <span class="token class-name">Socket</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>
                SocketType<span class="token punctuation">.</span>Dgram<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Udp<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                data <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    server<span class="token punctuation">.</span><span class="token function">SendTo</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> SocketFlags<span class="token punctuation">.</span>None<span class="token punctuation">,</span> ipep<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SocketException</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
                <span class="token keyword">finally</span>
                <span class="token punctuation">{</span>
                    server<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//接受消息方法</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ReceiveMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> recv<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token comment">//创建一个随机终结点对象</span>
            <span class="token class-name">IPEndPoint</span> ipep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> DEFAULT_PORT<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//创建一个Udp套接字</span>
            <span class="token class-name">Socket</span> newsock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>
                AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>SocketType<span class="token punctuation">.</span>Dgram<span class="token punctuation">,</span>    ProtocolType<span class="token punctuation">.</span>Udp<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//将随机终结点与Udp套接字绑定，以等待流入的数据包</span>
            newsock<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>ipep<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//创建一个接受任意发送者的终结点</span>
            <span class="token class-name">IPEndPoint</span> sender <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">EndPoint</span> tmpRemote <span class="token operator">=</span> <span class="token punctuation">(</span>EndPoint<span class="token punctuation">)</span><span class="token punctuation">(</span>sender<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                recv <span class="token operator">=</span> newsock<span class="token punctuation">.</span><span class="token function">ReceiveFrom</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token keyword">ref</span> tmpRemote<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>data<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SocketException</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                newsock<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//关闭套接字释放资源</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>posted on 2004-08-13 17:37 浪淘沙 阅读(111) 评论(4)</p><hr><p>2004-08-13 17:47 | janssen</p><blockquote><p>有些可以写在配置文件里面吧？<br> 像端口号7712，补充一个轮询的组件找端口号，默认值7712，如果发现已占用就7712+1<br> 在配置里面可以加上<br><code>DEFAULT_PORT=7712</code><br><code>DEFAULT_MAXLOOP=1000</code><br></p></blockquote><p>2004-08-13 20:07 | xpilot</p><blockquote><p>肯定是要写到配置文件中的。不过以后重构时在做了！</p></blockquote><p>2004-08-14 11:24 | itspice</p><blockquote><p>有没有测试用大量数据发送的时候，能不能接收到？</p></blockquote><p>re: 写了一个Udp信息收发静态类！</p><blockquote><p>目前还没有，后期会进行一些压力测试的！</p></blockquote>`,12);function m(y,w){const a=p("ExternalLinkIcon");return o(),c("div",null,[n("h1",k,[i,s(),n("a",r,[s("写了一个Udp信息收发静态类"),e(a)])]),d])}const b=t(l,[["render",m],["__file","netcode34.html.vue"]]);export{b as default};
