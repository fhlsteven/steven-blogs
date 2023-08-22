import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t="/steven-blogs/assets/41_cs_1-014d0ca3.png",o={},e=p(`<h1 id="c-锐利体验" tabindex="-1"><a class="header-anchor" href="#c-锐利体验" aria-hidden="true">#</a> C#锐利体验</h1><p>发布日期： 2/4/2002 | 更新日期： 6/22/2004</p><p>南京邮电学院 李建忠（jzli@china.com）</p><p>C#语言是一门简单，现代，优雅，面向对象，类型安全，平台独立的一门新型组件编程语言。其语法风格源自C/C++家族，融合了Visual Basic的高效和C/C++强大，是微软为奠定其下一互联网霸主地位而打造的Microsoft.Net平台的主流语言。其一经推出便以其强大的操作能力，优雅的语法风格，创新的语言特性，第一等的面向组件编程的支持而深受世界各地程序员的好评和喜爱。“它就是我多年来梦寐以求的计算机语言！”--很多资深程序员拿到C#都是这样的惊讶。从C#语言的名字（C Sharp）我们也可见微软用其打造其下一代互联网络深度服务的勃勃雄心。C#语言目前已由微软提交欧洲计算机制造商协会ECMA，经过标准化后的C#将可由任何厂商在任何平台上实现其开发工具及其支持软件，这为C#的发展提供了强大的驱动力，我们也可从这里看到微软前所未有的眼光和智慧。</p><p>组件编程已经成为当今世界软件业面向下一代程序开发的一致选择，是90年代面向对象编程的深度发展。C#生逢其时，占尽天时地利，“第一等的面向组件编程的支持”也决不是简单说说那么轻松。实际上，组件特性已经深深植入C#语言的各个层面，是为C#锐利（Sharp）之处。在下面的文章中笔者将从C#语言的各个层面来展现C#语言中无处不见的组件特性，深度阐述C#面向组件编程。整个专题共分为十讲：“第一讲 ‘Hello,World！’程序”，“第二讲 C#语言基础介绍”，“第三讲 Microsoft.NET平台基础构造”，“第四讲 类与对象”，“第五讲 构造器与析构器”，“第六讲 方法”，“第七讲 域与属性”，“第八讲 索引器与操作符重载”，“第九讲 数组与字符串”，“第十讲 特征与映射”，“第十一讲 COM互操作 非托管编程与异常处理”，“第十二讲 用C#编织未来--C#编程模型概述”。</p><hr><p>本页内容</p><ul><li><a href="#first_class">第一讲 “Hello,World！”程序</a></li><li><a href="#sec_class">第二讲 C#语言基础介绍</a></li><li><a href="#third_class">第三讲 Microsoft.NET平台基础构造</a></li><li><a href="#fourth_class">第四讲 类与对象</a></li><li><a href="#fifth_class">第五讲 构造器与析构器</a></li><li><a href="#sixth_class">第六讲 方法</a></li><li><a href="#seventh_class">第七讲 域与属性</a></li><li><a href="#eighth_class">第八讲 索引器与操作符重载</a></li></ul><h2 id="第一讲-hello-world-程序" tabindex="-1"><a class="header-anchor" href="#第一讲-hello-world-程序" aria-hidden="true">#</a> <a id="first_class">第一讲 “Hello,World！”程序</a></h2><p>“Hello World!”程序是程序员一直以来的一个浪漫约定，也是一个伟大的梦想--总有一天，出自人类之手的计算机会面对这个美丽的世界说一声“Hello World!”。它是学习一门新语言的一个很好的起点，我们就从这里开始，看下面例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//HelloWorld.cs by Cornfield,2001</span>
<span class="token comment">//csc HelloWorld.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以打开Windows自带的简易的&quot;记事本&quot;程序来编写这段代码--笔者推荐刚开始采用这个极其简单却能把程序代码暴露的相当清晰的编辑工具。我们将它的文件名保存为<code>HelloWorld.cs</code>，其中&quot;.cs&quot;是C#源代码文件的扩展名。然后在配置好C#编译器的命令行环境里键入<code>&quot;csc HelloWorld.cs&quot;</code>编译文件。可以看到编译输出文件<code>HelloWorld.exe</code>。我们键入HelloWorld执行这个文件可得到下面的输出：</p><p><code>Hello World !</code></p><p>下面我们来仔细分析上面的代码和整个程序的编译输出及执行过程。先看文件开始的两行代码，这是C#语言的单行注释语句。和C++语言类似，C#支持两种注释方法：以&quot;//&quot;开始的单行注释和以&quot;/<em>&quot;，&quot;</em>/&quot;配对使用的多行注释。注释之间不能嵌套。</p><p>再来看下面的&quot;<code>using System;</code>&quot;语句，这是C#语言的using命名空间指示符，这里的&quot;System&quot;是Microsoft.NET系统提供的类库。C#语言没有自己的语言类库，它直接获取Microsoft.NET系统类库。Microsoft.NET类库为我们的编程提供了非常强大的通用功能。该语句使得我们可以用简短的别名&quot;<code>Console</code>&quot;来代替类型&quot;<code>System.Console</code>&quot;。当然<code>using</code>指示符并不是必须的，我们可以用类型的全局名字来获取类型。实际上，<code>using</code>语句采用与否根本不会对C#编译输出的程序有任何影响，它仅仅是简化了较长的命名空间的类型引用方式。</p><p>接着我们声明并实现了一个含有静态<code>Main()</code>函数的HelloWorld类。C#所有的声明和实现都要放在同一个文件里，不像C++那样可以将两者分离。Main()函数在C#里非常特殊，它是编译器规定的所有可执行程序的入口点。由于其特殊性，对<code>Main()</code>函数我们有以下几条准则：</p><ol><li><code>Main()</code>函数必须封装在类或结构里来提供可执行程序的入口点。C#采用了完全的面向对象的编程方式，C#中不可以有像C++那样的全局函数。</li><li><code>Main()</code>函数必须为静态函数(<code>static</code>)。这允许C#不必创建实例对象即可运行程序。</li><li><code>Main()</code>函数保护级别没有特殊要求， <code>public,protected,private</code>等都可，但一般我们都指定其为<code>public</code>。</li><li><code>Main()</code>函数名的第一个字母要大写，否则将不具有入口点的语义。C#是大小写敏感的语言。</li><li><code>Main()</code>函数的参数只有两种参数形式：无参数和<code>string</code> 数组表示的命令行参数，即<code>static void Main()</code>或<code>static void Main(string[]args)</code> ，后者接受命令行参数。一个C#程序中只能有一个<code>Main()</code>函数入口点。其他形式的参数不具有入口点语义，C#不推荐通过其他参数形式重载Main()函数，这会引起编译警告。</li><li><code>Main()</code>函数返回值只能为<code>void</code>(无类型)或<code>int</code>(整数类型)。其他形式的返回值不具有入口点语义。</li></ol><p>我们再来看&quot;HelloWorld.cs&quot;程序中<code>Main()</code>函数的内部实现。前面提过，<code>Console</code>是在命名空间<code>System</code>下的一个类，它表示我们通常打交道的控制台。而我们这里是调用其静态方法<code>WriteLine()</code>。如同C++一样，静态方法允许我们直接作用于类而非实例对象。<code>WriteLine()</code>函数接受字符串类型的参数&quot;Hello World !&quot;，并把它送入控制台显示。如前所述，C#没有自己的语言类库，它直接获取Microsoft.NET系统类库。我们这里正是通过获取Microsoft.NET系统类库中的<code>System.Console.WriteLine()</code>来完成我们想要的控制台输出操作。这样我们便完成了<code>&quot;Hello World!&quot;</code>程序。</p><p>但事情远没那么简单！在我们编译输出执行程序的同时，Microsoft.NET底层的诸多机制却在暗地里涌动，要想体验C#的锐利，我们没有理由忽视其背靠的Microsoft.NET平台。实际上如果没有Microsoft.NET平台，我们很难再说C#有何锐利之处。我们先来看我们对&quot;HelloWorld.cs&quot;文件用csc.exe命令编译后发生了什么。是的，我们得到了HelloWorld.exe文件。但那仅仅是事情的表象，实际上那个HelloWorld.exe根本不是一个可执行文件！那它是什么？又为什么能够执行？</p><p>好的，下面正是回答这些问题的地方。首先，编译输出的<code>HelloWorld.exe</code>是一个由中间语言（<code>IL</code>），元数据(Metadata)和一个额外的被编译器添加的目标平台的标准可执行文件头（比如Win32平台就是加了一个标准Win32可执行文件头）组成的PE（portable executable，可移植执行体）文件，而不是传统的二进制可执行文件--虽然他们有着相同的扩展名。中间语言是一组独立于CPU的指令集，它可以被即时编译器Jitter翻译成目标平台的本地代码。中间语言代码使得所有Microsoft.NET平台的高级语言C#,VB.NET，VC.NET等得以平台独立，以及语言之间实现互操作。元数据是一个内嵌于PE文件的表的集合。元数据描述了代码中的数据类型等一些通用语言运行时(Common Language Runtime)需要在代码执行时知道的信息。元数据使得.NET应用程序代码具备自描述特性，提供了类型安全保障，这在以前需要额外的类型库或接口定义语言（Interface Definition Language,简称IDL）。</p><p>这样的解释可能还是有点让人困惑，那么我们来实际的解剖一下这个PE文件。我们采用的工具是.NET SDK Beta2自带的ildasm.exe，它可以帮助我们提取PE文件中的有关数据。我们键入命令&quot;<code>ildasm /output:HelloWorld.il HelloWorld.exe</code>&quot;，一般可以得到两个输出文件：<code>helloworld.il</code>和<code>helloworld.res</code>。其中后者是提取的资源文件，我们暂且不管，我们来看<code>helloworld.il</code>文件。我们用&quot;记事本&quot;程序打开可以看到元数据和中间语言（IL）代码，由于篇幅关系，我们只将其中的中间语言代码提取出来列于下面，有关元数据的表项我们暂且不谈：</p><div class="language-IL" data-ext="IL"><pre class="language-IL"><code>class private auto ansi beforefieldinit HelloWorld
       extends [mscorlib]System.Object
{
  .method public hidebysig static void  Main() cil managed
  {
    .entrypoint
    // Code size       11 (0xb)
    .maxstack  8
    IL_0000:  ldstr      &quot;Hello World !&quot;
    IL_0005:  call       void [mscorlib]System.Console::WriteLine(string)
    IL_000a:  ret
  } // end of method HelloWorld::Main
  .method public hidebysig specialname rtspecialname 
          instance void  .ctor() cil managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void [mscorlib]System.Object::.ctor()
    IL_0006:  ret
  } // end of method HelloWorld::.ctor
} // end of class HelloWorld
</code></pre></div><p>我们粗略的感受是它很类似于早先的汇编语言，但它具有了对象定义和操作的功能。我们可以看到它定义并实现了一个继承自<code>System.Object</code> 的<code>HelloWorld</code>类及两个函数：<code>Main()</code>和<code>.ctor()</code>。其中<code>.ctor()</code>是<code>HelloWorld</code>类的构造函数，可在&quot;<code>HelloWorld.cs</code>&quot;源代码中我们并没有定义构造函数呀--是的，我们没有定义构造函数，但C#的编译器为我们添加了它。你还可以看到C#编译器也强制<code>HelloWorld</code>类继承<code>System.Object</code>类，虽然这个我们也没有指定。关于这些高级话题我们将在以后的讲座中予以剖析。</p><p>那么PE文件是怎么执行的呢？下面是一个典型的C#/.NET应用程序的执行过程：</p><ol><li>用户执行编译器输出的应用程序(PE文件)，操作系统载入PE文件，以及其他的DLL(.NET动态连接库)。</li><li>操作系统装载器根据前面PE文件中的可执行文件头跳转到程序的入口点。显然，操作系统并不能执行中间语言，该入口点也被设计为跳转到<code>mscoree.dll</code>（.NET平台的核心支持DLL）的_ CorExeMain()函数入口。</li><li><code>CorExeMain()</code>函数开始执行PE文件中的中间语言代码。这里的执行的意思是通用语言运行时按照调用的对象方法为单位，用即时编译器将中间语言编译成本地机二进制代码，执行并根据需要存于机器缓存。</li><li>程序的执行过程中，垃圾收集器负责内存的分配，释放等管理功能。</li><li>程序执行完毕，操作系统卸载应用程序。</li></ol><p>清楚的知晓编译输出的PE文件的执行过程是深度掌握C#语言编程的关键，这种过程的本身就诠释着C#语言的高级内核机制以及其背后Microsoft.NET平台种种诡秘的性质。一个&quot;Hello World !&quot;程序的概括力已经足够，在我们对C#语言有了一个很好的起点之后，下面的专题会和大家一起领略C#基础语言，窥探Microsoft.NET平台构造，步步体验C#锐利编程的极乐世界，Let&#39;s go!</p><h2 id="第二讲-c-语言基础介绍" tabindex="-1"><a class="header-anchor" href="#第二讲-c-语言基础介绍" aria-hidden="true">#</a> <a id="sec_class">第二讲 C#语言基础介绍</a></h2><p>在体验C#的锐利之前，关乎语言基本知识的掌握是必不可少的一环。由于C#基本语言很多源自C/C++，在这里对那些和C/C++类似的地方仅作简单介绍，我们将体验专注于那些区别于传统C/C++的关键的语言基础知识。</p><h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3><p>C#语言的数据类型主要分为两类：<strong>值类型</strong>和<strong>引用类型</strong>。另外一种数据类型&quot;指针&quot;是为<code>unsafe</code>上下文编程专门设定的，其中<code>unsafe</code>上下文指对代码进行unsafe标示以满足利用指针对内存直接进行操作要求的C#非托管代码，这些代码将失去Microsoft.NET平台的垃圾收集等CLR性质，我们放在&quot;COM互操作 非托管编程与异常处理&quot;专题里阐述。值类型的变量本身包含他们的数据，而引用类型的变量包含的是指向包含数据的内存块的引用或者叫句柄。从下面这幅图中可以清晰地看出两者的差别：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>int number               string literal

number                   literal
+---------------+        +---------------+
| · · · · · · · |        |               |
+---------------+        +---------------+
                                 |
                                 v
                         +--+--+---+--+--+---------+
                         |  |  |   |  |  | · · · · |
                         +--+--+---+--+--+---------+
</code></pre></div><p>引用类型带来的可能的问题便是当多个变量引用同样的内存块时，对任何一个引用变量的修改都会导致该对象的值的改变。<code>null</code>值表示引用类型没有对任何实际地址进行引用。</p><p>值类型可分为结构类型和枚举类型。结构类型包括简单类型和用户自定义结构类型。枚举类型和用户自定义结构类型我们将在&quot;第九讲 结构，枚举，数组与字符串&quot;专题里详细阐述。简单类型又可分为布尔类型和数值类型。C#语言中布尔类型严格与数值类型区分，只有<code>true</code>和<code>false</code>两种取值，不存在像C/C++里那样和其他类型之间的转换。数值类型包括整值，浮点和<code>decimal</code>三种类型。整值类型有<code>sbyte</code>，<code>byte</code>，<code>short</code>，<code>ushort</code>，<code>int</code>，<code>uint</code>，<code>long</code>，<code>ulong</code>，<code>char</code>共九种。除了<code>char</code>类型外，其他8种两两一组分别为有符号和无符号两种。浮点值有<code>float</code>和<code>double</code>两种。<code>decimal</code>主要用于金融，货币等对精度要求比较高的计算环境。下表是对这些简单类型的一个详细的描述：</p><table><thead><tr><th>简单类型</th><th>描 述</th><th>示 例</th></tr></thead><tbody><tr><td><code>sbyte</code></td><td>8-bit 有符号整数</td><td><code>sbyte val = 12;</code></td></tr><tr><td><code>short</code></td><td>16-bit 有符号整数</td><td><code>short val = 12;</code></td></tr><tr><td><code>int</code></td><td>32-bit有符号整数</td><td><code>int val = 12;</code></td></tr><tr><td><code>long</code></td><td>64-bit有符号整数</td><td><code>long val1 = 12; long val2 = 34L;</code></td></tr><tr><td><code>byte</code></td><td>8-bit无符号整数</td><td><code>byte val1 = 12; byte val2 = 34U;</code></td></tr><tr><td><code>ushort</code></td><td>16-bit 无符号整数</td><td><code>ushort val1 = 12; ushort val2 = 34U;</code></td></tr><tr><td><code>uint</code></td><td>32-bit 无符号整数</td><td><code>uint val1 = 12; uint val2 = 34U;</code></td></tr><tr><td><code>ulong</code></td><td>64-bit 无符号整数</td><td><code>ulong val1 = 12; ulong val2 = 34U; ulong val3 = 56L; ulong val4 = 78UL;</code></td></tr><tr><td><code>float</code></td><td>32-bit单精度浮点数</td><td><code>float val = 1.23F;</code></td></tr><tr><td><code>double</code></td><td>64-bit双精度浮点数</td><td><code>double val1 = 1.23; double val2 = 4.56D;</code></td></tr><tr><td><code>bool</code></td><td>布尔类型</td><td><code>bool val1 = true; bool val2 = false;</code></td></tr><tr><td><code>char</code></td><td>字符类型 ，Unicode 编码</td><td><code>char val = &#39;h&#39;;</code></td></tr><tr><td><code>decimal</code></td><td>28个有效数字的128-bit十进制类型</td><td><code>decimal val = 1.23M;</code></td></tr></tbody></table><p>引用类型共分四种类型：类，接口，数组，委派。类除了我们可以定义自己的类型外，又包括两个比较特殊的类型<code>object</code>和<code>string</code>。<code>object</code>是C#中所有类型（包括所有的值类型和引用类型）的继承的根类。<code>string</code>类型是一个密封类型（不能被继承），其实例表示Unicode字符串，它和数组类型我们将放在&quot;第九讲 结构，枚举，数组与字符串&quot;中详述。接口类型定义一个方法的合同，我们将在&quot;第七讲 接口 继承与多态&quot;中讲述。委派类型是一个指向静态或实例方法的签名，类似于C/C++中的函数指针，将在&quot;第八讲 委派与事件&quot;中讲述。实际上我们将从后面的专题中看到这些类型都是类的某种形式的包装。</p><p>每种数据类型都有对应的缺省值。数值类型的缺省值为<code>0</code>或<code>0.0</code>，其中<code>char</code>的缺省为<code>&#39;\\x0000&#39;</code>。布尔类型的缺省值为<code>false</code>。枚举类型的缺省值为0。结构类型的缺省值是将它所有的值类型的域设置为对应值类型的缺省值，将其引用类型的域设置为<code>null</code>。所有引用类型的缺省值为<code>null</code>。</p><p>不同类型的数据之间可以转换，C#的类型转换有<strong>隐含转换</strong>，<strong>明晰转换</strong>，<strong>标准转换</strong>，<strong>自定义转换</strong>共四种方式。隐含转换与明晰转换和C++里一样，数据从&quot;小类型&quot;到&quot;大类型&quot;的转换时为隐含转换，从&quot;大类型&quot;到&quot;小类型&quot;的转换为明晰转换，明晰转换需要如&quot;（Type）data&quot;一般的括号转换操作符。标准转换和自定义转换是针对系统内建转换和用户定义的转换而言的，两者都是对类或结构这样的自定义类型而言的。</p><h3 id="变量与常量" tabindex="-1"><a class="header-anchor" href="#变量与常量" aria-hidden="true">#</a> 变量与常量</h3><p>变量表示存储位置，变量必须有确定的数据类型。C#的类型安全的含义之一就是确保变量的存储位置容纳着合适的类型。可以将C#中的变量分为静态变量，实例变量，传值参数，引用参数，输出参数，数组参数和本地变量共七种。本地变量则是在方法体内的临时变量。</p><p>静态变量和实例变量主要是针对类或结构内的数据成员（又叫域）而言的。静态变量在它寄存的类或结构类型被装载后得到存储空间，如果没有对它进行初始化赋值，静态变量的初始值将是它的类型所持有的缺省值。实例变量在它的类实例被创建后获得存储空间，如果没有经过初始化赋值，它的初始值与静态变量的定义相同。两者更详细的说明我们放在&quot;第六讲 域 方法 属性与索引器&quot;专题里。</p><p>传值参数，引用参数，输出参数，数组参数主要针对方法的参数类型而言的。简单的讲传值参数是对变量的值的一种传递，方法内对变量的改变在方法体外不起作用。对于传值参数本身是引用型的变量稍有不同，方法内对该引用（句柄）变量指向的数据成员即实际内存块的改变将在方法体外仍然保留改变，但对于引用（句柄）本身的改变不起作用。引用参数是对变量的句柄的一种传递，方法内对该变量的任何改变都将在方法体外保留。输出参数是C#专门为有多个返回值的方法而量身定做的，它类似于引用变量，但可以在进入方法体之前不进行初始化，而其他的参数在进入方法体内C#都要求明确的初始化。数组参数是为传递大量的数组元素而专门设计的，它从本质上讲是一种引用型变量的传值参数。它们更详细的阐述我们也放在&quot;第六讲 域 方法 属性与索引器&quot;专题里。</p><p>本地变量严格的讲是在C#的块语句，<code>for</code>语句，<code>switch</code>语句，<code>using</code>语句内声明的变量，它的生命周期严格地被限制在这些语句块内部。</p><p>常量在编译时便确定它的值，在整个程序中也不许修改。常量声明的同时必须赋值。由于它的编译时确定值的特性，引用类型可能的值只能为<code>string</code>和<code>null</code>（除<code>string</code>外，引用类型的构建器必须在运行时才能确定引用类型的值）。</p><h3 id="操作符与表达式" tabindex="-1"><a class="header-anchor" href="#操作符与表达式" aria-hidden="true">#</a> 操作符与表达式</h3><p>C#保留了C++所有的操作符，其中指针操作符（*和-&gt;）与引用操作符（&amp;）需要有unsafe的上下文。C#摈弃了范围辨析操作符（：：），一律改为单点操作符（.）。我们不再阐述那些保留的C++的操作符，这里主要介绍C#引入的具有特殊意义的几个操作符：<code>as</code>，<code>is</code>，<code>new</code>， <code>typeof</code>，<code>sizeof</code>，<code>stackalloc</code>。</p><p><code>as</code>操作符用于执行兼容类型之间的转换，当转换失败时，<code>as</code> 操作符结果为<code>null</code>。<code>is</code> 操作符用于检查对象的运行时类型是否与给定类型兼容，当表达式非<code>null</code>且可以转化为指定类型时，<code>is</code>操作符结果为<code>true</code>，否则为<code>false</code>。<code>as</code>和<code>is</code>操作符是基于同样的类型鉴别和转换而设计的，两者有相似的应用场合。实际上<code>expression as type</code>相当于<code>expression is type ? (type)expression : (type)null</code>。</p><p>作为操作符的<code>new</code>用于在堆上创建对象和调用构造函数，值得注意的是值类型对象（例如结构）是在堆栈上创建的，而引用类型对象（例如类）是在堆上创建的。new也用于修饰符，用于隐藏基类成员的继承成员。为隐藏继承的成员，使用相同名称在派生类中声明该成员并用 <code>new</code> 修饰符修改它。typeof 运算符用于获得某一类型的 <code>System.Type</code> 对象,我们将在&quot;第十讲 特征与映射&quot;里结合Microsoft.NET的类型系统对它作详细的阐述。<code>sizeof</code> 运算符用于获得值类型（不适用于引用类型）的大小（以字节为单位）。stackalloc用于在堆栈上分配内存块, 仅在局部变量的初始值设定项中有效，类似于C/C++语言的_alloca。<code>sizeof</code>和<code>statckalloc</code>都由于涉及内存的直接操作而需要unsafe上下文。</p><p>C#里的某些操作符可以像C++里那样被重载。操作符重载使得自定义类型（类或结构）可以用简单的操作符来方便的表达某些常用的操作。</p><p>为完成一个计算结果的一系列操作符和操作数的组合称为表达式。和C++一样，C#的表达式可以分为赋值表达式和布尔表达式两种，C#没有引入新的表达式形式，我们对此不再赘述。</p><h3 id="命名空间与语句" tabindex="-1"><a class="header-anchor" href="#命名空间与语句" aria-hidden="true">#</a> 命名空间与语句</h3><p>C#采用命名空间（namespace）来组织程序。命名空间可以嵌套。<code>using</code>指示符可以用来简化命名空间类型的引用。<code>using</code>指示符有两种用法。&quot;using System;&quot;语句可以使我们用简短的类型名&quot;Console&quot;来代替类型&quot;System.Console&quot;。&quot;<code>using Output = System.Console;</code>&quot;语句可以使我们用别名&quot;Output&quot;来代替类型&quot;System.Console&quot;。命名空间的引入大大简化了C#程序的组织方式。</p><p>C#语句可以分为标号语句，声明语句，块语句，空语句，表达式语句，选择语句，反复语句，跳转语句，try语句，checked/unchecked语句，lock语句，using语句。</p><p>标号语句主要为goto跳转设计，C#不允许跨方法的跳转，但允许小规模的方法内的跳转。声明语句可以同时进行初始化赋值，对象的实例化声明需要new关键字。块语句采用&quot;{&quot;和&quot;}&quot;定义语句块，主要是界定局部变量的作用范围。空语句在C#中用分号&quot;；&quot;表示，没有执行语义。表达式语句通过表达式构成语句。</p><p>选择语句有<code>if</code>语句和<code>switch</code>语句两种，与C++别无二致。反复语句除了<code>while</code>,<code>do</code>,<code>for</code>三种循环结构外引入了<code>foreach</code>语句用于遍历集合中所有的元素，但这需要特定的接口支持，我们在后面的章节里对之作详细阐述。</p><p>跳转语句有<code>break</code>，<code>continue</code>，<code>goto</code>，<code>return</code>，<code>throw</code>五种语句，前四种与C++里的语义相同，throw语句与后面的try语句我们将在&quot;第十一讲 COM互操作 非托管编程与异常处理&quot;阐述。</p><p><code>checked/unchecked</code>语句主要用于数值运算中溢出检查的上下文。<code>lock</code>语句主要用于线程信号量的锁控制。<code>using</code>语句主要用于片断资源管理。这些我们在后续章节里都会有具体的涉及。</p><h2 id="第三讲-microsoft-net平台基础构造" tabindex="-1"><a class="header-anchor" href="#第三讲-microsoft-net平台基础构造" aria-hidden="true">#</a> <a id="third_class">第三讲 Microsoft.NET平台基础构造</a></h2><p>抛开Microsoft.NET平台去谈C#是没有意义的，C#之“Sharp”也正在其后端强大的平台。仅仅拘泥于语法层面是体验不了C#的锐利之处的，C#程序很多诡秘之处必须依靠Microsoft.NET平台才能深度的掌握和运用。简单的讲，Microsoft.NET平台是一个建立在开放互联网络协议和标准之上，采用新的工具和服务来满足人们的计算和通信需求的革命性的新型XML Web智能计算服务平台。它允许应用程序在因特网上方便快捷地互相通信，而不必关心使用何种操作系统和编程语言。</p><p>从技术层面具体来说，Microsoft.NET平台主要包括两个内核，即通用语言运行时（Common Language Runtime,简称CLR）和Microsoft.NET框架类库,它们为Microsoft.NET平台的实现提供了底层技术支持。通用语言运行时是建立在操作系统最底层的服务，为Microsoft.NET平台的执行引擎。Microsoft.NET框架包括一套可被用于任何编程语言的类库，其目的是使得程序员更容易地建立基于网络的应用和服务。在此之上是许多应用程序模板，这些模板为开发网络应用和服务提供高级的组件和服务。Microsoft.NET平台之浩瀚绝非这里的几千字能够廓清，我们下面将着重体验那些对我们用C#开发应用程序至关重要的平台基础构造。</p><h3 id="通用语言运行时-clr" tabindex="-1"><a class="header-anchor" href="#通用语言运行时-clr" aria-hidden="true">#</a> 通用语言运行时(CLR)</h3><p>通用语言运行时是整个Microsoft.NET框架赖以建构的基础，它为Microsoft.NET应用程序提供了一个托管的代码执行环境。它实际上是驻留在内存里的一段代理代码，负责应用程序在整个执行期间的代码管理工作，比较典型的有：内存管理，线程管理，安全管理，远程管理，即时编译，代码强制安全类型检查等。这些都可称得上Microsoft.NET框架的生命线。</p><p>实际上我们可以看出来，CLR代理了一部分传统操作系统的管理功能。在CLR下的代码称之为托管代码，否则称为非托管代码。我们也可将CLR看作一个技术规范，无论程序使用什么语言编写，只要能编译成微软中间语言 (MSIL)，就可以在它的支持下运行，这使得应用程序得以独立于语言。目前支持CLR的编程语言多达二三十种。微软中间语言是我们在Microsoft.NET平台下编译器输出的PE文件的语言。它是Microsoft.NET平台最完整的语言集，非常类似于PC机上的汇编语言。即时编译器在运行时将中间语言编译成本地二进制代码。它为Microsoft.NET平台提供了多语言的底层技术支持。另外根据需要，Microsoft.NET即时编译器提供了特殊情况下的经济型即时编译和安装时编译技术。</p><p>CLR的设计目的便是直接在应用程序运行环境中为基于组件的编程提供第一等的支持。正如在Windows中添加了对窗口、控件、图形和菜单的直接支持，为基于消息的编程添加了底层结构，为支持设备无关性添加了抽象内容一样，CLR直接支持组件（包括属性和事件）、对象、继承性、多态性和接口。对属性和事件的直接支持使得基于组件的编程变得更简单，而不需要特殊的接口和适配设计模式。在组件运行时，CLR负责管理内存分配、启动和中止线程和进程、强化安全系数，同时还调整任何该组件涉及到的其他组件的附属配置。序列化支持允许以多种格式操作存储在磁盘上的组件，包括基于业界标准XML的SOAP。CLR提供了处理错误条件的有力、协调的方式。每个模块都具有内置的完整的元数据，这意味着诸如动态创建和方法调用之类的功能更容易，也更安全。映射甚至允许我们灵活地创建和执行代码。我们可以控制应用程序使用的组件的版本，这使应用程序更加可靠。组件代码是与处理器无关的和易于验证的中间语言 ( IL)，而不是某一种特定的机器语言，这意味着组件不但可以在多种计算机上运行，而且可以确保组件不会覆盖它们不使用的内存，也不会潜在地导致系统崩溃。CLR根据托管组件的来源（例如来自因特网，企业局域网，本地机）等因素对他们判定以适当的信任度，这样CLR会根据他们的信任度来限定他们执行如读取文件，修改注册表等某些敏感操作的权限。借助通用类型系统（Common Type System,简称CTS）对代码类型进行严格的安全检查避免了不同组件之间可能存在的类型不匹配的问题。CLR下的编程全部是围绕组件进行的。</p><p>值得指出的是CLR通常寄宿在其他高性能的服务器应用程序中，比如：因特网信息服务器（IIS）,Microsoft SQL Server。这使得我们可以充分利用通用语言运行时诸多的安全，高效的优点来部署自己的商业逻辑。</p><h3 id="内存管理" tabindex="-1"><a class="header-anchor" href="#内存管理" aria-hidden="true">#</a> 内存管理</h3><p>CLR对程序员影响最大的就是它的内存管理功能,以至于我们很有必要单独把它列出来阐述。它为应用程序提供了高性能的垃圾收集环境。垃圾收集器自动追踪应用程序操作的对象，程序员再也用不着和复杂的内存管理打交道。这在某些喜欢张口闭口底层编程的所谓的高手来说，自动内存管理从来都是他们嘲笑的对象。的确，为通用软件环境设计的自动化内存管理器永远都抵不上自己为特定程序量身订制的手工制作。但现代软件业早已不再是几百行代码的作坊作业，动辄成千上万行的代码，大量的商业逻辑凸现的已不再是算法的灵巧，而是可管理性，可维护性的工程代码。.NET/C#不是为那样的作坊高手准备的，C语言才是他们的尤物。在Microsoft.NET托管环境下，CLR负责处理对象的内存布局，管理对象的引用，释放系统不再使用的内存（自动垃圾收集）。这从根本上解决了长期以来困扰软件的内存泄漏和无效内存引用问题，大大减轻了程序员的开发负担，提高了程序的健壮性。实际上我们在托管环境下根本找不到关于内存操作或释放的语言指令。值得指出的是Microsoft.NET应用程序可以使用托管数据，也可以使用非托管数据，但CLR并不能判断托管数据与非托管数据。</p><p>垃圾收集器负责管理.NET应用程序内存的分配和释放。当用new操作符创建新的对象时，垃圾收集器在托管堆（Managed Heap）中为对象分配内存资源。只要托管堆内的内存空间可用，垃圾收集器就为每一个新创建的对象分配内存。当应用程序不再持有某个对象的引用，垃圾收集器将会探测到并释放该对象。值得注意的是垃圾收集器并不是在对象引用无效时就立即开始释放工作，而是根据一定算法来决定什么时候进行收集和对什么对象进行收集。任何一个机器的内存资源总是有限的，当托管堆内的内存空间不够用时，垃圾收集器启动收集线程来释放系统内存。垃圾收集器根据对象的存活时间，对象历经的收集次数等来决定对哪些对象的内存进行释放。宏观的看，我们并不知道垃圾收集的确切行为，但Microsoft.NET类库为我们提供了控制垃圾收集行为的部分功能，在某些特殊情况下，我们有必要进行一些受限的操作。</p><p>垃圾收集器并不意味着程序员从此可以一劳永逸，如果正在操作一个包装了如文件，网络连接，Windows句柄，位图等底层操作系统资源的对象，我们还是需要明确地释放这些非托管资源的。这在“第五讲 构造器与析构器”里有详细的阐述。</p><h3 id="microsoft-net框架类库" tabindex="-1"><a class="header-anchor" href="#microsoft-net框架类库" aria-hidden="true">#</a> Microsoft.NET框架类库</h3><p>Microsoft.NET框架类库是一组广泛的，面向对象的可重用类的集合，为应用程序提供各种高级的组件和服务。它将程序员从繁重的编程细节中解放出来专注于程序的商业逻辑，为应用程序提供各种开发支持--不管是传统的命令行程序还是Windows图形界面程序，拟或是面向下一代因特网分布式计算平台的ASP.NET或XML Web服务。下面是对这些组件和服务的一个概括。</p><ul><li>系统框架服务</li></ul><p>服务框架包括一套开发人员希望在标准语言库中存在的基类库，例如：集合、输入/输出，字符串及数据类。另外，基类库提供访问操作系统服务如图画、网络、线程、全球化和加密的类。服务框架也包括数据访问类库，及开发工具，如调试和剖析服务，能够使用的类。</p><ul><li>ADO.NET组件</li></ul><p>ADO.NET为基于网络的可扩展的应用程序和服务提供数据访问服务。ADO.NET不仅支持传统的基于连接指针风格的数据访问，同时也为更适合于把数据返回到客户端应用程序的无连接的数据模板提供高性能的访问支持。</p><ul><li>XML数据组件</li></ul><p>所有的数据都可被看作XML，开发人员可以通过XML为任何数据使用转换，传输和确认服务。系统框架对XML数据提供第一等的操作支持。系统也支持ADO.NET数据与XML数据之间的通用转换。</p><ul><li>Windows表单组件</li></ul><p>Windows表单组件为开发人员提供了强大的Windows应用程序模型和丰富的Windows用户接口，包括传统的ActiveX控件和Windows XP的新界面，如透明的、分层的、浮动窗口。对设计时的强大支持也是Windows表单组件令人兴奋的地方。</p><ul><li>ASP.NET应用服务</li></ul><p>ASP.NET的核心是高性能的用于处理基于低级结构的HTTP请求的运行语言。编译运行方式大大提高了它的性能。ASP.NET使用基于构件的Microsoft .NET框架配制模板，因此它获得了如XCOPY配制、构件并行配制、基于XML配制等优点。它支持应用程序的实时更新，提供高速缓冲服务改善性能。</p><ul><li>ASP.NET Web表单</li></ul><p>ASP.NET Web表单把基于VB的表单的高生产性的优点带到了网络应用程序的开发中来。ASP.NET Web表单支持传统的将HTML内容与角本代码混合的ASP语法，但是它提出了一种将应用程序代码和用户接口内容分离的更加结构化的方法。ASP.NET提供了一套映射传统的HTML用户接口部件（包括列表框，文本框和按钮）的ASP.NET Web表单控件和一套更加复杂强大的网络应用控件（如日历和广告转板）。</p><ul><li>XML Web服务</li></ul><p>ASP.NET应用服务体系架构为用ASP.NET建立XML Web服务提供了一个高级的可编程模板。虽然建立XML Web服务并不限定使用特定的服务平台，但是它提供许多的优点将简化开发过程。使用这个编程模型，开发人员甚至不需要理解HTTP、SOAP或其它任何网络服务规范。 ASP.NET XML Web服务为在Internet上绑定应用程序提供了一个利用现存体系架构和应用程序的简单的、灵活的、基于产业标准的模型。</p><h2 id="第四讲-类与对象" tabindex="-1"><a class="header-anchor" href="#第四讲-类与对象" aria-hidden="true">#</a> <a id="fourth_class">第四讲 类与对象</a></h2><p>组件编程不是对传统面向对象的抛弃，相反组件编程正是面向对象编程的深化和发展。类作为面向对象的灵魂在C#语言里有着相当广泛深入的应用，很多非常“Sharp”的组件特性甚至都是直接由类包装而成。对类的深度掌握自然是我们“Sharp XP”重要的一环。</p><h3 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h3><p>C#的类是一种对包括数据成员，函数成员和嵌套类型进行封装的数据结构。其中数据成员可以是常量，域。函数成员可以是方法，属性，索引器，事件，操作符，实例构建器，静态构建器，析构器。我们将在“第五讲 构造器与析构器”和“第六讲 域 方法 属性与索引器”对这些成员及其特性作详细的剖析。除了某些导入的外部方法，类及其成员在C#中的声明和实现通常要放在一起。</p><p>C#用多种修饰符来表达类的不同性质。根据其保护级C#的类有五种不同的限制修饰符：</p><ol><li><code>public</code>可以被任意存取；</li><li><code>protected</code>只可以被本类和其继承子类存取；</li><li><code>internal</code>只可以被本组合体（Assembly）内所有的类存取，组合体是C#语言中类被组合后的逻辑单位和物理单位，其编译后的文件扩展名往往是“.DLL”或“.EXE”。</li><li><code>protected internal</code>唯一的一种组合限制修饰符，它只可以被本组合体内所有的类和这些类的继承子类所存取。</li><li><code>private</code>只可以被本类所存取。</li></ol><p>如果不是嵌套的类，命名空间或编译单元内的类只有<code>public</code>和<code>internal</code>两种修饰。</p><p><code>new</code>修饰符只能用于嵌套的类，表示对继承父类同名类型的隐藏。</p><p><code>abstract</code>用来修饰抽象类，表示该类只能作为父类被用于继承，而不能进行对象实例化。抽象类可以包含抽象的成员，但这并非必须。<code>abstract</code>不能和<code>new</code>同时用。下面是抽象类用法的伪码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">A</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">C</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">B</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        <span class="token comment">//方法F的实现</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>抽象类<code>A</code>内含一个抽象方法<code>F()</code>，它不能被实例化。类<code>B</code>继承自类<code>A</code>，其内包含了一个实例方法<code>G()</code>,但并没有实现抽象方法<code>F()</code>，所以仍然必须声明为抽象类。类C继承自类<code>B</code>，实现类抽象方法<code>F()</code>，于是可以进行对象实例化。</p><p><code>sealed</code>用来修饰类为密封类，阻止该类被继承。同时对一个类作<code>abstract</code>和<code>sealed</code>的修饰是没有意义的，也是被禁止的。</p><h3 id="对象与this关键字" tabindex="-1"><a class="header-anchor" href="#对象与this关键字" aria-hidden="true">#</a> 对象与<code>this</code>关键字</h3><p>类与对象的区分对我们把握OO编程至关重要。我们说类是对其成员的一种封装，但类的封装设计仅仅是我们编程的第一步，对类进行对象实例化，并在其数据成员上实施操作才是我们完成现实任务的根本。实例化对象采用<code>MyClass myObject=new MyClass()</code>语法，这里的new语义将调用相应的构建器。C#所有的对象都将创建在托管堆上。实例化后的类型我们称之为对象，其核心特征便是拥有了一份自己特有的数据成员拷贝。这些为特有的对象所持有的数据成员我们称之为实例成员。相反那些不为特有的对象所持有的数据成员我们称之为静态成员，在类中用<code>static</code>修饰符声明。仅对静态数据成员实施操作的称为静态函数成员。C#中静态数据成员和函数成员只能通过类名引用获取，看下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">A</span> a2<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a1<span class="token punctuation">.</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a1<span class="token punctuation">.</span>count<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        a2<span class="token punctuation">.</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a2<span class="token punctuation">.</span>count<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
        A<span class="token punctuation">.</span>name<span class="token operator">=</span><span class="token string">&quot;CCW&quot;</span><span class="token punctuation">;</span>
        A<span class="token punctuation">.</span><span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们声明了两个<code>A</code>对象<code>a1</code>,<code>a2</code>。对于实例成员<code>count</code>和<code>F()</code>，我们只能通过<code>a1</code>,<code>a2</code>引用。对于静态成员<code>name</code>和<code>G()</code>我们只能通过类型<code>A</code>来引用，而不可以这样<code>a1.name</code>，或<code>a1.G()</code>。</p><p>在上面的程序中，我们看到在实例方法<code>F()</code>中我们才用<code>this</code>来引用变量<code>count</code>。这里的<code>this</code>是什么意思呢？<code>this</code> 关键字引用当前对象实例的成员。在实例方法体内我们也可以省略<code>this</code>，直接引用<code>count</code>，实际上两者的语义相同。理所当然的，静态成员函数没有 <code>this</code> 指针。<code>this</code> 关键字一般用于从构造函数、实例方法和实例访问器中访问成员。</p><p>在构造函数中<code>this</code>用于限定被相同的名称隐藏的成员，例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Employee</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Employee</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> <span class="token keyword">alias</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">alias</span> <span class="token operator">=</span> <span class="token keyword">alias</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>将对象作为参数传递到其他方法时也要用<code>this</code>表达，例如：</p><p><code>CalcTax(this);</code></p><p>声明索引器时<code>this</code>更是不可或缺，例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token keyword">this</span> <span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> param<span class="token punctuation">]</span>
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> array<span class="token punctuation">[</span>param<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        array<span class="token punctuation">[</span>param<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="system-object类" tabindex="-1"><a class="header-anchor" href="#system-object类" aria-hidden="true">#</a> <code>System.Object</code>类</h3><p>C#中所有的类都直接或间接继承自<code>System.Object</code>类，这使得C#中的类得以单根继承。如果我们没有明确指定继承类，编译器缺省认为该类继承自<code>System.Object</code>类。<code>System.Object</code>类也可用小写的<code>object</code>关键字表示，两者完全等同。自然C#中所有的类都继承了<code>System.Object</code>类的公共接口，剖析它们对我们理解并掌握C#中类的行为非常重要。下面是仅用接口形式表示的<code>System.Object</code>类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">System</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Object</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Equals</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> objA<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">object</span></span> objB<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ReferenceEquals</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> objA<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">object</span></span> objB<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token function">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Equals</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetHashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name">Type</span> <span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">protected</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">MemberwiseClone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们先看<code>object</code>的两个静态方法<code>Equals(object objA,object objB)</code>，<code>ReferenceEquals(object objA,object objB)</code>和一个实例方法<code>Equals(object obj)</code>。在我们阐述这两个方法之前我们首先要清楚面向对象编程两个重要的相等概念：值相等和引用相等。值相等的意思是它们的数据成员按内存位分别相等。引用相等则是指它们指向同一个内存地址，或者说它们的对象句柄相等。引用相等必然推出值相等。对于值类型关系等号“= =”判断两者是否值相等（结构类型和枚举类型没有定义关系等号“= =”，我们必须自己定义）。对于引用类型关系等号“= =”判断两者是否引用相等。值类型在C#里通常没有引用相等的表示，只有在非托管编程中采用取地址符“&amp;”来间接判断二者的地址是否相等。</p><p>静态方法<code>Equals(object objA,object objB)</code>首先检查两个对象<code>objA</code>和<code>objB</code>是否都为<code>null</code>，如果是则返回<code>true</code>，否则进行<code>objA.Equals(objB)</code>调用并返回其值。问题归结到实例方法<code>Equals(object obj)</code>。该方法缺省的实现其实就是<code>{return this= =obj;}</code>也就是判断两个对象是否引用相等。但我们注意到该方法是一个虚方法，C#推荐我们重写此方法来判断两个对象是否值相等。实际上Microsoft.NET框架类库内提供的许多类型都重写了该方法，如：<code>System.String（string），System.Int32（int）</code>等，但也有些类型并没有重写该方法如：<code>System.Array</code>等，我们在使用时一定要注意。对于引用类型，如果没有重写实例方法<code>Equals(object obj)</code>，我们对它的调用相当于<code>this= =obj</code>，即引用相等判断。所有的值类型（隐含继承自<code>System.ValueType</code>类）都重写了实例方法<code>Equals(object obj)</code>来判断是否值相等。</p><p>注意对于对象<code>x</code>，<code>x.Equals(null)</code>返回<code>false</code>，这里<code>x</code>显然不能为<code>null</code>（否则不能完成<code>Equals()</code>调用，系统抛出空引用错误）。从这里我们也可看出设计静态方法<code>Equals(object objA,object objB)</code>的原因了--如果两个对象<code>objA</code>和<code>objB</code>都可能为<code>null</code>，我们便只能用<code>object.Equals(object objA,object objB)</code>来判断它们是否值相等了--当然如果我们没有改写实例方法<code>Equals(object obj)</code>，我们得到的仍是引用相等的结果。我们可以实现接口<code>IComparable</code>（有关接口我们将在“第七讲 接口 继承与多态”里阐述）来强制改写实例方法<code>Equals(object obj)</code>。</p><p>对于值类型，实例方法<code>Equals(object obj)</code>应该和关系等号“= =”的返回值一致，也就是说如果我们重写了实例方法<code>Equals(object obj)</code>，我们也应该重载或定义关系等号“= =”操作符，反之亦然。虽然值类型（继承自<code>System.ValueType</code>类）都重写了实例方法<code>Equals(object obj)</code>，但C#推荐我们重写自己的值类型的实例方法<code>Equals(object obj)</code>，因为系统的<code>System.ValueType</code>类重写的很低效。对于引用类型我们应该重写实例方法<code>Equals(object obj)</code>来表达值相等，一般不应该重载关系等号“= =”操作符，因为它的缺省语义是判断引用相等。</p><p>静态方法<code>ReferenceEquals(object objA,object objB)</code>判断两个对象是否引用相等。如果两个对象为引用类型，那么它的语义和没有重载的关系等号“= =”操作符相同。如果两个对象为值类型，那么它的返回值一定是<code>false</code>。</p><p>实例方法<code>GetHashCode()</code>为相应的类型提供哈希（hash）码值，应用于哈希算法或哈希表中。需要注意的是如果我们重写了某类型的实例方法<code>Equals(object obj)</code>，我们也应该重写实例方法<code>GetHashCode()</code>--这理所应当，两个对象的值相等，它们的哈希码也应该相等。下面的代码是对前面几个方法的一个很好的示例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">C</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> integer <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Equals</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">C</span> c <span class="token operator">=</span> obj <span class="token keyword">as</span> <span class="token class-name">C</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>integer <span class="token operator">==</span> c<span class="token punctuation">.</span>integer<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetHashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">^</span> integer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">A</span> a1<span class="token punctuation">,</span> a2<span class="token punctuation">;</span>
        a1<span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        a2 <span class="token operator">=</span> a1<span class="token punctuation">;</span>
        <span class="token comment">//Console.Write(a1==a2);没有定义“= =”操作符</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>a1<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        <span class="token class-name">B</span> b1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">B</span> b2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>number <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        b2<span class="token punctuation">.</span>number <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b1 <span class="token operator">==</span> b2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b1<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>b2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>b1<span class="token punctuation">,</span> b2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        b2 <span class="token operator">=</span> b1<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b1 <span class="token operator">==</span> b2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b1<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>b2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>b1<span class="token punctuation">,</span> b2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        <span class="token class-name">C</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">C</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c1<span class="token punctuation">.</span>integer <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span>integer <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>c1 <span class="token operator">==</span> c2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>c1<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>c2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>c1<span class="token punctuation">,</span> c2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//False</span>
        c2 <span class="token operator">=</span> c1<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>c1 <span class="token operator">==</span> c2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>c1<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>c2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token keyword">object</span><span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>c1<span class="token punctuation">,</span> c2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//True</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如我们所期望，编译程序并运行我们会得到以下输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>True False
False False False
True True True
False True False
True True True
</code></pre></div><p>实例方法<code>GetType()</code>与<code>typeof</code>的语义相同，它们都通过查询对象的元数据来确定对象的运行时类型，我们在“第十讲 特征与映射”对此作详细的阐述。</p><p>实例方法<code>ToString()</code>返回对象的字符串表达形式。如果我们没有重写该方法，系统一般将类型名作为字符串返回。</p><p>受保护的<code>Finalize()</code>方法在C#中有特殊的语义，我们将在“第五讲 构造器与析构器”里详细阐述。</p><p>受保护的<code>MemberwiseClone()</code>方法返回目前对象的一个“影子拷贝”，该方法不能被子类重写。“影子拷贝”仅仅是对象的一份按位拷贝，其含义是对对象内的值类型变量进行赋值拷贝，对其内的引用类型变量进行句柄拷贝，也就是拷贝后的引用变量将持有对同一块内存的引用。相对于“影子拷贝”的是深度拷贝，它对引用类型的变量进行的是值复制，而非句柄复制。例如X是一个含有对象A,B引用的对象，而对象A又含有对象M的引用。Y是X的一个“影子拷贝”。那么Y将拥有同样的A,B的引用。但对于X的一个“深度拷贝”Z来说，它将拥有对象C和D的引用，以及一个间接的对象N的引用，其中C是A的一份拷贝，D是B的一份拷贝，N是M的一份拷贝。深度拷贝在C#里通过实现<code>ICloneable</code>接口（提供<code>Clone()</code>方法）来完成。</p><p>对对象和<code>System.Object</code>的把握为类的学习作了一个很好的铺垫，但这仅仅是我们锐利之行的一小步，关乎对象成员初始化，内存引用的释放，继承与多态，异常处理等等诸多“Sharp”特技堪为浩瀚，让我们继续期待下面的专题！</p><h2 id="第五讲-构造器与析构器" tabindex="-1"><a class="header-anchor" href="#第五讲-构造器与析构器" aria-hidden="true">#</a> <a id="fifth_class">第五讲 构造器与析构器</a></h2><h3 id="构造器" tabindex="-1"><a class="header-anchor" href="#构造器" aria-hidden="true">#</a> 构造器</h3><p>构造器负责类中成员变量（域）的初始化。C#的类有两种构造器：实例构造器和静态构造器。实例构造器负责初始化类中的实例变量，它只有在用户用new关键字为对象分配内存时才被调用。而且作为引用类型的类，其实例化后的对象必然是分配在托管堆（Managed Heap）上。这里的托管的意思是指该内存受.NET的CLR运行时管理。和C++不同的是，C#中的对象不可以分配在栈中，用户只声明对象是不会产生构造器调用的。</p><p>实例构造器分为缺省构造器和非缺省构造器。缺省构造器是在一个类没有声明任何构造器的情况下，编译器强制为该类添加的一个无参数的构造器，该构造器仅仅调用父类的无参数构造器。缺省构造器实际上是C#编译器为保证每一个类都有至少一个构造器而采取的附加规则。注意这里的三个要点：</p><ol><li>子类没有声明任何构造器；</li><li>编译器为子类加的缺省构造器一定为无参数的构造器；</li><li>父类一定要存在一个无参数的构造器。</li></ol><p>看下面例子的输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Parameterless Contructor!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> param1<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Constructor Parameters: &quot;</span><span class="token operator">+</span>param1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyClass1</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass2</span> myobject1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可以得到下面的输出：</p><p><code>MyClass1 Parameterless Contructor!</code></p><p>读者可以去掉<code>MyClass1</code>的无参构造器<code>public MyClass1()</code>看看编译结果。</p><p>构造器在继承时需要特别的注意，为了保证父类成员变量的正确初始化，子类的任何构造器默认的都必须调用父类的某一构造器，具体调用哪个构造器要看构造器的初始化参数列表。如果没有初始化参数列表，那么子类的该构造器就调用父类的无参数构造器；如果有初始化参数列表，那么子类的该构造器就调用父类对应的参数构造器。看下面例子的输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Parameterless Contructor!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> param1<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Constructor Parameters: &quot;</span> <span class="token operator">+</span> param1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyClass1</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyClass2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> param1<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>param1<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass2 Constructor Parameters: &quot;</span> <span class="token operator">+</span> param1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass2</span> myobject1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass2</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可以得到下面的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyClass1 Constructor Parameters : Hello
MyClass2 Constructor Parameters : Hello
</code></pre></div><p>C#支持变量的声明初始化。类内的成员变量声明初始化被编译器转换成赋值语句强加在类的每一个构造器的内部。那么初始化语句与调用父类构造器的语句的顺序是什么呢？看下面例子的输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyClass1</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        y <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;x = {0}, y = {1}&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass2</span> MyObject1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可以得到下面的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>x = 1, y = 0
x = 1, y = -1
</code></pre></div><p>容易看到初始化语句在父类构造器调用之前，最后执行的才是本构造器内的语句。也就是说变量初始化的优先权是最高的。</p><p>我们看到类的构造器的声明中有<code>public</code>修饰符，那么当然也可以有<code>protected</code>/<code>private</code>/<code>internal</code>修饰符。根据修饰符规则，我们如果将一个类的构造器修饰为<code>private</code>，那么我们在继承该类的时候，我们将不能对这个<code>private</code>的构造器进行调用，我们是否就不能对它进行继承了吗？正是这样。实际上这样的类在我们的类内的成员变量都是静态（<code>static</code>）时，而又不想让类的用户对它进行实例化，这时必须屏蔽编译器为我们暗中添加的构造器（编译器添加的构造器都为<code>public</code>），就很有必要作一个<code>private</code>的实例构造器了。<code>protected/internal</code>也有类似的用法。</p><p>类的构造器没有返回值,这一点是不言自明的。</p><p>静态构造器初始化类中的静态变量。静态构造器不象实例构造器那样在继承中被隐含调用，也不可以被用户直接调用。掌握静态构造器的要点是掌握它的执行时间。静态构造器的执行并不确定（编译器没有明确定义）。但有四个准则需要掌握：</p><ol><li>在一个程序的执行过程中，静态构造器最多只执行一次。</li><li>静态构造器在类的静态成员初始化之后执行。或者讲编译器会将静态成员初始化语句转换成赋值语句放在静态构造器执行的最开始。</li><li>静态构造器在任何类的静态成员被引用之前执行。</li><li>静态构造器在任何类的实例变量被分配之前执行。</li></ol><p>看下面例子的输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Static Contructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1.Method1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token function">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass2 Static Contructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass2.Method1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MyClass1<span class="token punctuation">.</span><span class="token function">Method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MyClass2<span class="token punctuation">.</span><span class="token function">Method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可以得到下面的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyClass1 Static Contructor
MyClass1.Method1
MyClass2 Static Contructor
MyClass2.Method1
</code></pre></div><p>当然也可能输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyClass1 Static Contructor
MyClass2 Static Contructor
MyClass1.Method1
MyClass2.Method1
</code></pre></div><p>值得指出的是实例构造器内可以引用实例变量，也可引用静态变量。而静态构造器内能引用静态变量。这在类与对象的语义下是很容易理解的。</p><p>实际上如果我们能够深刻地把握类的构造器的唯一目的就是保证类内的成员变量能够得到正确的初始化，我们对各种C#中形形色色的构造器便有会心的理解--它没有理由不这样！</p><h3 id="析构器" tabindex="-1"><a class="header-anchor" href="#析构器" aria-hidden="true">#</a> 析构器</h3><p>由于.NET平台的自动垃圾收集机制，C#语言中类的析构器不再如传统C++那么必要，析构器不再承担对象成员的内存释放--自动垃圾收集机制保证内存的回收。实际上C#中已根本没有delete操作！析构器只负责回收处理那些非系统的资源，比较典型的如：打开的文件，获取的窗口句柄，数据库连接，网络连接等等需要用户自己动手释放的非内存资源。我们看下面例子的输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token operator">~</span><span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1&#39;s destructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyClass1</span></span>
<span class="token punctuation">{</span>
    <span class="token operator">~</span><span class="token function">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass2&#39;s destructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass2</span> MyObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MyObject <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        GC<span class="token punctuation">.</span><span class="token function">Collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        GC<span class="token punctuation">.</span><span class="token function">WaitForPendingFinalizers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可以得到下面的输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyClass2&#39;s destructor
MyClass1&#39;s destructor
</code></pre></div><p>其中程序中最后两句是保证类的析构器得到调用。<code>GC.Collect()</code>是强迫通用语言运行时进行启动垃圾收集线程进行回收工作。而<code>GC.WaitForPendingFinalizers()</code>是挂起目前的线程等待整个终止化（Finalizaion）操作的完成。终止化（Finalizaion）操作保证类的析构器被执行，这在下面会详细说明。</p><p>析构器不会被继承，也就是说类内必须明确的声明析构器，该类才存在析构器。用户实现析构器时，编译器自动添加调用父类的析构器，这在下面的Finalize方法中会详细说明。析构器由于垃圾收集机制会被在合适的的时候自动调用，用户不能自己调用析构器。只有实例析构器，而没有静态析构器。</p><p>那么析构器是怎么被自动调用的？这在 .Net垃圾回收机制由一种称作终止化（Finalizaion）的操作来支持。.Net系统缺省的终止化操作不做任何操作，如果用户需要释放非受管资源，用户只要在析构器内实现这样的操作即可--这也是C#推荐的做法。我们看下面这段代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token operator">~</span><span class="token function">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WritleLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass1 Destructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>而实际上，从生成的中间代码来看我们可以发现，这些代码被转化成了下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WritleLine</span><span class="token punctuation">(</span><span class="token string">&quot;My Class1 Destructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>实际上C#编译器不允许用户自己重载或调用<code>Finalize</code>方法--编译器彻底屏蔽了父类的<code>Finalize</code>方法（由于C#的单根继承性质，<code>System.Object</code>类是所有类的祖先类，自然每个类都有<code>Finalize</code>方法），好像这样的方法根本不存在似的。我们看下面的代码实际上是错的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token comment">// 错误</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 错误</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>但下面的代码却是正确的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;My Class Destructor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass</span> MyObject<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MyObject<span class="token punctuation">.</span><span class="token function">Finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>实际上这里的<code>Finalize</code>方法已经彻底脱离了“终止化操作”的语义，而成为C#语言的一个一般方法了。值得注意的是这也屏蔽了父类<code>System.Object</code>的<code>Finalize</code>方法，所以要格外小心！</p><p>终止化操作在.Net运行时里有很多限制，往往不被推荐实现。当对一个对象实现了终止器（Finalizer）后，运行时便会将这个对象的引用加入一个称作终止化对象引用集的队列，作为要求终止化的标志。当垃圾收集开始时，若一个对象不再被引用但它被加入了终止化对象引用集的队列，那么运行时并不立即对此对象进行垃圾收集工作，而是将此对象标志为要求终止化操作对象。待垃圾收集完成后，终止化线程便会被运行时唤醒执行终止化操作。显然这之后要从终止化对象引用集的链表中将之删去。而只有到下一次的垃圾收集时，这个对象才开始真正的垃圾收集，该对象的内存资源才被真正回收。容易看出来，终止化操作使垃圾收集进行了两次，这会给系统带来不小的额外开销。终止化是通过启用线程机制来实现的，这有一个线程安全的问题。.Net运行时不能保证终止化执行的顺序，也就是说如果对象A有一个指向对象B的引用，两个对象都有终止化操作，但对象A在终止化操作时并不一定有有效的对象A引用。.Net运行时不允许用户在程序运行中直接调用<code>Finalize()</code>方法。如果用户迫切需要这样的操作，可以实现<code>IDisposable</code>接口来提供公共的<code>Dispose()</code>方法。需要说明的是提供了<code>Dispose()</code>方法后，依然需要提供Finalize方法的操作，即实现假托的析构函数。因为<code>Dispose()</code>方法并不能保证被调用。所以.Net运行时不推荐对对象进行终止化操作即提供析构函数，只是在有非受管资源如数据库的连接，文件的打开等需要严格释放时，才需要这样做。</p><p>大多数时候，垃圾收集应该交由.Net运行时来控制，但有些时候，可能需要人为地控制一下垃圾回收操作。例如在操作了一次大规模的对象集合后，我们确信不再在这些对象上进行任何的操作了，那我们可以强制垃圾回收立即执行，这通过调用<code>System.GC.Collect()</code> 方法即可实现，但频繁的收集会显著地降低系统的性能。还有一种情况，已经将一个对象放到了终止化对象引用集的链上了，但如果我们在程序中某些地方已经做了终止化的操作，即明确调用了<code>Dispose()</code>方法，在那之后便可以通过调用<code>System.GC.SupressFinalize()</code>来将对象的引用从终止化对象引用集链上摘掉，以忽略终止化操作。终止化操作的系统负担是很重的。</p><p>在深入了解了.NET运行时的自动垃圾收集功能后，我们便会领会C#中的析构器为什么绕了这么大的弯来实现我们的编程需求，才能把内存资源和非内存资源的回收做的游刃有余--这也正是析构的本原！</p><h2 id="第六讲-方法" tabindex="-1"><a class="header-anchor" href="#第六讲-方法" aria-hidden="true">#</a> <a id="sixth_class">第六讲 方法</a></h2><p>方法又称成员函数（Member Function），集中体现了类或对象的行为。方法同样分为静态方法和实例方法。静态方法只可以操作静态域，而实例方法既可以操作实例域，也可以操作静态域--虽然这不被推荐，但在某些特殊的情况下会显得很有用。方法也有如域一样的5种存取修饰符--<code>public</code>，<code>protected</code>，<code>internal</code>，<code>protected internal</code>，<code>private</code>，它们的意义如前所述。</p><h3 id="方法参数" tabindex="-1"><a class="header-anchor" href="#方法参数" aria-hidden="true">#</a> 方法参数</h3><p>方法的参数是个值得特别注意的地方。方法的参数传递有四种类型：传值（by value），传址（by reference），输出参数（by output），数组参数（by array）。传值参数无需额外的修饰符，传址参数需要修饰符ref，输出参数需要修饰符out，数组参数需要修饰符params。传值参数在方法调用过程中如果改变了参数的值，那么传入方法的参数在方法调用完成以后并不因此而改变，而是保留原来传入时的值。传址参数恰恰相反，如果方法调用过程改变了参数的值，那么传入方法的参数在调用完成以后也随之改变。实际上从名称上我们可以清楚地看出两者的含义--传值参数传递的是调用参数的一份拷贝，而传址参数传递的是调用参数的内存地址，该参数在方法内外指向的是同一个存储位置。看下面的例子及其输出：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Swap</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> temp <span class="token operator">=</span> x<span class="token punctuation">;</span>
        x <span class="token operator">=</span> y<span class="token punctuation">;</span>
        y <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Swap</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> temp <span class="token operator">=</span> x<span class="token punctuation">;</span>
        x <span class="token operator">=</span> y<span class="token punctuation">;</span>
        y <span class="token operator">=</span> temp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token function">Swap</span><span class="token punctuation">(</span><span class="token keyword">ref</span> i<span class="token punctuation">,</span> <span class="token keyword">ref</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i = {0}, j = {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Swap</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i = {0}, j = {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>i = 2, j = 1
i = 2, j = 1
</code></pre></div><p>我们可以清楚地看到两个交换函数<code>Swap()</code>由于参数的差别--传值与传址，而得到不同的调用结果。注意传址参数的方法调用无论在声明时还是调用时都要加上<code>ref</code>修饰符。</p><p>笼统地说传值不会改变参数的值在有些情况下是错误的，我们看下面一个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Element</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Number <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Change</span><span class="token punctuation">(</span><span class="token class-name">Element</span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        s<span class="token punctuation">.</span>Number <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Element</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Change</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>10
100
</code></pre></div><p>我们看到即使传值方式仍然改变了类型为<code>Element</code>类的对象<code>t</code>。但严格意义上讲，我们是改变了对象t的域，而非对象t本身。我们再看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Element</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Number <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Change</span><span class="token punctuation">(</span><span class="token class-name">Element</span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Element</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        r<span class="token punctuation">.</span>Number <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        s <span class="token operator">=</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Element</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Number<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Change</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Number<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>10
10
</code></pre></div><p>传值方式根本没有改变类型为<code>Element</code>类的对象<code>t</code>！实际上，如果我们能够理解类这一C#中的引用类型(reference type)的特性，我们便能看出上面两个例子差别！在传值过程中，引用类型本身不会改变（<code>t</code>不会改变），但引用类型内含的域却会改变（<code>t.Number</code>改变了）！C#语言的引用类型有：<code>object</code>类型（包括系统内建的<code>class</code>类型和用户自建的<code>class</code>类型--继承自<code>object</code>类型），<code>string</code>类型，<code>interface</code>类型，<code>array</code>类型，<code>delegate</code>类型。它们在传值调用中都有上面两个例子展示的特性。</p><p>在传值和传址情况下，C#强制要求参数在传入之前由用户明确初始化，否则编译器报错！但我们如果有一个并不依赖于参数初值的函数，我们只是需要函数返回时得到它的值是该怎么办呢？往往在我们的函数返回值不至一个时我们特别需要这种技巧。答案是用<code>out</code>修饰的输出参数。但需要记住输出参数与通常的函数返回值有一定的区别：函数返回值往往存在堆栈里，在返回时弹出；而输出参数需要用户预先制定存储位置，也就是用户需要提前声明变量--当然也可以初始化。看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ResoluteName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> fullname<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> firstname<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> lastname<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> strArray <span class="token operator">=</span> fullname<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token char">&#39; &#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        firstname <span class="token operator">=</span> strArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        lastname <span class="token operator">=</span> strArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> MyName <span class="token operator">=</span> <span class="token string">&quot;Cornfield Lee&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> MyFirstName<span class="token punctuation">,</span> MyLastName<span class="token punctuation">;</span>
        <span class="token function">ResoluteName</span><span class="token punctuation">(</span>MyName<span class="token punctuation">,</span> <span class="token keyword">out</span> MyFirstName<span class="token punctuation">,</span> <span class="token keyword">out</span> MyLastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;My first name: {0}, My last name: {1}&quot;</span><span class="token punctuation">,</span>
        MyFirstName<span class="token punctuation">,</span> MyLastName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><p><code>My first name: Cornfield, My last name: Lee</code></p><p>在函数体内所有输出参数必须被赋值，否则编译器报错！<code>out</code>修饰符同样应该应用在函数声明和调用两个地方，除了充当返回值这一特殊的功能外，<code>out</code>修饰符<code>ref</code>修饰符有很相似的地方：传址。我们可以看出C#完全摈弃了传统C/C++语言赋予程序员莫大的自由度，毕竟C#是用来开发高效的下一代网络平台，安全性--包括系统安全（系统结构的设计）和工程安全（避免程序员经常犯的错误）是它设计时的重要考虑，当然我们看到C#并没有因为安全性而丧失多少语言的性能，这正是C#的卓越之处，“Sharp”之处！</p><p>数组参数也是我们经常用到的一个地方--传递大量的数组集合参数。我们先看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> n <span class="token keyword">in</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            s <span class="token operator">+=</span> n<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> s<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">var</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The Sum:&quot;</span> <span class="token operator">+</span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token keyword">var</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The Sum:&quot;</span> <span class="token operator">+</span> <span class="token function">Sum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>The Sum:15
The Sum:150
</code></pre></div><p>可以看出，数组参数可以是数组如：<code>var</code>，也可以是能够隐式转化为数组的参数如：<code>10,20,30,40,50</code>。这为我们的程序提供了很高的扩展性。</p><p>同名方法参数的不同会导致方法出现多态现象，这又叫重载（overloading）方法。需要指出的是编译器是在编译时便绑定了方法和方法调用。只能通过参数的不同来重载方法，其他的不同（如返回值）不能为编译器提供有效的重载信息。</p><h3 id="方法继承" tabindex="-1"><a class="header-anchor" href="#方法继承" aria-hidden="true">#</a> 方法继承</h3><p>第一等的面向对象机制为C#的方法引入了<code>virtual</code>，<code>override</code>，<code>sealed</code>，<code>abstract</code>四种修饰符来提供不同的继承需求。类的虚方法是可以在该类的继承自类中改变其实现的方法，当然这种改变仅限于方法体的改变，而非方法头（方法声明）的改变。被子类改变的虚方法必须在方法头加上<code>override</code>来表示。当一个虚方法被调用时，该类的实例--亦即对象的运行时类型(run-time type)来决定哪个方法体被调用。我们看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Parent</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Child</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Parent</span> a <span class="token operator">=</span> b<span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Parent.F
Child.F
Child.G
Child.G
</code></pre></div><p>我们可以看到<code>class Child</code>中<code>F()</code>方法的声明采取了重写（new）的办法来屏蔽<code>class Parent</code>中的非虚方法<code>F()</code>的声明。而<code>G()</code>方法就采用了覆盖（override）的办法来提供方法的多态机制。需要注意的是重写（new）方法和覆盖（override）方法的不同，从本质上讲重写方法是编译时绑定，而覆盖方法是运行时绑定。值得指出的是虚方法不可以是静态方法--也就是说不可以用<code>static</code>和<code>virtual</code>同时修饰一个方法，这由它的运行时类型辨析机制所决定。<code>override</code>必须和<code>virtual</code>配合使用，当然也不能和<code>static</code>同时使用。</p><p>那么我们如果在一个类的继承体系中不想再使一个虚方法被覆盖，我们该怎样做呢？答案是<code>sealed override</code> (密封覆盖)，我们将<code>sealed</code>和<code>override</code>同时修饰一个虚方法便可以达到这种目的：sealed override public void F()。注意这里一定是sealed和override同时使用，也一定是密封覆盖一个虚方法，或者一个被覆盖（而不是密封覆盖）了的虚方法。密封一个非虚方法是没有意义的，也是错误的。看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//sealed.cs</span>
<span class="token comment">// csc /t:library sealed.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Parent</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">sealed</span> <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Child.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Grandson</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Child</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Grandson.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>抽象（abstract）方法在逻辑上类似于虚方法，只是不能像虚方法那样被调用，而只是一个接口的声明而非实现。抽象方法没有类似于{…}这样的方法实现，也不允许这样做。抽象方法同样不能是静态的。含有抽象方法的类一定是抽象类，也一定要加<code>abstract</code>类修饰符。但抽象类并不一定要含有抽象方法。继承含有抽象方法的抽象类的子类必须覆盖并实现（直接使用override）该方法，或者组合使用<code>abstract override</code>使之继续抽象，或者不提供任何覆盖和实现。后两者的行为是一样的。看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//abstract1.cs</span>
<span class="token comment">// csc /t:library abstract1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Parent</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Grandson</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Child</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Grandson.F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Grandson.G&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>抽象方法可以抽象一个继承来的虚方法，我们看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//abstract2.cs</span>
<span class="token comment">// csc /t:library abstract2.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Parent</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Parent.Method&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Parent</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Grandson</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Child</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Grandson.Method&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>归根结底，我们抓住了运行时绑定和编译时绑定的基本机理，我们便能看透方法呈现出的种种<code>overload</code>，<code>virtual</code>，<code>override</code>，<code>sealed</code>，<code>abstract</code>等形态，我们才能运用好方法这一利器！</p><h3 id="外部方法" tabindex="-1"><a class="header-anchor" href="#外部方法" aria-hidden="true">#</a> 外部方法</h3><p>C#引入了extern修饰符来表示外部方法。外部方法是用C#以外的语言实现的方法如Win32 API函数。如前所是外部方法不能是抽象方法。我们看下面的一个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">MessageBoxA</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> msg<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">MessageBoxA</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;This is called from a C# app!&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序经编译后执行输出：</p><p><img src="`+t+`" alt="cornyfield6.gif"></p><p>这里我们调用了Win32 API函数<code>int MessageBoxA(int hWnd, string msg,string caption, int type)</code>。</p><h2 id="第七讲-域与属性" tabindex="-1"><a class="header-anchor" href="#第七讲-域与属性" aria-hidden="true">#</a> <a id="seventh_class">第七讲 域与属性</a></h2><h3 id="域" tabindex="-1"><a class="header-anchor" href="#域" aria-hidden="true">#</a> 域</h3><p>域(Field)又称成员变量(Member Variable)，它表示存储位置，是C#中类不可缺少的一部分。域的类型可以是C#中任何数据类型。但对于除去string类型的其他引用类型由于在初始化时涉及到一些类的构造器的操作，我们这里将不提及，我们把这一部分内容作为“类的嵌套”放在“接口 继承与多态”一讲内来阐述。</p><p>域分为实例域和静态域。实例域属于具体的对象，为特定的对象所专有。静态域属于类，为所有对象所共用。C#严格规定实例域只能通过对象来获取，静态域只能通过类来获取。例如我们有一个类型为MyClass的对象MyObject,MyClass内的实例域instanceField（存取限制为public）只能这样获取：MyObject. instanceField。而MyClass的静态域staticField（存取限制为public）只能这样获取：MyClass.staticField。注意静态域不能像传统C++那样通过对象获取，也就是说MyObject.staticField的用法是错误的，不能通过编译器编译。</p><p>域的存取限制集中体现了面向对象编程的封装原则。如前所述，C#中的存取限制修饰符有5种，这5种对域都适用。C#只是用<code>internal</code>扩展了C++原来的friend修饰符。在有必要使两个类的某些域互相可见时，我们将这些类的域声明为<code>internal</code>，然后将它们放在一个组合体内编译即可。如果需要对它们的继承子类也可见的话，声明为<code>protected internal</code>即可。实际上这也是组合体的本来意思--将逻辑相关的类组合封装在一起。</p><p>C#引入了<code>readonly</code>修饰符来表示只读域，<code>const</code>来表示不变常量。顾名思义对只读域不能进行写操作，不变常量不能被修改，这两者到底有什么区别呢？只读域只能在初始化--声明初始化或构造器初始化--的过程中赋值，其他地方不能进行对只读域的赋值操作，否则编译器会报错。只读域可以是实例域也可以是静态域。只读域的类型可以是C#语言的任何类型。但<code>const</code>修饰的常量必须在声明的同时赋值，而且要求编译器能够在编译时期计算出这个确定的值。<code>const</code>修饰的常量为静态变量，不能够为对象所获取。<code>const</code>修饰的值的类型也有限制，它只能为下列类型之一（或能够转换为下列类型的）：<code>sbyte</code>, <code>byte</code>, <code>short</code>, <code>ushort</code>, <code>int</code>, <code>uint</code>, <code>long</code>, <code>ulong</code>, <code>char</code>, <code>float</code>, <code>double</code>, <code>decimal</code>, <code>bool</code>, <code>string</code>, <code>enum</code>类型, 或引用类型。值得注意的是这里的引用类型，由于除去<code>string</code>类型外，所有的类型出去<code>null</code>值以外在编译时期都不能由编译器计算出他们的确切的值，所以我们能够声明为<code>const</code>的引用类型只能为<code>string</code>或值为<code>null</code>的其他引用类型。显然当我们声明一个<code>null</code>的常量时，我们已经失去了声明的意义--这也可以说是C#设计的尴尬之处！</p><p>这就是说，当我们需要一个<code>const</code>的常量时，但它的类型又限制了它不能在编译时期被计算出确定的值来，我们可采取将之声明为<code>static readonly</code>来解决。但两者之间还是有一点细微的差别的。看下面的两个不同的文件：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//file1.cs</span>
<span class="token comment">//csc /t:library file1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">MyNamespace1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> myField <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//file2.cs</span>
<span class="token comment">//csc /r:file1.dll file2.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">MyNamespace2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>MyNamespace1<span class="token punctuation">.</span>MyClass1<span class="token punctuation">.</span>myField<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们的两个类分属于两个文件<code>file1.cs</code> 和<code>file2.cs</code>，并分开编译。在文件<code>file1.cs</code>内的域myField声明为<code>static readonly</code>时，如果我们由于某种需要改变了myField的值为20，我们只需重新编译文件<code>file1.cs</code>为<code>file1.dll</code>，在执行<code>file2.exe</code>时我们会得到20。但如果我们将<code>static readonly</code>改变为<code>const</code>后，再改变myField的初始化值时，我们必须重新编译所有引用到<code>file1.dll</code>的文件，否则我们引用的MyNamespace1.MyClass1.myField将不会如我们所愿而改变。这在大的系统开发过程中尤其需要注意。实际上，如果我们能够理解const修饰的常量是在编译时便被计算出确定的值，并代换到引用该常量的每一个地方，而<code>readonly</code>时在运行时才确定的量--只是在初始化后我们不希望它的值再改变，我们便能理解C#设计者们的良苦用心，我们才能彻底把握<code>const</code>和<code>readonly</code>的行为！</p><p>域的初始化是面向对象编程中一个需要特别注意的问题。C#编译器缺省将每一个域初始化为它的默认值。简单的说，数值类型（枚举类型）的默认值为0或0.0。字符类型的默认值为&#39;\\x0000&#39;。布尔类型的默认值为<code>false</code>。引用类型的默认值为<code>null</code>。结构类型的默认值为其内的所有类型都取其相应的默认值。虽然C#编译器为每个类型都设置了默认类型，但作为面向对象的设计原则，我们还是需要对变量进行正确的初始化。实际上这也是C#推荐的做法，没有对域进行初始化会导致编译器发出警告信息。C#中对域进行初始化有两个地方--声明的同时进行初始化和在构造器内进行初始化。如前所述，域的声明初始化实际上被编译器作为赋值语句放在了构造器的内部的最开始处执行。实例变量初始化会被放在实例构造器内，静态变量初始化会被放在静态构造器内。如果我们声明了一个静态的变量并同时对之进行了初始化，那么编译器将为我们构造出一个静态构造器来把这个初始化语句变成赋值语句放在里面。而作为<code>const</code>修饰的常量域，从严格意义上讲不能算作初始化语句，我们可以将它看作类似于C++中的宏代换。</p><h3 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h3><p>属性可以说是C#语言的一个创新。当然你也可以说不是。不是的原因是它背后的实现实际上还是两个函数--一个赋值函数（<code>get</code>），一个取值函数(<code>set</code>)，这从它生成的中间语言代码可以清晰地看到。是的原因是它的的确确在语言层面实现了面向对象编程一直以来对“属性”这一OO风格的类的特殊接口的诉求。理解属性的设计初衷是我们用好属性这一工具的根本。C#不提倡将域的保护级别设为<code>public</code>而使用户在类外任意操作--那样太不OO,或者具体点说太不安全！对所有有必要在类外可见的域，C#推荐采用属性来表达。属性不表示存储位置，这是属性和域的根本性的区别。下面是一个典型的属性设计：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> integer<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Integer
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> integer<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> integer <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass</span> MyObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>MyObject<span class="token punctuation">.</span>Integer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        MyObject<span class="token punctuation">.</span>Integer<span class="token operator">++</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>MyObject<span class="token punctuation">.</span>Integer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一如我们期待的那样，程序输出0 1。我们可以看到属性通过对方法的包装向程序员提供了一个友好的域成员的存取界面。这里的<code>value</code>是C#的关键字，是我们进行属性操作时的<code>set</code>的隐含参数，也就是我们在执行属性写操作时的右值。</p><p>属性提供了只读（<code>get</code>），只写(<code>set</code>)，读写(<code>get</code>和 <code>set</code>)三种接口操作。对域的这三种操作，我们必须在同一个属性名下声明，而不可以将它们分离，看下面的实现：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> name<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面这种分离<code>Name</code>属性实现的方法是错误的！我们应该像前面的例子一样将他们放在一起。值得注意的是三种属性（只读，只写，读写）被C#认为是同一个属性名，看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name"><span class="token keyword">int</span></span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Num
    <span class="token punctuation">{</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            num <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyClassDerived</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyClass</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Num
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClassDerived</span> MyObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClassDerived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//MyObject.Num= 1;  //错误 ！</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span>MyClass<span class="token punctuation">)</span>MyObject<span class="token punctuation">)</span><span class="token punctuation">.</span>Num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们可以看到<code>MyClassDerived</code>中的属<code>性Num-get{}</code>屏蔽了<code>MyClass</code>中属性<code>Num-set{}</code>的定义。</p><p>当然属性远远不止仅仅限于域的接口操作，属性的本质还是方法，我们可以根据程序逻辑在属性的提取或赋值时进行某些检查，警告等额外操作，看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> name<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                name <span class="token operator">=</span> <span class="token string">&quot;Microsoft&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                name <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于属性的方法的本质，属性当然也有方法的种种修饰。属性也有5种存取修饰符，但属性的存取修饰往往为<code>public</code>，否则我们也就失去了属性作为类的公共接口的意义。除了方法的多参数带来的方法重载等特性属性不具备外， <code>virtual</code>, <code>sealed</code>, <code>override</code>, <code>abstract</code>等修饰符对属性与方法同样的行为，但由于属性在本质上被实现为两个方法，它的某些行为需要我们注意。看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> X
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Y
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> y <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Z <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">A</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> z<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> X
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>X <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Y
    <span class="token punctuation">{</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Y <span class="token operator">=</span> <span class="token keyword">value</span> <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">?</span> <span class="token number">0</span> <span class="token punctuation">:</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Z
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> z<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> z <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子集中地展示了属性在继承上下文中的某些典型行为。这里，类A由于抽象属性Z的存在而必须声明为<code>abstract</code>。子类B中通过<code>base</code>关键字来引用父类A的属性。类B中可以只通过Y-set便覆盖了类A中的虚属性。</p><p>静态属性和静态方法一样只能存取类的静态域变量。我们也可以像做外部方法那样，声明外部属性。</p><h2 id="第八讲-索引器与操作符重载" tabindex="-1"><a class="header-anchor" href="#第八讲-索引器与操作符重载" aria-hidden="true">#</a> <a id="eighth_class">第八讲 索引器与操作符重载</a></h2><h3 id="索引器" tabindex="-1"><a class="header-anchor" href="#索引器" aria-hidden="true">#</a> 索引器</h3><p>索引器(Indexer)是C#引入的一个新型的类成员，它使得对象可以像数组那样被方便，直观的引用。索引器非常类似于我们前面讲到的属性，但索引器可以有参数列表，且只能作用在实例对象上，而不能在类上直接作用。下面是典型的索引器的设计，我们在这里忽略了具体的实现。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token keyword">this</span> <span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 取数据</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 存数据</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>索引器没有像属性和方法那样的名字，关键字<code>this</code>清楚地表达了索引器引用对象的特征。和属性一样，<code>value</code>关键字在<code>set</code>后的语句块里有参数传递意义。实际上从编译后的IL中间语言代码来看，上面这个索引器被实现为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">get_Item</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 取数据</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">set_Item</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//存数据</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于我们的索引器在背后被编译成<code>get_Item(int index)</code>和<code>set_Item(int index, object value)</code>两个方法，我们甚至不能再在声明实现索引器的类里面声明实现这两个方法，编译器会对这样的行为报错。这样隐含实现的方法同样可以被我们进行调用，继承等操作，和我们自己实现的方法别无二致。通晓C#语言底层的编译实现为我们下面理解C#索引器的行为提供了一个很好的基础。</p><p>和方法一样，索引器有5种存取保护级别，和4种继承行为修饰，以及外部索引器。这些行为同方法没有任何差别，这里不再赘述。唯一不同的是索引器不能为静态（<code>static</code>），这在对象引用的语义下很容易理解。值得注意的是在覆盖（<code>override</code>）实现索引器时，应该用<code>base[E]</code>来存取父类的索引器。</p><p>和属性的实现一样，索引器的数据类型同时为<code>get</code>语句块的返回类型和<code>set</code>语句块中<code>value</code>关键字的类型。</p><p>索引器的参数列表也是值得注意的地方。“索引”的特征使得索引器必须具备至少一个参数，该参数位于<code>this</code>关键字之后的中括号内。索引器的参数也只能是传值类型，不可以有<code>ref</code>(引用)和<code>out</code>（输出）修饰。参数的数据类型可以是C#中的任何数据类型。C#根据不同的参数签名来进行索引器的多态辨析。中括号内的所有参数在<code>get</code>和<code>set</code>下都可以引用，而<code>value</code>关键字只能在<code>set</code>下作为传递参数。</p><p>下面是一个索引器的具体的应用例子，它对我们理解索引器的设计和应用很有帮助。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">BitArray</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bits<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> length<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">BitArray</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> length<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>length <span class="token operator">=</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Length
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> length<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> length<span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IndexOutOfRangeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span>bits<span class="token punctuation">[</span>index <span class="token operator">&gt;&gt;</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">&amp;</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> index<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">&gt;=</span> length<span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IndexOutOfRangeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span>
                bits<span class="token punctuation">[</span>index <span class="token operator">&gt;&gt;</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">|=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> index<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                bits<span class="token punctuation">[</span>index <span class="token operator">&gt;&gt;</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">BitArray</span> Bits <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BitArray</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            Bits<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>Bits<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译并运行程序可以得到下面的输出：</p><p><code>True False True False True False True False True False</code></p><p>上面的程序通过索引器的使用为用户提供了一个界面友好的<code>s</code>数组，同时又大大降低了程序的存储空间代价。索引器通常用于对象容器中为其内的对象提供友好的存取界面--这也是为什么C#将方法包装成索引器的原因所在。实际上，我们可以看到索引器在.NET Framework类库中有大量的应用。</p><h3 id="操作符重载" tabindex="-1"><a class="header-anchor" href="#操作符重载" aria-hidden="true">#</a> 操作符重载</h3><p>操作符是C#中用于定义类的实例对象间表达式操作的一种成员。和索引器类似，操作符仍然是对方法实现的一种逻辑界面抽象，也就是说在编译成的IL中间语言代码中，操作符仍然是以方法的形式调用的。在类内定义操作符成员又叫操作符重载。C#中的重载操作符共有三种：一元操作符，二元操作符和转换操作符。并不是所有的操作符都可以重载，三种操作符都有相应的可重载操作符集,列于下表：</p><ul><li>一元操作符 + - ! ~ ++ -- true false</li><li>二元操作符 + - * / % &amp; | ^ &lt;&lt; &gt;&gt; == != &gt; &lt; &gt;= &lt;=</li><li>转换操作符 隐式转换()和显式转换()</li></ul><p>重载操作符必须是<code>public</code>和<code>static</code> 修饰的，否则会引起编译错误，这在操作符的逻辑语义下是不言而喻的。父类的重载操作符会被子类继承，但这种继承没有覆盖，隐藏，抽象等行为，不能对重载操作符进行<code>virtual</code> <code>sealed</code> <code>override</code> <code>abstract</code>修饰。操作符的参数必须为传值参数。我们下面来看一个具体的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Complex</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">double</span></span> r<span class="token punctuation">,</span> v<span class="token punctuation">;</span>  <span class="token comment">//r+ v i</span>
    <span class="token keyword">public</span> <span class="token function">Complex</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> r<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">double</span></span> v<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>r <span class="token operator">=</span> r<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>v <span class="token operator">=</span> v<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> Complex <span class="token keyword">operator</span> <span class="token operator">+</span><span class="token punctuation">(</span><span class="token class-name">Complex</span> a<span class="token punctuation">,</span> <span class="token class-name">Complex</span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Complex</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>r <span class="token operator">+</span> b<span class="token punctuation">.</span>r<span class="token punctuation">,</span> a<span class="token punctuation">.</span>v <span class="token operator">+</span> b<span class="token punctuation">.</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> Complex <span class="token keyword">operator</span> <span class="token operator">-</span><span class="token punctuation">(</span><span class="token class-name">Complex</span> a<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Complex</span><span class="token punctuation">(</span><span class="token operator">-</span>a<span class="token punctuation">.</span>r<span class="token punctuation">,</span> <span class="token operator">-</span>a<span class="token punctuation">.</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> Complex <span class="token keyword">operator</span> <span class="token operator">++</span><span class="token punctuation">(</span><span class="token class-name">Complex</span> a<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">double</span></span> r <span class="token operator">=</span> a<span class="token punctuation">.</span>r <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> v <span class="token operator">=</span> a<span class="token punctuation">.</span>v <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Complex</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>r <span class="token operator">+</span> <span class="token string">&quot; + &quot;</span> <span class="token operator">+</span> v <span class="token operator">+</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Complex</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Complex</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Complex</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Complex</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Complex</span> c <span class="token operator">=</span> <span class="token operator">-</span>a<span class="token punctuation">;</span>
        c<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Complex</span> d <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
        d<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        a<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Complex</span> e <span class="token operator">=</span> a<span class="token operator">++</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        e<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Complex</span> f <span class="token operator">=</span> <span class="token operator">++</span>a<span class="token punctuation">;</span>
        a<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        f<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译程序并运行可得到下面的输出：</p><p><code>-3 + -4i 8 + 10i 3 + 4i 4 + 5i 3 + 4i 5 + 6i 5 + 6i</code></p><p>我们这里实现了一个“+”号二元操作符，一个“-”号一元操作符（取负值），和一个“++”一元操作符。注意这里，我们都没有对传进来的参数作任何改变--这在参数是引用类型的变量是尤其重要，虽然重载操作符的参数只能是传值方式。而我们在返回值时，往往需要“new”一个新的变量--除了<code>true</code>和<code>false</code>操作符。这在重载“++”和“--” 操作符时尤其显得重要。也就是说我们做在a++时，我们将丢弃原来的a值，而取代的是新的new出来的值给a! 值得注意的是<code>e=a++</code>或<code>f=++a</code>中<code>e</code>的值或<code>f</code>的值根本与我们重载的操作符返回值没有一点联系！它们的值仅仅是在前置和后置的情况下获得a的旧值或新值而已！前置和后置的行为不难理解。</p><p>操作符重载对返回值和参数类型有着相当严格的要求。一元操作符中只有一个参数。操作符“++”和“--”返回值类型和参数类型必须和声明该操作符的类型一样。操作符“+ - ! ~”的参数类型必须和声明该操作符的类型一样，返回值类型可以任意。<code>true</code>和<code>false</code>操作符的参数类型必须和声明该操作符的类型一样，而返回值类型必须为<code>bool</code>，而且必须配对出现--也就是说只声明其中一个是不对的，会引起编译错误。参数类型的不同会导致同名的操作符的重载--实际上这是方法重载的表现。</p><p>二元操作符参数必须为两个，而且两个必须至少有一个的参数类型为声明该操作符的类型。返回值类型可以任意。有三对操作符也需要必须配对声明出现，它们是“==”和“!=”，“&gt;”和“&lt;”，“&gt;=”和“&lt;=”。需要注意的是两个参数的类型不同，虽然类型相同但顺序不同都会导致同名的操作符的重载。</p><p>转换操作符为不同类型之间提供隐式转换和显式转换，主要用于方法调用，转型表达和赋值操作。转换操作符对其参数类型（被转换类型）和返回值类型（转换类型）也有严格的要求。参数类型和返回值类型不能相同，且两者之间必须至少有一个和定义操作符的类型相同。转换操作符必须定义在被转换类型或转换类型任何其中一个里面。不能对系统定义过的转换操作进行重新定义。两个类型也都不能是<code>object</code>或接口类型，两者之间不能有直接或间接的继承关系--这三种情况系统已经默认转换。我们来看一个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">Digit</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">byte</span></span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Digit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token keyword">value</span> <span class="token operator">&gt;</span> <span class="token number">9</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token keyword">byte</span><span class="token punctuation">(</span><span class="token class-name">Digit</span> d<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> d<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">explicit</span> <span class="token keyword">operator</span> <span class="token function">Digit</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Digit</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面的例子提供了<code>Digit</code>类型和<code>byte</code>类型之间的隐式转换和显式转换。从<code>Digit</code>到<code>byte</code>的转换为隐式转换，转换过程不会因为丢失任何信息而抛出异常。从<code>byte</code>到<code>Digit</code>的转换为显式转换，转换过程有可能因丢失信息而抛出异常。实际上这也为我们揭示了什么时候声明隐式转换，什么时候声明显示转换的设计原则。不能对同一参数类型同时声明隐式转换和显式转换。隐式转换和显式转换无需配对使用--虽然C#推荐这样做。</p><p>实际上可以看到，对于属性，索引器和操作符这些C#提供给我们的界面操作，都是方法的某种形式的逻辑抽象包装，它旨在为我们定义的类型的用户提供一个友好易用的界面--我们完全可以通过方法来实现它们实现的功能。理解了这样的设计初衷，我们才会恰当，正确地用好这些操作，而不致导致滥用和错用。</p>`,275),c=[e];function l(u,k){return s(),a("div",null,c)}const r=n(o,[["render",l],["__file","cspbase41.html.vue"]]);export{r as default};
