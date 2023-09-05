import{_ as n,o as s,c as a,a as t}from"./app-382facc7.js";const p="/steven-blogs/assets/netcode5_1-ea7c43a7.png",o="/steven-blogs/assets/netcode5_2-e5b8e175.png",e="/steven-blogs/assets/netcode5_3-c88fc0ff.png",c="/steven-blogs/assets/netcode5_4-d0f84269.png",u={},l=t(`<h1 id="使用c-开发自己的web服务器" tabindex="-1"><a class="header-anchor" href="#使用c-开发自己的web服务器" aria-hidden="true">#</a> 使用C#开发自己的web服务器</h1><p>这篇文章讨论了如何使用C#开发一个简单的web服务器应用程序。尽管我们可以使用任何一种支持.NET的编程语言开发，但我选择了C#。本篇文章中的代码是使用微软的β2版的Visual C# Compiler Version 7.00.9254 [CLR version v1.0.2914]编译通过的，对代码作一些小的改动后，使用β1版也可能编译通过。该web服务器应用程序能够与IIS或其他任何web服务器软件同时在一台服务器上运行，只要为它指定一个空闲的端口即可。在本篇文章中，我还假定读者对.NET、C#或Visual Basic .Net有一定的了解。</p><p>该web服务器应用程序能够向浏览器返回HTML格式的文件，而且支持图像，它不加载嵌入式图像或支持任何一种脚本语言。为了简单起见，我将它开发成一个命令行应用程序。</p><h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2><p>首先，我们需要为这个web服务器应用程序定义一个根文件夹，例如，C:\\MyPersonalwebServer，然后在该要根目录下创建一个数据目录，例如，C:\\MyPersonalwebServer\\Data；最后在数据目录下创建三个文件，例如：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Mimes.Dat
Vdirs.Dat
Default.Dat
</code></pre></div><p>Mime.Dat中将包含该web服务器支持的MIME类型，其格式为&lt;扩展名&gt;; ，例如：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>.html;text/html
.htm;text/html
.bmp;image/bmp
</code></pre></div><p>VDirs.Dat中包含有虚拟目录的信息，格式为; &lt;物理目录&gt;，例如：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>/; C:\\myWebServerRoot/
test/; C:\\myWebServerRoot\\Imtiaz\\
</code></pre></div><p>Default.Dat中包含有虚拟目录中文件的信息，例如：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>default.html
default.htm
Index.html
Index.htm
</code></pre></div><p>为简单起见，我们将使用文本文件存储所有的信息，但我们也可以使用XML等其他的格式。在开始研究代码之前，我们先来看一下在登录网站时浏览器需要传递的头部信息。</p><p>我们以请求test.html为例进行说明。在浏览器的地址栏输入<code>http://localhost:5050/test.html</code>（记住，需要在URL中包括端口号），服务器将得到下面的信息：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>&lt;/DRIVE:\\PHYSICALDIR&gt;
GET /test.html HTTP/1.1
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/msword, */*
Accept-Language: en-usAccept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 4.0; .NET CLR 1.0.2914)
Host: localhost:5050Connection: Keep-Alive
</code></pre></div><h2 id="开始编程" tabindex="-1"><a class="header-anchor" href="#开始编程" aria-hidden="true">#</a> 开始编程</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Imtiaz</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> <span class="token class-name">MyWebServer</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">TcpListener</span> myListener<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> port <span class="token operator">=</span> <span class="token number">5050</span><span class="token punctuation">;</span> <span class="token comment">// 可以任意选择空闲的端口</span>
                                 <span class="token comment">//生成TcpListener的构建器开始监听给定的端口，它还启动调用StartListen()方法的一个线程</span>
        <span class="token keyword">public</span> <span class="token function">MyWebServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//开始监听给定的端口</span>
                myListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpListener</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
                myListener<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Web Server Running... Press ^C to Stop...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">//启动调用StartListen方法的线程</span>
                <span class="token class-name">Thread</span> th <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>StartListen<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                th<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;An Exception Occurred while Listening :&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们定义了名字空间，包括应用程序必需的引用，初始化了构建器中的端口，启动了端口监听进程，创建了一个新的线程调用startlisten函数。</p><p>我们假设用户没有在URL中提供文件名，在这种情况下我们必须自己确定缺省的文件名，并将它返回给浏览器，就象在IIS中的文档标签中定义缺省的文档那样。</p><p>我们已经在default.dat中存储了缺省的文件名，并将文件存储在了数据目录中。GetTheDefaultFileName函数将目录路径作为输入参数，打开default.dat文件，在目录中查找文件，根据是否找到了文件返回文件名或一个空格。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetTheDefaultFileName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sLocalDirectory<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StreamReader</span> sr<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sLine <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//打开default.dat，获得缺省清单</span>
        sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;data\\\\Default.Dat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>sLine <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//在web服务器的根目录下查找缺少文件</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>sLocalDirectory <span class="token operator">+</span> sLine<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;An Exception Occurred : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>sLocalDirectory <span class="token operator">+</span> sLine<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> sLine<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>象在IIS中那样，我们必须将虚拟目录解析为物理目录。在Vdir.Dat中，我们已经存储了实际的物理目录和虚拟目录之间的映像关系。需要记住的是，在任何情况下，文件的格式都是重要的。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetLocalPath</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sMyWebServerRoot<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> sDirName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">treamReader</span> sr<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sLine <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sVirtualDir <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sRealDir <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> iStartPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">//删除多余的空格</span>
    sDirName<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 转换成小写</span>
    sMyWebServerRoot <span class="token operator">=</span> sMyWebServerRoot<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 转换成小写</span>
    sDirName <span class="token operator">=</span> sDirName<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//打开Vdirs.dat文件，获得虚拟目录</span>
        sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;data\\VDirs.Dat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>sLine <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//删除多余的空格</span>
            sLine<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sLine<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//找到分割符</span>
                iStartPos <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 转换成小写</span>
                sLine <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                sVirtualDir <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> iStartPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sRealDir <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>iStartPos <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>sVirtualDir <span class="token operator">==</span> sDirName<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;An Exception Occurred : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>sVirtualDir <span class="token operator">==</span> sDirName<span class="token punctuation">)</span>
        <span class="token keyword">return</span> sRealDir<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们还必须使用用户提供的文件扩展名确定Mime类型。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetMimeType</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sRequestedFile<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StreamReader</span> sr<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sLine <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sMimeType <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sFileExt <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sMimeExt <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">// 转换成小写</span>
    sRequestedFile <span class="token operator">=</span> sRequestedFile<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> iStartPos <span class="token operator">=</span> sRequestedFile<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sFileExt <span class="token operator">=</span> sRequestedFile<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>iStartPos<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//打开Vdirs.dat文件，获得虚拟目录</span>
        sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;data\\Mime.Dat&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>sLine <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            sLine<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sLine<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//找到分割符</span>
                iStartPos <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 转换成小写</span>
                sLine <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                sMimeExt <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> iStartPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sMimeType <span class="token operator">=</span> sLine<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>iStartPos <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>sMimeExt <span class="token operator">==</span> sFileExt<span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;An Exception Occurred : &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>sMimeExt <span class="token operator">==</span> sFileExt<span class="token punctuation">)</span>
        <span class="token keyword">return</span> sMimeType<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面我们来编写建立和向浏览器（客户端）发送头部信息的函数。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendHeader</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sHttpVersion<span class="token punctuation">,</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> sMIMEHeader<span class="token punctuation">,</span>
                        <span class="token class-name"><span class="token keyword">int</span></span> iTotBytes<span class="token punctuation">,</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> sStatusCode<span class="token punctuation">,</span>
                        <span class="token keyword">ref</span> <span class="token class-name">Socket</span> mySocket<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">String</span> sBuffer <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token comment">//如果用户没有提供Mime类型，则将其缺省地设置为text/html</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sMIMEHeader<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sMIMEHeader <span class="token operator">=</span> <span class="token string">&quot;text/html&quot;</span><span class="token punctuation">;</span> <span class="token comment">// Default Mime Type is text/html</span>
    <span class="token punctuation">}</span>

    sBuffer <span class="token operator">=</span> sBuffer <span class="token operator">+</span> sHttpVersion <span class="token operator">+</span> sStatusCode <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
    sBuffer <span class="token operator">=</span> sBuffer <span class="token operator">+</span> <span class="token string">&quot;Server: cx1193719-b\\r\\n&quot;</span><span class="token punctuation">;</span>
    sBuffer <span class="token operator">=</span> sBuffer <span class="token operator">+</span> <span class="token string">&quot;Content-Type: &quot;</span> <span class="token operator">+</span> sMIMEHeader <span class="token operator">+</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
    sBuffer <span class="token operator">=</span> sBuffer <span class="token operator">+</span> <span class="token string">&quot;Accept-Ranges: bytes\\r\\n&quot;</span><span class="token punctuation">;</span>
    sBuffer <span class="token operator">=</span> sBuffer <span class="token operator">+</span> <span class="token string">&quot;Content-Length: &quot;</span> <span class="token operator">+</span> iTotBytes <span class="token operator">+</span> <span class="token string">&quot;\\r\\n\\r\\n&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> bSendData <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>sBuffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>bSendData<span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Total Bytes : &quot;</span> <span class="token operator">+</span> iTotBytes<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>SendToBrowser函数向浏览器发送信息，这是一个工作量比较大的函数。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendToBrowser</span><span class="token punctuation">(</span><span class="token class-name">String</span> sData<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">Socket</span> mySocket<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>sData<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendToBrowser</span><span class="token punctuation">(</span><span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> bSendData<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">Socket</span> mySocket<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> numBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mySocket<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>numBytes <span class="token operator">=</span> mySocket<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>bSendData<span class="token punctuation">,</span> bSendData<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Socket Error cannot Send Packet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;No. of bytes send {0}&quot;</span><span class="token punctuation">,</span> numBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Connection Dropped....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error Occurred : {0} &quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们已经有了编写一个互联网服务器应用程序的一些部件，下面我们将讨论互联网服务器应用程序中的关健函数。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StartListen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> iStartPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sRequest<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sDirName<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sRequestedFile<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sErrorMessage<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sLocalDir<span class="token punctuation">;</span>
    <span class="token class-name">String</span> sMyWebServerRoot <span class="token operator">=</span> <span class="token string">&quot;C:\\\\MyWebServerRoot\\\\&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sPhysicalFilePath <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sFormattedMessage <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> sResponse <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//接受一个新的连接</span>
        <span class="token class-name">Socket</span> mySocket <span class="token operator">=</span> myListener<span class="token punctuation">.</span><span class="token function">AcceptSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Socket Type &quot;</span> <span class="token operator">+</span> mySocket<span class="token punctuation">.</span>SocketType<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>mySocket<span class="token punctuation">.</span>Connected<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nClient Connected!!\\n==================\\nCLient IP { 0}\\n&quot;</span><span class="token punctuation">,</span> mySocket<span class="token punctuation">.</span>RemoteEndPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//生成一个字节数组，从客户端接收数据</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> bReceive <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> mySocket<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span>bReceive<span class="token punctuation">,</span> bReceive<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将字节型数据转换为字符串</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sBuffer <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>bReceive<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//上前我们将只处理GET类型</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sBuffer<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Only Get Method is supported..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                mySocket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 查找HTTP请求</span>
            iStartPos <span class="token operator">=</span> sBuffer<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取“HTTP”文本和版本号，例如，它会返回“HTTP/1.1”</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sHttpVersion <span class="token operator">=</span> sBuffer<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>iStartPos<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//解析请求的类型和目录/文件</span>
            sRequest <span class="token operator">=</span> sBuffer<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> iStartPos <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//如果存在\\符号，则使用/替换</span>
            sRequest<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//如果提供的文件名中没有/，表明这是一个目录，我们解危需要查找缺省的文件名</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>sRequest<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span>sRequest<span class="token punctuation">.</span><span class="token function">EndsWith</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                sRequest <span class="token operator">=</span> sRequest <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//解析请求的文件名</span>
            iStartPos <span class="token operator">=</span> sRequest<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            sRequestedFile <span class="token operator">=</span> sRequest<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>iStartPos<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//解析目录名</span>
            sDirName <span class="token operator">=</span> sRequest<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>sRequest<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sRequest<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>上面的代码无须多加解释，它接收用户的请求，将用户的请求由字节型数据转换为字符串型数据，然后查找请求的类型，解析HTTP的版本号、文件和目录信息。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 确定物理目录</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>sDirName <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
    sLocalDir <span class="token operator">=</span> sMyWebServerRoot<span class="token punctuation">;</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token comment">//获得虚拟目录</span>
    sLocalDir <span class="token operator">=</span> <span class="token function">GetLocalPath</span><span class="token punctuation">(</span>sMyWebServerRoot<span class="token punctuation">,</span> sDirName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Directory Requested : &quot;</span> <span class="token operator">+</span> sLocalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//如果物理目录不存在，则显示出错信息</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>sLocalDir<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    sErrorMessage <span class="token operator">=</span> <span class="token string">&quot;&lt;H2&gt;Error!! Requested Directory does not exists&lt;/H2&gt;&lt;Br&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//sErrorMessage = sErrorMessage + &quot;Please check data\\Vdirs.Dat&quot;;</span>
    <span class="token comment">//对信息进行格式化</span>
    <span class="token function">SendHeader</span><span class="token punctuation">(</span>sHttpVersion<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> sErrorMessage<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token string">&quot; 404 Not Found&quot;</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">//向浏览器发送信息</span>
    <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>sErrorMessage<span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    mySocket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>提示：微软的IE浏览器一般情况下总会显示一个比较“友好”一点的HTTP错误网页，如果要显示我们的Web服务器应用程序的错误信息，需要禁用IE中“显示友好HTTP错误信息”的功能，方法是依次点击“工具”-&gt;“互联网工具”，然后在其中的“高级”标签中即可以看到该选项。</p><p>如果用户没有提供目录名，Web服务器应用程序会使用GetLocalPath函数获取物理目录的信息，如果目录不存在（或者没有映射为Vdir.Dat中的条目），就会向浏览器发送错误信息。接下来Web服务器应用程序会确定文件名，如果用户没有提供文件名，Web服务器应用程序可以调用GetTheDefaultFileName函数获取文件名，如果有错误发生，则会将错误信息发送到浏览器。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//如果文件名不存在，则查找缺省文件列表</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>sRequestedFile<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 获取缺省的文件名</span>
    sRequestedFile <span class="token operator">=</span> <span class="token function">GetTheDefaultFileName</span><span class="token punctuation">(</span>sLocalDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sRequestedFile <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sErrorMessage <span class="token operator">=</span> <span class="token string">&quot;&lt;H2&gt;Error!! No Default File Name Specified&lt;/H2&gt;&quot;</span><span class="token punctuation">;</span>
        <span class="token function">SendHeader</span><span class="token punctuation">(</span>sHttpVersion<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> sErrorMessage<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token string">&quot; 404 Not Found&quot;</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>sErrorMessage<span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
        mySocket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面我们来识别Mime类型：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">String</span> sMimeType <span class="token operator">=</span> <span class="token function">GetMimeType</span><span class="token punctuation">(</span>sRequestedFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//构建物理路径</span>
sPhysicalFilePath <span class="token operator">=</span> sLocalDir <span class="token operator">+</span> sRequestedFile<span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;File Requested : &quot;</span> <span class="token operator">+</span> sPhysicalFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>最后一个步骤是打开被请求的文件，并将它发送给浏览器。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>sPhysicalFilePath<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    sErrorMessage <span class="token operator">=</span> <span class="token string">&quot;&lt;H2&gt;404 Error! File Does Not Exists...&lt;/H2&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token function">SendHeader</span><span class="token punctuation">(</span>sHttpVersion<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> sErrorMessage<span class="token punctuation">.</span>Length<span class="token punctuation">,</span> <span class="token string">&quot; 404 Not Found&quot;</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>sErrorMessage<span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>sFormattedMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> iTotBytes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    sResponse <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">FileStream</span> fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>sPhysicalFilePath<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">,</span>
    FileShare<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个能够从FileStream中读取字节数据的reader</span>
    <span class="token class-name">BinaryReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> read<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>read <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 从文件中读取数据，并将数据发送到网络上</span>
        sResponse <span class="token operator">=</span> sResponse <span class="token operator">+</span> Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> read<span class="token punctuation">)</span><span class="token punctuation">;</span>
        iTotBytes <span class="token operator">=</span> iTotBytes <span class="token operator">+</span> read<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">SendHeader</span><span class="token punctuation">(</span>sHttpVersion<span class="token punctuation">,</span> sMimeType<span class="token punctuation">,</span> iTotBytes<span class="token punctuation">,</span> <span class="token string">&quot; 200 OK&quot;</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SendToBrowser</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token keyword">ref</span> mySocket<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//mySocket.Send(bytes, bytes.Length,0);</span>
<span class="token punctuation">}</span>
mySocket<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="编译和执行" tabindex="-1"><a class="header-anchor" href="#编译和执行" aria-hidden="true">#</a> 编译和执行</h2><p>可以使用下图所示的命令编译我们的Web服务器应用程序：</p><p><img src="`+p+'" alt="netcode5_1"></p><p>在我使用的.NET开发工具中，无须指定任何库的名字，在较老版本的.NET开发工具中，可能会需要使用/r参数添加对dll库文件的引用。</p><p>要运行该Web服务器应用程序，只要如下图那样输入程序的名字，并按回车键即可。</p><p><img src="'+o+'" alt="netcode5_2"></p><p>Now, let say user send the request, our web server will identify the default file name and sends to the browser.</p><p>现在，我们假设用户发送了请求，我们的Web服务器应用程序将会决定使用缺省的文件，并将它返回给浏览器。如下图所示：</p><p><img src="'+e+'" alt="netcode5_3"></p><p>当然了，用户也可以请求图像文件</p><p><img src="'+c+'" alt="netcode5_4"></p><h2 id="可能的改进" tabindex="-1"><a class="header-anchor" href="#可能的改进" aria-hidden="true">#</a> 可能的改进</h2><p>WebServer仍然有许多地方可以加以改进。它不支持嵌入式图像和脚本，读者可以自己编写ISAPI过滤器，也可以使用IIS ISAPI过滤器。</p><h2 id="结束语" tabindex="-1"><a class="header-anchor" href="#结束语" aria-hidden="true">#</a> 结束语</h2><p>本篇文章展示了开发Web服务器的基本原理，我们仍然可以对文章中的Web服务器应用程序进行许多改进，希望它能够起到抛砖引玉的作用，对读者有所启迪。</p><p>Powered by DvNews.net</p>',56),k=[l];function i(r,d){return s(),a("div",null,k)}const g=n(u,[["render",i],["__file","netcode5.html.vue"]]);export{g as default};
