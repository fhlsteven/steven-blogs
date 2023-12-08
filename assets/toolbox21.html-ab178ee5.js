import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主    题：  我用c#写了一个组件，在这个组件中怎么样调用一个非托管的dll?注意仅仅是一个dll,他提供了函数接口！
作    者：  longxiaojie (小杰)
信 誉 值：  101
所属论坛：  .NET技术 ASP.NET
问题点数：  50
回复次数：  7
发表时间：  2003-6-12 16:24:49
</code></pre></div><p>不是注册的那种com组件，就是一个普通的类似系统的dll文件，他只是导出了一个函数接口，怎么调用呀？</p><hr><hr><p>回复人： longxiaojie(小杰) ( ) 信誉：101 2003-6-12 16:29:41 得分:0</p><blockquote><p>提供思路就可以！！自己up,高手狂进！</p></blockquote><p>回复人： longxiaojie(小杰) ( ) 信誉：101 2003-6-12 16:40:51 得分:0</p><blockquote><p>接着up!</p></blockquote><p>回复人： ZHANG9652(剑神独孤求败) ( ) 信誉：99 2003-6-12 17:41:36 得分:20</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 拨号函数</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;Rasapi32.dll&quot;</span><span class="token punctuation">,</span> CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> lpRasDialExtensions<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpszPhonebook<span class="token punctuation">,</span><span class="token keyword">ref</span> <span class="token class-name">RASDIALPARAMS</span> lprasdialparams<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwNotifierType<span class="token punctuation">,</span><span class="token class-name">Callback</span> lpvNotifier<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lphRasConn<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token class-name">RASDIALPARAMS</span> RasDialParams<span class="token punctuation">;</span>
</code></pre></div><blockquote><p>给你参考</p></blockquote><p>回复人： longxiaojie(小杰) ( ) 信誉：101 2003-6-13 11:05:53 得分:0</p><blockquote><p>不太明白，谢谢呀！</p></blockquote><p>回复人： zzwsz(zzw) ( ) 信誉：95 2003-6-13 11:11:49 得分:5</p><blockquote><p>与调用API的思路一样</p></blockquote><p>回复人： ameng_2002(flyfox) ( ) 信誉：105 2003-6-13 11:30:37 得分:25</p><blockquote><p>利用平台调用这种服务，托管代码可以调用在动态链接库 (DLL)（如 Win32 API 中的 DLL）中实现的非托管函数。此服务将查找并调用导出的函数，然后根据需要跨越互用边界封送其参数（整数、字符串、数组、结构等）。<br><br> 比如</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Win32</span> <span class="token punctuation">{</span>
     <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
     <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token class-name">String</span> caption<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       Win32<span class="token punctuation">.</span><span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Platform Invoke Sample&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： longxiaojie(小杰) ( ) 信誉：101 2003-6-17 16:09:24 得分:0</p><blockquote><p>呵呵，谢谢，搞定了</p></blockquote>`,22),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","toolbox21.html.vue"]]);export{i as default};