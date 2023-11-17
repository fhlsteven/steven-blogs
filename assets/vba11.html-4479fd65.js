import{_ as n,o as a,c as s,a as t}from"./app-a2b6e588.js";const o={},p=t(`<h1 id="关于文件读取得问题" tabindex="-1"><a class="header-anchor" href="#关于文件读取得问题" aria-hidden="true">#</a> 关于文件读取得问题</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  关于文件读取得问题
作　　者：  hzlwzpinlu (规划)
等　　级：  ^
信 誉 值：  100
所属论坛：  VB VBA
问题点数：  20
回复次数：  2
发表时间：  2003-6-2 20:12:00
</code></pre></div><p>我在VB开发时遇到一个问题，需要读取Excel的文件，处理对应的数据后，显示在窗口内，希望得到以下几方面的指教：<br> 1、如何打开和读取对应的文件和数据？<br> 2、数据处理后在窗口内显示，是一组数据，希望用Textbox来显示，对它能否进行循环处理？如:Text1.Text/Text2.Text/……（40个）。<br> 3、希望输出的文件是以当前的日期为文件名的一部分，如何实现？<br> 4、打印的格式如何控制？希望是打印一张表格，有7列40行。<br> 本人新来此地，刚用也不久，那位高手可以给与支持吗？<br> 谢了！</p><hr><hr><p>回复人： hzlwzpinlu(规划) ( 一级(初级)) 信誉：100 2003-6-2 20:33:18 得分:0</p><blockquote><p>那位大侠出手，在下不胜感激！<br> 有点急！</p></blockquote><p>回复人： rappercn(rapper) ( 三级(初级)) 信誉：97 2003-6-2 21:06:33 得分:20</p><blockquote><p>1.dim xlApp as excel.application</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">dim</span> xlBook <span class="token keyword">as</span> excel<span class="token punctuation">.</span>workbook
<span class="token keyword">dim</span> xlsheet <span class="token keyword">as</span> excel<span class="token punctuation">.</span>worksheet

<span class="token keyword">Set</span> xlApp <span class="token operator">=</span> CreateObject<span class="token punctuation">(</span><span class="token string">&quot;Excel.Application&quot;</span><span class="token punctuation">)</span> 
xlApp<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">False</span> <span class="token comment">‘隐藏EXCEL应用程序窗口 </span>
<span class="token keyword">Set</span> xlBook <span class="token operator">=</span> xlApp<span class="token punctuation">.</span>Workbooks<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token string">&quot;excel.xls&quot;</span><span class="token punctuation">)</span> 
<span class="token keyword">Set</span> xlSheet <span class="token operator">=</span> xlBook<span class="token punctuation">.</span>Worksheets<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
xlbook<span class="token punctuation">.</span>save
xlbook<span class="token punctuation">.</span>close
xlapp<span class="token punctuation">.</span>quit
<span class="token keyword">set</span> xlbook<span class="token operator">=</span><span class="token boolean">nothing</span>
<span class="token keyword">set</span> xlapp<span class="token operator">=</span><span class="token boolean">nothing</span>
</code></pre></div><blockquote><p>2.控件数组，text(0)-text(40)，用index循环<br> 或者：<code>me.control(&quot;text&quot; &amp; i).text = &quot;&quot;</code><br><br> 3.open &quot;c:&quot; &amp; format(NOW(),&quot;YYYYMMDDHHMMSS&quot;) &amp; &quot;.tmp&quot; for output as #1<br><br> 4.用报表工具画（水晶或者Active Report）</p></blockquote><p>该问题已经结贴 ，得分记录： rappercn (20)、</p>`,12),e=[p];function c(l,u){return a(),s("div",null,e)}const r=n(o,[["render",c],["__file","vba11.html.vue"]]);export{r as default};
