import{_ as e,o as n,c as F,a}from"./app-f0851ed3.js";const t={},d=a(`<h1 id="winrar2-8到3-0升级手记" tabindex="-1"><a class="header-anchor" href="#winrar2-8到3-0升级手记" aria-hidden="true">#</a> Winrar2.8到3.0升级手记</h1><blockquote><p>日期：2003年6月9日 作者：hello! 人气： 514</p></blockquote><p>刚去网站溜达,好多网站都开始使用RAR3.0标准压缩文件了,我还在用2.8,好象有点跟不上形式了,好吧,俺也去找个3.0,呵呵,还好不是我不喜欢的测试版,安装吧,看看说明,呵呵,注册用户可以从2.8免费升级,正合我意,恩,运行一下,怎么还是评估版呀,不是说可以升级的吗,我2.8也是注册版呀,55555,怎么就不行了呢?有点怀念2.8了.看来得想想办法了.</p><p>工具 W32DASM,TRW2000,HIEW</p><p>过程如下:</p><p>使用W32DASM反汇编后,首先找EVALUATION字样,呵呵,运气真好,一下就找到了</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Addresses:
|:0043F046  , :0044DBD6  , :00450157  
|
:0043F984 81C400FCFFFF            add esp, FFFFFC00
:0043F98A 50                      push eax

* Possible StringData Ref from Data Obj -&gt;&quot;%s - WinRAR&quot;
                                  |
:0043F98B 6875664800              push 00486675
:0043F990 8D442408                lea eax, dword ptr [esp+08]
:0043F994 50                      push eax
:0043F995 E8667A0300              call 00477400
:0043F99A 83C40C                  add esp, 0000000C
:0043F99D 803D1CDD480000          cmp byte ptr [0048DD1C], 00---&gt;这里可以看出48DD1C是个全局变量,也就是注册标志
:0043F9A4 757A                    jne 0043FA20
:0043F9A6 A1B4DF4900              mov eax, dword ptr [0049DFB4]
:0043F9AB 83F814                  cmp eax, 00000014---&gt;小于20天时显示&quot;evaluation copy&quot;
:0043F9AE 7C05                    jl 0043F9B5
:0043F9B0 83F828                  cmp eax, 00000028---&gt;小于40天大于20天时提醒购买
:0043F9B3 7C1D                    jl 0043F9D2

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0043F9AE(C)
|

* Possible Reference to String Resource ID=00873: &quot;evaluation copy&quot;
                                  |
:0043F9B5 B869030000              mov eax, 00000369
:0043F9BA E8DDF1FCFF              call 0040EB9C
:0043F9BF 50                      push eax
:0043F9C0 8D942404020000          lea edx, dword ptr [esp+00000204]
:0043F9C7 52                      push edx
:0043F9C8 E87B3C0300              call 00473648
:0043F9CD 83C408                  add esp, 00000008
:0043F9D0 EB27                    jmp 0043F9F9

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0043F9B3(C)
|
:0043F9D2 B928000000              mov ecx, 00000028

* Possible Reference to String Resource ID=00874: &quot;only %d days left to buy a license&quot;
                                  |
:0043F9D7 B86A030000              mov eax, 0000036A
:0043F9DC 2B0DB4DF4900            sub ecx, dword ptr [0049DFB4]
:0043F9E2 51                      push ecx
:0043F9E3 E8B4F1FCFF              call 0040EB9C
</code></pre></div><p>既然找到了注册标志,那就看看是谁在对他进行设置吧</p><p>下断 <code>BPM 48DD1C</code> 呵呵,LOOK!</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: KERNEL32.GetLocalTime, Ord:0000h
                                  |
:004367B3 E82AAB0400              Call 004812E2
:004367B8 33C0                    xor eax, eax
:004367BA E88D52FDFF              call 0040BA4C---&gt;呼叫验证核心
:004367BF A21CDD4800              mov byte ptr [0048DD1C], al---&gt;这里写入标志,看来上面这个CALL是检测核心
:004367C4 33C0                    xor eax, eax
:004367C6 E9270E0000              jmp 004375F2
</code></pre></div><p>哦,好的,我们到核心再去看看吧: )</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Addresses:
|:0043658A  , :004367BA  , :0043E6F4  , :0043F030  , :00450363  
|
:0040BA4C 55                      push ebp
:0040BA4D 8BEC                    mov ebp, esp
:0040BA4F 81C404F0FFFF            add esp, FFFFF004
:0040BA55 50                      push eax
:0040BA56 81C448FDFFFF            add esp, FFFFFD48
:0040BA5C 53                      push ebx
:0040BA5D 56                      push esi
:0040BA5E 57                      push edi
:0040BA5F 8885E3FEFFFF            mov byte ptr [ebp+FFFFFEE3], al
:0040BA65 BE18D74800              mov esi, 0048D718
:0040BA6A B838324800              mov eax, 00483238
:0040BA6F E874800600              call 00473AE8
:0040BA74 8D95C8FAFFFF            lea edx, dword ptr [ebp+FFFFFAC8]

* Possible StringData Ref from Data Obj -&gt;&quot;rarreg.*&quot;
                                  |
:0040BA7A B85F2E4800              mov eax, 00482E5F
:0040BA7F E815F5FFFF              call 0040AF99---&gt;程序检查是否有一个名字是RARREG的文件
:0040BA84 84C0                    test al, al
:0040BA86 7514                    jne 0040BA9C
:0040BA88 33C0                    xor eax, eax
:0040BA8A 8B95E4FEFFFF            mov edx, dword ptr [ebp+FFFFFEE4]
:0040BA90 64891500000000          mov dword ptr fs:[00000000], edx
:0040BA97 E9CF050000              jmp 0040C06B---&gt;玩完
</code></pre></div><p>恩,我好象有一个文件名字是RARREG.KEY的文件,把它改这个名字好了,然后,一路走,走,走,来到了这里</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0040BC86(C)
|
:0040BC34 8B3C9D302E4800          mov edi, dword ptr [4*ebx+00482E30]
:0040BC3B 57                      push edi
:0040BC3C E8377A0600              call 00473678
:0040BC41 59                      pop ecx
:0040BC42 8BC8                    mov ecx, eax
:0040BC44 8BD7                    mov edx, edi---&gt;EDX的东西好眼熟,好象在哪里看到过呀,对了,在我的RARREG文件里好象也有这么一堆字符
:0040BC46 8D8548F6FFFF            lea eax, dword ptr [ebp+FFFFF648]
:0040BC4C E85B060000              call 0040C2AC---&gt;黑名单比较
:0040BC51 85C0                    test eax, eax---&gt;上了黑名单吗?好惨: (
:0040BC53 752D                    jne 0040BC82---&gt;没有上黑名单?恭喜,下面就一路顺风了: )
:0040BC55 33C0                    xor eax, eax
:0040BC57 BA02000000              mov edx, 00000002
:0040BC5C 50                      push eax
:0040BC5D 8D8508FFFFFF            lea eax, dword ptr [ebp+FFFFFF08]
:0040BC63 83AD00FFFFFF04          sub dword ptr [ebp+FFFFFF00], 00000004
:0040BC6A E8BD070000              call 0040C42C
:0040BC6F 58                      pop eax
:0040BC70 8B95E4FEFFFF            mov edx, dword ptr [ebp+FFFFFEE4]
:0040BC76 64891500000000          mov dword ptr fs:[00000000], edx
:0040BC7D E9E9030000              jmp 0040C06B---&gt;又玩完
</code></pre></div><p>跟到这里终于发现,原来我的RARREG里的东西上了黑名单了: (,怎么办?: ((((,既然别的都认可了,那说明作者说的话是真的,可以直接从2.8升级到3.0,恩,有了,我把黑名单换一下好了,在名单上的滋味可不好,人怕出名猪怕壮呀: )</p><p>呵呵,看看程序的空间,觉得这里好象是最理想的地方,用HIEW改吧 : )</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>//******************** Program Entry Point ********
:00401000 EB10                    jmp 00401012              ---&gt;这里改EB09
:00401002 66623A                  bound di, word ptr [edx]
:00401005 43                      inc ebx
:00401006 2B2B                    sub ebp, dword ptr [ebx]
:00401008 48                      dec eax
:00401009 4F                      dec edi
:0040100A 4F                      dec edi
:0040100B 4B                      dec ebx                  ---&gt;这里开始改成C605402F080033(注意,这是把和我自己的注册文件里的相同的一组数据中一个字符给改了,可能和大家的情况有点不同,请自己修改)
:0040100C 90                      nop
:0040100D E9C4214800              jmp 008831D6

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:00401000(U)
|
:00401012 A1B7214800              mov eax, dword ptr [004821B7]---&gt;程序入口
</code></pre></div><p>好,运行一下,呵呵,怎么样,想必大家都知道了 : ) ,我天生比较懒,所以想了这么个懒办法 : )</p><p>在这里有了点问题,请高手指教,我用TRW载入的时候,发现黑名单随着程序载入,已经存在,不能判断数据源在哪里,用资源工具也没找到这些数据的踪影,若我想拦截这些数据装入时该怎么办?</p><p>hello!</p>`,20),o=[d];function p(r,B){return n(),F("div",null,o)}const C=e(t,[["render",p],["__file","safe5.html.vue"]]);export{C as default};
