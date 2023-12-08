import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p="/steven-blogs/assets/sysinfo5_1-078ecd44.png",o="/steven-blogs/assets/sysinfo5_2-1381f70e.png",e="/steven-blogs/assets/sysinfo5_3-ee662c08.png",c={},u=t('<h1 id="vsiaul-c-如何读取注册信息" tabindex="-1"><a class="header-anchor" href="#vsiaul-c-如何读取注册信息" aria-hidden="true">#</a> Vsiaul C＃如何读取注册信息</h1><blockquote><p>（王天　2001年11月26日 13:47）</p></blockquote><p>从视窗95开始，微软公司就在视窗系统中引入了注册表这个概念。注册表到底是什么东东呢？它是视窗系统的一个核心的数据库，在这个数据库中存放中与系统相关的各种参数，这些参数直接控制中系统的启动、硬件的驱动程序安装信息以及在视窗系统上运行的各种应用程序的注册信息等。这就意味着，如果注册表因为某些原因受到了破坏，轻者是视窗系统启动过程出现异常，重者就有可能导致整个系统的完全瘫痪。所以正确的认识注册表，及时的备份注册表，对于视窗用户就显得相当重要。</p><p>Vsiaul C#就可以十分方便、简洁的开发出操作注册表的程序。本文就是介绍如何利用VisualC#来读取注册表中的信息。</p><h2 id="一-初步认识注册表" tabindex="-1"><a class="header-anchor" href="#一-初步认识注册表" aria-hidden="true">#</a> 一．初步认识注册表</h2><p>单击&quot;开始/运行&quot;，在&quot;打开&quot;的后面填入&quot;regedit&quot;。就可以看到注册表的数据结构了。如下图。注：Regedit文件是微软公司提供给用户编辑注册表的一个工具。</p><p><img src="'+p+`" alt="img_1"><br> 点击小图放大，图01：注册表结构图示</p><p>如上图左边的部分在注册表中称为&quot;主键&quot;，据图可见，&quot;主键&quot;是有层次结构的。主键的下一级主键称为该主键的&quot;子键&quot;。每一个主键可以对拥有多个子键。如图所示，右边的这些值就是所谓的键值了。每一个主键或者子键都可以拥有多个键值。注册表是一个庞大的数据库，在其中每一个主键，每一个键值都赋予了不同的功能。</p><h2 id="二-visual-c-如何读取注册表中的主键和键值" tabindex="-1"><a class="header-anchor" href="#二-visual-c-如何读取注册表中的主键和键值" aria-hidden="true">#</a> 二．Visual C#如何读取注册表中的主键和键值</h2><p>在.Net FrameWork SDK Beta 2版中，有一个Microsoft.Win32的名称空间，在此名称空间中提供了二个用于注册表操作的类：Registry类、RegistryKey类。这二个类都是封闭类，不可以继承。在这二个类，定义了许多关于注册表的方法和属性，通过调用这二个类，在Visual C#中就可以比较轻松的处理关于注册表的各种操作了。</p><h3 id="_1-registry类" tabindex="-1"><a class="header-anchor" href="#_1-registry类" aria-hidden="true">#</a> （1）.Registry类</h3><p>此类主要封装了七个公有的静态域，而这些静态域分别代表这视窗注册表中的七个基本的主键，具体如下所示：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Registry.ClassesRoot 对应于HKEY_CLASSES_ROOT主键
Registry.CurrentUser 对应于HKEY_CURRENT_USER主键
Registry.LocalMachine 对应于 HKEY_LOCAL_MACHINE主键
Registry.User 对应于 HKEY_USER主键
Registry.CurrentConfig 对应于HEKY_CURRENT_CONFIG主键
Registry.DynDa 对应于HKEY_DYN_DATA主键
Registry.PerformanceData 对应于HKEY_PERFORMANCE_DATA主键
</code></pre></div><h3 id="_2-registrykey类" tabindex="-1"><a class="header-anchor" href="#_2-registrykey类" aria-hidden="true">#</a> （2）.RegistryKey类</h3><p>此类中主要封装了对视窗系统注册表的基本操作。在程序设计中，首先通过Registry类找到注册表中的基本主键，然后通过RegistryKey类，来找其下面的子键和处理具体的操作的。</p><h2 id="三-通过一个读取注册表信息例子来具体说明这二个来的用法" tabindex="-1"><a class="header-anchor" href="#三-通过一个读取注册表信息例子来具体说明这二个来的用法" aria-hidden="true">#</a> 三．通过一个读取注册表信息例子来具体说明这二个来的用法</h2><h3 id="_1-程序设计和运行的环境" tabindex="-1"><a class="header-anchor" href="#_1-程序设计和运行的环境" aria-hidden="true">#</a> （1）.程序设计和运行的环境</h3><p>I视窗系统2000服务器版<br> II Net FrameWork SDK Beta 2版</p><h3 id="_2-在运行程序前的一些必要的处理工作" tabindex="-1"><a class="header-anchor" href="#_2-在运行程序前的一些必要的处理工作" aria-hidden="true">#</a> （2）在运行程序前的一些必要的处理工作</h3><p>在程序设计时，主要功能是读取已经存在的主键键值，用户可以按照下图所示的结构新建若干个主键和对应的键值：</p><p><img src="`+o+'" alt="img_2"><br> 点击小图放大，图02：程序设计中要读取的注册表的信息</p><p>这里有必要说明的是上图只显示了&quot;新项 ＃3&quot;子键对应的键值。在&quot;新项 ＃2&quot;子键也有键值，对应的键值是：&quot;新值＃1&quot;为&quot;001&quot;，&quot;新值 ＃2&quot;为&quot;002&quot;。在&quot;新项 ＃1&quot;子键中对应的键值是：&quot;新值 ＃1&quot;为&quot;aaa&quot;，&quot;新值 ＃2&quot;为&quot;bbb&quot;。</p><h3 id="_3-程序的主要功能" tabindex="-1"><a class="header-anchor" href="#_3-程序的主要功能" aria-hidden="true">#</a> （3）.程序的主要功能</h3><p>程序的主要功能是读取指定主键下面的所有子键和子键拥有的键值，并以列表的形式按层次显示出来，下图是本程序运行后界面：</p><p><img src="'+e+`" alt="img_3"><br> 点击小图放大，图03：读取注册表信息并以列表形式显示出来</p><h3 id="_4-程序设计过程中的重要步骤以及应该注意的一些问题" tabindex="-1"><a class="header-anchor" href="#_4-程序设计过程中的重要步骤以及应该注意的一些问题" aria-hidden="true">#</a> （4）.程序设计过程中的重要步骤以及应该注意的一些问题</h3><p>I 程序中读取主键、子键和键值所使用到的方法：</p><p>程序中为了读取指定主键下面的子键和子键中拥有的键值，主要使用了RegistryKey类中的四个方法：OpenSubKey，GetSubKeyNames，GetValueNames，GetValue。具体的用法和意思如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>OpenSubKey(string name)方法主要是打开指定的子键。
GetSubKeyNames()方法是获得主键下面的所有子键的名称，它的返回值是一个字符串数组。
GetValueNames()方法是获得当前子键中的所有的键名称，它的返回值也是一个字符串数组。
GetValue(string name)方法是指定键的键值。
</code></pre></div><p>程序中具体的使用语句如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
<span class="token comment">// 打开&quot;SYSTEM&quot;子键</span>
<span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SYSTEM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 打开&quot;001&quot;子键</span>
<span class="token class-name">RegistryKey</span> no1 <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 打开&quot;002&quot;子键</span>
<span class="token class-name">RegistryKey</span> no2 <span class="token operator">=</span> no1<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;002&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>其中listBox1是程序中定义了的列表名称。</p><p>II 如何用列表形式显示注册信息：</p><p>由于<code>GetSubKeyNames()</code>方法和<code>GetValueNames()</code>方法的返回值是字符串数组，所以在程序中是通过<code>foreach</code>语句实现遍历这些字符串数组的。并且在遍历的时候，就通过列表形式显示出来，程序中具体实现语句如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> site <span class="token keyword">in</span> no2<span class="token punctuation">.</span><span class="token function">GetSubKeyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//开始遍历由子键名称组成的字符串数组</span>
<span class="token punctuation">{</span>
    listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token comment">//在列表中加入子键名称</span>
    <span class="token class-name">RegistryKey</span> sitekey <span class="token operator">=</span> no2<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token comment">//打开此子键</span>
    <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sValName <span class="token keyword">in</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValueNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">//开始遍历由指定子键拥有的键值名称组成的字符串数组</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> <span class="token operator">+</span> sValName <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span>sValName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//在列表中加入键名称和对应的键值</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_5-源程序代码" tabindex="-1"><a class="header-anchor" href="#_5-源程序代码" aria-hidden="true">#</a> （5）.源程序代码</h3><p>通过以上的论述，我们可以得到程序的源程序代码，具体如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ListBox</span> listBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button1<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//清除在程序中使用过的资源</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//初始化程序中使用到的组件</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>components <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>listBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">320</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;读取注册表&quot;</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
        listBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">496</span><span class="token punctuation">,</span> <span class="token number">264</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;读取主测表信息&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">528</span><span class="token punctuation">,</span> <span class="token number">357</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;SYSTEM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打开&quot;SYSTEM&quot;子键</span>
        <span class="token class-name">RegistryKey</span> no1 <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;001&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打开&quot;001&quot;子键</span>
        <span class="token class-name">RegistryKey</span> no2 <span class="token operator">=</span> no1<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;002&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打开&quot;002&quot;子键</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> site <span class="token keyword">in</span> no2<span class="token punctuation">.</span><span class="token function">GetSubKeyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token comment">//开始遍历由子键名称组成的字符串数组</span>
        <span class="token punctuation">{</span>
            listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//在列表中加入子键名称</span>
            <span class="token class-name">RegistryKey</span> sitekey <span class="token operator">=</span> no2<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//打开此子键</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sValName <span class="token keyword">in</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValueNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">//开始遍历由指定子键拥有的键值名称组成的字符串数组</span>
            <span class="token punctuation">{</span>
                listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> <span class="token operator">+</span> sValName <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span>sValName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//在列表中加入键名称和对应的键值</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="四-总结" tabindex="-1"><a class="header-anchor" href="#四-总结" aria-hidden="true">#</a> 四．总结</h2><p>用Visual C#来读取注册表中的注册信息是通过名称空间Micorsoft.Win32中的二个类来实现的。在这二个类中还定义了对注册表信息的删除、修改和重命名的一些方法。这些方法比起本文介绍的读取方法、打开方法来说，更具有破坏性，但也更实用。对应这些方法的介绍将在以后的文章中进行。</p><p>通过以上的介绍，我们发现用Visual C#来处理注册表，其实是一件比较轻松而简单的事情。事情虽然是轻松的，但我也要提醒各位，由于注册表在视窗系统中的重要作用，所以在每一次对注册表进行操作之前，一定要备份，在操作的时候也要非常小心，因为你的每一次的误操作都可能导致你的系统崩溃。</p><blockquote><p>（责任编辑 尤北 lvye@staff.ccidnet.com）</p></blockquote>`,42),l=[u];function i(k,r){return s(),a("div",null,l)}const m=n(c,[["render",i],["__file","sysinfo5.html.vue"]]);export{m as default};