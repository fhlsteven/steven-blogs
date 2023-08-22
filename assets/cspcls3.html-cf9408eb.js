import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t={},o=p(`<h1 id="c-进阶教程" tabindex="-1"><a class="header-anchor" href="#c-进阶教程" aria-hidden="true">#</a> C#进阶教程</h1><ul><li><a href="#csp_1">C#进阶教程(一)</a></li><li><a href="#csp_2">C#进阶教程(二)</a></li><li><a href="#csp_3">C#进阶教程(三)</a></li><li><a href="#csp_4">C#进阶教程(四)</a></li><li><a href="#csp_5">C#进阶教程(五)</a></li><li><a href="#csp_6">C#进阶教程(六)</a></li><li><a href="#csp_7">C#进阶教程(七)</a></li><li><a href="#csp_8">C#进阶教程(八)</a></li><li><a href="#csp_9">C#进阶教程(九)</a></li><li><a href="#csp_10">C#进阶教程(十)</a></li><li><a href="#csp_11">C#进阶教程(十一)</a></li></ul><h2 id="c-进阶教程-一" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-一" aria-hidden="true">#</a> <a id="csp_1">C#进阶教程(一)</a></h2><p>转载自：中国ASP联盟 人气：10599</p><p>在表面上,C#和JAVA非常地像,以致一个懂JAVA的人能够很快的掌握C#的结构.致于其内部的实现机理,那我也不太清楚,只能与大家在学习中共同进步了,还希望大家多多捧场呀!</p><p>好,为了给大家一个更清晰的感觉,我首先给大家一个例子,自然是HelloWorld(老土!).</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// HelloWorld\\Hello1.cs</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它的输出结果是:</p><p><code>Hello, World!</code></p><p>有的朋友已经发现了,就是JAVA!只不过把<code>System.out.prinln()</code>改成了<code>System.Console.WriteLine()</code>罢了!</p><p>下面我们来分析一下这个程序，整个程序由一个<code>public</code>类(class)组成,里面必然有一个<code>public static void Main()</code>这个方法,执行代码就在里面.<code>System.Console.WriteLine(&quot;Hello, World!&quot;)</code>这个语句的作用就是向控制台(Console)打印一行<code>Hello,World!</code>.很简单吧!</p><p>下面再来一个:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// HelloWorld\\Hello2.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个程序用了一个<code>using</code>,其实它就等于JAVA里的<code>import</code>,就是引用一个包的意思.当引用了这个包之后,在这个包中的<code>Console</code>类就不要指出全称了,只要<code>Console.WriteLine()</code>就可以了,不必用<code>System.Console.WriteLine()</code>这么长了,省略了<code>System</code>了.</p><p>例三,如下显示了如何显示命令行的参数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// HelloWorld\\Hello3.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;You entered the following {0} command line arguments:&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到,字符串数组<code>args</code>指的就是输入的参数.因为它是<code>String</code>类,所以都有<code>Length</code>方法,所以可以有<code>args.length</code>来访问它的长度.然后用一个<code>for</code>循环来把它们显示出来.至于循环这些东西,大都沿用了C的语法.</p><p>例四,如果要一个返回值,那么可以像下面这样写,用<code>return</code>:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// HelloWorld\\Hello4.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello4</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>很简单吧!呵呵!对懂C或JAVA的人来说,比较好看懂,如果是VB或VBS的使用者,就有一些困难了.!</p><h2 id="c-进阶教程-二" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-二" aria-hidden="true">#</a> <a id="csp_2">C#进阶教程(二)</a></h2><p>下面的代码显示了我们如何打印多个参数:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// CommandLine\\cmdline1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommandLine</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Number of command line parameters = {0}&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Arg[{0}] = [{1}]&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果你的输入为:</p><p><code>cmdline1 A B C</code></p><p>那么它的输出为:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Number of command line parameters = 3
Arg[0] = [A]
Arg[1] = [B]
Arg[2] = [C]
</code></pre></div><p>哈哈,看出了其中的秘密了吧!是的<code>{0}</code>是一个标记,它告诉系统,这里留下了给第<code>0</code>个参数用,在程序中,这第<code>0</code>个参数就是<code>i</code>.因此,打印出来的就是<code>Arg[0]</code>,面不是<code>Arg[{0}]</code>了,哈哈! 例二向大家展示了<code>foreac</code>h这个语句的用法,其实在ASP中,这个经常用到:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// CommandLine\\cmdline2.cs </span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommandLine2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Number of command line parameters = {0}&quot;</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>很显然,<code>args</code>是一个数组,而且是字符型的.<code>foreach</code>的意思就是把其中的所有元素都循环完.</p><p>运行得出:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>&gt;cmdline2 John Paul Mary 

Number of command line parameters = 3 
John
Paul
Mary
</code></pre></div><h2 id="c-进阶教程-三" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-三" aria-hidden="true">#</a> <a id="csp_3">C#进阶教程(三)</a></h2><p>今天我要向大家讲的是C#的数组(Arrays).C#中的数组和其它一些优秀的语言一样,也是从0开始计的,这从我们以前的例子里可以看出来,也就是说,一个数组的第一个元素是<code>a[0]</code>,而不是像VB的<code>a(1)</code>.虽然是这样,但是你还是要注意一些区别.</p><p>在声明一个数组的时候,方括号必须跟在类型后面,而不能跟在变量名后面,如:</p><p><code>int[] table; //不能写成int table[]</code></p><p>这一点显然与JAVA是不同的,在JAVA中这样是可以的.</p><p>还有就是在C#中你可以不指定数组的大小,这与C语言是不一样的.这使得你可以指定任意长度的数组,如下:</p><p><code>int[] numbers; // 它的长度是任意的</code></p><p>当然,你也可以指定它的大小:</p><p><code>int[10] numbers;//指定了一个长度为10的数组.</code></p><p>在C#中,支持的数组包括:单维数组,多维数组和多重数组.它们的声明方法如下:</p><ul><li>单维数组:　<code>int[] numbers;</code></li><li>多维数组:　<code>string[,] names;</code></li><li>多重数组:　<code>byte[][] scores;</code></li></ul><p>声明一个数组并不代表已经建立了它.在C#中,所有的数组元素都是对象(倒!怎么跟JAVA说得一样&amp;*%$#@),所以在建立它之前,首先要将它实例化:</p><ul><li>单维数组:　<code>int[] numbers = new int[5];</code></li><li>多维数组:　<code>string[,] names = new string[5,4];</code></li><li>多重数组:　<code>byte[][] scores = new byte[5][];</code></li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> x <span class="token operator">&lt;</span> scores<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> x<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scores<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>呵呵,这有点奇怪吧,先不用理它,以后再说.</p><p>我们同样可以建立更大的数组,比如一个三维数组:</p><p><code>int[,,] buttons = new int[4,5,3];</code></p><p>我们甚至可以混合多维数组和多重数组,下面的例子说明了这些:</p><p><code>int[][,,][,] numbers;</code></p><p>下面的例子展示了以上所有构建数组的方法:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Arrays\\arrays.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">DeclareArraysSample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Single-dimensional array</span>
        <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// Multidimensional array</span>
        <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// Array-of-arrays (jagged array)</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> scores <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// Create the jagged array</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> scores<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            scores<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// Print length of each row</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> scores<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Length of row {0} is {1}&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> scores<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Length of row 0 is 3
Length of row 1 is 4
Length of row 2 is 5
Length of row 3 is 6
Length of row 4 is 7
</code></pre></div><p>在C#中数组的初始化可以在建立时就初始化,和JAVA和C一样,用的是<code>{}</code>.当然,很明显,你的初始化值必须与你声明的数组类型一样,比如你定义了一个<code>int</code>类型的,你就不能给它一个<code>String</code>,唉,JAVA看多了,在C#中,<code>String</code>应写为<code>string</code>,要不然,又要出错了.SUNWEN可能在后面的课程中出现这样的错误,还望大家指正.呵呵!</p><p>下面的例子说明了数组的初始化:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;Matt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Joanne&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Robert&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>你也可以省略数组的大小,如:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span><span class="token string">&quot;Matt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Joanne&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Robert&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>你甚至可以省略<code>new</code>语名,如果你给了值:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> names <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;Matt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Joanne&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Robert&quot;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>在C#中,数组的访问和C/C++/JAVA是一样的,下面的语句建立了一个数组,并将它的第五个元素赋值为5:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
</code></pre></div><p>如果你没有C/JAVA/C++的编程经验,那么SUNWEN在此提醒,<code>numbers[4]</code>表示的是这个数组的第五个元素,因为我在前面已经说过了,数组是从<code>0</code>开始计的,所以<code>0,1,2,3,4</code>正好是第五个,所以....(台下:笨蛋,你以为我们不知道呀,快继续说!)</p><p>下面的例子是关于多维数组的:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
numbers<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
</code></pre></div><p>再次注意,C#中的所有数组都是对象(faint,D版),所以,你可以用访问对象的方法,来访问数组.而<code>System.Array</code>就是数组的抽象.你可以参看文档来看<code>Array</code>类支持的方法.举个例子来说吧,你可以用<code>length</code>属性来访问数组的长度.如下例:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> numbers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> LengthOfNumbers <span class="token operator">=</span> numbers<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
</code></pre></div><h2 id="c-进阶教程-四" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-四" aria-hidden="true">#</a> <a id="csp_4">C#进阶教程(四)</a></h2><h3 id="c-中的属性" tabindex="-1"><a class="header-anchor" href="#c-中的属性" aria-hidden="true">#</a> C#中的属性</h3><p>这次我要向大家讲的是C#中的属性.属性是什么呢,比如说我是男的,男就是我的一人属性.我是一个大一的学生,大一也是我的一个属性.属性就是一个对象的性质.很简单吧,呵呵!下面,我给出两个例子,第一个例子出明了如何声明一个可以修改的属性,另一个例了建立了一个抽象的属性(Abstract),并且说明了如何在子类中丢弃它.好,下面让我们开始吧.</p><p>例子一:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Properties\\person.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> myName <span class="token operator">=</span> <span class="token string">&quot;N/A&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myAge <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 声明一个字符型的属性Name</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myName<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myName <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 声明一个int型的Age属性</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Age
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myAge<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myAge <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Name = &quot;</span> <span class="token operator">+</span> Name <span class="token operator">+</span> <span class="token string">&quot;, Age = &quot;</span> <span class="token operator">+</span> Age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Simple Properties&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 建立一个Person的实例</span>
        <span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打印出它的属性</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Person details - {0}&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 对属性进行一些设置</span>
        person<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Joe&quot;</span><span class="token punctuation">;</span>
        person<span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Person details - {0}&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 增加年龄</span>
        person<span class="token punctuation">.</span>Age <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Person details - {0}&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的输出是：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Simple Properties
Person details - Name = N/A, Age = 0
Person details - Name = Joe, Age = 99
Person details - Name = Joe, Age = 100
</code></pre></div><p>好了，又起床了，昨天写到这，就跑到床上睡了，呵呵.现在是五一的第二天,看看我今天能写几篇,昨天写了二篇.从上面的程序我们可以看出,一个类的属性的设置,借用了VB的概念,和JAVA中不尽相同了.(这就是M$,TMD!)有的朋友可能很奇怪,为什么我们可以用<code>Console.WriteLine()</code>来打印一个对象<code>person</code>呢.其实道理很简单,和在JAVA中的一样,当调节器用一个打印方法时,这个对象自动调用它的<code>ToString()</code>(在JAVA中是<code>toString</code>,TMD,又差点犯错!)方法.在33行,我们可以看到有这个方法的影子,<code>override</code>这个关键字大概就是覆盖父类的方法吧,这是不是有点多余?我们可以看到,一个对象的属性的设置是通过一个<code>get()</code>和<code>set()</code>组合来完成的,当然,还有一个<code>value</code>这个东东.补充一下,你还可以控制一个属性的读/写权限,只是把<code>get()</code>和<code>set()</code>简单地去掉就可以了,比如你不要写的属性,就不要<code>set()</code>就可以了,如果你不要读,就不要<code>get()</code>吧.总得感觉,C#在这点上没有JAVA来的灵活(完了,又要被盖痴打了!).</p><p>第二个例子:</p><p>这个例子说明了如何建立抽象的属性(Abstract),什么是抽象的属性呢,所谓的抽象的属性呢,就是....(唉,每次废话都这么多!FT)</p><p>一个抽象类并不提供执行属性存取程序,并且,他可以在子类中被忽略.下面的例子有三个文件,你要分别编译它们才能得到结果,它们是:</p><ul><li><code>abstractshape.cs</code>: <code>Shape</code>类,包含一个<code>Area</code>抽象属性</li><li><code>shapes.cs</code>: <code>Shape</code>的子类</li><li><code>shapetest.cs</code>: 显示程序.</li></ul><p>要编译这些程序,运行:<code>csc abstractshape.cs shapes.cs shapetest.cs</code>就可以了.运行完之后,它会产生<code>shapetest.exe</code>这个可执行程序.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Properties\\abstractshape.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> myId<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Shape</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> s<span class="token punctuation">;</span> <span class="token comment">// 这句调用了Id属性的set构建器</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Id
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myId<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            myId <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Area
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Id <span class="token operator">+</span> <span class="token string">&quot; Area = &quot;</span> <span class="token operator">+</span> <span class="token keyword">double</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>Area<span class="token punctuation">,</span> <span class="token string">&quot;F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>看这个程序, 实际上非常地简单,当这个类对的对象被建立时,初始化部分为007-010,它把建立对象的参数<code>s</code>给了<code>Id</code>这个属性.然后进行了上一个例子的操作.实际上,我们可以把抽象属性与JAVA中的接口(Interface)相比,它们只提拱一个方法的名称,而不提供这个方法的内容.就像<code>Area</code>这个抽象属性,有一个<code>get</code>,但是它并没有指定<code>get</code>方法(也许它不能称之为方法)里的内容,即要<code>get</code>做什么事情.</p><p>这个事情,由它的子类来做.</p><p>第二个文件:在这个文件中,一个类覆盖了(override)了<code>Area</code>属性.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Properties\\shapes.cs</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Shape</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> mySide<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Square</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> side<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        mySide <span class="token operator">=</span> side<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Area
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> mySide <span class="token operator">*</span> mySide<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Shape</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myRadius<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Circle</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> radius<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myRadius <span class="token operator">=</span> radius<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Area
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myRadius <span class="token operator">*</span> myRadius <span class="token operator">*</span> System<span class="token punctuation">.</span>Math<span class="token punctuation">.</span>PI<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Shape</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myWidth<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myHeight<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Rectangle</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> width<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> height<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        myWidth <span class="token operator">=</span> width<span class="token punctuation">;</span>
        myHeight <span class="token operator">=</span> height<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Area
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> myWidth <span class="token operator">*</span> myHeight<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子就有些让我们一头雾水了,<code>:</code>是干什么的,好象是继承,相当于JAVA中的<code>extends</code>吧.我想是的.我们先看一看吧.</p><p>下面的第三个文件就是一个测试文件了,很简单,大家看一看.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Properties\\shapetest.cs</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Shape<span class="token punctuation">[</span><span class="token punctuation">]</span></span> shapes <span class="token operator">=</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Square</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;Square #1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Circle</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;Circle #1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;Rectangle #1&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Shapes Collection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span> s <span class="token keyword">in</span> shapes<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从这个例子上看,<code>:</code>这个符号的确是<code>extends</code>的意思,就是继承.继承是什么意思,说白了,就是生孩子的意思.比如下面一句<code>a extends ab</code>,这名就是说<code>a</code>这个类继承了<code>ab</code>类的所有东西,同时可以添加和删除<code>ab</code>中的一些东西.就这么简单,但是这是现代软件发展的一项重要技术,因为它可以使软件的重用性大大提高.唉,这些就只有大三大四的人说了,我就没资格了.呵呵.</p><p>这个程序的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Shapes Collection
Square #1 Area = 25.00
Circle #1 Area = 28.27
Rectangle #1 Area = 20.00
</code></pre></div><p>完了,这一节又完了.要理解这一节,有一定的难度, 特别对那些没有JAVA或C++编程经验的朋友.不过不要害怕,鼓起勇气学下去,一定会有所收获的.</p><h2 id="c-进阶教程-五" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-五" aria-hidden="true">#</a> <a id="csp_5">C#进阶教程(五)</a></h2><h3 id="c-中的库-libraries" tabindex="-1"><a class="header-anchor" href="#c-中的库-libraries" aria-hidden="true">#</a> C#中的库(libraries)</h3><p>言归正传,我现在要说的是库(libraries),和大家一起学习如何用C#建立一个DLL文件.说起DLL,肯定是无人不知,无人不晓,这个WINDOWS的典型代表,同时也经常是大家功击的对象.呵呵,不管怎么样,学还是要学的.我们下面就开始,如何用命令行方式将一个C#程序编译成DLL,和如何在客户端使用他.</p><p>这个例子包括两个文件,一个是<code>Factorial.cs</code>,作用是计算一个数字的阶乘.还有一个是<code>DigitCounter.cs</code>,作用是计算传过来的字符串参数中的数字的数目.</p><p>我们可以这样来建立库,在命令行方式下这样做:</p><p><code>csc /target:library /out:Functions.dll Factorial.cs DigitCounter.cs</code></p><p>下面讲一下各个参数的用法:</p><ul><li><code>/target:library</code>:向系统指出输出的是一个DLL库,而不是一个EXE的可执行文件.</li><li><code>/out:Functions.dll</code>:指定输出的DLL的文件名,即Functions.dll,一般地,如果你省略了第一个参数,那么默认的文件名将是第一个文件的文件名,即Factorial.dll.</li></ul><p>下面我们再来建立一个文件,即使用这个库的文件,叫客户端文件,<code>FunctionClient.cs</code>.建立好后,用下面的语名编译:</p><p><code>csc /out:FunctionTest.exe /R:Functions.DLL FunctionClient.cs</code></p><p>下面说一下这个编译语句的用法:</p><ul><li><code>/out:FunctionTest.exe</code>:指出输出的文件名是FunctionTest.exe</li><li><code>/R:Functions.DLL</code>:指出要引用的库,如果不是在当前目录下,必须要指出其的完整路径.</li></ul><p>下面我就把这几个文件的代码写在下面:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Libraries\\Factorial.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Functions</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Factorial</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Calc</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">?</span> <span class="token number">1</span> <span class="token punctuation">:</span> <span class="token punctuation">(</span>i <span class="token operator">*</span> <span class="token function">Calc</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这是<code>Factorial.cs</code>这个文件的代码.在003行中,<code>namespace</code>的意思是名字空间,据M$的介绍,库必须根据它的名字空间打包,以使.NET能够正确地载入你的类.</p><p>下面是<code>DigitCounter.cs</code>这个文件的内容:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Libraries\\DigitCounter.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Functions</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DigitCount</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">NumberOfDigits</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> theString<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> theString<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsDigit</span><span class="token punctuation">(</span>theString<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    count<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> count<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意,这个例子中的namespace应与第一个的一致,因为它们是同一个库中的.NumberOfDigits方法计算了参数中的数字的个数.</p><p>第三个文件是<code>FunctionClient.cs</code></p><p>我们知道,一个库一旦建立,就可以被别的类利用(废话,要不然怎么叫库呢?).下面的C#程序就利用了我们刚才建立的库中的类.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Libraries\\FunctionClient.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Functions</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">FunctionClient</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Function Client&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Usage: FunctionTest ... &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> num <span class="token operator">=</span> Int32<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>
            <span class="token string">&quot;The Digit Count for String [{0}] is [{1}]&quot;</span><span class="token punctuation">,</span>
            args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>
            DigitCount<span class="token punctuation">.</span><span class="token function">NumberOfDigits</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>
            <span class="token string">&quot;The Factorial for [{0}] is [{1}]&quot;</span><span class="token punctuation">,</span>
            num<span class="token punctuation">,</span>
            Factorial<span class="token punctuation">.</span><span class="token function">Calc</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在002行中,一个<code>using Functions</code>指明了引用<code>Functions.DLL</code>这个类.</p><p>如果我们在命令行中键入如下命令,就可以看到输出:</p><p><code>FunctionTest 3 5 10</code></p><p>输出:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Function Client
The Digit Count for String [3] is [1]
The Factorial for [3] is [6]
The Digit Count for String [5] is [1]
The Factorial for [5] is [120]
The Digit Count for String [10] is [2]
The Factorial for [10] is [3628800]
</code></pre></div><p>注意:当你运行这个.EXE文件时,它引用的DLL文件可以是在当前目录,子目录,或是CORPATH这个环境变量.CORPATH这个环境变量是在.NET环境中的类路径,用来指引系统寻找类.说白了,就是JAVA中的CLASSPATH,明白了吧,呵呵.</p><h2 id="c-进阶教程-六" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-六" aria-hidden="true">#</a> <a id="csp_6">C#进阶教程(六)</a></h2><h3 id="c-中的版本处理" tabindex="-1"><a class="header-anchor" href="#c-中的版本处理" aria-hidden="true">#</a> C#中的版本处理</h3><p>现在我要说的是C#中的版本处理.其实这是任何一个软件必须要考虑的问题.每个软件都不只一个版本(除了我写的以外),因此版本处理显得非常地重要.JAVA很好地处理了这个问题,而我个人认为C#借鉴了JAVA的处理方法,所以,也做得很好.</p><p>在C#中,如果你在声明一个方法的时候用了<code>virtual</code>这个关键字,那么,在派生类中,你就可以使用<code>override</code>或者<code>new</code>关键字来弃用它或是忽略它.如果你在父类中用了<code>virtual</code>这个关键字,而在其派生类中又没有用<code>override</code>或<code>new</code>关键字,而直接引用一个同名方法的话,编译器将会报错,并将以<code>new</code>方式,即忽略派生类中的方法的方式来运行.下面的例子可以帮助你来理解:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Versioning\\versioning.cs</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBase</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyBase-Meth1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyBase-Meth2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyBase-Meth3&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyDerived</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyDerived-Meth1&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">new</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyDerived-Meth2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Meth3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 系统在这里将会有一个警告,并且将会隐藏方法Meth3() </span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;MyDerived-Meth3&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyDerived</span> mD <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDerived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyBase</span> mB <span class="token operator">=</span> <span class="token punctuation">(</span>MyBase<span class="token punctuation">)</span>mD<span class="token punctuation">;</span>

        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mB<span class="token punctuation">.</span><span class="token function">Meth1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mB<span class="token punctuation">.</span><span class="token function">Meth2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mB<span class="token punctuation">.</span><span class="token function">Meth3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyDerived-Meth1
MyBase-Meth2
MyBase-Meth3
</code></pre></div><p>可以很明显地看出来,后两个<code>new</code>关键字的输出是父类中的方法的输出,所以可以看出,<code>new</code>这个关键字的作用是如果在以前的版本中有这个方法,就沿用以前的方法,而不用我现在方法内容.而<code>virtual</code>的方法的作用正好相反,它的作用是如果在父类中有这样一个方法,则用我现在写的方法内容,让以前的滚蛋!不过,这里用<code>new</code>好象不太好,让人误解(糟了,盖痴又要打我了!&amp;*%$#@).</p><p>如果你把第037行去掉,把039-041中的<code>mB</code>全部改为<code>mD</code>，输出又变为:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MyDerived-Meth1
MyDerived-Meth2
MyDerived-Meth3
</code></pre></div><p>这又说明了什么呢,说明了派生类的对象只有在被父类重塑的时候,<code>override</code>和<code>new</code>关键字才会生效.呵呵,这样说的确有点难以理解,大家只有自己动手,才能搞清楚这其中的机关,所谓&quot;实践是检验C#的唯一标准&quot;,哈哈!</p><p>在C#中,你可以自由地为在派生类中为加入一个方法,或者覆盖父类的方法,如下所示,非常地简单:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Derived</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>和:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Base</span> 
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Derived</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div><h2 id="c-进阶教程-七" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-七" aria-hidden="true">#</a> <a id="csp_7">C#进阶教程(七)</a></h2><h3 id="c-中的结构-struct" tabindex="-1"><a class="header-anchor" href="#c-中的结构-struct" aria-hidden="true">#</a> C#中的结构(struct)</h3><p>我要说的是C#中的,注意,我在这里说的结构不是指的C#的语言结构.这里所说的是一种与类(class)相对的东西,下面我就与类相对比,来说一说这个<code>struct</code>.</p><p>下面的这个例子讲述了如何建立一个具有属性,方法和一个字段的结构.并讲述如何使用他.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Structs\\struct1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">SimpleStruct</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> xval<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> X
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> xval<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">)</span>
                xval <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DisplayX</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The stored value is: {0}&quot;</span><span class="token punctuation">,</span> xval<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TestClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SimpleStruct</span> ss <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SimpleStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ss<span class="token punctuation">.</span>X <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
        ss<span class="token punctuation">.</span><span class="token function">DisplayX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的输出是:</p><p><code>The stored value is: 5</code></p><p>从上面的例子中我们可以看到结构和类似乎是一样的.的确,如果你用类去重亲写这个程序,结果是一样的.但是,很明显,两个一样的东西是不可能一起出现的.</p><p>结构(struct)是值(value)型的,而类是参考型的.这样,你就可以用结构建立像内建类型那样的对象了.</p><p>还有就是如果你用一个new关键字建立一个类的实例的时候,它是以堆(heap)来分配的,而用<code>new</code>来建立一个结构的的实例的时候,它是以栈(stack)来分配.这会给我们提高很多性能(M$说的).好了,让我们再来看下面的例子吧:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Structs\\struct2.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TheClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">TheStruct</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">TestClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">structtaker</span><span class="token punctuation">(</span><span class="token class-name">TheStruct</span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        s<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">classtaker</span><span class="token punctuation">(</span><span class="token class-name">TheClass</span> c<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">TheStruct</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TheStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">TheClass</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TheClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        a<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">structtaker</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">classtaker</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;a.x = {0}&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;b.x = {0}&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>a.x = 1
b.x = 5
</code></pre></div><p>从这个例子例子可以看出,当一个结构被传递到一个方法时,被传递的只不过是一个副本,而一个类被传递时,被传递的是一个参考.所以<code>a.x=</code>输出的是<code>1</code>,不变,而<code>b.x</code>却变了.</p><p>还有的区别就是结构可以不用<code>new</code>来实例化,而类却要.如果你不用<code>new</code>来实例化一个结构,那么所有的字段将仍然处于未分配状态,直到所有的字段被初始化.和类一样,结构可以执行接口.更重要的是,结构没有继承性,一个结构不能从别的类继承,也不能是别的类的基类.</p><p>例三:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IImage</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">Picture</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IImage</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// painting code goes here</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">;</span> <span class="token comment">// other struct members</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-进阶教程-八" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-八" aria-hidden="true">#</a> <a id="csp_8">C#进阶教程(八)</a></h2><h3 id="c-中的ado数据库访问" tabindex="-1"><a class="header-anchor" href="#c-中的ado数据库访问" aria-hidden="true">#</a> C#中的ADO数据库访问</h3><p>这一节我要讲的是大家非常关心的,肯定也是非常感兴趣的部分.嘿嘿,也是我写教程最拿手的部分----ADO数据库访问.想到这,我就想起我在去年写的&quot;访问数据库&quot;系列文章,嘿嘿!所以呢,如果你觉得对记录集之类的东西比较难理解的话,我推荐你先看一看我的那几篇文章.好了,让我们开始吧!</p><p>什么是ADO(ActiveX Data Objects译作ActiveX数据对象),ADO是一个非常简单的思想,一种让你仅用一种方式去访问数据的思想.ADO不算一个新的思想,仅是采用现有的数据访问技术,将其融合起来.如果你不理解ADO,想一想ODBC吧!其实我们在搞ASP的时候,就用到了ADO,还记得吗,那个曾经被我们用过无数次的<code>set conn=Server.CreateObject(&quot;ADODB.Connection&quot;)</code>吗?是的,就是它.至于ADO的一些概念性的东西,请大家自行查阅资料,不过,其实不了解也没有关系,只把它想象成一个M$给我们的访问数据的工具吧!</p><p>OK,下面的例子是以一个M$ ACCESS 2000的数据库为基础的,它的结构如下,表名是<code>Categories</code>,文件名是<code>BugTypes.mdb</code> ,赶快建一个吧:</p><table><thead><tr><th>Category ID</th><th>Category Name</th></tr></thead><tbody><tr><td>1</td><td>Bugbash stuff</td></tr><tr><td>2</td><td>Appweek Bugs</td></tr><tr><td>3</td><td>.NET Reports</td></tr><tr><td>4</td><td>Internal support</td></tr></tbody></table><p>好的,我先把所有的程序都写出来,然后我们来一句一句的品尝:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// ADO\\adosample.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>ADO</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 设定好连接字符串和选择命令字符串</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strAccessConn <span class="token operator">=</span> <span class="token string">&quot;Provider=Microsoft.Jet.OLEDB.4.0;Data Source=BugTypes.MDB&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strAccessSelect <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM Categories&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">//建立记录集,并把Categories这个表填进去 </span>
        <span class="token class-name">DataSet</span> myDataSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Categories&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//建立ADO实例</span>
        <span class="token class-name">ADOConnection</span> myAccessConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ADOConnection</span><span class="token punctuation">(</span>strAccessConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ADODataSetCommand</span> myAccessDataSetCmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ADODataSetCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        myAccessDataSetCmd<span class="token punctuation">.</span>SelectCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ADOCommand</span><span class="token punctuation">(</span>strAccessSelect<span class="token punctuation">,</span> myAccessConn<span class="token punctuation">)</span><span class="token punctuation">;</span>

        myAccessConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            myAccessDataSetCmd<span class="token punctuation">.</span><span class="token function">FillDataSet</span><span class="token punctuation">(</span>myDataSet<span class="token punctuation">,</span> <span class="token string">&quot;Categories&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            myAccessConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 一个记录集可以包含多个表,我们把它们放到一个数组中</span>
            <span class="token class-name">DataTable<span class="token punctuation">[</span><span class="token punctuation">]</span></span> dta <span class="token operator">=</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">.</span>All<span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DataTable</span> dt <span class="token keyword">in</span> dta<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Found data table {0}&quot;</span><span class="token punctuation">,</span> dt<span class="token punctuation">.</span>TableName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//下面的两行程序展示了两种从一个记录集中得到这个数据集中的表格数的方法 </span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} tables in data set&quot;</span><span class="token punctuation">,</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">.</span>Count<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} tables in data set&quot;</span><span class="token punctuation">,</span> dta<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//下面的几行程序说明了如何从一个记录集中依靠表格的名称来取得信息 </span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} rows in Categories table&quot;</span><span class="token punctuation">,</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Categories&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>Count<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//列的信息是自动从数据库中得到的,所以我们可以用以下的代码</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} columns in Categories table&quot;</span><span class="token punctuation">,</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Categories&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>Count<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">DataColumn<span class="token punctuation">[</span><span class="token punctuation">]</span></span> drc <span class="token operator">=</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Categories&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Columns<span class="token punctuation">.</span>All<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DataColumn</span> dc <span class="token keyword">in</span> drc<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//打印出列的下标和列的名称和数据类型</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Column name[{0}] is {1}, of type {2}&quot;</span><span class="token punctuation">,</span> i<span class="token operator">++</span><span class="token punctuation">,</span> dc<span class="token punctuation">.</span>ColumnName<span class="token punctuation">,</span> dc<span class="token punctuation">.</span>DataType<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">DataRow<span class="token punctuation">[</span><span class="token punctuation">]</span></span> dra <span class="token operator">=</span> myDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Categories&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">.</span>All<span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DataRow</span> dr <span class="token keyword">in</span> dra<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//打印出CategoryID和CategoryName</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;CategoryName[{0}] is {1}&quot;</span><span class="token punctuation">,</span> dr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Oooops. Caught an exception:\\n{0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>看起来,这个例子是有一些复杂的,只怪我例子选的不好,呵呵.不过,细细分析一下,还是可以理解的.我现在说一下这个例子中几个特别的东东.第一就是不象在ASP中,一个命令字符串被须被当作一个命令对象.</p><p>020做的正是这个事情.注意,在015行有一个<code>myDataSet.Tables.Add(&quot;Categories&quot;)</code>语句,这并不是把数据库中的<code>Categories</code>这个表填进去,只不过是建一个空表,而025才是真的填充数据.</p><p>这个例子的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Found data table Categories
1 tables in data set
1 tables in data set
4 rows in Categories table
2 columns in Categories table
Column name[0] is CategoryID, of type Int32
Column name[1] is CategoryName, of type System.String

CategoryName[1] is Bugbash stuff
CategoryName[2] is Appweek Bugs
CategoryName[3] is .NET Reports
CategoryName[4] is Internal support
</code></pre></div><p>好了,就说到这吧,SUNWEN真是想睡了,什么音乐都不管用了,呵呵.这个例子还真要花大力气才能完全理解.O.K.886!</p><h2 id="c-进阶教程-九" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-九" aria-hidden="true">#</a> <a id="csp_9">C#进阶教程(九)</a></h2><h3 id="c-中的用户自定义转换-user-defined-conversions" tabindex="-1"><a class="header-anchor" href="#c-中的用户自定义转换-user-defined-conversions" aria-hidden="true">#</a> C#中的用户自定义转换(User-Defined Conversions)</h3><p>现在我要说的是C#中的用户自定义转换(User-Defined Conversions),其中用到了前面说的struct的知识,就是结构呀,忘了吗?好,没忘就好.从我们以下的课程我们可以看到结构的用处(刚才我还在想它有什么用,呵呵).用class声明的是一个类,而用struct声明的可以看作是一个类型,对,就是像C#自带的int,short,long那样的类型了.</p><p>C#中可以允许我们对结构(struct)和类(class)进行转换,所以我们可以在其中定义一些转换.但是,C#规定,所有的转换声明都必须在显示(explicit)和隐示(implicit)中选择一个.比方说,我们用这个语句的时候</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">:</span>
</code></pre></div><p>就用到了<code>int</code>的隐示的转换<code>toString</code>.如果是<code>(String)a</code>,就叫做显示.所以,显/隐之差就在于是否表现出来.大家现在肯定还是一头雾水,等到明天我把例子写出来再分析一下就清楚了,要熄灯了,我先走一步了!</p><p>喔~~~~~终于起来了，五月五日8:45.下面给出例子,在这个例子中,一个名为<code>RomanNumeral</code>的类型被声明,然后对他实施了好几种转换.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// UserConversions\\conversion.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">RomanNumeral</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">RomanNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">RomanNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RomanNumeral</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">explicit</span> <span class="token keyword">operator</span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token class-name">RomanNumeral</span> roman<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> roman<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token class-name">RomanNumeral</span> roman<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Conversion not yet implemented&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">RomanNumeral</span> numeral<span class="token punctuation">;</span>
        numeral <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token comment">// 显式地从numeral到int的转换</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>numeral<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 隐示地转换到string</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>numeral<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 显示地转换到int,然后显示地转换到short</span>
        <span class="token class-name"><span class="token keyword">short</span></span> s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>numeral<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子子的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>10
Conversion not yet implemented
10
</code></pre></div><p>注意009和013的<code>operator</code>操作符,它是一个转换操作符.</p><p><code>static public explicit operator int(RomanNumeral roman)</code>,记住这样的形式,它就代表了一个转换.再看第033行,因为在前面int这个转换被声明成了explicit,即显示地,所以,在使用这个转换时,必须用括号.</p><p>下面再给出一个例子,这个例子声明了两个结构,<code>RomanNumeral</code>和<code>BinaryNumeral</code>,然后在它们之间进行转换.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// UserConversions\\structconversion.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">RomanNumeral</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">RomanNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">RomanNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RomanNumeral</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span>
    <span class="token function">RomanNumeral</span><span class="token punctuation">(</span><span class="token class-name">BinaryNumeral</span> binary<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RomanNumeral</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>binary<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">explicit</span> <span class="token keyword">operator</span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token class-name">RomanNumeral</span> roman<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> roman<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token class-name">RomanNumeral</span> roman<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Conversion not yet implemented&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">BinaryNumeral</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">BinaryNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">BinaryNumeral</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryNumeral</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token keyword">string</span><span class="token punctuation">(</span><span class="token class-name">BinaryNumeral</span> binary<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;Conversion not yet implemented&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token keyword">explicit</span> <span class="token keyword">operator</span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token class-name">BinaryNumeral</span> binary<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">(</span>binary<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">RomanNumeral</span> roman<span class="token punctuation">;</span>
        roman <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name">BinaryNumeral</span> binary<span class="token punctuation">;</span>
        binary <span class="token operator">=</span> <span class="token punctuation">(</span>BinaryNumeral<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>roman<span class="token punctuation">;</span>
        roman <span class="token operator">=</span> binary<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>binary<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>binary<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>10
Conversion not yet implemented
</code></pre></div><p>注意,第039行并没有直接由<code>RomanNumeral</code>转化成<code>BinaryNumeral</code>,因为没有直接的转换提供.所以先把<code>RomanNumeral</code>转换成<code>int</code>,再转成<code>BinaryNumeral</code>.其余的东西跟上面的例子是一样的(至少我这么认为),如果上面的例子理解了,下面的就好了.</p><h2 id="c-进阶教程-十" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-十" aria-hidden="true">#</a> <a id="csp_10">C#进阶教程(十)</a></h2><h3 id="c-中的容器" tabindex="-1"><a class="header-anchor" href="#c-中的容器" aria-hidden="true">#</a> C#中的容器</h3><p>现在我想说的是C#中的容器.这是一个非常重要的话题,因为不管你写什么样的程序,你都不能不与容器打交道.什么是容器呢(倒!).容器就是可以容纳东西的东西(再倒!),在C#和JAVA这种面向对象的编程语言中,容器就被称为可以容纳对象的东东,不是说&quot;一切都是对象吗?&quot;以前,我一个搞C++的程序员朋友告诉我,JAVA中的容器太好用了,比C++好用多了.而作为JAVA的后来者的C#毫无疑问,它的容器功能肯定也是很强大的.</p><p><code>foreach</code>语句是遍历容器的元素的最简单的方法.我们可以用<code>System.Collections.IEnumerator</code>类和<code>System.Collections.IEnumerable</code>接口来使用C#中的容器,下面有一个例子,功能是字符串分割器.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// CollectionClasses\\tokens.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Tokens</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEnumerable</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> elements<span class="token punctuation">;</span>
    <span class="token function">Tokens</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> source<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> delimiters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        elements <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>delimiters<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//引用IEnumerable接口</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">IEnumerator</span> <span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TokenEnumerator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">TokenEnumerator</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEnumerator</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> position <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Tokens</span> t<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">TokenEnumerator</span><span class="token punctuation">(</span><span class="token class-name">Tokens</span> t<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>t <span class="token operator">=</span> t<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>position <span class="token operator">&lt;</span> t<span class="token punctuation">.</span>elements<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                position<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            position <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Current
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> t<span class="token punctuation">.</span>elements<span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Tokens</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Tokens</span><span class="token punctuation">(</span><span class="token string">&quot;This is a well-done program.&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token char">&#39; &#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;-&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> item <span class="token keyword">in</span> f<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的输出是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>This
is
a
well
done
program.
</code></pre></div><p>好了,这一节就说到这了</p><h2 id="c-进阶教程-十一" tabindex="-1"><a class="header-anchor" href="#c-进阶教程-十一" aria-hidden="true">#</a> <a id="csp_11">C#进阶教程(十一)</a></h2><h3 id="c-中与java实例比较" tabindex="-1"><a class="header-anchor" href="#c-中与java实例比较" aria-hidden="true">#</a> C#中与JAVA实例比较</h3><p>来看一看C#这个被称为JAVA#的新一代编程语言到底与JAVA有多大的区别.</p><p>首先我们建立一个C#的程序文件<code>cs1.cs</code>,然后再建立一个JAVA的源程序文件<code>cs1.java</code>.它们的内容分别是:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// cs1.cs:</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">cs1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i am boby!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">boby</span> fre <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">boby</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>fre<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">boby</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">&quot;good!&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// cs1.java:</span>
<span class="token keyword">import</span> <span class="token import"><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> cs1 <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;i am boby,how are you!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        boby fre <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">boby</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>fre<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> boby <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token operator">=</span><span class="token string">&quot;good!&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>OK,让我们来运行一下这两个程序.在编译过程中我们发现,C#的速度的确比JAVA要快好多.(不是说M$的好话)其实,两个程序的输出是一样的,都是:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>i am boby!
good!
</code></pre></div><p>有一个重要的区别就是看有一行是<code>publc String name=&quot;boby!&quot;</code>,而在JAVA中却是<code>String name=&quot;boby!&quot;</code>.</p><p>如果我们在cs1.cs中把这个<code>public</code>去掉,就会产生错误,因为在C#中,不用任何范围修饰符时,默认的是<code>protect</code>,因而不能在类外被访问.这是一个重要的区别之一.</p><p>还有就是:如果我们把cs1.cs这个C#程序中的一句<code>public class cs1</code>改为<code>public class cs2</code>,存盘,再编译,可以看到,程序正常运行.而在JAVA中,这显然不行,因为JAVA规定,在一个文件中只能有一个<code>public</code>类,而且这个类的名称必须与文件名一模一样.这又是一个区别,在C#中,它是以<code>Main</code>方法来定位入口的.如果一个程序中没有一个名为<code>Main</code>的方法,就会出&quot;找不到入口的错误&quot;.不要把<code>Main</code>写成<code>main</code>哟,嘻嘻,我经常犯这样的错误.</p>`,202),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspcls3.html.vue"]]);export{i as default};
