import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="取exe或者dll的运行文件所在目录" tabindex="-1"><a class="header-anchor" href="#取exe或者dll的运行文件所在目录" aria-hidden="true">#</a> 取EXE或者DLL的运行文件所在目录</h1><blockquote><p>作者：李侠</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication1</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">Path</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Module</span> myModule <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">Path</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Module<span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myModule<span class="token punctuation">.</span>FullyQualifiedName<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span>myModule<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> <span class="token string">&quot;Config.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// The main entry point for the application.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Path</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Path</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            c<span class="token punctuation">.</span><span class="token function">myPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add code to start application here</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>关于作者</strong>:</p><p>李侠是GrapeCity公司国内开发部的经理。负责过多个项目的开发，对项目管理颇有研究。他非常熟悉 Rational Rose, Clear Case，UML等,并能将其有效地应用到项目中，具有深厚的开发功底。</p>`,5),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","sysinfo28.html.vue"]]);export{i as default};
