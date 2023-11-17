import{_ as n,o as s,c as a,a as o}from"./app-d9da1b6d.js";const t={},p=o(`<h1 id="datagrid中如何加入combox" tabindex="-1"><a class="header-anchor" href="#datagrid中如何加入combox" aria-hidden="true">#</a> DataGrid中如何加入Combox</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  DataGrid中如何加入Combox?
作　　者：  HungryBoy (饥饿的男孩)
等　　级：  ^
信 誉 值：  99
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  5
发表时间：  2003-9-26 14:42:38
</code></pre></div><p>CSDN上我搜索过了，如果您的答案同CSDN以前的答案一样就不要回复了！！</p><p>谢谢！！</p><hr><hr><p>回复人： brightheroes(太菜了，请原谅) ( 五级(中级)) 信誉：100 2003-9-26 14:47:01 得分:0</p><blockquote><p>切，上google搜</p></blockquote><p>回复人： HungryBoy(饥饿的男孩) ( 一级(初级)) 信誉：99 2003-9-26 14:53:57 得分:0</p><blockquote><p>没搜到！！</p></blockquote><p>回复人： HungryBoy(饥饿的男孩) ( 一级(初级)) 信誉：99 2003-9-26 15:02:48 得分:0</p><blockquote><p>早就搜索过了！没找到答案！</p></blockquote><p>回复人： houlinghouling(新玲) ( 一级(初级)) 信誉：100 2003-9-26 15:04:54 得分:2</p><blockquote><p>用datagrid中的模版列来实现</p></blockquote><p>回复人： luoqing(明天将会...) ( 五级(中级)) 信誉：90 2003-9-26 15:05:01 得分:18</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ComboValueChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> changingRow<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Step 1. Derive a custom column style from DataGridTextBoxColumn</span>
<span class="token comment">//  a) add a ComboBox member</span>
<span class="token comment">//  b) track when the combobox has focus in Enter and Leave events</span>
<span class="token comment">//  c) override Edit to allow the ComboBox to replace the TextBox</span>
<span class="token comment">//  d) override Commit to save the changed data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataGridComboBoxColumn</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DataGridTextBoxColumn</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">NoKeyUpCombo</span> ColumnComboBox <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>CurrencyManager</span> _source <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _rowNum<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> _isEditing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token class-name">ComboValueChanged</span> _valueChanging<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">DataGridComboBoxColumn</span><span class="token punctuation">(</span><span class="token class-name">ComboValueChanged</span> valueChanging<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _valueChanging <span class="token operator">=</span> valueChanging<span class="token punctuation">;</span>
        ColumnComboBox <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NoKeyUpCombo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        ColumnComboBox<span class="token punctuation">.</span>Leave <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>LeaveComboBox<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ColumnComboBox.Enter += new EventHandler(ComboMadeCurrent);</span>
        ColumnComboBox<span class="token punctuation">.</span>SelectedIndexChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>ComboIndexChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>SelectionChangeCommitted <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>ComboStartEditing<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ComboStartEditing</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _isEditing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">ColumnStartedEditing</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Control<span class="token punctuation">)</span>sender<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ComboIndexChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">_valueChanging</span><span class="token punctuation">(</span>_rowNum<span class="token punctuation">,</span> ColumnComboBox<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// private void ComboMadeCurrent(object sender, EventArgs e)</span>
    <span class="token comment">// {</span>
    <span class="token comment">//          //_isEditing = true;</span>
    <span class="token comment">// }</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LeaveComboBox</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_isEditing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">SetColumnValueAtRow</span><span class="token punctuation">(</span>_source<span class="token punctuation">,</span> _rowNum<span class="token punctuation">,</span> ColumnComboBox<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
            _isEditing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token function">Invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        ColumnComboBox<span class="token punctuation">.</span><span class="token function">Hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Edit</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>CurrencyManager</span> source<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> rowNum<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> readOnly<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> instantText<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> cellIsVisible<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Edit</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> rowNum<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> readOnly<span class="token punctuation">,</span> instantText<span class="token punctuation">,</span> cellIsVisible<span class="token punctuation">)</span><span class="token punctuation">;</span>

        _rowNum <span class="token operator">=</span> rowNum<span class="token punctuation">;</span>
        _source <span class="token operator">=</span> source<span class="token punctuation">;</span>

        ColumnComboBox<span class="token punctuation">.</span>Parent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Parent<span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Location<span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> ColumnComboBox<span class="token punctuation">.</span>Size<span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>SelectedIndexChanged <span class="token operator">-=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>ComboIndexChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>SelectedIndexChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>ComboIndexChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span><span class="token function">BringToFront</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ColumnComboBox<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Commit</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>CurrencyManager</span> dataSource<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> rowNum<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>_isEditing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            _isEditing <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token function">SetColumnValueAtRow</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">,</span> rowNum<span class="token punctuation">,</span> ColumnComboBox<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NoKeyUpCombo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ComboBox</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_KEYUP <span class="token operator">=</span> <span class="token number">0x101</span><span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Message</span> m<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span>Msg <span class="token operator">==</span> WM_KEYUP<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//ignore keyup to avoid problem with tabbing &amp; dropdownlist;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： HungryBoy(饥饿的男孩) ( 一级(初级)) 信誉：99 2003-9-26 15:17:19 得分:0</p><blockquote><p>谢谢楼上的！<br><br> 怎么这么复杂啊！我好像没看懂啊！</p></blockquote><p>该问题已经结贴 ，得分记录： houlinghouling (2)、 luoqing (18)、</p>`,20),e=[p];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","dg4.html.vue"]]);export{i as default};
