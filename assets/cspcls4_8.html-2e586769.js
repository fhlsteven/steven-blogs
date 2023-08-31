import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},o=t(`<h1 id="c-教程第八课-类的继承" tabindex="-1"><a class="header-anchor" href="#c-教程第八课-类的继承" aria-hidden="true">#</a> C＃教程第八课:类的继承</h1><p>（Joe Mayo　2001年06月08日 11:05）</p><p>本节课将介绍C#中的继承，其目的如下：</p><ol><li>基类的实现</li><li>类的继承</li><li>在派生类中初始化基类</li><li>如何调用基类成员</li><li>如何覆盖基类成员</li></ol><p>继承是面向对象程序设计的主要特征之一，它可以让你重用代码，可以节省程序设计的时间。</p><p>1.清单8-1 继承： BaseClass.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ParentClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">ParentClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent Constructor.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Parent Class.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChildClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ParentClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">ChildClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child Constructor.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">ChildClass</span> child <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ChildClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        child<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Output:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Parent Constructor.
Child Constructor.
I&#39;m a Parent Class.
</code></pre></div><p>说明</p><p>清单8-1演示了两个类的用法。上面的一个类名为ParentClass， main函数中用到的类名为ChildClass。要做的是创建一个使用父类ParentClass现有代码的子类ChildClass。</p><ol><li><p>首先必须说明ParentClass是ChildClass的基类。</p><p>这是通过在ChildClass类中作出如下说明来完成的：&quot;public class ChildClass : ParentClass&quot;。在派生类标识符后面，用分号&quot;:&quot; 来表明后面的标识符是基类。C#仅支持单一继承。因此，你只能指定一个基类。</p></li><li><p>ChildClass的功能几乎等同于ParentClass。</p><p>因此，也可以说ChildClass &quot;就是&quot; ParentClass。在ChildClass 的Main()方法中，调用print() 方法的结果，就验证这一点。该子类并没有自己的print()方法，它使用了ParentClass中的 print()方法。在输出结果中的第三行可以得到验证。</p></li><li><p>基类在派生类初始化之前自动进行初始化。</p></li></ol><p>注意到清单8-1的输出结果。ParentClass 类的构造函数在ChildClass的构造函数之前执行。</p><p>2.清单 8-2. 派生类同基类进行通信： BaseTalk.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Parent</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> parentString<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent Constructor.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> myString<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        parentString <span class="token operator">=</span> myString<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>parentString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Parent Class.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token string">&quot;From Derived&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child Constructor.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m a Child Class.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Child</span> child <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        child<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span>Parent<span class="token punctuation">)</span>child<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Output:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>From Derived
Child Constructor.
I&#39;m a Parent Class.
I&#39;m a Child Class.
I&#39;m a Parent Class.
</code></pre></div><p>说明</p><ol><li><p>派生类在初始化的过程中可以同基类进行通信。</p><p>清单8-2演示了在子类的构造函数定义中是如何实现同基类通信的。分号&quot;:&quot;和关键字base用来调用带有相应参数的基类的构造函数。输出结果中，第一行表明：基类的构造函数最先被调用，其实在参数是字符串&quot;From Derived&quot;。</p></li><li><p>有时，对于基类已有定义的方法，打算重新定义自己的实现。</p><p>Child类可以自己重新定义print()方法的实现。Child的print()方法覆盖了Parent中的 print 方法。结果是：除非经过特别指明，Parent类中的print方法不会被调用。</p></li><li><p>在Child类的 print() 方法中，我们特别指明：调用的是Parent类中的 print() 方法。</p><p>方法名前面为&quot;base&quot;，一旦使用&quot;base&quot;关键字之后，你就可以访问基类的具有公有或者保护权限的成员。 Child类中的print()方法的执行结果出现上面的第三行和第四行。</p></li><li><p>访问基类成员的另外一种方法是：通过显式类型转换。</p><p>在Child类的Main()方法中的最后一条语句就是这么做的。记住：派生类是其基类的特例。这个事实告诉我们：可以在派生类中进行数据类型的转换，使其成为基类的一个实例。清单8-2的最后一行实际上执行了Parent类中的 print()方法。</p></li></ol><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>你已经了解了如何创建一个派生类及其基类。你可以对基类成员进行初始化，以及如何对方法进行隐式或者显式的调用。你也了解了派生类是其基类的一个特例。</p>`,21),c=[o];function e(l,u){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","cspcls4_8.html.vue"]]);export{k as default};
