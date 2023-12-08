import{_ as e,o,c as r,a as t}from"./app-f0851ed3.js";const d={},c=t(`<h1 id="怎样在winform中只定treenode的节点id" tabindex="-1"><a class="header-anchor" href="#怎样在winform中只定treenode的节点id" aria-hidden="true">#</a> 怎样在winform中只定TreeNode的节点id</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎样在winform中只定TreeNode的节点id;
作　　者：  lylhyh (萍飘浪子)
等　　级：  ^^^^
信 誉 值：  69
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  6
发表时间：  2003-4-9 22:30:51
</code></pre></div><p>怎样在winform中只定TreeNode的节点id;</p><hr><hr><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-9 22:36:56 得分:0</p><blockquote><p>说祥细点！！！！</p></blockquote><p>回复人： lylhyh(萍飘浪子) ( 四级(中级)) 信誉：69 2003-4-9 22:39:47 得分:0</p><blockquote><p>在webfrom中的treeView可以指定treenode节点的id.<br> 比如我的一个模块树，我用module_id作为treenode的节点id，用模块名作为treenode的text显示。这样我可以很容易和数据库对应！！<br> winform中怎样实现这种功能！！</p></blockquote><p>回复人： sysu(死树) ( 二级(初级)) 信誉：100 2003-4-9 22:43:29 得分:0</p><blockquote><p>用Tag属性，<br><code>treeView1.SelectedNode.Tag</code></p></blockquote><p>回复人： yarshray(saga jion(心飘情落)) ( 三星(高级)) 信誉：160 2003-4-9 22:43:56 得分:100</p><blockquote><p>你是说唯一标识吧?<br><br> 因为treeview使用的是treenode的集合<br><br> 集合可以索引索引所以不需要<br><br> 也就是treeview.Nodes,因此可以直接索引,且是唯一的标识.<br><br> 如:<br><br><code>treeview.Nodes[i]</code></p></blockquote><p>回复人： The_Gathering(Hydroxide) ( 二级(初级)) 信誉：100 2003-4-9 23:44:01 得分:0</p><blockquote><p>Tree没有这个功能</p></blockquote><p>回复人： hu77wei(万儿红) ( 三级(初级)) 信誉：99 2003-4-10 0:00:46 得分:0</p><blockquote><p>将你的唯一id存入<code>treeView.Nodes[i].tag</code>中.</p></blockquote><p>该问题已经结贴 ，得分记录： yarshray (100)、</p>`,18),i=[c];function n(a,p){return o(),r("div",null,i)}const s=e(d,[["render",n],["__file","tv1.html.vue"]]);export{s as default};
