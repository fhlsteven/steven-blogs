import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},e=t(`<h1 id="分类枚举指定计算机的服务" tabindex="-1"><a class="header-anchor" href="#分类枚举指定计算机的服务" aria-hidden="true">#</a> 分类枚举指定计算机的服务</h1><h2 id="_1。添加引用" tabindex="-1"><a class="header-anchor" href="#_1。添加引用" aria-hidden="true">#</a> 1。添加引用</h2><p>System.ServiceProcess.dll</p><h2 id="_2-using" tabindex="-1"><a class="header-anchor" href="#_2-using" aria-hidden="true">#</a> 2 using</h2><p>using System.ServiceProcess; using System.Diagnostics;</p><h2 id="_3-得到本机的名称" tabindex="-1"><a class="header-anchor" href="#_3-得到本机的名称" aria-hidden="true">#</a> 3 得到本机的名称</h2><p><code>this.textBox1.Text=System.Environment.MachineName;</code></p><h2 id="_4-code" tabindex="-1"><a class="header-anchor" href="#_4-code" aria-hidden="true">#</a> 4 code</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">ServiceController<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ArraySrvCtrl<span class="token punctuation">;</span>
<span class="token comment">//在ArraySrvCtrl数组中存储所有服务</span>
ArraySrvCtrl <span class="token operator">=</span> ServiceController<span class="token punctuation">.</span><span class="token function">GetServices</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">ServiceController</span> tempSC <span class="token keyword">in</span> ArraySrvCtrl<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>tempSC<span class="token punctuation">.</span>Status <span class="token operator">==</span> ServiceControllerStatus<span class="token punctuation">.</span>Running<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//将正在运行的服务添加到listBox1中</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tempSC<span class="token punctuation">.</span>DisplayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>tempSC<span class="token punctuation">.</span>Status <span class="token operator">==</span> ServiceControllerStatus<span class="token punctuation">.</span>Paused<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>  
        <span class="token comment">//&#39;将暂停的服务添加到listBox3中</span>
        listBox3<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tempSC<span class="token punctuation">.</span>DisplayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//&#39;将停止的服务添加到listBox2中</span>
        listBox2<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tempSC<span class="token punctuation">.</span>DisplayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,9),o=[e];function c(u,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","sysinfo15.html.vue"]]);export{r as default};
