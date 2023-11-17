import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="datagrid控件通用打印类" tabindex="-1"><a class="header-anchor" href="#datagrid控件通用打印类" aria-hidden="true">#</a> DataGrid控件通用打印类</h1><blockquote><p>你是第86位浏览该文章的人 xiaochongsun csdn 2003-5-31</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Color
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>PointF
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>DataGrid
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Pen
<span class="token keyword">Imports</span> System<span class="token punctuation">.</span>Drawing

<span class="token comment">&#39;&#39;=======================================</span>
<span class="token comment">&#39;DATAGRID控件通用打印类</span>
<span class="token comment">&#39;中和科技-孙利臣</span>
<span class="token comment">&#39;于2003年05月27日17:05</span>
<span class="token comment">&#39;用于打印DATAGRID控件中的数据.</span>
<span class="token comment">&#39;=======================================</span>

<span class="token keyword">Public</span> <span class="token keyword">Class</span> PrintDataGrid
<span class="token comment">&#39;用户可自定义</span>
<span class="token keyword">Private</span> PrintFont <span class="token keyword">As</span> <span class="token keyword">New</span> Font<span class="token punctuation">(</span><span class="token string">&quot;宋体&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">&#39;当前要打印文本的字体及字号</span>
<span class="token keyword">Private</span> PrintLines <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">50</span> <span class="token comment">&#39;当前页共要分成多少行.</span>
<span class="token keyword">Private</span> PrintRecordNumber <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">45</span> <span class="token comment">&#39;当前页共要打印的记录的行数</span>

<span class="token comment">&#39;以下为模块内部使用</span>
<span class="token keyword">Private</span> DataGridSource <span class="token keyword">As</span> DataGrid
<span class="token keyword">Private</span> ev <span class="token keyword">As</span> PrintPageEventArgs
<span class="token keyword">Private</span> PrintDataGrid <span class="token keyword">As</span> PrintDocument
<span class="token keyword">Private</span> PrintPriview <span class="token keyword">As</span> PrintPreviewDialog
<span class="token keyword">Private</span> PageSetup <span class="token keyword">As</span> PageSetupDialog
<span class="token keyword">Private</span> PrintScale <span class="token keyword">As</span> <span class="token keyword">Double</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">&#39;当前要打印的数据与DATAGRID控件内数据的比例</span>

<span class="token keyword">Private</span> DataGridColumn <span class="token keyword">As</span> DataColumn
<span class="token keyword">Private</span> DataGridRow <span class="token keyword">As</span> DataRow
<span class="token keyword">Private</span> DataGridTable <span class="token keyword">As</span> DataTable

<span class="token keyword">Private</span> Cols <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前要打印的列</span>
<span class="token keyword">Private</span> Rows <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">&#39;当前要打印的行</span>

<span class="token keyword">Private</span> ColsCount <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前DATAGRID共有多少列</span>

<span class="token keyword">Private</span> PrintingLineNumber <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">&#39;当前正要打印的行号</span>
<span class="token keyword">Private</span> PageRecordNumber <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前要所要打印的记录行数,由计算得到.</span>

<span class="token keyword">Dim</span> X_unit <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;表的基本单位</span>
<span class="token keyword">Dim</span> Y_unit <span class="token keyword">As</span> <span class="token keyword">Integer</span>

<span class="token keyword">Private</span> PrintingPageNumber <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">&#39;正要打印的页号</span>

<span class="token keyword">Private</span> PageNumber <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;共需要打印的页数</span>
<span class="token keyword">Private</span> PrintRecordLeave <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前还有多少页没有打印</span>
<span class="token keyword">Private</span> PrintRecordComplete <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">&#39;已经打印完的记录数</span>

<span class="token keyword">Sub</span> <span class="token keyword">New</span><span class="token punctuation">(</span><span class="token keyword">ByVal</span> TableSource <span class="token keyword">As</span> DataGrid<span class="token punctuation">)</span>
DataGridSource <span class="token operator">=</span> TableSource
DataGridTable <span class="token operator">=</span> <span class="token keyword">New</span> DataTable<span class="token punctuation">(</span><span class="token punctuation">)</span>
DataGridTable <span class="token operator">=</span> DataGridSource<span class="token punctuation">.</span>DataSource<span class="token punctuation">(</span><span class="token punctuation">)</span>
ColsCount <span class="token operator">=</span> DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count
<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token comment">&#39;用户自定义字体及字号</span>
<span class="token keyword">Public</span> <span class="token keyword">WriteOnly</span> <span class="token keyword">Property</span> setPrintFont<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">As</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font
<span class="token keyword">Set</span><span class="token punctuation">(</span><span class="token keyword">ByVal</span> Value <span class="token keyword">As</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font<span class="token punctuation">)</span>
PrintFont <span class="token operator">=</span> Value
<span class="token keyword">End</span> <span class="token keyword">Set</span>
<span class="token keyword">End</span> <span class="token keyword">Property</span>

<span class="token comment">&#39;设置每页要打印的的记录条数</span>
<span class="token keyword">Public</span> <span class="token keyword">WriteOnly</span> <span class="token keyword">Property</span> setPrintRecordNumber<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Integer</span>
<span class="token keyword">Set</span><span class="token punctuation">(</span><span class="token keyword">ByVal</span> Value <span class="token keyword">As</span> <span class="token keyword">Integer</span><span class="token punctuation">)</span>
PrintRecordNumber <span class="token operator">=</span> Value
<span class="token keyword">End</span> <span class="token keyword">Set</span>
<span class="token keyword">End</span> <span class="token keyword">Property</span>

<span class="token keyword">Public</span> <span class="token keyword">Sub</span> Print<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Try</span>
PrintDataGrid <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing<span class="token punctuation">.</span>PrintDocument<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">AddHandler</span> PrintDataGrid<span class="token punctuation">.</span>PrintPage<span class="token punctuation">,</span> <span class="token keyword">AddressOf</span> <span class="token keyword">Me</span><span class="token punctuation">.</span>PrintDataGrid_PrintPage
<span class="token comment">&#39;PrintDataTable.Print()</span>

<span class="token comment">&#39;打印机设置对话框</span>
PageSetup <span class="token operator">=</span> <span class="token keyword">New</span> PageSetupDialog<span class="token punctuation">(</span><span class="token punctuation">)</span>
PageSetup<span class="token punctuation">.</span>PageSettings <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings
<span class="token keyword">If</span> PageSetup<span class="token punctuation">.</span>ShowDialog<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> DialogResult<span class="token punctuation">.</span>Cancel <span class="token keyword">Then</span>
<span class="token keyword">Exit</span> <span class="token keyword">Sub</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token comment">&#39;当前页是横向还是纵向打印</span>
<span class="token comment">&#39;计算当前页总共可以打印的行数</span>
<span class="token keyword">If</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>Landscape <span class="token operator">=</span> <span class="token boolean">False</span> <span class="token keyword">Then</span>
PrintLines <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Height <span class="token operator">/</span> <span class="token punctuation">(</span>PrintFont<span class="token punctuation">.</span>Height <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">Else</span>
PrintLines <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token punctuation">(</span>PrintFont<span class="token punctuation">.</span>Height <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token comment">&#39;如果用户选择自定义纸张大小打印,则按B5纸打印,不管实际纸张大小</span>
<span class="token keyword">If</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>PaperName<span class="token punctuation">.</span>ToString <span class="token operator">=</span> <span class="token string">&quot;custom&quot;</span> <span class="token keyword">Then</span>

<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token comment">&#39;预览窗口</span>
PrintPriview <span class="token operator">=</span> <span class="token keyword">New</span> PrintPreviewDialog<span class="token punctuation">(</span><span class="token punctuation">)</span>
PrintPriview<span class="token punctuation">.</span>Document <span class="token operator">=</span> PrintDataGrid
PrintPriview<span class="token punctuation">.</span>ShowDialog<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">Catch</span> ex <span class="token keyword">As</span> Exception
MessageBox<span class="token punctuation">.</span>Show<span class="token punctuation">(</span><span class="token string">&quot;error:&quot;</span> <span class="token operator">&amp;</span> ex<span class="token punctuation">.</span>ToString<span class="token punctuation">)</span>
<span class="token keyword">Finally</span>

<span class="token keyword">End</span> <span class="token keyword">Try</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token keyword">Private</span> <span class="token keyword">Sub</span> PrintDataGrid_PrintPage<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> ev <span class="token keyword">As</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing<span class="token punctuation">.</span>PrintPageEventArgs<span class="token punctuation">)</span>

<span class="token comment">&#39;A4纸 A4 纸，210 x 297 毫米。</span>
<span class="token comment">&#39;B5纸 B5 纸，182 x 257 毫米。</span>

<span class="token keyword">Dim</span> strPrint <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token comment">&#39;当前要打印的文本</span>
<span class="token keyword">Dim</span> DrawBrush <span class="token keyword">As</span> <span class="token keyword">New</span> SolidBrush<span class="token punctuation">(</span>System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Color<span class="token punctuation">.</span>Blue<span class="token punctuation">)</span> <span class="token comment">&#39;当前画笔颜色</span>

<span class="token keyword">Dim</span> X <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前要打印的文本的横坐标</span>
<span class="token keyword">Dim</span> Y <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前要打印的文本的列坐标</span>

<span class="token keyword">Dim</span> DrawPoint <span class="token keyword">As</span> <span class="token keyword">New</span> PointF<span class="token punctuation">(</span>X<span class="token punctuation">,</span> Y<span class="token punctuation">)</span>
<span class="token keyword">Dim</span> row_count <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token comment">&#39;当前要打印的行</span>

PrintRecordLeave <span class="token operator">=</span> DataGridTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count <span class="token operator">-</span> PrintRecordComplete <span class="token comment">&#39;还有多少条记录没有打印</span>

PageNumber <span class="token operator">=</span> PrintRecordLeave <span class="token operator">/</span> PrintRecordNumber <span class="token comment">&#39;共需要打印的页数</span>
PrintingPageNumber <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">&#39;因为每打印一个新页都要计算还有多少页没有打印所以以打印的页数初始为0</span>

<span class="token comment">&#39;将当前页分成基本的单元</span>
<span class="token keyword">If</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>Landscape <span class="token operator">=</span> <span class="token boolean">True</span> <span class="token keyword">Then</span>
X_unit <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Height <span class="token operator">/</span> <span class="token punctuation">(</span>DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>
Y_unit <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Width <span class="token operator">/</span> PrintLines

<span class="token keyword">Else</span>
X_unit <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Width <span class="token operator">/</span> <span class="token punctuation">(</span>DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>
Y_unit <span class="token operator">=</span> PrintDataGrid<span class="token punctuation">.</span>DefaultPageSettings<span class="token punctuation">.</span>PaperSize<span class="token punctuation">.</span>Height <span class="token operator">/</span> PrintLines

<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token comment">&#39;计算,余下的记录条数是否还可以在一页打印,不满一页时为假</span>
<span class="token keyword">If</span> DataGridTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count <span class="token operator">-</span> PrintingPageNumber <span class="token operator">*</span> PrintRecordNumber <span class="token operator">&gt;</span><span class="token operator">=</span> PrintRecordNumber <span class="token keyword">Then</span>
PageRecordNumber <span class="token operator">=</span> PrintRecordNumber
<span class="token keyword">Else</span>
PageRecordNumber <span class="token operator">=</span> <span class="token punctuation">(</span>DataGridTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count <span class="token operator">-</span> PrintingPageNumber <span class="token operator">*</span> PrintRecordNumber<span class="token punctuation">)</span> <span class="token keyword">Mod</span> PrintRecordNumber
<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token keyword">While</span> PrintingPageNumber <span class="token operator">&lt;</span><span class="token operator">=</span> PageNumber

<span class="token comment">&#39;文档标题----------------打印开始</span>
strPrint <span class="token operator">=</span> DataGridSource<span class="token punctuation">.</span>CaptionText <span class="token comment">&#39;文档标题</span>
DrawPoint <span class="token operator">=</span> <span class="token keyword">New</span> PointF<span class="token punctuation">(</span>X_unit<span class="token punctuation">,</span> Y_unit<span class="token punctuation">)</span>
ev<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span>DrawString<span class="token punctuation">(</span>strPrint<span class="token punctuation">,</span> PrintFont<span class="token punctuation">,</span> DrawBrush<span class="token punctuation">,</span> DrawPoint<span class="token punctuation">)</span>
<span class="token comment">&#39;文档标题----------------打印结束</span>

<span class="token comment">&#39;得到DATAGRID的所有列名</span>
<span class="token keyword">Dim</span> ColumnText<span class="token punctuation">(</span>DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count<span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">String</span>
<span class="token keyword">Dim</span> Table <span class="token keyword">As</span> <span class="token keyword">Integer</span>

<span class="token keyword">For</span> Cols <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">To</span> DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count <span class="token operator">-</span> <span class="token number">1</span>

ColumnText<span class="token punctuation">(</span>Cols<span class="token punctuation">)</span> <span class="token operator">=</span> DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">(</span>Cols<span class="token punctuation">)</span><span class="token punctuation">.</span>ToString <span class="token comment">&#39;得到当前所有的列名</span>

DrawPoint <span class="token operator">=</span> <span class="token keyword">New</span> PointF<span class="token punctuation">(</span>X_unit <span class="token operator">*</span> <span class="token punctuation">(</span>Cols <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Y_unit <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
ev<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span>DrawString<span class="token punctuation">(</span>ColumnText<span class="token punctuation">(</span>Cols<span class="token punctuation">)</span><span class="token punctuation">,</span> PrintFont<span class="token punctuation">,</span> DrawBrush<span class="token punctuation">,</span> DrawPoint<span class="token punctuation">)</span>

<span class="token keyword">Next</span>

DrawPoint <span class="token operator">=</span> <span class="token keyword">New</span> PointF<span class="token punctuation">(</span>X_unit<span class="token punctuation">,</span> Y_unit <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">Call</span> DrawLine<span class="token punctuation">(</span>DrawPoint<span class="token punctuation">,</span> ev<span class="token punctuation">)</span> <span class="token comment">&#39;画线</span>
<span class="token comment">&#39;结束---------------------得到DATAGRID的所有列名</span>

<span class="token keyword">Dim</span> PrintingLine <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">&#39;当前页面已经打印的记录行数</span>

<span class="token comment">&#39;用于确定是否换页的标记</span>
<span class="token keyword">Dim</span> strUpData <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token comment">&#39;当前数据的前一个数据</span>
<span class="token keyword">Dim</span> strNonce <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token comment">&#39;当前数据</span>

<span class="token keyword">While</span> PrintingLine <span class="token operator">&lt;</span> PageRecordNumber

DataGridRow <span class="token operator">=</span> DataGridTable<span class="token punctuation">.</span>Rows<span class="token punctuation">(</span>PrintRecordComplete<span class="token punctuation">)</span> <span class="token comment">&#39;确定要当前要打印的记录的行号</span>
<span class="token keyword">For</span> Cols <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">To</span> DataGridTable<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count <span class="token operator">-</span> <span class="token number">1</span>
DrawPoint<span class="token punctuation">.</span>X <span class="token operator">=</span> X_unit <span class="token operator">*</span> <span class="token punctuation">(</span>Cols <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
DrawPoint<span class="token punctuation">.</span>Y <span class="token operator">=</span> Y_unit <span class="token operator">*</span> <span class="token punctuation">(</span>PrintingLine <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>

<span class="token keyword">If</span> Cols <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">Then</span> <span class="token comment">&#39;所要根据此列的数据分页</span>
<span class="token keyword">If</span> strUpData <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span> <span class="token comment">&#39;And strNonce &lt;&gt; &quot;&quot;</span>
<span class="token keyword">If</span> strUpData <span class="token operator">&lt;</span><span class="token operator">&gt;</span> DataGridRow<span class="token punctuation">(</span>ColumnText<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">Then</span>
ev<span class="token punctuation">.</span>HasMorePages <span class="token operator">=</span> <span class="token boolean">True</span>
<span class="token keyword">Exit</span> <span class="token keyword">Sub</span>

<span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>

ev<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span>DrawString<span class="token punctuation">(</span>DataGridRow<span class="token punctuation">(</span>ColumnText<span class="token punctuation">(</span>Cols<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> PrintFont<span class="token punctuation">,</span> DrawBrush<span class="token punctuation">,</span> DrawPoint<span class="token punctuation">)</span>
strUpData <span class="token operator">=</span> DataGridRow<span class="token punctuation">(</span>ColumnText<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">&#39;当前行数据打印完成后,将打记录的第一列保存,(也可不用此语句,只为明确)</span>
<span class="token keyword">Next</span>

DrawPoint<span class="token punctuation">.</span>X <span class="token operator">=</span> X_unit <span class="token operator">*</span> <span class="token number">1</span>
DrawPoint<span class="token punctuation">.</span>Y <span class="token operator">=</span> Y_unit <span class="token operator">*</span> <span class="token punctuation">(</span>PrintingLine <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>

<span class="token keyword">Call</span> DrawLine<span class="token punctuation">(</span>DrawPoint<span class="token punctuation">,</span> ev<span class="token punctuation">)</span>

PrintingLine <span class="token operator">+</span><span class="token operator">=</span> <span class="token number">1</span>
PrintRecordComplete <span class="token operator">+</span><span class="token operator">=</span> <span class="token number">1</span>

<span class="token comment">&#39;打印完最后一条记录后结束打印.</span>
<span class="token comment">&#39;如:当前有500条记录.从0开始打印,实际打印的为第一条记录.则打印500条时实际的是第501条记录.也就是最后一条</span>
<span class="token comment">&#39;datagridtable.rows.count得到就是表内的实际记录条数,共有多少条记录(从1开始),当</span>
<span class="token comment">&#39;printrecordcomplete&gt;=datagridtable.rows.count也就是当前已经打印到了500条,加1后将要打印第501条,越界,则结束.</span>
<span class="token keyword">If</span> PrintRecordComplete <span class="token operator">&gt;</span><span class="token operator">=</span> DataGridTable<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count <span class="token keyword">Then</span>
ev<span class="token punctuation">.</span>HasMorePages <span class="token operator">=</span> <span class="token boolean">False</span>
<span class="token keyword">Exit</span> <span class="token keyword">Sub</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">While</span>

PrintingPageNumber <span class="token operator">+</span><span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">If</span> PrintingPageNumber <span class="token operator">&gt;</span> PageNumber <span class="token keyword">Then</span>
ev<span class="token punctuation">.</span>HasMorePages <span class="token operator">=</span> <span class="token boolean">False</span>
<span class="token keyword">Else</span>

ev<span class="token punctuation">.</span>HasMorePages <span class="token operator">=</span> <span class="token boolean">True</span>
<span class="token keyword">Exit</span> <span class="token keyword">While</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>

<span class="token keyword">End</span> <span class="token keyword">While</span>

<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token comment">&#39;画线 只必指定当前行的打印文字的开始位置就可,x,y为当前行文字的打印位置</span>
<span class="token keyword">Private</span> <span class="token keyword">Sub</span> DrawLine<span class="token punctuation">(</span><span class="token keyword">ByVal</span> point <span class="token keyword">As</span> PointF<span class="token punctuation">,</span> <span class="token keyword">ByVal</span> ev <span class="token keyword">As</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing<span class="token punctuation">.</span>PrintPageEventArgs<span class="token punctuation">)</span>
<span class="token keyword">Dim</span> blackPen <span class="token keyword">As</span> <span class="token keyword">New</span> Pen<span class="token punctuation">(</span>System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Color<span class="token punctuation">.</span>Black<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

ev<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span>DrawLine<span class="token punctuation">(</span>blackPen<span class="token punctuation">,</span> point<span class="token punctuation">.</span>X<span class="token punctuation">,</span> point<span class="token punctuation">.</span>Y <span class="token operator">+</span> PrintFont<span class="token punctuation">.</span>Height<span class="token punctuation">,</span> point<span class="token punctuation">.</span>X <span class="token operator">*</span> <span class="token punctuation">(</span>ColsCount <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> point<span class="token punctuation">.</span>Y <span class="token operator">+</span> PrintFont<span class="token punctuation">.</span>Height<span class="token punctuation">)</span>

<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token keyword">End</span> <span class="token keyword">Class</span>

<span class="token comment">&#39;\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`</span>

<span class="token keyword">Private</span> aa <span class="token keyword">As</span> PrintDataGrid<span class="token punctuation">.</span>PrintDataGrid

aa <span class="token operator">=</span> <span class="token keyword">New</span> PrintDataGrid<span class="token punctuation">.</span>PrintDataGrid<span class="token punctuation">(</span>DataGrid1<span class="token punctuation">)</span>

aa<span class="token punctuation">.</span>setPrintFont<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">New</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font<span class="token punctuation">(</span><span class="token string">&quot;宋体&quot;</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token comment">&#39;打印文本的字体</span>
aa<span class="token punctuation">.</span>setPrintRecordNumber <span class="token operator">=</span> <span class="token number">30</span> <span class="token comment">&#39;每页要打印的记录行数</span>

aa<span class="token punctuation">.</span>Print<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p><strong>功能</strong>:可以直接打印DATAGRID控件中的数据,但不能对数据进行格式化,功能还在完善中:)</p><p>希望大家多多指教.谢谢.</p>`,5),e=[o];function c(k,r){return s(),a("div",null,e)}const u=n(p,[["render",c],["__file","dg40.html.vue"]]);export{u as default};
