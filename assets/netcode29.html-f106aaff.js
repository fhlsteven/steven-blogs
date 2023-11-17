import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="如何通过需要用户认证的smtp服务器发送email" tabindex="-1"><a class="header-anchor" href="#如何通过需要用户认证的smtp服务器发送email" aria-hidden="true">#</a> 如何通过需要用户认证的SMTP服务器发送Email</h1><p>在c#中，我们一般可以使用System.Web.Mail下的MailMessage来发送Email:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>Mail</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendMail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name">MailMessage</span> Msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MailMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Msg<span class="token punctuation">.</span>To      <span class="token operator">=</span> <span class="token string">&quot;xxx@xxx.com&quot;</span><span class="token punctuation">;</span>
  Msg<span class="token punctuation">.</span>Subject <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
  Msg<span class="token punctuation">.</span>Body    <span class="token operator">=</span> <span class="token string">&quot;Testing Email&quot;</span><span class="token punctuation">;</span>
  Msg<span class="token punctuation">.</span>From<span class="token operator">=</span><span class="token string">&quot;xxx@xxx.com&quot;</span><span class="token punctuation">;</span>
  SmtpMail<span class="token punctuation">.</span>SmtpServer<span class="token operator">=</span><span class="token string">&quot;smtp.netease.com&quot;</span><span class="token punctuation">;</span> <span class="token comment">//&lt;&lt;===注意这个地址</span>
  SmtpMail<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>Msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>但事实上上面的代码无法正常工作，原因在于smtp.netease.com要求用户认证，而一开始我发现SmtpMail只能使用允许匿名用户的smtp服务器（想想现在还有支持匿名访问的smtp服务器吗？都是该死的垃圾邮件害的 😃 )。我查了一下资料，发现在c#中我们仍然需要通过调用COM(CDO for Windows 2000)来完成用户认证的功能。</p><p>下面是测试代码, 测试通过：VS.NET+Win2k Prof.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//在reference中添加CDO for Windows 2000</span>
<span class="token keyword">using</span> <span class="token namespace">CDO</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token keyword">try</span>
   <span class="token punctuation">{</span>
    <span class="token class-name">Configuration</span> conf<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConfigurationClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSendUsingMethod<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span>CdoSendUsing<span class="token punctuation">.</span>cdoSendUsingPort<span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSMTPServer<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;smtp.netease.com&quot;</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSMTPServerPort<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token number">25</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSMTPAccountName<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;hydnoahark&quot;</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSendUserReplyEmailAddress<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;\\&quot;hydnoahark\\&quot; &lt;hydnoahark@netease.com&gt;&quot;</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSendEmailAddress<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;\\&quot;hydnoahark\\&quot; &lt;hydnoahark@netease.com&gt;&quot;</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSMTPAuthenticate<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span>CdoProtocolsAuthentication<span class="token punctuation">.</span>cdoBasic<span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSendUserName<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;hydnoahark&quot;</span><span class="token punctuation">;</span>
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">[</span>CdoConfiguration<span class="token punctuation">.</span>cdoSendPassword<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token operator">=</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">;</span>
    
    conf<span class="token punctuation">.</span>Fields<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">MessageClass</span> msg<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    msg<span class="token punctuation">.</span>Configuration<span class="token operator">=</span>conf<span class="token punctuation">;</span>

    msg<span class="token punctuation">.</span>To<span class="token operator">=</span><span class="token string">&quot;hydnoahsark@sina.com&quot;</span><span class="token punctuation">;</span>
    msg<span class="token punctuation">.</span>Subject<span class="token operator">=</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">;</span>
    msg<span class="token punctuation">.</span>TextBody<span class="token operator">=</span><span class="token string">&quot;It&#39;s test&quot;</span><span class="token punctuation">;</span>
    msg<span class="token punctuation">.</span>From<span class="token operator">=</span><span class="token string">&quot;hydnoahark@netease.com&quot;</span><span class="token punctuation">;</span>

    msg<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
   <span class="token punctuation">}</span>
   <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices<span class="token punctuation">.</span>COMException</span> e<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>OK, 就是这么简单，不知道其他人有没更好的方法，可以的话给我一个建议 ^_^</p>`,7),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","netcode29.html.vue"]]);export{k as default};
