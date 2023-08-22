import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t={},o=p(`<h1 id="关于c-的高效随机字符串" tabindex="-1"><a class="header-anchor" href="#关于c-的高效随机字符串" aria-hidden="true">#</a> 关于C# 的高效随机字符串</h1><p>ArLi2003 csdn 2003-6-14</p><p>使用<code>RNGCryptoServiceProvider</code> 做种，可以在一秒内产生的随机数重复率非常的低，对于以往使用时间做种的方法是个升级，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>Cryptography</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 随机密码</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">RandomStr</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> myVersion <span class="token operator">=</span> <span class="token string">&quot;1.2&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">/********
        * Const and Function
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> defaultLength <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> rndBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">RNGCryptoServiceProvider</span> rng <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RNGCryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            rng<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>rndBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> BitConverter<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>rndBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/********
        * getRndCode of all char .
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> strLen<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Random</span> RandomObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Random</span><span class="token punctuation">(</span><span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> buildRndCodeReturn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                buildRndCodeReturn <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>RandomObj<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> buildRndCodeReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOfAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span>defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOfAll</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span>LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/********
        * getRndCode of only .
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sCharLow <span class="token operator">=</span> <span class="token string">&quot;abcdefghijklmnopqrstuvwxyz&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sCharUpp <span class="token operator">=</span> <span class="token string">&quot;ABCDEFGHIJKLMNOPQRSTUVWXYZ&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sNumber <span class="token operator">=</span> <span class="token string">&quot;0123456789&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> StrOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> strLen<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Random</span> RandomObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Random</span><span class="token punctuation">(</span><span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> buildRndCodeReturn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                buildRndCodeReturn <span class="token operator">+=</span> StrOf<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>RandomObj<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> StrOf<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> buildRndCodeReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>sCharLow <span class="token operator">+</span> sNumber<span class="token punctuation">,</span> defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>sCharLow <span class="token operator">+</span> sNumber<span class="token punctuation">,</span> LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> bUseUpper<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseNumber<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strTmp <span class="token operator">=</span> sCharLow<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseUpper<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sCharUpp<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseNumber<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sNumber<span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>strTmp<span class="token punctuation">,</span> defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseUpper<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseNumber<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strTmp <span class="token operator">=</span> sCharLow<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseUpper<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sCharUpp<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseNumber<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sNumber<span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>strTmp<span class="token punctuation">,</span> LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(l,k){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","cspdsop13.html.vue"]]);export{r as default};
