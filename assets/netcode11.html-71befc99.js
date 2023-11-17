import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p="/steven-blogs/assets/netcode11_1-deaaede3.webp",e="/steven-blogs/assets/netcode11_2-f0933622.png",o="/steven-blogs/assets/netcode11_3-6da21b31.png",c={},l=t('<h1 id="用c-和microsoft-webbrowser控件创建自己的ie" tabindex="-1"><a class="header-anchor" href="#用c-和microsoft-webbrowser控件创建自己的ie" aria-hidden="true">#</a> 用C#和microsoft webbrowser控件创建自己的ie</h1><blockquote><p>你是第69位浏览该文章的人 netspy csdn 2003-7-21</p></blockquote><p>1、运行本例程需要</p><p>VS.net 2003<br> 装有ie browser<br> 如何简单的创建自己的ie浏览器？Mircosoft提供了一个COM组件供我们使用，此组件是一个AtiveX控件，实际上很多多窗口浏览器比如myie、te都是用了此控件。下面说说如何在C#里面使用它。</p><p>2、创建一个窗口运用程序</p><p>右击工具箱某一选项卡》添加/移除项...》COM组件》选中&quot;Microsoft Web Browser&quot;控件。</p><p><img src="'+p+'" alt="11_1"></p><p>3、按确定后控件出现在工具箱中。</p><p><img src="'+e+'" alt="11_2"></p><p>4、现在把它拖放到窗体上来，然后拖放一个TextBox供输入url，以及几个button用来实现“前进”、“后退”、“浏览”、“刷新”等功能。排一下布局，如图</p><p><img src="'+o+`" alt="11_3"></p><p>5、编码。以下是几个按钮的事件函数。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//浏览</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnGo_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Object</span> nullObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">Navigate</span><span class="token punctuation">(</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>txtUrl<span class="token punctuation">.</span>Text<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> nullObject<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> nullObject<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> nullObject<span class="token punctuation">,</span>
    <span class="token keyword">ref</span> nullObject
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//首页</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnHomepage_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">GoHome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//后退</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnBack_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">GoBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//前进</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnNext_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">GoForward</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//停止</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnStop_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//刷新</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnRefresh_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>axWebBrowser1<span class="token punctuation">.</span><span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>6、编译运行便可看到运行结果</p><p>VS.net帮我们做好了从com组件到托管组件的转换，如果不使用vs.net，你也可以使用aximp工具手工转换: <code>aximp c:\\windows\\system\\shdocvw.dll</code>，会生成AxSHDocVw.dll 和 SHDocVw.dl，然后在代码里引用它即可。</p><p>mike from http://sunrise.szu.cn</p>`,16),u=[l];function k(i,r){return s(),a("div",null,u)}const m=n(c,[["render",k],["__file","netcode11.html.vue"]]);export{m as default};
