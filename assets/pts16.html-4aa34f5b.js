import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="用-net创建windows服务" tabindex="-1"><a class="header-anchor" href="#用-net创建windows服务" aria-hidden="true">#</a> 用.NET创建Windows服务</h1><p>译者说明：我是通过翻译来学习C＃的，文中涉及到的有Visual Studio.NET有关操作，我都根据中文版的VS.NET显示信息来处理的，可以让大家不致有误解。</p><p>我们将研究如何创建一个作为Windows服务的应用程序。内容包含什么是Windows服务，如何创建、安装和调试它们。会用到<code>System.ServiceProcess.ServiceBase</code>命名空间的类。</p><h2 id="什么是windows服务" tabindex="-1"><a class="header-anchor" href="#什么是windows服务" aria-hidden="true">#</a> 什么是Windows服务？</h2><p>Windows服务应用程序是一种<strong>需要长期运行的应用程序</strong>，它对于服务器环境特别适合。它<strong>没有用户界面</strong>，并且也<strong>不会产生任何可视输出</strong>。任何用户消息都会被写进Windows事件日志。<strong>计算机启动时，服务会自动开始运行</strong>。它们不要用户一定登录才运行，它们<strong>能在包括这个系统内的任何用户环境下运行</strong>。通过服务控制管理器，Windows服务是可控的，可以终止、暂停及当需要时启动。</p><p>Windows 服务，以前的NT服务，都是被作为Windows NT操作系统的一部分引进来的。它们在Windows 9x及Windows Me下没有。你需要使用NT级别的操作系统来运行Windows服务，诸如：Windows NT、Windows 2000 Professional或Windows 2000 Server。举例而言，以Windows服务形式的产品有：Microsoft Exchange、SQL Server，还有别的如设置计算机时钟的Windows Time服务。</p><h2 id="创建一个windows服务" tabindex="-1"><a class="header-anchor" href="#创建一个windows服务" aria-hidden="true">#</a> 创建一个Windows服务</h2><p>我们即将创建的这个服务除了演示什么也不做。服务被启动时会把一个条目信息登记到一个数据库当中来指明这个服务已经启动了。在服务运行期间，它会在指定的时间间隔内定期创建一个数据库项目记录。服务停止时会创建最后一条数据库记录。这个服务会自动向Windows应用程序日志当中登记下它成功启动或停止时的记录。</p><p>Visual Studio .NET能够使创建一个Windows服务变成相当简单的一件事情。启动我们的演示服务程序的说明概述如下。</p><ol><li>新建一个项目</li><li>从一个可用的项目模板列表当中选择 &quot;Windows服务&quot;</li><li>设计器会以设计模式打开</li><li>从工具箱的组件表当中拖动一个Timer对象到这个设计表面上 (<strong>注意:</strong> 要确保是从<strong>组件列表</strong>而不是从Windows窗体列表当中Timer)</li><li>设置Timer属性，Enabled属性为False，Interval属性30000毫秒</li><li>切换到代码视图页(按F7或在视图菜单当中选择代码)，然后为这个服务填加功能</li></ol><h3 id="windows服务的构成" tabindex="-1"><a class="header-anchor" href="#windows服务的构成" aria-hidden="true">#</a> Windows服务的构成</h3><p>在你类后面所包含的代码里，你会注意到你所创建的Windows服务扩充了System.ServiceProcess.Service类。所有以.NET方式建立的Windows服务必须扩充这个类。它会要求你的服务重载下面的方法，Visual Studio默认时包括了这些方法。</p><ul><li>Dispose – 清除任何受控和不受控资源(managed and unmanaged resources)</li><li>OnStart – 控制服务启动</li><li>OnStop – 控制服务停止</li></ul><h3 id="数据库表脚本样例" tabindex="-1"><a class="header-anchor" href="#数据库表脚本样例" aria-hidden="true">#</a> 数据库表脚本样例</h3><p>在这个例子中使用的数据库表是使用下面的T-SQL脚本创建的。我选择SQL Server数据库。你可以很容易修改这个例子让它在Access或任何你所选择的别的数据库下运行。</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span>dbo<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>MyServiceLog<span class="token punctuation">]</span>
<span class="token punctuation">(</span>
    <span class="token punctuation">[</span>in_LogId<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">int</span><span class="token punctuation">]</span> <span class="token keyword">IDENTITY</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>vc_Status<span class="token punctuation">]</span> <span class="token punctuation">[</span>nvarchar<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span> <span class="token keyword">COLLATE</span> SQL_Latin1_General_CP1_CI_AS <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span>dt_Created<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">datetime</span><span class="token punctuation">]</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token punctuation">[</span><span class="token keyword">PRIMARY</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="windows服务样例" tabindex="-1"><a class="header-anchor" href="#windows服务样例" aria-hidden="true">#</a> Windows服务样例</h3><p>下面就是我命名为MyService的Windows服务的所有源代码。大多数源代码是由Visual Studio自动生成的。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ServiceProcess</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CodeGuru<span class="token punctuation">.</span>MyWindowsService</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>Timer</span> timer1<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Required designer variable.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>remarks</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">MyService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// This call is required by the Windows.Forms</span>
            <span class="token comment">// Component Designer.</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// The main entry point for the process</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ServicesToRun<span class="token punctuation">;</span>

            ServicesToRun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
            <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

            System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>ServicesToRun<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify </span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>Timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span>
            <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BeginInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// timer1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Interval <span class="token operator">=</span> <span class="token number">30000</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Elapsed <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>ElapsedEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1_Elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// MyService</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> <span class="token string">&quot;My Sample Service&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span>
            <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">EndInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Clean up any resources being used.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
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

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStart</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">LogMessage</span><span class="token punctuation">(</span><span class="token string">&quot;Service Started&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">LogMessage</span><span class="token punctuation">(</span><span class="token string">&quot;Service Stopped&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/*
        * Respond to the Elapsed event of the timer control
        */</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer1_Elapsed</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>ElapsedEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">LogMessage</span><span class="token punctuation">(</span><span class="token string">&quot;Service Running&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/*
        * Log specified message to database
        */</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LogMessage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Message<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">SqlConnection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">SqlCommand</span> command <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                connection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span>
                    <span class="token string">&quot;Server=localhost;Database=SampleDatabase;Integrated Security=false;User Id=sa;Password=;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                command <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span>
                    <span class="token string">&quot;INSERT INTO MyServiceLog (vc_Status, dt_Created) VALUES (&#39;&quot;</span> <span class="token operator">+</span> Message <span class="token operator">+</span> <span class="token string">&quot;&#39;,getdate())&quot;</span><span class="token punctuation">,</span> connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> numrows <span class="token operator">=</span> command<span class="token punctuation">.</span><span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                command<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                connection<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="安装windows服务" tabindex="-1"><a class="header-anchor" href="#安装windows服务" aria-hidden="true">#</a> 安装Windows服务</h2><p>Windows服务不同于普通Windows应用程序。不可能简简单单地通过运行一个EXE就启动Windows服务了。安装一个Windows服务应该通过使用.NET Framework提供的InstallUtil.exe来完成，或者通过诸如一个Microsoft Installer (MSI)这样的文件部署项目完成。</p><h3 id="添加-服务安装程序" tabindex="-1"><a class="header-anchor" href="#添加-服务安装程序" aria-hidden="true">#</a> 添加“服务安装程序”</h3><p>创建一个Windows服务，仅用InstallUtil程序去安装这个服务是不够的。你必须还要把一个服务安装程序添加到你的Windows服务当中，这样便于InstallUtil或是任何别的安装程序知道应用你服务的是怎样的配置设置。</p><ol><li>将这个服务程序切换到设计视图</li><li>右击设计视图选择“添加安装程序”</li><li>切换到刚被添加的<code>ProjectInstaller</code>的设计视图,增加了<code>serviceInstaller1</code>组件和<code>serviceProcessInstaller1</code>组件</li><li>设置<code>serviceInstaller1</code>组件的属性：<br><code>1) ServiceName = My Sample Service</code><br><code>2) StartType = Automatic</code></li><li>设置serviceProcessInstaller1组件的属性<br><code>1) Account = LocalSystem</code></li><li>生成解决方案</li></ol><p>在完成上面的几个步骤之后，</p><p>会自动由Visual Studio产生下面的源代码，它包含于<code>ProjectInstaller.cs</code>这个源文件内。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CodeGuru<span class="token punctuation">.</span>MyWindowsService</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for ProjectInstaller.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token punctuation">[</span><span class="token function">RunInstaller</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProjectInstaller</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install<span class="token punctuation">.</span>Installer</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceProcessInstaller</span> serviceProcessInstaller1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceInstaller</span> serviceInstaller1<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required designer variable.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">ProjectInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// This call is required by the Designer.</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// TODO: Add any initialization after the InitComponent call</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Component Designer generated code</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceProcessInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// serviceProcessInstaller1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1<span class="token punctuation">.</span>Account <span class="token operator">=</span> System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceAccount<span class="token punctuation">.</span>LocalSystem<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1<span class="token punctuation">.</span>Password <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1<span class="token punctuation">.</span>Username <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// serviceInstaller1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> <span class="token string">&quot;My Sample Service&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>StartType <span class="token operator">=</span> System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceStartMode<span class="token punctuation">.</span>Automatic<span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// ProjectInstaller</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Installers<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install<span class="token punctuation">.</span>Installer<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
                <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="用installutil安装windows服务" tabindex="-1"><a class="header-anchor" href="#用installutil安装windows服务" aria-hidden="true">#</a> 用InstallUtil安装Windows服务</h3><p>现在这个服务已经生成，你需要把它安装好才能使用。下面操作会指导你安装你的新服务。</p><ol><li>打开Visual Studio .NET命令提示</li><li>改变路径到你项目所在的bin\\Debug文件夹位置(如果你以Release模式编译则在bin\\Release文件夹)</li><li>执行命令“InstallUtil.exe MyService.exe”注册这个服务，使它建立一个合适的注册项。</li><li>右击桌面上“我的电脑”，选择“管理”就可以打计算机管理控制台</li><li>在“服务和应用程序”里面的“服务”部分里，你可以发现你的Windows服务已经包含在服务列表当中了</li><li>右击你的服务选择启动就可以启动你的服务了</li></ol><p>在每次需要修改Windows服务时，这就会要求你卸载和重新安装这个服务。不过要注意在卸载这个服务前，最好确保服务管理控制台已经关闭，这会是一个很好的习惯。如果没有这样操作的话，你可能在卸载和重安装Windows服务时会遇到麻烦。仅卸载服务的话，可以执行相的InstallUtil命令用于注销服务，不过要在后面加一个/u命令开关。</p><h3 id="调试windows服务" tabindex="-1"><a class="header-anchor" href="#调试windows服务" aria-hidden="true">#</a> 调试Windows服务</h3><p>从另外的角度度看，调试Windows服务绝不同于一个普通的应用程序。调试Windows服务要求的步骤更多。服务不能象你对普通应用程序做的那样，只要简单地在开发环境下执行就可以调试了。</p><p>服务必须首先被安装和启动，这一点在前面部分我们已经做到了。为了便于跟踪调试代码，一旦服务被启动，你就要用Visual Studio把运行的进程附加进来(attach)。</p><p>记住，对你的Windows服务做的任何修改都要对这个服务进行卸载和重安装。</p><h3 id="附加正在运行的windows服务" tabindex="-1"><a class="header-anchor" href="#附加正在运行的windows服务" aria-hidden="true">#</a> 附加正在运行的Windows服务</h3><p>为了调试程序，有些附加Windows服务的操作说明。这些操作假定你已经安装了这个Windows服务并且它正在运行。</p><ol><li>用Visual Studio装载这个项目</li><li>点击“调试”\\“进程”菜单</li><li>.</li><li>确保 显示系统进程 被选</li><li>在 可用进程 列表中，把进程定位于你的可执行文件名称上点击选中它</li><li>点击 附加 按钮</li><li>点击 确定</li><li>点击 关闭</li><li>在timer1_Elapsed方法里设置一个断点，然后等它执行</li></ol><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>现在你应该对Windows服务是什么，以及如何创建、安装和调试它们有一个粗略的认识了。Windows服务的额处的功能你可以自行研究。这些功能包括暂停(OnPause)和恢复(OnContinue)的能力。暂停和恢复的能力在默认情况下没有被启用，要通过Windows服务属性来设置。</p><h2 id="about-the-author" tabindex="-1"><a class="header-anchor" href="#about-the-author" aria-hidden="true">#</a> About the Author</h2><p>Mark Strawmyer, MCSD, MCSE (NT4/W2K), MCDBA is a Senior Architect of .NET applications for large and mid-size organizations. Mark is a technology leader with Crowe Chizek in Indianapolis, Indiana. He specializes in architecture, design and development of Microsoft-based solutions. You can reach Mark at mstrawmyer@crowechizek.com.</p>`,42),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","pts16.html.vue"]]);export{k as default};
