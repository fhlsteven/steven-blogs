import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="利用c-重启远程计算机" tabindex="-1"><a class="header-anchor" href="#利用c-重启远程计算机" aria-hidden="true">#</a> 利用C＃重启远程计算机</h1><blockquote><p>马金虎 未知 2002-04-27</p></blockquote><p>如果叫你实现远程启动别人的计算机，你首先想到的可能是先做一个在远程计算机上面运行客户端程序，然后在本地计算机上面再做一个服务器端程序，通过这二个程序直接的通讯实现重启远程计算机。这当然是一个方法。但这未免有点麻烦。如果现在只告诉你远程计算机的管理者的登陆帐号，而并不允许你在远程的计算机上面运行一个所谓的客户端程序，让你通过程序来完成重启远程计算机。不知道你是否感觉有些困难了。其实按照上面的这些条件实现重启远程计算机，利用C＃可以比较方便的完成。下面就来介绍一下具体的实现方法。</p><h2 id="一-c-重启远程计算机的一些理论知识" tabindex="-1"><a class="header-anchor" href="#一-c-重启远程计算机的一些理论知识" aria-hidden="true">#</a> 一． C＃重启远程计算机的一些理论知识</h2><p>C＃实现启动远程计算机的原理是&quot;视窗管理规范&quot;。就是所谓的&quot;WMI&quot;（Windows Management Instrumentation）。Windows 管理规范 (WMI) 支持通过 Internet 管理系统的结构。通过提供管理环境的一致观察，WMI 为用户提供通用访问管理信息。该管理的一致性使您能够管理整个系统，而不只是组件。从 Microsoft MSDN上，您可以获得有关 WMI 软件开发工具包 (SDK) 的详细信息。</p><p>WMI（Windows 管理规范）支持有限的安全格式，允许用户在本地计算机或远程计算机上连接 WMI 之前要验证每个用户。这种安全性是操作系统已有的安全顶端的另一层。WMI 不覆盖或破坏由操作系统提供的任何现有的安全性。在默认情况下，管理员组的所有成员都可以完全控制它管理的计算机上的 WMI 服务。其他所有用户在其本地计算机上只有读取/写入/执行的权限。可以通过向被管理的计算机上的管理员组添加用户，或者在 WMI 中授权用户或组并设置权限级别来更改权限。访问基于 WMI 名称空间。在一般情况下，脚本程序的默认命名空间是&quot;root\\cimv2&quot;。</p><p>在WMI中有着许多足以令我们感觉惊奇的功能。重启远程计算机只是一个很小的功能。在程序中使用WMI可以编写出许多远程管理类型的应用程序。由于在.Net FrameWork SDK中提供了可以直接操作WMI的名称空间，所以C＃就可以利用在这些名称空间中定义了的类来充分使用WMI控制给我们带来的各种方便。</p><h2 id="二-程序设计和运行的环境设置" tabindex="-1"><a class="header-anchor" href="#二-程序设计和运行的环境设置" aria-hidden="true">#</a> 二．程序设计和运行的环境设置</h2><p>（1）.视窗2000服务器版<br> （2）. .Net FrameWork SDK Beta 2<br> （3）.远程计算机的管理者帐号</p><p>以上这些不仅是本地计算机配置，还是远程计算机的配置。</p><h2 id="三-实现重启远程计算机所使用到在-net-framework-sdk-beta-2用以操作wmi名称空间和类" tabindex="-1"><a class="header-anchor" href="#三-实现重启远程计算机所使用到在-net-framework-sdk-beta-2用以操作wmi名称空间和类" aria-hidden="true">#</a> 三．实现重启远程计算机所使用到在.Net FrameWork SDK Beta 2用以操作WMI名称空间和类</h2><p>在.Net FrameWork SDK Beta 2中用来操作WMI的名称空间主要是&quot;System.Management&quot;。要实现重启远程计算机所使用到的类主要有六个：</p><ul><li>&quot;ConnectionOptions&quot;类主要定义远程计算机的管理员帐号；</li><li>&quot;ManagementScope&quot;主要是以给定的管理员帐号连接给定计算机名或者IP地址的计算机；</li><li>&quot;ObjectQuery&quot;类功能是定义对远程计算机要实现那些地远程操作；</li><li>&quot;ManagementObjectSearcher&quot;类从已经完成远程连接的计算机中，得到有那些WMI操作；</li><li>&quot;ManagementObjectCollection&quot;类存放得到WMI操作；</li><li>&quot;ManagementObject&quot;类调用远程计算机可进行WMI操作。</li></ul><p>在本文介绍的操作就是重启操作。</p><h2 id="四-c-重启远程计算机的重要步骤和实现方法" tabindex="-1"><a class="header-anchor" href="#四-c-重启远程计算机的重要步骤和实现方法" aria-hidden="true">#</a> 四．C＃重启远程计算机的重要步骤和实现方法</h2><p>（1）.连接远程计算机：</p><p>按照下列语句可以实现连接远程计算机：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">ConnectionOptions</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConnectionOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
options<span class="token punctuation">.</span>Username <span class="token operator">=</span> <span class="token string">&quot;管理者帐号用户名&quot;</span><span class="token punctuation">;</span>
options<span class="token punctuation">.</span>Password <span class="token operator">=</span> <span class="token string">&quot;管理者帐号口令&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">ManagementScope</span> scope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementScope</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\\\\\&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;远程计算机名或IP地址&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;\\\\root\\\\cimv2&quot;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//用给定管理者用户名和口令连接远程的计算机 </span>
scope<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（2）.得到在远程计算机中可以进行WMI控制：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">System<span class="token punctuation">.</span>Management<span class="token punctuation">.</span>ObjectQuery</span> oq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Management<span class="token punctuation">.</span>ObjectQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM Win32_OperatingSystem&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ManagementObjectSearcher</span> query1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementObjectSearcher</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> oq<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//得到WMI控制 </span>
<span class="token class-name">ManagementObjectCollection</span> queryCollection1 <span class="token operator">=</span> query1<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（3）.调用WMI控制，实现重启远程计算机：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> queryCollection1<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> ss <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">//重启远程计算机 </span>
    mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;Reboot&quot;</span><span class="token punctuation">,</span> ss<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="五-c-实现重启远程计算机的源程序代码-boot-cs-和执行界面" tabindex="-1"><a class="header-anchor" href="#五-c-实现重启远程计算机的源程序代码-boot-cs-和执行界面" aria-hidden="true">#</a> 五．C＃实现重启远程计算机的源程序代码（boot.cs）和执行界面</h2><p>在了解了C＃实现重启远程计算机的这些重要步骤后，就可以从容的得到重启远程计算机的完整代码，具体如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Management</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">TextBox</span> textBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">TextBox</span> textBox2<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">TextBox</span> textBox3<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Label</span> label1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Label</span> label2<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Label</span> label3<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//初始化窗体中的各个组件 </span>
        <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//清除程序中使用过的资源 </span>
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

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">140</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
        textBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">172</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

        textBox2<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">138</span><span class="token punctuation">,</span> <span class="token number">85</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox2<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox2&quot;</span><span class="token punctuation">;</span>
        textBox2<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">174</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox2<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        textBox2<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

        textBox3<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">139</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox3<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox3&quot;</span><span class="token punctuation">;</span>
        textBox3<span class="token punctuation">.</span>PasswordChar <span class="token operator">=</span> <span class="token char">&#39;*&#39;</span><span class="token punctuation">;</span>
        textBox3<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">173</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox3<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        textBox3<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

        label1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label1&quot;</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;机器名称或IP地址：&quot;</span><span class="token punctuation">;</span>

        label2<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">37</span><span class="token punctuation">,</span> <span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label2<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label2&quot;</span><span class="token punctuation">;</span>
        label2<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        label2<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;管理者名称：&quot;</span><span class="token punctuation">;</span>
        label2<span class="token punctuation">.</span>TextAlign <span class="token operator">=</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>ContentAlignment<span class="token punctuation">.</span>TopRight<span class="token punctuation">;</span>

        label3<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">37</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label3<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label3&quot;</span><span class="token punctuation">;</span>
        label3<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label3<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        label3<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;管理者密码：&quot;</span><span class="token punctuation">;</span>
        label3<span class="token punctuation">.</span>TextAlign <span class="token operator">=</span> System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>ContentAlignment<span class="token punctuation">.</span>TopRight<span class="token punctuation">;</span>

        button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">168</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">136</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;重新启动远程计算机&quot;</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">336</span><span class="token punctuation">,</span> <span class="token number">245</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>textBox2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>textBox3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>label1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>label2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>label3<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;利用C＃重新启动远程计算机&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//定义连接远程计算机的一些选项 </span>
        <span class="token class-name">ConnectionOptions</span> options <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConnectionOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        options<span class="token punctuation">.</span>Username <span class="token operator">=</span> textBox2<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
        options<span class="token punctuation">.</span>Password <span class="token operator">=</span> textBox3<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
        <span class="token class-name">ManagementScope</span> scope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementScope</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\\\\\&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;\\\\root\\\\cimv2&quot;</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//用给定管理者用户名和口令连接远程的计算机 </span>
            scope<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Management<span class="token punctuation">.</span>ObjectQuery</span> oq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Management<span class="token punctuation">.</span>ObjectQuery</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM Win32_OperatingSystem&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementObjectSearcher</span> query1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementObjectSearcher</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> oq<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//得到WMI控制 </span>
            <span class="token class-name">ManagementObjectCollection</span> queryCollection1 <span class="token operator">=</span> query1<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> queryCollection1<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> ss <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
                <span class="token comment">//重启远程计算机 </span>
                mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;Reboot&quot;</span><span class="token punctuation">,</span> ss<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//报错 </span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ee<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;连接&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;出错，出错信息为：&quot;</span> <span class="token operator">+</span> ee<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下图是编译上面代码后得到的程序运行界面：</p><p>图01：用C＃实现重启远程计算机的程序运行界面</p><h2 id="六-总结" tabindex="-1"><a class="header-anchor" href="#六-总结" aria-hidden="true">#</a> 六．总结</h2><p>其实WMI控制可以实现很多以前让我们很头痛的操作。并且使用WMI编写的管理程序也比不用WMI来实现同样功能的程序在设计难度上大大减轻。WMI内容十分丰富，重新启动远程计算机只是其中的一个最为基本的操作。在使用WMI控制之前有一点必须记住，就是你必须知道你所要进行操作的远程计算机的超级管理者的帐号，这是使用WMI的一个前提。</p>`,29),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysop11.html.vue"]]);export{i as default};