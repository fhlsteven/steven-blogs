import{_ as e,o as a,c as t,a as p}from"./app-a2b6e588.js";const n={},d=p(`<h1 id="一篇破文-update-now-2-0" tabindex="-1"><a class="header-anchor" href="#一篇破文-update-now-2-0" aria-hidden="true">#</a> 一篇破文(Update Now 2.0)</h1><blockquote><p>日期：2003年9月24日 作者：十三少 人气： 133</p></blockquote><p>今天破掉了Update Now2.0(主页上传工具)，这次选了个最简单的name选1。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Name:1
RegisterKey:881cdceed7c4
</code></pre></div><p>这个软件注册检验部分十有趣，注册码根据注册名运算得出，但注册码必须软件是12位，现在好多程序都要求注册码位是固定的哟，😃</p><p>好了，废话少说，程序破解于下，请注意听哟：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>1、用ice载入Update Now2.0
2、输入注册信息
name:1                      &amp;任意输入
register key:123456789012  &amp;任意输入，(此例中便于观察)。
</code></pre></div><p>3、下</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:bpx hmemcpy
:g
回到程序界面时，按“OK”
</code></pre></div><p>4、程序被拦下来，按几下F12回到程序领空，见如下代码：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>XXXX:00407643          push 000003F1
XXXX:00407648          mov ecx, ebx    |
XXXX:0040764A          Call 00416876
XXXX:0040764F          cmp eax, 0000000C  &amp;比较注册是否为12位
XXXX:00407652          jne 00407862      &amp;不是12位，则死!
XXXX:00407658          lea edi, dword ptr [esp+00000124]
XXXX:0040765F          or ecx, FFFFFFFF
XXXX:00407662          xor eax, eax
</code></pre></div><p>程序继续。。。到</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004076E0    mov dl, byte ptr [esp+eax+29]  &amp; d esp+eax+28便可看
:004076E4    mov cl, byte ptr [esp+eax+28]  &amp; 到你输入的注册码：
:004076E8    mov byte ptr [esp+eax+28], dl  &amp; 123456789012
:004076EC    mov byte ptr [esp+eax+29], cl
:004076F0    inc eax
:004076F1    cmp eax, 00000006
:004076F4    jl 004076E0
:004076F6    dec esi
:004076F7    jne 004076DE
:004076F9    lea edi, dword ptr [esp+00000228] &amp;此时下d eax+esp+22
                                                &amp;可以看见你输入的注册码
                                                &amp;被变为712345689012
</code></pre></div><p>以上段代码是你输入注册码的变形，我们此时输入的注册码为123456789012 被变为 712345689012，也就是说将我们输入的注册码的第7位移到了第一位!</p><p>5、程序继续执行，(F10)下面到了如下代码：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>:004077AE  Call dword ptr [004194B4]      &amp;注册码比较核心，F8追入哟!
:004077B4  add esp, 0000000C
:004077B7  test eax, eax                  &amp;检验注册标记
:004077B9  pop ebp
:004077BA  jne 00407838                  &amp;不为0，则死!
:004077BC  mov esi, dword ptr [esp+0C]
:004077C0  push eax
</code></pre></div><p>6、让我们看看注册码比较核心部分的代码：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>XXXX:78010C8E    PUSH EBP
                MOV EBP,ESP
...............................
XXXX:78010CAF  MOV AL,[ESI-01]  &amp;下d esi-01 即可看见e881cdced7c4
XXXX:78010CB2  XOR ECX,ECX      &amp;由你用户名算出来的注册码
    :78010CB4  CMP AL,[EDI-01]  &amp;下d edi-01 即可看见712345689012
    :78010CB7  JA 78010CBD
    :78010CB9  JZ 78010CBF
        ...................(略)
*****
</code></pre></div><p>7、最后整理一下，重新注册，直接输入注册码e881cdced7c4，哇!怎么不对？？？哈哈，由于作者对你输入的注册码做了一个小变化，将第7位调到第1位了，所以我们输入注册码的时候，就要输入e881cdced7c4的第1位调到第7位，应该为881cdceed7c4，于是OK!</p>`,19),c=[d];function s(o,l){return a(),t("div",null,c)}const r=e(n,[["render",s],["__file","crack7.html.vue"]]);export{r as default};
