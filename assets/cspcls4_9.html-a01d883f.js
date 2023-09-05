import{_ as n,o as s,c as a,a as p}from"./app-57d1f7b1.js";const t={},c=p(`<h1 id="c-教程第九课-多态性" tabindex="-1"><a class="header-anchor" href="#c-教程第九课-多态性" aria-hidden="true">#</a> C＃教程第九课:多态性</h1><p>（Joe Mayo　2001年06月08日 11:01）</p><p>本节课将介绍C#的多态性，其目的包括：</p><ol><li>了解什么是多态性</li><li>如何定义一个虚方法</li><li>如何重载一个虚方法</li><li>如何在程序中运用多态性</li></ol><p>面向对象程序设计中的另外一个重要概念是多态性。在运行时，可以通过指向基类的指针，来调用实现派生类中的方法。 可以把一组对象放到一个数组中，然后调用它们的方法，在这种场合下，多态性作用就体现出来了，这些对象不必是相同类型的对象。当然，如果它们都继承自某个类，你可以把这些派生类，都放到一个数组中。 如果这些对象都有同名方法，就可以调用每个对象的同名方法。本节课将向你介绍如何完成这些事情。</p><p>1.清单9-1. 带有虚方法的基类：DrawingObject.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DrawingObject</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m just a generic drawing object.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>清单9-1 定义了DrawingObject类。这是个可以让其他对象继承的基类。该类有一个名为Draw()的方法。Draw()方法带有一个virtual修饰符，该修饰符表明：该基类的派生类可以重载该方法。DrawingObject类的 Draw()方法完成如下事情：输出语句&quot;I&#39;m just a generic drawing object.&quot;到控制台。</p><p>2.清单9-2. 带有重载方法的派生类：Line.cs, Circle.cs, and Square.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Line</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DrawingObject</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Line.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DrawingObject</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Circle.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DrawingObject</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Square.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>清单9-2定义了三个类。这三个类都派生自DrawingObject类。每个类都有一个同名Draw()方法，这些Draw()方法中的每一个都有一个重载修饰符。重载修饰符可让该方法在运行时重载其基类的虚方法，实现这个功能的条件是：通过基类类型的指针变量来引用该类。</p><p>3.清单9-3. 实现多态性的程序：DrawDemo.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DrawDemo</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DrawingObject<span class="token punctuation">[</span><span class="token punctuation">]</span></span> dObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DrawingObject</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        dObj<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Line</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dObj<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dObj<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dObj<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DrawingObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DrawingObject</span> drawObj <span class="token keyword">in</span> dObj<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            drawObj<span class="token punctuation">.</span><span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><p>清单9-3演示了多态性的实现，该程序使用了在清单 9-1 和清单9-2中定义的类。在DrawDemo类中的Main()方法中，创建了一个数组，数组元素是DrawingObject 类的对象。该数组名为dObj，是由四个DrawingObject类型的对象组成。</p><p>接下来，初始化dObj数组，由于Line，Circle和Square类都是DrawingObject类的派生类，所以这些类可以作为dObj数组元素的类型。 如果C#没有这种功能，你得为每个类创建一个数组。继承的性质可以让派生对象当作基类成员一样用，这样就节省了编程工作量。</p><p>一旦数组初始化之后，接着是执行foreach循环，寻找数组中的每个元素。在每次循环中，dObj数组的每个元素（对象）调用其Draw()方法。多态性体现在：在运行时，各自调用每个对象的Draw()方法。尽管dObj 数组中的引用对象类型是DrawingObject，这并不影响派生类重载DrawingObject 类的虚方法Draw()。在dObj 数组中，通过指向DrawingObject 基类的指针来调用派生类中的重载的Draw()方法。</p><p>输出结果是：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>I&#39;m a Line.
I&#39;m a Circle.
I&#39;m a Square.
I&#39;m just a generic drawing object. 
</code></pre></div><p>在DrawDemo 程序中，调用了每个派生类的重载的Draw()方法。 最后一行中，执行的是DrawingObject类的虚方法Draw()。这是因为运行到最后，数组的第四个元素是DrawingObject类的对象。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>现在对多态性有所了解之后，你可以在派生类中，实现一个重载基类虚方法的方法。虚方法和重载的派生类方法之间的关系就体现出C#的多态性。</p>`,24),e=[c];function o(l,u){return s(),a("div",null,e)}const k=n(t,[["render",o],["__file","cspcls4_9.html.vue"]]);export{k as default};
