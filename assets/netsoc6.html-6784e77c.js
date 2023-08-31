import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},o=t(`<h1 id="关于socket的学习代码" tabindex="-1"><a class="header-anchor" href="#关于socket的学习代码" aria-hidden="true">#</a> 关于Socket的学习代码</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sample</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">DoSocketGet</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> server<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Set up variables and String to write to the server.</span>
        <span class="token class-name">Encoding</span> ASCII <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> Get <span class="token operator">=</span> <span class="token string">&quot;GET / HTTP/1.1\\r\\nHost: &quot;</span> <span class="token operator">+</span> server <span class="token operator">+</span>
                     <span class="token string">&quot;\\r\\nConnection: Close\\r\\n\\r\\n&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ByteGet <span class="token operator">=</span> ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>Get<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> RecvBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> strRetPage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token comment">// IPAddress and IPEndPoint represent the endpoint that will</span>
        <span class="token comment">//   receive the request.</span>
        <span class="token comment">// Get first IPAddress in list return by DNS.</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Define those variables to be evaluated in the next for loop and </span>
            <span class="token comment">// then used to connect to the server. These variables are defined</span>
            <span class="token comment">// outside the for loop to make them accessible there after.</span>
            <span class="token class-name">Socket</span> s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> hostEndPoint<span class="token punctuation">;</span>
            <span class="token class-name">IPAddress</span> hostAddress <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> conPort <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>

            <span class="token comment">// Get DNS host information.</span>
            <span class="token class-name">IPHostEntry</span> hostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">Resolve</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// Get the DNS IP addresses associated with the host.</span>
            <span class="token class-name">IPAddress<span class="token punctuation">[</span><span class="token punctuation">]</span></span> IPaddresses <span class="token operator">=</span> hostInfo<span class="token punctuation">.</span>AddressList<span class="token punctuation">;</span>

            <span class="token comment">// Evaluate the socket and receiving host IPAddress and IPEndPoint. </span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> IPaddresses<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                hostAddress <span class="token operator">=</span> IPaddresses<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
                hostEndPoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>hostAddress<span class="token punctuation">,</span> conPort<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Creates the Socket to send data over a TCP connection.</span>
                s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Socket</span><span class="token punctuation">(</span>AddressFamily<span class="token punctuation">.</span>InterNetwork<span class="token punctuation">,</span> SocketType<span class="token punctuation">.</span>Stream<span class="token punctuation">,</span> ProtocolType<span class="token punctuation">.</span>Tcp<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Connect to the host using its IPEndPoint.</span>
                s<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>hostEndPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>s<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">// Connection failed, try next IPaddress.</span>
                    strRetPage <span class="token operator">=</span> <span class="token string">&quot;Unable to connect to host&quot;</span><span class="token punctuation">;</span>
                    s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// Sent the GET request to the host.</span>
                s<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>ByteGet<span class="token punctuation">,</span> ByteGet<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span> <span class="token comment">// End of the for loop.      </span>

            <span class="token comment">// Receive the host home page content and loop until all the data is received.</span>
            <span class="token class-name">Int32</span> bytes <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> RecvBytes<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            strRetPage <span class="token operator">=</span> <span class="token string">&quot;Default HTML page on &quot;</span> <span class="token operator">+</span> server <span class="token operator">+</span> <span class="token string">&quot;:\\r\\n&quot;</span><span class="token punctuation">;</span>
            strRetPage <span class="token operator">=</span> strRetPage <span class="token operator">+</span> ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>bytes <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                bytes <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> RecvBytes<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                strRetPage <span class="token operator">=</span> strRetPage <span class="token operator">+</span> ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>RecvBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token comment">// End of the try block.</span>

        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SocketException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;SocketException caught!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Source : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Source<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Message : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ArgumentNullException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;ArgumentNullException caught!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Source : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Source<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Message : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NullReferenceException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;NullReferenceException caught!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Source : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Source<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Message : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Exception caught!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Source : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Source<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Message : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> strRetPage<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;请需入请求地址:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> server <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">DoSocketGet</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//存一下档</span>
        <span class="token class-name"><span class="token keyword">string</span></span> path <span class="token operator">=</span> <span class="token string">@&quot;D:\\Socket.html&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            File<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">FileStream</span> fs <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> bs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UTF8Encoding</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token function">DoSocketGet</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fs<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bs<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bs<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netsoc6.html.vue"]]);export{i as default};
