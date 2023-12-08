import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="如何让应用程序只有一个实例在运行" tabindex="-1"><a class="header-anchor" href="#如何让应用程序只有一个实例在运行" aria-hidden="true">#</a> 如何让应用程序只有一个实例在运行</h1><blockquote><p>作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-6-16 8:29:21</p></blockquote><p>MyForm.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OneInstnace</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//得到正在运行的例程</span>
        <span class="token class-name">Process</span> instance <span class="token operator">=</span> <span class="token function">RunningInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//如果没有其它例程，就新建一个窗体</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//处理发现的例程</span>
            <span class="token function">HandleRunningInstance</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Process</span> <span class="token function">RunningInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Process</span> current <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Process<span class="token punctuation">[</span><span class="token punctuation">]</span></span> processes <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetProcessesByName</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>ProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//遍历正在有相同名字运行的例程</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Process</span> process <span class="token keyword">in</span> processes<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//忽略现有的例程</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>Id <span class="token operator">!=</span> current<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//确保例程从EXE文件运行</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span>
                  current<span class="token punctuation">.</span>MainModule<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//返回另一个例程实例</span>
                    <span class="token keyword">return</span> process<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//没有其它的例程，返回Null</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">HandleRunningInstance</span><span class="token punctuation">(</span><span class="token class-name">Process</span> instance<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//确保窗口没有被最小化或最大化</span>
        <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>MainWindowHandle<span class="token punctuation">,</span> WS_SHOWNORMAL<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//设置真实例程为foreground window</span>
        <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>MainWindowHandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> cmdShow<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WS_SHOWNORMAL <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","appctr10.html.vue"]]);export{i as default};
