import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="基于tcp协议的发送和接收端" tabindex="-1"><a class="header-anchor" href="#基于tcp协议的发送和接收端" aria-hidden="true">#</a> 基于TCP协议的发送和接收端</h1><p>TCP协议的接收端</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span> <span class="token comment">//使用到TcpListen类</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span> <span class="token comment">//使用到线程</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span> <span class="token comment">//使用到StreamReader类</span>

<span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">8000</span><span class="token punctuation">;</span> <span class="token comment">//定义侦听端口号</span>
<span class="token keyword">private</span> <span class="token class-name">Thread</span> thThreadRead<span class="token punctuation">;</span> <span class="token comment">//创建线程，用以侦听端口号，接收信息</span>
<span class="token keyword">private</span> <span class="token class-name">TcpListener</span> tlTcpListen<span class="token punctuation">;</span> <span class="token comment">//侦听端口号</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> blistener <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">//设定标示位，判断侦听状态</span>
<span class="token keyword">private</span> <span class="token class-name">NetworkStream</span> nsStream<span class="token punctuation">;</span> <span class="token comment">//创建接收的基本数据流  </span>
<span class="token keyword">private</span> <span class="token class-name">StreamReader</span> srRead<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>StatusBar</span> statusBar1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ListBox</span> listBox1<span class="token punctuation">;</span> <span class="token comment">//从网络基础数据流中读取数据</span>
<span class="token keyword">private</span> <span class="token class-name">TcpClient</span> tcClient<span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        tlTcpListen <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//以8000端口号来初始化TcpListener实例</span>
        tlTcpListen<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//开始监听</span>
        statusBar1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;正在监听...&quot;</span><span class="token punctuation">;</span>
        tcClient <span class="token operator">=</span> tlTcpListen<span class="token punctuation">.</span><span class="token function">AcceptTcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//通过TCP连接请求</span>
        nsStream <span class="token operator">=</span> tcClient<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取用以发送、接收数据的网络基础数据流</span>
        srRead <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>nsStream<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//以得到的网络基础数据流来初始化StreamReader实例</span>
        statusBar1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;已经连接！&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>blistener<span class="token punctuation">)</span> <span class="token comment">//循环侦听</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sMessage <span class="token operator">=</span> srRead<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//从网络基础数据流中读取一行数据 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sMessage <span class="token operator">==</span> <span class="token string">&quot;STOP&quot;</span><span class="token punctuation">)</span> <span class="token comment">//判断是否为断开TCP连接控制码</span>
            <span class="token punctuation">{</span>
                tlTcpListen<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//关闭侦听</span>
                nsStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//释放资源</span>
                srRead<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                statusBar1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;连接已经关闭！&quot;</span><span class="token punctuation">;</span>
                thThreadRead<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//中止线程</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name"><span class="token keyword">string</span></span> sTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToShortTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取接收数据时的时间</span>
            listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>sTime <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> sMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>SecurityException</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;侦听失败！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//开始监听</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    thThreadRead <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>Listen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    thThreadRead<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//启动线程           </span>
    button1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 清理所有正在使用的资源。</span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        tlTcpListen<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//关闭侦听 </span>
        nsStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        srRead<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//释放资源 </span>
        thThreadRead<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//中止线程 </span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>TCP协议的发送端</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span> <span class="token comment">//使用到TcpListen类</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span> <span class="token comment">//使用到线程</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span> <span class="token comment">//使用到StreamWriter类</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span> <span class="token comment">//使用IPAddress类、IPHostEntry类等</span>

<span class="token keyword">private</span> <span class="token class-name">StreamWriter</span> swWriter<span class="token punctuation">;</span> <span class="token comment">//用以向网络基础数据流传送数据</span>
<span class="token keyword">private</span> <span class="token class-name">NetworkStream</span> nsStream<span class="token punctuation">;</span> <span class="token comment">//创建发送数据的网络基础数据流</span>
<span class="token keyword">private</span> <span class="token class-name">TcpClient</span> tcpClient<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button2<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox2<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>StatusBar</span> statusBar1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> label1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> label2<span class="token punctuation">;</span> <span class="token comment">//通过它实现向远程主机提出TCP连接申请　</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> tcpConnect <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//定义标识符，用以表示TCP连接是否建立</span>

<span class="token comment">//连接</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPAddress</span> ipRemote<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        ipRemote <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token comment">//判断给定的IP地址的合法性</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;输入的IP地址不合法！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误提示！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">IPHostEntry</span> ipHost<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        ipHost <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token comment">//判断IP地址对应主机是否在线</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;远程主机不在线！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误提示！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name"><span class="token keyword">string</span></span> sHostName <span class="token operator">=</span> ipHost<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">TcpClient</span> tcpClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpClient</span><span class="token punctuation">(</span>sHostName<span class="token punctuation">,</span> <span class="token number">8000</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//对远程主机的8000端口提出TCP连接申请</span>
        nsStream <span class="token operator">=</span> tcpClient<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//通过申请，并获取传送数据的网络基础数据流</span>
        swWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>nsStream<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//使用获取的网络基础数据流来初始化StreamWriter实例</span>
        button1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        tcpConnect <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;已经连接！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;无法和远程主机8000端口建立连接！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误提示！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//发送</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox2<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        swWriter<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>textBox2<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//刷新当前数据流中的数据</span>
        swWriter<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;发送信息不能为空！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误提示！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 清理所有正在使用的资源。</span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tcpConnect<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        swWriter<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;STOP&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//发送控制码</span>
        swWriter<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//刷新当前数据流中的数据</span>
        nsStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//清除资源</span>
        swWriter<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netsoc2.html.vue"]]);export{i as default};
