import{_ as e,o as t,c as a,a as o}from"./app-d9da1b6d.js";const c={},d=o(`<h1 id="获取datagrid当前行特定列的值-winform" tabindex="-1"><a class="header-anchor" href="#获取datagrid当前行特定列的值-winform" aria-hidden="true">#</a> 获取datagrid当前行特定列的值（winform）</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  获取datagrid当前行特定列的值（winform）
作　　者：  pmtasp ()
等　　级：  ^^
信 誉 值：  96
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  4
发表时间：  2003-11-28 12:09:28
</code></pre></div><p>不借用dataset，直接用datagrid的属性能不能取得当前行特定列的值。谢谢</p><hr><hr><p>回复人： smiletosky(仰笑九天) ( 五级(中级)) 信誉：101 2003-11-28 12:44:21 得分:2</p><blockquote><p>可以取datagrid的当前列，然后取他的第几列</p></blockquote><p>回复人： lijue(lijuechun) ( 一级(初级)) 信誉：100 2003-11-28 12:49:49 得分:18</p><blockquote><p>可以取，用<code>datagrid[row,col]</code>,就可以。</p></blockquote><p>回复人： pmtasp() ( 二级(初级)) 信誉：96 2003-11-28 12:51:22 得分:0</p><blockquote><p>请问smiletosky(仰笑九天)，具体代码怎么写</p></blockquote><p>回复人： pmtasp() ( 二级(初级)) 信誉：96 2003-11-28 12:57:46 得分:0</p><blockquote><p>谢谢二位，用了lijue(lijuechun) 的方法</p></blockquote><p>该问题已经结贴 ，得分记录： smiletosky (2)、 lijue (18)、</p>`,14),i=[d];function r(n,p){return t(),a("div",null,i)}const s=e(c,[["render",r],["__file","dg21.html.vue"]]);export{s as default};
