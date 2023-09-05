import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="如何编程设置本机ip" tabindex="-1"><a class="header-anchor" href="#如何编程设置本机ip" aria-hidden="true">#</a> 如何编程设置本机IP</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  [网络编程问题] 如何编程设置本机IP
作　　者：  armylau (冯.城.褐.兰)  
等　　级：  ^^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  2
发表时间：  2003-09-20 11:54:34
</code></pre></div><p>本人PC由于特殊原因需经常修改IP和网关, 想写一个程序方便完成, 请问如如何:</p><ol><li>编程修改本机IP, 网关, 子网掩码, DNS等...(是否需要调用API?)</li><li>如何禁用和启动网络, 以完成其刷新(又是调用API吧,具体是什么?)</li></ol><p>谢谢!我会尽快加分</p><hr><hr><p>回复人： chinchy(人民需要人民币) ( 两星(中级)) 信誉：140 2003-09-20 12:13:00 得分:0</p><blockquote><p>If you like, low-level IP-Helper API:<br><code>http://msdn.microsoft.com/library/en-us/tcpip/iphpport_7vz9.asp</code><br><br> PInvoke with C# (no IP change impl.?)<br><code>http://www.gotdotnet.com/team/p2p/</code><br><code>http://www.gotdotnet.com/userfiles/herveyw/netsamples.zip</code><br><br> WMI:<br> Win32_NetworkAdapterConfiguration:<br><code>http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_6oq6.asp</code><br><br> Methods: EnableStatic + EnableDHCP<br><code>http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_0ujy.asp</code><br><code>http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_27u6.asp</code><br><br> Changeip VB-Scripts:<br><code>http://desktopengineer.com/index.php?topic=0080WMI</code><br><code>http://cwashington.netreach.net/depo/view.asp?Index=628</code><br><br> VERY simplified WMI sample:</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// ===============================================================================</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Management</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WmiIpChanger</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">IpChanger</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MTAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//  SwitchToDHCP();</span>
            <span class="token function">SwitchToStatic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;end.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SwitchToDHCP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">ManagementBaseObject</span> inPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementBaseObject</span> outPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;IPEnabled&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>

                inPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">GetMethodParameters</span><span class="token punctuation">(</span><span class="token string">&quot;EnableDHCP&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                outPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;EnableDHCP&quot;</span><span class="token punctuation">,</span> inPar<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SwitchToStatic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">ManagementBaseObject</span> inPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementBaseObject</span> outPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;IPEnabled&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>

                inPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">GetMethodParameters</span><span class="token punctuation">(</span><span class="token string">&quot;EnableStatic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                inPar<span class="token punctuation">[</span><span class="token string">&quot;IPAddress&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;192.168.1.1&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
                inPar<span class="token punctuation">[</span><span class="token string">&quot;SubnetMask&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;255.255.255.0&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
                outPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token string">&quot;EnableStatic&quot;</span><span class="token punctuation">,</span> inPar<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;****** Current IP addresses:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;IPEnabled&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>

                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}\\n  SVC: &#39;{1}&#39;   MAC: [{2}]&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;Caption&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                   <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;ServiceName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;MACAddress&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> addresses <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;IPAddress&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> subnets <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>mo<span class="token punctuation">[</span><span class="token string">&quot;IPSubnet&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;  Addresses :&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sad <span class="token keyword">in</span> addresses<span class="token punctuation">)</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\t&#39;{0}&#39;&quot;</span><span class="token punctuation">,</span> sad<span class="token punctuation">)</span><span class="token punctuation">;</span>

                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;  Subnets :&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sub <span class="token keyword">in</span> subnets<span class="token punctuation">)</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\t&#39;{0}&#39;&quot;</span><span class="token punctuation">,</span> sub<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： chinawn(chinawn) ( 二级(初级)) 信誉：100 2003-09-20 12:49:00 得分:0</p><blockquote><p>http://groups.google.com/groups?hl=en&amp;lr=&amp;ie=UTF-8&amp;oe=UTF-8&amp;selm=%23EwffAXACHA.2308%40tkmsftngp02</p></blockquote><hr><hr><p>Viewing message <a href="mailto:#EwffAXACHA.2308@tkmsftngp02">#EwffAXACHA.2308@tkmsftngp02</a></p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>DynamicPDF Generator.NET?
    Total output control! - New v1.6 Web Invoices, Schedules &amp; Reports.? dynamicpdf.com
C# TraceListener Article?
    Need a free C# TraceListener? Use Reflection to leverage .NET? www.codeproject.com 
C# tutorial and resources?
    AspRelated.com offers free C# tutorials, resources, articles? www.asprelated.com 

From: NETMaster (spam.netmaster@swissonline.ch)
Subject: Re: WMI or How to change my IP address
View: Complete Thread (6 articles)  
Original Format
Newsgroups: microsoft.public.dotnet.framework
Date: 2002-05-22 02:09:48 PST
</code></pre></div><p>If you like, low-level IP-Helper API: http://msdn.microsoft.com/library/en-us/tcpip/iphpport_7vz9.asp</p><p>PInvoke with C# (no IP change impl.?) http://www.gotdotnet.com/team/p2p/ http://www.gotdotnet.com/userfiles/herveyw/netsamples.zip</p><p>WMI: Win32_NetworkAdapterConfiguration: http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_6oq6.asp</p><p>Methods: EnableStatic + EnableDHCP http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_0ujy.asp http://msdn.microsoft.com/library/en-us/wmisdk/r_32hard4_27u6.asp</p><p>Changeip VB-Scripts: http://desktopengineer.com/index.php?topic=0080WMI http://cwashington.netreach.net/depo/view.asp?Index=628</p><p>VERY simplified WMI sample:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// ===============================================================================</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Management</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WmiIpChanger</span>
<span class="token punctuation">{</span>
<span class="token keyword">class</span> <span class="token class-name">IpChanger</span>
<span class="token punctuation">{</span>
 <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MTAThread</span></span><span class="token punctuation">]</span>
 <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
  <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//  SwitchToDHCP();</span>
  <span class="token function">SwitchToStatic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span> <span class="token number">5000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;end.&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SwitchToDHCP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
  <span class="token class-name">ManagementBaseObject</span> inPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementBaseObject</span> outPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">foreach</span><span class="token punctuation">(</span> <span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token operator">!</span> <span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span><span class="token string">&quot;IPEnabled&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">)</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>

   inPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">GetMethodParameters</span><span class="token punctuation">(</span><span class="token string">&quot;EnableDHCP&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   outPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span> <span class="token string">&quot;EnableDHCP&quot;</span><span class="token punctuation">,</span> inPar<span class="token punctuation">,</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>

 <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SwitchToStatic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
  <span class="token class-name">ManagementBaseObject</span> inPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementBaseObject</span> outPar <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">foreach</span><span class="token punctuation">(</span> <span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token operator">!</span> <span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span> <span class="token string">&quot;IPEnabled&quot;</span> <span class="token punctuation">]</span> <span class="token punctuation">)</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>

   inPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">GetMethodParameters</span><span class="token punctuation">(</span> <span class="token string">&quot;EnableStatic&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   inPar<span class="token punctuation">[</span><span class="token string">&quot;IPAddress&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;192.168.1.1&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
   inPar<span class="token punctuation">[</span><span class="token string">&quot;SubnetMask&quot;</span><span class="token punctuation">]</span>  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;255.255.255.0&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
   outPar <span class="token operator">=</span> mo<span class="token punctuation">.</span><span class="token function">InvokeMethod</span><span class="token punctuation">(</span> <span class="token string">&quot;EnableStatic&quot;</span><span class="token punctuation">,</span> inPar<span class="token punctuation">,</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>

 <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ReportIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">{</span>
  Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;****** Current IP addresses:&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementClass</span> mc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementClass</span><span class="token punctuation">(</span><span class="token string">&quot;Win32_NetworkAdapterConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">ManagementObjectCollection</span> moc <span class="token operator">=</span> mc<span class="token punctuation">.</span><span class="token function">GetInstances</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">foreach</span><span class="token punctuation">(</span> <span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> moc <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token operator">!</span> <span class="token punctuation">(</span><span class="token keyword">bool</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span> <span class="token string">&quot;IPEnabled&quot;</span> <span class="token punctuation">]</span> <span class="token punctuation">)</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>

   Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;{0}\\n  SVC: &#39;{1}&#39;   MAC: [{2}]&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span><span class="token string">&quot;Caption&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span><span class="token string">&quot;ServiceName&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span><span class="token string">&quot;MACAddress&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> addresses <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span> <span class="token string">&quot;IPAddress&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> subnets   <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> mo<span class="token punctuation">[</span> <span class="token string">&quot;IPSubnet&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>

   Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;  Addresses :&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sad <span class="token keyword">in</span> addresses<span class="token punctuation">)</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;\\t&#39;{0}&#39;&quot;</span><span class="token punctuation">,</span> sad <span class="token punctuation">)</span><span class="token punctuation">;</span>

   Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;  Subnets :&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sub <span class="token keyword">in</span> subnets <span class="token punctuation">)</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> <span class="token string">&quot;\\t&#39;{0}&#39;&quot;</span><span class="token punctuation">,</span> sub <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// ===============================================================================</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>WARNING: do MUCH more error checking, multiple NIC tests, timing!...
  use all at at your own risk!

--
  NETMaster  (Thomas Scheidegger)
  http://www.cetus-links.org/oo_csharp.html
</code></pre></div><p>&quot;Marco Scheel&quot; <a href="mailto:atWork@Visual-eVolution.de">atWork@Visual-eVolution.de</a> wrote in message news:14765441.1022081866849.JavaMail.SYSTEM@oscar...</p><blockquote><p>i&#39;m looking for a way to change the local ip address auf my notebook. i&#39;d like to write some code that can change my configuration from static ip to an dhcp configuration. looked at System.Managment, but i&#39;ve got no idea how this wmi thing works.</p></blockquote>`,26),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode18.html.vue"]]);export{i as default};
