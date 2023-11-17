import{_ as e,o as n,c as d,a as o}from"./app-a2b6e588.js";const a={},r=o(`<h1 id="关于注册flag在破解中的应用" tabindex="-1"><a class="header-anchor" href="#关于注册flag在破解中的应用" aria-hidden="true">#</a> 关于注册Flag在破解中的应用</h1><blockquote><p>日期：2003年6月8日 作者： 人气： 510<br> by 清风 转载请保持其完整性</p></blockquote><p>众所周知，目前很多共享软件现在都使用全局变量，作为软件注册与否的标志，在汇编中体现为在某个内存地址中，存入1或0，往往1代表已注册，0为共享状态，计算机专业用语中,这个内存地址称之为FLAG,当程序运行时，初始化值为0，读取windoz注册表或*.ini文件中的注册信息后，若已注册，那么flag值变为1，否则，继续保持为0，程序的其他部分可以访问这个flag,维持软件的共享状态。一般情况下，我们只是非常关注一些跳转，crack时有时很难见效！如果熟练掌握了注册Flag，在破解软件中有时会起到事半功倍的效果！下面我以一个教育教学软件为例，说明此法的应用。 有不当之处，垦请各位大虾指正！</p><p><strong>工具</strong>：Wdasm 8.93增强版：注[它可以直接查找汉字，对各种防止静态反编译的软件也可以反编译，如果没有的话，可以到：http://personal.dfminfo.com.cn/~kuangren处下载]Hacker view 很多版本都可以！</p><p><strong>对象</strong>：金数龙光学物理实验室 v1.01 可以到：http://luckteacher.yeah.net物理软件中下载！</p><p><strong>软件的保护</strong>：未注册时，程序启动时显示注册信息，共享时有功能限制，保存器件不能多于一个，程序未被压缩！程序运行时，在当前目录中产生s_data.obj文件，用来存放注册信息，注册成功后，注册信息就存放在此文件中，启动时，读此信息，显示在窗体上&quot;属于xxx xxx&quot;.如果删除此文件，启动后仍显示未注册！属共享状态！</p><p><strong>开始</strong>：执行仿真物理实验室.exe,跳出NAGS，要求注册等等，随意填写注册，对话框为&quot;注册不成功&quot;。关闭程序，检查一下，没加壳！太好了！（-_-）用Wdasm增强版反编译，查找&quot;注册不成功&quot;立即找到，注[可能显示为乱码，可启动Richwin或类似的软件即可看清汉字，但这毕竟不影响]代码如下：[共有两处]</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004370B1 8D45FC                  lea eax, dword ptr [ebp-04]
:004370B4 E86342FDFF              call 0040B31C
:004370B9 50                      push eax
:004370BA 8D95A8F7FFFF            lea edx, dword ptr [ebp+FFFFF7A8]
:004370C0 52                      push edx
:004370C1 E8CEF10600              call 004A6294
:004370C6 83C408                  add esp, 00000008
:004370C9 33C9                    xor ecx, ecx
:004370CB 894D8C                  mov dword ptr [ebp-74], ecx
:004370CE 894D90                  mov dword ptr [ebp-70], ecx
:004370D1 33C0                    xor eax, eax
:004370D3 894588                  mov dword ptr [ebp-78], eax

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0043714E(C)
|
:004370D6 8B5588                  mov edx, dword ptr [ebp-78]
:004370D9 80BC15A8F7FFFF00        cmp byte ptr [ebp+edx-00000858], 00
:004370E1 90                      nop
:004370E2 90                      nop
:004370E3 8B4D88                  mov ecx, dword ptr [ebp-78]
:004370E6 0FBE840DA8F7FFFF        movsx eax, byte ptr [ebp+ecx-00000858]
:004370EE 8985A4F7FFFF            mov dword ptr [ebp+FFFFF7A4], eax
:004370F4 DB85A4F7FFFF            fild dword ptr [ebp+FFFFF7A4]
:004370FA 83C4F8                  add esp, FFFFFFF8
:004370FD DD1C24                  fstp qword ptr [esp]
:00437100 E88F3A0700              call 004AAB94
:00437105 83C408                  add esp, 00000008
:00437108 DB2D64744300            fld tbyte ptr [00437464]
:0043710E DEC9                    fmulp st(1), st(0)
:00437110 83C4F8                  add esp, FFFFFFF8
:00437113 DD1C24                  fstp qword ptr [esp]
:00437116 E895510700              call 004AC2B0
:0043711B 83C408                  add esp, 00000008
:0043711E D80D70744300            fmul dword ptr [00437470]
:00437124 DC0574744300            fadd qword ptr [00437474]
:0043712A 83C4F8                  add esp, FFFFFFF8
:0043712D DD1C24                  fstp qword ptr [esp]
:00437130 E82F380700              call 004AA964
:00437135 83C408                  add esp, 00000008
:00437138 D80D7C744300            fmul dword ptr [0043747C]
:0043713E DC458C                  fadd qword ptr [ebp-74]
:00437141 DD5D8C                  fstp qword ptr [ebp-74]
:00437144 FF4588                  inc [ebp-78]
:00437147 817D88D0070000          cmp dword ptr [ebp-78], 000007D0
:0043714E 7C86                    jl 004370D6
:00437150 66C745B45000            mov [ebp-4C], 0050
:00437156 66C745B45C00            mov [ebp-4C], 005C
:0043715C 8D45E0                  lea eax, dword ptr [ebp-20]
:0043715F E844A7FCFF              call 004018A8
:00437164 8BD0                    mov edx, eax
:00437166 FF45C0                  inc [ebp-40]
:00437169 8B4DA0                  mov ecx, dword ptr [ebp-60]
:0043716C 8B81F0020000            mov eax, dword ptr [ecx+000002F0]
:00437172 E885F70300              call 004768FC
:00437177 8D45E0                  lea eax, dword ptr [ebp-20]
:0043717A E885B60700              call 004B2804
:0043717F DD5D94                  fstp qword ptr [ebp-6C]
:00437182 FF4DC0                  dec [ebp-40]
:00437185 8D45E0                  lea eax, dword ptr [ebp-20]
:00437188 BA02000000              mov edx, 00000002
:0043718D E8AAB40700              call 004B263C
:00437192 66C745B41400            mov [ebp-4C], 0014
:00437198 EB5F                    jmp 004371F9
:0043719A 6A00                    push 00000000

* Possible StringData Ref from Data Obj -&gt;&quot;提示&quot;
                                  |
:0043719C B929234C00              mov ecx, 004C2329

* Possible StringData Ref from Data Obj -&gt;&quot;注册不成功。&quot;
                                  |
:004371A1 BA1C234C00              mov edx, 004C231C
:004371A6 A18C714C00              mov eax, dword ptr [004C718C]
:004371AB 8B00                    mov eax, dword ptr [eax]
:004371AD E84EB30700              call 004B2500
:004371B2 8B45A0                  mov eax, dword ptr [ebp-60]
:004371B5 E86E1A0300              call 00468C28
:004371BA FF4DC0                  dec [ebp-40]
:004371BD 8D45F8                  lea eax, dword ptr [ebp-08]
:004371C0 BA02000000              mov edx, 00000002
:004371C5 E872B40700              call 004B263C
:004371CA FF4DC0                  dec [ebp-40]
:004371CD 8D45FC                  lea eax, dword ptr [ebp-04]
:004371D0 BA02000000              mov edx, 00000002
:004371D5 E862B40700              call 004B263C
:004371DA 33C9                    xor ecx, ecx
:004371DC 894DC0                  mov dword ptr [ebp-40], ecx
:004371DF 8D45A4                  lea eax, dword ptr [ebp-5C]
:004371E2 50                      push eax
:004371E3 E8E78A0700              call 004AFCCF
:004371E8 59                      pop ecx
:004371E9 E96C020000              jmp 0043745A
:004371EE 66C745B45800            mov [ebp-4C], 0058
:004371F4 E82C840700              call 004AF625

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00437198(U)
|
:004371F9 FF7590                  push [ebp-70]
:004371FC FF758C                  push [ebp-74]
:004371FF E8AC2DFDFF              call 00409FB0
:00437204 83C408                  add esp, 00000008
:00437207 DC6D94                  fsubr qword ptr [ebp-6C]
:0043720A 83C4F8                  add esp, FFFFFFF8
:0043720D DD1C24                  fstp qword ptr [esp]
:00437210 E87F390700              call 004AAB94
:00437215 83C408                  add esp, 00000008
:00437218 DC1D80744300            fcomp qword ptr [00437480]
:0043721E DFE0                    fstsw ax
:00437220 9E                      sahf
:00437221 0F83E1010000            jnb 00437408
:00437227 C705EC454B0001000000    mov dword ptr [004B45EC], 00000001
:00437231 8B55A0                  mov edx, dword ptr [ebp-60]
:00437234 8B8AFC020000            mov ecx, dword ptr [edx+000002FC]
:0043723A 81C108020000            add ecx, 00000208
:00437240 894D84                  mov dword ptr [ebp-7C], ecx
:00437243 66C745B46800            mov [ebp-4C], 0068
:00437249 8D45DC                  lea eax, dword ptr [ebp-24]
:0043724C E857A6FCFF              call 004018A8
:00437251 8BD0                    mov edx, eax
:00437253 FF45C0                  inc [ebp-40]
:00437256 8B4DA0                  mov ecx, dword ptr [ebp-60]
:00437259 8B81DC020000            mov eax, dword ptr [ecx+000002DC]
:0043725F E898F60300              call 004768FC
:00437264 8D4DDC                  lea ecx, dword ptr [ebp-24]
:00437267 8B09                    mov ecx, dword ptr [ecx]
:00437269 8B4584                  mov eax, dword ptr [ebp-7C]
:0043726C 8B00                    mov eax, dword ptr [eax]
:0043726E 33D2                    xor edx, edx
:00437270 8B18                    mov ebx, dword ptr [eax]
:00437272 FF5320                  call [ebx+20]
:00437275 FF4DC0                  dec [ebp-40]
:00437278 8D45DC                  lea eax, dword ptr [ebp-24]
:0043727B BA02000000              mov edx, 00000002
:00437280 E8B7B30700              call 004B263C
:00437285 8B4DA0                  mov ecx, dword ptr [ebp-60]
:00437288 8B81FC020000            mov eax, dword ptr [ecx+000002FC]
:0043728E 0508020000              add eax, 00000208
:00437293 894580                  mov dword ptr [ebp-80], eax
:00437296 66C745B47400            mov [ebp-4C], 0074
:0043729C 8D45D8                  lea eax, dword ptr [ebp-28]
:0043729F E804A6FCFF              call 004018A8
:004372A4 8BD0                    mov edx, eax
:004372A6 FF45C0                  inc [ebp-40]
:004372A9 8B4DA0                  mov ecx, dword ptr [ebp-60]
:004372AC 8B81E4020000            mov eax, dword ptr [ecx+000002E4]
:004372B2 E845F60300              call 004768FC
:004372B7 8D4DD8                  lea ecx, dword ptr [ebp-28]
:004372BA 8B09                    mov ecx, dword ptr [ecx]
:004372BC 8B4580                  mov eax, dword ptr [ebp-80]
:004372BF 8B00                    mov eax, dword ptr [eax]
:004372C1 BA01000000              mov edx, 00000001
:004372C6 8B18                    mov ebx, dword ptr [eax]
:004372C8 FF5320                  call [ebx+20]
:004372CB FF4DC0                  dec [ebp-40]
:004372CE 8D45D8                  lea eax, dword ptr [ebp-28]
:004372D1 BA02000000              mov edx, 00000002
:004372D6 E861B30700              call 004B263C
:004372DB 8B4DA0                  mov ecx, dword ptr [ebp-60]
:004372DE 8B81FC020000            mov eax, dword ptr [ecx+000002FC]
:004372E4 0508020000              add eax, 00000208
:004372E9 89857CFFFFFF            mov dword ptr [ebp+FFFFFF7C], eax
:004372EF 66C745B48000            mov [ebp-4C], 0080
:004372F5 8D45D4                  lea eax, dword ptr [ebp-2C]
:004372F8 E8ABA5FCFF              call 004018A8
:004372FD 8BD0                    mov edx, eax
:004372FF FF45C0                  inc [ebp-40]
:00437302 8B4DA0                  mov ecx, dword ptr [ebp-60]
:00437305 8B81F0020000            mov eax, dword ptr [ecx+000002F0]
:0043730B E8ECF50300              call 004768FC
:00437310 8D4DD4                  lea ecx, dword ptr [ebp-2C]
:00437313 8B09                    mov ecx, dword ptr [ecx]
:00437315 8B857CFFFFFF            mov eax, dword ptr [ebp+FFFFFF7C]
:0043731B 8B00                    mov eax, dword ptr [eax]
:0043731D BA02000000              mov edx, 00000002
:00437322 8B18                    mov ebx, dword ptr [eax]
:00437324 FF5320                  call [ebx+20]
:00437327 FF4DC0                  dec [ebp-40]
:0043732A 8D45D4                  lea eax, dword ptr [ebp-2C]
:0043732D BA02000000              mov edx, 00000002
:00437332 E805B30700              call 004B263C
:00437337 8B4DA0                  mov ecx, dword ptr [ebp-60]
:0043733A 8B81FC020000            mov eax, dword ptr [ecx+000002FC]
:00437340 0508020000              add eax, 00000208
:00437345 898578FFFFFF            mov dword ptr [ebp+FFFFFF78], eax
:0043734B 66C745B48C00            mov [ebp-4C], 008C
:00437351 8D45CC                  lea eax, dword ptr [ebp-34]
:00437354 E84FA5FCFF              call 004018A8
:00437359 50                      push eax
:0043735A FF45C0                  inc [ebp-40]

* Possible StringData Ref from Data Obj -&gt;&quot;\\s_data.obj&quot;
                                  |
:0043735D BA2E234C00              mov edx, 004C232E
:00437362 8D45D0                  lea eax, dword ptr [ebp-30]
:00437365 E8AEB10700              call 004B2518
:0043736A FF45C0                  inc [ebp-40]
:0043736D 8D55D0                  lea edx, dword ptr [ebp-30]
:00437370 B8BC754C00              mov eax, 004C75BC
:00437375 59                      pop ecx
:00437376 E805B30700              call 004B2680
:0043737B 8D55CC                  lea edx, dword ptr [ebp-34]
:0043737E 8B12                    mov edx, dword ptr [edx]
:00437380 8B8578FFFFFF            mov eax, dword ptr [ebp+FFFFFF78]
:00437386 8B00                    mov eax, dword ptr [eax]
:00437388 8B08                    mov ecx, dword ptr [eax]
:0043738A FF5164                  call [ecx+64]
:0043738D FF4DC0                  dec [ebp-40]
:00437390 8D45CC                  lea eax, dword ptr [ebp-34]
:00437393 BA02000000              mov edx, 00000002
:00437398 E89FB20700              call 004B263C
:0043739D FF4DC0                  dec [ebp-40]
:004373A0 8D45D0                  lea eax, dword ptr [ebp-30]
:004373A3 BA02000000              mov edx, 00000002
:004373A8 E88FB20700              call 004B263C
:004373AD 6A00                    push 00000000

* Possible StringData Ref from Data Obj -&gt;&quot;提示&quot;
                                  |
:004373AF B967234C00              mov ecx, 004C2367

* Possible StringData Ref from Data Obj -&gt;&quot;您已成为我们的注册用户，感谢您对我们的支持！&quot;
                                  |
:004373B4 BA3A234C00              mov edx, 004C233A
:004373B9 A18C714C00              mov eax, dword ptr [004C718C]
:004373BE 8B00                    mov eax, dword ptr [eax]
:004373C0 E83BB10700              call 004B2500
:004373C5 66C745B49800            mov [ebp-4C], 0098
:004373CB 8D45C8                  lea eax, dword ptr [ebp-38]
:004373CE E8D5A4FCFF              call 004018A8
:004373D3 8BC8                    mov ecx, eax
:004373D5 FF45C0                  inc [ebp-40]
:004373D8 8D55FC                  lea edx, dword ptr [ebp-04]

* Possible StringData Ref from Data Obj -&gt;&quot;仿真物理实验室  V1.0  属于 &quot;
                                  |
:004373DB B86C234C00              mov eax, 004C236C
:004373E0 E873B40700              call 004B2858
:004373E5 8D55C8                  lea edx, dword ptr [ebp-38]
:004373E8 8B12                    mov edx, dword ptr [edx]
:004373EA A110714C00              mov eax, dword ptr [004C7110]
:004373EF 8B00                    mov eax, dword ptr [eax]
:004373F1 E836F50300              call 0047692C
:004373F6 FF4DC0                  dec [ebp-40]
:004373F9 8D45C8                  lea eax, dword ptr [ebp-38]
:004373FC BA02000000              mov edx, 00000002
:00437401 E836B20700              call 004B263C
:00437406 EB20                    jmp 00437428

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00437221(C)
|
:00437408 33C9                    xor ecx, ecx
:0043740A 890DEC454B00            mov dword ptr [004B45EC], ecx
:00437410 6A00                    push 00000000

* Possible StringData Ref from Data Obj -&gt;&quot;提示&quot;
                                  |
:00437412 B996234C00              mov ecx, 004C2396

* Possible StringData Ref from Data Obj -&gt;&quot;注册不成功。&quot;
                                  |
:00437417 BA89234C00              mov edx, 004C2389
:0043741C A18C714C00              mov eax, dword ptr [004C718C]
:00437421 8B00                    mov eax, dword ptr [eax]
:00437423 E8D8B00700              call 004B2500

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00437406(U)
|
:00437428 8B45A0                  mov eax, dword ptr [ebp-60]
:0043742B E8F8170300              call 00468C28
:00437430 FF4DC0                  dec [ebp-40]
:00437433 8D45F8                  lea eax, dword ptr [ebp-08]
:00437436 BA02000000              mov edx, 00000002
:0043743B E8FCB10700              call 004B263C
:00437440 FF4DC0                  dec [ebp-40]
:00437443 8D45FC                  lea eax, dword ptr [ebp-04]
:00437446 BA02000000              mov edx, 00000002
:0043744B E8ECB10700              call 004B263C
:00437450 8B4DA4                  mov ecx, dword ptr [ebp-5C]
:00437453 64890D00000000          mov dword ptr fs:[00000000], ecx



* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004371E9(U)
|
:0043745A 5F                      pop edi
:0043745B 5E                      pop esi
:0043745C 5B                      pop ebx
:0043745D 8BE5                    mov esp, ebp
:0043745F 5D                      pop ebp
:00437460 C3                      ret


:00437461 000000                  BYTE  3 DUP(0)


:00437464 CDCC                    int CC
:00437466 CC                      int 03
:00437467 CC                      int 03
</code></pre></div><p>从第一个&quot;注册不成功&quot;向上看，有这样的提示：</p><p><code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:</code></p><p><code>|:0043714E(C)</code>，这是从后面跳过来的！往前看，再没有能跳过这些字符的跳转！再看下一个&quot;注册不成功&quot; 有这样的提示：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00437221(C)
|
:00437408 33C9                    xor ecx, ecx
:0043740A 890DEC454B00            mov dword ptr [004B45EC], ecx
:00437410 6A00                    push 00000000

* Possible StringData Ref from Data Obj -&gt;&quot;提示&quot;
                                  |
:00437412 B996234C00              mov ecx, 004C2396

* Possible StringData Ref from Data Obj -&gt;&quot;注册不成功。&quot;
</code></pre></div><p>对，找到<code>00437221</code>看看，如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>                      .
                      .
                      .
                      .
:00437221 0F83E1010000            jnb 00437408
:00437227 C705EC454B0001000000    mov dword ptr [004B45EC], 00000001  ======》看到了吗，注册Flag!!!
:00437231 8B55A0                  mov edx, dword ptr [ebp-60]
:00437234 8B8AFC020000            mov ecx, dword ptr [edx+000002FC]
:0043723A 81C108020000            add ecx, 00000208
:00437240 894D84                  mov dword ptr [ebp-7C], ecx
:00437243 66C745B46800            mov [ebp-4C], 0068
:00437249 8D45DC                  lea eax, dword ptr [ebp-24]
:0043724C E857A6FCFF              call 004018A8
:00437251 8BD0                    mov edx, eax
:00437253 FF45C0                  inc [ebp-40]
:00437256 8B4DA0                  mov ecx, dword ptr [ebp-60]
:00437259 8B81DC020000            mov eax, dword ptr [ecx+000002DC]
:0043725F E898F60300              call 004768FC
:00437264 8D4DDC                  lea ecx, dword ptr [ebp-24]
:00437267 8B09                    mov ecx, dword ptr [ecx]
:00437269 8B4584                  mov eax, dword ptr [ebp-7C]
:0043726C 8B00                    mov eax, dword ptr [eax]
:0043726E 33D2                    xor edx, edx
:00437270 8B18                    mov ebx, dword ptr [eax]
:00437272 FF5320                  call [ebx+20]
:00437275 FF4DC0                  dec [ebp-40]
:00437278 8D45DC                  lea eax, dword ptr [ebp-24]
:0043727B BA02000000              mov edx, 00000002
:00437280 E8B7B30700              call 004B263C
:00437285 8B4DA0                  mov ecx, dword ptr [ebp-60]
:00437288 8B81FC020000            mov eax, dword ptr [ecx+0000
                          .
                          .
                          .
                          .
</code></pre></div><p>由<code>00437221 0F83E1010000 jnb 00437408</code>可知，此处不能跳，一跳就GAME OVER了！在跳转的下面一句是：<code>00437227 C705EC454B0001000000 mov dword ptr [004B45EC], 00000001</code>，如果不跳的话，就将1赋值给一个地址，好，就从这入手！为了能将1赋值给它，只能让上面不跳。改<code>00437221</code> 为<code>909090909090</code>即可！打开Hacker view执行更改，运行，注册！哇，注册成功，窗体上显示&quot;属于 xxx xxx&quot;字样！这样破解了吗？关闭！重新运行，该死的，还是未注册用户！</p><p>不要紧，刚才说了这个Flag是一个全局变量，一定是在某处又给它赋值为0了！怎么办？查找刚才的Flag一句的十六进制值：<code>C705EC454B0001000000</code>一查，又发现一句，如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:0040B9CE 83C408                  add esp, 00000008
:0040B9D1 DC6DA0                  fsubr qword ptr [ebp-60]
:0040B9D4 83C4F8                  add esp, FFFFFFF8
:0040B9D7 DD1C24                  fstp qword ptr [esp]
:0040B9DA E8B5F10900              call 004AAB94
:0040B9DF 83C408                  add esp, 00000008
:0040B9E2 DC1D2CBC4000            fcomp qword ptr [0040BC2C]
:0040B9E8 DFE0                    fstsw ax
:0040B9EA 9E                      sahf
:0040B9EB 734B                    jnb 0040BA38
:0040B9ED C705EC454B0001000000    mov dword ptr [004B45EC], 00000001 =====&gt;这里
:0040B9F7 66C745C07400            mov [ebp-40], 0074
:0040B9FD 8D45D8                  lea eax, dword ptr [ebp-28]
:0040BA00 E8A35EFFFF              call 004018A8
:0040BA05 8BC8                    mov ecx, eax
:0040BA07 FF45CC                  inc [ebp-34]
:0040BA0A 8D55FC                  lea edx, dword ptr [ebp-04]

* Possible StringData Ref from Data Obj -&gt;&quot;仿真物理实验室  Ver1.01  属于 &quot;
                                  |
:0040BA0D B89D474B00              mov eax, 004B479D
:0040BA12 E8416E0A00              call 004B2858
:0040BA17 8D55D8                  lea edx, dword ptr [ebp-28]
:0040BA1A 8B12                    mov edx, dword ptr [edx]
:0040BA1C A1B8754C00              mov eax, dword ptr [004C75B8]
:0040BA21 E806AF0600              call 0047692C
:0040BA26 FF4DCC                  dec [ebp-34]
:0040BA29 8D45D8                  lea eax, dword ptr [ebp-28]
:0040BA2C BA02000000              mov edx, 00000002
:0040BA31 E8066C0A00              call 004B263C
:0040BA36 EB3A                    jmp 0040BA72
</code></pre></div><p>再往上一看，又是一个跳转，显然不能跳了！把 <code>0040B9EB 734B jnb 0040BA38</code>改为<code>9090</code>再查找，还有一处：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:0041998A DFE0                    fstsw ax
:0041998C 9E                      sahf
:0041998D 734B                    jnb 004199DA
:0041998F C705EC454B0001000000    mov dword ptr [004B45EC], 00000001=====》这里它上面的jnb显然也不行啦，改为9090好啦！继续查找，再也没啦！用Hacker view 执行更改！再运行程序，任意注册成功！再启动，依然是注册版本！再检查各种功能限制，也没啦！OK！破解成功！
</code></pre></div><p><strong>经验证</strong>：</p><p><code>437227</code>处的赋值是检查注册时注册码是否正确<br><code>40b9ed</code>处的赋值是启动时检查注册码的正确与否！<br><code>41998f</code>处的赋值是打开实验时检查注册码的正确与否！</p><p><strong>总结</strong>：此程序破解，重点应放在Flag上，而不是跳转上</p><p>我曾用此法破解过不少软件，它应属于破解方法中的一种吧！</p><p>（出处：赢政天下收集整理）</p>`,24),p=[r];function t(F,C){return n(),d("div",null,p)}const B=e(a,[["render",t],["__file","crack3.html.vue"]]);export{B as default};
