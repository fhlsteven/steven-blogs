import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="请教-如何通过socket传递自定义的对象" tabindex="-1"><a class="header-anchor" href="#请教-如何通过socket传递自定义的对象" aria-hidden="true">#</a> 请教:如何通过Socket传递自定义的对象?</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  请教:如何通过Socket传递自定义的对象?
作　　者：  chinayuchen (雨辰)  
等　　级：  ^
信 誉 值：  99
所属社区：  .NET技术 C#
问题点数：  50
回复次数：  8
发表时间：  2004-11-25 11:13:11
</code></pre></div><p>请大家给个相关的例子吧,谢谢!</p><hr><hr><p>回复人： jxzhang615(冰河) ( 四级(中级)) 信誉：100 2004-11-25 11:14:16 得分: 5</p><blockquote><p>帮顶！</p></blockquote><p>回复人： DotNetFreak() ( 一级(初级)) 信誉：100 2004-11-25 11:33:47 得分: 5</p><blockquote><p>可以用.net 提供的 SoapFormatter 或者 BinaryFormatter 把你的object serialize<br> 然后通过socket 传送<br> 在接受方用同样的formatter deserialize 还原出来</p></blockquote><p>回复人： DotNetFreak() ( 一级(初级)) 信誉：100 2004-11-25 11:57:53 得分: 20</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> MyClassMember <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> socket<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">MyClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bf<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sk<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Recieve</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> socket<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>sk<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ms<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">MyClass</span> obj <span class="token operator">=</span> bf<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token class-name">MyClass</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： yzh0523(水手) ( 四级(中级)) 信誉：100 2004-11-25 12:01:21 得分: 20</p><blockquote><p><code>http://blog.csdn.net/roseguns/archive/2004/10/19/142408.aspx</code></p></blockquote><p>回复人： chinayuchen(雨辰) ( 一级(初级)) 信誉：99 2004-11-25 14:40:57 得分: 0</p><blockquote><p>请帮我看下一这个错误如何处理,谢谢</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 用于传递的类</span>
<span class="token punctuation">[</span>Serializable<span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> MyClassMember <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 客户端</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> MyClassMember <span class="token operator">=</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Socket</span> sock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> ep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            sock<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ep<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">MyClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            bf<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

            ms<span class="token punctuation">.</span>Position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                sock<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            sock<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
            sock<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 服务器端</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Server</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Socket</span> sock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> ep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sock<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>ep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sock<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Server is Start...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Socket</span> sc <span class="token operator">=</span> sock<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>sc<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            ms<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">MyClass</span> obj <span class="token operator">=</span> bf<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token class-name">MyClass</span><span class="token punctuation">;</span>   <span class="token comment">// 这一行产生以下的异常信息</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>MyClassMember<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>未处理的异常： System.Runtime.Serialization.SerializationException: 在分析完成之前就遇到流结尾。</p></blockquote><p>回复人： chinayuchen(雨辰) ( 一级(初级)) 信誉：99 2004-11-25 14:42:17 得分: 0</p><blockquote><p>请帮我看下一这个错误如何处理,谢谢<br> 未处理的异常： System.Runtime.Serialization.SerializationException: 在分析完成之前就遇到流结尾。</p></blockquote><p>回复人： chinayuchen(雨辰) ( 一级(初级)) 信誉：99 2004-11-25 15:27:44 得分: 0</p><blockquote><p>唉,沉得这么快,再顶一下<br> 大家帮忙呀,up 有分</p></blockquote><p>回复人： DotNetFreak() ( 一级(初级)) 信誉：100 2004-11-25 17:34:00 得分: 0</p><blockquote><p>你忘了在Deserialize 前把MemoryStream 的position = 0 了，就像客户端一样 <code>ms.Position = 0;</code></p></blockquote><p>该问题已经结贴 ，得分记录： jxzhang615 (5)、 DotNetFreak (5)、 DotNetFreak (20)、 yzh0523 (20)、</p>`,25),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netsoc23.html.vue"]]);export{i as default};
