import{_ as n,o as s,c as a,a as t}from"./app-382facc7.js";const p={},o=t(`<h1 id="下载网页数据-zj" tabindex="-1"><a class="header-anchor" href="#下载网页数据-zj" aria-hidden="true">#</a> 下载网页数据_zj</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token comment">// GET方式：</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name">WebClient</span> myclient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> databuffer <span class="token operator">=</span> myclient<span class="token punctuation">.</span><span class="token function">DownloadData</span><span class="token punctuation">(</span>URL<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> maintext <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>databuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    myclient<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>WebException</span> err<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// POST方式：</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name">WebClient</span> myclient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WebClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> url <span class="token operator">=</span> <span class="token string">&quot;http://www.cninfo.com.cn/jjzx/zcjz.jsp&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">NameValueCollection</span> nvc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NameValueCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nvc<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;fundCode&quot;</span><span class="token punctuation">,</span> code值<span class="token punctuation">)</span><span class="token punctuation">;</span>    
    nvc<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;smt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;查询&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> databuffer <span class="token operator">=</span> myclient<span class="token punctuation">.</span><span class="token function">UploadValues</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">&quot;POST&quot;</span><span class="token punctuation">,</span> nvc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> maintext <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>databuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    myclient<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>WebException</span> err<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netinterdu1.html.vue"]]);export{i as default};
