import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="读写注册表" tabindex="-1"><a class="header-anchor" href="#读写注册表" aria-hidden="true">#</a> 读写注册表</h1><h2 id="写注册表" tabindex="-1"><a class="header-anchor" href="#写注册表" aria-hidden="true">#</a> 写注册表</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">RegistryKey</span> regWrite<span class="token punctuation">;</span>
<span class="token comment">//往HKEY_CURRENT_USER主键里的Software子键下写一个名为“Test”的子键</span>
<span class="token comment">//如果Test子键已经存在系统会自动覆盖它</span>
regWrite <span class="token operator">=</span> Registry<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;Software\\\\Test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//往Test子键里添两条数据项，一条名为&quot;Name&quot;,另一条名为&quot;Sex&quot;</span>
<span class="token comment">//值分别是&quot;luolie&quot;,&quot;男&quot;</span>
regWrite<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;luolie&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
regWrite<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;Sex&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;男&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//关闭该对象</span>
regWrite<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="读注册表" tabindex="-1"><a class="header-anchor" href="#读注册表" aria-hidden="true">#</a> 读注册表</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">RegistryKey</span> regRead<span class="token punctuation">;</span>
<span class="token comment">//读取HKEY_CURRENT_USER主键里的Software子键下名为“Test”的子键</span>
regRead<span class="token operator">=</span> Registry<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;Software\\\\Test&quot;</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>regRead<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">//如果该子键不存在</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;No Data!&quot;</span><span class="token punctuation">)</span>；
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token operator">=</span> regRead<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//读取“Name”项的值</span>
    textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">//显示在TextBox里</span>
<span class="token punctuation">}</span>
<span class="token comment">//关闭该对象</span>
oReg<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","sysinfo14.html.vue"]]);export{k as default};
