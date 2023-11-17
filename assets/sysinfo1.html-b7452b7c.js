import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="用visual-c-来创建、修改注册表" tabindex="-1"><a class="header-anchor" href="#用visual-c-来创建、修改注册表" aria-hidden="true">#</a> 用Visual C＃来创建、修改注册表</h1><blockquote><p>源作者：王天 人气：3989</p></blockquote><p>在本篇文章中我们就来介绍Visual C#注册表编程的另外二个重要的操作：创建注册信息和修改注册信息。</p><p>在上二篇文章中，我们已经知道，由于Visual C#本身没有类库，他是通过.Net框架中的.Net FrameWork SDK（软件开发包）定义的一些类来实现对注册表的操作。这就是名称空间Microsoft.Win32中封装的二个类：Registry类、RegistryKey类。在RegistryKey类中定义了二个方法用来创建注册表中的主键、子键和键值。他们是CreateSubValue ( )方法和SetValue ( )方法。那么如何用Visual C#来修改注册信息，在本文中，我们只是介绍了修改注册表中的键值的方法。而对于主键和子键，由于.Net FrameWork SDK中还没有定义这方面的方法，所以还无法完成安全的修改注册表中的信息。下面就先介绍如何用Visual C#来创建注册信息。</p><h2 id="一-visual-c-创建和修改注册信息要调用的二个方法" tabindex="-1"><a class="header-anchor" href="#一-visual-c-创建和修改注册信息要调用的二个方法" aria-hidden="true">#</a> 一．Visual C#创建和修改注册信息要调用的二个方法</h2><p>（1）<code>.CreateSubKey(String key)</code>方法：此方法是创建以后面的字符串为名称的子键。当然这种方法不仅能够创建子键，在下面介绍的程序中，也通过此种方法来创建一个主键。<br> （2）<code>.SetValue(String name, String keyvalue)</code>方法：此方法的作用有二点，一种可以用来重命名键值的数值，一种可以用来创建新的键值。具体情况如下：当打开的子键中，如果存在此键值，就把新值赋给他，实现重命名操作。如果不存在，则创建一个新的键值。</p><h2 id="二-程序设计和运行环境以及要准备的工作" tabindex="-1"><a class="header-anchor" href="#二-程序设计和运行环境以及要准备的工作" aria-hidden="true">#</a> 二．程序设计和运行环境以及要准备的工作</h2><p>I&gt;视窗系统2000服务器版<br> II&gt;.Net FrameWork SDK Beta 2版<br> III&gt;由于在程序中，要修改一个已经存在的键值，所以就要预先设置好键值所在的位置。打开注册表的编辑器，在&quot;HKEY_LOCAL_MACHINE&quot;主键下面的&quot;HARDWARE&quot;子键下面创建&quot;aaa&quot;子键并在此子键下面创建一个名称为&quot;bbb&quot;的键值。</p><h2 id="三-程序的主要功能以及设计的重要步骤" tabindex="-1"><a class="header-anchor" href="#三-程序的主要功能以及设计的重要步骤" aria-hidden="true">#</a> 三．程序的主要功能以及设计的重要步骤</h2><p>在下面介绍的程序中，主要的功能是用Visual C#在注册表中创建一个主键、一个子键和修改一个指定的键值。其中要创建的子键的结构层次是在主键&quot;HKEY_LOCAL_MACHIN&quot;下面的&quot;HAREWARE&quot;主键下，名称为&quot;ddd&quot;，其中包含一个键值，名称为&quot;www&quot;，键值的值为&quot;1234&quot;。</p><p>其中的要创建的主键的结构层次也是在主键&quot;HKEY_LOCAL_MACHIN&quot;下面的&quot;HAREWARE&quot;主键下，名称为&quot;main&quot;，在此主键下面包含一个名称为&quot;sub&quot;的子键和名称为&quot;value&quot;键值，键值的值为&quot;1234&quot;。下面就来着重介绍Visual C#是如何创建和修改这些主键、子键和键值的。</p><p>（1）.如何创建一个子键，在程序中是结合<code>CreateSubKey()</code>方法和<code>SetValue()</code>方法来实现的，以下是程序中创建子键的源程序：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> main1 <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> ddd <span class="token operator">=</span> main1<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;sub&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ddd<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（2）.如何创建一个主键，创建一个主键和创建一个子键的过程大致是差不多的。由于主键包含若干子键，所以在创建主键的时候必须注意他们的层次关系。下面这一段程序，在参考的时候，请注意一下main键和sub键之间的关系。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> main1 <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> ddd <span class="token operator">=</span> main1<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;sub&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ddd<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（3）.如何修改注册信息。由于注册表中的信息十分重要，所以一般不要对其进行写的操作。也可能是这个原因，在.Net FrameWork SDK 中并没有提供修改注册表键的方法。而只是提供了一个危害性相对较小的方法--SetValue()，通过这个方法，我们可以来修改键值。下面程序代码是修改一个指定键值名称的键值。当然由于SetValue()方法的特性，如果它检测到这个键值不存在，就会创建一个新的键值。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">RegistryKey</span> dddw <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dddw<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;bbb&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;abcd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="四-本文中源程序代码-reg-cs-以及编译后运行" tabindex="-1"><a class="header-anchor" href="#四-本文中源程序代码-reg-cs-以及编译后运行" aria-hidden="true">#</a> 四．本文中源程序代码(reg.cs)以及编译后运行</h2><p>reg.cs程序代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

<span class="token comment">//导入使用到的名称空间</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ListBox</span> listBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button2<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button3<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> button4<span class="token punctuation">;</span>

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
        button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;读取注册表&quot;</span><span class="token punctuation">;</span>
        button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>button2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">116</span><span class="token punctuation">,</span> <span class="token number">320</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;创建子键&quot;</span><span class="token punctuation">;</span>
        button2<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button2_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>button3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button3<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">216</span><span class="token punctuation">,</span> <span class="token number">320</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button3<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button3<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        button3<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;创建主键&quot;</span><span class="token punctuation">;</span>
        button3<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button3_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>button4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button4<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">316</span><span class="token punctuation">,</span> <span class="token number">320</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button4<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        button4<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        button4<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;重命名键值&quot;</span><span class="token punctuation">;</span>
        button4<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button4_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>

        listBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">496</span><span class="token punctuation">,</span> <span class="token number">264</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        listBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;用Visual C#来创建和修改注册表中的注册信息！&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">528</span><span class="token punctuation">,</span> <span class="token number">357</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//在窗体中加入组件</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button4<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//以列表形式显示&quot;HARDWARE&quot;下面一层的子键和键值</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//打开&quot;SYSTEM&quot;子键</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> site <span class="token keyword">in</span> software<span class="token punctuation">.</span><span class="token function">GetSubKeyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token comment">//开始遍历由子键名称组成的字符串数组</span>
        <span class="token punctuation">{</span>
            listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//在列表中加入子键名称</span>
            <span class="token class-name">RegistryKey</span> sitekey <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>site<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//打开此子键</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sValName <span class="token keyword">in</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValueNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">//开始遍历由指定子键拥有的键值名称组成的字符串数组</span>
            <span class="token punctuation">{</span>
                listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span> <span class="token operator">+</span> sValName <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> sitekey<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span>sValName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//在列表中加入键名称和对应的键值</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//创建子键和键值</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> ddd <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;ddd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ddd<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;www&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//创建一个主键并创建一个键值</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button3_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> main1 <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> ddd <span class="token operator">=</span> main1<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;sub&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ddd<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//重命名一个存在的键值</span>
    <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button4_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        listBox1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> hklm <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> software <span class="token operator">=</span> hklm<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;HARDWARE&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">RegistryKey</span> dddw <span class="token operator">=</span> software<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;aaa&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dddw<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;bbb&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;abcd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,20),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","sysinfo1.html.vue"]]);export{i as default};
