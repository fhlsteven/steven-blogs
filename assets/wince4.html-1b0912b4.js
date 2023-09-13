import{_ as e,o as t,c as d,a as i}from"./app-477de5b2.js";const a={},r=i('<h1 id="ce操作系统的基本体系结构" tabindex="-1"><a class="header-anchor" href="#ce操作系统的基本体系结构" aria-hidden="true">#</a> CE操作系统的基本体系结构</h1><blockquote><p>DEVEN - PDASKY - 2003-4-16</p></blockquote><p>Windows CE 是由许多离散模块构成的，每一模块都提供特定的功能。这些模块中的一部分被划分成组件。组件使 Windows CE 变得非常紧凑（只占不到 200 KB 的 RAM），因此只占用了运行设备所需的最小的ROM、RAM 以及其它硬件资源。</p><p>Windows CE 包含提供操作系统最关键功能的 4 个模块：内核模块；对象存储模块；图形、窗口和事件子系统 （GWES） 模块以及通信模块。Windows CE 还包含一些附加的可选择模块，这些模块可支持的任务有管理可安装设备驱动程序、支持 COM 等。</p><h2 id="内核" tabindex="-1"><a class="header-anchor" href="#内核" aria-hidden="true">#</a> 内核</h2><p>内核是 OS 的核心，通过 <strong>Coredll</strong> 模块表示。它提供在所有设备中都出现的基本操作系统功能。内核负责内存管理、进程管理以及特定文件管理等功能。它还管理虚拟内存、调度、多重任务处理以及例外处理等。</p><p>Windows CE 的任何配置都需要用到 Coredll 模块的大多数组件。有一些内核组件是可选的，只有在涉及系统功能操作时，才需要这些组件，例如电话技术、多媒体技术以及图形设备接口（GDI） 技术等。</p><h2 id="对象存储" tabindex="-1"><a class="header-anchor" href="#对象存储" aria-hidden="true">#</a> 对象存储</h2><p>Filesys 模块支持Windows CE 对象存储 API 函数。对象存储所支持的永久性存储器的类型如下表所示。</p><table><thead><tr><th>存储器类型</th><th>说明</th></tr></thead><tbody><tr><td>文件系统</td><td>包含应用程序和数据文件</td></tr><tr><td>系统注册表</td><td>存储应用程序必须快速访问的系统配置信息以及其它任何信息</td></tr><tr><td>Windows CE 数据库</td><td>提供结构化存储</td></tr></tbody></table><p>对象存储可将用户数据和应用程序数据存入文件或注册器。在操作系统构造进程（该进程中只包括那些必需选项）的过程中，对于这些不同的对象存储组件，可以选取，也可以忽略。</p><h2 id="gwes" tabindex="-1"><a class="header-anchor" href="#gwes" aria-hidden="true">#</a> GWES</h2><p>GWES 是用户、应用程序和 OS 之间的图形用户接口。GWES 通过处理键盘、笔针动作来接受用户输入，并选择传送到应用程序和OS 的信息。GWES 通过创建并管理在显示设备和打印机上显示的窗口、图形以及文本来处理输出。</p><p>GWES 的中心是窗口。所有应用程序都需要窗口以接收来自 OS 的消息，即使那些为缺少图形显示的设备创建的应用程序也是如此。GWES 提供控制器、菜单、对话框以及图形显示的设备资源，还提供 GDI 以控制文本与图形显示。</p><h2 id="通信" tabindex="-1"><a class="header-anchor" href="#通信" aria-hidden="true">#</a> 通信</h2><p>通信组件提供对下列通信硬件和数据协议的支持：</p><ul><li>串行 I/O 支持</li><li>远程访问服务（RAS）</li><li>传输控制协议/ Internet 协议 (TCP/IP)</li><li>局域网 （LAN）</li><li>电话技术 API （TAPI）</li><li>Windows CE 的无线服务</li></ul><h2 id="可选组件" tabindex="-1"><a class="header-anchor" href="#可选组件" aria-hidden="true">#</a> 可选组件</h2><p>除上述主要模块之外，还可使用其它的操作系统模块。这些模块与组件主要有：</p><ul><li>设备管理器和设备驱动程序</li><li>多媒体（声音）支持模块</li><li>COM 支持模块</li><li>Windows CE 外壳模块</li></ul><p>Windows CE 提供的每一模块或组件都支持一组可用的相关 API 函数。</p>',21),l=[r];function h(n,o){return t(),d("div",null,l)}const c=e(a,[["render",h],["__file","wince4.html.vue"]]);export{c as default};
