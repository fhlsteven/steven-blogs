import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const o={},p=t(`<h1 id="简单实现系统托盘" tabindex="-1"><a class="header-anchor" href="#简单实现系统托盘" aria-hidden="true">#</a> 简单实现系统托盘</h1><p><strong>实现</strong>：</p><ol><li><p>添加 <code>contextMenu1</code> 上下文菜单控件。</p></li><li><p>添加 <code>notifyIcon1</code> 控件。并设置 <code>contextMenu</code> 属性。</p></li><li><p>创建显示的图标</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    notifyIcon1<span class="token punctuation">.</span>Icon <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Icon</span><span class="token punctuation">(</span><span class="token string">&quot;..\\\\..\\\\BICYCLE.ICO&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    notifyIcon1<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    notifyIcon1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;BICYCLE&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>让图标不停的变幻</p></li></ol><p>添加 timer控件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer1_Tick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>notifyIcon1<span class="token punctuation">.</span>Text <span class="token operator">==</span> <span class="token string">&quot;BICYCLE&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        notifyIcon1<span class="token punctuation">.</span>Icon <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Icon</span><span class="token punctuation">(</span><span class="token string">&quot;..\\\\..\\\\CARS.ICO&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        notifyIcon1<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;CARS&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        notifyIcon1<span class="token punctuation">.</span>Icon <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Icon</span><span class="token punctuation">(</span><span class="token string">&quot;..\\\\..\\\\BICYCLE.ICO&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        notifyIcon1<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;BICYCLE&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),c=[p];function e(u,l){return s(),a("div",null,c)}const k=n(o,[["render",e],["__file","bar1.html.vue"]]);export{k as default};
