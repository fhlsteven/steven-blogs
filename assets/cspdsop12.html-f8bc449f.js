import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},e=t(`<h1 id="贴子主题-datetime类型的变量怎么累加" tabindex="-1"><a class="header-anchor" href="#贴子主题-datetime类型的变量怎么累加" aria-hidden="true">#</a> 贴子主题： DateTime类型的变量怎么累加？？？？？</h1><h2 id="datetime类型的变量怎么累加" tabindex="-1"><a class="header-anchor" href="#datetime类型的变量怎么累加" aria-hidden="true">#</a> DateTime类型的变量怎么累加？？？？？</h2><p>2003-9-18 8:14:20</p><hr><p>2003-9-19 7:59:30</p><p>只有自己定义一个类实现相加了</p><blockquote><p>曾经为Java而疯狂，如今为.NET而奔波！！！为何???————生存！！！</p></blockquote><hr><p>2003-9-19 8:05:10</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>
<span class="token class-name">System<span class="token punctuation">.</span>DateTime</span> dTime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>DateTime</span><span class="token punctuation">(</span><span class="token number">1980</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// tSpan is 17 days, 4 hours, 2 minutes and 1 second.</span>
<span class="token class-name">System<span class="token punctuation">.</span>TimeSpan</span> tSpan
    <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>TimeSpan</span><span class="token punctuation">(</span><span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Result gets 8/22/1980 4:02:01 AM.</span>
<span class="token class-name">System<span class="token punctuation">.</span>DateTime</span> result <span class="token operator">=</span> dTime <span class="token operator">+</span> tSpan<span class="token punctuation">;</span>
</code></pre></div><p>找到一个时间相加的例子</p><blockquote><p>曾经为Java而疯狂，如今为.NET而奔波！！！为何???————生存！！！</p></blockquote><hr><p>2003-9-19 8:17:17</p><p>谢谢了<br> 我昨天也看到一个方法可以累加多个时间变量的</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Dim</span> time1<span class="token punctuation">,</span>time2 <span class="token keyword">as</span> <span class="token class-name">DateTime</span>
time1<span class="token operator">=</span>System<span class="token punctuation">.</span><span class="token function">DateTime</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span>
time1<span class="token operator">=</span>time1<span class="token punctuation">.</span><span class="token function">AddHours</span><span class="token punctuation">(</span>time2<span class="token punctuation">.</span>hour<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddMinutes</span><span class="token punctuation">(</span>time2<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddSeconds</span><span class="token punctuation">(</span>times<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> 
</code></pre></div><p>这个方法也不错吧</p>`,17),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","cspdsop12.html.vue"]]);export{k as default};
