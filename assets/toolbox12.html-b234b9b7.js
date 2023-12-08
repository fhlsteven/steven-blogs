import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-中如何动态实例控件-在线等候" tabindex="-1"><a class="header-anchor" href="#c-中如何动态实例控件-在线等候" aria-hidden="true">#</a> C#中如何动态实例控件?(在线等候)</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  C#中如何动态实例控件?(在线等候)
作　　者：  yangzhiguo (小楊)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  50
回复次数：  10
发表时间：  2003-10-10 15:03:14
</code></pre></div><p>我想在文本框输入一个字串（如：&quot;textBox1&quot;），然后点击命令钮时就创建textBox1的实例。也就是直接根据文本框中输入的字串创建实例！（动态创建的那种）。</p><hr><hr><p>回复人： prettysammi(旻) ( 一级(初级)) 信誉：100 2003-10-10 16:05:51 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>TextBox1<span class="token punctuation">.</span>Text<span class="token operator">!=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TextBox</span> t1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    t1<span class="token punctuation">.</span>ID<span class="token operator">=</span>TextBox1<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token class-name">TableRow</span> tr<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TableRow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">TableCell</span> td<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TableCell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    td<span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>t1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    tr<span class="token punctuation">.</span>Cells<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>td<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Table1<span class="token punctuation">.</span>Rows<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： snof(雪狼) ( 两星(中级)) 信誉：105 2003-10-10 16:10:34 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>TextBox1<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TextBox</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    t<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>TextBox<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    t<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">point</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    t<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： BLGT(菠萝@罐头) ( 二级(初级)) 信誉：100 2003-10-10 16:22:39 得分:0</p><blockquote><p>楼主的意思是不是：如果输入“button&quot;也可以新建一个按钮，按照输入的文字建立控件？<br> 如果是的话我只好帮你顶了</p></blockquote><p>回复人： acxw(小文) ( 二级(初级)) 信誉：99 2003-10-10 16:23:28 得分:0</p><blockquote><p><code>http://www.yesky.com/SoftChannel/72342380468109312/20020114/213862.shtml</code><br><br> 看看这个咯<br><br> 原理是差不多的拉</p></blockquote><p>回复人： sgsh51(共同进步) ( 三级(初级)) 信誉：100 2003-10-10 16:52:01 得分:0</p><blockquote><p>老实说这样做几乎很难实现，<br> 首先你就输入一个字符串&quot;TextBox1&quot;，编译器根本就只是把它当作一个字符串处理，这样是不可能实现的。<br> 如果你能再有一个字段入表名它是什么类型的控件，如&quot;TextBox&quot;,<br> 那么用反射中的InvokeMemeber（)还是可以实现的</p></blockquote><p>回复人： wideroad() ( 三级(初级)) 信誉：100 2003-10-10 17:12:50 得分:0</p><blockquote><p>楼上说得怎么这么高深阿，prettysammi(旻)说得就对！！！</p></blockquote><p>回复人： qqq123(qqq123) ( 三级(初级)) 信誉：100 2003-10-10 19:38:22 得分:50</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CreateControl</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Form1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required designer variable.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// Required for Windows Form Designer support</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add any constructor code after InitializeComponent call</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Clean up any resources being used.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// textBox1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">328</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// button1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">448</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// Form1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">536</span><span class="token punctuation">,</span> <span class="token number">342</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// The main entry point for the application.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token class-name">Point</span> _location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Type</span> type <span class="token operator">=</span> Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                type <span class="token operator">=</span> Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Windows.Forms.&quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;,System.Windows.Forms,Version=1.0.3300.0, Culture=neutral, PublicKeyToken=b77a5c561934e089&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">Control</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsAssignableFrom</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">Control</span> control <span class="token operator">=</span> System<span class="token punctuation">.</span>Activator<span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token class-name">Control</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>control <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
                control<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_location<span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_location<span class="token punctuation">.</span>X <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_location<span class="token punctuation">.</span>Y <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>control<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： sgsh51(共同进步) ( 三级(初级)) 信誉：100 2003-10-10 20:39:44 得分:0</p><blockquote><p>我想知道楼主的意思是不是只要在TextBox框中输入一个字符串就产生一个相应的实例？<br> 比如如你所说输入一个&quot;TextBox1&quot;就产生一个TextBox的实例，且ID为TextBox1,如果真是想这样的话，那我就有几个问题想问你？<br> 第一：光根据一个字符串你怎么来判断它生成的是什么类型的控件，就如你所说的，输入一个“Button1&quot;就应该要生成Button的控件实列，输入一个“Label1&quot;就应该生成一个Label的空间实例！<br> 第二：或许你可以通过截取字符串来判定你要生成为什么控件的类型，比如&quot;TextBox1&quot;你可以截取出TextBox，从而知道它是一个TextBox类型的控件，但是现在截取的还是字符串，这时要么用switch case (这样的话，扩展性极差级差），还是最终会选择反射。<br> 讲了这些我也不知道是不是理解错了你的意思，我只说了说我的想法</p></blockquote><p>回复人： yangzhiguo(小楊) ( 一级(初级)) 信誉：100 2003-10-13 9:14:30 得分:0</p><blockquote><p>我的意思是:<br> 现在FORM上有N个TEXTBOX控件,名为&quot;TEXT1&quot;,&quot;TEXT2&quot;...&quot;TEXTN&quot;,我要给这N个控件赋值.不知哪有比较好的办法.</p></blockquote><p>回复人： hai4(敏敏) ( 二级(初级)) 信誉：100 2003-10-13 11:20:18 得分:0</p><blockquote><p>用反射一定能实现，如：InvokeMember(...),里面有很多参数，你看一下MSDN,找到你要的那个方法。</p></blockquote><p>该问题已经结贴 ，得分记录： qqq123 (50)、</p>`,29),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","toolbox12.html.vue"]]);export{i as default};