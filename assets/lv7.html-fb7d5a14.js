import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="listview排序总结" tabindex="-1"><a class="header-anchor" href="#listview排序总结" aria-hidden="true">#</a> ListView排序总结</h1><p>ListView的排序还存在一个问题没有解决,当第一列为序号时，要始终保持序号为升序，应该怎样解决？</p><p>当Column为动态时，排序会报错，把<code>//this.listView1.ListViewItemSorter = null;</code>放在更新Column之前，就可以解决！</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> CurrentColumn <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">//记录上次点击的列号</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> b_Convert <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//记录正逆序信息</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">listView1_ColumnClick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ColumnClickEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column <span class="token operator">==</span> CurrentColumn<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        b_Convert <span class="token operator">=</span> <span class="token operator">!</span>b_Convert<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column <span class="token operator">==</span> <span class="token number">3</span> <span class="token operator">||</span> e<span class="token punctuation">.</span>Column <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>ListViewItemSorter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SortBySubItem</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column<span class="token punctuation">,</span> b_Convert<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//数值排序</span>
        <span class="token keyword">else</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>ListViewItemSorter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SortBySubItem</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column<span class="token punctuation">,</span> b_Convert<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//字符排序</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        CurrentColumn <span class="token operator">=</span> e<span class="token punctuation">.</span>Column<span class="token punctuation">;</span>
        b_Convert <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column <span class="token operator">==</span> <span class="token number">3</span> <span class="token operator">||</span> e<span class="token punctuation">.</span>Column <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>ListViewItemSorter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SortBySubItem</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column<span class="token punctuation">,</span> b_Convert<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>ListViewItemSorter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SortBySubItem</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Column<span class="token punctuation">,</span> b_Convert<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SortBySubItem</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>IComparer</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_Column <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_SortType <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//排序类型</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_asc <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">SortBySubItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> Column<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bAsc<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_Column <span class="token operator">=</span> Column<span class="token punctuation">;</span>
        m_asc <span class="token operator">=</span> bAsc<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">SortBySubItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> Column<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bAsc<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> SortType<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_Column <span class="token operator">=</span> Column<span class="token punctuation">;</span>
        m_SortType <span class="token operator">=</span> SortType<span class="token punctuation">;</span>
        m_asc <span class="token operator">=</span> bAsc<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token return-type class-name"><span class="token keyword">int</span></span> IComparer<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> item1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ListViewItem<span class="token punctuation">)</span>x<span class="token punctuation">)</span><span class="token punctuation">.</span>SubItems<span class="token punctuation">[</span>m_Column<span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> item2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ListViewItem<span class="token punctuation">)</span>y<span class="token punctuation">)</span><span class="token punctuation">.</span>SubItems<span class="token punctuation">[</span>m_Column<span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intSort <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>m_asc<span class="token punctuation">)</span><span class="token comment">//反序</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> temp <span class="token operator">=</span> item1<span class="token punctuation">;</span>
            item1 <span class="token operator">=</span> item2<span class="token punctuation">;</span>
            item2 <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>m_SortType <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>   <span class="token comment">//字符排序</span>
            intSort <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span>item1<span class="token punctuation">,</span> item2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>      <span class="token comment">//数值排序</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">double</span></span> str1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">double</span></span> str2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>item1 <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token comment">//为空设置为最小</span>
                <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>item2 <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                str1 <span class="token operator">=</span> <span class="token keyword">double</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>item1<span class="token punctuation">)</span><span class="token punctuation">;</span>
                str2 <span class="token operator">=</span> <span class="token keyword">double</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>item2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//转换出错</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>str1 <span class="token operator">&gt;=</span> str2<span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> intSort<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(l,u){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","lv7.html.vue"]]);export{r as default};
