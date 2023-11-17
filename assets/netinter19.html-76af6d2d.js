import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="一个扩充拨号类" tabindex="-1"><a class="header-anchor" href="#一个扩充拨号类" aria-hidden="true">#</a> 一个扩充拨号类</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  一个扩充拨号类
作　　者：  linzsoft (邪邪)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  0
回复次数：  16
发表时间：  2003-5-14 16:58:14
</code></pre></div><p>提供一个拨号类,原来这个类的雏形是在这里发现的,现在我把它扩充一下方便大家使用<br> 实现功能:<br><br> 扩充功能<br> 1:拨号(改正win98拨号出现610错误的情况)<br> 2:断开拨号<br> 3:获得当前的拨号连接<br> 4:断线事件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token keyword">static</span> <span class="token class-name">Ras<span class="token punctuation">.</span>RasManager</span><span class="token punctuation">;</span>

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
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RasDeconnect</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> render<span class="token punctuation">,</span> <span class="token class-name">ClassCon<span class="token punctuation">.</span>RasDecoonectAgrs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>

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
        <span class="token keyword">public</span> <span class="token return-type class-name">sting</span> PhoneNumber
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

        <span class="token comment">//异步拨号  </span>
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
                        <span class="token function">rasDecoonect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ClassCon<span class="token punctuation">.</span>RasDecoonectAgrs</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
</code></pre></div><p>例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>RasM <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ClassCon<span class="token punctuation">.</span>RasManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>EntryName <span class="token operator">=</span> <span class="token string">&quot;我的连接&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>PhoneNumber <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>UserName <span class="token operator">=</span> <span class="token string">&quot;guest&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>Password <span class="token operator">=</span> <span class="token string">&quot;guest&quot;</span><span class="token punctuation">;</span>
</code></pre></div><p>感兴趣的朋友顶一顶</p><hr><hr><p>回复人： linzsoft(邪邪) ( 二级(初级)) 信誉：100 2003-5-14 20:36:18 得分:0</p><blockquote><p>是不是没人看啊?</p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-5-14 20:52:26 得分:0</p><blockquote><p>好贴！！！！！！！！！！！！！！！！！</p></blockquote><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-24 14:06:15 得分:0</p><blockquote><p>如何改成WindowsServices呢？<br> 让他再后台运行.</p></blockquote><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-24 14:35:50 得分:0</p><blockquote><p>我试了一下，有很多的错误啊...???<br> 看得不太懂</p></blockquote><p>回复人： linzsoft(邪邪) ( 二级(初级)) 信誉：100 2003-5-24 17:34:56 得分:0</p><blockquote><p>什么样的错误?<br> 写出来让我看看</p></blockquote><p>回复人： linzsoft(邪邪) ( 二级(初级)) 信誉：100 2003-5-24 17:38:36 得分:0</p><blockquote><p>这里改一下</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//异步拨号  </span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">AConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Callback</span> rasDialFunc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Callback</span><span class="token punctuation">(</span>RasManager<span class="token punctuation">.</span>RasDialFunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szEntryName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szPhoneNumber <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szUserName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szPassword <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> RasDialParams<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> rasDialFunc<span class="token punctuation">,</span> <span class="token keyword">ref</span> Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： CMIC(大象) ( 五级(中级)) 信誉：96 2003-5-24 19:02:12 得分:0</p><blockquote><p>收藏</p></blockquote><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-24 22:00:33 得分:0</p><blockquote><p><code>public delegate void RasDeconnect(object render,ClassCon.RasDecoonectAgrs e);</code><br> 这一句是什么意思？<br> ClassCon哪里来的？</p></blockquote><p>回复人： linzsoft(邪邪) ( 二级(初级)) 信誉：100 2003-5-25 2:43:56 得分:0</p><blockquote><p>原来的这个类的空间名是ClassCon ，后来为了尊重原作者改了回去所以ClassCon改成Ras<br> 写得匆忙了些<br><br> 这两句是合用的<br></p></blockquote><p><code>public event RasDeconnect rasDecoonect;</code><br><code>public delegate void RasDeconnect(object render,ClassCon.RasDecoonectAgrs e);</code><br><br> 定义一个事件<code>RasDeconnect rasDecoonect</code><br> 定义一个委托<code>RasDeconnect，(object render,ClassCon.RasDecoonectAgrs e)</code>委托给<code>rasDecoonect</code></p><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-25 11:03:26 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//异步拨号  </span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">AConnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Callback</span> rasDialFunc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Callback</span><span class="token punctuation">(</span>RasManager<span class="token punctuation">.</span>RasDialFunc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szEntryName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szPhoneNumber <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szUserName <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    RasDialParams<span class="token punctuation">.</span>szPassword <span class="token operator">+=</span> <span class="token string">&quot;\\0&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> RasDialParams<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> rasDialFunc<span class="token punctuation">,</span> <span class="token keyword">ref</span> Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote></blockquote><p><code>return</code>是<code>int</code>类型，而此方法要求返回bool类型，错了吧.?<br> 另外我这样使用:<br></p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>RasM <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RasManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>EntryName <span class="token operator">=</span> <span class="token string">&quot;我的连接&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>PhoneNumber <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote></blockquote><p>不会启动我的拨号连接，我用的是56K猫</p><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-25 15:38:38 得分:0</p><blockquote><p>up</p></blockquote><p>回复人： cocosoft(pengyun) ( 五级(中级)) 信誉：100 2003-5-25 18:47:06 得分:0</p><blockquote><p>ok</p></blockquote><p>回复人： dy630(半导体) ( 三级(初级)) 信誉：67 2003-5-25 19:18:23 得分:0</p><blockquote><p>收藏！！</p></blockquote><p>回复人： eidolon(eidolon) ( 一级(初级)) 信誉：100 2003-5-26 23:12:54 得分:0</p><blockquote><p>最后在up一下，哪位使用成功了阿...???</p></blockquote><p>回复人： linzsoft(邪邪) ( 二级(初级)) 信誉：100 2003-5-27 1:43:42 得分:0</p><blockquote><p>你是在什么系统下?<br> 如果是win98 你可以这样做，在<br><br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
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
    <span class="token class-name"><span class="token keyword">int</span></span> result <span class="token operator">=</span> <span class="token function">RasDial</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">ref</span> RasDialParams<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">ref</span> Connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>然后看看他返回的数字，记住如果是610<br><code>public struct RASDIALPARAMS</code>就是这个结构写错了，<br><br> 还有密码一定要添<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>RasM<span class="token punctuation">.</span>UserName <span class="token operator">=</span> <span class="token string">&quot;guest&quot;</span><span class="token punctuation">;</span>
RasM<span class="token punctuation">.</span>Password <span class="token operator">=</span> <span class="token string">&quot;guest&quot;</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>最后一个问题，拨号是不可能拨号音的，因为那是windows自己加的调用api拨号不会有拨号音<br> 如果是win2000你可以到 网络和拨号连接 去观察 如果成功运行了,上面会显示正在拨号<br> 结果可能会出现没有联接 断开，这样的原因有很多，你要看看result的号码，或者你写给我看看。</p></blockquote><p>回复人： loke(细东) ( 一级(初级)) 信誉：100 2003-09-29 14:57:00 得分:0</p><blockquote><p>成功~~</p></blockquote>`,54),e=[o];function c(l,u){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","netinter19.html.vue"]]);export{r as default};
