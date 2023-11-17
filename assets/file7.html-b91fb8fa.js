import{_ as n,o as a,c as s,a as t}from"./app-a2b6e588.js";const o={},p=t(`<h1 id="在c-中调用dos应用程序" tabindex="-1"><a class="header-anchor" href="#在c-中调用dos应用程序" aria-hidden="true">#</a> 在c#中调用dos应用程序</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  在c#中调用dos应用程序
作　　者：  jianghong2003 (竹林老叟)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  5
发表时间：  2003-8-17 16:31:38
</code></pre></div><p>请教怎样在c#中调用dos应用程序</p><hr><hr><p>回复人： panyee(快乐王子) ( 两星(中级)) 信誉：100 2003-8-17 16:35:04 得分:20</p><blockquote><p><code>Process.Start(&quot;cmd.exe&quot;, &quot;/c mkdir c:\\\\123&quot;);</code>&lt;br 注意在加&quot;/c&quot;参数, 后面再跟dos命令</p></blockquote><p>回复人： yaoyaonet(绿洲) ( 四级(中级)) 信誉：100 2003-8-17 16:40:04 得分:0</p><blockquote><p>例</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Process</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>FileName <span class="token operator">=</span> <span class="token string">&quot;net.exe&quot;</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>Arguments <span class="token operator">=</span> @&quot;<span class="token class-name">share</span> DiskC<span class="token operator">=</span>c<span class="token punctuation">:</span>\\&quot;<span class="token punctuation">;</span>
p<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>CreateNoWindow <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>UseShellExecute <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>StartInfo<span class="token punctuation">.</span>ErrorDialog <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span>Start <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： jianghong2003(竹林老叟) ( 一级(初级)) 信誉：100 2003-8-18 1:35:11 得分:0</p><blockquote><p>在web应用程序中采用上述方法不行，程序界面没出来</p></blockquote><p>回复人： lese9(乐色.Net) ( 五级(中级)) 信誉：99 2003-8-18 2:02:06 得分:0</p><blockquote><p>倒，WEB程序里不出界面的，能通过调用后台程序实现功能就可以了呀。<br><br> 要是有1W人访问的话，出1W个DOS窗口？</p></blockquote><p>回复人： jianghong2003(竹林老叟) ( 一级(初级)) 信誉：100 2003-8-18 9:00:19 得分:0</p><blockquote><p>我当然有我的用意拉，既然实现不了，我只好另想办法啦</p></blockquote><p>该问题已经结贴 ，得分记录： panyee (20)、</p>`,17),e=[p];function c(l,u){return a(),s("div",null,e)}const k=n(o,[["render",c],["__file","file7.html.vue"]]);export{k as default};
