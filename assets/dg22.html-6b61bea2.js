import{_ as o,o as e,c as t,a as c}from"./app-f0851ed3.js";const p={},u=c(`<h1 id="菜鸟问题-大家来帮忙-在datagrid里如何统计一列的和" tabindex="-1"><a class="header-anchor" href="#菜鸟问题-大家来帮忙-在datagrid里如何统计一列的和" aria-hidden="true">#</a> 菜鸟问题！大家来帮忙！在DataGrid里如何统计一列的和？？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  菜鸟问题！大家来帮忙！在DataGrid里如何统计一列的和？？
作　　者：  slag (不知道)
等　　级：  ^^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  60
回复次数：  11
发表时间：  2003-11-8 11:53:34
</code></pre></div><p>如题！<br> 请高手们赐教！</p><hr><hr><p>回复人： 513(513) ( 五级(中级)) 信誉：100 2003-11-8 11:57:03 得分:0</p><blockquote><p><code>DataTable.Comput(&quot;Sum(field)&quot;,&quot;1=1&quot;);</code></p></blockquote><p>回复人： slag(不知道) ( 二级(初级)) 信誉：100 2003-11-8 11:59:57 得分:0</p><blockquote><p>to 513(513) ：<br> &quot;1=1&quot;是什么意思？？</p></blockquote><p>回复人： xiaodele(小得乐) ( 四级(中级)) 信誉：99 2003-11-8 12:07:55 得分:0</p><blockquote><p>就是条件，也是说对Table上的行进行全取</p></blockquote><p>回复人： redebug(雷老虎) ( 三级(初级)) 信誉：93 2003-11-8 12:07:56 得分:0</p><blockquote><p>统计的条件，1＝1就是统计所有行，<br> 看看msdn中的datatable类成员介绍就知道了！</p></blockquote><p>回复人： wincore(七点) ( 三级(初级)) 信誉：100 2003-11-8 12:11:04 得分:0</p><blockquote><p><code>Compute(string expression, string filter);</code><br> expression 要计算的表达式。<br> filter 要限制在表达式中进行计算的行的筛选器。<br><br> 返回的是个object 为结果</p></blockquote><p>回复人： wincore(七点) ( 三级(初级)) 信誉：100 2003-11-8 12:14:28 得分:0</p><blockquote><p><code>object objCum = aTable.Compute(&quot;count(field)&quot;,&quot;&quot;);</code><br> filter可以不写，表示不过滤！</p></blockquote><p>回复人： haoliqi(学习男孩) ( 五级(中级)) 信誉：100 2003-11-8 12:25:14 得分:0</p><blockquote><p><code>DataTable.Compute(&quot;sum(列名)&quot;,&quot;条件&quot;)</code></p></blockquote><p>回复人： slag(不知道) ( 二级(初级)) 信誉：100 2003-11-8 12:41:27 得分:0</p><blockquote><p>我写了它怎么报错啊？<br> Invalid usage of aggregate function Sum() and Type: String.<br> 我是这么写的：<code>Response.Write(ds.Tables[&quot;Report&quot;].Compute(&quot;sum(Num)&quot;,&quot;1=1&quot;));</code></p></blockquote><p>回复人： slag(不知道) ( 二级(初级)) 信誉：100 2003-11-8 13:23:48 得分:0</p><blockquote><p>自己Up！！</p></blockquote><p>回复人： chinchy(糟老头) ( 两星(中级)) 信誉：140 2003-11-8 16:32:14 得分:0</p><blockquote><p><code>http://www.extremeexperts.com/Net/Articles/AddingControlstoFooter.aspx</code></p></blockquote><p>回复人： micco() ( 二级(初级)) 信誉：100 2003-11-28 10:42:10 得分:60</p><blockquote><p>？？？</p></blockquote><p>该问题已经结贴 ，得分记录： micco (60)、</p>`,28),a=[u];function l(r,d){return e(),t("div",null,a)}const n=o(p,[["render",l],["__file","dg22.html.vue"]]);export{n as default};