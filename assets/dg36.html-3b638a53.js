import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="请问怎样实现windows-datagrid-和-listview的分页" tabindex="-1"><a class="header-anchor" href="#请问怎样实现windows-datagrid-和-listview的分页" aria-hidden="true">#</a> 请问怎样实现windows datagrid 和 listview的分页？？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  请问怎样实现windows datagrid 和 listview的分页？？
作　　者：  greenhill (小山)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  2
发表时间：  2003-8-10 15:47:15
</code></pre></div><p>如题！还有怎么样设列名？？我不想用数据库的字段名做列名，怎样自己设置列名！</p><hr><hr><p>回复人： saucer(思归, MS .NET MVP) ( 五星(高级)) 信誉：315 2003-8-10 15:51:51 得分:10</p><blockquote><p>see<br><br> Paging Through a Query Result<br> http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpguide/html/cpconpagingthroughqueryresult.asp</p></blockquote><p>回复人： net_lover(孟子E章) ( 四星(高级)) 信誉：115 2003-8-10 15:53:05 得分:10</p><blockquote><p>通过查询结果进行分页就是以结果集的子集处理查询结果的过程，这样，每次返回给用户的只是当前页面的数据大小。<br><br> DataAdapter对象通过重载Fill方法提供了返回当前页面数据的功能。然而，这种方法对大数据量的查询结果并不是最好的选择，这是因为：当DataAdapter用请求的结果填充DataTable或者DataSet时，数据库返回的资源仍是全部的查询结果，只是在返回时附加了额外的限定条件才返回了少量的记录集的。<br><br> 要使用Fill方法返回当前一页的记录，需要指定开始记录startRecord，和当前页的最大记录数maxRecords。<br><br> 下面的例子用来返回一页为5条记录的第一页的查询结果：</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token comment">&#39;[VB.NET]</span>
<span class="token keyword">Dim</span> currentIndex <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">Dim</span> pageSize <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">Dim</span> orderSQL <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM Orders ORDER BY OrderID&quot;</span>
<span class="token keyword">Dim</span> myDA <span class="token keyword">As</span> SqlDataAdapter <span class="token operator">=</span> <span class="token keyword">New</span> SqlDataAdapter<span class="token punctuation">(</span>orderSQL<span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span>

<span class="token keyword">Dim</span> myDS <span class="token keyword">As</span> DataSet <span class="token operator">=</span> <span class="token keyword">New</span> DataSet<span class="token punctuation">(</span><span class="token punctuation">)</span>
myDA<span class="token punctuation">.</span>Fill<span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> currentIndex<span class="token punctuation">,</span> pageSize<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span>
</code></pre></div><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//[C#]</span>
<span class="token class-name"><span class="token keyword">int</span></span> currentIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> pageSize <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> orderSQL <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM Orders ORDER BY OrderID&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SqlDataAdapter</span> myDA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span>orderSQL<span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DataSet</span> myDS <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myDA<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> currentIndex<span class="token punctuation">,</span> pageSize<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>在上面的例子中，DataSet只填充了5条记录，但返回的仍是整个Orders表。如果要达到填充几条返回几天的目的，在SQL语句中使用TOP和WHERE从句即可。例如：</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token comment">&#39;[VB.NET]</span>
<span class="token keyword">Dim</span> pageSize <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">Dim</span> orderSQL <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;SELECT TOP &quot;</span> <span class="token operator">&amp;</span> pageSize <span class="token operator">&amp;</span> <span class="token string">&quot; * FROM Orders ORDER BY OrderID&quot;</span>
<span class="token keyword">Dim</span> myDA <span class="token keyword">As</span> SqlDataAdapter <span class="token operator">=</span> <span class="token keyword">New</span> SqlDataAdapter<span class="token punctuation">(</span>orderSQL<span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span>

<span class="token keyword">Dim</span> myDS <span class="token keyword">As</span> DataSet <span class="token operator">=</span> <span class="token keyword">New</span> DataSet<span class="token punctuation">(</span><span class="token punctuation">)</span>
myDA<span class="token punctuation">.</span>Fill<span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span> 
</code></pre></div><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//[C#]</span>
<span class="token class-name"><span class="token keyword">int</span></span> pageSize <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> orderSQL <span class="token operator">=</span> <span class="token string">&quot;SELECT TOP &quot;</span> <span class="token operator">+</span> pageSize <span class="token operator">+</span> <span class="token string">&quot; * FROM Orders ORDER BY OrderID&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">SqlDataAdapter</span> myDA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span>orderSQL<span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">DataSet</span> myDS <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myDA<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>此时需要注意的是：用这种方法进行的分页，必须自己维护记录排序的唯一标识，为了向下一页请求传递唯一的ID，我们必须象下面那样：</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token comment">&#39;[VB.NET]</span>
<span class="token keyword">Dim</span> lastRecord <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> myDS<span class="token punctuation">.</span>Tables<span class="token punctuation">(</span><span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Rows<span class="token punctuation">(</span>pageSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">&quot;OrderID&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ToString<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// [C#]</span>
<span class="token class-name"><span class="token keyword">string</span></span> lastRecord <span class="token operator">=</span> myDS<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Orders&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">[</span>pageSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;OrderID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>下面的代码在Table填充之前进行了清空：</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token comment">&#39; [VB.NET]</span>
currentIndex <span class="token operator">=</span> currentIndex <span class="token operator">+</span> pageSize
myDS<span class="token punctuation">.</span>Tables<span class="token punctuation">(</span><span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
myDA<span class="token punctuation">.</span>Fill<span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> currentIndex<span class="token punctuation">,</span> pageSize<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span>
</code></pre></div><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// [C#]</span>
currentIndex <span class="token operator">+=</span> pageSize<span class="token punctuation">;</span>
myDS<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Orders&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myDA<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>myDS<span class="token punctuation">,</span> currentIndex<span class="token punctuation">,</span> pageSize<span class="token punctuation">,</span> <span class="token string">&quot;Orders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>下面是完整的代码：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//[C#]</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PagingSample</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
  <span class="token comment">// Form 控件.</span>
  <span class="token class-name">Button</span> prevBtn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Button</span> nextBtn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">static</span> <span class="token class-name">DataGrid</span> myGrid <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataGrid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token class-name">Label</span> pageLbl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 分页变量</span>
  <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> pageSize <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>      <span class="token comment">// 要显示的页数</span>
  <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> totalPages <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>      <span class="token comment">// 总页数</span>
  <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> currentPage <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>      <span class="token comment">// 当前页</span>
  <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> firstVisibleCustomer <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>  <span class="token comment">// 当前页的第一条记录，用来进行移动“前一页”的定位。</span>
  <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> lastVisibleCustomer <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>    <span class="token comment">//当前页的最后条记录，用来进行移动“下一页”的定位。 </span>

  <span class="token comment">// DataSet用来绑定到DataGrid.</span>
  <span class="token keyword">static</span> <span class="token class-name">DataTable</span> custTable<span class="token punctuation">;</span>

  <span class="token comment">//初始化连接和DataAdapter.</span>
  <span class="token keyword">static</span> <span class="token class-name">SqlConnection</span> nwindConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span><span class="token string">&quot;Data Source=.;Integrated Security=SSPI;Initial Catalog=northwind&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token class-name">SqlDataAdapter</span> custDA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlDataAdapter</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">static</span> <span class="token class-name">SqlCommand</span> selCmd <span class="token operator">=</span> custDA<span class="token punctuation">.</span>SelectCommand<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetData</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> direction<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// 创建返回一页记录的SQL语句</span>
    selCmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>direction<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&quot;下一页&quot;</span><span class="token punctuation">:</span>
        selCmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;SELECT TOP &quot;</span> <span class="token operator">+</span> pageSize <span class="token operator">+</span> <span class="token string">&quot; CustomerID, CompanyName FROM Customers &quot;</span> <span class="token operator">+</span>
                      <span class="token string">&quot;WHERE CustomerID &gt; @CustomerId ORDER BY CustomerID&quot;</span><span class="token punctuation">;</span>
        selCmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;@CustomerId&quot;</span><span class="token punctuation">,</span> SqlDbType<span class="token punctuation">.</span>VarChar<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> lastVisibleCustomer<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token string">&quot;前一页&quot;</span><span class="token punctuation">:</span>
        selCmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;SELECT TOP &quot;</span> <span class="token operator">+</span> pageSize <span class="token operator">+</span> <span class="token string">&quot; CustomerID, CompanyName FROM Customers &quot;</span> <span class="token operator">+</span>
                      <span class="token string">&quot;WHERE CustomerID &lt; @CustomerId ORDER BY CustomerID DESC&quot;</span><span class="token punctuation">;</span>
        selCmd<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;@CustomerId&quot;</span><span class="token punctuation">,</span> SqlDbType<span class="token punctuation">.</span>VarChar<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> firstVisibleCustomer<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token punctuation">:</span>
        selCmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;SELECT TOP &quot;</span> <span class="token operator">+</span> pageSize <span class="token operator">+</span> <span class="token string">&quot; CustomerID, CompanyName FROM Customers ORDER BY CustomerID&quot;</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 计算总页数</span>
        <span class="token class-name">SqlCommand</span> totCMD <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT Count(*) FROM Customers&quot;</span><span class="token punctuation">,</span> nwindConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        nwindConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> totalRecords <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>totCMD<span class="token punctuation">.</span><span class="token function">ExecuteScalar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        nwindConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        totalPages <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Math<span class="token punctuation">.</span><span class="token function">Ceiling</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span>totalRecords <span class="token operator">/</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 用查询结果填充临时表</span>
    <span class="token class-name">DataTable</span> tmpTable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataTable</span><span class="token punctuation">(</span><span class="token string">&quot;Customers&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> recordsAffected <span class="token operator">=</span> custDA<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span>tmpTable<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果表不存在，就创建</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>custTable <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
      custTable <span class="token operator">=</span> tmpTable<span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果有记录返回，就刷新表</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>recordsAffected <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">switch</span> <span class="token punctuation">(</span>direction<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">&quot;下一页&quot;</span><span class="token punctuation">:</span>
          currentPage<span class="token operator">++</span><span class="token punctuation">;</span>
          <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">&quot;上一页&quot;</span><span class="token punctuation">:</span>
          currentPage<span class="token operator">--</span><span class="token punctuation">;</span>
          <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
          currentPage <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
          <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      pageLbl<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;第&quot;</span> <span class="token operator">+</span> currentPage <span class="token operator">+</span> <span class="token string">&quot;/ &quot;</span> <span class="token operator">+</span> totalPages <span class="token operator">+</span> <span class="token string">&quot;页&quot;</span><span class="token punctuation">;</span>

      <span class="token comment">// 清除行集，添加新记录</span>
      custTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DataRow</span> myRow <span class="token keyword">in</span> tmpTable<span class="token punctuation">.</span>Rows<span class="token punctuation">)</span>
        custTable<span class="token punctuation">.</span><span class="token function">ImportRow</span><span class="token punctuation">(</span>myRow<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// 保存first 和 last 关键值</span>
      <span class="token class-name">DataRow<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ordRows <span class="token operator">=</span> custTable<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CustomerID ASC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      firstVisibleCustomer <span class="token operator">=</span> ordRows<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      lastVisibleCustomer <span class="token operator">=</span> ordRows<span class="token punctuation">[</span>custTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">PagingSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// 初始化控件并添加到Form</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">360</span><span class="token punctuation">,</span> <span class="token number">274</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;NorthWind 数据表&quot;</span><span class="token punctuation">;</span>

    myGrid<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">340</span><span class="token punctuation">,</span> <span class="token number">220</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>AllowSorting <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>CaptionText <span class="token operator">=</span> <span class="token string">&quot;NorthWind 客户信息&quot;</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>ReadOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>AllowNavigation <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span>PreferredColumnWidth <span class="token operator">=</span> <span class="token number">150</span><span class="token punctuation">;</span>

    prevBtn<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;前一页&quot;</span><span class="token punctuation">;</span>
    prevBtn<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    prevBtn<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">240</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    prevBtn<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>Prev_OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>

    nextBtn<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;下一页&quot;</span><span class="token punctuation">;</span>
    nextBtn<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nextBtn<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">240</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    pageLbl<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;没有记录返回&quot;</span><span class="token punctuation">;</span>
    pageLbl<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">130</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pageLbl<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">244</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>myGrid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>prevBtn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>nextBtn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>pageLbl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    nextBtn<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>Next_OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 计算默认的第一页，并进行绑定</span>
    <span class="token function">GetData</span><span class="token punctuation">(</span><span class="token string">&quot;Default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DataView</span> custDV <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataView</span><span class="token punctuation">(</span>custTable<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CustomerID&quot;</span><span class="token punctuation">,</span> DataViewRowState<span class="token punctuation">.</span>CurrentRows<span class="token punctuation">)</span><span class="token punctuation">;</span>
    myGrid<span class="token punctuation">.</span><span class="token function">SetDataBinding</span><span class="token punctuation">(</span>custDV<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Prev_OnClick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">GetData</span><span class="token punctuation">(</span><span class="token string">&quot;前一页&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Next_OnClick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token function">GetData</span><span class="token punctuation">(</span><span class="token string">&quot;下一页&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sample</span>
<span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PagingSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>该问题已经结贴 ，得分记录： saucer (10)、 net_lover (10)、</p>`,27),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","dg36.html.vue"]]);export{i as default};
