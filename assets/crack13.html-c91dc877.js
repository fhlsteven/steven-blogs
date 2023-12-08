import{_ as e,o as n,c as a,a as t}from"./app-f0851ed3.js";const d={},o=t(`<h1 id="cuteftp最新版v4-2-5build3-7-1官方简体中文版-破解" tabindex="-1"><a class="header-anchor" href="#cuteftp最新版v4-2-5build3-7-1官方简体中文版-破解" aria-hidden="true">#</a> CuteFTP最新版V4.2.5build3.7.1官方简体中文版 破解</h1><blockquote><p>日期：2003年6月9日 作者：sambarain 人气： 4466</p></blockquote><p>工具：ollydbg. exescope.w32dasm.<br> 保护： 每次启动都弹出注册窗，提示上网注册; 30 天试用期；动态CRC校验。</p><p>使用ollydbg载入cutftp32.exe,查找标志getwindowtexta,共有6处，分别设断点，F9运行cutftp,提示在线注册nag窗口弹出。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>选择“输入产品序号”
产品序号填：012345678901234
用户名填：sambarain
点击注册
trw中断在
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: USER32.GetWindowTextA, Ord:015Eh
                                  |
:004E3647 FF157CC55100            Call dword ptr [0051C57C]
:004E364D 8B4D10                  mov ecx, dword ptr [ebp+10]

* Possible Reference to String Resource ID=00255: &quot;*~0SM俟y??&amp;髞\x1B?
                                  |
:004E3650 6AFF                    push FFFFFFFF
:004E3652 E88E85FFFF              call 004DBBE5
:004E3657 EB0B                    jmp 004E3664
</code></pre></div><p>一路F10，直到</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:00491570 50                      push eax
:00491571 8D442410                lea eax, dword ptr [esp+10]
:00491575 50                      push eax
:00491576 E8D55C0200              call 004B7250              所以要检查这个CALL
:0049157B 83C408                  add esp, 00000008
:0049157E 6685C0                  test ax, ax
:00491581 756E                    jne 004915F1                      一定要让它跳走  修改4
:00491583 8D4C2414                lea ecx, dword ptr [esp+14]


* Possible Reference to String Resource ID=61533: &quot;鑼1%&quot;          注册失败  所以要跳过它
                                  |
:00491587 685DF00000              push 0000F05D
:0049158C 51                      push ecx
:0049158D E87E40F9FF              call 00425610
:00491592 8B38                    mov edi, dword ptr [eax]
:00491594 8D542418                lea edx, dword ptr [esp+18]
</code></pre></div><p>追踪<code>call 004B7250</code>　　　　　　　　　　　　　开始注册码比较</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Addresses:
|:004908E7  , :00490B72  , :00491576  
|
:004B7250 83EC20                  sub esp, 00000020
:004B7253 83C9FF                  or ecx, FFFFFFFF
:004B7256 33C0                    xor eax, eax
:004B7258 56                      push esi
:004B7259 8B74242C                mov esi, dword ptr [esp+2C]
:004B725D 57                      push edi
:004B725E 8BFE                    mov edi, esi
:004B7260 F2                      repnz
:004B7261 AE                      scasb
:004B7262 F7D1                    not ecx
:004B7264 49                      dec ecx
:004B7265 83F90E                  cmp ecx, 0000000E        检查序列号是否是14位,不对则跳
:004B7268 7573                    jne 004B72DD　　　　　　　----------------------修改处1
:004B726A 56                      push esi
:004B726B E823DD0000              call 004C4F93

* Possible Reference to String Resource ID=00014: &quot;? URL&quot;
                                  |
:004B7270 6A0E                    push 0000000E
:004B7272 8D442420                lea eax, dword ptr [esp+20]
:004B7276 56                      push esi
:004B7277 50                      push eax
:004B7278 E823A70000              call 004C19A0
:004B727D 8D4C2428                lea ecx, dword ptr [esp+28]
:004B7281 C644243600              mov [esp+36], 00
:004B7286 51                      push ecx
:004B7287 E8D422FEFF              call 00499560
:004B728C 8BF0                    mov esi, eax
:004B728E 56                      push esi
:004B728F E8BC1FFEFF              call 00499250
:004B7294 8D542420                lea edx, dword ptr [esp+20]
:004B7298 8BF8                    mov edi, eax
:004B729A 52                      push edx
:004B729B 56                      push esi
:004B729C C644242800              mov [esp+28], 00
:004B72A1 E83A21FEFF              call 004993E0
:004B72A6 8D442438                lea eax, dword ptr [esp+38]          查看EAX的值为012345678901234

* Possible Reference to String Resource ID=00014: &quot;? URL&quot;
                                  |
:004B72AA 6A0E                    push 0000000E
:004B72AC 8D4C242C                lea ecx, dword ptr [esp+2C]          查看ECX的值为a22222222222222
:004B72B0 50                      push eax
:004B72B1 51                      push ecx
:004B72B2 E8E9C50000              call 004C38A0　　　　　具体验证CALL
:004B72B7 83C42C                  add esp, 0000002C
:004B72BA 85C0                    test eax, eax          eax=1就over,=0正确
:004B72BC 7510                    jne 004B72CE          ----------------------修改处2
:004B72BE 8B54242C                mov edx, dword ptr [esp+2C]
:004B72C2 660DFFFF                or ax, FFFF
:004B72C6 893A                    mov dword ptr [edx], edi
:004B72C8 5F                      pop edi
:004B72C9 5E                      pop esi
:004B72CA 83C420                  add esp, 00000020
:004B72CD C3                      ret
</code></pre></div><p>修改</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004B7268 7573－－－－－＞9090
:004B72BC 7510－－－－－＞9090
</code></pre></div><p>修改后，运行程序报告crc校验失败</p><p>使用exescope查看<code>cutftp.exe</code>资源,找到出错语句<code>ID=00426</code><br> 用32dasm, 反汇编cutftp32.exe,查找<code>&quot;ID=00426&quot;</code></p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Possible Reference to Dialog: DialogID_0181
                                  |
:0043BCD4 6881010000              push 00000181
:0043BCD9 57                      push edi
:0043BCDA 57                      push edi
:0043BCDB 8B501C                  mov edx, dword ptr [eax+1C]
:0043BCDE 52                      push edx

* Reference To: USER32.RedrawWindow, Ord:01F1h
                                  |
:0043BCDF FF153CC65100            Call dword ptr [0051C63C]
:0043BCE5 C7835006000001000000    mov dword ptr [ebx+00000650], 00000001
:0043BCEF E86C500500              call 00490D60 
:0043BCF4 85C0                    test eax, eax
:0043BCF6 7572                    jne 0043BD6A　　crc正确则跳转  --------------修改3
:0043BCF8 8D45EC                  lea eax, dword ptr [ebp-14]

* Possible Reference to String Resource ID=00426: &quot;CuteFTP ??%?s@齝((&quot;
                                  |
:0043BCFB 68AA010000              push 000001AA
:0043BD00 50                      push eax
:0043BD01 E80A99FEFF              call 004256100043BCEF
:0043BD06 83C408                  add esp, 00000008
:0043BD09 8B00                    mov eax, dword ptr [eax]
:0043BD0B 57                      push edi
</code></pre></div><p>修改:<code>0043BCF6 7572---------------&gt;EB72</code><br> 重新运行程序，可是进行注册时程序自动连接服务器进行注册码验证,返回出错信息<br> 在:<code>004B72BA</code>中断</p><p>跟踪到</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: KERNEL32.LoadResource, Ord:01C7h
                                  |
:00490BF9 FF15B0C25100            Call dword ptr [0051C2B0]
:00490BFF 50                      push eax

* Reference To: KERNEL32.LockResource, Ord:01D5h
                                  |
:00490C00 FF15B4C25100            Call dword ptr [0051C2B4]
:00490C06 8D8C2484080000          lea ecx, dword ptr [esp+00000884]
:00490C0D 50                      push eax
:00490C0E 51                      push ecx
:00490C0F 8D94245C100000          lea edx, dword ptr [esp+0000105C]
:00490C16 56                      push esi
:00490C17 52                      push edx
:00490C18 E8132C0100              call 004A3830                ＜－－－－－进入
:00490C1D 83C410                  add esp, 00000010
:00490C20 8D4C240C                lea ecx, dword ptr [esp+0C]
:00490C24 8BF0                    mov esi, eax
:00490C26 C784242C180000FFFFFFFF  mov dword ptr [esp+0000182C], FFFFFFFF
:00490C31 E830AB0400              call 004DB766
:00490C36 8B8C2424180000          mov ecx, dword ptr [esp+00001824]
:00490C3D 8BC6                    mov eax, esi
:00490C3F 5E                      pop esi
:00490C40 5B                      pop ebx
:00490C41 64890D00000000          mov dword ptr fs:[00000000], ecx
:00490C48 81C428180000            add esp, 00001828
:00490C4E C3                      ret
                              |
                              |
                              |
                              |
* Referenced by a CALL at Address:
|:00490C18  
|

* Possible Reference to String Resource ID=00255: &quot;*~0SM俟y??&amp;髞\x1B?
                                  |
:004A3830 6AFF                    push FFFFFFFF
:004A3832 686D5B5100              push 00515B6D
:004A3837 64A100000000            mov eax, dword ptr fs:[00000000]
:004A383D 50                      push eaxp
                              |
                              |
                              |
                              |
* Possible Reference to String Resource ID=00008: &quot;鍂?(桶/?CuteFTP KH&quot;
                                  |
:004A393A B908000000              mov ecx, 00000008
:004A393F 8D7C2430                lea edi, dword ptr [esp+30]
:004A3943 8D742470                lea esi, dword ptr [esp+70]
:004A3947 33C0                    xor eax, eax
:004A3949 F3                      repz
:004A394A A7                      cmpsd
:004A394B 5F                      pop edi
:004A394C 5E                      pop esi
:004A394D 745E                    je 004A39AD              一定要跳              修改处5
:004A394F 8D4C2418                lea ecx, dword ptr [esp+18]
</code></pre></div><p>还是在<code>:004B72BA</code>中断，F10跟踪到如下部分</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Possible StringData Ref from Data Obj -&gt;&quot;reg&quot;
                                  |
:00491EBB 68B4625500              push 005562B4
:00491EC0 52                      push edx
:00491EC1 E8C3060300              call 004C2589
:00491EC6 83C408                  add esp, 00000008
:00491EC9 85C0                    test eax, eax
:00491ECB 0F85FD010000            jne 004920CE          出错跳转  修改处6
:00491ED1 A12C705500              mov eax, dword ptr [0055702C]
:00491ED6 8944242C                mov dword ptr [esp+2C], eax
:00491EDA 8D4C242C                lea ecx, dword ptr [esp+2C]
:00491EDE C644245C07              mov [esp+5C], 07
:00491EE3 51                      push ecx

* Possible StringData Ref from Data Obj -&gt;&quot;key3&quot;
                                  |
:00491EE4 68AC625500              push 005562AC
:00491EE9 8D4C2440                lea ecx, dword ptr [esp+40]
:00491EED E888450400              call 004D647A
:00491EF2 85C0                    test eax, eax
:00491EF4 0F84C1010000            je 004920BB        出错跳转  修改处7
:00491EFA 8DBE94000000            lea edi, dword ptr [esi+00000094]
:00491F00 BD01000000              mov ebp, 00000001
:00491F05 8BCF                    mov ecx, edi
:00491F07 E808070400              call 004D2614
:00491F0C 8BCF                    mov ecx, edi
:00491F0E E84D060400              call 004D2560
:00491F13 6A00                    push 00000000
:00491F15 8D4C2430                lea ecx, dword ptr [esp+30]
:00491F19 E8789C0400              call 004DBB96
:00491F1E 50                      push eax
:00491F1F E88CE6FFFF              call 004905B0
:00491F24 83C404                  add esp, 00000004
:00491F27 85C0                    test eax, eax
:00491F29 0F847E010000            je 004920AD
:00491F2F 6A00                    push 00000000
:00491F31 8BCF                    mov ecx, edi
:00491F33 E85E9C0400              call 004DBB96
:00491F38 50                      push eax
:00491F39 E802E6FFFF              call 00490540
:00491F3E 83C404                  add esp, 00000004
:00491F41 85C0                    test eax, eax
:00491F43 0F8464010000            je 004920AD
:00491F49 E8F2E8FFFF              call 00490840
:00491F4E 85C0                    test eax, eax
:00491F50 0F8457010000            je 004920AD      出错跳转  修改处8

* Possible StringData Ref from Data Obj -&gt;&quot;RegUserName&quot;
                                  |
:00491F56 68FC135500              push 005513FC
:00491F5B 8D4C2438                lea ecx, dword ptr [esp+38]
:00491F5F E870980400              call 004DB7D4
:00491F64 68B49B5500              push 00559BB4
:00491F69 8D4C2434                lea ecx, dword ptr [esp+34]
:00491F6D 885C2460                mov byte ptr [esp+60], bl
:00491F71 E85E980400              call 004DB7D4
:00491F76 8D9698000000            lea edx, dword ptr [esi+00000098]
:00491F7C 8D442434                lea eax, dword ptr [esp+34]
:00491F80 52                      push edx
:00491F81 8D4C2434                lea ecx, dword ptr [esp+34]
:00491F85 50                      push eax
:00491F86 51                      push ecx
:00491F87 C644246809              mov [esp+68], 09
:00491F8C E8DF23FFFF              call 00484370
:00491F91 83C40C                  add esp, 0000000C
:00491F94 8D4C2430                lea ecx, dword ptr [esp+30]
:00491F98 885C245C                mov byte ptr [esp+5C], bl
:00491F9C E8C5970400              call 004DB766
:00491FA1 8D4C2434                lea ecx, dword ptr [esp+34]
:00491FA5 C644245C07              mov [esp+5C], 07
:00491FAA E8B7970400              call 004DB766
:00491FAF 8B86AC000000            mov eax, dword ptr [esi+000000AC]
:00491FB5 85C0                    test eax, eax
:00491FB7 740B                    je 00491FC4    出错跳转  修改处9
:00491FB9 E8A1450600              call 004F655F
:00491FBE 8B4004                  mov eax, dword ptr [eax+04]
:00491FC1 55                      push ebp
:00491FC2 EB0A                    jmp 00491FCE

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00491FB7(C)
|
:00491FC4 E896450600              call 004F655F
:00491FC9 8B4004                  mov eax, dword ptr [eax+04]
:00491FCC 6A00                    push 00000000

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00491FC2(U)
|

* Possible StringData Ref from Data Obj -&gt;&quot;DoNotGrayRegMenu&quot;
                                  |
:00491FCE 68BC5D5500              push 00555DBC

* Possible StringData Ref from Data Obj -&gt;&quot;CuteFTP&quot;
                                  |
:00491FD3 68F4135500              push 005513F4
:00491FD8 8BC8                    mov ecx, eax
:00491FDA E836130500              call 004E3315
:00491FDF 8B152C705500            mov edx, dword ptr [0055702C]
:00491FE5 89542464                mov dword ptr [esp+64], edx
:00491FE9 8D442464                lea eax, dword ptr [esp+64]
:00491FED 8D4C2438                lea ecx, dword ptr [esp+38]
:00491FF1 50                      push eax

* Possible StringData Ref from Data Obj -&gt;&quot;type&quot;
                                  |
:00491FF2 68A4625500              push 005562A4
:00491FF7 C64424640A              mov [esp+64], 0A
:00491FFC E879440400              call 004D647A
:00492001 8B4C2464                mov ecx, dword ptr [esp+64]

* Possible StringData Ref from Data Obj -&gt;&quot;NEWREGISTR&quot;
                                  |
:00492005 6898625500              push 00556298
:0049200A 51                      push ecx
:0049200B E879050300              call 004C2589
:00492010 83C408                  add esp, 00000008
:00492013 85C0                    test eax, eax
:00492015 7507                    jne 0049201E      出错跳转

* Possible Reference to String Resource ID=61516: &quot;m?熻寙▌ CuteFTP o,
魉s桶/?CuteFTP&quot;如果走到这一步，则注册成功
                                  |
:00492017 B84CF00000              mov eax, 0000F04C
:0049201C EB1D                    jmp 0049203B

                            |
</code></pre></div><p>整理一下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004B7268 7573------------9090
:004B72BC 7510------------9090
:0043BCF6 7572------------EB72
:00491581 756E------------EB6E
:004A394D 745E------------EB5E
:00491ECB 0F85FD010000----909090909090
:00491EF4 0F84C1010000----909090909090
:00491F50 0F8457010000----909090909090
:00491FB7 740B------------9090
</code></pre></div><p>任意名注册可通过验证~</p>`,23),s=[o];function F(p,C){return n(),a("div",null,s)}const c=e(d,[["render",F],["__file","crack13.html.vue"]]);export{c as default};
