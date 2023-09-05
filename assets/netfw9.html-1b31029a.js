import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="net框架下的自动内存管理" tabindex="-1"><a class="header-anchor" href="#net框架下的自动内存管理" aria-hidden="true">#</a> .net框架下的自动内存管理</h1><blockquote><p>作者： 飞刀 Tuesday, September 17 2002 4:11 PM</p></blockquote><p>C#使用的自动内存管理，使用开发者从繁重的手工分配、释放内存的操作解放出来。内存的自动管理是由垃圾回收器来执行。一个对象使用内存的生命周期是这样的：</p><ul><li>当对象被创建时，它便分配了一定的内存，当构造器中的代码开始运行时，这个对象就“活”了。</li><li>当这个对象或者是它的任何一部分在可以预计的将来已经没有任何作用时，这个对象将不会再使用，它就应当被销毁。</li><li>一旦这个对象符合了对销毁的条件，在一定的时间后，这个对象的销毁器就将被执行，一般情况下，除非被显示地重写，这个销毁器只能运行一次。</li><li>一旦销毁器被运行，那么这个对象以及它任何一部分都不可能在以后的运行中使用，这甚至包括正在运行的销毁器。这时这个对象将被认为是不可见的，它所占的资源将会被回收。</li><li>最后由垃圾回收器释放这个对象所占的资源。</li></ul><p>垃圾回收器控制着这些对象的使用信息并利用这些信息控制内存，比如内存哪里创建了一个新对象，什么时候重新创建对象以及什么时候将这个对象释放。</p><p>像其它的语言一样，C＃假定确实存在这样一个垃圾回收器，而且这个垃圾回收器可以管理很大范围的内存。比如，C#并不要求销毁器一事实上要执行，也不要求对象一旦无用则马上回收。</p><p>当然垃圾回收器的行为也是可以被控制的，这个控制的方法来自于System.GC类。这个类可以请求回收、销毁器运行等操作。</p><p>下面是一个例子。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token operator">~</span><span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Destruct instance of A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span>
<span class="token punctuation">{</span>
    <span class="token keyword">object</span> <span class="token keyword">ref</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">B</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">ref</span> <span class="token operator">=</span> o<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Destruct instance of B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TMest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        GC<span class="token punctuation">.</span><span class="token function">Collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        GC<span class="token punctuation">.</span><span class="token function">WaitForPendingFinalizers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面的程序创建了类A与类B的一个实例，当变量b被赋于null值时，A与B均符合了垃圾回收器的回收要求。此时就没有任何代码能够访问它们了。</p><p>执行的结果，下面两种情况都有可能:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Destruct instance of A
Destruct instance of B
</code></pre></div><p>与</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Destruct instance of B
Destruct instance of A
</code></pre></div><p>因为上面的程序的并没有限制这两个对象被回收的顺序。</p><p>在某些敏感的条件下，有关区分“销毁”与“回收”操作条件的定义是非常重要的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token operator">~</span><span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Destruct instance of A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;A.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        TMest<span class="token punctuation">.</span>RefA <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">A</span> Ref<span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Destruct instance of B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Ref<span class="token punctuation">.</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">TMest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">A</span> RefA<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">B</span> RefB<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        RefB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        RefA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        RefB<span class="token punctuation">.</span>Ref <span class="token operator">=</span> RefA<span class="token punctuation">;</span>
        RefB <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        RefA <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// A and B now eligible for destruction</span>
        GC<span class="token punctuation">.</span><span class="token function">Collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        GC<span class="token punctuation">.</span><span class="token function">WaitForPendingFinalizers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// B now eligible for collection, but A is not</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>RefA <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;RefA is not null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在上面的程序中，如果垃圾回收器选择先执行类B的销毁器，那么执行的结果为：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Destruct instance of A
Destruct instance of B
A.F
RefA is not null
</code></pre></div><p>注意，虽然实例A并没有被使用，但是从输出的结果大家可以看到A的销毁器确实执行了，而且连A的方法F也被执行了。同时我们也注意至，一个对象销毁器的运行又可能使一个实例变得可用。在这种情况下，实例B销毁器的执行使得先前并没有调用的实例A也可以被访问了，而这一种就是引用RefA的功劳，当调用WaitForPendingFinalizers方法以后，实例B就可以被垃圾回收器回收，而此时的实例A则还不可以。</p><p>为了区分这些行为，大家编写程序时，最好只管理当前类的销毁器，而不要采用引用其它类的实例或者静态字段。</p><p>责任编辑：炒饭</p>`,22),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netfw9.html.vue"]]);export{i as default};
