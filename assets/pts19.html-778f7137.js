import{_ as e,o as c,c as t,a}from"./app-d9da1b6d.js";const o={},d=a(`<h1 id="怎样在aspx的web服务中运用c-的线程" tabindex="-1"><a class="header-anchor" href="#怎样在aspx的web服务中运用c-的线程" aria-hidden="true">#</a> 怎样在ASPX的WEB服务中运用C#的线程</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  ?怎样在ASPX的WEB服务中运用C#的线程
作　　者：  jackstraw_lee (稻草人)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  1
发表时间：  2003-9-16 19:24:27
</code></pre></div><p>我在VISIUAL STADIO 中建立一个ASPX的WEB服务,语言选择C#.想在PAGELOAD函数中启动一个线程,装载大量数据的表.可是线程构造完表格后,向FRAME中LABEL中写数据无效.并且,通过<code>RegisterStartupScript</code>调用<code>JAVASCRIPT</code>语句重新装载页面也无效.哪位大侠知道怎样解决这个问题?</p><hr><hr><p>回复人： wolve(我是一个中专生) ( 五级(中级)) 信誉：101 2003-9-17 9:48:47 得分:100</p><blockquote><p>不建议你使用这种方法。可能是由于你主线程在子线程结束前已经<code>page_unload</code>了。所以子线程根本不会向client输入任何的东西。<br> 你在<code>page_onPreRender</code>前调用<code>childThread.join()</code>，这样保证在输出这前数据已加载完成。实际上是你从子线程得不到任何好处。</p></blockquote>`,7),n=[d];function r(s,l){return c(),t("div",null,n)}const i=e(o,[["render",r],["__file","pts19.html.vue"]]);export{i as default};
