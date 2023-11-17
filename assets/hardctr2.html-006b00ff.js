import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="c-枚举系统安装的所有打印机" tabindex="-1"><a class="header-anchor" href="#c-枚举系统安装的所有打印机" aria-hidden="true">#</a> C#枚举系统安装的所有打印机</h1><blockquote><p>转贴：chi0591 日期：2003-12-01 人气：90</p></blockquote><p>最近在论坛中不少网友问&quot;如何把Windows安装的所有打印机列出来&quot;，在下面的程序中我们将把系统中所安装的打印机用列表框列出来，同时为默认打印机设置缺省值。</p><p>在下面的程序中我们用到了两个主要的类，把所有的打印机列表出来用到了PrinterSettings 类,获取系统默认打印机用到了PrintDocument 类，下面我们就动手实践一下吧。</p><p>先新建一个windows form的工程，然后加入一个lable和一个comBox,就行啦,关键在下面啦,我们如何获得默认打印机，就得用下面的语句。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">PrintDocument</span> prtdoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PrintDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> strDefaultPrinter <span class="token operator">=</span> prtdoc<span class="token punctuation">.</span>PrinterSettings<span class="token punctuation">.</span>PrinterName<span class="token punctuation">;</span><span class="token comment">//获取默认的打印机名</span>
</code></pre></div><p>有了默认的打印机，我们再把所有的打印机列出来。</p><p>PrinterSettings类有一个InstalledPrinters的属性,不知是做什么的吧，查MSDN如下解释:<br> PrinterSettings.InstalledPrinters 获取安装在计算机上所有打印机的名称。</p><h2 id="在c-中如下定义" tabindex="-1"><a class="header-anchor" href="#在c-中如下定义" aria-hidden="true">#</a> 在C#中如下定义</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span>C#<span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ComVisible</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">PrinterSettings<span class="token punctuation">.</span>StringCollection</span> InstalledPrinters
<span class="token punctuation">{</span>
    <span class="token keyword">get</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="属性值" tabindex="-1"><a class="header-anchor" href="#属性值" aria-hidden="true">#</a> 属性值</h2><p>PrinterSettings.StringCollection，它表示安装在计算机上所有打印机的名称。</p><h2 id="异常" tabindex="-1"><a class="header-anchor" href="#异常" aria-hidden="true">#</a> 异常</h2><table><thead><tr><th>异常类型</th><th>条件</th></tr></thead><tbody><tr><td>Win32Exception</td><td>未能枚举可用的打印机</td></tr></tbody></table><h2 id="备注" tabindex="-1"><a class="header-anchor" href="#备注" aria-hidden="true">#</a> 备注</h2><p>可以使用已安装的打印机名称的集合向用户提供要打印到的打印机选择。</p><p>下面的示例用已安装的打印机填充 comboInstalledPrinters 组合框，并且还在选择更改时使用 PrinterName 属性设置用于打印的打印机。PopulateInstalledPrintersCombo 例程在窗体初始化时被调用。该示例假定存在名为 printDoc 的 PrintDocument 变量，并且存在特定的组合框。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span>C#<span class="token punctuation">]</span>
<span class="token comment">//下面括号内的自己翻译添加进去的</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateInstalledPrintersCombo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Add list of installed printers found to the combo box.(将系统中所有的打机加入列表框)</span>
    <span class="token comment">// The pkInstalledPrinters string will be used to provide the display string.(列表框中显示的字串由pkInstalledPrinters提供)</span>
    <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">String</span> pkInstalledPrinters <span class="token keyword">in</span> PrinterSettings<span class="token punctuation">.</span>InstalledPrinters<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        comboInstalledPrinters<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>pkInstalledPrinters<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">comboInstalledPrinters_SelectionChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Set the printer to a printer in the combo box when the selection changes.(当列表框改变时设置选择的打印机)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>comboInstalledPrinters<span class="token punctuation">.</span>SelectedIndex <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// The combo box&#39;s Text property returns the selected item&#39;s text, which is the printer name.(将选择的打印机名在列表框中显示)</span>
        printDoc<span class="token punctuation">.</span>PrinterSettings<span class="token punctuation">.</span>PrinterName<span class="token operator">=</span> comboInstalledPrinters<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>看了MSDN的说明，懂多了吧，下面是我写练习完整代码.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//程序说明:将系统中的所有打印机在列表框中列出</span>
<span class="token comment">//程序变量: PrintDocument prtdoc、string strDefaultPrinter</span>
<span class="token comment">//编写人:蚕蛹(sillnet@163.net) </span>
<span class="token comment">//日期:2003-03-20 </span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">PrinterList</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// </span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。 </span>
    <span class="token doc-comment comment">/// </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> label1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ComboBox</span> printerList<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// </span>
    　　<span class="token doc-comment comment">/// 必需的设计器变量。 </span>
    　　<span class="token doc-comment comment">/// </span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// </span>
            <span class="token comment">// Windows 窗体设计器支持所必需的 </span>
            <span class="token comment">// </span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">PrintDocument</span> prtdoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PrintDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strDefaultPrinter <span class="token operator">=</span> prtdoc<span class="token punctuation">.</span>PrinterSettings<span class="token punctuation">.</span>PrinterName<span class="token punctuation">;</span><span class="token comment">//获取默认的打印机名 </span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">String</span> strPrinter <span class="token keyword">in</span> PrinterSettings<span class="token punctuation">.</span>InstalledPrinters<span class="token punctuation">)</span>
            <span class="token comment">//在列表框中列出所有的打印机, </span>
            <span class="token punctuation">{</span>
                printerList<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>strPrinter<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>strPrinter <span class="token operator">==</span> strDefaultPrinter<span class="token punctuation">)</span><span class="token comment">//把默认打印机设为缺省值 </span>
                <span class="token punctuation">{</span>
                    printerList<span class="token punctuation">.</span>SelectedIndex <span class="token operator">=</span> printerList<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span>strPrinter<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// </span>
            <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码 </span>
            <span class="token comment">// </span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// </span>
    　　<span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
    　　<span class="token doc-comment comment">///</span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code </span>
        <span class="token doc-comment comment">///</span>
    　　<span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改 </span>
    　　<span class="token doc-comment comment">/// 此方法的内容。 </span>
    　　<span class="token doc-comment comment">///</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ComboBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// label1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;选择打印机:&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// printerList </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;printerList&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">192</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;当前系统未装打印机&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// Form1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">288</span><span class="token punctuation">,</span> <span class="token number">61</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>printerList<span class="token punctuation">,</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;打印机列表&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token doc-comment comment">/// </span>
    　　<span class="token doc-comment comment">/// 应用程序的主入口点。 </span>
    　　<span class="token doc-comment comment">/// </span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上代码在windows xp + vc.net 下测试通过，编译后在Windows98上测试通过</p><blockquote><p>来源：作者：wyhw</p></blockquote>`,22),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","hardctr2.html.vue"]]);export{i as default};
