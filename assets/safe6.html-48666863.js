import{_ as s,o as n,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="检测是否还有黑客代码的asp-net函数" tabindex="-1"><a class="header-anchor" href="#检测是否还有黑客代码的asp-net函数" aria-hidden="true">#</a> 检测是否还有黑客代码的asp.net函数</h1><blockquote><p>ouwx CSDN 2003-04-07</p></blockquote><p>查询是否还有黑客代码的asp.net函数，非常适合留言簿、bbs、聊天室</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token operator">&lt;</span><span class="token operator">%</span><span class="token operator">@</span> Page language<span class="token operator">=</span><span class="token string">&quot;vb&quot;</span><span class="token operator">%</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script runat<span class="token operator">=</span><span class="token string">&quot;server&quot;</span><span class="token operator">&gt;</span>
<span class="token keyword">dim</span> heike<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token keyword">string</span>
<span class="token keyword">dim</span> i <span class="token keyword">as</span> <span class="token keyword">integer</span>
<span class="token comment">&#39;定义黑客代码</span>
<span class="token keyword">public</span> <span class="token keyword">Sub</span> heikeword<span class="token punctuation">(</span>a <span class="token keyword">as</span> <span class="token keyword">string</span><span class="token punctuation">)</span>
heike<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">&quot;1234&quot;</span>
heike<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">&quot;125&quot;</span>
<span class="token keyword">dim</span> re <span class="token keyword">as</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions<span class="token punctuation">.</span>Regex

<span class="token keyword">for</span> i<span class="token operator">=</span><span class="token number">0</span> <span class="token keyword">to</span> <span class="token number">1</span>
re<span class="token operator">=</span><span class="token keyword">new</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions<span class="token punctuation">.</span>Regex<span class="token punctuation">(</span>heike<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>re<span class="token punctuation">.</span>Match<span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">.</span>Success<span class="token punctuation">)</span>
response<span class="token punctuation">.</span>write <span class="token punctuation">(</span>heike<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;  &quot;</span><span class="token punctuation">)</span>
response<span class="token punctuation">.</span>write <span class="token punctuation">(</span><span class="token string">&quot;success&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">end</span> <span class="token keyword">if</span>
<span class="token keyword">next</span>
<span class="token keyword">end</span> <span class="token keyword">sub</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">%</span>

<span class="token keyword">dim</span> a <span class="token keyword">as</span> <span class="token keyword">string</span><span class="token operator">=</span><span class="token string">&quot;1234345&quot;</span>  <span class="token comment">&#39;就是要检测的内容</span>
heikeword<span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token operator">%</span><span class="token operator">&gt;</span>
</code></pre></div>`,4),e=[o];function c(k,r){return n(),a("div",null,e)}const u=s(t,[["render",c],["__file","safe6.html.vue"]]);export{u as default};
