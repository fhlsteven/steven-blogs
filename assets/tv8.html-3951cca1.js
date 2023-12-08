import{_ as n,o as a,c as s,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="treeview控件的问题" tabindex="-1"><a class="header-anchor" href="#treeview控件的问题" aria-hidden="true">#</a> treeView控件的问题</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  treeView控件的问题？
作　　者：  juckky (小宝)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  3
发表时间：  2003-8-18 21:19:59
</code></pre></div><p>treeView显示的是中文名称，点击treeView控件时，如何取得该记录的ID号，以前VB不是有个KEY属性吗。。不知道C#里面是怎么实现的。？？求救？</p><hr><hr><p>回复人： dahuzizyd(你就是我心中的女神) ( 五级(中级)) 信誉：100 2003-8-18 22:56:19 得分:10</p><blockquote><p>可以使用TreeNode的Tag属性。</p></blockquote><p>回复人： snof(雪狼) ( 两星(中级)) 信誉：105 2003-8-18 23:22:04 得分:10</p><blockquote><p>在建树的时候就把ID保存到Tag里，方法如下：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">TreeNode</span> zNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Row<span class="token punctuation">[</span><span class="token string">&quot;DeptName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
zNode<span class="token punctuation">.</span>Tag <span class="token operator">=</span> Row<span class="token punctuation">[</span><span class="token string">&quot;DeptID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>Row<span class="token punctuation">[</span><span class="token string">&quot;DeptName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>然后点击的时候就可以用啦，<br><code>this.treeView1.SelectedNode.Tag.toString();</code></p></blockquote><p>回复人： juckky(小宝) ( 一级(初级)) 信誉：100 2003-8-19 16:10:03 得分:0</p><blockquote><p>谢谢。。。我做好了。。。</p></blockquote><p>该问题已经结贴 ，得分记录： dahuzizyd (10)、 snof (10)、</p>`,14),e=[o];function c(u,i){return a(),s("div",null,e)}const k=n(p,[["render",c],["__file","tv8.html.vue"]]);export{k as default};