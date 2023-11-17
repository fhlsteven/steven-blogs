import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="第八章-用c-写组件" tabindex="-1"><a class="header-anchor" href="#第八章-用c-写组件" aria-hidden="true">#</a> 第八章 用C#写组件</h1><p>这一章关于用C#写组件。你学到如何写一个组件，如何编译它，且如何在一个客户程序中使用它。更深入一步是运用名字空间来组织你的应用程序。</p><p>这章由两个主要大节构成：</p><ul><li>你的第一个组件</li><li>使用名字空间工作</li></ul><h2 id="_8-1-你的第一个组件" tabindex="-1"><a class="header-anchor" href="#_8-1-你的第一个组件" aria-hidden="true">#</a> 8.1 你的第一个组件</h2><p>到目前为止，在本书中提到的例子都是在同一个应用程序中直接使用一个类。类和它的使用者被包含在同一个执行文件中。现在我们将把类和使用者分离到组件和客户，它们分别位于不同的二进制文件中（可执行文件）。</p><p>尽管你仍然为组件创建一个 DLL，但其步骤与用C++写一个COM组件差别很大。你很少涉及到底层结构。以下小节说明了如何构建一个组件以及使用到它的客户：</p><ul><li>构建组件</li><li>编译组件</li><li>创建一个简单的客户应用程序</li></ul><h3 id="_8-1-1-构建组件" tabindex="-1"><a class="header-anchor" href="#_8-1-1-构建组件" aria-hidden="true">#</a> 8.1.1 构建组件</h3><p>因为我是一个使用范例迷，我决定创建一个相关Web的类，以方便你们使用。它返回一个Web网页并储存在一个字符串变量中，以供后来重用。所有这些编写都参考了.NET框架的帮助文档。</p><p>类名为<code>RequestWebPage</code>；它有两个构造函数—— 一个属性和一个方法。属性被命名为URL，且它储存了网页的Web地址，由方法GetContent返回。这个方法为你做了所有的工作（见清单8.1）。</p><p>清单 8.1 用于从Web服务器返回HTML网页的RequestWebPage 类</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequestWebPage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> BUFFER_SIZE <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_strURL<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">RequestWebPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">RequestWebPage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strURL<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        m_strURL <span class="token operator">=</span> strURL<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> URL
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_strURL<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> m_strURL <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetContent</span><span class="token punctuation">(</span><span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> strContent<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 检查 URL</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>m_strURL <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;URL must be provided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">WebRequest</span> theRequest <span class="token operator">=</span> <span class="token punctuation">(</span>WebRequest<span class="token punctuation">)</span>WebRequestFactory<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>m_strURL<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WebResponse</span> theResponse <span class="token operator">=</span> theRequest<span class="token punctuation">.</span><span class="token function">GetResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 给回应设置字节缓冲区</span>
        <span class="token class-name"><span class="token keyword">int</span></span> BytesRead <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>BUFFER_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token class-name">Stream</span> ResponseStream <span class="token operator">=</span> theResponse<span class="token punctuation">.</span><span class="token function">GetResponseStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        BytesRead <span class="token operator">=</span> ResponseStream<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BUFFER_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//使用 StringBuilder 以加速分配过程</span>
        <span class="token class-name">StringBuilder</span> strResponse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>BytesRead <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            strResponse<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BytesRead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            BytesRead <span class="token operator">=</span> ResponseStream<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BUFFER_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 赋给输出参数</span>
        strContent <span class="token operator">=</span> strResponse<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>本应该利用无参数构造函数完成工作，但我决定在构造函数中初始化URL，这可能会很有用。当后来决定要改变URL时——为了返回第二个网页，例如，通过URL属性的get和set访问标志使它被公开了。</p><p>有趣的事始于<code>GetContent</code>方法。首先，代码对URL实行十分简单的检查，如果它不适合，就会引发一个<code>ArgumentException</code> 异常。之后，我请求<code>WebRequestFactory</code> ，以创建一个基于传递给它的URL的<code>WebRequest</code>对象。</p><p>因为我不想发送cookies、附加头和询问串等，所以立即访问WebResponse（第32行）。如果你需要请求上述任何的功能，必须在这一行之前实现它们。</p><p>第35和36行初始化一个字节缓冲区，它用于从返回流中读数据。暂时忽略<code>StringBuilder</code>类，只要返回流中仍然有要读的数据，while循环就会简单地重复。最后的读操作将返回零，因此结束了该循环。</p><p>现在我想回到<code>StringBuilder</code>类。为什么用这个类的实例而不是简单地把字节缓冲区合并到一个字符串变量？看下面这个例子：</p><p><code>strMyString = strMyString + &quot;some more text&quot;;</code></p><p>这里很清楚，你正在拷贝值。常量 &quot;some more text&quot; 以一个字符串变量类型被加框，且根据加法操作创建了一个新的字符串变量。接着被赋给了 strMyString。有很多次拷贝，是吗？</p><p>但你可能引起争论</p><p><code>strMyString += &quot;some more text&quot;;</code></p><p>不要炫耀这种行为。对不起，对于C#这是一个错误的答案。其操作完全与所描述的赋值操作相同。</p><p>不涉及该问题的另外的途径是使用<code>StringBuilder</code>类。它利用一个缓冲区进行工作，接着，在没有发生我所描述的拷贝行为的情况下，你进行追加、插入、删除和替换操作。这就是为什么我在类中使用它来合并那些读自缓冲区中的内容。</p><p>该缓冲区把我带进了这个类中最后重要的代码片段——第45行的编码转换。它只不过涉及到我获得请求的字符集。</p><p>最后，当所有的内容被读入且被转换时，我显式地从<code>StringBuilder</code>请求一个字符串对象并把它赋给了输出变量。一个返回值仍然会导致另外的拷贝操作。</p><h3 id="_8-1-2-编译组件" tabindex="-1"><a class="header-anchor" href="#_8-1-2-编译组件" aria-hidden="true">#</a> 8.1.2 编译组件</h3><p>到目前为止，你所做的工作与在正常应用程序的内部编写一个类没有什么区别。所不同的是编译过程。你必须创建一个库而不是一个应用程序：</p><p><code>csc /r:System.Net.dll /t:library /out:wrq.dll webrequest.cs</code></p><p>编译开关<code>/t:library</code> 告诉C#编译，要创建一个库而不是搜寻一个静态 <code>Main</code>方法。同样，因为我正在使用 <code>System.Net</code>名字空间，所以必须引用 (<code>/r:</code>)它的库，这个库就是<code>System.Net.dll</code>。</p><p>你的库命名为<code>wrq.dll</code>，现在它准备用于一个客户应用程序。因为在这章中我仅使用私有组件工作，所以你不必把库拷贝到一个特殊的位置，而是拷贝到客户应用程序目录。</p><h3 id="_8-1-3-创建一个简单的客户应用程序" tabindex="-1"><a class="header-anchor" href="#_8-1-3-创建一个简单的客户应用程序" aria-hidden="true">#</a> 8.1.3 创建一个简单的客户应用程序</h3><p>当一个组件被写成且被成功地编译时，你所要做的就是在客户应用程序中使用它。我再次创建了一个简单的命令行应用程序，它返回了我维护的一个开发站点的首页（见清单8.2）。</p><p>清单 8.2 用 RequestWebPage 类返回一个简单的网页</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TestWebReq</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">RequestWebPage</span> wrq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RequestWebPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        wrq<span class="token punctuation">.</span>URL <span class="token operator">=</span> <span class="token string">&quot;http://www.alphasierrapapa.com/iisdev/&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">string</span></span> strResult<span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            wrq<span class="token punctuation">.</span><span class="token function">GetContent</span><span class="token punctuation">(</span><span class="token keyword">out</span> strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，我已经在一个<code>try</code> <code>catch</code>语句中包含了对 <code>GetContent</code>的调用。其中的一个原因是GetContent可能引发一个<code>ArgumentException</code>异常。此外，我在组件内部调用的.NET框架类也可以引发异常。因为我不能在类的内部处理这些异常，所以我必须在这里处理它们。</p><p>其余的代码只不过是简单的组件使用——调用标准的构造函数，存取一个属性，并执行一个方法。但等一下：你需要注意何时编译应用程序。一定要告诉编译器，让它引用你的新组件库DLL：</p><p><code>csc /r:wrq.dll wrclient.cs</code></p><p>现在万事俱备，你可以测试程序了。输出结果会滚屏，但你可以看到应用程序工作。使用了常规的表达式，你也可以增加代码，以解析返回的HTML，并依据你个人的喜好，提取信息。我预想会使用到这个类新版本的SSL（安全套接字层），用于ASP+网页中的在线信用卡验证。</p><p>你可能会注意到，没有特殊的using 语句用于你所创建的库。原因是你在组件的源文件中没有定义名字空间。</p><h2 id="_8-2-使用名字空间工作" tabindex="-1"><a class="header-anchor" href="#_8-2-使用名字空间工作" aria-hidden="true">#</a> 8.2 使用名字空间工作</h2><p>你经常使用到名字空间，例如System 和System.Net。C#利用名字空间来组织程序，而且分层的组织使一个程序的成员传到另一个程序变得更容易。</p><p>尽管不强制，但你总要创建名字空间，以清楚地识别应用程序的层次。.NET框架会给出构建这种分层的良好思想。</p><p>以下的代码片段显示了在C#原文件中简单的名字空间 My.Test（点号表示一个分层等级）的声明：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">My<span class="token punctuation">.</span>Test</span>
<span class="token punctuation">{</span>
    <span class="token comment">//这里的任何东西属于名字空间</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当你访问名字空间中的一个成员时，也有必要使用名字空间标识符完全地验证它，或者利用using标志把所有的成员引入到你当前的名字空间。本书前面的例子演示了如何应用这些技术。</p><p>在开始使用名字空间之前，只有少数有关存取安全的词。如果你不增加一个特定的存取修饰符，所有的类型将被默认为internal 。当你想从外部访问该类型时，使用 public 。不允许其它的修饰符。</p><p>这是关于名字空间充分的理论。让我们继续实现该理论——以下小节说明了当构建组件应用程序时，如何使用名字空间</p><ul><li>在名字空间中包装类</li><li>在客户应用程序中使用名字空间</li><li>为名字空间增加多个类</li></ul><h3 id="_8-2-1-在名字空间中包装类" tabindex="-1"><a class="header-anchor" href="#_8-2-1-在名字空间中包装类" aria-hidden="true">#</a> 8.2.1 在名字空间中包装类</h3><p>既然你知道了名字空间的理论含义，那么让我们在现实生活中实现它吧。在这个和即将讨论到的例子中，自然选择到的名字空间是Presenting.CSharp。为了不使你厌烦，仅仅是把RequestWebPage包装到Presenting.CSharp中，我决定写一个类，用于 Whois查找（见清单8.3）。</p><p>清单 8.3 在名字空间中实现 WhoisLookup类</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Presenting<span class="token punctuation">.</span>CSharp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WhoisLookup</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Query</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strDomain<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> strWhoisInfo<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> BUFFER_SIZE <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> <span class="token operator">==</span> strDomain<span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;You must specify a domain name.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">TCPClient</span> tcpc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TCPClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            strWhoisInfo <span class="token operator">=</span> <span class="token string">&quot;N/A&quot;</span><span class="token punctuation">;</span>

            <span class="token comment">// 企图连接 whois 服务器</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tcpc<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token string">&quot;whois.networksolutions.com&quot;</span><span class="token punctuation">,</span> <span class="token number">43</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

            <span class="token comment">// 获取流</span>
            <span class="token class-name">Stream</span> s <span class="token operator">=</span> tcpc<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 发送请求</span>
            strDomain <span class="token operator">+=</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> bDomArr <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>strDomain<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            s<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>bDomArr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> strDomain<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> Buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span>BUFFER_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">StringBuilder</span> strWhoisResponse <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> BytesRead <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BUFFER_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>BytesRead <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                strWhoisResponse<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BytesRead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                BytesRead <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>Buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> BUFFER_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            tcpc<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            strWhoisInfo <span class="token operator">=</span> strWhoisResponse<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>名字空间在第6行被声明，而且它用第7行和第47行的大括弧括住了WhoisLookup类。要声明自己新的名字空间，实际要做的就是这些。</p><p>在<code>WhoisLookup</code>类中当然具有一些有趣代码，特别是由于它说明了使用C#进行socket编程是多么的容易。在static Query method中经过 not-so-stellar域名检查之后，我实例化了TCPClient类型的一个对象，它用来完成具有 Whois服务器的43端口上的所有通讯。在第21行建立了服务器连接：</p><p><code>if (tcpc.Connect(&quot;whois.networksolutions.com&quot;, 43) != 0)</code></p><p>因为连接失败是预料到的结果，所以这个方法不能引发一个异常。（你还记住异常处理的“要”和“不要”吗？） 返回值是一个错误代码，而返回零则说明连接成功。</p><p>对于 Whois 查找，我必须首先发出一些信息给服务器——我要查找的域名。要完成此项工作，首先获得一个引用给当前TCP连接的双向流（第25行）。接着附加上一个回车/换行对 给域名，以表示询问结束。重新以字节数组打包，向Whois 服务器发送一个请求（第30行）。</p><p>余下的代码和RequestWebPage类极其相似。在该类中，我再次利用一个缓冲区从远程服务器读入回应。当缓冲区完成读入后，连接被断开。返回的回应被转给了调用者。我明确地调用 Close 方法的原因是我不想等待垃圾收集器毁坏连接。连接时间不要过长，以免占用TCP端口这种稀有资源。</p><p>在可以使用.NET 组件中的类之前，你必须把它作为一个库来编译。尽管现在有了一个已定义的名字空间，该编译命令仍然没有变：</p><p><code>csc /r:System.Net.dll /t:library /out:whois.dll whois.cs</code></p><p>注意，如果你想该库按与C#源文件相同的方法命名，就没有必要规定 <code>/out:</code>开关。规定该开关是一个良好的习惯，因为很多项目不会只由单个源文件组成。如果你规定了多个源文件，该库以名单中的第一个命名。</p><h3 id="_8-2-2-在客户应用程序中使用名字空间" tabindex="-1"><a class="header-anchor" href="#_8-2-2-在客户应用程序中使用名字空间" aria-hidden="true">#</a> 8.2.2 在客户应用程序中使用名字空间</h3><p>由于你使用了名字空间开发组件，所以客户也要引入名字空间</p><p><code>using Presenting.CSharp;</code></p><p>或者给名字空间中的成员使用完全资格名(fully qualified name)，例如</p><p><code>Presenting.CSharp.WhoisLookup.Query(...);</code></p><p>如果你不期望在名字空间中引入的成员之间出现冲突，using 标志（directive）是首选，特别是由于你具有很少的类型时。使用组件的客户程序样本在清单8.4中给出。</p><p>清单 8.4 测试 WhoisLookup 组件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Presenting<span class="token punctuation">.</span>CSharp</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TestWhois</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strResult<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> bReturnValue<span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            bReturnValue <span class="token operator">=</span> WhoisLookup<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">&quot;microsoft.com&quot;</span><span class="token punctuation">,</span> <span class="token keyword">out</span> strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>bReturnValue<span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Could not obtain information from server.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第2行利用using 标志引入了Presenting.CSharp名字空间。现在，我无论什么时候引用WhoisLookup ，都可以忽略名字空间的完全资格名了。</p><p>该程序对 microsoft.com 域进行一次Whois 查找——你也可以用自己的域名代替microsoft.com 。允许命令行参数传递域名，可使客户的用途更广。清单8.5 实现了该功能，但它不能实现适当的异常处理（为了使程序更短）。</p><p>清单 8.5 传递命令行参数给Query 方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Presenting<span class="token punctuation">.</span>CSharp</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">WhoisShort</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strResult<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> bReturnValue<span class="token punctuation">;</span>

        bReturnValue <span class="token operator">=</span> WhoisLookup<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>bReturnValue<span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Lookup failed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>你所必须做的就是编译这个应用程序：</p><p><code>csc /r:whois.dll whoisclnt.cs</code></p><p>接着可以使用命令行参数执行该应用程序。例如，以 <code>microsoft.com</code>参数执行</p><p><code>whoisclnt microsoft.com</code></p><p>当查询运行成功时，就会出现 microsoft.com的注册信息。（清单8.6 显示了输出的简略版本） 这是一个很方便的小程序，通过组件化的途径写成的，花不到一个小时。如果用C++编写，要花多长时间？很幸运，我再也想不起当第一次用C++这样做时，花了多长的时间。</p><p>清单 8.6 有关 microsoft.com (简略) 的Whois 信息</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>D:<span class="token punctuation">\\</span>CSharp<span class="token punctuation">\\</span>Samples<span class="token punctuation">\\</span>Namespace<span class="token operator">&gt;</span>whoisclient
<span class="token punctuation">..</span>.

Registrant:
Microsoft Corporation <span class="token punctuation">(</span>MICROSOFT-DOM<span class="token punctuation">)</span>
  <span class="token number">1</span> microsoft way
  redmond, WA <span class="token number">98052</span>
  US
  Domain Name: MICROSOFT.COM

  Administrative Contact:
    Microsoft Hostmaster <span class="token punctuation">(</span>MH37-ORG<span class="token punctuation">)</span> msnhst@MICROSOFT.COM
  Technical Contact, Zone Contact:
    MSN NOC <span class="token punctuation">(</span>MN5-ORG<span class="token punctuation">)</span> msnnoc@MICROSOFT.COM
  Billing Contact:
    Microsoft-Internic Billing Issues <span class="token punctuation">(</span>MDB-ORG<span class="token punctuation">)</span> msnbill@MICROSOFT.COM

  Record last updated on <span class="token number">20</span>-May-2000.
  Record expires on 03-May-2010.
  Record created on 02-May-1991.
  Database last updated on <span class="token number">9</span>-Jun-2000 <span class="token number">13</span>:50:52 EDT.
  
  Domain servers <span class="token keyword">in</span> listed order:
  
  ATBD.MICROSOFT.COM <span class="token number">131.107</span>.1.7
  DNS1.MICROSOFT.COM <span class="token number">131.107</span>.1.240
  DNS4.CP.MSFT.NET <span class="token number">207.46</span>.138.11
  DNS5.CP.MSFT.NET <span class="token number">207.46</span>.138.12
</code></pre></div><h3 id="_8-2-3-增加多个类到名字空间" tabindex="-1"><a class="header-anchor" href="#_8-2-3-增加多个类到名字空间" aria-hidden="true">#</a> 8.2.3 增加多个类到名字空间</h3><p>使WhoisLookup和RequestWebPage 类共存于同一个名字空间是多么的美妙。既然WhoisLookup已是名字空间的一部分，所以你只须使RequestWebPage 类也成为该名字空间的一部分。</p><p>必要的改变很容易被应用。你只需使用名字空间封装RequestWebPage 类就可以了：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Presenting<span class="token punctuation">.</span>CSharp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RequestWebPage</span>
    <span class="token punctuation">{</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>尽管两个类包含于两个不同的文件，但在编译后，它们都是相同名字空间的一部分：</p><p><code>csc /r:System.Net.dll /t:library /out:presenting.csharp.dll whois.cs webrequest.cs</code></p><p>你不必要按照名字空间的名字给DLL命名。然而，这样做会有助你更容易你记住，当编译一个客户应用程序时要引用哪一个库。</p><h2 id="_8-3-小结" tabindex="-1"><a class="header-anchor" href="#_8-3-小结" aria-hidden="true">#</a> 8.3 小结</h2><p>在这一章中，你学到了如何构建一个可以在客户程序中使用的组件。最初，你不必关心名字空间，但后面第二个组件中介绍了该特性。名字空间在内外部均是组织应用程序的好办法。</p><p>C#中的组件很容易被构建，而且只要库和应用程序共存于相同的目录，你甚至不必进行特殊的安装。当要创建必须被多个客户使用的类库时，步骤就有所改变——而下一章将会告诉你为什么。</p>`,91),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspcls2_8.html.vue"]]);export{i as default};
