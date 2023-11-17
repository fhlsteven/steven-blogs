import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="为combobox控件添加图片" tabindex="-1"><a class="header-anchor" href="#为combobox控件添加图片" aria-hidden="true">#</a> 为ComboBox控件添加图片</h1><p>扩展类 ComboBoxEx.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Design</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Mengxianhui<span class="token punctuation">.</span>ComboBoxEx</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">ComboBoxEx</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ComboBox</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">ImageList</span> imageList<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token return-type class-name">ImageList</span> ImageList
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> imageList<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> imageList <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">ComboBoxEx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            DrawMode <span class="token operator">=</span> DrawMode<span class="token punctuation">.</span>OwnerDrawFixed<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnDrawItem</span><span class="token punctuation">(</span><span class="token class-name">DrawItemEventArgs</span> ea<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ea<span class="token punctuation">.</span><span class="token function">DrawBackground</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ea<span class="token punctuation">.</span><span class="token function">DrawFocusRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">ComboBoxExItem</span> item<span class="token punctuation">;</span>
            <span class="token class-name">Size</span> imageSize <span class="token operator">=</span> imageList<span class="token punctuation">.</span>ImageSize<span class="token punctuation">;</span>
            <span class="token class-name">Rectangle</span> bounds <span class="token operator">=</span> ea<span class="token punctuation">.</span>Bounds<span class="token punctuation">;</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                item <span class="token operator">=</span> <span class="token punctuation">(</span>ComboBoxExItem<span class="token punctuation">)</span>Items<span class="token punctuation">[</span>ea<span class="token punctuation">.</span>Index<span class="token punctuation">]</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>ImageIndex <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    imageList<span class="token punctuation">.</span><span class="token function">Draw</span><span class="token punctuation">(</span>ea<span class="token punctuation">.</span>Graphics<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">,</span> item<span class="token punctuation">.</span>ImageIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    ea<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> ea<span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>ea<span class="token punctuation">.</span>ForeColor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> imageSize<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    ea<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> ea<span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>ea<span class="token punctuation">.</span>ForeColor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ea<span class="token punctuation">.</span>Index <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    ea<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>Items<span class="token punctuation">[</span>ea<span class="token punctuation">.</span>Index<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ea<span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>ea<span class="token punctuation">.</span>ForeColor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    ea<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>Text<span class="token punctuation">,</span> ea<span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>ea<span class="token punctuation">.</span>ForeColor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnDrawItem</span><span class="token punctuation">(</span>ea<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span> <span class="token class-name">ComboBoxExItem</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _text<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Text
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _text<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> _text <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _imageIndex<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ImageIndex
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _imageIndex<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> _imageIndex <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> imageIndex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            _text <span class="token operator">=</span> text<span class="token punctuation">;</span>
            _imageIndex <span class="token operator">=</span> imageIndex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> _text<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用方法：</p><p>1.在form类里声明</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>IContainer</span> components<span class="token punctuation">;</span>
    <span class="token keyword">private</span>  <span class="token class-name">ComboBoxEx</span> comboBox2<span class="token punctuation">;</span>
</code></pre></div><p>2.初始化组件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">ComboBoxEx</span> comboBox2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComboBoxEx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comboBox2<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>

    comboBox2<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token string">&quot;【孟宪会之精彩世界】&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comboBox2<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token string">&quot;【孟宪会之精彩世界】&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    comboBox2<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComboBoxExItem</span><span class="token punctuation">(</span><span class="token string">&quot;【孟宪会之精彩世界】&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>comboBox2<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ImageList</span> imageList1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ImageList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    imageList1<span class="token punctuation">.</span>Images<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">@&quot;D:\\TEST\\lib\\db0.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    imageList1<span class="token punctuation">.</span>Images<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">@&quot;D:\\TEST\\lib\\db0.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    imageList1<span class="token punctuation">.</span>Images<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">@&quot;D:\\TEST\\lib\\db0.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    comboBox2<span class="token punctuation">.</span>ImageList <span class="token operator">=</span> imageList1<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,8),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","combox6.html.vue"]]);export{i as default};
