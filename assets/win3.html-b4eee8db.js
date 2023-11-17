import{_ as s,o as n,c as a,a as t}from"./app-a2b6e588.js";const e={},p=t(`<h1 id="给-net中的windows窗体加载xp样式" tabindex="-1"><a class="header-anchor" href="#给-net中的windows窗体加载xp样式" aria-hidden="true">#</a> 给.NET中的Windows窗体加载Xp样式</h1><blockquote><p>作者：Mark Strawmyer</p></blockquote><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>当Windows XP 带着他特有的可视化样式或者主题发布时，许多人为他拥有的华丽界面而兴奋。然而，当.NET1.0正式版本发布的时候，许多人包括我自己为Windows 窗体不支持Windows XP 的可视化样式而失望。我对可视化样式的API函数和微软的.NET框架开发文档进行了一番研究，而后认识到为.NET应用程序加上Xp样式也不是很难。</p><p>下面的将通过一个简单的程序来为你的程序和控件加上Xp样式。内容适用于一些拥有能实现Xp样式的属性的控件，通过这些属性使他们产生Xp样式，同时通知Windows系统为你的应用程序和控件加上主题。</p><h2 id="实现所需条件" tabindex="-1"><a class="header-anchor" href="#实现所需条件" aria-hidden="true">#</a> 实现所需条件</h2><p>你需要一些条件来实现这项功能：</p><ol><li>Microsoft .NET Framework SDK（必须）</li><li>Microsoft Visual Studio .NET，他帮助你设计Windows窗体（可选）</li><li>Windows XP 操作系统（可选），支持主题的正式版本操作系统</li></ol><h2 id="进入正题" tabindex="-1"><a class="header-anchor" href="#进入正题" aria-hidden="true">#</a> 进入正题</h2><p>打开Visual Studio .NET 建立一个新的Windows 应用程序。在这里我将使用C#来作为编程语言，因此如果你使用Visual Basic.NET，你就需要转换代码。</p><p>当你建好项目后，打开AssemblyInfo.cs文件，在AssemblyTitle，AssemblyDescription以及AssemblyVersion中填入值，修改AssemblyDelaySign的值为true。</p><p>同时你也要修改AssemblyKeyFile的值为@”....\\KeyFile.snk”，KeyFile.snk文件我们随后回来创建或者拷贝一个。</p><p>当你按照上面所说的完成后，你的代码看起来应该象下面：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>CompilerServices</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyTitle</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Theme Test&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyDescription</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Testing Windows XP Visual Styles.&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyConfiguration</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyCompany</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyProduct</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyCopyright</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyTrademark</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyCulture</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyVersion</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;1.0.0.0&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyDelaySign</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyKeyFile</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">@&quot;..\\..\\KeyFile.snk&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">AssemblyKeyName</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
</code></pre></div><p>现在，打开Form1.cs窗体设计界面加一些Windows窗体控件到上面，比如ListViews，Buttons，GroupBoxes，ProgressBars或者更多，下面列出了所有支持Xp样式的孔件：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>TextBox
RichTextBox
HScrollBar
VScrollBar
ProgressBar
TabControl
MainMenu
ContextMenu
ComboBox
DataGrid
ListBox
ListView
TreeView
DateTimePicker
MonthCalendar
Splitter
TrackBar
StatusBar
ToolBar
TreeView
ListView
</code></pre></div><p>对于这些控件，有些是默认就支持的，另外的一些特定的控件是从ButtonBase，GroupBox，或者Label继承而来，你需要设置他们的FlatStyle属性为System，那些我会做一些简短的说明。</p><p>当你编译这个应用程序后，你会发现这个Windows Forms看上去不象带有Xp样式，要找到原因，请往下看。</p><h2 id="windows-xp样式的显示原理" tabindex="-1"><a class="header-anchor" href="#windows-xp样式的显示原理" aria-hidden="true">#</a> Windows Xp样式的显示原理</h2><p>简单描述：Comctl32.dll，版本为6。Comctl32.dll，或者那些普通控件使用了很长时间。这个动态连接库被基础控件使用，同时User32.Dll提供给用户控件。在版本6的Comctl32.dll中，所有的控件都放入在里面，因此他们都支持主题。</p><p>但是新版本的Comctl32.dll不象上一个版本，要使用Windows XP样式，你必须使用包含有Comctl32.dll的操作系统，比如Windows XP。</p><p>对于那些被支持的控件，他们的样式是同一些特殊的主题资源相关的，而这些就是用来在客户界面进行绘制。对于那些派生于ButtonBase，GroupBox和Lablel的控件必须把FlatStyle属性设置成FlatStyle.System枚举值，这样系统就可以对他们进行绘制。</p><p>为了使操作系统给我们的控件加主题样式，你需要通知系统让版本6的Comctl32.dll作为默认。系统默认的使用的是版本5的Comctl32.dll，对于.NET的程序也是如此，但是我们会让程序在执行时使用版本6的Comctl32.dll。</p><p>给你的项目增加一个XML文件，文件命取为［你的应用程序名］.exe.manifest，［你的应用程序名］指得就是项目编译生成的主exe文件。设置编译类型为”None”。</p><p>假如你的AssemblyInfo.cs中的代码就是上面提到的那样，那么新建的［你的应用程序名］.exe.manifest文件应该为下面的样子：</p><div class="language-xml" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;yes&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assembly</span>
    <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:schemas-microsoft-com:asm.v1<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">manifestVersion</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
        <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0.0.0<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Theme Test<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>win32<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">&gt;</span></span>Testing Windows XP Visual Styles.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
                <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>win32<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Microsoft.Windows.Common-Controls<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>6.0.0.0<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">publicKeyToken</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>6595b64144ccf1df<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">language</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>assembly</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>你要适当的替换上面的”version”和”name”属性的值，使他和你项目里面的一样，分别对应AssemblyVersion和AssemblyTitle属性。那个”descryiption”元素也要同你的AssemblyDescription属性符合。</p><p>接下去，打开命令提示窗口修改你的项目输出路径，应该把”bin\\Debug”作为项目路径根目录。假设你已经加了sn.exe强名称工具的路径到你的系统环境变量，那么在命令行中输入如下：</p><p><code>sn.exe –k ..\\..\\KeyFile.snk</code></p><p>上面的步骤会生成一个KeyFile.snk公钥文件，为了使你的程序集成为强类型程序集这个公钥是必须的。这个在许多情况下是必须需的。</p><h2 id="最后一步添加mnifest信息" tabindex="-1"><a class="header-anchor" href="#最后一步添加mnifest信息" aria-hidden="true">#</a> 最后一步添加Mnifest信息</h2><p>你现在要在项目文件输出的所在目录。在我的例子中是一个简单的WindowsApplication1.exe文件，接下去会讲到他。</p><p>现在，退回到Visul Studio.NET，点击文件菜单—&gt;打开，浏览到你的应用程序比如WindowsApplication1.exe，点击打开他我们会看到一个资源文件管理树。</p><ol><li>右键在根节点上点击选择“添加资源”。</li><li>点击“导入”按钮，在你的项目路径中找到WindowsApplication.exe.mnifest并打开他。</li><li>在自定义资源类型对话框中我们输入 RT_MANIFEST 然后点击确定。</li><li>保存所有文件让我们回到先前的资源来浏览树。我们现在可以看到一个RT_MANIFEST的节点。</li><li>点击选中他下面那个新加的资源文件，通常的名字是101。在属性窗口里修改他的ID值为1，再一次保存你的应用程序。</li><li>关闭你打开的资源浏览窗口回到命令行提示符下，输入下面的命令：</li></ol><p><code>sn –R WindowsApplication1.exe ..\\..\\KeyFile.snk</code></p><p>执行后会输出一些版本信息，最后显示：</p><p><code>Assembly ‘WindowsApplication1.exe’ successfully re-signed</code></p><p>运行你的.NET应用程序你就会看到Windows XP样式了。</p><h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2><p>你不需要做很多工作就可以把Windows XP 可视化样式加入到你的应用程序和控件。使用这些新的样式将会带给你的窗体新的视觉，而这些经常在商业程序上用到。许多公司都花精力去开发这方面的东西，而现在你可以不用做很多工作就可以做到。</p><p>请记住把那些带有FlatStyle属性的控件设置为FlatStyle.System，同时在编译你的程序后加入manifest资源就象上面的样板文件。当这些都做好了以后剩下的就是完成对程序集的签名。如果你想要测试你的应用程序或者你有权限对他进行签名，你可以通过下面的命令关闭对程序集的验证：</p><p><code>sn.exe –Vr WindowsApplication1.exe</code></p><p>立即行动，为你的应用程序加上Xp样式，使你的产品更有特点。这样做不会花很多时间但是效果是显而易见的。</p><p>About Heath Stewart</p><p>Heath Stewart is a happily married software engineer originally from Nebraska and a graduate of Iowa State University in Ames, Iowa. With nothing much to do in either state, Heath started programming early in life when gopher ruled and the Internet wasn&#39;t commercialized, and enjoys continuous research and development in new languages and frameworks. Fluent in many different programming languages, he has developed many large software solutions for companies in different areas, such as Internet filtering, intrusion detection systems, production management systems, Web sites for various purposes, and data analysis tools. He also enjoys photography.</p><p>Currently, Heath is the Director of Technology at Proplanner, a Web-based Production Planning System that primarily uses .NET where he designed a multi-tiered environment and supports multiple front-ends (such as a legacy Java interface on PDM) and back-ends (such as Web Services, RDBMS&#39;s, file-based IO, and PDM).</p><p>Heath is now an editor for CodeProject and is happy to help the development community as a Microsoft MVP (C#).</p>`,47),o=[p];function c(l,u){return n(),a("div",null,o)}const r=s(e,[["render",c],["__file","win3.html.vue"]]);export{r as default};
