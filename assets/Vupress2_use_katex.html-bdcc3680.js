import{_ as e,r as o,o as c,c as l,b as n,d as s,e as t,a as p}from"./app-a2b6e588.js";const r="/steven-blogs/assets/math_1-818b9cbe.png",u="/steven-blogs/assets/math_2-57e78ab5.png",i={},k=n("h1",{id:"vuepress-next-使用数学公式插件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuepress-next-使用数学公式插件","aria-hidden":"true"},"#"),s(" VuePress@next 使用数学公式插件")],-1),d=n("p",null,"搞了一个VuePress1.0的 现在升级了一下，但是使用数学公式的插件老报错啊！经过不懈努力，终于搞定了。现在记录一下。",-1),h=n("h2",{id:"vuepress-介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vuepress-介绍","aria-hidden":"true"},"#"),s(" VuePress 介绍")],-1),m={href:"https://vuepress.github.io/zh",target:"_blank",rel:"noopener noreferrer"},g=p(`<h2 id="遇到的问题" tabindex="-1"><a class="header-anchor" href="#遇到的问题" aria-hidden="true">#</a> 遇到的问题</h2><p>使用数学公式的库，根据网上找的 <code>markdown-it-texmath</code>,<code>markdown-it-katex</code>,<code>markdown-it-mathjax3</code>,这些都可以，然而当我使用了之后没有一个有用的，报错信息(<code>Error: Dynamic require of &quot;markdown-it-mathjax3&quot; is not supported</code>)详细的参见后面的哦！</p><p>此时我的配置：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> description<span class="token punctuation">,</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> head<span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> defalutThemeOK<span class="token punctuation">,</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">code</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">extendsMarkdown</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-mathjax3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 使用这个解析 数学公式</span>
    md<span class="token punctuation">.</span>linkify<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">fuzzyEmail</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="报错信息" tabindex="-1"><a class="header-anchor" href="#报错信息" aria-hidden="true">#</a> 报错信息</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>⠋ Initializing and preparing dataerror error <span class="token keyword">in</span> hook extendsMarkdown from user-config
✖ Initializing and preparing data - failed <span class="token keyword">in</span> 33ms
Error: Dynamic require of <span class="token string">&quot;markdown-it-mathjax3&quot;</span> is not supported
    at file:///F:/StevenBlogs/docs/.vuepress/config.ts.166cda46.mjs:7:9
    at Object.extendsMarkdown <span class="token punctuation">[</span>as hook<span class="token punctuation">]</span> <span class="token punctuation">(</span>file:///F:/StevenBlogs/docs/.vuepress/config.ts.166cda46.mjs:161:12<span class="token punctuation">)</span>
    at Object.process <span class="token punctuation">(</span>file:///F:/StevenBlogs/node_modules/@vuepress/core/dist/index.js:683:37<span class="token punctuation">)</span>
    at async resolveAppMarkdown <span class="token punctuation">(</span>file:///F:/StevenBlogs/node_modules/@vuepress/core/dist/index.js:160:3<span class="token punctuation">)</span>
    at async appInit <span class="token punctuation">(</span>file:///F:/StevenBlogs/node_modules/@vuepress/core/dist/index.js:604:18<span class="token punctuation">)</span>
    at async file:///F:/StevenBlogs/node_modules/@vuepress/cli/dist/index.js:489:7
    at async file:///F:/StevenBlogs/node_modules/@vuepress/utils/dist/index.js:106:20
    at async CAC.dev <span class="token punctuation">(</span>file:///F:/StevenBlogs/node_modules/@vuepress/cli/dist/index.js:488:5<span class="token punctuation">)</span>
</code></pre></div><h2 id="vuepress-2-成功配置" tabindex="-1"><a class="header-anchor" href="#vuepress-2-成功配置" aria-hidden="true">#</a> VuePress 2 成功配置</h2><p>通过各种尝试，和搜各种资料。最后算是我搞定了。</p><p>主要是参考了Maikdown It 插件的文章&quot;@mdit/plugin-katex&quot;[https://mdit-plugins.github.io/zh/katex.html]</p>`,9),y=p(`<li><p>卸载之前没有用的包，我用的npm；</p></li><li><p>安装新的包&quot;@mdit/plugin-katex&quot; <code>npm install @mdit/plugin-katex</code></p></li><li><p>修改配置；</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> katex <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@mdit/plugin-katex&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// …… 省略了没有必要的</span>
    <span class="token function-variable function">extendsMarkdown</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>katex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        md<span class="token punctuation">.</span>linkify<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">fuzzyEmail</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> 
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></li>`,3),f={href:"https://katex.org/docs/browser.html",target:"_blank",rel:"noopener noreferrer"},_=p(`<div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">head</span> <span class="token operator">:</span> HeadConfig<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">=</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;theme-color&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;#3eaf7c&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;apple-mobile-web-app-capable&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;yes&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;apple-mobile-web-app-status-bar-style&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;black&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&#39;stylesheet&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 让md支持数学公式</span>
    <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&quot;stylesheet&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&quot;https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>  <span class="token comment">// 让md支持数学公式</span>
<span class="token punctuation">]</span>
</code></pre></div>`,1),x=n("p",null,"四步骤搞定：看看效果！",-1),b=n("p",null,[n("img",{src:r,alt:"math 1"}),n("img",{src:u,alt:"math 2"})],-1),v=n("h2",{id:"找了的一些文说明的",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#找了的一些文说明的","aria-hidden":"true"},"#"),s(" 找了的一些文说明的")],-1),w={href:"https://github.com/tani/markdown-it-mathjax3/issues?q=is%3Aissue+is%3Aclosed",target:"_blank",rel:"noopener noreferrer"},j={href:"https://github.com/tani/markdown-it-mathjax3/issues/57#issuecomment-1299692985",target:"_blank",rel:"noopener noreferrer"},q={href:"https://blog.chgtaxihe.top/pages/4f9f4f/#%E6%B8%B2%E6%9F%93%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F",target:"_blank",rel:"noopener noreferrer"},E=p(`<h2 id="_1-0-vuepress-的配置" tabindex="-1"><a class="header-anchor" href="#_1-0-vuepress-的配置" aria-hidden="true">#</a> 1.0 VuePress 的配置</h2><p>以下是我的1.0的配置，在本地运行也是正常的！</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;theme-color&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;#3eaf7c&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;apple-mobile-web-app-capable&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;yes&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&#39;meta&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;apple-mobile-web-app-status-bar-style&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;black&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&#39;stylesheet&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>      <span class="token comment">// 让md支持数学公式</span>
        <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&quot;stylesheet&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&quot;https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>  <span class="token comment">// 让md支持数学公式</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;@vuepress/plugin-back-to-top&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;@vuepress/plugin-medium-zoom&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token function">extendMarkdown</span><span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span><span class="token punctuation">{</span>  <span class="token comment">// 让md支持数学公式 npm install markdown-it-katex</span>
            md<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">html</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-katex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_2-0中一个最简单的配置后来发现的" tabindex="-1"><a class="header-anchor" href="#_2-0中一个最简单的配置后来发现的" aria-hidden="true">#</a> 2.0中一个最简单的配置后来发现的</h2>`,4),B={href:"https://plugin-md-enhance.vuejs.press/zh/guide/#%E9%80%89%E9%A1%B9%E5%8D%A1",target:"_blank",rel:"noopener noreferrer"},z=n("li",null,[s("安装插件包 "),n("code",null,"npm i -D vuepress-plugin-md-enhance")],-1),V=n("code",null,"config.ts",-1),M={href:"https://plugin-md-enhance.vuejs.press/zh/guide/tex.html",target:"_blank",rel:"noopener noreferrer"},C=p(`<div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepress/config.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mdEnhancePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress-plugin-md-enhance&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">mdEnhancePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 使用 KaTeX 启用 TeX 支持</span>
      katex<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token comment">// 使用 mathjax 启用 TeX 支持</span>
      mathjax<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>`,2),F={href:"https://mdit-plugins.github.io/zh/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://fhlsteven.github.io/steven-blogs/",target:"_blank",rel:"noopener noreferrer"};function P(S,I){const a=o("ExternalLinkIcon");return c(),l("div",null,[k,d,h,n("p",null,[n("a",m,[s("VuePress"),t(a)]),s(" 是一个以 Markdown 为中心的静态网站生成器。你可以使用 Markdown 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。")]),g,n("ol",null,[y,n("li",null,[n("p",null,[s("还需要在head加样式，要不然样式就走样子了。参考"),n("a",f,[s("KaTeX"),t(a)])]),_])]),x,b,v,n("p",null,[n("a",w,[s("markdown-it-mathjax3 issues all closed"),t(a)]),n("a",j,[s("markdown-it-mathjax3 issues 57"),t(a)]),n("a",q,[s("渲染数学公式"),t(a)]),s(" 顺便说一下这个里面有1.0的配置")]),E,n("p",null,[s("在这个"),n("a",B,[s("Markdown增强"),t(a)]),s("看到了，里面有很多插件，除了数学公式还有流程图等等一堆。我是在看流程图的时候发现的哦。来看怎么用。")]),n("ol",null,[z,n("li",null,[s("按照以下代码修改"),V,s("，具体的可以看"),n("a",M,[s("文档说明"),t(a)])])]),C,n("p",null,[s("通个这个的搞定，那么使用其他Markdown It 插件都可以去这个网站找"),n("a",F,[s("https://mdit-plugins.github.io/zh/"),t(a)]),s("，然后自己改改就能轻松融入了！还是的多琢磨！")]),n("p",null,[s("另外提一下我"),n("a",A,[s("搞到github上的网站"),t(a)]),s("! haha")])])}const N=e(i,[["render",P],["__file","Vupress2_use_katex.html.vue"]]);export{N as default};
