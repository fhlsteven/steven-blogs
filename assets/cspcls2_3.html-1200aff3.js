import{_ as n,a as s}from"./cspcls2_3-e8261734.js";import{_ as a,o,c as p,a as t}from"./app-477de5b2.js";const e={},c=t('<h1 id="第三章-第一个c-应用程序" tabindex="-1"><a class="header-anchor" href="#第三章-第一个c-应用程序" aria-hidden="true">#</a> 第三章 第一个C#应用程序</h1><h2 id="_3-0-选择一个编辑器" tabindex="-1"><a class="header-anchor" href="#_3-0-选择一个编辑器" aria-hidden="true">#</a> 3.0 选择一个编辑器</h2><p>尽管我是一个顽固的Notepad狂，但这次我不建议用它编辑源码。原因是你正在与真正的编程语言打交道，使用Notepad编辑源码编译时可能产生大量的错误信息行(C++程序员知道我在说什么。) 你有几种选择。可以重新配置你信任的老式Visual C++ 6.0，使它能够和C#源文件一起工作。第二种选择是使用新的Visual Studio 7。第三，你可以用任何第三方程序编辑器，最好要支持行数、色彩编码、工具集成和良好的搜索功能。CodeWright就是其中一个例子，如图3.1所示。</p><p><img src="'+n+`" alt="图3.1 CodeWright"><br> 图3.1 CodeWright 是你可以用于创建C#代码文件众多可能编辑器中的一个。</p><p>当然，在所提到的编辑器中，没有一个对创建C#程序来说是必要的。用Notepad肯定可以编辑。但是，如果你考虑到要编写更大的项目，最好还是忍痛割爱吧。</p><h2 id="_3-1-hello-world-代码" tabindex="-1"><a class="header-anchor" href="#_3-1-hello-world-代码" aria-hidden="true">#</a> 3.1 &quot;Hello World&quot; 代码</h2><p>讨论编辑器有点离题 ，让我们把话题转回到一个非常出名的小应用程序。这个最短的C#版本应用程序见清单3.1。把它存起来，文件名为 helloworld.cs，以便使你能按照说明，完成诸如编译应用程序等其它余下来的步骤。</p><p>清单 3.1 最简单的 &quot;Hello World &quot;程序</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>在C#中，代码块(语句组)由大括弧(<code>{</code>和<code>}</code>)所括住。所以，甚至你以前没有C++的经验，你也可以说出<code>Main()</code>方法就是<code>HelloWorld</code> 类语句的一部分，因为类被括在所定义的大括弧中。</p><p>C#应用程序(可执行)的入口点就是 <code>static Main</code> 方法，它必须包含在一个类中。仅有一个类能使用该标志定义，除非你告诉编译器它应使用哪一个 Main 方法(否侧，会产生一个编译错误)。</p><p>和C++相比，Main的第一个字母是大写的M，而不是你曾经使用过的小写字母。在这个方法中，你的程序开始并结束。方法中可以调用其它方法——如这个例子中，用于输出文本——或者创建对象并激活该方法。 正如你所看到的，Main方法返回一个void类型。</p><p><code>public static void Main()</code></p><p>尽管看到这些语句时，C++程序员肯定会觉得似曾相识，但是其他程序员并不如此。首先，<code>public</code> 的访问标志告诉我们这个方法可以被任何程序访问，这是它被调用的必要条件。其次，<code>static</code> 意味着没有先创建类的实例也可以调用方法——你所要做的就是用类名调用方法。</p><p><code>HelloWorld.Main();</code></p><p>但是，我不赞成在Main方法中执行这行代码，递归会导致堆栈溢出。</p><p>另一重要的方面是返回类型。对于方法Main，可选择void (意味着根本就没有返回值)，或用int 为整型结果(应用程序返回的错误级别)。因此，两种可能的Main方法为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>C++程序员会同样知道后面我要提到的——可以传给应用程序的命令行参数数组。如：</p><p><code>public static void Main(string[] args)</code></p><p>我现在并不想详细地说明如何访问参数，但我想事先给C++程序员一个警告：和C++相比，应用程序路径不是这个数组的一部分。仅仅那些参数包含在这个数组中。</p><p>在对Main方法并不简短的介绍之后，让我们把注意力集中到唯一真正的代码行——这行代码在屏幕上显示&quot;Hello Wold&quot;。</p><p><code>System.Console.WriteLine(&quot;Hello World&quot;);</code></p><p>假如不是由于有了System，大家会马上猜到WriteLine是Console 对象的一个静态方法。那么System代表什么呢? 它是包含Console对象的名字空间(范围)，实际上并不是每次都在Console对象前加上名字空间的前缀，你可以象清单3.2所示范的那样，在应用程序中引入名字空间。</p><p>清单3.2 在应用程序中引入名字空间</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>所有你要做的就是给System名字空间加一个using指令。在这之后，不再需要规定名字空间，就可以使用它们的方法和属性了。NGWS 框架体系中有很多的名字空间，我只对巨大的名字空间池中的少数几个对象进行探讨。但在第八章 &quot;用C#写组件&quot;将介绍为你的对象创建自己的名字空间。</p><h2 id="_3-2-编译应用程序" tabindex="-1"><a class="header-anchor" href="#_3-2-编译应用程序" aria-hidden="true">#</a> 3.2 编译应用程序</h2><p>由于NGWS Runtime支持所有的编译器(VB、C++和C#)，你不必买一个单独的开发工具用来把应用程序编译成IL(中间语言)。但是，如果你从没有用过命令行编译器编译过应用程序(仅懂得编译名，而没有熟记)， 它还是你的首要选择。</p><p>打开命令提示符并切换到存 helloworld.cs 的目录。敲入以下命令：</p><p><code>csc helloworld.cs</code></p><p>helloworld.cs 被编译并链接成hellworld.exe。因为源码没有错误(那当然！)，C#编译器没有出错提示，在整个编译过程没有丝毫停顿。如图3.2所示。</p><p><img src="`+s+`" alt="图3.2 "><br> 图3.2 使用命令行编译器 csc.exe 编译应用程序</p><p>现在你已经准备好运行第一个真正用C#编写的应用程序。简单地在命令行上敲入helloworld，输出结果为 &quot;Hello World&quot;。</p><p>在继续往下介绍之前， 我想稍为想象一下第一个应用程序和一个编译器开关的使用：</p><p><code>csc /out:hello.exe helloworld.cs</code></p><p>这个开关告诉编译器输出文件命名为hello.exe。虽然这不是什么绝招，但它是这本书中用到的未来编译器的基本功。</p><h2 id="_3-3-输入和输出" tabindex="-1"><a class="header-anchor" href="#_3-3-输入和输出" aria-hidden="true">#</a> 3.3 输入和输出</h2><p>到目前为止，我仅仅演示了把简单的常量字符串输出到屏幕。尽管这本书只介绍了C#编程的概念而不介绍用户接口编程，但我需要让你迅速学会简单的屏幕输入和输出方法——相应于C的scanf 和 printf，或者C++的cin 和cout。我不能提供VB相应的函数，因为屏幕访问不是该核心语言的一部分。</p><p>你只需要能够读用户的输入并提示一些信息给用户。清单3.3 说明如何读一个用户请求的名字输入，并显示一条已定制好的&quot;Hello&quot; 信息。</p><p>Listing 3.3 从控制台读输入信息</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">InputOutput</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Please enter your name: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strName <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> strName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>第7行使用Console对象的一个新方法用于提示文本信息给用户，它就是Write方法。它与WriteLine不同的地方在于它输出时不换行。我使用这种方法以便用户可以在信息提示的同一行输入名字。 在用户输入他的名字后(并按回车键)，ReadLine 方法读入了一个字符串变量。名字字符串连接到常量字符串&quot;Hello&quot;，并用我们早已熟悉的WriteLine方法显示出来(见图3.2)。</p><p>图3.3 编译和运行定制的Hello 应用程序</p><p>你几乎已学完了NGWS框架必要的输入和输出功能。但是，你还需要为用户显示多个值。为用户写一个格式串。清单3.4展示一个例子。</p><p>清单 3.4 使用不同的输出方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">InputOutput</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Please enter your name: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strName <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello {0}&quot;</span><span class="token punctuation">,</span>strName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第9行包含了使用格式串的<code>Console.WriteLine</code>语句。格式串例子如下：</p><p><code>&quot;Hello {0}&quot;</code></p><p><code>{0}</code>代替<code>WriteLine</code>方法的参数表中紧随格式串后的第一个变量。你可以用该技术格式化超过三个变量。</p><p><code>Console.WriteLine(&quot;Hello {0} {1}, from {2}&quot;,strFirstname, strLastname, strCity);</code></p><p>当然，并不仅限于只使用字符串变量。你可以使用任何类型，这些类型在后面的第四章 &quot;C#类型&quot;中有讨论。</p><h2 id="_3-4-添加注释" tabindex="-1"><a class="header-anchor" href="#_3-4-添加注释" aria-hidden="true">#</a> 3.4 添加注释</h2><p>当写代码时，你应为代码写注释条文，解释实现的内容、变更史等。尽管你注释中提供的信息(如果有的话)是给你写的，但是你还是必须遵守写C#注释的方法。清单3.5 显示采用的两种不同的方式。</p><p>清单3.5 给你的代码添加注释</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 这是单行注释</span>
        <span class="token comment">/* 这种注释 
        跨越多行 */</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token comment">/*&quot;Hello World&quot;*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>&quot;//&quot; 符号用于单行注释。你可以用&quot;//&quot;注释当前所在行，或是跟在一个代码语句的后面：</p><p><code>int nMyVar = 10; // 胡说八道</code></p><p>所有在&quot;<code>//</code>&quot;后面的被认为是一条注释；所以，你可以同样用它们来注释一整行或一行源代码的部分。这种注释方式同C++中介绍的相似。</p><p>如果你的注释跨越多行，必须使用&quot;<code>/* */</code>&quot;的字符组合。这种方式在C中有效。除了单行注释外，这种方式在C++和C#中还同样有效。因C/C++和C#都使用这种多行注释方式，所以它们也使用相同的终结符。请看下列代码行：</p><p><code>/* Console.WriteLine(&quot;Hello World&quot;); */</code></p><p>我使用&quot;<code>/* */</code>&quot;简单地注释一整行。现在我假定这一行是很长代码的一部分，而且我决定要暂时禁用一个程序块：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*
...
/* Console.WriteLine(&quot;Hello World&quot;); */</span>
<span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token operator">*</span><span class="token operator">/</span>
</code></pre></div><p>这个结构所存在的问题为： &quot;Hello World&quot;那一行后面的&quot;<code>*/</code>&quot;终止了始于第一行的&quot;<code>/*</code>&quot;的注释，余下的代码对编译器有效，你将看到一些有趣的出错信息。至少 最后的&quot;<code>*/</code>&quot;被标志为归属错误。我只不过想提醒一下，让你了解这种错误。</p><h2 id="_3-5-小结" tabindex="-1"><a class="header-anchor" href="#_3-5-小结" aria-hidden="true">#</a> 3.5 小结</h2><p>在这一章中，你创建、编译并执行了第一个C#应用程序：著名的&quot;Hello World&quot;程序。我用这个短短的应用程序给你介绍有关Main方法，它是一个应用程序的入口点，也是出口点。这个方法可以没有返回值或返回一个整数错误级别。如果你的应用程序用参数调用，你可以(但不必要)读出并使用它们。</p><p>在编译和测试应用程序后，你学到了更多的由Console对象提供的有关输入和输出的方法。对于学习C#而言，它们足以创建出有意义的控制台例子，但用户接口的大部分将是WFC、WinForms或者ASP+。</p>`,67),l=[c];function u(i,r){return o(),p("div",null,l)}const h=a(e,[["render",u],["__file","cspcls2_3.html.vue"]]);export{h as default};
