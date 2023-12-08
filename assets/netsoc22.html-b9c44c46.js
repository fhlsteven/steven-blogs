import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-的socket收发数据过程中-如何判断连接断开、收发方主动终止、发送错误、接收错误等状态" tabindex="-1"><a class="header-anchor" href="#c-的socket收发数据过程中-如何判断连接断开、收发方主动终止、发送错误、接收错误等状态" aria-hidden="true">#</a> C#的socket收发数据过程中，如何判断连接断开、收发方主动终止、发送错误、接收错误等状态</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  C#的socket收发数据过程中，如何判断连接断开、收发方主动终止、发送错误、接收错误等状态
作　　者：  cq_lqj (程序员秘书)
等　　级：  ^
信 誉 值：  100
所属社区：  .NET技术 C#
问题点数：  100
回复次数：  22
发表时间：  2004-11-21 23:13:49
</code></pre></div><p>C#的socket的Poll在收发数据过程中，测试出的状态不好用<br> Connected的状态不是实时的<br> 发送方抛出错误无法判断是接收方主动终止还是网络线路断开了<br> 接收方更不行，就是网络线路断开或发送方主动终止都不会报错误<br><br> 我看了看以前发的贴子，好象都没有好的办法，难道C#的socket这么弱？<br> 用C++的socket开发，收、发方都能很好的判断出对方主动终止还是网络断开!<br><br> C#的高手们出来说说话!!!!!!!!!!!!!</p><hr><hr><p>回复人： windinwing(潇笑) ( 五级(中级)) 信誉：72 2004-11-22 0:58:52 得分: 0</p><blockquote><p>异常处理其实很强大的</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SocketException</span> x<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>ErrorCode <span class="token operator">==</span> <span class="token number">10004</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>还有写自已的异常处理类</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> public enum ReadReplyCode</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// Reply reading return codes.</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ReadReplyCode</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Read completed successfully.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    Ok <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Read timed out.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    TimeOut <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Maximum allowed Length exceeded.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    LengthExceeded <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Connected client closed connection.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    SocketClosed <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// UnKnown error, eception raised.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    UnKnownError <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// Summary description for ReadException.</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReadException</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Exception</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ReadReplyCode</span> m_ReadReplyCode<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>code<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>message<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token function">ReadException</span><span class="token punctuation">(</span><span class="token class-name">ReadReplyCode</span> code<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_ReadReplyCode <span class="token operator">=</span> code<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> Properties Implementation</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Gets read error.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token return-type class-name">ReadReplyCode</span> ReadReplyCode
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_ReadReplyCode<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token class-name">ReadReplyCode</span> replyCode <span class="token operator">=</span> ReadReplyCode<span class="token punctuation">.</span>Ok<span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token class-name">_FixedStack</span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">_FixedStack</span><span class="token punctuation">(</span>terminator<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">long</span></span> readedCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> nextReadWriteLen <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>nextReadWriteLen <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Read byte(s)</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>nextReadWriteLen<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> countRecieved <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>countRecieved <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            readedCount <span class="token operator">+=</span> countRecieved<span class="token punctuation">;</span>

            <span class="token comment">// Write byte(s) to buffer, if length isn&#39;t exceeded.</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>readedCount <span class="token operator">&lt;=</span> maxLength<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                storeStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> countRecieved<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Write to stack(terminator checker)</span>
            nextReadWriteLen <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> countRecieved<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// Client disconnected</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> ReadReplyCode<span class="token punctuation">.</span>SocketClosed<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">OnActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Check if length is exceeded</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>readedCount <span class="token operator">&gt;</span> maxLength<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ReadReplyCode<span class="token punctuation">.</span>LengthExceeded<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// If reply is ok then remove chars if any specified by &#39;removeFromEnd&#39;.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>replyCode <span class="token operator">==</span> ReadReplyCode<span class="token punctuation">.</span>Ok <span class="token operator">&amp;&amp;</span> removeFromEnd<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        storeStream<span class="token punctuation">.</span><span class="token function">SetLength</span><span class="token punctuation">(</span>storeStream<span class="token punctuation">.</span>Length <span class="token operator">-</span> removeFromEnd<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Logging stuff</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>m_pLogger <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>storeStream <span class="token keyword">is</span> <span class="token class-name">MemoryStream</span> <span class="token operator">&amp;&amp;</span> storeStream<span class="token punctuation">.</span>Length <span class="token operator">&lt;</span> <span class="token number">200</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token punctuation">(</span>MemoryStream<span class="token punctuation">)</span>storeStream<span class="token punctuation">;</span>
            m_pLogger<span class="token punctuation">.</span><span class="token function">AddReadEntry</span><span class="token punctuation">(</span>m_pEncoding<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            m_pLogger<span class="token punctuation">.</span><span class="token function">AddReadEntry</span><span class="token punctuation">(</span><span class="token string">&quot;Big binary, readed &quot;</span> <span class="token operator">+</span> readedCount<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; bytes.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> x<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    replyCode <span class="token operator">=</span> ReadReplyCode<span class="token punctuation">.</span>UnKnownError<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token keyword">is</span> <span class="token class-name">SocketException</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SocketException</span> xS <span class="token operator">=</span> <span class="token punctuation">(</span>SocketException<span class="token punctuation">)</span>x<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>xS<span class="token punctuation">.</span>ErrorCode <span class="token operator">==</span> <span class="token number">10060</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> ReadReplyCode<span class="token punctuation">.</span>TimeOut<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">return</span> replyCode<span class="token punctuation">;</span>
</code></pre></div><blockquote><p>这些问题全解决了 呵呵</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-22 1:29:47 得分: 0</p><blockquote><p>老大是不是写得有点乱<br> _FixedStack是什么<br> 你这段代码不好调试啊？再全一点好吗，老大</p></blockquote><p>回复人： windinwing(潇笑) ( 五级(中级)) 信誉：72 2004-11-22 2:11:28 得分: 0</p><blockquote><p>晕的_FixedStack是一个封装的byte位操作类，不用管他<br> 只是一种处理思路，不是拿来调试的，不然又要一堆代码</p></blockquote><p>回复人： cxyPioneer(sunny) ( 四级(中级)) 信誉：100 2004-11-22 8:28:55 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： 520NET(随风) ( 五级(中级)) 信誉：100 2004-11-22 8:30:25 得分: 0</p><blockquote><p>LG</p></blockquote><p>回复人： xiaoslong(龙哥) ( 五级(中级)) 信誉：65 2004-11-22 9:13:14 得分: 0</p><blockquote><p>帮你顶</p></blockquote><p>回复人： jimh(jimmy) ( 五级(中级)) 信誉：100 2004-11-22 9:16:03 得分: 0</p><blockquote><p>顶</p></blockquote><p>回复人： cdo(cdo) ( 三级(初级)) 信誉：100 2004-11-22 9:51:30 得分: 0</p><blockquote><p>帮你顶：）</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-22 14:41:51 得分: 0</p><blockquote><p>帮我顶哈</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-23 8:38:21 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： cq_luqinjian(深入学习C#) ( 一级(初级)) 信誉：100 2004-11-23 13:51:21 得分: 0</p><blockquote><p>顶起不放</p></blockquote><p>回复人： catman3000(catman) ( 二级(初级)) 信誉：91 2004-11-23 16:44:48 得分: 0</p><blockquote><p>帮你顶</p></blockquote><p>回复人： luncashcage(自清闲) ( 一级(初级)) 信誉：100 2004-11-24 8:52:26 得分: 0</p><blockquote><p>这个代码写的确实有点乱。没空细心看的阿。</p></blockquote><p>回复人： xiaoslong(龙哥) ( 五级(中级)) 信誉：65 2004-11-24 9:03:25 得分: 0</p><blockquote><p>帮你顶</p></blockquote><p>回复人： kgd198294(来自湖南) ( 一级(初级)) 信誉：100 2004-11-24 10:06:49 得分: 0</p><blockquote><p>有两种方法：<br> 1：用try catch捕捉<br> 2：设置好要接收数据的总长度，当数据接收完后。数据是否达到要求，如未达到要求，则可知道对方，半路中断</p></blockquote><p>回复人： singleflower(shifan(愿父亲安息)) ( 五级(中级)) 信誉：100 2004-11-24 10:16:24 得分: 0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SocketException</span> x<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>ErrorCode <span class="token operator">==</span> <span class="token number">10004</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>我觉得这种方式最好，或者用个SWITCH，这样扩充性好，如果要扑捉新的错误，加个CASE很容易的</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-24 13:00:46 得分: 0</p><blockquote><p>楼上两位朋友，你们用socket编程传输文件没有？<br><br> 用try catch捕捉，发送端没有问题的，对方主动终止或线路断开都会抛出错误的!可以很好的处理。<br> 关键是接收端：当只接收了部分数据时，对方主动终止或线路断开，<code>iNumByte=rBinarySocket.Receive(pBuf);</code>不会抛出任何错误<br> 如果这时线路断开它只有不停的循环接收。<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">while</span><span class="token punctuation">(</span>uiTotal <span class="token operator">&lt;</span> uilength<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
    iNumByte<span class="token operator">=</span>rBinarySocket<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>pBuf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
    uiTotal<span class="token operator">+=</span>iNumByte<span class="token punctuation">;</span>
    Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： TigerSuper(菜鸟) ( 一级(初级)) 信誉：100 2004-11-24 14:02:37 得分: 0</p><blockquote><p>UP</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-25 8:15:01 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-25 11:11:12 得分: 0</p><blockquote><p>up</p></blockquote><p>回复人： yzh0523(水手) ( 四级(中级)) 信誉：100 2004-11-25 11:25:52 得分: 0</p><blockquote><p>mark</p></blockquote><p>回复人： cq_lqj(程序员秘书) ( 一级(初级)) 信誉：100 2004-11-29 11:01:11 得分: 0</p><blockquote><p>up</p></blockquote>`,56),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netsoc22.html.vue"]]);export{i as default};
