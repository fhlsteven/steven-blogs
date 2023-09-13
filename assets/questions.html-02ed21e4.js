import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="一些相关的示例" tabindex="-1"><a class="header-anchor" href="#一些相关的示例" aria-hidden="true">#</a> 一些相关的示例</h1><h2 id="求在100以内的所有素数-质数" tabindex="-1"><a class="header-anchor" href="#求在100以内的所有素数-质数" aria-hidden="true">#</a> 求在100以内的所有素数(质数）</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">bool</span></span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> m <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> m <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">;</span> m<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">%</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
            flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>flag <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>m <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(l,k){return s(),a("div",null,e)}const u=n(t,[["render",c],["__file","questions.html.vue"]]);export{u as default};
