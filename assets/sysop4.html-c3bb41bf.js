import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},e=p(`<h1 id="禁止用户关闭操作系统" tabindex="-1"><a class="header-anchor" href="#禁止用户关闭操作系统" aria-hidden="true">#</a> 禁止用户关闭操作系统</h1><p><strong>实现</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_QUERYENDSESSION<span class="token operator">=</span><span class="token number">0x0011</span><span class="token punctuation">;</span>

<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Message</span> m<span class="token punctuation">)</span>  
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>Msg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> WM_QUERYENDSESSION<span class="token punctuation">:</span>
            m<span class="token punctuation">.</span>Result<span class="token operator">=</span><span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span>i<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),o=[e];function c(l,k){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","sysop4.html.vue"]]);export{r as default};
