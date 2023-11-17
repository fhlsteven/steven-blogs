import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="在c-net-中建立一个平滑的进度条" tabindex="-1"><a class="header-anchor" href="#在c-net-中建立一个平滑的进度条" aria-hidden="true">#</a> 在C# .NET 中建立一个平滑的进度条</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>本文内容
概述
建立一个自定义的进度条控件
建立一个简单的客户端应用
</code></pre></div><hr><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>本文描述了如何建立一个简单的、自定义的用户控件——一个平滑的进度条。</p><p>在早先的进度条控件版本中，例如在 Microsoft Windows Common Controls ActiveX 控件中提供的版本，您可以看到进度条有两种不同的视图。您可以通过设定 Scrolling 属性来设定 Standard 视图或是 Smooth 视图。 Smooth 视图提供了一个区域来平滑的显示进度， Standard 试图则看上去是由一个一个方块来表示进度的。</p><p>在 Visual C# .NET 中提供的进度条控件只支持 Standard 视图。</p><p>本文的代码样例揭示了如何建立一个有如下属性的控件：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Minimum。该属性表示了进度条的最小值。默认情况下是 0 ；您不能将该属性设为负值。
Maximum。该属性表示了进度条的最大值。默认情况下是 100 。
Value。该属性表示了进度条的当前值。该值必须介于 Minimum 和 Maximum 之间。
ProgressBarColor。该属性表示了进度条的颜色。
</code></pre></div><h2 id="建立一个自定义的进度条控件" tabindex="-1"><a class="header-anchor" href="#建立一个自定义的进度条控件" aria-hidden="true">#</a> 建立一个自定义的进度条控件</h2><p>1、按着下面的步骤，在 Visual C# .NET 中建立一个 Windows Control Library 项目：</p><p>a、打开 Microsoft Visual Studio .NET。<br> 　　b、点击 File 菜单，点击 New ，再点击 Project 。<br> 　　c、在 New Project 对话框中，在 Project Types 中选择 Visual C# Projects，然后在 Templates 中选择 Windows Control Library 。<br> 　　d、在 Name 框中，填上 SmoothProgressBar ，并点击 OK 。<br> 　　e、在 Project Explorer 中，重命名缺省的 class module ，将 UserControl1.cs 改为 SmoothProgressBar.cs 。<br> 　　f、在该 UserControl 对象的 Property 窗口中，将其 Name 属性从 UserControl1 改为 SmoothProgressBar 。</p><p>2、此时，您已经从 control 类继承了一个新类，并可以添加新的功能。但是，ProgressBar累是密封(sealed)的，不能再被继承。因此，您必须从头开始建立这个控件。</p><p>将下面的代码添加到UserControl模块中，就在“Windows Form Designer generated code”之后：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">int</span></span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// Minimum value for progress range</span>
<span class="token class-name"><span class="token keyword">int</span></span> max <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token comment">// Maximum value for progress range</span>
<span class="token class-name"><span class="token keyword">int</span></span> val <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>  <span class="token comment">// Current progress</span>
<span class="token class-name">Color</span> BarColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>Blue<span class="token punctuation">;</span>  <span class="token comment">// Color of progress meter</span>

<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnResize</span><span class="token punctuation">(</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Invalidate the control to get a repaint.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnPaint</span><span class="token punctuation">(</span><span class="token class-name">PaintEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Graphics</span> g <span class="token operator">=</span> e<span class="token punctuation">.</span>Graphics<span class="token punctuation">;</span>
    <span class="token class-name">SolidBrush</span> brush <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>BarColor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">float</span></span> percent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>val <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Rectangle</span> rect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">;</span>

    <span class="token comment">// Calculate area for drawing the progress.</span>
    rect<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span>rect<span class="token punctuation">.</span>Width <span class="token operator">*</span> percent<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Draw the progress meter.</span>
    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span>brush<span class="token punctuation">,</span> rect<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Draw a three-dimensional border around the control.</span>
    <span class="token function">Draw3DBorder</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Clean up.</span>
    brush<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Minimum
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> min<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Prevent a negative value.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Make sure that the minimum value is never set higher than the maximum value.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&gt;</span> max<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            min <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            min <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Ensure value is still in range</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">&lt;</span> min<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            val <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Invalidate the control to get a repaint.</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Maximum
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Make sure that the maximum value is never set lower than the minimum value.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> min<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            min <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        max <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>

        <span class="token comment">// Make sure that value is still in range.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">&gt;</span> max<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            val <span class="token operator">=</span> max<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Invalidate the control to get a repaint.</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Value
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> oldValue <span class="token operator">=</span> val<span class="token punctuation">;</span>

        <span class="token comment">// Make sure that the value does not stray outside the valid range.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> min<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            val <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&gt;</span> max<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            val <span class="token operator">=</span> max<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            val <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Invalidate only the changed area.</span>
        <span class="token class-name"><span class="token keyword">float</span></span> percent<span class="token punctuation">;</span>

        <span class="token class-name">Rectangle</span> newValueRect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">;</span>
        <span class="token class-name">Rectangle</span> oldValueRect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">;</span>

        <span class="token comment">// Use a new value to calculate the rectangle for progress.</span>
        percent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>val <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        newValueRect<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span>newValueRect<span class="token punctuation">.</span>Width <span class="token operator">*</span> percent<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Use an old value to calculate the rectangle for progress.</span>
        percent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>oldValue <span class="token operator">-</span> min<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        oldValueRect<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span>oldValueRect<span class="token punctuation">.</span>Width <span class="token operator">*</span> percent<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Rectangle</span> updateRect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Find only the part of the screen that must be updated.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newValueRect<span class="token punctuation">.</span>Width <span class="token operator">&gt;</span> oldValueRect<span class="token punctuation">.</span>Width<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            updateRect<span class="token punctuation">.</span>X <span class="token operator">=</span> oldValueRect<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Width<span class="token punctuation">;</span>
            updateRect<span class="token punctuation">.</span>Width <span class="token operator">=</span> newValueRect<span class="token punctuation">.</span>Width <span class="token operator">-</span> oldValueRect<span class="token punctuation">.</span>Width<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            updateRect<span class="token punctuation">.</span>X <span class="token operator">=</span> newValueRect<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Width<span class="token punctuation">;</span>
            updateRect<span class="token punctuation">.</span>Width <span class="token operator">=</span> oldValueRect<span class="token punctuation">.</span>Width <span class="token operator">-</span> newValueRect<span class="token punctuation">.</span>Width<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        updateRect<span class="token punctuation">.</span>Height <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">;</span>

        <span class="token comment">// Invalidate the intersection region only.</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invalidate</span><span class="token punctuation">(</span>updateRect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name">Color</span> ProgressBarColor
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> BarColor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        BarColor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>

        <span class="token comment">// Invalidate the control to get a repaint.</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw3DBorder</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> PenWidth <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Pens<span class="token punctuation">.</span>White<span class="token punctuation">.</span>Width<span class="token punctuation">;</span>

    g<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span>Pens<span class="token punctuation">.</span>DarkGray<span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">-</span> PenWidth<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span>Pens<span class="token punctuation">.</span>DarkGray<span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">-</span> PenWidth<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span>Pens<span class="token punctuation">.</span>White<span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">-</span> PenWidth<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">-</span> PenWidth<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">-</span> PenWidth<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span>Pens<span class="token punctuation">.</span>White<span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">-</span> PenWidth<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">-</span> PenWidth<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">-</span> PenWidth<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>3、在 Build 菜单中，点击 Build Solution 来编译整个项目。</p><h2 id="建立一个简单的客户端应用" tabindex="-1"><a class="header-anchor" href="#建立一个简单的客户端应用" aria-hidden="true">#</a> 建立一个简单的客户端应用</h2><p>1、在 File 菜单中，点击 New ，再点击Project。</p><p>2、在 Add New Project 对话框中，在 Project Types 中点击 Visual C# Projects，在 Templates 中点击 Windows Application，并点击 OK。</p><p>3、按照下面的步骤，在 Form 上添加两个 SmoothProgressBar 实例：</p><p>a、在 Tools 菜单上，点击 Customize Toolbox。<br> 　　b、点击 .NET Framework Components 页。<br> 　　c、点击 Browse，然后选中你在 Create a Custom ProgressBar Control 段中建立的 SmoothProgressBar.dll 文件。<br> 　　d、点击 OK。您可以看到在 toolbox 中已经有 SmoothProgressBar 控件了。<br> 　　e、从 toolbox 中拖两个 SmoothProgressBar 控件的实例到该 Windows Application 项目中的默认 form 上。</p><p>4、从 toolbox 页中拖一个 Timer 控件到 form 上。</p><p>5、将下面的代码添加到 Timer 控件的 Tick 事件中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>smoothProgressBar1<span class="token punctuation">.</span>Value <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>smoothProgressBar1<span class="token punctuation">.</span>Value<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>smoothProgressBar2<span class="token punctuation">.</span>Value<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>6、从 toolbox 页中拖一个 Button 控件到 form 上。</p><p>7、将下面的代码添加到 Button 控件的 Click 事件中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">this</span><span class="token punctuation">.</span>smoothProgressBar1<span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>smoothProgressBar2<span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Interval <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre></div><p>8、在 Debug 菜单中，点击 Start 来运行样例项目。</p><p>9、点击Button。注意观察那两个进度指示器。一个逐渐减小，另一个逐渐增加。</p>`,29),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","progmif4.html.vue"]]);export{i as default};
