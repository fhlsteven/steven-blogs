import{_ as n,o as a,c as s,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="datagrid中的删除问题" tabindex="-1"><a class="header-anchor" href="#datagrid中的删除问题" aria-hidden="true">#</a> datagrid中的删除问题</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  datagrid中的删除问题?
作　　者：  Firestone2003 ()
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  8
发表时间：  2003-11-24 21:45:41
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>dataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">.</span>RowNumber<span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;txl&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">.</span><span class="token function">AcceptChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adapTxl<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">,</span><span class="token string">&quot;txl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为什么在数据库中无法删除这条数据啊??<br> 郁闷中!</p><hr><hr><p>回复人： liusuccess(减肥成功) ( 一级(初级)) 信誉：95 2003-11-24 22:50:05 得分:1</p><blockquote><p>报错吗？</p></blockquote><p>回复人： HNU(惟楚有材，於斯为盛 !) ( 三级(初级)) 信誉：100 2003-11-24 22:52:36 得分:5</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>dataGrid1<span class="token punctuation">.</span>CurrentCell<span class="token punctuation">.</span>RowNumber<span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;txl&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">DataSet</span> changes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">.</span><span class="token function">GetChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>adapTxl<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>changes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>datasetTxl<span class="token punctuation">.</span><span class="token function">AcceptChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： ssdjmcj8048(优游通[UUT]) ( 四级(中级)) 信誉：100 2003-11-25 2:45:53 得分:5</p><blockquote><p><code>this.adapTxl.Update(changes)</code>就可以了；DataAdapter默认是会自动AcceptChanges的</p></blockquote><p>回复人： skykevin(蓝屿) ( 三级(初级)) 信誉：100 2003-11-25 8:47:07 得分:3</p><blockquote><p><code>index=this.dataGrid1.CurrentCell.RowNumber</code>所指的位置不一定和数据集中Table的行一一对应.如:<code>dataGrid1</code>的<code>RowNumber=2</code>,对应于Table中行就不一定是2,解决办法之一如下:</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">CurrencyManager</span> cm<span class="token punctuation">;</span>
cm <span class="token operator">=</span> <span class="token punctuation">(</span>CurrencyManager<span class="token punctuation">)</span> dataGrid1<span class="token punctuation">.</span>Parent<span class="token punctuation">.</span>BindingContext<span class="token punctuation">[</span>dataGrid1<span class="token punctuation">.</span>DataSource<span class="token punctuation">,</span> dataGrid1<span class="token punctuation">.</span>DataMember<span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token keyword">if</span> <span class="token punctuation">(</span>cm<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    cm<span class="token punctuation">.</span><span class="token function">RemoveAt</span><span class="token punctuation">(</span>cm<span class="token punctuation">.</span>Position<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： Firestone2003() ( 一级(初级)) 信誉：100 2003-11-25 10:52:33 得分:0</p><blockquote><p>大家误会我的意思了!<br> 我的程序不报错,就是执行update后不向数据库修改!<br> 想删除的项没有删!<br> 各位大侠救救我吧!快不行了!</p></blockquote><p>回复人： netpot(netpot) ( 三级(初级)) 信誉：100 2003-11-25 12:27:06 得分:5</p><blockquote><p><code>this.datasetTxl.AcceptChanges();</code><br><code>this.adapTxl.Update(this.datasetTxl,&quot;txl&quot;);</code><br> 问题就在你先AcceptChange，那么DataTable中所有的DataRow的RowState都变成unchanged，所以，update方法就什么也不执行了，建议你看看帮助中Adpater的更新过程（针对不同的RowState执行不同的操作）<br> 你去掉AcceptChanges就可以执行更新了，而且更新后自动调用AcceptChange。</p></blockquote><p>回复人： HNU(惟楚有材，於斯为盛 !) ( 三级(初级)) 信誉：100 2003-11-25 13:11:19 得分:1</p><blockquote><p>如skykevin(蓝屿)说那样调整对应关系，修改代码如我说应该不会错的</p></blockquote><p>回复人： Firestone2003() ( 一级(初级)) 信誉：100 2003-11-28 18:15:35 得分:0</p><blockquote><p>谢谢大家！netpot(netpot)说的很对</p></blockquote><p>该问题已经结贴 ，得分记录： liusuccess (1)、 HNU (5)、 ssdjmcj8048 (5)、 skykevin (3)、 netpot (5)、 HNU (1)、</p>`,25),c=[o];function e(u,l){return a(),s("div",null,c)}const k=n(p,[["render",e],["__file","dg20.html.vue"]]);export{k as default};
