import{_ as e,o as a,c as i,a as C}from"./app-57d1f7b1.js";const p={},t=C('<h1 id="第一章-c-简介" tabindex="-1"><a class="header-anchor" href="#第一章-c-简介" aria-hidden="true">#</a> 第一章 C#简介</h1><p>欢迎您加入C#的世界！ 这一章将把您引进C#的天地，并回答一些相关的问题，如：您为什么要使用C#，C++和C#的主要有什么不同点，以及为什么C#使开发更容易而且还使您感到很有趣。</p><p>为什么是另外一种编程语言?</p><p>必须回答的一个问题：当您已经使用C++或VB从事企业开发时，为什么还要学习另一种语言? 市场式的回答就是：&quot;在企业计算领域，C#将会变成为用于编写&quot;下一代窗口服务&quot;(Next Generation Windows Services,简写为NGWS )应用程序的主要语言。&quot; 这一章将对用参数请求提供支持，并陈列了C#的一些功能。这一章会使您开胃的。</p><p>C#语言自C/C++演变而来。但是，它现代、简单、完全面向对象和类型安全。如果您是C/C++程序员，学习曲线将会很平坦。许多C#语句直接借用您所喜爱的语言，包括表达式和操作符。假如不仔细看，简直会把它当成C++。</p><p>关于C#最重要的一点：它是现代的编程语言。它简化和现代化了C++在类、名字空间、方法重载和异常处理等领域。屏弃了C++的复杂性，使它更易用、更少出错。</p><p>对C#的易用有贡献的是减少了C++的一些特性，不再有宏、模板和多重继承。特别对企业开发者来说，上述功能只会产生更多的麻烦而不是效益。</p><p>使编程更方便的新功能是严格的类型安全、版本控制、垃圾收集(garbage collect)等等。所有的这些功能的目标都是瞄准了开发面向组件的软件。</p><p>在继续呈现出更多的功能之前，我想停下来并在下面说明C#至关重要的各种要素。</p><ul><li>简单</li><li>现代</li><li>面向对象</li><li>类型安全</li><li>版本控制</li><li>兼容</li><li>灵活</li></ul><h2 id="简单" tabindex="-1"><a class="header-anchor" href="#简单" aria-hidden="true">#</a> 简单</h2><p>C#具有C++所没有的一 个优势就是学习简单。该语言首要的目标就是简单。很多功能(还不如说是缺少了C++的一些功能)有助于C#全方位的简单。</p><p>在C#中，没有C++中流行的指针。默认地，您工作在受管理的代码中，在那里不允许如直接存取内存等不安全的操作。我想没有C++程序员可以声称，从没有使用指针访问过不属于他们的内存。</p><p>与指针&quot;戏剧性&quot;密切相关的是&quot;愚蠢的&quot;操作。在C++中，有::、.、和-&gt;操作符，它们用于名字空间、成员和引用。对于新手来说，操作符至今仍是学习的一道难关。C#弃用其它操作符，仅使用单个操作符 &quot;.&quot;。现在一个程序员所需要理解的就是嵌套名字的注解了。</p><p>您不必记住基于不同处理器架构的隐含的类型，甚至各种整型的变化范围。C#使用统一的类型系统，屏弃了C++多变的类型系统。这种系统充许您把各种类型作为一个对象查看，它是一个原始类型还是一个full-blown 类。和其它编程语言相比，由于加框(boxing)和消框(unboxing)的机制，把简单类型当作对象处理并不能获得性能的改善。稍后将详细解释加框和消框，但基本上仅当需要时才使用对象访问简单类型这种技术。</p><p>首先，老练的程序员可能不喜欢它，但是整型和布尔型如今终归是两种完全不同的数据类型。这就意味着原来if语句中错误的赋值现在会被编译出错，因为if语句只接受布尔类型的值。再也不会出现误用赋值符为比较符这样的错误！</p><p>C#同时也解决了存在于C++中已经有些年头的多余东西(redundancies)。这种多余包括常数预定义，不同字符类型等。鉴于多余表单已经从该语言中消失，故一般在C#中都可以使用表单了。</p><h2 id="现代" tabindex="-1"><a class="header-anchor" href="#现代" aria-hidden="true">#</a> 现代</h2><p>您投入学习C#的努力是一笔大投资，因为C#是为编写NGWS 应用程序的主要语言而设计。您 将会发现很多自己用C++可以实现或者很费力实现的功能，在C#中不过是一部分基本的功能而已。</p><p>对于企业级的编程语言来说，新增的金融数据类型很受欢迎。您用到了一种新的十进制数据类型，它专用于金融计算方面。如果不喜欢这种现成简单的类型，根据您应用程序的特殊需求，可以很容易地创建出新的一种数据类型。</p><p>我已经提到，指针不再是您编程武器的一部分。不要太惊讶，全面的内存管理已经不是您的任务。运行时NGWS提供了一个垃圾收集器，负责C#程序中的内存管理。因内存和应用程序都受到管理，所以很必要增强类型安全，以确保应用的稳定性。</p><p>对于C++程序员，异常处理的切不是新的东西，但它是C#的主要功能。C#的异常处理与C++的不同点在于它是交叉语言的(运行时的另一个功能)。在没有C#之前，您必须处理怪异的HRESULTs，但现在由于使用了基于异常的健壮的出错处理， 这一切都结束了。</p><p>对于现代的应用程序，安全是首要的，C#也不会例外。它提供了元数据语法，用于声明下述NGWS安全模式的能力和许可。元数据是NGWS运行时的一个关键的概念，下一章将涉及到它更深的含义。</p><h2 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h2><p>您不会预料一种新语言不支持面向对象的功能吧? C#当然支持所有关键的面向对象的概念，如封装、继承和多态性。完整的C#类模式构建在NGWS运行时的虚拟对象系统(VOS，Virtual Object System)的上层，VOS将在下章描述。对象模式只是基础的一部分，不再是编程语言的一部分。</p><p>您一开始必须关注的事，就是不再有全局函数、变量或者是常量。所有的东西都封装在类中，包括事例成员(通过类的事例--对象可以访问)或都静态成员(通过数据类型)。这些使C#代码更加易读且有助于减少潜在的命名冲突。</p><p>定义类中的方法默认是非虚拟的(它们不能被派生类改写)。主要论点是，这样会消除由于偶尔改写方法而导致另外一些原码出错。要改写方法，必须具有显式的虚拟标志。 这种行为不但缩减速了虚拟函数表，而且还确保正确版本的控制。</p><p>使用C++编写类，您可以使用访问权限(access modifiers) 给类成员设置不同的访问等级。C#同样支持private、protected 和public 三种访问权限 ，而且还增加了第四种：internal。有关访问权限 的详细情况将在第五章 &quot;类&quot; 中说明。</p><p>您曾经创建了多少个类是从多基类派生出来的(ATL 程序员，您的投票不计在内！) ? 大多数情况，仅需从一个类派生出。多基类惹出的麻烦通常比它们解决的问题还多。那就是为什么C#仅允许一个基类。如果您觉得需要多重继承，可以运用接口。</p><p>一个可能出现的问题：在C#中不存在指针，如何模仿它? 这个问题的答案很有代表性，它提供了对NGWS运行时事件模式的支持。再次，我将把对它的全面解释放到第五章。</p><h2 id="类型安全" tabindex="-1"><a class="header-anchor" href="#类型安全" aria-hidden="true">#</a> 类型安全</h2><p>我再次选指针作为一个例子。在C++中拥有一个指针，您能自由地把它强制转换成为任何类型，包括干出诸如把一个<code>int*</code>(整型指针)强制转换成一个<code>double *</code>(双精度指针)这样的傻事。只要内存支持这种操作，它就&quot;干过&quot;。这并不是您所想象的企业级编程语言的类型安全。</p><p>纲要性的问题，C#实施最严格的类型安全，以保护自己及垃圾收集器(garbage collector)。所以必须遵守C#中一些相关变量的规则：</p><ul><li>您不能使用没有初始化的变量。对于对象的成员变量，编译器负责清零。而局部变量，则由您负责清零。当您使用一个没有初始化的变量时，编译器会教您怎么做。优点是能够避免由于使用不经初始化的变量计算结果而导致的错误，而您还不知道这些奇怪的结果是如何产生的。</li><li>C#取消了不安全的类型转换。不能把一个整型强制转换成一个引用类型(如对象)，而当向下转换时，C#验证这种转换是正确的。(也就是说，派生类真的是从向下转换的那个类派生出来的。)</li><li>边界检查是C#的一部分。再也不会出现这种情况：当数组实际只定义了n-1个元素，却超额地使用了n个元素。</li><li>算术运算有可能溢出终值数据类型的范围。C#允许在语句级或应用程序级检测这些运算。在允许检测溢出的情况下，当溢出发生时将会抛出一个异常。</li><li>在C#中，被传递的引用参数是类型安全的。</li></ul><h2 id="版本可控-versionable" tabindex="-1"><a class="header-anchor" href="#版本可控-versionable" aria-hidden="true">#</a> 版本可控(Versionable)</h2><p>在过去的几年中，几乎所有的程序员都至少有一次不得不涉及到众所周知的&quot;DLL地狱&quot;。该问题起因于多个应用程序都安装了相同DLL名字的不同版本。有时，老版本的应用程序可以很好地和新版本的DLL一起工作，但是更多的时候它们会中断运行。现在的版本问题真是令人头痛。</p><p>就象您将在第八章&quot;用C#写组件&quot;所看到的，NGWS runtime 将对您所写的应用程序提供版本支持。C#可以最好地支持版本控制。尽管C#不能确保正确的版本控制，但是它可以为程序员保证版本控制成为可能。有这种支持，一个开发人员就可以确保当他的类库升级时，仍保留着对已存在的客户应用程序的二进制兼容。</p><h2 id="兼容" tabindex="-1"><a class="header-anchor" href="#兼容" aria-hidden="true">#</a> 兼容</h2><p>C#并没有存在于一个封闭的世界中。它允许使用最先进的NGWS的通用语言规定(Common Language Specification，简写为CLS)访问不同的API。CLS规定了一个标准，用于符合这种标准的语言的内部之间的操作。为了加强CLS的编译，C#编译器检测所有的公共出口编译，并在通不过时列出错误。</p><p>当然，您也想能够访问旧一点的COM对象。NGWS运行时提供对COM透明的访问。如何集成原来的代码将在第10章&quot;非管理代码的内部操作&quot;有介绍。</p><p>OLE 自动化是一种特殊的动物。任一个使用C++创建OLE自动化项目的人已经喜欢上各种各样的自动化数据类型。有个好消息就是C#支持它们，而没有烦锁的细节。</p><p>最后，C#允许您 用C 原型的API进持内部操作。可以从您的应用程序访问任何DLL中的入口点(有C的原型)。用于访问原始API的功能称作平台调用服务(Plaform Invocation Services ，缩写PInovke)，第10章将展示使用C API进行内部操作的一些例子。</p><h2 id="灵活" tabindex="-1"><a class="header-anchor" href="#灵活" aria-hidden="true">#</a> 灵活</h2><p>上一部分的最后一段有可能提醒了程序员。您可能会问：&quot;难道就没有我要传递指针的API吗?&quot; 您是正确的。不是仅有少数的这种API，而是很多(有点保守的估计)。这种对原始WIN32代码的访问有时导致对非安全类指定指针的使用(尽管它们中的一些由于受COM和PInvoke的支持可以解决)。</p><p>尽管C#代码的缺省状态是类型安全的，但是您可以声明一些类或者仅声明类的的方法是非安全类型的。这样的声明允许您使用指针、结构，静态地分配数组。安全码和非安全码都运行在同一个管理空间，这样暗示着当从安全码调用非安全码时不会陷入列集(marshaling)。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>C#语言从C和C++演变而来，它是给那些愿意牺牲C++一点底层功能，以获得更方便和更产品化的企业开发人员而创造的。C#现代、简单、面向对象和类型安全。尽管它借鉴了C和C++的许多东西，但是在一些诸如名字空间、类、方法和异常处理等特定领域，它们之间还存在着巨大的差异。</p><p>C#为您提供了方便的功能，如垃圾收集、类型安全、版本控制，等等。仅有的&quot;代价&quot;就是，代码操作默认是类型安全的，不允许指针。光是类型安全就可以搞定了。但是，如果您需要指针，仍可以通过非安全码使用它们，而且当调用非安全码时，不能含有列集。</p>',48),o=[t];function r(n,l){return a(),i("div",null,o)}const c=e(p,[["render",r],["__file","cspcls2_1.html.vue"]]);export{c as default};