import{_ as t,r as p,o,c,b as n,d as s,e,a as u}from"./app-d9da1b6d.js";const l={},i={id:"c-实现了语法加亮",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#c-实现了语法加亮","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/skyover/archive/2004/04/17/6363.html",target:"_blank",rel:"noopener noreferrer"},f=u(`<p>核心代码来自AspNetForums.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">StringWriter</span> textBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringWriter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Match</span> match <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>HTMLStr<span class="token punctuation">,</span> <span class="token string">@&quot;\\&quot;, RegexOptions.IgnoreCase | RegexOptions.Compiled);
if (match == null)
{
    Response.Write(HTMLStr);
    return;
}

string codeType = match.Groups[&quot;</span>codeType&quot;<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> content <span class="token operator">=</span> match<span class="token punctuation">.</span>Groups<span class="token punctuation">[</span><span class="token string">&quot;codeContent&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>codeType <span class="token operator">==</span> String<span class="token punctuation">.</span>Empty <span class="token operator">||</span> content <span class="token operator">==</span> String<span class="token punctuation">.</span>Empty<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>HTMLStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// MessageBox.Show(codeType);</span>
<span class="token comment">// MessageBox.Show(content);</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sr <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>codeType <span class="token operator">==</span> <span class="token string">&quot;C#&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;Csharp&gt;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sourceLine <span class="token keyword">in</span> sr<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token function">FixCSLine</span><span class="token punctuation">(</span>sourceLine<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;/Csharp&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>codeType <span class="token operator">==</span> <span class="token string">&quot;JScript.Net&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;JScript.Net&gt;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sourceLine <span class="token keyword">in</span> sr<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token function">FixJSLine</span><span class="token punctuation">(</span>sourceLine<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;/JScript.Net&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>codeType <span class="token operator">==</span> <span class="token string">&quot;VB&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;VB&gt;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sourceLine <span class="token keyword">in</span> sr<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token function">FixVBLine</span><span class="token punctuation">(</span>sourceLine<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    textBuffer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;/VB&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>效果如下：</p><p><code>http://forums.coder.cn/forum/topic.aspx?author_id=2&amp;topic_id=11&amp;category_id=9</code></p>`,4);function d(g,h){const a=p("ExternalLinkIcon");return o(),c("div",null,[n("h1",i,[k,s(),n("a",r,[s("C#实现了语法加亮"),e(a)])]),f])}const q=t(l,[["render",d],["__file","folder4.html.vue"]]);export{q as default};
