import{_ as p,r as o,o as e,c,b as n,d as s,e as t,a as l}from"./app-477de5b2.js";const u="/steven-blogs/assets/pts25_1-e6857f5c.png",k="/steven-blogs/assets/pts25_2-4b3a35d6.png",i={},r=n("h1",{id:"再谈windows窗体多线程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#再谈windows窗体多线程","aria-hidden":"true"},"#"),s(" 再谈Windows窗体多线程")],-1),d=n("p",null,"2002年9月2日",-1),g={href:"http://msdn.microsoft.com/code/default.asp?url=/code/sample.asp?url=/msdn-files/026/002/870/msdncompositedoc.xml",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,[n("strong",null,"摘要"),s("：本文探讨了如何利用多线程从长时间运行的操作中分离出用户界面 (UI)，以将用户的后续输入传递给辅助线程以调节其行为，从而实现稳定而正确的多线程处理的消息传递方案。")],-1),w={href:"http://msdn.microsoft.com/library/en-us/dnforms/html/winforms06112002.asp",target:"_blank",rel:"noopener noreferrer"},h=l('<p><img src="'+u+`" alt="pts25_1"><br> 图 1：Pi 的位数应用程序</p><h2 id="windows-窗体和后台处理" tabindex="-1"><a class="header-anchor" href="#windows-窗体和后台处理" aria-hidden="true">#</a> Windows 窗体和后台处理</h2><p>在上一篇文章中，我们介绍了直接启动线程进行后台处理，但选择使用异步委托来启动辅助线程。异步委托在传递参数时具有语法方便的优点，并且通过在进程范围的、公共语言运行库管理的池中使用线程来获得更大的作用范围。我们遇到的仅有的问题发生在辅助线程需要向用户通知进度时。在本例中，辅助线程不允许直接使用 UI 控件（长期使用的 Win32? UI 不被允许）。取而代之的是，辅助线程必须向 UI 线程发送或发布一条消息，并使用 <code>Control.Invoke</code> 或 <code>Control.BeginInvoke</code> 在拥有 UI 控件的线程上执行代码。考虑到这些因素后的代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 委托以开始异步计算 pi</span>
<span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalcPiDelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> digits<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">_calcButton_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 开始异步计算 pi</span>
    <span class="token class-name">CalcPiDelegate</span> calcPi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CalcPiDelegate</span><span class="token punctuation">(</span>CalcPi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    calcPi<span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>_digits<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalcPi</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> digits<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StringBuilder</span> pi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> digits <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 显示进度</span>
    <span class="token function">ShowProgress</span><span class="token punctuation">(</span>pi<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> digits<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>digits <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        pi<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> digits<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">9</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token range operator">..</span><span class="token punctuation">.</span>
            <span class="token comment">// 显示进度</span>
            <span class="token function">ShowProgress</span><span class="token punctuation">(</span>pi<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> digits<span class="token punctuation">,</span> i <span class="token operator">+</span> digitCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 委托以向 UI 线程通知辅助线程的进度</span>
<span class="token keyword">delegate</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgressDelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> pi<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> totalDigits<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> digitsSoFar<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> pi<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> totalDigits<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> digitsSoFar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 确保在正确的线程上</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_pi<span class="token punctuation">.</span>InvokeRequired <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _pi<span class="token punctuation">.</span>Text <span class="token operator">=</span> pi<span class="token punctuation">;</span>
        _piProgress<span class="token punctuation">.</span>Maximum <span class="token operator">=</span> totalDigits<span class="token punctuation">;</span>
        _piProgress<span class="token punctuation">.</span>Value <span class="token operator">=</span> digitsSoFar<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 异步显示进度</span>
        <span class="token class-name">ShowProgressDelegate</span> showProgress <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ShowProgressDelegate</span><span class="token punctuation">(</span>ShowProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span>showProgress<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> pi<span class="token punctuation">,</span> totalDigits<span class="token punctuation">,</span> digitsSoFar <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，这里有两个委托。第一个是 CalcPiDelegate，用于捆绑要传递给（从线程池中分配的）辅助线程上的 CalcPi 的参数。当用户决定要计算 pi 时，事件处理程序将创建此委托的一个实例。此工作通过调用 BeginInvoke 在线程池中进行排队。第一个委托实际上是由 UI 线程用于向辅助线程传递消息。</p><p>第二个委托是 ShowProgressDelegate，由辅助线程用于向 UI 线程回传消息，通常是有关长时间运行的操作的最新进度。为了对调用者屏蔽与此 UI 线程有关的线程安全通信信息，ShowProgress 方法在此 UI 线程上通过 Control.BeginInvoke 方法使用 ShowProgressDelegate 给自己发送消息。Control.BeginInvoke 异步队列为 UI 线程提供服务，并且不等待结果就继续运行。</p><h2 id="取消" tabindex="-1"><a class="header-anchor" href="#取消" aria-hidden="true">#</a> 取消</h2><p>在本示例中，我们可以在辅助线程和 UI 线程之间来回发送消息而无需关注外部环境。UI 线程不必等待辅助线程执行完毕，甚至无需等待完成通知，因为辅助线程在执行过程中会与其实时交流进度情况。同样，辅助线程也不必等待 UI 线程显示进度，只要进度消息按照固定的时间间隔发送以使用户感到满意即可。但有一点无法满足用户，即：不能完全控制应用程序正在执行的任何处理。即使 UI 在计算 pi 时能够提供响应，有时用户仍需要取消计算操作，例如如果用户决定需要计算 1,000,001 位数字但却错误地输入了 1,000,000。更新的 CalcPi UI 允许取消操作，如图 2 所示。</p><p><img src="`+k+`" alt="pts25_1"><br> 图 2：允许用户取消长时间运行的操作</p><p>要实现取消长时间运行的操作，需要完成多个步骤。首先，需要为用户提供 UI。在本例中，<strong>Calc</strong>（计算）按钮在计算开始后变为 <strong>Cancel</strong>（取消）按钮。另一个常见的选择是进度对话框。该对话框通常包含当前进度的详细信息，包括显示工作完成百分比的进度条和一个<strong>Cancel</strong>（取消）按钮。</p><p>如果用户决定取消操作，则应该在成员变量中提供说明，并且在从 UI 线程获知辅助线程应该停止时，到辅助线程自己知道并可以停止发送进度之前的这一小段时间内，应该禁用 UI。如果忽略这段时间，可能会出现这种情况：用户在第一个辅助线程停止发送进度之前又开始了另一项操作，这就使 UI 线程必须判断是从新的辅助线程获取进度还是从即将关闭的旧线程获取进度。当然，也可以为每个辅助线程分配一个唯一的 ID，从而使 UI 线程可以处理好这些工作。（如果有多个并存的长时间运行的操作，则很有必要这样做。）这样，在从 UI 获知辅助线程即将停止工作时到辅助线程获知之前的这一小段时间内，暂停 UI 通常会更容易一些。我们的简单的 pi 计算器的实现方式是使用一个具有三个值的枚举变量，如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">enum</span> <span class="token class-name">CalcState</span> <span class="token punctuation">{</span>
    Pending<span class="token punctuation">,</span>     <span class="token comment">// 没有任何计算正在运行或取消</span>
    Calculating<span class="token punctuation">,</span> <span class="token comment">// 正在计算</span>
    Canceled<span class="token punctuation">,</span>    <span class="token comment">// 在 UI 中计算已被取消但在辅助线程中还没有</span>
<span class="token punctuation">}</span>

<span class="token class-name">CalcState</span> _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Pending<span class="token punctuation">;</span>
</code></pre></div><p>现在，根据所处的状态不同，我们分别处理 Calc 按钮，如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">_calcButton_Click</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Calc 按钮兼有 Cancel 按钮的功能</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span> _state <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 开始新的计算</span>
        <span class="token keyword">case</span> CalcState<span class="token punctuation">.</span>Pending<span class="token punctuation">:</span>
            <span class="token comment">// 允许取消</span>
            _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Calculating<span class="token punctuation">;</span>
            _calcButton<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Cancel&quot;</span><span class="token punctuation">;</span>

            <span class="token comment">// 异步委托方法</span>
            <span class="token class-name">CalcPiDelegate</span>  calcPi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CalcPiDelegate</span><span class="token punctuation">(</span>CalcPi<span class="token punctuation">)</span><span class="token punctuation">;</span>
            calcPi<span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>_digits<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token comment">// 取消正在运行的计算</span>
        <span class="token keyword">case</span> CalcState<span class="token punctuation">.</span>Calculating<span class="token punctuation">:</span>
            _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Canceled<span class="token punctuation">;</span>
            _calcButton<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token comment">// 在取消过程中应该无法按下 Calc 按钮</span>
        <span class="token keyword">case</span> CalcState<span class="token punctuation">.</span>Canceled<span class="token punctuation">:</span>
            Debug<span class="token punctuation">.</span><span class="token function">Assert</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>请注意，如果在处于 Pending 状态时按下 <strong>Calc/Cancel</strong> 按钮，我们发送状态 Calculating（同时更改按钮上的标签），并像以前那样开始异步计算。如果在处于 Calculating 状态时按下 Calc/Cancel 按钮，则应该将状态切换为 Canceled 并禁止 UI 开始新的计算（在它为我们向辅助线程传递取消状态期间）。一旦我们已经向辅助线程传达了取消操作的信息，就可以再次启用 UI 并将状态重设为 Pending，从而使用户可以开始其他操作。要向辅助线程传达取消操作的信息，可以将 <code>ShowProgress</code> 方法扩充为包含新的 <code>out</code> 参数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">bool</span></span> cancel<span class="token punctuation">)</span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalcPi</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> digits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> cancel <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> digits<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">9</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>

        <span class="token comment">// 显示进度（检查是否取消）</span>
        <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> cancel<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span> cancel <span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>您可能想尝试将取消指示器设置为从 ShowProgress 返回的布尔值，但我从来都记不住 true 是表示取消还是表示一切正常（或继续照常执行）。所以我使用 out 参数，这样可以更直观一些。</p><p>最后剩下的事情是更新 ShowProgress 方法（即在辅助线程和 UI 线程之间实际执行传递工作的那部分代码），以判断用户是否请求取消并相应地通知 CalcPi 程序。确切地说，如何在 UI 和辅助线程之间传递信息取决于我们希望使用哪种技术。</p><h2 id="通过共享数据进行通信" tabindex="-1"><a class="header-anchor" href="#通过共享数据进行通信" aria-hidden="true">#</a> 通过共享数据进行通信</h2><p>传递 UI 当前状态的最常见方法是让辅助线程直接访问 _state 成员变量。我们可以使用以下代码来达到这一目的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">bool</span></span> cancel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 不要这样做！</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span> _state <span class="token operator">==</span> CalcState<span class="token punctuation">.</span>Cancel <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Pending<span class="token punctuation">;</span>
    cancel <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我希望您看到这段代码时能够自然而然地（而不只是因为代码中的警告注释）想到放弃它。如果您打算编写多线程的程序，就必须要注意在任何时候两个线程都可能会同时访问相同的数据（在本例中是 _state 成员变量）。在线程之间共享访问数据很容易使线程进入“竞争状态”，即其中一个线程在另一个线程完成更新数据之前抢先读取部分更新的数据。为了实现共享数据的并发访问，您需要监视共享数据的使用情况，以确保各线程耐心等待其他线程处理完数据。为了监视共享数据的访问，.NET 为共享对象提供了 Monitor 类，其作用类似于为数据加了一把锁（C# 中包含了这种方便的加锁块）：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">object</span></span> _stateLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">bool</span></span> cancel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 也不要这样做！</span>
  <span class="token keyword">lock</span><span class="token punctuation">(</span> _stateLock <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 监视锁</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span> _state <span class="token operator">==</span> CalcState<span class="token punctuation">.</span>Cancel <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Pending<span class="token punctuation">;</span>
      cancel <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>现在我已经适当地锁定了对共享数据的访问，但由于我是采取上述方法来实现的，因此在执行多线程编程时就很可能会产生另一个常见问题，即“死锁”。当两个线程出现死锁时，在继续执行之前它们均会等待另一个线程完成其工作，这样实际上两者就都不能执行。</p><p>如果所有这些有关竞争状态和死锁的讨论都已经引起了您的关注，那就好。通过共享数据进行的多线程编程很难做到十全十美。目前为止，我们已经能够避免这些问题，因为我们已经传递了该数据的很多副本，并且各线程对这些副本具有完全的所有权。如果没有共享数据，则无需考虑同步。如果您发现必须访问共享数据（也就是说，复制数据需要大量空间或非常费时），则需要研究在线程之间共享数据（查看“参考书目”一节以获得在此领域中我最喜欢的研究文章）。</p><p>然而，绝大部分多线程方案（尤其是当涉及到 UI 多线程时）似乎与我们目前一直使用的简单消息传递方案配合得最好。大多数时候，您不希望 UI 对正在后台进行处理的数据具有访问权限（例如正在打印的文档或正被枚举的对象集合）。对于这些情况，最好的选择是避免使用共享数据。</p><h2 id="通过方法参数进行通信" tabindex="-1"><a class="header-anchor" href="#通过方法参数进行通信" aria-hidden="true">#</a> 通过方法参数进行通信</h2><p>我们已经将 ShowProgress 方法扩充为包含 out 参数了。为什么不让 ShowProgress 在 UI 线程上执行时检查 _state 变量的状态呢？如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">bool</span></span> cancel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 确认在 UI 线程上</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span> _pi<span class="token punctuation">.</span>InvokeRequired <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>

        <span class="token comment">// 检查是否取消</span>
        cancel <span class="token operator">=</span> <span class="token punctuation">(</span>_state <span class="token operator">==</span> CalcState<span class="token punctuation">.</span>Canceled<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 检查是否完成</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span> cancel <span class="token operator">||</span> <span class="token punctuation">(</span>digitsSoFar <span class="token operator">==</span> totalDigits<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _state <span class="token operator">=</span> CalcState<span class="token punctuation">.</span>Pending<span class="token punctuation">;</span>
            _calcButton<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Calc&quot;</span><span class="token punctuation">;</span>
            _calcButton<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将控制传递给 UI 线程</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于只有 UI 线程访问 _state 成员变量，因此不需要同步。现在只需要按照上述方法将控制传递给 UI 线程，即可获得 ShowProgressDelegate 的 cancel out 参数。不幸的是，使用 Control.BeginInvoke 使情况变得有些复杂。问题在于 BeginInvoke 不会等待 ShowProgress 在 UI 线程上的调用结果，因此我们有两个选择。其中之一是向 BeginInvoke 传递另一个委托并在 ShowProgress 从 UI 线程返回后调用它，但这同时也会发生在线程池的其他线程上，所以我们还必须回到同步上来，这一次是在辅助线程和连接池中的另一个线程之间同步。另一个较为简单的方法是切换到同步的 Control.Invoke 方法并等待 cancel out 参数。然而，就算采用这种方法也会有一点点棘手，如以下代码所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowProgress</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">bool</span></span> cancel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span> _pi<span class="token punctuation">.</span>InvokeRequired <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
    <span class="token comment">// 将控制传递给 UI 线程</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token class-name">ShowProgressDelegate</span>  showProgress <span class="token operator">=</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ShowProgressDelegate</span><span class="token punctuation">(</span>ShowProgress<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 避免包装或丢失返回值</span>
        <span class="token class-name"><span class="token keyword">object</span></span> inoutCancel <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token comment">// 同步显示进度（这样我们可以检查是否取消）</span>
        <span class="token function">Invoke</span><span class="token punctuation">(</span>showProgress<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">,</span> inoutCancel<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cancel <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span>inoutCancel<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>虽然直接向 Control.Invoke 简单传递一个布尔变量来获得 cancel 参数可能是一个理想的方法，但这同样存在问题。问题是 bool 是“值数据类型”，而 Invoke 采用对象数组作为参数，并且对象是“引用数据类型”。（您可以查看“参考书目”一节以获得有关讨论两者区别的书籍。）其结果是作为对象传递的 bool 将被复制而保持实际的 bool 不变，这意味着我们无法知道操作被取消了。为了避免出现这种情况，我们创建了自己的对象变量 (inoutCancel) 并传递它，这样就避免了复制。在同步调用 Invoke 后，我们将 object 变量转换为 bool 以查看是否应该取消操作。</p><p>任何时候调用带有 out 或 ref 参数的 Control.Invoke（或 Control.BeginInvoke）时，都必须注意值类型和引用类型数据之间的区别。（这里的 out 或 ref 是值类型，例如 int 或 bool 等原始类型以及枚举和结构类型等。）当然，即便您使用自定义的引用类型（也叫做类）传递更加复杂的数据，也不需要专门再做其他工作。然而，即使在处理 Invoke/BeginInvoke 的数据类型时会有些麻烦，但相比让多线程代码在竞争状态或使用死锁-释放方法的情况下访问共享数据而言，这算不上是个大问题，所以我认为付出这点小代价是值得的。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>我们又一次使用了一个很小的示例来探讨一些复杂的问题。我们不仅利用了多线程从长时间运行的操作中分离 UI，而且还将用户的进一步输入传递给辅助线程以调整其行为。尽管我们原本可以使用共享数据来避免复杂的同步问题（这只有在您的上司试用您的代码时才会产生），但最终我们还是使用了消息传递方案来进行稳定而正确的多线程处理。</p><h2 id="参考书目" tabindex="-1"><a class="header-anchor" href="#参考书目" aria-hidden="true">#</a> 参考书目</h2>`,36),y=n("li",null,"本文的源代码",-1),f={href:"http://msdn.microsoft.com/library/en-us/dnforms/html/winforms07182002.asp",target:"_blank",rel:"noopener noreferrer"},_={href:"http://www.amazon.com/exec/obidos/tg/detail/-/1565922964",target:"_blank",rel:"noopener noreferrer"},C={href:"http://www.microsoft.com/mspress/books/5353.asp",target:"_blank",rel:"noopener noreferrer"},b={href:"http://www.amazon.com/exec/obidos/ASIN/0201734117/",target:"_blank",rel:"noopener noreferrer"};function I(v,P){const a=o("ExternalLinkIcon");return e(),c("div",null,[r,d,n("p",null,[s("从 "),n("a",g,[s("MSDN Code Center 下载 asynchcaclpi.exe 示例文件"),t(a)]),s("（英文）。")]),m,n("p",null,[s("或许您还能回想起以前的一些专栏，例如 "),n("a",w,[s("Safe, Simple Multithreading in Windows Forms"),t(a)]),s("（英文）。如果您仔细阅读，就可以使 Windows 窗体和线程很好地协同工作。执行长时间运行的操作的较好方法是使用线程，例如计算 pi 小数点之后的多位数值（如以下图 1 所示）。")]),h,n("ul",null,[y,n("li",null,[n("a",f,[s("Safe, Simple Multithreading in Windows Forms"),t(a)]),s("（英文）")]),n("li",null,[n("a",_,[s("Win32 Multithreaded Programming"),t(a)]),s("（英文），Aaron Cohen 和 Mike Woodring 著")]),n("li",null,[n("a",C,[s("Applied Microsoft .NET Framework Programming"),t(a)]),s("（英文），Jeffrey Richter 著")]),n("li",null,[n("a",b,[s("Essential .NET, Volume 1: The Common Language Runtime"),t(a)]),s("（英文），Don Box 著")])])])}const U=p(i,[["render",I],["__file","pts25.html.vue"]]);export{U as default};
