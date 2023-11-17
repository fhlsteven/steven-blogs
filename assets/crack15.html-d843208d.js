import{_ as e,o as a,c as d,a as t}from"./app-a2b6e588.js";const n={},o=t(`<h1 id="流光-4-5-完全破解" tabindex="-1"><a class="header-anchor" href="#流光-4-5-完全破解" aria-hidden="true">#</a> 流光 4.5 完全破解</h1><blockquote><p>日期：2003年6月9日 作者：boyhacker 人气： 539</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>[注]新版的4.7已经加壳，此文仅供初学者参考。
www.sandflee.net 2002-3-1 灰色轨迹
流光 4.5 完全破解(补充)
</code></pre></div><p>前言:对不起,各位,上次写了一文,发现高级扫描不能用:) 所以这次写了一个补充的,呵呵.</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>作者:oo0o
真实姓名:hang feilu
地址:yn_zt_x school_高200
破解日期:2002.2.13
使用时间:20 m
目标:release iv build 3116 expired 2002/12/31
级别:低
</code></pre></div><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>1.出于测试的原因,小榕并没有加壳,给破解带来一定的方便,但是有数字验证.<br> 2.对国内ip限制.<br> 3.为了方便,不破解key认证,而是暴破.</p><p>使用工具:w32dasm 8.93 ,hiew</p><h3 id="_1-准备工作" tabindex="-1"><a class="header-anchor" href="#_1-准备工作" aria-hidden="true">#</a> 1.准备工作</h3><p>将流光目录fluxay45.exe 用w32dasm反汇编, 并将反汇编内容存为fluxay45.txt(方便测试与修改)<br> 将fluxay45.exe备份到其它目录</p><p>需要了解的基础:</p><p>工具:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>w32dasm 用于静态反汇编
hiew 用于修改程序
</code></pre></div><p>汇编命令:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>test 测试.(两操作数作与运算,仅修改标志位,不回送结果).
je/jz 等于转移.
jmp 无条件转移指令.
jle/jng 小于或等于转移.
</code></pre></div><h3 id="_2-去除数字验证" tabindex="-1"><a class="header-anchor" href="#_2-去除数字验证" aria-hidden="true">#</a> 2.去除数字验证</h3><p>记事本打开fluxay45.txt,查找&quot;数字验证失败&quot;,会找到</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:00406e29(u)
|
:00406e30 85c0 test eax, eax
:00406e32 7438 je 00406e6c ;比较,相等就跳,否则就显示数字验证失败,
;改为jmps:)具体步骤见下
:00406e34 a1a4f15800 mov eax, dword ptr [0058f1a4]
:00406e39 51 push ecx
:00406e3a 85c0 test eax, eax
:00406e3c 8bcc mov ecx, esp
:00406e3e 740b je 00406e4b
:00406e40 89642428 mov dword ptr [esp+28], esp

* possible stringdata ref from data obj -&gt;&quot;数字验证失败，可能被病毒感染或者捆绑了恶意程序&quot;
-&gt;&quot;。&quot;
|
:00406e44 6804b25200 push 0052b204
:00406e49 eb09 jmp 00406e54
</code></pre></div><p>打开hiew,选择流光目录下的fluxay45.exe<br> 按f4选择<code>decode</code>,按f7在<code>hex</code>处填入 <code>85 c0 74 38 a1 a4</code><br> (填多点,一次性找到,不然可能找到很多重复代码,:)<br> 按f3修改<code>7438为eb38</code>,按f9更新文件,按f10退出&lt;-注意是按f10,不是esc,不然会不更新文件.<br> 执行fluxay45.exe试一试,没有提示,说明成功!退出fluxay45.exe</p><h3 id="_3-去除国内ip限制" tabindex="-1"><a class="header-anchor" href="#_3-去除国内ip限制" aria-hidden="true">#</a> 3.去除国内ip限制</h3><h4 id="_1-pop3-nt-ftp-sql扫描破解" tabindex="-1"><a class="header-anchor" href="#_1-pop3-nt-ftp-sql扫描破解" aria-hidden="true">#</a> 1) pop3/nt/ftp/sql扫描破解</h4><p>先试一下fluxay45.exe,按ctrl+r填入国内ip网段211.x.x.1 -211.x.x.255 .扫描<br> 可看到&quot;对此ip保留, 忽略...&quot; 字样<br> 打开fluxay45.txt ,查找&quot;对此ip保留&quot;,找到如下</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:00473f13(c)
|
.... 处理数据部份,省略:)...........以上好复杂~~~~~~~~~:)
:00473fdb 85c0 test eax, eax
:00473fdd 746d je 0047404c ;比较,不同则跳,就是改这儿了!具体见下
:00473fdf 68d4070000 push 000007d4
:00473fe4 e866430600 call 004d834f
:00473fe9 8b0da4f15800 mov ecx, dword ptr [0058f1a4]
:00473fef 33db xor ebx, ebx
:00473ff1 83c404 add esp, 00000004
:00473ff4 3bcb cmp ecx, ebx
:00473ff6 a344045900 mov dword ptr [00590444], eax
:00473ffb 7407 je 00474004

* possible stringdata ref from data obj -&gt;&quot;对此ip保留, 忽略...&quot;
|
:00473ffd 68908d5400 push 00548d90
:00474002 eb05 jmp 00474009
</code></pre></div><p>打开hiew,选择流光目录下的fluxay45.exe<br> 按f4选择<code>decode</code>,按f7在hex处填入 <code>85 c0 74 6d 68 d4</code>(填多点,一次性找到:)<br> 按f3修改<code>746d为eb6d</code>,按f9更新文件,按f10退出.<br> 执行fluxay45.exe,按ctrl+r试一试.<code>211.x.x.1 - 211.x.x.25</code><br> 嘿嘿c_c 成功了~~~~~~~</p><hr><h4 id="_2-高级扫描破解" tabindex="-1"><a class="header-anchor" href="#_2-高级扫描破解" aria-hidden="true">#</a> 2)高级扫描破解</h4><p>先试一下fluxay45.exe,按ctrl+a填入国内ip网段211.x.x.1 -211.x.x.25 .扫描<br> 可看到&quot;不在此版本的许可的ip范围内，忽略.&quot; 字样 &lt;====注意: 与pop3/nt/ftp/sql扫描不一样哦:)<br> 打开fluxay45.txt ,查找&quot;不在此版本的许可的ip范围内&quot;,找到了两处:)<br> 先看第一处</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:00466feb(c)
|
..............................略
:00467064 83c404 add esp, 00000004
:00467067 85c0 test eax, eax ;:)大家是不是觉得有点眼熟?
:00467069 746b je 004670d6 ;看来就是改这个了:)
:0046706b 8b1568165500 mov edx, dword ptr [00551668]
:00467071 8955dc mov dword ptr [ebp-24], edx
:00467074 a1a4f15800 mov eax, dword ptr [0058f1a4]
:00467079 c645fc7e mov [ebp-04], 7e
:0046707d 3bc7 cmp eax, edi
:0046707f 7412 je 00467093
:00467081 8b857cffffff mov eax, dword ptr [ebp+ffffff7c]
:00467087 8d4ddc lea ecx, dword ptr [ebp-24]
:0046708a 50 push eax

* possible stringdata ref from data obj -&gt;&quot;%s 不在此版本的许可的ip范围内，忽略。&quot;
|
:0046708b 68dc715400 push 005471dc
:00467090 51 push ecx
:00467091 eb10 jmp 004670a3
</code></pre></div><p>用hiew 改 <code>746b</code>为 <code>eb6b</code>😃</p><p>改完后发现不行哦!!!</p><hr><p>看下一处:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:004b1bae(u)
|
:004b1afe 8b542418 mov edx, dword ptr [esp+18]
:004b1b02 8d8c2480110000 lea ecx, dword ptr [esp+00001180]
:004b1b09 52 push edx
:004b1b0a e8c133ffff call 004a4ed0
:004b1b0f 85c0 test eax, eax ;:)就只有它了.呵
:004b1b11 7450 je 004b1b63 ;改 74 为eb
:004b1b13 a1a4f15800 mov eax, dword ptr [0058f1a4]
:004b1b18 85c0 test eax, eax
:004b1b1a 7411 je 004b1b2d
:004b1b1c 8b442418 mov eax, dword ptr [esp+18]
:004b1b20 8d4c2414 lea ecx, dword ptr [esp+14]
:004b1b24 50 push eax

* possible stringdata ref from data obj -&gt;&quot;%s 不在此版本的许可的ip范围内，忽略。&quot;
|
:004b1b25 68dc715400 push 005471dc
:004b1b2a 51 push ecx
:004b1b2b eb0f jmp 004b1b3c
</code></pre></div><p>打开hiew,选择流光目录下的fluxay45.exe<br> 按f4选择decode,按f7在hex处填入 <code>85 c0 74 50 a1 a4 f1</code>(填多点,一次性找到:)<br> 按f3修改7450为eb50,按f9更新文件,按f10退出.<br> 执行fluxay45.exe,按ctrl+a试一试.<code>211.x.x.1 - 211.x.x.25</code></p><p>wow.提示选择流光主机:) yeah 成功 第一处改了之后,大家不用改回来:)也许是以前版本的流光核心.<br> 当然如果不能用还是改回来^_^</p><hr><h4 id="_3-ipc-国内ip限制" tabindex="-1"><a class="header-anchor" href="#_3-ipc-国内ip限制" aria-hidden="true">#</a> 3)<code>ipc$</code> 国内ip限制</h4><p><code>先试一下fluxay45.exe,添加一个ipc$主机:) x.x.x.x &lt;===感谢&quot;&amp;╦快乐王子&quot;提供点右键-&gt;探测-&gt;探测ipc$用户列表.</code></p><p><code>================================</code></p><p>提示:</p><p>fluxay 4.5&gt;正在连接主机202.x.x.x...<br> 此ip地址不提供<code>ipc$</code>探测。<br> 没有用户。<br> 所有用户列表线程成功退出。</p><p><code>=================================</code></p><p>找到四处!!!<br> 第一处 ^_^</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:0047eca2(u)
..................处理数据部份,省略
:0047ed42 85c0 test eax, eax ;有点象哦.
:0047ed44 0f84df000000 je 0047ee29 ;改为 jmp
:0047ed4a 391da4f15800 cmp dword ptr [0058f1a4], ebx ;比较是什么语言代码
:0047ed50 740c je 0047ed5e ;是e文就跳到下面显示&quot;this ip range is disabled.&quot;
:0047ed52 8d4c2410 lea ecx, dword ptr [esp+10]

* possible stringdata ref from data obj -&gt;&quot;此ip地址不提供ipc$探测。&quot;
|
:0047ed56 6874965400 push 00549674
:0047ed5b 51 push ecx
:0047ed5c eb0a jmp 0047ed68

* referenced by a (u)nconditional or (c)onditional jump at address:
|:0047ed50(c)
|
:0047ed5e 8d542410 lea edx, dword ptr [esp+10]

* possible stringdata ref from data obj -&gt;&quot;this ip range is disabled.&quot;
|
:0047ed62 6858965400 push 00549658
:0047ed67 52 push edx
</code></pre></div><p>用hiew 按f7查找 上面的那串代码(注意上下文代码是否一至:)我找了好几次才找到,小心一点!!!死了别怪我:)<br> 按f3再按回车改<code>je 0047ee29</code> 为 <code>jmp 0047ee29</code><br> 启动流光,试一下:)不行哦!!!</p><hr><p>看第二处 !_!</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:00480f81(u)
|
..........................处理数据部份,省略
:00480ffd 85c0 test eax, eax ;:)呵呵呵.一定是
:00480fff 7440 je 00481041 ;改为 eb
:00481001 393da4f15800 cmp dword ptr [0058f1a4], edi
:00481007 740c je 00481015
:00481009 8d542410 lea edx, dword ptr [esp+10]

* possible stringdata ref from data obj -&gt;&quot;此ip地址不提供ipc$探测。&quot;
|
:0048100d 6874965400 push 00549674
:00481012 52 push edx
:00481013 eb0a jmp 0048101f
</code></pre></div><p>打开hiew,选择流光目录下的fluxay45.exe<br> 按f4选择decode,按f7在hex处填入 <code>85 c0 74 40 39 3d a4</code>(填多点,一次性找到:)<br> 按f3修改<code>7450</code>为<code>eb50</code>,按f9更新文件,按f10退出.<br> 执行fluxay45.exe,,添加一个<code>ipc$</code>主机:) <code>x.x.x.x</code><br><code>点右键-&gt;探测-&gt;探测ipc$用户列表</code>.</p><p><code>====================================</code></p><p><strong>显示</strong>:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>fluxay 4.5&gt;正在连接主机202.x.x.x...
和主机202.x.x.x空连接建立成功。
正在读取主机202.x.x.x的用户列表，请等待...
主机202.x.x.x的用户 00: administrator* (管理计算机(域)的内置帐户)
主机202.x.x.x的用户 01: guest* (供来宾访问计算机或访问域的内置帐户)
读取主机202.x.x.x的用户列表完成，2个用户。

fluxay 4.5&gt;正在连接主机202.x.x.x...
此ip地址不提供ipc$探测。 ?咦?这个是探测什么的。是不是还有呀。kao再试所有用户列表线程成功退出。

fluxay 4.5&gt;准备探测主机202.x.x.x...
所有用户列表线程成功退出。
探测202.x.x.x: guest............【空】
....................省了一串:)
探测202.x.x.x: administrator............12345
探测结束，得到主机202.x.x.x的0个帐号。
所有远程登陆线程成功退出。
</code></pre></div><p><code>======================================</code></p><hr><p>第三处@_@</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:004849a6(u)
...................省略：）
:00484a19 85c0 test eax, eax ;又是。kao！管它是干什么的。
:00484a1b 7440 je 00484a5d ;改：）请大家注意备份。
:00484a1d 391da4f15800 cmp dword ptr [0058f1a4], ebx
:00484a23 740c je 00484a31
:00484a25 8d542410 lea edx, dword ptr [esp+10]

* possible stringdata ref from data obj -&gt;&quot;此ip地址不提供ipc$探测。&quot;
|
:00484a29 6874965400 push 00549674
:00484a2e 52 push edx
:00484a2f eb0a jmp 00484a3b
</code></pre></div><p>打开hiew,选择流光目录下的fluxay45.exe<br> 按f4选择decode,按f7在hex处填入 <code>85 c0 74 40 39 1d a4</code>(填多点,一次性找到:)<br> 按f3修改<code>7450</code>为<code>eb50</code>,按f9更新文件,按f10退出.<br> 执行fluxay45.exe,删除刚才用户列表,再试<br> 点右键-&gt;探测-&gt;探测<code>ipc$</code>用户列表.<br> 与第二显示一样，kao</p><hr><p>第四处<code>*_*</code></p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>referenced by a (u)nconditional or (c)onditional jump at address:
|:004935af(u)
|....................略
:00493631 85c0 test eax, eax ;有备份的举手。：）
:00493633 0f84b7000000 je 004936f0 ;改！&gt;:|
:00493639 391da4f15800 cmp dword ptr [0058f1a4], ebx
:0049363f 740c je 0049364d
:00493641 8d442410 lea eax, dword ptr [esp+10]

* possible stringdata ref from data obj -&gt;&quot;此ip地址不提供ipc$探测。&quot;
|
:00493645 6874965400 push 00549674
:0049364a 50 push eax
:0049364b eb0a jmp 00493657
</code></pre></div><p>用hiew改，不写了.shit!(噢，英语老师最不让说的词^_^下次不说了)<br> 算了，说两句<br> 是按f3再按回车改 <code>je 004936f0 为 jmp 004936f0</code></p><p>执行fluxay45.exe,删除刚才的用户列表<br> 点右键-&gt;探测-&gt;探测<code>ipc$</code>用户列表.</p><p><code>===============================</code></p><p><strong>显示</strong>:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>fluxay 4.5&gt;正在连接主机202.x.x.x...
和主机202.x.x.x空连接建立成功。
正在读取主机202.x.x.x的用户列表，请等待...
主机202.x.x.x的用户 00: administrator* (管理计算机(域)的内置帐户)
主机202.x.x.x的用户 01: guest* (供来宾访问计算机或访问域的内置帐户)
读取主机202.x.x.x的用户列表完成，2个用户。

fluxay 4.5&gt;正在连接主机202.x.x.x...
和主机202.x.x.x空连接建立成功。
正在读取主机202.x.x.x的共享列表，请等待...
读取主机202.x.x.x的共享列表失败(错误号: 259)， ;看看，哦是读share列表。怎么能不改这个功能哩:)
对方主机不允许。
所有用户列表线程成功退出。

fluxay 4.5&gt;准备探测主机202.x.x.x...
探测202.x.x.x: guest............【空】
....................省略若干
探测202.x.x.x: administrator............12345
探测结束，得到主机202.x.x.x的0个帐号。
所有远程登陆线程成功退出。
fluxay 4.5&gt;保存项目....ok.
fluxay 4.5&gt;打开项目....ok,已经探测0个密码。
</code></pre></div><p><code>========================================================</code></p><p><code>ipc$</code>大大大功告成了。😃 好复杂。由于太多，可能有些地方会写错，有错mail me :<code>oo0o@ynmail.com</code><br> 不过我是可以用：）呵。不要找我要，好象 <code>www.xzero.org</code> 上有破解的。我写这文是为了让大家了解破解。</p><p>4.对了，好象还有日期破解：？5........写吧。写完了，我再也不上网了，我要好好学习了：）<br> 请把各位的日期调到2003年，执行fluxay45.exe</p><p>提示&quot;流光已经到期&quot;云云<br> 打开 fluxay45.txt 按ctrl+home 到文本最开头，以&quot;到期&quot;为关键字查找。又是四处！！！<br> 怎么会有四处？：）试一下</p><p>第一处:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* referenced by a (u)nconditional or (c)onditional jump at address:
|:004f050c(u)
|.......................略
:00406605 3d3e4f123e cmp eax, 3e124f3e
:0040660a 7e4b jle 00406657
:0040660c 6a00 push 00000000
:0040660e 8d4c2434 lea ecx, dword ptr [esp+34]
:00406612 e899a40000 call 00410ab0
:00406617 a1a4f15800 mov eax, dword ptr [0058f1a4]
:0040661c 51 push ecx
:0040661d 85c0 test eax, eax
:0040661f c784245807000000000000 mov dword ptr [esp+00000758], 00000000
:0040662a 8bcc mov ecx, esp
:0040662c 740b je 00406639 ;看着它就想睡觉:) 改！（先备份）
:0040662e 8964240c mov dword ptr [esp+0c], esp

* possible stringdata ref from data obj -&gt;&quot;【流光4.5】已经到期，请到http://www.netxeyes.c&quot;
-&gt;&quot;om下载新版本。&quot;
|
:00406632 68a0b15200 push 0052b1a0
:00406637 eb09 jmp 00406642
</code></pre></div><p>改 <code>740b</code> 为<code>eb0b</code> ok 执行，？不行？<br> 大家注意到这儿了么？</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:00406605 3d3e4f123e cmp eax, 3e124f3e
:0040660a 7e4b jle 00406657
</code></pre></div><p><code>jle/jng</code> 小于或等于转移.会不会是小于某个日期就跳呢？：）改 结果：不行。呵。不过一定是改了一部份。（猜）</p><p>第二处:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:00407ac5 3d3e4f123e cmp eax, 3e124f3e
:00407aca 7e4b jle 00407b17 ;改 7e4b 为eb4b
:00407acc 6a00 push 00000000
:00407ace 8d4c2434 lea ecx, dword ptr [esp+34]
:00407ad2 e8d98f0000 call 00410ab0
:00407ad7 a1a4f15800 mov eax, dword ptr [0058f1a4]
:00407adc 51 push ecx
:00407add 85c0 test eax, eax
:00407adf c784245807000000000000 mov dword ptr [esp+00000758], 00000000
:00407aea 8bcc mov ecx, esp
:00407aec 740b je 00407af9
:00407aee 8964240c mov dword ptr [esp+0c], esp

* possible stringdata ref from data obj -&gt;&quot;【流光4.5】已经到期，请到http://www.netxeyes.c&quot;
-&gt;&quot;om下载新版本。&quot;
|
:00407af2 68a0b15200 push 0052b1a0
:00407af7 eb09 jmp 00407b02
</code></pre></div><p>大家用hiew改 <code>7e4b</code> 为 <code>eb4b</code> （不用我写了吧：）</p><p>执行，？可以了？：）呵呵呵。大功告成。^_^</p><p>省下的几处我也难得试了，也许某些地方还有限制，有兴趣的自己试吧。</p><p>结束语：流光4.5 的破解其实已经很简单了，大家也不要再为难小榕了：） 大家也许不知道流光2001的破解要难得多，流光连上几个网站下载过期数据。：）这个似乎已经去除？<br> 还有那个调查表也比这个难（有兴趣的找来破破：）用softice跟踪吧。静态反汇编比较麻烦）</p><p>本人菜鸟一只，在网上没找到流光4.5，也没有cracker写它的破解方法，(也许是我找不到吧：）<br> 所以写此文，有错的地方大家请指点^_^<br> 如果还有哪不行，请mail me:<code>oo0o@ynmail.com</code> 我不想在qq上聊 &lt;低级问题一概不答,没时间，sorry&gt;:)</p><p>附：有几个地方也许是以前版本的流光内核,改不改都行，有兴趣的试一下。不过我不想改回来了：）<br> 懒！如果死了之类，请改回来。有备份？<code>^_^</code> 请大家不要入侵国内主机，而是帮他们找洞。我不是cracker也不是hack，甚至不是script kids.我只是一个菜鸟。<code>^_^</code> 88</p><p>补充:也许小榕以后会对文件加壳,所以先说了以后也不再写了.😃<br> 使用工具:typ ,upx1.2 for win (ddcrack.yeah.net有下)以流光4 2915为例<br> 把fluxay4.exe copy 到期 d:\\typ<br> 再 <code>d:\\typ\\typ3 fluxay4.exe</code><br> 可以看到(如果是xp会有错误提示.按忽略即可)</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>■ extended [32] exe &quot;pe&quot; starting at $0108
■ common object file format - (intel 386)
■ target sytem windows gui
■ upx / markus f.x.j. oberhumer &amp; lászló molnár [0.90 win32,rtm32/pe]
</code></pre></div><p>看到了吗? upx 0.9 压缩?😃</p><p>用upx1.2 中文版的图形界面(不用我讲怎么用了吧:) 解压,就可得到正确的反汇编代码.呵<br> mail:<code>oo0o@ynmail.com</code></p><p>呵呵！贴了这篇文章，真的很惭愧，因为我也想到了，可是，也只有在这里拾人牙慧了！<br> 呵呵！有待学习。</p>`,87),c=[o];function p(x,r){return a(),d("div",null,c)}const i=e(n,[["render",p],["__file","crack15.html.vue"]]);export{i as default};
