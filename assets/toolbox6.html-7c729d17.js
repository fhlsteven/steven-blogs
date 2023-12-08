import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="自己动手用c-写控件" tabindex="-1"><a class="header-anchor" href="#自己动手用c-写控件" aria-hidden="true">#</a> 自己动手用c#写控件</h1><blockquote><p>作者： willsound www.ASPCool.com 时间:2002-7-11 17:23:41 阅读次数:4797</p></blockquote><p>willsound（willsound@163.com）</p><p>我平时比较喜欢使用delphi，小生不才，我随然喜欢delphi，平时开发（至少现在）多用delphi，但是不怕各位高手笑话，我没有用delphi写过控件，虽然原理上知道，但总感觉不知无从下手:L</p><p>但是自从接触了c#,她哪优美的身姿（代码风格）,风骚而不放纵的性格(对面向对象的体现比较好，要比delphi强),深深打动了我。经过一段时间的操练，我发现在开发控件及组件上（别的方面，小生我不敢妄断），其简便性真令我耳目一新。怎么样，试一把吧.J</p><p>对了,我的开发平台是windows 2000 server+.vs.net 正式版</p><p>我所实现的这个控件，是从窗体控件Button继乘的，能够实现渐变背景，实现图案及纹理填充文字.</p><p>好了，我们开在开始吧</p><p>1 首先打个vs.net</p><p>2在“文件”菜单中，指向“新建”，然后选择“项目”以打开“新建项目”对话框。从“C# 项目”列表中选择“Windows 控件库”项目模板，然后在“名称”框中键入LinearGradientButtonLib，然后点确定。</p><p>3 在解决方案资源管理器中，右击 UserControl1.cs，并从快捷菜单中选择“查看代码”。</p><p>4 找到 class 语句 <code>public class UserControl1</code>，将 UserControl1 更改为 LinearGradientButton以更改组件的名称。找到构造函数 <code>public UserControl1()</code>，将它更改为 <code>public LinearGradientButton()</code>。</p><p>5 在 Class 语句，将该控件从 System.Windows.Forms.UserControl 继承的类型更改为 System.Windows.Forms.Button。这允许继承的控件继承 Button 控件的所有功能。</p><p>6 在解决方案资源管理器中，单击 UserControl1.cs，并在“属性”窗口中，将 FileName 属性更改为LinearGradientButton.cs.</p><p>好了，到现在工作就告一段落了，下面的工作，是向咱们的控件添加属性了。喝口水，继续！</p><p>先加上名字空间<code>using System.Drawing.Drawing2D;</code></p><p>1找到 class 语句。在紧靠 { 的后面键入下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">Color</span> froColor<span class="token punctuation">;</span> <span class="token comment">//渐变前景色</span>
<span class="token keyword">private</span> <span class="token class-name">Color</span> backColor<span class="token punctuation">;</span><span class="token comment">//渐变背景色</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> isUseFloat<span class="token punctuation">;</span><span class="token comment">//是否使用角度转变</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">float</span></span> angle<span class="token punctuation">;</span> <span class="token comment">//放置角度</span>
<span class="token keyword">private</span> <span class="token class-name">LinearGradientMode</span> mode<span class="token punctuation">;</span><span class="token comment">//设定渐变的角度</span>
<span class="token keyword">private</span> <span class="token class-name">HatchStyle</span> hatchStyle<span class="token punctuation">;</span> <span class="token comment">//设定文本的填充图案</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> isUseStyle<span class="token punctuation">;</span><span class="token comment">//设定是否用图案填充图案</span>
</code></pre></div><p>上面这些是我们控件需要的私有域，下面开始为每个私有域做它们对应的属性.在以上代码的下面，写入以下代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;设定按钮渐变的前景色&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Appearance&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">Color</span> FrontColor
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> froColor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        froColor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;设定按钮渐变的背景色&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Appearance&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">Color</span> BackGroundColor
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> backColor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        backColor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;设定是否人工设定角度&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> UseFloat
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> isUseFloat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        isUseFloat <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;设定是否使用图案填充文本&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> UseStyle
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> isUseStyle<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        isUseStyle <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;定义渐变方向的角度，以度为单位从 X 轴顺时针测量。 &quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Appearance&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">float</span></span> Angle
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> angle<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        angle <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;当UseFloat设为false时，设定渐变方向。 &quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Appearance&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">LinearGradientMode</span> Mode
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        mode <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DefaultValue</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;设定文本要填充的图案&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">Category</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Appearance&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">HatchStyle</span> FillStyle
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> hatchStyle<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        hatchStyle <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，我们将控件的属性设计好了，下面就要我们写事件了.</p><p>因为我们这个控件是实现背景渐变及文字填充，所以override Paint事件以完成自画。</p><p>为了完成override，现在以下的准备工作（写几个在Paint事件用的着的事件）.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 使用角度的方法渐近重画Button</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawButtonWithAngle</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> dbg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">LinearGradientBrush</span> brush <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinearGradientBrush</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">,</span> froColor<span class="token punctuation">,</span> backColor<span class="token punctuation">,</span> angle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dbg<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span>brush<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brush<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用模式的方法渐近重画Button</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawButtonWithMode</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> dbg<span class="token punctuation">,</span> <span class="token class-name">LinearGradientMode</span> Mode<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">LinearGradientBrush</span> brush <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LinearGradientBrush</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">,</span> froColor<span class="token punctuation">,</span> backColor<span class="token punctuation">,</span> Mode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dbg<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span>brush<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    brush<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 重画Button的文本(Text),不使用图案填充</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawButtonText</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> dbg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StringFormat</span> format <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    format<span class="token punctuation">.</span>LineAlignment <span class="token operator">=</span> StringAlignment<span class="token punctuation">.</span>Center<span class="token punctuation">;</span>
    format<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> StringAlignment<span class="token punctuation">.</span>Center<span class="token punctuation">;</span>
    dbg<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ForeColor<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">,</span> format<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//override DrawButtonText函数，使之可以用图案填充文本</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawButtonText</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> dbg<span class="token punctuation">,</span> <span class="token class-name">HatchStyle</span> hs<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">StringFormat</span> format <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    format<span class="token punctuation">.</span>LineAlignment <span class="token operator">=</span> StringAlignment<span class="token punctuation">.</span>Center<span class="token punctuation">;</span>
    format<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> StringAlignment<span class="token punctuation">.</span>Center<span class="token punctuation">;</span>
    dbg<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Font<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HatchBrush</span><span class="token punctuation">(</span>hs<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ForeColor<span class="token punctuation">,</span> Color<span class="token punctuation">.</span>Aquamarine<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Height<span class="token punctuation">)</span><span class="token punctuation">,</span> format<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，现在开始重写Paint事件了.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnPaint</span><span class="token punctuation">(</span><span class="token class-name">PaintEventArgs</span> pe<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Graphics</span> g <span class="token operator">=</span> pe<span class="token punctuation">.</span>Graphics<span class="token punctuation">;</span>

    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnPaint</span><span class="token punctuation">(</span>pe<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//调用父控件的方法 </span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isUseFloat <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token comment">//假如使用角度控制渐变的角度 </span>
        <span class="token function">DrawButtonWithAngle</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isUseFloat <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token function">DrawButtonWithMode</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> mode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isUseStyle <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token comment">//假如使用图案填充文字 </span>
        <span class="token function">DrawButtonText</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> hatchStyle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token function">DrawButtonText</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，现在大功告成了，进行保存，生成。</p><p>创建测试项目</p><ol><li>在“文件”菜单上，指向“添加项目”，然后单击“新建项目”以打开“添加新项目”对话框。</li><li>选择“Visual C# 项目”节点，然后单击“Windows 应用程序”。</li><li>在“名称”框中键入 Test。</li><li>在解决方案资源管理器中，右击测试项目的“引用”节点，然后从快捷菜单中选择“添加引用”以显示“添加引用”对话框。</li><li>单击标记为“项目”的选项卡。</li><li>双击 LinearGradientButtonLib 项目，并注意该项目此时出现在“选定的组件”窗格中。</li></ol><p>添加引用后，应将新控件添加到工具箱。如果您的控件已经出现在工具箱中，则应该跳过下一节。</p><p>将控件添加到工具箱</p><ol><li><p>右击工具箱，然后从快捷菜单中选择“自定义工具箱”。</p><p>“自定义工具箱”对话框打开。</p></li><li><p>选择“.NET 框架组件”选项卡并单击“浏览”。浏览到 LinearGradientButtonLib\\bin\\debug 文件夹并选择 LinearGradientButtonLib.dll。</p><p>LinearGradientButton 出现在“自定义工具箱”对话框的组件列表中。</p></li><li><p>在“自定义工具箱”对话框中，单击 LinearGradientButton 旁的框并关闭窗口。</p><p>LinearGradientButton 被添加到选定的工具箱的选项卡上。</p></li></ol><p>将控件添加到窗体</p><ol><li><p>在解决方案资源管理器中，右击“Form1.cs”，然后从快捷菜单中选择“视图设计器”。</p></li><li><p>在工具箱中，向下滚动直到到达标记为 LinearGradientButton 的图标。双击该图标。</p><p>窗体上显示一个“LinearGradientButton”。</p></li><li><p>右击“LinearGradientButton”并从快捷菜单中选择“属性”。</p></li><li><p>在“属性”窗口中检查该控件的属性。注意，它们与标准按钮公开的属性相同，不同的是多了我们自己加入的一些属性</p></li><li><p>设定本控件的前景色及背景色，然后可以选择是否填充文字，是使用角度还是使用系统设定值进行渐变角度的变化。</p></li><li><p>从“调试”菜单中选择“启动”。 出现 Form1。</p></li></ol><p>谁如果需要源码的话，请给我发信.</p>`,35),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","toolbox6.html.vue"]]);export{i as default};
