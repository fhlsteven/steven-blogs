import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},e=t(`<h1 id="c-小经验" tabindex="-1"><a class="header-anchor" href="#c-小经验" aria-hidden="true">#</a> C#小经验</h1><h2 id="c-的回车换行表示法" tabindex="-1"><a class="header-anchor" href="#c-的回车换行表示法" aria-hidden="true">#</a> c#的回车换行表示法</h2><p>使用 <code>System.Enviroment.NewLine</code>，因为换行的表示方法会在不同的操作系统上有区别。</p><hr><h2 id="反射生成窗体" tabindex="-1"><a class="header-anchor" href="#反射生成窗体" aria-hidden="true">#</a> 反射生成窗体</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">buuton1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Assembly</span> _myAssembly <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">LoadFrom</span><span class="token punctuation">(</span><span class="token string">@&quot;e:windowsApplication6.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Type</span> _myType <span class="token operator">=</span> _myAssembly<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span> <span class="token string">&quot;WindowsApplication6.Form1&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">;</span>
    obj <span class="token operator">=</span> Activator<span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span> _myType <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Form</span> frmform <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    frmform <span class="token operator">=</span> <span class="token punctuation">(</span>Form<span class="token punctuation">)</span>obj<span class="token punctuation">;</span>
    frmform<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr>`,7),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(p,[["render",c],["__file","cspbasesexps.html.vue"]]);export{i as default};