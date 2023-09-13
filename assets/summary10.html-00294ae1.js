import{_ as s,o as n,c as a,a as p}from"./app-477de5b2.js";const e={},t=p(`<h1 id="如何引用另一个文件中定义的类" tabindex="-1"><a class="header-anchor" href="#如何引用另一个文件中定义的类" aria-hidden="true">#</a> 如何引用另一个文件中定义的类</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何引用另一个文件中定义的类
作　　者：  JCC0128 (又忘了先搜索再提问)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  10
回复次数：  4
发表时间：  2003-8-24 10:10:17
</code></pre></div><p>我建了一个项目之后，然后新建文件 DbServer.cs，其中用来定义数据库操作的类，如下，我如何在我的Form1.cs中引用这个文件中的类?</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span> <span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">N1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DBServer</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">SqlConnection</span> <span class="token function">ConnectDB</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> pstr_ServerName <span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> pstr_DBName <span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> pstr_UserName <span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> pstr_Password<span class="token punctuation">)</span>
        <span class="token range operator">..</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>回复人： LongFire(狙击手) ( 一级(初级)) 信誉：100 2003-8-24 10:16:33 得分:10</p><blockquote><p>using 类所属的namespace</p></blockquote><p>回复人： LongFire(狙击手) ( 一级(初级)) 信誉：100 2003-8-24 10:16:46 得分:0</p><blockquote><p>using 类所属的namespace;</p></blockquote><p>回复人： JCC0128(又忘了先搜索再提问) ( 一级(初级)) 信誉：100 2003-8-24 10:17:21 得分:0</p><blockquote><p>using过了!还是不管用</p></blockquote><p>回复人： JCC0128(又忘了先搜索再提问) ( 一级(初级)) 信誉：100 2003-8-24 10:28:44 得分:0</p><blockquote><p>已经解决：我用的新建文件，应该用&quot;添加新项&quot;</p></blockquote><p>该问题已经结贴 ，得分记录： LongFire (10)、</p>`,15),o=[t];function c(l,u){return n(),a("div",null,o)}const r=s(e,[["render",c],["__file","summary10.html.vue"]]);export{r as default};
