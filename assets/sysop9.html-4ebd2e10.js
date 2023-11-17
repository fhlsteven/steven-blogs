import{_ as n,o as s,c as a,a as e}from"./app-a2b6e588.js";const t={},o=e(`<h1 id="how-to-develop-a-screen-saver-in-c" tabindex="-1"><a class="header-anchor" href="#how-to-develop-a-screen-saver-in-c" aria-hidden="true">#</a> How to develop a screen saver in C#</h1><h2 id="issues-covered" tabindex="-1"><a class="header-anchor" href="#issues-covered" aria-hidden="true">#</a> Issues covered</h2><p>This article explains:</p><ul><li>the basics of a screensaver</li><li>loading a screensaver</li><li>filling the whole screen</li><li>handling multiple monitors</li><li>handling events</li><li>some little intricacies</li></ul><p>Additionally, the code provides a basic screensaver framework which you could use easily to create screensavers on your own.</p><h2 id="相关主题" tabindex="-1"><a class="header-anchor" href="#相关主题" aria-hidden="true">#</a> 相关主题</h2><p>这篇文章解释了一下内容：</p><ul><li>屏保的基础知识</li><li>载入一个屏保</li><li>填充整个屏幕</li><li>操作多监视器（显示器）</li><li>处理事件</li><li>一些稍微复杂的知识点</li></ul><p>另外，这个代码提供了一个基本的屏幕保护程序的框架，你可以根据这个框架轻松地创建你自己的屏幕保护程序。</p><h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>A screensaver in Windows® is simply an executable file with the extension .scr. The only difference between a normal executable and a screensaver is that a screensaver does some specific things, viz:</p><ul><li>parses the command line to find out what Windows® wants it to do</li><li>loads the screensaver appropriate to that request</li><li>ends the screensaver (usually), when the user uses the mouse or the keyboard</li></ul><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>简单得说，一个屏幕保护程序在Windows里就是一个以.scr为扩展名的可执行文件。一个普通的可执行文件和一个屏幕保护程序的唯一不同在于屏保做了一些特别的事,如下所示：</p><ul><li>解析命令行来找出Windows想让它作什么</li><li>载入符合这个请求（解析命令行所取得的请求）的屏保</li><li>（一般来说）当用户使用鼠标或者键盘的时候，结束屏保</li></ul><p>The arguments Windows® passes to a screensaver are:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>/s - load the screensaver
/c - load the configuration screen
/p - load the preview
</code></pre></div><p>Once we determine the argument passed, we load the screensaver appropriately. When there is some kind of activity, you end the screensaver or do something else.</p><p>Windows传递给屏保的参数是：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>/s – 载入屏保
/c – 载入配置屏幕
/p – 载入预览
</code></pre></div><p>一旦我们决定了要传递的参数，我们就载入相应的屏保。当有一些活动时，就结束屏保或者做一些别的事。</p><h2 id="the-code-explained" tabindex="-1"><a class="header-anchor" href="#the-code-explained" aria-hidden="true">#</a> The code explained</h2><h3 id="step-1-making-the-main-method-accept-command-line-arguments" tabindex="-1"><a class="header-anchor" href="#step-1-making-the-main-method-accept-command-line-arguments" aria-hidden="true">#</a> Step 1: Making the Main method accept command-line arguments</h3><p>The first step in developing a screensaver in C# is to modify the Main method so that it could accept command-line arguments. The default Main method is like this:</p><h2 id="代码解释" tabindex="-1"><a class="header-anchor" href="#代码解释" aria-hidden="true">#</a> 代码解释</h2><h3 id="步骤1-让main函数接受命令行参数" tabindex="-1"><a class="header-anchor" href="#步骤1-让main函数接受命令行参数" aria-hidden="true">#</a> 步骤1：让Main函数接受命令行参数</h3><p>用C#开发一个屏幕保护程序的第一步就是来修改Main函数（方法），让他能够接受命令行参数。默认的Main函数是这样的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>
</code></pre></div><p>As you can see, this Main method accepts no parameters. So, we add a string array parameter like this:</p><p>如你所见，这个Main函数没有参数。所以我们像这样加入一个string数组参数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  
<span class="token punctuation">}</span>
</code></pre></div><h3 id="step-2-checking-the-arguments" tabindex="-1"><a class="header-anchor" href="#step-2-checking-the-arguments" aria-hidden="true">#</a> Step 2: Checking the arguments</h3><p>Now we need to find out what arguments were passed.</p><h3 id="步骤2-检查参数" tabindex="-1"><a class="header-anchor" href="#步骤2-检查参数" aria-hidden="true">#</a> 步骤2：检查参数</h3><p>现在我们就需要找出传递了什么参数。</p><p>First, we will check whether Windows® did pass some arguments. How do we do that? Simple - just check the length of the string array; if it&#39;s 0, there are no arguments. BTW, a typical scenario where no arguments are passed is when user&#39;s just double click on your screensaver.</p><p>首先，我们要检查Windows是否确实传递了一些参数。我们怎么办呢？其实很简单 – 只要检查一下string数组的长度就行了；如果长度是0，就没有参数。顺便说一句，一种典型的情景就是，当用户双击你的屏保，是没有参数被传递的。</p><p>Secondly, if there indeed are arguments, we catch them. Windows® may pass arguments in either the lower case or the upper case. So it&#39;s a good idea to induce generalization of some sort. We do this by changing the arguments to lower case (or upper case) first and then checking them. The complete Main method would look something like:</p><p>其次，如果确实有参数，我们就取得它们。Windows可能会用小写或者大写的形式传递参数。所以最好使它变为某一种形式。所以我们先就把参数变为小写（或者大写），然后再检查它们。完成的Main函数应该像下面这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// load the config stuff</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;/c&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;/s&quot;</span><span class="token punctuation">)</span> <span class="token comment">// load the screensaver</span>
    <span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;/p&quot;</span><span class="token punctuation">)</span> <span class="token comment">// load the preview</span>
    <span class="token punctuation">{</span>
      
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token comment">// there are no argumentsnevertheless, do something!</span>
  <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Quite straight forward, isn&#39;t it? The only code you need to add here is the stuff you want to do for each argument.</p><p>很直截了当，不是吗？你在这里所要加的代码是对应每个参数做相应的处理。</p><h3 id="step-3-invoking-the-screensaver" tabindex="-1"><a class="header-anchor" href="#step-3-invoking-the-screensaver" aria-hidden="true">#</a> Step 3: Invoking the screensaver</h3><h3 id="步骤3-调用屏幕保护程序" tabindex="-1"><a class="header-anchor" href="#步骤3-调用屏幕保护程序" aria-hidden="true">#</a> 步骤3：调用屏幕保护程序</h3><p>To run the screensaver, you call the System.Windows.Forms.Application.Run method. You pass a new form object as the argument. The code will look like:</p><p>你可以调用System.Windows.Forms.Application.Run方法来运行屏幕保护程序。你传递一个窗体对象作为参数。代码如下：</p><p><code>System.Windows.Forms.Application.Run(new frmScreenSaver());</code></p><p>where frmScreenSaver is main screensaver form.</p><p>这里frmScreenSaver代表屏保的主窗体</p><p>When the screensaver loads, we want it to fit the entire screen. To access screens, we use the Screen class. Using the PrimaryScreen property of this class, we could access the primary screen of the system as well as it&#39;s properties. Among those properties is Bounds, representing the size of the screen. What we do is set the form&#39;s Bounds property to that of this screen, and then the form would be resized to occupy the entire screen. This procedure is usually executed in the form&#39;s Load event, for example:</p><p>当屏保程序被载入后，我们想让它充满整个屏幕。我们使用Screen类来访问屏幕对象。使用这个类的PrimaryScreen属性，我们可以访问系统的主屏幕对象和它的属性。这些属性中有一个是Bounds,用来代表屏幕的尺寸。我们所需要做得是根据这个屏幕来设置窗体的Bounds属性，然后这个窗体就能改变大小来充满整个屏幕。这个过程通常在窗体的Load事件中执行，比如说：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">frmScreenSaver_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Bounds <span class="token operator">=</span> Screen<span class="token punctuation">.</span>PrimaryScreen<span class="token punctuation">.</span>Bounds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>We need to address one possibility though - the user may be using more than one screen. If that&#39;s true, and if we load the screensaver only on one screen, the whole point of using this screensaver is lost. Hence, we find out the number of screens available, and load the screensaver in each of them. To do this, we iterate through all the available screens in the Main method, where we repeatedly call the form&#39;s constructor passing the screen&#39;s index. The set of all screens available in the system is listed in the AllScreens property of the Screen class. Thus the code in the Main method invoking the screensaver will have to be modified as:</p><p>可是我们需要说明另一个可能 – 用户可能使用不止一个屏幕。如果真的是那样，那么我们假如只载入一个屏幕，那就失去了使用这个屏保的总目标。因此，我们就找出可用屏幕的数量，把每一个都载入屏保。为了实现这一点，我们在Main函数中迭代所有可用屏幕，这样我们就反复调用传递了以屏幕索引为参数的窗体构造器。系统中所有可用屏幕的集合都列在了Screen类的AllScreens属性中。于是在Main函数中调用屏幕保护程序的代码就要被改成：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> Screen<span class="token punctuation">.</span>AllScreens<span class="token punctuation">.</span><span class="token function">GetLowerBound</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> Screen<span class="token punctuation">.</span>AllScreens<span class="token punctuation">.</span><span class="token function">GetUpperBound</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">frmScreenSaver</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Note the change in the main screensaver form&#39;s constructor - it accepts an int parameter, which represents the screen&#39;s index onto which the screensaver is to be run. In response to this, we modify the form&#39;s class by adding an int member variable which will store the screen index. The form&#39;s constructor will then be modified to initialize this variable, like this:</p><p>注意屏保主窗体构造函数中的改变 – 它接受一个int 参数，这个参数代表将要被运行的屏保的屏幕索引。与此相应的，我们修改窗体类让它增加一个整型成员变量，用来保存屏幕的索引。窗体的构造器就要被修改以初始化这个变量，将像这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">frmScreenSaver</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> scrn<span class="token punctuation">)</span>
<span class="token punctuation">{</span>  
    ScreenNumber <span class="token operator">=</span> scrn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>where ScreenNumber is the int member variable.</p><p>这里的ScreenNumber就是那个整型成员变量。</p><p>After this, the Load event handler will have to be modified to resize the form to the bounds of not the primary screen, but that of the screen represented by the index, like this:</p><p>然后，Load事件需要被更改，用来改变窗体大小以适应当前屏幕而不是主屏幕，不过当前屏幕由索引值确定，就像这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">frmScreenSaver_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>  
    Bounds <span class="token operator">=</span> Screen<span class="token punctuation">.</span>AllScreens<span class="token punctuation">[</span>ScreenNumber<span class="token punctuation">]</span><span class="token punctuation">.</span>Bounds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Once this is done, we have added multiple screen display functionality to our screensaver.</p><p>一旦这个完成了，我们就给我们的屏幕保护程序加入了多屏幕显示功能。</p><p>You will want to make the form topmost and hide the cursor. Just call the additional methods in the Load handler like this:</p><p>你希望窗体置顶，隐藏鼠标指针。只要调用在Load事件处理方法中的附加方法，如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">frmScreenSaver_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>  
    Bounds <span class="token operator">=</span> Screen<span class="token punctuation">.</span>AllScreens<span class="token punctuation">[</span>ScreenNumber<span class="token punctuation">]</span><span class="token punctuation">.</span>Bounds<span class="token punctuation">;</span>
    Cursor<span class="token punctuation">.</span><span class="token function">Hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    TopMost <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="step-4-handling-events" tabindex="-1"><a class="header-anchor" href="#step-4-handling-events" aria-hidden="true">#</a> Step 4: Handling events</h3><h3 id="步骤4-处理事件" tabindex="-1"><a class="header-anchor" href="#步骤4-处理事件" aria-hidden="true">#</a> 步骤4：处理事件</h3><p>Once you have loaded your screensaver, you will have to handle events. This is because when the user uses the mouse or hits the keyboard, you probably want to do something, like ending the screensaver. To do this, you just add event handlers to the KeyDown, MouseMove and MoveDown events of the screensaver form. In the event handlers, you could use the form&#39;s Close method of the form to end the screensaver.</p><p>一旦你载入你的屏保程序，你就需要处理事件。这是因为当用户使用鼠标或者敲击键盘时，你很可能想做些什么，比如说终止屏保程序。为了实现这点，你只需要为屏幕保护程序的窗体事件 KeyDown, MouseMove 和 MoveDown增加事件处理方法。在事件处理方法里，你可以使用当前窗体的Close方法来结束屏幕保护程序。</p><p>There is one thing though. When an application is executed, the current mouse parameters are passed to it by Windows® through an event. Thus, the respective event handler is called automatically right after an application&#39;s inception. Hence, if you call the Close method in the mouse event handlers as such, the application simply closes right after it is executed. So what do we do to getaround this problem? Add a Point variable, initialize it when the application executes, and check the mouse position and mouse clicks when events occur. If there is any change, then call Close. The code would look something like:</p><p>还有一件事。当一个应用程序执行了，当前鼠标参数被Windows通过一个事件传递给这个应用程序。于是，在应用程序刚开始运行以后，相应的事件处理方法就被自动调用了。因此，如果你就这样在鼠标移动事件处理方法里调用Close方法，这个屏保程序在它一启动之后马上就会关闭了。那么我们该怎么做来处理这个问题呢？增加一个Point变量，当程序开始执行就把它初始化，然后在事件发生的时候检查鼠标的位置和鼠标点击。如果有任何改变，就调用Close方法。代码应该像下面这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseMove</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MouseEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>MouseXY<span class="token punctuation">.</span>IsEmpty<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>MouseXY <span class="token operator">!=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    MouseXY <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>where MouseXY is the Point variable we use to store the initial mouse position temporarily. Initially, MouseXY is null; and thus is assigned the current mouse position through this code. In the next call of this event handler, MouseXY is not empty; so we check whether the position has changed; if yes, close the form.</p><p>这里MouseXY 是一个我们用来临时储存鼠标初始位置的Point变量。刚开始， MouseXY 是 null值；然后通过代码赋给它当前鼠标位置的值。下一次我们调用这个事件处理方法，MouseXY就不是空的了；所以我们检查是否位置发生了改变，如果是，就关闭窗体。</p><p>As mentioned earlier, you should handle both MouseMove and MouseDown events in a screensaver. But since both have the same arguments, you could use the same event handler for handling both events. Such a code would look like:</p><p>就像前面提到的，我们需要在一个屏幕保护程序里处理MouseMove 和 MouseDown 两个事件。但是因为这个两个事件都有相同的参数，你可以使用相同的事件处理方法来处理这两个事件。这样的代码如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MouseEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>MouseXY<span class="token punctuation">.</span>IsEmpty<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>MouseXY <span class="token operator">!=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Clicks <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    MouseXY <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>where OnMouseEvent is the event handler which is called on mouse move as well as mouse down events.</p><p>这里OnMouseEvent 是一个在移动鼠标或者按下鼠标按钮时触发的事件处理方法。</p><h3 id="step-5-finally" tabindex="-1"><a class="header-anchor" href="#step-5-finally" aria-hidden="true">#</a> Step 5: Finally...</h3><h3 id="步骤5-最后" tabindex="-1"><a class="header-anchor" href="#步骤5-最后" aria-hidden="true">#</a> 步骤5：最后…</h3><p>Isn&#39;t it over yet? Nope, just one more small thing more...after developing your screensaver, rename it with the .scr extension. You are done! 😃</p><p>难道还没结束吗？没有啦，只是还有一件小事情…在开发完你的屏保程序以后，把它更名为.scr的后缀名。你完成了！😃</p><h2 id="using-the-bundled-code" tabindex="-1"><a class="header-anchor" href="#using-the-bundled-code" aria-hidden="true">#</a> Using the bundled code</h2><h3 id="使用打包的代码-请到原文的页面下载" tabindex="-1"><a class="header-anchor" href="#使用打包的代码-请到原文的页面下载" aria-hidden="true">#</a> 使用打包的代码（请到原文的页面下载）</h3><p>The code provided just loads a black form. To change it and implement your own features, follow these simple steps:</p><p>这个代码只提供了全黑的窗体。你可以根据以下几个简单的步骤来修改它并且实现你自己的属性：</p><p>Change the code in the Main method to handle different arguments<br> Add a configuration form if necessary, and add the code to load it in the Main method<br> Modify the main screensaver form so as to display what you want it to<br> Rename the extension from .exe to .scr<br> Go!</p><p>在Main函数里修改代码来操作不同的参数<br> 如果需要可以增加一个配置窗体，然后在Main函数里增加代码来载入它。<br> 修改屏幕保护程序的主窗体，以我们希望的显示方式显示。<br> 把后缀名 .exe 改为 .scr<br> 启动！</p><p><strong>Comments by XXin</strong>：</p><ul><li>[1] 原文出处：http://www.codeproject.com/csharp/scrframework.asp</li><li>[2] 感谢寒枫天伤在翻译的过程中对我的帮助，感谢 Fantasy Soft 帮我审阅初译稿，并帮我改正一些翻译错误。</li></ul>`,94),p=[o];function c(i,r){return s(),a("div",null,p)}const u=n(t,[["render",c],["__file","sysop9.html.vue"]]);export{u as default};
