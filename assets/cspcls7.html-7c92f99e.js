import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="c-重点知识详解系列" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解系列" aria-hidden="true">#</a> C#重点知识详解系列</h1><ul><li><a href="#csp_1">C#重点知识详解1</a></li><li><a href="#csp_2">C#重点知识详解2</a></li><li><a href="#csp_3">C#重点知识详解3</a></li><li><a href="#csp_4">C#重点知识详解4加框与解框</a></li><li><a href="#csp_5">C#重点知识详解5代理：一）</a></li><li><a href="#csp_6">C#重点知识详解5代理：二 ）</a></li></ul><hr><h2 id="c-重点知识详解1" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解1" aria-hidden="true">#</a> <a id="csp_1">C#重点知识详解1</a></h2><p>作者： 发表时间： 2003-7-13 10:15:04</p><p>在微软的.NET推出后，关于C#的有关文章也相继出现，作为微软的重要的与JAVA抗衡的语言，C#具有很多优点。本文将选一些C#语言中的重要知识详细介绍，</p><h3 id="第一章-参数" tabindex="-1"><a class="header-anchor" href="#第一章-参数" aria-hidden="true">#</a> 第一章：参数</h3><h4 id="_1。1-in-参数" tabindex="-1"><a class="header-anchor" href="#_1。1-in-参数" aria-hidden="true">#</a> 1。1 IN 参数</h4><p>c#种的四种参数形式：</p><ul><li>一般参数</li><li><code>in</code>参数</li><li><code>out</code>参数</li><li>参数数列</li></ul><p>本章将介绍后三种的使用。</p><p>在C语言你可以通传递地址（即实参）或是DELPHI语言中通过VAR指示符传递地址参数来进行数据排序等操作，在C#语言中，是如何做的呢？&quot;in&quot;关键字可以帮助你。这个关键字可以通过参数传递你想返回的值。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">TestRefP</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">myClass</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RefTest</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> iVal1<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            iVal1 <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">//变量需要初始化</span>

            <span class="token function">RefTest</span><span class="token punctuation">(</span><span class="token keyword">ref</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>必须注意的是变量要须先初始化。</p><p>结果：<code>5</code></p><h4 id="_1。2-out-参数" tabindex="-1"><a class="header-anchor" href="#_1。2-out-参数" aria-hidden="true">#</a> 1。2 OUT 参数</h4><p>你是否想一次返回多个值?在C++语言中这项任务基本上是不可能完成的任务。在c#中&quot;out&quot;关键字可以帮助你轻松完成。这个关键字可以通过参数一次返回多个值。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">mathClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">TestOut</span><span class="token punctuation">(</span><span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> iVal1<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> iVal2<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        iVal1 <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        iVal2 <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">,</span> j<span class="token punctuation">;</span> <span class="token comment">// 变量不需要初始化。 </span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">TestOut</span><span class="token punctuation">(</span><span class="token keyword">out</span> i<span class="token punctuation">,</span> <span class="token keyword">out</span> j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>结果：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0
10
20
</code></pre></div><h4 id="_1。3-参数数列" tabindex="-1"><a class="header-anchor" href="#_1。3-参数数列" aria-hidden="true">#</a> 1。3 参数数列</h4><p>参数数列能够使多个相关的参数被单个数列代表，换就话说，参数数列就是变量的长度。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;# 参数: {0}&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\targs[{0}] = {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以下为输出结果：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code># 参数: 0 
# 参数: 1 
args[0] = 1 
# 参数: 2 
args[0] = 1 
args[1] = 2 
# 参数: 3 
args[0] = 1 
args[1] = 2 
args[2] = 3 
# 参数: 4
args[0] = 1
args[1] = 2
args[2] = 3
args[3]
</code></pre></div><h2 id="c-重点知识详解2" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解2" aria-hidden="true">#</a> <a id="csp_2">C#重点知识详解2</a></h2><p>作者： 发表时间： 2003-7-13 10:16:00</p><h3 id="第二章-内存管理" tabindex="-1"><a class="header-anchor" href="#第二章-内存管理" aria-hidden="true">#</a> 第二章 内存管理</h3><p>c#内存管理提供了与java一样的自动内存管理功能,让程序员从繁重的内存管理中摆脱出来，内存管理提高了代码的质量和提高了开发效率。</p><p>c#限制了着指针的使用，免除了程序员对内存泄漏的烦恼，但是不是意味着向java程序员一样c#程序员在也不能使用指针代来的好处。微软在设计C#语言时考虑到这个问题，在一方面抛弃指针的同时，另一方面采用折衷的办法，通过一个标志来时程序引入指针。</p><p>首先我们来了解自动内存管理</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Stack</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Node</span> first <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> Empty
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>first <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Can&#39;t Pop from an empty Stack.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> temp <span class="token operator">=</span> first<span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
            first <span class="token operator">=</span> first<span class="token punctuation">.</span>Next<span class="token punctuation">;</span>
            <span class="token keyword">return</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Push</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> o<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        first <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Node</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> first<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">Node</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> Next<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">object</span></span> Value<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token function">Node</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> <span class="token keyword">value</span><span class="token punctuation">,</span> <span class="token class-name">Node</span> next<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            Value <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序创建了一个<code>stack</code>类来实现一个链，使用一个<code>push</code>方法创建Node节点实例和一个当不再需要Node节点时的收集器。一个节点实例不能被任何代码访问时，就被收集。例如当一个点元素被移出栈，相关的Node就被收集。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// The example</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Stack</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            s<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>关于指针的引用，c#中使用unsafe 标志来代表队指针的引用。以下程序演示了指针的用法，不过由于使用指针，内存管理就不得不手工完成。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsafe</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Locations</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> ar<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">fixed</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token operator">*</span> p <span class="token operator">=</span> ar<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">byte</span><span class="token operator">*</span> p_elem <span class="token operator">=</span> p<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> ar<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span></span> <span class="token keyword">value</span> <span class="token operator">=</span> <span class="token operator">*</span>p_elem<span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> addr <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>p_elem<span class="token punctuation">,</span> <span class="token string">&quot;X&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;arr[{0}] at 0x{1} is {2}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> addr<span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                p_elem<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token function">WriteLocations</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-重点知识详解3" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解3" aria-hidden="true">#</a> <a id="csp_3">C#重点知识详解3</a></h2><p>作者： 发表时间： 2003-7-13 10:16:30</p><h3 id="第三章-类属性" tabindex="-1"><a class="header-anchor" href="#第三章-类属性" aria-hidden="true">#</a> 第三章： 类属性</h3><p>使用过RAD开发工具的一定inspector很熟悉，程序员通过它可以操作对象的属性，DELPHI中引入了PUBLISH关键字来公布对象属性受到程序员的普遍欢迎.通过存取标志来访问private成员，在c#中有两种途径揭示类的命名属性——通过域成员或者通过属性。前者是作为具有公共访问性的成员变量而被实现的；后者并不直接回应存储位置，只是通过存取标志(accessors)被访问。当你想读出或写入属性的值时，存取标志限定了被实现的语句。用于读出属性的值的存取标志记为关键字get，而要修改属性的值的读写符标志记为set。</p><h4 id="类属性" tabindex="-1"><a class="header-anchor" href="#类属性" aria-hidden="true">#</a> 类属性</h4><ul><li>只能读 get</li><li>只能写 set</li><li>可读可写 set/get</li></ul><p>请看例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_nWrite<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> m_nRead <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> 
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_nWriteRead<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> WRITEREAD
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_nWriteRead<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> m_nWriteRead <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> WRITE
    <span class="token punctuation">{</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> m_nWrite <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> READ
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_nRead<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Test</span> MyTest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> MyTest<span class="token punctuation">.</span>READ<span class="token punctuation">;</span> <span class="token comment">//get </span>
        MyTest<span class="token punctuation">.</span>WRITE <span class="token operator">=</span> <span class="token number">250</span><span class="token punctuation">;</span> <span class="token comment">//set </span>
        MyTest<span class="token punctuation">.</span>WRITEREAD <span class="token operator">+=</span> <span class="token number">10000000</span><span class="token punctuation">;</span> <span class="token comment">//set and get </span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;get:{0} set:{1} set/get:{2}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> MyTest<span class="token punctuation">.</span>WRITE<span class="token punctuation">,</span> MyTest<span class="token punctuation">.</span>WRITEREAD<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token comment">// 温馨提示：不能访问 MyTest.WRITE；没有get</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-重点知识详解4加框与解框" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解4加框与解框" aria-hidden="true">#</a> <a id="csp_4">C#重点知识详解4加框与解框</a></h2><p>www.chinacs.net 2001-5-21 23:36:00 中文C#技术站</p><p>导 读：C# 运行时中有两种类型：引用类型(reference)(在 C# 中用类声明)和值类型(value)（在 C# 中用结构声明）。引用和值类型在几个重要方面有所不同。值类型“感觉上”象一个数据。它包括预定义数值类型（如int、bool）以及用户定义的类型（circle、Point等）。</p><h3 id="第四章-c-中的加框与去框" tabindex="-1"><a class="header-anchor" href="#第四章-c-中的加框与去框" aria-hidden="true">#</a> 第四章：C# 中的加框与去框</h3><p>C# 运行时中有两种类型：引用类型(reference)(在 C# 中用类声明)和值类型(value)（在 C# 中用结构声明）。引用和值类型在几个重要方面有所不同。值类型“感觉上”象一个数据。它包括预定义数值类型（如int、bool）以及用户定义的类型（circle、Point等）。如上文所述，值类型的变量是实际的值，所以在您使用变量时，通常处理的是实际的值。</p><p>1&gt;:首先，让我们来看一看值类型(value)（在 C# 中用结构声明）。</p><p>对于任何类型的非框机构都又如下的形。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// - </span>
<span class="token keyword">struct</span> <span class="token class-name">T_Point</span>
<span class="token punctuation">{</span>
    <span class="token class-name">T</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token function">T_Point</span><span class="token punctuation">(</span><span class="token class-name">T</span> x<span class="token punctuation">,</span> <span class="token class-name">T</span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// - </span>

<span class="token comment">//sample: </span>

<span class="token keyword">class</span> <span class="token class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">Point</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Point</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">object</span></span> f <span class="token operator">=</span> p<span class="token punctuation">;</span>
        p<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Point<span class="token punctuation">)</span>f<span class="token punctuation">)</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>让我么来看一看最后的结果是什么？结果是10,20.在第二次指定变量后，两个独立的变量包含相同的值。<br> 修改 <code>p</code> 的值不会改变 <code>f</code> 的值.</p><p>2&gt;:引用类型用于所有不能用作值类型的对象。引用类型的变量指向堆中对象的实例。这意味着在将一个变量指定给另一个变量时，只是指定了引用，而不是值。</p><p>对于任何类型的框类都又如下的形。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// -- </span>
<span class="token keyword">class</span> <span class="token class-name">T_Point</span>
<span class="token punctuation">{</span>
    <span class="token class-name">T</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
    <span class="token function">T_Point</span><span class="token punctuation">(</span><span class="token class-name">T</span> x<span class="token punctuation">,</span><span class="token class-name">T</span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// </span>
<span class="token keyword">class</span> <span class="token class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Point</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Point</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">object</span></span> f <span class="token operator">=</span> p<span class="token punctuation">;</span>
        p<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Point<span class="token punctuation">)</span>f<span class="token punctuation">)</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>让我么来看一看最后的结果是什么？很奇怪吗，结果是<code>20,20</code>.在第二次指定变量后，<code>p</code> 和 <code>f</code> 指向同一对象。这意味着修改 <code>p</code> 的名称也将改变 <code>f</code> 的名称，因为它们引用同一实例。修改类值的成员称为“变更者”，而不具有任何变更者的类称为不可变类。不可变类的存在可以使类的行为类似于值类，但不能写入为值类。</p><p>在c#语言中同时使用引用和值两种类型是很重要的。值类型轻便高效，而引用类型适用于面向对象的开发。但是，尽管我们有两了种类型，但有时我们需要的是更为简单的模型，使用单一的、能够囊括所有可能值的类型。这样一个通用基类能够调用任何值的虚函数。写入能够存储任何值的集合类。为实现这一目的，c#语言运行时采用一种方法让值类型在需要时转化为引用类型，即通过称为加框的进程。被加框的类型是通用基类，可以被各种类型的对象引用。</p><h4 id="解框" tabindex="-1"><a class="header-anchor" href="#解框" aria-hidden="true">#</a> 解框</h4><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">object</span></span> k <span class="token operator">=</span> i<span class="token punctuation">;</span><span class="token comment">// 将 int i 加框到对象 k 中</span>
<span class="token class-name"><span class="token keyword">int</span></span> j<span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>k<span class="token punctuation">;</span> <span class="token comment">// 解框 k 到 value2</span>
</code></pre></div><p>当赋值给 <code>k</code> 时，作为赋值的一部分，C# 编译器将创建足够容纳堆中 int 的引用类型包装，将值复制到该加框，然后将加框标记为实际类型，以便运行时了解加框的类型。要从加框中取值，必须使用强制类型装换来指定加框的类型（对象能够保留任何类型）。在执行过程中，运行时将检查对象变量引用的类型是否为强制类型转换中指定的类型。如果类型正确，值将从加框中复制回值类型变量。如果类型不正确，将导致异常。请注意解除加框过程中不会进行其他转换；类型必须完全匹配。</p><p>请注意以下代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">long</span></span> i <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">object</span></span> k <span class="token operator">=</span> i<span class="token punctuation">;</span><span class="token comment">// 将 long i 加框到对象 k 中</span>
<span class="token class-name"><span class="token keyword">ulong</span></span> j<span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">ulong</span><span class="token punctuation">)</span>k<span class="token punctuation">;</span>
</code></pre></div><p><code>#error</code></p><p>由于加框类型于解框类型的不同将出错。如果认为像c++语言一样下面的操作将正确那也是不对的。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">long</span></span> i <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">object</span></span> k <span class="token operator">=</span> i<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> j<span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>k<span class="token punctuation">;</span>
</code></pre></div><p><code>#error</code></p><p>最后总结一下加框和解框。加框和解框使编写和使用具有通用对象参数的函数变得简单而直接。</p><h2 id="c-重点知识详解5代理-一" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解5代理-一" aria-hidden="true">#</a> <a id="csp_5">C#重点知识详解5代理：一）</a></h2><p>www.chinacs.net 2001-5-22 10:51:00 中文C#技术站 作者： wkrain www.ASPCool.com</p><p>导 读：代理实现的是象c++等语言的指针功能，不同于函数指针，代理是一种面向对象、安全类型的。</p><h3 id="第五章-代理" tabindex="-1"><a class="header-anchor" href="#第五章-代理" aria-hidden="true">#</a> 第五章：代理</h3><p>代理实现的是象c++等语言的指针功能，不同于函数指针，代理是一种面向对象、安全类型的。代理事派生于公共基类（system）的一种参考类型，方法被压入一个代理中，对于实例方法被称为实例的组成实体或关于实例的方法，而静态方法，被称为类的组成实体或类方法。代理的强大功能是它可以自动的匹配方法，而不管其类型。</p><p>写一个代理包括三个步骤：写代理、实例化、调用。</p><p>代理的声明使用以下语法：</p><p><code>delegate void SimpleDelegate();</code></p><p>实例化一个代理</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token class-name">SimpleDelegate</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SimpleDelegate</span><span class="token punctuation">(</span>F<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//将方法压入 </span>
        <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//通过代理； </span>
        <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不通过代理； </span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后让我们调用她</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MultiCall</span><span class="token punctuation">(</span><span class="token class-name">SimpleDelegate</span> d<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">d</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到对于方法的调用是通过代理来完成的，调用时并不需要知道被调用她的类型。代理在我看来好比是对象要一件事她不直接地调用这个方法，而是通过一个中间人去调用她。</p><p>下面就代理的强大功能进行详细介绍：首先然我们实现一个这样的功能，考虑一下该如何用指向基类的对象调用子类的成员函数。在这里程序员是不是点怀恋指针了，不过在c#中这样的功能完全也可实现的，使用一个单独的代理我们可以完成这项功能。以下代码来自Timothy A. Vanover文章。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">DelegatesCS</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wisdom</span> <span class="token comment">//包含代理的类 </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GiveAdvice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">OfferAdvice</span><span class="token punctuation">(</span><span class="token class-name">GiveAdvice</span> Words<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">Words</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token comment">//基类 </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Advice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Listen to reason&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">~</span><span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dad</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span> <span class="token comment">//子类 </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Dad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Advice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Listen to your Mom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">~</span><span class="token function">Dad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mom</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span> <span class="token comment">//子类 </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Mom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Advice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Listen to your Dad&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">~</span><span class="token function">Mom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Daughter</span> <span class="token comment">//不继承与基类的类 </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Daughter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Advice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;I know all there is to life&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">~</span><span class="token function">Daughter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">CallAdvice</span><span class="token punctuation">(</span><span class="token class-name">Parent</span> p<span class="token punctuation">)</span><span class="token comment">//使用基类 </span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Wisdom</span> parents <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Wisdom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Wisdom<span class="token punctuation">.</span>GiveAdvice</span> TeenageGirls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Wisdom<span class="token punctuation">.</span>GiveAdvice</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>Advice<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//将Advice方法委托给TeenageGirls委托对象 </span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>parents<span class="token punctuation">.</span><span class="token function">OfferAdvice</span><span class="token punctuation">(</span>TeenageGirls<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Dad</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Mom</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Mom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Daughter</span> g <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Daughter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//以下两个为衍于基类的类 </span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">CallAdvice</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">CallAdvice</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//以下为未衍于基类的类，如果调用将出错。 </span>
            <span class="token comment">//Console.WriteLine(CallAdvice(g)); </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-重点知识详解5代理-二" tabindex="-1"><a class="header-anchor" href="#c-重点知识详解5代理-二" aria-hidden="true">#</a> <a id="csp_6">C#重点知识详解5代理：二 ）</a></h2><p>www.chinacs.net 2001-5-22 10:52:00 中文C#技术站 作者： wkrain www.ASPCool.com</p><p>导 读：处理事件在c#中对比c++和vb来说更聪明，你可以写代理然后写事件处理者，事件处理者是一种定义在控件和窗体类中的重载的公共事件。</p><h3 id="代理-二" tabindex="-1"><a class="header-anchor" href="#代理-二" aria-hidden="true">#</a> 代理 二</h3><p>心情好坏!!!!!!!!!!!!!!!!!!!!!<br> 我的准女友跟我说拜拜!!!!!!!!!!!!!!!!!!!!!<br> 再也不想搞计算机了兄弟们撤退吧!!!!!!!!!!!!!!!!!!!!<br> c#我没心情写了。以后再说吧!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br></p><hr><h4 id="_1〉事件" tabindex="-1"><a class="header-anchor" href="#_1〉事件" aria-hidden="true">#</a> 1〉事件</h4><p>上一章讲解了有关代理的基本应用，本章将继续讲解深入代理的使用。这里我们讲解使用代理来处理事件。关于事件在另一章进行详细讲解。处理事件在c#中对比c++和vb来说更聪明，你可以写代理然后写事件处理者，事件处理者是一种定义在控件和窗体类中的重载的公共事件。我们在以下的例子中将看到代理在事件中的应用。</p><ol><li><p>写代理</p><p>我想处理鼠标单击事件和在鼠标单击左键或右键处理一些代码。写下面的代码在你的初始控件函数中。</p><p><code>this.MouseDown += new System.WinForms.MouseEventHandler(this.Form_MouseDown);</code></p></li><li><p>写事件</p><p>现在你可以写事件处理，你的事件的输出参数将返回窗体的鼠标事件参数的详细内容。以下时鼠标事件参数成员</p><p><code>MouseEventArgs members</code></p><p><code>Button</code> 指示哪一个键被压，分为左、右、中、无 。<br><code>Clicks</code> 指示鼠标压下次数及释放状态。<br><code>Delta</code> 指示鼠标转动数量计数<br><code>X</code> 鼠标点击x坐标点<br><code>Y</code> 鼠标点击y坐标点<br></p><p><code>Event Handler</code></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form_MouseDown</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>WinForms<span class="token punctuation">.</span>MouseEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Button<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> MouseButtons<span class="token punctuation">.</span>Left<span class="token punctuation">:</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;Left Button Click&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> MouseButtons<span class="token punctuation">.</span>Right<span class="token punctuation">:</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;Right Button Click&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> MouseButtons<span class="token punctuation">.</span>Middle<span class="token punctuation">:</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li></ol><p>在你的WinForm中测试你的程序，你会看到通过代理事件被关联了。</p><p>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">I</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">I</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">I</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">IDoLoveYou</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I do love You&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">why</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;why?&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">HER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">HER</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">HER</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">IDo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;...............&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">slient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;.........&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TELEPHONE</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">heartchat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">TELEPHONE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">TELEPHONE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;yesterday night,i telephone to my girlfriend&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">chat</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">I</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">I</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">HER</span> her <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">TELEPHONE</span> telephone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TELEPHONE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        telephone<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span> tell <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>IDoLoveYou<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">tell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span> answer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span><span class="token punctuation">(</span>her<span class="token punctuation">.</span>IDo<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span> ask <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>why<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">ask</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span> noanswer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TELEPHONE<span class="token punctuation">.</span>heartchat</span><span class="token punctuation">(</span>her<span class="token punctuation">.</span>slient<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">noanswer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,95),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","cspcls7.html.vue"]]);export{i as default};
