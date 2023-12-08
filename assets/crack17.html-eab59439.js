import{_ as B,o as D,c as E,a as n}from"./app-f0851ed3.js";const A={},F=n(`<h1 id="输入验证-重启验证的软件破解" tabindex="-1"><a class="header-anchor" href="#输入验证-重启验证的软件破解" aria-hidden="true">#</a> 输入验证＋重启验证的软件破解</h1><blockquote><p>日期：2003年6月9日 作者：lordor 人气： 506</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>软件名称 渗透  
版 本 2.63  
版权所有 软件发行商  
软件平台 Win9x WinNT Win2000 WinME  
整理日期 2003-03-29  
软件授权 共享  
评 分
软件大小 2630KB  
</code></pre></div><h2 id="软件简介" tabindex="-1"><a class="header-anchor" href="#软件简介" aria-hidden="true">#</a> 软件简介</h2><p>PMT可以将多个文件保存于一个24位的BMP文件中，并允许用户进行权限设置，这样，不知情的人只能看到一幅正常的BMP图片，而你，却可在夜深人静时分，打开BMP图片慢慢欣赏里面的内容；或将BMP图片发给好友，即使好友的某某人与他（她）共用一个信箱也无所谓，呵呵，有点像间谍传送情报的味道:)</p><p>1.利用FLASH SWF、24bit BMP、JPG文件的冗余空间，把一批文件插入到这类文件中去，而不破坏原文件的结构和显示效果，以达到隐藏用户重要文件的目的！注意2.6暂时支持用FLASH 4、5做的SWF文件，作者将在短期内推出支持flash MX的版本。<br> 2.同时支持把文件追加到任何文件后！<br> 3.支持把一个文件作为密钥，这样使你的私人文件更安全！<br> 4.隐藏后的文件，可以在宿主文件中直接用渗透2.6打开使用。<br> 5.关闭渗透后，渗透2.6的内置文件粉碎机将删除临时目录中的文件，使得整个系统的安全性加强了！（2.5用户的建议）考虑到因为捆绑了其他文件而使宿主文件突然增大，易于明显，所以渗透2.6仍然提供最大不超过2M的渗透空间用于保存你的重要文件。另，安装包中提供渗透伴侣-寄生虫 1.0，该软件弥补渗透2.6的不足，满足用户另一种捆绑加密方式，两者最大的区别是：寄生虫不限制隐私文件的大小，现在您可以把您的电影藏起来了:)，详细内容见渗透readme.</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>破解工具：ollydbg1.09+w32Dasm
注册码:94A9E1C6
假序列号：4321－5432－6543－7654
</code></pre></div><h2 id="一、脱壳后-在w32dasm找出错信息" tabindex="-1"><a class="header-anchor" href="#一、脱壳后-在w32dasm找出错信息" aria-hidden="true">#</a> 一、脱壳后，在w32Dasm找出错信息</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:004B5002(C), :004B5008(U)
|
:004B500E 807DFB00                cmp byte ptr [ebp-05], 00
:004B5012 7442                    je 004B5056======&gt;会跳到成功
:004B5014 A128B24C00              mov eax, dword ptr [004CB228]
:004B5019 8B00                    mov eax, dword ptr [eax]
:004B501B 8B80F4020000            mov eax, dword ptr [eax+000002F4]

* Possible StringData Ref from Code Obj -&gt;&quot;注册错误&quot;
                                 |
:004B5021 BAA8514B00              mov edx, 004B51A8
:004B5026 E821DDF8FF              call 00442D4C
:004B502B A128B24C00              mov eax, dword ptr [004CB228]
:004B5030 8B00                    mov eax, dword ptr [eax]
</code></pre></div><h2 id="二、向上看-为输入验证部分-对输入的序列号作检验-请看以下代码" tabindex="-1"><a class="header-anchor" href="#二、向上看-为输入验证部分-对输入的序列号作检验-请看以下代码" aria-hidden="true">#</a> 二、向上看，为输入验证部分，对输入的序列号作检验(请看以下代码)</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>004B4F68  |.  8D55 F4       LEA EDX,DWORD PTR SS:[EBP-C]
004B4F6B  |.  8B83 10030000 MOV EAX,DWORD PTR DS:[EBX+310]
004B4F71  |.  E8 A6DDF8FF   CALL AA.00442D1C                 ;  取第一个串4321
004B4F76  |.  8B45 F4       MOV EAX,DWORD PTR SS:[EBP-C]
004B4F79  |.  E8 F6FBFFFF   CALL AA.004B4B74              ;  eax的值为00004321
004B4F7E  |.  8BF0          MOV ESI,EAX
004B4F80  |.  66:F7D6       NOT SI                           ;  异或si为BCDE（串1）
004B4F83  |.  8D55 F0       LEA EDX,DWORD PTR SS:[EBP-10]
004B4F86  |.  8B83 14030000 MOV EAX,DWORD PTR DS:[EBX+314]
004B4F8C  |.  E8 8BDDF8FF   CALL AA.00442D1C                 ;  取第二串
004B4F91  |.  8B45 F0       MOV EAX,DWORD PTR SS:[EBP-10]
004B4F94  |.  E8 DBFBFFFF   CALL AA.004B4B74
004B4F99  |.  8BF8          MOV EDI,EAX                      ;  eax值为5432
004B4F9B  |.  66:F7D7       NOT DI                           ;  异或DI为BCDE（串2）
004B4F9E  |.  8D55 EC       LEA EDX,DWORD PTR SS:[EBP-14]
004B4FA1  |.  8B83 18030000 MOV EAX,DWORD PTR DS:[EBX+318]
004B4FA7  |.  E8 70DDF8FF   CALL AA.00442D1C                 ;  取第三串6543
004B4FAC  |.  8B45 EC       MOV EAX,DWORD PTR SS:[EBP-14]
004B4FAF  |.  E8 C0FBFFFF   CALL AA.004B4B74
004B4FB4  |.  66:8945 FE    MOV WORD PTR SS:[EBP-2],AX       ;  eax值为6543
004B4FB8  |.  8D55 E8       LEA EDX,DWORD PTR SS:[EBP-18]
004B4FBB  |.  8B83 1C030000 MOV EAX,DWORD PTR DS:[EBX+31C]
004B4FC1  |.  E8 56DDF8FF   CALL AA.00442D1C                 ;  取第四串7654
004B4FC6  |.  8B45 E8       MOV EAX,DWORD PTR SS:[EBP-18]
004B4FC9  |.  E8 A6FBFFFF   CALL AA.004B4B74                 ;  eax值为7654
004B4FCE  |.  66:8945 FC    MOV WORD PTR SS:[EBP-4],AX       ;  7654入ebp-4
004B4FD2  |.  C645 FB 00    MOV BYTE PTR SS:[EBP-5],0
004B4FD6  |.  8BD6          MOV EDX,ESI                      ;  第二串非或值入EDX,此为BCDE
004B4FD8  |.  8BC7          MOV EAX,EDI                      ;  第一串非或值入EAX,此为ABCD
004B4FDA  |.  E8 39FCFFFF   CALL AA.004B4C18                 ;  关键call(1)：第一串与第二串作运算,第一串值ABCD作相应运算再与串二BCDE作比较，如相等，则AL置1。
004B4FDF  |.  84C0          TEST AL,AL
004B4FE1  |.  74 27         JE SHORT AA.004B500A
004B4FE3  |.  8BD7          MOV EDX,EDI
004B4FE5  |.  66:33D6       XOR DX,SI                        ;  串1与串2xor值入DX，DX＝1713
004B4FE8  |.  8BC2          MOV EAX,EDX                      ;  xor值入eax
004B4FEA  |.  66:35 A500    XOR AX,0A5                       ;  再与0A5xor
004B4FEE  |.  66:33C6       XOR AX,SI                        ;  再与SI（SI即为BCDE）xor
004B4FF1  |.  66:F7D0       NOT AX                           ;  AX再not
004B4FF4  |.  66:3B55 FE    CMP DX,WORD PTR SS:[EBP-2]       ;  1713与6543串比较
004B4FF8  |.  74 04         JE SHORT AA.004B4FFE=============&gt;(1)je改为jne
004B4FFA  |.  C645 FB 01    MOV BYTE PTR SS:[EBP-5],1
004B4FFE  |&gt;  66:3B45 FC    CMP AX,WORD PTR SS:[EBP-4]
004B5002  |.  74 0A         JE SHORT AA.004B500E=============&gt;(2)je改为jne
004B5004  |.  C645 FB 01    MOV BYTE PTR SS:[EBP-5],1
004B5008  |.  EB 04         JMP SHORT AA.004B500E
004B500A  |&gt;  C645 FB 01    MOV BYTE PTR SS:[EBP-5],1
004B500E  |&gt;  807D FB 00    CMP BYTE PTR SS:[EBP-5],0
004B5012  |.  74 42         JE SHORT AA.004B5056============&gt;(3)je改为jne
004B5014  |.  A1 28B24C00   MOV EAX,DWORD PTR DS:[4CB228]
004B5019  |.  8B00          MOV EAX,DWORD PTR DS:[EAX]
004B501B  |.  8B80 F4020000 MOV EAX,DWORD PTR DS:[EAX+2F4]
004B5021  |.  BA A8514B00   MOV EDX,AA.004B51A8
004B5026  |.  E8 21DDF8FF   CALL AA.00442D4C
004B502B  |.  A1 28B24C00   MOV EAX,DWORD PTR DS:[4CB228]
004B5030  |.  8B00          MOV EAX,DWORD PTR DS:[EAX]
004B5032  |.  8B80 04030000 MOV EAX,DWORD PTR DS:[EAX+304]
004B5038  |.  BA BC514B00   MOV EDX,AA.004B51BC
004B503D  |.  E8 0ADDF8FF   CALL AA.00442D4C
004B5042  |.  A1 28B24C00   MOV EAX,DWORD PTR DS:[4CB228]
004B5047  |.  8B00          MOV EAX,DWORD PTR DS:[EAX]
004B5049  |.  8B10          MOV EDX,DWORD PTR DS:[EAX]
004B504B  |.  FF92 E8000000 CALL DWORD PTR DS:[EDX+E8]       ;  出错框
</code></pre></div><hr><p>CAll(1)</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>004B4C18  /$  55            PUSH EBP
004B4C19  |.  8BEC          MOV EBP,ESP
004B4C1B  |.  83C4 F8       ADD ESP,-8
004B4C1E  |.  53            PUSH EBX
004B4C1F  |.  56            PUSH ESI
004B4C20  |.  33C9          XOR ECX,ECX
004B4C22  |.  894D F8       MOV DWORD PTR SS:[EBP-8],ECX
004B4C25  |.  66:8955 FE    MOV WORD PTR SS:[EBP-2],DX
004B4C29  |.  8BD8          MOV EBX,EAX
004B4C2B  |.  33C0          XOR EAX,EAX
004B4C2D  |.  55            PUSH EBP
004B4C2E  |.  68 A94C4B00   PUSH AA.004B4CA9
004B4C33  |.  64:FF30       PUSH DWORD PTR FS:[EAX]
004B4C36  |.  64:8920       MOV DWORD PTR FS:[EAX],ESP
004B4C39  |.  6A 00         PUSH 0
004B4C3B  |.  8D45 F8       LEA EAX,DWORD PTR SS:[EBP-8]
004B4C3E  |.  B9 C04C4B00   MOV ECX,AA.004B4CC0              ;  ASCII &quot;pmt.dat&quot;
004B4C43  |.  8B15 BC649601 MOV EDX,DWORD PTR DS:[19664BC]
004B4C49  |.  E8 8EFEF4FF   CALL AA.00404ADC
004B4C4E  |.  8B4D F8       MOV ECX,DWORD PTR SS:[EBP-8]     ; |
004B4C51  |.  B2 01         MOV DL,1                         ; |
004B4C53  |.  A1 14504100   MOV EAX,DWORD PTR DS:[415014]    ; |
004B4C58  |.  E8 F751F6FF   CALL AA.00419E54                 ; \\AA.00419E54
004B4C5D  |.  8BF0          MOV ESI,EAX
004B4C5F  |.  0FB7D3        MOVZX EDX,BX                     ;  BX=ABCD
004B4C62  |.  66:8B4D FC    MOV CX,WORD PTR SS:[EBP-4]
004B4C66  |.  8BC6          MOV EAX,ESI
004B4C68  |.  8B18          MOV EBX,DWORD PTR DS:[EAX]
004B4C6A  |.  FF53 10       CALL DWORD PTR DS:[EBX+10]       ;  main
004B4C6D  |.  8D55 FC       LEA EDX,DWORD PTR SS:[EBP-4]     ;  EBP-4为BCDE0000
004B4C70  |.  B9 02000000   MOV ECX,2
004B4C75  |.  8BC6          MOV EAX,ESI
004B4C77  |.  8B18          MOV EBX,DWORD PTR DS:[EAX]
004B4C79  |.  FF53 08       CALL DWORD PTR DS:[EBX+8]        ;  main
004B4C7C  |.  66:8B45 FC    MOV AX,WORD PTR SS:[EBP-4]       ;  AX置
004B4C80  |.  66:3B45 FE    CMP AX,WORD PTR SS:[EBP-2]       ;  AX与BCDE比较
004B4C84      74 04         JE SHORT AA.004B4C8A             ;  关键跳
004B4C86  |.  B3 01         MOV BL,1
004B4C88  |.  EB 02         JMP SHORT AA.004B4C8C
004B4C8A  |&gt;  33DB          XOR EBX,EBX
004B4C8C  |&gt;  8BC6          MOV EAX,ESI
004B4C8E  |.  E8 55EDF4FF   CALL AA.004039E8
004B4C93  |.  33C0          XOR EAX,EAX
004B4C95  |.  5A            POP EDX
004B4C96  |.  59            POP ECX
004B4C97  |.  59            POP ECX
004B4C98  |.  64:8910       MOV DWORD PTR FS:[EAX],EDX
004B4C9B  |.  68 B04C4B00   PUSH AA.004B4CB0
004B4CA0  |&gt;  8D45 F8       LEA EAX,DWORD PTR SS:[EBP-8]
004B4CA3  |.  E8 30FBF4FF   CALL AA.004047D8
004B4CA8  \\.  C3            RETN
－－－－－－－－－－－－－－－－－－－－－－----------
</code></pre></div><h2 id="三、重启后-验证部分" tabindex="-1"><a class="header-anchor" href="#三、重启后-验证部分" aria-hidden="true">#</a> 三、重启后，验证部分</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>004B4CF5  |. E8 D2D90000    CALL bb.004C26CC
004B4CFA  |. 8D45 F8        LEA EAX,DWORD PTR SS:[EBP-8]
004B4CFD  |. BA C44E4B00    MOV EDX,bb.004B4EC4                      ;  ASCII &quot;\\pmt.ini&quot;
004B4D02  |. E8 91FDF4FF    CALL bb.00404A98
004B4D07  |. 8B4D F8        MOV ECX,DWORD PTR SS:[EBP-8]
004B4D0A  |. B2 01          MOV DL,1
004B4D0C  |. A1 FC7A4600    MOV EAX,DWORD PTR DS:[467AFC]
004B4D11  |. E8 962EFBFF    CALL bb.00467BAC
004B4D16  |. 8BF0           MOV ESI,EAX
004B4D18  |. 68 D84E4B00    PUSH bb.004B4ED8                         ;  ASCII &quot;1111&quot;
004B4D1D  |. 8D45 F4        LEA EAX,DWORD PTR SS:[EBP-C]
004B4D20  |. 50             PUSH EAX
004B4D21  |. B9 E84E4B00    MOV ECX,bb.004B4EE8
004B4D26  |. BA F44E4B00    MOV EDX,bb.004B4EF4
004B4D2B  |. 8BC6           MOV EAX,ESI
004B4D2D  |. 8B38           MOV EDI,DWORD PTR DS:[EAX]
004B4D2F  |. FF17           CALL DWORD PTR DS:[EDI]
004B4D31  |. 8B55 F4        MOV EDX,DWORD PTR SS:[EBP-C]
004B4D34  |. 8B83 10030000  MOV EAX,DWORD PTR DS:[EBX+310]
004B4D3A  |. E8 0DE0F8FF    CALL bb.00442D4C
004B4D3F  |. 68 D84E4B00    PUSH bb.004B4ED8                         ;  ASCII &quot;1111&quot;
004B4D44  |. 8D45 F0        LEA EAX,DWORD PTR SS:[EBP-10]
004B4D47  |. 50             PUSH EAX
004B4D48  |. B9 004F4B00    MOV ECX,bb.004B4F00
004B4D4D  |. BA F44E4B00    MOV EDX,bb.004B4EF4
004B4D52  |. 8BC6           MOV EAX,ESI
004B4D54  |. 8B38           MOV EDI,DWORD PTR DS:[EAX]
004B4D56  |. FF17           CALL DWORD PTR DS:[EDI]
004B4D58  |. 8B55 F0        MOV EDX,DWORD PTR SS:[EBP-10]
004B4D5B  |. 8B83 14030000  MOV EAX,DWORD PTR DS:[EBX+314]
004B4D61  |. E8 E6DFF8FF    CALL bb.00442D4C
004B4D66  |. 68 D84E4B00    PUSH bb.004B4ED8                         ;  ASCII &quot;1111&quot;
004B4D6B  |. 8D45 EC        LEA EAX,DWORD PTR SS:[EBP-14]
004B4D6E  |. 50             PUSH EAX
004B4D6F  |. B9 0C4F4B00    MOV ECX,bb.004B4F0C
004B4D74  |. BA F44E4B00    MOV EDX,bb.004B4EF4
004B4D79  |. 8BC6           MOV EAX,ESI
004B4D7B  |. 8B38           MOV EDI,DWORD PTR DS:[EAX]
004B4D7D  |. FF17           CALL DWORD PTR DS:[EDI]
004B4D7F  |. 8B55 EC        MOV EDX,DWORD PTR SS:[EBP-14]
004B4D82  |. 8B83 18030000  MOV EAX,DWORD PTR DS:[EBX+318]
004B4D88  |. E8 BFDFF8FF    CALL bb.00442D4C
004B4D8D  |. 68 D84E4B00    PUSH bb.004B4ED8                         ;  ASCII &quot;1111&quot;
004B4D92  |. 8D45 E8        LEA EAX,DWORD PTR SS:[EBP-18]
004B4D95  |. 50             PUSH EAX
004B4D96  |. B9 184F4B00    MOV ECX,bb.004B4F18
004B4D9B  |. BA F44E4B00    MOV EDX,bb.004B4EF4
004B4DA0  |. 8BC6           MOV EAX,ESI
004B4DA2  |. 8B38           MOV EDI,DWORD PTR DS:[EAX]
004B4DA4  |. FF17           CALL DWORD PTR DS:[EDI]
004B4DA6  |. 8B55 E8        MOV EDX,DWORD PTR SS:[EBP-18]
004B4DA9  |. 8B83 1C030000  MOV EAX,DWORD PTR DS:[EBX+31C]
004B4DAF  |. E8 98DFF8FF    CALL bb.00442D4C
004B4DB4  |. 68 D84E4B00    PUSH bb.004B4ED8                         ;  ASCII &quot;1111&quot;
004B4DB9  |. 8D45 E4        LEA EAX,DWORD PTR SS:[EBP-1C]
004B4DBC  |. 50             PUSH EAX
004B4DBD  |. B9 244F4B00    MOV ECX,bb.004B4F24                      ;  ASCII &quot;ID&quot;
004B4DC2  |. BA 304F4B00    MOV EDX,bb.004B4F30                      ;  ASCII &quot;code&quot;
004B4DC7  |. 8BC6           MOV EAX,ESI
004B4DC9  |. 8B38           MOV EDI,DWORD PTR DS:[EAX]
004B4DCB  |. FF17           CALL DWORD PTR DS:[EDI]                  ;  取机器码bb.0
004B4DCD  |. 8B55 E4        MOV EDX,DWORD PTR SS:[EBP-1C]
004B4DD0  |. 8B83 F8020000  MOV EAX,DWORD PTR DS:[EBX+2F8]
004B4DD6  |. E8 71DFF8FF    CALL bb.00442D4C
004B4DDB  |. 8BC6           MOV EAX,ESI
004B4DDD  |. E8 06ECF4FF    CALL bb.004039E8
004B4DE2  |. 8D55 E0        LEA EDX,DWORD PTR SS:[EBP-20]
004B4DE5  |. 8B83 10030000  MOV EAX,DWORD PTR DS:[EBX+310]
004B4DEB  |. E8 2CDFF8FF    CALL bb.00442D1C
</code></pre></div><p>再重启时与注册码作运算（请看以下代码）</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>004B4DC7  |.  8BC6          MOV EAX,ESI
004B4DC9  |.  8B38          MOV EDI,DWORD PTR DS:[EAX]
004B4DCB  |.  FF17          CALL DWORD PTR DS:[EDI]                  ;  取注册码
004B4DCD  |.  8B55 E4       MOV EDX,DWORD PTR SS:[EBP-1C]
004B4DD0  |.  8B83 F8020000 MOV EAX,DWORD PTR DS:[EBX+2F8]
004B4DD6  |.  E8 71DFF8FF   CALL BB.00442D4C                         ;  main
004B4DDB  |.  8BC6          MOV EAX,ESI
004B4DDD  |.  E8 06ECF4FF   CALL BB.004039E8
004B4DE2  |.  8D55 E0       LEA EDX,DWORD PTR SS:[EBP-20]
004B4DE5  |.  8B83 10030000 MOV EAX,DWORD PTR DS:[EBX+310]
004B4DEB  |.  E8 2CDFF8FF   CALL BB.00442D1C
004B4DF0  |.  8B45 E0       MOV EAX,DWORD PTR SS:[EBP-20]
004B4DF3  |.  E8 7CFDFFFF   CALL BB.004B4B74
004B4DF8  |.  8BF0          MOV ESI,EAX
004B4DFA  |.  66:F7D6       NOT SI
004B4DFD  |.  8D55 DC       LEA EDX,DWORD PTR SS:[EBP-24]
004B4E00  |.  8B83 14030000 MOV EAX,DWORD PTR DS:[EBX+314]
004B4E06  |.  E8 11DFF8FF   CALL BB.00442D1C
004B4E0B  |.  8B45 DC       MOV EAX,DWORD PTR SS:[EBP-24]
004B4E0E  |.  E8 61FDFFFF   CALL BB.004B4B74
004B4E13  |.  8BF8          MOV EDI,EAX
004B4E15  |.  66:F7D7       NOT DI
004B4E18  |.  8D55 D8       LEA EDX,DWORD PTR SS:[EBP-28]
004B4E1B  |.  8B83 18030000 MOV EAX,DWORD PTR DS:[EBX+318]
004B4E21  |.  E8 F6DEF8FF   CALL BB.00442D1C
004B4E26  |.  8B45 D8       MOV EAX,DWORD PTR SS:[EBP-28]
004B4E29  |.  E8 46FDFFFF   CALL BB.004B4B74
004B4E2E  |.  66:8945 FE    MOV WORD PTR SS:[EBP-2],AX
004B4E32  |.  8D55 D4       LEA EDX,DWORD PTR SS:[EBP-2C]
004B4E35  |.  8B83 1C030000 MOV EAX,DWORD PTR DS:[EBX+31C]
004B4E3B  |.  E8 DCDEF8FF   CALL BB.00442D1C
004B4E40  |.  8B45 D4       MOV EAX,DWORD PTR SS:[EBP-2C]
004B4E43  |.  E8 2CFDFFFF   CALL BB.004B4B74
004B4E48  |.  66:8945 FC    MOV WORD PTR SS:[EBP-4],AX
004B4E4C  |.  33DB          XOR EBX,EBX
004B4E4E  |.  8BD6          MOV EDX,ESI
004B4E50  |.  8BC7          MOV EAX,EDI
004B4E52  |.  E8 C1FDFFFF   CALL BB.004B4C18
004B4E57  |.  84C0          TEST AL,AL
004B4E59     /74 23         JE SHORT BB.004B4E7E=============&gt;(4)je改为jne
004B4E5B  |.  8BD7          MOV EDX,EDI
004B4E5D  |.  66:33D6       XOR DX,SI
004B4E60  |.  8BC2          MOV EAX,EDX
004B4E62  |.  66:35 A500    XOR AX,0A5
004B4E66  |.  66:33C6       XOR AX,SI
004B4E69  |.  66:F7D0       NOT AX
004B4E6C  |.  66:3B55 FE    CMP DX,WORD PTR SS:[EBP-2]
004B4E70     /74 02         JE SHORT BB.004B4E74=============&gt;(5)je改为jne
004B4E72  |.  B3 01         MOV BL,1
004B4E74  |&gt;  66:3B45 FC    CMP AX,WORD PTR SS:[EBP-4]
004B4E78     /74 06         JE SHORT BB.004B4E80============&gt;(6)je改为jne
004B4E7A  |.  B3 01         MOV BL,1
004B4E7C  |.  EB 02         JMP SHORT BB.004B4E80
004B4E7E  |&gt;  B3 01         MOV BL,1
004B4E80  |&gt;  80F3 01       XOR BL,1
</code></pre></div><p>为实现爆破，只需在（1）-（6）处作相应更改即可实现破解。</p><p>另：</p><p>本来想跟出注册码，可惜，功力不够，关健CAll(1)有一部分算法看不明白，那位兄弟帮我补充一下。<br> 还有一条寄生虫，大家可以拿来练手。</p>`,22),C=[F];function O(S,R){return D(),E("div",null,C)}const P=B(A,[["render",O],["__file","crack17.html.vue"]]);export{P as default};
