import{_ as e,o as A,c as d,a as n}from"./app-f0851ed3.js";const a={},x=n(`<h1 id="如何计算-批量文件设置器-2-05-的注册码" tabindex="-1"><a class="header-anchor" href="#如何计算-批量文件设置器-2-05-的注册码" aria-hidden="true">#</a> 如何计算 批量文件设置器 2.05 的注册码</h1><blockquote><p>日期：2003年9月24日 作者：小楼 人气： 32</p></blockquote><p>作者主页 <code>http://glowing.yeah.net/</code></p><p>上次得冰毒大侠帮助，破了那个renameman，但有时那个软件会拒绝工作。忍无可忍情况下，我delete it，近日用上了国人的产品 批量文件设置器 2.05。<br> 这个软件是用aspack 1.083压缩的，这次不高兴去用解压加暴力破解的方法，我来试试找出注册码的计算方法。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>随便填入用户名：sunwk
       公司名：sunwk
       注册码：213546
</code></pre></div><p>trw中下命令：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>bpx:hmemcpy
g
</code></pre></div><p>回到目标程序中，按下“现在注册”按钮，见trw跳出。</p><p>bd，中断断点。F12按14下（按15下，注册失败的窗户就跳出来了），改按F10一直走。</p><p>以下为了解说的方便，定义一些缩略语，并都是16进制表示。u1：用户名第一个字母。u2：用户名第二个字母。c1：公司名第一个字母。c2：公司名第二个字母。s指注册码，3位数字为一组，共8组，依次为s1、s2、s3、s4、s5、s6、s7、s8。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004AA386 8B45C0              mov eax, dword ptr [ebp-40]
:004AA389 0FB64001            movzx eax, byte ptr [eax+01] &lt;--eax=c2,ebx=u2.
:004AA38D 03D8                add ebx, eax                &lt;--ebx=c2+u2
:004AA38F 0FB707              movzx eax, word ptr [edi]    &lt;--eax=s1
:004AA392 3BD8                cmp ebx, eax                &lt;--s1=c2+u2 ?
:004AA394 0F8502010000        jne 004AA49C                &lt;--no,then end.
:004AA39A 8D55BC              lea edx, dword ptr [ebp-44]
:004AA39D 8B45FC              mov eax, dword ptr [ebp-04]
:004AA3A0 8B80DC020000        mov eax, dword ptr [eax+000002DC]
:004AA3A6 E86188F8FF          call 00432C0C
:004AA3AB 8B45BC              mov eax, dword ptr [ebp-44]
:004AA3AE 33DB                xor ebx, ebx
:004AA3B0 8A18                mov bl, byte ptr [eax]
:004AA3B2 8D55B8              lea edx, dword ptr [ebp-48]
:004AA3B5 8B45FC              mov eax, dword ptr [ebp-04]
:004AA3B8 8B80E0020000        mov eax, dword ptr [eax+000002E0]
:004AA3BE E84988F8FF          call 00432C0C
:004AA3C3 8B45B8              mov eax, dword ptr [ebp-48]
:004AA3C6 0FB600              movzx eax, byte ptr [eax]    &lt;--eax=c1,ebx=u1
:004AA3C9 03D8                add ebx, eax                &lt;--ebx=c1+u1
:004AA3CB 0FB74702            movzx eax, word ptr [edi+02] &lt;--ebx=s2
:004AA3CF 3BD8                cmp ebx, eax                &lt;--s2=c1+u1 ?
:004AA3D1 0F85C5000000        jne 004AA49C
:004AA3D7 8D55B4              lea edx, dword ptr [ebp-4C]
:004AA3DA 8B45FC              mov eax, dword ptr [ebp-04]
:004AA3DD 8B80DC020000        mov eax, dword ptr [eax+000002DC]
:004AA3E3 E82488F8FF          call 00432C0C
:004AA3E8 8B45B4              mov eax, dword ptr [ebp-4C]
:004AA3EB 33DB                xor ebx, ebx
:004AA3ED 8A18                mov bl, byte ptr [eax]
:004AA3EF 8D55B0              lea edx, dword ptr [ebp-50]
:004AA3F2 8B45FC              mov eax, dword ptr [ebp-04]
:004AA3F5 8B80DC020000        mov eax, dword ptr [eax+000002DC]
:004AA3FB E80C88F8FF          call 00432C0C
:004AA400 8B45B0              mov eax, dword ptr [ebp-50]
:004AA403 0FB64001            movzx eax, byte ptr [eax+01]
:004AA407 03D8                add ebx, eax
:004AA409 0FB74704            movzx eax, word ptr [edi+04]
:004AA40D 3BD8                cmp ebx, eax                &lt;--s3=u1+u2 ?
:004AA40F 0F8587000000        jne 004AA49C
:004AA415 8D55AC              lea edx, dword ptr [ebp-54]
:004AA418 8B45FC              mov eax, dword ptr [ebp-04]
:004AA41B 8B80E0020000        mov eax, dword ptr [eax+000002E0]
:004AA421 E8E687F8FF          call 00432C0C
:004AA426 8B45AC              mov eax, dword ptr [ebp-54]
:004AA429 33DB                xor ebx, ebx
:004AA42B 8A18                mov bl, byte ptr [eax]
:004AA42D 8D55A8              lea edx, dword ptr [ebp-58]
:004AA430 8B45FC              mov eax, dword ptr [ebp-04]
:004AA433 8B80E0020000        mov eax, dword ptr [eax+000002E0]
:004AA439 E8CE87F8FF          call 00432C0C
:004AA43E 8B45A8              mov eax, dword ptr [ebp-58]
:004AA441 0FB64001            movzx eax, byte ptr [eax+01]
:004AA445 03D8                add ebx, eax
:004AA447 0FB74706            movzx eax, word ptr [edi+06]
:004AA44B 3BD8                cmp ebx, eax                  &lt;--s4=c1+c2 ?
:004AA44D 754D                jne 004AA49C
:004AA44F 0FB707              movzx eax, word ptr [edi]
:004AA452 0FB75702            movzx edx, word ptr [edi+02]
:004AA456 03C2                add eax, edx
:004AA458 0FB75704            movzx edx, word ptr [edi+04]
:004AA45C 03C2                add eax, edx
:004AA45E 0FB75706            movzx edx, word ptr [edi+06]
:004AA462 03C2                add eax, edx
:004AA464 0FB75708            movzx edx, word ptr [edi+08]
:004AA468 0FB74F0A            movzx ecx, word ptr [edi+0A]
:004AA46C 03D1                add edx, ecx
:004AA46E 0FB74F0C            movzx ecx, word ptr [edi+0C]
:004AA472 03D1                add edx, ecx
:004AA474 0FB74F0E            movzx ecx, word ptr [edi+0E]
:004AA478 03D1                add edx, ecx
:004AA47A 3BC2                cmp eax, edx  &lt;-- s1+s2+s3+s4 == s5+s6+s7+s8 ?
:004AA47C 751E                jne 004AA49C
:004AA47E 663B7708            cmp si, word ptr [edi+08]
:004AA482 7518                jne 004AA49C &lt;-- 这里好像是比较所有输入的字母或
                                              数字的个数是否等于s5(中文算2个
                                              。我此处的si＝2f)
:004AA484 0FB74708            movzx eax, word ptr [edi+08]
:004AA488 0FB717              movzx edx, word ptr [edi]
:004AA48B 03C2                add eax, edx
:004AA48D 0FB7570A            movzx edx, word ptr [edi+0A]
:004AA491 3BC2                cmp eax, edx                &lt;--s1+s5 =s6 ?
:004AA493 7507                jne 004AA49C
:004AA495 66837F0C64          cmp word ptr [edi+0C], 0064  &lt;--s7=64h ?
:004AA49A 743B                je 004AA4D7                  &lt;--jump，成功！

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:004AA394(C), :004AA3D1(C), :004AA40F(C), :004AA44D(C), :004AA47C(C)
|:004AA482(C), :004AA493(C)
|
:004AA49C 6A10                    push 00000010
:004AA49E 684CA64A00              push 004AA64C
:004AA4A3 6888A64A00              push 004AA688
:004AA4A8 8B45FC                  mov eax, dword ptr [ebp-04]
:004AA4AB E870E9F8FF              call 00438E20
:004AA4B0 50                      push eax
:004AA4B1 E826CFF5FF              call 004073DC
</code></pre></div><p>这样我们就可以推算出注册码的条件了。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>  u1=73h  u2=75h
  c1=73h  c2=75h
  s1  s2  s3  s4  s5  s6  s7  s8

  u2 + c2 = s1  234
  u1 + c1 = s2  230
  u1 + u2 = s3  232
  c1 + c2 = s4  232
  s1 + s2 + s3 + s4 = s5 + s6 + s7 + s8
  s1 + s5 = s6
  s6 = 100
  sum = s5 (当用户名只为一中文字时，sum＝1Ah）47

s1.  234
s2.  230
s3.  232
s4.  232
s5.  047
s6.  281
s7.  100
s8.  500
</code></pre></div><p>这样，我的</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>          用户名：sunwk
          公司名：sunwk
          注册码：234230232232047281100500
</code></pre></div><p>end.</p>`,16),t=[x];function r(o,p){return A(),d("div",null,t)}const c=e(a,[["render",r],["__file","crack21.html.vue"]]);export{c as default};
