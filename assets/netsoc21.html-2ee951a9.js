import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="c-写的socket-server-和client" tabindex="-1"><a class="header-anchor" href="#c-写的socket-server-和client" aria-hidden="true">#</a> C#写的Socket Server 和Client</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  C#写的Socket Server 和Client
作　　者：  tony_jin (金)
等　　级：  ^
信 誉 值：  97
所属社区：  .NET技术 C#
问题点数：  100
回复次数：  7
发表时间：  2004-11-26 13:14:58
</code></pre></div><p>该如何写啊？最好有现成的源代码使用，时间太急</p><hr><hr><p>回复人： Lastcsdner(外行) ( 二级(初级)) 信誉：100 2004-11-26 13:13:00 得分: 0</p><blockquote><p>懒，当初我写这个东西什么都不知道也就花半天就写好了。<br> 给你点建议吧：客户端使用TCPClient,如果需要操作裸SOCKET就继承一下；<br> 服务端给你一点代码吧：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">IPAddress</span> localAddr <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TcpListener</span> server <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>localAddr<span class="token punctuation">,</span> _port<span class="token punctuation">)</span><span class="token punctuation">;</span>
server<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">Pending</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _sockQueue<span class="token punctuation">.</span><span class="token function">Enqueue</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SocketHandle</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
server<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： coffeenight(留恋咖啡) ( 一级(初级)) 信誉：100 2004-11-26 13:25:00 得分: 0</p><blockquote><p>only these code?</p></blockquote><p>回复人： huqiyang(养猪专业户) ( 二级(初级)) 信誉：100 2004-11-26 13:31:00 得分: 0</p><blockquote><p>bs</p></blockquote><p>回复人： sidshen(阿布) ( 一级(初级)) 信誉：100 2004-11-26 13:33:00 得分: 0</p><blockquote><p>以下是我刚开始用socket时写的一个服务器端，希望有点儿用，当初是是用来接收sms上行用的</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TcpTimeServer</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> portNum <span class="token operator">=</span> <span class="token number">9901</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> done <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">TcpListener</span> listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>portNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;....................&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;....开始监听端口....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;....................&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>done<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for connection...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TcpClient</span> client <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptTcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connection accepted.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> bytesRead <span class="token operator">=</span> ns<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;.......................接受到的信息..........................&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> MOMsg <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>MOMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//MO objMO=new MO(MOMsg);</span>
                <span class="token comment">//Console.WriteLine(&quot;---------&quot;);</span>
                <span class="token comment">//Console.WriteLine(&quot;Msg_type=&quot;+objMO.Msg_type);</span>
                <span class="token comment">//Console.WriteLine(&quot;GWName=&quot;+objMO.GWName);</span>
                <span class="token comment">//Console.WriteLine(&quot;GWPassword=&quot;+objMO.GWPassword);</span>
                <span class="token comment">//Console.WriteLine(&quot;Srctermid=&quot;+objMO.Srctermid);</span>
                <span class="token comment">//Console.WriteLine(&quot;Dsttermid=&quot;+objMO.Dsttermid);</span>
                <span class="token comment">//Console.WriteLine(&quot;Msg=&quot;+objMO.Msg);</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;.......................发送的返回正确的信息信息..........................&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//正确处理返回1</span>
                <span class="token class-name"><span class="token keyword">string</span></span> RspMSG <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>RspMSG<span class="token punctuation">)</span><span class="token punctuation">;</span>
                bytes <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>RspMSG<span class="token punctuation">)</span><span class="token punctuation">;</span>
                ns<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;.......................发送的返回错误的信息信息..........................&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//错误处理返回0</span>
                <span class="token class-name"><span class="token keyword">string</span></span> RspMSG <span class="token operator">=</span> <span class="token string">&quot;01&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>RspMSG<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>RspMSG<span class="token punctuation">)</span><span class="token punctuation">;</span>
                ns<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                ns<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                client<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        listener<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MO</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 0状态报告 1 iod点播 最长1位</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> Msg_type<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 连接名 最长10 位</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> GWName<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 连接密码 最长10 位</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> GWPassword<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 目的号码21位</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> Dsttermid<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 源号码（上行的手机号码）</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> Srctermid<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 消息体 150位</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> Msg<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">MO</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> MOMsg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Msg_type <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        GWName <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        GWPassword <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Dsttermid <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Srctermid <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Msg <span class="token operator">=</span> MOMsg<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">63</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： xiaoxiao5020(小小) ( 一级(初级)) 信誉：100 2004-11-26 13:45:00 得分: 0</p><blockquote><p>看着眼运了，真牛！</p></blockquote><p>回复人： adailee(为了一棵树，我放弃了整个森林) ( 四级(中级)) 信誉：100 2004-11-27 15:52:00 得分: 0</p><blockquote><p>悠着点，慢慢学。</p></blockquote><p>回复人： flyinpiggy(猪猪) ( 一级(初级)) 信誉：100 2004-11-27 18:09:00 得分: 0</p><blockquote><p>老是提示我太长了<br> 请分开回复<br> 楼主要的话给我邮箱<br> 我发给你</p></blockquote>`,21),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netsoc21.html.vue"]]);export{i as default};