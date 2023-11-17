import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="使用c-编写一个自定义控件" tabindex="-1"><a class="header-anchor" href="#使用c-编写一个自定义控件" aria-hidden="true">#</a> 使用C#编写一个自定义控件</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WindowsControlLibrary1</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">///</span>
    <span class="token doc-comment comment">/// UserControl1 的摘要说明。</span>
    <span class="token doc-comment comment">///</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserControl1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>UserControl</span></span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// 私有域</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> MyText<span class="token punctuation">;</span>
        <span class="token comment">//存储关联的事件处理方法;</span>
        <span class="token keyword">private</span> <span class="token class-name">EventHandler</span> OnMyTextChanged<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">UserControl1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 该调用是 Windows.Forms 窗体设计器所必需的。</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何初始化</span>
            MyText <span class="token operator">=</span> <span class="token string">&quot;Static Control&quot;</span><span class="token punctuation">;</span>
            OnMyTextChanged <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Component Designer generated code</span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器</span>
        <span class="token doc-comment comment">/// 修改此方法的内容。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// UserControl1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;UserControl1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">248</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>UserControl1_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Paint <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>PaintEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>UserControl1_Paint<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UserControl1_Paint</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>PaintEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">SizeF</span> textSize <span class="token operator">=</span> e<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">MeasureString</span><span class="token punctuation">(</span>MyText<span class="token punctuation">,</span> Font<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">float</span></span> xPos <span class="token operator">=</span> <span class="token punctuation">(</span>ClientRectangle<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>textSize<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">float</span></span> yPos <span class="token operator">=</span> <span class="token punctuation">(</span>ClientRectangle<span class="token punctuation">.</span>Height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>textSize<span class="token punctuation">.</span>Height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>MyText<span class="token punctuation">,</span> Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>Black<span class="token punctuation">)</span><span class="token punctuation">,</span> xPos<span class="token punctuation">,</span> yPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UserControl1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//公开属性</span>
        <span class="token keyword">public</span> <span class="token return-type class-name">String</span> ControlText
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> MyText<span class="token punctuation">;</span>

            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                MyText <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
                <span class="token comment">//重画</span>
                <span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//如果关联了事件处理方法，则调用该方法</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>OnMyTextChanged <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    OnMyTextChanged<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> EventArgs<span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>

        <span class="token comment">//声明了一个公开事件</span>
        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token return-type class-name">EventHandler</span> MyTextChanged
        <span class="token punctuation">{</span>
            <span class="token keyword">add</span>
            <span class="token punctuation">{</span>
                OnMyTextChanged <span class="token operator">+=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">remove</span>
            <span class="token punctuation">{</span>
                OnMyTextChanged <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(l,k){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","toolbox26.html.vue"]]);export{i as default};
