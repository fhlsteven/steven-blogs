import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-tips-设置文本框光标的位置" tabindex="-1"><a class="header-anchor" href="#c-tips-设置文本框光标的位置" aria-hidden="true">#</a> C# tips- 设置文本框光标的位置</h1><p><strong>问题</strong>：</p><p>希望设置TextBox 中的光标到任意位置。</p><p>设置SelectStart 和Length 不一地起作用，并不希望选中文本。</p><p><strong>解决方案</strong>：</p><p>使用一下代码就可以</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices<span class="token punctuation">.</span>DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">SendMessage</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> msg<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> wParam<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetCursorPosofTextBox</span><span class="token punctuation">(</span><span class="token class-name">TextBox</span> txb<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> pos<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    txb<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SendMessage</span><span class="token punctuation">(</span>txb<span class="token punctuation">.</span>Handle<span class="token punctuation">,</span><span class="token number">177</span><span class="token punctuation">,</span>pos<span class="token punctuation">,</span>pos<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>调用</strong>：</p><p><code>SetCursorPosofTextBox(this.textBox1,3);</code></p>`,9),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","toolbox31.html.vue"]]);export{i as default};