import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="c-中对文件的操作小结" tabindex="-1"><a class="header-anchor" href="#c-中对文件的操作小结" aria-hidden="true">#</a> c#中对文件的操作小结</h1><blockquote><p>www.wenhui.org 10/17/2002 CSharp vs Java</p></blockquote><h2 id="_1、建立一个文本文件" tabindex="-1"><a class="header-anchor" href="#_1、建立一个文本文件" aria-hidden="true">#</a> 1、建立一个文本文件</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">WriteToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WriteToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StreamWriter</span> SW<span class="token punctuation">;</span>
        SW <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\MyTextFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        SW<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;God is greatest of them all&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        SW<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is second line&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        SW<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;File Created SucacessFully&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_2、读文件" tabindex="-1"><a class="header-anchor" href="#_2、读文件" aria-hidden="true">#</a> 2、读文件</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">ReadFromFile</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\MyTextFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReadFromFile</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StreamReader</span> SR<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> S<span class="token punctuation">;</span>
        SR <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        S <span class="token operator">=</span> SR<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>S <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>S<span class="token punctuation">)</span><span class="token punctuation">;</span>
            S <span class="token operator">=</span> SR<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        SR<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_3、追加操作" tabindex="-1"><a class="header-anchor" href="#_3、追加操作" aria-hidden="true">#</a> 3、追加操作</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">AppendToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AppendToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StreamWriter</span> SW<span class="token punctuation">;</span>
        SW <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\MyTextFile.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        SW<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This Line Is Appended&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        SW<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Text Appended Successfully&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","filerw7.html.vue"]]);export{k as default};
