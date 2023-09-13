import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="使用c-实现阿拉伯数字到大写中文的转换" tabindex="-1"><a class="header-anchor" href="#使用c-实现阿拉伯数字到大写中文的转换" aria-hidden="true">#</a> 使用C#实现阿拉伯数字到大写中文的转换</h1><p>menway csdn 2003-5-8</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//Money类</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Money</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 本类实现阿拉伯数字到大写中文的转换</span>
    <span class="token doc-comment comment">/// 该类没有对非法数字进行判别</span>
    <span class="token doc-comment comment">/// 请调用NumToChn方法</span>
    <span class="token doc-comment comment">/// 作者：menway</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Money</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Money</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add constructor logic here</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token keyword">char</span> 转换数字<span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">char</span></span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> stringChnNames <span class="token operator">=</span> <span class="token string">&quot;零一二三四五六七八九&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> stringNumNames <span class="token operator">=</span> <span class="token string">&quot;0123456789&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> stringChnNames<span class="token punctuation">[</span>stringNumNames<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token keyword">string</span> 转换万以下整数<span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> stringArrayLevelNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;十&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;百&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;千&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> ret <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> x<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span>
                    ret <span class="token operator">=</span> 转换数字<span class="token punctuation">(</span>x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> ret<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    ret <span class="token operator">=</span> 转换数字<span class="token punctuation">(</span>x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> stringArrayLevelNames<span class="token punctuation">[</span>x<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">]</span> <span class="token operator">+</span> ret<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;零零&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">[</span>ret<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;零&#39;</span> <span class="token operator">&amp;&amp;</span> ret<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>ret<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">.</span>Length <span class="token operator">&gt;=</span> <span class="token number">2</span> <span class="token operator">&amp;&amp;</span> ret<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;一十&quot;</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token keyword">string</span> 转换整数<span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> len <span class="token operator">=</span> x<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> ret<span class="token punctuation">,</span> temp<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&lt;=</span> <span class="token number">4</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&lt;=</span> <span class="token number">8</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ret <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;万&quot;</span><span class="token punctuation">;</span>
                temp <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>temp<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;千&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> temp <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                    ret <span class="token operator">+=</span> <span class="token string">&quot;零&quot;</span> <span class="token operator">+</span> temp<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    ret <span class="token operator">+=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                ret <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> len <span class="token operator">-</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;亿&quot;</span><span class="token punctuation">;</span>
                temp <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>temp<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;千&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> temp <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                    ret <span class="token operator">+=</span> <span class="token string">&quot;零&quot;</span> <span class="token operator">+</span> temp<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    ret <span class="token operator">+=</span> temp<span class="token punctuation">;</span>
                ret <span class="token operator">+=</span> <span class="token string">&quot;万&quot;</span><span class="token punctuation">;</span>
                temp <span class="token operator">=</span> 转换万以下整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>len <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>temp<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;千&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> temp <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                    ret <span class="token operator">+=</span> <span class="token string">&quot;零&quot;</span> <span class="token operator">+</span> temp<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    ret <span class="token operator">+=</span> temp<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;零万&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;零零&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ret<span class="token punctuation">[</span>ret<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;零&#39;</span> <span class="token operator">&amp;&amp;</span> ret<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>ret<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">string</span> 转换小数<span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> ret <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> x<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                ret <span class="token operator">+=</span> 转换数字<span class="token punctuation">(</span>x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">NumToChn</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> x<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> ret <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;-&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ret <span class="token operator">=</span> <span class="token string">&quot;负&quot;</span><span class="token punctuation">;</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
                x <span class="token operator">=</span> <span class="token string">&quot;0&quot;</span> <span class="token operator">+</span> x<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">[</span>x<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
                x <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                ret <span class="token operator">+=</span> 转换整数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> x<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;点&quot;</span> <span class="token operator">+</span> 转换小数<span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                ret <span class="token operator">+=</span> 转换整数<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//测试工程</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Money</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">MoneyApp</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// The main entry point for the application.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add code to start application here</span>
            <span class="token comment">//</span>
            <span class="token class-name">Money</span> myMoney <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Money</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> x<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;X=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                x <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}={1}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> myMoney<span class="token punctuation">.</span><span class="token function">NumToChn</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","cspbase11.html.vue"]]);export{r as default};
