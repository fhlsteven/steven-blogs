import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},e=p(`<h1 id="深入理解-net内存回收机制" tabindex="-1"><a class="header-anchor" href="#深入理解-net内存回收机制" aria-hidden="true">#</a> 深入理解.NET内存回收机制</h1><p>［前言：］.Net平台提供了许多新功能，这些功能能够帮助程序员生产出更高效和稳定的代码。其中之一就是垃圾回收器（GC）。这篇文章将深入探讨这一功能，了解它是如何工作的以及如何编写代码来更好地使用这一.Net平台提供的功能。</p><h2 id="net中的内存回收机制" tabindex="-1"><a class="header-anchor" href="#net中的内存回收机制" aria-hidden="true">#</a> .Net中的内存回收机制</h2><p>垃圾回收器是用来管理应用程序的内存分配和释放的。在垃圾回收器出现以前，程序员在使用内存时需要向系统申请内存空间。有些语言，例如Visual Basic，可以自动完成向系统申请内存空间的工作。但是在诸如Visual C++的语言中要求程序员在程序代码中申请内存空间。如果程序员在使用了内存之后忘了释放内存，则会引起内存泄漏。但是有了垃圾回收器，程序员就不必关心内存中对象在离开生存期后是否被释放的问题。当一个应用程序在运行的时候，垃圾回收器设置了一个托管堆。托管堆和C语言中的堆向类似，但是程序员不需要从托管堆中释放对象，并且在托管堆中对象的存放是连续的。</p><p>每次当开发人员使用 new 运算符创建对象时，运行库都从托管堆为该对象分配内存。新创建的对象被放在上次创建的对象之后。垃圾回收器保存了一个指针，该指针总是指向托管堆中最后一个对象之后的内存空间。当新的对象被产生时，运行库就知道应该将新的对象放在内存的什么地方。同时开发人员应该将相同类型的对象放在一起。例如当开发人员希望向数据库写入数据的时侯，首先需要创建一个连接对象，然后是Command对象，最后是DataSet对象。如果这些对象放在托管堆相邻的区域内，存取它们就非常快。</p><p>当垃圾回收器的指针指向托管堆以外的内存空间时，就需要回收内存中的垃圾了。在这个过程中，垃圾回收器首先假设在托管堆中所有的对象都需要被回收。然后它在托管堆中寻找被根对象引用的对象（根对象就是全局，静态或处于活动中的局部变量以及寄存器指向的对象），找到后将它们加入一个有效对象的列表中，并在已经搜索过的对象中寻找是否有对象被新加入的有效对象引用。直到垃圾回收器检查完所有的对象后，就有一份根对象和根对象直接或间接引用了的对象的列表，而其它没有在表中的对象就被从内存中回收。</p><p>当对象被加入到托管堆中时，如果它实现了finalize（）方法，垃圾回收器会在它的终结列表（Finalization List）中加入一个指向该对象的指针。当该对象被回收时，垃圾回收器会检查终结列表，看是否需要调用对象的finalize（）方法。如果有的话，垃圾回收器将指向该对象的指针加入一个完成器队列中，该完成器队列保存了那些准备调用finalize（）方法的对象。到了这一步对象还不是真正的垃圾对象。因此垃圾回收器还没有把他们从托管堆中回收。</p><p>当对象准备被终结时，另一个垃圾回收器线程会调用在完成器队列中每个对象的finalize（）方法。当调用完成后，线程将指针从完成器队列中移出，这样垃圾回收器就知道在下一次回收对象时可以清除被终结的对象了。从上面可以看到垃圾回收机制带来的很大一部分额外工作就是调用finalize（）方法，因此在实际编程中开发人员应该避免在类中实现finalize（）方法。</p><p>对于finalize（）方法的另一个问题是开发人员不知道什么时候它将被调用。它不像C++中的析构函数在删除一个对象时被调用。为了解决这个问题，在.Net中提供了一个接口IDisposable。微软建议在实现带有fianlize（）方法的类的时侯按照下面的模式定义对象：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Class1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDisposable</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Class1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token operator">~</span><span class="token function">Class1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//垃圾回收器将调用该方法，因此参数需要为false。</span>
        <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//该方法定义在IDisposable接口中。</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//该方法由程序调用，在调用该方法之后对象将被终结。</span>
        <span class="token comment">//因为我们不希望垃圾回收器再次终结对象，因此需要从终结列表中去除该对象。</span>
        GC<span class="token punctuation">.</span><span class="token function">SuppressFinalize</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//因为是由程序调用该方法的，因此参数为true。</span>
        <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//所有与回收相关的工作都由该方法完成</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">lock</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">//避免产生线程错误。</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//需要程序员完成释放对象占用的资源。</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//对象将被垃圾回收器终结。在这里添加其它和清除对象相关的代码。</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>现在我们了解了垃圾回收器工作的基本原理，接下来让我们看一看垃圾回收器内部是如何工作的。目前有很多种类型的垃圾回收器。微软实现了一种生存期垃圾回收器（Generational Garbage Collector）。生存期垃圾回收器将内存分为很多个托管堆，每一个托管堆对应一种生存期等级。生存期垃圾回收器遵循着下面的原则：</p><p>新生成的对象，其生存期越短；而对象生成时间越长的对象，其生存期也就越长。对于垃圾回收器来说，回收一部分对象总是比回收全部对象要快，因此垃圾回收器对于那些生存期短的对象回收的频率要比生存期长的对象的回收频率高。</p><p>.Net中的垃圾回收器中目前有三个生存期等级：0，1和2。0、1、2等级对应的托管堆的初始化大小分别是256K，2M和10M。垃圾回收器在发现改变大小能够提高性能的话，会改变托管堆的大小。例如当应用程序初始化了许多小的对象,并且这些对象会被很快回收的话，垃圾回收器就会将0等级的托管堆变为128K，并且提高回收的频率。如果情况相反，垃圾回收器发现在0等级的托管堆中不能回收很多空间时，就会增加托管堆的大小。 在应用程序初始化的之前，所有等级的托管堆都是空的。当对象被初始化的时候，他们会按照初始化的先后顺序被放入等级为0的托管堆中。在托管堆中对象的存放是连续的，这样使得托管堆存取对象的速度很快，因为托管对不必对内存进行搜索。垃圾回收器中保存了一个指针指向托管堆中最后一个对象之后的内存空间。图一中显示了一个包含四个对象的0等级的托管堆。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>+---+---+---+---+-------------+
| A | B | C | D |             |
+---+---+---+---+-------------+
                ^
                |              
</code></pre></div><p>图一 包含四个对象的托管堆</p><p>当0等级托管堆被对象填满后，例如候程序初始化了新的对象，使0等级托管堆的大小超过了256K，垃圾回收器会检查托管堆中的所有对象，看是否有对象可以回收。当开始回收操作时，如前面提到的，垃圾回收器会找出根节点和根节点直接或间接引用了的对象，然后将这些对象转移到1等级托管堆中，并将0等级托管堆的指针移到最开始的位置以清除所有的对象。同时垃圾回收器会压缩1等级托管堆以保证所有对象之间没有内存空隙。当1等级托管堆满了之后，会将对象转移到2等级的托管堆。</p><p>例如在图一之后，垃圾回收器开始回收对象，假定D对象将被回收，同时程序创建了E和F对象。这时候托管堆中的对象如图二所示。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>+---+---+---+-------+     +---+---+-----+
| A | B | C |       |     | E | F |     |
+---+---+---+-------+     +---+---+-----+
                                  ^
                                  |
</code></pre></div><p>图二 回收对象后的0等级和1等级托管堆</p><p>然后程序创建了新的对象G和H，再一次触发了垃圾回收器。对象E将被回收。这时候托管堆中的对象如图三所示。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>+---+---+---+-------+  +---+---------+   +---+---+-----+
| A | B | C |       |  | F |         |   | G | H |     |
+---+---+---+-------+  +---+---------+   +---+---+-----+
                                                 ^
                                                 |
</code></pre></div><p>生存期垃圾回收器的原则也有例外的情况。当对象的大小超过84K时，对象会被放入&quot;大对象区&quot;。大对象区中的对象不会被垃圾回收器回收，也不会被压缩。这样做是为了强制垃圾回收器只能回收小对象以提高程序的性能。</p><h2 id="控制垃圾回收器" tabindex="-1"><a class="header-anchor" href="#控制垃圾回收器" aria-hidden="true">#</a> 控制垃圾回收器</h2><p>在.Net框架中提供了很多方法使开发人员能够直接控制垃圾回收器的行为。通过使用GC.Collect（）或GC.Collect（int GenerationNumber）开发人员可以强制垃圾回收器对所有等级的托管堆进行回收操作。在大多数的情况下开发人员不需要干涉垃圾回收器的行为，但是有些情况下，例如当程序进行了非常复杂的操作后希望确认内存中的垃圾对象已经被回收，就可以使用上面的方法。另一个方法是GC.WaitForPendingFinalizers（），它可以挂起当前线程，直到处理完成器队列的线程清空该队列为止。</p><p>使用垃圾回收器最好的方法就是跟踪程序中定义的对象，在程序不需要它们的时候手动释放它们。例如程序中的一个对象中有一个字符串属性，该属性会占用一定的内存空间。当该属性不再被使用时，开发人员可以在程序中将其设定为null，这样垃圾回收器就可以回收该字符串占用的空间。另外，如果开发人员确定不再使用某个对象时，需要同时确定没有其它对象引用该对象，否则垃圾回收器不会回收该对象。</p><p>另外值得一提的是finalize（）方法应该在较短的时间内完成，这是因为垃圾回收器给finalize（）方法限定了一个时间，如果finalize（）方法在规定时间内还没有完成，垃圾回收器会终止运行finalize（）方法的线程。在下面这些情况下程序会调用对象的finalize（）方法：</p><ul><li>0等级垃圾回收器已满</li><li>程序调用了执行垃圾回收的方法</li><li>公共语言运行库正在卸载一个应用程序域</li><li>公共语言运行库正在被卸载</li></ul>`,27),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","netfw6.html.vue"]]);export{k as default};
