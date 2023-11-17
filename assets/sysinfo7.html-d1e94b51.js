import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="使用c-返回系统特殊路径" tabindex="-1"><a class="header-anchor" href="#使用c-返回系统特殊路径" aria-hidden="true">#</a> 使用C#返回系统特殊路径</h1><blockquote><p>你是第114位浏览该文章的人 menway csdn 2003-5-22</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">SystemPathsApp</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for SystemPaths.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SystemPaths</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">SystemPaths</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add constructor logic here</span>
            <span class="token comment">//</span>
            folders <span class="token operator">=</span> <span class="token function">OpenRegistryPath</span><span class="token punctuation">(</span>Registry<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">,</span> <span class="token string">@&quot;\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Shell Folders&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token class-name">RegistryKey</span> folders<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token return-type class-name">RegistryKey</span> <span class="token function">OpenRegistryPath</span><span class="token punctuation">(</span><span class="token class-name">RegistryKey</span> root<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            s <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">@&quot;\\&quot;;
            while (s.IndexOf(@&quot;</span>\\&quot;<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                root <span class="token operator">=</span> root<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">@&quot;\\&quot;)));
                s = s.Remove(0, s.IndexOf(@&quot;</span>\\&quot;<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> root<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>path<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Desktop 桌面目录</span>
        <span class="token doc-comment comment">/// Fonts 字体目录</span>
        <span class="token doc-comment comment">/// NetHood 网上邻居</span>
        <span class="token doc-comment comment">/// Personal 我的文档目录</span>
        <span class="token doc-comment comment">/// Programs 开始菜单程序目录</span>
        <span class="token doc-comment comment">/// Recent 存放用户最近访问文件快捷方式的目录</span>
        <span class="token doc-comment comment">/// SendTo 发送到目录</span>
        <span class="token doc-comment comment">/// StartMenu 开始菜单目录</span>
        <span class="token doc-comment comment">/// Startup 开始菜单启动项目录</span>
        <span class="token doc-comment comment">/// Favorites 收藏夹目录</span>
        <span class="token doc-comment comment">/// History 网页历史目录</span>
        <span class="token doc-comment comment">/// Cookies cookies目录</span>
        <span class="token doc-comment comment">/// Cache 缓存目录</span>
        <span class="token doc-comment comment">/// AppData 应用程序数据目录</span>
        <span class="token doc-comment comment">/// PrintHood 打印目录</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> folders<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Desktop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token string">&quot;Desktop&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token string">&quot;Cookies&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">MyDocuments</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token string">&quot;Personal&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">History</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token string">&quot;History&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Favorites</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Customize</span><span class="token punctuation">(</span><span class="token string">&quot;Favorites&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对该文的评论 人气：36</p>`,4),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","sysinfo7.html.vue"]]);export{i as default};
