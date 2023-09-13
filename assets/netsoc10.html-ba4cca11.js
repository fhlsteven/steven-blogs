import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="用socket实现点对点的文件传输" tabindex="-1"><a class="header-anchor" href="#用socket实现点对点的文件传输" aria-hidden="true">#</a> 用Socket实现点对点的文件传输</h1><p>System.Sockes命名空间了实现 Berkeley 套接字接口。通过这个类，我们可以实现网络计算机之间的消息传输和发送.而在我下面要讨论的这个议题里,我们将讨论的是用套节子实现文件的传输.这种方法有别于FTP协议实现的的文件传输方法,利用ftp的方法需要一个专门的服务器和客户端,无疑于我们要实现的点对点的文件传输太为复杂了一些。在这里，我们实现一个轻量级的方法来实现点对点的文件传输，这样就达到了intenet上任何两个计算机的文件共享。</p><p>在两台计算机传输文件之前，必需得先有一台计算机建立套节子连接并绑定一个固定得端口，并在这个端口侦听另外一台计算机的连接请求。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span>SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>
socket<span class="token punctuation">.</span>Blocking <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">;</span>
<span class="token class-name">IPEndPoint</span> computernode1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>serverIpadress<span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

socket<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>computernode1<span class="token punctuation">)</span><span class="token punctuation">;</span>

socket<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>当有其他的计算机发出连接请求的时候，被请求的计算机将对每一个连接请求分配一个线程，用于处理文件传输和其他服务。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    clientsock <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>clientsock<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> tc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>listenclient<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tc<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面的代码展示了listenclient方法是如何处理另外一台计算机发送过来的请求。首先并对发送过来的请求字符串作出判断，看看是何种请求，然后决定相应的处理方法。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">listenclient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Socket</span> sock <span class="token operator">=</span> clientsock<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>sock <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> recs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">32767</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> rcount <span class="token operator">=</span> sock<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>recs<span class="token punctuation">,</span> recs<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> message <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>recs<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//对message作出处理，解析处请求字符和参数存储在cmdList 中</span>
            execmd＝cmdList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            sender <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            sender <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">32767</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> parm1 <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">//目录列举     </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>execmd <span class="token operator">==</span> <span class="token string">&quot;LISTING&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">ListFiles</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//文件传输</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>execmd <span class="token operator">==</span> <span class="token string">&quot;GETOK&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                cmd <span class="token operator">=</span> <span class="token string">&quot;BEGINSEND &quot;</span> <span class="token operator">+</span> filepath <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> filesize<span class="token punctuation">;</span>
                sender <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                sender <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sock<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> sender<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//转到文件下载处理</span>
                <span class="token function">DownloadingFile</span><span class="token punctuation">(</span>sock<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> Se<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> Se<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>至此，基本的工作已经完成了，下面我们看看如何处理文件传输的。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>rdby <span class="token operator">&lt;</span> total <span class="token operator">&amp;&amp;</span> nfs<span class="token punctuation">.</span>CanWrite<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//从要传输的文件读取指定长度的数据</span>
    len <span class="token operator">=</span> fin<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffed<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffed<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//将读取的数据发送到对应的计算机</span>
    nfs<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffed<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//增加已经发送的长度</span>
    rdby <span class="token operator">=</span> rdby <span class="token operator">+</span> len<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从上面的代码可以看出是完成文件转换成FileStream 流，然后通过NetworkStream绑定对应的套节子，最后调用他的write方法发送到对应的计算机。</p><p>我们再看看接受端是如何接受传输过来的流，并且转换成文件的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">NetworkStream</span> nfs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkStream</span><span class="token punctuation">(</span>sock<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">//一直循环直到指定的文件长度</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>rby <span class="token operator">&lt;</span> size<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">//读取发送过来的文件流</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> nfs<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        fout<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rby <span class="token operator">=</span> rby <span class="token operator">+</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    fout<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从上面可以看出接受与发送恰好是互为相反的过程，非常简单。</p><p>至此，单方向的文件传输就完成了，只需要在每个对等的节点上同时实现上面的发送和接受的处理代码就可以做到互相传输文件了。</p>`,15),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netsoc10.html.vue"]]);export{i as default};
