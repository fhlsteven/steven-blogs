import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="c-教程第六课-名称空间" tabindex="-1"><a class="header-anchor" href="#c-教程第六课-名称空间" aria-hidden="true">#</a> C＃教程第六课:名称空间</h1><p>（Joe Mayo　2001年06月08日 11:13）</p><p>本节课将介绍C#的名称空间。其目的是：</p><ol><li>了解什么是名称空间</li><li>了解如何实现&quot;using&quot;指示符</li><li>了解&quot;alias&quot; 指示符的用法</li><li>了解名称空间的成员的内容</li></ol><p>在第一课中，你已经在简单的hello程序中看到了&quot;using System;&quot;指示符的使用。该指示符可以让你使用System名称空间中的成员。在第一课中，未及对此作出详细介绍，现在我们来解释一下名称空间的具体用法。一旦学完了本节课，你将了解&quot;using&quot;指示符及其相关内容。</p><p>作为C#的元素，名称空间可以用来帮助组织程序的结构，可以避免两套代码集中命名的冲突。在程序代码中，使用名称空间是个良好的编程习惯，因为这有助于重用你的程序代码。</p><p>1.清单6-1. The C# Station Namespace: NamespaceCSS.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// The C# Station Namespace</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Program start class</span>
    <span class="token keyword">class</span> <span class="token class-name">NamespaceCSS</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Main begins program execution.</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Write to console</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is the new C# Station Namespace.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>清单6-1演示了如何创建一个名称空间。把单词&quot;namespace&quot;放在&quot;csharp_station&quot;之前，就创建了一个名称空间。&quot;csharp_station&quot;名称空间内的大括号中包含了成员。</p><p>2.清单6-2 Nested Namespace 1: NestedNamespace1.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// The C# Station Tutorial Namespace</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station</span>
<span class="token punctuation">{</span>
    <span class="token keyword">namespace</span> <span class="token namespace">tutorial</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Program start class</span>
        <span class="token keyword">class</span> <span class="token class-name">NamespaceCSS</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Main begins program execution.</span>
            <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// Write to console</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is the new C# Station Tutorial Namespace.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>名称空间可以建立一个代码的组织结构。一个良好的编程习惯是：用层次模式来组织你的名称空间。你可以把通用一些的名称放在最顶层，里层则放置一些专用一些的名称。这个层次系统可以用嵌套的名称空间表示。清单6-2演示了如何建立一个嵌套的名称空间。在不同的子名称空间内放置代码，从而组织好你的代码的结构。</p><p>3.清单6-3. Nested Namespace 2: NestedNamespace2.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// The C# Station Tutorial Namespace</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station<span class="token punctuation">.</span>tutorial</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Program start class</span>
    <span class="token keyword">class</span> <span class="token class-name">NamespaceCSS</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Main begins program execution.</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Write to console</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is the new C# Station Tutorial Namespace.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>清单6-3演示了另外一种编写嵌套的名称空间的方法。在&quot;csharp_station&quot;和&quot;tutorial&quot;之间置入点运算符，表明这是嵌套的名称空间。结果同清单6-2。 相比而言，清单6-3 更易书写。</p><p>4.清单6-4. Calling Namespace Members: NamespaceCall.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station</span>
<span class="token punctuation">{</span>
    <span class="token comment">// nested namespace</span>
    <span class="token keyword">namespace</span> <span class="token namespace">tutorial</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">class</span> <span class="token class-name">myExample1</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPrint1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;First Example of calling another namespace member.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Program start class</span>
    <span class="token keyword">class</span> <span class="token class-name">NamespaceCalling</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Main begins program execution.</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Write to console</span>
            tutorial<span class="token punctuation">.</span>myExample1<span class="token punctuation">.</span><span class="token function">myPrint1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            csharp_station<span class="token punctuation">.</span>tutorial<span class="token punctuation">.</span>myExample2<span class="token punctuation">.</span><span class="token function">myPrint2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// same namespace as nested namespace above</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station<span class="token punctuation">.</span>tutorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">myExample2</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPrint2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Second Example of calling another namespace member.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单6-4 的例子演示了用完整的名称指示，调用名称空间的成员。</p><p>一个完整的名称指示包括名称空间名，以及调用的方法名。程序的上半部分，在&quot;csharp-station&quot;名称空间内嵌套的名称空间&quot;tutorial&quot;中，定义了类&quot;myExample1&quot;及其方法&quot;myPrint1&quot;。 Main()方法中用完整的名称指示：&quot;tutorial.myExample1.myPrint()&quot; 来进行调用。 因为Main()方法和tutorial名称空间位于同一名称空间内，如果使用&quot;csharp_station&quot;的全称不是必需的。</p></li><li><p>清单6-4的下半部分，也是名称空间&quot;csharp_station.tutorial&quot;的一部分。</p><p>类&quot;myExample1&quot;和&quot;myExample2&quot;都属于该名称空间。另外，也可以把它们分别写入不同的文件，同时它们仍然属于同一名称空间。在Main()方法中，调用&quot;myPrint2&quot;方法时，采用了全称：&quot;csharp_station.tutorial.myExample2.myPrint2()&quot;。 在这里，必须使用全称中&quot;csharp_station&quot;，因为&quot;myExample2&quot;定义在外部。</p></li><li><p>注意：这里对两个不同的类起了不同的名字：</p><p>&quot;myExample1&quot;和&quot;myExample2&quot;这是因为对于每个名称空间来说，其中的成员必须有唯一的名称。 记住：它们都处于同一名称空间中，不能取名相同。方法&quot;myPrint1&quot;和&quot;myPrint2&quot; 名称的不同仅仅是为了方便起见，即使同名也没有问题，因为它们属于不同的类。</p></li></ol><p>5.清单6-5. The using Directive: UsingDirective.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">csharp_station<span class="token punctuation">.</span>tutorial</span><span class="token punctuation">;</span>
<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">UsingDirective</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Call namespace member</span>
        myExample<span class="token punctuation">.</span><span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// C# Station Tutorial Namespace</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station<span class="token punctuation">.</span>tutorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">myExample</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Example of using a using directive.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>调用方法时，如果你不想打入全称，可使用&quot;using&quot;指示符。在清单6-5中，有两个&quot;using&quot;指示符。第一个指示符是&quot;using System&quot;，同本教程其它地方出现的&quot;using&quot;指示符相同。你不需要每次都打上&quot;System&quot;，只需要打入该名称空间的成员方法名即可。在myPrint()中，&quot;Console&quot;是个&quot;System&quot;名称空间中的成员类，该类有个&quot;WriteLine&quot;的方法。该方法的全称是： &quot;System.Console.WriteLine(...)&quot;。</p><p>类似地，using指示符&quot;using csharp_station.tutorial&quot;可以让我们在使用 &quot;csharp_station.tutorial&quot; 名称空间的成员时，无需打入全称。所以，我们可以打入&quot;myExample.myPrint()&quot;。如果不使用&quot;using&quot;指示符，每次实现该方法时，我们就得打入&quot;csharp_station.tutorial.myExample.myPrint()&quot; 。</p><p>6.清单6-6. The Alias Directive: AliasDirective.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token class-name">csTut</span> <span class="token operator">=</span> <span class="token class-name">csharp_station<span class="token punctuation">.</span>tutorial<span class="token punctuation">.</span>myExample</span><span class="token punctuation">;</span> <span class="token comment">// alias</span>
<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">AliasDirective</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Call namespace member</span>
        csTut<span class="token punctuation">.</span><span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Potentially ambiguous method.</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Not a member of csharp_station.tutorial.myExample.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// C# Station Tutorial Namespace</span>
<span class="token keyword">namespace</span> <span class="token namespace">csharp_station<span class="token punctuation">.</span>tutorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">myExample</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">myPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is a member of csharp_station.tutorial.myExample.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>有时，往往遇到取名较长的名称空间，而你可以把该名称变短些。</p><p>这样就增强了可读性，还避免了同名的冲突。清单6-6 演示了如何使用别名指示符，创建别名的格式例子是：&quot;using csTut = csharp_station.tutorial.myExample&quot;。表达式&quot;csTut&quot;可以取代&quot;csharp_station.tutorial.myExample&quot;，用在本文件的任何地方。在Main()方法中就使用了&quot;csTut&quot;。</p></li><li><p>在Main()方法中，调用了&quot;AliasDirective&quot; 类中&quot;myPrint&quot; 方法。</p><p>这与&quot;myExample&quot; 类的&quot;myPrint&quot;方法同名。 虽然同名，这两个方法都各自正确地进行了调用，原因是：&quot;myExample&quot;类的&quot;myPrint&quot;方法用别名&quot;csTut&quot;表示。编译器能够准确地了解所要执行的是哪个方法。一旦漏掉了&quot;csTut&quot;，编译器将两次调用&quot;AliasDirective&quot;类的&quot;myPrint&quot;方法。</p></li><li><p>另外一方面，如果我们没有创建别名指示符，而是添加了&quot;using csharp_station.tutorial.myExample&quot;之后，再调用myPrint(),编译器就会生成出错信息，因为它不知道究竟是调用. &quot;csharp_station.tutorial.myExample.myPrint()&quot;方法呢？还是去调用&quot;AliasDirective.myPrint()&quot;方法。所以使用名称空间是良好的编程习惯，可避免代码中的冲突现象。</p></li></ol><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>到现在为止，我们已经了解在名称空间中可以使用类，实际上，名称空间可以使用如下类型的数据：</p><p>类；结构；接口；枚举；代理</p><p>在后面的课程中我们将详细介绍这些数据类型。</p><p>概括来讲，你已经了解了什么是名称空间，如何定义自己的名称空间。如果你不想打入全称，可以使用&quot;using&quot;指示符。一旦你想缩短名称空间的长名，可以使用别名指示符。另外，除了类之外，你也了解了名称空间可以使用的其他一些数据类型。</p>`,36),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","cspcls4_6.html.vue"]]);export{k as default};
