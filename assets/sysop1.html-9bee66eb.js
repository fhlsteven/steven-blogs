import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="在win2000下如何用c-改变系统日期时间-急-在线等待" tabindex="-1"><a class="header-anchor" href="#在win2000下如何用c-改变系统日期时间-急-在线等待" aria-hidden="true">#</a> 在WIN2000下如何用C#改变系统日期时间--急（在线等待）</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  在WIN2000下如何用C#改变系统日期时间--急（在线等待）
作　　者：  yangzhiguo (小楊)  
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  6
发表时间：  2003-9-22 10:31:07
</code></pre></div><p>在WIN2000下如何用C#改变系统日期时间--谢谢</p><hr><hr><p>回复人： <em>weiKun</em>(Virus) ( 五级(中级)) 信誉：100 2003-9-22 10:35:33 得分:0</p><blockquote><p>用C#的WMI编程，可以远程控制服务器</p></blockquote><p>回复人： <em>weiKun</em>(Virus) ( 五级(中级)) 信誉：100 2003-9-22 10:36:18 得分:0</p><blockquote><p>用C#的WMI编程，可以远程控制服务器</p></blockquote><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-9-22 10:40:36 得分:100</p><blockquote><p>1、调用控制面板选项：timedate.cpl<br> 2、使用WMI进行改变：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication20</span>
<span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
  <span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">SYSTEMTIME</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wYear<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wMonth<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wDayOfWeek<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wDay<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wHour<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wMinute<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wSecond<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> wMilliseconds<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> <span class="token function">ToDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DateTime</span><span class="token punctuation">(</span>wYear<span class="token punctuation">,</span> wMonth<span class="token punctuation">,</span> wDay<span class="token punctuation">,</span> wHour<span class="token punctuation">,</span> wMinute<span class="token punctuation">,</span> wSecond<span class="token punctuation">,</span> wMilliseconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">class</span> <span class="token class-name">Win32API</span>
  <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">SYSTEMTIME</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">out</span> <span class="token class-name">SYSTEMTIME</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">class</span> <span class="token class-name">Class1</span>
  <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token class-name">SYSTEMTIME</span> st<span class="token punctuation">;</span>
      Win32API<span class="token punctuation">.</span><span class="token function">GetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">out</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// gets current time</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> st<span class="token punctuation">.</span><span class="token function">ToDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToLocalTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
      st<span class="token punctuation">.</span>wMinute<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// Adjust minutes</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Win32API<span class="token punctuation">.</span><span class="token function">SetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">ref</span> st<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// sets system time</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;An error occured setting the system time&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      Win32API<span class="token punctuation">.</span><span class="token function">GetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">out</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// gets current time</span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span> st<span class="token punctuation">.</span><span class="token function">ToDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToLocalTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
      Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-9-22 10:41:53 得分:0</p><blockquote><p>其中第一种方法比较简单，你可以参考：<br><code>http://expert.csdn.net/Expert/TopicView1.asp?id=1680542</code></p></blockquote><p>回复人： Soking(Soking) ( 四级(中级)) 信誉：100 2003-9-22 10:51:36 得分:0</p><blockquote><p><code>DataTime.Now = new DataTime(---);</code></p></blockquote><p>回复人： Soking(Soking) ( 四级(中级)) 信誉：100 2003-9-22 10:54:23 得分:0</p><blockquote><p>or<br><code>DataTime.Now = DataTime.Prase(&quot;---&quot;);</code></p></blockquote><p>回复人： ismezy2002(扬) ( 三级(初级)) 信誉：95 2003-9-22 11:12:15 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">SystemTime</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Year<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Month<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> DayOfWeek<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Day<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Hour<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Minute<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Second<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> Milliseconds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> MyDateTime
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Kernel32.dll&quot;</span><span class="token punctuation">,</span> CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">SystemTime</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetSystemTime</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> year<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> mon<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> day<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> hour<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> min<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> sec<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SystemTime</span> st <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SystemTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Year <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>year<span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Month <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>mon<span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Day <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>day<span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Hour <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>hour<span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Minute <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>min<span class="token punctuation">;</span>
        st<span class="token punctuation">.</span>Second <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>sec<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">SetSystemTime</span><span class="token punctuation">(</span><span class="token keyword">ref</span> st<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>该问题已经结贴 ，得分记录： cocosoft (100)、</p>`,22),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysop1.html.vue"]]);export{i as default};
