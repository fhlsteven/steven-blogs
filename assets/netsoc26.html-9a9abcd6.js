import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="_100求使用socket的例子" tabindex="-1"><a class="header-anchor" href="#_100求使用socket的例子" aria-hidden="true">#</a> 100求使用socket的例子</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  100求使用socket的例子
作　　者：  zxcv11 ()
等　　级：  ^
信 誉 值：  100
所属社区：  .NET技术 C#
问题点数：  100
回复次数：  9
发表时间：  2004-10-25 10:14:30
</code></pre></div><p>在线等待<br> flying136@sohu.com</p><hr><hr><p>回复人： jackie615(亞馬遜)★(東大傳說) ( 五级(中级)) 信誉：99 2004-10-25 10:20:59 得分: 0</p><blockquote><p>友情up</p></blockquote><p>回复人： fellowcheng(今天心情不错) ( 二级(初级)) 信誉：100 2004-10-25 10:23:04 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： xiaoslong(龙哥) ( 四级(中级)) 信誉：100 2004-10-25 10:25:02 得分: 70</p><blockquote><p>已发</p></blockquote><p>回复人： Tomgus(小桥流水) ( 五级(中级)) 信誉：87 2004-10-25 10:26:08 得分: 10</p><blockquote><p>发给你了</p></blockquote><p>回复人： cs920(头痛不是两三天)(此情可待) ( 三级(初级)) 信誉：100 2004-10-25 10:28:02 得分: 10</p><blockquote><p>已发,请查收</p></blockquote><p>回复人： xiaohutushen(xiaohutushen) ( 五级(中级)) 信誉：100 2004-10-25 10:33:13 得分: 5</p><blockquote><p>发送端</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Public</span> <span class="token keyword">Class</span> Form1
    <span class="token keyword">Inherits</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form
    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span>
    　　<span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button1<span class="token punctuation">.</span>Click
        <span class="token keyword">Dim</span> sendsocket <span class="token keyword">As</span> <span class="token keyword">New</span> Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>Socket
    　　<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>
    　　Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span>
    　　<span class="token comment">&#39;实例化socket</span>
        <span class="token keyword">Dim</span> ipendpiont <span class="token keyword">As</span> <span class="token keyword">New</span> Net<span class="token punctuation">.</span>IPEndPoint
    　　<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>IPAddress<span class="token punctuation">.</span>Parse<span class="token punctuation">(</span><span class="token string">&quot;192.168.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">8888</span><span class="token punctuation">)</span><span class="token comment">&#39;建立终结点</span>
        <span class="token comment">&#39;OpenFileDialog1.ShowDialog()</span>
        <span class="token keyword">Dim</span> fs <span class="token keyword">As</span> <span class="token keyword">New</span> IO<span class="token punctuation">.</span>FileStream<span class="token punctuation">(</span><span class="token string">&quot;c:\\p.doc&quot;</span><span class="token punctuation">,</span>
    　　IO<span class="token punctuation">.</span>FileMode<span class="token punctuation">.</span>OpenOrCreate<span class="token punctuation">,</span> IO<span class="token punctuation">.</span>FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token comment">&#39;要传输的文件</span>
        <span class="token keyword">Dim</span> fssize<span class="token punctuation">(</span>fs<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Byte</span>
        <span class="token keyword">Dim</span> strread <span class="token keyword">As</span> <span class="token keyword">New</span> IO<span class="token punctuation">.</span>BinaryReader<span class="token punctuation">(</span>fs<span class="token punctuation">)</span><span class="token comment">&#39;流处理要传输的文件</span>
        <span class="token comment">&#39;fs.Read(fssize, 0, fssize.Length - 1)</span>
        strread<span class="token punctuation">.</span>Read<span class="token punctuation">(</span>fssize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> fssize<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
        sendsocket<span class="token punctuation">.</span>Connect<span class="token punctuation">(</span>ipendpiont<span class="token punctuation">)</span><span class="token comment">&#39;连接远程计算机</span>
        sendsocket<span class="token punctuation">.</span>Send<span class="token punctuation">(</span>fssize<span class="token punctuation">)</span><span class="token comment">&#39;发送文件</span>
        Label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> fs<span class="token punctuation">.</span>Length<span class="token punctuation">(</span><span class="token punctuation">)</span>
        fs<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
        sendsocket<span class="token punctuation">.</span>Shutdown<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>SocketShutdown<span class="token punctuation">.</span>Send<span class="token punctuation">)</span>
    　　<span class="token comment">&#39;关闭发送连接</span>
        sendsocket<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">&#39;关闭本机socket</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>
<span class="token keyword">End</span> <span class="token keyword">Class</span>
</code></pre></div><blockquote><p>接收端</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Public</span> <span class="token keyword">Class</span> Form1
    <span class="token keyword">Inherits</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form
    <span class="token keyword">Dim</span> receivesocket <span class="token keyword">As</span> <span class="token keyword">New</span> Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>Socket
    　　<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>
    　　Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span>
    　　Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span>
    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> Form1_Load<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span>
    　　　　<span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> <span class="token keyword">MyBase</span><span class="token punctuation">.</span>Load
        <span class="token keyword">Dim</span> hostipendpiont <span class="token keyword">As</span> <span class="token keyword">New</span> Net<span class="token punctuation">.</span>IPEndPoint
    　　<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>IPAddress<span class="token punctuation">.</span>Parse<span class="token punctuation">(</span><span class="token string">&quot;192.168.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">8888</span><span class="token punctuation">)</span>
        receivesocket<span class="token punctuation">.</span>Bind<span class="token punctuation">(</span>hostipendpiont<span class="token punctuation">)</span>
    　　<span class="token comment">&#39;建立远程计算机的的socket</span>
        receivesocket<span class="token punctuation">.</span>Listen<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token comment">&#39;监听socket</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>

    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">Object</span><span class="token punctuation">,</span>
    　　<span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button1<span class="token punctuation">.</span>Click
        <span class="token keyword">Dim</span> recfs <span class="token keyword">As</span> <span class="token keyword">New</span> IO<span class="token punctuation">.</span>FileStream<span class="token punctuation">(</span><span class="token string">&quot;p.doc&quot;</span><span class="token punctuation">,</span>
    　　IO<span class="token punctuation">.</span>FileMode<span class="token punctuation">.</span>OpenOrCreate<span class="token punctuation">)</span>
    　　<span class="token comment">&#39;接收数据并将其保存到一个新的文件中</span>
        <span class="token keyword">Dim</span> recbyte<span class="token punctuation">(</span><span class="token number">229888</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Byte</span>
        <span class="token keyword">Dim</span> hostsocket <span class="token keyword">As</span> Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>Socket <span class="token operator">=</span>
    　　receivesocket<span class="token punctuation">.</span>Accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
    　　<span class="token comment">&#39;同意和发送端计算机建立连接</span>
        <span class="token keyword">Dim</span> newfilestr <span class="token keyword">As</span> <span class="token keyword">New</span> IO<span class="token punctuation">.</span>BinaryWriter<span class="token punctuation">(</span>recfs<span class="token punctuation">)</span><span class="token comment">&#39;流写</span>
        hostsocket<span class="token punctuation">.</span>Receive<span class="token punctuation">(</span>recbyte<span class="token punctuation">)</span>
        <span class="token comment">&#39;recfs.Write(recbyte, 0, recbyte.Length - 1)</span>
        newfilestr<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>recbyte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> recbyte<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
        recfs<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
        hostsocket<span class="token punctuation">.</span>Shutdown<span class="token punctuation">(</span>Net<span class="token punctuation">.</span>Sockets<span class="token punctuation">.</span>SocketShutdown<span class="token punctuation">.</span>Receive<span class="token punctuation">)</span>
        hostsocket<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>
<span class="token keyword">End</span> <span class="token keyword">Class</span>
</code></pre></div><p>回复人： happyjun2000(蓝色游侠∮不要介意我无聊乱接分.NET) ( 一星(中级)) 信誉：100 2004-10-25 10:34:28 得分: 5</p><blockquote><p>socket的组播应用</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">send</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">send</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加代码以启动应用程序</span>
            <span class="token comment">//</span>
            <span class="token class-name">UdpClient</span> sock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UdpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> iep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;224.100.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">9050</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span></span> newtext <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>newtext<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sock<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> iep<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sock<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">recv</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">recv</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加代码以启动应用程序</span>
            <span class="token comment">//</span>
            <span class="token class-name">UdpClient</span> sock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UdpClient</span><span class="token punctuation">(</span><span class="token number">9050</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;ready...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sock<span class="token punctuation">.</span><span class="token function">JoinMulticastGroup</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;224.100.0.1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> iep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> sock<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span><span class="token keyword">ref</span> iep<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> stringdata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>stringdata <span class="token operator">==</span> <span class="token string">&quot;bye&quot;</span><span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;received:{0}&quot;</span><span class="token punctuation">,</span> stringdata<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sock<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： hanbinghai(海宁) ( 五级(中级)) 信誉：100 2004-10-25 10:42:09 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： jkflyfox(飞狐) ( 五级(中级)) 信誉：100 2004-10-25 17:16:00 得分: 0</p><blockquote><p>强烈BS倒分垃圾<br> 参见<br><code>http://community.csdn.net/Expert/topic/3488/3488766.xml?temp=.7287409</code></p></blockquote><p>该问题已经结贴 ，得分记录： xiaoslong (70)、 Tomgus (10)、 cs920 (10)、 xiaohutushen (5)、 happyjun2000 (5)、</p>`,28),e=[o];function c(u,k){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netsoc26.html.vue"]]);export{i as default};
