import{_ as n,o,c as s,a as t}from"./app-477de5b2.js";const a={},e=t(`<h1 id="编码问题" tabindex="-1"><a class="header-anchor" href="#编码问题" aria-hidden="true">#</a> 编码问题?</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  编码问题?
作　　者：  Apollo206 (Apollo_net)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  8
发表时间：  2003-9-19 13:21:32
</code></pre></div><p>怎么将<br> &quot;我的音乐网站&quot;<br> 转换成网页编码<br> &quot;%CE%D2%B5%C4%D2%F4%C0%D6%CD%F8%D5%BE&quot;</p><hr><hr><p>回复人： Apollo206(Apollo_net) ( 一级(初级)) 信誉：100 2003-9-19 14:01:12 得分:0</p><blockquote><p>没有人知道吗</p></blockquote><p>回复人： wjhs(杰借) ( 二级(初级)) 信誉：100 2003-9-19 14:43:16 得分:0</p><blockquote><p>ding<br> dingding</p></blockquote><p>回复人： TonyJoule(寒星㊣) ( 四级(中级)) 信誉：100 2003-9-19 15:43:47 得分:10</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>HttpUtility<span class="token punctuation">.</span><span class="token function">UrlEncode</span><span class="token punctuation">(</span><span class="token string">&quot;我的音乐网站&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： Apollo206(Apollo_net) ( 一级(初级)) 信誉：100 2003-9-20 14:19:01 得分:0</p><blockquote><p>谢谢TonyJoule(寒星㊣)<br> 不过好象还是没办法达到<br> 变成&quot;%CE%D2%B5%C4%D2%F4%C0%D6%CD%F8%D5%BE&quot;<br> 而是得到&quot;%e6%88%91%e7%9a%84%e9%9f%b3%e4%b9%90%e7%bd%91%e7%ab%99&quot;</p></blockquote><p>回复人： TonyJoule(寒星㊣) ( 四级(中级)) 信誉：100 2003-9-22 9:48:12 得分:0</p><blockquote><p>To Apollo206(Apollo_net)：<br> 为什么一定要求变成&quot;%CE%D2%B5%C4%D2%F4%C0%D6%CD%F8%D5%BE&quot;这种格式呢？<br></p></blockquote><p>回复人： Rossetti(飘) ( 二级(初级)) 信誉：100 2003-9-22 10:17:14 得分:5</p><blockquote><p><code>HttpUtility.UrlEncode()</code></p></blockquote><p>回复人： redfoilsman(redfoilsman) ( 一级(初级)) 信誉：100 2003-9-22 10:31:14 得分:0</p><blockquote><p>用<code>HttpUtility.UrlEncode()</code>编码得到的的确是<br><br> %e6%88%91%e7%9a%84%e9%9f%b3%e4%b9%90%e7%bd%91%e7%ab%99<br><br> 还需要什么要求吗?</p></blockquote><p>回复人： redfoilsman(redfoilsman) ( 一级(初级)) 信誉：100 2003-9-22 10:41:23 得分:5</p><blockquote><p>你所要得是变成unicode<br><br> 用<code>Encoding.GetEncoding(&quot;gb2312&quot;).GetBytes(str);</code><br><br> 然后打印下来，编程字符串也可以，看看就知道了</p></blockquote><p>回复人： Apollo206(Apollo_net) ( 一级(初级)) 信誉：100 2003-9-29 5:46:52 得分:0</p><blockquote><p>谢谢大家!好久没来了<br> 因为有些文件是中文格式的,在ie下经常出现文件不存在的现象.<br> 所以我需要把他们转化成<code>urlencode</code>的格式.</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Encoding</span> encode <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span><span class="token function">GetEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;gb2312&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>HttpUtility<span class="token punctuation">.</span><span class="token function">UrlEncode</span><span class="token punctuation">(</span><span class="token string">&quot;我的音乐网站&quot;</span><span class="token punctuation">,</span>encode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,25),p=[e];function c(l,u){return o(),s("div",null,p)}const r=n(a,[["render",c],["__file","cspcsg15.html.vue"]]);export{r as default};
