import{_ as e,o,c as t,a as c}from"./app-a2b6e588.js";const a={},d=c(`<h1 id="c-获取当前日期-时间" tabindex="-1"><a class="header-anchor" href="#c-获取当前日期-时间" aria-hidden="true">#</a> C#获取当前日期/时间</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  C#获取当前日期/时间
作　　者：  CrazyWill (CrazyWill)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  9
发表时间：  2003-4-18 19:11:31
</code></pre></div><p>C#获取当前日期/时间,给个示例吧,thx</p><hr><hr><p>回复人： yqdeng(上帝 ☆ LOVE ☆ 世人) ( 两星(中级)) 信誉：115 2003-4-18 19:12:27 得分:0</p><blockquote><p><code>DateTime.Now();</code></p></blockquote><p>回复人： Knight94(愚翁) ( 两星(中级)) 信誉：110 2003-4-18 19:39:05 得分:0</p><blockquote><p>应该是<br><code>DateTime.Now;</code><code>DateTime.UtcNow;</code></p></blockquote><p>回复人： ganwang1982(无忧.NET) ( 二级(初级)) 信誉：105 2003-4-18 19:40:04 得分:0</p><blockquote><p><code>DateTime</code>的静态属性有：<br><code>Now、Today、UtcNow</code></p></blockquote><p>回复人： lkal4587(刘兄台) ( 四级(中级)) 信誉：103 2003-4-18 21:16:35 得分:0</p><blockquote><p>DateTime类<br> 自己看MSDN吧</p></blockquote><p>回复人： gbl777(荷西) ( 五级(中级)) 信誉：92 2003-4-18 21:21:42 得分:0</p><blockquote><p><code>DateTime.Now;</code></p></blockquote><p>回复人： zhangzs8896(小二) ( 五级(中级)) 信誉：100 2003-4-18 21:21:43 得分:20</p><blockquote><p><code>int t=Systerm.DataTime.Now;</code><br> 具体大小写你自己要主意!大概就这些,如果取系统的当前月,则应该再加.Month.<br> 也就是 <code>int m=Systerm.DataTime.Now.Month;</code><br> 取系统日期具体可以这样:<br><code>int y=Systerm.DataTime.Now.Year;</code><br><code>int m=Systerm.DataTime.Now.Month;</code><br><code>int d=Systerm.DataTime.Now.Date;</code><br><code>int s=y*10000+m*100+d;</code><br> 则s就是你所需要的系统日期.<br> 可能里面有点小错误,但大体就这些了,呵呵</p></blockquote><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-4-19 0:18:21 得分:0</p><blockquote><p>如果只是获取：<code>DateTime.Now；</code><br> 如果是要调整系统时间与日期：<br><code>System.Diagnostics.Process.Start(&quot;timedate.cpl&quot;);</code></p></blockquote><p>回复人： snewxf(心疤) ( 一星(中级)) 信誉：110 2003-4-26 17:22:40 得分:0</p><blockquote><p>晕！<br> 原来地球人都知道！呵呵！</p></blockquote><p>该问题已经结贴 ，得分记录： zhangzs8896 (20)、</p>`,22),n=[d];function r(p,i){return o(),t("div",null,n)}const l=e(a,[["render",r],["__file","sysinfo10.html.vue"]]);export{l as default};
