import{_ as C,o as e,c as T,a as p}from"./app-477de5b2.js";const P={},r=p(`<h1 id="tcp三次握手应用及原理" tabindex="-1"><a class="header-anchor" href="#tcp三次握手应用及原理" aria-hidden="true">#</a> TCP三次握手应用及原理</h1><p>TCP/IP是很多的不同的协议组成，实际上是一个协议组，TCP用户数据报表协议(也称作TCP传输控制协议，Transport Control Protocol。可靠的主机到主机层协议。这里要先强调一下，传输控制协议是OSI网络的第四层的叫法，TCP传输控制协议是TCP/IP传输的6个基本协议的一种。两个TCP意思非相同。 )。TCP是一种可靠的面向连接的传送服务。它在传送数据时是分段进行的，主机交换数据必须建立一个会话。它用比特流通信，即数据被作为无结构的字节流。 通过每个TCP传输的字段指定顺序号，以获得可靠性。是在OSI参考模型中的第四层，TCP是使用IP的网间互联功能而提供可靠的数据传输，IP不停的把报文放到 网络上，而TCP是负责确信报文到达。在协同IP的操作中TCP负责：握手过程、报文管理、流量控制、错误检测和处理（控制），可以根据一定的编号顺序对非正常顺序的报文给予从新排列顺序。关于TCP的RFC文档有RFC793、RFC791、RFC1700。</p><p>在TCP会话初期，有所谓的“三握手”：对每次发送的数据量是怎样跟踪进行协商使数据段的发送和接收同步，根据所接收到的数据量而确定的数据确认数及数据发送、接收完毕后何时撤消联系，并建立虚连接。为了提供可靠的传送，TCP在发送新的数据之前，以特定的顺序将数据包的序号，并需要这些包传送给目标机之后的确认消息。TCP总是用来发送大批量的数据。当应用程序在收到数据后要做出确认时也要用到TCP。由于TCP需要时刻跟踪，这需要额外开销，使得TCP的格式有些显得复杂。下面就让我们看一个TCP的经典案例，这是后来被称为MITNICK攻击中KEVIN开创了两种攻击技术：</p><ul><li>TCP会话劫持</li><li>SYN FLOOD（同步洪流）</li></ul><p>在这里我们讨论的时TCP会话劫持的问题。</p><p>先让我们明白TCP建立连接的基本简单的过程。为了建设一个小型的模仿环境我们假设有3台接入互联网的机器。A为攻击者操纵的攻击机。B为中介跳板机器（受信任的服务器）。C为受害者使用的机器（多是服务器），这里把C机器锁定为目标机器。A机器向B机器发送SYN包，请求建立连接，这时已经响应请求的B机器会向A机器回应SYN/ACK表明同意建立连接，当A机器接受到B机器发送的SYN/ACK回应时，发送应答ACK建立A机器与B机器的网络连接。这样一个两台机器之间的TCP通话信道就建立成功了。</p><p>B终端受信任的服务器向C机器发起TCP连接，A机器对服务器发起SYN信息，使C机器不能响应B机器。在同时A机器也向B机器发送虚假的C机器回应的SYN数据包，接收到SYN数据包的B机器（被C机器信任）开始发送应答连接建立的SYN/ACK数据包，这时C机器正在忙于响应以前发送的SYN数据而无暇回应B机器，而A机器的攻击者预测出B机器包的序列号（现在的TCP序列号预测难度有所加大）假冒C机器向B机器发送应答ACK这时攻击者骗取B机器的信任，假冒C机器与B机器建立起TCP协议的对话连接。这个时候的C机器还是在响应攻击者A机器发送的SYN数据。</p><p>TCP协议栈的弱点：TCP连接的资源消耗，其中包括：数据包信息、条件状态、序列号等。通过故意不完成建立连接所需要的三次握手过程，造成连接一方的资源耗尽。</p><p>通过攻击者有意的不完成建立连接所需要的三次握手的全过程，从而造成了C机器的资源耗尽。序列号的可预测性，目标主机应答连接请求时返回的SYN/ACK的序列号时可预测的。（早期TCP协议栈，具体的可以参见1981年出的关于TCP雏形的RFC793文档）</p><p>TCP头结构</p><p>TCP协议头最少20个字节，包括以下的区域（由于翻译不禁相同，文章中给出相应的英文单词）：</p><ul><li>TCP源端口(Source Port)：16位的源端口其中包含初始化通信的端口。源端口和源IP地址的作用是标示报问的返回地址。</li><li>TCP目的端口(Destination port)：16位的目的端口域定义传输的目的。这个端口指明报文接收计算机上的应用程序地址接口。</li><li>TCP序列号（序列码,Sequence Number）：32位的序列号由接收端计算机使用，重新分段的报文成最初形式。当SYN出现，序列码实际上是初始序列码（ISN），而第一个数据字节是ISN+1。这个序列号（序列码）是可以补偿传输中的 不一致。</li><li>TCP应答号(Acknowledgment Number)：32位的序列号由接收端计算机使用，重组分段的报文成最初形式。，如果设置了ACK控制位，这个值表示一个准备接收的包的序列码。</li><li>数据偏移量(HLEN)：4位包括TCP头大小，指示何处数据开始。</li><li>保留(Reserved)：6位值域，这些位必须是0。为了将来定义新的用途所保留。</li><li>标志(Code Bits)：6位标志域。表示为：紧急标志、有意义的应答标志、推、重置连接标志、同步序列号标志、完成发送数据标志。按照顺序排列是：URG、ACK、PSH、RST、SYN、FIN。</li><li>窗口(Window)：16位，用来表示想收到的每个TCP数据段的大小。</li><li>校验位(Checksum)：16位TCP头。源机器基于数据内容计算一个数值，收信息机要与源机器数值 结果完全一样，从而证明数据的有效性。</li><li>优先指针（紧急,Urgent Pointer）：16位，指向后面是优先数据的字节，在URG标志设置了时才有效。如果URG标志没有被设置，紧急域作为填充。加快处理标示为紧急的数据段。</li><li>选项(Option)：长度不定，但长度必须以字节。如果 没有 选项就表示这个一字节的域等于0。</li><li>填充：不定长，填充的内容必须为0，它是为了数学目的而存在。目的是确保空间的可预测性。保证包头的结合和数据的开始处偏移量能够被32整除，一般额外的零以保证TCP头是32位的整数倍。</li></ul><p>标志控制功能</p><p>URG：紧急标志</p><pre><code>紧急(The urgent pointer) 标志有效。紧急标志置位，
</code></pre><p>ACK：确认标志</p><pre><code>确认编号(Acknowledgement Number)栏有效。大多数情况下该标志位是置位的。TCP报头内的确认编号栏内包含的确认编号(w+1，Figure：1)为下一个预期的序列编号，同时提示远端系统已经成功接收所有数据。
</code></pre><p>PSH：推标志</p><pre><code>该标志置位时，接收端不将该数据进行队列处理，而是尽可能快将数据转由应用处理。在处理 telnet 或 rlogin 等交互模式的连接时，该标志总是置位的。 
</code></pre><p>RST：复位标志</p><pre><code>复位标志有效。用于复位相应的TCP连接。
</code></pre><p>SYN：同步标志</p><pre><code>同步序列编号(Synchronize Sequence Numbers)栏有效。该标志仅在三次握手建立TCP连接时有效。它提示TCP连接的服务端检查序列编号，该序列编号为TCP连接初始端(一般是客户端)的初始序列编号。在这里，可以把TCP序列编号看作是一个范围从0到4，294，967，295的32位计数器。通过TCP连接交换的数据中每一个字节都经过序列编号。在TCP报头中的序列编号栏包括了TCP分段中第一个字节的序列编号。
</code></pre><p>FIN：结束标志</p><pre><code>带有该标志置位的数据包用来结束一个TCP回话，但对应端口仍处于开放状态，准备接收后续数据。
</code></pre><p>服务端处于监听状态，客户端用于建立连接请求的数据包(IP packet)按照TCP/IP协议堆栈组合成为TCP处理的分段(segment)。</p><p>分析报头信息： TCP层接收到相应的TCP和IP报头，将这些信息存储到内存中。</p><pre><code>检查TCP校验和(checksum)：标准的校验和位于分段之中(Figure：2)。如果检验失败，不返回确认，该分段丢弃，并等待客户端进行重传。

查找协议控制块(PCB{})：TCP查找与该连接相关联的协议控制块。如果没有找到，TCP将该分段丢弃并返回RST。(这就是TCP处理没有端口监听情况下的机制) 如果该协议控制块存在，但状态为关闭，服务端不调用connect()或listen()。该分段丢弃，但不返回RST。客户端会尝试重新建立连接请求。

建立新的socket：当处于监听状态的socket收到该分段时，会建立一个子socket，同时还有socket{}，tcpcb{}和pub{}建立。这时如果有错误发生，会通过标志位来拆除相应的socket和释放内存，TCP连接失败。如果缓存队列处于填满状态，TCP认为有错误发生，所有的后续连接请求会被拒绝。这里可以看出SYN Flood攻击是如何起作用的。

丢弃：如果该分段中的标志为RST或ACK，或者没有SYN标志，则该分段丢弃。并释放相应的内存。
</code></pre><p>发送序列变量</p><p>SND.UNA ： 发送未确认<br> SND.NXT ： 发送下一个<br> SND.WND ： 发送窗口<br> SND.UP ： 发送优先指针<br> SND.WL1 ： 用于最后窗口更新的段序列号<br> SND.WL2 ： 用于最后窗口更新的段确认号<br> ISS ： 初始发送序列号</p><p>接收序列号</p><p>RCV.NXT ： 接收下一个<br> RCV.WND ： 接收下一个<br> RCV.UP ： 接收优先指针<br> IRS ： 初始接收序列号</p><p>当前段变量</p><p>SEG.SEQ ： 段序列号<br> SEG.ACK ： 段确认标记<br> SEG.LEN ： 段长<br> SEG.WND ： 段窗口<br> SEG.UP ： 段紧急指针<br> SEG.PRC ： 段优先级</p><p>CLOSED表示没有连接，各个状态的意义如下：</p><p>LISTEN ： 监听来自远方TCP端口的连接请求<br> SYN-SENT ： 在发送连接请求后等待匹配的连接请求。<br> SYN-RECEIVED ： 在收到和发送一个连接请求后等待对连接请求的确认。<br> ESTABLISHED ： 代表一个打开的连接，数据可以传送给用户。<br> FIN-WAIT-1 ： 等待远程TCP的连接中断请求，或先前的连接中断请求的确认。<br> FIN-WAIT-2 ： 从远程TCP等待连接中断请求。<br> CLOSE-WAIT ： 等待从本地用户发来的连接中断请求。<br> CLOSING ： 等待远程TCP对连接中断的确认。<br> LAST-ACK ： 等待原来发向远程TCP的连接中断请求的确认。<br> TIME-WAIT ： 等待足够的时间以确保远程TCP接收到连接中断请求的确认。<br> CLOSED ： 没有任何连接状态。</p><p>TCP连接过程是状态的转换，促使发生状态转换的是用户调用：OPEN，SEND，RECEIVE，CLOSE，ABORT和STATUS。传送过来的数据段，特别那些包括以下标记的数据段SYN，ACK，RST和FIN。还有超时，上面所说的都会时TCP状态发生变化。</p><p>序列号</p><p>请注意，我们在TCP连接中发送的字节都有一个序列号。因为编了号，所以可以确认它们的收到。对序列号的确认是累积性的。TCP必须进行的序列号比较操作种类包括以下几种：</p><p>①决定一些发送了的但未确认的序列号。<br> ②决定所有的序列号都已经收到了。<br> ③决定下一个段中应该包括的序列号。</p><p>对于发送的数据TCP要接收确认，确认时必须进行的：</p><p>SND.UNA = 最老的确认了的序列号。<br> SND.NXT = 下一个要发送的序列号。<br> SEG.ACK = 接收TCP的确认，接收TCP期待的下一个序列号。<br> SEG.SEQ = 一个数据段的第一个序列号。<br> SEG.LEN = 数据段中包括的字节数。<br> SEG.SEQ+SEG.LEN-1 = 数据段的最后一个序列号。</p><p>如果一个数据段的序列号小于等于确认号的值，那么整个数据段就被确认了。而在接收数据时下面的比较操作是必须的：</p><p>RCV.NXT = 期待的序列号和接收窗口的最低沿。<br> RCV.NXT+RCV.WND：1 = 最后一个序列号和接收窗口的最高沿。<br> SEG.SEQ = 接收到的第一个序列号。<br> SEG.SEQ+SEG.LEN：1 = 接收到的最后一个序列号</p>`,44),S=[r];function N(o,c){return e(),T("div",null,S)}const t=C(P,[["render",N],["__file","netcode46.html.vue"]]);export{t as default};
