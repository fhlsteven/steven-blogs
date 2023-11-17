import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="判断一个整数是否是对称数" tabindex="-1"><a class="header-anchor" href="#判断一个整数是否是对称数" aria-hidden="true">#</a> 判断一个整数是否是对称数</h1><p>源作者：追风 人气：2048</p><p>昨天到一家公司笔试,做了一道判断一个整数是否是对称数的题.要求用Pascal语言,回来后我也用C#来实现.算法如下，期望对初学C#的朋友有点帮助．这里我用了两种算法实现.</p><p>算法一,先取首个与末个数字比较，再取第二个与倒数第二个字符比较，以此类推．．．在每一次比较中若不相等则返回一个为false的bool值，即这个数不是对称数．具体程序如此而已下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication3</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">36455463</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> flag<span class="token punctuation">;</span>
            flag <span class="token operator">=</span> <span class="token function">Symmetry</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;是对称数!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;不是对称数!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Symmetry</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> Val<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">;</span>
            s <span class="token operator">=</span> Val<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">char</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">//如果Val是对称数flag为真,否则为假</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>Length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                x <span class="token operator">=</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                y <span class="token operator">=</span> s<span class="token punctuation">[</span>s<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> y<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>  <span class="token comment">//不是对称数</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> flag<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>算法二,先定义一个字符串，按倒序的方式读入这个整数依次用连接字符串的文法赋给这个串．最后比较两个字符串是否相等．若不相等则返回一个为false的bool值，即这个数不是对称数．具体程序如此而已下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication3</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">36455463</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> flag<span class="token punctuation">;</span>
            flag <span class="token operator">=</span> <span class="token function">Symmetry</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;是对称数!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token string">&quot;不是对称数!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Symmetry</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> Val<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">,</span> x <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            s <span class="token operator">=</span> Val<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">//如果Val是对称数flag为真,否则为假</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> s<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                x <span class="token operator">=</span> x <span class="token operator">+</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> x<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>  <span class="token comment">//不是对称数</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> flag<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7),c=[o];function e(l,k){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","cspdsop7.html.vue"]]);export{i as default};
