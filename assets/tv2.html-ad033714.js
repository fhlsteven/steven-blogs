import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="如何控制treeview控件中节点旁复选框的选择和取消呢" tabindex="-1"><a class="header-anchor" href="#如何控制treeview控件中节点旁复选框的选择和取消呢" aria-hidden="true">#</a> 如何控制treeview控件中节点旁复选框的选择和取消呢</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何控制treeview控件中节点旁复选框的选择和取消呢？
作　　者：  reddust (reddust)
等　　级：  ^^
信 誉 值：  60
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  2
发表时间：  2003-5-8 14:24:15
</code></pre></div><p>up</p><hr><hr><p>回复人： suosuoyyy(羊羊) ( 四级(中级)) 信誉：100 2003-5-8 14:49:07 得分:20</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">treeView2_AfterCheck</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeViewEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Checked<span class="token operator">==</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>  
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Checked<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Checked<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>测试通过，看看！</p></blockquote><p>回复人： Ponney(宁) ( 一级(初级)) 信誉：100 2003-5-8 14:53:12 得分:0</p><blockquote><p>跟楼上仁兄观点相同</p></blockquote><p>该问题已经结贴 ，得分记录： suosuoyyy (20)、</p>`,12),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","tv2.html.vue"]]);export{i as default};
