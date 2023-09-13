import{_ as e,r as o,o as c,c as l,b as s,d as n,e as p,a as t}from"./app-477de5b2.js";const u={},k=t(`<h1 id="构建轻量消息传递系统" tabindex="-1"><a class="header-anchor" href="#构建轻量消息传递系统" aria-hidden="true">#</a> 构建轻量消息传递系统</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Eric Gunnerson
Microsoft Corporation
2003 年 9 月 8 日
</code></pre></div><p><strong>摘要：</strong> Eric Gunnerson 将讨论基于套接字的体系结构以及如何创建在 PC 和 Pocket PC 上都可以运行的高效、易用的消息传递系统。（本文包含一些指向英文站点的链接。）</p><p>下载 csharp09182003_sample.exe 文件。（请注意，在示例文件中，程序员的注释使用的是英文，本文中将其译为中文是为了便于读者理解。）</p><p>上个月我钻研了一下 Remoting，最后发现它不能在 Pocket PC 上使用。这个月，我将向您展示我构建的基于套接字的系统，但首先，我想先谈几个其他主题。</p><h2 id="关于-blog-和人类" tabindex="-1"><a class="header-anchor" href="#关于-blog-和人类" aria-hidden="true">#</a> 关于 Blog 和人类</h2><p>以前我提到过我有一个 Web 日志（也称为 Blog），但是我没有提到如何读取它。您可以通过访问 Web 站点 <code>http://blogs.gotdotnet.com/ericgu/</code> 来读取它，但是对每个要读取的 Blog，您都不得不访问该站点。这太麻烦了，您可能会对几个站点这样做，但是这样做的站点不会超过五个。</p><p>您需要的只是这样一种方法：通过这种方法，无需访问 Web 站点，就能了解何时有可用的新内容。要实现这种方法，可以使用 Blog 软件将 XML 内容作为 RSS 内容提供。然后，使用名为 RSS 阅读器（或 RSS 收集器）的软件程序监视此内容，就可以了解何时出现了新内容。可以在 <code>http://backend.userland.com/directory/167/aggregators</code> 找到收集器的列表。</p>`,8),i={href:"http://www.sharpreader.net/",target:"_blank",rel:"noopener noreferrer"},r={href:"http://www.newsgator.com/",target:"_blank",rel:"noopener noreferrer"},d=t(`<p>现在，让我们回到以前规划的程序。</p><h2 id="回顾往事" tabindex="-1"><a class="header-anchor" href="#回顾往事" aria-hidden="true">#</a> 回顾往事</h2><p>在 Microsoft Visual Studio® 2002 的开发过程中，我是 C# 编译器测试主管，同时还是一名语言设计师。虽然我非常喜欢做一名语言设计师，但我对语言设计只是一知半解。</p><p>发布 Visual Studio 2002 后，我决定从测试方面转向程序管理 (PM) 方面。这样我就可以离开语言方面，集中精力钻研项目系统和我们的社团工作。</p><p>最近，我们的程序管理团队内进行了一些调整，使我们不得不寻找新的编译器程序经理，这样我又回到了原来的位置。我非常高兴可以再次与语言打交道。</p><h2 id="套接字和消息" tabindex="-1"><a class="header-anchor" href="#套接字和消息" aria-hidden="true">#</a> 套接字和消息</h2><p>如今，大多数 Web 服务和所有远程应用程序都使用一种远程过程调用 (RPC) 方法。您只需要执行一种类似函数调用的操作，屏幕后面就会发生一系列魔术般的变化，使您的操作能够在服务器上实现。而在底层，系统会在两台计算机之间传递消息，但是所有这些您都不会直接看到。</p><p>但是，当您切换到套接字时，却是在一个完全基于消息的系统中进行编程。这将改变您所编写的代码的种类，因为取回数据的唯一方法是通过消息。这与使用没有返回值和输出参数的 .NET 类有些类似，这种类的所有信息都是通过事件返回的。</p><p>我希望服务器告诉客户端什么时候歌曲改变了，这样使用消息就真的很有好处，因为无需客户端明确申请，信息就可以从服务器传输到客户端。但是，确实需要您用不同的方式进行处理。</p><p>不过，在我开始之前，我想先谈谈安全性问题。如果您正在计算机上打开一个端口，其他人就可以尝试使用该端口进行一些非法活动。他们可能会向端口写入垃圾信息，以便了解他们是否能够控制您的计算机或使您的计算机崩溃。</p><p>编写这种程序时，最好要考虑到这种可能性。就我而言，程序会在防火墙后我的家庭网络上运行，所以我感觉相对安全。</p><h2 id="简单的套接字" tabindex="-1"><a class="header-anchor" href="#简单的套接字" aria-hidden="true">#</a> 简单的套接字</h2><p>我将从可以把整数加 1 的服务器开始。下面是服务器端的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPAddress</span> localAddr <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">TcpListener</span> listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>localAddr<span class="token punctuation">,</span> <span class="token number">9999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for initial connection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Socket</span> socket <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connected&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NetworkStream</span> stream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>socket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryWriter</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">ReadInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    i<span class="token operator">++</span><span class="token punctuation">;</span>
    writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>开始时，它在本地主机的端口 9999 创建 TCP 侦听器，启动该侦听器，然后等待连接。获得连接后，它接收一个整数，将该整数加 1，然后将它发送回去。</p><p>我应该指出我使用的本地主机地址是 127.0.0.1。当客户端和服务器位于同一台计算机上时，这种方法工作得很好，但当它们运行在不同的计算机上时就不行了。我将在后面的示例中展示一些更复杂的代码。示例代码位于 SimpleSockets 子目录中。</p><h2 id="传递消息" tabindex="-1"><a class="header-anchor" href="#传递消息" aria-hidden="true">#</a> 传递消息</h2><p>通过套接字传递原始数据并不是什么有趣的事，而通过套接字传递对象会好一些。要通过套接字来传递对象，我们需要一种方法来获取对象并将其转换为字节流。一种明显的解决方案是使用运行时提供的序列化支持。不幸的是，这种方法存在很多问题。</p><p>第一个问题是序列化的系统开销很大，这意味着它使用的字节数要远远多于传递数据所需的字节数。如果使用 SOAP 格式化，这个问题会更糟糕。当然，这是否会成为问题，取决于您的应用程序在性能方面的要求。第二个问题是 Compact Framework 中不提供序列化。因为没有什么简单的解决办法，所以我们只能自己来解决这个问题。在进程中，我们将进行一些远远小于序列化的操作。</p><p>我首先创建一个枚举来定义可以传递何种消息：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MessageType</span>
<span class="token punctuation">{</span>
    RequestEmployee <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    Employee<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于每种消息类型，我们都需要用一个对象来定义该对象。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequestEmployee</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ISocketObject</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">RequestEmployee</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">RequestEmployee</span><span class="token punctuation">(</span><span class="token class-name">BinaryReader</span> reader<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        id <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">ReadInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ID
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> id<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name">BinaryWriter</span> writer<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> MessageType<span class="token punctuation">.</span>RequestEmployee<span class="token punctuation">)</span><span class="token punctuation">;</span>
        writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>采用的方法与 <code>ISerializable</code> 接口非常相似。<code>ISocketObject</code> 接口定义了一个 <code>Send()</code> 函数，用于序列化通过的数据，然后用一个构造函数将数据还原序列化。</p><p>只要这些对象序列化其自身，它们发送的第一个内容就必须是消息标识符，这样接收者才能了解传入的是何种对象并创建该对象。下面是客户端的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">RequestEmployee</span> requestEmployee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RequestEmployee</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
requestEmployee<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>writer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">MessageType</span> messageType <span class="token operator">=</span> <span class="token punctuation">(</span>MessageType<span class="token punctuation">)</span> reader<span class="token punctuation">.</span><span class="token function">ReadInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">switch</span> <span class="token punctuation">(</span>messageType<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> MessageType<span class="token punctuation">.</span>Employee<span class="token punctuation">:</span>
        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} = {1}&quot;</span><span class="token punctuation">,</span> employee<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> employee<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>此代码创建一个 <code>RequestEmployee</code> 对象，并将其发送到服务器，然后指明所返回的对象的类型，并将该对象还原序列化。</p><p>虽然示例项目分别标上了“客户端”和“服务器”，但是它们之间仅有的真正区别是建立连接的方式。而建立连接之后，两者都使用类似的代码发送和接收消息，尽管两者都有自己要处理的消息集。示例代码位于 <em>SocketObjects</em> 子目录中。</p><h2 id="面向对象设计与实用主义" tabindex="-1"><a class="header-anchor" href="#面向对象设计与实用主义" aria-hidden="true">#</a> 面向对象设计与实用主义</h2><p>使用此方法的一个缺点是要以一个大型 switch 语句结束，而我们中的许多人都接受过这样的教育：大型 switch 语句是不良设计的表现之一。通常的面向对象 (OO) 方法是使用多态。</p><p>要使用多态，我们需要定义抽象基类，然后从该类派生出所有的消息对象。每个类都需要实现各自的方法来完成序列化、还原序列化和消息处理。然后，主要代码将：</p><ul><li>读取消息类型</li><li>创建实例（使用反射）</li><li>调用 <code>HandleMessage()</code> 虚函数</li></ul><p>这可以工作，但是我不喜欢它的一些效果。首先，编写用于创建实例的代码时要非常小心；其次，由于使用了反射，它的运行速度会比较慢。更重要的是，消息处理是在 HandleMessage() 函数中进行的，这意味着它将是共享库的一部分。这实在很不幸，因为消息处理会受到消息传递方式的影响。因为这些问题，我已经决定使用一种较少面向对象、而又易于编写的方法。</p><h2 id="使它变得实用" tabindex="-1"><a class="header-anchor" href="#使它变得实用" aria-hidden="true">#</a> 使它变得实用</h2><p>上一个示例只能处理单个消息。在实际环境中，我们需要不断处理消息。</p><h2 id="服务器线程" tabindex="-1"><a class="header-anchor" href="#服务器线程" aria-hidden="true">#</a> 服务器线程</h2><p>我的最终目标是向现有的应用程序中添加服务器功能。由于我不想修改现有应用程序的代码，因此我需要在一个线程中运行我的服务器。我还希望允许同时处理多个连接。我将先实现这个愿望。</p><p>上一个示例侦听端口 9999，但是因为每个端口上只能有一个客户端进行通信，所以我需要一种方法，对每个连接使用一个不同的端口。SocketListener 类将侦听端口 9999，无论何时有连接请求传入，它都会查找一个未被占用的端口并将其发送回客户端。下面是这个类的概况：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SocketListener</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">;</span>
    <span class="token class-name">Thread</span> thread<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">SocketListener</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>port <span class="token operator">=</span> port<span class="token punctuation">;</span>
        <span class="token class-name">ThreadStart</span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>WaitForConnection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
        thread<span class="token punctuation">.</span>IsBackground <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        thread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WaitForConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 此处包含主要代码</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>WaitForConnection()</code> 方法是一种能够完成所有工作的方法。类的构造函数将创建用于执行 WaitForConnection() 的新线程。打开套接字并接受连接的过程与前面的示例一样。下面是此线程的主循环：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for initial connection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Socket</span> socket <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NetworkStream</span> stream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>socket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">BinaryWriter</span> writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryWriter</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connection Requested&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">int</span></span> userPort <span class="token operator">=</span> port <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">TcpListener</span> specificListener<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            specificListener <span class="token operator">=</span> 
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>localAddr<span class="token punctuation">,</span> userPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
            specificListener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SocketException</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            userPort<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 远程用户应该使用 specificListener。</span>
    <span class="token comment">// 将该端口发送回远程用户，</span>
    <span class="token comment">// 并在该端口创建服务器以供使用</span>
    <span class="token class-name">SocketServer</span> socketServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SocketServer</span><span class="token punctuation">(</span>specificListener<span class="token punctuation">)</span><span class="token punctuation">;</span>

    writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>userPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
    writer<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    stream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我希望能够支持多个连接，因此我使用了一个端口，供客户端表明它们需要建立连接。然后，服务器将查找空闲的端口，并将该端口发送回客户端，该端口即被该客户端用于建立连接。</p><p>我没有发现任何方法可以找出未被占用的端口，因此只能使用 while 循环，一直尝试端口，直到找到空闲的端口为止。然后将端口号发送回客户端并清空内容。</p><p>这里我要指出一个很微妙的地方。最初版本的 <code>SocketServer</code> 将端口号作为参数。不幸的是，这意味着在指定的端口上设置侦听器之前客户端可能已经提出申请，这太糟糕了。为了避免这种情况，我在把端口号发送给客户端之前创建了 <code>TcpListener</code>，以便确保不出现争用的情况。</p><p><code>SocketServer</code> 类创建一个附加线程，并使用以下主循环：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MessageType</span> messageType <span class="token operator">=</span>
            <span class="token punctuation">(</span>MessageType<span class="token punctuation">)</span> reader<span class="token punctuation">.</span><span class="token function">ReadInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span>messageType<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> MessageType<span class="token punctuation">.</span>RequestEmployee<span class="token punctuation">:</span>
                <span class="token class-name">Employee</span> employee <span class="token operator">=</span> 
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span><span class="token string">&quot;Eric Gunnerson&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;One Microsoft Way&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                employee<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>writer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    socket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>主循环是一种简单的获取请求/处理请求的循环。try-catch-finally 将从客户端断开连接时引发的异常中恢复过来。</p><h2 id="客户端的事件" tabindex="-1"><a class="header-anchor" href="#客户端的事件" aria-hidden="true">#</a> 客户端的事件</h2><p>在客户端，我将编写一个 Windows 窗体客户端，既可用于 PC 也可用于 Pocket PC。Windows 窗体环境是基于事件的，特别适合使用事件来处理套接字消息。这是通过 SocketClient 类完成的。第一步是为每个消息定义一个委托和事件：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EmployeeHandler</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">EmployeeHandler</span> EmployeeReceived<span class="token punctuation">;</span>
</code></pre></div><p>第二步是编写用于发送事件的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>    <span class="token keyword">case</span> MessageType<span class="token punctuation">.</span>Employee<span class="token punctuation">:</span>
        <span class="token class-name">Employee</span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>EmployeeReceived <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            form<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>EmployeeReceived<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>employee<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
</code></pre></div><p>或许我们需要在此事件发生时更新窗体。要使它更加可靠，需要在主 UI 线程中进行更新。这可以通过对窗体调用 <code>Invoke()</code> 来实现，此函数将安排要在主 UI 线程中调用的委托。</p><p>由于体系结构基于消息，因此服务器本身就提供了对异步事件的支持。示例包含一个由服务器每秒发送一次的 <code>CurrentCount</code> 消息。示例代码位于 <em>SocketFinal</em> 子目录中。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>总而言之，我非常喜欢这个基于套接字的体系结构。它简便易用，并且在 PC 和 Pocket PC 上都可以运行。</p><h2 id="下个月" tabindex="-1"><a class="header-anchor" href="#下个月" aria-hidden="true">#</a> 下个月</h2><p>PDC 很快就要发布了，我们将“透露”一点相关消息。我们将透露的消息是非正式的，正如我们在 Whidbey 完成以前发布的消息一样，但是我们会提供更多有关新语言特性的细节。我将在下个月讨论这些内容。</p><hr><p>Eric Gunnerson 是 Visual C# 组的程序经理，以前曾是 C# 语言设计组的成员，现在又回到了这个组，他著有 A Programmer&#39;s Introduction to C#, 2nd Edition。他从事编程工作已经有很长时间，积累了丰富的编程经验。他知道 8 英寸磁盘，而且还曾经用一只手装过磁带。在业余时间，他是一位略显烦人的 Roomba 观察员。</p>`,60);function m(y,h){const a=o("ExternalLinkIcon");return c(),l("div",null,[k,s("p",null,[n("现在有两种收集器。第一种是独立的程序，它定期提取您感兴趣的 Blog 的 RSS 内容，并告诉您何时出现了新内容。我使用的是名为 "),s("a",i,[n("SharpReader"),p(a)]),n(" 的免费收集器软件，它是用 C# 编写的。第二种收集器作为电子邮件（例如 Microsoft Outlook®）的外接程序运行，并将新的 Blog 条目转换为 Outlook 文件夹中的消息。"),s("a",r,[n("NewsGator"),p(a)]),n(" 就是这种收集器。")]),d])}const g=e(u,[["render",m],["__file","netsoc17.html.vue"]]);export{g as default};
