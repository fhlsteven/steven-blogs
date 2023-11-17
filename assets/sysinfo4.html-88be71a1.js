import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="如何用c-实时获取cpu利用率" tabindex="-1"><a class="header-anchor" href="#如何用c-实时获取cpu利用率" aria-hidden="true">#</a> 如何用C＃实时获取CPU利用率</h1><blockquote><p>未知 csdn 2002-12-23</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CpuLoadInfo</span>
<span class="token punctuation">{</span>
    <span class="token comment">// auxiliary print methods</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Say</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> txt<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>txt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// auxiliary print methods </span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The main method. Command line arguments are ignored.</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;$Id: CpuLoadInfo.cs,v 1.2 2002/08/17 17:45:48 rz65 Exp $&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Attempt to create a PerformanceCounter instance:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Category name = &quot;</span> <span class="token operator">+</span> CategoryName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Counter name  = &quot;</span> <span class="token operator">+</span> CounterName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Instance name = &quot;</span> <span class="token operator">+</span> InstanceName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PerformanceCounter</span> pc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PerformanceCounter</span><span class="token punctuation">(</span>CategoryName<span class="token punctuation">,</span> CounterName<span class="token punctuation">,</span> InstanceName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Performance counter was created.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Property CounterType: &quot;</span> <span class="token operator">+</span> pc<span class="token punctuation">.</span>CounterType<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Property CounterHelp: &quot;</span> <span class="token operator">+</span> pc<span class="token punctuation">.</span>CounterHelp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;Entering measurement loop.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// wait for 1 second</span>
            <span class="token class-name"><span class="token keyword">float</span></span> cpuLoad <span class="token operator">=</span> pc<span class="token punctuation">.</span><span class="token function">Nextvalue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Say</span><span class="token punctuation">(</span><span class="token string">&quot;CPU load = &quot;</span> <span class="token operator">+</span> cpuLoad <span class="token operator">+</span> <span class="token string">&quot; %.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// constants used to select the performance counter.</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> CategoryName <span class="token operator">=</span> <span class="token string">&quot;Processor&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> CounterName <span class="token operator">=</span> <span class="token string">&quot;% Processor Time&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> InstanceName <span class="token operator">=</span> <span class="token string">&quot;_Total&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div><p>这是在我计算机上的计算结果：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Entering measurement loop.
CPU load = 0 %.
CPU load = 1.941746 %.
CPU load = 4.854369 %.
CPU load = 10 %.
CPU load = 0 %.
CPU load = 2.999997 %.
CPU load = 0.9900987 %.
CPU load = 0 %.
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysinfo4.html.vue"]]);export{i as default};
