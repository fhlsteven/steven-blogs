import{_ as o,r as c,o as p,c as i,b as a,d as n,e,a as t}from"./app-f0851ed3.js";const l="/steven-blogs/assets/netsoc8_1-d3138d67.jpg",r="/steven-blogs/assets/netsoc8_2-43b319a6.gif",u={},d={id:"multi-threaded-net-tcp-server-examples",tabindex:"-1"},k=a("a",{class:"header-anchor",href:"#multi-threaded-net-tcp-server-examples","aria-hidden":"true"},"#",-1),h={href:"https://www.codeproject.com/Articles/2866/Multi-threaded-NET-TCP-Server-Examples",target:"_blank",rel:"noopener noreferrer"},m=t(`<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>With the new release of the .NET framework, creating a sophisticated TCP Server is just like eating a snack! Basic features including multi-thread client connection handling, collective management for client connections with thread safe collection object, and background reclaiming of all doomed connections, are all easy to address.</p><h2 id="tools" tabindex="-1"><a class="header-anchor" href="#tools" aria-hidden="true">#</a> Tools</h2><p>This example was built on the Microsoft .NET Framework SDK version 1.0.3705 (with SP2), I suggest you use the latest version wherever you can acquire one. A simple editor should be enough to begin your coding and I have used C# to create all programs and compiled it with the C# compiler that comes with the SDK. There are several source files and commands to produce executables are as follows:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>CSC  TcpServer.cs
CSC  TcpServer2.cs
CSC  TcpServer2b.cs
CSC  TcpServer3.cs
CSC  TcpClientTest.cs
</code></pre></div><h2 id="tcp-classes" tabindex="-1"><a class="header-anchor" href="#tcp-classes" aria-hidden="true">#</a> TCP Classes</h2><p><img src="`+l+`" alt="tcp"></p><p>Coming with the framework are the very useful classes <code>TcpListener</code> and <code>TcpClient</code> in the namespace <code>System.Net.Sockets</code>, which provided most of the needed TCP network task for building TCP applications. In just several simple statements will give a simple TCP listening service for the TCP server:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">TcpListener</span> listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>portNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">TcpClient</span> handler <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptTcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> ClientSockets<span class="token punctuation">.</span>Add <span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ClientHandler</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
 <span class="token punctuation">(</span><span class="token punctuation">(</span>ClientHandler<span class="token punctuation">)</span> ClientSockets<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre></div><p>In the third line of the above statements allows the TCP server to accept incoming client connections, each connections will give a separated <code>TcpClient</code> instance representing individual client connections. Since each client connections is handled in separated threads, the class <code>ClientHandler</code> will encapsulate client connection and a new thread will be created and started (that is what the last two lines in the above statements do).</p><h2 id="thread-safe-collection" tabindex="-1"><a class="header-anchor" href="#thread-safe-collection" aria-hidden="true">#</a> Thread Safe Collection</h2><p>As to managing client connections, especially when reclaiming doomed client connections and shutting them down before ending the main TCP server thread, an <code>ArrayList</code> object is so handy and comes into the game as a thread safe collection bag for all client connections. The followings lines depict how thread safe access to <code>ArrayList</code> can be achieved:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span>  <span class="token keyword">static</span>  ArrayList ClientSockets  

<span class="token keyword">lock</span> <span class="token punctuation">(</span> ClientSockets<span class="token punctuation">.</span>SyncRoot <span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> ClientSockets<span class="token punctuation">.</span>Add <span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ClientHandler</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token punctuation">(</span><span class="token punctuation">(</span>ClientHandler<span class="token punctuation">)</span> ClientSockets<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The keyword <code>lock</code> provided thread-synchronized access to a property <code>SyncRoot</code> of the instance of <code>ArrayList</code>, <code>ClientSockets</code>, a collection of object instances of class <code>ClientHandler</code>, representing TCP client connections.</p><h2 id="background-tcp-client-reclaiming-thread" tabindex="-1"><a class="header-anchor" href="#background-tcp-client-reclaiming-thread" aria-hidden="true">#</a> Background TCP Client Reclaiming Thread</h2><p>In a typical TCP servicing environment, many clients making connections will mix with clients which are dropping their connections at the same time, and such dropped connections should be properly release their held resources. Without reclaiming means server will soon be overloading with doomed client connections, which hold sacred resources without releasing them back to system. The following code shows the reclaiming of the thread in my application:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>ThreadReclaim <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>Reclaim<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
ThreadReclaim<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Reclaim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>ContinueReclaim<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">lock</span><span class="token punctuation">(</span> ClientSockets<span class="token punctuation">.</span>SyncRoot <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span>   <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> ClientSockets<span class="token punctuation">.</span>Count<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">;</span> x <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token punctuation">;</span> x<span class="token operator">--</span> <span class="token punctuation">)</span>  <span class="token punctuation">{</span>
            <span class="token class-name">Object</span> Client <span class="token operator">=</span> ClientSockets<span class="token punctuation">[</span>x<span class="token punctuation">]</span> <span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token operator">!</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> ClientHandler <span class="token punctuation">)</span> Client <span class="token punctuation">)</span><span class="token punctuation">.</span>Alive <span class="token punctuation">)</span>  <span class="token punctuation">{</span>
                ClientSockets<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span> Client <span class="token punctuation">)</span>  <span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;A client left&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
           <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre></div><p>As the reclaiming thread will compete with main thread to access the client connections collection, synchronized access is needed when checking dead connections before removing them.</p><p>Maybe some readers ask me why I did not choose to use features like callbacks or delegates to let client connection instances unregister themselves from the collection, this I will explain later.</p><h2 id="clean-shutdown" tabindex="-1"><a class="header-anchor" href="#clean-shutdown" aria-hidden="true">#</a> Clean Shutdown</h2><p>Before stopping the main server, closing all connections properly is also very important:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>ContinueReclaim <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token punctuation">;</span>
ThreadReclaim<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span> <span class="token class-name">Object</span> Client <span class="token keyword">in</span> ClientSockets <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span> <span class="token punctuation">(</span>ClientHandler<span class="token punctuation">)</span> Client <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>First, the resource reclaiming thread is ended and a global variable <code>ContinueReclaim</code> is responsible for controlling it. In addition, it is waited to be properly stopped before the main thread starts going on to the next step. Finally, a loop is started to drop each client connections listed in <code>ClientSockets</code>, as this time only the main thread is accessing it no thread-synchronisation code is needed.</p><p>Here I would like to explain why I do not use a callback or delegate to address the reclaiming task. Since the main thread needs to hold the <code>ClientSockets</code> collection exclusively while dropping the client connections, it would have produced deadlock as the client connection trying to access <code>ClientSockets</code> collection tried to use callback or delegate to unregister itself and at the same time main thread was waiting client connection to stop! Of course some may say using timeout while client connection class trying to access <code>ClientSockets</code> collection is an option, I agree it could solve the problem but as I always prefer a cleaner shutdown, using a thread to control resource reclaiming task would be a better idea.</p><h2 id="thread-pooling" tabindex="-1"><a class="header-anchor" href="#thread-pooling" aria-hidden="true">#</a> Thread Pooling</h2><p>Things seem so fine when there are not too many clients connecting at the same time. But the number of connections can increase to a level that too many threads are created which would severely impact system performance! Thread pooling in such a case can give us a helping hand to maintain a reasonable number of threads created at the same time base on our system resource. A .NET class <code>ThreadPool</code> helps to regulate when to schedule threads to serve tasks on the work-item queue and limit the maximum number of threads created. All these functions come as a cost as you lose some of the control of the threads, for example, you cannot suspend or stop a thread preemptively as no thread handle will be available by calling the static method:</p><p><code>public static bool QueueUserWorkItem(WaitCallback);</code></p><p>of class <code>ThreadPool</code>. I have created another example to let all client connections be scheduled to run in thread pool. In the sample program TcpServer2.cs is several amendments I have made. First, I do not use a collection object to include client connections. Secondly, there is no background thread to reclaim the doomed client connections. Finally, a special class is used to synchronize client connections when the main thread comes to a point to instruct ending all of them.</p><h2 id="reschedule-task-item-in-thread-pool" tabindex="-1"><a class="header-anchor" href="#reschedule-task-item-in-thread-pool" aria-hidden="true">#</a> Reschedule Task Item in Thread Pool</h2><p>As the client handling task scheduled in the thread pool created on the previous example will tend to hold the precious thread in the thread pool forever, it will restrict the scalability of the system and large number of task items cannot get a chance to run because the thread pool has a maximum limit on the number of threads to be created. Suppose even though it did not impose a limit on number of threads created, too many threads running still lead to CPU context switching problems and bring down the system easily! To increase the scalability, instead of holding the thread looping with it, we can schedule the task again whenever one processing step has finished! That is what I am doing in example TcpServer2b.cs; trying to achieve the client task handling thread function returns after each logical processing step and try rescheduling itself again to the thread pool as the following code block shows:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Schedule task again</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> SharedStateObj<span class="token punctuation">.</span>ContinueProcess <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>bQuit  <span class="token punctuation">)</span>
    ThreadPool<span class="token punctuation">.</span><span class="token function">QueueUserWorkItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">WaitCallback</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Process<span class="token punctuation">)</span><span class="token punctuation">,</span> SharedStateObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
    networkStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ClientSocket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Deduct no. of clients by one</span>
    Interlocked<span class="token punctuation">.</span><span class="token function">Decrement</span><span class="token punctuation">(</span><span class="token keyword">ref</span> SharedStateObj<span class="token punctuation">.</span>NumberOfClients <span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;A client left, number of connections is {0}&quot;</span><span class="token punctuation">,</span> 
    SharedStateObj<span class="token punctuation">.</span>NumberOfClients<span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Signal main process if this is the last client connections</span>
<span class="token comment">// main thread requested to stop.</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token operator">!</span>SharedStateObj<span class="token punctuation">.</span>ContinueProcess <span class="token operator">&amp;&amp;</span> SharedStateObj<span class="token punctuation">.</span>NumberOfClients <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span>
    SharedStateObj<span class="token punctuation">.</span>Ev<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>No loop is involved and as the task tries to reschedule itself and relinquish thread it held, other tasks get a chance to begin running in the thread pool now! Actually this is similar capability to what the asynchronous version of the socket functions provide, task get, waiting and processing in the thread pool thread needs to reschedule again at the end of each callback functions if it want to continue processing.</p><h2 id="use-queue-with-multiple-threads" tabindex="-1"><a class="header-anchor" href="#use-queue-with-multiple-threads" aria-hidden="true">#</a> Use Queue with Multiple Threads</h2><p><img src="`+r+`" alt="queue"></p><p>Using a queue with multiple threads to handle large numbers of client requests is similar to the asynchronous version of the socket functions which use a thread pool with a work item queue to handle each tasks. In example TcpServer3.cs, I have created a queue class <code>ClientConnectionPool</code> and wrapped a Queue object inside:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span>  <span class="token class-name">ClientConnectionPool</span> <span class="token punctuation">{</span>
    <span class="token comment">// Creates a synchronized wrapper around the Queue.</span>
    <span class="token keyword">private</span>  <span class="token class-name">Queue</span> SyncdQ <span class="token operator">=</span> Queue<span class="token punctuation">.</span><span class="token function">Synchronized</span><span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Queue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This is mainly to provide a thread safe queue class for later use in the multi-threaded task handler, <code>ClientService</code>, part of its source shown below:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">ClientService</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> NUM_OF_THREAD <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ClientConnectionPool</span> ConnectionPool  <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> ContinueProcess <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Thread <span class="token punctuation">[</span><span class="token punctuation">]</span></span> ThreadTask  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">[</span>NUM_OF_THREAD<span class="token punctuation">]</span>  <span class="token punctuation">;</span>
      
    <span class="token keyword">public</span> <span class="token function">ClientService</span><span class="token punctuation">(</span><span class="token class-name">ClientConnectionPool</span> ConnectionPool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span> <span class="token punctuation">.</span>ConnectionPool <span class="token operator">=</span> ConnectionPool <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>    

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ContinueProcess <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">;</span>
        <span class="token comment">// Start threads to handle Client Task</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> ThreadTask<span class="token punctuation">.</span>Length <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ThreadTask<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Process<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
            ThreadTask<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span>  <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span> ContinueProcess <span class="token punctuation">)</span> <span class="token punctuation">{</span>

           <span class="token class-name">ClientHandler</span> client  <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token punctuation">;</span>
             <span class="token keyword">lock</span><span class="token punctuation">(</span> ConnectionPool<span class="token punctuation">.</span>SyncRoot <span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">if</span>  <span class="token punctuation">(</span> ConnectionPool<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span>
                   client <span class="token operator">=</span> ConnectionPool<span class="token punctuation">.</span><span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
           <span class="token punctuation">}</span>         
             <span class="token keyword">if</span> <span class="token punctuation">(</span> client <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                client<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token comment">// Provoke client</span>
                <span class="token comment">// if client still connect, schedufor later processingle it </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span> client<span class="token punctuation">.</span>Alive <span class="token punctuation">)</span> 
                ConnectionPool<span class="token punctuation">.</span><span class="token function">Enqueue</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span> <span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>     
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Using the <code>Dequeue</code> and <code>Enqueue</code> functions, it is so easy to give tasks handling based on the FIFO protocol. Making it this way we have the benefit of good scalability and control for the client connections.</p>`,39),g={href:"http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpguide/html/cpconnon-blockingserversocketexample.asp",target:"_blank",rel:"noopener noreferrer"},f=t(`<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><p>The NET framework provide nice features to simplify multi-threaded TCP process creation that was once a very difficult task to many programmers. I have introduced three methods to create a multi-threaded TCP server process. The first one has greater control on each threads but it may impact system performance after a large number of threads are created. Second one has better performance but you have less control over each thread created. The last example gives you the benefit of bothscalability and control, and is the recommended solution. Of course, you can use the Asynchronous Socket functions to give you similar capabilities, whilst my example <code>TcpServer2b.cs</code>, which gives you a synchronous version with thread pooling, is an alternative solution to the same task. Many valuable alternatives and much depends on you requirements. The options are there so choosing the one best suited your application is the most important thing to consider! Full features can be explored even wider and I suggest that readers look at the .NET documentation to find out more.</p><h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2><p>This article has no explicit license attached to it but may contain usage terms in the article text or the download files themselves. If in doubt please contact the author via the discussion board below.</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Written By
Matthew So (Hong Kong)

I am always interested in finding innovative ways for building better applications and founded a technology company since 2003. Welcome to exchange any idea with you and if I am not too busy before deadline of projects, I will reply your emails. Also, if you willing to pay for consulting works and customized software development, you can leave me message.
</code></pre></div>`,5);function w(y,v){const s=c("ExternalLinkIcon");return p(),i("div",null,[a("h1",d,[k,n(),a("a",h,[n("Multi-threaded .NET TCP Server Examples"),e(s)])]),m,a("p",null,[n("I will not provide another Asynchronous Server Socket Example because the .NET SDK already has a very nice one and for anyone interested please goto the link "),a("a",g,[n("Asynchronous Server Socket Example"),e(s)]),n(". Certainly Asynchronous Server Sockets are excellent for most of your requirements, easy to implement, high performance, and I suggest reader have a look on this example.")]),f])}const C=o(u,[["render",w],["__file","netsoc8.html.vue"]]);export{C as default};