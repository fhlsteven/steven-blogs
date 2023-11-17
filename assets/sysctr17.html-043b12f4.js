import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p="/steven-blogs/assets/sysctr17_1-bd2a44b5.png",o={},e=t(`<h1 id="将错误信息记录到windows日志中" tabindex="-1"><a class="header-anchor" href="#将错误信息记录到windows日志中" aria-hidden="true">#</a> 将错误信息记录到Windows日志中</h1><h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h2><p>任何一个系统都不可能一劳永逸，一直没有错误的运行下去，一个优秀的系统的出错处理也一定是优秀的，而一个好的程序员也一定会很观注可能出错的地方，并作出相应的容错处理。C#中的try catch其实已经为我们省了不少事情，本文并不是并不是对如何做出错处理进行论述的，而是给出一种收集出错信息，并将出错信息存储到Windows日志中的方案。</p><h2 id="一、处理代码" tabindex="-1"><a class="header-anchor" href="#一、处理代码" aria-hidden="true">#</a> 一、处理代码</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">Town<span class="token punctuation">.</span>Log</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 功能：错误日志类，将错误信息按指定事件日志名记录在系统日志</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Error</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 记录日志</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sourceName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>日志资源名，如：Town<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>message<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>错误信息<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Log</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sourceName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">EventLog</span> eventLog <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token comment">// 确定日志是否存在</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>EventLog<span class="token punctuation">.</span><span class="token function">SourceExists</span><span class="token punctuation">(</span>sourceName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                EventLog<span class="token punctuation">.</span><span class="token function">CreateEventSource</span><span class="token punctuation">(</span>sourceName<span class="token punctuation">,</span> sourceName <span class="token operator">+</span> <span class="token string">&quot;Log&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>eventLog <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                eventLog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventLog</span><span class="token punctuation">(</span>sourceName <span class="token operator">+</span> <span class="token string">&quot;Log&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                eventLog<span class="token punctuation">.</span>Source <span class="token operator">=</span> sourceName<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 记录日志信息</span>
            eventLog<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>EventLogEntryType<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>设置：因为系统日志的操作是有权限控制的，所以我们还要把对系统日志操作的权限赋给asp.net用户，方法如下：<code>“开始-&gt;运行”</code>,输入命令，“regedt32”,找到<code>“System-&gt;CurrentControlSet-&gt;Services-&gt;Eventlog”</code>,选择<code>“安全-&gt;权限-&gt;添加”</code>，然后找到本机的“AspNet”用户，加进来并且给读取权限就好了，加进来后目录中会多一个“aspnet_wp account”</p><h2 id="二、调用方法" tabindex="-1"><a class="header-anchor" href="#二、调用方法" aria-hidden="true">#</a> 二、调用方法</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">//……</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Error<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">&quot;Town&quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="三、一点说明" tabindex="-1"><a class="header-anchor" href="#三、一点说明" aria-hidden="true">#</a> 三、一点说明</h2><p>系统出错后，会自动将出错信息记录到系统日志中，你可以在“开始-&gt;程序-&gt;管理工具-&gt;事件查看器”中发现一个新的项目“TownLog”，这便是记录出错信息的，如下图所示。</p><p><img src="`+p+'" alt="img_1"></p>',11),c=[e];function u(l,k){return s(),a("div",null,c)}const r=n(o,[["render",u],["__file","sysctr17.html.vue"]]);export{r as default};
