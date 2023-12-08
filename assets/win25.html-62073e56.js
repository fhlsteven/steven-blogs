import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="实现outlookbar" tabindex="-1"><a class="header-anchor" href="#实现outlookbar" aria-hidden="true">#</a> 实现OutlookBar</h1><p>实现：</p><p>利用OutlookBar命名空间</p><p>OutlookBar.cs：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">OutlookBar</span>
<span class="token punctuation">{</span>
    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">BandTagInfo</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">OutlookBar</span> outlookBar<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">BandTagInfo</span><span class="token punctuation">(</span><span class="token class-name">OutlookBar</span> ob<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            outlookBar <span class="token operator">=</span> ob<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> index<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OutlookBar</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Panel</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> buttonHeight<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> selectedBand<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> selectedBandHeight<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ButtonHeight
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> buttonHeight<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                buttonHeight <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
                <span class="token comment">// do recalc layout for entire bar</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SelectedBand
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> selectedBand<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                <span class="token function">SelectBand</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">OutlookBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            buttonHeight <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span>
            selectedBand <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            selectedBandHeight <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// parent must exist!</span>
            Parent<span class="token punctuation">.</span>SizeChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>SizeChangedEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddBand</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">,</span> <span class="token class-name">ContentPanel</span> content<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            content<span class="token punctuation">.</span>outlookBar <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> index <span class="token operator">=</span> Controls<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
            <span class="token class-name">BandTagInfo</span> bti <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BandTagInfo</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BandPanel</span> bandPanel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BandPanel</span><span class="token punctuation">(</span>caption<span class="token punctuation">,</span> content<span class="token punctuation">,</span> bti<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>bandPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">UpdateBarInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">RecalcLayout</span><span class="token punctuation">(</span>bandPanel<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SelectBand</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            selectedBand <span class="token operator">=</span> index<span class="token punctuation">;</span>
            <span class="token function">RedrawBands</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RedrawBands</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> Controls<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">BandPanel</span> bp <span class="token operator">=</span> Controls<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token class-name">BandPanel</span><span class="token punctuation">;</span>
                <span class="token function">RecalcLayout</span><span class="token punctuation">(</span>bp<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateBarInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            selectedBandHeight <span class="token operator">=</span> ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">-</span> <span class="token punctuation">(</span>Controls<span class="token punctuation">.</span>Count <span class="token operator">*</span> buttonHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RecalcLayout</span><span class="token punctuation">(</span><span class="token class-name">BandPanel</span> bandPanel<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> vPos <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;=</span> selectedBand<span class="token punctuation">)</span> <span class="token punctuation">?</span> buttonHeight <span class="token operator">*</span> index <span class="token punctuation">:</span> buttonHeight <span class="token operator">*</span> index <span class="token operator">+</span> selectedBandHeight<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> height <span class="token operator">=</span> selectedBand <span class="token operator">==</span> index <span class="token punctuation">?</span> selectedBandHeight <span class="token operator">+</span> buttonHeight <span class="token punctuation">:</span> buttonHeight<span class="token punctuation">;</span>

            <span class="token comment">// the band dimensions</span>
            bandPanel<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> vPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
            bandPanel<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>ClientRectangle<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// the contained button dimensions</span>
            bandPanel<span class="token punctuation">.</span>Controls<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            bandPanel<span class="token punctuation">.</span>Controls<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>ClientRectangle<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> buttonHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// the contained content panel dimensions</span>
            bandPanel<span class="token punctuation">.</span>Controls<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> buttonHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
            bandPanel<span class="token punctuation">.</span>Controls<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> height <span class="token operator">-</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SizeChangedEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>Size<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>Control<span class="token punctuation">)</span>sender<span class="token punctuation">)</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">UpdateBarInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">RedrawBands</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">BandPanel</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Panel</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">BandPanel</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">,</span> <span class="token class-name">ContentPanel</span> content<span class="token punctuation">,</span> <span class="token class-name">BandTagInfo</span> bti<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">BandButton</span> bandButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BandButton</span><span class="token punctuation">(</span>caption<span class="token punctuation">,</span> bti<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>bandButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">BandButton</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Button</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">BandTagInfo</span> bti<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">BandButton</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">,</span> <span class="token class-name">BandTagInfo</span> bti<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Text <span class="token operator">=</span> caption<span class="token punctuation">;</span>
            FlatStyle <span class="token operator">=</span> FlatStyle<span class="token punctuation">.</span>Standard<span class="token punctuation">;</span>
            Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>bti <span class="token operator">=</span> bti<span class="token punctuation">;</span>
            Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>SelectBand<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SelectBand</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            bti<span class="token punctuation">.</span>outlookBar<span class="token punctuation">.</span><span class="token function">SelectBand</span><span class="token punctuation">(</span>bti<span class="token punctuation">.</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ContentPanel</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Panel</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">OutlookBar</span> outlookBar<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">ContentPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// initial state</span>
            Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IconPanel</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ContentPanel</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">protected</span> <span class="token class-name"><span class="token keyword">int</span></span> iconSpacing<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name"><span class="token keyword">int</span></span> margin<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> IconSpacing
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> iconSpacing<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Margin
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> margin<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">IconPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            margin <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
            iconSpacing <span class="token operator">=</span> <span class="token number">32</span> <span class="token operator">+</span> <span class="token number">15</span> <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// icon height + text height + margin</span>
            BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>LightBlue<span class="token punctuation">;</span>
            AutoScroll <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">,</span> <span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> onClickEvent<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> index <span class="token operator">=</span> Controls<span class="token punctuation">.</span>Count <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// two entries per icon</span>
            <span class="token class-name">PanelIcon</span> panelIcon <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PanelIcon</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> image<span class="token punctuation">,</span> index<span class="token punctuation">,</span> onClickEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>panelIcon<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Label</span> label <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Text <span class="token operator">=</span> caption<span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> margin <span class="token operator">+</span> image<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Height <span class="token operator">+</span> index <span class="token operator">*</span> iconSpacing<span class="token punctuation">)</span><span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>Size<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>TextAlign <span class="token operator">=</span> ContentAlignment<span class="token punctuation">.</span>TopCenter<span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Click <span class="token operator">+=</span> onClickEvent<span class="token punctuation">;</span>
            label<span class="token punctuation">.</span>Tag <span class="token operator">=</span> panelIcon<span class="token punctuation">;</span>
            Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>label<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PanelIcon</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">PictureBox</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">IconPanel</span> iconPanel<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">Color</span> bckgColor<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> mouseEnter<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Index
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> index<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">PanelIcon</span><span class="token punctuation">(</span><span class="token class-name">IconPanel</span> parent<span class="token punctuation">,</span> <span class="token class-name">Image</span> image<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> onClickEvent<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> index<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>iconPanel <span class="token operator">=</span> parent<span class="token punctuation">;</span>
            Image <span class="token operator">=</span> image<span class="token punctuation">;</span>
            Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>iconPanel<span class="token punctuation">.</span>outlookBar<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">-</span> image<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>
                iconPanel<span class="token punctuation">.</span>Margin <span class="token operator">+</span> index <span class="token operator">*</span> iconPanel<span class="token punctuation">.</span>IconSpacing<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Size <span class="token operator">=</span> image<span class="token punctuation">.</span>Size<span class="token punctuation">;</span>
            Click <span class="token operator">+=</span> onClickEvent<span class="token punctuation">;</span>
            Tag <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

            MouseEnter <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>OnMouseEnter<span class="token punctuation">)</span><span class="token punctuation">;</span>
            MouseLeave <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>OnMouseLeave<span class="token punctuation">)</span><span class="token punctuation">;</span>
            MouseMove <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MouseEventHandler</span><span class="token punctuation">(</span>OnMouseMove<span class="token punctuation">)</span><span class="token punctuation">;</span>

            bckgColor <span class="token operator">=</span> iconPanel<span class="token punctuation">.</span>BackColor<span class="token punctuation">;</span>
            mouseEnter <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseMove</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MouseEventArgs</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>X <span class="token operator">&lt;</span> Size<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
             <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Y <span class="token operator">&lt;</span> Size<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
             <span class="token punctuation">(</span><span class="token operator">!</span>mouseEnter<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>LightCyan<span class="token punctuation">;</span>
                BorderStyle <span class="token operator">=</span> BorderStyle<span class="token punctuation">.</span>FixedSingle<span class="token punctuation">;</span>
                Location <span class="token operator">=</span> Location <span class="token operator">-</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                mouseEnter <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseEnter</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseLeave</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>mouseEnter<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                BackColor <span class="token operator">=</span> bckgColor<span class="token punctuation">;</span>
                BorderStyle <span class="token operator">=</span> BorderStyle<span class="token punctuation">.</span>None<span class="token punctuation">;</span>
                Location <span class="token operator">=</span> Location <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                mouseEnter <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序中调用:</p><ol><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">OutlookBar</span> outlookBar<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">OutlookBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//记录面板总索引  </span>
<span class="token class-name">IconPanel</span> currentpanel<span class="token punctuation">;</span><span class="token comment">//记录当前的面板；</span>
</code></pre></div><ol start="2"><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码</span>

<span class="token comment">//创建outlookbar</span>
outlookBar<span class="token punctuation">.</span>Location<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span>Size<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize<span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span>BorderStyle<span class="token operator">=</span>BorderStyle<span class="token punctuation">.</span>FixedSingle<span class="token punctuation">;</span>
Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>outlookBar<span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span><span class="token function">Initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//创建类别面板</span>
<span class="token class-name">IconPanel</span> iconPanel1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IconPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IconPanel</span> iconPanel2<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IconPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IconPanel</span> iconPanel3<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IconPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span><span class="token function">AddBand</span><span class="token punctuation">(</span><span class="token string">&quot;Outlook Shortcuts&quot;</span><span class="token punctuation">,</span> iconPanel1<span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span><span class="token function">AddBand</span><span class="token punctuation">(</span><span class="token string">&quot;My Shortcuts&quot;</span><span class="token punctuation">,</span> iconPanel2<span class="token punctuation">)</span><span class="token punctuation">;</span>
outlookBar<span class="token punctuation">.</span><span class="token function">AddBand</span><span class="token punctuation">(</span><span class="token string">&quot;Other Shortcuts&quot;</span><span class="token punctuation">,</span> iconPanel3<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//创建类面板下的子项目</span>
iconPanel1<span class="token punctuation">.</span><span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token string">&quot;Outlook Today&quot;</span><span class="token punctuation">,</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;img1.ico&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>PanelEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iconPanel1<span class="token punctuation">.</span><span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token string">&quot;Calendar&quot;</span><span class="token punctuation">,</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;img2.ico&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>PanelEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iconPanel1<span class="token punctuation">.</span><span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token string">&quot;Contacts&quot;</span><span class="token punctuation">,</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;img3.ico&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>PanelEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
iconPanel1<span class="token punctuation">.</span><span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token string">&quot;Tasks&quot;</span><span class="token punctuation">,</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;img4.ico&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>PanelEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//选择面板</span>
outlookBar<span class="token punctuation">.</span><span class="token function">SelectBand</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ol start="3"><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//相应子项目的事件</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PanelEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Control</span> ctrl<span class="token operator">=</span><span class="token punctuation">(</span>Control<span class="token punctuation">)</span>sender<span class="token punctuation">;</span>
    <span class="token class-name">PanelIcon</span> panelIcon<span class="token operator">=</span>ctrl<span class="token punctuation">.</span>Tag <span class="token keyword">as</span> <span class="token class-name">PanelIcon</span><span class="token punctuation">;</span>

    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;#&quot;</span><span class="token operator">+</span>panelIcon<span class="token punctuation">.</span>Index<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Panel Event&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="4"><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> panelname<span class="token operator">=</span><span class="token string">&quot;新增组&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">WindowsApplication1<span class="token punctuation">.</span>Form2</span> f2 <span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">WindowsApplication1<span class="token punctuation">.</span>Form2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DialogResult</span> d<span class="token operator">=</span>f2<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>d<span class="token operator">==</span>DialogResult<span class="token punctuation">.</span>OK<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        panelname<span class="token operator">=</span>f2<span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//新增组面板</span>
    <span class="token class-name">IconPanel</span> panel<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IconPanel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    outlookBar<span class="token punctuation">.</span><span class="token function">AddBand</span><span class="token punctuation">(</span>panelname<span class="token punctuation">,</span> panel<span class="token punctuation">)</span><span class="token punctuation">;</span>

    currentpanel<span class="token operator">=</span>panel<span class="token punctuation">;</span>
    outlookBar<span class="token punctuation">.</span><span class="token function">SelectBand</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="5"><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//在当前组新增项目</span>
    currentpanel<span class="token punctuation">.</span><span class="token function">AddIcon</span><span class="token punctuation">(</span><span class="token string">&quot;新增项目&quot;</span><span class="token punctuation">,</span>Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;img1.ico&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>PanelEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="6"><li></li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button3_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//得到被选的面板索引</span>
    <span class="token class-name"><span class="token keyword">int</span></span> index<span class="token operator">=</span>outlookBar<span class="token punctuation">.</span>SelectedBand<span class="token punctuation">;</span>
    outlookBar<span class="token punctuation">.</span><span class="token function">SelectBand</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,18),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","win25.html.vue"]]);export{i as default};
