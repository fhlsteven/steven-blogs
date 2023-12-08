import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="在c-中实现ping" tabindex="-1"><a class="header-anchor" href="#在c-中实现ping" aria-hidden="true">#</a> 在C#中实现Ping</h1><blockquote><p>作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-7-10 17:03:52</p></blockquote><hr><p>在C#中实现Ping，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// Ping类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ping</span>
<span class="token punctuation">{</span>
    <span class="token comment">//声明常量</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SOCKET_ERROR <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> ICMP_ECHO <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>

    <span class="token comment">// 程序入口</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Ping</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;请输入要 Ping 的IP或者主机名字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> MyUrl <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;正在 Ping &quot;</span> <span class="token operator">+</span> MyUrl <span class="token operator">+</span> <span class="token string">&quot; ……&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">PingHost</span><span class="token punctuation">(</span>MyUrl<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">PingHost</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> host<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 声明 IPHostEntry</span>
        <span class="token class-name">IPHostEntry</span> serverHE<span class="token punctuation">,</span> fromHE<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> dwStart <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> dwStop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token comment">//初始化ICMP的Socket</span>
        <span class="token class-name">Socket</span> socket <span class="token operator">=</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Raw<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Icmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        socket<span class="token punctuation">.</span><span class="token function">SetSocketOption</span><span class="token punctuation">(</span>SocketOptionLevel<span class="token punctuation">.</span>Socket<span class="token punctuation">,</span> SocketOptionName<span class="token punctuation">.</span>SendTimeout<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 得到Server EndPoint</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            serverHE <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;没有发现主机&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 把 Server IP_EndPoint转换成EndPoint</span>
        <span class="token class-name">IPEndPoint</span> ipepServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>serverHE<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">EndPoint</span> epServer <span class="token operator">=</span> <span class="token punctuation">(</span>ipepServer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设定客户机的接收Endpoint</span>
        fromHE <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> ipEndPointFrom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>fromHE<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">EndPoint</span> EndPointFrom <span class="token operator">=</span> <span class="token punctuation">(</span>ipEndPointFrom<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">int</span></span> PacketSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">IcmpPacket</span> packet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IcmpPacket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 构建要发送的包</span>
        packet<span class="token punctuation">.</span>Type <span class="token operator">=</span> ICMP_ECHO<span class="token punctuation">;</span> <span class="token comment">//8</span>
        packet<span class="token punctuation">.</span>SubCode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        packet<span class="token punctuation">.</span>CheckSum <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        packet<span class="token punctuation">.</span>Identifier <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;45&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        packet<span class="token punctuation">.</span>SequenceNumber <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> PingData <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span> <span class="token comment">// sizeof(IcmpPacket) - 8;</span>
        packet<span class="token punctuation">.</span>Data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PingData<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 初始化Packet.Data</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> PingData<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            packet<span class="token punctuation">.</span>Data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token char">&#39;#&#39;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//Variable to hold the total Packet size</span>
        PacketSize <span class="token operator">=</span> PingData <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> icmp_pkt_buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PacketSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">Int32</span> Index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//Call a Method Serialize which counts</span>
        <span class="token comment">//The total number of Bytes in the Packet</span>
        Index <span class="token operator">=</span> <span class="token function">Serialize</span><span class="token punctuation">(</span>
            packet<span class="token punctuation">,</span>
            icmp_pkt_buffer<span class="token punctuation">,</span>
            PacketSize<span class="token punctuation">,</span>
            PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//Error in Packet Size</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Error Creating Packet&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// convert into a UInt16 array</span>

        <span class="token comment">//Get the Half size of the Packet</span>
        <span class="token class-name">Double</span> double_length <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToDouble</span><span class="token punctuation">(</span>Index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Double</span> dtemp <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Ceiling</span><span class="token punctuation">(</span>double_length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> cksum_buffer_length <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>dtemp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//Create a Byte Array</span>
        <span class="token class-name">UInt16<span class="token punctuation">[</span><span class="token punctuation">]</span></span> cksum_buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UInt16</span><span class="token punctuation">[</span>cksum_buffer_length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">//Code to initialize the Uint16 array</span>
        <span class="token class-name"><span class="token keyword">int</span></span> icmp_header_buffer_index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cksum_buffer_length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            cksum_buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span>
                BitConverter<span class="token punctuation">.</span><span class="token function">ToUInt16</span><span class="token punctuation">(</span>icmp_pkt_buffer<span class="token punctuation">,</span> icmp_header_buffer_index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            icmp_header_buffer_index <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//Call a method which will return a checksum</span>
        <span class="token class-name">UInt16</span> u_cksum <span class="token operator">=</span> <span class="token function">checksum</span><span class="token punctuation">(</span>cksum_buffer<span class="token punctuation">,</span> cksum_buffer_length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//Save the checksum to the Packet</span>
        packet<span class="token punctuation">.</span>CheckSum <span class="token operator">=</span> u_cksum<span class="token punctuation">;</span>

        <span class="token comment">// Now that we have the checksum, serialize the packet again</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> sendbuf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PacketSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">//again check the packet size</span>
        Index <span class="token operator">=</span> <span class="token function">Serialize</span><span class="token punctuation">(</span>
            packet<span class="token punctuation">,</span>
            sendbuf<span class="token punctuation">,</span>
            PacketSize<span class="token punctuation">,</span>
            PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//if there is a error report it</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Error Creating Packet&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        dwStart <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount<span class="token punctuation">;</span> <span class="token comment">// Start timing</span>
                                                <span class="token comment">//send the Packet over the socket</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>nBytes <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">SendTo</span><span class="token punctuation">(</span>sendbuf<span class="token punctuation">,</span> PacketSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> epServer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;Socket Error: cannot send Packet&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// Initialize the buffers. The receive buffer is the size of the</span>
        <span class="token comment">// ICMP header plus the IP header (20 bytes)</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ReceiveBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        nBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//Receive the bytes</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> recd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> timeout <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token comment">//loop for checking the time of the server responding</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>recd<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            nBytes <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">ReceiveFrom</span><span class="token punctuation">(</span>ReceiveBuffer<span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> EndPointFrom<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nBytes <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">&quot;主机没有响应&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nBytes <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                dwStop <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount <span class="token operator">-</span> dwStart<span class="token punctuation">;</span> <span class="token comment">// stop timing</span>
                <span class="token keyword">return</span> <span class="token string">&quot;Reply from &quot;</span> <span class="token operator">+</span> epServer<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; in &quot;</span>
                   <span class="token operator">+</span> dwStop <span class="token operator">+</span> <span class="token string">&quot;ms.  Received: &quot;</span> <span class="token operator">+</span> nBytes <span class="token operator">+</span> <span class="token string">&quot; Bytes.&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            timeout <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount <span class="token operator">-</span> dwStart<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout <span class="token operator">&gt;</span> <span class="token number">1000</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token string">&quot;超时&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//close the socket</span>
        socket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">///  This method get the Packet and calculates the total size</span>
    <span class="token doc-comment comment">///  of the Pack by converting it to byte array</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Int32</span> <span class="token function">Serialize</span><span class="token punctuation">(</span><span class="token class-name">IcmpPacket</span> packet<span class="token punctuation">,</span> <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Buffer<span class="token punctuation">,</span>
        <span class="token class-name">Int32</span> PacketSize<span class="token punctuation">,</span> <span class="token class-name">Int32</span> PingData<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Int32</span> cbReturn <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">// serialize the struct into the array</span>
        <span class="token class-name"><span class="token keyword">int</span></span> Index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_type <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        b_type<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Type<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_code <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        b_code<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>packet<span class="token punctuation">.</span>SubCode<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_cksum <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>CheckSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_id <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Identifier<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_seq <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>SequenceNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>

        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_type<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_type<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> b_type<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_code<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_code<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> b_code<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_cksum<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_cksum<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> b_cksum<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_id<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_id<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> b_id<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_seq<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_seq<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> b_seq<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

        <span class="token comment">// copy the data</span>
        Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Index <span class="token operator">+=</span> PingData<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">!=</span> PacketSize<span class="token comment">/* sizeof(IcmpPacket)  */</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            cbReturn <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> cbReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        cbReturn <span class="token operator">=</span> Index<span class="token punctuation">;</span>
        <span class="token keyword">return</span> cbReturn<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// This Method has the algorithm to make a checksum</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">UInt16</span> <span class="token function">checksum</span><span class="token punctuation">(</span><span class="token class-name">UInt16<span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Int32</span> cksum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> counter<span class="token punctuation">;</span>
        counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>size <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">UInt16</span> val <span class="token operator">=</span> buffer<span class="token punctuation">[</span>counter<span class="token punctuation">]</span><span class="token punctuation">;</span>

            cksum <span class="token operator">+=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span>counter<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            counter <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            size <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        cksum <span class="token operator">=</span> <span class="token punctuation">(</span>cksum <span class="token operator">&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>cksum <span class="token operator">&amp;</span> <span class="token number">0xffff</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cksum <span class="token operator">+=</span> <span class="token punctuation">(</span>cksum <span class="token operator">&gt;&gt;</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>UInt16<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">~</span>cksum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/// 类结束</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///Class that holds the Pack information</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IcmpPacket</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Byte</span> Type<span class="token punctuation">;</span>    <span class="token comment">// type of message</span>
    <span class="token keyword">public</span> <span class="token class-name">Byte</span> SubCode<span class="token punctuation">;</span>    <span class="token comment">// type of sub code</span>
    <span class="token keyword">public</span> <span class="token class-name">UInt16</span> CheckSum<span class="token punctuation">;</span>   <span class="token comment">// ones complement checksum of struct</span>
    <span class="token keyword">public</span> <span class="token class-name">UInt16</span> Identifier<span class="token punctuation">;</span>      <span class="token comment">// identifier</span>
    <span class="token keyword">public</span> <span class="token class-name">UInt16</span> SequenceNumber<span class="token punctuation">;</span>     <span class="token comment">// sequence number</span>
    <span class="token keyword">public</span> <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Data<span class="token punctuation">;</span>

<span class="token punctuation">}</span> <span class="token comment">// class IcmpPacket</span>
</code></pre></div>`,5),e=[o];function c(u,k){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode16.html.vue"]]);export{i as default};
