import{_ as n,o as s,c as a,a as o}from"./app-f0851ed3.js";const p={},t=o(`<h1 id="form问题-form间的跳转" tabindex="-1"><a class="header-anchor" href="#form问题-form间的跳转" aria-hidden="true">#</a> Form问题,form间的跳转</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  Form问题,form间的跳转
作　　者：  wick (坏人)
等　　级：  ^^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  80
回复次数：  6
发表时间：  2003-9-23 10:13:25
</code></pre></div><p>有两个form，form1&amp;form2<br> 执行form1中的某个事件,form1释放掉，form2获得焦点.<br> 我用<code>from1.dispose()</code>不行，把整个项目释放掉了。</p><p>如：</p><p>点击form1中的&quot;登录&quot;按钮,进入form2界面,form1释放.</p><hr><hr><p>回复人： zhouzhouzhou(人生程序) ( 三级(初级)) 信誉：100 2003-9-23 10:47:09 得分:25</p><blockquote><p>那么倒過來可不可以：）</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer_Tick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MenuEvent<span class="token punctuation">.</span>flag <span class="token operator">==</span> <span class="token string">&quot;relogin&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FrmLogin</span> frm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FrmLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        frm<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MenuEvent<span class="token punctuation">.</span>flag <span class="token operator">==</span> <span class="token string">&quot;reloginClose&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： cnhgj(戏子.Com？俺真TMD够菜) ( 一星(中级)) 信誉：100 2003-9-23 10:51:54 得分:15</p><blockquote><p>主窗体只能hide，不能close</p></blockquote><p>回复人： zhehui(小慧) ( 四级(中级)) 信誉：100 2003-9-23 10:58:10 得分:15</p><blockquote><p>form1 是一个主窗体。里面有一个main函数。是整个程序的入口。<br> 程序运行时，他要始终存在这个窗体。<br> 所以：主窗体只能hide，不能close</p></blockquote><p>回复人： snof(雪狼) ( 两星(中级)) 信誉：105 2003-9-23 11:09:27 得分:15</p><blockquote><p>如果你想dispose,那么它就不能做为主窗口，</p></blockquote><p>回复人： zhehui(小慧) ( 四级(中级)) 信誉：100 2003-9-23 11:18:34 得分:10</p><blockquote><p>点击form1中的&quot;登录&quot;按钮,进入form2界面,form1释放.<br> 把form2做为登陆界面就可以了。</p></blockquote><p>回复人： wick(坏人) ( 二级(初级)) 信誉：100 2003-9-23 11:32:35 得分:0</p><blockquote><p>学到.<br> 谢.</p></blockquote><p>该问题已经结贴 ，得分记录： zhouzhouzhou (25)、 cnhgj (15)、 zhehui (15)、 snof (15)、 zhehui (10)、</p>`,21),e=[t];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","appctr16.html.vue"]]);export{i as default};
