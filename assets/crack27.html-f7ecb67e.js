import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="net中加密和解密的实现方法" tabindex="-1"><a class="header-anchor" href="#net中加密和解密的实现方法" aria-hidden="true">#</a> .NET中加密和解密的实现方法</h1><p>.NET将原来独立的API和SDK合并到一个框架中，这对于程序开发人员非常有利。它将CryptoAPI改编进.NET的System.Security.Cryptography名字空间，使密码服务摆脱了SDK平台的神秘性，变成了简单的.NET名字空间的使用。由于随着整个框架组件一起共享，密码服务更容易实现了，现在仅仅需要学习System.Security.Cryptography名字空间的功能和用于解决特定方案的类。</p><h2 id="加密和解密的算法" tabindex="-1"><a class="header-anchor" href="#加密和解密的算法" aria-hidden="true">#</a> 加密和解密的算法</h2><p><code>System.Security.Cryptography</code>名字空间包含了实现安全方案的类，例如加密和解密数据、管理密钥、验证数据的完整性并确保数据没有被篡改等等。本文重点讨论加密和解密。</p><p>加密和解密的算法分为对称（symmetric）算法和不对称（asymmetric）算法。对称算法在加密和解密数据时使用相同的密钥和初始化矢量，典型的有DES、 TripleDES和Rijndael算法，它适用于不需要传递密钥的情况，主要用于本地文档或数据的加密。不对称算法有两个不同的密钥，分别是公共密钥和私有密钥，公共密钥在网络中传递，用于加密数据，而私有密钥用于解密数据。不对称算法主要有RSA、DSA等，主要用于网络数据的加密。</p><h2 id="加密和解密本地文档" tabindex="-1"><a class="header-anchor" href="#加密和解密本地文档" aria-hidden="true">#</a> 加密和解密本地文档</h2><p>下面的例子是加密和解密本地文本，使用的是Rijndael对称算法。</p><p>对称算法在数据流通过时对它进行加密。因此首先需要建立一个正常的流（例如I/O流）。文章使用FileStream类将文本文件读入字节数组，也使用该类作为输出机制。</p><p>接下来定义相应的对象变量。在定义SymmetricAlgorithm抽象类的对象变量时我们可以指定任何一种对称加密算法提供程序。代码使用的是Rijndael算法，但是很容易改为DES或者TripleDES算法。.NET使用强大的随机密钥设置了提供程序的实例，选择自己的密钥是比较危险的，接受计算机产生的密钥是一个更好的选择，文中的代码使用的是计算机产生的密钥。</p><p>下一步，算法实例提供了一个对象来执行实际数据传输。每种算法都有<code>CreateEncryptor</code>和<code>CreateDecryptor</code>两个方法，它们返回实现<code>ICryptoTransform</code>接口的对象。</p><p>最后，现在使用<code>BinaryReader</code>的<code>ReadBytes</code>方法读取源文件，它会返回一个字节数组。<code>BinaryReader</code>读取源文件的输入流，在作为<code>CryptoStream.Write</code>方法的参数时调用<code>ReadBytes</code>方法。指定的<code>CryptoStream</code>实例被告知它应该操作的下层流，该对象将执行数据传递，无论流的目的是读或者写。</p><p>下面是加密和解密一个文本文件的源程序片断：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">com<span class="token punctuation">.</span>billdawson<span class="token punctuation">.</span>crypto</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">TextFileCrypt</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> file <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> tempfile <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetTempFileName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//打开指定的文件</span>
            <span class="token class-name">FileStream</span> fsIn <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">FileStream</span> fsOut <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>tempfile<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Write<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//定义对称算法对象实例和接口</span>
            <span class="token class-name">SymmetricAlgorithm</span> symm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RijndaelManaged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ICryptoTransform</span> transform <span class="token operator">=</span> symm<span class="token punctuation">.</span><span class="token function">CreateEncryptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CryptoStream</span> cstream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CryptoStream</span><span class="token punctuation">(</span>fsOut<span class="token punctuation">,</span> transform<span class="token punctuation">,</span> ryptoStreamMode<span class="token punctuation">.</span>Write<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">BinaryReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>fsIn<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 读取源文件到cryptostream </span>
            cstream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>br<span class="token punctuation">.</span><span class="token function">ReadBytes</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>fsIn<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>fsIn<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream<span class="token punctuation">.</span><span class="token function">FlushFinalBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fsIn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fsOut<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;created encrypted file {0}&quot;</span><span class="token punctuation">,</span> tempfile<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;will now decrypt and show contents&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 反向操作--解密刚才加密的临时文件</span>
            fsIn <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>tempfile<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
            transform <span class="token operator">=</span> symm<span class="token punctuation">.</span><span class="token function">CreateDecryptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CryptoStream</span><span class="token punctuation">(</span>fsIn<span class="token punctuation">,</span> transform<span class="token punctuation">,</span> CryptoStreamMode<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>cstream<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;decrypted file text: &quot;</span> <span class="token operator">+</span> sr<span class="token punctuation">.</span><span class="token function">ReadToEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            fsIn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="加密网络数据" tabindex="-1"><a class="header-anchor" href="#加密网络数据" aria-hidden="true">#</a> 加密网络数据</h2><p>如果我有一个只想自己看到的文档，我不会简单的通过e-mail发送给你。我将使用对称算法加密它；如果有人截取了它，他们也不能阅读该文档，因为他们没有用于加密的唯一密钥。但是你也没有密钥。我需要使用某种方式将密钥给你，这样你才能解密文档，但是不能冒密钥和文档被截取的风险。</p><p>非对称算法就是一种解决方案。这类算法使用的两个密钥有如下关系：使用公共密钥加密的信息只能被相应的私有密钥解密。因此，我首要求你给我发送你的公共密钥。在发送给我的途中可能有人会截取它，但是没有关系，因为他们只能使用该密钥给你的信息加密。我使用你的公共密钥加密文档并发送给你。你使用私有密钥解密该文档，这是唯一可以解密的密钥，并且没有通过网络传递。</p><p>不对称算法比对称算法计算的花费多、速度慢。因此我们不希望在线对话中使用不对称算法加密所有信息。相反，我们使用对称算法。下面的例子中我们使用不对称加密来加密对称密钥。接着就使用对称算法加密了。实际上安全接口层（SSL）建立服务器和浏览器之间的安全对话使用的就是这种工作方式。 示例是一个TCP程序，分为服务器端和客户端。服务器端的工作流程是：</p><p>从客户端接收公共密钥。<br> 使用公共密钥加密未来使用的对称密钥。<br> 将加密了的对称密钥发送给客户端。<br> 给客户端发送使用该对称密钥加密的信息。</p><p>代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">com<span class="token punctuation">.</span>billdawson<span class="token punctuation">.</span>crypto</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CryptoServer</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RSA_KEY_SIZE_BITS <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RSA_KEY_SIZE_BYTES <span class="token operator">=</span> <span class="token number">252</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> TDES_KEY_SIZE_BITS <span class="token operator">=</span> <span class="token number">192</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> msg<span class="token punctuation">;</span>
            <span class="token class-name">TcpListener</span> listener<span class="token punctuation">;</span>
            <span class="token class-name">TcpClient</span> client<span class="token punctuation">;</span>
            <span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">;</span>
            <span class="token class-name">RSACryptoServiceProvider</span> rsa<span class="token punctuation">;</span>
            <span class="token comment">//获取端口</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                port <span class="token operator">=</span> Int32<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                msg <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>USAGE<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//建立监听</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                listener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
                listener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Listening on port {0}...&quot;</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>

                client <span class="token operator">=</span> listener<span class="token punctuation">.</span><span class="token function">AcceptTcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;connection....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                rsa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RSACryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                rsa<span class="token punctuation">.</span>KeySize <span class="token operator">=</span> RSA_KEY_SIZE_BITS<span class="token punctuation">;</span>

                <span class="token comment">// 获取客户端公共密钥</span>
                rsa<span class="token punctuation">.</span><span class="token function">ImportParameters</span><span class="token punctuation">(</span><span class="token function">getClientPublicKey</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                symm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TripleDESCryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                symm<span class="token punctuation">.</span>KeySize <span class="token operator">=</span> TDES_KEY_SIZE_BITS<span class="token punctuation">;</span>

                <span class="token comment">//使用客户端的公共密钥加密对称密钥并发送给客。</span>
                <span class="token function">encryptAndSendSymmetricKey</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> rsa<span class="token punctuation">,</span> symm<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">//使用对称密钥加密信息并发送</span>
                <span class="token function">encryptAndSendSecretMessage</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> symm<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    client<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    listener<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//错误</span>
                <span class="token punctuation">}</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Server exiting...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">RSAParameters</span> <span class="token function">getClientPublicKey</span><span class="token punctuation">(</span><span class="token class-name">TcpClient</span> client<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 从字节流获取串行化的公共密钥，通过串并转换写入类的实例</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>RSA_KEY_SIZE_BYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">RSAParameters</span> result<span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> totalLen <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">totalLen</span><span class="token punctuation">(</span>len <span class="token operator">=</span> ns<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                totalLen <span class="token operator">+=</span> len<span class="token punctuation">;</span>
                ms<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            ms<span class="token punctuation">.</span>Position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            result <span class="token operator">=</span> <span class="token punctuation">(</span>RSAParameters<span class="token punctuation">)</span>bf<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
            ms<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">encryptAndSendSymmetricKey</span><span class="token punctuation">(</span><span class="token class-name">TcpClient</span> client<span class="token punctuation">,</span> <span class="token class-name">RSACryptoServiceProvider</span> rsa<span class="token punctuation">,</span> <span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 使用客户端的公共密钥加密对称密钥</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> symKeyEncrypted<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> symIVEncrypted<span class="token punctuation">;</span>

            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            symKeyEncrypted <span class="token operator">=</span> rsa<span class="token punctuation">.</span><span class="token function">Encrypt</span><span class="token punctuation">(</span>symm<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            symIVEncrypted <span class="token operator">=</span> rsa<span class="token punctuation">.</span><span class="token function">Encrypt</span><span class="token punctuation">(</span>symm<span class="token punctuation">.</span>IV<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            ns<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>symKeyEncrypted<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> symKeyEncrypted<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            ns<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>symIVEncrypted<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> symIVEncrypted<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">encryptAndSendSecretMessage</span><span class="token punctuation">(</span><span class="token class-name">TcpClient</span> client<span class="token punctuation">,</span> <span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> secretMsg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 使用对称密钥和初始化矢量加密信息并发送给客户端</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> msgAsBytes<span class="token punctuation">;</span>
            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ICryptoTransform</span> transform <span class="token operator">=</span> symm<span class="token punctuation">.</span><span class="token function">CreateEncryptor</span><span class="token punctuation">(</span>symm<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> symm<span class="token punctuation">.</span>IV<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CryptoStream</span> cstream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CryptoStream</span><span class="token punctuation">(</span>ns<span class="token punctuation">,</span> transform<span class="token punctuation">,</span> CryptoStreamMode<span class="token punctuation">.</span>Write<span class="token punctuation">)</span><span class="token punctuation">;</span>

            msgAsBytes <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>secretMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>

            cstream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>msgAsBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> msgAsBytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream<span class="token punctuation">.</span><span class="token function">FlushFinalBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>客户端的工作流程是：</p><p>建立和发送公共密钥给服务器。<br> 从服务器接收被加密的对称密钥。<br> 解密该对称密钥并将它作为私有的不对称密钥。<br> 接收并使用不对称密钥解密信息。</p><p>代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">com<span class="token punctuation">.</span>billdawson<span class="token punctuation">.</span>crypto</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CryptoClient</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RSA_KEY_SIZE_BITS <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RSA_KEY_SIZE_BYTES <span class="token operator">=</span> <span class="token number">252</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> TDES_KEY_SIZE_BITS <span class="token operator">=</span> <span class="token number">192</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> TDES_KEY_SIZE_BYTES <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> TDES_IV_SIZE_BYTES <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> host<span class="token punctuation">;</span>
            <span class="token class-name">TcpClient</span> client<span class="token punctuation">;</span>
            <span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">;</span>
            <span class="token class-name">RSACryptoServiceProvider</span> rsa<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>USAGE<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                host <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                port <span class="token operator">=</span> Int32<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>USAGE<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span> <span class="token comment">//连接</span>
            <span class="token punctuation">{</span>
                client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                client<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connected. Sending public key.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                rsa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RSACryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                rsa<span class="token punctuation">.</span>KeySize <span class="token operator">=</span> RSA_KEY_SIZE_BITS<span class="token punctuation">;</span>
                <span class="token function">sendPublicKey</span><span class="token punctuation">(</span>rsa<span class="token punctuation">.</span><span class="token function">ExportParameters</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span><span class="token punctuation">;</span>
                symm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TripleDESCryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                symm<span class="token punctuation">.</span>KeySize <span class="token operator">=</span> TDES_KEY_SIZE_BITS<span class="token punctuation">;</span>

                <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token function">getRestOfMessage</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">extractSymmetricKeyInfo</span><span class="token punctuation">(</span>rsa<span class="token punctuation">,</span> symm<span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">showSecretMessage</span><span class="token punctuation">(</span>symm<span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    client<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span>
                <span class="token punctuation">{</span> <span class="token comment">//错误</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">sendPublicKey</span><span class="token punctuation">(</span><span class="token class-name">RSAParameters</span> key<span class="token punctuation">,</span> <span class="token class-name">TcpClient</span> client<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">BinaryFormatter</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            bf<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>ns<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">MemoryStream</span> <span class="token function">getRestOfMessage</span><span class="token punctuation">(</span><span class="token class-name">TcpClient</span> client<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//获取加密的对称密钥、初始化矢量、秘密信息。对称密钥用公共RSA密钥</span>
            <span class="token comment">//加密，秘密信息用对称密钥加密</span>
            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">NetworkStream</span> ns <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token comment">// 将NetStream 的数据写入内存流</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">=</span> ns<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ms<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            ms<span class="token punctuation">.</span>Position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ms<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">extractSymmetricKeyInfo</span><span class="token punctuation">(</span><span class="token class-name">RSACryptoServiceProvider</span> rsa<span class="token punctuation">,</span> <span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">,</span> <span class="token class-name">MemoryStream</span> msOrig<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 获取TDES密钥--它被公共RSA密钥加密，使用私有密钥解密</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>TDES_KEY_SIZE_BYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
            msOrig<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            symm<span class="token punctuation">.</span>Key <span class="token operator">=</span> rsa<span class="token punctuation">.</span><span class="token function">Decrypt</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 获取TDES初始化矢量</span>
            buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>TDES_IV_SIZE_BYTES<span class="token punctuation">]</span><span class="token punctuation">;</span>
            msOrig<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            symm<span class="token punctuation">.</span>IV <span class="token operator">=</span> rsa<span class="token punctuation">.</span><span class="token function">Decrypt</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">showSecretMessage</span><span class="token punctuation">(</span><span class="token class-name">SymmetricAlgorithm</span> symm<span class="token punctuation">,</span> <span class="token class-name">MemoryStream</span> msOrig<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//内存流中的所有数据都被加密了</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> len <span class="token operator">=</span> msOrig<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">MemoryStream</span> ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ICryptoTransform</span> transform <span class="token operator">=</span> symm<span class="token punctuation">.</span><span class="token function">CreateDecryptor</span><span class="token punctuation">(</span>symm<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> symm<span class="token punctuation">.</span>IV<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">CryptoStream</span> cstream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CryptoStream</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> transform<span class="token punctuation">,</span> CryptoStreamMode<span class="token punctuation">.</span>Write<span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            cstream<span class="token punctuation">.</span><span class="token function">FlushFinalBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 内存流现在是解密信息，是字节的形式，将它转换为字符串</span>
            ms<span class="token punctuation">.</span>Position <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            len <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ms<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            ms<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> msg <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The host sent me this secret message:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>使用对称算法加密本地数据时比较适合。在保持代码通用时我们可以选择多种算法，当数据通过特定的<code>CryptoStream</code>时算法使用转换对象加密该数据。需要将数据通过网络发送时，首先使用接收的公共不对称密钥加密对称密钥。</p><p>本文只涉及到<code>System.Security.Cryptography</code>名字空间的一部分服务。尽管文章保证只有某个私有密钥可以解密相应公共密钥加密的信息，但是它没有保证是谁发送的公共密钥，发送者也可能是假的。需要使用处理数字证书的类来对付该风险。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>浩子 狮子座1978-8-19
  头衔：浩子
  等级：超级版主
  威望：50
  魅力：7740
  经验：9022
  财产：12053
  文章：2308
  积分：9022
  门派：逍遥派
  注册：2002-11-19
</code></pre></div>`,28),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","crack27.html.vue"]]);export{i as default};
