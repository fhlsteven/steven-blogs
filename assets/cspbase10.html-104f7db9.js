import{_ as n,o as s,c as a,a as e}from"./app-57d1f7b1.js";const t={},p=e(`<h1 id="c-中的delegate和event" tabindex="-1"><a class="header-anchor" href="#c-中的delegate和event" aria-hidden="true">#</a> C#中的delegate和event</h1><p>你是第112位浏览该文章的人 sam1111 csdn 2003-5-10</p><p>在基于Windows平台的程序设计中，事件（event）是一个很重要的概念。因为在几乎所有的Windows应用程序中，都会涉及大量的异步调用，比如响应点击按钮、处理Windows系统消息等，这些异步调用都需要通过事件的方式来完成。即使在下一代开发平台——.NET中也不例外。</p><p>那么什么是事件呢？所谓事件，就是由某个对象发出的消息，这个消息标志着某个特定的行为发生了，或者某个特定的条件成立了。比如用户点击了鼠标、socket上有数据到达等。那个触发（raise）事件的对象称为事件的发送者（event sender），捕获并响应事件的对象称为事件的接收者（event receiver）。</p><p>在这里，我们将要讨论的是，在.NET的主流开发语言C#中如何使用自定义的事件来实现我们自己的异步调用。</p><p>在C#中，事件的实现依赖于<code>delegate</code>，因此我们有必要先了解一下<code>delegate</code>的概念。</p><h2 id="delegate" tabindex="-1"><a class="header-anchor" href="#delegate" aria-hidden="true">#</a> Delegate</h2><p><code>delegate</code>是C#中的一种类型，它实际上是一个能够持有对某个方法的引用的类。与其它的类不同，<code>delegate</code>类能够拥有一个签名（signature），并且它只能持有与它的签名相匹配的方法的引用。它所实现的功能与C/C++中的函数指针十分相似。它允许你传递一个类A的方法m给另一个类B的对象，使得类B的对象能够调用这个方法m。但与函数指针相比，<code>delegate</code>有许多函数指针不具备的优点。首先，函数指针只能指向静态函数，而<code>delegate</code>既可以引用静态函数，又可以引用非静态成员函数。在引用非静态成员函数时，<code>delegate</code>不但保存了对此函数入口指针的引用，而且还保存了调用此函数的类实例的引用。其次，与函数指针相比，<code>delegate</code>是面向对象、类型安全、可靠的受控（managed）对象。也就是说，runtime能够保证<code>delegate</code>指向一个有效的方法，你无须担心<code>delegate</code>会指向无效地址或者越界地址。</p><p>实现一个delegate是很简单的，通过以下3个步骤即可实现一个delegate：</p><ol><li>声明一个delegate对象，它应当与你想要传递的方法具有相同的参数和返回值类型。</li><li>创建delegate对象，并将你想要传递的函数作为参数传入。</li><li>在要实现异步调用的地方，通过上一步创建的对象来调用方法。</li></ol><p>下面是一个简单的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyDelegateTest</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 步骤1，声明delegate对象</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyDelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这是我们欲传递的方法，它与MyDelegate具有相同的参数和返回值类型</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyDelegateFunc</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, {0}&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 步骤2，创建delegate对象</span>
        <span class="token class-name">MyDelegate</span> md <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDelegate</span><span class="token punctuation">(</span>MyDelegateTest<span class="token punctuation">.</span>MyDelegateFunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 步骤3，调用delegate</span>
        <span class="token function">md</span><span class="token punctuation">(</span><span class="token string">&quot;sam1111&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果是：<code>Hello, sam1111</code></p><p>了解了delegate，下面我们来看看，在C#中对事件是如何处理的。</p><h2 id="在c-中处理事件" tabindex="-1"><a class="header-anchor" href="#在c-中处理事件" aria-hidden="true">#</a> 在C#中处理事件</h2><p>C#中的事件处理实际上是一种具有特殊签名的delegate，象下面这个样子：</p><p><code>public delegate void MyEventHandler(object sender, MyEventArgs e);</code></p><p>其中的两个参数，<code>sender</code>代表事件发送者，<code>e</code>是事件参数类。<code>MyEventArgs</code>类用来包含与事件相关的数据，所有的事件参数类都必须从<code>System.EventArgs</code>类派生。当然，如果你的事件不含参数，那么可以直接用<code>System.EventArgs</code>类作为参数。</p><p>就是这么简单，结合delegate的实现，我们可以将自定义事件的实现归结为以下几步：</p><ol><li>定义<code>delegate</code>对象类型，它有两个参数，第一个参数是事件发送者对象，第二个参数是事件参数类对象。</li><li>定义事件参数类，此类应当从<code>System.EventArgs</code>类派生。如果事件不带参数，这一步可以省略。</li><li>定义事件处理方法，它应当与<code>delegate</code>对象具有相同的参数和返回值类型。</li><li>用event关键字定义事件对象，它同时也是一个<code>delegate</code>对象。</li><li>用<code>+=</code>操作符添加事件到事件队列中（<code>-=</code>操作符能够将事件从队列中删除）。</li><li>在需要触发事件的地方用调用<code>delegate</code>的方式写事件触发方法。一般来说，此方法应为protected访问限制，既不能以public方式调用，但可以被子类继承。名字是OnEventName。</li><li>在适当的地方调用事件触发方法触发事件。</li></ol><p>下面是一个简单的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EventTest</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 步骤1，定义delegate对象</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 步骤2省略</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyEventCls</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 步骤3，定义事件处理方法，它与delegate对象具有相同的参数和返回值类型</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyEventFunc</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;My event is ok!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 步骤4，用event关键字定义事件对象</span>
    <span class="token keyword">private</span> <span class="token keyword">event</span> <span class="token class-name">MyEventHandler</span> myevent<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">MyEventCls</span> myecls<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">EventTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myecls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventCls</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 步骤5，用+=操作符将事件添加到队列中</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>myevent <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventHandler</span><span class="token punctuation">(</span>myecls<span class="token punctuation">.</span>MyEventFunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 步骤6，以调用delegate的方式写事件触发函数</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMyEvent</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>myevent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token function">myevent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">EventArgs</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 步骤7，触发事件</span>
        <span class="token function">OnMyEvent</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">EventTest</span> et <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Please input &#39;a&#39;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            et<span class="token punctuation">.</span><span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果如下，黑体为用户的输入：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>Please input <span class="token string">&#39;a&#39;</span><span class="token builtin class-name">:</span> a
My event is ok<span class="token operator">!</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>通过上面的讨论，我们大体上明白了<code>delegate</code>和<code>event</code>的概念，以及如何在C#中使用它们。我个人认为，<code>delegate</code>在C#中是一个相当重要的概念，合理运用的话，可以使一些相当复杂的问题变得很简单。有时我甚至觉得，<code>delegate</code>甚至能够有指针的效果，除了不能直接访问物理地址。而且事件也是完全基于<code>delegate</code>来实现的。由于能力有限，本文只是对<code>delegate</code>和<code>event</code>的应用作了一个浅显的讨论，并不深入，我希望本文能够起到抛砖引玉的作用。真正想要对这两个概念有更深入的了解的话，还是推荐大家看MSDN。</p>`,26),o=[p];function c(l,u){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","cspbase10.html.vue"]]);export{i as default};
