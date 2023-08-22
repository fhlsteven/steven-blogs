import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t="/steven-blogs/assets/cspbase15_1-21c0e1bc.png",o={},c=p(`<h1 id="c-中的委托" tabindex="-1"><a class="header-anchor" href="#c-中的委托" aria-hidden="true">#</a> C#中的委托</h1><p>标题 C＃中的委托 lotusswan（原作）</p><p>关键字 C#,.NET,delegate,函数指针,event</p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>委托是C＃中的一种引用类型，类似于C/C++中的函数指针。与函数指针不同的是，委托是面向对象、类型安全的，而且委托可以引用静态方法和实例方法，而函数指针只能引用静态函数。委托主要用于 .NET Framework 中的事件处理程序和回调函数。</p><p>一个委托可以看作一个特殊的类，因而它的定义可以像常规类一样放在同样的位置。与其他类一样，委托必须先定义以后，再实例化。与类不同的是，实例化的委托没有与之相应的术语(类的实例化称作对象)，作为区分我们将实例化的委托称为委托实例。</p><h2 id="函数指针" tabindex="-1"><a class="header-anchor" href="#函数指针" aria-hidden="true">#</a> 函数指针</h2><p>一个函数在编译时被分配给一个入口地址，这个入口地址就称为函数的指针，正如同指针是一个变量的地址一样。</p><p>函数指针的用途很多，最常用的用途之一是把指针作为参数传递到其他函数。我们可以参考下面的例子进一步理解函数指针作为参数的情况：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>x<span class="token operator">&gt;</span>y<span class="token operator">?</span>x<span class="token operator">:</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">(</span>x<span class="token operator">&lt;</span>y<span class="token operator">?</span>x<span class="token operator">:</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">(</span>x<span class="token operator">+</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span><span class="token keyword">int</span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>     
    <span class="token keyword">return</span><span class="token punctuation">(</span>x<span class="token operator">-</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>q<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> Int1<span class="token punctuation">,</span>Int2<span class="token punctuation">;</span>
    Int1<span class="token operator">=</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Int2<span class="token operator">=</span><span class="token punctuation">(</span><span class="token operator">*</span>q<span class="token punctuation">)</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d,\\t%d\\n&quot;</span><span class="token punctuation">,</span>Int1<span class="token punctuation">,</span>Int2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">test</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span>min<span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">test</span><span class="token punctuation">(</span>sub<span class="token punctuation">,</span>minus<span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>客观的讲，使用函数指针作为其参数的函数如果直接调用函数或是直接把调用的函数的函数体放在这个主函数中也可以实现其功能。那么为什么还要使用函数指针呢？我们仔细看一下上面的<code>main()</code>函数就可以发现，<code>main()</code>函数两次调用了test函数，前一次求出最大最小值，后一次求出两数的和与差。如果我们test函数不用函数指针，而是采用直接在test函数中调用函数的方法，使用一个test函数还能完成这个功能吗？显然不行，我们必须写两个这样的test函数供main()函数调用，虽然大多数代码还是一样的，仅仅是调用的函数名不一样。上面仅仅是一个简单的例子，实际生活中也许main()函数会频繁的调用test()，而每次的差别仅仅是完成的功能不一样，也许第一次调用会要求求出两数的和与差，而下一次会要求求出最大值以及两数之和，第三次呢，也许是最小值和最大值，……，如果不用函数指针，我们需要写多少个这样的test()函数？显然，函数指针为我们的编程提供了灵活性。</p><p>另外，有些地方必须使用到函数指针才能完成给定的任务，特别是异步操作的回调和其他需要匿名回调的结构。另外，像线程的执行，事件的处理，如果缺少了函数指针的支持也是很难完成的。</p><h2 id="类型安全" tabindex="-1"><a class="header-anchor" href="#类型安全" aria-hidden="true">#</a> 类型安全</h2><p>从上面的介绍可以看出，函数指针的提出还是有其必要的，上面的介绍也同时说明了委托存在的必要性。那么为什么C＃中不直接用函数指针，而是要使用委托呢？这就涉及到另外一个问题：C＃是类型安全的语言。何谓类型安全？这里的类型安全特指内存类型安全，即类型安全代码只访问被授权可以访问的内存位置。如果代码以任意偏移量访问内存，该偏移量超出了属于该对象的公开字段的内存范围，则它就不是类型安全的代码。显然指针不属于类型安全代码，这也是为什么C＃使用指针时必须申明<code>unsafe</code>的缘故。</p><p>那么类型不安全代码可能会带来什么不良的后果呢？相信对于安全技术感兴趣的朋友一定十分熟悉缓冲区溢出问题，通过缓冲区溢出攻击者可以运行非法的程序获得一定的权限从而攻击系统或是直接运行恶意代码危害系统，在UNIX下这是一个十分普遍的问题。那么缓冲区溢出又和函数指针有什么关系呢？事实上，攻击者就是通过缓冲区溢出改变返回地址的值到恶意代码地址来执行恶意代码的。我们可以看看下面的代码：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span> buffer<span class="token punctuation">[</span><span class="token number">128</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token function">strcpy</span> <span class="token punctuation">(</span>buffer<span class="token punctuation">,</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token string">&quot;HOME&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//HOME为UNIX系统中的HOME环境变量</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面的代码中如果HOME环境变量的字符数大于128，就会产生缓冲区溢出，假如这个缓冲区之前有另一个函数的返回地址，那么这一是地址就有可能覆盖，而覆盖这一地址的字符有可能就是恶意代码的地址，攻击者就有可能攻击成功了！</p><p>上面的例子仅仅是指针问题中的一种，除此以外，还可能由于错误的管理地址，将数据写入错误地址，造成程序的崩溃；还可能由于对指针不恰当的赋值操作产生悬浮指针；还可能产生内存越界，内存泄漏等等问题。</p><p>由此可见，指针不是类型安全的，函数指针当然也不例外，所以C＃里面没有使用函数指针，而且不建议使用指针变量。</p><h2 id="委托" tabindex="-1"><a class="header-anchor" href="#委托" aria-hidden="true">#</a> 委托</h2><p>前面的说明充分证明了委托存在的必要性，那么我们再谈谈为什么委托是类型安全的。C＃中的委托和指针不一样，指针不通过MSIL而是直接和内存打交道，这也是指针不安全的原因所在，当然也是采用指针能够提高程序运行速度的缘故；委托不与内存打交道，而是把这一工作交给CLR去完成。CLR无法阻止将不安全的代码调用到本机（非托管）代码中或执行恶意操作。然而当代码是类型安全时，CLR的安全性强制机制确保代码不会访问本机代码，除非它有访问本机代码的权限。</p><p>委托派生于基类<code>System.Delegate</code>，不过委托的定义和常规类的定义方法不太一样。委托的定义通过关键字<code>delegate</code>来定义：</p><p><code>public delegate int myDelegate(int x,int y);</code></p><p>上面的代码定义了一个新委托，它可以封装任何返回为int，带有两个int类型参数的方法。任何一个方法无论是实例方法还是静态方法，只要他们的签名（参数类型在一个方法中的顺序）和定义的委托是一样的，都可以把他们封装到委托中去。这种签名方法正是保证委托是类型安全的手段之一。</p><p>产生委托实例和产生类实例（对象）差不多，假如我们有如下的方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">(</span>x<span class="token operator">+</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们就可以使用如下的代码得到一个委托实例：</p><p><code>myDelegate calculatin=new myDelegate(sub);</code></p><p>接下来我们就可以直接使用<code>calculation</code>调用<code>sub</code>方法了：</p><p><code>calculation(10,3);</code></p><p>下面我们将用委托重写上面的一个程序来看一下在C＃中如何通过委托实现由函数指针实现的功能：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MathClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">&gt;</span> <span class="token class-name">b <span class="token punctuation">?</span></span> a <span class="token punctuation">:</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">&lt;</span> <span class="token class-name">b <span class="token punctuation">?</span></span> a <span class="token punctuation">:</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Handler</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Calculation</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Calculation<span class="token punctuation">[</span><span class="token punctuation">]</span></span> myCalculation <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Calculation</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
                myCalculation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Calculation</span><span class="token punctuation">(</span>MathClass<span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
                myCalculation<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Calculation</span><span class="token punctuation">(</span>MathClass<span class="token punctuation">.</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myCalculation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myCalculation<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>

                myCalculation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Calculation</span><span class="token punctuation">(</span>MathClass<span class="token punctuation">.</span>sub<span class="token punctuation">)</span><span class="token punctuation">;</span>
                myCalculation<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Calculation</span><span class="token punctuation">(</span>MathClass<span class="token punctuation">.</span>minus<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myCalculation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myCalculation<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

        Handler<span class="token punctuation">.</span><span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Handler<span class="token punctuation">.</span><span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们还可以声明一个委托数组，就像声明一个对象数组一样，上面的例子中就使用到了委托数组；一个委托还可以封装多个方法（多路广播委托，经常与事件处理程序结合使用），只要这些方法的签名是正确的。多路广播委托的返回值一般为<code>void</code>，这是因为一个委托只能有一个返回值，如果一个返回值不为<code>void</code>的委托封装了多个方法时，只能得到最后封装的方法的返回值，这可能和用户初衷不一致，同时也会给管理带来不方便。如果你想通过委托返回多个值，最好是使用委托数组，让每个委托封装一个方法，各自返回一个值。</p><h2 id="事件" tabindex="-1"><a class="header-anchor" href="#事件" aria-hidden="true">#</a> 事件</h2><p>在C＃中，委托的最基本的一个用处就是用于事件处理。事件是对象发送的消息，以发信号通知操作的发生，通俗一点讲，事件就是程序中产生了一件需要处理的信号。</p><p>事件的定义用关键字event声明,不过声明事件之前必须存在一个多路广播委托：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Calculate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//返回值为void的委托自动成为多路广播委托；</span>
<span class="token keyword">public</span> <span class="token keyword">event</span>  <span class="token class-name">calculate</span> OnCalculate<span class="token punctuation">;</span>
</code></pre></div><p>从上节的委托实例和上面的事件的声明可以看出，事件的声明仅仅是比委托实例的声明多了个关键字<code>event</code>，事实上事件可以看作是一个为事件处理过程定制的多路广播委托。因此，定义了事件后，我们就可以通过向事件中操作符+=添加方法实现事件的预定或者是通过-=取消一个事件，这些都与委托实例的处理是相同的。与委托实例不同的是，操作符＝对于事件是无效的，即</p><p><code>OnCalculate=new calculate(sub) ;//无效</code></p><p>只是因为上面的语句会删除由<code>OnCalculate</code>封装的所有其他方法，指封装了由此语句指定的唯一方法，而且一个预定可以删除其他所有方法，这会导致混乱。</p><h2 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数" aria-hidden="true">#</a> 回调函数</h2><p>回调函数是在托管应用程序中可帮助非托管 DLL 函数完成任务的代码。对回调函数的调用将从托管应用程序中，通过一个 DLL 函数，间接地传递给托管实现。在用平台调用调用的多种 DLL 函数中，有些函数要求正确地运行托管代码中的回调函数。关于回调函数只是使用到委托，在此不加过多说明，具体实现可参考下图：</p><p><img src="`+t+'" alt="托管"></p><hr><hr><p>对该文的评论 人气：885<br> zhpsam109 (2003-11-26 14:34:55)</p><blockquote><p>作者写的很容易懂！好！</p></blockquote><p>cgsw12345 (2003-11-5 17:32:55)</p><blockquote><p>函数指针只能引用静态函数??? <code>class A { public: void f(); } void (A::*pmf)() = A::f;</code> 难道不是指向成员函数的指针吗? -------- 說的沒錯靜態函數，成員函數（根本就不佔類對象的空閒），非成員函數，對於編譯器來說都是一種類型的函數而已！所以那樣說還是有問題的！</p></blockquote><p>jiangpeng (2003-11-5 14:49:04)</p><blockquote><p>函数指针只能引用静态函数??? <code>class A { public: void f(); } void (A::*pmf)() = A::f;</code> 难道不是指向成员函数的指针吗?</p></blockquote>',51),e=[c];function u(l,k){return s(),a("div",null,e)}const r=n(o,[["render",u],["__file","cspbase15.html.vue"]]);export{r as default};
