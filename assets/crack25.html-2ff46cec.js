import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="itime-破解实录" tabindex="-1"><a class="header-anchor" href="#itime-破解实录" aria-hidden="true">#</a> iTime 破解实录</h1><blockquote><p>日期：2003年6月9日 作者：CoolBob[CCG] 人气： 500</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>iTime 破解实录
iTime International Version
http://www.touchstone.de
</code></pre></div><p>一个可以同步你的电脑时钟的程序，在2000下不需要了。小弟还是比较喜欢用98作为破解平台，经常泡在SoftICE里面一转就是好几个小时。时钟经常不灵，最近在网上闲逛发现这个程序可以同步时钟，就抓了一个回来。居然还要注册，不然时间到了就不让用。我现在是一看到Register就会条件反射:)，还是写个注册机出来吧。OK，Let&#39;s go!</p><p>1、工具：DeDe v2.50,TRW2000 or SoftICE，TC2.0 or asm(你喜欢的编译器)<br> 2、用DeDe打开iTime.exe，在DeDe中点击Procedures按钮，找到options(unit name)那一项双击，在右边的窗口中找到mnuRegisterClick这一项，再双击，WOW!</p><p>来到这里你已经成功一半啦!<code>^*^</code>(这么简单?)</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference to: controls.TControl.GetText(TControl):System.String;
|
004078B4  E80F0C0300            call    004384C8
004078B9  8D45F8                lea    eax, [ebp-$08] &lt;--d *eax 看到你输入的名字

|
004078BC  E827670500            call    0045DFE8
004078C1  8BF0                  mov    esi, eax
004078C3  83FE32                cmp    esi, +$32
004078C6  7E04                  jle    004078CC
004078C8  B232                  mov    dl, $32
004078CA  EB02                  jmp    004078CE
004078CC  8BD6                  mov    edx, esi
004078CE  889528FFFFFF          mov    [ebp+$FFFFFF28], dl
004078D4  33C0                  xor    eax, eax
004078D6  8A8528FFFFFF          mov    al, byte ptr [ebp+$FFFFFF28]
004078DC  50                    push    eax
004078DD  837DF800              cmp    dword ptr [ebp-$08], +$00
004078E1  7405                  jz      004078E8
004078E3  8B4DF8                mov    ecx, [ebp-$08]
004078E6  EB05                  jmp    004078ED
004078E8  B9C8AF4600            mov    ecx, $0046AFC8
004078ED  51                    push    ecx
004078EE  8D8529FFFFFF          lea    eax, [ebp+$FFFFFF29]
004078F4  50                    push    eax

* Reference to: _strncpy()
|
004078F5  E86C1C0600            call    00469566
004078FA  83C40C                add    esp, +$0C
004078FD  FF4DD4                dec    dword ptr [ebp-$2C]
00407900  8D45F8                lea    eax, [ebp-$08]
00407903  BA02000000            mov    edx, $00000002

|
00407908  E8DF650500            call    0045DEEC
0040790D  8D9528FFFFFF          lea    edx, [ebp+$FFFFFF28]
00407913  8D855CFFFFFF          lea    eax, [ebp+$FFFFFF5C]

|
00407919  E8C2B9FFFF            call    004032E0
0040791E  66C745C82C00          mov    word ptr [ebp-$38], $002C
00407924  33C9                  xor    ecx, ecx
00407926  894DF4                mov    [ebp-$0C], ecx
00407929  8D55F4                lea    edx, [ebp-$0C]
0040792C  FF45D4                inc    dword ptr [ebp-$2C]
0040792F  8B45B4                mov    eax, [ebp-$4C]

* Reference to control btnDel : TResButton
|
00407932  8B80EC010000          mov    eax, [eax+$01EC]

* Reference to: controls.TControl.GetText(TControl):System.String;
|
00407938  E88B0B0300            call    004384C8
0040793D  8D45F4                lea    eax, [ebp-$0C] &lt;--d *eax 看到你输入的密码

|
00407940  E8A3660500            call    0045DFE8
</code></pre></div><p>为了更快的找到关键比对核心，可以下<code>bpr</code>,或者，<code>bpm</code>等断点。当你看到这段代码：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0167:0040CA38  PUSH    EBP
0167:0040CA39  MOV      EBP,ESP
0167:0040CA3B  ADD      ESP,BYTE -1C
0167:0040CA3E  MOV      [EBP-0C],ECX
0167:0040CA41  MOV      [EBP-08],EDX
0167:0040CA44  MOV      [EBP-04],EAX
0167:0040CA47  MOV      BYTE [EBP-16],00
0167:0040CA4B  LEA      EAX,[EBP-16]
0167:0040CA4E  MOV      EDX,0040CB90
0167:0040CA53  MOV      CL,09
0167:0040CA55  CALL    0045B014
0167:0040CA5A  LEA      EAX,[EBP-1C]
0167:0040CA5D  MOV      EDX,[EBP-08]
0167:0040CA60  SHR      EDX,1C
0167:0040CA63  AND      EDX,BYTE +0F
0167:0040CA66  MOV      DL,[EDX+0046EE4C]
0167:0040CA6C  MOV      [EAX+01],DL
0167:0040CA6F  MOV      BYTE [EAX],01
0167:0040CA72  LEA      EDX,[EBP-1C]
0167:0040CA75  LEA      EAX,[EBP-16]
0167:0040CA78  MOV      CL,09
0167:0040CA7A  CALL    0045B014
0167:0040CA7F  LEA      EAX,[EBP-1C]
0167:0040CA82  MOV      EDX,[EBP-08]
0167:0040CA85  SHR      EDX,18
0167:0040CA88  AND      EDX,BYTE +0F
0167:0040CA8B  MOV      DL,[EDX+0046EE4C]
0167:0040CA91  MOV      [EAX+01],DL
0167:0040CA94  MOV      BYTE [EAX],01
0167:0040CA97  LEA      EDX,[EBP-1C]
0167:0040CA9A  LEA      EAX,[EBP-16]
0167:0040CA9D  MOV      CL,09
0167:0040CA9F  CALL    0045B014
0167:0040CAA4  LEA      EAX,[EBP-1C]
0167:0040CAA7  MOV      EDX,[EBP-08]
0167:0040CAAA  SHR      EDX,14
0167:0040CAAD  AND      EDX,BYTE +0F
0167:0040CAB0  MOV      DL,[EDX+0046EE4C]
0167:0040CAB6  MOV      [EAX+01],DL
0167:0040CAB9  MOV      BYTE [EAX],01
0167:0040CABC  LEA      EDX,[EBP-1C]
0167:0040CABF  LEA      EAX,[EBP-16]
0167:0040CAC2  MOV      CL,09
0167:0040CAC4  CALL    0045B014
0167:0040CAC9  LEA      EAX,[EBP-1C]
0167:0040CACC  MOV      EDX,[EBP-08]
0167:0040CACF  SHR      EDX,10
0167:0040CAD2  AND      EDX,BYTE +0F
0167:0040CAD5  MOV      DL,[EDX+0046EE4C]
0167:0040CADB  MOV      [EAX+01],DL
0167:0040CADE  MOV      BYTE [EAX],01
0167:0040CAE1  LEA      EDX,[EBP-1C]
0167:0040CAE4  LEA      EAX,[EBP-16]
0167:0040CAE7  MOV      CL,09
0167:0040CAE9  CALL    0045B014
0167:0040CAEE  LEA      EAX,[EBP-1C]
0167:0040CAF1  MOV      EDX,[EBP-08]
0167:0040CAF4  SHR      EDX,0C
0167:0040CAF7  AND      EDX,BYTE +0F
0167:0040CAFA  MOV      DL,[EDX+0046EE4C]
0167:0040CB00  MOV      [EAX+01],DL
0167:0040CB03  MOV      BYTE [EAX],01
0167:0040CB06  LEA      EDX,[EBP-1C]
0167:0040CB09  LEA      EAX,[EBP-16]
0167:0040CB0C  MOV      CL,09
0167:0040CB0E  CALL    0045B014
0167:0040CB13  LEA      EAX,[EBP-1C]
0167:0040CB16  MOV      EDX,[EBP-08]
0167:0040CB19  SHR      EDX,08
0167:0040CB1C  AND      EDX,BYTE +0F
0167:0040CB1F  MOV      DL,[EDX+0046EE4C]
0167:0040CB25  MOV      [EAX+01],DL
0167:0040CB28  MOV      BYTE [EAX],01
0167:0040CB2B  LEA      EDX,[EBP-1C]
0167:0040CB2E  LEA      EAX,[EBP-16]
0167:0040CB31  MOV      CL,09
0167:0040CB33  CALL    0045B014
0167:0040CB38  LEA      EAX,[EBP-1C]
0167:0040CB3B  MOV      EDX,[EBP-08]
0167:0040CB3E  SHR      EDX,04
0167:0040CB41  AND      EDX,BYTE +0F
0167:0040CB44  MOV      DL,[EDX+0046EE4C]
0167:0040CB4A  MOV      [EAX+01],DL
0167:0040CB4D  MOV      BYTE [EAX],01
0167:0040CB50  LEA      EDX,[EBP-1C]
0167:0040CB53  LEA      EAX,[EBP-16]
0167:0040CB56  MOV      CL,09
0167:0040CB58  CALL    0045B014
0167:0040CB5D  LEA      EAX,[EBP-1C]
0167:0040CB60  MOV      EDX,[EBP-08]
0167:0040CB63  AND      EDX,BYTE +0F
0167:0040CB66  MOV      DL,[EDX+0046EE4C]
0167:0040CB6C  MOV      [EAX+01],DL
0167:0040CB6F  MOV      BYTE [EAX],01
0167:0040CB72  LEA      EDX,[EBP-1C]
0167:0040CB75  LEA      EAX,[EBP-16]
0167:0040CB78  MOV      CL,09
0167:0040CB7A  CALL    0045B014
0167:0040CB7F  MOV      EAX,[EBP-0C]
0167:0040CB82  LEA      EDX,[EBP-16]
0167:0040CB85  MOV      CL,09
0167:0040CB87  CALL    0045B060
0167:0040CB8C  MOV      ESP,EBP
0167:0040CB8E  POP      EBP
0167:0040CB8F  RET
</code></pre></div><p>其实就是把一个4字节的十六进制数转换为字符串。比如它第一次是把一个<code>0x426B2FA9</code>转换为<code>$426B2FA9</code></p><p>第二次把<code>0x6FB73A24</code>转换为<code>$6FB73A24</code>.</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>-----------------------------------------
0167:0040CBBF  MOV      AL,[EBP-4D]
0167:0040CBC2  INC      EAX
0167:0040CBC3  CMP      EAX,BYTE +32
0167:0040CBC6  JG      0040CBDC
0167:0040CBC8  MOV      [EBP-10],EAX
0167:0040CBCB  MOV      EAX,[EBP-10]
0167:0040CBCE  MOV      BYTE [EBP+EAX-4D],2A
0167:0040CBD3  INC      DWORD [EBP-10]
0167:0040CBD6  CMP      DWORD [EBP-10],BYTE +33
0167:0040CBDA  JNZ      0040CBCB
0167:0040CBDC  LEA      EAX,[EBP+FFFFFF6C]
0167:0040CBE2  MOV      [EBP-0C],EAX
0167:0040CBE5  LEA      ECX,[EBP+FFFFFF60]
0167:0040CBEB  MOV      EAX,[EBP-04]
0167:0040CBEE  MOV      EDX,[EAX+0224]
0167:0040CBF4  MOV      EAX,[EBP-04]
0167:0040CBF7  CALL    0040CA38
</code></pre></div><p>这段代码就是把name不足50个字符的地方全部用&#39;*&#39;添满。然后再把上面的两个字符串加到你的名字像下面那样</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    $426B2FA9\x07CoolBob*******************************************    $6FB73A24

|－－－－－－－－－－－－－－－－－－一共71个字符－－－－－－－－－－－－－－－－－－|
</code></pre></div><p>下面就要小心跟踪了，来到这里：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0167:0040C9E3  MOV      [EBP-08],EDX
0167:0040C9E6  MOV      [EBP-04],EAX
0167:0040C9E9  MOV      BYTE [EBP-15],00
0167:0040C9ED  MOV      EAX,[EBP-08]    &lt;---EAX初始化为0xABCDEF
0167:0040C9F0  SHR      EAX,08
0167:0040C9F3  AND      EAX,00FFFFFF
0167:0040C9F8  MOV      [EBP-10],EAX
0167:0040C9FB  XOR      EAX,EAX
0167:0040C9FD  MOV      AL,[EBP-15]
0167:0040CA00  MOVZX    EAX,BYTE [EBP+EAX-5C] &lt;---这里也就是刚才那个71个字符了
0167:0040CA05  XOR      EAX,[EBP-08]
0167:0040CA08  AND      EAX,FF
0167:0040CA0D  MOV      EAX,[EAX*4+0046EA44]  &lt;----在TRW2000下把这段数据用                                                  &lt;----w 46EA44 fe*4+46EA44 c:\\data.bin抓下来
                          &lt;----后面作注册机少不了这个。
0167:0040CA14  MOV      [EBP-14],EAX
0167:0040CA17  MOV      EAX,[EBP-10]
0167:0040CA1A  XOR      EAX,[EBP-14]
0167:0040CA1D  MOV      [EBP-08],EAX
0167:0040CA20  INC      BYTE [EBP-15]
0167:0040CA23  CMP      BYTE [EBP-15],47
0167:0040CA27  JNZ      0040C9ED          &lt;----循环0x47次，也就是71次
</code></pre></div><p>这里算出来的EAX就是注册码的原型了，只是要把EAX包含的十六进制数转换为字符串输出即可！</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>－－－－－－－－－－－－－－－－－－－－－－－－－－－－
0167:0040CE14  MOV      CL,[EAX+0375]
0167:0040CE1A  LEA      EDX,[EBP-42]
0167:0040CE1D  MOV      EAX,[EBP-04]
0167:0040CE20  CALL    0040CB94
0167:0040CE25  LEA      EAX,[EBP-50]     &lt;-----d EAX (real code)
0167:0040CE28  LEA      EDX,[EBP-0E]    &lt;-----d edx (our  code)
0167:0040CE2B  XOR      ECX,ECX
0167:0040CE2D  MOV      CL,[EAX]
0167:0040CE2F  INC      ECX
0167:0040CE30  CALL    0045B114    &lt;-----比较是否相等
0167:0040CE35  SETZ    [EBP-0F]    &lt;-----相等的话置注册成功标志1到[EBP-0F]
0167:0040CE39  CMP      BYTE [EBP-0F],00
0167:0040CE3D  JNZ      0040CE85    &lt;-----if jump good boy:)
0167:0040CE3F  MOV      EAX,[EBP-04]
0167:0040CE42  MOV      BYTE [EAX+0375],01
0167:0040CE49  LEA      EAX,[EBP-50]
0167:0040CE4C  PUSH    EAX
0167:0040CE4D  MOV      EAX,[EBP-04]
0167:0040CE50  MOV      CL,[EAX+0375]
0167:0040CE56  LEA      EDX,[EBP-42]
0167:0040CE59  MOV      EAX,[EBP-04]
0167:0040CE5C  CALL    0040CB94
0167:0040CE61  LEA      EAX,[EBP-50]
0167:0040CE64  LEA      EDX,[EBP-0E]
0167:0040CE67  XOR      ECX,ECX
0167:0040CE69  MOV      CL,[EAX]
0167:0040CE6B  INC      ECX
0167:0040CE6C  CALL    0045B114
0167:0040CE71  SETZ    [EBP-0F]
0167:0040CE75  CMP      BYTE [EBP-0F],01
0167:0040CE79  JNZ      0040CE85
0167:0040CE7B  MOV      EAX,[EBP-04]
0167:0040CE7E  MOV      BYTE [EAX+0375],01
0167:0040CE85  MOV      AL,[EBP-0F]
0167:0040CE88  POP      EDI
0167:0040CE89  POP      ESI
0167:0040CE8A  MOV      ESP,EBP
0167:0040CE8C  POP      EBP
0167:0040CE8D  RET
</code></pre></div><p>该程序注册正确后，会在其目录下生成一个叫iTime.key的文件。</p><p>3、在作注册机前的准备：</p><p>我们要对那个TRW2000抓下来的data.bin进行一番处理。可以编个小程序来处理：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token comment">//------------------------------------Start here--------------------------------------</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
FILE <span class="token operator">*</span>fp1<span class="token punctuation">,</span><span class="token operator">*</span>fp2<span class="token punctuation">;</span>
<span class="token keyword">unsigned</span> <span class="token keyword">long</span> buffer<span class="token punctuation">[</span><span class="token number">0xfe</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i<span class="token punctuation">;</span>
<span class="token function">clrscr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fp<span class="token operator">=</span><span class="token function">fopen</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\data.bin&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;rb+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fp2<span class="token operator">=</span><span class="token function">fopen</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\x.bin&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;w+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">0xfe</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token function">fread</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span>fp1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;0x%lX,&quot;</span><span class="token punctuation">,</span>buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">fprintf</span><span class="token punctuation">(</span>fp2<span class="token punctuation">,</span><span class="token string">&quot;0x%lX,&quot;</span><span class="token punctuation">,</span>buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">%</span><span class="token number">6</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token function">fprintf</span><span class="token punctuation">(</span>fp2<span class="token punctuation">,</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//------------------------------------Cut here----------------------------------------</span>
</code></pre></div><p>上面这个程序就是把data.bin里面的二进制数据转换成4字节的长整数。</p><p>4、注册机</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token comment">//－－－－－－－－－－－－－－－－－－－start here－－－－－－－－－－－－－－－－－－</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">char</span> string1<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">0x9</span><span class="token punctuation">,</span><span class="token number">0x24</span><span class="token punctuation">,</span><span class="token number">0x34</span><span class="token punctuation">,</span><span class="token number">0x32</span><span class="token punctuation">,</span><span class="token number">0x36</span><span class="token punctuation">,</span><span class="token number">0x42</span><span class="token punctuation">,</span><span class="token number">0x32</span><span class="token punctuation">,</span><span class="token number">0x46</span><span class="token punctuation">,</span><span class="token number">0x41</span><span class="token punctuation">,</span><span class="token number">0x39</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> string2<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">0x9</span><span class="token punctuation">,</span><span class="token number">0x24</span><span class="token punctuation">,</span><span class="token number">0x36</span><span class="token punctuation">,</span><span class="token number">0x46</span><span class="token punctuation">,</span><span class="token number">0x42</span><span class="token punctuation">,</span><span class="token number">0x37</span><span class="token punctuation">,</span><span class="token number">0x33</span><span class="token punctuation">,</span><span class="token number">0x41</span><span class="token punctuation">,</span><span class="token number">0x32</span><span class="token punctuation">,</span><span class="token number">0x34</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> name<span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> code<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> sns<span class="token punctuation">[</span><span class="token number">71</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">unsigned</span> <span class="token keyword">long</span> data<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">0x0</span><span class="token punctuation">,</span>
<span class="token number">0x77073096</span><span class="token punctuation">,</span><span class="token number">0xEE0E612C</span><span class="token punctuation">,</span><span class="token number">0x990951BA</span><span class="token punctuation">,</span><span class="token number">0x76DC419</span><span class="token punctuation">,</span><span class="token number">0x706AF48F</span><span class="token punctuation">,</span><span class="token number">0xE963A535</span><span class="token punctuation">,</span>
<span class="token number">0x9E6495A3</span><span class="token punctuation">,</span><span class="token number">0xEDB8832</span><span class="token punctuation">,</span><span class="token number">0x79DCB8A4</span><span class="token punctuation">,</span><span class="token number">0xE0D5E91E</span><span class="token punctuation">,</span><span class="token number">0x97D2D988</span><span class="token punctuation">,</span><span class="token number">0x9B64C2B</span><span class="token punctuation">,</span>
<span class="token number">0x7EB17CBD</span><span class="token punctuation">,</span><span class="token number">0xE7B82D07</span><span class="token punctuation">,</span><span class="token number">0x90BF1D91</span><span class="token punctuation">,</span><span class="token number">0x1DB71064</span><span class="token punctuation">,</span><span class="token number">0x6AB020F2</span><span class="token punctuation">,</span><span class="token number">0xF3B97148</span><span class="token punctuation">,</span>
<span class="token number">0x84BE41DE</span><span class="token punctuation">,</span><span class="token number">0x1ADAD47D</span><span class="token punctuation">,</span><span class="token number">0x6DDDE4EB</span><span class="token punctuation">,</span><span class="token number">0xF4D4B551</span><span class="token punctuation">,</span><span class="token number">0x83D385C7</span><span class="token punctuation">,</span><span class="token number">0x136C9856</span><span class="token punctuation">,</span>
<span class="token number">0x646BA8C0</span><span class="token punctuation">,</span><span class="token number">0xFD62F97A</span><span class="token punctuation">,</span><span class="token number">0x8A65C9EC</span><span class="token punctuation">,</span><span class="token number">0x14015C4F</span><span class="token punctuation">,</span><span class="token number">0x63066CD9</span><span class="token punctuation">,</span><span class="token number">0xFA0F3D63</span><span class="token punctuation">,</span>
<span class="token number">0x8D080DF5</span><span class="token punctuation">,</span><span class="token number">0x3B6E20C8</span><span class="token punctuation">,</span><span class="token number">0x4C69105E</span><span class="token punctuation">,</span><span class="token number">0xD56041E4</span><span class="token punctuation">,</span><span class="token number">0xA2677172</span><span class="token punctuation">,</span><span class="token number">0x3C03E4D1</span><span class="token punctuation">,</span>
<span class="token number">0x4B04D447</span><span class="token punctuation">,</span><span class="token number">0xD20D85FD</span><span class="token punctuation">,</span><span class="token number">0xA50AB56B</span><span class="token punctuation">,</span><span class="token number">0x35B5A8FA</span><span class="token punctuation">,</span><span class="token number">0x42B2986C</span><span class="token punctuation">,</span><span class="token number">0xDBBBC9D6</span><span class="token punctuation">,</span>
<span class="token number">0xACBCF940</span><span class="token punctuation">,</span><span class="token number">0x32D86CE3</span><span class="token punctuation">,</span><span class="token number">0x45DF5C75</span><span class="token punctuation">,</span><span class="token number">0xDCD60DCF</span><span class="token punctuation">,</span><span class="token number">0xABD13D59</span><span class="token punctuation">,</span><span class="token number">0x26D930AC</span><span class="token punctuation">,</span>
<span class="token number">0x51DE003A</span><span class="token punctuation">,</span><span class="token number">0xC8D75180</span><span class="token punctuation">,</span><span class="token number">0xBFD06116</span><span class="token punctuation">,</span><span class="token number">0x21B4F4B5</span><span class="token punctuation">,</span><span class="token number">0x56B3C423</span><span class="token punctuation">,</span><span class="token number">0xCFBA9599</span><span class="token punctuation">,</span>
<span class="token number">0xB8BDA50F</span><span class="token punctuation">,</span><span class="token number">0x2802B89E</span><span class="token punctuation">,</span><span class="token number">0x5F058808</span><span class="token punctuation">,</span><span class="token number">0xC60CD9B2</span><span class="token punctuation">,</span><span class="token number">0xB10BE924</span><span class="token punctuation">,</span><span class="token number">0x2F6F7C87</span><span class="token punctuation">,</span>
<span class="token number">0x58684C11</span><span class="token punctuation">,</span><span class="token number">0xC1611DAB</span><span class="token punctuation">,</span><span class="token number">0xB6662D3D</span><span class="token punctuation">,</span><span class="token number">0x76DC4190</span><span class="token punctuation">,</span><span class="token number">0x1DB7106</span><span class="token punctuation">,</span><span class="token number">0x98D220BC</span><span class="token punctuation">,</span>
<span class="token number">0xEFD5102A</span><span class="token punctuation">,</span><span class="token number">0x71B18589</span><span class="token punctuation">,</span><span class="token number">0x6B6B51F</span><span class="token punctuation">,</span><span class="token number">0x9FBFE4A5</span><span class="token punctuation">,</span><span class="token number">0xE8B8D433</span><span class="token punctuation">,</span><span class="token number">0x7807C9A2</span><span class="token punctuation">,</span>
<span class="token number">0xF00F934</span><span class="token punctuation">,</span><span class="token number">0x9609A88E</span><span class="token punctuation">,</span><span class="token number">0xE10E9818</span><span class="token punctuation">,</span><span class="token number">0x7F6A0DBB</span><span class="token punctuation">,</span><span class="token number">0x86D3D2D</span><span class="token punctuation">,</span><span class="token number">0x91646C97</span><span class="token punctuation">,</span>
<span class="token number">0xE6635C01</span><span class="token punctuation">,</span><span class="token number">0x6B6B51F4</span><span class="token punctuation">,</span><span class="token number">0x1C6C6162</span><span class="token punctuation">,</span><span class="token number">0x856530D8</span><span class="token punctuation">,</span><span class="token number">0xF262004E</span><span class="token punctuation">,</span><span class="token number">0x6C0695ED</span><span class="token punctuation">,</span>
<span class="token number">0x1B01A57B</span><span class="token punctuation">,</span><span class="token number">0x8208F4C1</span><span class="token punctuation">,</span><span class="token number">0xF50FC457</span><span class="token punctuation">,</span><span class="token number">0x65B0D9C6</span><span class="token punctuation">,</span><span class="token number">0x12B7E950</span><span class="token punctuation">,</span><span class="token number">0x8BBEB8EA</span><span class="token punctuation">,</span>
<span class="token number">0xFCB9887C</span><span class="token punctuation">,</span><span class="token number">0x62DD1DDF</span><span class="token punctuation">,</span><span class="token number">0x15DA2D49</span><span class="token punctuation">,</span><span class="token number">0x8CD37CF3</span><span class="token punctuation">,</span><span class="token number">0xFBD44C65</span><span class="token punctuation">,</span><span class="token number">0x4DB26158</span><span class="token punctuation">,</span>
<span class="token number">0x3AB551CE</span><span class="token punctuation">,</span><span class="token number">0xA3BC0074</span><span class="token punctuation">,</span><span class="token number">0xD4BB30E2</span><span class="token punctuation">,</span><span class="token number">0x4ADFA541</span><span class="token punctuation">,</span><span class="token number">0x3DD895D7</span><span class="token punctuation">,</span><span class="token number">0xA4D1C46D</span><span class="token punctuation">,</span>
<span class="token number">0xD3D6F4FB</span><span class="token punctuation">,</span><span class="token number">0x4369E96A</span><span class="token punctuation">,</span><span class="token number">0x346ED9FC</span><span class="token punctuation">,</span><span class="token number">0xAD678846</span><span class="token punctuation">,</span><span class="token number">0xDA60B8D0</span><span class="token punctuation">,</span><span class="token number">0x44042D73</span><span class="token punctuation">,</span>
<span class="token number">0x33031DE5</span><span class="token punctuation">,</span><span class="token number">0xAA0A4C5F</span><span class="token punctuation">,</span><span class="token number">0xDD0D7CC9</span><span class="token punctuation">,</span><span class="token number">0x5005713C</span><span class="token punctuation">,</span><span class="token number">0x270241AA</span><span class="token punctuation">,</span><span class="token number">0xBE0B1010</span><span class="token punctuation">,</span>
<span class="token number">0xC90C2086</span><span class="token punctuation">,</span><span class="token number">0x5768B525</span><span class="token punctuation">,</span><span class="token number">0x206F85B3</span><span class="token punctuation">,</span><span class="token number">0xB966D409</span><span class="token punctuation">,</span><span class="token number">0xCE61E49F</span><span class="token punctuation">,</span><span class="token number">0x5EDEF90E</span><span class="token punctuation">,</span>
<span class="token number">0x29D9C998</span><span class="token punctuation">,</span><span class="token number">0xB0D09822</span><span class="token punctuation">,</span><span class="token number">0xC7D7A8B4</span><span class="token punctuation">,</span><span class="token number">0x59B33D17</span><span class="token punctuation">,</span><span class="token number">0x2EB40D81</span><span class="token punctuation">,</span><span class="token number">0xB7BD5C3B</span><span class="token punctuation">,</span>
<span class="token number">0xC0BA6CAD</span><span class="token punctuation">,</span><span class="token number">0xEDB88320</span><span class="token punctuation">,</span><span class="token number">0x9ABFB3B6</span><span class="token punctuation">,</span><span class="token number">0x3B6E20C</span><span class="token punctuation">,</span><span class="token number">0x74B1D29A</span><span class="token punctuation">,</span><span class="token number">0xEAD54739</span><span class="token punctuation">,</span>
<span class="token number">0x9DD277AF</span><span class="token punctuation">,</span><span class="token number">0x4DB2615</span><span class="token punctuation">,</span><span class="token number">0x73DC1683</span><span class="token punctuation">,</span><span class="token number">0xE3630B12</span><span class="token punctuation">,</span><span class="token number">0x94643B84</span><span class="token punctuation">,</span><span class="token number">0xD6D6A3E</span><span class="token punctuation">,</span>
<span class="token number">0x7A6A5AA8</span><span class="token punctuation">,</span><span class="token number">0xE40ECF0B</span><span class="token punctuation">,</span><span class="token number">0x9309FF9D</span><span class="token punctuation">,</span><span class="token number">0xA00AE27</span><span class="token punctuation">,</span><span class="token number">0x7D079EB1</span><span class="token punctuation">,</span><span class="token number">0xF00F9344</span><span class="token punctuation">,</span>
<span class="token number">0x8708A3D2</span><span class="token punctuation">,</span><span class="token number">0x1E01F268</span><span class="token punctuation">,</span><span class="token number">0x6906C2FE</span><span class="token punctuation">,</span><span class="token number">0xF762575D</span><span class="token punctuation">,</span><span class="token number">0x806567CB</span><span class="token punctuation">,</span><span class="token number">0x196C3671</span><span class="token punctuation">,</span>
<span class="token number">0x6E6B06E7</span><span class="token punctuation">,</span><span class="token number">0xFED41B76</span><span class="token punctuation">,</span><span class="token number">0x89D32BE0</span><span class="token punctuation">,</span><span class="token number">0x10DA7A5A</span><span class="token punctuation">,</span><span class="token number">0x67DD4ACC</span><span class="token punctuation">,</span><span class="token number">0xF9B9DF6F</span><span class="token punctuation">,</span>
<span class="token number">0x8EBEEFF9</span><span class="token punctuation">,</span><span class="token number">0x17B7BE43</span><span class="token punctuation">,</span><span class="token number">0x60B08ED5</span><span class="token punctuation">,</span><span class="token number">0xD6D6A3E8</span><span class="token punctuation">,</span><span class="token number">0xA1D1937E</span><span class="token punctuation">,</span><span class="token number">0x38D8C2C4</span><span class="token punctuation">,</span>
<span class="token number">0x4FDFF252</span><span class="token punctuation">,</span><span class="token number">0xD1BB67F1</span><span class="token punctuation">,</span><span class="token number">0xA6BC5767</span><span class="token punctuation">,</span><span class="token number">0x3FB506DD</span><span class="token punctuation">,</span><span class="token number">0x48B2364B</span><span class="token punctuation">,</span><span class="token number">0xD80D2BDA</span><span class="token punctuation">,</span>
<span class="token number">0xAF0A1B4C</span><span class="token punctuation">,</span><span class="token number">0x36034AF6</span><span class="token punctuation">,</span><span class="token number">0x41047A60</span><span class="token punctuation">,</span><span class="token number">0xDF60EFC3</span><span class="token punctuation">,</span><span class="token number">0xA867DF55</span><span class="token punctuation">,</span><span class="token number">0x316E8EEF</span><span class="token punctuation">,</span>
<span class="token number">0x4669BE79</span><span class="token punctuation">,</span><span class="token number">0xCB61B38C</span><span class="token punctuation">,</span><span class="token number">0xBC66831A</span><span class="token punctuation">,</span><span class="token number">0x256FD2A0</span><span class="token punctuation">,</span><span class="token number">0x5268E236</span><span class="token punctuation">,</span><span class="token number">0xCC0C7795</span><span class="token punctuation">,</span>
<span class="token number">0xBB0B4703</span><span class="token punctuation">,</span><span class="token number">0x220216B9</span><span class="token punctuation">,</span><span class="token number">0x5505262F</span><span class="token punctuation">,</span><span class="token number">0xC5BA3BBE</span><span class="token punctuation">,</span><span class="token number">0xB2BD0B28</span><span class="token punctuation">,</span><span class="token number">0x2BB45A92</span><span class="token punctuation">,</span>
<span class="token number">0x5CB36A04</span><span class="token punctuation">,</span><span class="token number">0xC2D7FFA7</span><span class="token punctuation">,</span><span class="token number">0xB5D0CF31</span><span class="token punctuation">,</span><span class="token number">0x2CD99E8B</span><span class="token punctuation">,</span><span class="token number">0x5BDEAE1D</span><span class="token punctuation">,</span><span class="token number">0x9B64C2B0</span><span class="token punctuation">,</span>
<span class="token number">0xEC63F226</span><span class="token punctuation">,</span><span class="token number">0x756AA39C</span><span class="token punctuation">,</span><span class="token number">0x26D930A</span><span class="token punctuation">,</span><span class="token number">0x9C0906A9</span><span class="token punctuation">,</span><span class="token number">0xEB0E363F</span><span class="token punctuation">,</span><span class="token number">0x72076785</span><span class="token punctuation">,</span>
<span class="token number">0x5005713</span><span class="token punctuation">,</span><span class="token number">0x95BF4A82</span><span class="token punctuation">,</span><span class="token number">0xE2B87A14</span><span class="token punctuation">,</span><span class="token number">0x7BB12BAE</span><span class="token punctuation">,</span><span class="token number">0xCB61B38</span><span class="token punctuation">,</span><span class="token number">0x92D28E9B</span><span class="token punctuation">,</span>
<span class="token number">0xE5D5BE0D</span><span class="token punctuation">,</span><span class="token number">0x7CDCEFB7</span><span class="token punctuation">,</span><span class="token number">0xBDBDF21</span><span class="token punctuation">,</span><span class="token number">0x86D3D2D4</span><span class="token punctuation">,</span><span class="token number">0xF1D4E242</span><span class="token punctuation">,</span><span class="token number">0x68DDB3F8</span><span class="token punctuation">,</span>
<span class="token number">0x1FDA836E</span><span class="token punctuation">,</span><span class="token number">0x81BE16CD</span><span class="token punctuation">,</span><span class="token number">0xF6B9265B</span><span class="token punctuation">,</span><span class="token number">0x6FB077E1</span><span class="token punctuation">,</span><span class="token number">0x18B74777</span><span class="token punctuation">,</span><span class="token number">0x88085AE6</span><span class="token punctuation">,</span>
<span class="token number">0xFF0F6A70</span><span class="token punctuation">,</span><span class="token number">0x66063BCA</span><span class="token punctuation">,</span><span class="token number">0x11010B5C</span><span class="token punctuation">,</span><span class="token number">0x8F659EFF</span><span class="token punctuation">,</span><span class="token number">0xF862AE69</span><span class="token punctuation">,</span><span class="token number">0x616BFFD3</span><span class="token punctuation">,</span>
<span class="token number">0x166CCF45</span><span class="token punctuation">,</span><span class="token number">0xA00AE278</span><span class="token punctuation">,</span><span class="token number">0xD70DD2EE</span><span class="token punctuation">,</span><span class="token number">0x4E048354</span><span class="token punctuation">,</span><span class="token number">0x3903B3C2</span><span class="token punctuation">,</span><span class="token number">0xA7672661</span><span class="token punctuation">,</span>
<span class="token number">0xD06016F7</span><span class="token punctuation">,</span><span class="token number">0x4969474D</span><span class="token punctuation">,</span><span class="token number">0x3E6E77DB</span><span class="token punctuation">,</span><span class="token number">0xAED16A4A</span><span class="token punctuation">,</span><span class="token number">0xD9D65ADC</span><span class="token punctuation">,</span><span class="token number">0x40DF0B66</span><span class="token punctuation">,</span>
<span class="token number">0x37D83BF0</span><span class="token punctuation">,</span><span class="token number">0xA9BCAE53</span><span class="token punctuation">,</span><span class="token number">0xDEBB9EC5</span><span class="token punctuation">,</span><span class="token number">0x47B2CF7F</span><span class="token punctuation">,</span><span class="token number">0x30B5FFE9</span><span class="token punctuation">,</span><span class="token number">0xBDBDF21C</span><span class="token punctuation">,</span>
<span class="token number">0xCABAC28A</span><span class="token punctuation">,</span><span class="token number">0x53B39330</span><span class="token punctuation">,</span><span class="token number">0x24B4A3A6</span><span class="token punctuation">,</span><span class="token number">0xBAD03605</span><span class="token punctuation">,</span><span class="token number">0xCDD70693</span><span class="token punctuation">,</span><span class="token number">0x54DE5729</span><span class="token punctuation">,</span>
<span class="token number">0x23D967BF</span><span class="token punctuation">,</span><span class="token number">0xB3667A2E</span><span class="token punctuation">,</span><span class="token number">0xC4614AB8</span><span class="token punctuation">,</span><span class="token number">0x5D681B02</span><span class="token punctuation">,</span><span class="token number">0x2A6F2B94</span><span class="token punctuation">,</span><span class="token number">0xB40BBE37</span><span class="token punctuation">,</span>
<span class="token number">0xC30C8EA1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> ebp<span class="token operator">=</span><span class="token number">0xABCDEF</span><span class="token punctuation">,</span>eax<span class="token punctuation">;</span>
<span class="token function">clrscr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;iTime (International Version) Keymaker by CoolBob[CCG]\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;written at 2001.4.25\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;name: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">scanf</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>sns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span>string1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
sns<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token function">strlen</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">11</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token function">strlen</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">11</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>sns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span>name<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">strlen</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token function">strlen</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">11</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">61</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> sns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span><span class="token char">&#39;*&#39;</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">61</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">71</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> sns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span>string2<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">61</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">0x47</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
eax<span class="token operator">=</span>ebp<span class="token punctuation">;</span>
eax<span class="token operator">=</span><span class="token punctuation">(</span>eax<span class="token operator">&gt;&gt;</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">0x00FFFFFF</span><span class="token punctuation">;</span>
j<span class="token operator">=</span><span class="token punctuation">(</span>sns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">^</span>ebp<span class="token punctuation">)</span><span class="token operator">&amp;</span><span class="token number">0xFF</span><span class="token punctuation">;</span>
ebp<span class="token operator">=</span>eax<span class="token operator">^</span>data<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;code: %lX\\n\\n&quot;</span><span class="token punctuation">,</span>ebp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hmm,OK,that&#39;s your code!!enjoy yourself! Contact me at CoolBob@21cn.com :-)\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;press any key to exit!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">getch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//－－－－－－－－－－－－－－－－－－－－cut here－－－－－－－－－－－－－－－－－－－－－</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>written by CoolBob[CCG]
2001.4.26
(CIH??)
CopyRight reserved by China Cracker Group
标准的crc32算法 (空)
</code></pre></div>`,26),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","crack25.html.vue"]]);export{i as default};
