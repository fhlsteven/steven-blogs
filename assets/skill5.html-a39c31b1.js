import{_ as e,o as p,c as t,a as o}from"./app-477de5b2.js";const l={},n=o(`<h1 id="《编程高手箴言》读后-2" tabindex="-1"><a class="header-anchor" href="#《编程高手箴言》读后-2" aria-hidden="true">#</a> 《编程高手箴言》读后 #2</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>seacloud（原作）  
关键字     编程高手
</code></pre></div><p>毕业也有几年了，也看了和学了不少东西。有时也想写点什么，但总是觉得头绪很多，一直没有动笔。最近翻了翻梁先生的《编程高手箴言》，突然想写点什么，权且用读书笔记的形式写点东西。等号上面的摘字《箴言》，下面则是笔者自己的感想。希望大家指教，但是谩骂就不必了，谢谢。</p><p>注：这一部分涉及《箴言》第二章。</p><hr><p>CPU是计算机的心脏，是控制程序的核心。只有真正了解了CPU的结构和运行机理，才能真正编出优秀的程序。 ...以至今天如火如荼的64位。</p><p><code>===========================================</code></p><p>CPU确实是计算机的核心，但是是不是一定要了解了CPU的结构和运行机理了才能写出漂亮的程序呢？我觉得不一定。软件是分层的，每一层都有可能出漂亮的软件。如果你希望在底层，尤其是和硬件关系密切的层，比如操作系统硬件核心层写出漂亮的代码，当然需要深刻理解CPU的结构和运行机理。然而，如果你的工作层次较高，那么你实际看到的已经不是硬件CPU了，而是你的操作系统，开发运行环境等一起提供的一个“虚拟”的机器了。就如我们在用汇编开发程序的同志，一般不太会关注CPU内部的逻辑设计吧。</p><p>至于64位机，呵呵，前途究竟如何还是个未知数，毕竟AMD推出64机后，Intel并没有立即跟进，好像还没有到“如火如荼”的地步吧。开个玩笑，如果AMD的64位机工作在32位时能发挥哪怕1.5倍同档次32位机的性能，我也就会毫不犹豫的淘汰我这片AthlonXP了 😃 当然，64位取代32位是必然的，只是个时间问题了，兄弟们努力啊，编出牛牛的软件，充分去发挥硬件的优势和特点啊 😉</p><hr><p>RISC就是在设计CPU的时候，只把最常用的指令用硬件来实现，其他的指令都通过微代码用软件的方法模拟实现。CISC是一种指令对应一组执行单元的体系结构。不过，随着CISC工作频率的提高和技术的发展，RISC现在已经黯然失色了。</p><p><code>===========================================</code></p><p>实际上，一些CISC CPU也是离不开微代码的，比如Intel就给它的P4 CPU出过微代码补丁程序，大家可以看看这个链接<code>http://www.pcpop.com/News/2002/8/7779.shtml</code>。当然，现在RISC体系正面临CISC体系CPU的强大攻势，一些传统RISC服务器供应商，比如IBM，SUN都为了留后手而推出了基于CISC的服务器。但是，市场的选择有时未必就是技术最先进的东西。毕竟最大的芯片巨无霸Intel是CISC的支持者。而RISC和CISC体系之争从来没有个最终的结论。</p><p>让我们记住一些闪亮的RISC CPU家族吧：DEC/Compaq Alpha, MIPS, HP PA-RISC系列, SUN Sparc系列, IBM/Moto PowerPC等等，即使有这么一天CISC CPU淡出江湖。</p><hr><p>1989年，Intel推出80486芯片，速度上突破100MHz，超过了RISC CPU。</p><p><code>===========================================</code></p><p>按照Intel自己的文档，它1989推出的486DX是25MHz工作频率，一级缓存是16Kb。如果Intel所言无误，那么以这种工作频率要超过同时的RISC，恐怕还是个问题。虽说作频率并不是CPU工作速度的唯一因素。引用中科院和科大做CPU的一个成员胡伟武的话：“我的愿望就是超过Intel，孔子说朝闻道夕死可矣，我是早上超过洋鬼子，夕死可矣。</p><p>不是说卖得比Intel好，我要跑得比他们快，超过Alpha比较难，超过Intel有希望。我们要专注于结构的突破超过Intel”。</p><hr><p>80386提供了两种工作模式，其一为实模式,...，其二为保护模式。</p><p><code>===========================================</code></p><p>根据Intel的手册，其实还应该有个系统管理模式。我没有碰到过在这个模式下工作的程序，感兴趣的同志请自行参考Intel的手册。</p><hr><p>不同任务间的保护：通过把不同的任务放在不同的虚拟地址空间中去，来实现不同任务的隔离(即A程序不能访问B程序的代码和数据)</p><p><code>===========================================</code></p><p>虚拟空间的概念对于刚刚碰386保护模式的同志可能有点难理解，其实是这样的：假设一个程序被你在多任务操作系统里启动了两遍，那么你这个程序在两个实例里看到的虚拟空间其实是一样的，都是0~4G，然而底层的寻址机制能够让这两个实例里同一个数据或者指令虽然具有相同的虚拟地址，然而却有不同的物理地址。我们知道，软件最终要落实到硬件，如果最终的物理地址不一样，那么这两个程序就不会相互干扰了。当然了，如果你硬要让两个程序的某一个虚拟地址对应同一个物理地址也可以，对于操作系统而言是小菜一碟，只要把转换表格小小修改一下就可以达到目的。</p><p>(具体的寻址方法见下面)</p><hr><p>《箴言》一书对386 CPU的保护模式下的寻址给出了flat, segmented模式的寻址方式。</p><p><code>===========================================</code></p><p>386CPU在进入保护模式之前，实际上要在主存里面初始化好一大堆数据结构的。按照Intel手册自己的说法，The contents of the protected-mode system data structures loaded into memory during software initialization, depend largely on the type of memory management the protected-mode operatingsystem or executive is going to support: flat, flat with paging, segmented, or segmented with paging. 《箴言》一书给出的是一个简单的模型，可能早期的DOS程序员为了访问大内存，在没有OS的支持下选择这种方式。而在现在实际的操作系统里，不会用这种方式，基本上都是flat，paging模式。有的同志也许要问，《箴言》给出的访问模式不是挺好的嘛，简单易懂。那么为什么现在稍微好一点的操作系统不采用这种方式呢？</p><p>原因是为了支持“虚拟内存”，只有启用了CPU的paging模式后，才可以设计出高效的虚拟内存管理程序来。何谓虚拟内存，简单的说就是一般应用程序设计者和某些底层操作系统设计者看到的存贮器。我们知道，32位的机器可以寻址4G的地址范围(实际上较新的Intel CPU通过一定的方式可以访问超过4G的物理存贮器，然而它们可以直接访问的虚拟存贮器还是4G)，而我们绝大多数的同志并没有这么多的存贮器，怎么办？利用paging功能，在OS的支持下，就可以给程序员提供一个虚拟的存贮器，其大小是4G(当然，现在的操作系统并没有把全部4G给普通程序，而是保留了一些给OS内核，比如Linux好像就是给应用程序留下了3G的虚拟空间)。这种所谓的“虚拟内存”是如何实现的呢，要回答这个问题就必须从CPU在启用了paging后如何得到物理地址的过程说起。下面我试图用尽量通俗的文字描述这个过程，尽量少设计386保护模式的一些术语。至于官方的说法请参考Intel 386程序员手册，这个手册可以从Intel免费下到。给个链接吧，免得有的同志再去搜了，http://www.intel.com/design/Pentium4/manuals/245470.htm。</p><p>OK, let&#39;s go! 这里要描述的是一些主流操作系统使用的flat，paging模式。何谓flat，其实386CPU还是保留了早期CPU的分段功能，而flat模式就是将段的基地址设为0，而将这个段的范围设为4G，这样，其实是没有用分段功能。何谓paging呢，就是把虚拟内存分成许多小块，然后将这些块再映射到物理内存或者辅助存贮器，比如硬盘。这就解释了为什么可以提供给普通程序员大的多的(比如3G)内存空间，因为我们可以把一些虚拟内存映射到磁盘上，在需要的时候在将他们调到物理内存中去。</p><p>如果我们反汇编一些程序，就可以看到，从表面上看，好像访问内存的方法和过去没什么差别嘛。实际的情况是这种差别是藏在幕后的。我们在汇编程序里使用的其实是“虚拟地址”，虚拟地址的形成还是和过去的段式管理一样，即段的开始地址加上偏移量。由于在flat模式下，所有的段开始地址都是0，所以我们在汇编程序里指定的偏移就是最终的虚拟地址了。</p><p>比如下面这个语句，<code>movl $0x4321,0x8049430</code>，其含义是将整数<code>0x4321</code>送到地址是<code>0x8049430</code>的地方去。(抱歉，由于我手头的机器上没有Win32平台的开发工具，只好从用gdb反汇编的程序中摘了一行)在flat模式下，<code>0x8049430</code>就是最终的虚拟地址了。得到虚拟地址后，革命成功了第一步，下面就是要利用分页管理来得到最终的物理地址了。过程如下，首先把虚拟地址，也就是<code>0x8049430</code>的高10bits取出来作为一个index去索引“第一个”表格，这个表格的起始地址放在系统CR3寄存器里。从“第一个”表格里取到一个32位整数，而这个整数就对应了“第二个”表格的起始地址。然后将虚拟地址<code>0x8049430</code>的中间10个bits拿出来索引这第二个表格，又可以得到一个32位的值，这个值其实就是一个物理地址了，用这个物理地址加上刚才<code>0x8049430</code>剩下的12个bits的值就可以形成最终<code>0x8049430</code>对应的物理地址了。写完了上面这个过程，我自己也回头看了一下，确实写的不怎么清楚，是吧？那好，我们就举个实际生活中一个不存在的例子来说明(废话，既然不存在还说了干吗:-)。</p><p>假如你经营一个很大的酒店，现在让你接待很多来自全国各地的旅客，聪明的你想到了一个安排他们的方法，每来一个人，你就拿过他的身份证，(假设身份证的格式是 “省名-城市名-出生序号”)根据他所属的省份去查找“第一个”表格，让他到这个省份对应的办公室去。这个旅客到了省份对应的办公室后，就有一个接待人员拿过他的身份证根据接下来的城市信息查“第二个”表格又把他安排到这个城市的旅客所属的楼层去。这个旅客到达相应的楼层后，根据自己的出生序号再找到自己的房间。也许你要问，干吗还要按照省份先进行一次安排操作啊，干吗不直接安排到相应的城市对应的办公室去啊？原因是为了节约几个办公室，有的省份因为没有计划，所以聪明的你根本就没有安排这个省份下面城市对应的办公室，来了一个人，你根据他的省份立即就可以知道这个人应不应该接待，否则如果每个城市一个办公室，那多浪费啊，特别如果你的客人只集中在几个特定的省份的时候。</p><p>而我们的程序在运行的时候恰恰就是“客人只集中在几个特定的省份”这种情况，所以采取了两级索引的方式，这样可以节约用来维护分页机制所需要表格的尺寸。如果不这样，我们假设一个小块单元是4K bytes，那么映射4G空间我们就需要4M+4K bytes来存放分页所需要的表格。(这个值是这样计算的，“第一个”表格是4K大小，有1024个表项，每个表项对应一个“第二个”表，这样就有1024个第二个表，而每个第二个表尺寸也是4K，于是就需要4M的空间放“第二个”表)</p><p>呵呵，费了半天劲，也不知道说清楚了没有。对这个部分感兴趣的同志可以进一步参考Intel手册和Linux启动代码。</p><p>另外，保护模式的一个很重要的概念就是“保护”，系统里面的段啊，页啊都有很多属性和权限，低权限的代码不可以调需要更高权限的指令。你想想，如果不是这样的话，用户程序只要随便改改那两个表格，岂不是什么地址都可以访问了，呵呵。一些病毒代码挖空心思也就是想让病毒体在CPU的最高特权级下运行，CIH病毒就是一个很好的证明。</p><p>噢，对了，这个链接<code>http://jiurl.nease.net/document/JiurlPlayWin2k/MmPaging1.htm</code>给出了关于分页机制的比我讲的好的多得文章，感兴趣的同志可以去看看。</p><p>如果有同志想写自己的小测试程序，推荐到sourceforge上下载bochs，一个x86模拟器，这样至少可以免去你reboot computer的烦恼。</p><hr><p>对于386的中断处理，《箴言》给出了一页的描述。</p><p><code>===========================================</code></p><p>而在Intel的手册里是好几章在讲。这一块我几乎没有碰过，呵呵，平时做试验的时候都是直接关中断了，呵呵。同志们同样可以参考Intel手册和Linux的中断处理部分。希望有同志贴出帖子来描述一下386下面中断的处理方法。</p><hr><p>关于《箴言》所附的示例程序</p><p><code>===========================================</code></p><p>这个程序我没有编译，一来没有bc3.1，二来没有纯DOS环境了。只是有几个问题不知道答案，希望明白的同志指教：</p><ol><li>普通的机器没有4G的存贮器，那么肯定有一些4G里面的地址根本没有对应的物理设备，不知道访问这些地址会不会导致系统异常。</li><li>按照Intel的手册说明，进入保护模式需要一个长跳转，而示例程序里是个局部短跳转。不知道是不是真的像《箴言》里说得那样。 另外《箴言》程序里的英文注释实在是看不懂，希望理解的同志指点。</li><li>既然在实模式里一个段只有64K，那么我们又怎么在实模式里通过FS访问所有的内存呢？</li></ol><p>呵呵，有机会一定要用bochs好好试一下。</p><p>今天又在网上看到了一片文章，大家不妨看看，再对照《箴言》，有什么感想？</p><p>http://www.lisoleg.net/lisoleg/memory/%D4%DADOS%CA%B5%C4%A3%CA%BD%CF%C2%D6%B1%BD%D3%B4%E6%C8%A14GB%C4%DA%B4%E6.txt</p><hr><p><strong>作者相关文章</strong>：</p><ul><li><a href="./skill7">《编程高手箴言》读后 #4(原作)</a></li><li><a href="./skill6">《编程高手箴言》读后 #3(原作)</a></li><li><a href="./skill4">《编程高手箴言》读后 #1(原作)</a></li></ul><p>其它相关文章：</p><ul><li><a href="./skill8">我也瞎谈编程高手箴言(原作)</a></li></ul><hr><hr><h2 id="对该文的评论-人气-2094" tabindex="-1"><a class="header-anchor" href="#对该文的评论-人气-2094" aria-hidden="true">#</a> 对该文的评论 人气：2094</h2><p>cwbboy(2004-1-8 13:23:45)</p><blockquote><p>各位骂人的朋友，有本事你就写个类似超级解霸的东东出来啊，可以说在现在这个媒体播放器满天飞的世界，你也未必能写出来。　　千万别告我，你从vb工具箱拖一个出来就搞定了。</p></blockquote><p>Purpleendurer(2004-1-6 14:37:24)</p><blockquote><p>80386提供了两种工作模式，其一为实模式,...，其二为保护模式。<br><code>================================================================================================</code><br> 根据Intel的手册，其实还应该有个系统管理模式。我没有碰到过在这个模式下工作的程序，感兴趣的同志请自行参考Intel的手册。<br><br> 还有一种是V86模式....</p></blockquote><p>minotaurus(2003-12-29 17:57:27)</p><blockquote><p>希望尽快拜读#3</p></blockquote><p>minotaurus(2003-12-29 17:57:10)</p><blockquote><p>我对这些非常感兴趣，因为：1）我对技术感兴趣。2）我对不知道的事情感兴趣。3）还没找到自己的专业方向。<br> 我有如下疑问：1）这些知识的应用领域在哪里？2）可不可以加为好友，聊聊，让我了解更多的关于CPU的知识（从头探索实在是如无头苍蝇）。MSN: ilovemm99@msn.com</p></blockquote><p>litowen(2003-12-29 10:10:16)</p><blockquote><p>呵呵,楼主所说的这篇文章:<code>http://www.lisoleg.net/lisoleg/memory/%D4%DADOS%CA%B5%C4%A3%CA%BD%CF%C2%D6%B1%BD%D3%B4%E6%C8%A14GB%C4%DA%B4%E6.txt</code><br> 就是我在对你第一篇文章的回复中提到的涉嫌抄袭了.事实上我记得还有一篇也是抄袭.<br> 只是不知是否这个Long Yunliang是否就是梁本人,否则&quot;梁高手&quot;就真是无耻了!</p></blockquote>`,72),c=[n];function a(i,d){return p(),t("div",null,c)}const C=e(l,[["render",a],["__file","skill5.html.vue"]]);export{C as default};
