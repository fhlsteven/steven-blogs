import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="用treeview实现树菜单" tabindex="-1"><a class="header-anchor" href="#用treeview实现树菜单" aria-hidden="true">#</a> 用TreeView实现树菜单</h1><blockquote><p>2003-04-02· ·pery··天极论坛</p></blockquote><p><strong>具体方法是</strong>：创建一个数据库，设计树图信息表S_Menu，包含NodeId、ParentId、NodeName、Address、Icon字段，其它字段根据实际业务而定，节点名称NodeName将在树型控件的节点上显示，NodeId字段保存节点的唯一标识号，ParentId表示当前节点的父节点号，标识号组成了一个“链表”，记录了树上节点的结构。设计一个Web窗体其上放置TreeView控件，修改其属性Id为tvMenu。</p><p><strong>数据结构如下</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>CREATE TABLE <span class="token punctuation">[</span>dbo<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">S_Menu</span></span><span class="token punctuation">]</span> （
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">NodeId</span></span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">char</span></span><span class="token punctuation">]</span> （<span class="token number">6</span>） COLLATE <span class="token class-name">Chinese_PRC_CI_AS</span> NULL <span class="token punctuation">,</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ParentId</span></span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">char</span></span><span class="token punctuation">]</span> （<span class="token number">6</span>） COLLATE <span class="token class-name">Chinese_PRC_CI_AS</span> NULL <span class="token punctuation">,</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">NodeName</span></span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">nvarchar</span></span><span class="token punctuation">]</span> （<span class="token number">50</span>） COLLATE <span class="token class-name">Chinese_PRC_CI_AS</span> NULL <span class="token punctuation">,</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Address</span></span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">nvarchar</span></span><span class="token punctuation">]</span> （<span class="token number">50</span>） COLLATE <span class="token class-name">Chinese_PRC_CI_AS</span> NULL <span class="token punctuation">,</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Icon</span></span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">nvarchar</span></span><span class="token punctuation">]</span> （<span class="token number">50</span>） COLLATE Chinese_PRC_CI_AS NULL
） ON <span class="token punctuation">[</span>PRIMARY<span class="token punctuation">]</span>
GO
</code></pre></div><p><strong>数据库如下</strong>：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>NodeId ParentId NodeName Address Icon
100000 0 公共查询部 icon_document.gif
100001 100000 人民币日报查询 public/a1.aspx icon_settings.gif
100002 100000 外币日报查询 public/a2.aspx icon_settings.gif
100003 0 分行科技部 icon_document.gif
100004 100003 人民币日报查询 tech/a1.aspx icon_settings.gif
100005 100003 外币日报查询 tech/a2.aspx icon_settings.gif
100006 0 福田支行 icon_document.gif
100007 100006 月存款进度表 a1.aspx icon_settings.gif
100008 100006 月存款走势图 a2.aspx icon_settings.gif
100009 0 罗湖支行 icon_document.gif
100010 100009 月存款进度表 a1.aspx icon_settings.gif
100011 100009 月存款走势图 a2.aspx icon_settings.gif
</code></pre></div><p><strong>menu_left.aspx文件如下</strong>：</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>＜%@ Register TagPrefix=&quot;iewc&quot; Namespace=&quot;Microsoft.Web.UI.WebControls&quot; Assembly=&quot;Microsoft.Web.UI.WebControls, Version=1.0.2.226, Culture=neutral, PublicKeyToken=31bf3856ad364e35&quot; %＞
＜%@ Page language=&quot;c#&quot; Codebehind=&quot;menu_Left.aspx.cs&quot; AutoEventWireup=&quot;false&quot; Inherits=&quot;hzquery.menu.menu_Left&quot; %＞
＜HTML＞
＜HEAD＞
＜title＞menu_Left＜/title＞
＜meta name=&quot;GENERATOR&quot; Content=&quot;Microsoft Visual Studio 7.0&quot;＞
＜meta name=&quot;CODE_LANGUAGE&quot; Content=&quot;C#&quot;＞
＜meta name=&quot;vs_defaultClientScript&quot; content=&quot;JavaScript&quot;＞
＜meta name=&quot;vs_targetSchema&quot; content=&quot;http://schemas.microsoft.com/intellisense/ie5&quot;＞
＜/HEAD＞
＜body MS_POSITIONING=&quot;GridLayout&quot;＞
＜form id=&quot;menu_Left&quot; method=&quot;post&quot; runat=&quot;server&quot;＞
＜iewc:TreeView id=&quot;tvMenu&quot; runat=&quot;server&quot;＞＜/iewc:TreeView＞
＜/form＞
＜/body＞
＜/HTML＞
</code></pre></div><p><strong>CodeBehind代码如下</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>SessionState</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>HtmlControls</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">hzquery<span class="token punctuation">.</span>menu</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// ＜summary＞</span>
    <span class="token doc-comment comment">/// menu_Left 的摘要说明。</span>
    <span class="token doc-comment comment">/// ＜/summary＞</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">menu_Left</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>Page</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">protected</span> <span class="token class-name">Microsoft<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>TreeView</span> tvMenu<span class="token punctuation">;</span>
        <span class="token class-name">SqlConnection</span> Conn<span class="token punctuation">;</span>
        <span class="token class-name">SqlDataAdapter</span> myCmd<span class="token punctuation">;</span>
        <span class="token class-name">DataSet</span> ds<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> cmdSelect<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Conn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>Application<span class="token punctuation">[</span><span class="token string">&quot;ConnString&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">CreateDataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">InitTree</span><span class="token punctuation">(</span>tvMenu<span class="token punctuation">.</span>Nodes<span class="token punctuation">,</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//建立数据集</span>
        <span class="token keyword">private</span> <span class="token return-type class-name">DataSet</span> <span class="token function">CreateDataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            cmdSelect <span class="token operator">=</span> <span class="token string">&quot;select * from S_Menu&quot;</span><span class="token punctuation">;</span>
            myCmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span>cmdSelect<span class="token punctuation">,</span> Conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
            ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCmd<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>ds<span class="token punctuation">,</span> <span class="token string">&quot;tree&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ds<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//建树的基本思路是：从根节点开始递归调用显示子树 </span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitTree</span><span class="token punctuation">(</span><span class="token class-name">TreeNodeCollection</span> Nds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> parentId<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">DataView</span> dv <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TreeNode</span> tmpNd<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> intId<span class="token punctuation">;</span>
            dv<span class="token punctuation">.</span>Table <span class="token operator">=</span> ds<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;tree&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            dv<span class="token punctuation">.</span>RowFilter <span class="token operator">=</span> <span class="token string">&quot;ParentId=&quot;</span>&quot; <span class="token operator">+</span> parentId <span class="token operator">+</span> <span class="token string">&quot;&quot;</span>&quot;<span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DataRowView</span> drv <span class="token keyword">in</span> dv<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                tmpNd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tmpNd<span class="token punctuation">.</span>ID <span class="token operator">=</span> drv<span class="token punctuation">[</span><span class="token string">&quot;NodeId&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tmpNd<span class="token punctuation">.</span>Text <span class="token operator">=</span> drv<span class="token punctuation">[</span><span class="token string">&quot;NodeName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tmpNd<span class="token punctuation">.</span>ImageUrl <span class="token operator">=</span> <span class="token string">&quot;../images/&quot;</span> <span class="token operator">+</span> drv<span class="token punctuation">[</span><span class="token string">&quot;Icon&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tmpNd<span class="token punctuation">.</span>NavigateUrl <span class="token operator">=</span> <span class="token string">&quot;../&quot;</span> <span class="token operator">+</span> drv<span class="token punctuation">[</span><span class="token string">&quot;Address&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Nds<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tmpNd<span class="token punctuation">)</span><span class="token punctuation">;</span>
                intId <span class="token operator">=</span> drv<span class="token punctuation">[</span><span class="token string">&quot;ParentId&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">InitTree</span><span class="token punctuation">(</span>tmpNd<span class="token punctuation">.</span>Nodes<span class="token punctuation">,</span> tmpNd<span class="token punctuation">.</span>ID<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Web Form Designer generated code</span>
        <span class="token keyword">override</span> <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnInit</span><span class="token punctuation">(</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnInit</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Page_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,11),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","tv4.html.vue"]]);export{k as default};
