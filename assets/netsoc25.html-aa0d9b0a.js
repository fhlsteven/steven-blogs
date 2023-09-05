import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="关于c-的socket" tabindex="-1"><a class="header-anchor" href="#关于c-的socket" aria-hidden="true">#</a> 关于c#的socket</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  关于c#的socket
作　　者：  adow (adow)
等　　级：  ^
信 誉 值：  100
所属社区：  .NET技术 C#
问题点数：  30
回复次数：  6
发表时间：  2004-10-25 16:16:42
</code></pre></div><p>请问在客户端中什么时候开始接受数据。在win32api下可以设置消息<code>::WSAAsyncSelect (GbSocket,hWnd,UM_SOCK,FD_READ|FD_WRITE|FD_ACCEPT);</code><br> 但在.net中好象没有消息。那我什么时候接受数据呢。</p><hr><hr><p>回复人： wanliguout() ( 一级(初级)) 信誉：100 2004-10-25 16:21:29 得分: 0</p><blockquote><p>我也好想知道，如何得到这样的win消息</p></blockquote><p>回复人： Lastcsdner(外行) ( 二级(初级)) 信誉：100 2004-10-25 16:44:42 得分: 5</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">MytcpClinet</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">TcpClient</span></span>
<span class="token punctuation">{</span>
  <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>Clinet<span class="token punctuation">.</span><span class="token function">Poll</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>SelectRead<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token comment">//收数据。</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： songhtao(三十年孤独) ( 四级(中级)) 信誉：100 2004-10-25 16:49:42 得分: 10</p><blockquote><p>.net下socket有异步方式可以使用如<br> 下面的示例程序创建一个连接到服务器的客户端。该客户端是用异步套接字生成的，因此在等待服务器返回响应时不挂起客户端应用程序的执行。该应用程序将字符串发送到服务器，然后在控制台显示该服务器返回的字符串。</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token comment">// State object for receiving data from remote device.</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StateObject</span> <span class="token punctuation">{</span>
    <span class="token comment">// Client socket.</span>
    <span class="token keyword">public</span> <span class="token class-name">Socket</span> workSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// Size of receive buffer.</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> BufferSize <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
    <span class="token comment">// Receive buffer.</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>BufferSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// Received data string.</span>
    <span class="token keyword">public</span> <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AsynchronousClient</span> <span class="token punctuation">{</span>
    <span class="token comment">// The port number for the remote device.</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">11000</span><span class="token punctuation">;</span>

    <span class="token comment">// ManualResetEvent instances signal completion.</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ManualResetEvent</span> connectDone <span class="token operator">=</span> 
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ManualResetEvent</span> sendDone <span class="token operator">=</span> 
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ManualResetEvent</span> receiveDone <span class="token operator">=</span> 
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// The response from the remote device.</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> response <span class="token operator">=</span> String<span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StartClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Connect to a remote device.</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Establish the remote endpoint for the socket.</span>
            <span class="token comment">// The name of the </span>
            <span class="token comment">// remote device is &quot;host.contoso.com&quot;.</span>
            <span class="token class-name">IPHostEntry</span> ipHostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span><span class="token string">&quot;host.contoso.com&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IPAddress</span> ipAddress <span class="token operator">=</span> ipHostInfo<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> remoteEP <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>ipAddress<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Create a TCP/IP socket.</span>
            <span class="token class-name">Socket</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>
                SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Connect to the remote endpoint.</span>
            client<span class="token punctuation">.</span><span class="token function">BeginConnect</span><span class="token punctuation">(</span> remoteEP<span class="token punctuation">,</span> 
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>ConnectCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span><span class="token punctuation">;</span>
            connectDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Send test data to the remote device.</span>
            <span class="token function">Send</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span><span class="token string">&quot;This is a test&lt;EOF&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sendDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Receive the response from the remote device.</span>
            <span class="token function">Receive</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">;</span>
            receiveDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Write the response to the console.</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Response received : {0}&quot;</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Release the socket.</span>
            client<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
            client<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConnectCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Retrieve the socket from the state object.</span>
            <span class="token class-name">Socket</span> client <span class="token operator">=</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span> ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>

            <span class="token comment">// Complete the connection.</span>
            client<span class="token punctuation">.</span><span class="token function">EndConnect</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Socket connected to {0}&quot;</span><span class="token punctuation">,</span>
                client<span class="token punctuation">.</span>RemoteEndPoint<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Signal that the connection has been made.</span>
            connectDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Receive</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Create the state object.</span>
            <span class="token class-name">StateObject</span> state <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StateObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            state<span class="token punctuation">.</span>workSocket <span class="token operator">=</span> client<span class="token punctuation">;</span>

            <span class="token comment">// Begin receiving the data from the remote device.</span>
            client<span class="token punctuation">.</span><span class="token function">BeginReceive</span><span class="token punctuation">(</span> state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> StateObject<span class="token punctuation">.</span>BufferSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>ReceiveCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReceiveCallback</span><span class="token punctuation">(</span> <span class="token class-name">IAsyncResult</span> ar <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Retrieve the state object and the client socket </span>
            <span class="token comment">// from the asynchronous state object.</span>
            <span class="token class-name">StateObject</span> state <span class="token operator">=</span> <span class="token punctuation">(</span>StateObject<span class="token punctuation">)</span> ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>
            <span class="token class-name">Socket</span> client <span class="token operator">=</span> state<span class="token punctuation">.</span>workSocket<span class="token punctuation">;</span>

            <span class="token comment">// Read data from the remote device.</span>
            <span class="token class-name"><span class="token keyword">int</span></span> bytesRead <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">EndReceive</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>bytesRead <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// There might be more data, so store the data received so far.</span>
            state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>bytesRead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Get the rest of the data.</span>
                client<span class="token punctuation">.</span><span class="token function">BeginReceive</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>StateObject<span class="token punctuation">.</span>BufferSize<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>ReceiveCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// All the data has arrived; put it in response.</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    response <span class="token operator">=</span> state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// Signal that all bytes have been received.</span>
                receiveDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> client<span class="token punctuation">,</span> <span class="token class-name">String</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Convert the string data to byte data using ASCII encoding.</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> byteData <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Begin sending the data to the remote device.</span>
        client<span class="token punctuation">.</span><span class="token function">BeginSend</span><span class="token punctuation">(</span>byteData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byteData<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>SendCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// Retrieve the socket from the state object.</span>
            <span class="token class-name">Socket</span> client <span class="token operator">=</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span> ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>

            <span class="token comment">// Complete sending the data to the remote device.</span>
            <span class="token class-name"><span class="token keyword">int</span></span> bytesSent <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">EndSend</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Sent {0} bytes to server.&quot;</span><span class="token punctuation">,</span> bytesSent<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Signal that all bytes have been sent.</span>
            sendDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">StartClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： possible_Y(████本人签名需要刮开,方可看到) ( 五级(中级)) 信誉：100 2004-10-25 17:01:32 得分: 5</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>
SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
listener<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>_ip<span class="token punctuation">)</span><span class="token punctuation">,</span> _port<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listener<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
listener<span class="token punctuation">.</span><span class="token function">BeginAccept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>ConnectRequest<span class="token punctuation">)</span><span class="token punctuation">,</span> listener<span class="token punctuation">)</span><span class="token punctuation">;</span>
……

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConnectRequest</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MOLService<span class="token punctuation">.</span>ConnectRequestEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name">Socket</span> client <span class="token operator">=</span> e<span class="token punctuation">.</span>Client<span class="token punctuation">;</span>
  client<span class="token punctuation">.</span><span class="token function">BeginReceive</span><span class="token punctuation">(</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>利用委托的异步回调，通过<code>listener.BeginAccept(new AsyncCallback(ConnectRequest), listener);</code>来指定当有请求时由那个方法来处理（这里指定由ConnectRequest方法处理）</p></blockquote><p>回复人： sarcophile(食肉动物) ( 五级(中级)) 信誉：100 2004-10-25 18:06:47 得分: 5</p><blockquote><p>另开一个线程，Read 什么的是阻塞的，有了数据才继续运行，没有的话线程阻塞。</p></blockquote><p>回复人： Lastcsdner(外行) ( 二级(初级)) 信誉：100 2004-10-26 9:38:23 得分: 5</p><blockquote><p>另开一个线程，Read 什么的是阻塞的，有了数据才继续运行，没有的话线程阻塞。<br><code>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</code><br> 在连接数不多的情况下可以这么做，多了线程数就大多了，因为你还要开一个写的线程，每个连接就要开二个线程。</p></blockquote><p>该问题已经结贴 ，得分记录： Lastcsdner (5)、 songhtao (10)、 possible_Y (5)、 sarcophile (5)、 Lastcsdner (5)、</p>`,22),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netsoc25.html.vue"]]);export{i as default};
