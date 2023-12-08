import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="datagrid-winform-显示行号最简单的方法" tabindex="-1"><a class="header-anchor" href="#datagrid-winform-显示行号最简单的方法" aria-hidden="true">#</a> DataGrid(WinForm)显示行号最简单的方法</h1><p>同样是重载OnPaint 方法,但是方法应该是比较巧妙的!而且不用担心标题是不是有显示,也不用去计算坐标,很方便的说!</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnPaint</span><span class="token punctuation">(</span><span class="token class-name">PaintEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnPaint</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>DataSource<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>VisibleRowCount <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token class-name">Rectangle</span> currRct<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> iRowCount <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>VisibleRowCount<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> sText <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nowY <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> iRowCount <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span>
        <span class="token punctuation">{</span> 
            currRct <span class="token operator">=</span> <span class="token punctuation">(</span>Rectangle<span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetCellBounds</span><span class="token punctuation">(</span> i<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
            nowY <span class="token operator">=</span> currRct<span class="token punctuation">.</span>Y <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">;</span>
            sText <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span> <span class="token string">&quot; {0}&quot;</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>   
            e<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span> sText<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>Black<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> nowY <span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","dg34.html.vue"]]);export{i as default};