import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},e=p(`<h1 id="第五章-类" tabindex="-1"><a class="header-anchor" href="#第五章-类" aria-hidden="true">#</a> 第五章 类</h1><p>前一章讨论了数据类型和它们的用法。现在我们转移到C#中至关重要的结构——类。没有了类，就连简单的C#程序都不能编译。这一章假定你知道了一个类的基本组成部分：方法、属性、构造函数和析构函数。 C#在其中增加了索引和事件。</p><p>在这一章中，你学到下列有关类的话题。</p><ul><li>使用构造函数和析构函数</li><li>给类写方法</li><li>给一个类增加属性存取标志</li><li>实现索引</li><li>创建事件并通过代表元为事件关联客户</li><li>应用类、成员和存取修饰符。</li></ul><h2 id="_5-1-构造函数和析构函数" tabindex="-1"><a class="header-anchor" href="#_5-1-构造函数和析构函数" aria-hidden="true">#</a> 5.1 构造函数和析构函数</h2><p>在你可以访问一个类的方法、属性或任何其它东西之前， 第一条执行的语句是包含有相应类的构造函数。甚至你自己不写一个构造函数，也会有一个缺省的构造函数提供给你。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">TestClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 由编译器提供</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一个构造函数总是和它的类名相同，但是，它没有声明返回类型。总之，构造函数总是<code>public</code>的，你可以用它们来初始化变量。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 在这给变量</span>
    <span class="token comment">// 初始化代码等等。</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果类仅包含静态成员(能以类型调用，而不是以实例调用的成员)，你可以创建一个<code>private</code>的构造函数。</p><p><code>private TestClass() {}</code></p><p>尽管存取修饰符在这一章的后面将要大篇幅地讨论，但是private意味着从类的外面不可能访问该构造函数。所以，它不能被调用，且没有对象可以自该类定义被实例化。</p><p>并不仅限于无参数构造函数——你可以传递初始参数来初始化成员。</p><p><code>public TestClass(string strName, int nAge) { ... }</code></p><p>作为一个C/C++程序员，你可能习惯于给初始化写一个附加的方法，因为在构造函数中没有返回值。当然，尽管在C#中也没有返回值，但你可以引发一个自制的异常，以从构造函数获得返回值。更多有关异常处理的知识在<a href="#csp_8">第七章</a> &quot;异常处理&quot;中有讨论。</p><p>但是，当你保留引用给宝贵的资源，应该想到写一个方法来解决：一个可以被显式地调用来释放这些资源。问题是当你可以在析构函数(以类名的前面加&quot;~&quot;的方式命名)中做同样的事情时，为何还要写一个附加的方法.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token operator">~</span><span class="token function">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 清除</span>
<span class="token punctuation">}</span>
</code></pre></div><p>你应该写一个附加方法的原因是垃圾收集器，它在变量超出范围后并不会立即被调用，而仅当间歇期间或内存条件满足时才被触发。当你锁住资源的时间长于你所计划的时间时，它就会发生。因此，提供一个显式的释放方式是一个好主意，它同样能从析构函数中调用。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 释放所有宝贵的资源</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token operator">~</span><span class="token function">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>调用析构函数中的释放方法并不是必要的——总之，垃圾收集会留意释放对象。但没有忘记清除是一种良好的习惯。</p><h2 id="_5-2-方法" tabindex="-1"><a class="header-anchor" href="#_5-2-方法" aria-hidden="true">#</a> 5.2 方法</h2><p>既然对象能正确地初始化和结束，所剩下来的就是往类中增加功能。在大多数情况下，功能的主要部分在方法中能得到实现。你早已见过静态方法的使用，但是，这些是类型(类)的部分，不是实例(对象)。</p><p>为了让你迅速入门，我把这些方法的烦琐问题安排为三节：</p><ul><li>方法参数</li><li>改写方法</li><li>方法屏蔽</li></ul><h3 id="_5-2-1-方法参数" tabindex="-1"><a class="header-anchor" href="#_5-2-1-方法参数" aria-hidden="true">#</a> 5.2.1 方法参数</h3><p>因方法要处理更改数值，你多多少少要传递值给方法，并从方法获得返回值。以下三个部分涉及到由传递值和为调用者获取返回结果所引起的问题。</p><ul><li>输入参数</li><li>引用参数</li><li>输出参数</li></ul><h4 id="_5-2-1-1-输入参数" tabindex="-1"><a class="header-anchor" href="#_5-2-1-1-输入参数" aria-hidden="true">#</a> 5.2.1.1 输入参数</h4><p>你早已在例子中见过的一个参数就是输入参数。你用一个输入参数通过值传递一个变量给一个方法——方法的变量被调用者传递进来的值的一个拷贝初始化。清单5.1 示范输入参数的使用。</p><p>清单 5.1 通过值传递参数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SquareSample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nSideLength<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> nSideLength<span class="token operator">*</span>nSideLength<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SquareApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SquareSample</span> sq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SquareSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>sq<span class="token punctuation">.</span><span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>因为我传递值而不是引用给一个变量，所以当调用方法时(见第16行)，可以使用一个常量表达式(25)。整型结果被传回给调用者作为返回值，它没有存到中间变量就被立即显示到屏幕上 。</p><p>输入参数按C/C++程序员早已习惯的工作方式工作。如果你来自VB，请注意没有能被编译器处理的隐式ByVal或ByRef——如果没有设定，参数总是用值传递。</p><p>这点似乎与我前面所陈述的有冲突：对于一些变量类型，用值传递实际上意味着用引用传递。迷惑吗? 一点背景知识也不需要：COM中的东西就是接口，每一个类可以拥有一个或多个接口。一个接口只不过是一组函数指针，它不包含数据。重复该数组会浪费很多内存资源；所以，仅开始地址被拷贝给方法，它作为调用者，仍然指向接口的相同指针。那就是为什么对象用值传递一个引用。</p><h4 id="_5-2-1-2-引用参数" tabindex="-1"><a class="header-anchor" href="#_5-2-1-2-引用参数" aria-hidden="true">#</a> 5.2.1.2 引用参数</h4><p>尽管可以利用输入参数和返回值建立很多方法，但你一想到要传递值并原地修改它(也就是在相同的内存位置)，就没有那么好运了。这里用引用参数就很方便。</p><p><code>void myMethod(ref int nInOut)</code></p><p>因为你传递了一个变量给该方法(不仅仅是它的值)，变量必须被初始化。否则，编译器会报警。</p><p>清单 5.2 显示如何用一个引用参数建立一个方法。</p><p>清单 5.2 通过引用传递参数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// class SquareSample</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SquareSample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> nOne4All<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        nOne4All <span class="token operator">*=</span> nOne4All<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SquareApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SquareSample</span> sq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SquareSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">int</span></span> nSquaredRef <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">// 一定要初始化</span>
        sq<span class="token punctuation">.</span><span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token keyword">ref</span> nSquaredRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>nSquaredRef<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>正如所看到的，所有你要做的就是给定义和调用都加上<code>ref</code>限定符。因为变量通过引用传递，你可以用它来计算出结果并传回该结果。但是，在现实的应用程序中，我强烈建议要用两个变量，一个输入参数和一个引用参数。</p><h4 id="_5-2-1-3-输出参数" tabindex="-1"><a class="header-anchor" href="#_5-2-1-3-输出参数" aria-hidden="true">#</a> 5.2.1.3 输出参数</h4><p>传递参数的第三种选择就是把它设作一个输出参数。正如该名字所暗示，一个输出参数仅用于从方法传递回一个结果。它和引用参数的另一个区别在于：调用者不必先初始化变量才调用方法。这显示在清单5.3中。</p><p>清单 5.3 定义一个输出参数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SquareSample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nSideLength<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> nSquared<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        nSquared <span class="token operator">=</span> nSideLength <span class="token operator">*</span> nSideLength<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SquareApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SquareSample</span> sq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SquareSample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nSquared<span class="token punctuation">;</span> <span class="token comment">// 不必初始化</span>
        sq<span class="token punctuation">.</span><span class="token function">CalcSquare</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token keyword">out</span> nSquared<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>nSquared<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_5-2-2-改写方法" tabindex="-1"><a class="header-anchor" href="#_5-2-2-改写方法" aria-hidden="true">#</a> 5.2.2 改写方法</h3><p>面向对象设计的重要原则就是多态性。不要理会高深的理论，多态性意味着：当基类程序员已设计好用于改写的方法时，在派生类中，你就可以重定义(改写)基类的方法。基类程序员可以用<code>virtual</code> 关键字设计方法：</p><p><code>virtual void CanBOverridden()</code></p><p>当从基类派生时，所有你要做的就是在新方法中加入<code>override</code>关键字：</p><p><code>override void CanBOverridden()</code></p><p>当改写一个基类的方法时，你必须明白，不能改变方法的访问属性——在这章的后面，你会学到更多关于访问修饰符的知识。</p><p>除了改写基类方法的事实外，还有另一个甚至更重要的改写特性。当把派生类强制转换成基类类型并接着调用虚拟方法时，被调用的是派生类的方法而不是基类的方法。</p><p><code>((BaseClass)DerivedClassInstance).CanBOverridden();</code></p><p>为了演示虚拟方法的概念，清单 5.4 显示如何创建一个三角形基类，它拥有一个可以被改写的成员方法（<code>ComputeArea</code>）。</p><p>清单 5.4 改写一个基类的方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Triangle</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">ComputeArea</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Heronian formula</span>
        <span class="token class-name"><span class="token keyword">double</span></span> s <span class="token operator">=</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b <span class="token operator">+</span> c<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dArea <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>s <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> a<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> b<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dArea<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">RightAngledTriangle</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Triangle</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">ComputeArea</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dArea <span class="token operator">=</span> a <span class="token operator">*</span> b <span class="token operator">/</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dArea<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TriangleTestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Triangle</span> tri <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>tri<span class="token punctuation">.</span><span class="token function">ComputeArea</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RightAngledTriangle</span> rat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RightAngledTriangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>rat<span class="token punctuation">.</span><span class="token function">ComputeArea</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>基类<code>Triangle</code>定义了方法<code>ComputeArea</code>。它采用三个参数，返回一个<code>double</code>结果，且具有公共访问性。从<code>Triangle</code>类派生出的是<code>RightAngledTriangle</code>，它改写了<code>ComputeArea</code> 方法，并实现了自己的面积计算公式。两个类都被实例化，且在命名为<code>TriangleTestApp</code>的应用类的<code>Main()</code> 方法中得到验证。</p><p>我漏了解释第14行：</p><p><code>class RightAngledTriangle : Triangle</code></p><p>在类语句中冒号（<code>：</code>）表示<code>RightAngledTriangle</code>从类 <code>Triangle</code>派生。那就是你所必须要做的，以让C#知道你想把 <code>Triangle</code>当作<code>RightAngledTriangle</code>的基类。</p><p>当仔细观察直角三角形的<code>ComputeArea</code>方法时，你会发现第3个参数并没有用于计算。但是，利用该参数就可以验证是否是“直角”。如清单5.5所示。</p><p>清单 5.5 调用基类实现</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">RightAngledTriangle</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Triangle</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">ComputeArea</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">double</span></span> dEpsilon <span class="token operator">=</span> <span class="token number">0.0001</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dArea <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token operator">*</span> a <span class="token operator">+</span> b <span class="token operator">*</span> b <span class="token operator">-</span> c <span class="token operator">*</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> dEpsilon<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            dArea <span class="token operator">=</span> <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">ComputeArea</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            dArea <span class="token operator">=</span> a <span class="token operator">*</span> b <span class="token operator">/</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dArea<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>该检测简单地利用了毕达哥拉斯公式，对于直角三角形，检测结果必须为0。如果结果不为0，类就调用它基类的 <code>ComputeArea</code>来实现。</p><p><code>dArea = base.ComputeArea(a,b,c);</code></p><p>例子的要点为：通过显式地利用基类的资格检查，你就能轻而易举地调用基类实现改写方法。当你需要实现其在基类中的功能，而不愿意在改写方法中重复它时，这就非常有帮助。</p><h3 id="_5-2-3-方法屏蔽" tabindex="-1"><a class="header-anchor" href="#_5-2-3-方法屏蔽" aria-hidden="true">#</a> 5.2.3 方法屏蔽</h3><p>重定义方法的一个不同手段就是要屏蔽基类的方法。当从别人提供的类派生类时，这个功能特别有价值。看清单 5.6，假设<code>BaseClass</code>由其他人所写，而你从它派生出 <code>DerivedClass</code> 。</p><p>清单 5.6 Derived Class 实现一个没有包含于 Base Class中的方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;DerivedClass::TestMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DerivedClass</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        test<span class="token punctuation">.</span><span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个例子中，<code>DerivedClass</code> 通过<code>TestMethod()</code>实现了一个额外的功能。但是，如果基类的开发者认为把<code>TestMethod()</code>放在基类中是个好主意，并使用相同的名字实现它时，会出现什么问题呢？（见清单5.7）</p><p>清单 5.7 Base Class 实现和 Derived Class相同的方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;BaseClass::TestMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;DerivedClass::TestMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在优秀的编程语言中，你现在会遇到一个真正的大麻烦。但是，C#会给你提出警告：</p><p><code>hiding2.cs(13,14): warning CS0114: &#39;DerivedClass.TestMethod()&#39; hides inherited member &#39;BaseClass.TestMethod()&#39;. To make the current method override that implementation, add the override keyword. Otherwise add the new keyword.</code></p><p>（hiding2.cs(13,14):警告 CS0114:&#39;DerivedClass.TestMethod()&#39; 屏蔽了所继承的成员&#39;BaseClass.TestMethod()&#39;。要想使当前方法改写原来的实现，加上 override关键字。否则加上新的关键字。）</p><p>具有了修饰符<code>new</code>，你就可以告诉编译器，不必重写派生类或改变使用到派生类的代码，你的方法就能屏蔽新加入的基类方法。清单5.8 显示如何在例子中运用new修饰符。</p><p>清单 5.8 屏蔽基类方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;BaseClass::TestMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;DerivedClass::TestMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用了附加的<code>new</code>修饰符，编译器就知道你重定义了基类的方法，它应该屏蔽基类方法。但是，如果你按以下方式编写：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">DerivedClass</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span>BaseClass<span class="token punctuation">)</span>test<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">TestMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>基类方法的实现就被调用了。这种行为不同于改写方法，后者保证大部分派生方法获得调用。</p><h2 id="_5-3-类属性" tabindex="-1"><a class="header-anchor" href="#_5-3-类属性" aria-hidden="true">#</a> 5.3 类属性</h2><p>有两种途径揭示类的命名属性——通过域成员或者通过属性。前者是作为具有公共访问性的成员变量而被实现的；后者并不直接回应存储位置，只是通过 存取标志(accessors)被访问。</p><p>当你想读出或写入属性的值时，存取标志限定了被实现的语句。用于读出属性的值的存取标志记为关键字<code>get</code>，而要修改属性的值的读写符标志记为<code>set</code>。在你对该理论一知半解以前，请看一下清单5.9中的例子，属性<code>SquareFeet</code>被标上了<code>get</code>和<code>set</code>的存取标志。</p><p>清单 5.9 实现属性存取标志</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">House</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_nSqFeet<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SquareFeet
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_nSqFeet<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> m_nSqFeet <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">House</span> myHouse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">House</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myHouse<span class="token punctuation">.</span>SquareFeet <span class="token operator">=</span> <span class="token number">250</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myHouse<span class="token punctuation">.</span>SquareFeet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>House</code>类有一个命名为<code>SquareFeet</code>的属性，它可以被读和写。实际的值存储在一个可以从类内部访问的变量中——如果你想当作一个域成员重写它，你所要做的就是忽略存取标志而把变量重新定义为：</p><p><code>public int SquareFeet;</code></p><p>对于一个如此简单的变量，这样不错。但是，如果你想要隐藏类内部存储结构的细节时，就应该采用存取标志。在这种情况下，set 存取标志给值参数中的属性传递新值。（可以改名，见第10行。）</p><p>除了能够隐藏实现细节外，你还可自由地限定各种操作：</p><ul><li>get和set：允许对属性进行读写访问。</li><li>get only：只允许读属性的值。</li><li>set only：只允许写属性的值。</li></ul><p>除此之外，你可以获得实现在set标志中有效代码的机会。例如，由于种种原因（或根本没有原因），你就能够拒绝一个新值。最好是没有人告诉你它是一个动态属性——当你第一次请求它后，它会保存下来，故要尽可能地推迟资源分配。</p><h2 id="_5-4-索引" tabindex="-1"><a class="header-anchor" href="#_5-4-索引" aria-hidden="true">#</a> 5.4 索引</h2><p>你想过象访问数组那样使用索引访问类吗 ？使用C#的索引功能，对它的期待便可了结。</p><p>语法基本上象这样：</p><p><code>属性 修饰符 声明 { 声明内容 }</code></p><p>具体的例子为</p><div class="language-CS" data-ext="CS"><pre class="language-CS"><code>public string this[int nIndex]
{
    get { ... }
    set { ... }
}
</code></pre></div><p>索引返回或按给出的<code>index</code>设置字符串。它没有属性，但使用了<code>public</code>修饰符。声明部分由类型<code>string</code>和<code>this</code> 组成用于表示类的索引。</p><p><code>get</code>和<code>set</code>的执行规则和属性的规则相同。（你不能取消其中一个。） 只存在一个差别，那就是：你几乎可以任意定义大括弧中的参数。限制为，必须至少规定一个参数，允许ref 和out 修饰符。</p><p><code>this</code>关键字确保一个解释。索引没有用户定义的名字，<code>this</code> 表示默认接口的索引。如果类实现了多个接口，你可以增加更多个由InterfaceName.this说明的索引。</p><p>为了演示一个索引的使用，我创建了一个小型的类，它能够解析一个主机名为IP地址——或一个IP地址列表(以http://www.microsoft.com为例 )。这个列表通过索引可以访问，你可以看一下清单5.10 的具体实现。</p><p>清单 5.10 通过一个索引获取一个IP地址</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">ResolveDNS</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPAddress<span class="token punctuation">[</span><span class="token punctuation">]</span></span> m_arrIPs<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Resolve</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strHost<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">IPHostEntry</span> iphe <span class="token operator">=</span> DNS<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>strHost<span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_arrIPs <span class="token operator">=</span> iphe<span class="token punctuation">.</span>AddressList<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">IPAddress</span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> nIndex<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> m_arrIPs<span class="token punctuation">[</span>nIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Count
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_arrIPs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">DNSResolverApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">ResolveDNS</span> myDNSResolver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ResolveDNS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myDNSResolver<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span><span class="token string">&quot;http://www.microsoft.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nCount <span class="token operator">=</span> myDNSResolver<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Found {0} IP&#39;s for hostname&quot;</span><span class="token punctuation">,</span> nCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myDNSResolver<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了解析主机名，我用到了<code>DNS</code>类，它是<code>System.Net</code> 名字空间的一部分。但是，由于这个名字空间并不包含在核心库中，所以必须在编译命令行中引用该库：</p><p><code>csc /r:System.Net.dll /out:resolver.exe dnsresolve.cs</code></p><p>解析代码是向前解析的。在该<code>Resolve</code>方法中，代码调用DNS类的静态方法<code>GetHostByName</code>，它返回一个<code>IPHostEntry</code>对象。结果，该对象包含有我要找的数组——<code>AddressList</code>数组。在退出<code>Resolve</code>方法之前，在局部的对象实例成员<code>m_arrIPs</code>中，存储了一个<code>AddressList array</code>的拷贝(类型IPAddress 的对象存储在其中)。</p><p>具有现在生成的数组 ，通过使用在类ResolveDNS中求得的索引，应用程序代码就可以在第37至38行列举出IP地址。(在<a href="#csp_7">第6章</a> &quot;控制语句&quot;，有更多有关语句的信息。) 因为没有办法更改IP地址，所以仅给索引使用了get存取标志。为了简单其见，我忽略了数组的边界溢出检查。</p><h2 id="_5-4-事件" tabindex="-1"><a class="header-anchor" href="#_5-4-事件" aria-hidden="true">#</a> 5.4 事件</h2><p>当你写一个类时，有时有必要让类的客户知道一些已经发生的事件。如果你是一个具有多年编程经验的程序员，似乎有很多的解决办法，包括用于回调的函数指针和用于ActiveX控件的事件接收（event sinks）。现在你将要学到另外一种把客户代码关联到类通知的办法——使用事件。</p><p>事件既可以被声明为类域成员（成员变量），也可以被声明为属性。两者的共性为，事件的类型必定是代表元，而函数指针原形和C#的代表元具有相同的含义。</p><p>每一个事件都可以被0或更多的客户占用，且客户可以随时关联或取消事件。你可以以静态或者以实例方法定义代表元，而后者很受C++程序员的欢迎。</p><p>既然我已经提到了事件的所有功能及相应的代表元，请看清单5.11中的例子。它生动地体现了该理论。</p><p>清单5.11 在类中实现事件处理</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// 向前声明</span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">EventSource</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">EventHandler</span> TextOut<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TriggerEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> TextOut<span class="token punctuation">)</span> <span class="token function">TextOut</span><span class="token punctuation">(</span><span class="token string">&quot;Event triggered&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">EventSource</span> evsrc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        evsrc<span class="token punctuation">.</span>TextOut <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>CatchEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
        evsrc<span class="token punctuation">.</span><span class="token function">TriggerEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        evsrc<span class="token punctuation">.</span>TextOut <span class="token operator">-=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>CatchEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
        evsrc<span class="token punctuation">.</span><span class="token function">TriggerEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TestApp</span> theApp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        evsrc<span class="token punctuation">.</span>TextOut <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>theApp<span class="token punctuation">.</span>InstanceCatch<span class="token punctuation">)</span><span class="token punctuation">;</span>
        evsrc<span class="token punctuation">.</span><span class="token function">TriggerEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CatchEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strText<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InstanceCatch</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strText<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Instance &quot;</span> <span class="token operator">+</span> strText<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第4行声明了代表元（事件方法原形），它用来给第8行中的EventSource类声明TextOut事件域成员。你可以观察到代表元作为一种新的类型声明，当声明事件时可以使用代表元。</p><p>该类仅有一个方法，它允许我们触发事件。请注意，你必须进行事件域成员不为null的检测，因为可能会出现没有客户对事件感兴趣这种情况。</p><p>TestApp类包含了Main方法，也包含了另外两个方法，它们都具备事件所必需的信号。其中一个方法是静态的，而另一个是实例方法。</p><p><code>EventSource</code> 被实例化，而静态方法CatchEvent被预关联上了TextOut事件：</p><p><code>evsrc.TextOut += new EventHandler(CatchEvent);</code></p><p>从现在起，当事件被触发时，该方法被调用。如果你对事件不再感兴趣，简单地取消关联：</p><p><code>evsrc.TextOut -= new EventHandler(CatchEvent);</code></p><p>注意，你不能随意取消关联的处理函数——在类代码中仅创建了这些处理函数。为了证明事件处理函数也和实例方法一起工作，余下的代码建立了TestApp 的实例，并钩住事件处理方法。</p><p>事件在哪方面对你特别有用？你将经常在ASP+中或使用到WFC (Windows Foundation Classes)时，涉及到事件和代表元。</p><h2 id="_5-5-应用修饰符" tabindex="-1"><a class="header-anchor" href="#_5-5-应用修饰符" aria-hidden="true">#</a> 5.5 应用修饰符</h2><p>在这一章的学习过程中，你已经见过了象<code>public</code>、<code>virtual</code>等修饰符。欲以一种易于理解的方法概括它们，我把它们划分为三节：</p><ul><li>类修饰符</li><li>成员修饰符</li><li>存取修饰符</li></ul><h3 id="_5-5-1-类修饰符" tabindex="-1"><a class="header-anchor" href="#_5-5-1-类修饰符" aria-hidden="true">#</a> 5.5.1 类修饰符</h3><p>到目前为止，我还没有涉及到类修饰符，而只涉及到了应用于类的存取修饰符。但是，有两个修饰符你可以用于类：</p><ul><li><code>abstract</code>——关于抽象类的重要一点就是它不能被实例化。只有不是抽象的派生类才能被实例化。派生类必须实现抽象基类的所有抽象成员。你不能给抽象类使用sealed修饰符。</li><li><code>sealed</code>——密封 类不能被继承。使用该修饰符防止意外的继承，在.NET框架中的类用到这个修饰符。</li></ul><p>要见到两个修饰符的运用，看看清单5.12 ，它创建了一个基于一个抽象类的密封类（肯定是一个十分极端的例子）。</p><p>清单 5.12 抽象类和密封类</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">abstract</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AbstractClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;sealed class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DerivedClass</span> dc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dc<span class="token punctuation">.</span><span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_5-5-2-成员修饰符" tabindex="-1"><a class="header-anchor" href="#_5-5-2-成员修饰符" aria-hidden="true">#</a> 5.5.2 成员修饰符</h3><p>与有用的成员修饰符的数量相比，类修饰符的数量很少。我已经提到了一些，这本书即将出现的例子描述了其它的成员修饰符。</p><p>以下是有用的成员修饰符：</p><ul><li><code>abstract</code>——说明一个方法或存取标志不能含有一个实现。它们都是隐式虚拟，且在继承类中，你必须提供 override关键字。</li><li><code>const</code>——这个修饰符应用于域成员或局部变量。在编译时常量表达式被求值，所以，它不能包含变量的引用。</li><li><code>event</code> ——定义一个域成员或属性作为类型事件。用于捆绑客户代码到类的事件。</li><li><code>extern</code>——告诉编译器方法实际上由外部实现。第10章 “和非受管代码互相操作” 将全面地涉及到外部代码。</li><li><code>override</code>——用于改写任何基类中被定义为virtual的方法和存取标志。要改写的名字和基类的方法必须一致。</li><li><code>readonly</code>——一个使用 readonly修饰符的域成员只能在它的声明或者在包含它的类的构造函数中被更改。</li><li><code>static</code>——被声明为static的成员属于类，而不属于类的实例。你可以用static 于域成员、方法、属性、操作符甚至构造函数。</li><li><code>virtual</code>——说明方法或存取标志可以被继承类改写。</li></ul><h3 id="_5-5-3-存取修饰符" tabindex="-1"><a class="header-anchor" href="#_5-5-3-存取修饰符" aria-hidden="true">#</a> 5.5.3 存取修饰符</h3><p>存取修饰符定义了某些代码对类成员（如方法和属性）的存取等级。你必须给每个成员加上所希望的存取修饰符，否则，默认的存取类型是隐含的。</p><p>你可以应用4个 存取修饰符之一：</p><ul><li><code>public</code>——任何地方都可以访问该成员，这是具有最少限制的存取修饰符。</li><li><code>protected</code>——在类及所有的派生类中可以访问该成员，不允许外部访问。</li><li><code>private</code>——仅仅在同一个类的内部才能访问该成员。甚至派生类都不能访问它。</li><li><code>internal</code>——允许相同组件（应用程序或库）的所有代码访问。在.NET组件级别，你可以把它视为public，而在外部则为private。</li></ul><p>为了演示存取修饰符的用法，我稍微修改了Triangle例子，使它包含了新增的域成员和一个新的派生类（见清单 5.13）。</p><p>清单 5.13 在类中使用存取修饰符</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">Triangle</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name"><span class="token keyword">int</span></span> m_a<span class="token punctuation">,</span> m_b<span class="token punctuation">,</span> m_c<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Triangle</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_a <span class="token operator">=</span> a<span class="token punctuation">;</span>
        m_b <span class="token operator">=</span> b<span class="token punctuation">;</span>
        m_c <span class="token operator">=</span> c<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Heronian formula</span>
        <span class="token class-name"><span class="token keyword">double</span></span> s <span class="token operator">=</span> <span class="token punctuation">(</span>m_a <span class="token operator">+</span> m_b <span class="token operator">+</span> m_c<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dArea <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>s <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> m_a<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> m_b<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>s <span class="token operator">-</span> m_c<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dArea<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">Prism</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Triangle</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_h<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Prism</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> c<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> h<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_h <span class="token operator">=</span> h<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dArea <span class="token operator">=</span> <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
        dArea <span class="token operator">+=</span> m_a <span class="token operator">*</span> m_h <span class="token operator">+</span> m_b <span class="token operator">*</span> m_h <span class="token operator">+</span> m_c <span class="token operator">*</span> m_h<span class="token punctuation">;</span>
        <span class="token keyword">return</span> dArea<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PrismApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Prism</span> prism <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Prism</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>prism<span class="token punctuation">.</span><span class="token function">Area</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>Triangle</code>类和 <code>Prism</code> 类现在被标为 <code>internal</code>。这意味着它们只能在当前组件中被访问。请记住“.NET组件”这个术语指的是包装（ packaging,），而不是你可能在COM+中用到的组件。<code>Triangle</code> 类有三个 <code>protected</code>成员，它们在构造函数中被初始化，并用于面积计算的方法中。由于这些成员是<code>protected</code> 成员，所以我可以在派生类<code>Prism</code>中访问它们，在那里执行不同的面积计算。<code>Prism</code>自己新增了一个成员<code>m_h</code>，它是私有的——甚至派生类也不能访问它。</p><p>花些时间为每个类成员甚至每个类计划一种保护层次，通常是个好主意。当需要引入修改时，全面的计划最终会帮助你，因为没有程序员会愿意使用“没有文档”的类功能。</p><h2 id="_5-6-小结" tabindex="-1"><a class="header-anchor" href="#_5-6-小结" aria-hidden="true">#</a> 5.6 小结</h2><p>这章显示了类的各种要素，它是运行实例（对象）的模板。在一个对象的生命期，首先被执行的代码是个构造函数。构造函数用来初始化变量，这些变量后来在方法中用于计算结果。</p><p>方法允许你传递值、引用给变量，或者只传送一个输出值。方法可以被改写以实现新的功能，或者你可以屏蔽基类成员，如果它实现了一个具有和派生类成员相同名字的方法。</p><p>命名属性可以被当作域成员（成员变量）或属性存取标志实现。后者是<code>get</code>和<code>set</code>存取标志，忽略一个或另外一个，你可以创建仅写或仅读属性。存取标志非常适合于确认赋给属性的值。</p><p>C#类的另外一个功能是索引，它使象数组语法一样访问类中值成为可能。还有，如果当类中的某些事情发生时，你想客户得到通知，要让它们与事件关联。</p><p>当垃圾收集器调用析构函数时，对象的生命就结束了。由于你不能准确地预测这种情况什么时候会发生，所以应该创建一个方法以释放这些宝贵的资源，当你停止使用它们时。</p>`,154),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","cspcls2_5.html.vue"]]);export{i as default};
