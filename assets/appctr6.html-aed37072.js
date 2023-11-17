import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="如何点右上角关闭-x-执行其他操作" tabindex="-1"><a class="header-anchor" href="#如何点右上角关闭-x-执行其他操作" aria-hidden="true">#</a> 如何点右上角关闭[X]执行其他操作</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnClosing</span><span class="token punctuation">(</span><span class="token class-name">CancelEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Visible <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span>Cancel <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token comment">//    this.WindowState = FormWindowState.Minimized;</span>
        <span class="token function">Hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// otherwise, let the framework close the app</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>:窗口中如何实现对窗口右上解的关闭按钮编程</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在里面加入你的代码</p><hr><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SC_MAXIMIZE <span class="token operator">=</span> <span class="token number">0xF030</span><span class="token punctuation">;</span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Message</span> msg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>msg<span class="token punctuation">.</span>WParam <span class="token operator">==</span> SC_MAXIMIZE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Height <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","appctr6.html.vue"]]);export{i as default};
