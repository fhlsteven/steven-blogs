import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const e={},p=t(`<h1 id="worker-threads-in-c" tabindex="-1"><a class="header-anchor" href="#worker-threads-in-c" aria-hidden="true">#</a> Worker Threads in C#</h1><blockquote><p>作者：Alex Farber 翻译：小新0574</p></blockquote><p>原文链接：http://www.codeproject.com/csharp/workerthread.asp</p><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>The .NET framework provides a lot of ways to implement multithreading programs. I want to show how we can run a worker thread which makes syncronous calls to a user interface (for example, a thread that reads a long recordset and fills some control in the form).</p><p>.NET framework提供了很多方法来实现多线程程序。我想给大家演示怎么运行一个相对于用户界面实现同步调用的工作线程（比如说，一个读取一个很长的数据集来填充窗口中某个控件的线程）</p><p>To run thread I use:</p><p>为了运行线程，我使用：</p><ul><li><p>Thread instance and main thread function</p></li><li><p>Two events used to stop thread. First event is set when main thread wants to stop worker thread; second event is set by worker thread when it really stops.</p></li><li><p>线程实例和主线程函数</p></li><li><p>两个用来结束线程的事件。在主线程想要停止工作线程的时候,第一个事件的状态被设置为终止；在工作线程实际结束的时候，第二个事件的状态被工作线程设置为终止。</p></li></ul><p>.NET allows you to call System.Windows.Forms.Control functions only from the thread in which the control was created. To run them from another thread we need to use the Control.Invoke (synchronous call) or Control.BeginInvoke (asynchronous call) functions. For tasks like showing database records we need Invoke.</p><p>.NET只允许你在创建控件的线程调用System.Windows.Forms.Control 的函数。要在其它线程运行它们（函数）我们需要使用Control.Invoke (同步调用)或者Control.BeginInvoke (异步调用)函数。对于显示数据库记录这样的任务，我们需要Invoke。</p><p>To implement this we will use:</p><p>为了实现它我们要用：</p><ul><li><p>A Delegate type for calling the form function. Delegate instance and function called using this delegate</p></li><li><p>The Invoke call from the worker thread.</p></li><li><p>一个用来调用窗口中的函数的委托类型。委托实例和使用这个委托调用的函数</p></li><li><p>在工作线程调用的Invoke 函数。</p></li></ul><p>The next problem is to stop the worker thread correctly. The steps to do this are:</p><p>接下来的问题是怎么正确地终止工作线程。操作的步骤应该是：</p><ul><li><p>Set the event &quot;Stop Thread&quot;</p></li><li><p>Wait for the event &quot;Thread is stopped&quot;</p></li><li><p>Wait for the event process messages using the Application.DoEvents function. This prevents deadlocks because the worker thread makes Invoke calls which are processed in the main thread.</p></li><li><p>设置&quot;Stop Thread&quot;事件的状态为终止</p></li><li><p>等待&quot;Thread is stopped&quot; 事件</p></li><li><p>等待使用Application.DoEvents 函数来让事件处理（当前在消息队列中的所有 Windows） 消息。这样可以预防死锁，因为工作线程调用Invoke 函数，而这个函数是在主线程里处理的。</p></li></ul><p>The thread function checks every iteration whether the &quot;Stop Thread&quot; event has been set. If the event is set the function invokes clean-up operations, sets the event &quot;Thread is stopped&quot; and returns.</p><p>线程函数在每一次循环中检查是否&quot;Stop Thread&quot;事件被设置为终止了。如果该事件被设置为终止了，函数就调用一些清理操作，设置事件&quot;Thread is stopped&quot;为终止，同时返回。</p><p>Demo project has two classes: <code>MainForm</code> and <code>LongProcess</code>. The <code>LongProcess.Run</code> function runs in a thread and fills the list box with some lines. The worker thread may finish naturally or may be stopped when user presses the &quot;Stop Thread&quot; button or closes the form.</p><p>演示工程有两个类：<code>MainForm</code> 和 <code>LongProcess</code>。<code>LongProcess.Run</code> 函数在一个线程里运行，这个线程用来为列表框填充几行文字。工作线程可以自然结束或者可能在用户按了&quot;Stop Thread&quot;按钮或者关闭窗体时结束。</p><p>代码片断：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// MainForm.cs</span>
<span class="token keyword">namespace</span> <span class="token namespace">WorkerThread</span>
<span class="token punctuation">{</span>
    <span class="token comment">// delegates used to call MainForm functions from worker thread</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DelegateAddString</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DelegateThreadFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainForm</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>

        <span class="token comment">// worker thread</span>
        <span class="token class-name">Thread</span> m_WorkerThread<span class="token punctuation">;</span>

        <span class="token comment">// events used to stop worker thread</span>
        <span class="token class-name">ManualResetEvent</span> m_EventStopThread<span class="token punctuation">;</span>
        <span class="token class-name">ManualResetEvent</span> m_EventThreadStopped<span class="token punctuation">;</span>

        <span class="token comment">// Delegate instances used to call user interface functions </span>
        <span class="token comment">// from worker thread:</span>
        <span class="token keyword">public</span> <span class="token class-name">DelegateAddString</span> m_DelegateAddString<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">DelegateThreadFinished</span> m_DelegateThreadFinished<span class="token punctuation">;</span>

        <span class="token comment">// ...</span>

        <span class="token keyword">public</span> <span class="token function">MainForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// initialize delegates</span>
            m_DelegateAddString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DelegateAddString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>AddString<span class="token punctuation">)</span><span class="token punctuation">;</span>
            m_DelegateThreadFinished <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DelegateThreadFinished</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ThreadFinished<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// initialize events</span>
            m_EventStopThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            m_EventThreadStopped <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// ...</span>

        <span class="token comment">// Start thread button is pressed</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnStartThread_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// ...</span>
            
            <span class="token comment">// reset events</span>
            m_EventStopThread<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            m_EventThreadStopped<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// create worker thread instance</span>
            m_WorkerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>WorkerThreadFunction<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            m_WorkerThread<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Worker Thread Sample&quot;</span><span class="token punctuation">;</span>   <span class="token comment">// looks nice in Output window</span>

            m_WorkerThread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>

        <span class="token comment">// Worker thread function.</span>
        <span class="token comment">// Called indirectly from btnStartThread_Click</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WorkerThreadFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">LongProcess</span> longProcess<span class="token punctuation">;</span>
            longProcess <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LongProcess</span><span class="token punctuation">(</span>m_EventStopThread<span class="token punctuation">,</span> m_EventThreadStopped<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            longProcess<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Stop worker thread if it is running.</span>
        <span class="token comment">// Called when user presses Stop button or form is closed.</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StopThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span> m_WorkerThread <span class="token operator">!=</span> <span class="token keyword">null</span>  <span class="token operator">&amp;&amp;</span>  m_WorkerThread<span class="token punctuation">.</span>IsAlive <span class="token punctuation">)</span>  <span class="token comment">// thread is active</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// set event &quot;Stop&quot;</span>
                m_EventStopThread<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// wait when thread  will stop or finish</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>m_WorkerThread<span class="token punctuation">.</span>IsAlive<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">// We cannot use here infinite wait because our thread</span>
                    <span class="token comment">// makes syncronous calls to main form, this will cause deadlock.</span>
                    <span class="token comment">// Instead of this we wait for event some appropriate time</span>
                    <span class="token comment">// (and by the way give time to worker thread) and</span>
                    <span class="token comment">// process events. These events may contain Invoke calls.</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span> WaitHandle<span class="token punctuation">.</span><span class="token function">WaitAll</span><span class="token punctuation">(</span>
                        <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>m_EventThreadStopped<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
                        <span class="token number">100</span><span class="token punctuation">,</span>
                        <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    Application<span class="token punctuation">.</span><span class="token function">DoEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Add string to list box.</span>
        <span class="token comment">// Called from worker thread using delegate and Control.Invoke</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddString</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Set initial state of controls.</span>
        <span class="token comment">// Called from worker thread using delegate and Control.Invoke</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ThreadFinished</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            btnStartThread<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            btnStopThread<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// LongProcess.cs</span>
<span class="token keyword">namespace</span> <span class="token namespace">WorkerThread</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LongProcess</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>

        <span class="token comment">// Function runs in worker thread and emulates long process.</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
            <span class="token class-name">String</span> s<span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// make step</span>
                s <span class="token operator">=</span> <span class="token string">&quot;Step number &quot;</span> <span class="token operator">+</span> i<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; executed&quot;</span><span class="token punctuation">;</span>

                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Make synchronous call to main form.</span>
                <span class="token comment">// MainForm.AddString function runs in main thread.</span>
                <span class="token comment">// (To make asynchronous call use BeginInvoke)</span>
                m_form<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>m_form<span class="token punctuation">.</span>m_DelegateAddString<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Object<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>s<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


                <span class="token comment">// check if thread is cancelled</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span> m_EventStop<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">// clean-up operations may be placed here</span>
                    <span class="token comment">// ...</span>

                    <span class="token comment">// inform main thread that this thread stopped</span>
                    m_EventStopped<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Make synchronous call to main form</span>
            <span class="token comment">// to inform it that thread finished</span>
            m_form<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>m_form<span class="token punctuation">.</span>m_DelegateThreadFinished<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>有兴趣的朋友可以研究一下原页面可以下载的演示工程代码，很好的一个例子，本来我还想自己做一下解析，但是读了几遍作者的解释，觉得差不多了，不用我再费话了。</p><p>读国外的一些原代码，最强的感受到不在于写代码的技巧有多高，而在于注释做得太好了，几乎一些重要的语句都有注释说明作用，希望大家写的程序也都能有良好的注释。</p>`,26),o=[p];function c(l,u){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","pts8.html.vue"]]);export{k as default};
