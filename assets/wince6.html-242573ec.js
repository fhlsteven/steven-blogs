import{_ as e,o as n,c as i,a as r}from"./app-477de5b2.js";const o={},d=r('<h1 id="windows-ce通讯模式" tabindex="-1"><a class="header-anchor" href="#windows-ce通讯模式" aria-hidden="true">#</a> Windows CE通讯模式</h1><blockquote><p>2003-05-16 peter 天极论坛</p></blockquote><p>这篇白皮书概述了微软的Windows CE操作系统的通讯能力。因为不同的应用程序和设备在通讯方面的要求不同，所以Windows CE提供了支持广泛的硬件和通讯技术。对于用电缆、调制解调器或者红外传输介质连接的设备之间的通讯提供了串行通讯支持。Windows CE网络通讯支持的选择范围从通过串行口与SLIP或PPP连在一起的网络到局域网（LAN）和用TCP/IP协议的无线网络。</p><h2 id="对windows-ce通讯的浏览" tabindex="-1"><a class="header-anchor" href="#对windows-ce通讯的浏览" aria-hidden="true">#</a> 对Windows CE通讯的浏览</h2><p>通讯能力是基于Windows CE设备的一个关键性特征。实际上，所有的这些设备都将至少有内置的通讯硬件，例如一个串行电缆或者红外（IR）传送器。PC卡或者紧凑的映射卡（Compact Flash Card）支持容许广泛的各种各样的市场上的附加的通讯设备被加在一个基本的单元之中。这样，Windows CE就能够采用各种各样的通讯形式，从通过电缆传送的串行通讯到采用TCP/IP协议的无线网络。</p><p>Windows CE支持两种基本的通讯，在许多情况下，他们使用相同的硬件。不同点在于数据包不同，当在发送器和接受器之间有一个一对一连接时，你就可以采用串行通讯。数据简单地从一个设备流到另一个设备。网络通讯允许你给定一个目标地址，以传送到多台设备中的一台。它也提供了高度的可靠性以防止数据丢失。</p><p>Windows CE能支持三种类型的通讯： 串行通讯能够通过下列设备传送：</p><p>串行电缆；</p><p>红外传送器，无论有没有使用IrDA协议，<br> 串行通讯和快速IR都被支持。<br> 调制解调器<br> 网络通讯能够通过几乎任何类型的硬件通讯设备进行通讯。Windows CE网络支持：</p><p>ICMP请求或连接；</p><p>基于HTTP和FTP协议的Internet通讯；<br> 网络文件和打印机访问；<br> Windows Sockets，包括用于红外通讯的IrSock扩展和用于通讯安全的secure sockets扩展；<br> 用于无线网络的TCP/IP协议；<br> 用于红外通讯的IrDA协议；<br> 用于局域网和IrDA的网络的IDIS4.0<br> 用于带有串行电缆或者调制解调器连接的网络的PPP协议和SLIP协议；<br> 远程访问服务器（RAS）客户支持。<br> Windows CE也提供支持管理通过TAPI（telephoy API）连接的调制解调器。TAPI处理的任务有：电话拨号、建立连接和终止呼叫。</p><p>下面扼要地表示了通讯模式：</p><h2 id="串行通讯" tabindex="-1"><a class="header-anchor" href="#串行通讯" aria-hidden="true">#</a> 串行通讯</h2><p>串行通讯实际上将被所有的Windows CE设备所支持，在硬件水平上，通过电缆和红外传送器进行串行通讯是很普通的。调制解调器也支持串行通讯。</p><p>每一个串行设备都匹配有一个COM口，例如“COM1”。Windows CE为打开串口和管理接收设备上的连接提供了一个API。一旦连接成功，将用相同的函数进行数据传送，这些函数用以读一个文件或者写一个文件。数据只是简单的从一个设备传送到另一个设备。不支持同步和异步I/O。</p><p>有些设备可能允许红外传送器用以串行通讯。这种传送将是“原始的”，即没有进行冲突检测。用以原始串行红外传送的程序实际上和那些用以电缆传送的程序是完全相同的。</p><p>利用IrDA协议，通过IRsock（网络堆的一部分，将在后面进行诉论）可以得到更加强健的串行红外通讯。作为一种直接采用Irsock的替换，IrComn模仿串行通讯但是内部采用IRSock和IrDA协议。用于IrComn的程序和那些用于串行电缆和“原始”IR的程序实际上是完全相同的。</p><h2 id="网络通讯" tabindex="-1"><a class="header-anchor" href="#网络通讯" aria-hidden="true">#</a> 网络通讯</h2><p>Windows CE支持网络通讯所用的各种硬件设备包括：</p><p>串行电缆；<br> 红外传送器；<br> 广播传送器；<br> 局域网络；<br> 调制解调器。<br></p><p>Windows CE也提供了几个API以简化在一个应用程序中包含网络通过的过程。</p><p>Internet浏览以及访问远程文件和打印机</p><p>Windows CE提供了两种高水平的API，这两种API简化了网络通讯中的一些更普通的应用。</p><p>WinInet API支持HTTP 1.0和FTP Internet浏览协议。它大大地简化了编写一个Internet客户应用程序的过程。但是不支持*。WinInet也支持安全通讯。有三种安全协议：Secure Sockets层（SSL）2.0版和3.0版，以及私有通讯技术（PCT）1.0版。</p><p>Wnet API提供了访问普通Internet文件系统（IFS）和改更远程访问打印机和文件的地址。现在仅支持Windows 95和Windows NT操作系统的连接。地址更换支持全球名字转称（UNC），这里的名称（例如\\SeverXX\\ShareXX）不包括驱动器字符。</p><h2 id="winsock和irsock" tabindex="-1"><a class="header-anchor" href="#winsock和irsock" aria-hidden="true">#</a> WinSock和IRSock</h2><p>所有的网络通讯都通过Windows Sockets接口，一般称作Winsock、WinInef和Wnet在内部应用Winsock，并能够减轻为了清晰地建立和管理Socket连接所需要的应用程序。你也可以直接使用Winsock。</p><p>Windows CE支持标准的WinSock 1.1版的函数，但是不支持异步的WinSock函数。然而，可以通过微软基础类（MFC）的CleSocket类获得支持异步消息。一个WSAIoctl的执行是用来支持安全服务提供者。Windows CE支持安全Sockets层的2.0版和1.0版，以及PCT1.0版的安全协议。</p><p>IrSock是WinSock的一个扩展，它能应用IrDA协议加强基于Socket的红外通讯。尽管IrSock这个应用工具和传统的WinSock在几个函数的用法上有一些不同，但是在许多方面它们都是相同的。</p><h2 id="对远程访问客户的支持" tabindex="-1"><a class="header-anchor" href="#对远程访问客户的支持" aria-hidden="true">#</a> 对远程访问客户的支持</h2><p>Windows CE支持远程访问服务器（RAS）的客户，RAS是一个用于连接远程设备的多协议规则。Windows CE RAS客户支持实际上和标准的Windows工具是完全相同的，但是一次只支持一个点对点的连接。</p><h2 id="tcp-ip和irda" tabindex="-1"><a class="header-anchor" href="#tcp-ip和irda" aria-hidden="true">#</a> TCP/IP和IrDA</h2><p>TCP/IP协议簇是为Internet而开发的，也是一个最灵活的、应用最广泛的网络协议，它被广泛的各种系统所支持，并形成了Windows CE网络栈的核心。当你不能够直接访问TCP/IP协议栈时，你可以通过修改它的一些参数来优化它。</p><p>常规的TCP/IP协议栈被设计成在有线网上具有高效功能的协议。他们可以正确地运行在基于Windows CE的用在无线网络上的机动设备。Windows CE的TCP/IP栈被设计成参数可以重新设置的，这样就能够高效的支持无线网络。这种参数的一个例子是：acknowledgement timeout。</p><p>经外数据联合（IRDA）协议是一个广泛用在红外通讯上的标准。它比数据简单地从源端传送到接收器要可靠得多，Windows CE IRDA栈被调庆成支持NDIS４.0 SIRt FIR驱动器。</p><h2 id="网络的硬件设备" tabindex="-1"><a class="header-anchor" href="#网络的硬件设备" aria-hidden="true">#</a> 网络的硬件设备</h2><p>当两个设备之间一对一的连接允许串行通讯时，就要经常用到网络通讯技术。例如，许多基于Windows CE的设备将通过串行通讯连接（如调制解调器）连接到它们的网络上。甚至可以用一根串行电缆来连接两个设备，TCP/IP协议提供了内置的可靠性，以防止丢失数据。</p><p>为了支持串行连接网络，Windows CE支持广泛应用的串行线接口（SLIP）和点对点（PPP）协议。证实是通过口令证实协议（PAP），挑战证实协议（CHAP）和微软的CHAP来提供的。</p><p>为了支持局域网和IrDA网，Windows CE包含了一个NDIS4.0的招待程序。现在，Windows CE仅支持以太网和IrDA小口驱动器，现在不支持广域网。</p><h2 id="管理电话连接" tabindex="-1"><a class="header-anchor" href="#管理电话连接" aria-hidden="true">#</a> 管理电话连接</h2><p>用串行或者网络API通过调制解调器连接都能进行数据传输。然而，任何一个API都不能对诸如电话拨号这样的任务提供任何帮助。为了简化编写和管理电话连接的过程，Windows CE包括了一个Telephoy API(TAPI)，可以通过内置式或PC卡式调制解调器来使用它。它包括了一个为基于调制解调器AT命令的联合式调制解调器的服务提供者。对于其他类型的调制解调器，TAPI支持可安装服务的供应商。</p><p>TAPI是一个设备的集合，它允许你利用广泛的各种电报和通讯服务而不需要你有详细的专门技术的知识。它处理各种任务，诸如电话拨号、管理调制解调器连接和终止呼叫，它仅支持呼叫的外界。</p><p>【责任编辑：方舟】</p>',43),a=[d];function s(p,c){return n(),i("div",null,a)}const I=e(o,[["render",s],["__file","wince6.html.vue"]]);export{I as default};
