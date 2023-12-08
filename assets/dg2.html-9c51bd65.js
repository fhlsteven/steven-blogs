import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p="/steven-blogs/assets/dg2_1-278d942c.png",o={},c=t(`<h1 id="在datagrid中使用下拉列表框和设置焦点" tabindex="-1"><a class="header-anchor" href="#在datagrid中使用下拉列表框和设置焦点" aria-hidden="true">#</a> 在DataGrid中使用下拉列表框和设置焦点</h1><p>在DataGrid中使用下拉列表问题。这篇文章讲了如何在 System.Windows.Forms.DataGrid中切入使用ComboBox控件。不过原文不全，无法调试，在这里为了说清楚点，对原文作了一些修改，整篇文章主要包括三方面的内容。</p><ol><li>在DataGrid中加入ComboBox列；</li><li>把在DataGrid中的修改保存到对应的网格；</li><li>设置DataGrid中网格的焦点。</li></ol><p>下面是整个源代码，一些功能可以看注释。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">DataGridTest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>DataGrid</span> dgdFunctionArea<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">DataTable</span> dtblFunctionalArea<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> buttonFocus<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">PopulateGrid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows 窗体设计器生成的代码</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>DataGrid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BeginInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// dgdFunctionArea</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>DataMember <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>HeaderForeColor <span class="token operator">=</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>SystemColors<span class="token punctuation">.</span>ControlText<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;dgdFunctionArea&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">316</span><span class="token punctuation">,</span> <span class="token number">168</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// buttonFocus</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">232</span><span class="token punctuation">,</span> <span class="token number">188</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;buttonFocus&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">84</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;获取焦点&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// Form1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">332</span><span class="token punctuation">,</span> <span class="token number">217</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>buttonFocus<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">EndInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//初始化DataGrid</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateGrid</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//创建一个DataTable对象，包括四列，前三列为String，最后一列为Boolean。</span>
            dtblFunctionalArea <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataTable</span><span class="token punctuation">(</span><span class="token string">&quot;FunctionArea&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> arrstrFunctionalArea <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;Functional Area&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Min&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Max&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token class-name">DataColumn</span> dtCol <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">//创建String列       </span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                dtCol <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataColumn</span><span class="token punctuation">(</span>arrstrFunctionalArea<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dtCol<span class="token punctuation">.</span>DataType <span class="token operator">=</span> Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dtCol<span class="token punctuation">.</span>DefaultValue <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                dtblFunctionalArea<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>dtCol<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//创建Boolean列，用CheckedBox来显示。    </span>
            <span class="token class-name">DataColumn</span> dtcCheck <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataColumn</span><span class="token punctuation">(</span><span class="token string">&quot;IsMandatory&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dtcCheck<span class="token punctuation">.</span>DataType <span class="token operator">=</span> System<span class="token punctuation">.</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Boolean&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dtcCheck<span class="token punctuation">.</span>DefaultValue <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            dtblFunctionalArea<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>dtcCheck<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//把表绑定到DataGrid</span>
            dgdFunctionArea<span class="token punctuation">.</span>DataSource <span class="token operator">=</span> dtblFunctionalArea<span class="token punctuation">;</span>
            <span class="token comment">//为DataGrid加载DataGridTableStyle样式</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dgdFunctionArea<span class="token punctuation">.</span>TableStyles<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;FunctionArea&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">DataGridTableStyle</span> dgdtblStyle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataGridTableStyle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>MappingName <span class="token operator">=</span> dtblFunctionalArea<span class="token punctuation">.</span>TableName<span class="token punctuation">;</span>
                dgdFunctionArea<span class="token punctuation">.</span>TableStyles<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>dgdtblStyle<span class="token punctuation">)</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>RowHeadersVisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>HeaderBackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>LightSteelBlue<span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>AllowSorting <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>HeaderBackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span><span class="token function">FromArgb</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">36</span><span class="token punctuation">,</span> <span class="token number">107</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>RowHeadersVisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>HeaderForeColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>White<span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>HeaderFont <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font</span><span class="token punctuation">(</span><span class="token string">&quot;Microsoft Sans Serif&quot;</span><span class="token punctuation">,</span> <span class="token number">9F</span><span class="token punctuation">,</span>
                    System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>FontStyle<span class="token punctuation">.</span>Bold<span class="token punctuation">,</span>
                    System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>GraphicsUnit<span class="token punctuation">.</span>Point<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Byte<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>GridLineColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>DarkGray<span class="token punctuation">;</span>
                dgdtblStyle<span class="token punctuation">.</span>PreferredRowHeight <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
                dgdFunctionArea<span class="token punctuation">.</span>BackgroundColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>White<span class="token punctuation">;</span>
                <span class="token comment">//设置列的宽度  </span>
                <span class="token class-name">GridColumnStylesCollection</span> colStyle <span class="token operator">=</span> dgdFunctionArea<span class="token punctuation">.</span>TableStyles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>GridColumnStyles<span class="token punctuation">;</span>
                colStyle<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
                colStyle<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
                colStyle<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
                colStyle<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name">DataGridTextBoxColumn</span> dgtb <span class="token operator">=</span> <span class="token punctuation">(</span>DataGridTextBoxColumn<span class="token punctuation">)</span>dgdFunctionArea<span class="token punctuation">.</span>TableStyles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>GridColumnStyles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">ComboBox</span> cmbFunctionArea <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComboBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmbFunctionArea<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;选项一&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;选项二&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;选项三&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmbFunctionArea<span class="token punctuation">.</span>Cursor <span class="token operator">=</span> Cursors<span class="token punctuation">.</span>Arrow<span class="token punctuation">;</span>
            cmbFunctionArea<span class="token punctuation">.</span>DropDownStyle <span class="token operator">=</span> ComboBoxStyle<span class="token punctuation">.</span>DropDownList<span class="token punctuation">;</span>
            cmbFunctionArea<span class="token punctuation">.</span>Dock <span class="token operator">=</span> DockStyle<span class="token punctuation">.</span>Fill<span class="token punctuation">;</span>
            <span class="token comment">//在选定项发生更改并且提交了该更改后发生</span>
            cmbFunctionArea<span class="token punctuation">.</span>SelectionChangeCommitted <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>cmbFunctionArea_SelectionChangeCommitted<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//把ComboBox添加到DataGridTableStyle的第一列</span>
            dgtb<span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>cmbFunctionArea<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//设置焦点模拟</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetFocus</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> row<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> col<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//先把焦点移动到DataGrid</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//把焦点移动到DataGridCell</span>
            <span class="token class-name">DataGridCell</span> dgc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataGridCell</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>CurrentCell <span class="token operator">=</span> dgc<span class="token punctuation">;</span>
            <span class="token class-name">DataGridTextBoxColumn</span> dgtb <span class="token operator">=</span> <span class="token punctuation">(</span>DataGridTextBoxColumn<span class="token punctuation">)</span>dgdFunctionArea<span class="token punctuation">.</span>TableStyles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>GridColumnStyles<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//设置焦点</span>
            dgtb<span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//把Combobox上修改的数据提交到当前的网格</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">cmbFunctionArea_SelectionChangeCommitted</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>dgdFunctionArea<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ComboBox<span class="token punctuation">)</span>sender<span class="token punctuation">)</span><span class="token punctuation">.</span>SelectedItem<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//设置新的焦点</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">buttonFocus_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//焦点模拟,这里设置第三行第一列</span>
            <span class="token function">GetFocus</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面是测试界面：</p><p><img src="`+p+'" alt="img_1"></p><p>总结，这里是通过DataGridTextBoxColumn.TextBox.Controls.Add方法实现在列中添加ComboBox控件；对于数据的保存是使用ComboBox.SelectionChangeCommitted事件来完成；设置焦点是通过DataGridTextBoxColumn.TextBox.Focus方法来实现。另外通过这个方法也可以添加DateTimePicker等类似的控件。</p>',8),e=[c];function u(l,k){return s(),a("div",null,e)}const r=n(o,[["render",u],["__file","dg2.html.vue"]]);export{r as default};