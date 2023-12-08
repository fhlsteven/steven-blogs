import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="listview如何对数字排序-如何在column显示那个三角" tabindex="-1"><a class="header-anchor" href="#listview如何对数字排序-如何在column显示那个三角" aria-hidden="true">#</a> listview如何对数字排序?如何在Column显示那个三角</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  listview如何对数字进行排序? 还有 如何在Column显示那个三角?
作　　者：  bborn (五六七嗒八)
等　　级：  ^^
信 誉 值：  105
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  8
发表时间：  2003-9-22 12:46:16
</code></pre></div><p>msdn上给的排序例子 如下<br> 是把数字当字符串来进行排序的<br> 比如从小到大排序的话 11会排在9的前面<br> 因为9&gt;1 而不是和11来比较<br> 有没有办法来让它进行数字比较?<br> 还有 如果排序的时候 怎么在Column显示出上三角或者下三角<br> 来指示上排序或者下排序</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">ListViewItemComparer</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IComparer</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> col<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">ListViewItemComparer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        col<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">ListViewItemComparer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> column<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        col<span class="token operator">=</span>column<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Compare</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> String<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ListViewItem<span class="token punctuation">)</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span>SubItems<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ListViewItem<span class="token punctuation">)</span>y<span class="token punctuation">)</span><span class="token punctuation">.</span>SubItems<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>回复人： linuxnew(johny) ( 一级(初级)) 信誉：100 2003-9-22 13:53:26 得分:5</p><blockquote><p>要自己写排序方法</p></blockquote><p>回复人： bborn(五六七嗒八) ( 二级(初级)) 信誉：105 2003-9-22 23:46:56 得分:0</p><blockquote><p>有例子吗?</p></blockquote><p>回复人： Reeezak(收破烂的) ( 三级(初级)) 信誉：100 2003-9-23 0:18:49 得分:8</p><blockquote><p>自己写代码吧<br> 不是很难的<br> 数据结构里面N多排序算法<br> 随便找一种就可以了<br> 只不过是从C或者PASCAL移植到C＃而已</p></blockquote><p>回复人： bborn(五六七嗒八) ( 二级(初级)) 信誉：105 2003-9-23 0:32:11 得分:0</p><blockquote><p>这样 如何判断用户点击的是不是我要排序的那一栏了?<br><br> 假如我分 姓名 年龄 性别 对于年龄这一栏我想用自己的排序<br> 怎么判断用户点击了这一栏<br><br> 还有 如何把 字符串类型的数字转换成 int 型<br></p></blockquote><p>回复人： Reeezak(收破烂的) ( 三级(初级)) 信誉：100 2003-9-23 0:40:50 得分:0</p><blockquote><p><code>Int32.Parse(string)</code><br><br> 对于点击Column的问题，我也正在解决，跟你的问题差不多<br> 估计今天晚上就可以搞掂<br> 等下如果我解决了，还没有人回答的话，我就来说<br> ^_^</p></blockquote><p>回复人： eggh(eggh) ( 一级(初级)) 信誉：100 2003-9-23 8:27:23 得分:1</p><blockquote><p>上www.codeproject.com有现成的例子.</p></blockquote><p>回复人： bborn(五六七嗒八) ( 二级(初级)) 信誉：105 2003-9-24 12:44:22 得分:0</p><blockquote><p>不给个地址?</p></blockquote><p>回复人： AsongY(独狼) ( 一级(初级)) 信誉：100 2003-9-24 17:13:22 得分:6</p><blockquote><p>listview的受保护的方法：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnColumnClick</span><span class="token punctuation">(</span>
   <span class="token class-name">ColumnClickEventArgs</span> e
<span class="token punctuation">)</span>
</code></pre></div><blockquote><p>中可以得到你所点击的column（e.Column是你所点击的column的index）。</p></blockquote><p>该问题已经结贴 ，得分记录： linuxnew (5)、 Reeezak (8)、 eggh (1)、 AsongY (6)、</p>`,25),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","lv3.html.vue"]]);export{i as default};
