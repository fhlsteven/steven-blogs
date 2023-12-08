import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="得到机器上所有正在运行的进程" tabindex="-1"><a class="header-anchor" href="#得到机器上所有正在运行的进程" aria-hidden="true">#</a> 得到机器上所有正在运行的进程</h1><p><strong>实现</strong>：</p><p>Process 类 :提供对本地和远程进程的访问并使您能够启动和停止本地系统进程。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>

<span class="token range operator">..</span><span class="token punctuation">.</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span> <span class="token class-name">Process</span> p <span class="token keyword">in</span> Process<span class="token punctuation">.</span><span class="token function">GetProcesses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//Console.WriteLine( p );</span>
    <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> p<span class="token punctuation">.</span>ProcessName<span class="token punctuation">;</span> <span class="token comment">//获取该进程的名称。</span>
    <span class="token class-name"><span class="token keyword">string</span></span> pc <span class="token operator">=</span> p<span class="token punctuation">.</span>MachineName<span class="token punctuation">;</span> <span class="token comment">//获取关联进程正在其上运行的计算机的名称</span>
    <span class="token range operator">..</span><span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
 
p<span class="token punctuation">.</span><span class="token function">Kill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//立即停止关联的进程。</span>
p<span class="token punctuation">.</span><span class="token function">WaitForExit</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//指示 Process 组件在指定的毫秒数内等待关联进程退出</span>
</code></pre></div>`,4),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","sysinfo17.html.vue"]]);export{i as default};
