import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="pc喇叭响和任务栏闪烁" tabindex="-1"><a class="header-anchor" href="#pc喇叭响和任务栏闪烁" aria-hidden="true">#</a> PC喇叭响和任务栏闪烁</h1><h2 id="pc喇叭响" tabindex="-1"><a class="header-anchor" href="#pc喇叭响" aria-hidden="true">#</a> PC喇叭响</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MessageBeep</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">uint</span></span> uType<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">MessageBeep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//PC喇叭响</span>
</code></pre></div><h2 id="任务栏闪烁" tabindex="-1"><a class="header-anchor" href="#任务栏闪烁" aria-hidden="true">#</a> 任务栏闪烁</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token comment">//--------------------------</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">FlashWindow</span><span class="token punctuation">(</span>
   <span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span>     <span class="token comment">// handle to window</span>
   <span class="token keyword">bool</span> bInvert   <span class="token comment">// flash status</span>
   <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//----------------------------------</span>
<span class="token function">FlashWindow</span><span class="token punctuation">(</span>handle<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//闪烁</span>
</code></pre></div>`,5),c=[e];function o(l,u){return s(),a("div",null,c)}const i=n(p,[["render",o],["__file","cspapi3.html.vue"]]);export{i as default};