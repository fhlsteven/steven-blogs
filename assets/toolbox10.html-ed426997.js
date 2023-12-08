import{_ as o,o as e,c as t,a as l}from"./app-f0851ed3.js";const n={},r=l(`<h1 id="timer控件控制每过一秒就给一个类的成员变量的值增加一" tabindex="-1"><a class="header-anchor" href="#timer控件控制每过一秒就给一个类的成员变量的值增加一" aria-hidden="true">#</a> timer控件控制每过一秒就给一个类的成员变量的值增加一</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  小弟我用一个timer控件控制每过一秒就给一个类的成员变量的值增加一，可是没有用？？？
作　　者：  luoxiang2000 (腾空)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  5
发表时间：  2003-8-10 22:48:45
</code></pre></div><p>大家知道，每次timer被触发，都会触发form_load事件，我调试过了，其实类a的x++在一次form_load中是有效的，但是当一次form_load结束，timer控件会控制form_load重新启动一次，x就恢复原来的值了？？？</p><hr><hr><p>回复人： zhouxsilenthill(月下的夜想曲) ( 二级(初级)) 信誉：100 2003-8-10 23:06:24 得分:2</p><blockquote><p>既然重新启动了，那所有form里的变量当然都初始化了</p></blockquote><p>回复人： luoxiang2000(腾空) ( 一级(初级)) 信誉：100 2003-8-10 23:21:51 得分:0</p><blockquote><p>不是重新启动，是重新form_load一次！</p></blockquote><p>回复人： zhouxsilenthill(月下的夜想曲) ( 二级(初级)) 信誉：100 2003-8-10 23:36:43 得分:6</p><blockquote><p>仔细看看你变量的作用域，分析一下把，这种事我也碰到过</p></blockquote><p>回复人： gujunyan(ivy) ( 一星(中级)) 信誉：99 2003-8-11 9:26:37 得分:6</p><blockquote><p>每次timer被触发，都会触发form_load事件?<br> web还是winform?<br> web的话,请使用cookie来记,<br> winform的话,根本不会存在问题.</p></blockquote><p>回复人： colin666(边缘) ( 一星(中级)) 信誉：100 2003-8-11 9:29:03 得分:6</p><blockquote><p>跟踪一下吧，看看有什么问题啊 ，</p></blockquote><p>该问题已经结贴 ，得分记录： zhouxsilenthill (2)、 zhouxsilenthill (6)、 gujunyan (6)、 colin666 (6)、</p>`,16),a=[r];function i(c,p){return e(),t("div",null,a)}const s=o(n,[["render",i],["__file","toolbox10.html.vue"]]);export{s as default};
