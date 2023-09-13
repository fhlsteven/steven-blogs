import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="c-网络编程初探" tabindex="-1"><a class="header-anchor" href="#c-网络编程初探" aria-hidden="true">#</a> C＃网络编程初探</h1><p>我们知道C＃和C＋＋的差异之一，就是他本身没有类库，所使用的类库是.Net框架中的类库--.Net FrameWork SDK。在.Net FrameWork SDK中为网络编程提供了二个名称空间：&quot;System.Net&quot;和&quot;System.Net.Sockets&quot;。C＃就是通过这二个名称空间中封装的类和方法实现网络通讯的。</p><p>首先我们解释一下在网络编程时候，经常遇到的几个概念：同步（synchronous）、异步（asynchronous）、阻塞（Block）和非阻塞（Unblock）：</p><p>所谓同步方式，就是发送方发送数据包以后，不等接受方响应，就接着发送下一个数据包。异步方式就是当发送方发送一个数据包以后，一直等到接受方响应后，才接着发送下一个数据包。而阻塞套接字是指执行此套接字的网络调用时，直到调用成功才返回，否则此套节字就一直阻塞在网络调用上，比如调用StreamReader 类的<code>Readline()</code>方法读取网络缓冲区中的数据，如果调用的时候没有数据到达，那么此<code>Readline()</code>方法将一直挂在调用上，直到读到一些数据，此函数调用才返回；而非阻塞套接字是指在执行此套接字的网络调用时，不管是否执行成功，都立即返回。同样调用StreamReader 类的<code>Readline()</code>方法读取网络缓冲区中数据，不管是否读到数据都立即返回，而不会一直挂在此函数调用上。在Windows网络通信软件开发中，最为常用的方法就是异步非阻塞套接字。平常所说的C/S（客户端/服务器）结构的软件采用的方式就是异步非阻塞模式的。</p><p>其实在用C＃进行网络编程中，我们并不需要了解什么同步、异步、阻塞和非阻塞的原理和工作机制，因为在.Net FrameWrok SDK中已经已经把这些机制给封装好了。下面我们就用C＃开一个具体的网络程序来说明一下问题。</p><h2 id="一-本文中介绍的程序设计及运行环境" tabindex="-1"><a class="header-anchor" href="#一-本文中介绍的程序设计及运行环境" aria-hidden="true">#</a> 一．本文中介绍的程序设计及运行环境</h2><p>（1）.微软视窗2000 服务器版<br> （2）..Net Framework SDK Beta 2以上版本</p><h2 id="二-服务器端程序设计的关键步骤以及解决办法" tabindex="-1"><a class="header-anchor" href="#二-服务器端程序设计的关键步骤以及解决办法" aria-hidden="true">#</a> 二．服务器端程序设计的关键步骤以及解决办法</h2><p>在下面接受的程序中，我们采用的是异步阻塞的方式。</p><p>（1）.首先要要在给定的端口上面创建一个&quot;tcpListener&quot;对象侦听网络上面的请求。当接收到连结请求后通过调用&quot;tcpListener&quot;对象的&quot;AcceptSocket&quot;方法产生一个用于处理接入连接请求的Socket的实例。下面是具体实现代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//创建一个tcpListener对象，此对象主要是对给定端口进行侦听</span>
tcpListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//开始侦听</span>
tcpListener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//返回可以用以处理连接的Socket实例</span>
socketForClient <span class="token operator">=</span> tcpListener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（2）.接受和发送客户端数据：</p><p>此时Socket实例已经产生，如果网络上有请求，在请求通过以后，Socket实例构造一个&quot;NetworkStream&quot;对象，&quot;NetworkStream&quot;对象为网络访问提供了基础数据流。我们通过名称空间&quot;System.IO&quot;中封装的二个类&quot;StreamReader&quot;和&quot;StreamWriter&quot;来实现对&quot;NetworkStream&quot;对象的访问。其中&quot;StreamReader&quot;类中的ReadLine ( )方法就是从&quot;NetworkStream&quot;对象中读取一行字符；&quot;StreamWriter&quot;类中的WriteLine ( )方法就是对&quot;NetworkStream&quot;对象中写入一行字符串。从而实现在网络上面传输字符串，下面是具体的实现代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">//如果返回值是&quot;true&quot;，则产生的套节字已经接受来自远方的连接请求 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>socketForClient<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;已经和客户端成功连接！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//创建networkStream对象通过网络套节字来接受和发送数据 </span>
            networkStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>socketForClient<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//从当前数据流中读取一行字符，返回值是字符串 </span>
            streamReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>networkStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> msg <span class="token operator">=</span> streamReader<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;收到客户端信息：&quot;</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            streamWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>networkStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;往客户端反馈信息：&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//往当前的数据流中写入一行字符串 </span>
                streamWriter<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//刷新当前数据流中的数据 </span>
                streamWriter<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ey<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ey<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（3）.最后别忘了要关闭所以流，停止侦听网络，关闭套节字，具体如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//关闭线程和流 </span>
networkStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
streamReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
streamWriter<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
_thread1<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tcpListener<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
socketForClient<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
socketForClient<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="三-c-网络编程服务器端程序的部分源代码-server-cs" tabindex="-1"><a class="header-anchor" href="#三-c-网络编程服务器端程序的部分源代码-server-cs" aria-hidden="true">#</a> 三．C＃网络编程服务器端程序的部分源代码（server.cs）</h2><p>由于在此次程序中我们采用的结构是异步阻塞方式，所以在实际的程序中，为了不影响服务器端程序的运行速度，我们在程序中设计了一个线程，使得对网络请求侦听，接受和发送数据都在线程中处理，请在下面的代码中注意这一点，下面是server.cs的完整代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token comment">//导入程序中使用到的名字空间 </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ListBox</span> ListBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button2<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Label</span> label1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">TextBox</span> textBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Socket</span> socketForClient<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">NetworkStream</span> networkStream<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">TcpListener</span> tcpListener<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">StreamWriter</span> streamWriter<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">StreamReader</span> streamReader<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Thread</span> _thread1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//清除程序中使用的各种资源 </span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ListBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">168</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label1&quot;</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;往客户端反馈信息：&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//同样的方式设置其他控件,这里略去 </span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>label1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>button2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>ListBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>MaximizeBox <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>MinimizeBox <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;C＃的网络编程服务器端！&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Closed <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Form1_Closed<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//创建一个tcpListener对象，此对象主要是对给定端口进行侦听 </span>
        tcpListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//开始侦听 </span>
        tcpListener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//返回可以用以处理连接的Socket实例 </span>
        socketForClient <span class="token operator">=</span> tcpListener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//如果返回值是&quot;true&quot;，则产生的套节字已经接受来自远方的连接请求 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>socketForClient<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;已经和客户端成功连接！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//创建networkStream对象通过网络套节字来接受和发送数据 </span>
                    networkStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>socketForClient<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//从当前数据流中读取一行字符，返回值是字符串 </span>
                    streamReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>networkStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> msg <span class="token operator">=</span> streamReader<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;收到客户端信息：&quot;</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    streamWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>networkStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;往客户端反馈信息：&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">//往当前的数据流中写入一行字符串 </span>
                        streamWriter<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">//刷新当前数据流中的数据 </span>
                        streamWriter<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ey<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ey<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ListBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;服务已经启动！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _thread1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>Listen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _thread1<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//关闭线程和流 </span>
        networkStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        streamReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        streamWriter<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _thread1<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tcpListener<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketForClient<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketForClient<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Closed</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//关闭线程和流 </span>
        networkStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        streamReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        streamWriter<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        _thread1<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tcpListener<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketForClient<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
        socketForClient<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,19),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode39.html.vue"]]);export{i as default};
