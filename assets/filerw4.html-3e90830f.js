import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="对文本文件进行读写操作" tabindex="-1"><a class="header-anchor" href="#对文本文件进行读写操作" aria-hidden="true">#</a> 对文本文件进行读写操作</h1><h2 id="对文本文件进行读操作" tabindex="-1"><a class="header-anchor" href="#对文本文件进行读操作" aria-hidden="true">#</a> 对文本文件进行读操作</h2><blockquote><p>源作者：追风 人气：3486</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication2</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class2.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> FILE_NAME <span class="token operator">=</span> <span class="token string">&quot;MyFile.txt&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//如果不文件存在,则抛出异常</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} does not exist!&quot;</span><span class="token punctuation">,</span> FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> input<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>input <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The end of the Stream has been reched.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="对文本文件进行写操作" tabindex="-1"><a class="header-anchor" href="#对文本文件进行写操作" aria-hidden="true">#</a> 对文本文件进行写操作</h2><blockquote><p>源作者：追风 人气：3295</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication2</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class2.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> FILE_NAME <span class="token operator">=</span> <span class="token string">&quot;MyFile.txt&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">StreamWriter</span> sr<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> report<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//如果文件存在,则创建File.AppendText对象</span>
            <span class="token punctuation">{</span>
                sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
                report <span class="token operator">=</span> <span class="token string">&quot;appended&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>  <span class="token comment">//如果文件不存在,则创建File.CreateText对象</span>
            <span class="token punctuation">{</span>
                sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
                report <span class="token operator">=</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            sr<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is my first file.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} {1}&quot;</span><span class="token punctuation">,</span> FILE_NAME<span class="token punctuation">,</span> report<span class="token punctuation">)</span><span class="token punctuation">;</span>
            sr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","filerw4.html.vue"]]);export{i as default};
