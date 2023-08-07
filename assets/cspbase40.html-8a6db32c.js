import{_ as n,o as s,c as a,d as t}from"./app-3696c600.js";const p="/steven-blogs/assets/40_ex_1-51b02f61.png",o="/steven-blogs/assets/40_ex_2-a916679d.png",e="/steven-blogs/assets/40_ex_3-37c6b008.png",c={},u=t(`<h1 id="net中的exception处理-c" tabindex="-1"><a class="header-anchor" href="#net中的exception处理-c" aria-hidden="true">#</a> .NET中的Exception处理(C#)</h1><p>摘要：</p><p>本文以C#为编程语言，讨论了 .NET 中的异常处理方式，主要包括 <code>try/catch</code> 块、<code>finally</code>语句、<code>Exception</code> 对象、<code>throw</code>语句等主题。</p><hr><p>本文内容</p><ul><li>理解异常的基本概念</li><li>使用 <code>try/catch</code> 块处理异常</li><li>理解<code>finally</code>的意义</li><li>使用 <code>Exception</code> 对象确定异常</li><li>将异常返回过程调用程序</li></ul><hr><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><p>就像其他面向对象语言一样，C#采用异常(exception)来应对程序错误和非正常情况。</p><p>异常是包含程序非正常事件信息的对象。与缺陷(bug)不同，一个bug是程序员的疏漏，它们应该在产品发布前被更正；尽管一个bug可能引发异常的抛出，你不应该完全依靠异常来处理你的bug，它至多是你测试的手段，你应该自己更正哪些bug。类似的，错误(error)是由用户操作而引起，比如在一个应该输入字母的地方用户输入了一个数字；虽然它也可能引发异常，但你应该通过校验代码(validation code)来抓住这些错误。无论何时，在可能的情况下错误都应该是能预料和能被预防的。即使你除去了所有的bug和列举了所有可能的用户错误，你仍会遇到无法预料和阻止的异常，如内存耗尽、网络崩溃。你无法预防异常，但你能处理它们，以避免它们使你的程序崩溃。</p><p>当你的程序遇到一个非正常情况，比如说内存不足，它就会引发(throw/raise)一个异常。此时，当前的过程调用将挂起，.NET 运行时(CLR)将从下至上搜索过程调用堆栈，以查找相应的异常处理程序。也就是说，如果抛出异常的代码正处于某个 Try 块中，运行时将首先使用本地的 Catch 块（如果有）来处理异常（它将执行在该位置找到的 Catch 块代码），否则这个程序段将被终止并将异常的处理权交给其调用函数；如果没有函数处理此异常（即在整个调用堆栈中没能找到适当的 Catch 块），最终运行时将会得到并处理它，并立刻将你的程序终止。</p><hr><p>引发错误</p><p>示例为一个简单的文件打开操作并检索其长度的程序（以后几个示例的内容基本相同），示例从窗体文本框<code>textBoxfilepath</code>中得到文件名：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> filepath<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBoxfilepath<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">long</span></span> isize<span class="token punctuation">;</span>
<span class="token class-name">FileStream</span> fs<span class="token operator">=</span>File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">)</span><span class="token punctuation">;</span>
isize<span class="token operator">=</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>有许多原因会使代码引发异常，如文件不存在，访问权限不够等等。在现在这种没有异常处理的情况下，运行时发生的任何错误会回溯到.NET运行时(CLR)；而运行时会呈现给用户一个让人费解并可能造成危险的对话框（图1）。为了避免出现此对话框，如果发生运行时错误，您至少需要向顶层过程添加异常处理，并在必要时在下层过程中也添加异常处理。</p><p><img src="`+p+`" alt="图1：包含的Continue按钮使 .NET 默认错误处理程序变得有些危险"><br> 图1：包含的Continue按钮使 .NET 默认错误处理程序变得有些危险。</p><p>此外，其中的详细信息并不是您希望用户看到的内容。</p><hr><h2 id="添加简单try-catch块处理异常" tabindex="-1"><a class="header-anchor" href="#添加简单try-catch块处理异常" aria-hidden="true">#</a> 添加简单try/catch块处理异常</h2><p>在C#中，为了恰当地处理运行时异常，在要需要保护的任何代码附近添加一个<code>try/catch</code>块。在 <code>try</code> 块的代码中发生的任何运行时异常都将立即使用 <code>catch</code> 块中的代码继续执行：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> filepath<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBoxfilepath<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">long</span></span> isize<span class="token punctuation">;</span>
    <span class="token class-name">FileStream</span> fs<span class="token operator">=</span>File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">)</span><span class="token punctuation">;</span>
    isize<span class="token operator">=</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;error occured!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这段代码运行时，当有异常出现（如文件不存在）程序不会显示图2的对话框，取而代之的是一条简单的&quot;error occurred!&quot;警告，因为<code>try</code>块捕获住了异常并立即转到<code>catch</code>块中的代码继续执行。</p><p>注意：如果<code>catch</code>块中没有退出的代码（如<code>return</code>,<code>throw</code>），<code>catch</code>块后的代码将继续得到执行。并且<code>try</code> 块后面至少需要包含一个 <code>catch</code> 块（有关包含多个 <code>catch</code> 块的详细信息，请参阅下文）或一个<code>finally</code>块（参阅下文）。</p><hr><h2 id="处理特定异常-多个catch块" tabindex="-1"><a class="header-anchor" href="#处理特定异常-多个catch块" aria-hidden="true">#</a> 处理特定异常（多个catch块）</h2><p>.NET 框架提供了大量的特定异常类，所有这些异常类都是从基类 <code>Exception</code> 类继承而来的。在 <code>.NET</code> 框架文档中，您会看到一些表，它们列出了在调用任何方法时都可能出现的所有异常。图 2便列出了.NET中<code>File.Open()</code>方法调用时可能发生的所有异常情况：</p><p><img src="`+o+`" alt="图 2： File.Open 可能发生的所有异常"> <br> 图 2： File.Open 可能发生的所有异常</p><p>你可以在一个<code>try</code>块后添加足够多的 <code>Catch</code> 块，以便对不同的异常情况作出不同的处理。以下的代码就列举了对几个不同的异常进行不同处理的情况。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> filepath<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBoxfilepath<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">long</span></span> isize<span class="token punctuation">;</span>
    <span class="token class-name">FileStream</span> fs<span class="token operator">=</span>File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">)</span><span class="token punctuation">;</span>
    isize<span class="token operator">=</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">UnauthorizedAccessException</span> uex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>uex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> fex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>fex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">NotSupportedException</span> nex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>nex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">ArgumentException</span> aex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>aex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;error occured!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意：<code>catch</code>块的次序必须十分小心，比如一个<code>DivideByZeroException</code> 异常继承自<code>ArithmeticException</code>异常，如果你先捕获后者，则当除数为<code>0</code>时抛出的异常就会进入<code>ArithmeticException</code>块而永远不会进入<code>DivideByZeroException</code>块。事实上，当这种情况出现时，编译器会发现<code>DivideByZeroException</code>块不能被执行到，并会报告一个编译错误。</p><hr><h2 id="finally关键字" tabindex="-1"><a class="header-anchor" href="#finally关键字" aria-hidden="true">#</a> Finally关键字</h2><p>除了 <code>try</code> 和 <code>catch</code> 块中的代码外，有时你还需要添加无论何种情况下都会被执行到的代码，比如你可能需要释放一些资源、关闭一个文件等等，这是就需要使用Finally 关键字在 Catch 块后添加 Finally 块。即使代码抛出异常，并在Catch 块中添加了显式的<code>return</code>语句，<code>finally</code>块中的代码仍会被执行。Finally 块中的代码将在异常处理代码之后、控制返回到调用过程之前执行。</p><p>注意：<code>finally</code> 块只需要一个 <code>try</code> 块，<code>catch</code> 块的存在与否对其并没有影响。使用<code>break</code>,<code>continue</code>,<code>return</code>语句退出 <code>finally</code> 块都是非法的。 我们对上面的示例进行如下修改，以使任何情况下都可以调用结束代码，关闭可能打开了的文件：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">FileStream</span> fs<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> filepath<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBoxfilepath<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">long</span></span> isize<span class="token punctuation">;</span>
    fs<span class="token operator">=</span>File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">)</span><span class="token punctuation">;</span>
    isize<span class="token operator">=</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> fex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>fex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;error occured!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    <span class="token comment">//无论发生什么情况，下面的代码都将被执行到</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">!=</span>fs<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><h2 id="throw-关键字" tabindex="-1"><a class="header-anchor" href="#throw-关键字" aria-hidden="true">#</a> Throw 关键字</h2><p>在C#中，要通知一个非正常情况，你可以使用 <code>throw</code> 关键字抛出一个异常。下面一行代码创建一个新的<code>System.Exception</code>实例，并将它抛出：</p><p><code>throw new System.Exception();</code></p><p>抛出的异常和所有自然引发的异常一样，立即将代码段挂起，并由CLR寻找一个异常处理者。如果要截取不同的异常并将它们作为单个异常类型全部返回到调用程序，使用 Throw 语句可以非常轻松地完成此操作。比如有一段代码捕获所有异常，而且无论导致异常的原因是什么，都只抛出一个 <code>FileNotFoundException</code> 对象给调用程序，因为实际的过程调用者可能并不关心实际发生的事情，也不关心为什么无法找到文件，他只关心该文件是否可用，并且需要从其他不同的异常中辨别该特定异常。</p><hr><h2 id="exception对象" tabindex="-1"><a class="header-anchor" href="#exception对象" aria-hidden="true">#</a> Exception对象</h2><p>到目前为止我们一直使用<code>Exception</code>作为错误的信号，但未真正接触<code>Exception</code>对象本身，接着我们就来讨论这个问题。</p><p><img src="`+e+`" alt="图3：Exception 类的公共成员"> <br>图3：Exception 类的公共成员</p><p>图3是Exception类的公共成员变量。其中 <code>Message</code> 只读属性提供了关于这个异常的信息，比如为什么它被抛出，抛出异常的代码能在<code>Exception</code>构造函数中设定 <code>Message</code> 属性值。<code>HelpLink</code> 属性提供了一个此异常帮助文件的一个链接。而 <code>StackTrace</code> 只读属性是在运行时被设置的。在下面的例子中，<code>Exception.HelpLink</code> 属性被设置以提供用户关于<code>DivideByZeroException</code>的帮助，而异常的 <code>StackTrace</code>属性提供一个对错误语句的运行栈追踪，显示了堆栈信息和导致异常抛出的一系列方法调用。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Test</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">TestFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// try to divide two numbers</span>
    <span class="token comment">// handle possible exceptions</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TestFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Open file here&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">double</span></span> a <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">double</span></span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} / {1} = {2}&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token function">DoDivide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This line may or may not print&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// most derived exception type first</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>DivideByZeroException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nDivideByZeroException! Msg: {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nHelpLink: {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>HelpLink<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nHere&#39;s a stack trace: {0}\\n&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown exception caught&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Close file here.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// do the division if legal</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">DoDivide</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">double</span></span> b<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">DivideByZeroException</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DivideByZeroException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span>HelpLink <span class="token operator">=</span> <span class="token string">&quot;http://www.libertyassociates.com&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArithmeticException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Output:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Open file here
DivideByZeroException! Msg: Attempted to divide by zero.
HelpLink: http://www.libertyassociates.com
Here&#39;s a stack trace:
at Programming_CSharp.Test.DoDivide(Double a, Double b)
in c:\\...exception06.cs:line 56
at Programming_CSharp.Test.TestFunc( )
in...exception06.cs:line 22
Close file here.
</code></pre></div><p>在输出中，stack trace反向列出了被调用的方法，显示错误在<code>DoDivide( )</code>中发生，而此函数被TestFunc()调用。当多种方法纠缠在一起，stack trace能帮助你理清方法调用的次序。<br> 在异常被抛出之前，你可以设置 HelpLink 属性：</p><p><code>e.HelpLink = &quot;http://www.libertyassociates.com&quot;;</code></p><p>这让你能为用户提供有用的信息。</p><hr><p>小结</p><p>使用一个 Try/Catch 块可以向代码段添加异常处理。<br> .NET 运行时可以依次处理 Catch 块，它将使用找到的第一个匹配块。<br> 您可以嵌套 Try 块，以便轻松而有效地推入和弹出异常处理状态。<br> 在 Try 块后添加一个 Finally 块，这样无论发生什么，都可以无条件运行代码。</p><hr><p>作者：赵彦</p>`,57),l=[u];function i(k,r){return s(),a("div",null,l)}const h=n(c,[["render",i],["__file","cspbase40.html.vue"]]);export{h as default};
