import{_ as e,o as n,c as C,a as d}from"./app-a2b6e588.js";const r={},a=d(`<h1 id="从轻松试卷-v4-03-的破解看-r-fl-z-的妙用" tabindex="-1"><a class="header-anchor" href="#从轻松试卷-v4-03-的破解看-r-fl-z-的妙用" aria-hidden="true">#</a> 从轻松试卷 v4.03 的破解看 r fl z 的妙用</h1><blockquote><p>日期：2003年6月8日 作者：PaulYoung 人气： 338</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>★从轻松试卷 v4.03 的破解看 r fl z 的妙用★

作者:PaulYoung
E-mail:paulyoung@yeah.net
软件简介：顾名思义啦。
URL:http://easypaper.yeah.net （最新版本是 v4.04　，相信也差不了多少）
破解工具：SOFT-ICE V4.0.5
二○○一年三月二十四日凌晨
</code></pre></div><hr><hr><p>首先感谢★小牧童★大师的指点，才能使我能用 W32DASM V8.93 反汇编轻松试卷。虽然我是用动态跟踪破解的，但要写破解心得，首选还是 w32DASM 。</p><hr><hr><p>好了，首先自我介绍一番，我是名初学者，学了个把两个月破解吧，因此，汇编知识自然是鸟之又鸟的了，但熟能生巧嘛，而且我又是看雪破解论坛的常客，一来二往，真的学了不少东西。</p><p>最近我学了一招 r fl z ，功能大概跟 a 指令差不多吧，不过我觉得它按起来顺手多了。TRW2000 和　SOFT-ICE　均可使用，灵活运用，对破解能起到事半功倍的作用。</p><p>下面，我就以轻松试卷为例，看看 r fl z 有何妙处吧。</p><p>1、运行轻松试卷，在注册框的学校/单位、用户名、注册号处填写，随你便啦。<br> 2、Ctrl+D　激活SOFT-ICE，下 BPX HMEMCPY。F5 退出，点击确定，被拦截。<br> 3、下 BD *　，中断所有断点。<br> 4、按12次 F12 （因为13次出错），开始看：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004019A5 8D4DF8                  lea ecx, dword ptr [ebp-08]        //程序入口
:004019A8 51                      push ecx
:004019A9 8BD7                    mov edx, edi
:004019AB 8D45F4                  lea eax, dword ptr [ebp-0C]
:004019AE E8D5721200              call 00528C88
:004019B3 FF431C                  inc [ebx+1C]
:004019B6 8D55F4                  lea edx, dword ptr [ebp-0C]
:004019B9 58                      pop eax
:004019BA E80D751200              call 00528ECC
:004019BF 50                      push eax
:004019C0 FF4B1C                  dec [ebx+1C]
:004019C3 8D45F4                  lea eax, dword ptr [ebp-0C]
:004019C6 BA02000000              mov edx, 00000002
:004019CB E818741200              call 00528DE8
:004019D0 FF4B1C                  dec [ebx+1C]
:004019D3 8D45F8                  lea eax, dword ptr [ebp-08]
:004019D6 BA02000000              mov edx, 00000002
:004019DB E808741200              call 00528DE8              //学校名、单位名不能为空（我掉头就溜……）
:004019E0 59                      pop ecx
:004019E1 84C9                    test cl, cl
:004019E3 745F                    je 00401A44  　　　　　　//下 r fl z ,F5退出，可看到上面提示
:004019E5 66C743101400            mov [ebx+10], 0014
:004019EB 8D5701                  lea edx, dword ptr [edi+01]
:004019EE 8D45F0                  lea eax, dword ptr [ebp-10]
:004019F1 E892721200              call 00528C88
:004019F6 FF431C                  inc [ebx+1C]
:004019F9 8D45F0                  lea eax, dword ptr [ebp-10]
:004019FC 33D2                    xor edx, edx
:004019FE 8955EC                  mov dword ptr [ebp-14], edx
:00401A01 8D55EC                  lea edx, dword ptr [ebp-14]
:00401A04 FF431C                  inc [ebx+1C]
:00401A07 E8E8A90100              call 0041C3F4
:00401A0C 8D45EC                  lea eax, dword ptr [ebp-14]
:00401A0F 8B00                    mov eax, dword ptr [eax]
:00401A11 E886420100              call 00415C9C
:00401A16 FF4B1C                  dec [ebx+1C]
:00401A19 8D45EC                  lea eax, dword ptr [ebp-14]
:00401A1C BA02000000              mov edx, 00000002
:00401A21 E8C2731200              call 00528DE8
:00401A26 FF4B1C                  dec [ebx+1C]
:00401A29 8D45F0                  lea eax, dword ptr [ebp-10]
:00401A2C BA02000000              mov edx, 00000002
:00401A31 E8B2731200              call 00528DE8
:00401A36 8B0B                    mov ecx, dword ptr [ebx]
:00401A38 64890D00000000          mov dword ptr fs:[00000000], ecx
:00401A3F E972030000              jmp 00401DB6

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:004019E3(C)
|
:00401A44 66C743102000            mov [ebx+10], 0020
:00401A4A 33C0                    xor eax, eax
:00401A4C 8945E8                  mov dword ptr [ebp-18], eax
:00401A4F 8D55E8                  lea edx, dword ptr [ebp-18]
:00401A52 FF431C                  inc [ebx+1C]
:00401A55 8B86DC020000            mov eax, dword ptr [esi+000002DC]
:00401A5B E8F8A60D00              call 004DC158
:00401A60 8D55E8                  lea edx, dword ptr [ebp-18]
:00401A63 52                      push edx
:00401A64 8D5711                  lea edx, dword ptr [edi+11]
:00401A67 8D45E4                  lea eax, dword ptr [ebp-1C]
:00401A6A E819721200              call 00528C88
:00401A6F FF431C                  inc [ebx+1C]
:00401A72 8D55E4                  lea edx, dword ptr [ebp-1C]
:00401A75 58                      pop eax
:00401A76 E851741200              call 00528ECC
:00401A7B 50                      push eax
:00401A7C FF4B1C                  dec [ebx+1C]
:00401A7F 8D45E4                  lea eax, dword ptr [ebp-1C]
:00401A82 BA02000000              mov edx, 00000002
:00401A87 E85C731200              call 00528DE8
:00401A8C FF4B1C                  dec [ebx+1C]
:00401A8F 8D45E8                  lea eax, dword ptr [ebp-18]
:00401A92 BA02000000              mov edx, 00000002
:00401A97 E84C731200              call 00528DE8                  //用户名不能为空（傻子才会跟进去）
:00401A9C 59                      pop ecx
:00401A9D 84C9                    test cl, cl
:00401A9F 745F                    je 00401B00　　　　　　　　　　//下 r fl z ,F5退出，可看到上面提示
:00401AA1 66C743102C00            mov [ebx+10], 002C
:00401AA7 8D5712                  lea edx, dword ptr [edi+12]
:00401AAA 8D45E0                  lea eax, dword ptr [ebp-20]
:00401AAD E8D6711200              call 00528C88
:00401AB2 FF431C                  inc [ebx+1C]
:00401AB5 8D45E0                  lea eax, dword ptr [ebp-20]
:00401AB8 33D2                    xor edx, edx
:00401ABA 8955DC                  mov dword ptr [ebp-24], edx
:00401ABD 8D55DC                  lea edx, dword ptr [ebp-24]
:00401AC0 FF431C                  inc [ebx+1C]
:00401AC3 E82CA90100              call 0041C3F4
:00401AC8 8D45DC                  lea eax, dword ptr [ebp-24]
:00401ACB 8B00                    mov eax, dword ptr [eax]
:00401ACD E8CA410100              call 00415C9C
:00401AD2 FF4B1C                  dec [ebx+1C]
:00401AD5 8D45DC                  lea eax, dword ptr [ebp-24]
:00401AD8 BA02000000              mov edx, 00000002
:00401ADD E806731200              call 00528DE8
:00401AE2 FF4B1C                  dec [ebx+1C]
:00401AE5 8D45E0                  lea eax, dword ptr [ebp-20]
:00401AE8 BA02000000              mov edx, 00000002
:00401AED E8F6721200              call 00528DE8
:00401AF2 8B0B                    mov ecx, dword ptr [ebx]
:00401AF4 64890D00000000          mov dword ptr fs:[00000000], ecx
:00401AFB E9B6020000              jmp 00401DB6

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00401A9F(C)
|
:00401B00 66C743103800            mov [ebx+10], 0038
:00401B06 33C0                    xor eax, eax
:00401B08 8945D8                  mov dword ptr [ebp-28], eax
:00401B0B 8D55D8                  lea edx, dword ptr [ebp-28]
:00401B0E FF431C                  inc [ebx+1C]
:00401B11 8B86E0020000            mov eax, dword ptr [esi+000002E0]
:00401B17 E83CA60D00              call 004DC158
:00401B1C 8D55D8                  lea edx, dword ptr [ebp-28]
:00401B1F 52                      push edx
:00401B20 8D5724                  lea edx, dword ptr [edi+24]
:00401B23 8D45D4                  lea eax, dword ptr [ebp-2C]
:00401B26 E85D711200              call 00528C88
:00401B2B FF431C                  inc [ebx+1C]
:00401B2E 8D55D4                  lea edx, dword ptr [ebp-2C]
:00401B31 58                      pop eax
:00401B32 E895731200              call 00528ECC
:00401B37 50                      push eax
:00401B38 FF4B1C                  dec [ebx+1C]
:00401B3B 8D45D4                  lea eax, dword ptr [ebp-2C]
:00401B3E BA02000000              mov edx, 00000002
:00401B43 E8A0721200              call 00528DE8
:00401B48 FF4B1C                  dec [ebx+1C]
:00401B4B 8D45D8                  lea eax, dword ptr [ebp-28]
:00401B4E BA02000000              mov edx, 00000002
:00401B53 E890721200              call 00528DE8                        //注册号不能为空（快点走吧……）
:00401B58 59                      pop ecx
:00401B59 84C9                    test cl, cl
:00401B5B 745F                    je 00401BBC　　　　　　　　　　　　　//下 r fl z ,F5退出，可看到上面提示
:00401B5D 66C743104400            mov [ebx+10], 0044
:00401B63 8D5725                  lea edx, dword ptr [edi+25]
:00401B66 8D45D0                  lea eax, dword ptr [ebp-30]
:00401B69 E81A711200              call 00528C88
:00401B6E FF431C                  inc [ebx+1C]
:00401B71 8D45D0                  lea eax, dword ptr [ebp-30]
:00401B74 33D2                    xor edx, edx
:00401B76 8955CC                  mov dword ptr [ebp-34], edx
:00401B79 8D55CC                  lea edx, dword ptr [ebp-34]
:00401B7C FF431C                  inc [ebx+1C]
:00401B7F E870A80100              call 0041C3F4
:00401B84 8D45CC                  lea eax, dword ptr [ebp-34]
:00401B87 8B00                    mov eax, dword ptr [eax]
:00401B89 E80E410100              call 00415C9C
:00401B8E FF4B1C                  dec [ebx+1C]
:00401B91 8D45CC                  lea eax, dword ptr [ebp-34]
:00401B94 BA02000000              mov edx, 00000002
:00401B99 E84A721200              call 00528DE8
:00401B9E FF4B1C                  dec [ebx+1C]
:00401BA1 8D45D0                  lea eax, dword ptr [ebp-30]
:00401BA4 BA02000000              mov edx, 00000002
:00401BA9 E83A721200              call 00528DE8
:00401BAE 8B0B                    mov ecx, dword ptr [ebx]
:00401BB0 64890D00000000          mov dword ptr fs:[00000000], ecx
:00401BB7 E9FA010000              jmp 00401DB6

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00401B5B(C)
|
:00401BBC 66C743105C00            mov [ebx+10], 005C
:00401BC2 33C0                    xor eax, eax
:00401BC4 8945C4                  mov dword ptr [ebp-3C], eax
:00401BC7 8D55C4                  lea edx, dword ptr [ebp-3C]
:00401BCA FF431C                  inc [ebx+1C]
:00401BCD 8B86D8020000            mov eax, dword ptr [esi+000002D8]
:00401BD3 E880A50D00              call 004DC158
:00401BD8 8D55C4                  lea edx, dword ptr [ebp-3C]
:00401BDB 33C0                    xor eax, eax
:00401BDD 8B0A                    mov ecx, dword ptr [edx]
:00401BDF 8D55C8                  lea edx, dword ptr [ebp-38]
:00401BE2 51                      push ecx
:00401BE3 8945C8                  mov dword ptr [ebp-38], eax
:00401BE6 FF431C                  inc [ebx+1C]
:00401BE9 8B86DC020000            mov eax, dword ptr [esi+000002DC]
:00401BEF E864A50D00              call 004DC158
:00401BF4 8D45C8                  lea eax, dword ptr [ebp-38]
:00401BF7 8B00                    mov eax, dword ptr [eax]
:00401BF9 33D2                    xor edx, edx
:00401BFB 8955FC                  mov dword ptr [ebp-04], edx
:00401BFE 8D4DFC                  lea ecx, dword ptr [ebp-04]
:00401C01 FF431C                  inc [ebx+1C]
:00401C04 5A                      pop edx
:00401C05 E8762C0100              call 00414880
:00401C0A FF4B1C                  dec [ebx+1C]
:00401C0D 8D45C4                  lea eax, dword ptr [ebp-3C]
:00401C10 BA02000000              mov edx, 00000002
:00401C15 E8CE711200              call 00528DE8
:00401C1A FF4B1C                  dec [ebx+1C]
:00401C1D 8D45C8                  lea eax, dword ptr [ebp-38]
:00401C20 BA02000000              mov edx, 00000002
:00401C25 E8BE711200              call 00528DE8
:00401C2A 66C743105000            mov [ebx+10], 0050
:00401C30 66C743106800            mov [ebx+10], 0068
:00401C36 33C0                    xor eax, eax
:00401C38 8945C0                  mov dword ptr [ebp-40], eax
:00401C3B 8D55C0                  lea edx, dword ptr [ebp-40]
:00401C3E FF431C                  inc [ebx+1C]
:00401C41 8B86E0020000            mov eax, dword ptr [esi+000002E0]
:00401C47 E80CA50D00              call 004DC158
:00401C4C 8D55C0                  lea edx, dword ptr [ebp-40]
:00401C4F 8D45FC                  lea eax, dword ptr [ebp-04]
:00401C52 E875721200              call 00528ECC
:00401C57 50                      push eax
:00401C58 FF4B1C                  dec [ebx+1C]
:00401C5B 8D45C0                  lea eax, dword ptr [ebp-40]
:00401C5E BA02000000              mov edx, 00000002
:00401C63 E880711200              call 00528DE8            //恭喜你，你已成功注册（哈……哈……，快成功了！）
:00401C68 59                      pop ecx
:00401C69 84C9                    test cl, cl
:00401C6B 0F84C0000000            je 00401D31　　　　　　　//下 r fl z ,F5退出，可看到上面提示
:00401C71 66C743107400            mov [ebx+10], 0074
:00401C77 33C0                    xor eax, eax
:00401C79 8945BC                  mov dword ptr [ebp-44], eax
:00401C7C 8D55BC                  lea edx, dword ptr [ebp-44]
:00401C7F FF431C                  inc [ebx+1C]
:00401C82 8B86D8020000            mov eax, dword ptr [esi+000002D8]
:00401C88 E8CBA40D00              call 004DC158
:00401C8D 8D55BC                  lea edx, dword ptr [ebp-44]
:00401C90 33C0                    xor eax, eax
:00401C92 8B0A                    mov ecx, dword ptr [edx]
:00401C94 8D55B8                  lea edx, dword ptr [ebp-48]
:00401C97 51                      push ecx
:00401C98 8945B8                  mov dword ptr [ebp-48], eax
:00401C9B FF431C                  inc [ebx+1C]
:00401C9E 8B86DC020000            mov eax, dword ptr [esi+000002DC]
:00401CA4 E8AFA40D00              call 004DC158
:00401CA9 8D55B8                  lea edx, dword ptr [ebp-48]
:00401CAC 8B0A                    mov ecx, dword ptr [edx]
:00401CAE 51                      push ecx
:00401CAF E818340100              call 004150CC
:00401CB4 83C408                  add esp, 00000008
:00401CB7 FF4B1C                  dec [ebx+1C]
:00401CBA 8D45B8                  lea eax, dword ptr [ebp-48]
:00401CBD BA02000000              mov edx, 00000002                    //D EDX ,ALT+↑可看到注册码
:00401CC2 E821711200              call 00528DE8
:00401CC7 FF4B1C                  dec [ebx+1C]
:00401CCA 8D45BC                  lea eax, dword ptr [ebp-44]
:00401CCD BA02000000              mov edx, 00000002
:00401CD2 E811711200              call 00528DE8
:00401CD7 66C743108000            mov [ebx+10], 0080
:00401CDD 8D573D                  lea edx, dword ptr [edi+3D]
:00401CE0 8D45B4                  lea eax, dword ptr [ebp-4C]
:00401CE3 E8A06F1200              call 00528C88
:00401CE8 FF431C                  inc [ebx+1C]
:00401CEB 8D45B4                  lea eax, dword ptr [ebp-4C]
:00401CEE 33D2                    xor edx, edx
:00401CF0 8955B0                  mov dword ptr [ebp-50], edx
:00401CF3 8D55B0                  lea edx, dword ptr [ebp-50]
:00401CF6 FF431C                  inc [ebx+1C]
:00401CF9 E8F6A60100              call 0041C3F4
:00401CFE 8D45B0                  lea eax, dword ptr [ebp-50]
:00401D01 8B00                    mov eax, dword ptr [eax]
:00401D03 E8B03E0100              call 00415BB8                //弹出“恭喜你，你已成功注册”窗口


**************************************************************************************************************
</code></pre></div><p>大家明白了吗？r fl z 并不会真的修改程序，只是起到模拟的作用，用它来验证某些 CALL 的功能非常好用，象我这种不太懂汇编的初学者来说，看到可疑的 CALL 与 jne,je 时，在jne/je 处下 r fl z ，再 F5 退出，看一看提示，就毋须象以前那样乱 D or ？一通，甚至 F8 跟入，徒劳无功了。如象 00401C63 处，在 00401C6B je 00401D31 处下 r fl z,弹出成功窗口，说明这个call有问题，虽然跟进这个 call 只能看到正确注册码的前三位，但很多软件还是用这种办法直接找到注册码或 F8 跟入再找到注册码的。</p><p>注：1、各位验证某个 call 时最好先 BD * 中断之前的所有断点，再在这个 call 设断，下 r fl z ，F5 退出后，如果发现不是验证注册码的 call ，按确定一般都可以被 TRW2000,SOFT-ICE 拦截，以便继续验证。（因为验证可能不止一次，如上例，以免重复作无谓的劳动。）<br> 2、00401C6B je 00401D31 处必须下 r fl z，否则你是不可能来到00401CBD mov edx, 00000002的，切记，切记！</p>`,15),x=[a];function p(o,l){return n(),C("div",null,x)}const D=e(r,[["render",p],["__file","crack6.html.vue"]]);export{D as default};
