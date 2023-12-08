import{_ as e,o as n,c as a,a as t}from"./app-f0851ed3.js";const o={},C=t(`<h1 id="爆破chmunpacker" tabindex="-1"><a class="header-anchor" href="#爆破chmunpacker" aria-hidden="true">#</a> 爆破CHMUnpacker</h1><blockquote><p>日期：2003年6月9日 作者：zyw[BCG] 人气： 428</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>软件名称 CHMUnpacker    软件版本 1.3
软件类别 帮助软件　      授权形式 共享　 
应用平台 WIN9X/WINNT/WIN2K/WINXP　 
汉化作者 星风雪 　        上传日期 2002-3-8
http://www.hanzify.org/download.asp?SOFT_ID=4228&amp;SITE=1
目标：完成注册
工具：ultraedit, pw32dasm8.93
难度: 容易                破文作者：zyw[BCG]
</code></pre></div><h2 id="软件介绍" tabindex="-1"><a class="header-anchor" href="#软件介绍" aria-hidden="true">#</a> 软件介绍</h2><p>CHMUnpacker [CHM解包器]是一个可以帮助您从CHM文件导出文件的CHM工具.</p><p>CHMUnpacker [CHM解包器]能够从已编译的Windows帮助文件(*.chm)导出任何类型的文件.您可以像处理ZIP文件一样处理CHM,您可以运行CHM中的文件或像WinZip一样展开它.您可以通过简单的双击文件查看HTML文本或图片.像ZIP文件一样使用CHM文件,您想知道这是怎样的一种体验吗? 此版本是真正的1.3的汉化版本.</p><p>用pw32dasm8.93反编CHMUnpacker.exe</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>........

* Possible Reference to Dialog: DialogID_008F, CONTROL_ID:03F1, &quot;&quot;
                                |
:00405A79 68F1030000              push 000003F1
:00405A7E E8D0CC0100              call 00422753
:00405A83 8D4C2408                lea ecx, dword ptr [esp+08]
:00405A87 51                      push ecx
* Possible Reference to Dialog: DialogID_0067, CONTROL_ID:03E9, &quot;/&gt;:屣\b/(&amp;S)&quot;
                                  |
:00405A88 68E9030000              push 000003E9
:00405A8D 8BCE                    mov ecx, esi
:00405A8F E8BFCC0100              call 00422753
:00405A94 8B54240C                mov edx, dword ptr [esp+0C]
:00405A98 6850CA4400              push 0044CA50
:00405A9D 52                      push edx
:00405A9E E883910000              call 0040EC26
:00405AA3 83C408                  add esp, 00000008
:00405AA6 85C0                    test eax, eax
:00405AA8 750C                    jne 00405AB6
:00405AAA 53                      push ebx
:00405AAB 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;用户姓名是空白的!&quot;
                                  |
:00405AAC 6854A64400              push 0044A654
:00405AB1 E93B010000              jmp 00405BF1
* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00405AA8(C)
|
:00405AB6 8B442408                mov eax, dword ptr [esp+08]
:00405ABA 6850CA4400              push 0044CA50
:00405ABF 50                      push eax
:00405AC0 E861910000              call 0040EC26
:00405AC5 83C408                  add esp, 00000008
:00405AC8 85C0                    test eax, eax
:00405ACA 750C                    jne 00405AD8
:00405ACC 53                      push ebx
:00405ACD 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;注册密钥是空白的!&quot;
                                  |
:00405ACE 683CA64400              push 0044A63C
:00405AD3 E919010000              jmp 00405BF1
* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00405ACA(C)
|
* Possible StringData Ref from Data Obj -&gt;&quot;  &quot;
                                  |
:00405AD8 6838A64400              push 0044A638
:00405ADD 8D4C240C                lea ecx, dword ptr [esp+0C]
:00405AE1 E8EC6F0100              call 0041CAD2
* Possible StringData Ref from Data Obj -&gt;&quot;  &quot;
                                  |
:00405AE6 6838A64400              push 0044A638
:00405AEB 8D4C240C                lea ecx, dword ptr [esp+0C]
:00405AEF E83F6F0100              call 0041CA33
:00405AF4 8B442408                mov eax, dword ptr [esp+08]
:00405AF8 8378F810                cmp dword ptr [eax-08], 00000010
:00405AFC 740C                    je 00405B0A
:00405AFE 53                      push ebx
:00405AFF 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;注册密钥是错误的!&quot;
                                  |
:00405B00 6820A64400              push 0044A620
:00405B05 E9E7000000              jmp 00405BF1
* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00405AFC(C)
|
* Possible StringData Ref from Data Obj -&gt;&quot;eLRYdMs7IhHiObJg&quot;
                                  |
:00405B0A 680CA64400              push 0044A60C
:00405B0F 50                      push eax
:00405B10 E811910000              call 0040EC26
:00405B15 83C408                  add esp, 00000008
:00405B18 85C0                    test eax, eax
:00405B1A 0F84CA000000            je 00405BEA
:00405B20 8B4C2408                mov ecx, dword ptr [esp+08]
* Possible StringData Ref from Data Obj -&gt;&quot;FkZQYRjGoBNcgJVU&quot;
                                  |
:00405B24 68F8A54400              push 0044A5F8
:00405B29 51                      push ecx
:00405B2A E8F7900000              call 0040EC26
:00405B2F 83C408                  add esp, 00000008
:00405B32 85C0                    test eax, eax
:00405B34 0F84B0000000            je 00405BEA
:00405B3A 8D542410                lea edx, dword ptr [esp+10]
:00405B3E 57                      push edi
:00405B3F 52                      push edx
* Possible StringData Ref from Data Obj -&gt;&quot;Software\\YBSoft\\CHMUnpacker&quot;
                                  |
:00405B40 68DCA54400              push 0044A5DC
:00405B45 6802000080              push 80000002
* Reference To: ADVAPI32.RegCreateKeyA, Ord:015Eh
                                  |
:00405B4A FF1518B04300            Call dword ptr [0043B018]
:00405B50 8B44240C                mov eax, dword ptr [esp+0C]
:00405B54 8D4C240C                lea ecx, dword ptr [esp+0C]
:00405B58 8B40F8                  mov eax, dword ptr [eax-08]
:00405B5B 50                      push eax
:00405B5C 6A01                    push 00000001
:00405B5E E85DA10100              call 0041FCC0
:00405B63 8B4C2418                mov ecx, dword ptr [esp+18]
* Reference To: ADVAPI32.RegSetValueExA, Ord:0186h
                                  |
:00405B67 8B3D14B04300            mov edi, dword ptr [0043B014]
:00405B6D 50                      push eax
:00405B6E 6A01                    push 00000001
:00405B70 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;版本&quot;
                                  |
:00405B71 68D0A24400              push 0044A2D0
:00405B76 51                      push ecx
:00405B77 FFD7                    call edi
:00405B79 8B542410                mov edx, dword ptr [esp+10]
:00405B7D 8D4C2410                lea ecx, dword ptr [esp+10]
:00405B81 8B42F8                  mov eax, dword ptr [edx-08]
:00405B84 50                      push eax
:00405B85 6A01                    push 00000001
:00405B87 E834A10100              call 0041FCC0
:00405B8C 50                      push eax
:00405B8D 8B44241C                mov eax, dword ptr [esp+1C]
:00405B91 6A01                    push 00000001
:00405B93 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;用户&quot;
                                  |
:00405B94 68D4A54400              push 0044A5D4
:00405B99 50                      push eax
:00405B9A FFD7                    call edi
:00405B9C 8B4C2414                mov ecx, dword ptr [esp+14]
:00405BA0 51                      push ecx
* Reference To: ADVAPI32.RegCloseKey, Ord:015Bh
                                  |
:00405BA1 FF1508B04300            Call dword ptr [0043B008]
:00405BA7 8BCE                    mov ecx, esi
:00405BA9 E8D1AA0100              call 0042067F
:00405BAE 53                      push ebx
:00405BAF 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;感谢您注册它.
CHMUnpacker将在您再次使用它时检?
                                        -&gt;&quot;樽⒉岽?&quot;
                                  |
:00405BB0 6878A54400              push 0044A578
:00405BB5 E8C73B0200              call 00429781
:00405BBA 8D4C240C                lea ecx, dword ptr [esp+0C]
:00405BBE 885C2420                mov byte ptr [esp+20], bl
:00405BC2 E8C99C0100              call 0041F890
:00405BC7 8D4C2410                lea ecx, dword ptr [esp+10]
:00405BCB C7442420FFFFFFFF        mov [esp+20], FFFFFFFF
:00405BD3 E8B89C0100              call 0041F890
:00405BD8 5F                      pop edi
:00405BD9 5E                      pop esi
:00405BDA 5B                      pop ebx
:00405BDB 8B4C240C                mov ecx, dword ptr [esp+0C]
:00405BDF 64890D00000000          mov dword ptr fs:[00000000], ecx
:00405BE6 83C418                  add esp, 00000018
:00405BE9 C3                      ret
* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:00405B1A(C), :00405B34(C)
|
:00405BEA 53                      push ebx
:00405BEB 53                      push ebx
* Possible StringData Ref from Data Obj -&gt;&quot;对不起,这是一个被破解的注册代码!&quot;
                                  |
:00405BEC 6854A54400              push 0044A554

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:00405AB1(U), :00405AD3(U), :00405B05(U)
|
:00405BF1 E88B3B0200              call 00429781
:00405BF6 8D4C2408                lea ecx, dword ptr [esp+08]
:00405BFA 885C241C                mov byte ptr [esp+1C], bl
:00405BFE E88D9C0100              call 0041F890
:00405C03 8D4C240C                lea ecx, dword ptr [esp+0C]
:00405C07 C744241CFFFFFFFF        mov [esp+1C], FFFFFFFF
:00405C0F E87C9C0100              call 0041F890
:00405C14 8B4C2414                mov ecx, dword ptr [esp+14]
:00405C18 5E                      pop esi
:00405C19 5B                      pop ebx
:00405C1A 64890D00000000          mov dword ptr fs:[00000000], ecx
:00405C21 83C418                  add esp, 00000018
:00405C24 C3                      ret
.........
* Referenced by a CALL at Address:
|:0040232D  
|
:00405C30 81EC0C010000            sub esp, 0000010C
:00405C36 8D442404                lea eax, dword ptr [esp+04]
:00405C3A 56                      push esi
:00405C3B 50                      push eax
* Possible StringData Ref from Data Obj -&gt;&quot;SOFTWARE\\YBSoft\\CHMUnpacker&quot;
                                  |
:00405C3C 68D8A24400              push 0044A2D8
:00405C41 6802000080              push 80000002
:00405C46 C744241000000000        mov [esp+10], 00000000
* Reference To: ADVAPI32.RegOpenKeyA, Ord:0171h
                                  |
:00405C4E FF1510B04300            Call dword ptr [0043B010]
:00405C54 85C0                    test eax, eax
:00405C56 741D                    je 00405C75
:00405C58 8BB42414010000          mov esi, dword ptr [esp+00000114]
* Possible StringData Ref from Data Obj -&gt;&quot;未注册&quot;
                                  |
:00405C5F 6868A64400              push 0044A668
:00405C64 8BCE                    mov ecx, esi
:00405C66 E8939C0100              call 0041F8FE
:00405C6B 8BC6                    mov eax, esi
:00405C6D 5E                      pop esi
:00405C6E 81C40C010000            add esp, 0000010C
:00405C74 C3                      ret
* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00405C56(C)
|
:00405C75 8D4C2404                lea ecx, dword ptr [esp+04]
:00405C79 8D542410                lea edx, dword ptr [esp+10]
:00405C7D 51                      push ecx
:00405C7E 8B4C240C                mov ecx, dword ptr [esp+0C]
:00405C82 8D442410                lea eax, dword ptr [esp+10]
:00405C86 52                      push edx
:00405C87 50                      push eax
:00405C88 6A00                    push 00000000
* Possible StringData Ref from Data Obj -&gt;&quot;用户&quot;
                                  |
:00405C8A 68D4A54400              push 0044A5D4
:00405C8F 51                      push ecx
:00405C90 C744241CFF000000        mov [esp+1C], 000000FF
* Reference To: ADVAPI32.RegQueryValueExA, Ord:017Bh
                                  |
:00405C98 FF150CB04300            Call dword ptr [0043B00C]
:00405C9E 85C0                    test eax, eax
:00405CA0 741D                    je 00405CBF
:00405CA2 8BB42414010000          mov esi, dword ptr [esp+00000114]
* Possible StringData Ref from Data Obj -&gt;&quot;未注册&quot;
                                  |
:00405CA9 6868A64400              push 0044A668
:00405CAE 8BCE                    mov ecx, esi
:00405CB0 E8499C0100              call 0041F8FE
:00405CB5 8BC6                    mov eax, esi
:00405CB7 5E                      pop esi
:00405CB8 81C40C010000            add esp, 0000010C
:00405CBE C3                      ret

.......

* Reference To: ADVAPI32.RegQueryValueExA, Ord:017Bh
                                  |
:00405D8A 8B350CB04300            mov esi, dword ptr [0043B00C]
:00405D90 8D54240C                lea edx, dword ptr [esp+0C]
:00405D94 8D442410                lea eax, dword ptr [esp+10]
:00405D98 52                      push edx
:00405D99 8B542408                mov edx, dword ptr [esp+08]
:00405D9D 8D4C2418                lea ecx, dword ptr [esp+18]
:00405DA1 50                      push eax
:00405DA2 51                      push ecx
:00405DA3 6A00                    push 00000000

.......

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:00405E05(C), :00405E0F(C)
|
:00405E9A 8B4C2404                mov ecx, dword ptr [esp+04]
:00405E9E 51                      push ecx
* Reference To: ADVAPI32.RegCloseKey, Ord:015Bh
                                  |
:00405E9F FF1508B04300            Call dword ptr [0043B008]
:00405EA5 6A00                    push 00000000
:00405EA7 6A00                    push 00000000
* Possible StringData Ref from Data Obj -&gt;&quot;您的系统时间是错误的,请不要在使用本软件时更改?
                                        -&gt;&quot;南低呈奔?
&quot;
                                  |
:00405EA9 6888A64400              push 0044A688
:00405EAE E8CE380200              call 00429781
:00405EB3 83C8FF                  or eax, FFFFFFFF

-----------------------------------------------------------------
在00405B05------00405B24处可以看到有2个字符串 &quot;eLRYdMs7IhHiObJg&quot;
                                              &quot;FkZQYRjGoBNcgJVU&quot;
</code></pre></div><p>在00405BEC处有一个字符串调用</p><p>Possible StringData Ref from Data Obj -&gt;&quot;对不起,这是一个被破解的注册代码!&quot;</p><p>那么这两个就是黑名单码了，用ultraedit打开CHMUnpacker.exe （先备份原文件），查找 eLRYdMs7IhHiObJg 或者 FkZQYRjGoBNcgJVU 随便改一下，存盘退出，再用任一个黑名单码注册（用户名随便），成功！！！改用原备份文件运行，没有出错，收工。</p>`,11),s=[C];function p(r,d){return n(),a("div",null,s)}const A=e(o,[["render",p],["__file","crack10.html.vue"]]);export{A as default};
