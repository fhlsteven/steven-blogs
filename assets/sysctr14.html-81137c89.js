import{_ as t,r as o,o as e,c as p,b as n,d as s,e as c,a as r}from"./app-a2b6e588.js";const l={},i={id:"用c-修改windows-2000用户密码",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#用c-修改windows-2000用户密码","aria-hidden":"true"},"#",-1),k={href:"http://www.cnblogs.com/gujianxin/archive/2004/03/24/4045.aspx",target:"_blank",rel:"noopener noreferrer"},d=r(`<p><strong>实现</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Programming in C#</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>DirectoryServices</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyChangePasswordExample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DirectoryEntry</span> myDirectoryEntry<span class="token punctuation">;</span>
        myDirectoryEntry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectoryEntry</span> <span class="token punctuation">(</span><span class="token string">@&quot;WinNT://yourdirectoryserver/TheUsername,User&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myDirectoryEntry<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token string">&quot;setPassword&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;NewPassword&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myDirectoryEntry<span class="token punctuation">.</span><span class="token function">CommitChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>posted on 2004-03-24 13:37 木头象 阅读(2545) 评论(4)</p></blockquote>`,3);function y(m,_){const a=o("ExternalLinkIcon");return e(),p("div",null,[n("h1",i,[u,s(),n("a",k,[s("用C#修改Windows 2000用户密码"),c(a)])]),d])}const g=t(l,[["render",y],["__file","sysctr14.html.vue"]]);export{g as default};
