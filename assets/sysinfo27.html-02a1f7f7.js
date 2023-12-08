import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-与windows-2000事件查看器的交互操作" tabindex="-1"><a class="header-anchor" href="#c-与windows-2000事件查看器的交互操作" aria-hidden="true">#</a> C#与Windows 2000事件查看器的交互操作</h1><blockquote><p>cancersyf aspxcn.com 2002-09-02</p></blockquote><p>假设你正在开发的标准的客户-服务器端应用程序需要在运行时访问 Windows 2000 附带的某些实用程序(比如事件查看器)，那么请考虑如何让 C# 应用程序与微软视窗2000 内建的“事件查看器”(Event Viewer) 打交道。</p><p>有趣的是，微软 .NET 框架已经提供了相当多的类库和命名空间来完成上述高级编程任务。对许多高级语言来说，与 Windows 操作系统实用程序打交道实在太困难了。然而在 .NET 框架下的 C# 解决方案却是非常简单的，而且所生成的 .NET 应用程序也具备令人满意的稳定性。我们不妨从用户和管理员两个不同的角度来看看它的优势究竟在哪里。</p><p>用户：C# 应用程序能够监控自身产生的各种运行时错误和被激活的系统事件。它能把这些错误和事件以便于人类理解的日志文件形式记录下来。此时，用户只要点击一个按钮就能看到日志文件记录项的内容，却根本不知道程序已经调用执行了 Windows 2000 的事件查看器。此外，用户能在程序产生错误或者激活系统事件之后立即看到相应的日志文件记录项。</p><p>管理员：由 C# 等 .NET 高级语言开发的 GUI(图形用户界面) 前端应用程序不但能把管理员的自定义消息写入日志文件，而且能读取客户端上日志文件所记录的任何一条消息内容，并针对这些消息采取相应的对策；它还能把管理员的自定义消息发送到客户端并在客户端弹出相应的消息框；它还能以在文本框中显示日志文件记录项的内容。以上种种为管理员定制的特性都能在应用程序设计过程中根据需要加以取舍，例如：你可以在适当的时候赋予用户“可写”权限。</p><p>总之，C# 应用程序能让用户和管理员都能通过友好的人机界面直接与 Windows 2000 操作系统所附的各种实用程序进行交互操作。为了生成这样的应用程序，你至少应该安装 Windows 2000 操作系统和 .NET 框架 SDK 支持。为了编辑各种消息和记录文本，你完全可以使用 Windows 2000 的记事本；不过你也可以选择第三方文字处理软件，如 Antechinus C# Editor 等，因为后者不但能通过 Internet 轻松地下载得到，而且支持彩色代码、语法呈现等高级功能。</p><p>事件查看器是 Windows 2000 内建的实用小工具之一，人们通常称它“微软管理控制台插件”(MMC Snap-in) 。开启事件查看器的步骤是：“开始菜单-&gt; 程序 -&gt; 管理工具 -&gt; 事件查看器” (译者注：或者“开始菜单 -&gt; 设置 -&gt; 控制面板 -&gt; 管理工具 -&gt; 事件查看器”)。事件查看器能帮助人们监控系统中各种软、硬件相关的信息，以及确认各种系统故障和程序错误。</p><p>图 1.1 事件查看器</p><p>举个例子：当你的 C# 程序产生了一个例外(即运行时错误)时，事件查看器就会把例外录制 (record) 下来，或者把它作为一个记录项写入“应用程序日志”中。此记录项所对应的事件类型是“信息” (Information)；如果所产生的是系统错误，则记录项所对应的事件类型就是“错误”(Error)。读过本文，你就应该知道如何在 C# 语言程序中调用事件查看器来读取或写入日志文件记录项了。</p><h2 id="写入事件日志记录项" tabindex="-1"><a class="header-anchor" href="#写入事件日志记录项" aria-hidden="true">#</a> 写入事件日志记录项</h2><p>借助微软 .NET 框架所提供的 System.Diagnostics 命名空间内的 EventLog 类，你可以调用事件查看器以读写日志文件记录项。EventLog 类提供了很多属性，比如：Source、Log、Close 和 WriteEntrywith 等，它们可以操纵事件查看器执行各种操作。清单 1.1 中的代码演示了如何在用户点击某个按钮时向事件日志文件新增和写入记录项：</p><p>清单 1.1:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//源代码文件： Eventwrite.cs </span>
<span class="token comment">//编译命令： csc Eventwrite.cs </span>
<span class="token comment">//运行方式： Eventwrite </span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Eventwrite</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">Button</span> b1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Eventwrite</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;An Article for Developer.com by Anand&quot;</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Click here&quot;</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>b1_click<span class="token punctuation">)</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">b1_click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//此处生成一个 EventLog 类实例。 </span>
        <span class="token class-name">EventLog</span> elog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span>Log <span class="token operator">=</span> <span class="token string">&quot;Application&quot;</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span>Source <span class="token operator">=</span> <span class="token string">&quot;From Developer.com article&quot;</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, I&#39;m from C#&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;One message successfully written to EventViewer&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;Anand.N&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Eventwrite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译运行这段代码，你将看到如图 1.2 所示的窗体输出：</p><p>图 1.2 - Eventwrite.cs 的运行结果</p><p>点击窗体中的按钮，程序将开启事件查看器。此时你就可以在 Source 一栏中看到日志记录项 “From Developer.comarticle” 。现在按右键单击该记录项，在弹出菜单中选择 “属性”(properties)，则你将在“事件详细信息”(Information Properties) 对话框中的“描述”(Description) 文本框内看到该消息的具体内容“Hello, I&#39;m from C#” (图 1.3).</p><p>图 1.3 – 事件查看器的属性</p><h2 id="读取事件日志记录项" tabindex="-1"><a class="header-anchor" href="#读取事件日志记录项" aria-hidden="true">#</a> 读取事件日志记录项</h2><p>同样地，你也可以使用 EventLog 类读取事件日志文件中的记录项，不过你得用一个 For 循环反复操作同一变量来指示代码将通过事件查看器读取多少条记录项。清单 1.2 中的代码演示了如何读取 5 条事件日志记录项，并将它们依次显示在消息框中。</p><p>清单 1.2:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//源代码文件：Eventread.cs </span>
<span class="token comment">//编译命令：csc Eventread.cs </span>
<span class="token comment">//运行方式：Eventread </span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Eventread</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">Button</span> b1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Eventread</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;An Article for Developer.com by Anand&quot;</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Click here&quot;</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>b1_click<span class="token punctuation">)</span><span class="token punctuation">;</span>
        b1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>b1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">b1_click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">EventLog</span> elog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span>Log <span class="token operator">=</span> <span class="token string">&quot;Application&quot;</span><span class="token punctuation">;</span>
        elog<span class="token punctuation">.</span>Source <span class="token operator">=</span> <span class="token string">&quot;From Developer.com article&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Message: &quot;</span> <span class="token operator">+</span> elog<span class="token punctuation">.</span>Entries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Message <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
                    <span class="token string">&quot;App: &quot;</span> <span class="token operator">+</span> elog<span class="token punctuation">.</span>Entries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Source <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
                    <span class="token string">&quot;Entry type: &quot;</span> <span class="token operator">+</span> elog<span class="token punctuation">.</span>Entries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>EntryType<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Eventread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码中的 Entries 是EventLog 类的属性之一，其功能是返回 EventLog.EventLogEntryCollection 类的一个实例。 EventLog.EventLogEntryCollection 类将根据事件日志文件中的每个记录项定义一系列 EventLogEntry 类型。本范例代码定义了 3 种类型以读取日志记录项。尚未定义的类型包括UserName 、TimeGenrated 、TimeWritten 等等。你可以尝试把它们的定义语句加入代码中，然后观察程序的运行结果有什么不同。</p>`,23),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysinfo27.html.vue"]]);export{i as default};