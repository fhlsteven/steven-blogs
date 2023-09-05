import{_ as p,r as t,o as e,c as o,b as n,d as s,e as c,a as l}from"./app-382facc7.js";const u={},k={id:"根据typename获取type较为完备的办法",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#根据typename获取type较为完备的办法","aria-hidden":"true"},"#",-1),i={href:"https://www.cnblogs.com/jobs/archive/2004/07/07/22200.html",target:"_blank",rel:"noopener noreferrer"},y=n("code",null,"typeName",-1),m=n("code",null,"Type",-1),d=l(`<p>前年还在开发.NET产品，我那时候编写一个C#脚本解释引擎，遇到一个问题是，<code>Type.GetType()</code>方法无法获取尚未装载类型。这些天，在阅读一些相关的代码时，得知了一种较为完整的方法，共享如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token return-type class-name">Type</span> <span class="token function">FindTypeInCurrentDomain</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> typeName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Type</span> type <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">//如果该类型已经装载</span>
    type <span class="token operator">=</span> Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span>typeName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> type<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//在EntryAssembly中查找</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetEntryAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        type <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">GetEntryAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span>typeName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> type<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//在CurrentDomain的所有Assembly中查找</span>
    <span class="token class-name">Assembly<span class="token punctuation">[</span><span class="token punctuation">]</span></span> assemblyArray <span class="token operator">=</span> AppDomain<span class="token punctuation">.</span>CurrentDomain<span class="token punctuation">.</span><span class="token function">GetAssemblies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> assemblyArrayLength <span class="token operator">=</span> assemblyArray<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> assemblyArrayLength<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        type <span class="token operator">=</span> assemblyArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span>typeName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> type<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> assemblyArrayLength<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> typeArray <span class="token operator">=</span> assemblyArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">GetTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> typeArrayLength <span class="token operator">=</span> typeArray<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> typeArrayLength<span class="token punctuation">;</span> <span class="token operator">++</span>j<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>typeArray<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>typeName<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> typeArray<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> type<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>2004-07-07 23:11Ying-Shen 回复 引用</p><blockquote><p><code>Type.GetType()</code>方法无法获取尚未装载类型 这个是由于你的<code>string</code>里面没有提供<code>Assembly name</code>的缘故</p><p>为什么在<code>Assembly.GetType(typeName)</code>找不到后 还要继续<code>Type.Name.Equals(typeName)</code>?</p><p>你现在的方法还是没有解决获取未加载的Assembly里的类型的问题呀。</p></blockquote><p>2004-07-08 01:39温少的日志 回复 引用</p><blockquote><p>可以的，如果你的bin目录下有该Assembly，那就会自动加载。请注意： <code>Assembly[] assemblyArray = AppDomain.CurrentDomain.GetAssemblies();</code></p></blockquote>`,8);function b(h,A){const a=t("ExternalLinkIcon");return e(),o("div",null,[n("h1",k,[r,s(),n("a",i,[s("根据"),y,s("获取"),m,s("较为完备的办法"),c(a)])]),d])}const f=p(u,[["render",b],["__file","cspbase29.html.vue"]]);export{f as default};
