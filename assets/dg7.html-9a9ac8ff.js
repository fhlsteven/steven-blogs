import{_ as n,o as a,c as s,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="how-to-使用-visual-c-net-对-datagrid-windows-控件执行分页" tabindex="-1"><a class="header-anchor" href="#how-to-使用-visual-c-net-对-datagrid-windows-控件执行分页" aria-hidden="true">#</a> HOW TO：使用 Visual C# .NET 对 DataGrid Windows 控件执行分页</h1><p>适用于<br> 本文的发布号曾为 CHS307710<br> 有关本文的 Microsoft Visual Basic .NET 版本，请参见 305271。<br> 有关本文的 Microsoft Visual J# .NET 版本，请参见 CHS320626。</p><p>本文引用下面的 Microsoft .NET 框架类库名称空间：</p><ul><li>System</li><li>System.Data</li><li>System.Data.SqlClient</li></ul><h2 id="本任务的内容" tabindex="-1"><a class="header-anchor" href="#本任务的内容" aria-hidden="true">#</a> 本任务的内容</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>概要
    要求
    向 DataGrid Windows 控件添加分页的步骤
    疑难解答
参考
</code></pre></div><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><p>数据网格 Web 控件有内置的自动或自定义分页功能，但是数据网格 Windows 控件却没有这些功能。本文介绍如何为数据网格 Windows 控件创建简单的分页机制。</p><p>本文中的代码示例利用了数据集对象。在 ADO.NET 中，数据集对象是通过单次操作填充的，它们始终驻留在内存中。如果您在使用一个大型数据集，本文介绍如何以编程方式按块区或页面形式显示数据。</p><p>本示例将 Microsoft SQL Server Northwind 数据库中的 Customers 表用作数据库后端。如果连接到任何其他数据库或一个不同的表，请确保相应地更新代码。</p><p>此技巧有一些局限性。有关更多信息，请参阅疑难解答一节。</p><h3 id="要求" tabindex="-1"><a class="header-anchor" href="#要求" aria-hidden="true">#</a> 要求</h3><p>下面的列表列出了推荐使用的硬件、软件、网络结构以及所需的 Service Pack：</p><ul><li>Microsoft Windows 2000 Professional、Windows 2000 Server、Windows 2000 Advanced Server 或 Windows NT 4.0 Server</li><li>Microsoft Visual Studio .NET</li><li>Microsoft SQL Server 7.0 或更高版本</li></ul><p>本文假定您熟悉下列主题：</p><ul><li>Visual C# .NET</li><li>ADO.NET 基础知识和语法</li></ul><h3 id="向-datagrid-windows-控件添加分页的步骤" tabindex="-1"><a class="header-anchor" href="#向-datagrid-windows-控件添加分页的步骤" aria-hidden="true">#</a> 向 DataGrid Windows 控件添加分页的步骤</h3><p>当您对 DataGrid 进行分页时，您会在页面大小的&quot;块区&quot;中显示数据，即，一次显示一页记录。下面的代码示例将每页的 DataRow 对象从内存中的数据集复制到一个临时表中。该临时表然后会绑定到 DataGrid（数据网格）控件。</p><ol><li><p>打开新的 Visual C# .NET Windows 应用程序项目。</p></li><li><p>添加 DataGrid 控件，将其 ReadOnly 属性设置为 True。</p></li><li><p>将以下附加控件添加到 Form1 上，然后按如下所示设置它们的属性：</p><p>|控件|Name 属性|Text 属性| |Button|btnFirstPage|First Page| |Button|btnNextPage|Next Page| |TextBox|txtDisplayPageNo| | |Button|btnPreviousPage|Previous Page| |Button|btnLastPage|Last Page| |TextBox|txtPageSize|5| |Button|btnFillGrid|Fill Grid| |DataGrid|dataGrid1| |</p></li><li><p>将下面的代码复制并粘贴到 Form1 的代码窗口的顶部。确保对每个名称空间只引用一次。默认情况下可能已经引用 System 和 System.Data。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>复制以下代码并将其粘贴到公共类 Form1 的顶部 以便为 Form1 声明窗体级变量：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">SqlDataAdapter</span> da<span class="token punctuation">;</span>
<span class="token class-name">DataSet</span> ds<span class="token punctuation">;</span>
<span class="token class-name">DataTable</span> dtSource<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> PageCount<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> maxRec<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> pageSize<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> currentPage<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> recNo<span class="token punctuation">;</span>
</code></pre></div></li><li><p>复制以下代码并将其粘贴到紧挨在静态的空 Main 方法之后的位置，以使其作用范围为窗体级：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> startRec<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> endRec<span class="token punctuation">;</span>
    <span class="token class-name">DataTable</span> dtTemp<span class="token punctuation">;</span>

    <span class="token comment">//Clone the source table to create a temporary table.</span>
    dtTemp <span class="token operator">=</span> dtSource<span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentPage <span class="token operator">==</span> PageCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        endRec <span class="token operator">=</span> maxRec<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        endRec <span class="token operator">=</span> pageSize <span class="token operator">*</span> currentPage<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    startRec <span class="token operator">=</span> recNo<span class="token punctuation">;</span>

    <span class="token comment">//Copy rows from the source table to fill the temporary table.</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> startRec<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> endRec<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dtTemp<span class="token punctuation">.</span><span class="token function">ImportRow</span><span class="token punctuation">(</span>dtSource<span class="token punctuation">.</span>Rows<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        recNo <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    dataGrid1<span class="token punctuation">.</span>DataSource <span class="token operator">=</span> dtTemp<span class="token punctuation">;</span>
    <span class="token function">DisplayPageInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DisplayPageInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    txtDisplayPageNo<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Page &quot;</span> <span class="token operator">+</span> currentPage<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;/ &quot;</span> <span class="token operator">+</span> PageCount<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">CheckFillButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//Check if the user clicks the &quot;Fill Grid&quot; button.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pageSize <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Set the Page Size, and then click the Fill Grid button!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>将以下代码粘贴到 Form1_Load 事件过程中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//Open Connection.</span>
<span class="token class-name">SqlConnection</span> con <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span><span class="token string">&quot;server=server;uid=login;pwd=pwd;database=northwind&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Set the DataAdapter&#39;s query.</span>
da <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span><span class="token string">&quot;select * from customers&quot;</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
ds <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Fill the DataSet.</span>
da<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>ds<span class="token punctuation">,</span> <span class="token string">&quot;customers&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Set the source table.</span>
dtSource <span class="token operator">=</span> ds<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;customers&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>修改上述代码中出现的连接字符串，使之适合您的环境：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">SqlConnection</span> con <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span><span class="token string">&quot;server=server;uid=login;pwd=pwd;database=northwind&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                        <span class="token operator">&lt;</span><span class="token operator">/</span>WWCODE<span class="token operator">&gt;</span>
                                        <span class="token operator">&lt;</span>WWITEM<span class="token operator">&gt;</span>双击<span class="token operator">&lt;</span>B<span class="token operator">&gt;</span> Fill Grid<span class="token operator">&lt;</span><span class="token operator">/</span>B<span class="token operator">&gt;</span> 以打开 btnFillGrid 的代码窗口。复制以下代码并将其粘贴到 <span class="token operator">&lt;</span>B<span class="token operator">&gt;</span>btnFillGrid_Click<span class="token operator">&lt;</span><span class="token operator">/</span>B<span class="token operator">&gt;</span> 事件过程中： <span class="token operator">&lt;</span><span class="token operator">/</span>WWITEM<span class="token operator">&gt;</span>
                                        <span class="token operator">&lt;</span>WWCODE<span class="token operator">&gt;</span>
                                        <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token punctuation">[</span>CDATA<span class="token punctuation">[</span>
<span class="token comment">// Set the start and max records. </span>
pageSize <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>txtPageSize<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
maxRec <span class="token operator">=</span> dtSource<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
PageCount <span class="token operator">=</span> maxRec <span class="token operator">/</span> pageSize<span class="token punctuation">;</span>

<span class="token comment">//Adjust the page number if the last page contains a partial page.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>maxRec <span class="token operator">%</span> pageSize<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    PageCount <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Initial seeings</span>
currentPage <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
recNo <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// Display the content of the current page.</span>
<span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>双击 First Page 以打开 btnFirstPage 的代码窗口。复制以下代码并将其粘贴到 btnFirstPage_Click 事件过程中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">CheckFillButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Check if you are already at the first page.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>currentPage <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;You are at the First Page!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

currentPage <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
recNo <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>双击 Next Page 以打开 btnNextPage 的代码窗口。复制以下代码并将其粘贴到 btnNextPage_Click 事件过程中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//If the user did not click the &quot;Fill Grid&quot; button, then return.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">CheckFillButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Check if the user clicks the &quot;Fill Grid&quot; button.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>pageSize <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Set the Page Size, and then click the Fill Grid button!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

currentPage <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>currentPage <span class="token operator">&gt;</span> PageCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentPage <span class="token operator">=</span> PageCount<span class="token punctuation">;</span>
    <span class="token comment">//Check if you are already at the last page.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>recNo <span class="token operator">==</span> maxRec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;You are at the Last Page!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>双击 Previous Page 以打开 btnPreviousPage 的代码窗口。复制以下代码并将其粘贴到 btnPreviousPage_Click 事件过程中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">CheckFillButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>currentPage <span class="token operator">==</span> PageCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    recNo <span class="token operator">=</span> pageSize <span class="token operator">*</span> <span class="token punctuation">(</span>currentPage <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

currentPage <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">//Check if you are already at the first page.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>currentPage <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;You are at the First Page!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentPage <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
    recNo <span class="token operator">=</span> pageSize <span class="token operator">*</span> <span class="token punctuation">(</span>currentPage <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>双击 Last Page 以打开 btnLastPage 的代码窗口。复制以下代码并将其粘贴到 btnLastPage_Click 事件过程中：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">CheckFillButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Check if you are already at the last page.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>recNo <span class="token operator">==</span> maxRec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;You are at the Last Page!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
currentPage <span class="token operator">=</span> PageCount<span class="token punctuation">;</span>
recNo <span class="token operator">=</span> pageSize <span class="token operator">*</span> <span class="token punctuation">(</span>currentPage <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">LoadPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>按 F5 键生成并运行此项目。</p></li><li><p>默认情况下，Page Size（页面大小）设置为 5 条记录。可以在文本框中更改此设置。</p></li><li><p>单击 Fill Grid。注意，DataGrid（数据网格）中填充了 5 项记录。</p></li><li><p>单击 First Page、Next Page、Previous Page 和 Last Page 可以在不同的页面之间浏览。</p></li></ol><h3 id="疑难解答" tabindex="-1"><a class="header-anchor" href="#疑难解答" aria-hidden="true">#</a> 疑难解答</h3><ul><li>此技巧仅适用于只读 DataGrid 控件。当您向 DataTable 对象中导入一行数据时，实际上是创建了一个副本。所以，所作的更改将不会保存到主表中。</li><li>如果想让用户能够通过一个 DataRelation 对象定位到子记录，或者如果您的记录以父子关系相链接并且同时出现在窗体上，则无法使用此技巧（也不能用集合或数组）。</li></ul><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><p>有关 ADO.NET 的更多信息，请访问以下 MSDN Web 站点：</p><p>Accessing Data with ADO.NET（使用 ADO.NET 访问数据）<br> http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpguide/html/cpconaccessingdatawithadonet.asp</p><p>有关更多信息，请参阅 Microsoft .NET 框架 SDK 文档：</p><p>.NET 框架 SDK<br> http://msdn.microsoft.com/library/default.asp?url=/library/en-us/netstart/html/sdkstart.asp</p><h2 id="这篇文章中的信息适用于" tabindex="-1"><a class="header-anchor" href="#这篇文章中的信息适用于" aria-hidden="true">#</a> 这篇文章中的信息适用于</h2><ul><li>Microsoft ADO.NET（随 .NET 框架一起提供）</li><li>Microsoft Visual C# .NET (2002)</li></ul><p><strong>最近更新</strong>: 2002-6-21 (1.0)<br><strong>关键字</strong> kbDSupport kbhowto kbHOWTOmaster kbSqlClient kbSystemData KB307710</p><p>Microsoft和/或其各供应商对于为任何目的而在本服务器上发布的文件及有关图形所含信息的适用性，不作任何声明。 所有该等文件及有关图形均&quot;依样&quot;提供，而不带任何性质的保证。Microsoft和/或其各供应商特此声明，对所有与该等信息有关的保证和条件不负任何责任，该等保证和条件包括关于适销性、符合特定用途、所有权和非侵权的所有默示保证和条件。在任何情况下，在由于使用或运行本服务器上的信息所引起的或与该等使用或运行有关的诉讼中，Microsoft和/或其各供应商就因丧失使用、数据或利润所导致的任何特别的、间接的或衍生性的损失或任何种类的损失，均不负任何责任，无论该等诉讼是合同之诉、疏忽或其它侵权行为之诉。</p>`,30),e=[o];function c(l,u){return a(),s("div",null,e)}const r=n(p,[["render",c],["__file","dg7.html.vue"]]);export{r as default};
