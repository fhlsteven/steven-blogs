import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="ip与主机名解析" tabindex="-1"><a class="header-anchor" href="#ip与主机名解析" aria-hidden="true">#</a> IP与主机名解析</h1><p>作者：任敦浩</p><p>使用System.Net可以实现与Ping命令行类似的IP解析功能，例如将主机名解析为IP或者反过来：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetHostNameByIP</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ipAddress<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPHostEntry</span> hostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>ipAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> hostInfo<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetIPByHostName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> hostName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPHostEntry</span> hostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>hostName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> hostInfo<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>关于作者:</p><p>任敦浩是GrapeCity海外事业部开发员，具有六年的开发经验，从事日本项目开发三年多，熟悉vb, vb.net SQL Server等。</p>`,6),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","netcode36.html.vue"]]);export{k as default};