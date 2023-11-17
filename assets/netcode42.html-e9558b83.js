import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="通过tcp传送结构体" tabindex="-1"><a class="header-anchor" href="#通过tcp传送结构体" aria-hidden="true">#</a> 通过TCP传送结构体</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  通过TCP传送结构体。(我已经可能正收发包含有string,int型的结构体了，可是如果结构体中包含int[]数组，就搞不定了。)
作　　者：  roseguns (阿影)
等　　级：  ^^^
信 誉 值：  98
所属社区：  .NET技术 C#
问题点数：  33
回复次数：  9
发表时间：  2004-10-18 13:57:24
</code></pre></div><p>通过TCP传送结构体。(我已经可能正收发包含有string,int型的结构体了，可是如果结构体中包含int[]数组，就搞不定了。)</p><hr><hr><p>回复人： roseguns(阿影) ( 三级(初级)) 信誉：98 2004-10-18 14:11:31 得分: 0</p><blockquote><p>UP一下，分数不够再加。</p></blockquote><p>回复人： roseguns(阿影) ( 三级(初级)) 信誉：98 2004-10-18 14:24:33 得分: 0</p><blockquote><p>通过TCP传送结构体，服务器端收不到结构体中的整型数组的值；<br> (我已经可能正收发包含有string,int型的结构体了，可是如果结构体中包含int[]数组，就搞不定了。)<br><code>---------------------------------------------------------------------------------------------</code><br> 〔相关背景资料：〕<br> 客户端结构体与服务器端的结构体格式相同，定义如下：<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Ansi<span class="token punctuation">,</span>Pack<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">cc</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> account<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span>SizeConst<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> passWord<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValArray<span class="token punctuation">,</span>SizeConst<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>客户端在发送结构体前首先将结构体转换为<code>byte[]</code>数组，函数如下：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">StructToBytes</span><span class="token punctuation">(</span><span class="token class-name">cc</span> structObj<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        size <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>structObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> rr <span class="token operator">=</span> ex<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">IntPtr</span> buffer <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">AllocHGlobal</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        Marshal<span class="token punctuation">.</span><span class="token function">StructureToPtr</span><span class="token punctuation">(</span>structObj<span class="token punctuation">,</span> buffer<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
        Marshal<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bytes<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> rr <span class="token operator">=</span> ex<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>服务器端在收到客户端流后将流转换为结构体，函数如下：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">cc</span> <span class="token function">BytesToStruct</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes<span class="token punctuation">,</span> <span class="token class-name">cc</span> c1<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
　　<span class="token class-name"><span class="token keyword">int</span></span> size <span class="token operator">=</span>  Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>c1<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token class-name">IntPtr</span> buffer <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">AllocHGlobal</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token keyword">try</span>
　　<span class="token punctuation">{</span>
　　　Marshal<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　　<span class="token keyword">return</span> <span class="token punctuation">(</span>cc<span class="token punctuation">)</span>Marshal<span class="token punctuation">.</span><span class="token function">PtrToStructure</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> c1<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token punctuation">}</span>
　　<span class="token keyword">finally</span>
　　<span class="token punctuation">{</span>
　　　Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： BeginnerBBB() ( 二级(初级)) 信誉：97 2004-10-18 14:33:05 得分: 0</p><blockquote><p>序列化与反序列化</p></blockquote><p>回复人： roseguns(阿影) ( 三级(初级)) 信誉：98 2004-10-18 14:57:08 得分: 0</p><blockquote><p>不好意思，有一个前提没有说：客户端是C#,服务器端是VC6,可以用序列化和反序列的概念吗？</p></blockquote><p>回复人： roseguns(阿影) ( 三级(初级)) 信誉：98 2004-10-19 11:25:00 得分: 0</p><blockquote><p>今天UP一下.</p></blockquote><p>回复人： gbbword(分不清) ( 三级(初级)) 信誉：100 2004-10-19 11:37:00 得分: 0</p><blockquote><p>可惜楼主说的不够详细，不然就可以多学习点了。顶一下！</p></blockquote><p>回复人： gbbword(分不清) ( 三级(初级)) 信誉：100 2004-10-19 11:41:00 得分: 0</p><blockquote><p>不知道系统认不认你这种在内存中与结构体一样的东西。很想知道。再顶一下！</p></blockquote><p>回复人： roseguns(阿影) ( 三级(初级)) 信誉：98 2004-10-19 12:16:00 得分: 0</p><blockquote><p>当然认了，我的例子中基本实现了这个功能，现在就是<code>int[]</code>数组不能正常收发与装配．<br> 有关更详细的说明，大家请前往此页：<br><code>http://blog.csdn.net/roseguns/archive/2004/10/19/142408.aspx</code></p></blockquote><p>回复人： programbin(终极猫咪) ( 一级(初级)) 信誉：100 2004-11-03 10:00:00 得分: 0</p><blockquote><p>我觉的用 remoting 不是更好吗？</p></blockquote>`,28),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode42.html.vue"]]);export{i as default};
