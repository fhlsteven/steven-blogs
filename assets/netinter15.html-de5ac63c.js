import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="怎样在程序中设置-internet选项-中的-http代理设置" tabindex="-1"><a class="header-anchor" href="#怎样在程序中设置-internet选项-中的-http代理设置" aria-hidden="true">#</a> 怎样在程序中设置“internet选项”中的“http代理设置”？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎样在程序中设置“internet选项”中的“http代理设置”？
作　　者：  HarryPatton (天外飞仙)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  12
发表时间：  2003-09-26 16:37:33
</code></pre></div><p>我需要在程序中自动设置或者关闭“internet选项”中的“http代理设置”，请问该怎么做？</p><hr><hr><p>回复人： changezhong(小刀) ( 二级(初级)) 信誉：100 2003-09-26 19:31:00 得分:0</p><blockquote><p>gz<br> 帮你up</p></blockquote><p>回复人： saucer(思归) ( 五星(高级)) 信誉：325 2003-09-27 05:46:00 得分:0</p><blockquote><p>change the registry, here is some C++ code:<br><br> Change Internet Proxy settings<br> http://www.codeproject.com/internet/changeproxy1.asp<br><br> Toggle Internet Proxy settings - an alternate approach<br> http://www.codeproject.com/internet/changeproxy2.asp</p></blockquote><p>回复人： xamcsdn2(知了) ( 三级(初级)) 信誉：100 2003-09-27 09:02:00 得分:0</p><blockquote><p>你可以在C#中调用系统的SHELL命令 <code>cmd /k netsh -f tt.txt</code><br><br> tt.txt,假设是你的网络配置文件，由SHELL 命令 <code>cmd /k netsh -c interface dump &gt; tt.txt</code> 生成</p></blockquote><p>回复人： HarryPatton(天外飞仙) ( 一级(初级)) 信誉：100 2003-09-27 10:15:00 得分:0</p><blockquote><p>有没有更加简单的方法啊？？<br><br> to xamcsdn2(知了) ：可否给一个tt.txt的例子啊：）</p></blockquote><p>回复人： gujunyan(ivy) ( 一星(中级)) 信誉：99 2003-09-27 10:23:00 得分:0</p><blockquote><p>System.Net.GlobalProxySelection.Select</p></blockquote><p>回复人： HarryPatton(天外飞仙) ( 一级(初级)) 信誉：100 2003-09-27 10:41:00 得分:0</p><blockquote><p>to gujunyan(ivy)：这种方法不能更改internet选项的代理设置。因为我的http请求是从ie而不是.net的WebRequest发出的，所以这种方法不能满足我的要求啊。</p></blockquote><p>回复人： xamcsdn2(知了) ( 三级(初级)) 信誉：100 2003-09-27 13:56:00 得分:0</p><blockquote><p>tt.txt可以自己生成。<br><br> 在CMD窗口下输入<br><code>netsh -c interface dump &gt; c:\\tt.txt</code></p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>#========================
# 接口配置
#========================
pushd interface

reset all


popd
# 接口配置结束



# ---------------------------------- 
# 接口 IP 配置         
# ---------------------------------- 
pushd interface ip


# &quot;本地连接&quot; 的接口 IP  配置

set address name = &quot;本地连接&quot; source = static addr = 202.168.0.224 mask = 255.255.255.0
set address name = &quot;本地连接&quot; gateway = 192.168.0.1 gwmetric = 1
set dns name = &quot;本地连接&quot; source = static addr = 202.135.0.1
set wins name = &quot;本地连接&quot; source = static addr = none


popd
# 接口 IP 配置结束
</code></pre></div><p>回复人： HarryPatton(天外飞仙) ( 一级(初级)) 信誉：100 2003-09-27 16:12:00 得分:0</p><blockquote><p>to xamcsdn2(知了)：<br> 无法得到代理服务的信息</p></blockquote><p>回复人： xamcsdn2(知了) ( 三级(初级)) 信誉：100 2003-09-28 09:27:00 得分:0</p><blockquote><p>不好意思，我弄错了，我再看看。</p></blockquote><p>回复人： yehanyu(幸福需要争取，努力中！) ( 四级(中级)) 信誉：100 2003-09-28 09:42:00 得分:0</p><blockquote><p>up</p></blockquote><p>回复人： HarryPatton(天外飞仙) ( 一级(初级)) 信誉：100 2003-09-28 10:40:00 得分:0</p><blockquote><p>问题已解决，谢谢大家帮助：<br> 以下是c#代码<br><br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//申明windows api</span>
<span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">@&quot;wininet&quot;</span><span class="token punctuation">,</span>
    SetLastError<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">,</span>
    EntryPoint<span class="token operator">=</span><span class="token string">&quot;InternetSetOption&quot;</span><span class="token punctuation">,</span>
    CallingConvention<span class="token operator">=</span>CallingConvention<span class="token punctuation">.</span>StdCall<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> InternetSetOption
<span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">int</span></span> hInternet<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">int</span></span> dmOption<span class="token punctuation">,</span>
    <span class="token class-name">IntPtr</span> lpBuffer<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">int</span></span> dwBufferLength
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token comment">//打开注册表</span>
   <span class="token class-name">RegistryKey</span> regKey <span class="token operator">=</span> Registry<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">;</span>
   <span class="token class-name"><span class="token keyword">string</span></span> SubKeyPath <span class="token operator">=</span> <span class="token string">@&quot;Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings&quot;</span><span class="token punctuation">;</span>
   <span class="token class-name">RegistryKey</span> optionKey <span class="token operator">=</span> regKey<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>SubKeyPath<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//更改健值，设置代理，</span>
   optionKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;ProxyEnable&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   optionKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;ProxyServer&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;192.168.1.85:80&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//激活代理设置</span>
   <span class="token function">InternetSetOption</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">39</span><span class="token punctuation">,</span>IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">InternetSetOption</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">37</span><span class="token punctuation">,</span>IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： HarryPatton(天外飞仙) ( 一级(初级)) 信誉：100 2003-09-28 10:42:00 得分:0</p><blockquote><p>问题已解决，谢谢大家帮助：<br> 以下是c#代码<br><br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//申明windows api</span>
<span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">@&quot;wininet&quot;</span><span class="token punctuation">,</span>
    SetLastError<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">,</span>
    CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">,</span>
    EntryPoint<span class="token operator">=</span><span class="token string">&quot;InternetSetOption&quot;</span><span class="token punctuation">,</span>
    CallingConvention<span class="token operator">=</span>CallingConvention<span class="token punctuation">.</span>StdCall<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> InternetSetOption
<span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">int</span></span> hInternet<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">int</span></span> dmOption<span class="token punctuation">,</span>
    <span class="token class-name">IntPtr</span> lpBuffer<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">int</span></span> dwBufferLength
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token comment">//打开注册表</span>
   <span class="token class-name">RegistryKey</span> regKey <span class="token operator">=</span> Registry<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">;</span>
   <span class="token class-name"><span class="token keyword">string</span></span> SubKeyPath <span class="token operator">=</span> <span class="token string">@&quot;Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings&quot;</span><span class="token punctuation">;</span>
   <span class="token class-name">RegistryKey</span> optionKey <span class="token operator">=</span> regKey<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>SubKeyPath<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">//更改健值，设置代理，</span>
   optionKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;ProxyEnable&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   optionKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;ProxyServer&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;192.168.1.85:80&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token comment">//激活代理设置</span>
   <span class="token function">InternetSetOption</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">39</span><span class="token punctuation">,</span>IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token function">InternetSetOption</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">37</span><span class="token punctuation">,</span>IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,32),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","netinter15.html.vue"]]);export{k as default};
