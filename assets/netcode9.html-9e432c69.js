import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="c-编写的ping工具" tabindex="-1"><a class="header-anchor" href="#c-编写的ping工具" aria-hidden="true">#</a> c#编写的PING工具</h1><blockquote><p>www.chinacs.net 2001-4-27 16:06:00 中文C#技术站</p></blockquote><p>导 读：PING 是一个用来检测网络连接速度的使用工具，下面的文章将介绍在C#中利用System.Net.Sockets 来创建一个自己的PING 工具。</p><hr><p>PING 是一个用来检测网络连接速度的工具，它会在本机和给出的远程主机名之间建立一个SOCKET 连接并向其发送一个ICMP协议格式的数据包，然后远程主机作出响应，发回一个数据包，通过计算发送到接收数据包的时间间隔，我们可以确定连接的速度。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>使用方法 ping &lt;hostname&gt; [/r]
&lt;hostname&gt; 主机名 
[/r] 可选属性，决定是否连续的 ping 远程主机。
</code></pre></div><p>下面是代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">///ping.cs </span>
<span class="token keyword">namespace</span> <span class="token namespace">SaurabhPing</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// 主要的类:ping </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">class</span> <span class="token class-name">Ping</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//声明几个常量 </span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SOCKET_ERROR <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> ICMP_ECHO <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 这里取得Hostname参数 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> argv<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//If user did not enter any Parameter inform him </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Usage:Ping &lt;hostname&gt; /r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;hostname&gt; The name of the Host who you want to ping&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;/r Ping the host continuously&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//Just the hostname provided by the user </span>
                <span class="token comment">//call the method &quot;PingHost&quot; and pass the HostName as a parameter </span>
                <span class="token function">PingHost</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//the user provided the hostname and the switch </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/r&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//loop the ping program </span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token comment">//call the method &quot;PingHost&quot; and pass the HostName as a parameter </span>
                        <span class="token function">PingHost</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//if the user provided some other switch </span>
                    <span class="token function">PingHost</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//Some error occurred </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error in Arguments&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 主要的方法，用来取得IP， </span>
        <span class="token doc-comment comment">/// 并计算响应时间 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PingHost</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> host<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Declare the IPHostEntry </span>
            <span class="token class-name">IPHostEntry</span> serverHE<span class="token punctuation">,</span> fromHE<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> dwStart <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> dwStop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">//Initilize a Socket of the Type ICMP </span>
            <span class="token class-name">Socket</span> socket <span class="token operator">=</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>AfINet<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>SockRaw<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>ProtICMP<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Get the server endpoint </span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                serverHE <span class="token operator">=</span> DNS<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>host<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Host not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// fail </span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Convert the server IP_EndPoint to an EndPoint </span>
            <span class="token class-name">IPEndPoint</span> ipepServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>serverHE<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">EndPoint</span> epServer <span class="token operator">=</span> <span class="token punctuation">(</span>ipepServer<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Set the receiving endpoint to the client machine </span>
            fromHE <span class="token operator">=</span> DNS<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>DNS<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> ipEndPointFrom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>fromHE<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">EndPoint</span> EndPointFrom <span class="token operator">=</span> <span class="token punctuation">(</span>ipEndPointFrom<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> PacketSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">IcmpPacket</span> packet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IcmpPacket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// Construct the packet to send </span>
            packet<span class="token punctuation">.</span>Type <span class="token operator">=</span> ICMP_ECHO<span class="token punctuation">;</span> <span class="token comment">//8 </span>
            packet<span class="token punctuation">.</span>SubCode <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            packet<span class="token punctuation">.</span>CheckSum <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            packet<span class="token punctuation">.</span>Identifier <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;45&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            packet<span class="token punctuation">.</span>SequenceNumber <span class="token operator">=</span> UInt16<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> PingData <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span> <span class="token comment">// sizeof(IcmpPacket) - 8; </span>
            packet<span class="token punctuation">.</span>Data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PingData<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//Initilize the Packet.Data </span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> PingData<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                packet<span class="token punctuation">.</span>Data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token char">&#39;#&#39;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//Variable to hold the total Packet size </span>
            PacketSize <span class="token operator">=</span> PingData <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> icmp_pkt_buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PacketSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">Int32</span> Index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">//Call a Method Serialize which counts </span>
            <span class="token comment">//The total number of Bytes in the Packet </span>
            Index <span class="token operator">=</span> <span class="token function">Serialize</span><span class="token punctuation">(</span>
            packet<span class="token punctuation">,</span>
            icmp_pkt_buffer<span class="token punctuation">,</span>
            PacketSize<span class="token punctuation">,</span>
            PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Error in Packet Size </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error in Making Packet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// now get this critter into a UInt16 array </span>

            <span class="token comment">//Get the Half size of the Packet </span>
            <span class="token class-name">Double</span> double_length <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToDouble</span><span class="token punctuation">(</span>Index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Double</span> dtemp <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Ceil</span><span class="token punctuation">(</span>double_length <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> cksum_buffer_length <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>dtemp<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Create a Byte Array </span>
            <span class="token class-name">UInt16<span class="token punctuation">[</span><span class="token punctuation">]</span></span> cksum_buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UInt16</span><span class="token punctuation">[</span>cksum_buffer_length<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//Code to initialize the Uint16 array </span>
            <span class="token class-name"><span class="token keyword">int</span></span> icmp_header_buffer_index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cksum_buffer_length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cksum_buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span>
                BitConverter<span class="token punctuation">.</span><span class="token function">ToUInt16</span><span class="token punctuation">(</span>icmp_pkt_buffer<span class="token punctuation">,</span> icmp_header_buffer_index<span class="token punctuation">)</span><span class="token punctuation">;</span>
                icmp_header_buffer_index <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//Call a method which will return a checksum </span>
            <span class="token class-name">UInt16</span> u_cksum <span class="token operator">=</span> <span class="token function">checksum</span><span class="token punctuation">(</span>cksum_buffer<span class="token punctuation">,</span> cksum_buffer_length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Save the checksum to the Packet </span>
            packet<span class="token punctuation">.</span>CheckSum <span class="token operator">=</span> u_cksum<span class="token punctuation">;</span>

            <span class="token comment">// Now that we have the checksum, serialize the packet again </span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> sendbuf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>PacketSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//again check the packet size </span>
            Index <span class="token operator">=</span> <span class="token function">Serialize</span><span class="token punctuation">(</span>
            packet<span class="token punctuation">,</span>
            sendbuf<span class="token punctuation">,</span>
            PacketSize<span class="token punctuation">,</span>
            PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//if there is a error report it </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error in Making Packet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            dwStart <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount<span class="token punctuation">;</span> <span class="token comment">// Start timing </span>
                                                    <span class="token comment">//send the Pack over the socket </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>nBytes <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">SendTo</span><span class="token punctuation">(</span>sendbuf<span class="token punctuation">,</span> PacketSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> epServer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Socket Error cannot Send Packet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// Initialize the buffers. The receive buffer is the size of the </span>
            <span class="token comment">// ICMP header plus the IP header (20 bytes) </span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ReceiveBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            nBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">//Receive the bytes </span>
            <span class="token class-name"><span class="token keyword">bool</span></span> recd <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> timeout <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token comment">//loop for checking the time of the server responding </span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>recd<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                nBytes <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">ReceiveFrom</span><span class="token punctuation">(</span>ReceiveBuffer<span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> EndPointFrom<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>nBytes <span class="token operator">==</span> SOCKET_ERROR<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Host not Responding&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    recd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nBytes <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    dwStop <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount <span class="token operator">-</span> dwStart<span class="token punctuation">;</span> <span class="token comment">// stop timing </span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Reply from &quot;</span> <span class="token operator">+</span> epServer<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; in &quot;</span>
                    <span class="token operator">+</span> dwStop <span class="token operator">+</span> <span class="token string">&quot;MS :Bytes Received&quot;</span> <span class="token operator">+</span> nBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    recd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                timeout <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>TickCount <span class="token operator">-</span> dwStart<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>timeout <span class="token operator">&gt;</span> <span class="token number">1000</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Time Out&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    recd <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//close the socket </span>
            socket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// This method get the Packet and calculates the total size </span>
        <span class="token doc-comment comment">/// of the Pack by converting it to byte array </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Int32</span> <span class="token function">Serialize</span><span class="token punctuation">(</span><span class="token class-name">IcmpPacket</span> packet<span class="token punctuation">,</span> <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Buffer<span class="token punctuation">,</span>
        <span class="token class-name">Int32</span> PacketSize<span class="token punctuation">,</span> <span class="token class-name">Int32</span> PingData<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Int32</span> cbReturn <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">// serialize the struct into the array </span>
            <span class="token class-name"><span class="token keyword">int</span></span> Index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_type <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            b_type<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Type<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_code <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            b_code<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>packet<span class="token punctuation">.</span>SubCode<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_cksum <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>CheckSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_id <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Identifier<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b_seq <span class="token operator">=</span> BitConverter<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>SequenceNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Console.WriteLine(&quot;Serialize type &quot;); </span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_type<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_type<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> b_type<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            <span class="token comment">// Console.WriteLine(&quot;Serialize code &quot;); </span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_code<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_code<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> b_code<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            <span class="token comment">// Console.WriteLine(&quot;Serialize cksum &quot;); </span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_cksum<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_cksum<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> b_cksum<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            <span class="token comment">// Console.WriteLine(&quot;Serialize id &quot;); </span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_id<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_id<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> b_id<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>b_seq<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> b_seq<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> b_seq<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            <span class="token comment">// copy the data </span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> Buffer<span class="token punctuation">,</span> Index<span class="token punctuation">,</span> PingData<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Index <span class="token operator">+=</span> PingData<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Index <span class="token operator">!=</span> PacketSize<span class="token comment">/* sizeof(IcmpPacket) */</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cbReturn <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> cbReturn<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            cbReturn <span class="token operator">=</span> Index<span class="token punctuation">;</span>
            <span class="token keyword">return</span> cbReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// This Method has the algorithm to make a checksum </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
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
    <span class="token punctuation">}</span> <span class="token comment">// class ping </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Class that holds the Pack information </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IcmpPacket</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">Byte</span> Type<span class="token punctuation">;</span> <span class="token comment">// type of message </span>
        <span class="token keyword">public</span> <span class="token class-name">Byte</span> SubCode<span class="token punctuation">;</span> <span class="token comment">// type of sub code </span>
        <span class="token keyword">public</span> <span class="token class-name">UInt16</span> CheckSum<span class="token punctuation">;</span> <span class="token comment">// ones complement checksum of struct </span>
        <span class="token keyword">public</span> <span class="token class-name">UInt16</span> Identifier<span class="token punctuation">;</span> <span class="token comment">// identifier </span>
        <span class="token keyword">public</span> <span class="token class-name">UInt16</span> SequenceNumber<span class="token punctuation">;</span> <span class="token comment">// sequence number </span>
        <span class="token keyword">public</span> <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Data<span class="token punctuation">;</span>

    <span class="token punctuation">}</span> <span class="token comment">// class IcmpPacket </span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode9.html.vue"]]);export{i as default};
