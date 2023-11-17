import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="在c-中只运行一个实例" tabindex="-1"><a class="header-anchor" href="#在c-中只运行一个实例" aria-hidden="true">#</a> 在C#中只运行一个实例</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>warship
等级：业余侠客
财产：2570
经验：2655
魅力：796
注册：2002-12-9
登录：2003-4-7
文章：79
签定：南京师范大学 
</code></pre></div><p>终于搞定在C#中只运行一个实例！<br> 问了几次，多谢谢各位帮忙，终于搞定了这个问题。在此我总结一下，为还没搞定这个问题的朋友，少走一些弯路。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">PrevInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> procName <span class="token operator">=</span> System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process<span class="token punctuation">.</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>ProcessName<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process<span class="token punctuation">.</span><span class="token function">GetProcessesByName</span><span class="token punctuation">(</span>procName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetUpperBound</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在FormLoad事件中</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">PrevInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;已经有个实例运行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Application<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>WebPony
头衔：天煞孤星
等级：蒙面侠
财产：1510
经验：14730
魅力：1801
注册：2002-9-18
登录：2003-4-5
文章：475
签定：湖北省武汉市华中理工大学 
</code></pre></div><p>Re:终于搞定在C#中只运行一个实例！</p><p>singleton</p><p>singleton是类的唯一实例。使用MFC时，从CWinApp派生的应用类的全局实例就是singleton。当然，在MFC应用中，尽管规定不允许创建应用类的第二个实例，但是并没有什么可以阻止你那么做。【译注：实际上，不管是VC6.0还是VC7.0Beta2，它们的编译器都可以一定程度地限制你创建第二个实例。之所以说一定程度上，是因为诸如这种情况编译器并不帮你检查—试图在窗体的某个按钮事件里创建应用类的第二个实例】在这种情况下，当你需要某个特定的类表现出singleton行为时，一个更好的替代方案是让这个类自己负责确保只会被创建一个并且只有一个实例。再回到MFC，我们知道保证应用类实例的唯一性的责任被留给了开发应用的程序员，他（她）们必须小心不要创建应用类的第二个实例。</p><p>现在来看看所示的类。singleton的访问被局限于必须通过静态方法Instance。多数情况下，singleton应该具有全局可见性，这可通过将其创建方法public来实现。和用全局变量模拟singleton不同，这种模式可以防止创建出多余的实例，同时兼具全局可见性。注意，该类的构造器被置为private，这就意味着没有任何办法可以绕过静态方法Instance来直接创建类的实例。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Singleton</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> singleton <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Singleton</span> <span class="token function">Instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> singleton<span class="token punctuation">)</span>
            singleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> singleton<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token function">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>singleton模式的作用还不止于此，尤其是可以将其扩展，以创建类的可变数量的实例。假定有一个应用，当需要执行特定任务时就需要调度一个工作者线程。考虑到节约系统资源，我们使用singleton来实现这个线程类。不久，需要singleton线程处理的任务变得密集起来，如果我们决定扩展这个应用，我们可以很方便地增加工作者线程的数量，因为线程的创建和对它们的访问授权的所有逻辑都被定义在一个类中。</p><p>singleton模式的另外一个优点是singleton的创建可以被延迟到真正需要的时候，正如表1所示。不管是否需要，全局变量一开始就被创建，但这个全局对象并不一定是一直都需要的。C#不支持全局变量，但还是有可能在某个方法的一开始就在堆上创建了一个对象并直到很久以后才使用它。果真如此的话，singleton模式为这种案例提供了一个优雅的解决方案。</p><hr><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>yangguang
头衔：牛且狠
等级：业余侠客
财产：3545
经验：2157
魅力：736
注册：2002-10-30
登录：2003-4-12
文章：153
签定：黑龙江省哈尔滨市 
</code></pre></div><p>2002-12-27 20:38:45</p><p>Re:终于搞定在C#中只运行一个实例！</p><p>未处理的“System.InvalidOperationException”类型的异常出现在 system.dll 中</p><p>其他信息：进程性能计数器已禁用，因此无法执行所请求的操作。</p><p>演示示例调不通呀，出现上述错误信息</p><hr><hr><p>warship 2002-12-27 22:43:26</p><blockquote><p>我用的是WINXP，VC#.net正式版，别的系统没试！</p></blockquote>`,28),e=[o];function c(l,u){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","appctr12.html.vue"]]);export{k as default};
