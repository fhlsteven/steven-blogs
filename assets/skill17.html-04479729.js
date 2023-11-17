import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t="/steven-blogs/assets/skill17_1-54be37b8.png",o={},e=p('<h1 id="c-开发windows应用程序几个小技巧" tabindex="-1"><a class="header-anchor" href="#c-开发windows应用程序几个小技巧" aria-hidden="true">#</a> c#开发windows应用程序几个小技巧</h1><p>最近，我在用.net做一个c/s的项目,把我做的情况给大家说说。</p><p>datagrid是用的c1控件的c1FlexGrid，功能很多。</p><p><img src="'+t+`" alt="skill17_1"></p><p>自定义分组和outlook形式的列头拖拽。</p><p><code>textbox,combobox,checkbox</code>是继承.net自带的控件，自己扩展的。</p><p>现在说一说碰到的几个问题，及解决方法：</p><ol><li>一个应用程序只能被用户打开一次</li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Process</span> mobj_pro <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Process<span class="token punctuation">[</span><span class="token punctuation">]</span></span> mobj_proList <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetProcessesByName</span><span class="token punctuation">(</span>mobj_pro<span class="token punctuation">.</span>ProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>mobj_proList<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;当前的应用程序已打开！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;系统提示&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Exclamation<span class="token punctuation">,</span> MessageBoxDefaultButton<span class="token punctuation">.</span>Button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="2"><li>一个框架窗口下只打开一个子窗口</li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">CustomerAdd</span> pobj_CustomerAdd<span class="token punctuation">;</span>
<span class="token class-name">Form</span> pobj_CustomerAdd_Return <span class="token operator">=</span> <span class="token function">CheckIsExit</span><span class="token punctuation">(</span><span class="token string">&quot;CustomerAdd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>pobj_CustomerAdd_Return <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    pobj_CustomerAdd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomerAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">OpenSheet</span><span class="token punctuation">(</span>pobj_CustomerAdd<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token function">OpenSheet</span><span class="token punctuation">(</span><span class="token punctuation">(</span>CustomerAdd<span class="token punctuation">)</span>pobj_CustomerAdd_Return<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OpenSheet</span><span class="token punctuation">(</span><span class="token class-name">Form</span> pobj_form<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    pobj_form<span class="token punctuation">.</span>MdiParent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    pobj_form<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 判断窗口是否存在</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ps_windowName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>窗口的名称<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span>存在返回此窗口的实例 不存在返回null<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
<span class="token return-type class-name">Form</span> <span class="token function">CheckIsExit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ps_windowName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MdiChildren<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>MdiChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Name <span class="token operator">==</span> ps_windowName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MdiChildren<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>弹出式窗口显示渐变效果</li></ol><p>在页面上添加一个timer控件fadeTimer,interval设为50</p><p>类的实例变量为<code>private m_showing=true;</code></p><p>在form_load中写：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>Opacity <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
<span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fadeTimer<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>在timer控件的Tick事件中写：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>m_showing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">double</span></span> d <span class="token operator">=</span> <span class="token number">1000.0</span> <span class="token operator">/</span> fadeTimer<span class="token punctuation">.</span>Interval <span class="token operator">/</span> <span class="token number">100.0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Opacity <span class="token operator">+</span> d <span class="token operator">&gt;=</span> <span class="token number">1.0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Opacity <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">;</span>
        fadeTimer<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        Opacity <span class="token operator">+=</span> d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">double</span></span> d <span class="token operator">=</span> <span class="token number">1000.0</span> <span class="token operator">/</span> fadeTimer<span class="token punctuation">.</span>Interval <span class="token operator">/</span> <span class="token number">100.0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Opacity <span class="token operator">-</span> d <span class="token operator">&lt;=</span> <span class="token number">0.0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Opacity <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>
        fadeTimer<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        Opacity <span class="token operator">-=</span> d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="4"><li>在控件textbox中实现按回车键相当于tab键的作用</li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OSTextBox</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">TextBox</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">OSTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token class-name"><span class="token keyword">bool</span></span> mb_IsKeyEnter <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span>
    <span class="token attribute"><span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Data&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span>
    <span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span>
    <span class="token class-name">MergableProperty</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span></span>
    <span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsKeyEnter
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> mb_IsKeyEnter<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            mb_IsKeyEnter <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnKeyPress</span><span class="token punctuation">(</span><span class="token class-name">KeyPressEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnKeyPress</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mb_IsKeyEnter<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>KeyChar <span class="token operator">==</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>Keys<span class="token punctuation">.</span>Enter<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                SendKeys<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;{Tab}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>还有很多东西，正在研究中，比如发票套打在c/s中的实现，用.net读取IC卡等，等完成了再给大家共享</p><hr><hr><p>2004-07-23 23:08 by wayfarer</p><blockquote><p>不错！<br><br> 希望有更多的。</p></blockquote><p>2004-07-24 10:17 by ChiKing-Lau</p><blockquote><p>我倒是很关注你的.net读取IC卡哦，尽快了，pls....</p></blockquote><p>2004-07-24 11:15 by shanliangluo</p><blockquote><p>very 瓜</p></blockquote>`,30),c=[e];function u(l,k){return s(),a("div",null,c)}const r=n(o,[["render",u],["__file","skill17.html.vue"]]);export{r as default};
