import{_ as n,o as a,c as s,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  c#中怎么让控件显示成winxp样式的和如何实现vb里的beep发声？
作　　者：  sleetdrop (sleetdrop)  
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  13
发表时间：  2003-7-27 6:38:19
</code></pre></div><p>刚学visual c#，我时在winxp下使用的，发现用winform生成的按钮和组件都长的和win2k下一样，不时漂亮的xp样式，而时老的方块式的。而在VC++.net里用mfc生成的按钮就是xp样式的，谁能告诉我是为什么呀。</p><p>还有我想做个提醒报时的小东西，可我不知道在c#里怎么visual basic里的beep发声？</p><p>回复人： freecs(红茗) ( 五级(中级)) 信誉：100 2003-7-27 9:19:39 得分:0</p><blockquote><p>自己开发这样的控件吧！可能要用到 API</p></blockquote><p>回复人： luckypan() ( 一级(初级)) 信誉：94 2003-7-27 9:30:36 得分:10</p><blockquote></blockquote><div class="language-xml" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;yes&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assembly</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:schemas-microsoft-com:asm.v1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">manifestVersion</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
    <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0.0.0<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>CompanyName.ProductName.netpolice<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>win32<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>Your application description here.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
            <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>win32<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Microsoft.Windows.Common-Controls<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>6.0.0.0<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">publicKeyToken</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>6595b64144ccf1df<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">language</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span>
        <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>assembly</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><blockquote><p>将以上代码以文件名：你的应用程序名.manifest(如我的应用程序名假定为：App.exe,则存储的文件名为App.exe.manifest),将其存放在你的应用程序所在目录下，将按钮的FlatStyle设置成System类型即可。</p></blockquote><p>回复人： nehc(青义居士) ( 四级(中级)) 信誉：106 2003-7-27 10:55:14 得分:5</p><blockquote><p>不要那么复杂<br><br> .net framework1.1的特性：<br> 在<code>Main()</code>中<br><code>Application.EnableVisualStyle();</code><br><br> 在使用的空间，FlatStyle属性，选择system就可以了。</p></blockquote><p>回复人： y1g1y1(袁飞☆VB诚可贵VB.Net价更高C#心中有二者皆可抛☆) ( 二级(初级)) 信誉：100 2003-7-27 13:02:40 得分:0</p><blockquote><p>使用这个控件，不用写一行代码，使你的菜单变成 XP 样式。<br><br> http://expert.csdn.net/Expert/TopicView1.asp?id=2044793</p></blockquote><p>回复人： liuspcn(青竹) ( 一级(初级)) 信誉：100 2003-7-27 13:31:25 得分:0</p><blockquote><p>mark</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-7-27 14:48:03 得分:5</p><blockquote><p>TO: nehc(赤化全川)你所说的方法好像只有几种控件可以呀！<br><br> 此方法启用应用程序的 Windows XP 可视化样式。如果控件和操作系统支持可视化样式，则控件将以这种样式进行绘制。若要使 EnableVisualStyles 生效，必须在应用程序中创建任何控件之前调用它；EnableVisualStyles 通常是 Main 函数的第一行。当调用 EnableVisualStyles 时，无需单独的清单即可启用可视化样式。<br><br> 对于支持 FlatStyle 属性的控件，请确保将 FlatStyle 属性设置为 FlatStyle.System 值。<br><br> 注意 此调用对于浏览器中的控件无效。<br> XP 平台说明: 只有 Windows XP Home Edition、Windows XP Professional 和 Windows Server 2003 系列平台才支持可视化样式。<br><br> 还是下载控件吧！：）</p></blockquote><p>回复人： sleetdrop(sleetdrop) ( 一级(初级)) 信誉：100 2003-7-28 5:33:44 得分:0</p><blockquote><p>还有那个用C#做类似vb的beep发声的问题怎么没人告诉我呀。</p></blockquote><p>回复人： sleetdrop(sleetdrop) ( 一级(初级)) 信誉：100 2003-8-1 7:07:59 得分:0</p><blockquote><p>怎么没人跟帖子了，我上面的问题还没解决呢</p></blockquote><p>回复人： sleetdrop(sleetdrop) ( 一级(初级)) 信誉：100 2003-8-7 6:29:22 得分:0</p><blockquote><p>大家真的不帮忙呀。</p></blockquote><p>回复人： ddy2000(梦归自然) ( 四级(中级)) 信誉：100 2003-8-7 8:43:19 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>  
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Beep</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> dwFreq<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> dwDuration<span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre></div><blockquote><p>Beep与VB类似</p></blockquote><p>回复人： accesine960(Stoney) ( 一级(初级)) 信誉：99 2003-8-7 9:06:03 得分:0</p><blockquote><p>sc</p></blockquote><p>回复人： sleetdrop(sleetdrop) ( 一级(初级)) 信誉：100 2003-8-8 6:37:09 得分:0</p><blockquote><p>谢谢了，去试试先。</p></blockquote><p>回复人： sleetdrop(sleetdrop) ( 一级(初级)) 信誉：100 2003-8-9 7:00:32 得分:0</p><blockquote><p>ddy2000(梦归自然)<br> 能不能说的再详细点，我时新手，没弄明白怎么用。<br> 比如说我用一个timer控件来控制定时发出声音，<br> 那我应该怎么写。</p></blockquote><hr><p>该问题已经结贴 ，得分记录： luckypan (10)、 nehc (5)、 snewxf (5)、</p>`,36),o=[e];function c(l,u){return a(),s("div",null,o)}const i=n(p,[["render",c],["__file","win18.html.vue"]]);export{i as default};