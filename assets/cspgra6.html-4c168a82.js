import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const e={},p=t(`<h1 id="c-的基本语法介绍" tabindex="-1"><a class="header-anchor" href="#c-的基本语法介绍" aria-hidden="true">#</a> C＃的基本语法介绍</h1><p>www.wenhui.org 10/30/2002 CSharp vs Java</p><p>我现在还住在一个叫做六郎庄的地方，这里距中关村很近。我说这话的意思是本文出自一个小鳖三之手，而且他常常到北大去“剽学”，这种有些类似于贼的行为是被许多人所不屑的，因而也有人称其为“嫖客”。我便是其中的一位。事实上如果你真的成为他们中的一员，才会发现大学里培养的很多人才是从这里出去的。有时候别人怎么称呼你并不重要，重要的是你学习与生活的决心。</p><p>在c#出世之前，我是一名VB程序爱好者，微软的东西一直来说我都比较喜欢，一来是高手之做，二来确被他们的思想所震撼。C#是随vs.net出现的一种新生语言，#(sharp)是music中的一个符号，而且也有锋利的意思。对于我来说，更愿意将其看做是c++++，四个+的组合。究其根本还是c，只是提练的更简洁/更方便/更帅呆而已，它经历了c++、java(c+++)到c#(c++++)，如果你是一名vb程序员，我见意你能花点时间学习c#，没有别的原因，只是我的感觉而已。vs.net新推出的时候，我准备找点samples来看，结果发现很多是c#的实例，这样才下定决心学习c#，但并不是放弃vb，两种语言都很帅，如果你习惯像我一样愿意copy/paste代码来做程序的话，相信我，没错的。</p><p>Note: c#的比较灵活，如果你用notepad写过script脚本的话，你会喜欢c#的加入。当然vs.net来做看起来可能会更棒。比较重要的一点，如果你曾经是vb程序员的话，那么就得注意一下c＃程序的一些规则，大小写是不一样的。在这方面我吃了不少的苦头，希望你也吃点，这样记得比较牢靠。</p><h2 id="一、基本数据类型" tabindex="-1"><a class="header-anchor" href="#一、基本数据类型" aria-hidden="true">#</a> 一、基本数据类型</h2><p>这是比较烦燥的一部分，但是有些东西你就得强记，如果偷了懒，最后吃亏的还是你自己。这一点要切记。</p><p>在c#语言中，有多种数据类型，这些类型都定义在通用类型系统(common type system)中，所有的类型也都继承自system.object，所以每一种类型也都是对象。它们根据在内存中存放的方式，分为实质类型和参考类型两种。</p><p>当内存中的值发生改变时，参考类型也跟着改变。<br> 下面是数据类型的组织结构图：</p><ul><li><p>整数数据类型<br> 在C＃中有8种整数数据类型可以使用:<br> 例：<code>int jzh=0;</code></p></li><li><p>布尔数据类型<br> 布尔类型的数据只有两种值：true或false，而且不能转化为其它类型的数据。例:<br><code>bool jzh=true;</code></p></li><li><p>字符数据类型<br> char实际上用来表示16位的Unicode的字符。例：<br></p></li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">char</span></span> jzh <span class="token operator">=</span> <span class="token char">&#39;X&#39;</span><span class="token punctuation">;</span> <span class="token comment">// Character literal</span>
<span class="token class-name"><span class="token keyword">char</span></span> jzh <span class="token operator">=</span> <span class="token char">&#39;\\x0058&#39;</span><span class="token punctuation">;</span> <span class="token comment">// Hexadecimal</span>
<span class="token class-name"><span class="token keyword">char</span></span> jzh <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">88</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">char</span></span> jzh <span class="token operator">=</span> <span class="token char">&#39;\\u0058&#39;</span><span class="token punctuation">;</span> <span class="token comment">// Unicode</span>
</code></pre></div><ul><li>浮点数据类型<br> float: The float keyword denotes a simple type that stores 32-bit floating-point values。32位浮点数。<br> Double: The double keyword denotes a simple type that stores 64-bit floating-point values.64浮点数。</li><li>参考数据类型：<br> 参考数据类型的变量中存放的不是实际的变量值而是一个参考值，这个参考值指向真正数据所在的地址。这些数据可能是对象、字符串或者是数组。<br></li></ul><p>关于object我想这是一个很重要的概念，在微软的.net世界里体现的就是一个everything is object的思想。也就是说.net环境中，任何都可以成为对象，如下:<br><code>object jzh=1;</code><br> 任何数据类型都是从system.object继承来的，也就是说任何数据类型的值都可以设置给object。<br> 字符串是一个很熟悉的概念。但是你知道吗，字符串也可以被看做数组来处理，例:<br></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> jzh<span class="token operator">=</span><span class="token string">&quot;I am jzh&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">char</span></span> jzh2<span class="token operator">=</span><span class="token function">jzh</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>那么<code>jzh2=&#39;1&#39;</code><br> 数组也是程序设计中常常提到的，它的优势是你可以储存一个以上的变量。但是这些变量的数据类型都要一样才行。例:<br><code>int[] intarray=new int[217]；</code></p><h2 id="二、-c-程序" tabindex="-1"><a class="header-anchor" href="#二、-c-程序" aria-hidden="true">#</a> 二、 C＃程序</h2><p>C＃里常用的一些程式基本上和C++差不太多，和VB也只是形式上变更了一下。我不准备说太多，重点就C＃在ASP.NET中的应用提供了点说明。更多的内容你完全可以查阅Microsoft自带的sdk。</p><p>在ASP.NET中使用C＃，和我们在ASP中使用vbscript以及jscript是一样的。只是将其改为C＃罢了。当然它必须撰写在<code>&lt;script&gt;</code>内，例：</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;script language=&quot;C＃&quot; runat=&quot;server&quot;&gt;
    //程序内容
&lt;/script&gt;
</code></pre></div><p><strong>note</strong>:和VB与C＃的大小写一样，在C＃中的变量是要提前声明的，这一点用惯vbscript的程序员一定要注意。</p><h3 id="if-判断式" tabindex="-1"><a class="header-anchor" href="#if-判断式" aria-hidden="true">#</a> If 判断式</h3><p>这是一个几乎在任何语言中都会出现的东西，相当于我们国内的如果…那么…。这种句子在second grade的小学生就被teacher要求用来造句，当然你千万别告诉我你没上过二年级。它在VB中的表现是<code>if …then…end if</code>这样的形式。它在sdk中是这样的:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>if (expression)
statement1
[else
　　 statement2]
</code></pre></div><p>在C＃语法中，if判断式的语法如下:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">bool</span> 条件式<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//处理的程序</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token comment">//处理的程序</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这是一个在microsoft的sdk中给出的例子:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// if-else example</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IfTest</span> 
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Enter a character: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">char</span></span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> Console<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsLetter</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsLower</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The character is lowercase.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> 
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The character is uppercase.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The character is not an alphabetic character.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面是我给你的一个例子:</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;html&gt;
    &lt;head&gt;
    &lt;script language=&quot;c#&quot; runat=&quot;server&quot;&gt;
        void page_load(Object sender, EventArgs e){ //void表示该函数没有返回值
            if (DateTime.Now.Hour&lt;12){ //if后括号内数值必须为bool值
                jzh.Text=&quot;上午好&quot;;
            }else if(DateTime.Now.Hour&gt;=12 &amp;&amp; DateTime.Now.Hour&lt;22){ //&amp;&amp;的用法详见教程
                jzh.Text=&quot;下午好&quot;;
            }else{
                jzh.Text=&quot;该睡觉了&quot;;
            }
        }
    &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
    &lt;form runat=&quot;server&quot;&gt;
        &lt;asp:label id=&quot;jzh&quot; runat=&quot;server&quot;/&gt;
    &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre></div><p>详例请见例程中的if.aspx文件。</p><p>我们在上面的例程中看到这样的语句:</p><p><code>if(DateTime.Now.Hour&gt;=12 &amp;&amp; DateTime.Now.Hour&lt;22)</code></p><p><code>&amp;&amp;</code>是在C＃中的逻辑运算符，它表示and的意思。在C#中，if语句是用来判断的，也就是说判断的语句一定是判断式，而非表达式。如if(jzh=5)是C＃中是错误的。我将这些比较运算符及逻辑运算符整理如下表:</p><h3 id="switch判断式" tabindex="-1"><a class="header-anchor" href="#switch判断式" aria-hidden="true">#</a> switch判断式</h3><p>在if语句中你看到了遇到多种判断情况时所使用的else if语句，它确实不错，但是当你要判断的条件越来越多时，它的书写就太麻烦了，为此，microsoft又定义了另一个条件判断式switch，用于程序中的条件式有多个选项，而根据这些不同的输出选项做出不同的处理。</p><p>Microsoft在sdk中的说明如下:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> constant<span class="token operator">-</span>expression<span class="token punctuation">:</span>
        statement
        jump<span class="token operator">-</span>statement
    <span class="token punctuation">[</span><span class="token keyword">default</span><span class="token punctuation">:</span> statement<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我的说明如下；</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">switch</span><span class="token punctuation">(</span>条件式<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> 值<span class="token number">1</span>：处理程序<span class="token punctuation">;</span><span class="token punctuation">[</span><span class="token keyword">goto</span> <span class="token keyword">case</span> 欲跳转到的某语句<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> 值<span class="token number">2</span><span class="token punctuation">:</span> 处理程序<span class="token punctuation">;</span>
     …
    <span class="token keyword">default</span><span class="token punctuation">:</span> 默认的处理程序<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>微软给你的例子如下:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">SwitchTest</span> 
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Coffee sizes: 1=Small 2=Medium3=Large&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Please enter your selection: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token class-name"><span class="token keyword">int</span></span> n <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">switch</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
                <span class="token keyword">goto</span> <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;You selected small size. Insert 50 cents.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;You selected medium size. Insert 75 cents.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;You selected large size. Insert $1.00.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid selection. Please select 1, 2, or 3.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Thank you for your business.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我给你的程序如下:(见switch.aspx)</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;html&gt;
    &lt;head&gt;
    &lt;script language=&quot;c#&quot; runat=&quot;server&quot;&gt;
        void page_load(object sender, EventArgs e)
        {
            string strname=&quot;姜志辉&quot;;
            switch (strname)
            {
                case &quot;李忠琪&quot;:jzh.Text=&quot;才子一号&quot;;break;
                case &quot;彭海河&quot;:jzh.Text=&quot;才子二号&quot;;break;
                case &quot;姜志辉&quot;:jzh.Text=&quot;才子三号&quot;;goto case &quot;杨起荣&quot;;
                case &quot;杨起荣&quot;:jzh.Text=&quot;才子四号&quot;;goto default;
                default:jzh.Text=&quot;四大才子&quot;; 
                //最后的显示结果应该为四大才子，因为strname的值为姜志辉。
                //那么case &quot;姜志辉&quot;被执行，jzh.Text=&quot;才子三号&quot;被执行，
                //紧接着又被转向到case &quot;杨起荣&quot;,jzh.Text=&quot;才子四号&quot;被执行
                //然后又转向到default，因为后再也没有goto语句，所以end
            }
        }
    &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;asp:label id=&quot;jzh&quot; runat=&quot;server&quot;/&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre></div><p>如果想把这个执行顺序说明的更加清楚，应该改动一下这个程序，我更改后的结果为switch2.aspx。</p><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h3><p>不少的程序设计类书籍都会告诉你for循环是已经知道执行的次数或者执行范围的时候所采用的循环语句。</p><p>微软给你的说明如下:<br><code>for ([initializers]; [expression]; [iterators]) statement</code></p><p>翻译成中文大概如下:<br><code>for (起始值；条件式；累加数值){处理程序}</code></p><p>详见实例for.aspx:</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;html&gt;
    &lt;head&gt;
    &lt;script language=&quot;c#&quot; runat=&quot;server&quot;&gt;
        void page_load(object sender, EventArgs e){
        int j=0;
        for (int i=1;i&lt;=10;i++){
            j+=i;
        }
        jzh.Text=j.ToString();
        }
    &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;asp:label id=&quot;jzh&quot; runat=&quot;server&quot;/&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre></div><h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> while循环</h3><p>for循环是用来知道要执行多少次循环的情况下使用的，而如果不知道要知道循环多少次，我们希望它能不断的产生循环，直到达到一定的条件时循环终止，这种情况下我们采用while循环。</p><p>While循环分为while循环和do…while循环两种。</p><p>While循环的语法如下:<br><code>While（条件式）{处理的程序}</code></p><p>Do…while的语法如下:<br><code>Do {　处理的程序　} while(条件式)</code></p><p>它与while循环的明显区别在于无论是否满足条件至少执行一次处理程序。实例见while.aspx：</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;html&gt;
    &lt;head&gt;
    &lt;script language=&quot;c#&quot; runat=&quot;server&quot;&gt;
        void page_load(object sender, EventArgs e){
            int i=0;
            int j=0;
            while(i&lt;10){
                i+=1;
                j+=i;
            }
            jzh.Text=j.ToString();
        }
    &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;asp:label id=&quot;jzh&quot; runat=&quot;server&quot;/&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre></div><h3 id="foreach循环" tabindex="-1"><a class="header-anchor" href="#foreach循环" aria-hidden="true">#</a> foreach循环</h3><p>在C＃中吸取了一个在VB集合中应用的循环语句，foreach。它是将集合中的每一个项目(item)代入变量中进行处理。当然变量也是根据集合项目的类型进行声明的。其语法如下:</p><p><code>foreach(对象类型 变量 in 集合){处理程序}</code></p><p>实例详见foreach.aspx:</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;html&gt;
    &lt;head&gt;
    &lt;script language=&quot;c#&quot; runat=&quot;server&quot;&gt;
        void page_load(object sender,EventArgs e){
            string strjzh=&quot;&quot;;
            foreach(ListItem stritem in jzh.Items){
                strjzh=strjzh + &quot;$&quot; + stritem.Text;
            }
            jzh1.Text=strjzh;
        }
    &lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
    &lt;asp:listbox id=&quot;jzh&quot; runat=&quot;server&quot;&gt;
    &lt;asp:listitem value=&quot;1&quot;&gt;李忠琪&lt;/asp:listitem&gt;
    &lt;asp:listitem value=&quot;2&quot;&gt;彭海河&lt;/asp:listitem&gt;
    &lt;asp:listitem value=&quot;3&quot;&gt;姜志辉&lt;/asp:listitem&gt;
    &lt;asp:listitem value=&quot;4&quot;&gt;杨起荣&lt;/asp:listitem&gt;
    &lt;/asp:listbox&gt;&lt;p&gt;&lt;p&gt;
    &lt;asp:label id=&quot;jzh1&quot; runat=&quot;server&quot;/&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre></div>`,62),o=[p];function c(l,u){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","cspgra6.html.vue"]]);export{r as default};
