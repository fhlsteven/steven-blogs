import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const o={},p=t(`<h1 id="检查windows版本" tabindex="-1"><a class="header-anchor" href="#检查windows版本" aria-hidden="true">#</a> 检查Windows版本</h1><h2 id="如何-使用-visual-c-net-检查-windows-版本-q304283" tabindex="-1"><a class="header-anchor" href="#如何-使用-visual-c-net-检查-windows-版本-q304283" aria-hidden="true">#</a> 如何：使用 Visual C# .NET 检查 Windows 版本 (Q304283)</h2><hr><p><strong>本文内容</strong>：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>概述
需求
获取 Windows 版本数据
获取 Windows 系统信息
判断平台
判断 Windows 95, Windows 98, Windows 98 第二版或 Windows Me 的版本
判断 Windows NT, Windows 2000, 或 Windows XP 的版本
编译样例
</code></pre></div><hr><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3><p>本文描述了如何检查您的应用运行于哪个操作系统上。本文区分了 Microsoft Windows 95, Microsoft Windows 98, Microsoft Windows 98 第二版, Microsoft Windows Millennium Edition (Windows Me), Microsoft Windows NT 3.51, Microsoft Windows NT 4.0, Microsoft Windows 2000, 和 Microsoft Windows XP。</p><h3 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h3><p>Microsoft Visual C# .NET<br> 对 Visual C# 编程有一定理解</p><h3 id="获取-windows-版本数据" tabindex="-1"><a class="header-anchor" href="#获取-windows-版本数据" aria-hidden="true">#</a> 获取 Windows 版本数据</h3><p>为了检查操作系统，您必须获取下列数据：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>+--------------------------------------------------------------+
|           |Windows|Windows|Windows|Windows NT|Windows|Windows|
|           |  95   |  98   |  Me   |    4.0   | 2000  |  XP   |
+--------------------------------------------------------------+
|PlatformID | 1     | 1     | 1     | 2        | 2     | 2     |
+--------------------------------------------------------------+
|主版本号    | 4     | 4     | 4     | 4        | 5     | 5     |
+--------------------------------------------------------------+
|副版本号    | 0     | 10    | 90    | 0        | 0     | 1     |
+--------------------------------------------------------------+
</code></pre></div><p>注释：尽管本文的代码在所有 32-bit 版本的 Windows 上验证过，但 Windows 95 和 Windows NT 3.51 不支持 Microsoft Visual Studio .NET 或者 common language runtime。</p><h3 id="获取-windows-系统信息" tabindex="-1"><a class="header-anchor" href="#获取-windows-系统信息" aria-hidden="true">#</a> 获取 Windows 系统信息</h3><p>在 System 命名空间中包含了一个名为 OperatingSystem 的类。在 OperatingSystem 类中的属性提供了正在使用的操作系统信息。System.Environment 类中的 OSVersion 属性返回一个 OperatingSystem 对象。</p><p><code>System.OperatingSystem osInfo = System.Environment.OSVersion;</code></p><h3 id="判断平台" tabindex="-1"><a class="header-anchor" href="#判断平台" aria-hidden="true">#</a> 判断平台</h3><p>判断操作系统的第一步就是辨别正在使用的是哪个操作系统。您可以使用 OperatingSystem 类中的 PlatformID 属性来决定在用的是哪个操作系统。</p><p>例如，枚举类型属性 Win32Windows 的值指明了下列操作系统之一：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Windows 95
Windows 98
Windows 98 Second Edition
Windows Me
</code></pre></div><p>类似的，WinNT 属性的值指明了下列操作系统之一：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Windows NT 3.51
Windows NT 4.0
Windows 2000
Windows XP
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Platform<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32Windows<span class="token punctuation">:</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Code to determine specific version of Windows 95,</span>
        <span class="token comment">// Windows 98, Windows 98 Second Edition, or Windows Me.</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32NT<span class="token punctuation">:</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Code to determine specific version of Windows NT 3.51, </span>
        <span class="token comment">// Windows NT 4.0, Windows 2000, or Windows XP.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="判断-windows-95-windows-98-windows-98-第二版或-windows-me-的版本" tabindex="-1"><a class="header-anchor" href="#判断-windows-95-windows-98-windows-98-第二版或-windows-me-的版本" aria-hidden="true">#</a> 判断 Windows 95, Windows 98, Windows 98 第二版或 Windows Me 的版本</h3><p>如果您想判断 Windows 95, Windows 98, Windows 98 第二版或 Windows Me 的版本，您可以分析主版本号和副版本号。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Platform is Windows 95, Windows 98, Windows 98 Second Edition,</span>
<span class="token comment">// or Windows Me.</span>
<span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32Windows<span class="token punctuation">:</span>

<span class="token keyword">switch</span> <span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Minor<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
        Console<span class="token punctuation">.</span>WriteLine <span class="token punctuation">(</span><span class="token string">&quot;Windows 95&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Revision<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token string">&quot;2222A&quot;</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 98 Second Edition&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 98&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span>  <span class="token number">90</span><span class="token punctuation">:</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows Me&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="判断-windows-nt-windows-2000-或-windows-xp-的版本" tabindex="-1"><a class="header-anchor" href="#判断-windows-nt-windows-2000-或-windows-xp-的版本" aria-hidden="true">#</a> 判断 Windows NT, Windows 2000, 或 Windows XP 的版本</h3><p>如果您想判断 Windows NT, Windows 2000, 或 Windows XP 的版本，您也可以分析主版本号和副版本号。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Platform is Windows NT 3.51, Windows NT 4.0, Windows 2000,</span>
<span class="token comment">// or Windows XP.</span>
<span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32NT<span class="token punctuation">:</span>

<span class="token keyword">switch</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Major<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 3.51&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 4.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Minor<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> 
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 2000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows XP&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="编译样例" tabindex="-1"><a class="header-anchor" href="#编译样例" aria-hidden="true">#</a> 编译样例</h3><p>下一步就是编译一个项目来测试功能：</p><p>在 Visual Studio .NET 中，打开一个新的 C# console 应用。系统会默认打开 Class1.cs 的代码窗口。<br> 用下面的代码替换所有 Class1.cs 中的代码：?</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">determineOS_CS</span>
<span class="token punctuation">{</span>  
<span class="token keyword">class</span> <span class="token class-name">Class1</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token comment">// Get OperatingSystem information from the system namespace.</span>
         <span class="token class-name">System<span class="token punctuation">.</span>OperatingSystem</span> osInfo <span class="token operator">=</span>System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>OSVersion<span class="token punctuation">;</span>

         <span class="token comment">// Determine the platform.</span>
         <span class="token keyword">switch</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Platform<span class="token punctuation">)</span>
         <span class="token punctuation">{</span>
            <span class="token comment">// Platform is Windows 95, Windows 98, </span>
            <span class="token comment">// Windows 98 Second Edition, or Windows Me.</span>
            <span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32Windows<span class="token punctuation">:</span>
         
               <span class="token keyword">switch</span> <span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Minor<span class="token punctuation">)</span>
               <span class="token punctuation">{</span>
                  <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
                     Console<span class="token punctuation">.</span>WriteLine <span class="token punctuation">(</span><span class="token string">&quot;Windows 95&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
                  <span class="token keyword">case</span> <span class="token number">10</span><span class="token punctuation">:</span>
                     <span class="token keyword">if</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Revision<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token string">&quot;2222A&quot;</span><span class="token punctuation">)</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 98 Second Edition&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">else</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 98&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
                  <span class="token keyword">case</span>  <span class="token number">90</span><span class="token punctuation">:</span>
                     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows Me&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
               <span class="token punctuation">}</span>
               <span class="token keyword">break</span><span class="token punctuation">;</span>
         
            <span class="token comment">// Platform is Windows NT 3.51, Windows NT 4.0, Windows 2000,</span>
            <span class="token comment">// or Windows XP.</span>
            <span class="token keyword">case</span> System<span class="token punctuation">.</span>PlatformID<span class="token punctuation">.</span>Win32NT<span class="token punctuation">:</span> 
               <span class="token keyword">switch</span><span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Major<span class="token punctuation">)</span> 
               <span class="token punctuation">{</span>
                  <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
                     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 3.51&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
                  <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
                     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows NT 4.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
                  <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span>
                     <span class="token keyword">if</span> <span class="token punctuation">(</span>osInfo<span class="token punctuation">.</span>Version<span class="token punctuation">.</span>Minor<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> 
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows 2000&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">else</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Windows XP&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     <span class="token keyword">break</span><span class="token punctuation">;</span>
               <span class="token punctuation">}</span><span class="token keyword">break</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         Console<span class="token punctuation">.</span>ReadLine <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,34),e=[p];function c(i,u){return s(),a("div",null,e)}const k=n(o,[["render",c],["__file","sysop3.html.vue"]]);export{k as default};
