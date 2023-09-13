import{_ as e,r as t,o,c as p,b as n,d as s,e as c,a as l}from"./app-477de5b2.js";const i={},r={id:"windows服务开发",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#windows服务开发","aria-hidden":"true"},"#",-1),u={href:"https://www.cnblogs.com/jjstar/archive/2004/07/02/20354.html",target:"_blank",rel:"noopener noreferrer"},h=l(`<h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装" aria-hidden="true">#</a> 一、安装</h2><p>最近由于工作需要，写了一个windows服务程序，有许多经验，我会陆续写出来。</p><p>请原谅我从安装谈起，因为我一直有一个误区：只要从System.ServiceProcess.ServiceBase继承一个类并编译好就可以用.net提供的命令行程序InstallUtil.exe安装了。经过尝试，发现如果仅仅做了这样的一个类是无法用InstallUtil.exe安装的，在安装时会输出下面的信息：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>D:\\&gt;installutil windowsservice2.exe
Microsoft (R) .NET Framework Installation utility Version 1.1.4322.573
Copyright (C) Microsoft Corporation 1998-2002. All rights reserved.
Running a transacted installation.

Beginning the Install phase of the installation.
See the contents of the log file for the d:\\windowsservice2.exe assembly&#39;s progr
ess.
The file is located at d:\\windowsservice2.InstallLog.
Installing assembly &#39;d:\\windowsservice2.exe&#39;.
Affected parameters are:
   assemblypath = d:\\windowsservice2.exe
   logfile = d:\\windowsservice2.InstallLog
No public installers with the RunInstallerAttribute.Yes attribute could be found
 in the d:\\windowsservice2.exe assembly.

The Install phase completed successfully, and the Commit phase is beginning.
See the contents of the log file for the d:\\windowsservice2.exe assembly&#39;s progr
ess.
The file is located at d:\\windowsservice2.InstallLog.
Committing assembly &#39;d:\\windowsservice2.exe&#39;.
Affected parameters are:
   assemblypath = d:\\windowsservice2.exe
   logfile = d:\\windowsservice2.InstallLog
No public installers with the RunInstallerAttribute.Yes attribute could be found
 in the d:\\windowsservice2.exe assembly.
Remove InstallState file because there are no installers.

The Commit phase completed successfully.

The transacted install has completed.
</code></pre></div><p>这是因为installUtil.exe会用反射的方法去查找所有把RunInstallerAttribute设置为true的System.Configuration.Install.Installer类型，并执行上面的Install方法，当找不到的时候，安装就失败了。</p><p>所以我们必须要写一个从<a href="./pts6">Installer类</a>继承的类来满足installUtil.exe的要求。</p><h2 id="二、调试" tabindex="-1"><a class="header-anchor" href="#二、调试" aria-hidden="true">#</a> 二、调试</h2><p>由于windows服务的特殊性，其调试和通常的程序调试有一定的差别，下面我分别介绍几种方法：</p><h3 id="_1、微软推荐的方法" tabindex="-1"><a class="header-anchor" href="#_1、微软推荐的方法" aria-hidden="true">#</a> 1、微软推荐的方法</h3><p>1.1、调试windows服务的初始化、启动</p><p>另写一个程序控制服务的初始化和启动</p><p>1.2、调试windows服务的其他方面</p><p>就是附加到操作系统进程的方法</p><h3 id="_2、我的trace方法" tabindex="-1"><a class="header-anchor" href="#_2、我的trace方法" aria-hidden="true">#</a> 2、我的trace方法</h3><p>2.1、添加调试方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DebugRun</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/*
    初始化服务
    OnStart();
    Console.ReadLine();
    OnStop();
    */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2.2、改写程序入口为如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">if</span> </span><span class="token return-type class-name">DEBUG</span>
    <span class="token function">DebugRun</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token preprocessor property">#<span class="token directive keyword">else</span></span>
    <span class="token comment">/*
    初始化服务
    */</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endif</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>2.3、加入2种调试代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>EventLog<span class="token punctuation">.</span><span class="token function">WriteEntry</span><span class="token punctuation">(</span><span class="token string">&quot;...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>posted on 2004-07-05 13:17 陈叙远 阅读(6869) 评论(1)</p></blockquote>`,21);function k(w,g){const a=t("ExternalLinkIcon");return o(),p("div",null,[n("h1",r,[d,s(),n("a",u,[s("windows服务开发"),c(a)])]),h])}const m=e(i,[["render",k],["__file","pts7.html.vue"]]);export{m as default};
