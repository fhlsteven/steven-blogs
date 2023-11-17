import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="怎样得到系统字体的名称" tabindex="-1"><a class="header-anchor" href="#怎样得到系统字体的名称" aria-hidden="true">#</a> 怎样得到系统字体的名称</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎样得到系统字体的名称？
作　　者：  curdle (手中无剑)
等　　级：  ^^
信 誉 值：  101
所属论坛：  .NET技术 C#
问题点数：  40
回复次数：  6
发表时间：  2003-9-25 8:47:32
</code></pre></div><p>我想把系统字体的名称放在一个combox控件下拉显示单中,就像word中字体选择一样.<br> 问题是怎样得到windws2000的系统字体的全部名称啊？</p><p>谢谢！！</p><hr><hr><p>回复人： CodingPCPiG(会Coding的猪) ( 二级(初级)) 信誉：100 2003-9-25 9:01:59 得分:5</p><blockquote><p>试试这个FontFamily.Families 行吗?</p></blockquote><p>回复人： atian25(阿天) ( 四级(中级)) 信誉：100 2003-9-25 9:06:23 得分:5</p><blockquote><p>我实验成功过的：webform，其中myFontList是DropDownList</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">FontFamily<span class="token punctuation">[</span><span class="token punctuation">]</span></span> fontFamilies<span class="token punctuation">;</span>
<span class="token class-name">InstalledFontCollection</span> installedFontCollection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InstalledFontCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fontFamilies <span class="token operator">=</span> installedFontCollection<span class="token punctuation">.</span>Families<span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> fontFamilies<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myFontList<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListItem</span><span class="token punctuation">(</span>fontFamilies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>回复人： jjcccc() ( 一星(中级)) 信誉：100 2003-9-25 9:13:28 得分:20</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">FontFamily<span class="token punctuation">[</span><span class="token punctuation">]</span></span> families <span class="token operator">=</span> FontFamily<span class="token punctuation">.</span>Families<span class="token punctuation">;</span>
<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">FontFamily</span> family <span class="token keyword">in</span> families<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    comboBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>family<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： CodingPCPiG(会Coding的猪) ( 二级(初级)) 信誉：100 2003-9-25 9:14:15 得分:5</p><blockquote><p>将系统字体打印到窗体上</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">PaintEventArgs</span> ee<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PaintEventArgs</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">CreateGraphics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>ClientRectangle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">GetFamilies_Example</span><span class="token punctuation">(</span>ee<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetFamilies_Example</span><span class="token punctuation">(</span><span class="token class-name">PaintEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Get an array of the available font families.</span>
    <span class="token class-name">FontFamily<span class="token punctuation">[</span><span class="token punctuation">]</span></span> families <span class="token operator">=</span> FontFamily<span class="token punctuation">.</span><span class="token function">GetFamilies</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Graphics<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Draw text using each of the font families.</span>
    <span class="token class-name">Font</span> familiesFont<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> familyString<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">float</span></span> spacing <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">FontFamily</span> family <span class="token keyword">in</span> families<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            familiesFont <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Font</span><span class="token punctuation">(</span>family<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> FontStyle<span class="token punctuation">.</span>Bold<span class="token punctuation">)</span><span class="token punctuation">;</span>
            familyString <span class="token operator">=</span> <span class="token string">&quot;This is the &quot;</span> <span class="token operator">+</span> family<span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot;family.&quot;</span><span class="token punctuation">;</span>

            e<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>
                familyString<span class="token punctuation">,</span>
                familiesFont<span class="token punctuation">,</span>
                Brushes<span class="token punctuation">.</span>Black<span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PointF</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> spacing<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            spacing <span class="token operator">+=</span> familiesFont<span class="token punctuation">.</span>Height<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span>
        <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： net_lover(孟子E章) ( 五星(高级)) 信誉：115 2003-9-25 9:23:42 得分:5</p><blockquote><p><code>http://xml.sz.luohuedu.net/xml/</code></p></blockquote><p>回复人： curdle(手中无剑) ( 二级(初级)) 信誉：101 2003-9-25 9:59:26 得分:0</p><blockquote><p>感谢以上朋友！结贴.</p></blockquote><p>该问题已经结贴 ，得分记录： CodingPCPiG (5)、 atian25 (5)、 jjcccc (20)、 CodingPCPiG (5)、 net_lover (5)、</p>`,22),c=[o];function e(l,u){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","sysinfo25.html.vue"]]);export{k as default};
