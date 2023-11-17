import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="net环境下几种不同的邮件发送解决方案" tabindex="-1"><a class="header-anchor" href="#net环境下几种不同的邮件发送解决方案" aria-hidden="true">#</a> .NET环境下几种不同的邮件发送解决方案</h1><blockquote><p>www.chinacs.net 中文C#技术站</p></blockquote><h2 id="_1、-使用outlook提供的发送" tabindex="-1"><a class="header-anchor" href="#_1、-使用outlook提供的发送" aria-hidden="true">#</a> 1、 使用outLook提供的发送</h2><p>如：我见过的用友软件U8生产制造(演示版)，其中的邮件功能就是通过调用outLook的ActiveX 组件</p><p>优点：开发简单<br> 缺点：依赖outlook组件，SMTP 邮件服务</p><p>邮件发送的代码如下：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> <span class="token keyword">Sub</span> Send<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> outObj <span class="token keyword">As</span> <span class="token keyword">New</span> Outlook<span class="token punctuation">.</span>Application<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> Item <span class="token keyword">As</span> Outlook<span class="token punctuation">.</span>MailItemClass
    Item <span class="token operator">=</span> outObj<span class="token punctuation">.</span>CreateItem<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    Item<span class="token punctuation">.</span><span class="token keyword">To</span> <span class="token operator">=</span> <span class="token string">&quot;lihonggen0@163.com &quot;</span>
    Item<span class="token punctuation">.</span>Subject <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>
    Item<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token string">&quot;hell&quot;</span>
    Item<span class="token punctuation">.</span>Attachments<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;C:\\abc.txt&quot;</span><span class="token punctuation">)</span>
    Item<span class="token punctuation">.</span>Send<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div><p>参考：使用 Microsoft Outlook 2002 开发解决方案http://www.microsoft.com/china/msdn/library/dndotnetout2k2/html/odc_oldevsol.asp</p><h2 id="_2、-web开发-在asp-net中引用system-web-mail类" tabindex="-1"><a class="header-anchor" href="#_2、-web开发-在asp-net中引用system-web-mail类" aria-hidden="true">#</a> 2、 WEB开发，在ASP.NET中引用System.Web.Mail类</h2><p>System.Web.Mail 命名空间包含使您可以使用 CDOSYS（Windows 2000 的协作数据对象）消息组件来构造和发送消息的类。邮件消息是通过内置在 Microsoft Windows 2000 中的 SMTP 邮件服务或任意的 SMTP 服务器来传送的。此命名空间中的类可以在 ASP.NET 或任何托管应用程序</p><p>MailAttachment提供用于构造电子邮件附件的属性和方法。</p><p>MailMessage提供用于构造电子邮件的属性和方法。</p><p>SmtpMail提供用于使用 Windows 2000 的协作数据对象 (CDOSYS) 消息组件来发送消息的属性和方法。</p><p>邮件可以通过 Microsoft Windows 2000 中内置的 SMTP 邮件服务或任意 SMTP 服务器来传送。System.Web.Mail 命名空间中的类型可以在 ASP.NET 或任何托管应用程序使用。</p><p>Smtp服务器的设置，现在一些免费邮件提供商是不再提供针对所有邮件提供Smtp服务，在发送邮件的时候，需要验证用户信息，考虑Smtp用户验证问题</p><p>如果Smtp服务器在本地计算机，发送速度很快的，基本上不用担心，如果不是本地服务器，那么发送的时候最好不要以此太多，一是速度问题，二是以此发送太多邮件，Smtp服务器可能认为是垃圾邮件而拒绝服务</p><p>代码如下:</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button1<span class="token punctuation">.</span>Click
    <span class="token keyword">Dim</span> mailObj <span class="token keyword">As</span> <span class="token keyword">New</span> MailMessage<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> smtp <span class="token keyword">As</span> SmtpMail

    <span class="token comment">&#39;定义SMTP服务器的名称 </span>
    smtp<span class="token punctuation">.</span>SmtpServer <span class="token operator">=</span> <span class="token string">&quot;smtp.163.com&quot;</span>

    <span class="token comment">&#39;定义邮件的发送地址 </span>
    mailObj<span class="token punctuation">.</span>From <span class="token operator">=</span> <span class="token string">&quot;lihonggen@163.com&quot;</span>

    <span class="token comment">&#39;定义邮件的接收地址 </span>
    mailObj<span class="token punctuation">.</span><span class="token keyword">To</span> <span class="token operator">=</span> <span class="token string">&quot; lihonggen0@163.com&quot;</span>

    <span class="token comment">&#39;定义邮件的暗送地址 </span>
    <span class="token comment">&#39;    mailObj.Bcc &quot;aa@sina.com&quot;</span>
    
    <span class="token comment">&#39;定义邮件的抄送地址 </span>
    <span class="token comment">&#39;      mailObj.Cc = &quot;aaa@sina.com&quot;</span>

    <span class="token comment">&#39;定义邮件的主题 </span>
    mailObj<span class="token punctuation">.</span>Subject <span class="token operator">=</span> <span class="token string">&quot;主题&quot;</span>

    <span class="token comment">&#39;定义邮件的主体 </span>
    mailObj<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token string">&quot;邮件主体！&quot;</span>

    <span class="token comment">&#39;邮件以 HTML的格式发送 </span>
    mailObj<span class="token punctuation">.</span>BodyFormat <span class="token operator">=</span> MailFormat<span class="token punctuation">.</span>Html 

    <span class="token comment">&#39;定义邮件的有限级，在此设定为高 </span>
    mailObj<span class="token punctuation">.</span>Priority <span class="token operator">=</span> MailPriority<span class="token punctuation">.</span>High 

    <span class="token comment">&#39;给发送的邮件附加上一个附件 </span>
    mailObj<span class="token punctuation">.</span>Attachments<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token keyword">New</span> MailAttachment<span class="token punctuation">(</span><span class="token string">&quot;c:\\lihonggen.doc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    smTp<span class="token punctuation">.</span>Send<span class="token punctuation">(</span>mailObj<span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div><h2 id="_3、-在vb-net或c-开发windows-应用程序中使用system-net-sockets" tabindex="-1"><a class="header-anchor" href="#_3、-在vb-net或c-开发windows-应用程序中使用system-net-sockets" aria-hidden="true">#</a> 3、 在VB.NET或C#开发Windows 应用程序中使用System.Net.Sockets</h2><p>也是基于SMTP协议</p><p>一、SMTP协议简介</p><p>1、客户端通过服务器的25端口建立TCP/IP连接</p><p>服务器端： 220 server.com Simple Mail Transfer Service Ready</p><p>2、客户端使用“HELO”命令标识发件人</p><p>客户端：HELO server.com<br> 服务器端：250 server.com</p><p>3、客户端发送MAIL命令，服务器端以OK作为响应表明准备接收</p><p>客户端： <code>MAIL FROM: &lt;A@B.com&gt;</code>&lt;br 服务器端： 250 OK</p><p>4、客户端发送RCPT命令标识收件人，服务器端回应是否愿意为收件人接受邮件</p><p>客户端：<code>RCPT TO: &lt;d@e.com&gt;</code><br> 服务器端：250 OK</p><p>5、协商结束后用命令DATA发送发送邮件</p><p>客户端：DATA<br> 服务器端：<code>354 Start mail input: end with &lt;CRLF&gt;.&lt;CRLF&gt;</code></p><p>6、 客户端以.表示结束输入内容一起发送出去</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>客户端：Subject:  &lt;CRLF&gt;
内容&lt;CRLF&gt;

.&lt;CRLF&gt;
</code></pre></div><p>7、客户端用QUIT命令退出。</p><p>客户端：QUIT<br> 服务器端：250 server.com closing transmission channel</p><p>优点：可以在此基础上开发出自己的组件，利用Sockets我们可以进行网络编程开发<br> 缺点：程序量相对较多，</p><p>发送邮件的代码如下：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Dim</span> sendData <span class="token keyword">As</span> <span class="token keyword">String</span>
<span class="token keyword">Dim</span> szData <span class="token keyword">As</span> <span class="token keyword">Byte</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> CRLF <span class="token keyword">As</span> <span class="token keyword">String</span>
CRLF <span class="token operator">=</span> <span class="token string">&quot;\\r\\n&quot;</span> 

<span class="token comment">&#39;创建与服务器25端口的连接</span>
<span class="token keyword">Dim</span> SmtpServ <span class="token keyword">As</span> <span class="token keyword">New</span> TcpClient<span class="token punctuation">(</span>txtsmtp<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Clear<span class="token punctuation">(</span><span class="token punctuation">)</span> 

<span class="token comment">&#39;显示服务器初始信息</span>
<span class="token keyword">Dim</span> NetStrm <span class="token keyword">As</span> NetworkStream
NetStrm <span class="token operator">=</span> SmtpServ<span class="token punctuation">.</span>GetStream<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> RdStrm <span class="token keyword">As</span> <span class="token keyword">New</span> StreamReader<span class="token punctuation">(</span>SmtpServ<span class="token punctuation">.</span>GetStream<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">If</span> RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span> lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;HELO server &quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;标志发件人</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;MAIL FROM: &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;&lt;&quot;</span> <span class="token operator">+</span> txtfrom<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;&gt;&quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;标志收件人</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;RCPT TO: &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;&lt;&quot;</span> <span class="token operator">+</span> txtTo<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;&gt;&quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;准备发送内容</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;DATA &quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;发送主题</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;SUBJECT: &quot;</span> <span class="token operator">+</span> txtsub<span class="token punctuation">.</span>Text <span class="token operator">+</span> CRLF

<span class="token comment">&#39;发送内容</span>
sendData <span class="token operator">=</span> sendData <span class="token operator">+</span> txtmsg<span class="token punctuation">.</span>Text <span class="token operator">+</span> CRLF

<span class="token comment">&#39;结束发送</span>
sendData <span class="token operator">=</span> sendData <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">&#39;退出</span>
sendData <span class="token operator">=</span> <span class="token string">&quot;QUIT &quot;</span> <span class="token operator">+</span> CRLF
szData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span>sendData<span class="token punctuation">.</span>ToCharArray<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
NetStrm<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>szData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> szData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span>RdStrm<span class="token punctuation">.</span>ReadLine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 

<span class="token comment">&#39;关闭连接</span>
NetStrm<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
RdStrm<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>

lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;连接关闭&quot;</span><span class="token punctuation">)</span>
lstlog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;发送成功&quot;</span><span class="token punctuation">)</span>
</code></pre></div><p>大家还可以参考：使用C# 创建邮件发送组件(SMTP)</p><p>http://www.aspcool.com/lanmu/browse1.asp?ID=968&amp;bbsuser=csharp</p><h2 id="_4、-iis-smtp自带的基本的发信组件cdonts" tabindex="-1"><a class="header-anchor" href="#_4、-iis-smtp自带的基本的发信组件cdonts" aria-hidden="true">#</a> 4、 IIS SMTP自带的基本的发信组件CDONTS</h2><p>你不必专门下载，微软已经提供了这个组件，只要安装了2000，NT的SMTP就会有的。</p><p>优点：组件由操作系统自带<br> 缺点：功能比较差，可扩展性不强</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>Mymail <span class="token operator">=</span> CreateObject<span class="token punctuation">(</span><span class="token string">&quot;CDONTS.NewMail&quot;</span><span class="token punctuation">)</span>
Mymail<span class="token punctuation">.</span>From <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;信件发送者信箱</span>
Mymail<span class="token punctuation">.</span><span class="token keyword">To</span> <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;信件接收者信箱</span>
Mymail<span class="token punctuation">.</span>CC <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;抄送</span>
Mymail<span class="token punctuation">.</span>BCC <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;密件发送</span>
Mymail<span class="token punctuation">.</span>Subject <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;信件主题</span>
Mymail<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> <span class="token comment">&#39;信件正文</span>

<span class="token comment">&#39;设置优先级，0-不重要，1-一般，2-重要。</span>
Mymail<span class="token punctuation">.</span>Importance <span class="token operator">=</span> <span class="token number">2</span>
Mymail<span class="token punctuation">.</span>Send<span class="token punctuation">(</span><span class="token punctuation">)</span>
Mymail <span class="token operator">=</span> <span class="token boolean">Nothing</span>
</code></pre></div><h2 id="_5、-使用jmail组件" tabindex="-1"><a class="header-anchor" href="#_5、-使用jmail组件" aria-hidden="true">#</a> 5、 使用JMail组件</h2><p>Jmail具有以下特点：</p><p>（1）可以发送附件；<br> （2）详细日志能力，便于你查看问题所在；<br> （3）设置邮件发送的优先级；<br> （4）支持多种格式的邮件发送，比如说以HTML或者TXT的方式发送邮件。这是个免费的组件。<br> （5）密件发送/(CC)抄送/紧急信件发送能力；<br> （6）最关键的就是--免费的组件，不必发钱，所以非常值得使用。</p><p>网站：http://www.dimac.net/,目前版本是4.3</p><p>JMail组件的常用属性：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Body 　　       邮件正文
Logging 　　    调用Log记录，供Debug用
Priority 　　   邮件的优先程度，从1到5
Sender 　　     发件人
ServerAddress 　SMTP服务器的IP地址或名称
Subject 　　    邮件标题
</code></pre></div><p>JMail组件的常用方法：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>AddAttachment 　　指定附件文件
AddRecipient 　　 加入一个收件人
AddRecipientBCC 　隐藏的副本抄送，只有发件人和BCC收件人知道。
AddRecipientCC 　 副本抄送
Execute 　　      送出邮件
</code></pre></div><p>了解必要的属性及方法后，余下的部分接收使用者输入的Email，当成参数传给AddRecipient方法，然后根据需要填上其余属性，最后以Execute方法寄出。例如：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Dim</span> JMail
JMail <span class="token operator">=</span> Server<span class="token punctuation">.</span>CreateObject<span class="token punctuation">(</span><span class="token string">&quot;JMail.SMTPMail&quot;</span><span class="token punctuation">)</span>
JMail<span class="token punctuation">.</span>Logging <span class="token operator">=</span> <span class="token boolean">True</span>
JMail<span class="token punctuation">.</span>ServerAddress <span class="token operator">=</span> <span class="token string">&quot;202.96.144.48&quot;</span>
JMail<span class="token punctuation">.</span>Sender <span class="token operator">=</span> <span class="token string">&quot;lihonggen0@163.com&quot;</span>
JMail<span class="token punctuation">.</span>Subject <span class="token operator">=</span> <span class="token string">&quot;subject.&quot;</span>
JMail<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token string">&quot;body.&quot;</span>
JMail<span class="token punctuation">.</span>AddRecipient<span class="token punctuation">(</span><span class="token string">&quot;bbbb@163.com&quot;</span><span class="token punctuation">)</span>
JMail<span class="token punctuation">.</span>AddAttachment<span class="token punctuation">(</span><span class="token string">&quot;c:\\go.gif&quot;</span><span class="token punctuation">)</span>
JMail<span class="token punctuation">.</span>Priority <span class="token operator">=</span> <span class="token number">3</span>
JMail<span class="token punctuation">.</span>Execute<span class="token punctuation">(</span><span class="token punctuation">)</span>
JMail <span class="token operator">=</span> <span class="token boolean">Nothing</span>
</code></pre></div><p>总结：选择何种方案，视程序的用途和需求而定，本文例出的几种方案，供大家参考。例如用友软件U8，调用outlook组件，一样整合到自己的软件中。我编写的管理系统，自己写组件（SMTP），功能同样强大，不过Coding的时间就长了！</p><p>注：此文有一小部分资料摘录</p><p>Author：李洪根<br> E_mail：lihonggen0@163.com</p>`,57),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netinter14.html.vue"]]);export{i as default};
