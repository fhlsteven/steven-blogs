import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="c-多线程编程实例实战" tabindex="-1"><a class="header-anchor" href="#c-多线程编程实例实战" aria-hidden="true">#</a> C#多线程编程实例实战</h1><blockquote><p>刘弹 2003-6-1</p></blockquote><p>单个写入程序/多个阅读程序在.Net类库中其实已经提供了实现，即System.Threading.ReaderWriterLock类。本文通过对常见的单个写入/多个阅读程序的分析来探索c#的多线程编程。</p><h2 id="问题的提出" tabindex="-1"><a class="header-anchor" href="#问题的提出" aria-hidden="true">#</a> 问题的提出</h2><p>所谓单个写入程序/多个阅读程序的线程同步问题，是指任意数量的线程访问共享资源时，写入程序（线程）需要修改共享资源，而阅读程序（线程）需要读取数据。在这个同步问题中，很容易得到下面二个要求：</p><p>1） 当一个线程正在写入数据时，其他线程不能写，也不能读。<br> 2） 当一个线程正在读入数据时，其他线程不能写，但能够读。</p><p>在数据库应用程序环境中经常遇到这样的问题。比如说，有n个最终用户，他们都要同时访问同一个数据库。其中有m个用户要将数据存入数据库，n-m个用户要读取数据库中的记录。</p><p>很显然，在这个环境中，我们不能让两个或两个以上的用户同时更新同一条记录，如果两个或两个以上的用户都试图同时修改同一记录，那么该记录中的信息就会被破坏。</p><p>我们也不让一个用户更新数据库记录的同时，让另一用户读取记录的内容。因为读取的记录很有可能同时包含了更新和没有更新的信息，也就是说这条记录是无效的记录。</p><h2 id="实现分析" tabindex="-1"><a class="header-anchor" href="#实现分析" aria-hidden="true">#</a> 实现分析</h2><p>规定任一线程要对资源进行写或读操作前必须申请锁。根据操作的不同，分为阅读锁和写入锁，操作完成之后应释放相应的锁。将单个写入程序/多个阅读程序的要求改变一下，可以得到如下的形式：</p><p>一个线程申请阅读锁的成功条件是：当前没有活动的写入线程。<br> 一个线程申请写入锁的成功条件是：当前没有任何活动（对锁而言）的线程。</p><p>因此，为了标志是否有活动的线程，以及是写入还是阅读线程，引入一个变量m_nActive，如果m_nActive &gt; 0，则表示当前活动阅读线程的数目，如果m_nActive=0，则表示没有任何活动线程，m_nActive &lt;0，表示当前有写入线程在活动，注意m_nActive&lt;0，时只能取-1的值，因为只允许有一个写入线程活动。</p><p>为了判断当前活动线程拥有的锁的类型，我们采用了线程局部存储技术（请参阅其它参考书籍），将线程与特殊标志位关联起来。</p><p>申请阅读锁的函数原型为：<code>public void AcquireReaderLock(int millisecondsTimeout)</code>，其中的参数为线程等待调度的时间。函数定义如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AcquireReaderLock</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> millisecondsTimeout<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// m_mutext很快可以得到，以便进入临界区 </span>
    m_mutex<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 是否有写入线程存在 </span>
    <span class="token class-name"><span class="token keyword">bool</span></span> bExistingWriter <span class="token operator">=</span> <span class="token punctuation">(</span>m_nActive <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bExistingWriter<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token comment">//等待阅读线程数目加1,当有锁释放时，根据此数目来调度线程 </span>
        m_nWaitingReaders<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span> <span class="token comment">//当前活动线程加1 </span>
        m_nActive<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    m_mutex<span class="token punctuation">.</span><span class="token function">ReleaseMutex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//存储锁标志为Reader </span>
    <span class="token class-name">System<span class="token punctuation">.</span>LocalDataStoreSlot</span> slot <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetNamedDataSlot</span><span class="token punctuation">(</span>m_strThreadSlotName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">object</span></span> obj <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LockFlags</span> flag <span class="token operator">=</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        flag <span class="token operator">=</span> <span class="token punctuation">(</span>LockFlags<span class="token punctuation">)</span>obj<span class="token punctuation">;</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span>flag <span class="token operator">==</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Thread<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> LockFlags<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        Thread<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> <span class="token punctuation">(</span>LockFlags<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>flag <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>LockFlags<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>bExistingWriter<span class="token punctuation">)</span>
    <span class="token punctuation">{</span> <span class="token comment">//等待指定的时间 </span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_aeReaders<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span>millisecondsTimeout<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它首先进入临界区（用以在多线程环境下保证活动线程数目的操作的正确性）判断当前活动线程的数目，如果有写线程(m_nActive&lt;0)存在，则等待指定的时间并且等待的阅读线程数目加1。如果当前活动线程是读线程(m_nActive&gt;=0)，则可以让读线程继续运行。</p><p>申请写入锁的函数原型为：<code>public void AcquireWriterLock(int millisecondsTimeout)</code>，其中的参数为等待调度的时间。函数定义如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AcquireWriterLock</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> millisecondsTimeout<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// m_mutext很快可以得到，以便进入临界区 </span>
    m_mutex<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 是否有活动线程存在 </span>
    <span class="token class-name"><span class="token keyword">bool</span></span> bNoActive <span class="token operator">=</span> m_nActive <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bNoActive<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_nWaitingWriters<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        m_nActive<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    m_mutex<span class="token punctuation">.</span><span class="token function">ReleaseMutex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//存储线程锁标志 </span>
    <span class="token class-name">System<span class="token punctuation">.</span>LocalDataStoreSlot</span> slot <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetNamedDataSlot</span><span class="token punctuation">(</span><span class="token string">&quot;myReaderWriterLockDataSlot&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">object</span></span> obj <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LockFlags</span> flag <span class="token operator">=</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        flag <span class="token operator">=</span> <span class="token punctuation">(</span>LockFlags<span class="token punctuation">)</span>Thread<span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span>flag <span class="token operator">==</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Thread<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> LockFlags<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        Thread<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> <span class="token punctuation">(</span>LockFlags<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>flag <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>LockFlags<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//如果有活动线程，等待指定的时间 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bNoActive<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_aeWriters<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span>millisecondsTimeout<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它首先进入临界区判断当前活动线程的数目，如果当前有活动线程存在，不管是写线程还是读线程（m_nActive），线程将等待指定的时间并且等待的写入线程数目加1，否则线程拥有写的权限。</p><p>释放阅读锁的函数原型为：<code>public void ReleaseReaderLock()</code>。函数定义如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReleaseReaderLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">System<span class="token punctuation">.</span>LocalDataStoreSlot</span> slot <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">GetNamedDataSlot</span><span class="token punctuation">(</span>m_strThreadSlotName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LockFlags</span> flag <span class="token operator">=</span> <span class="token punctuation">(</span>LockFlags<span class="token punctuation">)</span>Thread<span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>flag <span class="token operator">==</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name"><span class="token keyword">bool</span></span> bReader <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">:</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> LockFlags<span class="token punctuation">.</span>Writer<span class="token punctuation">:</span>
            bReader <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bReader<span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    
    Thread<span class="token punctuation">.</span><span class="token function">SetData</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> LockFlags<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">;</span>
    m_mutex<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">AutoResetEvent</span> autoresetevent <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>m_nActive<span class="token operator">--</span><span class="token punctuation">;</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_nActive <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_nWaitingReaders <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_nActive<span class="token operator">++</span><span class="token punctuation">;</span>
            m_nWaitingReaders<span class="token operator">--</span><span class="token punctuation">;</span>
            autoresetevent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_aeReaders<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_nWaitingWriters <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_nWaitingWriters<span class="token operator">--</span><span class="token punctuation">;</span>
            m_nActive<span class="token operator">--</span><span class="token punctuation">;</span>
            autoresetevent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_aeWriters<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    m_mutex<span class="token punctuation">.</span><span class="token function">ReleaseMutex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>autoresetevent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        autoresetevent<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>释放阅读锁时，首先判断当前线程是否拥有阅读锁（通过线程局部存储的标志），然后判断是否有等待的阅读线程，如果有，先将当前活动线程加1，等待阅读线程数目减1，然后置事件为有信号。如果没有等待的阅读线程，判断是否有等待的写入线程，如果有则活动线程数目减1，等待的写入线程数目减1。释放写入锁与释放阅读锁的过程基本一致，可以参看源代码。</p><p>注意在程序中，释放锁时，只会唤醒一个阅读程序，这是因为使用AutoResetEvent的原历，读者可自行将其改成ManualResetEvent，同时唤醒多个阅读程序，此时应令m_nActive等于整个等待的阅读线程数目。</p><h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h2><p>测试程序取自.Net FrameSDK中的一个例子，只是稍做修改。测试程序如下，</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">MyThreading</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Resource</span>
<span class="token punctuation">{</span>
    <span class="token class-name">myReaderWriterLock</span> rwl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">myReaderWriterLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token class-name">Int32</span> threadNum<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        rwl<span class="token punctuation">.</span><span class="token function">AcquireReaderLock</span><span class="token punctuation">(</span>Timeout<span class="token punctuation">.</span>Infinite<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Start Resource reading (Thread={0})&quot;</span><span class="token punctuation">,</span> threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Stop Resource reading (Thread={0})&quot;</span><span class="token punctuation">,</span> threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            rwl<span class="token punctuation">.</span><span class="token function">ReleaseReaderLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token class-name">Int32</span> threadNum<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        rwl<span class="token punctuation">.</span><span class="token function">AcquireWriterLock</span><span class="token punctuation">(</span>Timeout<span class="token punctuation">.</span>Infinite<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Start Resource writing (Thread={0})&quot;</span><span class="token punctuation">,</span> threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">750</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Stop Resource writing (Thread={0})&quot;</span><span class="token punctuation">,</span> threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
            rwl<span class="token punctuation">.</span><span class="token function">ReleaseWriterLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">App</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">Int32</span> numAsyncOps <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">AutoResetEvent</span> asyncOpsAreDone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">Resource</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Resource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Int32</span> threadNum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> threadNum <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> threadNum<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ThreadPool<span class="token punctuation">.</span><span class="token function">QueueUserWorkItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">WaitCallback</span><span class="token punctuation">(</span>UpdateResource<span class="token punctuation">)</span><span class="token punctuation">,</span> threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        asyncOpsAreDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;All operations have completed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// The callback method&#39;s signature MUST match that of a System.Threading.TimerCallback </span>
    <span class="token comment">// delegate (it takes an Object parameter and returns void) </span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateResource</span><span class="token punctuation">(</span><span class="token class-name">Object</span> state<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Int32</span> threadNum <span class="token operator">=</span> <span class="token punctuation">(</span>Int32<span class="token punctuation">)</span>state<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>threadNum <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> 
            res<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> 
            res<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>threadNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Interlocked<span class="token punctuation">.</span><span class="token function">Decrement</span><span class="token punctuation">(</span><span class="token keyword">ref</span> numAsyncOps<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            asyncOpsAreDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从测试结果中可以看出，可以满足单个写入程序\\多个阅读程序的实现要求。</p>`,28),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","pts15.html.vue"]]);export{i as default};
