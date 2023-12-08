import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="字符串加密" tabindex="-1"><a class="header-anchor" href="#字符串加密" aria-hidden="true">#</a> 字符串加密</h1><p>可以用DSA和RSA，</p><p>如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>Cryptography</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">dsacrypto_SignData</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//先要将字符串转换为字节数组，这与编码有关。</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;this is a test.&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//选择签名方式，有RSA和DSA</span>
        <span class="token class-name">DSACryptoServiceProvider</span> dsac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DSACryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sign <span class="token operator">=</span> dsac<span class="token punctuation">.</span><span class="token function">SignData</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//sign便是出来的签名结果。</span>

        <span class="token comment">//下面是认证了</span>
        <span class="token class-name">DSACryptoServiceProvider</span> dsac2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DSACryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dsac2<span class="token punctuation">.</span><span class="token function">FromXmlString</span><span class="token punctuation">(</span>dsac<span class="token punctuation">.</span><span class="token function">ToXmlString</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> ver <span class="token operator">=</span> dsac2<span class="token punctuation">.</span><span class="token function">VerifyData</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> sign<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ver<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;通过&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;不能通过&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>RSA类似，不过RSA比DSA慢得多，但比DSA安全。RSA可以选择关键字的大小，越大越安全</p>`,5),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","encdec3.html.vue"]]);export{i as default};
