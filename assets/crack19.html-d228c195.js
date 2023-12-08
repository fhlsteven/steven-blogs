import{_ as n,o as E,c as F,a as e}from"./app-f0851ed3.js";const t={},D=e(`<h1 id="国内某公司专业软件-gs-mh狗" tabindex="-1"><a class="header-anchor" href="#国内某公司专业软件-gs-mh狗" aria-hidden="true">#</a> 国内某公司专业软件--Gs-mh狗</h1><blockquote><p>日期：2003年9月16日 作者：nahum 人气： 314</p></blockquote><p>目标国内某公司专业软件，免得引起麻烦，不透露了： 使用工具：ollydbg,hiew,IDA,peid,KillFlower 狗：Gs-mh狗</p><p>该软件无狗可以安装，但运行没有任何提示，所以带狗破解。因该沟有狗壳花指令大大的厉害，用H-W32Dasm反汇编失败，OLLYDBG也不能调试，trw跟踪不下来，先从看雪论坛下载KILLFLOWER，去除花指令。后用OLLYDBG调试，IDA反汇编。本人是菜鸟，分析能力较差，但是还算勤奋，经过将近两周的时间，每天工作12小时以上，反复调试，寻找分析读狗部分。终于找到如下代码部分：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>.gtide:0088270B loc_88270B:                             ; CODE XREF: .gtide:00881E28j
.gtide:0088270B                 nop
.gtide:0088270C                 nop
.gtide:0088270D                 nop
.gtide:0088270E                 nop
.gtide:0088270F                 nop
.gtide:00882710                 nop
.gtide:00882711                 cmp     ds:dword_93F074, 0  ===&gt;判断是否有加密狗，有狗无狗都为0不                                                               知为何？
.gtide:00882718                 jnz     short loc_882731    ===》不跳就正常了
.gtide:0088271A                 call    sub_882BAF  ====》第一次读狗，如果这里正确读狗那么就不会                                                        第2次读了，我们现在要让他第二次读狗，免得
                                                      留下暗桩。该字段全部改为NOP
.gtide:0088271F                 test    eax, eax  ====判断是否有狗，eax=0则有狗改为xor eax,eax
.gtide:00882721                 jnz     short loc_88272C ==》跳就完蛋了。
.gtide:00882723                 call    sub_882D5E====》2次读狗，很关键。跟进
.gtide:00882728                 test    eax, eax  ====》判断作用不大！基本上有狗无狗区别不大！
.gtide:0088272A                 jz      short loc_882731===》总是要跳。意义不大。
.gtide:0088272C  
.gtide:0088272C loc_88272C:                             ; CODE XREF: .gtide:00882721j
.gtide:0088272C                 jmp     loc_882A5B
</code></pre></div><p>跟进到这里，在程序里转了若干圈后到这里，它调用狗的程序很隐蔽，需要耐心。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>00882F12                 call    sub_88AE50  =====》关键CALL ，跟进！内容见后一段
00882F17   8945 C0          MOV DWORD PTR SS:[EBP-40],EAX  ===》有狗为零无狗非零
00882F1A   8B45 C4          MOV EAX,DWORD PTR SS:[EBP-3C]   ====》读狗返回值 51CA2330
00882F1D   A3 B8FF9300      MOV DWORD PTR DS:[93FFB8],EAX
00882F22   837D C0 00       CMP DWORD PTR SS:[EBP-40],0
00882F26   74 13            JE SHORT 去花1.00882F3B],               ; jump
00882F28   C705 18F09300 4C&gt;MOV DWORD PTR DS:[93F018],这段基本没用
00882F32   C745 C0 00000000 MOV DWORD PTR SS:[EBP-40],0
00882F39   EB 3C            JMP SHORT 去花1.00882F77,0
00882F3B   833D 7CF09300 00 CMP DWORD PTR DS:[93F07C],0
00882F42   74 29            JE SHORT 去花1.00882F6D],
00882F44   A1 1CF09300      MOV EAX,DWORD PTR DS:[93F01C]            ; jump
00882F49   3305 2EF09300    XOR EAX,DWORD PTR DS:[93F02E]
00882F4F   8945 D0          MOV DWORD PTR SS:[EBP-30],EAX
00882F52   8B45 D0          MOV EAX,DWORD PTR SS:[EBP-30]
00882F55   3305 B8FF9300    XOR EAX,DWORD PTR DS:[93FFB8]
00882F5B   A3 BEF29300      MOV DWORD PTR DS:[93F2BE],EAX
00882F60   A1 32F09300      MOV EAX,DWORD PTR DS:[93F032]
00882F65   3105 BEF29300    XOR DWORD PTR DS:[93F2BE],EAX
00882F6B   EB 0A            JMP SHORT 去花1.00882F77,E
00882F6D   A1 B8FF9300      MOV EAX,DWORD PTR DS:[93FFB8]
00882F72   A3 BEF29300      MOV DWORD PTR DS:[93F2BE],EAX
00882F77   8B45 C0          MOV EAX,DWORD PTR SS:[EBP-40]
00882F7A   EB 00            JMP SHORT 去花1.00882F7C-4
00882F7C   5F               POP EDI
00882F7D   5E               POP ESI
00882F7E   5B               POP EBX
00882F7F   C9               LEAVE
00882F80   C3
</code></pre></div><p>关键CALL在这里！看不出什么问题来。不用理会他。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0088AE50   55               PUSH EBP
0088AE51   8BEC             MOV EBP,ESP
0088AE53   51               PUSH ECX
0088AE54   53               PUSH EBX
0088AE55   56               PUSH ESI
0088AE56   57               PUSH EDI
0088AE57   52               PUSH EDX
0088AE58   51               PUSH ECX
0088AE59   68 67AD8800      PUSH 去花1.0088AD67
0088AE5E   68 ACA88800      PUSH 去花1.0088A8AC
0088AE63   6A 14            PUSH 14
0088AE65   E8 E094FFFF      CALL 去花1.0088434A    ===》读狗
0088AE6A   83C4 0C          ADD ESP,0C
0088AE6D             mov DWORD PTR SS:[EBP-4],EAX
0088AE70   59               POP ECX
0088AE71   5A               POP EDX
0088AE72   8B45 FC          MOV EAX,DWORD PTR SS:[EBP-4]
0088AE75   5F               POP EDI
0088AE76   5E               POP ESI
0088AE77   5B               POP EBX
0088AE78   C9               LEAVE
0088AE79   C3               RET
</code></pre></div><p>去狗用OLLYDBG调试通过后，现在到了修改程序的问题了。我是这么改的：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>00882F17   8945 C0          MOV DWORD PTR SS:[EBP-40],EAX
00882F1A   B8 3D23CA51      MOV EAX,51CA2330
00882F1F   A3 B8FF9300      MOV DWORD PTR DS:[93FFB8],EAX
00882F24   E9 12000000      JMP 去花1.00882F3B3F
00882F29   90               NOP
00882F2A   90               NOP
00882F2B   90               NOP
00882F2C   90               NOP
00882F2D   90               NOP
00882F2E   90               NOP
00882F2F   90               NOP
00882F30   90               NOP
00882F31   90               NOP
00882F32   C745 C0 00000000 MOV DWORD PTR SS:[EBP-40],0
00882F39   EB 3C            JMP SHORT 去花1.00882F77
</code></pre></div><p>好象很笨，应该有更简单的改法，请指教！</p><p>另一处就是给EAX赋值的地方更改如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0088AE6D             mov DWORD PTR SS:[EBP-4],EAX
                     改为 and DWORD PTR SS:[EBP-4],EAX
</code></pre></div><p>这是我破解的第三个加密狗，比较简单的，写点东西是想和大家交流一下。最近还有一条狗需要破解。等破解后再贴出来，大家共同交流。<br> 顺便写点感受，破解的关键是要有信心、细心、耐心。</p>`,15),P=[D];function A(O,a){return E(),F("div",null,P)}const R=n(t,[["render",A],["__file","crack19.html.vue"]]);export{R as default};
