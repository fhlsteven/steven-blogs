import{_ as n,o as s,c as a,a as e}from"./app-f0851ed3.js";const t="/steven-blogs/assets/menu4_1-c4737b13.png",p="/steven-blogs/assets/menu4_2-1d25b5a9.png",o={},c=e(`<h1 id="自画菜单中如何触发measureitem事件的问题及解决办法" tabindex="-1"><a class="header-anchor" href="#自画菜单中如何触发measureitem事件的问题及解决办法" aria-hidden="true">#</a> 自画菜单中如何触发MeasureItem事件的问题及解决办法</h1><p>目前的gsp workflow designer是有国际化支持的：多语言、数字、日历等。今天刚刚把多语言加上。默认的designer是english的，菜单显示正常。但是切换到中文后，主菜单的汉字都挤到一起了。如果中文是默认语言，那么切换到english之后，english的菜单现实的宽度和汉字的时候是一样的。所以，我就断定，MeasureItem Event没有被触发。我设置的断点没有到达，也证实了这点。</p><p>到google上一开始搜索：how to raise MeasureItem event in a menu，未果。只找到了一个listbox类似的问题。后来突然想到，应该这么搜索：fired MeasureItem event in a menu，找到了和上面类似的解决方法。然后自己试验了一下，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">ArrayList</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">MenuItem</span> mi <span class="token keyword">in</span> mainmenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">)</span>list<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mi<span class="token punctuation">)</span><span class="token punctuation">;</span>
Mainmenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">MenuItem</span> mi <span class="token keyword">in</span> list<span class="token punctuation">)</span>mainmenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mi<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// mainmenu是我扩展的，所有的redraw都在里面。Init方法是为了对每个menuitem进行ownerdraw标志的设置，以及对于DrawItem/MeasureItem两个event进行handle</span>
mainmenu<span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>嗬嗬，然后就搞定了。问题原因，应该是：MeasureItem这个event只有在第一次显示的时候或者“必要”的时候，才被触发。其他的时候，没有反应。而添加item到menu的collection并且重新显示，会触发这个事件的。</p><p>发两个效果图在这里吧！</p><p><img src="`+t+'" alt="menu4_1"></p><p>这是汉字的：</p><p><img src="'+p+'" alt="menu4_2"></p><p>posted on 2004-07-30 15:42 鞠强 阅读(69) 评论(2)</p><hr><hr><p>2004-07-30 15:43 juqiang</p><blockquote><p>晕！图片压缩后，怎么有“断痕”了？</p></blockquote><p>2004-07-31 18:25 3188.NET</p><blockquote><p>想请教如何在程序在运行实现你上面设计的效果<br><br> 就像上面修改属性和和移动更改控件大小的效果</p></blockquote>',16),u=[c];function i(l,r){return s(),a("div",null,u)}const k=n(o,[["render",i],["__file","menu4.html.vue"]]);export{k as default};