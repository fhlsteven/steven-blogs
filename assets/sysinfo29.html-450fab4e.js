import{_ as s,o as n,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="如何得到我本地机器的所有ip" tabindex="-1"><a class="header-anchor" href="#如何得到我本地机器的所有ip" aria-hidden="true">#</a> 如何得到我本地机器的所有IP？</h1><blockquote><p>作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-6-15 8:56:15</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span>C#<span class="token punctuation">]</span>  
<span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>  
<span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPAddress<span class="token punctuation">[</span><span class="token punctuation">]</span></span> addressList <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>AddressList<span class="token punctuation">;</span> 
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> addressList<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
    s <span class="token operator">+=</span> addressList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span> 
textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> s<span class="token punctuation">;</span>
</code></pre></div><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>[VB<span class="token punctuation">.</span>NET]

<span class="token keyword">Dim</span> s <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>  
<span class="token keyword">Dim</span> addressList <span class="token keyword">As</span> System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPAddress<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> Dns<span class="token punctuation">.</span>GetHostByName<span class="token punctuation">(</span>Dns<span class="token punctuation">.</span>GetHostName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>AddressList 

<span class="token keyword">Dim</span> i <span class="token keyword">As</span> <span class="token keyword">Integer</span>  
<span class="token keyword">For</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">To</span> addressList<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span>  
    s <span class="token operator">+</span><span class="token operator">=</span> addressList<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>ToString<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> ControlChars<span class="token punctuation">.</span>Lf  
<span class="token keyword">Next</span> i 
textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> s
</code></pre></div>`,4),e=[o];function c(u,l){return n(),a("div",null,e)}const i=s(p,[["render",c],["__file","sysinfo29.html.vue"]]);export{i as default};