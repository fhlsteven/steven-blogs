import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="c-做windows登陆程序-上传文件" tabindex="-1"><a class="header-anchor" href="#c-做windows登陆程序-上传文件" aria-hidden="true">#</a> C#做windows登陆程序，上传文件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  C#做windows登陆程序，上传文件
作　　者：  jb2008 (飞天.net)  
等　　级：
信 誉 值：  99
所属论坛：  .NET技术 C#
问题点数：  200
回复次数：  17
发表时间：  2003-3-21 10:59:51
</code></pre></div><p>用C#做WindForm客户端，把文件上传到服务器上的一个共享目录中。<br> 怎样登陆windows，取得Copy权限信任。</p><p>上面是上传文件的一个方法，有没有更好的方法？</p><hr><hr><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 11:04:05 得分:50</p><blockquote><p>参考<br> ms-help://MS.VSCC/MS.MSDNVS.2052/cpguide/html/cpconprincipalidentityobjects.htm</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 11:04:29 得分:50</p><blockquote><p>可将 GenericIdentity 类和 GenericPrincipal 类合起来使用，以创建独立于 Windows NT 或 Windows 2000 域的身份验证方案。例如，使用这两个对象的应用程序可能会提示用户输入姓名和密码，并将其同数据库项进行核对，然后根据数据库中的值创建标识和用户对象。<br><br> 参考<br> ms-help://MS.VSCC/MS.MSDNVS.2052/cpguide/html/cpconcreatinggenericprincipalgenericidentityobjects.htm</p></blockquote><p>回复人： jb2008(飞天.net) ( 五级(中级)) 信誉：99 2003-3-21 11:09:51 得分:0</p><blockquote><p>我急需示例代码，<br> 问题解决，马上给分</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 11:51:16 得分:50</p><blockquote><p><code>FileInfo fi = new FileInfo(源文件);</code><br><code>string name = @&quot;\\\\服务器文件名\\tt.txt&quot;;</code><br><code>fi.CopyTo(name);</code><br><br> 这样有什么问题吗？</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 11:54:13 得分:0</p><blockquote><p>System.Threading.Thread.CurrentPrincipal<br> 获取或设置线程的当前负责人（对基于角色的安全性而言）。<br><br> 如果需要权限<br> 创建设定你需要的用户身份<br> 然后付给当前线程</p></blockquote><p>回复人： jb2008(飞天.net) ( 五级(中级)) 信誉：99 2003-3-21 11:54:13 得分:0</p><blockquote><p>To,龙人<br> 当然有问题，你不登陆，怎么把文件Copy过去，没有权限啊</p></blockquote><p>回复人： jb2008(飞天.net) ( 五级(中级)) 信誉：99 2003-3-21 11:55:38 得分:0</p><blockquote><p>怎么样打通权限？<br> 示例代码。/<br></p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 12:03:11 得分:0</p><blockquote><p><code>WindowsIdentity MyIdentity = new WindowsIdentity(hToken);</code><br> -- 其中 hToken 表示一个 Windows 标记。此标记通常通过调用非托管代码（如调用 Win32 API LogonUser）来检索<code>WindowsPrincipal MyPrincipal = new WindowsPrincipal(MyIdentity);</code><br><br><code>System.Threading.Thread.CurrentPrincipal = MyPrincipal;</code></p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 12:03:46 得分:0</p><blockquote><p>吃饭了~~~<br> 下午再讨论~~\`\`\`\`\`\`\`\`\`</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 12:06:08 得分:0</p><blockquote><p>我记得有一段获得hToken的代码<br> 忘记在那里的<br> 找到了贴给你<br> ：）</p></blockquote><p>回复人： timmy3310(Tim) ( 两星(中级)) 信誉：171 2003-3-21 12:59:50 得分:0</p><blockquote><p>up</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 12:59:54 得分:0</p><blockquote><p>这是一段获取htoken的程序</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>Principal</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>Permissions</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span><span class="token class-name">SecurityPermissionAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span>SecurityAction<span class="token punctuation">.</span>RequestMinimum<span class="token punctuation">,</span> UnmanagedCode<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Class1</span>
<span class="token punctuation">{</span>
   <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\WINNT\\\\System32\\\\advapi32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">LogonUser</span><span class="token punctuation">(</span><span class="token class-name">String</span> lpszUsername<span class="token punctuation">,</span> <span class="token class-name">String</span> lpszDomain<span class="token punctuation">,</span> <span class="token class-name">String</span> lpszPassword<span class="token punctuation">,</span> 
            <span class="token class-name"><span class="token keyword">int</span></span> dwLogonType<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwLogonProvider<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> phToken<span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\WINNT\\\\System32\\\\Kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      <span class="token comment">// The Windows NT user token.</span>
      <span class="token class-name"><span class="token keyword">int</span></span> token1<span class="token punctuation">;</span>

      <span class="token comment">// Get the user token for the specified user, machine, and password using the unmanaged LogonUser method.</span>
      <span class="token class-name"><span class="token keyword">bool</span></span> loggedOn <span class="token operator">=</span> <span class="token function">LogonUser</span><span class="token punctuation">(</span>
               <span class="token comment">// User name.</span>
               <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> 
               <span class="token comment">// Computer name.</span>
               <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
               <span class="token comment">// Password.</span>
               <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
               <span class="token comment">// Logon type = LOGON32_LOGON_NETWORK_CLEARTEXT.</span>
               <span class="token number">3</span><span class="token punctuation">,</span>
               <span class="token comment">// Logon provider = LOGON32_PROVIDER_DEFAULT.</span>
               <span class="token number">0</span><span class="token punctuation">,</span>
               <span class="token comment">// The user token for the specified user is returned here.</span>
               <span class="token keyword">out</span> token1<span class="token punctuation">)</span><span class="token punctuation">;</span>            
      
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;LogonUser called&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
      <span class="token comment">// Call GetLastError to try to determine why logon failed if it did not succeed.</span>
      <span class="token class-name"><span class="token keyword">int</span></span> ret <span class="token operator">=</span> <span class="token function">GetLastError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;LogonUser Success? &quot;</span> <span class="token operator">+</span> loggedOn<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;NT Token Value: &quot;</span> <span class="token operator">+</span> token1<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Error code (126 == \\&quot;Specified module could not be found\\&quot;): &quot;</span> <span class="token operator">+</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      <span class="token comment">//Starting impersonation here:</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\\nBefore impersonation:\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">WindowsIdentity</span> mWI1 <span class="token operator">=</span> WindowsIdentity<span class="token punctuation">.</span><span class="token function">GetCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI1<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI1<span class="token punctuation">.</span>Token<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token class-name">IntPtr</span> token2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IntPtr</span><span class="token punctuation">(</span>token1<span class="token punctuation">)</span><span class="token punctuation">;</span>

      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\\nNew identity created:\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">WindowsIdentity</span> mWI2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WindowsIdentity</span><span class="token punctuation">(</span>token2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI2<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI2<span class="token punctuation">.</span>Token<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// Impersonate the user.</span>
      <span class="token class-name">WindowsImpersonationContext</span> mWIC <span class="token operator">=</span> mWI2<span class="token punctuation">.</span><span class="token function">Impersonate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   

      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\\nAfter impersonation:\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">WindowsIdentity</span> mWI3 <span class="token operator">=</span> WindowsIdentity<span class="token punctuation">.</span><span class="token function">GetCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI3<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI3<span class="token punctuation">.</span>Token<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">// Revert to previous identity.</span>
      mWIC<span class="token punctuation">.</span><span class="token function">Undo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\\nAfter impersonation is reverted:\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">WindowsIdentity</span> mWI4 <span class="token operator">=</span> WindowsIdentity<span class="token punctuation">.</span><span class="token function">GetCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI4<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>mWI4<span class="token punctuation">.</span>Token<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 13:00:59 得分:0</p><blockquote><p>顺便说一下<br> 你必须知道你要获取的有效用户<br> user name 和Passwork<br> 不然是没办法的<br><br> （那就不是写程序，到可以去做黑客了）<br> 祝成功~~~</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-21 14:58:12 得分:0</p><blockquote><p>你试试这一段，我没有环境没测试<br><br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> token1<span class="token punctuation">;</span>

<span class="token comment">// Get the user token for the specified user, machine, and password using the unmanaged LogonUser method.</span>

<span class="token class-name"><span class="token keyword">string</span></span> uname <span class="token operator">=</span> 用户<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> upwd <span class="token operator">=</span> 密码<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> uDomain <span class="token operator">=</span> 域名<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">bool</span></span> loggedOn <span class="token operator">=</span> <span class="token function">LogonUser</span><span class="token punctuation">(</span>
    <span class="token comment">// User name.</span>
    uname<span class="token punctuation">,</span>
    <span class="token comment">// Domain or Computer name.</span>
    uDomain<span class="token punctuation">,</span>
    <span class="token comment">// Password.</span>
    upwd<span class="token punctuation">,</span>
    <span class="token comment">// Logon type = LOGON32_LOGON_NETWORK_CLEARTEXT.</span>
    <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token comment">// Logon provider = LOGON32_PROVIDER_DEFAULT.</span>
    <span class="token number">0</span><span class="token punctuation">,</span> 
    <span class="token comment">// The user token for the specified user is returned here.</span>
    <span class="token keyword">out</span> token1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//string s = WindowsIdentity.GetCurrent().Token.ToString();</span>
<span class="token comment">//Thread.CurrentPrincipal.Identity</span>

<span class="token class-name">System<span class="token punctuation">.</span>IntPtr</span> token2<span class="token punctuation">;</span>
<span class="token comment">//token2 = WindowsIdentity.GetCurrent().Token;</span>
token2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IntPtr</span><span class="token punctuation">(</span>token1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">WindowsIdentity</span> MyIdentity <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WindowsIdentity</span><span class="token punctuation">(</span>token2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">WindowsPrincipal</span> MyPrincipal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WindowsPrincipal</span><span class="token punctuation">(</span>MyIdentity<span class="token punctuation">)</span><span class="token punctuation">;</span>
Thread<span class="token punctuation">.</span>CurrentPrincipal <span class="token operator">=</span> MyPrincipal<span class="token punctuation">;</span>

<span class="token class-name">FileInfo</span> fi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>源文件名<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//string name = textBox2.Text + &quot;tt.txt&quot;;</span>
<span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">@&quot;\\\\共享目录\\tt.txt&quot;</span><span class="token punctuation">;</span>
fi<span class="token punctuation">.</span><span class="token function">CopyTo</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： jb2008(飞天.net) ( 五级(中级)) 信誉：99 2003-3-21 16:13:37 得分:0</p><blockquote><p>报错为无法用标记中获取用户名和密码，<br> 另，那个DoMain能不能是IP</p></blockquote><p>回复人： dragontt(龙人) ( 两星(中级)) 信誉：130 2003-3-24 10:08:29 得分:50</p><blockquote><p>弄好没有<br><br> 那里不能填写IP<br> 我刚试了，不可以</p></blockquote><hr><p>该问题已经结贴 ，得分记录： dragontt (50)、 dragontt (50)、 dragontt (50)、 dragontt (50)、</p>`,42),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","netinterdu6.html.vue"]]);export{k as default};
