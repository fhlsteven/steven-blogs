import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="在asp-net下实现数字和字符相混合的验证码-c-code" tabindex="-1"><a class="header-anchor" href="#在asp-net下实现数字和字符相混合的验证码-c-code" aria-hidden="true">#</a> 在ASP.NET下实现数字和字符相混合的验证码(C# Code)</h1><blockquote><p>原创：chi0591 日期：2003-12-30 人气：24</p></blockquote><p>为了便于大家学习，修改vb.net code成为c#</p><p>gif.aspx文件修改的内容</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 在此处放置用户代码以初始化页面</span>
    <span class="token comment">// RndNum是一个自定义函数</span>
    <span class="token class-name"><span class="token keyword">string</span></span> VNum <span class="token operator">=</span> <span class="token function">RndNum</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Session<span class="token punctuation">[</span><span class="token string">&quot;VNum&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> VNum<span class="token punctuation">;</span>
    <span class="token function">ValidateCode</span><span class="token punctuation">(</span>VNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ValidateCode</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> VNum<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//生成验证code</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Bitmap</span> img<span class="token punctuation">;</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Graphics</span> g<span class="token punctuation">;</span>
    <span class="token class-name">System<span class="token punctuation">.</span>IO<span class="token punctuation">.</span>MemoryStream</span> ms<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> gheight <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>VNum<span class="token punctuation">.</span>Length <span class="token operator">*</span> <span class="token number">11.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//gheight为图片宽度,根据字符长度自动更改图片宽度</span>
    img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Bitmap</span><span class="token punctuation">(</span>gheight<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g <span class="token operator">=</span> Graphics<span class="token punctuation">.</span><span class="token function">FromImage</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//在矩形内绘制字串（字串，字体，画笔颜色，左上x.左上y）</span>
    g<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>VNum<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Font</span><span class="token punctuation">(</span><span class="token string">&quot;Arial&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Color<span class="token punctuation">.</span>Blue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ms <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span>ms<span class="token punctuation">,</span> ImageFormat<span class="token punctuation">.</span>Png<span class="token punctuation">)</span><span class="token punctuation">;</span>

    Response<span class="token punctuation">.</span><span class="token function">ClearContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//需要输出图象信息 要修改HTTP头</span>
    Response<span class="token punctuation">.</span>ContentType <span class="token operator">=</span> <span class="token string">&quot;image/gif&quot;</span><span class="token punctuation">;</span>
    Response<span class="token punctuation">.</span><span class="token function">BinaryWrite</span><span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    g<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    img<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Response<span class="token punctuation">.</span><span class="token function">End</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// &#39;函数名称:RndNum</span>
<span class="token comment">// &#39;函数参数:VcodeNum--设定返回随机字符串的位数</span>
<span class="token comment">// &#39;函数功能:产生数字和字符混合的随机字符串</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">RndNum</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> VcodeNum<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Vchar <span class="token operator">=</span> <span class="token string">&quot;0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,W,X,Y,Z&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> VcArray <span class="token operator">=</span> Vchar<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将字符串生成数组</span>
    <span class="token class-name"><span class="token keyword">string</span></span> VNum <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> VcodeNum<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Random</span> ro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> decA <span class="token operator">=</span> ro<span class="token punctuation">.</span><span class="token function">NextDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        VNum <span class="token operator">=</span> VNum <span class="token operator">+</span> VcArray<span class="token punctuation">[</span>Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token number">35</span> <span class="token operator">*</span> decA<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// For i=1 to VcodeNum</span>
    <span class="token comment">// Randomize</span>
    <span class="token comment">// VNum=VNum &amp; VcArray(Int(35*Rnd)) &#39;数组一般从0开始读取，所以这里为35*Rnd</span>
    <span class="token comment">// Next</span>
    <span class="token keyword">return</span> VNum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ValidateCode.aspx修改内容</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 在此处放置用户代码以初始化页面 </span>
    <span class="token class-name"><span class="token keyword">string</span></span> VNum<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Session<span class="token punctuation">[</span><span class="token string">&quot;VNum&quot;</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        VNum <span class="token operator">=</span> Session<span class="token punctuation">[</span><span class="token string">&quot;VNum&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Session<span class="token punctuation">.</span><span class="token function">Abandon</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ViewState<span class="token punctuation">[</span><span class="token string">&quot;VNum&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> VNum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>txtValidateCode<span class="token punctuation">.</span>Text <span class="token operator">==</span> ViewState<span class="token punctuation">[</span><span class="token string">&quot;VNum&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        lblShow<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;提示:验证通过&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        lblShow<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;所填写的验证码与所给的不符&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>来源：不详</p></blockquote>`,8),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","safe7.html.vue"]]);export{i as default};
