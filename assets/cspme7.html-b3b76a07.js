import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},e=t(`<h1 id="c-消息队列应用程序" tabindex="-1"><a class="header-anchor" href="#c-消息队列应用程序" aria-hidden="true">#</a> C#消息队列应用程序</h1><ul><li><a href="#cspme_1">C#消息队列应用程序 -1</a></li><li><a href="#cspme_2">C#消息队列应用程序 -2</a></li></ul><h2 id="c-消息队列应用程序-1" tabindex="-1"><a class="header-anchor" href="#c-消息队列应用程序-1" aria-hidden="true">#</a> <a id="cspme_1">C#消息队列应用程序 -1</a></h2><p>www.chinacs.net 2001-4-26 18:17:00 中文C#技</p><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3><p>Microsoft近期推出一种用于生成集成应用程序的新平台——Microsoft .NET框架。.NET 框架允许开发人员使用任何编程语言迅速生成和部署Web服务和应用程序。Microsoft Intermediate Language （MSIL）和实时（JIT ）编译器使这种不依赖语言的框架得以实现。</p><p>与.NET框架同时面世的还有一种新的编程语言C#（读“C sharp”）。C#是一种简单、新颖、面向对象和类型安全的编程语言。利用 .NET 框架和 C# （除 Microsoft？ Visual Basic ？和 Managed C++之外），用户可以编写功能强大的 Microsoft Windows？和 Web应用程序及服务。本文提供了这样的一个解决方案，它的重点是 .NET 框架和 C# 而不是编程语言。C#语言的介绍可以在“ C# 简介和概述（英文）”找到。</p><p>近期的文章“MSMQ：可伸缩、高可用性的负载平衡解决方案（英文）”介绍了一种解决方案，用于高可用性消息队列（MSMQ）的可伸缩负载平衡解决方案体系结构。此解决方案中涉及了一种将 Windows服务用作智能消息路由器的开发方案。这样的解决方案以前只有 Microsoft Visual C++ 程序员才能实现，而 .NET 框架的出现改变了这种情况。从下面的解决方案中，您可以看到这一点。</p><h3 id="net-框架应用程序" tabindex="-1"><a class="header-anchor" href="#net-框架应用程序" aria-hidden="true">#</a> .NET 框架应用程序</h3><p>这里介绍的解决方案是一种用来处理若干消息队列的 Windows服务；其中每个队列都是由多个线程进行处理（接收和处理消息）。处理程序使用循环法技术或应用程序特定值（消息 AppSpecific属性）从目的队列列表中路由消息，并使用消息属性来调用组件方法。（示例进程也属于这种情况。）在后一种情况下，组件的要求是它能够实现给定的接口IWebMessage要处理错误，应用程序需要将不能处理的消息发送到错误队列中。</p><p>消息应用程序的结构与以前的活动模板库（ATL ）应用程序相似，它们之间的主要不同在于用于管理服务的代码的封装和 .NET 框架组件的使用。要创建Windows服务，.NET框架用户仅仅需要创建一个从 ServiceBase（来自System.ServiceControl程序集）继承的类。这毫不奇怪，因为.NET框架是面向对象的。</p><h3 id="应用程序结构" tabindex="-1"><a class="header-anchor" href="#应用程序结构" aria-hidden="true">#</a> 应用程序结构</h3><p>应用程序中主要的类是 ServiceControl ，它是从 ServiceBase继承的。因而，它必须实现 OnStart和 OnStop 方法，以及可选的 OnPause和OnContinue方法。事实上，类是在静态方法 Main 内构造的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ServiceProcess</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServiceControl</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ServiceBase</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">// 创建服务对象的主入口点</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        ServiceBase<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义服务参数的构造对象</span>
    <span class="token keyword">public</span> <span class="token function">ServiceControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        CanPauseAndContinue <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        ServiceName <span class="token operator">=</span> <span class="token string">&quot;MSDNMessageService&quot;</span><span class="token punctuation">;</span>
        AutoLog <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStart</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnPause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnContinue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ServiceControl类创建一系列 CWorker对象，即，为需要处理的每个消息队列创建 CWorker类的一个实例。根据定义中处理队列所需的线程数目，CWorker 类依次创建了一系列的 CWorkerThread对象。CWorkerThread类创建的一个处理线程将执行实际的服务工作。</p><p>使用 CWorker和 CWorkerThread类的主要目的是确认服务控件 Start、Stop、Pause 和 Continue 命令。因为这些进程必须是无阻塞的，命令操作最终将在后台处理线程上执行。</p><p>CWorkerThread 是一个抽象类，被 CWorkerThreadAppSpecific 、CWorkerThreadRoundRobin 和CWorkerThreadAssembly继承。这些类以不同的方式处理消息。前两个类通过给另一队列发送消息来处理消息（其不同之处在于确定接收队列路径的方式），最后一个类则使用消息属性来调用组件方法。</p><p>.NET 框架内部的错误处理是以基类 Exception为基础的。当系统引发或捕获错误时，这些错误必须是从 Exception中导出的类。CWorkerThreadException 类就是这样一种实现，它通过附加额外属性（用于定义服务是否应继续运行）来扩展基类。</p><p>最后，应用程序包含两种结构。这些值类型定义了辅助进程或线程的运行时参数，以简化 CWorker和 CWorkerThread对象的结构。使用值类型结构（而不是引用类型类）能够确保这些运行时参数维护的是数值（而不是引用）。</p><h3 id="iwebmessage-接口" tabindex="-1"><a class="header-anchor" href="#iwebmessage-接口" aria-hidden="true">#</a> IWebMessage 接口</h3><p>CWorkerThread 的实现之一是一个调用组件方法的类。这个名为CWorkerThreadAssembly 的类使用 IWebMessage接口来定义服务和组件之间的约定。</p><p>与当前版本的 Microsoft Visual Studio？不同，C#接口可以在任何语言中显式定义，而不需要创建和编译 IDL文件。C# IWebMessage接口的定义如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IWebMessage</span> 
<span class="token punctuation">{</span> 
    <span class="token return-type class-name">WebMessageReturn</span> <span class="token function">Process</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sMessageLabel<span class="token punctuation">,</span> <span class="token keyword">string</span> <span class="token class-name">sMessage</span> Body<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> iAppSpecific<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ATL 代码中的 Process 方法是为处理消息而指定的。Process 方法的返回代码定义为枚举类型 WebMessageReturn：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">WebMessageReturn</span>
<span class="token punctuation">{</span>
　 ReturnGood<span class="token punctuation">,</span>
　 ReturnBad<span class="token punctuation">,</span>
　 ReturnAbort
<span class="token punctuation">}</span>
</code></pre></div><p>枚举的定义如下：Good表示继续处理，Bad 表示将消息写入错误队列，Abort 表示终止处理。Release 方法为服务提供了轻松清除类实例的途径。因为仅在垃圾回收的过程中才调用类实例的析构函数，所以确保所有占用昂贵资源（例如数据库连接）的类都有一个能够在析构之前被调用的方法，用来释放这些资源，这是一种非常好的构思。</p><h3 id="名称空间" tabindex="-1"><a class="header-anchor" href="#名称空间" aria-hidden="true">#</a> 名称空间</h3><p>在这里先简单介绍一下名称空间。名称空间允许在内部和外部表示中将应用程序组织成为逻辑元素。服务内的所有代码都包含在 MSDNMessageService.Service 名称空间内。尽管服务代码包含在若干文件中，但是由于它们包含在同一名称空间中，因此用户不需要引用其他文件。</p><p>由于 IWebMessage接口包含在 MSDNMessageService.Interface 名称空间中，因此使用此接口的线程类具有一个接口名称空间。</p><h3 id="服务类" tabindex="-1"><a class="header-anchor" href="#服务类" aria-hidden="true">#</a> 服务类</h3><p>应用程序的目的是监视和处理消息队列，每一队列在收到消息时都执行不同的进程。应用程序是作为 Windows服务来实现的。</p><h3 id="servicebase-类" tabindex="-1"><a class="header-anchor" href="#servicebase-类" aria-hidden="true">#</a> ServiceBase 类</h3><p>如前所述，服务的基本结构是从 ServiceBase继承的类。重要的方法包括 OnStart、OnStop、OnPause 和 OnContinue ，每一个替代方法都与一个服务控制操作直接对应。OnStart 方法的目的是创建 CWorker对象，而 CWorker类又创建 CWorkerThread对象，然后在该对象中创建执行服务工作的线程。</p><p>服务的运行时配置（以及 CWorker和 CWorkerThread对象的属性）是在基于 XML的配置文件中维护的。它的名称与创建的 .exe 文件相同，但带有一个 .cfg 后缀。配置示例如下：</p><div class="language-cfg" data-ext="cfg"><pre class="language-cfg"><code>&lt;?xml version=&quot;1.0&quot;?&gt;
&lt;configuration&gt;
&lt;ProcessList&gt;
　&lt;ProcessDefinition
　　　　ProcessName=&quot;Worker1&quot;
　　　　ProcessDesc=&quot;Message Worker with 2 Threads&quot;
　　　　ProcessType=&quot;AppSpecific&quot;
　　　　ProcessThreads=&quot;2&quot;
　　　　InputQueue=&quot;.\\private$\\test_load1&quot;
　　　　ErrorQueue=&quot;.\\private$\\test_error&quot;&gt;
　　&lt;OutputList&gt;
　　　&lt;OutputDefinition OutputName=&quot;.\\private$\\test_out11&quot; /&gt;
　　　&lt;OutputDefinition OutputName=&quot;.\\private$\\test_out12&quot; /&gt;
　　&lt;/OutputList&gt;
　&lt;/ProcessDefinition&gt;
　&lt;ProcessDefinition
　　　　ProcessName=&quot;Worker2&quot;
　　　　ProcessDesc=&quot;Assembly Worker with 1 Thread&quot;
　　　　ProcessType=&quot;Assembly&quot;
　　　　ProcessThreads=&quot;1&quot;
　　　　InputQueue=&quot;.\\private$\\test_load2&quot;
　　　　ErrorQueue=&quot;.\\private$\\test_error&quot;&gt;
　　&lt;OutputList&gt;
　　　&lt;OutputDefinition OutputName=&quot;C:\\MSDNMessageService\\Message
　　　Example.dll&quot; /&gt;
　　　&lt;OutputDefinition OutputName=&quot;MSDNMessageService.Message
　　　Sample.ExampleClass&quot;/&gt;
　　&lt;/OutputList&gt;
　&lt;/ProcessDefinition&gt;
&lt;/ProcessList&gt;
&lt;/configuration&gt;
</code></pre></div><p>对此信息的访问通过来自 System.Configuration 程序集的 ConfigManager 类来管理。静态 Get方法返回信息的集合，这些集合将被枚举以获得单个属性。这些属性集的设置决定了辅助对象的运行时特征。除了这一配置文件，您还应该创建定义 XML文件结构的图元文件，并在其中引用位于服务器 machine.cfg配置文件中的图元文件：</p><div class="language-cfg" data-ext="cfg"><pre class="language-cfg"><code>&lt;?xml version =&quot;1.0&quot;?&gt;
&lt;MetaData xmlns=&quot;x-schema:CatMeta.xms&quot;&gt;
　　&lt;DatabaseMeta InternalName=&quot;MessageService&quot;&gt;
　　&lt;ServerWiring Interceptor=&quot;Core_XMLInterceptor&quot;/&gt;
　　&lt;Collection
　　　　　InternalName=&quot;Process&quot; PublicName=&quot;ProcessList&quot;
　　　　　PublicRowName=&quot;ProcessDefinition&quot;
　　　　　SchemaGeneratorFlags=&quot;EMITXMLSCHEMA&quot;&gt;
　　　&lt;Property InternalName=&quot;ProcessName&quot; Type=&quot;String&quot; Meta
　　　Flags=&quot;PRIMARYKEY&quot; /&gt;
　　　&lt;Property InternalName=&quot;ProcessDesc&quot; Type=&quot;String&quot; /&gt;
　　　&lt;Property InternalName=&quot;ProcessType&quot; Type=&quot;Int32&quot; Default
　　　Value=&quot;RoundRobin&quot; &gt;
　　　　　&lt;Enum InternalName=&quot;RoundRobin&quot;　Value=&quot;0&quot;/&gt;
　　　　　&lt;Enum InternalName=&quot;AppSpecific&quot; Value=&quot;1&quot;/&gt;
　　　　　&lt;Enum InternalName=&quot;Assembly&quot; Value=&quot;2&quot;/&gt;
　　　&lt;/Property&gt;
　　　&lt;Property InternalName=&quot;ProcessThreads&quot; Type=&quot;Int32&quot;
　　　DefaultValue=&quot;1&quot; /&gt;
　　　&lt;Property InternalName=&quot;InputQueue&quot; Type=&quot;String&quot; /&gt;
　　　&lt;Property InternalName=&quot;ErrorQueue&quot; Type=&quot;String&quot; /&gt;
　　　&lt;Property InternalName=&quot;OutputName&quot; Type=&quot;String&quot; /&gt;
　　　&lt;QueryMeta InternalName=&quot;All&quot; MetaFlags=&quot;ALL&quot; /&gt;
　　　&lt;QueryMeta InternalName=&quot;QueryByFile&quot; CellName=&quot;__FILE&quot;
　　　Operator=&quot;EQUAL&quot;　/&gt;
　　&lt;/Collection&gt;
　　&lt;Collection
　　　　　InternalName=&quot;Output&quot; PublicName=&quot;OutputList&quot;
　　　　　PublicRowName=&quot;OutputDefinition&quot;
　　　　　SchemaGeneratorFlags=&quot;EMITXMLSCHEMA&quot;&gt;
　　　&lt;Property InternalName=&quot;ProcessName&quot; Type=&quot;String&quot; Meta
　　　Flags=&quot;PRIMARYKEY&quot; /&gt;
　　　&lt;Property InternalName=&quot;OutputName&quot; Type=&quot;String&quot; Meta
　　　Flags=&quot;PRIMARYKEY&quot; /&gt;
　　　&lt;QueryMeta InternalName=&quot;All&quot; MetaFlags=&quot;ALL&quot; /&gt;
　　　&lt;QueryMeta InternalName=&quot;QueryByFile&quot; CellName=&quot;__FILE&quot;
　　　Operator=&quot;EQUAL&quot;　/&gt;
　　&lt;/Collection&gt;
　　&lt;/DatabaseMeta&gt;
　　&lt;RelationMeta
　　　PrimaryTable=&quot;Process&quot; PrimaryColumns=&quot;ProcessName&quot;
　　　ForeignTable=&quot;Output&quot;　ForeignColumns=&quot;ProcessName&quot;
　　　MetaFlags=&quot;USECONTAINMENT&quot;/&gt;
&lt;/MetaData&gt;
</code></pre></div><p>由于 Service类必须维护一个已创建辅助对象的列表，因此使用了Hashtable 集合，用于保持类型对象的名称/ 数值对列表。Hashtable 不仅支持枚举，还允许通过关键字来查询值。在应用程序中，XML 进程名称是唯一的关键字：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">Hashtable</span> htWorkers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IConfigCollection</span> cWorkers <span class="token operator">=</span> ConfigManager<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;ProcessList&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppDomainSelector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">IConfigItem</span> ciWorker <span class="token keyword">in</span> cWorkers<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">WorkerFormatter</span> sfWorker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WorkerFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    sfWorker<span class="token punctuation">.</span>ProcessName <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ProcessName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    sfWorker<span class="token punctuation">.</span>ProcessDesc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ProcessDesc&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    sfWorker<span class="token punctuation">.</span>NumberThreads <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ProcessThreads&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    sfWorker<span class="token punctuation">.</span>InputQueue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;InputQueue&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    sfWorker<span class="token punctuation">.</span>ErrorQueue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ErrorQueue&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 计算并定义进程类型</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ProcessType&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span>
            sfWorker<span class="token punctuation">.</span>ProcessType <span class="token operator">=</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessRoundRobin<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
            sfWorker<span class="token punctuation">.</span>ProcessType <span class="token operator">=</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessAppSpecific<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
            sfWorker<span class="token punctuation">.</span>ProcessType <span class="token operator">=</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessAssembly<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            hrow <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown Processing Type&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 执行更多的工作以读取输出信息</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sProcessName <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciWorker<span class="token punctuation">[</span><span class="token string">&quot;ProcessName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>htWorkers<span class="token punctuation">.</span><span class="token function">ContainsKey</span><span class="token punctuation">(</span>sProcessName<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Process Name Must be Unique: &quot;</span> <span class="token operator">+</span> sProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    htWorkers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>sProcessName<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorker</span><span class="token punctuation">(</span>sfWorker<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这段代码中没有包含的主要信息是输出数据的获取。每一个进程定义中都有一组相应的输出定义项。该信息是通过如下的简单查询读取的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> sQuery <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM OutputList WHERE ProcessName=&quot;</span> <span class="token operator">+</span> sfWorker<span class="token punctuation">.</span>ProcessName <span class="token operator">+</span> <span class="token string">&quot; AND Selector=appdomain://&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">ConfigQuery</span> qQuery <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConfigQuery</span><span class="token punctuation">(</span>sQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IConfigCollection</span> cOutputs <span class="token operator">=</span> ConfigManager<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;OutputList&quot;</span><span class="token punctuation">,</span> qQuery<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> iSize <span class="token operator">=</span> cOutputs<span class="token punctuation">.</span>Count<span class="token punctuation">,</span> iLoop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
sfWorker<span class="token punctuation">.</span>OutputName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>iSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">IConfigItem</span> ciOutput <span class="token keyword">in</span> cOutputs<span class="token punctuation">)</span>
    sfWorker<span class="token punctuation">.</span>OutputName<span class="token punctuation">[</span>iLoop<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ciOutput<span class="token punctuation">[</span><span class="token string">&quot;OutputName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><p>CWorkerThread 和 Cworker类都有相应的服务控制方法，根据服务控制操作进行调用。由于 Hashtable中引用了每一个 CWorker对象，因此需要枚举 Hashtable的内容，以调用适当的服务控制方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">CWorker</span> cWorker <span class="token keyword">in</span> htWorkers<span class="token punctuation">.</span>Values<span class="token punctuation">)</span>
    cWorker<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>类似地，实现的 OnPause、OnContinue和 OnStop 方法是通过调用CWorker 对象上的相应方法来执行操作的。</p><h3 id="cworker-类" tabindex="-1"><a class="header-anchor" href="#cworker-类" aria-hidden="true">#</a> CWorker 类</h3><p>CWorker 类的主要功能是创建和管理 CWorkerThread对象。Start 、Stop、Pause 和 Continue 方法调用相应的CWorkerThread方法。实际的CWorkerThread 对象是在Start 方法中创建的。与使用 Hashtable管理辅助对象引用的 Service类相似，CWorker 使用 ArrayList（简单的动态数组）来维护线程对象的列表。</p><h2 id="c-消息队列应用程序-2" tabindex="-1"><a class="header-anchor" href="#c-消息队列应用程序-2" aria-hidden="true">#</a> <a id="cspme_2">C#消息队列应用程序 -2</a></h2><p>www.chinacs.net 2001-4-26 18:18:00 中文C#技术站</p><p>在这个数组内部，CWorker 类创建了 CWorkerThread类的一个实现版本。CWorkerThread 类（将在下面讨论）是一个必须继承的抽象类。导出类定义了消息的处理方式：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">ArrayList</span> aThreads <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> idx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> idx <span class="token operator">&lt;</span> sfWorker<span class="token punctuation">.</span>NumberThreads<span class="token punctuation">;</span> idx<span class="token operator">++</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
    <span class="token class-name">WorkerThreadFormatter</span> wfThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WorkerThreadFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>ProcessName <span class="token operator">=</span> sfWorker<span class="token punctuation">.</span>ProcessName<span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>ProcessDesc <span class="token operator">=</span> sfWorker<span class="token punctuation">.</span>ProcessDesc<span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>ThreadNumber <span class="token operator">=</span> idx<span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>InputQueue <span class="token operator">=</span> sfWorker<span class="token punctuation">.</span>InputQueue<span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>ErrorQueue <span class="token operator">=</span> sfWorker<span class="token punctuation">.</span>ErrorQueue<span class="token punctuation">;</span>
    wfThread<span class="token punctuation">.</span>OutputName <span class="token operator">=</span> sfWorker<span class="token punctuation">.</span>OutputName<span class="token punctuation">;</span>
    <span class="token comment">// 定义辅助类型，并将其插入辅助线程结构 </span>
    <span class="token class-name">CWorkerThread</span> wtBase<span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>sfWorker<span class="token punctuation">.</span>ProcessType<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessRoundRobin<span class="token punctuation">:</span>
            wtBase <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadRoundRobin</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> wfThread<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessAppSpecific<span class="token punctuation">:</span>
            wtBase <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadAppSpecific</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> wfThread<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> WorkerFormatter<span class="token punctuation">.</span>SFProcessType<span class="token punctuation">.</span>ProcessAssembly<span class="token punctuation">:</span>
            wtBase <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadAssembly</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> wfThread<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown Processing Type&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 添加对数组的调用 </span>
    aThreads<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> wtBase<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一旦所有的对象都已创建，就可以通过调用每个线程对象的 Start方法来启动它们：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">CWorkerThread</span> cThread <span class="token keyword">in</span> aThreads<span class="token punctuation">)</span>
    cThread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Stop、Pause 和 Continue 方法在 foreach循环里执行的操作类似。Stop方法具有如下的垃圾收集操作：</p><p><code>GC.SuppressFinalize(this);</code></p><p>在类析构函数中将调用 Stop 方法，这样，在没有显式调用 Stop 方法的情况下也可以正确地终止对象。如果调用了 Stop 方法，将不需要析构函数。SuppressFinalize方法能够防止调用对象的 Finalize 方法（析构函数的实际实现）。</p><h2 id="cworkerthread-抽象类" tabindex="-1"><a class="header-anchor" href="#cworkerthread-抽象类" aria-hidden="true">#</a> CWorkerThread 抽象类</h2><p>CWorkerThread 是一个由 CWorkerThreadAppSpecifc、CWorkerThreadRoundRobin 和 CWorkerThreadAssembly继承的抽象类。无论如何处理消息，队列的大部分处理是相同的，所以 CWorkerThread类提供了这一功能。这个类提供了抽象方法（必须被实际方法替代）以管理资源和处理消息。</p><p>类的工作再一次通过 Start、Stop、Pause 和 Continue 方法来实现。在 Start方法中引用了输入和错误队列。在 .NET 框架中，消息由 System.Messaging 名称空间处理：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 尝试打开队列，并设置默认的读写属性</span>
<span class="token class-name">MessageQueue</span> mqInput <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageQueue</span><span class="token punctuation">(</span>sInputQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
mqInput<span class="token punctuation">.</span>MessageReadPropertyFilter<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
mqInput<span class="token punctuation">.</span>MessageReadPropertyFilter<span class="token punctuation">.</span>AppSpecific <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token class-name">MessageQueue</span> mqError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageQueue</span><span class="token punctuation">(</span>sErrorQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 如果使用 MSMQ COM，则将格式化程序设置为 ActiveX</span>
mqInput<span class="token punctuation">.</span>Formatter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ActiveXMessageFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mqError<span class="token punctuation">.</span>Formatter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ActiveXMessageFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>一旦定义了消息队列引用，即会创建一个线程用于实际的处理函数（称为 ProcessMessages）。在 .NET 框架中，使用 System.Threading名称空间很容易实现线程处理：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>procMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>ProcessMessages<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
procMessage<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>ProcessMessages 函数是基于 Boolean值的处理循环。当数值设为False，处理循环将终止。因此，线程对象的 Stop 方法只设置这一Boolean值，然后关闭打开的消息队列，并加入带有主线程的线程：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 加入服务线程和处理线程</span>
bRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
procMessage<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 关闭打开的消息队列</span>
mqInput<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
mqError<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Pause 方法只设置一个 Boolean 值，使处理线程休眠半秒钟：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>bPause<span class="token punctuation">)</span>
　 Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>最后，每一个 Start、Stop、Pause 和 Continue 方法将调用抽象的OnStart 、OnStop、OnPause 和 OnContinue 方法。这些抽象方法为实现的类提供了挂钩，以捕获和释放所需的资源。</p><p>ProcessMessages 循环具有如下基本结构：</p><ul><li>接收Message</li><li>如果Message具有成功的Receive，则调用抽象ProcessMessage方法</li><li>如果Receive或ProcessMessage失败，将Message发送至错误队列中</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Message</span> mInput<span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 从队列中读取，并等候 1 秒</span>
    mInput <span class="token operator">=</span> mqInput<span class="token punctuation">.</span><span class="token function">Receive</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TimeSpan</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">MessageQueueException</span> mqe<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 将消息设置为 null</span>
    mInput <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 查看错误代码，了解是否超时</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mqe<span class="token punctuation">.</span>ErrorCode <span class="token operator">!=</span> <span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1072824293</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//0xC00E001B </span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 如果未超时，发出一个错误并记录错误号 </span>
        <span class="token function">LogError</span><span class="token punctuation">(</span><span class="token string">&quot;Error: &quot;</span> <span class="token operator">+</span> mqe<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> mqe<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>mInput <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 得到一个要处理的消息，调用处理消息抽象方法 </span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token function">ProcessMessage</span><span class="token punctuation">(</span>mInput<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 捕获已知异常状态的错误 </span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CWorkerThreadException</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">ProcessError</span><span class="token punctuation">(</span>mInput<span class="token punctuation">,</span> ex<span class="token punctuation">.</span>Terminate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 捕获未知异常，并调用 Terminate </span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        <span class="token function">ProcessError</span><span class="token punctuation">(</span>mInput<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ProcessError方法将错误的消息发送至错误队列。另外，它也可能引发异常来终止线程。如果ProcessMessage方法引发了终止错误或 CWorkerThreadException类型，它将执行此操作。</p><h2 id="cworkerthread-导出类" tabindex="-1"><a class="header-anchor" href="#cworkerthread-导出类" aria-hidden="true">#</a> CworkerThread 导出类</h2><p>任何从 CWorkerThread中继承的类都必须提供 OnStart、OnStop、OnPause、OnContinue和 ProcessMessage 方法。OnStart 和 OnStop方法获取并释放处理资源。OnPause 和 OnContinue 方法允许临时释放和重新获取这些资源。ProcessMessage方法应该处理消息，并在出现失败事件时引发 CWorkerThreadException 异常。</p><p>由于 CWorkerThread构造函数定义运行时参数，导出类必须调用基类构造函数：</p><p><code>public CWorkerThreadDerived(CWorker v_cParent, WorkerThreadFormatter v_wfThread) : base(v_cParent, v_wfThread) {}</code></p><p>导出类提供了两种类型的处理：将消息发送至另一队列，或者调用组件方法。接收和发送消息的两种实现使用了循环技术或应用程序偏移（保留在消息 AppSpecific属性中），作为使用哪一队列的决定因素。此方案中的配置文件应该包括队列路径的列表。实现的 OnStart和 OnStop 方法应该打开和关闭对这些队列的引用：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>iQueues <span class="token operator">=</span> wfThread<span class="token punctuation">.</span>OutputName<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
mqOutput <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageQueue</span><span class="token punctuation">[</span>iQueues<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> idx<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> idx<span class="token operator">&lt;</span>iQueues<span class="token punctuation">;</span> idx<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    mqOutput<span class="token punctuation">[</span>idx<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageQueue</span><span class="token punctuation">(</span>wfThread<span class="token punctuation">.</span>OutputName<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    mqOutput<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">.</span>Formatter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ActiveXMessageFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这些方案中，消息的处理很简单：将消息发送必要的输出队列。在循环情况下，这个进程为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    mqOutput<span class="token punctuation">[</span>iNextQueue<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>v_mInput<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 如果错误强制终止异常 </span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadException</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 计算下一个队列号 </span>
iNextQueue<span class="token operator">++</span><span class="token punctuation">;</span>
iNextQueue <span class="token operator">%=</span> iQueues<span class="token punctuation">;</span>
</code></pre></div><p>后一种调用带消息参数的组件的实现方法比较有趣。ProcessMessage方法使用 IWebMessage接口调入一个 .NET 组件。OnStart 和 OnStop 方法获取和释放此组件的引用。</p><p>此方案中的配置文件应该包含两个项目：完整的类名和类所在文件的位置。按照 IWebMessage接口中的定义，在组件上调用 Process方法。</p><p>要获取对象引用，需要使用 Activator.CreateInstance 方法。此函数需要一个程序集类型。在这里，它是从程序集文件路径和类名中导出的。一旦获取对象引用，它将被放入合适的接口：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">IWebMessage</span> iwmSample<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> sFilePath<span class="token punctuation">,</span> sTypeName<span class="token punctuation">;</span>
<span class="token comment">// 保存程序集路径和类型名称 </span>
sFilePath <span class="token operator">=</span> wfThread<span class="token punctuation">.</span>OutputName<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
sTypeName <span class="token operator">=</span> wfThread<span class="token punctuation">.</span>OutputName<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 获取对必要对象的引用 </span>
<span class="token class-name">Assembly</span> asmSample <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">LoadFrom</span><span class="token punctuation">(</span>sFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Type</span> typSample <span class="token operator">=</span> asmSample<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span>sTypeName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">object</span></span> objSample <span class="token operator">=</span> Activator<span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span>typSample<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 定义给对象的必要接口 </span>
iwmSample <span class="token operator">=</span> <span class="token punctuation">(</span>IWebMessage<span class="token punctuation">)</span>objSample<span class="token punctuation">;</span>
</code></pre></div><p>获取对象引用后，ProcessMessage方法将在 IWebMessage接口上调用Process 方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">WebMessageReturn</span> wbrSample<span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 定义方法调用的参数 </span>
    <span class="token class-name"><span class="token keyword">string</span></span> sLabel <span class="token operator">=</span> v_mInput<span class="token punctuation">.</span>Label<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sBody <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>v_mInput<span class="token punctuation">.</span>Body<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> iAppSpecific <span class="token operator">=</span> v_mInput<span class="token punctuation">.</span>AppSpecific<span class="token punctuation">;</span>
    <span class="token comment">// 调用方法并捕捉返回代码 </span>
    wbrSample <span class="token operator">=</span> iwmSample<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span>sLabel<span class="token punctuation">,</span> sBody<span class="token punctuation">,</span> iAppSpecific<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InvalidCastException</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 如果在消息内容中发生错误，则强制发出一个非终止异常 </span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadException</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 如果错误调用程序集，则强制发出终止异常 </span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadException</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 如果没有错误，则检查对象调用的返回状态 </span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>wbrSample<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> WebMessageReturn<span class="token punctuation">.</span>ReturnBad<span class="token punctuation">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadException</span>
         <span class="token punctuation">(</span><span class="token string">&quot;Unable to process message: Message marked bad&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> WebMessageReturn<span class="token punctuation">.</span>ReturnAbort<span class="token punctuation">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CWorkerThreadException</span>
         <span class="token punctuation">(</span><span class="token string">&quot;Unable to process message: Process terminating&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>提供的示例组件将消息正文写入数据库表。如果捕获到严重数据库错误，您可能希望终止处理过程，但是在这里，仅仅将消息标记为错误的消息。</p><p>由于此示例中创建的类实例可能会获取并保留昂贵的数据库资源，所以用 OnPause和 OnContinue 方法释放和重新获取对象引用。</p><h2 id="检测设备" tabindex="-1"><a class="header-anchor" href="#检测设备" aria-hidden="true">#</a> 检测设备</h2><p>就象在所有优秀的应用程序中一样，检测设备用于监测应用程序的状态。。NET 框架大大简化了将事件日志、性能计数器和 Windows管理检测设备（WMI ）纳入应用程序的过程。消息应用程序使用时间日志和性能计数器，二者都是来自 System.Diagnostics 程序集。</p><p>在 ServiceBase类中，您可以自动启用事件日志。另外，ServiceBaseEventLog成员支持写入应用程序事件日志：</p><p><code>EventLog.WriteEntry(sMyMessage, EventLogEntryType.Information);</code></p><p>对于写入事件日志而不是应用程序日志的应用程序，它能够很容易地创建和获取 EventLog 资源的引用（正如在 CWorker类中所做的一样），并能够使用 WriteEntry 方法记录日志项：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">EventLog</span> cLog<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> sSource <span class="token operator">=</span> ServiceControl<span class="token punctuation">.</span>ServiceControlName<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> sLog <span class="token operator">=</span> <span class="token string">&quot;Application&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 查看源是否存在，如果不存在，则创建源 </span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>EventLog<span class="token punctuation">.</span><span class="token function">SourceExists</span><span class="token punctuation">(</span>sSource<span class="token punctuation">)</span><span class="token punctuation">)</span>
    EventLog<span class="token punctuation">.</span><span class="token function">CreateEventSource</span><span class="token punctuation">(</span>sSource<span class="token punctuation">,</span> sLog<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建日志对象，并引用现在定义的源 </span>
cLog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
cLog<span class="token punctuation">.</span>Source <span class="token operator">=</span> sSource<span class="token punctuation">;</span>
<span class="token comment">// 在日志中写入条目，表明创建成功 </span>
cLog<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span><span class="token string">&quot;已成功创建&quot;</span><span class="token punctuation">,</span> EventLogEntryType<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>.NET 框架大大简化了性能计数器。对于每一个处理线程、线程导出的用户和整个应用程序，这一消息应用程序都能提供计数器，用于跟踪消息数量和每秒钟处理消息的数量。要提供此功能，您需要定义性能计数器的类别，然后增加相应的计数器实例。</p><p>性能计数器的类别在服务 OnStart方法中定义。这些类别代表两种计数器——消息总数和每秒钟处理的消息数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">CounterCreationData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> cdMessage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CounterCreationData</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
cdMessage<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CounterCreationData</span><span class="token punctuation">(</span><span class="token string">&quot;Messages/Total&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Total Messages Processed&quot;</span><span class="token punctuation">,</span>
    PerformanceCounterType<span class="token punctuation">.</span>NumberOfItems64<span class="token punctuation">)</span><span class="token punctuation">;</span>
cdMessage<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CounterCreationData</span><span class="token punctuation">(</span><span class="token string">&quot;Messages/Second&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;Messages Processed a Second&quot;</span><span class="token punctuation">,</span>
    PerformanceCounterType<span class="token punctuation">.</span>RateOfChangePerSecond32<span class="token punctuation">)</span><span class="token punctuation">;</span>
PerformanceCounterCategory<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">&quot;MSDN Message Service&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;MSDN Message Service Counters&quot;</span><span class="token punctuation">,</span> cdMessage<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>一旦定义了性能计数器类别，将创建 PerformanceCounter 对象以访问计数器实例功能。PerformanceCounter对象需要类别、计数器名称和一个可选的实例名称。对于辅助进程，将使用来自 XML文件的进程名称，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>pcMsgTotWorker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PerformanceCounter</span><span class="token punctuation">(</span><span class="token string">&quot;MSDN Message Service&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Messages/Total&quot;</span><span class="token punctuation">,</span> sProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>
pcMsgSecWorker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PerformanceCounter</span><span class="token punctuation">(</span><span class="token string">&quot;MSDN Message Service&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Messages/Second&quot;</span><span class="token punctuation">,</span> sProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>
pcMsgTotWorker<span class="token punctuation">.</span>RawValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
pcMsgSecWorker<span class="token punctuation">.</span>RawValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre></div><p>要增加计数器的值，仅仅需要调用适当的方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>pcMsgTotWorker<span class="token punctuation">.</span><span class="token function">IncrementBy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pcMsgSecWorker<span class="token punctuation">.</span><span class="token function">IncrementBy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>最后说明一点，服务终止时，安装的性能计数器类别应该从系统中删除：</p><p><code>PerformanceCounterCategory.Delete(&quot;MSDN Message Service&quot;);</code></p><p>由于性能计数器在 .NET 框架中工作，因此需要运行一项特殊的服务。此服务（PerfCounterService）提供了共享内存。计数器信息将写入共享内存，并被性能计数器系统读取。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>在结束以前，我们来简要介绍一下安装以及称为 installutil.exe的安装工具。由于此应用程序是 Windows服务，它必须使用installutil.exe来安装。因此，需要使用一个从 System.Configuration.Install 程序集中继承的 Installer类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServiceRegister</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Installer</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">ServiceInstaller</span> serviceInstaller<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ServiceProcessInstaller</span> processInstaller<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">ServiceRegister</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 创建服务安装程序 </span>
        serviceInstaller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        serviceInstaller<span class="token punctuation">.</span>StartType <span class="token operator">=</span> ServiceStart<span class="token punctuation">.</span>Manual<span class="token punctuation">;</span>
        serviceInstaller<span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> ServiceControl<span class="token punctuation">.</span>ServiceControlName<span class="token punctuation">;</span>
        serviceInstaller<span class="token punctuation">.</span>DisplayName <span class="token operator">=</span> ServiceControl<span class="token punctuation">.</span>ServiceControlDesc<span class="token punctuation">;</span>
        Installers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>serviceInstaller<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建进程安装程序 </span>
        processInstaller <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServiceProcessInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        processInstaller<span class="token punctuation">.</span>RunUnderSystemAccount <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        Installers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>processInstaller<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如此示例类所示，对于一个 Windows服务，服务和服务进程各需要一个安装程序，以定义运行服务的帐户。其他安装程序允许注册事件日志和性能计数器等资源。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>从这个 .NET 框架应用程序示例中可以看出，以前只有 Visual C++程序员能够编写的应用程序，现在使用简单的面向对象程序即可实现。尽管我们的重点是 C# ，但本文所述的内容也同样适用于 Visual Basic 和Managed C++.新的 .NET 框架使开发人员能够使用任何编程语言来创建功能强大、可伸缩的 Windows应用程序和服务。</p><p>新的 .NET 框架不仅简化和扩展了编程的种种可能，还能够轻松地将人们经常遗忘的应用程序检测设备（例如性能监测计数器和事件日志通知）合并到应用程序中。尽管这里的应用程序没有使用 Windows管理检测设备（WMI ），但 .NET 框架同样也可以应用它。</p>`,109),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","cspme7.html.vue"]]);export{k as default};
