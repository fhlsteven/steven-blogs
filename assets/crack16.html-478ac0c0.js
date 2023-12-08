import{_ as e,o as n,c as a,a as t}from"./app-f0851ed3.js";const r={},o=t(`<h1 id="另类爆破——ramdisk9x-me-v1-5" tabindex="-1"><a class="header-anchor" href="#另类爆破——ramdisk9x-me-v1-5" aria-hidden="true">#</a> 另类爆破——RamDisk9x/Me V1.5</h1><blockquote><p>日期：2003年6月9日 作者：fly 人气： 523</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>下载页面：  http://www.skycn.com/soft/4649.html
软件大小：  626 KB
软件语言：  英文
软件类别：  国外软件 / 共享版 / 内存工具
应用平台：  Win95/98/Me
加入时间：  2001-12-17 10:54:27
下载次数：  1520
推荐等级：  ****
</code></pre></div><p>【软件简介】：利用内存模拟技术产生和硬盘以及1.44M/2.88M软盘功能一模一样的虚拟硬盘/软盘机，可依个人电脑内存大小设定所模拟的硬盘空间大小，最大支持到 4GB。</p><p>【软件限制】：次数限制、NAG</p><p>【作者声明】：初学Crack，只是感兴趣，没有其它目的。失误之处敬请诸位大侠赐教！</p><p>【破解工具】：TRW2000娃娃修改版、Ollydbg1.09、Windows Enabler、FI2.5、W32Dasm8.93黄金版</p><hr><h2 id="【过-程】" tabindex="-1"><a class="header-anchor" href="#【过-程】" aria-hidden="true">#</a> 【过 程】</h2><p>主文件 0RAMDSK9XME.EXE 在C:\\WINDOWS\\SYSTEM 目录下。无壳。<br> 呵呵，VB的东西。输入注册码时逐个检验，错误则“OK”不可用。</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:0041699F FF15DC114000            Call dword ptr [004011DC]
:004169A5 663BFE                  cmp di, si
:004169A8 741D                    je 004169C7
:004169AA BAA86A4000              mov edx, 00406AA8
:004169AF 8D4D88                  lea ecx, dword ptr [ebp-78]

* Reference To: MSVBVM60.__vbaStrCopy, Ord:0000h
                                 |
:004169B2 FF1560114000            Call dword ptr [00401160]
:004169B8 8B03                    mov eax, dword ptr [ebx]
:004169BA 8D4D88                  lea ecx, dword ptr [ebp-78]
:004169BD 51                      push ecx
:004169BE 53                      push ebx
:004169BF FF9014070000            call dword ptr [eax+00000714]
:004169C5 EB1B                    jmp 004169E2

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004169A8(C)
|

* Possible StringData Ref from Code Obj -&gt;&quot;YYour email must contain an &quot;@&quot;&quot;
                                 |
:004169C7 BAAC704000              mov edx, 004070AC
:004169CC 8D4D88                  lea ecx, dword ptr [ebp-78]

* Reference To: MSVBVM60.__vbaStrCopy, Ord:0000h
                                 |
:004169CF FF1560114000            Call dword ptr [00401160]
:004169D5 8B13                    mov edx, dword ptr [ebx]
:004169D7 8D4588                  lea eax, dword ptr [ebp-78]
:004169DA 50                      push eax
:004169DB 53                      push ebx
:004169DC FF9214070000            call dword ptr [edx+00000714]

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004169C5(U)
|
:004169E2 8D4D88                  lea ecx, dword ptr [ebp-78]

* Reference To: MSVBVM60.__vbaFreeStr, Ord:0000h
                                 |
:004169E5 FF15E0114000            Call dword ptr [004011E0]
:004169EB 663BFE                  cmp di, si
:004169EE 0F8425030000            je 00416D19
                                 ====&gt;不跳则OVER！改为：JMP

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
爆破①：0F8425030000  改为：E92603000090（补1个NOP）
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

…… …… 省 略 …… ……

* Reference To: MSVBVM60.__vbaStrMove, Ord:0000h
                                 |
:00416D19 8B35BC114000            mov esi, dword ptr [004011BC]

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:00416CEF(U), :00416D17(U)
|
:00416D1F 6685FF                  test di, di
:00416D22 0F84D4010000            je 00416EFC
                                 ====&gt;不跳则OVER！改为：JMP

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
爆破②：0F84D4010000  改为：E9D501000090（补1个NOP）
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
</code></pre></div><p>改动以上2处后，“OK”已经Enable了。再次启动没有NAG。</p><hr><h2 id="【另-类-破-解】" tabindex="-1"><a class="header-anchor" href="#【另-类-破-解】" aria-hidden="true">#</a> 【另 类 破 解】</h2><p>上面是 爆破 ，还有一种比较简便而且有效的方法，这才是我这篇小文的主角呀。</p><p>主角：Windows Enabler</p><p>运行enabler.exe，选上：EnableWindows<br> 然后运行目标程序：RAMDSK9XME.EXE<br> 输入E-mail：fly4099@sohu.com<br> 随意输入Password:13572468</p><p>鼠标移动到“OK”上，呵呵，怎么样？“OK”按纽早已 Enable 了吧？！</p><p>点“OK”，进入程序。再重新运行RAMDSK9XME.EXE，OK了！NAG不见了。<br> 呵呵，程序已把注册标志信息写入了注册表中了！^O^^O^</p><p>其实这个小工具对付这种限制的软件可谓是“手到病除”，例如：**杀毒软件就可以搞定。谢谢作者：deuce</p><p>虽然简单方便，但是对于想不断提高PJ水平的Cracker却没必要常用，毕竟我们是为了不断学习新的知识，而不是仅仅为了破解软件的。</p><p>★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★</p><h2 id="【软-件-说-明】" tabindex="-1"><a class="header-anchor" href="#【软-件-说-明】" aria-hidden="true">#</a> 【软 件 说 明】</h2><p>Author: deuce Target: n0va&#39;s crackme v3</p><p>The hardest part of this crackme is enabling the window controls. Once you accomplish this, the rest is cake</p><p>There may be other ways to do this, but I decided to write a little program that does it simply by enumerating all child windows of the foreground window and sending WM_ENABLE message to each. Examine enabler.asm to see exactly how this is done in assembly (to use enabler.exe, check &quot;EnableWindows&quot; and then click the parent window that contains the child window you want to enable).</p><p>This is coded in VB, so load up the crackme in SmartCheck, use enabler.exe, then type in a test serial and click OK. By looking through the events under &quot;_Click&quot; you will see a call to vbaStrCmp. Click on it and you will see the hard-coded serial</p><p>Later, Deuce</p><hr><h2 id="【注册信息保存】" tabindex="-1"><a class="header-anchor" href="#【注册信息保存】" aria-hidden="true">#</a> 【注册信息保存】</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>REGEDIT4

[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\7R]
&quot;ID&quot;=&quot;fly4099@sohu.com&quot;
&quot;Password&quot;=&quot;7174602E2B25245E6C4F49570D474A4B6A61676F&quot;
</code></pre></div>`,32),d=[o];function i(s,c){return n(),a("div",null,d)}const p=e(r,[["render",i],["__file","crack16.html.vue"]]);export{p as default};
