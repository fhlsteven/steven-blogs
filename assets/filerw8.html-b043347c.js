import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="如何读ini文件中的设置信息" tabindex="-1"><a class="header-anchor" href="#如何读ini文件中的设置信息" aria-hidden="true">#</a> 如何读INI文件中的设置信息</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Sx_Mdi</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IniFile</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">////声明读写INI文件的API函数</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> <span class="token function">WritePrivateProfileString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> section<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> val<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetPrivateProfileString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> section<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> def<span class="token punctuation">,</span><span class="token class-name">StringBuilder</span> retVal<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//写INI文件</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">IniWriteValue</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Section<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> Key<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> Value<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">WritePrivateProfileString</span><span class="token punctuation">(</span>Section<span class="token punctuation">,</span>Key<span class="token punctuation">,</span>Value<span class="token punctuation">,</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//读取INI文件指定</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Section<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> Key<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">StringBuilder</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token function">GetPrivateProfileString</span><span class="token punctuation">(</span>Section<span class="token punctuation">,</span>Key<span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>temp<span class="token punctuation">,</span><span class="token number">255</span><span class="token punctuation">,</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> temp<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>操作范例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">SqlConnection</span> <span class="token function">MyConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sPath<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> ServerName<span class="token punctuation">,</span>userId<span class="token punctuation">,</span>sPwd<span class="token punctuation">,</span>DataName<span class="token punctuation">;</span>

    sPath <span class="token operator">=</span> <span class="token function">GetPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IniFile</span> ini <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IniFile</span><span class="token punctuation">(</span>sPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ServerName <span class="token operator">=</span> ini<span class="token punctuation">.</span>IniReadValue <span class="token punctuation">(</span><span class="token string">&quot;Database&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;server&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userId <span class="token operator">=</span> ini<span class="token punctuation">.</span>IniReadValue <span class="token punctuation">(</span><span class="token string">&quot;Database&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;uid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sPwd <span class="token operator">=</span> ini<span class="token punctuation">.</span>IniReadValue <span class="token punctuation">(</span><span class="token string">&quot;Database&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;pwd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    DataName <span class="token operator">=</span> ini<span class="token punctuation">.</span>IniReadValue <span class="token punctuation">(</span><span class="token string">&quot;Database&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;database&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> strSql <span class="token operator">=</span> <span class="token string">&quot;server =&quot;</span> <span class="token operator">+</span> ServerName<span class="token operator">+</span><span class="token string">&quot;;uid =&quot;</span><span class="token operator">+</span> userId <span class="token operator">+</span><span class="token string">&quot;;pwd =;database =&quot;</span><span class="token operator">+</span> DataName<span class="token punctuation">;</span>
　　<span class="token class-name">SqlConnection</span> myConn<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>strSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token keyword">return</span> myConn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","filerw8.html.vue"]]);export{i as default};
