import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="解析vs-net线程异步调用" tabindex="-1"><a class="header-anchor" href="#解析vs-net线程异步调用" aria-hidden="true">#</a> 解析VS.Net线程异步调用</h1><p>WebService是微软.NET技术的一个亮点，它使得跨平台、跨语言、基于Internet上的互操作成为可能。Visual Studio.NET的IDE使得WebService的开发变得非常容易。程序员不需要直接面对SOAP， UDDI以及WSDL等繁琐的细节。但是由于WebService基于Internet的本质，使得对调用它的客户端程序提出了一些新的挑战。举例来说，调用WebService往往会经历较长的时延，或者是得不到响应（原因可能是Internet的连接问题，带宽问题，对方服务器过于繁忙或者是宕机等）。这样，如果客户端程序使用桌面程序中广泛采用的同步函数调用就会使得程序在等待返回结果时被“挂起”，不能响应用户的键盘和鼠标事件，用户甚至无法“放弃（Abort）”操作。这种情况对于用户来说是不可以接收的。在这种情况下，你可能要考虑使用异步方式来调用服务器端的WebMethod了。这样的话，你可以在发出调用后，不被挂起，而继续做其它事情。</p><h2 id="异步调用的本质" tabindex="-1"><a class="header-anchor" href="#异步调用的本质" aria-hidden="true">#</a> 异步调用的本质</h2><p>有不少读者可能对&quot;同步&quot;和&quot;异步&quot;的概念以及回调函数等等术语还有些疑惑。这里就举个简单的例子说明一下。</p><p>比方说，你早上到了办公室，去打开水，打回水后然后沏茶。你同步调用打开水和沏茶两个函数。打开水完成后才可能沏茶。沏茶完成后你才可以看文件或是做其它工作。如果茶炉房出了些问题或者是人很多，那么你就要等着，直到打到了开水，你才可以回来干其它事情。在茶炉房等待开水的时候你什么也不能干。这种情况叫做被阻拦（Block）。准确的说就是执行函数的线程被阻拦。</p><p>要避免这种情况，你可以到达办公室后，说“王秘书，给我打壶开水去”。说完后你就可以开始看文件，做其他事了。等一会儿后，王秘书回来了，你就可以沏茶了。叫王秘书打开水就意味着你异步调用打开水这个函数。你不再担心在茶炉房等开水，你吩咐完王秘书后，你没有被阻拦，你可以马上开始做其它事情。但是开水总是要有个人去打，在这里王秘书是真正完成打开水函数的人。用计算机术语来将，王秘书可以是一个进程（Process）或是一个线程（Thread）。从理论上将，进程和线程都可以完成打开水这件事，但是就这类问题而言，使用进程是非常&quot;昂贵&quot;的，并且新的进程和原进程的通讯要复杂和慢的多，所以通常情况下，王秘书将会是一个线程。</p><p>如果你对王秘书说&quot;王秘书，给我打开水。打回来后给我沏杯茶&quot;。这种情况下，沏茶就是一个回调函数。沏茶将由王秘书这个&quot;线程&quot;来执行，在完成了打开水之后。</p><p>看起来很COOL是吧。有个&quot;王秘书&quot;使唤方便多了。但是别忘了王秘书出现后会有些其它问题。比如王秘书打回开水后给你沏茶时，你正用着茶几。她和你没有协调好撞在了一起，并把开水倒到了你的裤子上。因为办公室有和两个人，就出现了相互协调的问题。用计算机术语讲就是&quot;多线程同步Multi-Thread Synchronization&quot;。在计算机世界里，多个线程如何协调，同步是一个并不简单的问题。搞不好回造成信息紊乱，程序死锁。</p><p>让我们把这个问题想的再深一层。王秘书如果打开水的时候出了事打不回开水怎么办？你可能在开始的时候回对她说，&quot;要是半个小时打不到水就算了&quot;。这样就要求王秘书有时间概念。从计算机上讲，就是Timeout的机制。如果王秘书半个小时后没有回来，你可能想派刘秘书再去打。但是王秘书还拿着水壶呢（占着资源hold resources），这可怎么办？如果一切顺利，王秘书打完开水，沏完茶后该如何处理呢？是让她&quot;走人&quot;呢还是留着呢？因为你可能一会儿还会有拿报纸，寄邮件等等杂事。留着她也许还有用。可是王秘书会办其它事吗？如果不行的话，你可能还要用刘秘书，赵秘书等等来干每一项具体工作。另外公司里可能不止你一个&quot;头头&quot;，孙总，李CEO，马董事长也需要人&quot;侍候&quot;。这时候成立一个&quot;秘书处&quot;可能比每人配备一堆秘书更经济更有效。因为使用秘书是要有代价的（线程的生成，释放，同步是要占用计算机CPU时间和内存等资源的）。这个&quot;秘书处&quot;在计算机里的对应物就是线程池（Thread Pool）。这是当今开发服务器端程序普遍采用的一个技术，目的是最大可能的提高程序性能，优化资源配置。</p><h2 id="使用用户自定义-线程类-thread" tabindex="-1"><a class="header-anchor" href="#使用用户自定义-线程类-thread" aria-hidden="true">#</a> 使用用户自定义&quot;线程类（Thread）&quot;</h2><p>异步调用不仅在调用WebService的WebMethod时有用，在调用任何一个很费时的函数时，异步都是一个很好的选择。在.NET出现以前，我们可以生成新的线程，让这个线程来完成费时函数的调用，而主线程可以继续其它工作。比如在Java里，我们可以创建一个Thread类的子类或是创建一个实现了Runnable的类来完成这项工作。在.NET里，我们仍然可以这样做。如下面的小例程所示。</p><p>服务器端是一个非常简单的WebMethod，仅为示意：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//服务器端的程序</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">StockService</span>
<span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockPrice</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>WebService</span></span>
   <span class="token punctuation">{</span>
      <span class="token keyword">public</span> <span class="token function">StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token preprocessor property">#<span class="token directive keyword">region</span> Component Designer generated code</span>
      <span class="token comment">//Required by the Web Services Designer </span>
      <span class="token keyword">private</span> <span class="token class-name">IContainer</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            
      <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
      <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
      <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
      <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
      <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
      <span class="token punctuation">}</span>

      <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
      <span class="token doc-comment comment">/// Clean up any resources being used.</span>
      <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
      <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">bool</span></span> disposing <span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span>disposing <span class="token operator">&amp;&amp;</span> components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
         <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>      
      <span class="token punctuation">}</span>
      
      <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

      <span class="token punctuation">[</span>WebMethod<span class="token punctuation">]</span>
      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">getStockPrice</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockSymbol<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        <span class="token comment">//sleep 5 seconds and return a dummy number</span>
         Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">NextDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">15.0</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>客户端程序是一个C＃写的简单的Windows Form程序。其的核心语句为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Protocols</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">AsyncClient_01</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> messageBox<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token comment">//。。。</span>
        <span class="token comment">//省略了其它界面部分的程序</span>
        <span class="token comment">//。。。</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//生成Mythread对象,由它去进行函数调用。同时注册事件响应函数</span>
            <span class="token comment">//用来显示异步调用结果</span>
            <span class="token class-name">MyThread</span> aThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyThread</span><span class="token punctuation">(</span><span class="token string">&quot;IBM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            aThread<span class="token punctuation">.</span>gotPrice <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>displayPrice<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">displayPrice</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">GotPriceEvent</span> ge <span class="token operator">=</span> e <span class="token keyword">as</span> <span class="token class-name">GotPriceEvent</span><span class="token punctuation">;</span>
            <span class="token comment">//这段程序是由MyThread内产生的线程来执行的。为了避免和程序的主线程</span>
            <span class="token comment">//发生冲突，使用了LOCK机制。另外，股票价格是放在事件的参数传过来的。</span>
            <span class="token keyword">lock</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ge <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span>
                        <span class="token string">&quot;The Price is: &quot;</span> <span class="token operator">+</span> ge<span class="token punctuation">.</span>Price <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;The Price is unknown&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//下面屏蔽的程序段是把更新界面的动作转到界面专用线程上来执行。</span>
            <span class="token comment">//这样来避免多个线程对同一个变量进行改动的同步问题</span>
            <span class="token comment">/*
            String text;
            if(ge!=null)         
               text = &quot;The Price is: &quot; + ge.Price + System.Environment.NewLine;
            else
               text = &quot;The Price is unknown&quot;;
            messageBox.Invoke(new MethodInvoker
   (new Updater(text,messageBox).update));
             */</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">class</span> <span class="token class-name">Updater</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">private</span> <span class="token class-name">String</span> m_text<span class="token punctuation">;</span>
            <span class="token keyword">private</span> <span class="token class-name">Control</span> m_control<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token function">Updater</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">,</span> <span class="token class-name">Control</span> control<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                m_text <span class="token operator">=</span> text<span class="token punctuation">;</span>
                m_control <span class="token operator">=</span> control<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                m_control<span class="token punctuation">.</span>Text <span class="token operator">+=</span> m_text<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//用户自定义的类。创建函数内将生成一个新的线程</span>
        <span class="token keyword">class</span> <span class="token class-name">MyThread</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">private</span> <span class="token class-name">String</span> m_stock<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">EventHandler</span> gotPrice<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token function">MyThread</span><span class="token punctuation">(</span><span class="token class-name">String</span> stockSymbol<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                m_stock <span class="token operator">=</span> stockSymbol<span class="token punctuation">;</span>
                <span class="token comment">//生成一个线程，这个线程将执行getPrice()函数</span>
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>getPrice<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">localhost<span class="token punctuation">.</span>StockPrice</span> stockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">localhost<span class="token punctuation">.</span>StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">double</span></span> price <span class="token operator">=</span> stockService<span class="token punctuation">.</span><span class="token function">getStockPrice</span><span class="token punctuation">(</span>m_stock<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//函数调用结束后，触发事件</span>
                <span class="token function">gotPrice</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GotPriceEvent</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//用户自定义的事件参数</span>
        <span class="token keyword">class</span> <span class="token class-name">GotPriceEvent</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span></span>
        <span class="token punctuation">{</span>
            <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">double</span></span> m_price<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token function">GotPriceEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> price<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                m_price <span class="token operator">=</span> price<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Price
            <span class="token punctuation">{</span>
                <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_price<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre></div><p>上面的程序算是&quot;手工&quot;异步调用。程序员控制线程的生成和多线程的同步问题。熟悉Java多线程编程的朋友会感觉非常的熟悉。但事实上，Microsoft并不鼓励你这样来写程序。因为他们认为多线程编程比较复杂而且容易出错，并且你的线程使用方法往往不够标准和优化。微软认为线程的生成和管理对一个程序的性能和质量是非常重要的，越复杂的程序就越明显。因此Microsoft创建了一整套线程生成和管理的服务，并鼓励你在此基础之上开发你的应用程序。其技术核心就是我前面提到的“秘书处（Thread pool 线程池）”。.NET替你管理这个&quot;秘书处&quot;，它根据程序运行时的软硬件资源情况来决定&quot;雇佣&quot;多少&quot;秘书&quot;为最优。当你的程序被放置在多CPU的高档服务器上运行的时候，.NET会自动调整线程数量以最大限度的提升程序性能。程序员在普通工作站开发编程时将不必考虑这些问题。</p><h2 id="使用-net提供的异步调用服务" tabindex="-1"><a class="header-anchor" href="#使用-net提供的异步调用服务" aria-hidden="true">#</a> 使用.NET提供的异步调用服务</h2><p>当你在Visual Studio中加一个Web引用（Reference）的时候，.NET在后台给你生成了一个代理类。令人惊讶的是异步调用的函数也自动被生成了。就前面给的Web Service而言，这个自动生成的代理类为。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//-----------------------------------------------------------------------</span>
<span class="token comment">// &lt;autogenerated&gt;</span>
<span class="token comment">//    This code was generated by a tool.</span>
<span class="token comment">//    Runtime Version: 1.0.3705.209</span>
<span class="token comment">//</span>
<span class="token comment">//    Changes to this file may cause incorrect behavior and will be lost if</span>
<span class="token comment">//    the code is regenerated.</span>
<span class="token comment">// &lt;/autogenerated&gt;</span>
<span class="token comment">//-----------------------------------------------------------------------</span>
<span class="token comment">//</span>
<span class="token comment">// This source code was auto-generated by Microsoft.VSDesigner, Version</span>
<span class="token comment">// 1.0.3705.209.</span>
<span class="token comment">//</span>
<span class="token keyword">namespace</span> <span class="token namespace">AsyncClient_01<span class="token punctuation">.</span>localhost</span> <span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Xml<span class="token punctuation">.</span>Serialization</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Protocols</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">/&gt;</span></span></span>
    <span class="token punctuation">[</span>System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span><span class="token function">DebuggerStepThroughAttribute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>DesignerCategoryAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;code&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>WebServiceBindingAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Name <span class="token operator">=</span> <span class="token string">&quot;StockPriceSoap&quot;</span><span class="token punctuation">,</span> Namespace <span class="token operator">=</span> <span class="token string">&quot;http://tempuri.org/&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StockPrice</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Protocols<span class="token punctuation">.</span>SoapHttpClientProtocol</span></span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">/&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token function">StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Url <span class="token operator">=</span> <span class="token string">&quot;http://localhost/StockService/StockService.asmx&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">/&gt;</span></span></span>
        <span class="token punctuation">[</span>System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Protocols<span class="token punctuation">.</span>SoapDocumentMethodAttribute
            <span class="token punctuation">(</span><span class="token string">&quot;http://tempuri.org/getStockPrice&quot;</span><span class="token punctuation">,</span>
            RequestNamespace <span class="token operator">=</span> <span class="token string">&quot;http://tempuri.org/&quot;</span><span class="token punctuation">,</span>
            ResponseNamespace <span class="token operator">=</span> <span class="token string">&quot;http://tempuri.org/&quot;</span><span class="token punctuation">,</span>
            Use <span class="token operator">=</span> System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Description<span class="token punctuation">.</span>SoapBindingUse<span class="token punctuation">.</span>Literal<span class="token punctuation">,</span>
            ParameterStyle <span class="token operator">=</span>
            System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Services<span class="token punctuation">.</span>Protocols<span class="token punctuation">.</span>SoapParameterStyle<span class="token punctuation">.</span>Wrapped<span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Double</span> <span class="token function">getStockPrice</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stockSymbol<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> results <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token string">&quot;getStockPrice&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
                  stockSymbol<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Double<span class="token punctuation">)</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">/&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>IAsyncResult</span> <span class="token function">BegingetStockPrice</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stockSymbol<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>AsyncCallback</span> callback<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> asyncState<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span><span class="token string">&quot;getStockPrice&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
                  stockSymbol<span class="token punctuation">}</span><span class="token punctuation">,</span> callback<span class="token punctuation">,</span> asyncState<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">/&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Double</span> <span class="token function">EndgetStockPrice</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>IAsyncResult</span> asyncResult<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> results <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">EndInvoke</span><span class="token punctuation">(</span>asyncResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Double<span class="token punctuation">)</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序中的黑体部分就是关于异步调用函数的程序段。你调用BegingetStockPrice（）后将返回一个具有IAsyncResult界面的对象。通过它你就可以最终拿到函数的运行结果。Microsoft提供的异步调用比较灵活，下面就几种常见的用法做个介绍。</p><h3 id="_1-使用pooling方法得到返回结果" tabindex="-1"><a class="header-anchor" href="#_1-使用pooling方法得到返回结果" aria-hidden="true">#</a> 1．使用Pooling方法得到返回结果</h3><p>你调用BegingetStockPrice（）后得到一个具有IAsyncResult界面的对象。它提供了IsCompleted的属性。当这个值为&quot;True&quot;的时候，你就可以通过调用EndgetStockPrice（）来拿到函数运行的结果。</p><p>更重要的是，你可以在异步调用的时候&quot;放弃Abort&quot;调用。下面的程序段是用3个&quot;按钮（Button）&quot;来示意如何使用异步调用，检查调用是否结束以及放弃调用。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//客户端的WebService引用</span>
<span class="token keyword">private</span> <span class="token class-name">localhost<span class="token punctuation">.</span>StockPrice</span> m_stockService<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">IAsyncResult</span> m_handle<span class="token punctuation">;</span>  
<span class="token comment">//异步调用WebMethod</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    m_stockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">localhost<span class="token punctuation">.</span>StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    m_handle <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">BegingetStockPrice</span><span class="token punctuation">(</span><span class="token string">&quot;IBM&quot;</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;Function is invoked.&quot;</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token comment">//检查异步调用是否完成。如果完成的话，就取出调用结果</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button3_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>m_handle<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
       MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;No function is called!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>m_handle<span class="token punctuation">.</span>IsCompleted <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
       messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;Price is not ready yet&quot;</span>  <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
       <span class="token class-name"><span class="token keyword">double</span></span> price <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">EndgetStockPrice</span><span class="token punctuation">(</span>m_handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
       messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;The Price is: &quot;</span> <span class="token operator">+</span> price <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//放弃异步调用</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button4_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>m_handle<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
       <span class="token class-name">WebClientAsyncResult</span> result <span class="token operator">=</span> <span class="token punctuation">(</span>WebClientAsyncResult<span class="token punctuation">)</span>m_handle<span class="token punctuation">;</span>
       result<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       m_handle <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;Function call is aborted!&quot;</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_2-使用waithandle" tabindex="-1"><a class="header-anchor" href="#_2-使用waithandle" aria-hidden="true">#</a> 2．使用WaitHandle</h3><p>你调用BegingetStockPrice（）后得到一个具有IAsyncResult界面的对象。它提供了AsyncWaitHandle的属性。调用它的WaitOne()函数可以使程序被阻拦直到另外一个线程函数调用完成。之后程序将继续往下执行。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button8_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_stockService <span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span>
        m_stockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">localhost<span class="token punctuation">.</span>StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    m_handle <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">BegingetStockPrice</span><span class="token punctuation">(</span><span class="token string">&quot;IBM&quot;</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;The function is called&quot;</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    m_handle<span class="token punctuation">.</span>AsyncWaitHandle<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> price <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">EndgetStockPrice</span><span class="token punctuation">(</span>m_handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;The price is: &quot;</span> <span class="token operator">+</span> price <span class="token operator">+</span> system<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>   
<span class="token punctuation">}</span>
</code></pre></div><p>从现象上看，和同步调用相比你并没有得到好处。程序等待的时候仍然处于&quot;挂起&quot;状态。但是在有些情况下，&quot;等待&quot;还是有它的特色的。比如说你可以连续调用三个WebMethod，如果每个函数费时5秒，那么使用同步的话总共会使用15秒钟。但如果使用异步的话，你可能只要等待5秒钟。当然这要使用WaitHandle提供的WaitAll（）函数。如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button7_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_stockService <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        m_stockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">localhost<span class="token punctuation">.</span>StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">IAsyncResult<span class="token punctuation">[</span><span class="token punctuation">]</span></span> handles <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IAsyncResult</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        handles<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">BegingetStockPrice</span><span class="token punctuation">(</span><span class="token string">&quot;IBM&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;3 function is called&quot;</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    <span class="token class-name">WaitHandle<span class="token punctuation">[</span><span class="token punctuation">]</span></span> WaitHandles <span class="token operator">=</span> <span class="token punctuation">{</span>handles<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>AsyncWaitHandle<span class="token punctuation">,</span> handles<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>AsyncWaitHandle<span class="token punctuation">,</span> handles<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>AsyncWaitHandle<span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">//函数被阻拦，直到3个函数都执行完毕。WaitAny()函数情况类似，但有一个函数完成后</span>
    <span class="token comment">//程序就解阻，继续往下执行</span>
    WaitHandle<span class="token punctuation">.</span><span class="token function">WaitAll</span><span class="token punctuation">(</span>WaitHandles<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">double</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> prices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">double</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">EndgetStockPrice</span><span class="token punctuation">(</span>handles<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;The price is: &quot;</span> <span class="token operator">+</span> prices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_3-使用回调函数-callback" tabindex="-1"><a class="header-anchor" href="#_3-使用回调函数-callback" aria-hidden="true">#</a> 3．使用回调函数（CallBack）</h3><p>看到现在，你可能还没有感到满意。因为你异步调用了函数后，还要手工检查函数是否执行完毕，或者要处于等待状态。能否让函数完成后，自动显示结果或是做其它操作呢？答案是&quot;能&quot;的。回调函数就是做这种事情的。</p><p>还记得我们前面说的例子吗。&quot;王秘书，给我打壶开水去。打回来后给我沏杯茶（）&quot;。王秘书打水完成后，还会执行沏杯茶（）这个回调函数。如果你原意，你可以让王秘书干其它任何事情。如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button5_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_stockService <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        m_stockService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">localhost<span class="token punctuation">.</span>StockPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//生成回调函数</span>
    <span class="token class-name">AsyncCallback</span> cb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    m_stockService<span class="token punctuation">.</span><span class="token function">BegingetStockPrice</span><span class="token punctuation">(</span><span class="token string">&quot;IBM&quot;</span><span class="token punctuation">,</span> cb<span class="token punctuation">,</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">)</span><span class="token punctuation">;</span>
    messageBox<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;The function is called&quot;</span> <span class="token operator">+</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> handle<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">double</span></span> price <span class="token operator">=</span> m_stockService<span class="token punctuation">.</span><span class="token function">EndgetStockPrice</span><span class="token punctuation">(</span>handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">lock</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        messageBox<span class="token punctuation">.</span>Text <span class="token operator">+=</span> <span class="token string">&quot;The price is: &quot;</span> <span class="token operator">+</span> price <span class="token operator">+</span> <span class="token string">&quot;. Reques time: &quot;</span> <span class="token operator">+</span>
            handle<span class="token punctuation">.</span>AsyncState<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;, and returned at: &quot;</span> <span class="token operator">+</span>
            DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
            System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果你喝茶比较讲究，你可能会说，&quot;王秘书，给我打壶开水去（）。打回来后给我沏杯茶（），要龙井茶&quot;。那么这个&quot;龙井茶&quot;是否可以传给王秘书呢？这样她在打回开水后沏茶的时候就知道用什么茶叶了。答案是可以的。如上面的例程所示，DateTime.Now在异步调用的时候被传递给了新的线程。在回调函数里面，这个参数可以拿出来使用。handle.AsyncState.就是这个被传进的参数。.NET规定这个参数可以是任意一个对象。所以如果有多个参数要传递的话，可以使用数组，HashTable等等。理论上讲，你可以传递任何东西。</p><h2 id="线程间同步协调问题" tabindex="-1"><a class="header-anchor" href="#线程间同步协调问题" aria-hidden="true">#</a> 线程间同步协调问题</h2><p>从上面的例子你可以看出，异步调用的本质是由另外一个线程在真正执行函数的调用，不管是你自己直接生成的线程还是.NET提供的。当一旦进入多线程编程后，最重要的问题就是线程间的协调和同步。要高度注意的是线程间的问题往往很隐蔽，很难发现。在单处理器平台上也许不会出现问题，但移植到多处理器平台上后也许就会显现出来。.NET提供了许多方法来进行多线程的保护和协调。限于篇幅，这里不一一赘诉了。</p><h2 id="异步的webservice" tabindex="-1"><a class="header-anchor" href="#异步的webservice" aria-hidden="true">#</a> 异步的WebService</h2><p>上文讨论的是如何在客户端异步的调用服务器端的WebService。但是客户端的努力还终究是有一些局限的。比如在客户端调用一个费时的WebService时，你很可能希望客户端有个&quot;状态条&quot;来不断的指示函数调用的进度，并且还可以随时&quot;放弃&quot;调用。这个任务单凭客户端程序就很难就决。这种情形就要求服务器端能提供异步服务了。任何开发异步的WebService是一个比较复杂的问题，笔者将在后文中再作介绍。谢谢！</p>`,38),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","pts26.html.vue"]]);export{i as default};
