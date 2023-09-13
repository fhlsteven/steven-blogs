import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},e=t(`<h1 id="使用-net实现断点续传" tabindex="-1"><a class="header-anchor" href="#使用-net实现断点续传" aria-hidden="true">#</a> 使用.NET实现断点续传</h1><h2 id="断点续传的原理" tabindex="-1"><a class="header-anchor" href="#断点续传的原理" aria-hidden="true">#</a> 断点续传的原理</h2><p>在了解HTTP断点续传的原理之前，先来说说HTTP协议，HTTP协议是一种基于tcp的简单协议，分为请求和回复两种。请求协议是由客户机(浏览器)向服务器（WEB SERVER）提交请求时发送报文的协议。回复协议是由服务器(web server)，向客户机(浏览器)回复报文时的协议。请求和回复协议都由头和体组成。头和体之间以一行空行为分隔。</p><p>以下是一个请求报文与相应的回复报文的例子：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>GET /image/index_r4_c1.jpg HTTP/1.1
Accept: */*
Referer: http://192.168.3.120:8080
Accept-Language: zh-cn
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)
Host: 192.168.3.120:8080
Connection: Keep-Alive

HTTP/1.1 200 OK
Server: Microsoft-IIS/5.0
Date: Tue, 24 Jun 2003 05:39:40 GMT
Content-Type: image/jpeg
Accept-Ranges: bytes
Last-Modified: Thu, 23 May 2002 03:05:40 GMT
ETag: &quot;bec48eb862c21:934&quot;
Content-Length: 2827

? JFIF H H  C [1]
….
</code></pre></div><h2 id="下面我们就来说说-断点续传" tabindex="-1"><a class="header-anchor" href="#下面我们就来说说-断点续传" aria-hidden="true">#</a> 下面我们就来说说“断点续传”</h2><p>顾名思义，断点续传就是在上一次下载时断开的位置开始继续下载。在HTTP协议中，可以在请求报文头中加入Range段，来表示客户机希望从何处继续下载。</p><p>比如说从第1024字节开始下载，请求报文如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>GET /image/index_r4_c1.jpg HTTP/1.1
Accept: */*
Referer: http://192.168.3.120:8080
Accept-Language: zh-cn
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705)
Host: 192.168.3.120:8080
Range:bytes=1024-
Connection: Keep-Alive
</code></pre></div><h2 id="net中的相关类" tabindex="-1"><a class="header-anchor" href="#net中的相关类" aria-hidden="true">#</a> .NET中的相关类</h2><p>明白了上面的原理，那么，我们来看看.NET FRAMEWORK中为我们提供了哪些类可以来做这些事。</p><h2 id="完成http请求" tabindex="-1"><a class="header-anchor" href="#完成http请求" aria-hidden="true">#</a> 完成HTTP请求</h2><p><code>System.Net.HttpWebRequest</code></p><p>HttpWebRequest 类对 WebRequest 中定义的属性和方法提供支持，也对使用户能够直接与使用 HTTP 的服务器交互的附加属性和方法提供支持。</p><p>HttpWebRequest 将发送到 Internet 资源的公共 HTTP 标头值公开为属性，由方法或系统设置。下表包含完整列表。可以将 Headers 属性中的其他标头设置为名称/值对。但是注意，某些公共标头被视为受限制的，它们或者直接由 API公开，或者受到系统保护，不能被更改。Range也属于被保护之列，不过，.NET为开发者提供了更方便的操作，就是 AddRange方法，向请求添加从请求数据的开始处或结束处的特定范围的字节范围标头</p><h2 id="完成文件访问" tabindex="-1"><a class="header-anchor" href="#完成文件访问" aria-hidden="true">#</a> 完成文件访问</h2><p><code>System.IO.FileStream</code></p><p>FileStream 对象支持使用Seek方法对文件进行随机访问, Seek 允许将读取/写入位置移动到文件中的任意位置。这是通过字节偏移参考点参数完成的。字节偏移量是相对于查找参考点而言的，该参考点可以是基础文件的开始、当前位置或结尾，分别由SeekOrigin类的三个属性表示。</p><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><p>了解了.NET提供的相关的类，那么，我们就可以方便的实现了。</p><p>代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> StrFileName <span class="token operator">=</span> <span class="token string">&quot;c:\\\\aa.zip&quot;</span><span class="token punctuation">;</span>      <span class="token comment">//根据实际情况设置</span>
    <span class="token class-name"><span class="token keyword">string</span></span> StrUrl <span class="token operator">=</span> <span class="token string">&quot;http://www.xxxx.cn/xxxxx.zip&quot;</span><span class="token punctuation">;</span>   <span class="token comment">//根据实际情况设置</span>

    <span class="token comment">//打开上次下载的文件或新建文件</span>
    <span class="token class-name"><span class="token keyword">long</span></span> lStartPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>FileStream</span> fs<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>StrFileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        fs <span class="token operator">=</span> System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>File<span class="token punctuation">.</span><span class="token function">OpenWrite</span><span class="token punctuation">(</span>StrFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        lStartPos <span class="token operator">=</span> fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        fs<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span>lStartPos<span class="token punctuation">,</span> System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>SeekOrigin<span class="token punctuation">.</span>Current<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//移动文件流中的当前指针</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>FileStream</span><span class="token punctuation">(</span>StrFileName<span class="token punctuation">,</span> System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>FileMode<span class="token punctuation">.</span>Create<span class="token punctuation">)</span><span class="token punctuation">;</span>
        lStartPos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//打开网络连接</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>HttpWebRequest</span> request <span class="token operator">=</span> <span class="token punctuation">(</span>System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>HttpWebRequest<span class="token punctuation">)</span>System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>HttpWebRequest<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>StrUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lStartPos <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            request<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>lStartPos<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//设置Range值</span>

        <span class="token comment">//向服务器请求，获得服务器回应数据流</span>
        <span class="token class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>Stream</span> ns <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">GetResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetResponseStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> nbytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">512</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nReadSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        nReadSize <span class="token operator">=</span> ns<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>nbytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>nReadSize <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            fs<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>nbytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> nReadSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            nReadSize <span class="token operator">=</span> ns<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>nbytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ns<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;下载完成&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;下载过程中出现错误:&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上是本人在开发中的一点小小体验，希望能与大家分享！ ：）</p><p>http://www.csdn.net/develop/Read_Article.asp?id=26171</p>`,24),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","netinter3.html.vue"]]);export{k as default};
