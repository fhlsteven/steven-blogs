import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t="/steven-blogs/assets/cspcls2_4-a1d3de03.png",o={},c=p(`<h1 id="第七章-异常处理" tabindex="-1"><a class="header-anchor" href="#第七章-异常处理" aria-hidden="true">#</a> 第七章 异常处理</h1><p>通用语言运行时（CLR）具有的一个很大的优势为，异常处理是跨语言被标准化的。一个在C#中所引发的异常可以在Visual Basic客户中得到处理。不再有 HRESULTs 或者 ISupportErrorInfo 接口。</p><p>尽管跨语言异常处理的覆盖面很广，但这一章完全集中讨论C#异常处理。你稍为改变编译器的溢出处理行为，接着有趣的事情就开始了：你处理了该异常。要增加更多的手段，随后引发你所创建的异常。</p><h2 id="_7-1-校验-checked-和非校验-unchecked-语句" tabindex="-1"><a class="header-anchor" href="#_7-1-校验-checked-和非校验-unchecked-语句" aria-hidden="true">#</a> 7.1 校验(checked)和非校验(unchecked)语句</h2><p>当你执行运算时，有可能会发生计算结果超出结果变量数据类型的有效范围。这种情况被称为溢出，依据不同的编程语言，你将被以某种方式通知——或者根本就没有被通知。（C++程序员听起来熟悉吗？）</p><p>那么，C#如何处理溢出的呢？ 要找出其默认行为，请看我在这本书前面提到的阶乘的例子。（为了方便其见，前面的例子再次在清单 7.1 中给出）</p><p>清单 7.1 计算一个数的阶乘</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Factorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nFactorial <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nComputeTo <span class="token operator">=</span> Int64<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">long</span></span> nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
            nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}! is {1}&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">,</span> nFactorial<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当你象这样使用命令行执行程序时</p><p><code>factorial 2000</code></p><p>结果为0，什么也没有发生。因此，设想C#默默地处理溢出情况而不明确地警告你是安全的。</p><p>通过给整个应用程序（经编译器开关）或于语句级允许溢出校验，你就可以改变这种行为。以下两节分别解决一种方案。</p><h3 id="_7-1-1-给溢出校验设置编译器" tabindex="-1"><a class="header-anchor" href="#_7-1-1-给溢出校验设置编译器" aria-hidden="true">#</a> 7.1.1 给溢出校验设置编译器</h3><p>如果你想给整个应用程序控制溢出校验，C#编译器设置选择是正是你所要找的。默认地，溢出校验是禁用的。要明确地要求它，运行以下编译器命令：</p><p><code>csc factorial.cs /checked+</code></p><p>现在当你用2000参数执行应用程序时，CLR通知你溢出异常（见图 7.1）。</p><p><img src="`+t+`" alt="图 7.1"><br> 图 7.1　允许了溢出异常，阶乘代码产生了一个异常。</p><p>按ＯＫ键离开对话框揭示了异常信息：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Exception occurred: System.OverflowException
at Factorial.Main(System.String[])
</code></pre></div><p>现在你了解了溢出条件引发了一个<code>System.OverflowException</code>异常。下一节，在我们完成语法校验之后，如何捕获并处理所出现的异常？</p><h3 id="_7-1-2-语法溢出校验" tabindex="-1"><a class="header-anchor" href="#_7-1-2-语法溢出校验" aria-hidden="true">#</a> 7.1.2　语法溢出校验</h3><p>如果你不想给整个应用程序允许溢出校验，仅给某些代码段允许校验，你可能会很舒适。对于这种场合，你可能象清单7.2中显示的那样，使用校验语句。</p><p>清单 7.2　　阶乘计算中的溢出校验</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Factorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nFactorial <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nComputeTo <span class="token operator">=</span> Int64<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">long</span></span> nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span>nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">checked</span> <span class="token punctuation">{</span> nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span> <span class="token punctuation">}</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}! is {1}&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">,</span> nFactorial<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>甚至就如你运用标志 checked-编译了该代码，在第13行中，溢出校验仍然会对乘法实现检查。错误信息保持一致。</p><p>显示相反行为的语句是非校验（unchecked）。甚至如果允许了溢出校验（给编译器加上checked+标志），被unchecked语句所括住的代码也将不会引发溢出异常：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">unchecked</span>
<span class="token punctuation">{</span>
    nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_7-2-异常处理语句" tabindex="-1"><a class="header-anchor" href="#_7-2-异常处理语句" aria-hidden="true">#</a> 7.2 　异常处理语句</h2><p>既然你知道了如何产生一个异常（你会发现更多的方法，相信我），仍然存在如何处理它的问题。如果你是一个 C++ WIN32 程序员，肯定熟悉SEH（结构异常处理）。你将从中找到安慰，Ｃ＃中的命令几乎是相同的，而且它们也以相似的方式运作。</p><p>以下三节介绍了Ｃ＃的异常处理语句：(The following three sections introduce C#&#39;s exception-handling statements:)</p><ul><li>用 try-catch 捕获异常</li><li>用 try-finally 清除异常</li><li>用 try-catch-finally 处理所有的异常</li></ul><h3 id="_7-2-1-使用-try-和-catch捕获异常" tabindex="-1"><a class="header-anchor" href="#_7-2-1-使用-try-和-catch捕获异常" aria-hidden="true">#</a> 7.2.1 　使用 try 和 catch捕获异常</h3><p>你肯定会对一件事非常感兴趣——不要提示给用户那令人讨厌的异常消息，以便你的应用程序继续执行。要这样，你必须捕获（处理）该异常。</p><p>这样使用的语句是try 和 catch。try包含可能会产生异常的语句，而catch处理一个异常，如果有异常存在的话。清单7.3 用try 和 catch为OverflowException 实现异常处理。</p><p>清单7.3 捕获由Factorial Calculation引发的OverflowException 异常</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Factorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nFactorial <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nComputeTo <span class="token operator">=</span> Int64<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">checked</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
                    nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OverflowException</span> oe<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Computing {0} caused an overflow exception&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}! is {1}&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">,</span> nFactorial<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了说明清楚，我扩展了某些代码段，而且我也保证异常是由<code>checked</code>语句产生的，甚至当你忘记了编译器设置时。</p><p>正如你所见，异常处理并不麻烦。你所有要做的是：在<code>try</code>语句中包含容易产生异常的代码，接着捕获异常，该异常在这个例子中是<code>OverflowException</code>类型。无论一个异常什么时候被引发，在<code>catch</code>段里的代码会注意进行适当的处理。</p><p>如果你不事先知道哪一种异常会被预期，而仍然想处于安全状态，简单地忽略异常的类型。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>但是，通过这个途径，你不能获得对异常对象的访问，而该对象含有重要的出错信息。一般化异常处理代码象这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Exception</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，你不能用<code>ref</code>或<code>out</code> 修饰符传递 <code>e</code> 对象给一个方法，也不能赋给它一个不同的值。</p><h3 id="_7-2-2-使用-try-和-finally-清除异常" tabindex="-1"><a class="header-anchor" href="#_7-2-2-使用-try-和-finally-清除异常" aria-hidden="true">#</a> 7.2.2 使用 try 和 finally 清除异常</h3><p>如果你更关心清除而不是错误处理， try 和 finally 会获得你的喜欢。它不仅抑制了出错消息，而且所有包含在 finally 块中的代码在异常被引发后仍然会被执行。</p><p>尽管程序不正常终止，但你还可以为用户获取一条消息，如清单 7.4 所示。</p><p>清单 7.4 在finally 语句中处理异常</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Factorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nFactorial <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nComputeTo <span class="token operator">=</span> Int64<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> bAllFine <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">checked</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
                    nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            bAllFine <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bAllFine<span class="token punctuation">)</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Computing {0} caused an overflow exception&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}! is {1}&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">,</span> nFactorial<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>通过检测该代码，你可能会猜到，即使没有引发异常处理，<code>finally</code>也会被执行。这是真的——在<code>finally</code>中的代码总是会被执行的，不管是否具有异常条件。为了举例说明如何在两种情况下提供一些有意义的信息给用户， 我引进了新变量<code>bAllFine</code>。<code>bAllFine</code>告诉<code>finally</code> 语段，它是否是因为一个异常或者仅是因为计算的顺利完成而被调用。</p><p>作为一个习惯了SEH程序员，你可能会想，是否有一个与<code>__leave</code> 语句等价的语句，该语句在C++中很管用。如果你还不了解，在C++中的<code>__leave</code> 语句是用来提前终止 <code>try</code> 语段中的执行代码，并立即跳转到<code>finally</code>语段。</p><p>坏消息， C# 中没有<code>__leave</code> 语句。但是，在清单 7.5 中的代码演示了一个你可以实现的方案。</p><p>清单 7.5 从 try语句 跳转到finally 语句</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">JumpTest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;try&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">goto</span> __leave<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;finally&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        __leave<span class="token punctuation">:</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;__leave&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当这个应用程序运行时，输出结果为</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>try
finally
__leave
</code></pre></div><p>一个 goto 语句不能退出 一个finally 语段。甚至把 goto 语句放在 try 语句 段中，还是会立即返回控制到 finally 语段。因此，goto 只是离开了 try 语段并跳转到finally 语段。直到 finally 中的代码完成运行后，才能到达__leave 标签。按这种方式，你可以模仿在SEH中使用的的__leave 语句。</p><p>顺便地，你可能怀疑goto 语句被忽略了，因为它是try 语句中的最后一条语句，并且控制自动地转移到了 finally 。为了证明不是这样，试把goto 语句放到Console.WriteLine 方法调用之前。尽管由于不可到达代码你得到了编译器的警告，但是你将看到goto语句实际上被执行了，且没有为 try 字符串产生的输出。</p><h3 id="_7-2-3-使用try-catch-finally处理所有异常" tabindex="-1"><a class="header-anchor" href="#_7-2-3-使用try-catch-finally处理所有异常" aria-hidden="true">#</a> 7.2.3 使用try-catch-finally处理所有异常</h3><p>应用程序最有可能的途径是合并前面两种错误处理技术——捕获错误、清除并继续执行应用程序。所有你要做的是在出错处理代码中使用 try 、catch 和 finally语句。清单 7.6 显示了处理零除错误的途径。</p><p>清单 7.6 实现多个catch 语句</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CatchIT</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nTheZero <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nResult <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> nTheZero<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">DivideByZeroException</span> divEx<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;divide by zero occurred!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> Ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;some other exception&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个例子的技巧为，它包含了多个<code>catch</code>语句。第一个捕获了更可能出现的<code>DivideByZeroException</code>异常，而第二个<code>catch</code>语句通过捕获普通异常处理了所有剩下来的异常。</p><p>你肯定总是首先捕获特定的异常，接着是普通的异常。如果你不按这个顺序捕获异常，会发生什么事呢？清单7.7中的代码有说明。</p><p>清单7.7 顺序不适当的 catch 语句</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> nTheZero <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> nResult <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> nTheZero<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> Ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;exception &quot;</span> <span class="token operator">+</span> Ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">DivideByZeroException</span> divEx<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;never going to see that&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译器将捕获到一个小错误，并类似这样报告该错误：</p><p><code>wrongcatch.cs(10,9): error CS0160: A previous catch clause already catches all exceptions of this or a super type (&#39;System.Exception&#39;)</code></p><p>最后，我必须告发CLR异常与SEH相比时的一个缺点（或差别）：没有 <code>EXCEPTION_CONTINUE_EXECUTION</code>标识符的等价物，它在SEH异常过滤器中很有用。基本上，<code>EXCEPTION_CONTINUE_EXECUTION</code>允许你重新执行负责异常的代码片段。在重新执行之前，你有机会更改变量等。我个人特别喜欢的技术为，使用访问违例异常，按需要实施内存分配。</p><h2 id="_7-3-引发异常" tabindex="-1"><a class="header-anchor" href="#_7-3-引发异常" aria-hidden="true">#</a> 7.3 引发异常</h2><p>当你必须捕获异常时，其他人首先必须首先能够引发异常。而且，不仅其他人能够引发，你也可以负责引发。其相当简单：</p><p><code>throw new ArgumentException(&quot;Argument can&#39;t be 5&quot;);</code></p><p>你所需要的是<code>throw</code>语句和一个适当的异常类。我已经从表7.1提供的清单中选出一个异常给这个例子。</p><p>表 7.1 Runtime提供的标准异常</p><table><thead><tr><th>异常类型</th><th>描述</th></tr></thead><tbody><tr><td>Exception</td><td>所有异常对象的基类</td></tr><tr><td>SystemException</td><td>运行时产生的所有错误的基类</td></tr><tr><td>IndexOutOfRangeException</td><td>当一个数组的下标超出范围时运行时引发</td></tr><tr><td>NullReferenceException</td><td>当一个空对象被引用时运行时引发</td></tr><tr><td>InvalidOperationException</td><td>当对方法的调用对对象的当前状态无效时，由某些方法引发</td></tr><tr><td>ArgumentException</td><td>所有参数异常的基类</td></tr><tr><td>ArgumentNullException</td><td>在参数为空（不允许）的情况下，由方法引发</td></tr><tr><td>ArgumentOutOfRangeException</td><td>当参数不在一个给定范围之内时，由方法引发</td></tr><tr><td>InteropException</td><td>目标在或发生在CLR外面环境中的异常的基类</td></tr><tr><td>ComException</td><td>包含COM 类的HRESULT信息的异常</td></tr><tr><td>SEHException</td><td>封装win32 结构异常处理信息的异常</td></tr></tbody></table><p>然而，在catch语句的内部，你已经有了随意处置的异常，就不必创建一个新异常。可能在表7.1 中的异常没有一个符合你特殊的要求——为什么不创建一个新的异常？在即将要学到小节中，都涉及到这两个话题。</p><h3 id="_7-3-1-重新引发异常" tabindex="-1"><a class="header-anchor" href="#_7-3-1-重新引发异常" aria-hidden="true">#</a> 7.3.1 重新引发异常</h3><p>当处于一个catch 语句的内部时，你可能决定引发一个目前正在再度处理的异常，留下进一步的处理给一些外部的try-catch 语句。该方法的例子如 清单7.8所示。</p><p>清单 7.8 重新引发一个异常</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">checked</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
            nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OverflowException</span> oe<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Computing {0} caused an overflow exception&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，我不必规定所声明的异常变量。尽管它是可选的，但你也可以这样写：</p><p><code>throw oe;</code></p><p>现在有时还必须留意这个异常。</p><h3 id="_7-3-2-创建自己的异常类" tabindex="-1"><a class="header-anchor" href="#_7-3-2-创建自己的异常类" aria-hidden="true">#</a> 7.3.2 创建自己的异常类</h3><p>尽管建议使用预定义的异常类，但对于实际场合，创建自己的异常类可能会方便。创建自己的异常类，允许你的异常类的使用者根据该异常类采取不同的手段。</p><p>在清单 7.9 中出现的异常类<code>MyImportantException</code>遵循两个规则：第一，它用<code>Exception</code>结束类名。第二，它实现了所有三个被推荐的通用结构。你也应该遵守这些规则。</p><p>清单 7.9 实现自己的异常类 MyImportantException</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyImportantException</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Exception</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyImportantException</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">MyImportantException</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">)</span>
    <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">MyImportantException</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">,</span> <span class="token class-name">Exception</span> inner<span class="token punctuation">)</span>
    <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> inner<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExceptionTestApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyImportantException</span><span class="token punctuation">(</span><span class="token string">&quot;something bad has happened.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            ExceptionTestApp<span class="token punctuation">.</span><span class="token function">TestThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>正如你所看到的，<code>MyImportantException</code>异常类不能实现任何特殊的功能，但它完全基于<code>System.Exception</code>类。程序的剩余部分测试新的异常类，给<code>System.Exception</code>类使用一个<code>catch</code>语句。</p><p>如果没有特殊的实现而只是给MyImportantException定义了三个构造函数，创建它又有什么意义呢？它是一个重要的类型——你可以在catch语句中使用它，代替更为普通的异常类。可能引发你的新异常的客户代码可以按规定的catch代码发挥作用。</p><p>当使用自己的名字空间编写一个类库时，也要把异常放到该名字空间。尽管它并没有出现在这个例子中，你还是应该使用适当的属性，为扩展了的错误信息扩充你的异常类。</p><h2 id="_7-4-异常处理的-要-和-不要" tabindex="-1"><a class="header-anchor" href="#_7-4-异常处理的-要-和-不要" aria-hidden="true">#</a> 7.4 异常处理的“要”和“不要”</h2><p>作为最后的忠告之语，这里是对异常引发和处理所要做和不要做的清单：</p><ul><li>当引发异常时，要提供有意义的文本。</li><li>要引发异常仅当条件是真正异常；也就是当一个正常的返回值不满足时。</li><li>如果你的方法或属性被传递一个坏参数，要引发一个<code>ArgumentException</code>异常。</li><li>当调用操作不适合对象的当前状态时，要引发一个<code>InvalidOperationException</code>异常。</li><li>要引发最适合的异常。</li><li>要使用链接异常，它们允许你跟踪异常树。</li><li>不要为正常或预期的错误使用异常。</li><li>不要为流程的正常控制使用异常。</li><li>不要在方法中引发<code>NullReferenceException</code>或<code>IndexOutOfRangeException</code>异常。</li></ul><h2 id="_7-5-小结" tabindex="-1"><a class="header-anchor" href="#_7-5-小结" aria-hidden="true">#</a> 7.5 小结</h2><p>这一章由介绍溢出校验开始。你可以使用编译器开关（默认是关），使整个应用程序允许或禁止溢出校验。如果需要微调控制，你可以使用校验和非校验语句，它允许你使用或不使用溢出校验来执行一段代码，尽管没有给应用程序设置开关。</p><p>当发生溢出时，一个异常就被引发了。如何处理异常取决于你。我提出了各种途径，包括你最有可能贯穿整个应用程序使用的：try、catch 和finally 语句。在伴随的多个例子中，你学到了它与WIN32结构异常处理（SEH）的差别。</p><p>异常处理是给类的用户； 然而，如果你负责创建新的类，就可以引发异常。有多种选择：引发早已捕获的异常，引发存在的框架异常，或者按规定的实际目标创建新的异常类。</p><p>最后，你需要阅读引发和处理异常的各种“要”和“不要”。</p>`,98),e=[c];function l(u,i){return s(),a("div",null,e)}const r=n(o,[["render",l],["__file","cspcls2_7.html.vue"]]);export{r as default};
