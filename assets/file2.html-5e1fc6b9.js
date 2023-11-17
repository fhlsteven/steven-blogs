import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="通过c-程序调用外部程序" tabindex="-1"><a class="header-anchor" href="#通过c-程序调用外部程序" aria-hidden="true">#</a> 通过C#程序调用外部程序</h1><blockquote><p>源作者：追风 人气：6038</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*
* 编程语言：Visual Studio .NET C# (Beta 2)
* 功    能：通过C#程序调用 Windows 记事本程序 编辑一个
* 名为 test.txt 的文本文件。
*
* 在整个程序中 System.Diagnostics.Process.Start(Info)
* 为主要语句。
* 如果只是单独执行一个外部程序，可用一条如下代码即可：
* System.Diagnostics.Process.Start(
* &quot;外部程序名&quot;,&quot;启动参数&quot;);
*/</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//声明一个程序信息类</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>ProcessStartInfo</span> Info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>ProcessStartInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//设置外部程序名</span>
        Info<span class="token punctuation">.</span>FileName <span class="token operator">=</span> <span class="token string">&quot;notepad.exe&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//设置外部程序的启动参数（命令行参数）为test.txt</span>
        Info<span class="token punctuation">.</span>Arguments <span class="token operator">=</span> <span class="token string">&quot;test.txt&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//设置外部程序工作目录为 C:\\</span>
        Info<span class="token punctuation">.</span>WorkingDirectory <span class="token operator">=</span> <span class="token string">&quot;C:\\\\&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">//声明一个程序类</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process</span> Proc<span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">//启动外部程序</span>
            <span class="token comment">//</span>
            Proc <span class="token operator">=</span> System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>Info<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Win32Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;系统找不到指定的程序文件。\\r{0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//打印出外部程序的开始执行时间</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;外部程序的开始执行时间：{0}&quot;</span><span class="token punctuation">,</span> Proc<span class="token punctuation">.</span>StartTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//等待3秒钟</span>
        Proc<span class="token punctuation">.</span><span class="token function">WaitForExit</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//如果这个外部程序没有结束运行则对其强行终止</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Proc<span class="token punctuation">.</span>HasExited <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;由主程序强行终止外部程序的运行！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Proc<span class="token punctuation">.</span><span class="token function">Kill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;由外部程序正常退出！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;外部程序的结束运行时间：{0}&quot;</span><span class="token punctuation">,</span> Proc<span class="token punctuation">.</span>ExitTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;外部程序在结束运行时的返回值：{0}&quot;</span><span class="token punctuation">,</span> Proc<span class="token punctuation">.</span>ExitCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","file2.html.vue"]]);export{k as default};
