import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p="/steven-blogs/assets/sysop7_1-04841c95.png",o={},c=t(`<h1 id="一个监测iis-并定时重新启动的程序" tabindex="-1"><a class="header-anchor" href="#一个监测iis-并定时重新启动的程序" aria-hidden="true">#</a> 一个监测IIS，并定时重新启动的程序</h1><p>前言：我的Win2003 Server的IIS执行Asp老是不正常，长的时候可以用几天，短的时候才几个小时就动不动就超时，被客户骂得半死了。没办法所以写了个服务来检查。这是下策。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ServiceProcess</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WuyinIISControler</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainSrv</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>Timer</span> timer1<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> url <span class="token operator">=</span> <span class="token string">&quot;http://www.5inet.net/checkIIS.asp&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> timeout <span class="token operator">=</span> <span class="token number">6000</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> repeatTime <span class="token operator">=</span> <span class="token number">300000</span><span class="token punctuation">;</span>
        <span class="token class-name">EventLog</span> log <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> Times <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">MainSrv</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 该调用是 Windows.Forms 组件设计器所必需的。</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// TODO: 在 InitComponent 调用后添加任何初始化</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 进程的主入口点</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ServicesToRun<span class="token punctuation">;</span>

            <span class="token comment">// 同一进程中可以运行多个用户服务。若要将</span>
            <span class="token comment">//另一个服务添加到此进程，请更改下行</span>
            <span class="token comment">// 以创建另一个服务对象。例如，</span>
            <span class="token comment">//</span>
            <span class="token comment">//   ServicesToRun = New System.ServiceProcess.ServiceBase[] {new Service1(), new MySecondUserService()};</span>
            <span class="token comment">//</span>
            ServicesToRun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MainSrv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

            System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceBase<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>ServicesToRun<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器 </span>
        <span class="token doc-comment comment">/// 修改此方法的内容。</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>Timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BeginInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// timer1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Interval <span class="token operator">=</span> <span class="token number">300000</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Elapsed <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>ElapsedEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1_Elapsed<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// MainSrv</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> <span class="token string">&quot;WuyinIISControler&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>ISupportInitialize<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">EndInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">/// </span>
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

        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 设置具体的操作，以便服务可以执行它的工作。</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStart</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            log <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span>Log <span class="token operator">=</span> <span class="token string">&quot;Application&quot;</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span>Source <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ServiceName<span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> arg <span class="token keyword">in</span> args<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;/URL:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>url <span class="token operator">=</span> arg<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> arg<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;/TIMEOUT:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>timeout <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">StartsWith</span><span class="token punctuation">(</span><span class="token string">&quot;/REPEATTIME:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>repeatTime <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>arg<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>Convert<span class="token punctuation">.</span><span class="token function">ToChar</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span>
            <span class="token comment">// TODO: 在此处添加代码以启动服务。</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Interval <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>repeatTime<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">CheckIIS</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">RestartIIS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">CheckIIS</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> url<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> b <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>WebResponse</span> wsp <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> msg <span class="token operator">=</span> <span class="token string">&quot;正在执行第&quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Times<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;次检测：\\n检测地址：&quot;</span> <span class="token operator">+</span> url <span class="token operator">+</span> <span class="token string">&quot;\\n超时设置:&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timeout <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;秒\\n检测间隔时间：&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>repeatTime <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;分\\n检测结果：&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>WebRequest</span> wq <span class="token operator">=</span> WebRequest<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
                wq<span class="token punctuation">.</span>Timeout <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timeout<span class="token punctuation">;</span>
                wsp <span class="token operator">=</span> wq<span class="token punctuation">.</span><span class="token function">GetResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>wsp<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    msg <span class="token operator">+=</span> <span class="token string">&quot;正常&quot;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                wsp<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                b <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                msg <span class="token operator">+=</span> <span class="token string">&quot;错误\\n详细内容：&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RestartIIS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;iisreset.exe&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/restart&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span><span class="token string">&quot;正在执行重新启动命令：iisreset.exe /restart&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span><span class="token string">&quot;发生错误：\\n&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 停止此服务。</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// TODO: 在此处添加代码以执行停止服务所需的关闭操作。</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer1_Elapsed</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Timers<span class="token punctuation">.</span>ElapsedEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Times<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">CheckIIS</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">RestartIIS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ===========================</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WuyinIISControler</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// </span>
    <span class="token doc-comment comment">/// ProjectInstaller 的摘要说明。</span>
    <span class="token doc-comment comment">/// </span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">RunInstaller</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProjectInstaller</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install<span class="token punctuation">.</span>Installer</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceProcessInstaller</span> serviceProcessInstaller1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceInstaller</span> serviceInstaller1<span class="token punctuation">;</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">ProjectInstaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 该调用是设计器所必需的。</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何初始化</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">/// </span>
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

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> 组件设计器生成的代码</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
        <span class="token doc-comment comment">/// 此方法的内容。</span>
        <span class="token doc-comment comment">/// </span>
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
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>DisplayName <span class="token operator">=</span> <span class="token string">&quot;无垠IIS控制器&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>ServiceName <span class="token operator">=</span> <span class="token string">&quot;WuyinIISControler&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>StartType <span class="token operator">=</span> System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceStartMode<span class="token punctuation">.</span>Automatic<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">.</span>AfterInstall <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InstallEventHandler</span><span class="token punctuation">(</span>serviceInstaller1_AfterInstall<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// ProjectInstaller</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Installers<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span>Install<span class="token punctuation">.</span>Installer<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
                       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceProcessInstaller1<span class="token punctuation">,</span>
                       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceInstaller1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">serviceInstaller1_AfterInstall</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">InstallEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceController</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ServiceProcess<span class="token punctuation">.</span>ServiceController</span><span class="token punctuation">(</span><span class="token string">&quot;WuyinIISControler&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sc<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;/url:http://www.5inet.net/checkIIS.asp&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/timeout:10&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/repeatTime:5&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sc<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="`+p+'" alt="img_1"></p>',4),e=[c];function u(l,k){return s(),a("div",null,e)}const r=n(o,[["render",u],["__file","sysop7.html.vue"]]);export{r as default};
