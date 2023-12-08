import{_ as n,o as s,c as a,a as e}from"./app-f0851ed3.js";const t={},p=e(`<h1 id="怎样主动访问一个页面" tabindex="-1"><a class="header-anchor" href="#怎样主动访问一个页面" aria-hidden="true">#</a> 怎样主动访问一个页面</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎样主动访问一个页面
作　　者：  lishiliang (阿世)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  30
回复次数：  3
发表时间：  2003-09-13 14:28:05
</code></pre></div><p>我想在窗口程序里（非asp.net程序）访问一个网络页面，应该怎样写</p><hr><hr><p>回复人： cnhgj(戏子？我菜，故我存在) ( 五级(中级)) 信誉：100 2003-09-13 14:46:00 得分:0</p><blockquote><p>用webBrowser控件</p></blockquote><p>回复人： ego(花花小候) ( 一级(初级)) 信誉：100 2003-09-14 03:31:00 得分:0</p><blockquote><p>System.Net类下的HttpWebRequest和HttpWebResponse<br> 下面是示例：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">Stream</span> Get <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> url <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// create a request based on the URL</span>
    <span class="token class-name">WebRequest</span> req <span class="token operator">=</span> WebRequest<span class="token punctuation">.</span>Create <span class="token punctuation">(</span> url <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// get the response</span>
    <span class="token class-name">WebResponse</span> res <span class="token operator">=</span> req<span class="token punctuation">.</span>GetResponse <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// return a stream containing the response</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span>GetResponseStream <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-09-14 03:35:00 得分:0</p><blockquote><p>用webBrowser控件，然后可以使用Web中的Cookie技术完成。</p></blockquote>`,12),o=[p];function c(l,r){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","netinter10.html.vue"]]);export{i as default};
