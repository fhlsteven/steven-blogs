import{_ as e,o as t,c as a,a as n}from"./app-f0851ed3.js";const x={},c=n(`<h1 id="破解圣经之-滚瓜烂熟篇" tabindex="-1"><a class="header-anchor" href="#破解圣经之-滚瓜烂熟篇" aria-hidden="true">#</a> 破解圣经之------滚瓜烂熟篇</h1><blockquote><p>日期：2003年6月8日 作者：风飘雪 人气： 1756</p></blockquote><p>破解圣经之------滚瓜烂熟篇(背50遍)(高手莫入)</p><p>(1)经典比较组合,常为注册码出现处(by programhunter)</p><p>1</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    mov  eax [      ]  这里可以是地址，也可以是其它寄存器
    mov  edx [      ]  同上  通常这两个地址就储存着重要信息
    call 00??????
    test eax eax
    jz(jnz)
</code></pre></div><p>2</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    mov  eax [      ]  这里可以是地址，也可以是其它寄存器
    mov  edx [      ]  同上  通常这两个地址就储存着重要信息
    call 00??????
    jne(je)
</code></pre></div><p>3</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>  mov eax [  ]
  mov edx [  ]
  cmp eax,edx
  jnz(jz)
</code></pre></div><p>或者</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>begin  mov al [  ]
      mov cl [  ]
      cmp al,cl
      jnz(jz)
      mov al [  +1]
      mov cl [  +1]
      cmp al,cl
      jnz(jz)
      cmp eax ecx (eax为计数器）
      jnl begin
      mov al 01
</code></pre></div><p>4</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    lea edi [    ]
    lea esi [    ]
    repz cmpsd
    jz(jnz)
</code></pre></div><p>5</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    mov  eax [      ]  这里可以是地址，也可以是其它寄存器
    mov  edx [      ]  同上  通常这两个地址就储存着重要信息
    call 00??????
    setz (setnz) al (bl,cl…)
</code></pre></div><p>6</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    mov  eax [      ]  这里可以是地址，也可以是其它寄存器
    mov  edx [      ]  同上  通常这两个地址就储存着重要信息
    call 00??????
    test eax eax
    setz (setnz) bl,cl…
</code></pre></div><p>7</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>    call 00??????  ***
    push eax (ebx,ecx…)
    ……
    ……
    call 00??????
    pop eax (ebx,ecx…)
    test eax eax
    jz(jnz)
</code></pre></div><p>这个形式比较特别，它的关键比较地方不在第二call中，而在第一call中</p><p>(2)注册码按字节依次给出</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:0042A159 0FBE03                  movsx eax, byte ptr [ebx]
:0042A15C 50                      push eax            ^^^^^
:0042A15D E8228C0400              call 00472D84
:0042A162 59                      pop ecx
:0042A163 83F84A                  cmp eax, 0000004A ----&gt;J
:0042A166 7559                    jne 0042A1C1
:0042A168 0FBE5301                movsx edx, byte ptr [ebx+01]
:0042A16C 52                      push edx            ^^^^^^^
:0042A16D E8128C0400              call 00472D84
:0042A172 59                      pop ecx
:0042A173 83F853                  cmp eax, 00000053
                                  ^^^^^^^^^^^^^^^^^----&gt; S
:0042A176 7549                    jne 0042A1C1
:0042A178 0FBE4B02                movsx ecx, byte ptr [ebx+02]
:0042A17C 83F924                  cmp ecx, 00000024    ^^^^^^^
                                  ^^^^^^^^^^^^^^^^^----&gt; $
:0042A17F 7540                    jne 0042A1C1
:0042A181 0FBE4303                movsx eax, byte ptr [ebx+03]
:0042A185 83F832                  cmp eax, 00000032  ^^^^^^^^
                                  ^^^^^^^^^^^^^^^^^----&gt; 2
:0042A188 7537                    jne 0042A1C1
:0042A18A 0FBE5304                movsx edx, byte ptr [ebx+04]
:0042A18E 83FA38                  cmp edx, 00000038  ^^^^^^^^
                                  ^^^^^^^^^^^^^^^^^----&gt; 8
:0042A191 752E                    jne 0042A1C1
:0042A193 0FBE4B05                movsx ecx, byte ptr [ebx+05]
:0042A197 83F939                  cmp ecx, 00000039  ^^^^^^^
                                  ^^^^^^^^^^^^^^^^^----&gt; 9
:0042A19A 7525                    jne 0042A1C1
:0042A19C 0FBE4306                movsx eax, byte ptr [ebx+06]
:0042A1A0 83F832                  cmp eax, 00000032  ^^^^^^^^
                                  ^^^^^^^^^^^^^^^^^----&gt; 2
:0042A1A3 751C                    jne 0042A1C1
:0042A1A5 0FBE5307                movsx edx, byte ptr [ebx+07]
:0042A1A9 83FA31                  cmp edx, 00000031  ^^^^^^^^                                                                                                                                                                                                            
                                  ^^^^^^^^^^^^^^^^^
                                                  -----&gt;1
</code></pre></div><p>(3)比较位数</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>cmp dword ptr[ebp-04],0000000A
jne/jge/jle/je 00xxxx
</code></pre></div><p>或</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>mov eax, dword ptr [ebp-04]
call 00xxxx
cmp eax, 0000000A &lt;----比较注册码是否为10位
jne 00xxxxx  &lt;----不是,错
</code></pre></div><p>(4)VB程序经典比较</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>PUSH      XXX                      //假注册码
PUSH      XXX                      //真注册码
CALL      [MSVBVM60!__vbaStrCmp]
TEST      EAX,EAX
JNZ      00XXXXX
</code></pre></div><p>(5)SmartCheck中,注册码常出现处</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>__vbasrtcmp(String:&quot;zzzzz&quot;,String:&quot;yyyyy&quot;)returns
__vbaStrVarVal(VARIATN:String&quot;a&quot;) returns
__vbaVarTstEq(VARIANT:****, VARIANT:****) returns
</code></pre></div><p>(6)依次取两位比较</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004044D8 8A10    mov dl, byte ptr [eax]
:004044DA 8ACA    mov cl, dl
:004044DC 3A16    cmp dl, byte ptr [esi]
:004044DE 751C    jne 004044FC
:004044E0 84C9    test cl, cl
:004044E2 7414    je 004044F8
:004044E4 8A5001  mov dl, byte ptr [eax+01]
:004044E7 8ACA    mov cl, dl
:004044E9 3A5601  cmp dl, byte ptr [esi+01]
:004044EC 750E    jne 004044FC
:004044EE 83C002  add eax, 00000002 ***
:004044F1 83C602  add esi, 00000002 ***
:004044F4 84C9    test cl, cl
:004044F6 75E0    jne 004044D8
</code></pre></div><p>每次程序依次取两位，放入<code>byte ptr [esi]</code>，<code>byte ptr [esi+1]</code>，与<code>eax</code>, <code>eax+1</code>比较。如此循环</p><p>(7)小写转大写(一时找不到,自己补充)</p><p>(8)大写转小写(一时找不到,自己补充)</p><blockquote><p>（出处：赢政天下收集整理）</p></blockquote>`,37),l=[c];function p(d,s){return t(),a("div",null,l)}const r=e(x,[["render",p],["__file","crack2.html.vue"]]);export{r as default};
