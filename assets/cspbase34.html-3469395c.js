import{_ as n,r as c,o,c as t,b as s,d as a,e as p,a as l}from"./app-8e5157a8.js";const r={},d={id:"切勿锁定类型对象",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#切勿锁定类型对象","aria-hidden":"true"},"#",-1),k={href:"https://blog.csdn.net/billy_zh/article/details/45100",target:"_blank",rel:"noopener noreferrer"},u=l(`<p>billy_zh 于 2004-07-19 16:51:00 发布</p><h2 id="为什么使用-lock-typeof-classname-或-synclock-gettype-classname-是错误的" tabindex="-1"><a class="header-anchor" href="#为什么使用-lock-typeof-classname-或-synclock-gettype-classname-是错误的" aria-hidden="true">#</a> 为什么使用 <code>Lock(typeof(ClassName))</code> 或 <code>SyncLock GetType(ClassName)</code> 是错误的</h2><p>最近，Microsoft .NET 运行库的性能设计师及资深 Microsoft 开发人员 Rico Mariani 在一封电子邮件中与 GUI 博士进行了交流，其中提到的一种相当普遍的做法（遗憾的是，这种做法在我们的一些文档中也曾提到过，虽然我们将进行修改）实际上却存在着很大的问题。他询问 GUI 博士能否帮忙发布消息，告诉程序员不应该采用这种做法。博士当然很乐意帮忙。</p><p>这种非常普遍的做法是什么呢？其实就是对类型对象加锁。在 C# 中，加锁的做法是 <code>lock(typeof(ClassName))\`\`，其中，ClassName</code> 是某个类的名称；在 Microsoft Visual Basic .NET 中，加锁的做法是 <code>SyncLock GetType(ClassName)</code>。</p><p>背景知识：在多线程编程中，<code>lock/SyncLock</code>语句用于创建代码中一次只执行一个线程的关键部分或简要部分。（如果您需要同时更新对象中的多个字段，则可能需要该语句 — 您希望确保其他线程不会同时尝试更新该对象！）此语句将锁定与您指定的对象相关联的唯一监视对象，如果其他线程已经锁定了该监视对象，则等待。一旦它锁定了监视对象，任何其他线程都无法锁定该监视对象，除非您的线程解除锁定，解除锁定会在封闭块的结尾自动发生。一种常见的用法是锁定 <code>this/Me</code> 引用，这样，只有您的线程可以修改您在使用的对象 — 不过，更好的做法是锁定您即将修改的特定对象。锁定尽可能小的对象的好处是可以避免不必要的等待。</p><p><code>GetType</code> 和 <code>typeof</code> 返回对该类型的类型对象的引用。<code>System.Type</code> 类型的类型对象包含使您能够反映类型的方法，这意味着您可以找到它的字段和方法，甚至可以访问字段和调用方法。一旦您拥有对类型对象的引用，就可以创建该对象的一个实例（并且，如果您使用 <code>Type.GetType</code> <code>shared/static</code> 方法，就可以按名称获得对类型对象的引用）。</p><p>因此，类型对象非常方便。但是，有些程序员喜欢“滥用”这种方式，借此来代替可以对其进行加锁的 <code>static/Shared</code> 对象。（遗憾的是，我们在 C# 文档和 Visual Basic .NET 文档中都提到了这种方法，暗示这是一种建议采用的做法。）在这种情况下，这些文档中的建议是错误的（我们会进行纠正）。这种做法是不 可接受的，更不用说建议采用了。</p><p>原因是这样的：由于一个类的所有实例都只有一个类型对象，因此从表面看，锁定类型对象相当于锁定类中包含的静态对象。只要您锁定类的所有实例，等到其他线程访问完任一实例的任何部分，然后锁定访问，这样您就可以安全地访问静态成员，而不会受到其他线程的干扰。</p><p>这种做法的确有效，至少在大多数情况下是这样的。但它也有一些问题：首先，获得类型对象实际上是一个很缓慢的过程（尽管大多数程序员会认为这个过程非常快）；其次，任何类中的其他线程、甚至在同一个应用程序域中运行的其他程序都可以访问该类型对象，因此，它们就有可能代替您锁定类型对象，完全阻止您的执行，从而导致您挂起。</p><p>这里的基本问题是，您并未拥有该类型对象，并且您不知道还有谁可以访问它。总的来说，依靠锁定不是由您创建、并且您不知道还有谁可以访问的对象是一种很不好的做法。这样做很容易导致死锁。最安全的方式就是只锁定私有对象。</p><p>但除此之外，还有更严重的问题。由于在当前版本的 .NET 运行库中，类型对象有时会在应用程序域之间（但不是在进程之间）共享。（通常这没有问题，因为它们是不变的。）这意味着，运行在其他应用程序域（但在同一进程）中的另一个应用程序有可能对您要锁定的类型对象进行加锁，并且始终不释放该类型对象，从而使您的应用程序发生死锁。并且，这样可以很容易地获得类型对象的访问权限，因为该对象具有名称 — 该类型的完全限定名！请记住，lock/SyncLock 会一直阻塞（这是挂起的含蓄说法），直到它可以获得锁定为止。很显然，依靠锁定其他程序或组件可以锁定的对象不是一种很好的做法，并且会导致死锁。</p><p>即使该类型对象在您的应用程序域中是唯一的，这仍然是一种不好的做法，因为任何代码都可以访问公共类型的类型对象，从而导致死锁的发生。如果您在应用程序中使用的组件不是您编写的，这种做法尤其成问题。（即使是 lock(this)/SyncLock Me 也可能有这个问题，因为其他人可能会锁定您。即使发生了这种事情，问题的根源也可能会比锁定类型对象而导致的死锁更容易发现，因为您的对象并不是跨应用程序域的全局可用对象。）</p><p>那么，应该采用什么方法呢？非常简单：只要声明并创建一个对象作为锁，然后使用它而不是 类型对象来进行锁定。通常，为了复制问题代码的语义，您会希望此对象是 <code>static/Shared</code> — 当然，它其实应该是私有的！总之，您可以将以下问题代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">lock</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">Foo</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不好的代码!</span>
    <span class="token operator">??</span> <span class="token comment">// statements;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>更改为以下正确代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">lock</span><span class="token punctuation">(</span>somePrivateStaticObject<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 好的代码!</span>
    <span class="token operator">??</span> <span class="token comment">// statements;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当然，您必须已经拥有一个要锁定的私有静态对象（如果您使用锁定来修改静态对象，实际上您可能已经有了一个！）或者必须创建一个。（使它成为私有对象可以避免其他类锁定您的对象。）请不要尝试锁定不是引用（对象）类型的字段，例如 <code>int/Integer</code>。那样会出现编译器错误。如果您没有要锁定的私有静态对象，可能需要创建一个哑对象：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name">Class</span> MyClass <span class="token punctuation">{</span>
    <span class="token operator">??</span> <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> somePrivateStaticObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">??</span> <span class="token comment">// methods of class go here--can lock somePrivateStaticObject</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您需要单独分析每种情况，以确保不会出现问题，但通常上述技巧会奏效。</p><p>有两点需要注意：首先，类以外的任何代码都无法锁定 <code>MyClass.somePrivateStaticObject</code>，因此避免了许多死锁的可能。由于死锁属于那种最难找到根源的问题，因此，避免发生死锁的可能是一件很好的事情。</p><p>其次，您知道，您的应用程序中只有一份 <code>MyClass.somePrivateStaticObject</code> 的副本，并且系统上运行的其他每个应用程序也只有一个副本。因此，在同一个应用程序域中的应用程序之间没有相互影响。GUI 博士希望您能明白为什么修改后的代码比原来的问题代码更加可靠和强大。</p><p>总之，不要锁定类型对象，因为您并不知道哪里又出现问题了。锁定类型对象的过程很慢，并且可能发生死锁情况。这是一种很不好的编程习惯。相反，您应该在对象中锁定静态对象。</p><p>-- 此文摘自MSDN 《GUI 博士的忠告：切勿锁定类型对象！》</p>`,23);function m(h,y){const e=c("ExternalLinkIcon");return o(),t("div",null,[s("h1",d,[i,a(),s("a",k,[a("切勿锁定类型对象!"),p(e)])]),u])}const f=n(r,[["render",m],["__file","cspbase34.html.vue"]]);export{f as default};
