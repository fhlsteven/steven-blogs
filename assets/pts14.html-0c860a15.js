import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="这样的程序怎样关-线程" tabindex="-1"><a class="header-anchor" href="#这样的程序怎样关-线程" aria-hidden="true">#</a> 这样的程序怎样关(线程)</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>kikyang
等级：小飞侠
财产：11670
经验：11065
魅力：1889
注册：2002-10-22
登录：2003-4-24
文章：594
</code></pre></div><p>[问题]这样的程序怎样关闭!<br> 这样的程序怎样正常退出,退出程序还有什么办法!<br> 我已经把对于阻碍程序退出不重要的东西删掉了,便于阅读.<br></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">UDPTESTserver</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button2<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>RichTextBox</span> richTextBox1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>IContainer</span> components<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> mdone <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span><span class="token comment">//循环参数</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span> thread<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">UdpClient</span> receivingUdpClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UdpClient</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设定监听端口为888</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> receiveBytes<span class="token punctuation">;</span><span class="token comment">//接收数据缓存</span>
        <span class="token keyword">private</span> <span class="token class-name">IPEndPoint</span> RemoteIpEndPoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">888</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//暂设监听本机888端口</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// </span>
            <span class="token comment">// Windows 窗体设计器支持所必需的 </span>
            <span class="token comment">// </span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>Listener<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//监听线程 </span>
                                                           <span class="token comment">// </span>
                                                           <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码 </span>
                                                           <span class="token comment">// </span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改 </span>
        <span class="token doc-comment comment">/// 此方法的内容。 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>

        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token punctuation">[</span>MTAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//监听线程 </span>
        <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>mdone<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//辅助语句,这句用来表现线程在不断循环,但是只动作过一次以后在下句没有接到数据的情况下都不会再次动作. </span>
                receiveBytes <span class="token operator">=</span> receivingUdpClient<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span><span class="token keyword">ref</span> RemoteIpEndPoint<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//接收字符数组,****但是现在线程会停在这里等待接收数据无法进入到下次循环 </span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//弹出报警窗口 </span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>thread<span class="token punctuation">.</span>ThreadState <span class="token operator">&amp;</span> ThreadState<span class="token punctuation">.</span>Unstarted<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                thread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//开始线程</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>mdone <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span><span class="token comment">//由于 receiveBytes = receivingUdpClient.Receive(ref RemoteIpEndPoint);在等待,所以线程的循环无法接收到这句,所以无法跳出循环,线程无法结束!!! </span>
                               <span class="token comment">//thread.Abort();//即使加上这句,线程也结束不了 </span>
            Application<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//由于线程结束不了,所以整个程序也就无法正常关闭,只是表面的窗口关了,内存中整个进程仍然生存. </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>█ ◤ ▼ █ ◤ ◥ █ ▲  ◥  ◤◥
█ ◣ █ █ ◣    █ █  ◣  ◣◆  
</code></pre></div><p>发贴时间: 2002-12-18 9:48:37</p><hr><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Michael_Jackson
头衔：我哪里有呀！：）
等级：小飞侠
财产：12660
经验：10258
魅力：3135
注册：2002-10-17
登录：2003-4-16
文章：462
</code></pre></div><p>在thread.Abort(); 之前先thread.Join一下！ 试试</p><p>有些问题大家可以先看看MSDN自已试着解决，实在不行再到坛子里来问，这样有助自己的提高！ ：）</p><p>来来，我是一颗荔枝，枝枝枝枝枝枝枝枝枝枝<br> 来来，我是一个榴梿，梿梿梿梿梿梿梿梿梿梿</p><p>发贴时间: 2002-12-18 10:09:47</p><hr><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>zhwell
等级：论坛游侠
财产：1840
经验：1490
魅力：254
注册：2002-12-17
登录：2003-2-14
文章：81
</code></pre></div><p>我做的线程怎么没有碰到你的问题？<br> 线程不停肯定是退不出的！<br> 我在 dispose里面加上 thread.Abort(); 就没有问题了（try 一下）！</p><p>发贴时间: 2002-12-18 10:14:40</p><hr><hr><blockquote><p>kikyang</p></blockquote><p>那样不成,我试过的.<br> 最后终于解决了,真是高兴啊.花了我昨天一晚上的功夫!<br> 添加了这个东西,自己给自己发个包.<br></p><p>在声明的地方加上</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">UdpClient</span> sendudpClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UdpClient</span><span class="token punctuation">(</span><span class="token number">889</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设定发送端口为889</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sendByte<span class="token punctuation">;</span><span class="token comment">//发送数据缓存</span>
</code></pre></div><p>在<code>this.mdone=false;</code>之后加上:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>RemoteIpEndPoint<span class="token punctuation">.</span>Address<span class="token operator">=</span>IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
RemoteIpEndPoint<span class="token punctuation">.</span>Port<span class="token operator">=</span><span class="token number">889</span><span class="token punctuation">;</span>
sendByte<span class="token operator">=</span>System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;q&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sendudpClient<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>sendByte<span class="token punctuation">,</span>sendByte<span class="token punctuation">.</span>Length<span class="token punctuation">,</span>RemoteIpEndPoint<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//发送确认接收数据包</span>
</code></pre></div><p>程序收到自己发的包,<br> 然后把mdone更新为false线程正常结束.<br> 程序就可以退出了.<br> 真是受不了,自己开的东西自己关不了.呵呵,总算关了.<br> 另:程序里两个端口号都是不符合规定的,应该大于1024,我这里是举例子,乱写的.</p><p>发贴时间: 2002-12-18 10:22:04</p><hr><hr><blockquote><p>kikyang</p></blockquote><p>谢谢你.</p><p>以下内容为引用：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>我做的线程怎么没有碰到你的问题？
线程不停肯定是退不出的！
我在 dispose里面加上 thread.Abort(); 就没有问题了（try 一下）！
</code></pre></div><p>这个方法我也试过,也没有退出.<br> 不过谢谢你.</p><p>发贴时间: 2002-12-18 10:23:07</p><hr><hr>`,38),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","pts14.html.vue"]]);export{i as default};
