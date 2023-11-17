import{_ as s,o as n,c as a,a as p}from"./app-a2b6e588.js";const t="/steven-blogs/assets/diag1_1-354ef1e3.png",e={},o=p(`<h1 id="制作一个winform的闪屏" tabindex="-1"><a class="header-anchor" href="#制作一个winform的闪屏" aria-hidden="true">#</a> 制作一个WinForm的闪屏</h1><blockquote><p>作者：痕迹</p></blockquote><h2 id="显示一个winforms闪屏-splash-screen" tabindex="-1"><a class="header-anchor" href="#显示一个winforms闪屏-splash-screen" aria-hidden="true">#</a> 显示一个WinForms闪屏（Splash Screen)</h2><p>我的应用程序需要一定的时间来启动。我想在应用程序继续加载时显示一个闪屏（就像Visual Studio .NET和Office应用程序那样）。工具箱中没有这样的控件。我该如何实现呢？</p><h3 id="a" tabindex="-1"><a class="header-anchor" href="#a" aria-hidden="true">#</a> A</h3><p>本专栏所附带的代码中包含了一个 SplashScreen类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SplashScreen</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">SplashScreen</span><span class="token punctuation">(</span><span class="token class-name">Bitmap</span> splash<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>SplashScreen的构造器可以将显示的位图作为参数。Close方法用来关闭闪屏。通常情况下，我们在处理窗体（form）的Load事件的方法中运用SplashScreen（在图1中可以看到形成的闪屏）：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnLoad</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Bitmap</span> splashImage<span class="token punctuation">;</span>
    splashImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Bitmap</span><span class="token punctuation">(</span><span class="token string">&quot;Splash.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">SplashScreen</span> splashScreen<span class="token punctuation">;</span>
    splashScreen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SplashScreen</span><span class="token punctuation">(</span>splashImage<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Do some lengthy operations, then:</span>
    splashScreen<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在关闭闪屏后，你必须激活窗体，将它放到最显著的位置。</p><p>你可以将任何位图作为一个闪屏。你也可以通过构建一个新的位图对象从BMP或JPG文件创建位图：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Bitmap</span> splashImage<span class="token punctuation">;</span>
splashImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Bitmap</span><span class="token punctuation">(</span><span class="token string">&quot;Splash.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>或者你也可以用从窗体资源加载的一个图片：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Resources</span><span class="token punctuation">;</span>

<span class="token class-name">ResourceManager</span> resources<span class="token punctuation">;</span>
resources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ResourceManager</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">MyForm</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Bitmap</span> splashImage<span class="token punctuation">;</span>
SplashImage <span class="token operator">=</span> <span class="token punctuation">(</span>Bitmap<span class="token punctuation">)</span><span class="token punctuation">(</span>resources<span class="token punctuation">.</span><span class="token function">GetObject</span><span class="token punctuation">(</span><span class="token string">&quot;SplashImage&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>要实现一个闪屏不只是我们所看到的这些内容。它可以依赖于一些很好的WinForms功能，而且它也涉及一些应用在其它WinForms环境中的有趣的设计问题。闪屏实际上是一个叫做SplashForm的WinForms窗体。你可以通过WinForms的可视设计窗口（ Visual Designer）充分利用所需要的变化，将一个缺省的窗体转换成一个闪屏——这就证明了WinForms不仅简单易用，而且还有很多功能。在这个例子中，我们添加了一个单独的控件——一个叫做m_SplashPictureBox的简单的图片框。</p><p>在编译的时候，我们并不知道闪屏图片的大小，因为它是一个runtime参数，但是图片框需要根据图片来调整大小。你可以通过将m_SplashPictureBox的SizeMode属性设置为AutoSize很容易地实现这一点。接下来，你必须将图片框定位到窗体的左上角。你可以通过将m_SplashPictureBox的Dock属性设置为Fill来实现它。这就会将图片框固定在左上角了。在运行时，它会向右下角扩展来填充窗体，因为大小模式被设置成了AutoSize。最后，将m_SplashPictureBox的Cursor属性设置为AppStarting(带有一个指示器的沙漏)，这样的话，如果用户将鼠标移动到闪屏上，他或她就会知道应用程序正在启动。</p><p><img src="`+t+`" alt="diag1_1"><br> 图2. 为闪屏窗体和图片框设置可视的属性</p><p>闪屏窗体不应该显示任何控制框按钮（关闭、最小化和最大化），它也不会有一个标题栏。我们可以通过可视设计窗口将SplashForm的ControlBox属性设置为False；这样就取消了控制框（control box）。可以在设计窗口中清除Text属性来删除标题栏。</p><p>下面我们来看闪屏的边界。它应该是一条单独的线——不是缺省的可调整的边界样式——所以我们应该将窗体的FormBorderStyle属性设置为FixedSingle。将TopMost属性设置为True，使闪屏总是在z-order（Windows在桌面显示窗口的顺序）的顶部。闪屏应该总是在屏幕的中心。幸运的是，我们可以将StartPosition属性设置为CenterScreen来实现这一点，WinForms会自动考虑窗口的大小，并将它居中。图2显示了SplashForm和m_SplashPictureBox的Properties窗口，总结了你需要设置的属性和新的值。</p><p>接下来，我们需要写一些代码来调整闪屏的大小。SplashForm的构造器可以将闪动的图片作为参数，并将它赋值给图片框的图片：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">SplashForm</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">PictureBox</span> m_SplashPictureBox<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">SplashForm</span><span class="token punctuation">(</span><span class="token class-name">Bitmap</span> splashImage<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_SplashPictureBox<span class="token punctuation">.</span>Image <span class="token operator">=</span> splashImage<span class="token punctuation">;</span>
        ClientSize <span class="token operator">=</span> m_SplashPictureBox<span class="token punctuation">.</span>Size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//Rest of the implementation</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，你必须将SplashForm的客户端大小设置为图片框的大小，它会根据图片的大小自动调节自己的大小。结果SplashForm就可以在图片框中精确地显示图片了，因为图片框是被放在窗体的左上角的。</p><p>你不能在用来加载应用程序的同一个线程上显示SplashForm，因为那个线程在忙于加载应用程序而不会考虑显示或重绘闪屏。作为替代，我们应该让SplashScreen创建一个工作线程（worker thread）来显示SplashForm（见列表1）。工作线程调用Show方法，该方法会创建SplashForm对象并调用它的ShowDialog方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    m_SplashForm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SplashForm</span><span class="token punctuation">(</span>m_SplashImage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    m_SplashForm<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ShowDialog显示窗体并开始将Windows消息填充到里面。闪屏是在它自己的线程上运行的，因此该线程可以进行消息处理——不是指忙于加载应用程序的那个主应用程序线程。</p><p>接下来的任务是为主应用程序找到一个方法来关闭闪屏。最容易的方法就是用信号通知工作线程关闭窗体——除非该线程的方法（Show）正忙于在窗体的消息循环中（ShowDialog方法）填充消息，而不能查看标记或事件。解决的方法很简单，就是用Windows Timers。运用设计窗口在窗体上添加一个Timer控件，将它的Interval属性设置为适当的值，如500毫秒。Timer类实际上是基于VM_TIMER消息的，所以timer的Tick事件是Windows消息驱动的。工作线程将那个消息提供给闪屏，在那里它会查看是否需要关闭闪屏，因为主应用程序已经完成了加载。SplashForm类提供了Boolean属性HideSplash，SplashScreen的Close方法将它设置为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    m_SplashForm<span class="token punctuation">.</span>HideSplash <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    m_WorkerThread<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>HideSplash可以访问SplashForm的m_HideSplash Boolean成员变量。m_HideSplash可以由多个线程访问，所以HideSplash需要通过锁定SplashForm以一种线程安全的方法来访问m_HideSplash：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> HideSplash
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">lock</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> m_HideSplash<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">lock</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            m_HideSplash <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>SplashForm在OnTick方法中处理timer的Tick事件：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnTick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>HideSplash <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_Timer<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果HideSplash属性设置为true（因为调用了SplashScreen的Close方法），OnTick就会使timer无效并关闭SplashForm。它的运作过程是这样的：主窗体开始加载，并在另外的一个线程上显示闪屏。然后，主窗体继续启动应用程序。闪屏定期查看（运用timer）是否应该关闭。当主窗体完成加载时会调用SplashScreen的Close方法。Close方法将HideSplash设置为true，并在工作线程上调用Join，等闪屏关闭。这会阻碍主窗体的显示，所以只要显示闪屏，主窗体就不会显示。下一次timer响了时，它就会查看HideSplash的值。它会取消timer并关闭SplashForm，因为HideSplash被设置为true。这会返回ShowDialog方法（该方法在SplashScreen的Show方法中被调用），然后返回Show。一旦返回Show，线程就终止了，因为Show是工作线程的线程方法。这时候，会返回SplashScreen的Close方法中的Join。Close方法被返回到主窗体，现在就可以显示主窗体了。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>Powered <span class="token keyword">by</span> DvNews<span class="token punctuation">.</span>net
来源：本站
阅读：<span class="token number">210</span> 次
日期：<span class="token number">2003</span><span class="token operator">-</span><span class="token number">6</span><span class="token operator">-</span><span class="token number">27</span>
</code></pre></div>`,33),c=[o];function l(u,i){return n(),a("div",null,c)}const k=s(e,[["render",l],["__file","diag1.html.vue"]]);export{k as default};
