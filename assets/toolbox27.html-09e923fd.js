import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="winform-分页控件" tabindex="-1"><a class="header-anchor" href="#winform-分页控件" aria-hidden="true">#</a> winform 分页控件</h1><p>上博客园也有2个月的时间了，一直都只是看别人写的帖子。今天终于注册了个ID。</p><p>这次把我写的一个分页控件贴上来。前阵子写了一个winform的数据库管理程序，用一个dataGrid显示数据库表中的所有内容，后来发现当数据库中的条目增多的时候，程序运行速度明显下降，系统占用内存也很大，决定对dataGrid做个分页，每次只取出要显示页的内容。上网搜了一下，没有找到我需要的，于是自己写了一个分页控件。</p><p>程序很简单，用的时候需要提供pageCount（页数），pageShow(显示的页数），currPage（当前页号）</p><p>控件提供一个自定义的事件LnkLblClicked，当用户点击页面链接的时候就会触发这个事件。下面是程序的源码。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ActiveButton</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for PageControl.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PageControl</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>UserControl</span></span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Required designer variable.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> pageCount<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> currPage<span class="token punctuation">;</span>
        <span class="token comment">// private int pageSize;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> pageShow<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> xDistance<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> bolPrev<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> bolNext<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> start<span class="token punctuation">,</span> end<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name">EventHandler</span> lnkLblClicked<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token return-type class-name">EventHandler</span> LnkLblClicked
        <span class="token punctuation">{</span>
            <span class="token keyword">add</span> <span class="token punctuation">{</span> lnkLblClicked <span class="token operator">+=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">remove</span> <span class="token punctuation">{</span> lnkLblClicked <span class="token operator">-=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">protected</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnLnkLblClicked</span><span class="token punctuation">(</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>lnkLblClicked <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token function">lnkLblClicked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        Field
        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Field</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> PageCount
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> pageCount<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> pageCount <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> CurrPage
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> currPage<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> currPage <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//        public int PageSize</span>
        <span class="token comment">//        {</span>
        <span class="token comment">//            get{return pageSize;}</span>
        <span class="token comment">//            set{pageSize = value;}</span>
        <span class="token comment">//        }</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> PageShow
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> pageShow<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> pageShow <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> XDistance
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> xDistance<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> xDistance <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>


        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">PageControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// This call is required by the Windows.Forms Form Designer.</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// TODO: Add any initialization after the InitializeComponent call</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token function">PageControl</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> pageCount<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> pageSize<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> pageShow<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>pageCount <span class="token operator">=</span> pageCount<span class="token punctuation">;</span>
            <span class="token comment">//    this.pageSize = pageSize;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>pageShow <span class="token operator">=</span> pageShow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
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

        Component Designer generated code
        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Component Designer generated code</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify </span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// PageControl</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;PageControl&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">320</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PageControl_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PageControl_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            xDistance <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            bolPrev <span class="token operator">=</span> pageCount <span class="token operator">&gt;</span> pageShow<span class="token punctuation">;</span>
            <span class="token comment">//    currPage = pageCount;</span>
            end <span class="token operator">=</span> pageCount<span class="token punctuation">;</span>
            start <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> end <span class="token operator">-</span> pageShow <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">DrawControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> lblPageCount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            lblPageCount<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;共&quot;</span> <span class="token operator">+</span> pageCount <span class="token operator">+</span> <span class="token string">&quot;页&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">AddControl</span><span class="token punctuation">(</span>lblPageCount<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> lblPageCount<span class="token punctuation">.</span>Bounds<span class="token punctuation">.</span>Right<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> lblPageCount<span class="token punctuation">.</span>Location<span class="token punctuation">.</span>Y<span class="token punctuation">;</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control</span> currCtl <span class="token operator">=</span> lblPageCount<span class="token punctuation">;</span>

            <span class="token comment">//calculate page start and end</span>
            <span class="token class-name"><span class="token keyword">int</span></span> pageShowCount <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span>pageCount<span class="token punctuation">,</span> pageShow<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//            start = Math.Max(1,currPage - pageShow/2);</span>
            <span class="token comment">//            end = start + pageShowCount -1;</span>
            <span class="token comment">//            if (pageCount - currPage &lt; pageShow/2)</span>
            <span class="token comment">//            {</span>
            <span class="token comment">//                end = pageCount;</span>
            <span class="token comment">//                start = pageCount - pageShowCount + 1;</span>
            <span class="token comment">//            }</span>
            bolPrev <span class="token operator">=</span> start <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            bolNext <span class="token operator">=</span> end <span class="token operator">!=</span> pageCount<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>bolPrev<span class="token punctuation">)</span>
            <span class="token punctuation">{</span><span class="token comment">//add Linklabel &quot;prev&quot;</span>
                <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>LinkLabel</span> lblPrev <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                lblPrev<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;前一页&quot;</span><span class="token punctuation">;</span>
                x <span class="token operator">+=</span> xDistance<span class="token punctuation">;</span>
                <span class="token punctuation">(</span><span class="token punctuation">(</span>LinkLabel<span class="token punctuation">)</span>lblPrev<span class="token punctuation">)</span><span class="token punctuation">.</span>LinkClicked <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkLabelLinkClickedEventHandler</span><span class="token punctuation">(</span>lblCtl_Clicked<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">AddControl</span><span class="token punctuation">(</span>lblPrev<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                currCtl <span class="token operator">=</span> lblPrev<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span><span class="token comment">// add linklabel &quot;page&quot;</span>
                x <span class="token operator">=</span> currCtl<span class="token punctuation">.</span>Bounds<span class="token punctuation">.</span>Right<span class="token punctuation">;</span>
                <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control</span> lblCtl <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> currPage<span class="token punctuation">)</span>
                    lblCtl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    lblCtl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>LinkLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">(</span><span class="token punctuation">(</span>LinkLabel<span class="token punctuation">)</span>lblCtl<span class="token punctuation">)</span><span class="token punctuation">.</span>LinkClicked <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkLabelLinkClickedEventHandler</span><span class="token punctuation">(</span>lblCtl_Clicked<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                lblCtl<span class="token punctuation">.</span>Text <span class="token operator">=</span> i<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                x <span class="token operator">+=</span> xDistance<span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">AddControl</span><span class="token punctuation">(</span>lblCtl<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                currCtl <span class="token operator">=</span> lblCtl<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bolNext<span class="token punctuation">)</span>
            <span class="token punctuation">{</span><span class="token comment">// add linklabel &quot;next&quot;</span>
                <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>LinkLabel</span> lblNext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkLabel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                lblNext<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;后一页&quot;</span><span class="token punctuation">;</span>
                x <span class="token operator">=</span> currCtl<span class="token punctuation">.</span>Bounds<span class="token punctuation">.</span>Right<span class="token punctuation">;</span>
                x <span class="token operator">+=</span> xDistance<span class="token punctuation">;</span>
                <span class="token punctuation">(</span><span class="token punctuation">(</span>LinkLabel<span class="token punctuation">)</span>lblNext<span class="token punctuation">)</span><span class="token punctuation">.</span>LinkClicked <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinkLabelLinkClickedEventHandler</span><span class="token punctuation">(</span>lblCtl_Clicked<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">AddControl</span><span class="token punctuation">(</span>lblNext<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddControl</span><span class="token punctuation">(</span><span class="token class-name">Control</span> ctlObj<span class="token punctuation">,</span> <span class="token class-name">Point</span> point<span class="token punctuation">,</span> <span class="token class-name">Size</span> size<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ctlObj<span class="token punctuation">.</span>Anchor <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>AnchorStyles<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>AnchorStyles<span class="token punctuation">.</span>Top <span class="token operator">|</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>AnchorStyles<span class="token punctuation">.</span>Bottom<span class="token punctuation">)</span>
                <span class="token operator">|</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>AnchorStyles<span class="token punctuation">.</span>Left<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ctlObj<span class="token punctuation">.</span>Location <span class="token operator">=</span> point<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> ctlObj<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Length <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ctlObj<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;页&quot;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ctlObj<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;共&quot;</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
                    x <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    x <span class="token operator">*=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            ctlObj<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>ctlObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">lblCtl_Clicked</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>LinkLabelLinkClickedEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sender <span class="token keyword">is</span> <span class="token class-name">LinkLabel</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> lblText <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>LinkLabel<span class="token punctuation">)</span>sender<span class="token punctuation">)</span><span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>lblText <span class="token operator">==</span> <span class="token string">&quot;前一页&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        end <span class="token operator">=</span> start <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        start <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> end <span class="token operator">-</span> pageShow <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        currPage <span class="token operator">=</span> end<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>lblText <span class="token operator">==</span> <span class="token string">&quot;后一页&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        start <span class="token operator">=</span> end <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        end <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span>pageCount<span class="token punctuation">,</span> start <span class="token operator">+</span> pageShow <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        currPage <span class="token operator">=</span> end<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">{</span>
                        <span class="token class-name"><span class="token keyword">int</span></span> page <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>lblText<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        currPage <span class="token operator">=</span> page<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">DrawControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">OnLnkLblClicked</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReDraw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            bolPrev <span class="token operator">=</span> pageCount <span class="token operator">&gt;</span> pageShow<span class="token punctuation">;</span>
            <span class="token comment">//    currPage = pageCount;</span>
            end <span class="token operator">=</span> pageCount<span class="token punctuation">;</span>
            start <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> end <span class="token operator">-</span> pageShow <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">DrawControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">OnLnkLblClicked</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>posted on 2004-08-20 15:41 flood 阅读(126)</p>`,7),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","toolbox27.html.vue"]]);export{i as default};
