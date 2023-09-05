import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="轻松定义自己的网络通讯协议" tabindex="-1"><a class="header-anchor" href="#轻松定义自己的网络通讯协议" aria-hidden="true">#</a> 轻松定义自己的网络通讯协议</h1><p>每次编写设计网络通讯程序时，总面对一个问题，就是要自定义一组应用协议（即通讯协议），然后再写相应的方法来解析协议，并提供相应的接口供上层调用。如果只是简单的文本信息通讯还容易，但要交换一些控制信息或结构复杂的数据时，比如做联机游戏，更是让人头疼。</p><p>最近突然想到一个点子，可以用对象串行化技术将对象直接转换为二进制数据发送，然后接收时直接还原为对象。具体过程是，将要发送的数据放在一个HashTable中，串行化后发送出去，在接收方接收到数据并还原为HashTable，根据预先约定好的Key和获取自己关心的数据。在这种情况下，定义通讯协议的内容实质上也就只是指定一组Key就行了。再也不用做那些规定第几个字段是什么类型有多长的烦躁的事情了。</p><p>可能很多人很善于用XML，也将之广泛用于网络通讯。XML有不可比拟的好处，因为它是同平台无关的，而且基本上任何开发语言都有现成库来解析XML。这个和我的观点并不冲突。对象串行化并不局限于二进制数据。C#里有丰富的方法，可以将对象串行化为XML文档，也支持用SOAP协议来串行化数据。所以只要用公共的串行化标准来串行化对象，也可以达到跨平台、跨语言的目的。其实现在流行的Web Service其核心技术也就大概是这样吧。</p><p>原理说完了，贴段代码做个例子。ObjectTransferClient（简称OTC）是一个利用UDP协议及二进制对象串行化的包括对象发送和接收的库。调用方法很简单，用Send发送对象，响应ReceiveObject事件来处理接收的对象。至于具体细节就不多叙述了，相信有一定C#基础的人能轻松看懂的。</p><p>这一原理的应用潜力是巨大的，我在这里抛砖引玉，还请指教。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>Serialization<span class="token punctuation">.</span>Formatters<span class="token punctuation">.</span>Binary</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">OTC</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 对象传送器，使用UDP协议通过网路在不同主机间传送对象。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObjectTransferClient</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDisposable</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Thread</span> ListenThread<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">BinaryFormatter</span> Serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_Port<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">UdpClient</span> m_Client<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_IsStart<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_IsConnected<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 接收到对象事件</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">ReceiveObjectEventHandler</span> ReceiveObject<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 构建一个对象传送器，默认端口7321</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token function">ObjectTransferClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token number">7321</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 指定端口号构建一个对象传送器。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>port<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>端口号<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token function">ObjectTransferClient</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_Port <span class="token operator">=</span> port<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_IsConnected <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_IsStart <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 初始化传送器并开始工作</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_IsStart<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UdpClient</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_Port<span class="token punctuation">)</span><span class="token punctuation">;</span>
                ListenThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Listen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                ListenThread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_IsStart <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 使用指定的主机名和端口连接默认的远程主机</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hostname<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>主机名<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>port<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>端口<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> hostname<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>hostname<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 使用指定的IP地址和端口连接默认的远程主机</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ipaddress<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>IP地址<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>port<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>端口<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token class-name">IPAddress</span> ipaddress<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ipaddress<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 使用网络终结点连接默认的远程主机</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>iep<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>网络端点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token class-name">IPEndPoint</span> iep<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>iep<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">CreateArgPackage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">IPEndPoint</span> local <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_Port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>MemoryStream</span> outStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Serializer<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>outStream<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ReceiveObjectEventArgs</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> local<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> outStream<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 将对象发送到默认主机。调用此方法前必须先调用Connect方法连接默认主机。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>obj<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>要发送的对象<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>IsConnected<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">CreateArgPackage</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;必须先连接默认主机&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 将对象发送到指定的主机。若调用了Connect方法连接了默认主机，则此方法不可用。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>obj<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>要发送的对象<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>remoteIEP<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>目标主机的网络端点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Send</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">,</span> <span class="token class-name">IPEndPoint</span> remoteIEP<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>IsConnected<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;已经连接了默认主机&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">CreateArgPackage</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> remoteIEP<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 监听接收数据线程方法</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">BinaryFormatter</span> Serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IPEndPoint</span> RemoteIpEndPoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">object</span></span> revobj <span class="token operator">=</span> Serializer<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>MemoryStream</span><span class="token punctuation">(</span>m_Client<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span><span class="token keyword">ref</span> RemoteIpEndPoint<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">ReceiveObjectEventArgs</span> revarg <span class="token operator">=</span> <span class="token punctuation">(</span>ReceiveObjectEventArgs<span class="token punctuation">)</span>revobj<span class="token punctuation">;</span>
                    RemoteIpEndPoint<span class="token punctuation">.</span>Port <span class="token operator">=</span> revarg<span class="token punctuation">.</span>RemoteIEP<span class="token punctuation">.</span>Port<span class="token punctuation">;</span>
                    revarg<span class="token punctuation">.</span>RemoteIEP <span class="token operator">=</span> RemoteIpEndPoint<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ReceiveObject <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ReceiveObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> revarg<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> 公共属性区</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 返回或设置接收对象的端口号</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Port
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_Port<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_Port <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 返回对象发送器是否已经初始化并开始工作</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsStart
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_IsStart<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 返回对象发送器是否已经连接默认远程主机</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsConnected
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_IsConnected<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> IDisposable 成员</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// TODO:  添加 ObjectTransferClient.Dispose 实现</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>m_Client<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ListenThread<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 接收对象事件参数</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token punctuation">[</span>Serializable<span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReceiveObjectEventArgs</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">EventArgs</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">object</span></span> _obj<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPEndPoint</span> _iep<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 构建一个接收对象事件的参数</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>obj<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>接收到的对象<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>iep<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>发送者的网络端点<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">internal</span> <span class="token function">ReceiveObjectEventArgs</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> obj<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPEndPoint</span> iep<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_obj <span class="token operator">=</span> obj<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>_iep <span class="token operator">=</span> iep<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 构建一个空的接收对象事件参数</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token function">ReceiveObjectEventArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 接收到的对象</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Obj
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_obj<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 发送方的网络端点</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPEndPoint</span> RemoteIEP
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_iep<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_iep <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 接收对象事件的委托</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReceiveObjectEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">ReceiveObjectEventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode44.html.vue"]]);export{i as default};
