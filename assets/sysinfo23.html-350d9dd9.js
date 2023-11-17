import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="c-调用控制面板选项" tabindex="-1"><a class="header-anchor" href="#c-调用控制面板选项" aria-hidden="true">#</a> C#调用控制面板选项</h1><blockquote><p>转贴：chi0591 日期：2003-11-06 人气：85</p></blockquote><p>C#是一门由Microsoft新推出的开发语言，它是基于Microsoft的.NET Framework平台基础上的新兴的开发工具。</p><p>正因为它是由Microsoft公司推出的，所以它对Microsoft的所有产品的兼容性与相互操作性是其它公司开发出的编程语言所不及的。Microsoft开发的Windows操作系统与C#之间的关系也非常紧密。从而实现了C#对Windows的无缝操作。</p><p>下面，我们就以“C#对Windows控制面板中的选项进行操作”为题讲述一下它们之间的联系。</p><p>在Windows操作系统中，控制面板的文件一般是以“.cpl”为后缀的，下表列出Windows控制面板常用的选项及其文件名：</p><hr><p>选项 文件名</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Internet选项： inetcpl.cpl
ODBC数据源管理： odbccp32.cpl
电话和调制解调器选项： telephon.cpl
电源选项： powercfg.cpl
辅助功能选项： access.cpl
区域和语言选项： intl.cpl
日期和时间： timedate.cpl
声音和音频设备： mmsys.cpl
鼠标： main.cpl
添加或删除程序： appwiz.cpl
添加硬件： hdwwiz.cpl
网络连接： ncpa.cpl
系统： sysdm.cpl
显示： desk.cpl
用户帐户： nusrmgr.cpl
游戏控制器： joy.cpl
语音： sapi.cpl
</code></pre></div><hr><p>字体： Fonts</p><hr><p>这些是常用的控制面板中的选项。</p><p><strong>操作</strong>：</p><p>我们在C#中可以用以下方式打开操作：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span><span class="token comment">//在调用命名空间时调用。</span>

<span class="token comment">//在事件处理中我们可以采用如下方式：</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;[带上以上的文件名全称]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Win32Exception</span> win32ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;出错原因：&quot;</span><span class="token operator">+</span>win32ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span><span class="token string">&quot;出错&quot;</span><span class="token punctuation">,</span>MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span>MessageBoxIcon<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>示例</strong>：</p><p>我们以Internet选项为例进行操作：</p><p>我们修改一下上面的代码为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token class-name">ProcessStartInfo</span> Info<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ProcessStartInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    Info<span class="token punctuation">.</span>FileName<span class="token operator">=</span><span class="token string">&quot;inetcpl.cpl&quot;</span><span class="token punctuation">;</span>
    Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>Info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Win32Exception</span> win32ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;出错原因：&quot;</span><span class="token operator">+</span> win32ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span> <span class="token string">&quot;出错&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在程序运行以后出现如下效果：</p><p>如果我们在程序中不输入完整的文件名，将会产生错误，并出现如下的提示信息：</p><p>附源代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CsharpCallCPL</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> label1<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// Windows 窗体设计器支持所必需的</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
        <span class="token doc-comment comment">/// 此方法的内容。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// button1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">192</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;调用&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//</span>
            <span class="token comment">// label1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>AutoSize <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Font <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Font</span><span class="token punctuation">(</span><span class="token string">&quot;宋体&quot;</span><span class="token punctuation">,</span> <span class="token number">15.75F</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>FontStyle<span class="token punctuation">.</span>Bold<span class="token punctuation">,</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>GraphicsUnit<span class="token punctuation">.</span>Point<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Byte<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">134</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">203</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;C#调用控制面板范例&quot;</span><span class="token punctuation">;</span>

            <span class="token comment">//</span>
            <span class="token comment">// Form1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">296</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">ProcessStartInfo</span> Info<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ProcessStartInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                Info<span class="token punctuation">.</span>FileName<span class="token operator">=</span><span class="token string">&quot;inetcpl.cpl&quot;</span><span class="token punctuation">;</span>
                Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>Info<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Win32Exception</span> win32ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;出错原因：&quot;</span><span class="token operator">+</span>win32ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span><span class="token string">&quot;出错&quot;</span><span class="token punctuation">,</span>MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span>MessageBoxIcon<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>来源：编程爱好者</p></blockquote>`,26),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","sysinfo23.html.vue"]]);export{i as default};
