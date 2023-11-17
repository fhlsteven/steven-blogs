import{_ as n,o as A,c as e,a as o}from"./app-d9da1b6d.js";const t={},a=o(`<h1 id="简单算法——windows设置大师-2003-build-0415" tabindex="-1"><a class="header-anchor" href="#简单算法——windows设置大师-2003-build-0415" aria-hidden="true">#</a> 简单算法——Windows设置大师 2003 Build 0415</h1><blockquote><p>日期：2003年7月4日 作者：fly 人气： 2016</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>下载页面：  http://www.skycn.net/soft/11596.html
软件大小：  693 KB
软件语言：  简体中文
软件类别：  国产软件 / 共享版 / 系统设置
应用平台：  Win9x/NT/2000/XP
加入时间：  2003-04-03 16:03:55
下载次数：  226
推荐等级：  ***
</code></pre></div><p>【软件简介】：</p><p>1、Windows高级设置:在这个设置里，您可以系统进行一系列设置，包括禁止注册表运行、禁止按取消键登录系统等等……<br> 2、开始菜单和控制面板设置:在这个设置里，您可以对开始菜单和控制面板进行一系列设置……<br> 3、IE高级设置:在这个设置里，您可以IE进行一系列设置，包括隐藏部分选项、修改IE标题等等……<br> 4、其它高级设置:在这个设置里，您可以清除系统垃圾、隐藏驱动器等等……<br> 5、其它功能正在扩充中……</p><p>【软件限制】：20次试用。</p><p>【作者声明】：初学Crack，只是感兴趣，没有其它目的。失误之处敬请诸位大侠赐教！</p><p>【破解工具】：TRW2000娃娃修改版、Ollydbg1.09、PEiD、PE-scan、W32Dasm 10修改版</p><hr><p>【过 程】：</p><p>Windows设置大师2003.exe 是 PECompact壳。用PE-scan脱之。414K-&gt;1.23M。Delphi编写。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>申请号：14215752
姓  名：fly
公  司：【OCN】     不参与运算
试炼码：13572468
</code></pre></div><p>反汇编，查看出错提示，很容易就找到下面的核心了。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004AAE09(C)
|
:004AAE7D 6964617465640053        imul esp, dword ptr [ecx+74], 53006465
:004AAE85 8BD8                    mov ebx, eax
:004AAE87 8BC3                    mov eax, ebx
:004AAE89 E876ABFFFF              call 004A5A04
                                 ====&gt;关键CALL!进入！

:004AAE8E 84C0                    test al, al
:004AAE90 7409                    je 004AAE9B
                                 ====&gt;跳则OVER！

:004AAE92 8BC3                    mov eax, ebx
:004AAE94 E877AAFFFF              call 004A5910
:004AAE99 5B                      pop ebx
:004AAE9A C3                      ret


* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004AAE90(C)
|
:004AAE9B 6A00                    push 00000000

* Possible StringData Ref from Code Obj -&gt;&quot;请与作者联系注册!&quot;
                                 |
:004AAE9D B9B8AE4A00              mov ecx, 004AAEB8

* Possible StringData Ref from Code Obj -&gt;&quot;对不起!您输入的注册码不正确,无法完成注册&quot;
                                 ====&gt;BAD BOY！

:004AAEA2 BACCAE4A00              mov edx, 004AAECC
:004AAEA7 A110DC4A00              mov eax, dword ptr [004ADC10]
:004AAEAC 8B00                    mov eax, dword ptr [eax]
:004AAEAE E86D29FDFF              call 0047D820
:004AAEB3 5B                      pop ebx
:004AAEB4 C3                      ret


* Referenced by a CALL at Address:
|:004AAE94
|

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A58A5(C)
|
:004A5910 53                      push ebx
:004A5911 B201                    mov dl, 01
:004A5913 A1D4644300              mov eax, dword ptr [004364D4]
:004A5918 E8B70CF9FF              call 004365D4
:004A591D 8BD8                    mov ebx, eax
:004A591F BA03000080              mov edx, 80000003
:004A5924 8BC3                    mov eax, ebx
:004A5926 E8490DF9FF              call 00436674
:004A592B B101                    mov cl, 01

* Possible StringData Ref from Code Obj -&gt;&quot;.DEFAULT\\Software\\xt-studio\\windows\\exe&quot;
                                 ====&gt;保存注册信息

:004A592D BA88594A00              mov edx, 004A5988
:004A5932 8BC3                    mov eax, ebx
:004A5934 E87B0EF9FF              call 004367B4
:004A5939 8B0D54F14A00            mov ecx, dword ptr [004AF154]

* Possible StringData Ref from Code Obj -&gt;&quot;Name&quot;
                                 |
:004A593F BAB8594A00              mov edx, 004A59B8
:004A5944 8BC3                    mov eax, ebx
:004A5946 E8DD11F9FF              call 00436B28
:004A594B 8B0D58F14A00            mov ecx, dword ptr [004AF158]

* Possible StringData Ref from Code Obj -&gt;&quot;Pass&quot;
                                 |
:004A5951 BAC8594A00              mov edx, 004A59C8
:004A5956 8BC3                    mov eax, ebx
:004A5958 E86F12F9FF              call 00436BCC
:004A595D 8BC3                    mov eax, ebx
:004A595F E800DAF5FF              call 00403364
:004A5964 6A00                    push 00000000

* Possible StringData Ref from Code Obj -&gt;&quot;谢谢您注册本软件&quot;
                                 ====&gt;呵呵，胜利女神！

:004A5966 B9D0594A00              mov ecx, 004A59D0

* Possible StringData Ref from Code Obj -&gt;&quot;请您重新启动程序以验证注册码!&quot;
                                 |
:004A596B BAE4594A00              mov edx, 004A59E4
:004A5970 A110DC4A00              mov eax, dword ptr [004ADC10]
:004A5975 8B00                    mov eax, dword ptr [eax]
:004A5977 E8A47EFDFF              call 0047D820
:004A597C 5B                      pop ebx
:004A597D C3                      ret
</code></pre></div><p>进入关键<code>CALL：4AAE89 call 004A5A04</code></p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Address:
|:004AAE89
|
:004A5A04 55                      push ebp
:004A5A05 8BEC                    mov ebp, esp
:004A5A07 B905000000              mov ecx, 00000005

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5A11(C)
|
:004A5A0C 6A00                    push 00000000
:004A5A0E 6A00                    push 00000000

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A599A(C)
|
:004A5A10 49                      dec ecx
:004A5A11 75F9                    jne 004A5A0C
:004A5A13 51                      push ecx

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A59AD(C)
|
:004A5A14 53                      push ebx
:004A5A15 56                      push esi
:004A5A16 57                      push edi
:004A5A17 8945FC                  mov dword ptr [ebp-04], eax
:004A5A1A 33C0                    xor eax, eax
:004A5A1C 55                      push ebp
:004A5A1D 685F5B4A00              push 004A5B5F
:004A5A22 64FF30                  push dword ptr fs:[eax]
:004A5A25 648920                  mov dword ptr fs:[eax], esp
:004A5A28 33DB                    xor ebx, ebx
:004A5A2A 8D55F4                  lea edx, dword ptr [ebp-0C]
:004A5A2D 8B45FC                  mov eax, dword ptr [ebp-04]
:004A5A30 8B80D8040000            mov eax, dword ptr [eax+000004D8]
:004A5A36 E84574FBFF              call 0045CE80
:004A5A3B 8B45F4                  mov eax, dword ptr [ebp-0C]
                                 ====&gt;EAX=[ebp-0C]=fly

:004A5A3E E815EAF5FF              call 00404458
                                 ====&gt;取位数  EAX=3

:004A5A43 8BF8                    mov edi, eax
:004A5A45 6A00                    push 00000000
:004A5A47 6800040000              push 00000400
:004A5A4C B003                    mov al, 03
:004A5A4E E8AD32F6FF              call 00408D00
:004A5A53 E864F5F5FF              call 00404FBC
:004A5A58 8BC8                    mov ecx, eax
:004A5A5A BE01000000              mov esi, 00000001
:004A5A5F 8D0431                  lea eax, dword ptr [ecx+esi]
:004A5A62 99                      cdq
:004A5A63 33C2                    xor eax, edx
:004A5A65 2BC2                    sub eax, edx
:004A5A67 054747A000              add eax, 00A04747
:004A5A6C 8BF0                    mov esi, eax
:004A5A6E 8D45E0                  lea eax, dword ptr [ebp-20]
:004A5A71 50                      push eax
:004A5A72 8D55DC                  lea edx, dword ptr [ebp-24]
:004A5A75 8BC6                    mov eax, esi
:004A5A77 E8702BF6FF              call 004085EC
:004A5A7C 8B45DC                  mov eax, dword ptr [ebp-24]
:004A5A7F B908000000              mov ecx, 00000008
:004A5A84 BA01000000              mov edx, 00000001
:004A5A89 E82AECF5FF              call 004046B8
:004A5A8E 8B45E0                  mov eax, dword ptr [ebp-20]
                                 ====&gt;EAX=14215752            申请号

:004A5A91 E8922CF6FF              call 00408728
:004A5A96 8945E8                  mov dword ptr [ebp-18], eax
                                 ====&gt;EAX=00D8EA48（H）=14215752（D）

:004A5A99 8D45F0                  lea eax, dword ptr [ebp-10]

* Possible StringData Ref from Code Obj -&gt;&quot;-MK5609ZW&quot;
                                 |
:004A5A9C BA785B4A00              mov edx, 004A5B78
                                 ====&gt;EDX=-MK5609ZW

:004A5AA1 E88AE7F5FF              call 00404230
:004A5AA6 8B45F0                  mov eax, dword ptr [ebp-10]
                                 ====&gt;EAX=-MK5609ZW

:004A5AA9 E8AAE9F5FF              call 00404458
                                 ====&gt;取-MK5609ZW的位数

:004A5AAE 8945E4                  mov dword ptr [ebp-1C], eax
                                 ====&gt;EAX=9

:004A5AB1 8BF7                    mov esi, edi
:004A5AB3 85F6                    test esi, esi
:004A5AB5 7E3E                    jle 004A5AF5
:004A5AB7 C745EC01000000          mov [ebp-14], 00000001

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5AF3(C)
|
:004A5ABE 8D45D8                  lea eax, dword ptr [ebp-28]
:004A5AC1 50                      push eax
:004A5AC2 B901000000              mov ecx, 00000001
:004A5AC7 8B55EC                  mov edx, dword ptr [ebp-14]
:004A5ACA 8B45F4                  mov eax, dword ptr [ebp-0C]
                                 ====&gt;EAX=[ebp-0C]=fly

:004A5ACD E8E6EBF5FF              call 004046B8
:004A5AD2 8B45D8                  mov eax, dword ptr [ebp-28]
:004A5AD5 E87EEBF5FF              call 00404658
:004A5ADA 8A00                    mov al, byte ptr [eax]
                          1、    ====&gt;AL=66
                          2、    ====&gt;AL=6C
                          3、    ====&gt;AL=79

:004A5ADC 25FF000000              and eax, 000000FF
:004A5AE1 03D8                    add ebx, eax
                          1、    ====&gt;EBX=00000000 + 66=00000066
                          2、    ====&gt;EBX=042EB57D + 6C=042EB5E9
                          3、    ====&gt;EBX=085D6B00 + 79=085D6B79

:004A5AE3 81C3C6CA5503            add ebx, 0355CAC6
                          1、    ====&gt;EBX=00000066 + 0355CAC6=0355CB2C
                          2、    ====&gt;EBX=042EB5E9 + 0355CAC6=078480AF
                          3、    ====&gt;EBX=085D6B79 + 0355CAC6=0BB3363F

:004A5AE9 035DE8                  add ebx, dword ptr [ebp-18]
                          1、    ====&gt;EBX=0355CB2C + 00D8EA48=042EB574
                          2、    ====&gt;EBX=078480AF + 00D8EA48=085D6AF7
                          3、    ====&gt;EBX=0BB3363F + 00D8EA48=0C8C2087

:004A5AEC 035DE4                  add ebx, dword ptr [ebp-1C]
                          1、    ====&gt;EBX=042EB574 + 9=042EB57D
                          2、    ====&gt;EBX=085D6AF7 + 9=085D6B00
                          3、    ====&gt;EBX=0C8C2087 + 9=0C8C2090
                         呵呵，0C8C2090的10进制值就是我的注册码了！

:004A5AEF FF45EC                  inc [ebp-14]
:004A5AF2 4E                      dec esi
                                 ====&gt;ESI 依次减1

:004A5AF3 75C9                    jne 004A5ABE
                                 ====&gt;循环用户名位数次

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5AB5(C)
|
:004A5AF5 8D55D4                  lea edx, dword ptr [ebp-2C]
:004A5AF8 8B45FC                  mov eax, dword ptr [ebp-04]
:004A5AFB 8B80E0040000            mov eax, dword ptr [eax+000004E0]
                                 ====&gt;EAX=00CD45A0

:004A5B01 E87A73FBFF              call 0045CE80
:004A5B06 8B45D4                  mov eax, dword ptr [ebp-2C]
                                 ====&gt;EAX=13572468

:004A5B09 E81A2CF6FF              call 00408728
                                 ====&gt;把13572468（D）转换成16进制值EAX=00CF1974（H）

:004A5B0E 3BD8                    cmp ebx, eax
                                 ====&gt;EBX=0C8C2090（H）=210509968（D）  注册码！
                                 ====&gt;EAX=00CF1974（H）=13572468 （D）  试炼码
                 呵呵，比较注册码了。如果相等就OK了！所以我的注册码就是EBX里的10进制值！


:004A5B10 7519                    jne 004A5B2B
                                 ====&gt;跳则OVER！

:004A5B12 C645FB01                mov [ebp-05], 01
                                 ====&gt;置1则OK！

:004A5B16 B854F14A00              mov eax, 004AF154
:004A5B1B 8B55F4                  mov edx, dword ptr [ebp-0C]
:004A5B1E E8C9E6F5FF              call 004041EC
:004A5B23 891D58F14A00            mov dword ptr [004AF158], ebx
:004A5B29 EB04                    jmp 004A5B2F

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5B10(C)
|
:004A5B2B C645FB00                mov [ebp-05], 00
                                 ====&gt;清0则OVER！

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5B29(U)
|
:004A5B2F 33C0                    xor eax, eax
:004A5B31 5A                      pop edx
:004A5B32 59                      pop ecx
:004A5B33 59                      pop ecx
:004A5B34 648910                  mov dword ptr fs:[eax], edx
:004A5B37 68665B4A00              push 004A5B66

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004A5B64(U)
|
:004A5B3C 8D45D4                  lea eax, dword ptr [ebp-2C]
:004A5B3F E854E6F5FF              call 00404198
:004A5B44 8D45D8                  lea eax, dword ptr [ebp-28]
:004A5B47 BA03000000              mov edx, 00000003
:004A5B4C E86BE6F5FF              call 004041BC
:004A5B51 8D45F0                  lea eax, dword ptr [ebp-10]
:004A5B54 BA02000000              mov edx, 00000002
:004A5B59 E85EE6F5FF              call 004041BC
:004A5B5E C3                      ret


:004A5B5F E994DFF5FF              jmp 00403AF8
:004A5B64 EBD6                    jmp 004A5B3C
:004A5B66 8A45FB                  mov al, byte ptr [ebp-05]
                                 ====&gt;标志位 值入 AL

:004A5B69 5F                      pop edi
:004A5B6A 5E                      pop esi
:004A5B6B 5B                      pop ebx
:004A5B6C 8BE5                    mov esp, ebp
:004A5B6E 5D                      pop ebp
:004A5B6F C3                      ret

</code></pre></div><p>【算 法 总 结】：</p><p>姓名字符的HEX值累加，再加<code>（0355CAC6+申请号+9）* 姓名的位数</code></p><p>【KeyMake之内存注册机】：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>中断地址：4A5B0E
中断次数：1
第一字节：3B
指令长度：2

寄存器方式：EBX
十进制
</code></pre></div><p>【注册信息保存】：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>REGEDIT4

[HKEY_USERS\\.DEFAULT\\Software\\xt-studio\\windows\\exe]
&quot;Name&quot;=&quot;fly&quot;
&quot;Pass&quot;=dword:0c8c2090
</code></pre></div><p>【整 理】：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>申请号：14215752
姓  名：fly
公  司：【OCN】
授权码：210509968
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>racked By 巢水工作坊——fly【OCN】
2003-4-6   15:20
</code></pre></div>`,25),d=[a];function B(p,r){return A(),e("div",null,d)}const l=n(t,[["render",B],["__file","crack22.html.vue"]]);export{l as default};
