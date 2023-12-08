import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},e=p(`<h1 id="vc-net下基于winform的系统登录程序解决方法" tabindex="-1"><a class="header-anchor" href="#vc-net下基于winform的系统登录程序解决方法" aria-hidden="true">#</a> VC#.NET下基于WinForm的系统登录程序解决方法</h1><p>背景（废话and感想）：</p><p>接触.net已经很长时间了，但是一直没有时间认真去学习，先前只是一些了解。<br> 我全力学习C#，ASP.NET，ADO.NET已经一个多星期了，是带着一个项目学习的！：）首先我光顾了本地多个书店，买回了一堆书，包括《ADO.NET程序设计》<br> 〈构建Web解决方案——应用ASP.NET和ADO.NET〉〈Visual C#.net技术内幕〉〈.net frameword高级编程〉。这些书都给了我很大的帮助，前面两本我差不多都看完了。后面两本只是作为参考。当然，给我最大帮助的还是CSDN的网友。</p><p><strong>摘要</strong>：</p><p>VC#.NET下的一个基于WinForm的系统登录程序解决方案！</p><h2 id="问题详细描述" tabindex="-1"><a class="header-anchor" href="#问题详细描述" aria-hidden="true">#</a> 问题详细描述</h2><p>用vc#.net建立一个基于winform的工程，包含一个主窗口，一个登录窗口。主窗口包含若干菜单项，main()函数在主窗口中。登录窗口包含用户名称输入框和密码输入框，还有用户类型选择框，确定按钮。需要在主窗口加载的时候，弹出登录窗口，用户输入用户名称和密码，选择用户类型之后，通过确定按钮。用户通过验证后，自动关闭登录窗口，此时，主窗口的特定菜单变为可用，某些菜单变为不可用，就是改变了菜单的enabled属性。主窗口变为当前活动窗口。如果用户不通过验证，关闭了登录窗口，那么禁止所有菜单。</p><h2 id="网友解决方案" tabindex="-1"><a class="header-anchor" href="#网友解决方案" aria-hidden="true">#</a> 网友解决方案</h2><h3 id="一" tabindex="-1"><a class="header-anchor" href="#一" aria-hidden="true">#</a> 一，</h3><p>1.做一个登陆窗体，把Main()方法放在这个窗体中，让它做主窗体；<br> 2.在你原来的主窗口（你想修改菜单属性那个）的构造函数中加进一个int型参数LoginType；<br> 3.在登录窗体的“确定”按钮事件中根据用户身份类型设置一个int值，例如管理员是0，一般用户是1等。然后生成你那个带菜单的主窗体，并把这个整数传给它的构造函数；<br> 4.在你那个带菜单的主窗体的form_load事件中根据LoginType的值来设定菜单项哪个可用哪个不可用。<br> 希望对你有帮助 😃</p><h4 id="我对于这个方案的理解" tabindex="-1"><a class="header-anchor" href="#我对于这个方案的理解" aria-hidden="true">#</a> 我对于这个方案的理解</h4><p>很感谢你的建议！对于这个办法，首先有点是不符合我的需求，我是要在主窗口（即带菜单的那个）加载的时候，显示一个用户登录界面。登录成功才关闭这个登录界面，然后根据用户类型，在主窗口中显示特定的菜单。如果用户关闭这个登录界面，那么全部禁止菜单。我首先用了你的办法，但是在显示主窗体之后，登录窗体无法关闭，一关闭这个登录窗口连主窗口也要关闭了，因为主函数main()掌握在登录窗口之中。虽然可以用隐藏登录窗口的办法，但是我没有试！：）</p><h3 id="二" tabindex="-1"><a class="header-anchor" href="#二" aria-hidden="true">#</a> 二，</h3><p>下面的方法可以作到这样,用户启动程序以后,主窗口先出现,但是菜单全部是禁止的,接着登陆窗口出现,用户这时一定要登陆,否则就会退出.用户登陆以后,根据不同用户显示不同菜单.</p><p>1,设计主窗体frmMain为启动窗体,即这个窗体包含Main().</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> strLogin<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">frmMain_Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">//禁止所有菜单</span>
<span class="token punctuation">}</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">frmMain_Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>strLogin <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    <span class="token class-name">frmLogin</span> myfrmLogin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">frmLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>myfrmLogin<span class="token punctuation">.</span><span class="token function">myShowDialog</span><span class="token punctuation">(</span><span class="token keyword">ref</span> strLogin <span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//然后判断登陆用户类型,决定那些菜单显示.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2,设计登陆窗口frmLogin.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">myfrmShowDialog</span><span class="token punctuation">(</span><span class="token keyword">string</span> <span class="token keyword">ref</span> strpLogin<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//返回登陆用户.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>UserCancel <span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">//用户取消,返回假</span>
    strpLogin <span class="token operator">=</span> UserInfo<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="我对这个方案的理解" tabindex="-1"><a class="header-anchor" href="#我对这个方案的理解" aria-hidden="true">#</a> 我对这个方案的理解</h4><p>你的建议非常的符合我的需求，但是<code>private void frmMain_Activate()</code>这个事件我是不太了解，所以没能解决！我查了wincv，发现有Activate这个事件，但是我不知道怎么用！请问下具体是什么？可以参考什么方面的书？</p><h3 id="我对网友方案的总结" tabindex="-1"><a class="header-anchor" href="#我对网友方案的总结" aria-hidden="true">#</a> 我对网友方案的总结</h3><p>鉴于两位的做法，我总结出了一个原理，就是传递参数，用来保存用户类型信息！：）</p><h2 id="我的解决方案" tabindex="-1"><a class="header-anchor" href="#我的解决方案" aria-hidden="true">#</a> 我的解决方案</h2><p>我是这样设计我的登录程序的，大家参观下，给点意见！</p><p>1，在主窗口中的加载函数中。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form_main_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Form_login</span> frm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form_login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//创建一个登录窗口</span>
    frm<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//显示这个登录窗口</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>frm<span class="token punctuation">.</span><span class="token function">returnUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">//返回的用户类型</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//这里添加修改菜单属性代码！</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>frm<span class="token punctuation">.</span><span class="token function">returnUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//这里添加修改菜单属性代码！</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>frm<span class="token punctuation">.</span><span class="token function">returnUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//这里添加修改菜单属性代码！</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//frm.Close();</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2，在登录窗口中，为登录窗口类添加一个用户类型变量，</p><p><code>private int userType;</code></p><p>3,在登录窗口中，为登录窗口类添加一个public函数，用来返回用户类型信息！</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">returnUserType</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>userType<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>4，在登录窗口的确定按钮事件代码中，保存你的用户类型信息！</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//一些登录数据库，验证过程</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>userType <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">//this.Close();</span>
    <span class="token comment">//.......</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>userType <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token comment">//this.Close();</span>
    <span class="token comment">//...........</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="我的方案总结" tabindex="-1"><a class="header-anchor" href="#我的方案总结" aria-hidden="true">#</a> 我的方案总结</h2><p>虽然问题已经解决，但是我发现什么时候关闭登录窗口是个问题。在button1_Click中解决，还是在Form_main_Load中解决好！</p><p>第一次写东西，叙述的不是很好！希望这个对初学者或正需要这方面的知识有所帮助！</p><p>最后特别感谢CSDN论坛的DemonHunter(无言以对),souther(南风)</p><p>详细请看：http://expert.csdn.net/Expert/topic/1681/1681684.xml?temp=.1134607</p><p>技术交流： hgf686@sina.com</p>`,38),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","appctr15.html.vue"]]);export{i as default};
