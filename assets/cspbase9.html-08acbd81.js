import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},e=t(`<h1 id="由c-转向c-我们需要注意哪些方面的变化" tabindex="-1"><a class="header-anchor" href="#由c-转向c-我们需要注意哪些方面的变化" aria-hidden="true">#</a> 由C++转向C#：我们需要注意哪些方面的变化？</h1><p>作者：刘彦青 本文选自：赛迪网 2002年03月05日</p><p>摘要：C#是建立在C++的语法和语义的，可以让C语言编程人员利用.NET和通用语言运行库带来的便利。尽管从C++转向C#是相对容易的，但仍然有些地方值得我们注意。在这篇文章中我们将探索其中的一些新特性，如碎片收集、属性、foreach-loop循环和界面等。</p><p>每隔10年左右，编程人员就需要花费大量的时间和精力去学习新的编程技术。在80年代是Unix和C，90年代是Windows和C++，现在又轮到了微软的.NETFramework和C#。尽管需要学习新的技术，但由此带来的好处却远高于付出的劳动。幸运的是，使用C#和.NET进行的大多数工程的分析和设计与在C++和Windows中没有本质的变化。在本篇文章中，我将介绍如何实现由C++到C#的飞跃。</p><p>已经有许多文章介绍过C#对C++的改进，在这里我就不再重复这些问题了。在这里，我将重点讨论由C++转向C#时最大的变化：由不可管理的环境向可管理的环境的变化。此外，我还会提出一些C#编程人员容易犯的错误供大家参考，此外，还将说明一些C#语言的能够影响编程的新功能。</p><h2 id="转向可管理的环境" tabindex="-1"><a class="header-anchor" href="#转向可管理的环境" aria-hidden="true">#</a> 转向可管理的环境</h2><p>C++的设计目标是低级的、与平台无关的面向对象编程语言，C#则是一种高级的面向组件的编程语言。向可管理环境的转变意味着你编程方式思考的重大转变，C#不再处理细微的控制，而是让架构帮助你处理这些重要的问题。例如，在C++中，我们就可以使用new在栈中、堆中、甚至是内存中的某一特定位置创建一个对象。</p><p>在.NET的可管理环境中，我们再不用进行那样细微的控制了。在选择了要创建的类型后，它的位置就是固定的了。简单类型（ints、double和long）的对象总是被创建在栈中（除非它们是被包含在其他的对象中），类总是被创建在堆中。我们无法控制对象是创建在堆中哪个位置的，也没有办法得到这个地址，不能将对象放置在内存中的某一特定位置。（当然也有突破这些限制的方法，但那是很另类的方法。）我们再也不能控制对象的生存周期，C#没有destructor。碎片收集程序会将对象所占用的内存进行回收，但这是非显性地进行的。</p><p>正是C#的这种结构反映了其基础架构，其中没有多重继承和模板，因为在一个可管理的碎片收集环境中，多重继承是很难高效地实现的。</p><p>C#中的简单类型仅仅是对通用语言运行库（CLR）中类型的简单映射，例如，C#中的<code>int</code>是对<code>System.Int32</code>的映射。C#中的数据类型不是由语言本身决定的，而是由CLR决定的。事实上，如果仍然想在C#中使用在VisualBasic中创建的对象，就必须使自己的编程习惯更符合CLR的规定。</p><p>另一方面，可管理的环境和CLR也给我们带来了好处。除了碎片收集和所有.NET语言中统一的数据类型外，它还提供给我们一个功能强大的面向组件的编程语言，无须对后期绑定提供特别的支持，类型发现和后期绑定都是被内置在语言中的。属性是C#语言中的第一类的成员，事件和代理也是。</p><p>可管理环境最主要的优点是.NETFramework。尽管在所有的.NET语文中都可以使用这种框架，但C#可以更好地使用.NET框架中丰富的类、接口和对象。</p><h2 id="traps" tabindex="-1"><a class="header-anchor" href="#traps" aria-hidden="true">#</a> Traps</h2><p>C#看起来与C++非常相似，这使得我们在由C++转向C#时比较轻松，但其中也有一些容易出错的地方。在C++中编写得非常漂亮的代码，在C#中会不能通过编译，甚至会出现意想不到的结果。C#与C++之间在语法上的变化并不大，编译器能够发现这二者之间大部分的差异，我在这里就不再多费笔墨了，在这里我介绍几个容易出问题的比较重要的变化：</p><h2 id="引用类型和值类型" tabindex="-1"><a class="header-anchor" href="#引用类型和值类型" aria-hidden="true">#</a> 引用类型和值类型</h2><p>在C#中，值类型和引用类型数据是有区别的。简单类型（int、long、double等）和结构属于值类型数据，类和对象属于引用类型数据。除非是包含在引用类型的变量中，与在C++中一样，值类型变量的值存储在栈中。引用类型的变量也存储在栈中，但它的值是一个存储在堆中的对象的地址，这一点也与C++类似。值类型变量是将自己的值传递给方法，而引用类型变量则将自己的指针传递给方法。</p><h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2><p>C#中的结构与C++中有非常明显的区别。在C++中，结构更象是类，除了缺省的继承外，其缺省的访问权限是public而不是private。在C#中，结构与类截然不同，它是用来封装轻型对象的，是值类型的数据类型，在传递时传送的是变量的值，而不是其地址。此外，它们也有一些不适用于类的限制，例如，它是不能继承的，也没有除System.ValueType之外的基本类。结构还不能定义一个缺省的constructor。</p><p>另一方面，由于结构比类的效率要高，因此它非常适合于创建轻型对象。因此，如果它的缺点对你的软件没有影响，使用结构比使用类效率要高得多，尤其是对于小对象而言。</p><h2 id="所有的一切都是对象" tabindex="-1"><a class="header-anchor" href="#所有的一切都是对象" aria-hidden="true">#</a> 所有的一切都是对象</h2><p>在C#中，所有的东西都是由继承Object得到的，包括创建的类和int、structs等值类型的变量。Object类提供了一些有用的方法，例如ToString，使用ToString的一个例子是与System.Console.WriteLine一起使用，它可以接受一个字符串和许多对象。与使用printf语句不同，要使用WriteLine，需要提供代换变量。假设myEmployee是用户定义的Employee类的一个实例，myCounter是用户定义的Counter类的一个实例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The employee:{0},the counter value:{1}&quot;</span><span class="token punctuation">,</span>myEmployee<span class="token punctuation">,</span>myCounter<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>其中的<code>WriteLine</code>会调用每个对象的<code>Object.ToString</code>方法，替换作为参数返回的变量。如果<code>Employee</code>类不覆盖<code>ToString</code>，就会调用缺省的实现（由System.Object继承得到的），它将把类的名字作为一个字符串返回。Counter会覆盖ToString，返回一个整型的变量，因此，上面代码的输出为：</p><p><code>The employee:Employee,the counter value:12</code></p><p>如果向<code>WriteLine</code>传递一个整型变量会发生什么情况呢？由于不能对整型变量调用ToString，编译器将自动将整型变量封装在一个对象的实例中。当WriteLine调用ToString时，对象就会返回表示整型变量值的字符串。下面的代码就说明了这个问题：</p><p>类的使用</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">//不覆盖ToString的类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token comment">//覆盖了ToString的类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Counter</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> theVal<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> theVal<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>theVal<span class="token operator">=</span>theVal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Calling Counter.ToString()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> theVal<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//创建类的实例</span>
        <span class="token class-name">Tester</span> t<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Tester</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//调用非静态成员</span>
        <span class="token comment">//(mustbethroughaninstance)</span>
        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//演示调用ToString的非静态方法</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Employeemy</span> Employee<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Counter</span> myCounter<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Counter</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The employee:{0},the counter value:{1}&quot;</span><span class="token punctuation">,</span>myEmployee<span class="token punctuation">,</span>myCounter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> myInt<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Here are two integers:{0} and {1}&quot;</span><span class="token punctuation">,</span><span class="token number">17</span><span class="token punctuation">,</span>myInt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><h2 id="引用型参数和输出型参数" tabindex="-1"><a class="header-anchor" href="#引用型参数和输出型参数" aria-hidden="true">#</a> 引用型参数和输出型参数</h2><p>与C++中相同，C#中的方法也只能有一个返回值。在C++中，我们通过将指针或索引作为参数而克服了这个限制，被调用的方法改变其中的参数，调用方法就可以得到新的值了。</p><p>向方法中传递一个索引作为参数时，只能严格地按传递索引或指针所能够提供的方式访问原来的对象。对于值类型变量而言，就不能采用这种方法了。如果要通过引用型参数传递值型变量，就需要在其前面加上ref关健字。如下所示：</p><p><code>public void GetStats(ref int age,ref int ID,ref int yearsServed)</code></p><p>需要注意的是，既需要在方法的定义中使用<code>ref</code>关健字，也需要在对方法的实际调用中使用<code>ref</code>关健字。</p><p><code>Fred.GetStats(ref age,ref ID,ref yearsServed);</code></p><p>现在，我们可以在调用方法中定义age、ID和yearsServed变量，并将它们传递给GetStats，得到改变后的值。</p><p>C#要求明确的赋值，也就是说，在调用GetStats方法之前，必须对age、ID和yearsServed这三个局部变量进行初始化，这一工作似乎有点多余，因为我们仅仅使用它们从GetStats中得到新的变量的值。为了解决这一问题，C#提供了<code>out</code>关健字，表示我们可以向方法中传递没有被初始化的变量，这些变量将通过引用变量的方式进行传递：</p><p><code>public void GetStats(out int age,out int ID,out int yearsServed)</code></p><p>当然了，调用方法也必须作出相应的变化：</p><p><code>Fred.GetStats(out age,out ID,out yearsServed);</code></p><h2 id="new的调用" tabindex="-1"><a class="header-anchor" href="#new的调用" aria-hidden="true">#</a> New的调用</h2><p>在C++中，<code>new</code>关健字可以在堆上生成一个对象。在C#中却不是这样。对于引用类型变量而言，<code>new</code>关健字在堆上生成一个对象；对于结构等值类型变量而言，<code>new</code>关健字在栈中生成一个对象，并需要调用<code>constructor</code>。</p><p>事实上，我们可以不使用new关健字而在栈上生成一个结构类型的变量，但这时需要注意的是，New关健字能够初始化对象。如果不使用new，则在使用前必须手工地对结构中的所有成员进行初始化，否则在编译时会出错。</p><p>对象的初始化</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span><span class="token comment">//有二个成员变量和一个构造器的简单结构</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">Point</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>x<span class="token operator">=</span>x<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>y<span class="token operator">=</span>y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Tester</span> t<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Tester</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">publicvoidRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Point</span> p1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">SomeMethod</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//fine</span>
        <span class="token class-name">Point</span> p2<span class="token punctuation">;</span><span class="token comment">//不调用new而直接创建</span>

        <span class="token comment">//编译器编译到这里时会出错，因为p2的成员变量没有被初始化</span>
        <span class="token comment">//SomeMethod(p2);</span>

        <span class="token comment">//手工对它们进行初始化</span>
        p2<span class="token punctuation">.</span>x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        p2<span class="token punctuation">.</span>y<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>

        <span class="token function">SomeMethod</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//一个可以接受Point作为参数的方法</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span>Pointp<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Pointat{0}x{1}&quot;</span><span class="token punctuation">,</span>p<span class="token punctuation">.</span>x<span class="token punctuation">,</span>p<span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h2><p>大多数的C++编程人员都希望使成员变量的属性为<code>private</code>，这种隐藏数据的想法促进了数据封装概念的出现，使我们能够在不改变用户依赖的接口的情况下而改变类的实现。通常情况下，我们只希望客户获取或设置这些成员变量的值。因此，C++编程人员开发出了用来存取private成员变量的存取器。</p><p>在C#中，属性是类的第一级成员。对于客户而言，属性看起来象一个成员变量。对于类的实现者而言，它看起来更象是方法。这种设计很巧妙，既可以实现数据的隐藏和封装，又可以使客户很方便地访问成员变量。</p><p>我们可以在Employee类中添加一个Age属性，使客户可以很方便地获取和设置员工年龄这个类的成员：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Age
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        age<span class="token operator">=</span><span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>关健字<code>value</code>可以被属性隐性地使用。如果编写如下的代码：</p><p><code>Fred.Age=17;</code></p><p>编译器将会把值17传递给<code>value</code>。</p><p>通过只采用<code>Get</code>而不采用<code>Set</code>，我们可以为YearsServed创建一个只读的属性：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> YearsServed
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> yearsServed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">// Accessors的使用</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Employee</span> Fred<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span><span class="token number">101</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Fred&#39;sage:{0}&quot;</span><span class="token punctuation">,</span> Fred<span class="token punctuation">.</span>Age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Fred<span class="token punctuation">.</span>Age<span class="token operator">=</span><span class="token number">55</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Fred&#39;sage:{0}&quot;</span><span class="token punctuation">,</span> Fred<span class="token punctuation">.</span>Age<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Fred&#39;sservice:{0}&quot;</span><span class="token punctuation">,</span> Fred<span class="token punctuation">.</span>YearsServed<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Fred.YearsServed=12;//是不被允许的</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以通过属性获取Fred的年龄，也可以使用这一属性设置年龄。我们虽然可以访问YearsServed属性获得它的值，但不能设置值。如果没有注释掉最后一行的代码，在编译时就会出错。</p><p>如果以后决定从数据库中获取Employee的年龄，我们就只需要改变存取器的实现，而客户不会受到任何影响。</p><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><p>C#提供了一个数组类，它比C/C++中传统的数组更智能化。例如，在C#中写数组时不会超出边界。此外，数组还有一个更智能的伙伴—<code>ArrayList</code>，可以动态地增长，管理对数组大小不断变化的需求。</p><p>C#中的数组有三种形式：一维数组、多维均匀数组（象C++中传统的数组那样）、非均匀数组（数组的数组）。我们可以通过下面的代码创建一维数组：</p><p><code>int[] myIntArray = new int[5];</code></p><p>另外，还可以以如下的方式对它进行初始化：</p><p><code>int[] myIntArray={2,4,6,8,10};</code></p><p>我们可以通过如下方式创建一个4×3的均匀数组：</p><p><code>int[,] myRectangularArray=new int[rows,columns];</code></p><p>我们可以按如下方式对该数组进行初始化：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> myRectangularArray<span class="token operator">=</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>由于非均匀数组是数组的数组，因此，我们只能创建一维非均匀数组：</p><p><code>int[][] myJaggedArray=new int[4][];</code></p><p>然后再创建内部的每个数组：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>myJaggedArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
myJaggedArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
myJaggedArray<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
myJaggedArray<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
</code></pre></div><p>由于数组是由继承<code>System.Array</code>对象而得到的，因此，它们带有许多包括<code>Sort</code>、<code>Reverse</code>在内的许多有用的方法。</p><h2 id="索引器" tabindex="-1"><a class="header-anchor" href="#索引器" aria-hidden="true">#</a> 索引器</h2><p>我们可以创建象数组一样的对象。例如，我们可以创建一个显示一系列字符串的列表框，可以把列表框当作一个数组，使用一个索引就可以很方便地访问列表框中的内容。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> theFirstString<span class="token operator">=</span>myListBox<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> theLastString<span class="token operator">=</span>myListBox<span class="token punctuation">[</span>Length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><p>这是通过索引器完成的。索引器在很大程度上象一个属性，但支持索引操作的语法。图4显示了一个后面跟着索引操作符的属性，图5显示如何完成一个很简单的ListBox类并对它进行索引：</p><h2 id="界面" tabindex="-1"><a class="header-anchor" href="#界面" aria-hidden="true">#</a> 界面</h2><p>软件界面是二种对象之间如何进行交互的契约。如果一个对象发布了一个界面，就等于向所有可能的客户声明：我支持下面的方法、属性、事件和索引器。</p><p>C#是一种面向对象的语言，因此这些契约被封装在一个被称作界面的实体中，界面定义了封装着契约的引用型类型的对象。从概念上来讲，界面与抽象类非常相似，二者的区别是抽象类可以作为一系列衍生类的基础类，界面则是与其他继承树结合在一起的。</p><h3 id="ienumerable界面" tabindex="-1"><a class="header-anchor" href="#ienumerable界面" aria-hidden="true">#</a> IEnumerable界面</h3><p>再回到上面的例子中。象在普通的数组中那样，使用foreach-loop循环结构就能够很好地打印ListBoxTest类中的字符串，通过在类中实现<code>IEnumerable</code>界面就能实现，这是由foreach-loop循环结构隐性地完成的。在任何支持枚举和foreach-loop循环的类中都可以实现<code>IEnumerable</code>界面。</p><p><code>IEnumerable</code>界面只有一个方法<code>GetEnumerator</code>，其任务是返回一个特别的<code>IEnumerator</code>的实现。从语法的角度来看，<code>Enumerable</code>类能够提供一个<code>IEnumerator</code>。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Figure 5 ListBoxClass</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">//简化的ListBox控制</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ListBoxTest</span>
<span class="token punctuation">{</span>
    <span class="token comment">//用字符串初始化该ListBox</span>
    <span class="token keyword">public</span> <span class="token function">ListBoxTest</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> initialStrings<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//为字符串分配空间</span>
        myStrings<span class="token operator">=</span>newString<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">//把字符串拷贝到构造器中</span>
        <span class="token keyword">foreach</span><span class="token punctuation">(</span>stringsininitialStrings<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            myStrings<span class="token punctuation">[</span>myCtr<span class="token operator">++</span><span class="token punctuation">]</span><span class="token operator">=</span>s<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//在ListBox的末尾添加一个字符串</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> theString<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myStrings<span class="token punctuation">[</span>myCtr<span class="token operator">++</span><span class="token punctuation">]</span><span class="token operator">=</span>theString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span>intindex<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>index<span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">||</span>index<span class="token operator">&gt;=</span>myStrings<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
            <span class="token comment">//处理有问题的索引</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> myStrings<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myStrings<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//返回有多少个字符串</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetNumEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> myCtr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> myStrings<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myCtr<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//创建一个新的列表并初始化</span>
        <span class="token class-name">ListBoxTest</span> lbt<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListBoxTest</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//添加一些新字符串</span>
        lbt<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Who&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lbt<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Is&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lbt<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;John&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lbt<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Galt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> subst<span class="token operator">=</span><span class="token string">&quot;Universe&quot;</span><span class="token punctuation">;</span>
        lbt<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>subst<span class="token punctuation">;</span>
        <span class="token comment">//访问所有的字符串</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>lbt<span class="token punctuation">.</span><span class="token function">GetNumEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;lbt[{0}]:{1}&quot;</span><span class="token punctuation">,</span>i<span class="token punctuation">,</span>lbt<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>   
<span class="token punctuation">}</span> 
</code></pre></div><p><code>Enumerator</code>必须实现<code>IEnumerator</code>方法，这可以直接通过一个容器类或一个独立的类实现，后一种方法经常被选用，因为它可以将这一任务封装在<code>Enumerator</code>类中，而不会使容器类显得很混乱。我们将在上面代码中的<code>ListBoxTest</code>中添加<code>Enumerator</code>类，由于Enumerator类是针对我们的容器类的（因为ListBoxEnumerator必须清楚ListBoxTest的许多情况），我们将使它在ListBoxTest中成为不公开的。在本例中，ListBoxTest被定义来完成IEnumerable界面，<code>IEnumerable</code>界面必须返回一个<code>Enumerator</code>。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">IEnumerator</span> <span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>IEnumerator<span class="token punctuation">)</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListBoxEnumerator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，方法将当前的ListBoxTest对象（this）传递给<code>Enumerator</code>，这将使<code>Enumerator</code>枚举这一指定的<code>ListBoxTest</code>对象中的元素。</p><p>实现这一类的<code>Enumerator</code>在这里被实现为<code>ListBoxEnumerator</code>，它在<code>ListBoxTest</code>中被定义成一个私有类，这一工作是相当简单的。</p><p>被枚举的ListBoxTest作为一个参数被传递给constructor，ListBoxTest被赋给变量myLBT，构造器还会将成员变量index设置为-1，表明对象的枚举还没有开始。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">ListBoxEnumerator</span><span class="token punctuation">(</span><span class="token class-name">ListBoxTest</span> theLB<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    myLBT<span class="token operator">=</span>theLB<span class="token punctuation">;</span>
    index<span class="token operator">=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p><code>MoveNext</code>方法对index进行加1的操作，然后确保没有超过枚举的对象的边界。如果超过边界了，就会返回<code>false</code>值，否则返回<code>true</code>值。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    index<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>index<span class="token operator">&gt;=</span>myLBT<span class="token punctuation">.</span>myStrings<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p><code>Reset</code>的作用仅仅是将index的值设置为-1。</p><p><code>Current</code>返回最近添加的字符串，这是一个任意的设定，在其他类中，Current可以有设计人员确定的意义。无论是如何设计的，每个进行枚举的方法必须能够返回当前的成员。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Current
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">(</span>myLBT<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对foreach循环结构的调用能够获取枚举的方法，并用它处理数组中的每个成员。由于foreach循环结构将显示每一个字符串，而无论我们是否添加了一个有意义的值，我们将myStrings的初始化改为8个条目，以保证显示的易于处理。</p><p><code>myStrings=new String[8];</code></p><h2 id="使用基本类库" tabindex="-1"><a class="header-anchor" href="#使用基本类库" aria-hidden="true">#</a> 使用基本类库</h2><p>为了更好地理解C#与C++的区别和解决问题方式的变化，我们先来看一个比较简单的例子。我们将创建一个读取文本文件的类，并在屏幕上显示其内容。我将把它做成多线程程序，以便在从磁盘上读取数据时还可以做其他的工作。</p><p>在C++中，我们可能会创建一个读文件的线程和另一个做其他工作的线程，这二个线程将各自独立地运行，但可能会需要对它们进行同步。在C#中，我们也可以完成同样的工作，由于.NET框架提供了功能强大的异步I/O机制，在编写线程时，我们会节省不少的时间。</p><p>异步I/O支持是内置在CLR中的，而且几乎与使用正常的I/O流类一样简单。在程序的开始，我们首先通知编译器，我们将在程序中使用许多名字空间中的对象：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
</code></pre></div><p>在程序中包含System，并不会自动地包含其所有的子名字空间，必须使用<code>using</code>关健字明确地包含每个子名字空间。我们在例子中会用到I/O流类，因此需要包含<code>System.IO</code>名字空间，我们还需要<code>System.Text</code>名字空间支持字节流的ASCII编码。</p><p>由于.NET架构为完成了大部分的工作，编写这一程序所需的步骤相当简单。我们将用到<code>Stream</code>类的<code>BeginRead</code>方法，它提供异步I/O功能，将数据读入到一个缓冲区中，当缓冲区可以处理时调用相应的处理程序。</p><p>我们需要使用一个字节数组作为缓冲区和回叫方法的代理，并将这二者定义为驱动程序类的private成员变量。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AsynchIOTester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Stream</span> inputStream<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">AsyncCallback</span> myCallBack<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre></div><p><code>inputStream</code>是一个<code>Stream</code>类型的变量，我们将对它调用<code>BeginRead</code>方法。代理与成员函数的指针非常相似。代理是C#的第一类元素。</p><p>当缓冲区被磁盘上的文件填满时，.NET将调用被代理的方法对数据进行处理。在等待读取数据期间，我们可以让计算机完成其他的工作。（在本例中是将1个整型变量由1增加到50000，但在实际的应用程序中，我们可以让计算机与用户进行交互或作其他有意义的工作。）</p><p>本例中的代理被定义为AsyncCallback类型的过程，这是<code>Stream</code>的<code>BeginRead</code>方法所需要的。System空间中<code>AsyncCallback</code>类型代理的定义如下所示：</p><p><code>public delegate void AsyncCallback(IAsyncResult ar);</code></p><p>这一代理可以是与任何返回<code>void</code>类型值、将<code>IAsyncResult</code>界面作为参数的方法相关联的。在该方法被调用时，CLR可以在运行时传递<code>IAsyncResult</code>界面对象作为参数。我们需要如下所示的形式定义该方法：</p><p><code>void OnCompletedRead(IAsyncResult asyncResult)</code></p><p>然后在构造器中与代理连接起来：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token function">AsynchIOTester</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token operator">??</span><span class="token punctuation">?</span>
    myCallBack<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>OnCompletedRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>上面的代码将代理的实例赋给成员变量<code>myCallback</code>。下面是全部程序的详细工作原理。在<code>Main</code>函数中，创建了一个类的实例，并让它开始运行：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">AsynchIOTester</span> theApp <span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsynchIOTester</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    theApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p><code>new</code>关健字能够启动构造器。在构造器中我们打开一个文件，并得到一个<code>Stream</code>对象。然后在缓冲中分配空间并与回调机制联结起来。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token function">AsynchIOTester</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    inputStream<span class="token operator">=</span>File<span class="token punctuation">.</span><span class="token function">OpenRead</span><span class="token punctuation">(</span><span class="token string">@&quot;C:\\MSDN\\fromCppToCS.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    buffer<span class="token operator">=</span>newbyte<span class="token punctuation">[</span>BUFFER_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>
    myCallBack<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>OnCompletedRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>在<code>Run</code>方法中，我们调用了<code>BeginRead</code>，它将以异步的方式读取文件。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>inputStream<span class="token punctuation">.</span><span class="token function">BeginRead</span><span class="token punctuation">(</span>
buffer<span class="token punctuation">,</span><span class="token comment">//存放结果</span>
<span class="token number">0</span><span class="token punctuation">,</span><span class="token comment">//偏移量</span>
buffer<span class="token punctuation">.</span>Length<span class="token punctuation">,</span><span class="token comment">//缓冲区中有多少字节</span>
myCallBack<span class="token punctuation">,</span><span class="token comment">//回调代理</span>
<span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//本地对象 </span>
</code></pre></div><p>这时，我们可以完成其他的工作。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">long</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">50000</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">%</span><span class="token number">1000</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i:{0}&quot;</span><span class="token punctuation">,</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>文件读取操作结束后，CLR将调用回调方法。</p><p><code>void OnCompletedRead(IAsyncResult asyncResult){ }</code></p><p>在<code>OnCompletedRead</code>中要做的第一件事就是通过调用<code>Stream</code>对象的<code>EndRead</code>方法找出读取了多少字节：</p><p><code>int bytesRead=inputStream.EndRead(asyncResult);</code></p><p>对<code>EndRead</code>的调用将返回读取的字节数。如果返回的数字比0大，则将缓冲区转换为一个字符串，然后将它写到控制台上，然后再次调用<code>BeginRead</code>，开始另一次异步读的过程。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>bytesRead<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">String</span> s<span class="token operator">=</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    inputStream<span class="token punctuation">.</span><span class="token function">BeginRead</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>buffer<span class="token punctuation">.</span>Length<span class="token punctuation">,</span>myCallBack<span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>现在，在读取文件的过程中就可以作别的工作了（在本例中是从1数到50000），但我们可以在每次缓冲区满了时对读取的数据进行处理（在本例中是向控制台输出缓冲区中的数据）。有兴趣的读者可以点击此处下载完整的源代码。</p><p>异步I/O的管理完全是由CLR提供的，这样，在网络上读取文件时，会更好些。</p><h2 id="在网络上读取文件" tabindex="-1"><a class="header-anchor" href="#在网络上读取文件" aria-hidden="true">#</a> 在网络上读取文件</h2><p>在C++中，在网络上读取文件需要有相当的编程技巧，.NET对此提供了广泛的支持。事实上，在网络上读取文件仅仅是基础类库中<code>Stream</code>类的另一种应用。</p><p>首先，为了对TCP/IP端口（在本例中是65000）进行监听，我们需要创建一个<code>TCPListener</code>类的实例。</p><p><code>TCPListener tcpListener=new TCPListener(65000);</code></p><p>一旦创建后，就让它开始进行监听。</p><p><code>tcpListener.Start();</code></p><p>现在就要等待客户连接的要求了。</p><p><code>Socket socketForClient = tcpListener.Accept();</code></p><p><code>TCPListener</code>对象的<code>Accept</code>方法返回一个<code>Socket</code>对象，<code>Accept</code>是一个同步的方法，除非接收到一个连接请求它才会返回。如果连接成功，就可以开始向客户发送文件了。</p><p><code>if(socketForClient.Connected){???}</code></p><p>接下来，我们需要创建一个<code>NetworkStream</code>类，将报路传递给constructor：</p><p><code>NetworkStream networkStream=new NetworkStream(socketForClient);</code></p><p>然后创建一个<code>StreamWriter</code>对象，只是这次不是在文件上而是在刚才创建的<code>NetworkStream</code>类上创建该对象：</p><p><code>System.IO.StreamWriter streamWriter=new System.IO.StreamWriter(networkStream);</code></p><p>当向该流写内容时，流就通过网络被传输给客户端。</p><h2 id="客户端的创建" tabindex="-1"><a class="header-anchor" href="#客户端的创建" aria-hidden="true">#</a> 客户端的创建</h2><p>客户端软件就是一个<code>TCPClient</code>类的具体例子，TCPClient类代表连向主机的一个TCP/IP连接。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">TCPClient</span> socketForServer<span class="token punctuation">;</span>
socketForServer<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TCPClient</span><span class="token punctuation">(</span><span class="token string">&quot;localHost&quot;</span><span class="token punctuation">,</span><span class="token number">65000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>有了<code>TCPClient</code>对象后，我们就可以创建<code>NetworkStream</code>对象了，然后在其上创建<code>StreamReader</code>类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">NetworkStream</span> networkStream<span class="token operator">=</span>socketForServer<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>StreamReader</span> streamReader<span class="token operator">=</span>
<span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>StreamReader</span><span class="token punctuation">(</span>networkStream<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>现在，只要其中有数据就读取该流，并将结果输出到控制台上。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">do</span>
<span class="token punctuation">{</span>
    outputString<span class="token operator">=</span>streamReader<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>outputString<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>outputString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span>outputString<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>为了对这一段代码进行测试，可以创建如下一个测试用的文件:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>This is line one
This is line two
This is line three
This is line four 
</code></pre></div><p>这是来自服务器的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Output(Server)
Client connected
Sending This is line one
Sending This is line two
Sending This is line three
Sending This is line four
Disconnecting from client...
Exiting... 
</code></pre></div><p>下面是来自客户端的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>This is line one
This is line two
This is line three
This is line four  
</code></pre></div><h2 id="属性和元数据" tabindex="-1"><a class="header-anchor" href="#属性和元数据" aria-hidden="true">#</a> 属性和元数据</h2><p>C#和C++之间一个显著的区别是它提供了对元数据的支持：有关类、对象、方法等其他实体的数据。属性可以分为二类：一类以CLR的一部分的形式出现，另一种是我们自己创建的属性，CLR属性用来支持串行化、排列和COM协同性等。一些属性是针对一个组合体的，有些属性则是针对类或界面，它们也被称作是属性目标。</p><p>将属性放在属性目标前的方括号内，属性就可以作用于它们的属性目标。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span><span class="token class-name">AssemblyDelaySign</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span><span class="token class-name">AssemblyKeyFile</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;.\\\\keyFile.snk&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
</code></pre></div><p>或用逗号将各个属性分开：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span>assembly<span class="token punctuation">:</span><span class="token function">AssemblyDelaySign</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token named-parameter punctuation">assembly</span><span class="token punctuation">:</span><span class="token function">AssemblyKeyFile</span><span class="token punctuation">(</span><span class="token string">&quot;.\\\\keyFile.snk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre></div><h2 id="自定义的属性" tabindex="-1"><a class="header-anchor" href="#自定义的属性" aria-hidden="true">#</a> 自定义的属性</h2><p>我们可以任意创建自定义属性，并在认为合适的时候使用它们。假设我们需要跟踪bug的修复情况，就需要建立一个包含bug的数据库，但需要将bug报告与专门的修正情况绑定在一块儿，则可能在代码中添加如下所示的注释：</p><p><code>//Bug323fixedbyJesseLiberty1/1/2005.</code></p><p>这样，在源代码中就可以一目了然地了解bug的修正情况，但如果如果把相关的资料保存在数据库中可能会更好，这样就更方便我们的查询工作了。如果所有的bug报告都使用相同的语法那就更好了，但这时我们就需要一个定制的属性了。我们可能使用下面的内容代替代码中的注释：</p><p><code>[BugFix(323,&quot;JesseLiberty&quot;,&quot;1/1/2005&quot;)Comment=&quot;Offbyoneerror&quot;]</code></p><p>与C#中的其他元素一样，属性也是类。定制化的属性类需要继承<code>System.Attribute</code>：</p><p><code>public class BugFixAttribute:System.Attribute</code></p><p>我们需要让编译器知道这个属性可以跟什么类型的元素，我们可以通过如下的方式来指定该类型的元素：</p><p><code>[AttributeUsage(AttributeTargets.ClassMembers,AllowMultiple=true)]</code></p><p><code>AttributeUsage</code>是一个作用于属性的属性━━元属性，它提供的是元数据的元数据，也即有关元数据的数据。在这种情况下，我们需要传递二个参数，第一个是目标（在本例中是类成员。），第二个是表示一个给定的元素是否可以接受多于一个属性的标记。<code>AllowMultiple</code>的值被设置为<code>true</code>，意味着类成员可以有多于一个<code>BugFixAttribute</code>属性。如果要联合二个属性目标，可以使用OR操作符连接它们。</p><p><code>[AttributeUsage(AttributeTargets.Class|AttributeTargets.Interface,AllowMultiple=true)]</code></p><p>上面的代码将使一个属性隶属于一个类或一个界面。</p><p>新的自定义属性被命名为<code>BugFixAttribute</code>。命名的规则是在属性名之后添加<code>Attribute</code>。在将属性指派给一个元素后，编译器允许我们使用精简的属性名调用这一属性。因此，下面的代码是合法的：</p><p><code>[BugFix(123,&quot;JesseLiberty&quot;,&quot;01/01/05&quot;,Comment=&quot;Offbyone&quot;)]</code></p><p>编译器将首先查找名字为<code>BugFix</code>的属性，如果没有发现，则查找<code>BugFixAttribute</code>。</p><p>每个属性必须至少有一个构造器。属性可以接受二种类型的参数：环境参数和命名参数。在前面的例子中，bugID、编程人员的名字和日期是环境参数，注释是命名参数。环境参数被传递到构造器中的，而且必须按在构造器中定义的顺序传递。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">BugFixAttribute</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> bugID<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> programmer<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> date<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>bugID<span class="token operator">=</span>bugID<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>programmer<span class="token operator">=</span>programmer<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>date<span class="token operator">=</span>date<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Named parameters are implemented as properties. </span>
</code></pre></div><h2 id="属性的使用" tabindex="-1"><a class="header-anchor" href="#属性的使用" aria-hidden="true">#</a> 属性的使用</h2><p>为了对属性进行测试，我们创建一个名字为MyMath的简单类，并给它添加二个函数，然后给它指定bugfix属性。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">BugFixAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">121</span><span class="token punctuation">,</span><span class="token string">&quot;JesseLiberty&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;01/03/05&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">BugFixAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">107</span><span class="token punctuation">,</span><span class="token string">&quot;JesseLiberty&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;01/04/05&quot;</span><span class="token punctuation">,</span>Comment<span class="token operator">=</span><span class="token string">&quot;Fixedoffbyoneerrors&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyMath</span>
</code></pre></div><p>这些数据将与元数据存储在一起。下面是完整的源代码及其输出：</p><p>自定义属性</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">//创建被指派给类成员的自定义属性</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">AttributeUsage</span><span class="token attribute-arguments"><span class="token punctuation">(</span>AttributeTargets<span class="token punctuation">.</span>Class<span class="token punctuation">,</span> AllowMultiple<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BugFixAttribute</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Attribute</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">//位置参数的自定义属性构造器</span>
    <span class="token keyword">public</span> <span class="token function">BugFixAttribute</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> bugID<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> programmer<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> date<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bugID<span class="token operator">=</span>bugID<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>programmer<span class="token operator">=</span>programmer<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>date<span class="token operator">=</span>date<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> BugID
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> bugID<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//命名参数的属性</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Comment
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> comment<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            comment<span class="token operator">=</span><span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Date
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> date<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Programmer
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> programmer<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//专有成员数据</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> bugID<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> comment<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> date<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> programmer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//把属性指派给类</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">BugFixAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">121</span><span class="token punctuation">,</span><span class="token string">&quot;JesseLiberty&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;01/03/05&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">BugFixAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">107</span><span class="token punctuation">,</span><span class="token string">&quot;JesseLiberty&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;01/04/05&quot;</span><span class="token punctuation">,</span>Comment<span class="token operator">=</span><span class="token string">&quot;Fixedoffbyoneerrors&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyMath</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">DoFunc1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> param1<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> param1<span class="token operator">+</span><span class="token function">DoFunc2</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">DoFunc2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> param1<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> param1<span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> stati <span class="token return-type class-name">cvoid</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyMath</span> mm<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Calling DoFunc(7).Result:{0}&quot;</span><span class="token punctuation">,</span> mm<span class="token punctuation">.</span><span class="token function">DoFunc1</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出：</p><p><code>Calling DoFunc(7).Result:9.3333333333333339</code></p><p>象我们看到的那样，属性对输出绝对没有影响，创建属性也不会影响代码的性能。到目前为止，读者也只是在听我论述有关属性的问题，使用ILDASM浏览元数据，就会发现属性确实是存在的。</p><h2 id="映射" tabindex="-1"><a class="header-anchor" href="#映射" aria-hidden="true">#</a> 映射</h2><p>在许多情况下，我们需要一种方法，能够从元数据中访问属性，C#提供了对映射的支持以访问元数据。通过初始化<code>MemberInfo</code>类型对象，<code>System.Reflection</code>名字空间中的这个对象可以用来发现成员的属性，对元数据进行访问。</p><p><code>System.Reflection.MemberInfo inf=typeof(MyMath);</code></p><p>对<code>MyMath</code>类型调用<code>typeof</code>操作符，它返回一个由继承<code>MemberInfo</code>而生成的<code>Type</code>类型的变量。</p><p>下一步是对<code>MemberInfo</code>对象调用<code>GetCustomAttributes</code>，并将希望得到的属性的类型作为一个参数传递给<code>GetCustomAttributes</code>。我们将得到一个对象数组，数组的每个成员的类型都是<code>BugFixAttribute</code>。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> attributes<span class="token punctuation">;</span>
attributes<span class="token operator">=</span>Attribute<span class="token punctuation">.</span><span class="token function">GetCustomAttributes</span><span class="token punctuation">(</span>inf<span class="token punctuation">,</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BugFixAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>我们就可以遍历这个数组了，打印<code>BugFixAttribute</code>对象的数组，代码下所示：</p><h2 id="属性的打印" tabindex="-1"><a class="header-anchor" href="#属性的打印" aria-hidden="true">#</a> 属性的打印</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">MyMath</span> mm<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyMath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Calling DoFunc(7).Result:{0}&quot;</span><span class="token punctuation">,</span>mm<span class="token punctuation">.</span><span class="token function">DoFunc1</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//获取成员信息并使用它访问自定义的属性</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>MemberInfo</span> inf<span class="token operator">=</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">MyMath</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> attributes<span class="token punctuation">;</span>
    attributes<span class="token operator">=</span>Attribute<span class="token punctuation">.</span><span class="token function">GetCustomAttributes</span><span class="token punctuation">(</span>inf<span class="token punctuation">,</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BugFixAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//遍历所有的属性</span>
    <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">Object</span> attribute <span class="token keyword">in</span> attributes<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">BugFixAttribute</span> bfa<span class="token operator">=</span><span class="token punctuation">(</span>BugFixAttribute<span class="token punctuation">)</span>attribute<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nBugID:{0}&quot;</span><span class="token punctuation">,</span>bfa<span class="token punctuation">.</span>BugID<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Programmer:{0}&quot;</span><span class="token punctuation">,</span>bfa<span class="token punctuation">.</span>Programmer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Date:{0}&quot;</span><span class="token punctuation">,</span>bfa<span class="token punctuation">.</span>Date<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Comment:{0}&quot;</span><span class="token punctuation">,</span>bfa<span class="token punctuation">.</span>Comment<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><h2 id="类型发现" tabindex="-1"><a class="header-anchor" href="#类型发现" aria-hidden="true">#</a> 类型发现</h2><p>我们可以通过映象的方法来研究一个组合实体的内容，如果要建立需要显示组合体内部信息的工具或动态地调用组合体中的途径，这一方法是非常有用的。</p><p>通过映象的方法，我们可以知道一个模块、方法、域、属性的类型，以及该类型的每个方法的信号、该类支持的界面和该类的超级类。我们可以通过如下的形式，用<code>Assembly.Load</code>静态方法动态地加载一个组合体：</p><p><code>public static Assembly.Load(AssemblyName)</code></p><p>然后，可以将它传递到核心库中。</p><p><code>Assembly a=Assembly.Load(&quot;Mscorlib.dll&quot;);</code></p><p>一旦加载了组合体，我们可以通过调用<code>GetTypes</code>返回一个<code>Type</code>对象数组。<code>Type</code>对象是映射的核心，它表示类、界面、数组、值和枚举等的类型定义。</p><p><code>Type[] types= a.GetTypes();</code></p><p>组合休会返回一个类型的数组，我们可以使用foreach-loop结构显示该数组，其输出将有好几页文档之多，下面我们从中找一小段：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Type is System.TypeCode
Type is System.Security.Util.StringExpressionSet
Type is System.Text.UTF7Encoding$Encoder
Type is System.ArgIterator
Type is System.Runtime.Remoting.JITLookupTable
1205 types found 
</code></pre></div><p>我们得到了一个内容为核心库中类型的数组，可以将它们都打印出来，该数组将有1205个项。</p><p>对一种类型映射我们也可以对组合体中一种类型进行映射。为此，我们可以使用GetType方法从组合体中解析出一个类型：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//检查一个对象</span>
        <span class="token class-name">Type</span> theType<span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Reflection.Assembly&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nSingle Type is{0}\\n&quot;</span><span class="token punctuation">,</span>theType<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>输出如下所示：</p><p><code>Single Type is System.Reflection.Assembly</code></p><h2 id="发现成员" tabindex="-1"><a class="header-anchor" href="#发现成员" aria-hidden="true">#</a> 发现成员</h2><p>我们还可以得到所有成员的类型，显示所有的方法、属性、域，下面的代码演示了实现上述目标的代码。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//Figure 9 GettingAllMembers</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//检查一个单一的对象</span>
        <span class="token class-name">Type</span> theType<span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Reflection.Assembly&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nSingle Typeis{0}\\n&quot;</span><span class="token punctuation">,</span>theType<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//获取所有的成员</span>
        <span class="token class-name">MemberInfo<span class="token punctuation">[</span><span class="token punctuation">]</span></span> mbrInfoArray <span class="token operator">=</span> theType<span class="token punctuation">.</span><span class="token function">GetMembers</span><span class="token punctuation">(</span>BindingFlags<span class="token punctuation">.</span>LookupAll<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">MemberInfo</span> mbrInfo <span class="token keyword">in</span> mbrInfoArray<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} is a {1}&quot;</span><span class="token punctuation">,</span>mbrInfo<span class="token punctuation">,</span>mbrInfo<span class="token punctuation">.</span>MemberType<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>尽管得到的输出还非常长，但在输出中我们可以得到如下面的不甘落后民示的域、方法、构造器和属性：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>System.Strings_localFilePrefix is a Field
BooleanIsDefined(System.Type) is a Method
Void.ctor() is a Constructor
System.StringCodeBase is a Property
System.StringCopiedCodeBase is a Property
</code></pre></div><h2 id="只发现方法" tabindex="-1"><a class="header-anchor" href="#只发现方法" aria-hidden="true">#</a> 只发现方法</h2><p>我们可能会只关心方法，而不关心域、属性等，为此，我们需要删除如下的对<code>GetMembers</code>的调用：</p><p><code>MemberInfo[] mbrInfoArray=theType.GetMembers(BindingFlags.LookupAll);</code></p><p>然后添加调用<code>GetMethods</code>的语句：</p><p><code>mbrInfoArray=theType.GetMethods();</code></p><p>现在，输出中就只剩下方法了。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Output(excerpt)
BooleanEquals(System.Object) is a Method
System.StringToString() is a Method
System.StringCreateQualifiedName(System.String,System.String) is a Method
System.Reflection.MethodInfoget_EntryPoint() is a Method
</code></pre></div><h2 id="发现特定的成员" tabindex="-1"><a class="header-anchor" href="#发现特定的成员" aria-hidden="true">#</a> 发现特定的成员</h2><p>最后，为了进一步地缩小范围，我们可以使用<code>FindMembers</code>方法来发现某一类型的特定的方法。例如，在下面的代码中，我们可以只搜索以“Get”开头的方法。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//检查一个单一的对象</span>
        <span class="token class-name">Type</span> theType<span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Reflection.Assembly&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//只获取以Get开头的成员</span>
        MemberInfo<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token return-type class-name">mbrInfoArray</span>
        theType<span class="token punctuation">.</span><span class="token function">FindMembers</span><span class="token punctuation">(</span>MemberTypes<span class="token punctuation">.</span>Method<span class="token punctuation">,</span>BindingFlags<span class="token punctuation">.</span>Default<span class="token punctuation">,</span>Type<span class="token punctuation">.</span>FilterName<span class="token punctuation">,</span><span class="token string">&quot;Get*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">MemberInfo</span> mbrInfo <span class="token keyword">in</span> mbrInfoArray<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} is a {1}&quot;</span><span class="token punctuation">,</span>mbrInfo<span class="token punctuation">,</span>mbrInfo<span class="token punctuation">.</span>MemberType<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其输出的一部分如下所示：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>System.Type[]GetTypes() is a Method
System.Type[]GetExportedTypes() is a Method
System.TypeGetType(System.String,Boolean)is a Method
System.TypeGetType(System.String) is a Method
System.Reflection.AssemblyNameGetName(Boolean) is a Method
System.Reflection.AssemblyNameGetName() is a Method
Int32GetHashCode() is a Method
System.Reflection.AssemblyGetAssembly(System.Type) is a Method
System.TypeGetType(System.String,Boolean,Boolean) is a Method
</code></pre></div><h2 id="动态调用" tabindex="-1"><a class="header-anchor" href="#动态调用" aria-hidden="true">#</a> 动态调用</h2><p>一旦发现一个方法，可以使用映射的方法调用它。例如，我们可能需要调用<code>System.Math</code>中的<code>Cos</code>方法（返回一个角的余弦值）。为此，我们需要获得<code>System.Math</code>类的类型信息，如下所示：</p><p><code>Type theMathType=Type.GetType(&quot;System.Math&quot;);</code></p><p>有了类型信息，我们就可以动态地加载一个类的实例：</p><p><code>Object theObj=Activator.CreateInstance(theMathType);</code></p><p><code>CreateInstance</code>是<code>Activator</code>类的一个静态方法，可以用来对对象进行初始化。</p><p>有了<code>System.Math</code>类的实例后，我们就可以调用<code>Cos</code>方法了。我们还需要准备好一个定义参数类型的数组，因为<code>Cos</code>只需要一个参数（需要求余弦值的角度），因此数组中只需要有一个成员。我们将在数组中赋予一个<code>System.Double</code>类型的<code>Type</code>对象，也就是<code>Cos</code>方法需要的参数的类型：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> paramTypes<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
paramTypes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Double&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>现在我们就可以传递方法的名字了，这个数组定义了<code>Type</code>对象中<code>GetMethod</code>方法的参数的类型：</p><p><code>MethodInfo CosineInfo=theMathType.GetMethod(&quot;Cos&quot;,paramTypes);</code></p><p>我们现在得到了<code>MethodInfo</code>类型的对象，我们可以在其上调用相应的方法。为此，我们需要再次在数组中传入参数的实际值：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Object<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Object</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
parameters<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">45</span><span class="token punctuation">;</span>
<span class="token class-name">Object</span> returnVal<span class="token operator">=</span>CosineInfo<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>theObj<span class="token punctuation">,</span> parameters<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>需要注意的是，我创建了二个数组，第一个名字为<code>paramTypes</code>的数组存储着参数的类型，第二个名字为<code>parameters</code>的数组保存实际的参数值。如果方法需要二个参数，我们就需要使这二个数组每个保持二个参数。如果方法不需要参数，我们仍然需要创建这二个数组，只是无需在里面存储数据即可。</p><p><code>Type[] paramTypes=new Type[0];</code></p><p>尽管看起来有点奇怪，但它是正确的。下面是完整的代码：</p><p>映射方法的使用</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Type</span> theMathType<span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Math&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> theObj<span class="token operator">=</span>Activator<span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span>theMathType<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//只有一个成员的数组</span>
        <span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> paramTypes<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        paramTypes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;System.Double&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//获得Cos()方法的信息</span>
        <span class="token class-name">MethodInfo</span> CosineInfo<span class="token operator">=</span>theMathType<span class="token punctuation">.</span><span class="token function">GetMethod</span><span class="token punctuation">(</span><span class="token string">&quot;Cos&quot;</span><span class="token punctuation">,</span>paramTypes<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//将实际的参数填写在一个数组中</span>
        <span class="token class-name">Object<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Object</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        parameters<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">45</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> returnVal<span class="token operator">=</span>CosineInfo<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>theObj<span class="token punctuation">,</span>parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The cosine of a 45 degree angle{0}&quot;</span><span class="token punctuation">,</span>returnVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>尽管有许多小错误等着C++编程人员去犯，但C#的语法与C++并没有太大的不同，向新语言的转换是相当容易的。使用C#的有趣的部分是使用通用语言运行库，这篇文章只能涉及几个重点问题。CLR和.NETFramework提供了对线程、集合、互联网应用开发、基于Windows的应用开发等方面提供了更多的支持。语言功能和CLR功能之间的区分是非常模糊的，但组合在一起就是一种功能非常强大的开发工具了。</p>`,247),o=[e];function c(u,l){return s(),a("div",null,o)}const i=n(p,[["render",c],["__file","cspbase9.html.vue"]]);export{i as default};
