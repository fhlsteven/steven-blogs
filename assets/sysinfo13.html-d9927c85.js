import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="如何计算今天是今年中的第几个星期" tabindex="-1"><a class="header-anchor" href="#如何计算今天是今年中的第几个星期" aria-hidden="true">#</a> 如何计算今天是今年中的第几个星期</h1><p><strong>实现</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">weekOfYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//先取当天的年份</span>
    <span class="token class-name"><span class="token keyword">string</span></span> year <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span>Today<span class="token punctuation">.</span>Year<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//转换今年第一天</span>
    <span class="token class-name">DateTime</span> firstOfYear <span class="token operator">=</span> DateTime<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;01 01 &quot;</span> <span class="token operator">+</span> year<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">//计算当年第一天是星期几</span>
    <span class="token class-name"><span class="token keyword">int</span></span> firstOfWeek <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>firstOfYear<span class="token punctuation">.</span>DayOfWeek<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//今天是今年的天数 + 当年第一天是星期几, 然后除 7 就可以了.</span>
    <span class="token keyword">return</span> Convert<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span>Today<span class="token punctuation">.</span>DayOfYear <span class="token operator">+</span> firstOfWeek<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","sysinfo13.html.vue"]]);export{k as default};
