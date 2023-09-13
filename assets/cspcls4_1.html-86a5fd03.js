import{_ as t,r as o,o as e,c as p,b as n,d as s,e as c,a as u}from"./app-477de5b2.js";const l={},i=n("h1",{id:"c-教程第一课-简单的欢迎程序",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#c-教程第一课-简单的欢迎程序","aria-hidden":"true"},"#"),s(" C#教程第一课:简单的欢迎程序")],-1),r=n("p",null,"（Joe Mayo　2001年06月08日 17:40）",-1),q={href:"http://msdn.microsoft.com/downloads/default.asp?URL=/code/sample.asp?url=/msdn-files/027/000/976/msdncompositedoc.xml",target:"_blank",rel:"noopener noreferrer"},k=u(`<p>本节课通过介绍几个简单的程序，使得你对C#有所入门。本节程要达到如下几个目的：</p><ol><li>理解一个C#程序的基本结构</li><li>初步了解&quot;名称空间&quot;的概念</li><li>初步了解&quot;类&quot;的概念</li><li>了解&quot;Main&quot;方法所做的工作</li><li>学会如何读取命令行输入信息</li><li>学会使用控制台输入/输出 (I/O)语句</li></ol><p>1.清单1-1. 一个简单的欢迎程序Welcome.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">WelcomeCSS</span> <span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Write to console</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to the C# Station Tutorial!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单1-1中的程序包括四个基本元素：名称空间的声明，类，&quot;Main&quot;方法和语句。</p></li><li><p>本例中对名称空间的声明，表明正在使用&quot;System&quot;这个名称空间。</p><p>名称空间内包含了一组可以被C#程序调用的代码。有了&quot;using System;&quot;这个声明，就表明程序可以引用该&quot;System&quot;名称空间内的代码，而无需在每个引用的前面加上&quot;System&quot;。关于这一点，我将在后面专门介绍名称空间的课程中详细介绍。</p></li><li><p>类&quot;class WelcomeCSS&quot;包含了程序所要用到的数据，和所要执行的方法的定义。</p><p>同诸如接口和结构这样的元素类似，类在程序中是用来描述对象的，这些元素都将会在后续课程中详细介绍。本例中的类不包含数据，只包含一个方法。该方法定义了该类的行为(或者称为该类所能做的事情)。</p></li><li><p>程序运行时，WelcomeCSS类中的该方法表明了该类所要完成的事情。</p><p>方法名&quot;Main&quot;作为保留字，作为程序的起点。&quot;Main&quot;前面是个名为&quot;static&quot;的修饰符。&quot;static&quot;修饰符表明该方法仅仅在该特定的类中工作，而不是在在该类的实例中工作。这是必需的，因为一旦程序启动后，并不存在对象的实例。类，对象和实例的具体用法将会在后面的课程中覆盖到。每个方法必须有个返回值类型。本例中，返回值类型是&quot;void&quot;，它表明&quot;Main&quot;函数没有返回值。每个方法名的后面也都跟着个参数表，参数表包含有零个或者多个参数并用括号括起来。为了简单起见，没有在&quot;Main&quot;后面添加参数。后面的课程中，将介绍&quot;Main&quot;方法所允许采用的参数类型。</p></li><li><p>&quot;Main&quot;方法通过&quot;Console.WriteLine(...)&quot; 语句表明其行为。</p><p>&quot;Console&quot; 是&quot;System&quot; 名称空间中的类。&quot;WriteLine(...)&quot;是&quot;Console&quot; 类中的方法。我们使用&quot;.&quot;这个句点操作符来标记程序中的从属元素。注意到，我们也可以这样来书写：&quot;System.Console.WriteLine(...)&quot;，这样的书写格式是很有趣的，它是根据&quot;namespace.class.method&quot; 的格式进行书写的。如果在程序的一开始，没有采用&quot;using System&quot;的声明，那么就必须严格遵守&quot;System.Console.WriteLine(...)&quot;这样的书写格式。该语句的执行结果是在控制台控制台上输出字符串&quot;Welcome to the C# Station Tutorial!&quot;。</p></li><li><p>注释是由&quot;//&quot;标出的。</p><p>例子中的这些注释都是单行注释，表明从该注释符号的开始处到该行结束处，都是注释部分。如果你的注释要跨越若干行，即多行注释，可以以符号&quot;<code>/*</code>&quot;开始，以符号&quot;<code>*/</code>&quot;结束，其中所包含的全部是注释。你也可以在多行注释符号中包含单行注释。但是，不能在单行注释符号后面放上多行注释符号。程序编译时，将忽略掉注释部分。注释的目的是为了用简单的英语给程序所要完成的工作加上注解。</p></li><li><p>所有语句都以分号&quot;;&quot;结束。</p><p>类和方法以&quot;{&quot;开始，以&quot;}&quot;结束。任何位于&quot;{&quot;和&quot;}&quot;之间的语句定义为块。块定义了程序元素的活动范围 (或者称为生命期和可见性)，这些概念将在后面的课程中加以介绍。</p></li><li><p>可以编写出能够接受命令行输入信息的程序。</p><p>命令行输入信息的集合是在&quot;Main&quot;方法中进行处理的。清单1-2中的程序，可以从命令行中接受输入一个名字，之后在控制台上显示出来。</p></li></ol><p>2.清单1-2. 读取命令行输入信息的程序NamedWelcome.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">NamedWelcome</span> <span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Write to console</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello， {0}!&quot;</span>， args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to the C# Station Tutorial!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>记住，要把你的名字添加到命令行中。</p><p>例如，在命令行中打入&quot;NamedWelcome Joe&quot;。如果不这样做，程序就会崩溃，在后面的课程中，将介绍如何检测这种情况，以及如何避免这种情况的出现。</p></li><li><p>在清单1-2中，在&quot;Main&quot;方法的参数表中有个入口。</p><p>参数名是<code>args</code>。 在程序的后面部分就要引用该参数。<code>string[]</code>是参数&quot;args&quot;的类型。&quot;string&quot;类型用于存放字符。这些字符可以是一个单词，也可以是多个单词。方括号&quot;<code>[]</code>&quot;表示数组，&quot;args&quot;参数由命令行上的若干个单词构成。</p></li><li><p>在&quot;Main&quot;方法的语句中，多了一条&quot;Console.WriteLine(...)&quot;语句。</p><p>该语句中的参数表同以往的写法不同，其中有个格式字符串&quot;{0}&quot; 参数。 格式串中的第一个参数从数字0开始，第二个参数从数字1开始，依此类推。 &quot;{0}&quot; 参数意味着引号后面的参数值将会输出到该位置。现在让我们来看看引号后面的参数。</p></li><li><p><code>args[0]</code>参数，它指向&quot;args&quot;数组中的第一个字符串。</p><p>数组中的第一个元素是<code>args[0]</code>， 第二个元素是<code>args[1]</code>，依此类推。例如，如果我在命令行中写上&quot;NamedWelcome Joe&quot;，<code>args[0]</code>的值就为&quot;Joe&quot;.</p></li></ol><p>让我们回到在格式字符串中嵌入的&quot;{0}&quot; 参数吧，因为<code>args[0]</code>是格式串后面的第一个参数， 一旦执行该命令时，<code>args[0]</code>的值&quot;Joe&quot;就会替换掉格式串中的&quot;{0}&quot;。一旦执行命令：&quot;NamedWelcome Joe&quot;，输出结果就会为：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>&gt;Hello， Joe!
&gt;Welcome to the C# Station Tutorial!  
</code></pre></div><p>通过控制台也可以把输入信息提供给程序。清单1-3演示了交互式处理用户输入的信息的方法。</p><p>3.清单1-3. 交互式处理输入信息的程序 InteractiveWelcome.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Namespace Declaration</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token comment">// Program start class</span>
<span class="token keyword">class</span> <span class="token class-name">NamedWelcome</span> <span class="token punctuation">{</span>
    <span class="token comment">// Main begins program execution.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Write to console/get input</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;What is your name?: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Hello， {0}! &quot;</span>， Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Welcome to the C# Station Tutorial!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><p>说明</p><p>这一次，&quot;Main&quot;方法没有用到任何参数，但现在程序中有了三条语句，前面两条语句不同于第三条语句，它们是：&quot;Console.Write(...)&quot;而不是 &quot;Console.WriteLine(...)&quot;。区别是：&quot;Console.Write(...)&quot;语句把信息输出到控制台，之后光标停留在同一行，而&quot;Console.WriteLine(...)&quot;把信息输出，之后换行。</p><p>第一条语句仅仅输出&quot;What is your name?: &quot;到控制台。</p><p>第二条语句要等到其参数被适当地处理之后，才会输出信息。 格式串后面的第一个参数是：&quot;Console.ReadLine()&quot;。这就使得程序要等待用户在控制台输入信息，输入信息以回车或者换行结束。该方法的返回值替换了格式串中的&quot;{0}&quot;参数，并输出到控制台上。</p><p>最后一个语句也用来输出信息到控制台，这一点我们在前面已经介绍过。一旦运行了程序&quot;InteractiveWelcome&quot;，其输出结果为：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>&gt;What is your Name? 
&gt;Hello， ! Welcome to the C# Station Tutorial!  
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>到现在为止，你已经了解了C#程序的基本结构，名称空间和类。你还了解到&quot;Main&quot;方法是C# 程序的入口，并学会了如何捕捉命令行的输入信息，以及如何进行交互式的I/O操作。</p><p>(责任编辑:DawnSummit guixf@staff.ccidnet.com)</p>`,24);function d(m,g){const a=o("ExternalLinkIcon");return e(),p("div",null,[i,r,n("p",null,[s("在本文开始写作的时候，虽然商用C# 编译器尚未推出， 但你可以下载微软的"),n("a",q,[s(".NET Frameworks SDK Beta 1"),c(a)]),s(".")]),k])}const h=t(l,[["render",d],["__file","cspcls4_1.html.vue"]]);export{h as default};
