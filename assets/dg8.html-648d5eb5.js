import{_ as o,o as e,c as t,a}from"./app-a2b6e588.js";const r={},d=a(`<h1 id="请问-我用sql语句删除了datagrid里面的一条数据以后-用refresh-方法刷新datagrid去没有反应-为什么" tabindex="-1"><a class="header-anchor" href="#请问-我用sql语句删除了datagrid里面的一条数据以后-用refresh-方法刷新datagrid去没有反应-为什么" aria-hidden="true">#</a> 请问，我用sql语句删除了datagrid里面的一条数据以后，用refresh()方法刷新datagrid去没有反应！？为什么？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  请问，我用sql语句删除了datagrid里面的一条数据以后，用refresh()方法刷新datagrid去没有反应！？为什么？
作　　者：  luoxiang2000 (腾空)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  10
发表时间：  2003-7-13 1:13:39
</code></pre></div><p>谢！</p><hr><hr><p>回复人： lufly2000(凌绝顶) ( 四级(中级)) 信誉：99 2003-7-13 1:16:54 得分:5</p><blockquote><p>是删除了数据源中的数据吧？重新绑定！</p></blockquote><p>回复人： jianglinchun(萧丰) ( 四级(中级)) 信誉：100 2003-7-13 9:40:51 得分:2</p><blockquote><p>就像楼上说的，需要重新绑定datagrid的数据源就可以了。</p></blockquote><p>回复人： snof(雪狼) ( 两星(中级)) 信誉：105 2003-7-13 9:49:50 得分:5</p><blockquote><p>在你删除之前就绑定数据源和DataGrid，然后在删除的时候用绑定的代码：如下<br><code>this.BindingContext[dt,&quot;person&quot;].RemoveAt(this.BindingContext[dt,&quot;person&quot;].Position)</code><br> 其中dt是数据集，person是数据表名</p></blockquote><p>回复人： youngby(诗人) ( 五级(中级)) 信誉：100 2003-7-13 10:06:55 得分:2</p><blockquote><p>myDg.databin.......</p></blockquote><p>回复人： BugBuilder(啪啪) ( 二级(初级)) 信誉：98 2003-7-13 10:34:57 得分:2</p><blockquote><p><code>DataBinding()</code></p></blockquote><p>回复人： GreenSpring(清青泉) ( 三级(初级)) 信誉：100 2003-7-13 12:38:24 得分:2</p><blockquote><p>refresh 的作用时 ：强制控件使其工作区无效并立即重绘自己和任何子控件<br> 它并不是刷新数据<br> 要想刷新数据，要么你重新帮定一次数据，要么在对数据操作时也要对与只帮定的数据表（TABLE）进行同样的操作操作（增，删，改等）</p></blockquote><p>回复人： 91bct(行人) ( 四级(中级)) 信誉：100 2003-7-13 13:07:04 得分:0</p><blockquote><p>同意楼上所说。</p></blockquote><p>回复人： fallgao(秋枫) ( 一级(初级)) 信誉：100 2003-7-13 13:31:14 得分:2</p><blockquote><p>数据库删除操作后，dataset需要刷新后才能在datagrid中显示</p></blockquote><p>回复人： dragonsuc(新的开始) ( 三级(初级)) 信誉：100 2003-7-13 13:50:17 得分:0</p><blockquote><p>重新绑定</p></blockquote><p>回复人： wjo(啊强) ( 一级(初级)) 信誉：100 2003-7-13 18:18:23 得分:0</p><blockquote><p>重新绑定就可以</p></blockquote><p>该问题已经结贴 ，得分记录： lufly2000 (5)、 jianglinchun (2)、 snof (5)、 youngby (2)、 BugBuilder (2)、 GreenSpring (2)、 fallgao (2)、</p>`,26),n=[d];function p(c,l){return e(),t("div",null,n)}const u=o(r,[["render",p],["__file","dg8.html.vue"]]);export{u as default};
