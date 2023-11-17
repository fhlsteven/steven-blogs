import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p="/steven-blogs/assets/cspcls10_1-8b88ccb8.png",o="/steven-blogs/assets/cspcls10_2-9c3860af.png",c={},e=t(`<h1 id="c-学习笔记二-用实例深入理解装箱、拆箱" tabindex="-1"><a class="header-anchor" href="#c-学习笔记二-用实例深入理解装箱、拆箱" aria-hidden="true">#</a> C#学习笔记二：用实例深入理解装箱、拆箱</h1><p>eshusheng（原作） 关键字 boxing unboxing</p><p>学习.NET的过程中，发现大多数的书都讲到了装箱（boxing）和拆箱（unboxing）的概念，至于为什么要理解装箱和拆箱？则总是一句话带过：优化程序的性能云云。至于为什么会对程序的性能产生影响，如何影响，我总感觉讲得并不透彻，当然也可能是我理解力有限。</p><p>这篇笔记，我并不打算对装箱和拆箱做全面的介绍，这些内容书上都有，csdn上也有很好的文章（请见kenli写的dotnet学习笔记一 - 装箱拆箱http://www.csdn.net/Develop/Read_Article.asp?Id=19575），我只做简单的总结，并在此基础上引入两个例子，一个例子用ILDASM.EXE查看装箱和拆箱的过程，另外一个例子我编制一个简单例子分析正确理解装箱和拆箱对程序性能的影响。</p><p>由于在下面的例子和以后的例子我们将再次用到ILDASM，但不再给出详细的解释，因此给出MSDN关于反汇编语言的帮助信息，要查找汇编语言的命令，请在MSDN中.NET Framework/参考/类库/System.Reflection.Emit 命名空间/OpCodes类中可以找到相关信息。</p><ul><li>总结1：.NET中所有类型都是对象，所有类型的根是System.Object。</li><li>总结2：类型分为值类型(value)和引用类型(regerence type)。C#中定义的值类型包括：原类型（Sbyte、Byte、Short、Ushort、Int、Uint、Long、Ulong、Char、Float、Double、Bool、Decimal）、枚举(enum)、结构(struct)。引用类型包括：类、数组、接口、委托、字符串等。</li></ul><p><strong>实例一</strong>：读下列程序，你能说出其中进行了几次装箱和拆箱的操作吗？</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">sample1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token operator">=</span>i<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token string">&quot;,&quot;</span><span class="token operator">+</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中发生了三次装箱操作和一次拆箱操作。第一次object obj=i;将i装箱；而Console.WriteLine方法用的参数是String对象，因此，i+&quot;,&quot;+(int)obj中，i需要进行一次装箱(转换成String对象)，(int)obj将obj对象拆箱成值类型，而根据WriteLine方法，比较将(int)obj值装箱成引用类型。说起来这么复杂，大家看看ildasm.exe的反汇编结果（如下图），就很容易理解了。注意图中红色圆圈的标识。</p><p><img src="`+p+`" alt="img_1"></p><p>如果我们将<code>Console.WriteLine(i+&quot;,&quot;+(int)obj);</code>改为：<code>Console.WriteLine(obj+&quot;,&quot;+obj);</code> 得到同样的效果，而其中仅进行一次装箱操作(object obj=i;)，虽然这个程序并没有实际的意义，但是加深我们对概念的理解。</p><p><strong>实例二</strong>：我这里我列出两个例子，装箱和拆箱对程序性能的影响不问自知。我的机器配置是P4 1.6A，512M内存。随后会列出测试的截图，你比我更快吗？当然是的？那么告诉我吧。😦</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 例子1：boxing1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">test1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">;</span>
            <span class="token class-name">DateTime</span> startTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
            <span class="token class-name">ArrayList</span> myArrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 重复5次测试</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                myArrayList<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 将值类型加入myArrayList数组</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">&lt;</span> <span class="token number">5000000</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span>
                    myArrayList<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//装箱</span>
                                            <span class="token comment">// 重新得到值</span>
                <span class="token class-name"><span class="token keyword">int</span></span> j<span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">&lt;</span> <span class="token number">5000000</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span>
                    j <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>myArrayList<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">//拆箱</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 打印结果</span>
            <span class="token class-name">DateTime</span> endTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Start: {0}\\nEnd: {1}\\nSpend: {2}&quot;</span><span class="token punctuation">,</span> startTime<span class="token punctuation">,</span> endTime<span class="token punctuation">,</span> endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Push ENTER to return commandline...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下图是boxing1.exe的测试结果：</p><p><img src="`+o+`" alt="csp_2"></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 例子2：boxing2.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">test2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Class2</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">;</span>
            <span class="token class-name">ArrayList</span> myArrayList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 构造 5000000 字符串数组</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> strList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">5000000</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">&lt;</span> <span class="token number">5000000</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span>
                strList<span class="token punctuation">[</span>count<span class="token punctuation">]</span> <span class="token operator">=</span> count<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 重复5次测试</span>
            <span class="token class-name">DateTime</span> startTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                myArrayList<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 将值类型加入myArrayList数组</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">&lt;</span> <span class="token number">5000000</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span>
                    myArrayList<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>strList<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 重新得到值</span>
                <span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> count <span class="token operator">&lt;</span> <span class="token number">5000000</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">)</span>
                    s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>myArrayList<span class="token punctuation">[</span>count<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 打印结果</span>
            <span class="token class-name">DateTime</span> endTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Start: {0}\\nEnd: {1}\\nSpend: {2}&quot;</span><span class="token punctuation">,</span> startTime<span class="token punctuation">,</span> endTime<span class="token punctuation">,</span> endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Push ENTER to return commandline...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下图是boxing2.exe的测试结果：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>G:\\myproject\\c# inside\\chap02&gt;boxing2
Start: 2003-9-16 22:58:30
End: 2003-9-16 22:58:32
Spend: 00:00:02.0937500
Push ENTER to return commandline...

G:\\myproject\\c# inside\\chap02&gt;boxing2
Start: 2003-9-16 22:58:41
End: 2003-9-16 22:58:43
Spend: 00:00:02.0312500
Push ENTER to return commandline...

G:\\myproject\\c# inside\\chap02&gt;boxing2
Start: 2003-9-16 22:58:51
End: 2003-9-16 22:58:53
Spend: 00:00:02
Push ENTER to return commandline...

G:\\myproject\\c# inside\\chap02&gt;boxing2
Start: 2003-9-16 22:59:00
End: 2003-9-16 22:59:02
Spend: 00:00:02
Push ENTER to return commandline...

G:\\myproject\\c# inside\\chap02&gt;boxing2
Start: 2003-9-16 22:59:11
End: 2003-9-16 22:59:13
Spend: 00:00:02.0312500
Push ENTER to return commandline...
</code></pre></div><p>实例二说明：boxing1.cs的循环中包含一次装箱和一次拆箱（这里我均忽略两个程序打印时的装箱操作），boxing2.cs则没有相应的操作。当循环次数足够大的时候，性能差异是明显的。再次提醒你别忘了ILDASM.EXE这个工具哦，分别看看，才能一窥程序的本质。否则，粗看程序boxing2.cs比boxing1.cs多了不少代码，更多了一个5000000（5M）的循环，就以为boxing2会更慢。。。</p><p>另外一方面，装箱和拆箱对性能的影响更偏重于大型的程序和软件，这就是我用这么多循环的原因。但你能保证你不会进行大批量的数据处理吗？</p><p>MSDN上有更实用的例子：统计大量的英文单词，当然也更加复杂，故不在此详细讲解。http://www.microsoft.com/china/msdn/voices/csharp03152001.asp</p><p>文章的结尾处，我想你应该测试一下你对装箱和拆箱的理解：（同样来自MSDN）</p><p>看看各种方案中是否进行了装箱和拆箱的操作，各有多少次。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 方案 1</span>
<span class="token class-name"><span class="token keyword">int</span></span> total <span class="token operator">=</span> <span class="token number">35</span><span class="token punctuation">;</span>
<span class="token class-name">DateTime</span> date <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;Your total was {0} on {1}&quot;</span><span class="token punctuation">,</span> total<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方案 2</span>
<span class="token class-name">Hashtable</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;zero&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方案 3</span>
<span class="token class-name">DateTime</span> d <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
<span class="token class-name">String</span> s <span class="token operator">=</span> d<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方案 4</span>
<span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">33</span><span class="token punctuation">;</span>

<span class="token comment">// 方案 5</span>
<span class="token class-name">ArrayList</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 方案 6</span>
<span class="token class-name">MyStruct</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyStruct</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IProcess</span> ip <span class="token operator">=</span> <span class="token punctuation">(</span>IProcess<span class="token punctuation">)</span> s<span class="token punctuation">;</span>
ip<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>今天就到这里吧，我也是初学，望多多指教。什么？上面测试的标答？呵呵，你应该找得到的，找不到？我会贴在评论中。</p><hr><p>jiangt1980 (2003-10-14 13:32:37)</p><blockquote><p>究竟装箱、拆箱是体高性能还是降低性能，第二个例子我糊涂了</p></blockquote><p>eshusheng (2003-9-30 9:52:56)</p><blockquote><p>to:zerozhao 对不起，解释这两段程序的失误了，第二段程序没有计算赋值，开始我测试的时候，是为了保证公平性。 这里说明一下，上面说的多5M次循环是有误的。谢谢zerozhao指正。</p></blockquote><p>zerozhao (2003-9-28 23:58:19)</p><blockquote><p>实例2的开始时间为什么不从给strList赋值之前开始</p></blockquote><p>eshusheng (2003-9-19 19:18:21)</p><blockquote><p>关于这段代码，是这样解释的：包装的目的之一是实现对值类型参数的虚函数调用。ToString() 是对象的虚函数，所以，看起来在调用 ToString() 时，d 将被包装。但是在转换对象时没有使用 d，所以不需要进行包装。编译器知道类型为 DateTime 的变量只能为该类型（因为没有导出的值类型，所以该变量不能为导出类型），所以它可以直接调用 DateTime.ToString()，并设置“这个”引用，使其指向堆栈中的 d。 所以你的理解是对的，并没有装箱。</p></blockquote><p>chengdong77 (2003-9-19 10:39:38)</p><blockquote><p>有个问题要问你，如果同是原类形转换时需要装箱和拆箱吗如 DateTime d = DateTime.Now; String s = d.ToString(); ｄ、ｓ都是引用类型，转换需要装箱和拆箱吗？</p></blockquote><p>chengdong77 (2003-9-19 10:34:33)</p><blockquote><p>谢谢你，让我知道了“隐示转换”和“显示转换”会给程序带来如此大的影响。</p></blockquote><p>eshusheng (2003-9-17 21:25:54)</p><blockquote><p>谢谢楼上的评论。确切的说理解了装箱和拆箱，对编制优秀的程序有一定的帮助。从而略微的可以改善程序的性能。</p></blockquote><p>cnswdevnet (2003-9-17 14:58:00)</p><blockquote><p>&quot;至于为什么要理解装箱和拆箱？则总是一句话带过：优化程序的性能云云。&quot; -- 是优化性能么? 不对吧.</p></blockquote>`,42),u=[e];function l(k,i){return s(),a("div",null,u)}const m=n(c,[["render",l],["__file","cspcls10.html.vue"]]);export{m as default};
