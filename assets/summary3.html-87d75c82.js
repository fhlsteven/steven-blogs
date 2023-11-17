import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},e=p(`<h1 id="c-编程人员容易犯的10个c-错误" tabindex="-1"><a class="header-anchor" href="#c-编程人员容易犯的10个c-错误" aria-hidden="true">#</a> C++编程人员容易犯的10个C#错误</h1><blockquote><p>作者：刘彦青 编译 本文选自：赛迪网 2002年02月28日</p></blockquote><p>我们知道， C#的语法与C++非常相似，实现从C++向C#的转变，其困难不在于语言本身，而在于熟悉.NET的可管理环境和对.NET框架的理解。</p><p>尽管C#与C++在语法上的变化是很小的，几乎不会对我们有什么影响，但有些变化却足以使一些粗心的C++编程人员时刻铭记在心。在本篇文章中我们将讨论C++编程人员最容易犯的十个错误。</p><h2 id="陷阱1-没有明确的结束方法" tabindex="-1"><a class="header-anchor" href="#陷阱1-没有明确的结束方法" aria-hidden="true">#</a> 陷阱1： 没有明确的结束方法</h2><p>几乎可以完全肯定地说，对于大多数C++编程人员而言，C#与C++最大的不同之处就在于碎片收集。这也意味着编程人员再也无需担心内存泄露和确保删除所有没有用的指针。但我们再也无法精确地控制杀死无用的对象这个过程。事实上，在C#中没有明确的destructor。</p><p>如果使用非可管理性资源，在不使用这些资源后，必须明确地释放它。对资源的隐性控制是由Finalize方法（也被称为finalizer）提供的，当对象被销毁时，它就会被碎片收集程序调用收回对象所占用的资源。</p><p>finalizer应该只释放被销毁对象占用的非可管理性资源，而不应牵涉到其他对象。如果在程序中只使用了可管理性资源，那就无需也不应当执行Finalize方法，只有在非可管理性资源的处理中才会用到Finalize方法。由于finalizer需要占用一定的资源，因此应当只在需要它的方法中执行finalizer。</p><p>直接调用一个对象的Finalize方法是绝对不允许的（除非是在子类的Finalize中调用基础类的Finalize。），碎片收集程序会自动地调用Finalize。</p><p>从语法上看，C#中的destructor与C++非常相似，但其实它们是完全不同的。C#中的destructor只是定义Finalize方法的捷径。因此，下面的二段代码是有区别的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token operator">~</span><span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// 需要完成的任务</span>
<span class="token punctuation">}</span>

MyClass<span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// 需要完成的任务</span>
<span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="错误2-finalize和dispose使用谁" tabindex="-1"><a class="header-anchor" href="#错误2-finalize和dispose使用谁" aria-hidden="true">#</a> 错误2：Finalize和Dispose使用谁？</h2><p>从上面的论述中我们已经很清楚，显性地调用finalizer是不允许的，它只能被碎片收集程序调用。如果希望尽快地释放一些不再使用的数量有限的非可管理性资源（如文件句柄），则应该使用IDisposable界面，这一界面有个Dispose方法，它能够帮你完成这个任务。Dispose是无需等待Finalize被调用而能够释放非可管理性资源的方法。</p><p>如果已经使用了Dispose方法，则应当阻止碎片收集程序再对相应的对象执行Finalize方法。为此，需要调用静态方法GC.SuppressFinalize，并将相应对象的指针传递给它作为参数，Finalize方法就能调用Dispose方法了。据此，我们能够得到如下的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// 完成清理操作</span>

<span class="token comment">// 通知GC不要再调用Finalize方法</span>
GC<span class="token punctuation">.</span><span class="token function">SuppressFinalize</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于有些对象，可能调用Close方法就更合适（例如，对于文件对象调用Close就比Dispose更合适），可以通过创建一个private属性的Dispose方法和public属性的Close方法，并让Close调用Dispose来实现对某些对象调用Close方法。</p><p>由于不能确定一定会调用Dispose，而且finalizer的执行也是不确定的（我们无法控制GC会在何时运行），C#提供了一个Using语句来保证Dispose方法会在尽可能早的时间被调用。一般的方法是定义使用哪个对象，然后用括号为这些对象指定一个活动的范围，当遇到最内层的括号时，Dispose方法就会被自动调用，对该对象进行处理。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">Font</span> theFont <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Font</span><span class="token punctuation">(</span><span class="token string">&quot;Arial&quot;</span><span class="token punctuation">,</span> <span class="token number">10.0f</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//使用theFont对象</span>
        <span class="token punctuation">}</span> <span class="token comment">// 编译器将调用Dispose处理theFont对象</span>

        <span class="token class-name">Font</span> anotherFont <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Font</span><span class="token punctuation">(</span><span class="token string">&quot;Courier&quot;</span><span class="token punctuation">,</span><span class="token number">12.0f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">using</span> <span class="token punctuation">(</span>anotherFont<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 使用anotherFont对象</span>
        <span class="token punctuation">}</span> <span class="token comment">// 编译器将调用Dispose处理anotherFont对象</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在本例的第一部分中，Font对象是在Using语句中创建的。当Using语句结束时，系统就会调用Dispose，对Font对象进行处理。在本例的第二部分，Font对象是在Using语句外部创建的，在决定使用它时，再将它放在Using语句内，当Using语句结束时，系统就会调用Dispose。</p><p>Using语句还能防止其他意外的发生，保证系统一定会调用Dispose。</p><h2 id="错误3-c-中的值型变量和引用型变量是有区别的" tabindex="-1"><a class="header-anchor" href="#错误3-c-中的值型变量和引用型变量是有区别的" aria-hidden="true">#</a> 错误3：C#中的值型变量和引用型变量是有区别的</h2><p>与C++一样，C#也是一种强类型编程语言。C#中的数据类型被分为了二大类：C#语言本身所固有的数据类型和用户自定义数据类型，这一点也与C++相似。</p><p>此外，C#语言还把变量分为值类型和引用类型。除非是被包含在一个引用类型中，值类型变量的值保留在栈中，这一点与C++中的变量非常相似。引用类型的变量也是栈的一种，它的值是堆中对象的地址，与C++中的指针非常地相似。值类型变量的值被直接传递给方法，引用型变量在被作为参数传递给方法时，传递的是索引。</p><p>类和界面可以创建引用类变量，但需要指出的是，结构数据类型是C#的一种内置数据类型，同时也是一种值型的数据类型。</p><h2 id="错误4-注意隐性的数据类型转换" tabindex="-1"><a class="header-anchor" href="#错误4-注意隐性的数据类型转换" aria-hidden="true">#</a> 错误4：注意隐性的数据类型转换</h2><p>Boxing和unboxing是使值型数据类型被当作索引型数据类型使用的二个过程。值型变量可以被包装进一个对象中，然后再被解包回值型变量。包括内置数据类型在内的所有C#中的数据类型都可以被隐性地转化为一个对象。包装一个值型变量就会生成一个对象的实例，然后将变量拷贝到实例中。</p><p>Boxing是隐性的，如果在需要索引型数据类型的地方使用了值型数据类型的变量，值型变量就会隐性地转化为索引型数据类型的变量。Boxing会影响代码执行的性能，因此应当尽量避免，尤其是在数据量较大的时候。</p><p>如果要将一个打包的对象转换回原来的值型变量，必须显性地对它进行解包。解包需要二个步骤：首先对对象实例进行检查，确保它们是由值型的变量被包装成的；第二步将实例中的值拷贝到值型变量中。为了确保解包成功，被解包的对象必须是通过打包一个值型变量的值生成的对象的索引。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UnboxingTest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>

        <span class="token comment">//打包</span>
        <span class="token class-name"><span class="token keyword">object</span></span> o <span class="token operator">=</span> i<span class="token punctuation">;</span>

        <span class="token comment">// 解包（必须是显性的）</span>
        <span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;j: {0}&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果被解包的对象是无效的，或是一个不同数据类型对象的索引，就会产生InvalidCastException异外。</p><h2 id="错误5-结构与对象是有区别的" tabindex="-1"><a class="header-anchor" href="#错误5-结构与对象是有区别的" aria-hidden="true">#</a> 错误5：结构与对象是有区别的</h2><p>C++中的结构与类差不多，唯一的区别是，在缺省状态下，结构的访问权限是public，其继承权限也是public。一些C++编程人员将结构作为数据对象，但这只是一个约定而非是必须这样的。</p><p>在C#中，结构只是一个用户自定义的数据类型，并不能取代类。尽管结构也支持属性、方法、域和操作符，但不支持继承和destructor。</p><p>更重要的是，类是一种索引型数据类型，结构是值型数据类型。因此，结构在表达无需索引操作的对象方面更有用。结构在数组操作方面的效率更高，而在集合的操作方面则效率较低。集合需要索引，结构必须打包才适合在集合的操作中使用，类在较大规模的集合操作中的效率更高。</p><h2 id="错误6-虚方法必须被明确地覆盖" tabindex="-1"><a class="header-anchor" href="#错误6-虚方法必须被明确地覆盖" aria-hidden="true">#</a> 错误6：虚方法必须被明确地覆盖</h2><p>在C#语言中，编程人员在覆盖一个虚方法时必须显性地使用override关健字。假设一个Window类是由A公司编写的，ListBox和RadioButton类是由B公司的和编程人员在购买的A公司编写的Window类的基础上编写的，B公司的编程人员对包括Window类未来的变化情况在内的设计知之甚少。</p><p>如果B公司的一位编程人员要在ListBox上添加一个Sort方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ListBox</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Window</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在A公司发布新版的Window类之前，这不会有任何问题。如果A公司的编程人员也在Window类中添加了一个Sort方法。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Window</span>
<span class="token punctuation">{</span>
    <span class="token comment">// &quot;</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在C++中，Windows类中的Sort方法将成为ListBox类中Sort方法的基础方法，在希望调用Windows类中的Sort方法时，ListBox类中的Sort方法就会被调用。在C#中，虚拟函数总是被认为是虚拟调度的根。也就是说，一旦C#发现一个虚拟的方法，就不会再在虚拟链中查找其他虚拟方法。如果ListBox再次被编译，编译器就会生成一个警告信息：</p><p><code>&quot;\\class1.cs(54,24): warning CS0114: &#39;ListBox.Sort()&#39; hides inherited member &#39;Window.Sort()&#39;.</code></p><p>要使当前的成员覆盖原来的方法，就需要添加override关健字，或者添加new关健字。</p><p>要消除警告信息，编程人员必须搞清楚他想干什么。可以在ListBox类中的Sort方法前添加new，表明它不应该覆盖Window中的虚方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ListBox</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Window</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">new</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 
</code></pre></div><p>这样就可以清除警告信息。如果编程人员确实希望覆盖掉Window中的方法，就必须使用override关健字来显性地表明其意图。</p><h2 id="错误7-类成员变量的初始化" tabindex="-1"><a class="header-anchor" href="#错误7-类成员变量的初始化" aria-hidden="true">#</a> 错误7：类成员变量的初始化</h2><p>C#中的初始化与C++中不同。假设有一个带有private性质的成员变量age的Person类，Employee是由继承Person类而生成的，它有一个private性质的salaryLevel成员变量。在C++中，我们可以在Employee的构造器的初始化部分初始化salaryLevel，如下面的代码所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>Employee<span class="token punctuation">::</span><span class="token function">Employee</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> theAge<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> theSalaryLevel<span class="token punctuation">)</span><span class="token punctuation">:</span>
<span class="token function">Person</span><span class="token punctuation">(</span>theAge<span class="token punctuation">)</span> <span class="token comment">// 初始化基础类</span>
<span class="token function">salaryLevel</span><span class="token punctuation">(</span>theSalaryLevel<span class="token punctuation">)</span> <span class="token comment">// 初始化成员变量</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 构造器的代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这种方法在C#中是非法的。尽管仍然可以初始化基础类，但象上面的代码那样对成员变量初始化就会引起编译错误。在C#中，我们可以在定义成员变量时的同时对它进行初始化：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Class</span> Employee <span class="token punctuation">:</span> <span class="token keyword">public</span> Person
<span class="token punctuation">{</span>
    <span class="token comment">// 成员变量的定义</span>
    <span class="token keyword">private</span> salaryLevel <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 初始化</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意：必须明确地定义每个变量的访问权限。</p><h2 id="错误8-布尔型变量与整型变量是两回事儿" tabindex="-1"><a class="header-anchor" href="#错误8-布尔型变量与整型变量是两回事儿" aria-hidden="true">#</a> 错误8：布尔型变量与整型变量是两回事儿</h2><p><code>if( someFuncWhichReturnsAValue() )</code></p><p>在C#中，布尔型变量与整型变量并不相同，因此下面的代码是不正确的：</p><p><code>if( someFuncWhichReturnsAValue() )</code></p><p><code>if someFuncWhichReturnsAValue</code>返回零表示<code>false</code>，否则表示true的想法已经行不通了。这样的好处是原来存在的将赋值运算与相等相混淆的错误就不会再犯了。因此下面的代码：</p><p><code>if ( x = 5 )</code></p><p>在编译时就会出错，因为x=5只是把5赋给了X，而不是一个布尔值。</p><h2 id="错误9-switch语句中会有些语句执行不到" tabindex="-1"><a class="header-anchor" href="#错误9-switch语句中会有些语句执行不到" aria-hidden="true">#</a> 错误9：switch语句中会有些语句执行不到</h2><p>在C#中，如果一个switch语句执行了一些操作，则程序就可能不能执行到下一个语句。因此，尽管下面的代码在C++中是合法的，但在C#中却不合法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token function">CallFuncOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span> <span class="token comment">// 错误，不会执行到这里</span>
        <span class="token function">CallSomeFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>要实现上面代码的目的，需要使用一个goto语句：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token function">CallFuncOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">goto</span> <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span>
        <span class="token function">CallSomeFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果case语句不执行任何代码，则所有的语句都会被执行。如下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span> <span class="token comment">// 能执行到</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token punctuation">:</span> <span class="token comment">// 能执行到</span>
    <span class="token keyword">case</span> <span class="token number">6</span><span class="token punctuation">:</span>
        <span class="token function">CallSomeFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="错误10-c-中的变量要求明确地赋值" tabindex="-1"><a class="header-anchor" href="#错误10-c-中的变量要求明确地赋值" aria-hidden="true">#</a> 错误10：C#中的变量要求明确地赋值</h2><p>在C#中，所有的变量在使用前都必须被赋值。因此，可以在定义变量时不对它进行初始化，如果在把它传递给一个方法前，必须被赋值。</p><p>如果只是通过索引向方法传递一个变量，并且该变量是方法的输出变量，这是就会带来问题。例如，假设有一个方法，它返回当前时间的小时、分、秒，如果象下面这样编写代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> theHour<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> theMinute<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> theSecond<span class="token punctuation">;</span>
timeObject<span class="token punctuation">.</span><span class="token function">GetTime</span><span class="token punctuation">(</span> <span class="token keyword">ref</span> theHour<span class="token punctuation">,</span> <span class="token keyword">ref</span> theMinute<span class="token punctuation">,</span> <span class="token keyword">ref</span> theSecond<span class="token punctuation">)</span>
</code></pre></div><p>如果在使用theHour、theMinute和theSecond这三个变量之前没有对它们进行初始化，就会产生一个编译错误：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Use of unassigned local variable &#39;theHour&#39;
Use of unassigned local variable &#39;theMinute&#39;
Use of unassigned local variable &#39;theSecond&#39;
</code></pre></div><p>我们可以通过将这些变量初始化为0或其他对方法的返回值没有影响的值，以解决编译器的这个小问题：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> theHour <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> theMinute <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> theSecond <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
timeObject<span class="token punctuation">.</span><span class="token function">GetTime</span><span class="token punctuation">(</span> <span class="token keyword">ref</span> theHour<span class="token punctuation">,</span> <span class="token keyword">ref</span> theMinute<span class="token punctuation">,</span> <span class="token keyword">ref</span> theSecond<span class="token punctuation">)</span>
</code></pre></div><p>这样就有些太麻烦了，这些变量传递给GetTime方法，然后被改变而已。为了解决这一问题，C#专门针对这一情况提供了out参数修饰符，它可以使一个参数无需初始化就可以被引用。例如，GetTime中的参数对它本身没有一点意义，它们只是为了表达该方法的输出。在方法中返回之前，Out参数中必须被指定一个值。下面是经过修改后的GetTime方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetTime</span><span class="token punctuation">(</span><span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> h<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> m<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> s<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    h <span class="token operator">=</span> Hour<span class="token punctuation">;</span>
    m <span class="token operator">=</span> Minute<span class="token punctuation">;</span>
    s <span class="token operator">=</span> Second<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面是新的GetTime方法的调用方法：</p><p><code>timeObject.GetTime( out theHour, out theMinute, out theSecond);</code></p><p>（责任编辑 尤北）</p>`,79),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","summary3.html.vue"]]);export{k as default};
