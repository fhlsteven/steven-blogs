import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="一个不规则窗口界面的示例-原创" tabindex="-1"><a class="header-anchor" href="#一个不规则窗口界面的示例-原创" aria-hidden="true">#</a> 一个不规则窗口界面的示例（原创）</h1><blockquote><p>www.wenhui.org 10/23/2002 CSharp vs Java</p></blockquote><p>椭圆开窗体</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">EllipseClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Rectangle</span> ellipseBounds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Brush</span> solidAzureBrush <span class="token operator">=</span> Brushes<span class="token punctuation">.</span>Yellow<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Point</span> m_pOffset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">EllipseClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;不规则图形&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>StartPosition <span class="token operator">=</span> FormStartPosition<span class="token punctuation">.</span>CenterScreen<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>FormBorderStyle <span class="token operator">=</span> FormBorderStyle<span class="token punctuation">.</span>None<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>TransparencyKey <span class="token operator">=</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnPaint</span><span class="token punctuation">(</span><span class="token class-name">PaintEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnPaint</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Graphics</span> dc <span class="token operator">=</span> e<span class="token punctuation">.</span>Graphics<span class="token punctuation">;</span>
        dc<span class="token punctuation">.</span><span class="token function">FillEllipse</span><span class="token punctuation">(</span>solidAzureBrush<span class="token punctuation">,</span> ellipseBounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseDown</span><span class="token punctuation">(</span><span class="token class-name">MouseEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnMouseDown</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_pOffset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//Console.WriteLine(&quot;Down X:{0} ,Y:{1}&quot;,m_pOffset.X,m_pOffset.Y); </span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseMove</span><span class="token punctuation">(</span><span class="token class-name">MouseEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnMouseMove</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Button <span class="token operator">==</span> MouseButtons<span class="token punctuation">.</span>Left<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Point</span> mousePos <span class="token operator">=</span> Control<span class="token punctuation">.</span>MousePosition<span class="token punctuation">;</span>
            <span class="token comment">//Console.WriteLine(&quot;Move X:{0} ,Y:{1}&quot;,mousePos.X,mousePos.Y); </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>mousePos<span class="token punctuation">.</span>X <span class="token operator">-</span> m_pOffset<span class="token punctuation">.</span>X<span class="token punctuation">,</span> mousePos<span class="token punctuation">.</span>Y <span class="token operator">-</span> m_pOffset<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Console.WriteLine(&quot;Location X:{0} ,Y:{1}&quot;,this.Location.X,this.Location.Y); </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">EllipseClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>原作者：痕迹
来 源：本站
共有356位读者阅读过此文
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","win20.html.vue"]]);export{i as default};
