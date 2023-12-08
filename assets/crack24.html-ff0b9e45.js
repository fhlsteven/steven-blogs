import{_ as e,o as a,c as t,a as n}from"./app-f0851ed3.js";const p={},d=n(`<h1 id="altomp3-maker的破解" tabindex="-1"><a class="header-anchor" href="#altomp3-maker的破解" aria-hidden="true">#</a> AltoMP3 Maker的破解</h1><blockquote><p>日期：2003年6月9日 作者：crack007 人气： 711</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>内容:
AltoMP3 Maker的破解

作者：Crack007
主页：http://www.crack007.com ( ^-^ )
破解日期：2001-5-4
破解工具：TRW2000 1.22  W32DASM3 8.93
难度：☆
</code></pre></div><p>软件下载地址：<code>http://soft.zz.ha.cn/query/down1.asp?softnumber=5471&amp;dtype=2&amp;path=/AltoMP3Maker213.exe</code></p><h2 id="软件简介" tabindex="-1"><a class="header-anchor" href="#软件简介" aria-hidden="true">#</a> 软件简介</h2><p>AltoMP3 Maker除了可以将音乐CD直接制作成MP3，还可以播放音乐CD，并支持 CDDB2和Windows的explorer shell功能，可在资源管理器中的音轨文件上按下右键 ，直接制作MP3。高速高品质的输出：使用自动同步技术，使用LAME压缩引擎：可 以高速压缩出完美品质的MP3，支持VRB，亦可更换使用BLADE压缩引擎。</p><ol><li><p>启动TRW2000</p></li><li><p>运行Flashsoft</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>随便输入注册信息：

用户名:Crack007
注册码:78787878
</code></pre></div></li><li><p>按 CTRL+N 激活 TRW2000</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入如下 2 条命令
bpx hmemcpy  设置中断条件
</code></pre></div></li><li><p>按F5键，回到 AltoMP3.exe 的注册窗口</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>按 &quot; OK &quot; 按钮 ,TRW2000 窗口被激活自动弹出  
bc *  取消中断
pmodule  从系统内核中返回到 AltoMP3.exe
</code></pre></div><p>中断至以下代码：</p><p><code>:00488942 5E pop esi &lt;---- Pmodule</code></p><p>然后按F10 N下:D</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:00442545 52                      push edx
:00442546 E8B5020000              call 00442800      &lt;-----关键Call,跟进。
:0044254B 25FF000000              and eax, 000000FF
:00442550 85C0                    test eax, eax
:00442552 7444                    je 00442598        〈-----若不为0则Game Over!
:00442554 6AFF                    push FFFFFFFF
:00442556 6A00                    push 00000000

* Possible Reference to String Resource ID=57687: &quot;盜 鑼?&quot;
                                  |
:00442558 6857E10000              push 0000E157
:0044255D E84FE10400              call 004906B1        &lt;-----弹出错误对话框
:00442562 8B4DE4                  mov ecx, dword ptr [ebp-1C]
:00442565 81C198000000            add ecx, 00000098
</code></pre></div><p>跟进后来到如下代码：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Addresses:
|:00442546  , :0044ECD4  , :00452254  , :00452370  , :0045363E  
|:0045375A  , :00454DB3  , :00454EEA  , :004553BC  , :004554D8  
|:0045A44A  , :0045A581  , :0045A933  , :0045AA6A  , :0045ACD3  
|:0045AE04  
|
:00442800 55                      push ebp
:00442801 8BEC                    mov ebp, esp
:00442803 8B4D0C                  mov ecx, dword ptr [ebp+0C]
:00442806 E88551FCFF              call 00407990
:0044280B 50                      push eax
:0044280C 8B4D08                  mov ecx, dword ptr [ebp+08]
:0044280F E87C7AFFFF              call 0043A290        〈------再跟进
:00442814 F7D8                    neg eax
:00442816 1BC0                    sbb eax, eax
:00442818 F7D8                    neg eax
:0044281A 5D                      pop ebp
:0044281B C20800                  ret 0008

* Referenced by a CALL at Addresses:
|:0043A27A  , :0044280F  , :0044A0EF  , :0044B6AA  
|
:0043A290 55                      push ebp
:0043A291 8BEC                    mov ebp, esp
:0043A293 51                      push ecx
:0043A294 894DFC                  mov dword ptr [ebp-04], ecx
:0043A297 8B4508                  mov eax, dword ptr [ebp+08]  〈----显示输入的注册码：78787878.ReLg7wxa(有点迷惑，不知什么时候加上了.ReLg7wxa)
:0043A29A 50                      push eax
:0043A29B 8B4DFC                  mov ecx, dword ptr [ebp-04]
:0043A29E 8B11                    mov edx, dword ptr [ecx]    〈----过此处下 d edx 可显示正确注册码ReLg7wxaOTHzYKzo
:0043A2A0 52                      push edx
:0043A2A1 E89A950300              call 00473840
:0043A2A6 83C408                  add esp, 00000008
:0043A2A9 8BE5                    mov esp, ebp
:0043A2AB 5D                      pop ebp
:0043A2AC C20400                  ret 0004
</code></pre></div><p>整理一下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>用户名:Crack007
注册码:ReLg7wxaOTHzYKzo
</code></pre></div><p>结束。</p>`,17),o=[d];function c(l,s){return a(),t("div",null,o)}const x=e(p,[["render",c],["__file","crack24.html.vue"]]);export{x as default};
