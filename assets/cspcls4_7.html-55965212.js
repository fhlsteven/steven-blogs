import{_ as s,o as n,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="c-教程第七课-类的入门" tabindex="-1"><a class="header-anchor" href="#c-教程第七课-类的入门" aria-hidden="true">#</a> C＃教程第七课:类的入门</h1><p>（Joe Mayo　2001年06月08日 11:10）</p><p>本节课将介绍C#中的类，其目的如下：</p><ol><li>了解构造函数的实现</li><li>了解实例和静态成员的区别</li><li>了解析构函数的使用</li><li>熟悉类的成员类型</li></ol><p>在本教程的一开始，你就已经接触到类的用法了。现在,既然已经对类有了感性认识,并知道如何定义一个类，本节课将</p><p>定义类的格式是：关键字&quot;Class&quot;后面跟着类名，类名之后的大括号中包含的是类的成员。构造函数没有返回值，且与类同名。清单7-1是一个关于类的例子。</p><p>清单 7-1. Example C# Classes: Classes.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// helper class</span>
<span class="token keyword">class</span> <span class="token class-name">OutputClass</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> myString<span class="token punctuation">;</span>
    <span class="token comment">// Constructor</span>
    <span class="token keyword">public</span> <span class="token function">OutputClass</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> inputString<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myString <span class="token operator">=</span> inputString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Instance Method</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">printString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}&quot;</span><span class="token punctuation">,</span> myString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Destructor</span>
    <span class="token operator">~</span><span class="token function">OutputClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Some resource cleanup routines</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">ExampleClass</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Instance of OutputClass</span>
        <span class="token class-name">OutputClass</span> outCl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OutputClass</span><span class="token punctuation">(</span><span class="token string">&quot;This is printed by the output class.&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// Call Output class&#39; method</span>
        outCl<span class="token punctuation">.</span><span class="token function">printString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单7-1 演示了两个类。</p><p>第一个类&quot;OutputClass&quot;包括：一个构造函数，一个实例方法，以及一个析构函数，还包括一个域名&quot;myString&quot;。构造函数是用来初始化类的数据成员的。本例中，OutputClass类的构造函数接收一个字符串参数，并把它拷贝到该类的myString域中。</p></li><li><p>构造函数并不是一定要用户自己定义的，例如ExampleClass类就用到了缺省的构造函数。</p></li></ol><p>缺省的构造函数很简单，且不带参数。但这样的构造函数并没有多大用处。为了使得缺省的构造函数能够有些用途，用户自己可以对它初始化。例如：</p><p><code>public OutputClass() : this(&quot;Default Constructor String&quot;) { }</code></p><p>这种形式的构造函数可以包含在清单7-1中的OutputClass类中。该缺省的构造函数后跟着初始化符。分号&quot;:&quot;标志着初始化开始，后面的&quot;this&quot;是关键字，表示OutputClass这个类所对应的对象。this可以有效地调用该对象中的构造函数。&quot;this&quot;关键字后面的参数为字符串类型。上面的初始化工作调用了OutputClass构造函数，该构造函数接收一个字符串类型的数据作为参数。初始化工作确保在类的域能够在类的实例化过程中被初始化。</p><p>上面的例子表明：一个类可以有多种格式的构造函数。具体调用哪一种构造函数取决于参数个数及参数类型。</p><p>类成员的类型</p><p>在C#中，有两种类型的类成员，实例和静态的。每次定义类的对象时，就创建了该类的一个实例。ExampleClass中的 Main() 方法创建了OutputClass类的一个名为&quot;outCl&quot;的实例。你可以用不同的名字创建OutputClass类的多个实例。这些实例都是各自独立的。例如，OutputClass类的两个实例创建如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">OutputClass</span> oc1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OutputClass</span><span class="token punctuation">(</span><span class="token string">&quot;OutputClass1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">OutputClass</span> oc2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OutputClass</span><span class="token punctuation">(</span><span class="token string">&quot;OutputClass2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>于是，创建了OutputClass类的两个单独的实例，且各自带有单独的&quot;myString&quot;域和&quot;printString()&quot;方法。上例中，两个实例名为&quot;oc1&quot; 和&quot;oc2&quot;。 另外一方面，如果类成员是静态的，可以通过如下格式来访问：<code>&lt;classname&gt;.&lt;static class member&gt;</code>。</p><p>一旦OutputClass类有如下的静态方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">staticPrinter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;There is only one of me.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>你就可以用下面的方式，从Main()中调用该函数：</p><p><code>OutputClass.staticPrinter();</code></p><p>注意：</p><p>调用类的静态成员必须通过类名而不是实例名。类的静态成员的副本仅有一个。</p><p>另外一种类型的构造函数是静态构造函数。 通过在构造函数名称的前面使用关键字&quot;static&quot;，就可以定义一个静态的构造函数。 调用静态的构造函数的发生时间是：在创建类的实例之前 ，在调用类的静态成员之前，在调用派生类的静态构造函数之前。(在后续课程中将介绍)，且仅被调用一次。</p><p>OutputClass也有一个析构函数，除了前面加上了&quot;~&quot;符号，就跟构造函数的格式一样。析构函数用于释放类所占用的资源。当C#垃圾搜集器决定把对象从内存中清除出去时，就会调用析构函数。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>现在，你已经了解了类的如下成员：域，方法，构造函数，析构函数。下面是类的完整的成员类型：</p><p>构造函数；析构函数；域；方法；属性；索引；代理 ；事件；嵌套类</p><p>上面没有介绍过的类型将在后续课程中讲解。</p><p>概括地讲，你现在已经学会了如何定义常规的和静态的构造函数，也了解了如何初始化类的域。如果没有必要实例化一个对象，可以创建静态的类成员。你也了解了用来释放资源的析构函数的用法。</p>`,31),c=[o];function e(u,l){return n(),a("div",null,c)}const k=s(p,[["render",e],["__file","cspcls4_7.html.vue"]]);export{k as default};
