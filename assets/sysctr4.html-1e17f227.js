import{_ as o,o as t,c as e,a as n}from"./app-a2b6e588.js";const a="/steven-blogs/assets/sysctr4_1-c5a5f96f.png",s="/steven-blogs/assets/sysctr4_2-c1671e58.png",i={},p=n(`<h1 id="c-中的cookie编" tabindex="-1"><a class="header-anchor" href="#c-中的cookie编" aria-hidden="true">#</a> C#中的cookie编</h1><p>Cookie就是所谓的&quot; 小甜饼&quot; ,他最早出现是在Netscape Navigator 2.0中。Cookie其实就是由Web服务器创建的、将信息存储在计算机上的文件。那么为什么Web服务器要在客户机上面创建如此文件？这是因为当客户机发送一个请求到WEB服务器时（譬如准备浏览页面时），无论此客户机是否是第一次来访，服务器都会把它当作第一次来对待，WEB服务器所做的工作只是简单的进行响应，然后就关闭与该用户的连接。这样处理过程所带来的缺点时显而易见的。自从网景公司开发出Cookie以后，就可以利用Cookie来保存用户的识别信息。Cookie的作用可以记录了您在该站点上曾经访问过的页面，由此帮助您下次访问该站点时自定义查看。Cookies 也可以存储个人可识别信息。个人可识别信息是可以用来识别或联系您的信息，例如姓名、电子邮件地址、家庭或工作地址，或者电话号码。然而，网站只能访问您提供的个人可识别信息。例如，除非您提供电子邮件名称，否则网站将不能确定您的电子邮件名称。另外，网站不能通过Cookie来访问计算机上的其他信息。当然除非你提供。那么Cookie到底存放在什么地方？如果机器的系统是视窗98且安装在&quot; C&quot; 盘中，那么Cookie存放在&quot; C:\\Windows\\Cookies&quot; 目录中；如果机器系统是视窗2000且安装在&quot; C&quot; 盘中，那么Cookie存放在&quot; C:\\Documents and Settings\\Administrator\\Cookies&quot; 目录中。了解了Cookie这么多知识，我们还是来了解一下本文的重点-- C#是如何进行Cookie方面编程的。主要内容有二点：其一是 C#是如何写入Cookie；其二是 C#是如何访问自己写入的Cookie。</p><h2 id="一、本文介绍的程序设计和运行的软件环境" tabindex="-1"><a class="header-anchor" href="#一、本文介绍的程序设计和运行的软件环境" aria-hidden="true">#</a> 一、本文介绍的程序设计和运行的软件环境</h2><ol><li>微软公司视窗2000服务器版</li><li>.Net FrameWork SDK Beta 2</li></ol><p>C#进行Cookie方面编程是通过ASP.NET页面来实现的。</p><h2 id="二、c-如何写入cookie" tabindex="-1"><a class="header-anchor" href="#二、c-如何写入cookie" aria-hidden="true">#</a> 二、C#如何写入Cookie</h2><p>为了写入Cookie，他的步骤主要有三步，具体如下：</p><ol><li><p>首先就要创建一个HttpCookie对象，通过这个对象来构造一个Cookie，这个对象的名称就是以后产生的Cookie名称。具体如下代码：</p><p><code>HttpCookie cookie = new HttpCookie(&quot;用户定义的Cookie名称&quot;);</code></p></li><li><p>然后对创建的HttpCookie对象的&quot; Value&quot; 属性分配一个字符串值，&quot; Value&quot; 的值就是后来产生的Cookie的值。具体代码如下：</p><p><code>cookie.Value = &quot;用户给Cookie赋值&quot;;</code> 如果你想写入的Cookie数值不是一个简单的字符串，而是一个复杂的数据类型，我们知道这些数据类型是不能直接存贮到Cookie中的，因为Cookie中只能存贮字符串。但你可以通过一个变通的方法，就是把这个复杂的数据类型转换成多个字符串，然后把这多个字符串同时赋值给产生的Cookie值，这样Cookie中的内容就丰富了，以后利用Cookie完成的功能也强大了。这时你可能就会明白为什么当你浏览Web服务器，Web服务器会知道你什么时候曾经浏览过，并且曾经待过多长时间等信息了。因为这些信息已经存储到你第一次浏览页面时，Web服务器产生的Cookie中去了。下列代码是把多个字符串存储到Cookie的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>cookie<span class="token punctuation">[</span><span class="token string">&quot;姓名&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;王天&quot;</span><span class="token punctuation">;</span>
cookie<span class="token punctuation">[</span><span class="token string">&quot;性别&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">;</span>
cookie<span class="token punctuation">[</span><span class="token string">&quot;年龄&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;26&quot;</span><span class="token punctuation">;</span>
</code></pre></div><p>Cookie有临时的，也有永远的。永久 Cookie 以文件形式存储在计算机上，关闭 Internet Explorer 时仍然保留在计算机上。再次访问该站点时，创建该 Cookie 的网站可以读取。在具体的编程时候，是在写入此Cookie的时候，设定Cookie的生命周期，具体如下代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">DateTime</span> dtNow <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now <span class="token punctuation">;</span>
<span class="token class-name">TimeSpan</span> tsMinute <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TimeSpan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cookie<span class="token punctuation">.</span>Expires <span class="token operator">=</span> dtNow <span class="token operator">+</span> tsMinute <span class="token punctuation">;</span>
</code></pre></div><p>以上代码是设定产生的Cookie的生命期为&quot; 一个小时&quot; ，你可以通过修改&quot; TimeSpan&quot; 属性来设定产生Cookie的具体生命期。</p></li><li><p>最后调用&quot; Response.Cookies&quot; 对象的&quot; Add（）&quot; 方法，加入此对象，这样就可以产生一个Cookie了。具体代码如下：</p></li></ol><p><code>Response.Cookies.Add(cookie);</code></p><p>下列代码就是在 C#写入Cookie的完整代码（Write.aspx）：</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>&lt;% @ language=&quot;C#&quot; %&gt;
&lt;script runat=&quot;server&quot;&gt;
void WriteClicked(Object Sender, EventArgs e)
{
    //创建一个HttpCookie对象
    HttpCookie cookie = new HttpCookie(NameField.Text);
    //设定此cookies值
    cookie.Value = ValueField.Text ;
    //设定cookie的生命周期，在这里定义为一个小时
    DateTime dtNow = DateTime.Now;
    TimeSpan tsMinute = new TimeSpan(0, 1, 0, 0);
    cookie.Expires = dtNow + tsMinute ;
    cookie [&quot;姓名&quot;] = &quot;王天&quot;;
    cookie [&quot;性别&quot;] = &quot;男&quot;;
    cookie [&quot;年龄&quot;] = &quot;26&quot;;
    //加入此cookie
    Response.Cookies.Add(cookie);
    Response.Write(NameField.Text + &quot;Cookie创建完毕 &lt;br&gt; &lt;hr&gt; &quot;);
}
&lt;/script&gt;
&lt;html&gt;
&lt;body&gt; 
&lt;h3&gt; 在 C#页面中创建cookie &lt;/h3&gt;
此cookie的生命周期定义为一个小时
&lt;form runat=&quot;server&quot;&gt;
Cookie名称：&lt;asp:textbox id=&quot;NameField&quot; runat=&quot;server&quot; /&gt; &lt;br&gt;
Cookie的值：&lt;asp:textbox id=&quot;ValueField&quot; runat=&quot;server&quot; /&gt; &lt;br&gt;
&lt;asp:button text=&quot;创建Cookie&quot; onclick=&quot;WriteClicked&quot; runat=&quot;server&quot; /&gt; &lt;br&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;  
</code></pre></div><p>下图是上面代码运行后的界面：</p><p><img src="`+a+`" alt="img_1"><br> 图01：C#写入Cookie的程序运行界面</p><p>当然上面的代码产生的Cookie在内容上面有点单调了。其实对于内容十分丰富的Cookie来说，他还有许多属性，充分的利用这些属性，才可以利用了Cookie的强大功能。下表是Cookie的一些常用的属性：</p><table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>Domain</td><td>设定/获得Cookie应属于的域名。一旦设定了此属性，则只限定于此域名的Web服务器访问此Cookie。可以设定为&quot;ccw.com.cn&quot;</td></tr><tr><td>Path</td><td>设定/获得Cookie应属于的路径，如果设定后，则访问此Cookie的Web页面则被限定在此路径里面。其他路径的Web页面则不能访问。</td></tr><tr><td>Secure</td><td>设定/获得一个标识来表明利用HTTP协议是否能够安全的传输Cookie到客户端的浏览器。</td></tr><tr><td>HasKeys</td><td>表明是否此Cookie是否是多个字符串组成的。</td></tr></tbody></table><p>在写入Cookie的时候，最大限度的利用这些属性，对于最大程度的利用写入的Cookie是十分重要的。</p><h2 id="三、c-是如何读取已产生的cookie" tabindex="-1"><a class="header-anchor" href="#三、c-是如何读取已产生的cookie" aria-hidden="true">#</a> 三、C#是如何读取已产生的Cookie</h2><p>读取指定的Cookie比起写入Cookie要来的容易的多了，只需要使用&quot;Request.Cookies&quot; 对象就可以完成。下面是读取指定Cookie名称的方法：</p><p><code>HttpCookie cookie = Request.Cookies[&quot;Cookie的名称&quot;];</code></p><p>下面是显示已经读取了的Cookie的数值：</p><p><code>Response.Write(cookie.Value.ToString());</code></p><p>掌握了上面的要点，读取Cookie就显得非常容易了，下列是读取Cookie的程序代码（read.aspx）：</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;% @ language = &quot;C#&quot; %&gt;
&lt;script runat = &quot;server&quot; &gt;
void ReadClicked(Object Sender, EventArgs e)
{
    //得到用户输入的cookie名称
    String strCookieName = NameField.Text;
    //获得cookie
    HttpCookie cookie = Request.Cookies[strCookieName];
    //确定是否存在用户输入的cookie
    if (null == cookie){
        Response.Write(&quot;没有发现指定的cookie &lt;br&gt; &lt;hr&gt;&quot;);
    }
    else {
        //找到指定的cookie，显示cookie的值
        String strCookieValue = cookie.Value.ToString();
        Response.Write(strCookieName + &quot; cookie 的值为: &lt;b &gt; &quot; 
            + strCookieValue + &quot; &lt;/b &gt; &lt;br &gt; &lt;hr &gt; &quot; ) ;
    }
}
&lt;/script&gt;
&lt;html&gt;
&lt;body&gt;
在 C#页面中读取指定Cookie值&lt;br&gt;
&lt;form runat = &quot;server&quot;&gt;
请输入要读取的Cookie名称：&lt;asp:textbox id = &quot;NameField&quot; runat=&quot;server&quot; /&gt;
&lt;asp:button text=&quot;读取cookie&quot; onclick=&quot;ReadClicked&quot; runat=&quot;server&quot; /&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;  
</code></pre></div><p>下图是上面代码运行后的界面：</p><p><img src="`+s+`" alt="img_2"><br> 图02：读取指定Cookie的值的程序运行界面</p><h2 id="四、总结" tabindex="-1"><a class="header-anchor" href="#四、总结" aria-hidden="true">#</a> 四、总结</h2><p>至此我们已经介绍了用 C#进行Cookie编程的大部分内容。其实Cookie在互联网上有着比较大的作用。譬如它可让WEB站点跟踪特定访问者的访问次数、最后访问时间和访问者进入站点的路径等；还可告诉在线广告商广告被点击的次数，从而可以更精确的投放广告；它可让用户在不键入密码和用户名的情况下进入曾经浏览过的一些站点；最为重要的是它可帮助站点统计用户资料以实现个性化服务等等。掌握了 C#的Cookie编程，就可以在程序中充分利用Cookie来实现上面的这些功能了。不信你试一试。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Powered by DvNews.net
来源：网络
阅读：240 次
日期：2003-6-18
</code></pre></div>`,28),c=[p];function u(k,r){return t(),e("div",null,c)}const d=o(i,[["render",u],["__file","sysctr4.html.vue"]]);export{d as default};
