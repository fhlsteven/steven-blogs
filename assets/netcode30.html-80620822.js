import{_ as n,o as s,c as a,a as t}from"./app-382facc7.js";const p={},o=t(`<h1 id="ping的c-版本" tabindex="-1"><a class="header-anchor" href="#ping的c-版本" aria-hidden="true">#</a> PING的C#版本</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Wuyin<span class="token punctuation">.</span>Network<span class="token punctuation">.</span>Components</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Ping 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ping</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">GetHostIP</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> host<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPAddress<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ips <span class="token operator">=</span> System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">.</span>AddressList<span class="token punctuation">;</span> 
            <span class="token class-name"><span class="token keyword">string</span></span> Ips <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPAddress</span> ip <span class="token keyword">in</span> ips<span class="token punctuation">)</span>
                Ips<span class="token operator">+=</span>ip<span class="token operator">+</span><span class="token string">&quot;|&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> Ips<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;|&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode30.html.vue"]]);export{i as default};
