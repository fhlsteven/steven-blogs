import{_ as e,o as t,c,a as o}from"./app-57d1f7b1.js";const n={},r=o(`<h1 id="如何用代码给一个控件添加新的事件" tabindex="-1"><a class="header-anchor" href="#如何用代码给一个控件添加新的事件" aria-hidden="true">#</a> 如何用代码给一个控件添加新的事件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何用代码给一个控件添加新的事件
作　　者：  limengchen (lmc)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  10
回复次数：  4
发表时间：  2003-9-27 18:17:58
</code></pre></div><p>C#自己添加事件的代码是这样的：</p><p><code>this.trvDirectory.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.trvDirectory_AfterSelect);</code></p><p>我想给一个picturebox添加click事件，但是发现System.Windows.Forms下没有PictureBoxEventHandler或类似的项，是否还需要在其它地方进行修改？</p><hr><p>回复人： jeall() ( 二级(初级)) 信誉：100 2003-9-27 19:21:57 得分:0</p><blockquote><p>关注！</p></blockquote><p>回复人： saucer(思归) ( 五星(高级)) 信誉：325 2003-9-27 19:25:26 得分:10</p><blockquote><p>use Click and EventHandler whose signature is like <code>void EventHandler(object sender, EventArgs e)</code></p></blockquote><p>回复人： limengchen(lmc) ( 二级(初级)) 信誉：100 2003-9-27 19:36:50 得分:0</p><blockquote><p>那为什么没有PictureBoxEventHandler呢？</p></blockquote><p>回复人： Azmore(漂流) ( 二级(初级)) 信誉：100 2003-9-27 20:09:37 得分:0</p><blockquote><p>对阿，直接用EventHandler就可以了.</p></blockquote>`,14),l=[r];function a(s,d){return t(),c("div",null,l)}const p=e(n,[["render",a],["__file","cspme3.html.vue"]]);export{p as default};
