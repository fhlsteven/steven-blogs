import{_ as s,o as n,c as a,a as p}from"./app-a2b6e588.js";const t={},e=p(`<h1 id="简单实现crystal-report的动态加载" tabindex="-1"><a class="header-anchor" href="#简单实现crystal-report的动态加载" aria-hidden="true">#</a> 简单实现Crystal Report的动态加载</h1><blockquote><p>你是第64位浏览该文章的人 lins csdn 2003-8-19</p></blockquote><p>crystal reprot 为我们开发报表提供了很大的便利，但是它不能实现runtime时数据自定义，给开发带来了不完美。不过虽然我们不能runtime自定义数据，但我们还是可以实现runtime自定义加载报表。 要实现自定义加载报表，要使用推模式报表生成。（拉模式我没有试过，哪位网友要是实现了可以告诉我：) ）</p><p>回顾一下推模式的操作过程，在利用生成报表的那一步中，我们选择空报表。这个时候在解决方案中生成一个report.rpt（假定是这个名字），但是我们在方案目录下，我们还可以看到一个同名的report.cs。这个文件就是我们这次讨论的关键。我们先来看看这个文件有什么。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">WebApp_Crystal_Dynametic</span> <span class="token punctuation">{</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>Shared</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>ReportSource</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>CrystalReports<span class="token punctuation">.</span>Engine</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Report</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ReportClass</span></span> <span class="token punctuation">{</span>

<span class="token keyword">public</span> <span class="token function">Report</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ResourceName <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Report.rpt&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
……
</code></pre></div><p>看到红色高亮的程序吗？当我们向report推数据的时候report类如何把数据绑定到合适报表中呢，就是靠这个代码了！既然如此，那么我们如果能够动态改变它的返回值就可以动态加载报表了，让我们来试试。下面是我修改后的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">WebApp_Crystal_Dynametic</span> <span class="token punctuation">{</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>Shared</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>ReportSource</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">CrystalDecisions<span class="token punctuation">.</span>CrystalReports<span class="token punctuation">.</span>Engine</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Report</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ReportClass</span></span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> resourcename <span class="token operator">=</span> <span class="token string">&quot;Report.rpt&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">Report</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ResourceName <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> resourcename<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">set</span> <span class="token punctuation">{</span>
        resourcename <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
……
</code></pre></div><p>好现在我们再新建几个不同的报表（都是推模式的），在程序中我添加了几个button，不同的button事件中加载不同的报表，并把不同的数据推向报表。程序编译运行通过(window server 2003 + vs.net 2003)。</p><p>这样我们只要在程序中使用plugin模式,就可以在不改变源代码的情况下为程序添加新的报表文件。</p>`,9),o=[e];function c(l,u){return n(),a("div",null,o)}const r=s(t,[["render",c],["__file","toolbox7.html.vue"]]);export{r as default};
