import{_ as n,o as a,c as s,a as t}from"./app-a2b6e588.js";const o={},e=t(`<h1 id="用默认的程序打开一个文件的代码怎么写" tabindex="-1"><a class="header-anchor" href="#用默认的程序打开一个文件的代码怎么写" aria-hidden="true">#</a> 用默认的程序打开一个文件的代码怎么写？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  用默认的程序打开一个文件的代码怎么写？
作　　者：  limengchen (lmc)  
等　　级：  ^^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  10
回复次数：  2
发表时间：  2003-9-27 19:14:21
</code></pre></div><p>我记得好像是用API：</p><p><code>shell(&quot;start ...&quot;);</code></p><p>不过在C#里面应该是封装了吧。那么，应该用哪个函数？</p><hr><hr><p>回复人： abcynic(门外汉) ( 二级(初级)) 信誉：100 2003-9-27 19:21:38 得分:5</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>

<span class="token class-name">Process</span> pro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pro<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>FileName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
pro<span class="token punctuation">.</span>StartInof<span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
<span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
pro<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： ntljy(服务kk) ( 三级(初级)) 信誉：100 2003-9-27 19:25:47 得分:5</p><blockquote><p><code>Process.Start(Path.Combine(路径, 文件名))</code></p></blockquote><p>该问题已经结贴 ，得分记录： abcynic (5)、 ntljy (5)、</p>`,13),p=[e];function c(r,l){return a(),s("div",null,p)}const k=n(o,[["render",c],["__file","folder16.html.vue"]]);export{k as default};
