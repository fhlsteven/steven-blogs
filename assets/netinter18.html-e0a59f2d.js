import{_ as n,o as s,c as a,a as p}from"./app-57d1f7b1.js";const t={},o=p(`<h1 id="如何在c-程序中通过modem拨号上网-并且随时能够判断是否已联网" tabindex="-1"><a class="header-anchor" href="#如何在c-程序中通过modem拨号上网-并且随时能够判断是否已联网" aria-hidden="true">#</a> 如何在C#程序中通过modem拨号上网,并且随时能够判断是否已联网？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何在C#程序中通过modem拨号上网,并且随时能够判断是否已联网？
作　　者：  aleckz ()  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  12
发表时间：  2003-4-27 14:59:22
</code></pre></div><p>如何在C#程序中通过modem拨号上网,并且随时能够判断是否已联网？</p><p>用API实现，还是调用外部的拨号网络程序？<br> 最好能用前者实现.</p><p>如何在程序中得到当前是否已上网的状态呢？<br> 操作完成后如何关闭网络连接？</p><p>小弟正在做一个专用软件，目标运行平台是win98，<br> 我的开发平台是WinXP上的VS.NET 2002.</p><p>请大家帮忙！！谢谢！！！！</p><hr><hr><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-27 15:06:58 得分:0</p><blockquote><p><code>http://expert.csdn.net/Expert/topic/948/948369.xml?temp=.4689752</code><br> 其实你搜一下以前的贴子。就能解决你的问题了。呵呵！好运！</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-27 15:07:57 得分:0</p><blockquote><p>最难搞的是ADSL呀！555555555到现在我还没搞定：（2000下搞定了。XP下没搞定。我不知道2003版下肯定也搞不定了：（</p></blockquote><p>回复人： aleckz() ( 一级(初级)) 信誉：100 2003-4-27 16:53:23 得分:0</p><blockquote><p>我看了那个帖子，只提到如何检测上网状态，没有具体如何联网和断开的代码阿?<br> 我对windows api确实不太熟。请哪位给个具体的例子吧！谢谢！！！</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-27 21:23:18 得分:0</p><blockquote><p>引用名字空间;<br><code>using System.Runtime.InteropServices;</code><br> ,,,,,,,,,,,,,,,,,,,<br> 先定义:<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;wininet.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">InternetGetConnectedState</span><span class="token punctuation">(</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">In</span><span class="token punctuation">,</span> <span class="token class-name">Out</span><span class="token punctuation">,</span> <span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>U4<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lpdwFlags<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwReserved<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">bool</span></span> isConnect <span class="token operator">=</span><span class="token function">InternetGetConnectedState</span><span class="token punctuation">(</span><span class="token keyword">ref</span> flag<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>isConnect <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">//你以连接internet；</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
<span class="token comment">//你没有连接internet；</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-27 21:25:21 得分:0</p><blockquote><p>api请参看:<br><code>ms-help://MS.VSCC/MS.MSDNVS.2052/WinInet/workshop/networking/wininet/reference/functions/InternetGetConnectedState.htm</code></p></blockquote><p>回复人： aleckz() ( 一级(初级)) 信誉：100 2003-4-28 14:00:27 得分:0</p><blockquote><p>在.NET中用起来比较麻烦……<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;wininet.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">InternetAutoDial</span><span class="token punctuation">(</span>
    <span class="token function">MarshalAs</span><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>U4<span class="token punctuation">)</span> <span class="token class-name"><span class="token keyword">int</span></span> dwFlags<span class="token punctuation">,</span>
    <span class="token class-name">IntPtr</span> hwndParent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote></blockquote><p>这个函数的第二个参数，SDK文档说是当前windows的handler.<br> 我的C#程序里面如何调用啊？</p><p>回复人： aleckz() ( 一级(初级)) 信誉：100 2003-4-29 0:13:28 得分:0</p><blockquote><p>snewxf(心疤)大哥：帮帮我啊！</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-29 1:03:28 得分:0</p><blockquote><p><code>http://www.ccidnet.com/tech/guide/2001/08/20/58_3014.html</code><br> 设为0</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-29 1:07:05 得分:100</p><blockquote><p>设为：<code>IntPtr.Zero</code><br> 应该也可以设为：<code>this.Handle</code><br> 好运！</p></blockquote><p>回复人： loke(细东) ( 一级(初级)) 信誉：100 2003-09-29 14:58:00 得分:0</p><blockquote><p>我在windows 2000 AD上成功了代码如下:<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Ras</span>
<span class="token punctuation">{</span>
    <span class="token comment">//尊重知识产权，原类名空间名未作更改</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RasManager</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//拨号数据</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RAS_MaxEntryName <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RAS_MaxPhoneNumber <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> UNLEN <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> PWLEN <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DNLEN <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_PATH <span class="token operator">=</span> <span class="token number">261</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RAS_MaxDeviceType <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RAS_MaxDeviceName <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> RAS_MaxCallbackNumber <span class="token operator">=</span> RAS_MaxPhoneNumber<span class="token punctuation">;</span>
        <span class="token comment">//回调函数</span>
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Callback</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">uint</span></span> unMsg<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> rasconnstate<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwError<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//断线事件数据</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> Keep<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span> KeepRas<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">RasDeconnect</span> rasDecoonect<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RasDeconnect</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> render<span class="token punctuation">,</span> <span class="token class-name">Ras<span class="token punctuation">.</span>RasDecoonectAgrs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//拨号结构</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> Pack <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">RASDIALPARAMS</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dwSize<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxEntryName <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szEntryName<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxPhoneNumber <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szPhoneNumber<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxCallbackNumber <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szCallbackNumber<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> UNLEN <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szUserName<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> PWLEN <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szPassword<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> DNLEN <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szDomain<span class="token punctuation">;</span>
            <span class="token comment">//win98下面，以下的两个变量去掉，否则产生610错误</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dwSubEntry<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dwCallbackId<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//拨号函数</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Rasapi32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> lpRasDialExtensions<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpszPhonebook<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">RASDIALPARAMS</span> lprasdialparams<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwNotifierType<span class="token punctuation">,</span> <span class="token class-name">Callback</span> lpvNotifier<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lphRasConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">RASDIALPARAMS</span> RasDialParams<span class="token punctuation">;</span>
        <span class="token comment">//拨号连接句柄</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> Connection<span class="token punctuation">;</span>
        <span class="token comment">//断开拨号</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Rasapi32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">RasHangUp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">long</span></span> lphRasConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取当前拨号的数据</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> Pack <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">RASCONN</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dwSize<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> hrasconn<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxEntryName <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szEntryName<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxDeviceType <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szDeviceType<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> RAS_MaxDeviceName <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szDeviceName<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//获取当前拨号</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Rasapi32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">RasEnumConnections</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">RASCONN</span> lprasconn<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lpcb<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lpcConnections<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//构造函数</span>
        <span class="token keyword">public</span> <span class="token function">RasManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Connection <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            RasDialParams <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RASDIALPARAMS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>dwSize <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>RasDialParams<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//属性区域</span>
        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Properties</span>
        <span class="token comment">//注册姓名</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> UserName
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> RasDialParams<span class="token punctuation">.</span>szUserName<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> RasDialParams<span class="token punctuation">.</span>szUserName <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//注册密码</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Password
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> RasDialParams<span class="token punctuation">.</span>szPassword<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> RasDialParams<span class="token punctuation">.</span>szPassword <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//拨号名</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> EntryName
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> RasDialParams<span class="token punctuation">.</span>szEntryName<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> RasDialParams<span class="token punctuation">.</span>szEntryName <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//拨号电话</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> PhoneNumber
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> RasDialParams<span class="token punctuation">.</span>szPhoneNumber<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> RasDialParams<span class="token punctuation">.</span>szPhoneNumber <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token comment">//获取当前拨号，如果拨号唯一，返回1,并且赋值句柄，拨号不为一，返回拨号个数，出错则返回错误码</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">RASCONN</span> lpRasConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RASCONN</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpcb <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpcConnections <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            lpRasConn<span class="token punctuation">.</span>dwSize <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>lpRasConn<span class="token punctuation">)</span><span class="token punctuation">;</span>
            lpcb <span class="token operator">=</span> lpRasConn<span class="token punctuation">.</span>dwSize<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nRet <span class="token operator">=</span> <span class="token function">RasEnumConnections</span><span class="token punctuation">(</span><span class="token keyword">ref</span> lpRasConn<span class="token punctuation">,</span> <span class="token keyword">ref</span> lpcb<span class="token punctuation">,</span> <span class="token keyword">ref</span> lpcConnections<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nRet <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>lpcConnections <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Connection <span class="token operator">=</span> lpRasConn<span class="token punctuation">.</span>hrasconn<span class="token punctuation">;</span>
                    <span class="token keyword">return</span> lpcConnections<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                    <span class="token keyword">return</span> lpcConnections<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                <span class="token keyword">return</span> nRet<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//同步拨号</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Connection <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">//根据win自己的说明，要执行已有的拨号</span>
            <span class="token comment">//RasDialParams.szEntryName = 你的拨号连接的名字，并且保持RasDialParams.szPhoneNumber = &quot;&quot;;</span>
            <span class="token comment">//如果要直接拨号</span>
            <span class="token comment">//RasDialParams.szEntryName = &quot;&quot;;RasDialParams.szPhoneNumber = 电话号码。</span>
            <span class="token comment">//但是我没法检测，有小猫的朋友可以试试</span>
            RasDialParams<span class="token punctuation">.</span>szEntryName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szPhoneNumber <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szUserName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szPassword <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> RasDialParams<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//拨号成功开始跟踪拨号情况</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Keep<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Keep <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    KeepRas <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>ThreadStart</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>CheckRasEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    KeepRas<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">AConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Callback</span> rasDialFunc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Callback</span><span class="token punctuation">(</span>RasManager<span class="token punctuation">.</span>RasDialFunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szEntryName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szPhoneNumber <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szUserName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            RasDialParams<span class="token punctuation">.</span>szPassword <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> RasDialParams<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> rasDialFunc<span class="token punctuation">,</span> <span class="token keyword">ref</span> Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//断开拨号</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">DeConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasHangUp</span><span class="token punctuation">(</span>Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Connection <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            Keep <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//异步拨号的回调函数</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RasDialFunc</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">uint</span></span> unMsg<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> rasconnstate<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwError<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//rasconnstate 返回的是当前状态码</span>
            <span class="token comment">//有兴趣的朋友可以假如自己的代码，它是个枚举,在c++中的结构如下</span>
            <span class="token comment">/*
            typedef enum _RASCONNSTATE { 
                    RASCS_OpenPort = 0, 
                    RASCS_PortOpened, 
                    RASCS_ConnectDevice, 
                    RASCS_DeviceConnected, 
                    RASCS_AllDevicesConnected, 
                    RASCS_Authenticate, 
                    RASCS_AuthNotify, 
                    RASCS_AuthRetry, 
                    RASCS_AuthCallback, 
                    RASCS_AuthChangePassword, 
                    RASCS_AuthProject, 
                    RASCS_AuthLinkSpeed, 
                    RASCS_AuthAck, 
                    RASCS_ReAuthenticate, 
                    RASCS_Authenticated, 
                    RASCS_PrepareForCallback, 
                    RASCS_WaitForModemReset, 
                    RASCS_WaitForCallback,
                    RASCS_Projected, 
                #if (WINVER &gt;= 0x400) 
                    RASCS_StartAuthentication,    // Windows 95 only 
                    RASCS_CallbackComplete,       // Windows 95 only 
                    RASCS_LogonNetwork,           // Windows 95 only 
                #endif 
                    RASCS_SubEntryConnected,
                    RASCS_SubEntryDisconnected,
                    RASCS_Interactive = RASCS_PAUSED, 
                    RASCS_RetryAuthentication, 
                    RASCS_CallbackSetByCaller, 
                    RASCS_PasswordExpired, 
                #if (WINVER &gt;= 0x500)
                    RASCS_InvokeEapUI,
                #endif
                    RASCS_Connected = RASCS_DONE, 
                    RASCS_Disconnected 
                }RASCONNSTATE; 
            */</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//时时检测网络</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CheckRasEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>Keep<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                i <span class="token operator">=</span> <span class="token function">GetConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>rasDecoonect <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token function">rasDecoonect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Ras<span class="token punctuation">.</span>RasDecoonectAgrs</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        Keep <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RasDecoonectAgrs</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">RasDecoonectAgrs</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            RasMeg <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> RasMeg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">namespace</span> <span class="token namespace">WindowsApplication17</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>该问题已经结贴 ，得分记录： snewxf (100)、</p>`,35),e=[o];function c(l,k){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","netinter18.html.vue"]]);export{r as default};
