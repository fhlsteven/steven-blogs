import{_ as e,o as a,c as d,a as r}from"./app-57d1f7b1.js";const h={},t=r(`<h1 id="转贴-关于进程和线程" tabindex="-1"><a class="header-anchor" href="#转贴-关于进程和线程" aria-hidden="true">#</a> (转贴）关于进程和线程</h1><blockquote><p>2003-7-18</p></blockquote><p>笔者最近在开发基于Internet网上的可视电话过程中碰到了这样一个问题,即在基于Internet网上的可视电话系统中,同时要进行语音采集、语音编译码、图像采集、图像编译码、语音和图像码流的传输,所有这些工作,都要并行处理。特别是语音信号,如果进行图像编解码时间过长,语音信号得不到服务,通话就有间断;如果图像或语音处理时间过长,而不能及时传输码流数据,通信同样也会中断。这样就要求我们实现一种并行编程,在只有一个CPU的机器上,也就是要将该CPU时间按时一定的优先准则分配给各个事件,定期处理各事件,而不会对某一事件处理过长。在32位Windows95或Windows NT下,我们可以用多线程的处理技术来实现这种并行处理。实际上,这种并行编程在很多场合下都是必须的。例如,在File Manager拷贝文件时,它显示一个对话框中包含了一个Cancel按钮。如果在文件拷贝过程中,点中Cance l按钮,就会终止拷贝。在16位Winows中,实现这类功能需要在File Copy循环内部周期性地调用PeekMessage函数。如果正在读一个很大的动作;如果从软盘读文件,则要花费好几秒的时间。由于机器反应太迟钝,用户会频繁地点中这个按钮,以为系统不知道想终止这个操作。如果把File Copy指令放入另外一个线程,就不需要在代码中放一大堆PeekMessage函数,处理用户界面的线程将与它分开操作,点中Cancel按钮后会立即得到响应。同样的道理,在应用程序中创建一个单独线程来处理所有打印任务也是很有用的,用户可以在打印处理时继续使用应用程序。</p><h2 id="线程的概念" tabindex="-1"><a class="header-anchor" href="#线程的概念" aria-hidden="true">#</a> 线程的概念</h2><p>为了了解线程的概念 ,我们必须先讨论一下进程的概念。一个进程通常定义为程序的一个实例。在32位Windows中,进程占据4GB的虚拟地址空间。与它们在MS-DOS和16位Windows操作系统中不同,32位Windows进程是没有活力的。这就是说,一个32位Windows进程并不执行什么指令,它只是占据着4GB的地址空间,此空间中有应用程序EXE文件的代码和数据。</p><p>EXE需要的DLL也将它们的代码的数据装入到进程的地址空间。除了地址空间,进程还占有某些资源,比如文件、动态内存分配和线程。当进程终止时,在它生命期中创建的各种资源将被清除。</p><p>如上所述,进程是没有活力的,它只是一个静态的概念。为了让进程完成一些工作,进程必须至少占有一线程,所以线程是描述进程内的执行,正是线程负责执行包含在进程的地址空间中的代码。实际上,单个进程可能包含几个线程,它们可以同时执行进程的地址空间中的代码。为了做到这一点,每个线程有自己的一组CPU寄存器和椎。每个进程至少有一个线址程在执行其地址空间中的代码,如果没有线程执行进程地空间中的代码,如果没有线程执行进程地址空间中的代码,进程也就没有继续存在的理由,系统将自动清除进程及其地址空间。为了运行所有这些线程,操作系统为每个独立线程安排一些CPU时间,操作系统以轮转方式向线程提供时间片,这就给人一种假象,好象这些线程都在同时运行。创建一个32位Windows进程时,它的第一个线程称为主线程,由系统自动生成,然后可由这个主线程生成额外的线程,这些线程又可生成更多的线程。</p><h2 id="线程的编程技术" tabindex="-1"><a class="header-anchor" href="#线程的编程技术" aria-hidden="true">#</a> 线程的编程技术</h2><h3 id="_1-编写线程函数" tabindex="-1"><a class="header-anchor" href="#_1-编写线程函数" aria-hidden="true">#</a> 1.编写线程函数</h3><p>所有线程必须从一个指定的函数开始执行,该函数称为线程函数,它必须具有下列原型: <code>DWORD WINAPI YourThreadFunc(LPVOID lpvT.hreadParm);</code></p><p>该函数输入一个LPVOID型的参数,可以是一个DWORD型的整数,也可以是一个指向一个缓冲区的指针,返回一个DWORD型的值。像WinMain函数一样,这个函数并不由操作系统调用,操作系统调用包含在KERNEL32.DLL中的非C运行时的一个内部函数,如StartOfThread,然后由S tartOfThread函数建立起一个异常处理框架后,调用我们的函数。</p><h3 id="_2-创建一个线程" tabindex="-1"><a class="header-anchor" href="#_2-创建一个线程" aria-hidden="true">#</a> 2.创建一个线程</h3><p>一个进程的主线程是由操作系统自动生成,如果要让一个主线程创建额外的线程,可以调用CreateThread来完成。格式如下:</p><p><code>HANDLE CreateThread(LPSECURITY_ATTRIBUTES jpsa.DWORD cbstack,LPTHREAD_START _ROUTINE lpStartAddr.LPVOID lpvThreadParm,DWORD fdwCreate,LPDWORD lpIDThread);</code></p><p>其中参数意义如下:</p><p><code>lpsa</code>:是一个指向SECURITY_ATTRIBUTES结构的指针。如果想让对象为缺省安全属性的话,可以传一个NULL;如果想让任一个子进程都可继承该线程对象句柄,必须指定一个SECURITY _ATTRIBUTES结构,其中bInheritHandle成员初始化为TURE。<br><code>cbstark</code>:表示线程为自己所用堆栈分配的地址空间大小,0表示采用系统缺省值。<br><code>lpStartAddr</code>:表示新线程开始执行时代码所在函数的地址,即为线程函数。<br><code>lpvThreadParm</code>:是传入线程函数的参数。<br><code>fdwCreate</code>:指定控制线程创建的附加标志,可以取两种值。如果该参数为0,线程就会立即开始执行;如果该参数为CREATE_SUSPENDED,则系统产生线程后,初始化CPU,登记CONTEXT结构的成员,准备好执行该线程函数中的第一条指令,但并不马上执行,而是挂起该线程。<br><code>lpIDThrdad</code>:是一个DWORD类型地址,返回赋给该新线程的ID值。</p><h3 id="_3-终止线程" tabindex="-1"><a class="header-anchor" href="#_3-终止线程" aria-hidden="true">#</a> 3.终止线程</h3><p>如果某线程调用了ExitThread函数,就可以终止自己,如:</p><p><code>VOID ExtThead(UNIT fuExitCode);</code></p><p>这个函数为调用该函数的线程设置了退出码fuExitCode后,就终止该线程。</p><p>调用TerminateThread函数亦可终止线程。如:</p><p><code>BOOL TerminateThread(HANDLE hThread,DWORD dwExitCode);</code></p><p>该函数用来结束由hThread参数指定的线程,并把dwExitCode设成该线程的退出码。</p><p>当某个线程不再响应时,我们可以用其他线程调用该函数来终卡这个不响应的线程。</p><h3 id="_4-设定线程的相对优先级" tabindex="-1"><a class="header-anchor" href="#_4-设定线程的相对优先级" aria-hidden="true">#</a> 4.设定线程的相对优先级</h3><p>当一个线程被首次创建时,它的优先级等同于它所属进程的优先级。在单个进程内可以通过调用SetThreadPrionrity函数改变线程的相对优先级。一个线程的优先级是相对于其所属的进程优先级而言的。</p><p><code>BOOL SetThreadPriority(HANDLE hThread,intnPriority);</code></p><p>其中参数hThread是指向待修改优先级线程的句柄,nPriority可以是以下的值:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>THREAD_PRIORITY_LOWEST
THREAD_PRIORITY_BELOW_NORMAL
THREAD_PRIORITY_NORMAL
THREAD_PRIONRITY_ABOVE_NORMAL
THREAD_PRIONITY_HIGHEST。
</code></pre></div><h3 id="_5-挂起及恢复线程" tabindex="-1"><a class="header-anchor" href="#_5-挂起及恢复线程" aria-hidden="true">#</a> 5.挂起及恢复线程</h3><p>前文提到过可以创建挂起状态的线程,可以通过传递(CREATE_SUSPENDED标志给函数Cre ated来实现。当这样操作时,系统创建指定线程的核心对象,创建线程的栈,在CONTEXT结构中初始化线程CPU注册成员。然而,线程对象被分配了一个初始挂起计数值1,这表明系统将不再分配CPU去执行线程。要开始执行一个线程,另一个线程必须调用ResumeThread并传递给它调用CreateThread时返回的线程句柄。格式如下:</p><p><code>DWORD ResumeThread(HANDLE hThread);</code></p><p>一个线程可以被挂起多次。如果一个线程被挂起3次,则该线程在它被分配CPU之前必须被恢复3次。除了在创建线程时使用CREATE_SUSPENDED标志,还可以用SuspendThread函数挂起线程。格式如下:</p><p><code>DWORD SuspendThread(HANDLE hThread)</code>。</p><h2 id="多线程编程技术的应用" tabindex="-1"><a class="header-anchor" href="#多线程编程技术的应用" aria-hidden="true">#</a> 多线程编程技术的应用</h2><p>如前所述,为了实现基于TCP/IP下的可视电话,就必须&quot;并行&quot;地执行语音采集、语音编解码、图像采集、图像编解以及码流数据的接收与发送。语音与图像的采集由硬件采集卡进行,我们程序只需初始化该硬件采集卡,然后实时读取采集数据即可,但语音和图像数据的编解码以及码流数据的传输都必须由程序去协调执行,让CPU轮流为各个事件服务,决不能在某一件事件上处理过长。Windows 95下的线程正是满足这种要求的编程技术。</p><p>本文给出了利用Windows 95环境下用多线程编程技术实现的基于TCP/IP的可视电话的部分源码,其中包括主窗口过程函数以及主叫端与被叫端的TCP/IP接收线程函数和语音编解码的线程函数。由于图像编解码的实时性比语音处理与传输模块的实时性的要求要低些,所以以语音编解码为事件去查图像数据,然后进行图像编解码,而没有为图像编解码去单独实现一个线程。</p><p>在主窗口初始化时,用CREATE_SUSPENDED标志创建了两个线程hThreadG7231和hThreadT CPRev。一个用于语音编解码,它的线程函数为G723Proc,该线程不断查询本地有无编好码的语音和图像的码流,如有,则进行H.223打包,然后通过TCP的端口发送给对方。另外一个线程用于TCP/IP的接收,它的线程函数为AcceptThreadProcRiv,该线程不断侦测TCP/IP端口有无对方传来的码流,如有,就接收码流,进行H.223解码后送入相应的缓冲区。该缓冲区的内容, 由语音编解码线程G723Proc查询,并送入相应的解码器,由于使用了多线程的编程技术,使得操作系统定时去服务语音编解码模块和传输模块,从而保证了通信的不中断。</p>`,38),o=[t];function c(i,n){return a(),d("div",null,o)}const T=e(h,[["render",c],["__file","pts18.html.vue"]]);export{T as default};
