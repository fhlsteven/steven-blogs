import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="异步socket通信总结" tabindex="-1"><a class="header-anchor" href="#异步socket通信总结" aria-hidden="true">#</a> 异步Socket通信总结</h1><h2 id="服务端-异步" tabindex="-1"><a class="header-anchor" href="#服务端-异步" aria-hidden="true">#</a> 服务端(异步)</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ManualResetEvent</span> allDone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManualResetEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Thread</span> th<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> listenerRun <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token class-name">Socket</span> listener<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_SOCKET <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        listenerRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        th<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        th <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//得到本机IP地址</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IPAddress</span> <span class="token function">GetServerIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPHostEntry</span> ieh <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> ieh<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//侦听方法</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nPort <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>txtLocalPort<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPAddress</span> ServerIp <span class="token operator">=</span> <span class="token function">GetServerIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> iep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>ServerIp<span class="token punctuation">,</span> nPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>

        listener<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>iep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;端口：&quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>txtLocalPort<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;正在监听......&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>listenerRun<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            allDone<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            listener<span class="token punctuation">.</span><span class="token function">BeginAccept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>AcceptCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> listener<span class="token punctuation">)</span><span class="token punctuation">;</span>
            allDone<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>SecurityException</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;防火墙安全错误！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;错误&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Exclamation<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//异步回调函数</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AcceptCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Socket</span> listener <span class="token operator">=</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span>ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>
    <span class="token class-name">Socket</span> client <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">EndAccept</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    allDone<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">StateObject</span> state <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StateObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    state<span class="token punctuation">.</span>workSocket <span class="token operator">=</span> client<span class="token punctuation">;</span>

    <span class="token comment">//远端信息</span>
    <span class="token class-name">EndPoint</span> tempRemoteEP <span class="token operator">=</span> client<span class="token punctuation">.</span>RemoteEndPoint<span class="token punctuation">;</span>
    <span class="token class-name">IPEndPoint</span> tempRemoteIP <span class="token operator">=</span> <span class="token punctuation">(</span>IPEndPoint<span class="token punctuation">)</span>tempRemoteEP<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> rempip <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> remoport <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Port<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IPHostEntry</span> host <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> HostName <span class="token operator">=</span> host<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>
    statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;接受[&quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;] &quot;</span> <span class="token operator">+</span> rempip <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> remoport <span class="token operator">+</span> <span class="token string">&quot;远程计算机正确连接！&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listboxRemohost<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;[&quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;] &quot;</span> <span class="token operator">+</span> rempip <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> remoport<span class="token punctuation">)</span><span class="token punctuation">;</span>

    client<span class="token punctuation">.</span><span class="token function">BeginReceive</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> StateObject<span class="token punctuation">.</span>BufferSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
         <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>readCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//异步接收回调函数        </span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">readCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StateObject</span> state <span class="token operator">=</span> <span class="token punctuation">(</span>StateObject<span class="token punctuation">)</span>ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>
    <span class="token class-name">Socket</span> handler <span class="token operator">=</span> state<span class="token punctuation">.</span>workSocket<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> bytesRead <span class="token operator">=</span> handler<span class="token punctuation">.</span><span class="token function">EndReceive</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bytesRead <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strmsg <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytesRead<span class="token punctuation">)</span><span class="token punctuation">;</span>
        state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>strmsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> content <span class="token operator">=</span> state<span class="token punctuation">.</span>sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//远端信息</span>
        <span class="token class-name">EndPoint</span> tempRemoteEP <span class="token operator">=</span> handler<span class="token punctuation">.</span>RemoteEndPoint<span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> tempRemoteIP <span class="token operator">=</span> <span class="token punctuation">(</span>IPEndPoint<span class="token punctuation">)</span>tempRemoteEP<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> rempip <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> remoport <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Port<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPHostEntry</span> host <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> HostName <span class="token operator">=</span> host<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>

        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;正在接收[&quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;] &quot;</span> <span class="token operator">+</span> rempip <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> remoport <span class="token operator">+</span> <span class="token string">&quot;的信息...&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> time <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listboxRecv<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> time <span class="token operator">+</span> <span class="token string">&quot;) &quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listboxRecv<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>strmsg<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>content<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;\\x99\\x99&quot;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;信息接收完毕！&quot;</span><span class="token punctuation">;</span>
            <span class="token doc-comment comment">//////////////////////////////////////////////////</span>
            <span class="token comment">//接收到完整的信息 </span>
            <span class="token comment">//                     MessageBox.Show(&quot;接收到：&quot;+content);</span>
            <span class="token class-name"><span class="token keyword">string</span></span> msg <span class="token operator">=</span> poweryd<span class="token punctuation">.</span><span class="token function">CodeParse</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Send</span><span class="token punctuation">(</span>handler<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//异步发送</span>
            <span class="token comment">//                     Send(content);//用单独的socket发送</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            handler<span class="token punctuation">.</span><span class="token function">BeginReceive</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> StateObject<span class="token punctuation">.</span>BufferSize<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
                 <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>readCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//异步发送</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> handler<span class="token punctuation">,</span> <span class="token class-name">String</span> data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> byteData <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    handler<span class="token punctuation">.</span><span class="token function">BeginSend</span><span class="token punctuation">(</span>byteData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byteData<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span>
         <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCallback</span><span class="token punctuation">(</span>SendCallback<span class="token punctuation">)</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//            handler.Send(byteData);</span>
<span class="token punctuation">}</span>

<span class="token preprocessor property">#<span class="token directive keyword">region</span>  </span><span class="token comment">//用单独的socket发送</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//            string ip=this.txtRemoIP.Text;</span>
    <span class="token comment">//            string port=this.txtRemoport.Text;</span>
    <span class="token comment">//            IPAddress serverIp=IPAddress.Parse(ip);            </span>
    <span class="token comment">//            int serverPort=Convert.ToInt32(port);</span>
    <span class="token comment">//            IPEndPoint iep=new IPEndPoint(serverIp,serverPort);              </span>
    <span class="token comment">//            Socket socket=new Socket(AddressFamily.InterNetwork,SocketType.Stream,ProtocolType.Tcp);</span>
    <span class="token comment">//            socket.Connect(iep);             </span>
    <span class="token comment">//            byte[] byteMessage=Encoding.ASCII.GetBytes(data);</span>
    <span class="token comment">//            socket.Send(byteMessage);</span>
    <span class="token comment">//            socket.Shutdown(SocketShutdown.Both);</span>
    <span class="token comment">//            socket.Close();             </span>
<span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token comment">//异步发送回调函数</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendCallback</span><span class="token punctuation">(</span><span class="token class-name">IAsyncResult</span> ar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Socket</span> handler <span class="token operator">=</span> <span class="token punctuation">(</span>Socket<span class="token punctuation">)</span>ar<span class="token punctuation">.</span>AsyncState<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> bytesSent <span class="token operator">=</span> handler<span class="token punctuation">.</span><span class="token function">EndSend</span><span class="token punctuation">(</span>ar<span class="token punctuation">)</span><span class="token punctuation">;</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;发送成功！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        handler<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
        handler<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnListen_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    th <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>Listen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//以Listen过程来初始化线程实例       </span>
    th<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//启动此线程 </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>btnListen<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnClosenet_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        listenerRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        th<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        th <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;与客户端断开连接！&quot;</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;连接尚未建立,断开无效！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;警告&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnExit_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        listenerRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        th<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        th <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;与客户端断开连接！&quot;</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//异步传递的状态对象</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StateObject</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Socket</span> workSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> BufferSize <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>BufferSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre></div><h2 id="客户端-同步发送并接收" tabindex="-1"><a class="header-anchor" href="#客户端-同步发送并接收" aria-hidden="true">#</a> 客户端(同步发送并接收)</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token class-name">Socket</span> socket<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> numbyte <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span><span class="token comment">//一次接收到的字节数</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnConnect_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> ip <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>txtRemoIP<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> port <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>txtRemoport<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>

        <span class="token class-name">IPAddress</span> serverIp <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> serverPort <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPEndPoint</span> iep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>serverIp<span class="token punctuation">,</span> serverPort<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IPHostEntry</span> host <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>iep<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> HostName <span class="token operator">=</span> host<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>

        socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        socket<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>iep<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">IPEndPoint</span> tempRemoteIP <span class="token operator">=</span> <span class="token punctuation">(</span>IPEndPoint<span class="token punctuation">)</span>socket<span class="token punctuation">.</span>LocalEndPoint<span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;端口：&quot;</span> <span class="token operator">+</span> tempRemoteIP<span class="token punctuation">.</span>Port<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;正在监听......&quot;</span><span class="token punctuation">;</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;与远程计算机[&quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;] &quot;</span> <span class="token operator">+</span> ip <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> port <span class="token operator">+</span> <span class="token string">&quot;建立连接！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;无法连接到目标计算机！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span></span>
    <span class="token comment">// byteMessage=Encoding.ASCII.GetBytes(textBox1.Text+&quot;99&quot;);</span>
    <span class="token comment">// socket.Send(byteMessage);</span>
    <span class="token comment">// byte[] bytes = new byte[1024];</span>
    <span class="token comment">// socket.Receive(bytes);</span>
    <span class="token comment">// string str=Encoding.Default.GetString(bytes);</span>
    <span class="token comment">// MessageBox.Show(&quot;接收到：&quot;+str);</span>
    <span class="token comment">// socket.Shutdown(SocketShutdown.Both);</span>
    <span class="token comment">// socket.Close();</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnSend_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;正在发送信息！&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> message <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>txtsend<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
        <span class="token function">SendInfo</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token comment">//异常处理</span>
    <span class="token punctuation">{</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;无法发送信息到目标计算机！&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendInfo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span></span>
    <span class="token comment">// string ip=this.txtip.Text;</span>
    <span class="token comment">// string port=this.txtport.Text;</span>
    <span class="token comment">// </span>
    <span class="token comment">// IPAddress serverIp=IPAddress.Parse(ip);            </span>
    <span class="token comment">// int serverPort=Convert.ToInt32(port);</span>
    <span class="token comment">// IPEndPoint iep=new IPEndPoint(serverIp,serverPort);  </span>
    <span class="token comment">// byte[] byteMessage;  </span>
    <span class="token comment">// </span>
    <span class="token comment">// socket=new Socket(AddressFamily.InterNetwork,SocketType.Stream,ProtocolType.Tcp);</span>
    <span class="token comment">// socket.Connect(iep);</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> byteMessage <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>message <span class="token operator">+</span> <span class="token string">&quot;\\x99\\x99&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>byteMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//远端信息</span>
    <span class="token class-name">EndPoint</span> tempRemoteEP <span class="token operator">=</span> socket<span class="token punctuation">.</span>RemoteEndPoint<span class="token punctuation">;</span>
    <span class="token class-name">IPEndPoint</span> tempRemoteIP <span class="token operator">=</span> <span class="token punctuation">(</span>IPEndPoint<span class="token punctuation">)</span>tempRemoteEP<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> rempip <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> remoport <span class="token operator">=</span> tempRemoteIP<span class="token punctuation">.</span>Port<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IPHostEntry</span> host <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>tempRemoteIP<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> HostName <span class="token operator">=</span> host<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>

    <span class="token comment">//发送信息</span>
    <span class="token class-name"><span class="token keyword">string</span></span> time1 <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    listboxsend<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> time1 <span class="token operator">+</span> <span class="token string">&quot;) &quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    listboxsend<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//发送完了，直接接收</span>
    <span class="token class-name">StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;正在等待接收信息...&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>numbyte<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> recvbytes <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strmsg <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">string</span></span> time2 <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listboxRecv<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> time2 <span class="token operator">+</span> <span class="token string">&quot;) &quot;</span> <span class="token operator">+</span> HostName <span class="token operator">+</span> <span class="token string">&quot;：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listboxRecv<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>strmsg<span class="token punctuation">)</span><span class="token punctuation">;</span>

        sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>strmsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;\\x99\\x99&quot;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    statusBar1<span class="token punctuation">.</span>Panels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;接收信息完毕！&quot;</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">//////////////////////////////////////</span>
    <span class="token comment">//代码解码</span>
    <span class="token function">CodeParse</span><span class="token punctuation">(</span>sb<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">//////////////////////////////////////</span>
    socket<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>SocketShutdown<span class="token punctuation">.</span>Both<span class="token punctuation">)</span><span class="token punctuation">;</span>
    socket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netsoc11.html.vue"]]);export{i as default};
