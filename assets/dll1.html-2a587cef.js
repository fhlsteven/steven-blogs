import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},e=p(`<h1 id="dll调用" tabindex="-1"><a class="header-anchor" href="#dll调用" aria-hidden="true">#</a> dll调用</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  dll调用
作　　者：  lornwolf80 (孤独的狼)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  18
发表时间：  2003-9-24 19:25:35
</code></pre></div><p>调用AdvAPI32.Dll中的EnumServicesStatus函数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;AdvAPI32.Dll&quot;</span><span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">EnumServicesStatus</span><span class="token punctuation">(</span>
    <span class="token class-name">IntPtr</span> handle<span class="token punctuation">,</span>
    <span class="token class-name">ServiceType</span> type<span class="token punctuation">,</span>
    <span class="token class-name">ServiceActiveStatus</span> activestatus<span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">In</span><span class="token punctuation">,</span><span class="token class-name">Out</span></span><span class="token punctuation">]</span><span class="token class-name">EnumServiceStatus<span class="token punctuation">[</span><span class="token punctuation">]</span></span> servicestatus<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">int</span></span> bufsize<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> byteneeded<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> servicesreturn<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> resumehandle
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>所需结构如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">ServiceStatus</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceType</span> Type<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceCurrentType</span> CurrentType<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">SerivceControlAccepted</span> ControlAccepted<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Win32ExitCode<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> ServiceSpecificExitCode<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> CheckPoint<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> WaitHint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">EnumServiceStatus</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> ServiceName<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> DisplayName<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceStatus</span> status<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>请问这样对否？<br> 运行时出现“未将对象引用设置到对象的实例”错误？<br> 调用如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">IntPtr</span> handle<span class="token operator">=</span>EcService<span class="token punctuation">.</span><span class="token function">OpenSCManager</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span>ServicesAccess<span class="token punctuation">.</span>AllAccess<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name">EnumServiceStatus<span class="token punctuation">[</span><span class="token punctuation">]</span></span> ess<span class="token punctuation">;</span>
    ess<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">EnumServiceStatus</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> bufsize<span class="token operator">=</span>Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>ess<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">*</span>ess<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> sreturn<span class="token punctuation">,</span>rhandle<span class="token punctuation">,</span>bneeded<span class="token punctuation">;</span>
    sreturn<span class="token operator">=</span>rhandle<span class="token operator">=</span>bneeded<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    EcService<span class="token punctuation">.</span><span class="token function">EnumServicesStatus</span><span class="token punctuation">(</span>handle<span class="token punctuation">,</span>
            ServiceType<span class="token punctuation">.</span>ServiceWin32<span class="token punctuation">,</span>
            ServiceActiveStatus<span class="token punctuation">.</span>StateAll<span class="token punctuation">,</span>
        ess<span class="token punctuation">,</span>bufsize<span class="token punctuation">,</span><span class="token keyword">ref</span> bneeded<span class="token punctuation">,</span><span class="token keyword">ref</span> sreturn<span class="token punctuation">,</span><span class="token keyword">ref</span> rhandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    EcService<span class="token punctuation">.</span><span class="token function">CloseServiceHandle</span><span class="token punctuation">(</span>handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>回复人： changezhong(小刀) ( 二级(初级)) 信誉：100 2003-9-24 19:33:40 得分:10</p><blockquote><p>gz</p></blockquote><p>回复人： xswh418(大衰哥) ( 四级(中级)) 信誉：100 2003-9-24 19:39:57 得分:10</p><blockquote><p>楼主什么意思？</p></blockquote><p>回复人： lornwolf80(孤独的狼) ( 一级(初级)) 信誉：100 2003-9-24 19:42:37 得分:0</p><blockquote><p>我现在使用这个函数时，出现错误提示“未将对象引用设置到对象的实例”<br> 不知道是什么地方错了？</p></blockquote><p>回复人： Lorenes(晓帆) ( 二级(初级)) 信誉：99 2003-9-24 19:44:18 得分:0</p><blockquote><p>调用方法基本正确,<br><br> WINDOWS中有很多怪问题出现null Exception的.<br><br> 用</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span><span class="token punctuation">{</span>
<span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>容错就好.</p></blockquote><p>回复人： cnhgj(戏子.Com？俺真TMD够菜) ( 两星(中级)) 信誉：100 2003-9-24 19:44:28 得分:10</p><blockquote><p>调用API函数不用new实例</p></blockquote><p>回复人： Lorenes(晓帆) ( 二级(初级)) 信誉：99 2003-9-24 19:45:17 得分:10</p><blockquote><p>对了,静态的API调是static 的.</p></blockquote><p>回复人： lornwolf80(孤独的狼) ( 一级(初级)) 信誉：100 2003-9-24 19:48:42 得分:0</p><blockquote><p>我使用new 是开辟数组空间，函数原型如下</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name">BOOL</span> <span class="token function">EnumServicesStatus</span><span class="token punctuation">(</span>
  <span class="token class-name">SC_HANDLE</span> hSCManager<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> dwServiceType<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> dwServiceState<span class="token punctuation">,</span>
  <span class="token class-name">LPENUM_SERVICE_STATUS</span> lpServices<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> cbBufSize<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> pcbBytesNeeded<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> lpServicesReturned<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> lpResumeHandle
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： yaoyaonet(绿洲) ( 四级(中级)) 信誉：100 2003-9-24 19:49:18 得分:10</p><blockquote><p><code>ess=new EnumServiceStatus[100];</code> --》<code>ess=EnumServiceStatus[100];</code> 试试。。。</p></blockquote><p>回复人： lornwolf80(孤独的狼) ( 一级(初级)) 信誉：100 2003-9-24 19:52:53 得分:0</p><blockquote><p>yaoyaonet(绿洲)<br> 编译都不通过：（<br> 还有这个函数是用来枚举windows2000的服务，<br> 我试了，如果调用函数时出错，将不能完全枚举服务</p></blockquote><p>回复人： kuangren(今天逃课~) ( 三级(初级)) 信誉：100 2003-9-24 19:54:53 得分:10</p><blockquote><p>恩，up</p></blockquote><p>回复人： zhouzhouzhou(人生程序) ( 四级(中级)) 信誉：100 2003-9-24 19:55:50 得分:10</p><blockquote><p>支持</p></blockquote><p>回复人： easydone(水泥) ( 一级(初级)) 信誉：100 2003-9-24 19:58:31 得分:10</p><blockquote><p>在C＃中使用API首先要使用引入名字空间：<br><code>using System.Runtime.InteropServices;</code><br> 然后<br><code>[DllImport(&quot;AdvAPI32&quot;)]</code><br> ＋函数说明</p></blockquote><p>回复人： lornwolf80(孤独的狼) ( 一级(初级)) 信誉：100 2003-9-24 20:01:37 得分:0</p><blockquote><p><code>using System.Runtime.InteropServices;</code>名称空间已经引用<br> 编译都通过了，是在运行时出现的错误提示，用try...catch...finally<br> 捕捉异常，将不能得到一个我所需要的东西.</p></blockquote><p>回复人： xz_king(西杀魄工人) ( 五级(中级)) 信誉：100 2003-9-24 20:09:56 得分:10</p><blockquote><p>帮你up</p></blockquote><p>回复人： Gao2003(Gao) ( 四级(中级)) 信誉：100 2003-9-24 20:18:14 得分:10</p><blockquote><p>把API和结构的C原形贴出来</p></blockquote><p>回复人： lornwolf80(孤独的狼) ( 一级(初级)) 信誉：100 2003-9-24 20:24:58 得分:0</p><blockquote><p>函数原型:<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name">BOOL</span> <span class="token function">EnumServicesStatus</span><span class="token punctuation">(</span>
  <span class="token class-name">SC_HANDLE</span> hSCManager<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> dwServiceType<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> dwServiceState<span class="token punctuation">,</span>
  <span class="token class-name">LPENUM_SERVICE_STATUS</span> lpServices<span class="token punctuation">,</span>
  <span class="token class-name">DWORD</span> cbBufSize<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> pcbBytesNeeded<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> lpServicesReturned<span class="token punctuation">,</span>
  <span class="token class-name">LPDWORD</span> lpResumeHandle
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>C#结构</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">ServiceStatus</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceType</span> Type<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceCurrentType</span> CurrentType<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">SerivceControlAccepted</span> ControlAccepted<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Win32ExitCode<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> ServiceSpecificExitCode<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> CheckPoint<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> WaitHint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span>CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">EnumServiceStatus</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> ServiceName<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> DisplayName<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">ServiceStatus</span> status<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>使用的枚举类型</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ServiceCurrentType</span>
<span class="token punctuation">{</span>
    Stopped         <span class="token operator">=</span><span class="token number">0x00000001</span><span class="token punctuation">,</span>
    StartPending    <span class="token operator">=</span><span class="token number">0x00000002</span><span class="token punctuation">,</span>
    StopPending     <span class="token operator">=</span><span class="token number">0x00000003</span><span class="token punctuation">,</span>
    Running         <span class="token operator">=</span><span class="token number">0x00000004</span><span class="token punctuation">,</span>
    ContinuePending <span class="token operator">=</span><span class="token number">0x00000005</span><span class="token punctuation">,</span>
    PausePending    <span class="token operator">=</span><span class="token number">0x00000006</span><span class="token punctuation">,</span>
    Paused          <span class="token operator">=</span><span class="token number">0x00000007</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ServiceType</span>
<span class="token punctuation">{</span>
    KernelDriver        <span class="token operator">=</span><span class="token number">0x00000001</span><span class="token punctuation">,</span>
    FileSystemDriver    <span class="token operator">=</span><span class="token number">0x00000002</span><span class="token punctuation">,</span>
    Adapter             <span class="token operator">=</span><span class="token number">0x00000004</span><span class="token punctuation">,</span>
    RecognizerDriver    <span class="token operator">=</span><span class="token number">0x00000008</span><span class="token punctuation">,</span>
    ServiceDriver       <span class="token operator">=</span><span class="token punctuation">(</span>KernelDriver<span class="token operator">|</span>FileSystemDriver<span class="token operator">|</span>RecognizerDriver<span class="token punctuation">)</span><span class="token punctuation">,</span>
    Win32_OwnProcess    <span class="token operator">=</span><span class="token number">0x00000010</span><span class="token punctuation">,</span>
    Win32_ShareProcess  <span class="token operator">=</span><span class="token number">0x00000020</span><span class="token punctuation">,</span>
    ServiceWin32        <span class="token operator">=</span><span class="token punctuation">(</span>Win32_OwnProcess<span class="token operator">|</span>Win32_ShareProcess<span class="token punctuation">)</span><span class="token punctuation">,</span>
    InterActiveProcess  <span class="token operator">=</span><span class="token number">0x00000100</span><span class="token punctuation">,</span>
    TypeAll             <span class="token operator">=</span><span class="token punctuation">(</span>Adapter<span class="token operator">|</span>ServiceDriver<span class="token operator">|</span>ServiceWin32<span class="token operator">|</span>InterActiveProcess<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">SerivceControlAccepted</span>
<span class="token punctuation">{</span>
    Stop                <span class="token operator">=</span><span class="token number">0x00000001</span><span class="token punctuation">,</span>
    PauseContinue       <span class="token operator">=</span><span class="token number">0x00000002</span><span class="token punctuation">,</span>
    Shutdown            <span class="token operator">=</span><span class="token number">0x00000004</span><span class="token punctuation">,</span>
    ParamChange         <span class="token operator">=</span><span class="token number">0x00000008</span><span class="token punctuation">,</span>
    NetBindChange       <span class="token operator">=</span><span class="token number">0x00000010</span><span class="token punctuation">,</span>
    HardwareProfileChange   <span class="token operator">=</span><span class="token number">0x00000020</span><span class="token punctuation">,</span>
    PowerEvent              <span class="token operator">=</span><span class="token number">0x00000040</span><span class="token punctuation">,</span>
    SessionChange           <span class="token operator">=</span><span class="token number">0x00000080</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ServiceActiveStatus</span>
<span class="token punctuation">{</span>
    Active      <span class="token operator">=</span><span class="token number">0x00000001</span><span class="token punctuation">,</span>
    InActive    <span class="token operator">=</span><span class="token number">0x00000002</span><span class="token punctuation">,</span>
    StateAll    <span class="token operator">=</span><span class="token punctuation">(</span>Active<span class="token operator">|</span>InActive<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>详细的API说明在<br> ms-help://MS.MSDNQTR.2003FEB.2052/dllproc/base/enumservicesstatus.htm中</p></blockquote><p>该问题已经结贴 ，得分记录： changezhong (10)、 xswh418 (10)、 cnhgj (10)、 Lorenes (10)、 yaoyaonet (10)、 kuangren (10)、 zhouzhouzhou (10)、 easydone (10)、 xz_king (10)、 Gao2003 (10)、</p>`,52),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","dll1.html.vue"]]);export{r as default};
