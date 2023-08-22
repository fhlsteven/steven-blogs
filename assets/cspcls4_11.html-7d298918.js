import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t={},o=p(`<h1 id="c-教程第十一课-索引指示器" tabindex="-1"><a class="header-anchor" href="#c-教程第十一课-索引指示器" aria-hidden="true">#</a> C＃教程第十一课:索引指示器</h1><p>（Joe Mayo　2001年06月08日 10:38）</p><p>本节课将介绍C#的索引指示器，其目的包括：</p><ol><li>了解什么是索引指示器</li><li>如何实现索引指示器</li><li>重载索引指示器</li><li>了解如何实现多参数的索引指示器</li></ol><p>索引指示器并不难使用。它们的用法跟数组相同。在一个类内部，你可以按照你的意愿来管理一组数据的集合。这些对象可以是类成员的有限集合，也可以是另外一个数组，或者是一些复杂的数据结构。不考虑类的内部实现，其数据可以通过使用索引指示器来获得。如下是一个例子：</p><p>1.清单 11-1. 索引指示器的例子：IntIndexer.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/// A simple indexer example.</span>
<span class="token keyword">class</span> <span class="token class-name">IntIndexer</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> myData<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">IntIndexer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            myData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;empty&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> pos<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myData<span class="token punctuation">[</span>pos<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myData<span class="token punctuation">[</span>pos<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> size <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name">IntIndexer</span> myInd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IntIndexer</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Some Value&quot;</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Another Value&quot;</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Any Value&quot;</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nIndexer Output\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;myInd[{0}]: {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> myInd<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单 11-1演示了如何实现一个索引指示器， IntIndexer类有个名为myData的字符串数组，该数组是私有成员，因而其外部成员是看不见的。该数组是在构造函数中进行初始化的，该构造函数带有一个整型size参数，用来初始化myData数组，初始化时 把单词&quot;empty&quot;作为每个数组元素的值。</p></li><li><p>IntIndexer类的下一成员是索引指示器（Indexer），由关键字this和方括号[int pos]标识出来。该成员带有一个位置参数pos。正如你已经猜测到，Indexer的实现同属性一样。Indexer有get 和set访问操作，就同属性中的用法一样。索引指示器（indexer）返回一个字符串，在定义索引指示器时，string这个类型名标志着其返回类型为字符串类型。</p></li><li><p>Main()方法完成如下事情：初始化一个新的IntIndexer对象，添加一些值，并且打印出结果。其输出结果如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Indexer Output

myInd[0]: empty
myInd[1]: empty
myInd[2]: empty
myInd[3]: Another Value
myInd[4]: empty
myInd[5]: Any Value
myInd[6]: empty
myInd[7]: empty
myInd[8]: empty
myInd[9]: Some Value 
</code></pre></div></li><li><p>在不少程序语言中，通常都是使用整数作为下标来访问作为数组元素的，但C#的索引指示器不仅能够做到这一点，而且还能够更进一步。 定义索引指示器时，可以带有多个参数，每个参数的类型可以不同。添加的参数由逗号隔开，同方法中的的参数表一样。索引指示器的合法的参数类型包括：整型，枚举类型和字符串。另外，索引指示器也可以被重载。在清单 11-2中，我们修改了前面的程序，以便用来重载索引指示器 ，从而可以接受不同类型的参数。</p></li></ol><p>2.清单 11-2. 重载的索引指示器: OvrIndexer.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/// Implements overloaded indexers.</span>
<span class="token keyword">class</span> <span class="token class-name">OvrIndexer</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> myData<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> arrSize<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">OvrIndexer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        arrSize <span class="token operator">=</span> size<span class="token punctuation">;</span>
        myData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            myData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;empty&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> pos<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myData<span class="token punctuation">[</span>pos<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myData<span class="token punctuation">[</span>pos<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">string</span></span> data<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arrSize<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> data<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> count<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arrSize<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> data<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    myData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> size <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name">OvrIndexer</span> myInd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OvrIndexer</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Some Value&quot;</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Another Value&quot;</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Any Value&quot;</span><span class="token punctuation">;</span>
        myInd<span class="token punctuation">[</span><span class="token string">&quot;empty&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;no value&quot;</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nIndexer Output\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;myInd[{0}]: {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> myInd<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nNumber of \\&quot;no value\\&quot; entries: {0}&quot;</span><span class="token punctuation">,</span> myInd<span class="token punctuation">[</span><span class="token string">&quot;no value&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单 11-2 演示了如何重载索引指示器。</p><p>带有整型参数pos的第一个索引指示器同清单11-1中的一样，但是，该程序中有个带有字符串参数的新的索引指示器。对于这个新的索引指示器来说，其get操作返回的是同参数值data相匹配的成员的个数。 Set操作把数组中同参数值匹配的元素值该变为value值。</p></li><li><p>在清单11-2的Main()方法中，演示了重载的索引指示器，它接受字符串参数。</p><p>该重载的索引指示器调用了set操作，通过使用下列命令：<code>myInd[&quot;empty&quot;] = &quot;no value&quot;;</code> set操作把&quot;no value&quot;值赋给myInd 类中所有的值为&quot;empty&quot;的成员。 myInd类的每个成员都已经输出之后，就把最后一个数据输出到控制台，该数据统计数组成员值为&quot;no value&quot;的个数。 使用如下命令：<code>myInd[&quot;no value&quot;]</code>，就可调用get操作。输出结果如下：</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Indexer Output
myInd[0]: no value
myInd[1]: no value
myInd[2]: no value
myInd[3]: Another Value
myInd[4]: no value
myInd[5]: Any Value
myInd[6]: no value
myInd[7]: no value
myInd[8]: no value
myInd[9]: Some Value

Number of &quot;no value&quot; entries: 7
</code></pre></div><p>3.在清单 11-2中，两个索引指示器共处在同一个类中， 这是可以的，因为它们有不同的特征。</p><p>一个索引指示器的特征是通过索引指示器参数表中的参数个数和类型表现出来的。类能够辨别出其特征，并调用相应的索引指示器。带有多个参数的索引指示器可以用如下格式来实现：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> param1<span class="token punctuation">,</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> paramN<span class="token punctuation">]</span>
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// process and return some class data</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// process and assign some class data</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>现在你已经了解了索引指示器是用来做什么的，以及其用法。如同数组的用法一样，你可以创建索引指示器来访问类的成员。本文也提到了索引指示器的重载和多参数索引指示器</p>`,19),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspcls4_11.html.vue"]]);export{i as default};
