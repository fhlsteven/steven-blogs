import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="对windows-窗体程序-如何做用户登录界面" tabindex="-1"><a class="header-anchor" href="#对windows-窗体程序-如何做用户登录界面" aria-hidden="true">#</a> 对Windows 窗体程序,如何做用户登录界面</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  对Windows 窗体程序,如何做用户登录界面.
作　　者：  zhangweibing (冰)
等　　级：  ^
信 誉 值：  97
所属论坛：  .NET技术 C#
问题点数：  30
回复次数：  4
发表时间：  2003-8-26 8:52:20
</code></pre></div><p>用C#做了一个Windows 窗体程序,想在进入该程序时加入一个用户登录界面,用来控制程序的使用权限,如何做,最好有程序例子.谢谢!</p><hr><hr><p>回复人： greenhill1(小山) ( 三级(初级)) 信誉：100 2003-8-26 9:00:26 得分:8</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM adminguanli&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> pw <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        thisConnection<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">SqlCommand</span> thisCommand <span class="token operator">=</span> thisConnection<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        thisCommand<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> sql<span class="token punctuation">;</span>

        <span class="token class-name">SqlDataReader</span> thisReader <span class="token operator">=</span> thisCommand<span class="token punctuation">.</span><span class="token function">ExecuteReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>thisReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            pw <span class="token operator">=</span> thisReader<span class="token punctuation">[</span><span class="token string">&quot;adminpass&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        thisReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        thisConnection<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请输入密码！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            textBox1<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pw <span class="token operator">==</span> textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                panel1<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                button3<span class="token punctuation">.</span><span class="token function">Focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;您输入的密码不正确，请重新输入！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： greenhill1(小山) ( 三级(初级)) 信誉：100 2003-8-26 9:02:39 得分:5</p><blockquote><p>这是比较简单的用户认证的一段代码！只是实现了对密码的确认，你做这个的关键是在对数据库的操作上，查询数据库里存放的用户名和密码！然后对用户输入的进行验证</p></blockquote><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：111 2003-8-26 9:13:44 得分:13</p><blockquote><p>主要是用数据库进行用户登录的验证，而一个登录界面的做法有很多种。不是一尘不变的。但有一点比较有用，就是你的验证界面在主窗体的MainForm_Load()Event中显示效果会比较好点。</p></blockquote><p>回复人： pretender1982(伪装者) ( 二级(初级)) 信誉：97 2003-8-26 12:22:13 得分:4</p><blockquote><p>c#入门经典有这个例子<br> 在web log 那一章，用asp.net做的</p></blockquote><hr><p>该问题已经结贴 ，得分记录： greenhill1 (8)、 greenhill1 (5)、 cocosoft (13)、 pretender1982 (4)、</p>`,16),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","win22.html.vue"]]);export{k as default};
