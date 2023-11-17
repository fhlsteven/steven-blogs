import{_ as t,r as o,o as p,c as e,b as n,d as s,e as c,a as l}from"./app-a2b6e588.js";const u="/steven-blogs/assets/appctr5_1-43407e97.gif",i={},r={id:"让你的应用程序支持高对比度模式",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#让你的应用程序支持高对比度模式","aria-hidden":"true"},"#",-1),d={href:"https://www.cnblogs.com/birdshome/archive/2004/12/23/80838.html",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>常看我的blog的网友可能都比较熟悉我使用的Windows主题，就是那个黑白高对比(HighContrast)了，这个主题虽然不是很popular，但还是有其根源的，应用程序支持HighContrast是属于&quot;创建具有辅助功能的 Windows 应用程序&quot;的范畴的一个case。</p><p>创建具有辅助功能的应用程序有重要的商业意义。许多政府都有针对软件购买的辅助功能法规。“Certified for Windows”徽标包括辅助功能要求。据估计仅美国就有三千万居民（其中许多是潜在的客户）受到软件辅助功能的影响。----msdn</p><p>高对比度模式是一种 Windows 系统设置主题，它通过使用对比鲜明的色彩和字体大小提高文本的可读性。这个色彩配置既然属于Windows的一个辅助功能，原意是为了保证视力受损用户查看信息预置的选项。可是对于程序员或者每天工作都是面对电脑的用户，这个设置也有保护视力的作用，特别是程序员需要长时间专著的注视屏幕。Windows普通色彩主题，屏幕上的高亮色彩区域一般在60-70%。大家都知道普通CRT显示器是靠电子激活荧光物质发光，屏幕越亮，射到屏幕上的电子束强度越大，而黑色的区域是没有电子激活的地方。高亮对于屏幕刷新率要求也高，如果显示器刷新率在85Hz以下，其实对眼睛伤害很大的，如果在75Hz及以下，明显能感觉闪烁。而75Hz的刷新率在HighContrast模式下，是感觉不到屏幕闪烁的。</p><p>如果我们要在我们的程序中支持HighContrast，我们可以通过Windows API SystemParametersInfo来读出并判断系统的颜色主题是否为黑白高度比度。在.NET下就更容易了，有个专门的<code>bool</code> <code>System.Windows.Forms.SystemInfo.HighContrast</code>属性用来判断系统的色彩主题。如果我们启用了黑白高对比(即<code>SystemInformation.HighContrast</code> 为 <code>true</code>)，则应用程序应当需要注意以下几个方面的问题：</p><ul><li>使用系统配色方案显示所有用户界面元素</li><li>用可视提示或声音传递任何通过颜色传递的信息。例如，如果特定列表项用红色字体突出显示，则可以将字体改为粗体，这样用户就得到一种有关突出显示项目的非颜色提示。</li><li>忽略文本后面的任何图像或图案</li></ul><p>应用程序应当在启动时检查 HighContrast 的设置并响应系统事件 UserPreferenceChanged。每当 HighContrast 的值更改时，就引发 UserPreferenceChanged 事件。SystemColors 类用来将标签的颜色设置更改为用户选定的系统颜色。</p><p>在WinForm程序中有效的启用高对比模式，我们需要以下步骤：</p><p>1、创建一个方法以将Label的颜色设置为系统颜色。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetColorScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>SystemInformation<span class="token punctuation">.</span>HighContrast<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        companyLabel<span class="token punctuation">.</span>BackColor <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>Window<span class="token punctuation">;</span>
        companyLabel<span class="token punctuation">.</span>ForeColor <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>WindowText<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        companyLabel<span class="token punctuation">.</span>BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>Blue<span class="token punctuation">;</span>
        companyLabel<span class="token punctuation">.</span>ForeColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>Yellow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2、在窗体构造函数中为 <code>public class Form1</code>中调用 <code>SetColorScheme</code> 过程。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SetColorScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>3、使用适当的签名创建一个事件过程，以响应 <code>UserPreferenceChanged</code> 事件。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UserPreferenceChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>UserPreferenceChangedEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">SetColorScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>4、在窗体构造函数中对<code>InitializeComponents</code>的调用后面添加代码，以便将事件过程挂钩到系统事件上。此方法调用 <code>SetColorScheme</code> 过程。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SetColorScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>SystemEvents<span class="token punctuation">.</span>UserPreferenceChanged
       <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>UserPreferenceChangedEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>UserPreferenceChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>5、在调用基类的 <code>Dispose</code> 方法之前，向窗体的 <code>Dispose</code> 方法添加代码，以在关闭应用程序时释放事件。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>SystemEvents<span class="token punctuation">.</span>UserPreferenceChanged
       <span class="token operator">-=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>UserPreferenceChangedEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>UserPreferenceChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意 <strong>系统事件代码运行一个独立于主应用程序的线程。如果不释放事件，则即使程序关闭后挂接到该事件上的代码也将运行</strong>。</p><p>同样我们的WebApplication也是可以支持Windows的配色方案，在适当的时候根据Windows的主题配置同时变化。<br> 下面是Web中的system color table，分别是HighContrast Style、Classtical Style和WindowXp Style，以供对比参考：</p><p><img src="`+u+'" alt="img_1"></p><p>posted on 2004-12-23 13:25 birdshome 阅读(92) 评论(1)</p><hr><p>评论</p><p>re</p><blockquote><p>难道这就是传说中的黑的有道理？</p></blockquote>',25);function m(g,f){const a=o("ExternalLinkIcon");return p(),e("div",null,[n("h1",r,[k,s(),n("a",d,[s("让你的应用程序支持高对比度模式"),c(a)])]),h])}const y=t(i,[["render",m],["__file","appctr5.html.vue"]]);export{y as default};
