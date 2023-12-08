import{_ as p,r as t,o,c as e,b as n,d as s,e as c,a as l}from"./app-f0851ed3.js";const k={},u={id:"在windows下让不同用户使用不同的分辨率-c-2005",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#在windows下让不同用户使用不同的分辨率-c-2005","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/daniel_ngn/archive/2004/10/05/49091.aspx",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>在windows下要实现不同用户拥有不同分辨率，为什么不自己动手来实现呢，看看如下实例吧：</p><p>首先制作一个能改变屏幕分辨率的C#程序，源代码如下，使用了Visual C# Express 2005 BETA 1：</p><p>1、新建Windows Application工程，取名为ScreenResolution<br> 2、粘贴各文件的代码：</p><p>Program.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> Using directives</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>Generic</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token keyword">namespace</span> <span class="token namespace">ScreenResolution</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// The main entry point for the application.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">EnableVisualStyles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Application<span class="token punctuation">.</span><span class="token function">EnableRTLMirroring</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Form1.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ScreenResolution</span>
<span class="token punctuation">{</span>
    <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">DMDO</span>
        <span class="token punctuation">{</span>
            DEFAULT <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
            D90 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
            D180 <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
            D270 <span class="token operator">=</span> <span class="token number">3</span>
        <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">struct</span> <span class="token class-name">DEVMODE</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_DISPLAYFREQUENCY <span class="token operator">=</span> <span class="token number">0x400000</span><span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_PELSWIDTH <span class="token operator">=</span> <span class="token number">0x80000</span><span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_PELSHEIGHT <span class="token operator">=</span> <span class="token number">0x100000</span><span class="token punctuation">;</span>
            <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CCHDEVICENAME <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>
            <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CCHFORMNAME <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>

            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> CCHDEVICENAME<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> dmDeviceName<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmSpecVersion<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDriverVersion<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmSize<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDriverExtra<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmFields<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPositionX<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPositionY<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name">DMDO</span> dmDisplayOrientation<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFixedOutput<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmColor<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDuplex<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmYResolution<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmTTOption<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmCollate<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> CCHFORMNAME<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> dmFormName<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmLogPixels<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmBitsPerPel<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPelsWidth<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPelsHeight<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFlags<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFrequency<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmICMMethod<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmICMIntent<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmMediaType<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDitherType<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmReserved1<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmReserved2<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPanningWidth<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPanningHeight<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token comment">//static extern int ChangeDisplaySettings( DEVMODE lpDevMode,  int dwFlags);</span>

        <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">ChangeDisplaySettings</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">In</span></span><span class="token punctuation">]</span> <span class="token keyword">ref</span> <span class="token class-name">DEVMODE</span> lpDevMode<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwFlags<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//private System.ComponentModel.Container components = null;</span>
        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token comment">//        protected override void Dispose(bool disposing)</span>
<span class="token comment">//        {</span>
<span class="token comment">//            if (disposing)</span>
<span class="token comment">//            {</span>
<span class="token comment">//                if (components != null)</span>
<span class="token comment">//                {</span>
<span class="token comment">//                    components.Dispose();</span>
<span class="token comment">//                }</span>
<span class="token comment">//            }</span>
<span class="token comment">//            base.Dispose(disposing);</span>
<span class="token comment">//        }</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
<span class="token comment">//        private void InitializeComponent()</span>
<span class="token comment">//        {</span>
<span class="token comment">//            this.AutoScaleBaseSize = new System.Drawing.Size(6, 14);</span>
<span class="token comment">//            this.ClientSize = new System.Drawing.Size(292, 273);</span>
<span class="token comment">//            this.Text = &quot;改变屏幕分辨率的例子&quot;;</span>
<span class="token comment">//</span>
<span class="token comment">//        }</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token comment">//        static void Main()</span>
<span class="token comment">//        {</span>
<span class="token comment">//            Form1 r = new Form1();</span>
<span class="token comment">//            r.ChangeRes();</span>
<span class="token comment">//            Application.Run(new Form1());</span>
<span class="token comment">//        }</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ChangeRes</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> chMode<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Form1</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">long</span></span> RetVal <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">DEVMODE</span> dm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DEVMODE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmSize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">DEVMODE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>chMode <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                dm<span class="token punctuation">.</span>dmPelsWidth <span class="token operator">=</span> <span class="token number">1600</span><span class="token punctuation">;</span>
                dm<span class="token punctuation">.</span>dmPelsHeight <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
                dm<span class="token punctuation">.</span>dmDisplayFrequency <span class="token operator">=</span> <span class="token number">85</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>chMode <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                dm<span class="token punctuation">.</span>dmPelsWidth <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
                dm<span class="token punctuation">.</span>dmPelsHeight <span class="token operator">=</span> <span class="token number">768</span><span class="token punctuation">;</span>
                dm<span class="token punctuation">.</span>dmDisplayFrequency <span class="token operator">=</span> <span class="token number">85</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            dm<span class="token punctuation">.</span>dmFields <span class="token operator">=</span> DEVMODE<span class="token punctuation">.</span>DM_PELSWIDTH <span class="token operator">|</span> DEVMODE<span class="token punctuation">.</span>DM_PELSHEIGHT <span class="token operator">|</span> DEVMODE<span class="token punctuation">.</span>DM_DISPLAYFREQUENCY<span class="token punctuation">;</span>
            RetVal <span class="token operator">=</span> <span class="token function">ChangeDisplaySettings</span><span class="token punctuation">(</span><span class="token keyword">ref</span> dm<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">ChangeRes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_FormClosing</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">FormClosingEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">ChangeRes</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>3、在Design视图下将WindowsState设置成Minimized，ShowInTaskbar设置成False</p><p>其次根据每个用户的需要修改ChangeRes方法里对分辨率的设置，生成工程后将可执行文件放在此用户的启动文件夹内</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>程序的原理很简单，在用户登录时将分辨率设置成用户的期望值，程序在用户登出前始终运行，但用户不会察觉，在用户登出时，程序被终止，分辨率被设置回特定值，以此实现统一登录分辨率并且各用户有自己的分辨率。</p><h2 id="改进" tabindex="-1"><a class="header-anchor" href="#改进" aria-hidden="true">#</a> 改进</h2><p>如果用户较多，可以通过程序参数来改变屏幕分辨率，避免多次生成工程并产生多个版本的混乱。</p><h2 id="测试平台" tabindex="-1"><a class="header-anchor" href="#测试平台" aria-hidden="true">#</a> 测试平台</h2><p>Windows Server 2003，Visual C# Express 2005 Beta 1</p><blockquote><p>posted on 2004-10-05 13:44 Daniel 阅读(2989) 评论(1)</p></blockquote>`,16);function m(y,w){const a=t("ExternalLinkIcon");return o(),e("div",null,[n("h1",u,[i,s(),n("a",r,[s("在Windows下让不同用户使用不同的分辨率（C# 2005）"),c(a)])]),d])}const b=p(k,[["render",m],["__file","sysctr22.html.vue"]]);export{b as default};
