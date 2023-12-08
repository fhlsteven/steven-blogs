import{_ as n,o as e,c as t,a}from"./app-f0851ed3.js";const _={},o=a(`<h1 id="破解-audio-companion-v1-11" tabindex="-1"><a class="header-anchor" href="#破解-audio-companion-v1-11" aria-hidden="true">#</a> 破解 Audio Companion v1.11</h1><blockquote><p>日期：2003年6月9日 作者：Roni Music, Malmoe-Sweden 人气： 373</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>tKC破解教程#113（第一部分）中文译文
翻译 风飘雪
</code></pre></div><h2 id="工具" tabindex="-1"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>SoftICE v4.05
W32Dasm v8.93
Hacker&#39;s View v6.55
SmartCheck v6.03
ProcDump32 v1.6.2
TRW2000 v1.22
IDA v4.04
Windows Commander v4.51
Delphi, VB, C++或TASM （编注册机，打补丁）
</code></pre></div><p>你可以在以下站点得到它们</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>http://protools.cjb.net 
http://w3.to/protools 
http://www.crackstore.com 
</code></pre></div><h2 id="part-1" tabindex="-1"><a class="header-anchor" href="#part-1" aria-hidden="true">#</a> Part 1</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Audio Companion v1.11

作者 : Roni Music, Malmoe-Sweden
公司 : Roni Music
主页 : http://www.ronimusic.com
URL  : http://www.ronimusic.com/audiocom.htm
大小 : 2000KB
</code></pre></div><p>用 SoftIce得到有效的注册码</p><p>说明: 注册时, 需要提供你的用户ID，你可在软件窗口顶部看到它。如果没看到，请下载软件的最新版本。购买后，你会获得一个基于你用户ID的注册码，成为合法用户。<br> 本教程中我的用户<code>ID=2DEAD6E2</code></p><ol><li><p>运行AUDIOCOM.EXE, 点击 HELP/PASSWORD子菜单，在注册对话框输入<br> 以下信息:<br><code>Password : 73881050PSWD</code><br> 这时不要点OK按扭</p></li><li><p>按 <code>[CTRL + D]</code>激活SoftIce, 设置断点如下:<br><code>bpx GetDlgItemTextA</code><br> 按X 或F5 返回主程序</p></li><li><p>现在按下 OK 键... 你又回到SoftIce!<br> 在 SoftIce 按F11, F5, 按F11 直到如下代码段 :</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>______________________________________________________________ 

015F:00404C62  FF15E0624200    CALL  [USER32!GetDlgItemTextA] 
015F:00404C68  E873FDFFFF      CALL  004049E0 &lt;== 中断于此 
015F:00404C6D  85C0            TEST  EAX,EAX 
015F:00404C6F  7456            JZ    00404CC7 ==&gt; *** 
... 
... 
015F:00404CC4  C21000          RET    0010 
015F:00404CC7  8D442404        LEA    EAX,[ESP+04] &lt;== *** 
015F:00404CCB  68880B4300      PUSH  00430B88 
015F:00404CD0  50              PUSH  EAX 
015F:00404CD1  B9784E4400      MOV    ECX,00444E78 
015F:00404CD6  E8250A0000      CALL  00405700 
015F:00404CDB  8D4C2404        LEA    ECX,[ESP+04] 
015F:00404CDF  51              PUSH  ECX 
015F:00404CE0  E88BFCFFFF      CALL  00404970 
015F:00404CE5  83C404          ADD    ESP,04 ===&gt; d eax 
015F:00404CE8  8D542404        LEA    EDX,[ESP+04] 


_____________________AUDIOCOM!.text+3C61___________________ 

下断 BPX 015F:00404C62 
按 F10 八次 - 停在015F:00404CE5 -看 EAX的值 
: 

: d eax  ==&gt;    你看到119AD111，保存地址 0167:0067F640  
                把它记下来，有可能就是注册码 
                再下面两行可看到你的程序ID. 
</code></pre></div></li><li><p>打入以下命令清除所有断点<br><code>BD *</code> 按F5或 X 返回主程序。</p></li><li><p>重复注册过程，键入<code>119AD111</code>作为你的注册码，点OK ..... 哈哈! 屏幕闪出 &quot; thank you .... &quot; .</p></li><li><p>注册码究竟藏在哪儿呢？<br> 注册信息保存在<code>AUDIOCOM.INI</code>中，见下</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>[Init]
Always on Top=0
Window Xpos=10
Window Ypos=10
Password=119AD111
Screen=0
Used Before=1
</code></pre></div></li></ol><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>标 题:Audiocom 1.13版破解 (1千字)
发信人:风飘雪
时 间:2001-2-23 10:46:11
详细信息:

重要更正（Audiocom 1.13版破解）

tKC破解教程113 part1不知为何人所写，我从破解文库下的
照原文翻译帖了上去。
下软件自己一试，他的破解完全不对。
我的是Audiocom 1.13版
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0167:00404C82  CALL    \`USER32!GetDlgItemTextA\`
0167:00404C88  CALL    00404A00    ==》关键比较，F8跟进
0167:00404C8D  TEST    EAX,EAX
0167:00404C8F  JZ      00404CE7    出错，跳

0167:00404A0D  PUSH    EAX
0167:00404A0E  MOV      ECX,0043FA98
0167:00404A13  CALL    00405720
0167:00404A18  LEA      ECX,[ESP+30]
0167:00404A1C  PUSH    ECX
0167:00404A1D  CALL    004049C0
0167:00404A22  ADD      ESP,BYTE +04
0167:00404A25  LEA      EDX,[ESP+18]
0167:00404A29  MOV      ECX,0043FA98
0167:00404A2E  PUSH    EDX
0167:00404A2F  CALL    00405980
0167:00404A34  PUSH    EAX
0167:00404A35  MOV      ECX,0043FA98
0167:00404A3A  CALL    00405BC0
0167:00404A3F  LEA      ECX,[ESP+00]
0167:00404A43  PUSH    BYTE +10
0167:00404A45  PUSH    ECX
0167:00404A46  PUSH    EAX
0167:00404A47  CALL    00424857
0167:00404A4C  ADD      ESP,BYTE +0C  ==》d eax
0167:00404A4F  LEA      EDX,[ESP+00]
404a4c处d eax
</code></pre></div><p>看上面的窗口，第二行，你的ID号</p><p>第四行，注册码<br><code>Bn9-pW-56z-aa</code><br> 注册信息保存在<code>AUDIOCOM.INI</code>中</p>`,17),c=[o];function d(A,i){return e(),t("div",null,c)}const C=n(_,[["render",d],["__file","crack23.html.vue"]]);export{C as default};
