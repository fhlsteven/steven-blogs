import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="编程高手箴言》读后-3" tabindex="-1"><a class="header-anchor" href="#编程高手箴言》读后-3" aria-hidden="true">#</a> 编程高手箴言》读后 #3</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>seacloud（原作）
关键字     编程高手
</code></pre></div><p>毕业也有几年了，也看了和学了不少东西。有时也想写点什么，但总是觉得头绪很多，一直没有动笔。最近翻了翻梁先生的《编程高手箴言》，突然想写点什么，权且用读书笔记的形式写点东西。等号上面的摘字《箴言》，下面则是笔者自己的感想。希望大家指教，但是谩骂就不必了，谢谢。</p><p>注：这一部分涉及《箴言》第三章。</p><hr><p>所有的消息队列看上去是放在USER32的模块内，但是每个应用程序自己有一个USER32，因为每个应用程序的内存都是从4000000B开始的，这样，每个GetMessage和PeekMessage都在处理事件。实际上，每个GetMessage都会成为一个WaitsingleMessage，当有事件来后，就直接进行处理，也不用做什么调度。</p><p><code>===========================================</code></p><p>是不是每个程序都有一个USER32，我觉得有可能不是这样，因为我用win32Dasm反汇编了一个Win32 Console程序，并没有发现从USER32.dll里引入任何函数调用。当然，是不是在运行期系统把USER32.dll映射进了程序的地址空间，我不是很有把握。至于《箴言》的说法是每个程序的内存都是从400000B开始所以就都有USER32，我也想不出是什么因果关系。</p><p>事实上，GetMessage或者PeekMessage并不是在处理消息，而是负责将消息从当前线程的消息队列里取出消息，调用TranslateMessage处理后，再调用DispatchMessage将消息发送到相应的窗口处理程序。</p><p>之所以不需要应用程序做消息的调度不是因为消息不需要调度，而是系统在内部做了诸如同步、调度等操作。举个例子，当你调用SendMessage的时候，如果当前线程就是创建窗口的线程，那么SendMessage就会直接调用窗口函数来处理消息，如果不属于同一个线程，那么系统就会挂起当前线程，知道目标线程处理完被发送的消息后，当前线程的SendMessage调用才会返回。</p><p>由此看出，系统在幕后为了支撑消息系统做了很多努力，从而简化了应用程序的编写。</p><p>并且，窗口处理函数是可重入的，在文章的最后部分，我会举个典型的Win32程序来说明这些问题。</p><hr><p>应为自己完成自己的消息处理，每个程序都是独立的，所以要用底层内核来实现页面的切换。</p><p><code>===========================================</code></p><p>呵呵，我怎么都看不出这其中有什么因果关系。程序的独立性是必然的，这也是现代操作系统的基本特点之一。至于这种独立性是不是要通过CPU分页机制来实现，这也未必。只启用CPU的分段功能，应该也可以实现进程的独立性了。</p><p>页面切换是不是要在内核实现呢，这也是不需要解释的事情，页面切换涉及的指令大多是一些特权指令，如果在应用程序里可以执行这些指令的话，那么操作系统和应用程序相比就没有特权了，应用程序想要整垮操作系统就轻而易举了，就像昔日的DOS那样。</p><hr><p>当某一程序切入时，其他程序就会被切出。当切换出去时，整个消息队列也就切换出去了。</p><p>所以，整个消息的处理就很简单了。</p><p><code>===========================================</code></p><p>这一段实在是不清楚，不知道所谓的“切入”、“切出”是什么意思。也看不出所描述的因果关系指什么。应用程序消息处理的简单化主要是应为USER32.dll在幕后做了很多的事情，具体的说明大家可以在《Programming Applications for Microsoft Windows》一书里找到答案。</p><p>在这本书里，大家可以看到系统在幕后的一些工作。</p><p>注：老实说，Microsoft实在是麻烦，什么东西都是遮遮掩掩的。给段代码不就什么都OK了吗？</p><p>或者实在不行，出份详细的文档也可以啊。可偏偏MSDN里很多文档也是含含糊糊的。稍微想知道的多一点就要用调试器自己摸了，就一个字，“累”啊。呵呵，当然了，现在有很多大牛都在网上公布了自己的研究结果了，造福后来人啊:-)</p><p>记得当初第一次碰Linux的时候，感觉实在是好。几乎什么都有源代码，感觉在上面开发东西郁闷的时间远远少于在Windows上做开发。</p><p>我想，什么时候不用再出诸如《Undocumented DOS Secretes》、《UnDocumented WinNT Secretes》之类的书的话，广大同行们幸福的日子就来到了:-)</p><p>记得在WinXP DDK发布之前，国内外网站上关于如何有Intermedia Driver写一个虚拟网卡的问题讨论的很多，并且好像一直都没有一个圆满的方案。等到XP DDK出来后，里面带了一个例子，一下子就解决了所有问题。难道网上的这么多程序员都不如Microsoft聪明？！还好MFC是给源代码的，我想如果当初没给源代码，那广大的Visual C++的程序员还不知道要被Microsoft怎么折磨呢！</p><hr><p>从MSG的结构可以看出，每个消息都是对应一个窗口的。USER模块是管理窗口的，一般每个窗口自己有一个消息队列。...... 当程序设计中用SendMessage来发送消息时，就会明确指定窗口句柄，当运行此函数后，就会把消息放到此窗口的消息队列中。</p><p><code>===========================================</code></p><p>从MSG的结构来看，似乎应该每个消息都应该对应一个窗口。然而，MSG的结构中和窗口有关的HWND hwnd可以为0啊。再说另一个和消息有关的函数PostThreadMessage并没有要求一个窗口句柄，而是一个线程句柄。实际上，消息队列应该是属于线程的，而不是窗口的。</p><p>SendMessage一个很重要的特性是它不是简单的将消息送到消息队列里去，按照MSDN的说法，If the specified window was created by the calling thread, the window procedure is called immediately as a subroutine.If the specified window was created by a different thread, the system switches to that thread and calls the appropriate window procedure.</p><p>根据SendMessage的这个特性，有可能调用SendMessage的线程永远进入挂起状态了。具体的例子大家参考《Programming Applications for Microsoft Windows》，这本书里面还介绍另外几个函数，比如SendMessageTimeout，InSendMessage之类的，大家也可以直接参考MSDN。</p><p>下面贴出的代码是用VC的向导生成的，《箴言》在消息循环一节中只给出了窗口处理函数的代码，可能是为了节约纸张，给大家省钱，网上嘛，我就多贴一点了，呵呵。</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;stdafx.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;resource.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MAX_LOADSTRING</span> <span class="token expression"><span class="token number">100</span></span></span>

<span class="token comment">// Global Variables:</span>
HINSTANCE hInst<span class="token punctuation">;</span>   <span class="token comment">// current instance</span>
TCHAR szTitle<span class="token punctuation">[</span>MAX_LOADSTRING<span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// The title bar text</span>
TCHAR szWindowClass<span class="token punctuation">[</span>MAX_LOADSTRING<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// The title bar text</span>

<span class="token comment">// Foward declarations of functions included in this code module:</span>
ATOM    <span class="token function">MyRegisterClass</span><span class="token punctuation">(</span>HINSTANCE hInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>
BOOL    <span class="token function">InitInstance</span><span class="token punctuation">(</span>HINSTANCE<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
LRESULT CALLBACK <span class="token function">WndProc</span><span class="token punctuation">(</span>HWND<span class="token punctuation">,</span> UINT<span class="token punctuation">,</span> WPARAM<span class="token punctuation">,</span> LPARAM<span class="token punctuation">)</span><span class="token punctuation">;</span>
LRESULT CALLBACK <span class="token function">About</span><span class="token punctuation">(</span>HWND<span class="token punctuation">,</span> UINT<span class="token punctuation">,</span> WPARAM<span class="token punctuation">,</span> LPARAM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> APIENTRY <span class="token function">WinMain</span><span class="token punctuation">(</span>HINSTANCE hInstance<span class="token punctuation">,</span>
                     HINSTANCE hPrevInstance<span class="token punctuation">,</span>
                     LPSTR     lpCmdLine<span class="token punctuation">,</span>
                     <span class="token keyword">int</span>       nCmdShow<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// TODO: Place code here.</span>
 MSG msg<span class="token punctuation">;</span>
 HACCEL hAccelTable<span class="token punctuation">;</span>
 <span class="token keyword">char</span> str<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
 <span class="token keyword">static</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

 <span class="token comment">// Initialize global strings</span>
 <span class="token function">LoadString</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> IDS_APP_TITLE<span class="token punctuation">,</span> szTitle<span class="token punctuation">,</span> MAX_LOADSTRING<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">LoadString</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> IDC_TEST<span class="token punctuation">,</span> szWindowClass<span class="token punctuation">,</span> MAX_LOADSTRING<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token function">MyRegisterClass</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token comment">// Perform application initialization:</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">InitInstance</span> <span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> nCmdShow<span class="token punctuation">)</span><span class="token punctuation">)</span> 
 <span class="token punctuation">{</span>
  <span class="token keyword">return</span> FALSE<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 hAccelTable <span class="token operator">=</span> <span class="token function">LoadAccelerators</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDC_TESTA<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token comment">// Main message loop:</span>
 <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
 <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">TranslateAccelerator</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>hwnd<span class="token punctuation">,</span> hAccelTable<span class="token punctuation">,</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span> 
  <span class="token punctuation">{</span>
   <span class="token function">TranslateMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">DispatchMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>

 <span class="token keyword">return</span> msg<span class="token punctuation">.</span>wParam<span class="token punctuation">;</span>
<span class="token punctuation">}</span>



<span class="token comment">//</span>
<span class="token comment">//  FUNCTION: MyRegisterClass()</span>
<span class="token comment">//</span>
<span class="token comment">//  PURPOSE: Registers the window class.</span>
<span class="token comment">//</span>
<span class="token comment">//  COMMENTS:</span>
<span class="token comment">//</span>
<span class="token comment">//    This function and its usage is only necessary if you want this code</span>
<span class="token comment">//    to be compatible with Win32 systems prior to the &#39;RegisterClassEx&#39;</span>
<span class="token comment">//    function that was added to Windows 95. It is important to call this function</span>
<span class="token comment">//    so that the application will get &#39;well formed&#39; small icons associated</span>
<span class="token comment">//    with it.</span>
<span class="token comment">//</span>
ATOM <span class="token function">MyRegisterClass</span><span class="token punctuation">(</span>HINSTANCE hInstance<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 WNDCLASSEX wcex<span class="token punctuation">;</span>

 wcex<span class="token punctuation">.</span>cbSize <span class="token operator">=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>WNDCLASSEX<span class="token punctuation">)</span><span class="token punctuation">;</span> 

 wcex<span class="token punctuation">.</span>style   <span class="token operator">=</span> CS_HREDRAW <span class="token operator">|</span> CS_VREDRAW<span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>lpfnWndProc <span class="token operator">=</span> <span class="token punctuation">(</span>WNDPROC<span class="token punctuation">)</span>WndProc<span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>cbClsExtra  <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>cbWndExtra  <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>hInstance  <span class="token operator">=</span> hInstance<span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>hIcon   <span class="token operator">=</span> <span class="token function">LoadIcon</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDI_TEST<span class="token punctuation">)</span><span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>hCursor  <span class="token operator">=</span> <span class="token function">LoadCursor</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> IDC_ARROW<span class="token punctuation">)</span><span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>hbrBackground <span class="token operator">=</span> <span class="token punctuation">(</span>HBRUSH<span class="token punctuation">)</span><span class="token punctuation">(</span>COLOR_WINDOW<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>lpszMenuName <span class="token operator">=</span> <span class="token punctuation">(</span>LPCSTR<span class="token punctuation">)</span>IDC_TEST<span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>lpszClassName <span class="token operator">=</span> szWindowClass<span class="token punctuation">;</span>
 wcex<span class="token punctuation">.</span>hIconSm  <span class="token operator">=</span> <span class="token function">LoadIcon</span><span class="token punctuation">(</span>wcex<span class="token punctuation">.</span>hInstance<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDI_SMALL<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token keyword">return</span> <span class="token function">RegisterClassEx</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wcex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">//   FUNCTION: InitInstance(HANDLE, int)</span>
<span class="token comment">//</span>
<span class="token comment">//   PURPOSE: Saves instance handle and creates main window</span>
<span class="token comment">//</span>
<span class="token comment">//   COMMENTS:</span>
<span class="token comment">//</span>
<span class="token comment">//        In this function, we save the instance handle in a global variable and</span>
<span class="token comment">//        create and display the main program window.</span>
<span class="token comment">//</span>
BOOL <span class="token function">InitInstance</span><span class="token punctuation">(</span>HINSTANCE hInstance<span class="token punctuation">,</span> <span class="token keyword">int</span> nCmdShow<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   HWND hWnd<span class="token punctuation">;</span>

   hInst <span class="token operator">=</span> hInstance<span class="token punctuation">;</span> <span class="token comment">// Store instance handle in our global variable</span>

   hWnd <span class="token operator">=</span> <span class="token function">CreateWindow</span><span class="token punctuation">(</span>szWindowClass<span class="token punctuation">,</span> szTitle<span class="token punctuation">,</span> WS_OVERLAPPEDWINDOW<span class="token punctuation">,</span>
      CW_USEDEFAULT<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> CW_USEDEFAULT<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> hInstance<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hWnd<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">return</span> FALSE<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token function">ShowWindow</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> nCmdShow<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">UpdateWindow</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">//  FUNCTION: WndProc(HWND, unsigned, WORD, LONG)</span>
<span class="token comment">//</span>
<span class="token comment">//  PURPOSE:  Processes messages for the main window.</span>
<span class="token comment">//</span>
<span class="token comment">//  WM_COMMAND - process the application menu</span>
<span class="token comment">//  WM_PAINT - Paint the main window</span>
<span class="token comment">//  WM_DESTROY - post a quit message and return</span>
<span class="token comment">//</span>
<span class="token comment">//</span>
LRESULT CALLBACK <span class="token function">WndProc</span><span class="token punctuation">(</span>HWND hWnd<span class="token punctuation">,</span> UINT message<span class="token punctuation">,</span> WPARAM wParam<span class="token punctuation">,</span> LPARAM lParam<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token keyword">int</span> wmId<span class="token punctuation">,</span> wmEvent<span class="token punctuation">;</span>
 PAINTSTRUCT ps<span class="token punctuation">;</span>
 HDC hdc<span class="token punctuation">;</span>
 TCHAR szHello<span class="token punctuation">[</span>MAX_LOADSTRING<span class="token punctuation">]</span><span class="token punctuation">;</span>
 <span class="token function">LoadString</span><span class="token punctuation">(</span>hInst<span class="token punctuation">,</span> IDS_HELLO<span class="token punctuation">,</span> szHello<span class="token punctuation">,</span> MAX_LOADSTRING<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token keyword">static</span> <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token keyword">char</span> str<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

 <span class="token keyword">switch</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span> 
 <span class="token punctuation">{</span>
  <span class="token keyword">case</span> WM_COMMAND<span class="token operator">:</span>
   wmId    <span class="token operator">=</span> <span class="token function">LOWORD</span><span class="token punctuation">(</span>wParam<span class="token punctuation">)</span><span class="token punctuation">;</span> 
   wmEvent <span class="token operator">=</span> <span class="token function">HIWORD</span><span class="token punctuation">(</span>wParam<span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token comment">// Parse the menu selections:</span>
   <span class="token keyword">switch</span> <span class="token punctuation">(</span>wmId<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
    <span class="token keyword">case</span> IDM_ABOUT<span class="token operator">:</span>
       <span class="token function">DialogBox</span><span class="token punctuation">(</span>hInst<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDD_ABOUTBOX<span class="token punctuation">,</span> hWnd<span class="token punctuation">,</span> <span class="token punctuation">(</span>DLGPROC<span class="token punctuation">)</span>About<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> IDM_EXIT<span class="token operator">:</span>
       <span class="token function">DestroyWindow</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
       <span class="token keyword">return</span> <span class="token function">DefWindowProc</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> message<span class="token punctuation">,</span> wParam<span class="token punctuation">,</span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token keyword">case</span> WM_PAINT<span class="token operator">:</span>
   hdc <span class="token operator">=</span> <span class="token function">BeginPaint</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ps<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// TODO: Add any drawing code here...</span>
   RECT rt<span class="token punctuation">;</span>
   <span class="token function">GetClientRect</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>rt<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">DrawText</span><span class="token punctuation">(</span>hdc<span class="token punctuation">,</span> szHello<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>szHello<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>rt<span class="token punctuation">,</span> DT_CENTER<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">EndPaint</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ps<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token keyword">case</span> WM_DESTROY<span class="token operator">:</span>
   <span class="token function">PostQuitMessage</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token keyword">default</span><span class="token operator">:</span>
   <span class="token keyword">return</span> <span class="token function">DefWindowProc</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> message<span class="token punctuation">,</span> wParam<span class="token punctuation">,</span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Mesage handler for about box.</span>
LRESULT CALLBACK <span class="token function">About</span><span class="token punctuation">(</span>HWND hDlg<span class="token punctuation">,</span> UINT message<span class="token punctuation">,</span> WPARAM wParam<span class="token punctuation">,</span> LPARAM lParam<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token keyword">switch</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
  <span class="token keyword">case</span> WM_INITDIALOG<span class="token operator">:</span>
    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>

  <span class="token keyword">case</span> WM_COMMAND<span class="token operator">:</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">LOWORD</span><span class="token punctuation">(</span>wParam<span class="token punctuation">)</span> <span class="token operator">==</span> IDOK <span class="token operator">||</span> <span class="token function">LOWORD</span><span class="token punctuation">(</span>wParam<span class="token punctuation">)</span> <span class="token operator">==</span> IDCANCEL<span class="token punctuation">)</span> 
   <span class="token punctuation">{</span>
    <span class="token function">EndDialog</span><span class="token punctuation">(</span>hDlg<span class="token punctuation">,</span> <span class="token function">LOWORD</span><span class="token punctuation">(</span>wParam<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
    <span class="token keyword">return</span> FALSE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一个普通Win32 GUI程序，你只要不去关它，它就总是存在。显然，这里需要一个类似循环的东西存在，来保证我们的程序总是在运行。看看代码第43行开始的几行：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">TranslateAccelerator</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>hwnd<span class="token punctuation">,</span> hAccelTable<span class="token punctuation">,</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span> 
 <span class="token punctuation">{</span>
  <span class="token function">TranslateMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">DispatchMessage</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>呵呵，我们找到这个循环了，就是这短短的8行代码，保持了我们的程序在系统里存在，一旦这个循环被打破了，那么我们的程序就推出了。至于怎么才能打破这个循环，去看看 GetMessage 的说明就一清二楚了。(注：在普通的Win32程序里，大致可以认为WinMain就是程序的入口点)</p><p>这8行的含义就是不断的从系统里取消息，拿到后再调用系统的服务处理后发给相应的窗口过程。</p><p>这个过程循环进行，直到推出程序。这就是所谓“消息循环”名字的由来。</p><p>那么窗口过程在哪里呢？好，我们看看我们创建的窗口的属性吧，从76行开始：</p><div class="language-c" data-ext="c"><pre class="language-c"><code>wcex<span class="token punctuation">.</span>style   <span class="token operator">=</span> CS_HREDRAW <span class="token operator">|</span> CS_VREDRAW<span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>lpfnWndProc <span class="token operator">=</span> <span class="token punctuation">(</span>WNDPROC<span class="token punctuation">)</span>WndProc<span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>cbClsExtra  <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>cbWndExtra  <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>hInstance  <span class="token operator">=</span> hInstance<span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>hIcon   <span class="token operator">=</span> <span class="token function">LoadIcon</span><span class="token punctuation">(</span>hInstance<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDI_TEST<span class="token punctuation">)</span><span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>hCursor  <span class="token operator">=</span> <span class="token function">LoadCursor</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> IDC_ARROW<span class="token punctuation">)</span><span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>hbrBackground <span class="token operator">=</span> <span class="token punctuation">(</span>HBRUSH<span class="token punctuation">)</span><span class="token punctuation">(</span>COLOR_WINDOW<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>lpszMenuName <span class="token operator">=</span> <span class="token punctuation">(</span>LPCSTR<span class="token punctuation">)</span>IDC_TEST<span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>lpszClassName <span class="token operator">=</span> szWindowClass<span class="token punctuation">;</span>
wcex<span class="token punctuation">.</span>hIconSm  <span class="token operator">=</span> <span class="token function">LoadIcon</span><span class="token punctuation">(</span>wcex<span class="token punctuation">.</span>hInstance<span class="token punctuation">,</span> <span class="token punctuation">(</span>LPCTSTR<span class="token punctuation">)</span>IDI_SMALL<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>其他我们暂时先不关心，看看第77行，lpfnWndProc是什么？根据匈牙利命名法，这是个函数指针！ 而(WNDPROC)WndProc就是我们定义的一个函数(第131行)。于是明白了，我们定义的一个函数被保存在窗口结构里传给系统了。再扫描一下前面列的程序，发现(WNDPROC)WndProc并没有被调用！这是怎么回事？原来系统是这样告诉我们的：有个函数你(应用程序)给我定义并实现一下，告诉我，然后你就别管了，我(系统)会根据情况来调用。所以，本质上讲，窗口函数只是系统定义的一个回调函数而已。大家要习惯这种回调函数，在Windows的很多地方都会定义类似的回调函数让你实现的。</p><p>以前在用Win32 API直接编程的时候，通常会在(WNDPROC)WndProc看到一个巨大switch/case结构，在这个巨大的结构里完成所感兴趣的消息的处理。那么到底有那些消息呢？查MSDN固然可以，但我是用Visual C++带的工具，Spy++来看的。当你在Spy++里用Ctrl+M打开Message Log窗口后，就可以在第二个tab页里看到几乎所有公开的消息了，并且是分了类的。推荐大家去浏览一下，不求记住，但最好有个大致的印象，尤其是用Visual C++编程的同志。</p><p>前面我们说到窗口过程是可以重入的，怎么证明？就用上面列的程序来说明。首先对上面的程序说明一下。上面的程序使用VC的向导生成的一个标准的“Win32 Application”，运行的结果是在一个窗口里打印楚“Hello World”。在菜单里选择Help/About...，会弹出一个“关于窗口”。</p><p>看看第151行，这里会弹出“关于窗口”，并且 DialogBox这个函数在弹出窗口没关闭前是不会返回的。我们在菜单里选择“关于”后，就可以弹出这个对话框，现在拖着这个对话框在我们的主程序窗口里移动，我们就会发现这个窗口从被盖住的Hello World上移开后Hello World会重新出现。</p><p>这说明了什么问题？在回答这个问题前有几点说明：</p><ol><li>在我们的程序里，只有在响应WM_PAINT的时候会绘制&quot;Hello World&quot;字符串。</li><li>系统不会替我们保存窗口客户区的内容，系统客户区的内容全部要我们自己绘制，也就是说当覆盖&quot;Hello World&quot;的窗口移走后新出现的&quot;Hello World&quot;还是我们自己画的，而这段绘制代码只有在WM_PAINT的相应函数里才有。</li></ol><p>OK，综合上面两点，在“关于窗口”活动期间，显然我们程序是在第151行，而重绘窗口的代码是在165行，这只有一个解释：(WNDPROC)WndProc在返回前(也就是DialogBox返回前)，(WNDPROC)WndProc又被系统调用了用来处理WM_PAINT。也就是说DispatchMessage会导致(WNDPROC)WndProc的调用，系统在必要的时候也会调用(WNDPROC)WndProc，并且这两者的调用是异步进行的。所以有时候程序出现异常情况说不定就和这个有关。呵呵，不过这个情况我还没有遇到过。</p><p>对了，大家可以看看hInstance的值，是0x400000，和前面说得程序起始地址一样，呵呵，难道是巧合吗，大家可以研究一下。</p><p>另外补上一句，函数About是“关于窗口”的窗口函数，它是在DialogBox函数里传递给系统的。</p><hr><p>GDI和DirectDraw的关系</p><p><code>===========================================</code></p><p>本来以为《箴言》会指出两者在底层的实现上的关系，谁知道看完后才知道等于什么都没有看到。《箴言》只是简单的介绍了(其实都谈不上是介绍)DirectDraw，然后给出了一个24位图到16位图的转换程序。</p><p>其实，GDI显然在DirectDraw之前出现的，而DirectDraw是Microsoft为了便于游戏，多媒体等需要快速访问显示设备而定义的一个软/硬件的规范。好像在最新的DirectX SDK里，DirectDraw已经被合到DirectShow中去了。</p><p>《箴言》中提到的双缓冲技术是很重要的，DirectX直接支持显示缓冲的切换，我们在用GDI或者诸如JavaAWT这些慢速的方法绘制动画的时候就更需要这种技术了，否则就会出现讨厌的屏幕闪烁现象。在我们设计自己的比较大的(外观比较大)控件的时候，有两个原则就特别重要，一是尽量只更新需要更新的区域，另外就是双缓冲了。</p><hr><p>一个线程就是一个执行程序的事例。线程允许一个程序同时在多于一个地方运行，这有些像多个CPU，每一个CPU执行程序的一部分。在单处理器系统中，只有同时处理才出现线程。</p><p><code>===========================================</code></p><p>线程应该是应用程序里的一个执行序列，而Windows在用CreateThread创建线程的时候，最重要的一个参数就是“Start Address”，这其实被定义为一个函数指针，原型是DWORD WINAPI ThreadProc(LPVOID lpParameter)。</p><p>在多处理器机器中，理想的情况下，每个线程都在一个独立的CPU上运行，而在单处理器系统里，操作系统通过给每个线程一个运行时间片来模拟所谓的“同时运行”。但是这种“同时”是宏观上看起来的表现，实际上在某个特定的时刻只有一个线程在运行，这与多处理器的机器是不同的。在多处理器的机器上，有人就建议一个程序开的线程数量最多不要超过CPU的数量，应为系统在一个CPU上模拟多线程是要付出不小的开销的。</p><p>有一点特别重要，单处理器机上，一个线程除非是自己要求挂起自己的，否则不能假设自己会在什么时候被切换出去。</p><hr><p>不，每一个线程本身没有SS寄存器和相互依存，实际上，每一个线程在本身所在进程的地址空间内部有一个地址空间。</p><p><code>===========================================</code></p><p>《箴言》中这句话不知道如何理解。但是，每个线程拥有独立的堆栈显然是无比重要的，这是线程机制能够实现的基本要求之一。按照 尤晋元、史美林等编著的《Windows操作系统原理》中的论述，每个线程都和其相联系的进程共享地址空间，线程之间的通讯也及其直接，通过带锁的全局变量就可以安全的进行了。</p><hr><p>线程于GDI的冲突：死机的主要原因。</p><p><code>===========================================</code></p><p>对于这个论题，我写了个程序测试了一下，把结果给大家说说。程序是一个用VC向导生成的基于对话框的程序。然后程序生成11个线程，每个线程都一样，用对话框窗口的DC随机画直线，每个线程的两次循环里随机Sleep一个小时间片，其值是10毫秒到30毫秒之间。这个程序我运行了大概有10分钟，并且一直有其他程序窗口在对话框上移动。结果是并没有出现《箴言》中所说的死锁的情况。</p><p>如果大家有像《箴言》中那样出现死锁的程序，请发一份给我，谢谢:-)</p><hr><p>当线程用到C的标准库的时候，很容易导致冲突。</p><p><code>===========================================</code></p><p>最原始的C标准库是不支持多线程的，其中最重要的原因就是C库里有全局变量。典型的就是这个表示错误号的errno，你想想，在多线程的环境里，大家都调C库，而errno是个全局变量，那么一旦错误发生，那么errno属于哪个线程呢？这个时候就必须链接C库的多线程版本了。所以应该是当线程用到单线程的C标准库时很容易导致冲突。</p><hr><p>当用_beginThread来创建，而用CloseHandle来关闭线程时，这些复制的全局结构就不会释放，这就有了内存泄漏。</p><p><code>===========================================</code></p><p>其实，一个正确的程序不会出现上面的情况，否则只能说明还没搞明白多线程的程序怎么写。为什么这么说呢？你如果在标准的C环境里，就用_beginthread好了，然而文档清清楚楚的说明了这个时候要用_endthread来结束线程，你如果用CloseHandle只能说明你是自作聪明了。在VC/MFC环境里，我就直接AfxBeginThread或者直接用CWinThread了，这样也同样没有问题。</p><p>其实看看VC带的CRT源码：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * Allocate and initialize a per-thread data structure for the to-
 * be-created thread.
 */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span>ptd <span class="token operator">=</span> <span class="token function">_calloc_crt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">_tiddata</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
        <span class="token keyword">goto</span> error_return<span class="token punctuation">;</span>
</code></pre></div><p>一切都是这个<code>_calloc_crt</code>引起的，不过话说回来，你按照规则走就不会出问题。</p><hr><p>还有一种线程根本不会退出，它一直运行着循环的线程。</p><p><code>===========================================</code></p><p>这里好像容易引起误解，其实线程就一种，至于你让不让它结束，何时让它结束，完全是程序员自己的事。这句话可能会给新手同志误解，还是说明一下了。</p><hr><p>一个KERNEL32句柄只在进程自身内部有效，企图将一个进程柄用于另一个进程是没有意义的。</p><p><code>===========================================</code></p><p>这句话不太准确，一些全局唯一的句柄，比如Process Handle，完全可以被别的进程使用。</p><p>假如进程B知道了进程A的句柄，而且在权限允许的情况下，就可以用TerminateProcess来结束A线程。</p><hr><p>一个真正的Win32程序不会耗尽CPU时间等待某些时间发生。</p><p><code>===========================================</code></p><p>事实上，Win32系统里应用程序不会耗尽CPU时间的，因为现在的Windows不会象过去那样等待一个程序让出控制权，而是可以主动的剥夺一个程序的CPU时间片，只要是操作系统认为应该的时刻。你完全可以让你的程序 <code>while (1);</code> 而这个时候你的Winamp还会给你放mp3的，不会有任何停顿。但是通常我们不会用一个循环去不停的检测某个标志，尤其在消息处理函数里要避免这种做法，因为消息处理函数的停顿在外观上的表现就是你的程序“失去响应”。解决办法可以是开个线程去循环或者用event之类的notify机制。</p><p><strong>作者相关文章</strong>：</p><ul><li><a href="./skill7">《编程高手箴言》读后 #4(原作)</a></li><li><a href="./skill5">《编程高手箴言》读后 #2(原作)</a></li><li><a href="./skill4">《编程高手箴言》读后 #1(原作)</a></li></ul><p>其它相关文章：</p><ul><li><a href="./skill8">我也瞎谈编程高手箴言(原作)</a></li></ul><hr><hr><h2 id="对该文的评论-人气-6106" tabindex="-1"><a class="header-anchor" href="#对该文的评论-人气-6106" aria-hidden="true">#</a> 对该文的评论 人气：6106</h2><p>linyudie(2004-1-8 21:27:55)</p><blockquote><p>不好意思啊，刚才有些地方看错了楼主的意思，颇有腹诽，对不起了<br><br> 再看全文之后，觉得梁先生没有什么大错，不过表述不大清楚倒是真的，差不多和我的看错意思可相辉映了:-)</p></blockquote><p>linyudie(2004-1-8 21:12:25)</p><blockquote><p>我对楼主说的似乎有点不赞成!!!( 不过我并没有看过这本书，甚至楼主的文章也没有完全的看过来，仅就几个片断来说，有不当的地方，还请楼主以及大家原谅)<br><br> “是不是每个程序都有一个USER32，我觉得有可能不是这样，因为我用win32Dasm反汇编了一个Win32 Console程序，并没有发现从USER32.dll里引入任何函数调用。”<br> “应为自己完成自己的消息处理，每个程序都是独立的，所以要用底层内核来实现页面的切换。”<br><br> 这些没有说错啊，不过说每个“程序”也许是不大合适，要是说每个进程就没有问题了吧，我没有看过楼主说的梁先生那本《。。编程高手》，但是我想梁兄本来的意思应该是指进程的，对每个进程而言，确实都是独立的一套的，不过高端的内存空间是作为内核的使用区的，楼主仅理解成应用程序部分是不合适的啊，你反编译的工作来看是不是有user32的加载，是没有用的，因为那个是内核的一部分，就像你不会通过反编译找到ntoskrnl.exe的加载一样，在进程建立时就已经加载了。application的代码是被装入到地址空间的某一个部分，在内核的支持下工作，它本身并不是执行动作的全部。</p></blockquote><p>robin97(2004-1-8 11:45:30)</p><blockquote><p>没心情看</p></blockquote><p>kbsoft(2004-1-7 14:17:10)</p><blockquote><p>mark</p></blockquote><p>deverxp(2004-1-7 11:55:22)</p><blockquote><p>to samlet：<br> 你说楼主是高手，很明显你是个根本不懂windows编程的人，应该说连个屁都不懂，楼住抄得实在是基础的不能再基础的东西，只要稍微有点windows编程基础的人都知道，我劝你还是好好的看看&lt;&lt;windows程序设计&gt;&gt;这本书吧，你就会发现自己今天所说的话有多么的丢脸。</p></blockquote><p>deverxp(2004-1-7 11:50:18)</p><blockquote><p>to samlet:<br> 高手个屁，高手的读后感难道只是发牢骚，只会抄书吗，如果这就是你所为的高手，那我想告诉你，这样的高手不是我心目中的高手。我所谓的高手是对某些知识的扩展认识，而不是照抄+牢骚</p></blockquote><p>mlx198507(2004-1-7 10:59:24)</p><blockquote><p>啊是啊<br> 你那么的有思想的话为什么不自己去谈谈自己的看法呢为什么还要抄袭别人的言论呢<br> I悲哀啊</p></blockquote><p>samlet(2004-1-7 10:50:48)</p><blockquote><p>to deverxp:<br> 你懂什么，如果说高手的话，楼主才是真正的高手，老梁充其量只算个熟练工而已。<br><br> 非常感谢楼主的后两篇文章，给我的启发很大，（你的第一篇也是我想说的话，😃）。前两篇文章我都在后面回了贴（可惜每次输入了一半的时候都被打扰，结果都没回上，呵呵），我在刚上大学时，就已经是校里出名的程序天才，当时我的计算机教授都向我请教C++的问题，因为他只有C和汇编比较强。但是学程序日久，越觉得天外有天，人外有外，特别是现在这个开放源码和网洛沟通的时代，让我见识到越来越多的高手（楼主就是其中一个）。现在毕业也有几年了，真是觉得编程这方面的技术是无止境的，达到高手境界的人不只是编代码熟练就可以的。我比较喜欢的大师Kent Beck就是孜孜不</p></blockquote><p>coolksj(2004-1-7 10:16:07)</p><blockquote><p>说实话,老梁蛮自大的,有点夸张...这种人,我不喜欢</p></blockquote><p>deverxp(2004-1-7 9:58:46)</p><blockquote><p>人家想看你的读书体会，而不是你的牢骚</p></blockquote><p>deverxp(2004-1-7 9:55:45)</p><blockquote><p>抄书+自己一些肤浅的评论的话，<br> 这样的文章都拿上来，真是丢脸。<br> 比如这段，没有深度。没有见解，只有牢骚。好个屁，垃圾文章，以后希望发泄有深度理解的东西上来。<br><br> 注：老实说，Microsoft实在是麻烦，什么东西都是遮遮掩掩的。给段代码不就什么都OK了吗？<br> 或者实在不行，出份详细的文档也可以啊。可偏偏MSDN里很多文档也是含含糊糊的。稍微想知道的多一点就要用调试器自己摸了，就一个字，“累”啊。呵呵，当然了，现在有很多大牛都在网上公布了自己的研究结果了，造福后来人啊:-)<br> 记得当初第一次碰Linux的时候，感觉实在是好。几乎什么都有源代码，感觉在上面开发东西郁闷的时间远远少于在Windows上做开发。<br> 我想，什么时候不用再出诸如《Undocumented DOS Secretes》、《UnDocumented WinNT Secretes》之类的书的话，广大同行们幸福的日子就来到了:-)<br> 记得在WinXP DDK发布之前，国内外网站上关于如何有Intermedia Driver写一个虚拟网卡的问题讨论的很多，并且好像一直都没有一个圆满的方案。等到XP DDK出来后，里面带了一个例子，一下子就解决了所有问题。难道网上的这么多程序员都不如Microsoft聪明？！还好MFC是给源代码的，我想如果当初没给源代码，那广大的Visual C++的程序员还不知道要被Microsoft怎么折磨呢！</p></blockquote><p>chen3feng(2004-1-7 5:36:25)</p><blockquote><p>那位xinlnix怎么扯到gcc上面去了, 谁诬蔑gcc了来者? 开源社区的某些人心胸还不如普通的程序员开阔，说老实话，gcc生成的代码我也看过, gcc3.3.1生成的代码质量要低于VC7.1。这个跟感情无关。</p></blockquote><p>lsaturn(2004-1-6 21:44:45)</p><blockquote><p>支持</p></blockquote><p>huaboy(2004-1-6 13:30:37)</p><blockquote><p>我支持文章的作者，这样才可以更好的交流！让我们可以学的更好。出版社当然有他们自己的目的。</p></blockquote><p>xinlnix(2004-1-6 13:00:16)</p><blockquote><p>我不允许任何人污蔑GCC，gcc可能是我们这个星球上最好的编译器，前一段时间，Intel请中科院计算所为它们的64位CPU作编译器优化。据计算所说，Intel考察全球众多编译器研究机构，就中科院实力很突出（不知是否在吹。）中科院费了九牛二虎之力，在gcc的基础上将编译器的性能提高了4%，而大声宣扬获得重大技术进步，Intel十分满意。可见gcc的技术水平是多么出众。<br><br> 另据传，中科院为此据说要申请专利，Intel将研究成果集成到gcc中。<br><br> 虽然我一直用ms的东西，但我最敬佩、最欣赏的是gcc的开发人员，他们不是高手，而是大师。</p></blockquote><p>codecopier(2004-1-5 22:31:37)</p><blockquote><p>老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br> 老梁书看多了我会吐血的~~~~~~~~~<br><br></p></blockquote><p>michaelz2001(2004-1-4 15:53:38)</p><blockquote><p>乱</p></blockquote>`,138),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","skill6.html.vue"]]);export{i as default};
