import{_ as s,o as n,c as a,a as t}from"./app-a2b6e588.js";const p={},e=t(`<h1 id="设置应用程序的热键" tabindex="-1"><a class="header-anchor" href="#设置应用程序的热键" aria-hidden="true">#</a> 设置应用程序的热键</h1><p>实现：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices<span class="token punctuation">.</span>DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SendMessage</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hwnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> wMsg<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> wParam<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_SETHOTKEY <span class="token operator">=</span> <span class="token number">0x0032</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> HOTKEYF_ALT <span class="token operator">=</span> <span class="token number">0x0004</span><span class="token punctuation">;</span>


<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> wHotkey<span class="token punctuation">;</span>
    wHotkey <span class="token operator">=</span> <span class="token punctuation">(</span>HOTKEYF_ALT<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0x0100</span> <span class="token operator">+</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span>
    <span class="token function">SendMessage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">,</span> WM_SETHOTKEY<span class="token punctuation">,</span> wHotkey<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),o=[e];function c(l,k){return n(),a("div",null,o)}const r=s(p,[["render",c],["__file","appctr20.html.vue"]]);export{r as default};
