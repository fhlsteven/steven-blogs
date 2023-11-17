import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="如何通过节点的名字获取节点的index" tabindex="-1"><a class="header-anchor" href="#如何通过节点的名字获取节点的index" aria-hidden="true">#</a> 如何通过节点的名字获取节点的index</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何通过节点的名字获取节点的index
作　　者：  reddust (reddust)
等　　级：  ^^
信 誉 值：  60
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  3
发表时间：  2003-5-8 19:43:34
</code></pre></div><p>up</p><hr><hr><p>回复人： jiezhi(Niu) ( 一星(中级)) 信誉：100 2003-5-8 21:23:44 得分:20</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">findNode</span><span class="token punctuation">(</span><span class="token class-name">TreeNodeCollection</span> tnc<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> nodeTextorID<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> flag<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> myIndex<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tn <span class="token keyword">in</span> tnc<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count<span class="token operator">!=</span><span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">findNode</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Nodes<span class="token punctuation">,</span>nodeTextorID<span class="token punctuation">,</span>flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tn<span class="token punctuation">.</span>ID<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span>nodeTextorID<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                myIndex<span class="token operator">=</span>tn<span class="token punctuation">.</span><span class="token function">GetNodeIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tn<span class="token punctuation">.</span>Expanded<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>

                TreeView1<span class="token punctuation">.</span>SelectedNodeIndex<span class="token operator">=</span>myIndex<span class="token punctuation">;</span>
                <span class="token keyword">return</span> myIndex<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span>nodeTextorID<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                myIndex<span class="token operator">=</span>tn<span class="token punctuation">.</span><span class="token function">GetNodeIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tn<span class="token punctuation">.</span>Expanded<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
                
                TreeView1<span class="token punctuation">.</span>SelectedNodeIndex<span class="token operator">=</span>myIndex<span class="token punctuation">;</span>
                <span class="token keyword">return</span> myIndex<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： Knight94(愚翁) ( 两星(中级)) 信誉：110 2003-5-9 9:38:13 得分:0</p><blockquote><p>看来只有遍历整个树了，但如果遇到相同名字，就会有问题，同时index相对于同一个父节点而言。</p></blockquote><p>回复人： reddust(reddust) ( 二级(初级)) 信誉：60 2003-5-9 23:43:39 得分:0</p><blockquote><p>还是没弄明白，麻烦各位看看这个帖子！<br><code>http://expert.csdn.net/Expert/TopicView1.asp?id=1763362</code></p></blockquote><p>该问题已经结贴 ，得分记录： jiezhi (20)、</p>`,13),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","tv3.html.vue"]]);export{i as default};
