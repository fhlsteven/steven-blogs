import{_ as a,o as n,c as e,a as s}from"./app-477de5b2.js";const i={},t=s(`<h1 id="microsoft-net-框架常见问题-cwxiao888-转贴" tabindex="-1"><a class="header-anchor" href="#microsoft-net-框架常见问题-cwxiao888-转贴" aria-hidden="true">#</a> Microsoft .NET 框架常见问题 cwxiao888（转贴）</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>关键字:.NET 框架  
出处:http://www.microsoft.com/china/msdn/library/faq111700.asp 
  
Microsoft .NET 框架常见问题
Microsoft Corporation
2000 年 12 月

摘要：本文包含有关 Microsoft .NET 和 Microsoft .NET 框架的常见问题。

目录
概念问题
运行时技术问题
   术语
   程序集
   应用程序部署及隔离
   垃圾回收
   远程处理
   互操作性
   安全性
</code></pre></div><h2 id="概念问题" tabindex="-1"><a class="header-anchor" href="#概念问题" aria-hidden="true">#</a> 概念问题</h2><ul><li>什么是 .NET？</li><li>什么是 .NET 框架？</li><li>.NET 框架是否只适用于创建 Web 站点的用户？</li><li>从何处可以获得 .NET 框架 SDK？</li><li>.NET 框架可以运行于哪些平台？</li><li>.NET 框架支持哪些编程语言？</li><li>.NET 框架和 COM+ 服务之间是什么关系？</li><li>.NET 框架和 DCOM 之间是什么关系？</li><li>.NET 框架是否仅仅是 Windows DNA 的新名称？</li></ul><h2 id="运行时技术问题" tabindex="-1"><a class="header-anchor" href="#运行时技术问题" aria-hidden="true">#</a> 运行时技术问题</h2><h3 id="术语" tabindex="-1"><a class="header-anchor" href="#术语" aria-hidden="true">#</a> 术语</h3><ul><li>什么是公共语言运行时 (CLR)？</li><li>什么是公共类型系统 (CTS)？</li><li>什么是公共语言规范 (CLS)？</li><li>什么是 Microsoft 中间语言 (MSIL)？</li><li>什么是托管代码和托管数据？</li></ul><h3 id="程序集" tabindex="-1"><a class="header-anchor" href="#程序集" aria-hidden="true">#</a> 程序集</h3><ul><li>什么是程序集？</li><li>什么是专用程序集和共享程序集？</li><li>如果我想创建一个共享程序集，在标记和管理密钥对方面是否需要额外的开销？</li><li>名称空间与程序集名称之间有什么区别？</li></ul><h3 id="应用程序部署和隔离" tabindex="-1"><a class="header-anchor" href="#应用程序部署和隔离" aria-hidden="true">#</a> 应用程序部署和隔离</h3><ul><li>部署 .NET 应用程序时可以使用哪些选项？</li><li>如果我已经编写了一个程序集，并希望在多个应用程序中使用它，我应该在何处部署它？</li><li>如何才能看到在全局程序集缓存中安装了哪些程序集？</li><li>什么是应用程序域？</li></ul><h3 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h3><ul><li>什么是垃圾回收？</li><li>非确定性垃圾回收是如何影响代码的？</li><li>是否能够避免使用可作为垃圾回收的堆？</li></ul><h3 id="远程处理" tabindex="-1"><a class="header-anchor" href="#远程处理" aria-hidden="true">#</a> 远程处理</h3><ul><li>如何在公共语言运行时中进行进程内和进程间通讯？</li></ul><h3 id="互操作性" tabindex="-1"><a class="header-anchor" href="#互操作性" aria-hidden="true">#</a> 互操作性</h3><ul><li>是否可以在 .NET 框架程序中使用 COM 对象？</li><li>是否可以在 COM 程序中使用 .NET 框架组件？</li><li>是否可以在 .NET 框架程序中使用 Win32 API？</li></ul><h3 id="安全性" tabindex="-1"><a class="header-anchor" href="#安全性" aria-hidden="true">#</a> 安全性</h3><ul><li>如何使代码与安全系统协调工作？</li><li>为什么在网络共享驱动器中运行代码时会发生安全异常？</li><li>如何编写代码，使它在安全系统停止该代码时运行？</li><li>如何管理个人或企业计算机的安全性？</li><li>基于证据的安全性是如何与 Windows 2000 安全性配合工作的？</li></ul><h2 id="概念问题-re" tabindex="-1"><a class="header-anchor" href="#概念问题-re" aria-hidden="true">#</a> 概念问题(Re)</h2><h3 id="什么是-net" tabindex="-1"><a class="header-anchor" href="#什么是-net" aria-hidden="true">#</a> 什么是 .NET？</h3><p>简单地说，Microsoft? .NET 是 Microsoft 以服务的方式递交软件的一种策略。有关完整信息，请参阅有关该主题的白皮书（英文）。</p><p>以下是白皮书的摘要，简要介绍了 .NET 的关键内容：</p><ul><li><p>Microsoft .NET 平台<br> 包括用于创建和操作新一代服务的 .NET 基础结构和工具、用于实施多信息客户端的 .NET 用户经验，以及用于启用新一代智能 Internet 设备的 .NET 构造块服务和 .NET 设备软件。</p></li><li><p>Microsoft .NET 产品和服务<br> 包括 Microsoft? Windows.NET（其核心集成了一组构造块服务）、MSN.NET、个人订阅服务、Microsoft? Office.NET、Microsoft? Visual Studio.NET 和 Microsoft? bCentral? for .NET。</p></li><li><p>第三方 .NET 服务<br> 许多领域的合作伙伴和开发人员都有机会在 .NET 平台上提供企业和垂直服务。</p></li></ul><p>此问题针对的是 .NET 框架。.NET 框架是 .NET 平台基础结构的一部分。有关 .NET 框架的详细信息，请参阅下一个问题。</p><h3 id="什么是-net-框架" tabindex="-1"><a class="header-anchor" href="#什么是-net-框架" aria-hidden="true">#</a> 什么是 .NET 框架？</h3><p>.NET 框架是创建、部署和运行 Web 服务及其他应用程序的一个环境。它包括三个主要部分：公共语言运行时、框架类和 ASP.NET。</p><h3 id="net-框架是否只适用于创建-web-站点的用户" tabindex="-1"><a class="header-anchor" href="#net-框架是否只适用于创建-web-站点的用户" aria-hidden="true">#</a> .NET 框架是否只适用于创建 Web 站点的用户？</h3><p>.NET 框架使您可以创建优秀的 Web 应用程序。但它也可以帮助您创建现在的各种应用程序。与当前创建应用程序的方式相比，.NET 在编写任何 Windows 软件（使用 ATL/COM、MFC、Microsoft? Visual Basic? 或标准 Microsoft? Win32?）方面都具有更大的优势。当然，如果您是开发 Web 站点，那么从 ASP.NET 开始，您就会感受到 .NET 框架的强大吸引力。</p><h3 id="从何处可以获得-net-框架-sdk" tabindex="-1"><a class="header-anchor" href="#从何处可以获得-net-框架-sdk" aria-hidden="true">#</a> 从何处可以获得 .NET 框架 SDK？</h3><p>现在可以从 MSDN Online Downloads（英文）下载 .NET 框架 SDK 的 Beta 1 版。鉴于其大小，我们以多种方式提供此 Beta 版：作为一个下载文件 (106 MB)，分为 11 部分下载，或者从 Microsoft Developer Store 定购其 CD：</p><ul><li>美国/加拿大（英语）</li><li>国际（英语）</li></ul><h3 id="net-框架可以运行于哪些平台" tabindex="-1"><a class="header-anchor" href="#net-框架可以运行于哪些平台" aria-hidden="true">#</a> .NET 框架可以运行于哪些平台？</h3><p>Beta 1 版可以运行在 Microsoft? Windows? 2000、Windows 95/98/ME 和 Windows NT? 4.0 上。</p><p>另外，还有一个称为 .NET 精简框架的 .NET 框架版本。它用于使蜂窝电话和增强型电视等设备也具有 .NET 框架的某些功能。.NET 精简框架将运行在 Windows CE 和其他嵌入式操作系统上。</p><h3 id="net-框架支持哪些编程语言" tabindex="-1"><a class="header-anchor" href="#net-框架支持哪些编程语言" aria-hidden="true">#</a> .NET 框架支持哪些编程语言？</h3><p>.NET 框架与编程语言无关。事实上任何语言都可以支持 .NET 框架。目前，您可以用许多语言来创建 .NET 程序，包括：C++、Microsoft? Visual Basic.NET、JScript? 和 Microsoft 的最新语言——C#。以后，也会有大量的第三方语言可以用来创建 .NET 框架应用程序，包括 COBOL、Eiffel、Perl、Python、Smalltalk 等等。</p><h3 id="net-框架和-com-服务之间是什么关系" tabindex="-1"><a class="header-anchor" href="#net-框架和-com-服务之间是什么关系" aria-hidden="true">#</a> .NET 框架和 COM+ 服务之间是什么关系？</h3><p>在 .NET 框架中，不仅可以完全访问 COM+ 服务，而且也更容易创建服务组件。</p><p>.NET 框架组件可被添加至 COM+ 应用程序中。在 COM+ 应用程序中，.NET 框架组件可以利用自动组件服务，例如：事务、对象池、排队组件、事件等等。</p><h3 id="net-框架和-dcom-之间是什么关系" tabindex="-1"><a class="header-anchor" href="#net-框架和-dcom-之间是什么关系" aria-hidden="true">#</a> .NET 框架和 DCOM 之间是什么关系？</h3><p>DCOM 是用于进程间通讯的 COM 基础结构。.NET 框架支持大量用于进程间通讯的可插入通道和格式化程序。在托管代码和非托管代码之间进行转换时，.NET 框架使用了 COM 基础结构，尤其是 DCOM。所有使用 COM+ 服务的方案都使用了托管到非托管转换，因此默认使用 DCOM。对于注重互操作性的进程间通讯，.NET 框架也支持 SOAP（简单对象访问协议）。</p><h3 id="net-框架是否仅仅是-windows-dna-的新名称" tabindex="-1"><a class="header-anchor" href="#net-框架是否仅仅是-windows-dna-的新名称" aria-hidden="true">#</a> .NET 框架是否仅仅是 Windows DNA 的新名称？</h3><p>不。Windows DNA 是用于创建紧耦合的分布式 Web 应用程序的一种体系结构。由于分布式应用程序变得需要更多的松耦合原理，因此 Microsoft 在 .NET 中发展了该体系结构。.NET 框架是 .NET 体系结构的一部分。</p><h2 id="运行时技术问题-re" tabindex="-1"><a class="header-anchor" href="#运行时技术问题-re" aria-hidden="true">#</a> 运行时技术问题(Re)</h2><h3 id="术语-1" tabindex="-1"><a class="header-anchor" href="#术语-1" aria-hidden="true">#</a> 术语</h3><h4 id="什么是公共语言运行时-clr" tabindex="-1"><a class="header-anchor" href="#什么是公共语言运行时-clr" aria-hidden="true">#</a> 什么是公共语言运行时 (CLR)？</h4><p>公共语言运行时是 .NET 框架应用程序的执行引擎。</p><p>它提供许多服务，包括：</p><ul><li>代码管理（加载和执行）</li><li>应用程序内存隔离</li><li>类型安全验证</li><li>IL 到本机代码的转换</li><li>元数据（增强的类型信息）访问</li><li>为托管对象管理内存</li><li>强制代码访问安全</li><li>异常处理，包括跨语言异常</li><li>托管代码、COM 对象和现有 DLL（非托管代码和数据）之间的互操作</li><li>自动进行对象布局</li><li>对开发人员服务（配置、调试等）的支持</li></ul><h4 id="什么是公共类型系统-cts" tabindex="-1"><a class="header-anchor" href="#什么是公共类型系统-cts" aria-hidden="true">#</a> 什么是公共类型系统 (CTS)？</h4><p>公共类型系统是多信息类型系统，它被内置在公共语言运行时中，支持大多数编程语言中的类型和操作。公共类型系统支持大量编程语言的完全实现。</p><h4 id="什么是公共语言规范-cls" tabindex="-1"><a class="header-anchor" href="#什么是公共语言规范-cls" aria-hidden="true">#</a> 什么是公共语言规范 (CLS)？</h4><p>公共语言规范是一组结构和限制，用作库编写者和编译器编写者的指南。它使任何支持 CLS 的语言都可以完全使用库，并且使这些语言可以相互集成。公共语言规范是公共类型系统的子集。对于那些需要编写代码供其他开发人员使用的应用程序开发人员，公共语言规范也非常重要。如果开发人员遵循 CLS 规则来设计公共访问的 API，那么就可以在支持公共语言运行时的任何其他编程语言中很容易地使用这些 API。</p><h4 id="什么是-microsoft-中间语言-msil" tabindex="-1"><a class="header-anchor" href="#什么是-microsoft-中间语言-msil" aria-hidden="true">#</a> 什么是 Microsoft 中间语言 (MSIL)？</h4><p>MSIL 是与 CPU 无关的指令集。.NET 框架程序被编译成 MSIL。它包含加载、存储、初始化和调用对象方法的指令。</p><p>与元数据和公共类型系统结合，MSIL 允许真正的跨语言集成。</p><p>MSIL 在执行前被转换为机器代码，而不是一边解释一边执行。</p><h4 id="什么是托管代码和托管数据" tabindex="-1"><a class="header-anchor" href="#什么是托管代码和托管数据" aria-hidden="true">#</a> 什么是托管代码和托管数据？</h4><p>托管代码是编写为支持公共语言运行时服务的代码（请参阅“什么是公共语言运行时？”）。为了支持这些服务，代码必须向运行时提供最小级别的信息（元数据）。默认情况下，所有 C#、Visual Basic.NET 和 JScript.NET 代码都是托管代码。Visual Studio.NET C++ 代码在默认情况下不是托管代码，但通过指定命令行开关 (/CLR)，编译器也可以生成托管代码。</p><p>与托管代码密切相关的是托管数据。托管数据是由公共语言运行时的垃圾回收器进行分配和释放的数据。默认情况下，C#、Visual Basic 和 JScript.NET 数据是托管数据。不过，通过使用特殊的关键字，C# 数据可以被标记为非托管数据。Visual Studio.NET C++ 数据在默认情况下是非托管数据（即使在使用 /CLR 开关时），但是在使用 C++ 的托管扩展时，可以使用“__gc”关键字将类标记为托管类。就象该名称所显示的那样，它表示类实例的内存由垃圾回收器管理。另外，该类也完全成为 .NET 框架的成员，同时具备它所带来的好处和限制。好处的一个例子是：它可以与其他语言编写的类正确地进行互操作（如托管的 C++ 类可以从 Visual Basic 类继承）；限制的一个例子是：托管类只能从一个基类继承。</p><h3 id="程序集-1" tabindex="-1"><a class="header-anchor" href="#程序集-1" aria-hidden="true">#</a> 程序集</h3><h4 id="什么是程序集" tabindex="-1"><a class="header-anchor" href="#什么是程序集" aria-hidden="true">#</a> 什么是程序集？</h4><p>程序集是 .NET 框架应用程序的主要构造块。它是作为一个单一实现单元（包含一个或多个文件）来创建、标识和部署的功能集合。所有的托管类型和资源都可以被标记为仅在其实现单元内访问，或者标记为可由该单元以外的代码来访问。</p><p>程序集通过清单来进行自我说明。清单是每个程序集的不可或缺的组成部分。清单：</p><ul><li>建立程序集标识（以文本名称的格式）、版本、类别和数字签名（如果要在应用程序之间共享该程序集）。</li><li>定义组成程序集实现的文件（通过名称和文件散列）。</li><li>指定组成程序集的类型和资源，包括哪些是从程序集中导出的。</li><li>逐条记录编译时对其他程序集的依存。</li><li>指定程序集正确运行所需要的权限的集合。</li></ul><p>此信息在运行时用于解析引用、强制版本绑定策略以及验证所加载的程序集的完整性。因为每一类型都被加载到程序集的上下文中，所以运行时可以确定并定位任何正在运行的对象的程序集。程序集也是应用了代码访问安全权限的单元。在确定授予其所包含的代码哪些权限时，每个程序集的标识证据都被认为是独立的。</p><p>程序集的自我说明特征也有助于实现无影响安装和 XCOPY 部署。</p><h4 id="什么是专用程序集和共享程序集" tabindex="-1"><a class="header-anchor" href="#什么是专用程序集和共享程序集" aria-hidden="true">#</a> 什么是专用程序集和共享程序集？</h4><p>专用程序集仅由单一应用程序使用，并且存储在该应用程序的安装目录中（或其子目录中）。共享程序集是可被多个应用程序引用的程序集。要共享一个程序集，该程序集必须明确为这个目的而创建，这可以通过给其指定加密的增强型名称（用作共享名称）来实现。相反，专用程序集名称只要求在使用它的应用程序中是唯一的。</p><p>通过区分专用和共享程序集，我们介绍明确决定共享的要点。只需简单地将专用程序集部署在应用程序目录中，即可确保应用程序只在创建和部署它的那部分中运行。对专用程序集的引用只在专用应用程序目录内部进行解析。</p><p>选择创建和使用共享程序集可以有多种原因，例如表达版本策略的能力。共享程序集具有加密的增强型名称，这项事实意味着只有程序集的作者才拥有密钥来生成程序集的新版本。因此，如果您做出策略声明，希望接受程序集的新版本，则您可以确信版本更新将由作者来控制和验证。否则，您就不会接受它们。</p><p>对于在本地安装的应用程序，共享程序集通常被明确安装在全局程序集缓存中（程序集的本地缓存由 .NET 框架维护）。.NET 框架的版本管理特性的关键在于下载的代码不会影响本地安装的应用程序的执行。下载的代码被放在一个特殊的下载缓存中，即使某些下载组件被编译为共享程序集，也不能在机器上全局使用这些代码。</p><p>与 .NET 框架一起发布的类都被编译为共享程序集。</p><h4 id="如果我想创建一个共享程序集-在标记和管理密钥对方面是否需要额外的开销" tabindex="-1"><a class="header-anchor" href="#如果我想创建一个共享程序集-在标记和管理密钥对方面是否需要额外的开销" aria-hidden="true">#</a> 如果我想创建一个共享程序集，在标记和管理密钥对方面是否需要额外的开销？</h4><p>创建共享程序集确实涉及到加密密钥方面的工作。创建程序集时，只有公共密钥是必要的。支持 .NET 框架的编译器提供命令行选项（或使用自定义属性），用于在创建程序集时提供公共密钥。通常在资源数据库中保留一份常用的公共密钥，并使编译脚本指向此密钥。在发布程序集之前，必须使用相应的私人密钥将其完全标记。这是通过 SDK 工具 SN.exe（增强型名称）来完成的。</p><p>增强型名称标记不象 Authenticode 一样需要使用证书。它不涉及第三方组织，不需要付费，也不受证书约束。另外，验证增强型名称的额外开销远远小于验证 Authenticode 的开销。不过，增强型名称不会生成任何信任某个出版商的语句。增强型名称使您可以确信给定程序集的内容没有被篡改，在运行时为您加载的程序集来自于您开发时针对的出版商。但它不会生成有关是否信任出版商身份的语句。</p><h4 id="名称空间与程序集名称之间有什么区别" tabindex="-1"><a class="header-anchor" href="#名称空间与程序集名称之间有什么区别" aria-hidden="true">#</a> 名称空间与程序集名称之间有什么区别？</h4><p>名称空间是类型的一种逻辑命名方案，其中简单类型名称（如 MyType）前面带有用点分隔的层次结构名称。这样的命名方案完全在开发人员的控制之下。例如，键入 MyCompany.FileAccess.A 和 MyCompany.FileAccess.B 在逻辑上将会具有与文件访问相关的功能。.NET 框架使用一种层次结构命名方案，用于将类型按相关功能的逻辑类别进行分组，例如，ASP.NET 应用程序框架或远程处理功能。设计工具可以利用名称空间使开发人员更容易在代码中浏览和引用类型。名称空间的概念与程序集的概念之间没有任何联系。一个程序集可以包含其层次结构名称具有不同名称空间根的类型，而一个逻辑名称空间根可以跨越多个程序集。在 .NET 框架中，名称空间是在设计时进行逻辑命名的便捷方式，而程序集在运行时为类型建立名称作用域。</p><h3 id="应用程序部署和隔离-1" tabindex="-1"><a class="header-anchor" href="#应用程序部署和隔离-1" aria-hidden="true">#</a> 应用程序部署和隔离</h3><h4 id="部署-net-应用程序时可以使用哪些选项" tabindex="-1"><a class="header-anchor" href="#部署-net-应用程序时可以使用哪些选项" aria-hidden="true">#</a> 部署 .NET 应用程序时可以使用哪些选项？</h4><p>通过使应用程序的无影响安装和 XCOPY 部署成为可能，.NET 框架简化了部署。因为所有的请求首先在专用应用程序目录中进行解析，所以只需简单地将一个应用程序的目录文件复制到磁盘中，即可运行该应用程序，而不需要注册。</p><p>此方案对于 Web 应用程序、Web 服务和独立的桌面应用程序特别有吸引力。不过，在有些方案中 XCOPY 还不足以担当分发机制。例如，当应用程序具有很少的专用代码，而依赖于可用的共享程序集；或者应用程序不是安装在本地（而是按需下载）。对于这些情况，.NET 框架提供了扩展的代码下载服务以及与 Windows Installer 的集成。.NET 框架提供的代码下载支持通过当前平台提供了许多优势，包括增量下载、代码访问安全性（不再有“Authenticode”对话框）和应用程序隔离（为一个应用程序下载的代码不会影响其他应用程序）。Windows Installer 是 .NET 应用程序可以使用的另外一个强大的部署机制。在 Windows Installer 1.5 中，Windows Installer 的所有特性（包括发行、公布和应用程序修补）都可以在 .NET 应用程序中使用。</p><h4 id="如果我已经编写了一个程序集-并希望在多个应用程序中使用它-我应该在何处部署它" tabindex="-1"><a class="header-anchor" href="#如果我已经编写了一个程序集-并希望在多个应用程序中使用它-我应该在何处部署它" aria-hidden="true">#</a> 如果我已经编写了一个程序集，并希望在多个应用程序中使用它，我应该在何处部署它？</h4><p>要由多个应用程序使用的程序集（如共享程序集）需要部署到全局程序集缓存中。在预发布版和 Beta 版中，使用 Alink SDK 工具的 /i 选项可将程序集安装到缓存中：</p><p><code>al /i:myDll.dll</code></p><p>Windows Installer 的后续版本能够将程序集安装到全局程序集缓存中。</p><h4 id="如何才能看到在全局程序集缓存中安装了哪些程序集" tabindex="-1"><a class="header-anchor" href="#如何才能看到在全局程序集缓存中安装了哪些程序集" aria-hidden="true">#</a> 如何才能看到在全局程序集缓存中安装了哪些程序集？</h4><p>.NET 框架附带了一个 Windows 外壳扩展，用于查看程序集缓存。在 Windows 资源管理器中，转至 % windir%\\assembly 以激活查看器。</p><h4 id="什么是应用程序域" tabindex="-1"><a class="header-anchor" href="#什么是应用程序域" aria-hidden="true">#</a> 什么是应用程序域？</h4><p>应用程序域（通常是 AppDomain）是用于隔离应用程序的虚拟进程。在同一个应用程序作用域中创建的所有对象（换句话说，从该应用程序的入口点开始沿着对象激活序列的任何地方）都在同一个应用程序域中创建。多个应用程序域可以存在于一个操作系统进程中，使它们成为隔离应用程序的简便方式。</p><p>操作系统进程通过使用各不相同的内存地址空间来提供隔离。尽管它是有效的，但也是代价昂贵的，并且不能达到大型 Web 服务器所需要的数量。与其相比，公共语言运行时通过管理在应用程序域中运行的代码的内存使用来强制进行应用程序隔离。这样就确保它不会访问应用程序域以外的内存。需要注意的是，只有类型安全的代码才能以这种方式管理（当在应用程序域中加载不安全代码时，运行时不能保证隔离）。</p><h3 id="垃圾回收-1" tabindex="-1"><a class="header-anchor" href="#垃圾回收-1" aria-hidden="true">#</a> 垃圾回收</h3><h4 id="什么是垃圾回收" tabindex="-1"><a class="header-anchor" href="#什么是垃圾回收" aria-hidden="true">#</a> 什么是垃圾回收？</h4><p>垃圾回收是使计算机能检测何时不再能够访问某个对象的一种机制。它将自动释放由该对象使用的内存（也调用用户编写的称为“结束者”的清理例程）。一些垃圾回收器（如由 .NET 使用的）会压缩内存，并因此减少程序的工作集。</p><h4 id="非确定性垃圾回收是如何影响代码的" tabindex="-1"><a class="header-anchor" href="#非确定性垃圾回收是如何影响代码的" aria-hidden="true">#</a> 非确定性垃圾回收是如何影响代码的？</h4><p>对于大多数编程人员而言，拥有一个垃圾回收器（并且使用可作为垃圾回收的对象）意味着永远不需要操心释放内存或引用计数对象，即使您使用了复杂的数据结构。但如果您通常在同一个用于释放对象内存的代码块中释放系统资源（文件句柄、锁定等等），那么在编码样式方面需要做一些修改。使用可作为垃圾回收的对象时，您应该提供一种方法，来明确释放系统资源（也就是说，由您的程序控制），同时允许垃圾回收器在压缩工作集时释放内存。</p><h4 id="是否能够避免使用可作为垃圾回收的堆" tabindex="-1"><a class="header-anchor" href="#是否能够避免使用可作为垃圾回收的堆" aria-hidden="true">#</a> 是否能够避免使用可作为垃圾回收的堆？</h4><p>所有支持运行时的语言都允许您从可作为垃圾回收的堆中分配类对象。这在快速分配方面带来了好处，并且使编程人员无需自己来计算何时应该显式“free”每个对象。</p><p>CLR 还提供了 ValueTypes 对象——它们与类相似，但 ValueType 对象是在运行时堆栈（不是堆）中分配的，因此当您的代码退出定义这些对象的过程时，将自动回收它们。这就是 C# 中“struct”的操作方式。</p><p>C++ 的托管扩展使您可以选择类对象分配的位置。如果使用 <code>__gc</code>关键字声明为托管类，它们将从可作为垃圾回收的堆中分配；如果它们不包含 __gc 关键字，它们将与普通的 C++ 对象一样从 C++ 堆中分配，并且使用“free”方法显式释放。</p><p>有关垃圾回收的的详细信息，请参阅：</p><ul><li>垃圾回收：Microsoft .NET 框架中的自动内存管理（英文）</li><li>垃圾回收 - 第 2 部分：Microsoft .NET 框架中的自动内存管理（英文）</li></ul><h3 id="远程处理-1" tabindex="-1"><a class="header-anchor" href="#远程处理-1" aria-hidden="true">#</a> 远程处理</h3><h4 id="如何在公共语言运行时中进行进程内和进程间通讯" tabindex="-1"><a class="header-anchor" href="#如何在公共语言运行时中进行进程内和进程间通讯" aria-hidden="true">#</a> 如何在公共语言运行时中进行进程内和进程间通讯？</h4><p>进程内通讯有两种：在单一应用程序域的上下文中，或者跨应用程序域。在同一个应用程序域的上下文中，使用代理作为监听机制，而不涉及封送处理/序列化。当跨应用程序域时，使用运行时二进制协议来作封送处理/序列化。</p><p>进程间通讯为每个特定目的使用一个可插入通道和格式化程序协议。</p><ul><li><p>如果开发人员使用 soapsuds.exe 工具指定终结点来生成元数据代理，那么默认值是带有 SOAP 格式化程序的 HTTP 通道。</p></li><li><p>如果开发人员在托管世界中执行显式远程处理，需要明确指定使用的通道和格式化程序。这可以通过配置文件用可管理的方式来表示，或者用 API 调用来加载特定通道。选项如下：<br> 带有 SOAP 格式化程序的 HTTP 通道（HTTP 在 Internet 上或任何必须通过防火墙进行通信的时候运行良好）<br> 带有二进制格式化程序的 TCP 通道（对于局域网，TCP 是性能较高的选项）<br> 带有 SOAP 格式化程序的 SMTP 通道（仅对跨计算机有意义）<br></p></li></ul><p>在托管代码和非托管代码之间进行转换时，COM 基础结构（尤其是 DCOM）用于远程处理。在 CLR 的中间版本中，这也适用于服务组件（使用 COM+ 服务的组件）。在最终版本中，配置任何远程组件都是可能的。</p><p>对象的分布式垃圾回收由名为“租用生存期”的系统来管理。每个对象都有一个租用时间，当到期时，该对象与 CLR 的远程处理基础结构断开连接。对象具有一个默认的更新时间——当客户端成功地调用了对象时，租用将被更新。客户端可以显式更新租用。</p><h3 id="互操作性-1" tabindex="-1"><a class="header-anchor" href="#互操作性-1" aria-hidden="true">#</a> 互操作性</h3><h4 id="是否可以在-net-框架程序中使用-com-对象" tabindex="-1"><a class="header-anchor" href="#是否可以在-net-框架程序中使用-com-对象" aria-hidden="true">#</a> 是否可以在 .NET 框架程序中使用 COM 对象？</h4><p>是。您现在部署的任何 COM 组件都可以在托管代码中使用。通常情况下，所需的调整是完全自动进行的。</p><p>特别是，可以使用运行时可调用包装 (RCW) 从 .NET 框架访问 COM 组件。此包装将 COM 组件提供的 COM 接口转换为与 .NET 框架兼容的接口。对于 OLE 自动化接口，RCW 可以从类型库中自动生成；对于非 OLE 自动化接口，开发人员可以编写自定义 RCW，手动将 COM 接口提供的类型映射为与 .NET 框架兼容的类型。</p><h4 id="是否可以在-com-程序中使用-net-框架组件" tabindex="-1"><a class="header-anchor" href="#是否可以在-com-程序中使用-net-框架组件" aria-hidden="true">#</a> 是否可以在 COM 程序中使用 .NET 框架组件？</h4><p>是。您现在创建的托管类型都可以通过 COM 访问。通常情况下，所需的配置是完全自动进行的。托管开发环境的某些新特性不能在 COM 中访问。例如，不能在 COM 中使用静态方法和参数化构造函数。一般，提前确定给定类型所针对的用户是一种较好的办法。如果类型需要在 COM 中使用，您将被限制在使用 COM 可访问的特性。</p><p>默认情况下，托管类型可能是可见的，也可能是不可见的，这由用于编写托管类型的语言决定。</p><p>特别是，可以使用 COM 可调用包装 (CCW) 从 COM 访问 .NET 框架组件。这与 RCW（请参阅上一个问题）相似，但它们的方向相反。同样，如果 .NET 框架开发工具不能自动生成包装，或者如果自动方式不是您所需要的，则可以开发自定义的 CCW。</p><h4 id="是否可以在-net-框架程序中使用-win32-api" tabindex="-1"><a class="header-anchor" href="#是否可以在-net-框架程序中使用-win32-api" aria-hidden="true">#</a> 是否可以在 .NET 框架程序中使用 Win32 API？</h4><p>是。使用 P/Invoke，.NET 框架程序可以通过静态 DLL 入口点的方式来访问本机代码库。</p><p>下面是 C# 调用 Win32 <code>MessageBox</code> 函数的示例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MainApp</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> EntryPoint<span class="token operator">=</span><span class="token string">&quot;MessageBox&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name">String</span> strMessage<span class="token punctuation">,</span> <span class="token class-name">String</span> strCaption<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> uiType<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> 
        <span class="token function">MessageBox</span><span class="token punctuation">(</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;您好，这是 PInvoke！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.NET&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre></div><h3 id="安全性-1" tabindex="-1"><a class="header-anchor" href="#安全性-1" aria-hidden="true">#</a> 安全性</h3><h4 id="如何使代码与安全系统协调工作" tabindex="-1"><a class="header-anchor" href="#如何使代码与安全系统协调工作" aria-hidden="true">#</a> 如何使代码与安全系统协调工作？</h4><p>通常，这不成问题——大多数应用程序能安全地运行，不会受恶意攻击的干扰。通过简单地使用标准类库来访问资源（如文件）或执行受保护的操作（例如反转类型的私有成员），安全性由这些库来实施。应用程序开发者需要完成的一项简单工作是包括权限请求（一种公开的安全性），将代码可能接收的权限限制在它所需要的权限范围内。这也确保了如果代码被允许运行，它在运行时将具有所需的所有权限。</p><p>仅当开发人员需要编写提供新型资源的新基类库时，他们才需要直接处理安全系统。在这种情况下，并非所有的代码都有潜在的安全性问题，代码访问安全机制将其限制在替代了安全系统的那部分代码上。</p><h4 id="为什么在网络共享驱动器中运行代码时会发生安全异常" tabindex="-1"><a class="header-anchor" href="#为什么在网络共享驱动器中运行代码时会发生安全异常" aria-hidden="true">#</a> 为什么在网络共享驱动器中运行代码时会发生安全异常？</h4><p>默认安全策略仅给来自本地 Intranet 区域的代码授予有限的权限。这个区域是由 Internet Explorer 安全设置定义的，它们应该配置为与企业内部的本地网络相匹配。由于由 UNC 或映射驱动器（例如使用 NET USE 命令）命名的文件都需要在本地网络上发送，因此它们也在本地 Intranet 区域中。</p><p>默认值是为不安全的 Intranet 这种最坏情况而设置的。如果您的 Intranet 比较安全，您可以修改安全策略（用 CASPol 工具），给本地 Intranet 或其一部分（例如特定的计算机共享名）授予更多的权限。</p><h4 id="如何编写代码-使它在安全系统停止该代码时运行" tabindex="-1"><a class="header-anchor" href="#如何编写代码-使它在安全系统停止该代码时运行" aria-hidden="true">#</a> 如何编写代码，使它在安全系统停止该代码时运行？</h4><p>当代码试图执行未经授权的操作时，将发生安全异常。权限是基于代码（尤其是其位置）来授予的。例如，从 Internet 中运行的代码所得到的权限比在本地计算机上运行的代码所得到的权限要少，这是因为经验证明，它的可靠性要低一些。因此，要运行由于安全异常而失败的代码，您必须增加授予它的权限。一个简单的方法是将代码移到更受信任的位置（例如本地文件系统）。但这种方法并不是在任何情况下都有效（Web 应用程序是一个很好的例子，企业网络上的 Intranet 应用程序是另一个例子）。因此，不要改变代码位置，而是通过更改安全策略给该位置授予更多的权限。请使用代码访问安全策略工具 (caspol.exe) 或图形化管理工具（在 Beta 2 和更高版本中可以得到）来执行此操作。如果您是代码的开发人员或发行者，您也可以对它进行数字签名，然后修改安全策略，给带有该数字签名的代码授予更多权限。但是，在执行上述任何操作时，请记住此代码被授予较少的权限，是因为它不是来自受信任的来源——在将代码移至本地计算机或更改安全策略以前，您应该确保这些代码不会执行恶意或损坏性的操作。</p><h4 id="如何管理个人或企业计算机的安全性" tabindex="-1"><a class="header-anchor" href="#如何管理个人或企业计算机的安全性" aria-hidden="true">#</a> 如何管理个人或企业计算机的安全性？</h4><p>目前，CASPol 命令行工具是管理安全性的唯一方法。安全策略由两个级别组成：按计算机和按用户。我们计划在 .NET 框架第一版中提供全面的管理工具以及企业策略管理支持。</p><h4 id="基于证据的安全性是如何与-windows-2000-安全性配合工作的" tabindex="-1"><a class="header-anchor" href="#基于证据的安全性是如何与-windows-2000-安全性配合工作的" aria-hidden="true">#</a> 基于证据的安全性是如何与 Windows 2000 安全性配合工作的？</h4><p>基于证据的安全性（基于授权码）能与 Windows 2000 安全性（基于登录身份标识）配合工作。例如，要访问一个文件，托管代码必须具有代码访问安全文件权限，也必须在具有 NTFS 文件访问权限的登录身份标识下运行。.NET 框架中包括的托管库也为基于角色的安全性提供了类。这些都使应用程序能够与 Windows 登录身份标识及用户组配合工作。</p>`,135),r=[t];function d(l,p){return n(),e("div",null,r)}const o=a(i,[["render",d],["__file","netfw3.html.vue"]]);export{o as default};
