import{_ as e,o as a,c as t,a as n}from"./app-a2b6e588.js";const r={},o=n(`<h1 id="关于文件名的查寻" tabindex="-1"><a class="header-anchor" href="#关于文件名的查寻" aria-hidden="true">#</a> 关于文件名的查寻</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  关于文件名的查寻？
作　　者：  tanjunrong123 (ysj)
等　　级：  ^
信 誉 值：  100
所属论坛：  VB VBA
问题点数：  50
回复次数：  1
发表时间：  2003-7-17 12:59:55
</code></pre></div><p>请教如何在VBA中编程，查寻某一目录下的所有（若会EXCEL类型也可）文件名？</p><hr><hr><p>回复人： diyee(锦衣夜行) ( 二级(初级)) 信誉：100 2003-7-17 13:05:54 得分:50</p><blockquote><p>dir<br> Dir 会返回匹配 pathname 的第一个文件名。若想得到其它匹配 pathname 的文件名，再一次调用 Dir，且不要使用参数。如果已没有合乎条件的文件，则 Dir 会返回一个零长度字符串 (&quot;&quot;)。一旦返回值为零长度字符串，并要再次调用 Dir 时，就必须指定 pathname，否则会产生错误。不必访问到所有匹配当前 pathname 的文件名，就可以改变到一个新的 pathname 上。但是，不能以递归方式来调用 Dir 函数。以 vbDirectory 属性来调用 Dir 不能连续地返回子目录。<br><br> 提示 由于文件名并不会以特别的次序来返回，所以可以将文件名存储在一个数组中，然后再对这个数组排序。</p></blockquote><p>该问题已经结贴 ，得分记录： diyee (50)、</p>`,8),c=[o];function i(s,d){return a(),t("div",null,c)}const h=e(r,[["render",i],["__file","vba12.html.vue"]]);export{h as default};
