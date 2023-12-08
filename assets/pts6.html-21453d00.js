import{_ as t,r as e,o as p,c as o,b as n,d as s,e as c,a as l}from"./app-f0851ed3.js";const u={},r={id:"windows服务安装类代码",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#windows服务安装类代码","aria-hidden":"true"},"#",-1),i={href:"https://www.cnblogs.com/jjstar/articles/20353.html",target:"_blank",rel:"noopener noreferrer"},m=l(`<div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ServiceProcess</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WindowsService1</span>
<span class="token punctuation">{</span>
 <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
 <span class="token doc-comment comment">/// myInstall 的摘要说明。</span>
 <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
 <span class="token doc-comment comment">///</span>
 <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">RunInstaller</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
 <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">myInstall</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Installer</span></span>
 <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">ServiceInstaller</span> serviceInstaller<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">ServiceProcessInstaller</span> processInstaller<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token function">myInstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   processInstaller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceProcessInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   serviceInstaller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   processInstaller<span class="token punctuation">.</span>Account <span class="token operator">=</span> ServiceAccount<span class="token punctuation">.</span>LocalSystem<span class="token punctuation">;</span>
   serviceInstaller<span class="token punctuation">.</span>StartType <span class="token operator">=</span> ServiceStartMode<span class="token punctuation">.</span>Automatic<span class="token punctuation">;</span>
   serviceInstaller<span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> <span class="token string">&quot;WindowsService1&quot;</span><span class="token punctuation">;</span>

   Installers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>serviceInstaller<span class="token punctuation">)</span><span class="token punctuation">;</span>
   Installers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>processInstaller<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>posted on 2004-07-02 09:01 陈叙远 阅读(4837) 评论(1)</p></blockquote>`,2);function d(w,v){const a=e("ExternalLinkIcon");return p(),o("div",null,[n("h1",r,[k,s(),n("a",i,[s("windows服务安装类代码"),c(a)])]),m])}const I=t(u,[["render",d],["__file","pts6.html.vue"]]);export{I as default};
