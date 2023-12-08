import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const o={},p=t(`<h1 id="如何在datagrid某列中加入combobox控件" tabindex="-1"><a class="header-anchor" href="#如何在datagrid某列中加入combobox控件" aria-hidden="true">#</a> 如何在DataGrid某列中加入ComboBox控件</h1><p>１．建立一个标准的Windows应用程序．</p><p>２．向窗体中加入一个DataGrid控件．</p><p>３．在申明段前加入如下代码：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms
</code></pre></div><p>４．在 Windows 窗体设计器生成的代码 后输入如下代码：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Public</span> MyCombo <span class="token keyword">As</span> <span class="token keyword">New</span> ComboBox<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> con <span class="token keyword">As</span> <span class="token keyword">New</span> SqlConnection<span class="token punctuation">(</span><span class="token string">&quot;server=myservername;uid=myid;pwd=mypassword;database=northwind&quot;</span><span class="token punctuation">)</span>
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
</code></pre></div><p>５．修改数据库的连接串为一可用链接．</p>`,8),e=[p];function c(l,k){return s(),a("div",null,e)}const r=n(o,[["render",c],["__file","dg1.html.vue"]]);export{r as default};
