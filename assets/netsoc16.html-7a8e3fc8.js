import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t="/steven-blogs/assets/netsoc16_1-76a923d4.png",o={},c=p('<h1 id="使用c-开发一个简单的p2p应用" tabindex="-1"><a class="header-anchor" href="#使用c-开发一个简单的p2p应用" aria-hidden="true">#</a> 使用C#开发一个简单的P2P应用</h1><p>作者： 刘彦青</p><p>本篇文章讨论了一种设计P2P网络应用程序的简单方法。</p><p>尽管有许多P2P网络不需要索引服务器或中央服务器，各客户机之间可以互相直接通讯，但下面的图1还是显示了P2P网络的基本工作原理，一般来说，P2P概念中包含一台中央索引服务器，这台服务器并不存储有任何文件，它只存储有登录到该网络上的所有用户的信息、客户端的IP地址以及用户提供的供共享的文件，客户机和服务器使用简单的命令通过报路连接进行通讯。</p><p>当客户端A想要查找P2P网络上其他客户端提供共享的文件时，系统会执行下面的操作：</p><ul><li>客户端A以自己的用户名登录到索引服务器上。</li><li>客户端A向服务器注册自己想提供给其他用户共享的文件，以便其他用户能够查找到这些文件。</li><li>客户端A向服务器发出申请，查找与一定的输入模式相匹配的文件。</li><li>索引服务器在其数据库中搜索给定的文件名，并将搜索到的如下的结果返回给客户端A</li><li>提供该文件的客户端，例如客户端B。</li><li>该用户的IP地址。</li><li>它搜索到的文件名。</li></ul><p>一旦客户端A选择了下载选项，客户端A就使用搜索返回的IP地址与客户端B建立连接。</p><ul><li>一旦成功地建立起一个连接，就可以通知对方开始发送文件了。</li><li>下载完成后，应当向索引服务器注册你得到的共享文件的拷贝。</li></ul><p>这样的P2P网络可以用来共享任何类型的文件，它既可以用在局域网上，也可以作在互联网上。</p><p><img src="'+t+`" alt="16_1"></p><p>C#语言由于其对网络功能良好的支持，特别是内置地支持<code>TCPListener</code>和<code>TCPClient</code>这二个类，使得利用它开发P2P应用程序变得非常容易。下面就是一个使用C#开发的P2P应用的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>
    <span class="token keyword">public</span> <span class="token function">MyTcpListener</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StopMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Server <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Server<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Transfer</span>
<span class="token punctuation">{</span>
    <span class="token class-name">MyTcpListener</span> tcpl<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Transfer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">OptionsLoader</span> ol <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OptionsLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">8081</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ol<span class="token punctuation">.</span>Port <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            port <span class="token operator">=</span> ol<span class="token punctuation">.</span>Port<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            port <span class="token operator">=</span> <span class="token number">8081</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>tcpl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyTcpListener</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TransferShutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        tcpl<span class="token punctuation">.</span><span class="token function">StopMe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ListenForPeers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Encoding</span> ASCII <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">;</span>
            tcpl<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// 在有连接之前，Accept将处于阻塞状态 </span>
                <span class="token class-name">Socket</span> s <span class="token operator">=</span> tcpl<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">NetworkStream</span> DataStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name">String</span> filename<span class="token punctuation">;</span>
                <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                DataStream<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                filename <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">StringBuilder</span> sbFileName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">StringBuilder</span> sbFileName2 <span class="token operator">=</span> sbFileName<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\\\\\&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name">FileStream</span> fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>sbFileName2<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">BinaryReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> read<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>read <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    DataStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> read<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                DataStream<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                DataStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SocketException</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DownloadToClient</span><span class="token punctuation">(</span><span class="token class-name">String</span> server<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> remotefilename<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> localfilename<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">TcpClient</span> tcpc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> read <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token class-name">OptionsLoader</span> ol <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OptionsLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ol<span class="token punctuation">.</span>Port <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                port <span class="token operator">=</span> ol<span class="token punctuation">.</span>Port<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// 缺省的端口号，可以设置为使用的端口号 </span>
                port <span class="token operator">=</span> <span class="token number">8081</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 尝试与服务器连接 </span>
            <span class="token class-name">IPHostEntry</span> IPHost <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> aliases <span class="token operator">=</span> IPHost<span class="token punctuation">.</span>Aliases<span class="token punctuation">;</span>
            <span class="token class-name">IPAddress<span class="token punctuation">[</span><span class="token punctuation">]</span></span> addr <span class="token operator">=</span> IPHost<span class="token punctuation">.</span>AddressList<span class="token punctuation">;</span>

            <span class="token class-name">IPEndPoint</span> ep <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>addr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            tcpc<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ep<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 获得流对象 </span>
            <span class="token class-name">Stream</span> s <span class="token operator">=</span> tcpc<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> b <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>remotefilename<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            s<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> bytes<span class="token punctuation">;</span>
            <span class="token class-name">FileStream</span> fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>localfilename<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>OpenOrCreate<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BinaryWriter</span> w <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryWriter</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 读取流对象，并将其转换为ASCII码 </span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bytes <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>read<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> read<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>read<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
                read <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            tcpc<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            w<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,12),e=[c];function u(l,k){return s(),a("div",null,e)}const r=n(o,[["render",u],["__file","netsoc16.html.vue"]]);export{r as default};
