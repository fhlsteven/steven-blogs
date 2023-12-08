import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="添加一个下拉框到datagrid" tabindex="-1"><a class="header-anchor" href="#添加一个下拉框到datagrid" aria-hidden="true">#</a> 添加一个下拉框到DataGrid</h1><blockquote><p>浩子 2003-3-9 23:15:32</p></blockquote><p>本实例利用Paint方法添加一个下拉框到DataGrid1上</p><p>1、新建一个Visual Basic Project 。<br> 2、添加一个DataGrid control到窗体上。<br> 3、加入以下代码</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient

<span class="token keyword">Public</span> <span class="token keyword">Class</span> Form1
    <span class="token keyword">Inherits</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form

<span class="token directive property">#Region &quot; Windows 窗体设计器生成的代码 &quot;</span>

    <span class="token keyword">Public</span> <span class="token keyword">Sub</span> <span class="token keyword">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">MyBase</span><span class="token punctuation">.</span><span class="token keyword">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">&#39;该调用是 Windows 窗体设计器所必需的。</span>
        InitializeComponent<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">&#39;在 InitializeComponent() 调用之后添加任何初始化</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token comment">&#39;窗体重写处置以清理组件列表。</span>
    <span class="token keyword">Protected</span> <span class="token keyword">Overloads</span> <span class="token keyword">Overrides</span> <span class="token keyword">Sub</span> Dispose<span class="token punctuation">(</span><span class="token keyword">ByVal</span> disposing <span class="token keyword">As</span> <span class="token keyword">Boolean</span><span class="token punctuation">)</span>
        <span class="token keyword">If</span> disposing <span class="token keyword">Then</span>
            <span class="token keyword">If</span> <span class="token keyword">Not</span> <span class="token punctuation">(</span>components <span class="token keyword">Is</span> <span class="token boolean">Nothing</span><span class="token punctuation">)</span> <span class="token keyword">Then</span>
                components<span class="token punctuation">.</span>Dispose<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">End</span> <span class="token keyword">If</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>

        <span class="token keyword">MyBase</span><span class="token punctuation">.</span>Dispose<span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token comment">&#39;Windows 窗体设计器所必需的</span>
    <span class="token keyword">Private</span> components <span class="token keyword">As</span> System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>IContainer

    <span class="token comment">&#39;注意：以下过程是 Windows 窗体设计器所必需的</span>
    <span class="token comment">&#39;可以使用 Windows 窗体设计器修改此过程。</span>
    <span class="token comment">&#39;不要使用代码编辑器修改它。</span>
    <span class="token keyword">Friend</span> <span class="token keyword">WithEvents</span> DataGrid1 <span class="token keyword">As</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>DataGrid

    <span class="token operator">&lt;</span>System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>DebuggerStepThrough<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> <span class="token keyword">Private</span> <span class="token keyword">Sub</span> InitializeComponent<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1 <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>DataGrid<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">CType</span><span class="token punctuation">(</span><span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">,</span> System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">.</span>BeginInit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>SuspendLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">&#39;</span>
        <span class="token comment">&#39;DataGrid1</span>
        <span class="token comment">&#39;</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>DataMember <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>HeaderForeColor <span class="token operator">=</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>SystemColors<span class="token punctuation">.</span>ControlText
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point<span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">56</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;DataGrid1&quot;</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size<span class="token punctuation">(</span><span class="token number">416</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span>

        <span class="token comment">&#39;</span>
        <span class="token comment">&#39;Form1</span>
        <span class="token comment">&#39;</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size<span class="token punctuation">(</span><span class="token number">552</span><span class="token punctuation">,</span> <span class="token number">285</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span>AddRange<span class="token punctuation">(</span><span class="token keyword">New</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span>
        <span class="token keyword">CType</span><span class="token punctuation">(</span><span class="token keyword">Me</span><span class="token punctuation">.</span>DataGrid1<span class="token punctuation">,</span> System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">.</span>EndInit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>ResumeLayout<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token directive property">#End Region</span>

    <span class="token keyword">Public</span> MyCombo <span class="token keyword">As</span> <span class="token keyword">New</span> ComboBox<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> con <span class="token keyword">As</span> <span class="token keyword">New</span> SqlConnection<span class="token punctuation">(</span><span class="token string">&quot;server=lihg;uid=sa;pwd=sa;database=northwind&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> daEmp <span class="token keyword">As</span> <span class="token keyword">New</span> SqlDataAdapter<span class="token punctuation">(</span><span class="token string">&quot;Select * From Employees&quot;</span><span class="token punctuation">,</span> con<span class="token punctuation">)</span> 

    <span class="token keyword">Public</span> ds <span class="token keyword">As</span> <span class="token keyword">New</span> DataSet<span class="token punctuation">(</span><span class="token punctuation">)</span> 

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> Form1_Load<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> <span class="token keyword">MyBase</span><span class="token punctuation">.</span>Load
        <span class="token keyword">AddHandler</span> MyCombo<span class="token punctuation">.</span>TextChanged<span class="token punctuation">,</span> <span class="token keyword">AddressOf</span> Ctrls_TextChanged
        <span class="token comment">&#39;Fill ComboBox list.</span>
        MyCombo<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;MyCombo&quot;</span>
        MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;Sales Representative&quot;</span><span class="token punctuation">)</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;Inside Sales Coordinator&quot;</span><span class="token punctuation">)</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;Vice President, Sales&quot;</span><span class="token punctuation">)</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;Sales Manager&quot;</span><span class="token punctuation">)</span>
        MyCombo<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;Flunky&quot;</span><span class="token punctuation">)</span>

        daEmp<span class="token punctuation">.</span>Fill<span class="token punctuation">(</span>ds<span class="token punctuation">,</span> <span class="token string">&quot;Employees&quot;</span><span class="token punctuation">)</span> 

        <span class="token comment">&#39;Set the RowHeight of the DataGrid to the height of the ComboBox.</span>
        DataGrid1<span class="token punctuation">.</span>PreferredRowHeight <span class="token operator">=</span> MyCombo<span class="token punctuation">.</span>Height
        DataGrid1<span class="token punctuation">.</span>DataSource <span class="token operator">=</span> ds
        DataGrid1<span class="token punctuation">.</span>DataMember <span class="token operator">=</span> <span class="token string">&quot;Employees&quot;</span>
        <span class="token comment">&#39;Add ComboBox to the Control collection of the DataGrid.</span>
        DataGrid1<span class="token punctuation">.</span>Controls<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>MyCombo<span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> DataGrid1_Paint<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>PaintEventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> DataGrid1<span class="token punctuation">.</span>Paint
        <span class="token keyword">If</span> DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">.</span>ColumnNumber <span class="token operator">=</span> <span class="token number">3</span> <span class="token keyword">Then</span>
            MyCombo<span class="token punctuation">.</span>Width <span class="token operator">=</span> DataGrid1<span class="token punctuation">.</span>GetCurrentCellBounds<span class="token punctuation">.</span>Width
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> Ctrls_TextChanged<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span>
        <span class="token keyword">If</span> DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">.</span>ColumnNumber <span class="token operator">=</span> <span class="token number">3</span> <span class="token keyword">Then</span>
            MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
            <span class="token keyword">If</span> DataGrid1<span class="token punctuation">.</span>Item<span class="token punctuation">(</span>DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token string">&quot;&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
                SendKeys<span class="token punctuation">.</span>Send<span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">End</span> <span class="token keyword">If</span>
            DataGrid1<span class="token punctuation">.</span>Item<span class="token punctuation">(</span>DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">)</span> <span class="token operator">=</span> MyCombo<span class="token punctuation">.</span>Text
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> DataGrid1_CurrentCellChanged<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> DataGrid1<span class="token punctuation">.</span>CurrentCellChanged
        <span class="token keyword">If</span> DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">.</span>ColumnNumber <span class="token operator">=</span> <span class="token number">3</span> <span class="token keyword">Then</span>
            MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
            MyCombo<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">0</span>
            MyCombo<span class="token punctuation">.</span>Left <span class="token operator">=</span> DataGrid1<span class="token punctuation">.</span>GetCurrentCellBounds<span class="token punctuation">.</span>Left
            MyCombo<span class="token punctuation">.</span>Top <span class="token operator">=</span> DataGrid1<span class="token punctuation">.</span>GetCurrentCellBounds<span class="token punctuation">.</span>Top
            MyCombo<span class="token punctuation">.</span>Text <span class="token operator">=</span> DataGrid1<span class="token punctuation">.</span>Item<span class="token punctuation">(</span>DataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token string">&quot;&quot;</span>
            MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">Else</span>
            MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
            MyCombo<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> DataGrid1_Scroll<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> DataGrid1<span class="token punctuation">.</span>Scroll
        MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
        MyCombo<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> DataGrid1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> DataGrid1<span class="token punctuation">.</span>Click
        MyCombo<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span>
        MyCombo<span class="token punctuation">.</span>Width <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token keyword">End</span> <span class="token keyword">Class</span>
</code></pre></div><p>4、修连接字符串Dim con As New SqlConnection(&quot;server=lihg;uid=sa;pwd=sa;database=northwind&quot;)，使能连接上数据库</p><p>5、F5运行</p>`,7),e=[o];function c(k,l){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","dg3.html.vue"]]);export{r as default};
