import{_ as F,o as E,c as A,a as n}from"./app-f0851ed3.js";const B={},D=n(`<h1 id="mooovie-在线影院-v1-2破解心得" tabindex="-1"><a class="header-anchor" href="#mooovie-在线影院-v1-2破解心得" aria-hidden="true">#</a> Mooovie! 在线影院 v1.2破解心得</h1><blockquote><p>日期：2003年8月13日 作者： 人气： 2994</p></blockquote><h2 id="软件简介" tabindex="-1"><a class="header-anchor" href="#软件简介" aria-hidden="true">#</a> 软件简介</h2><p>Mooovie! 是全球首创的观看在线电影的播放软件。她能直接从因特网播放成百上千部电影。到目前为止，她已经拥有包括动作片、卡通片、喜剧片、戏剧片、恐怖片、爱情片、科幻片、电视连续剧和战争片几个大。</p><p>Mooovie! 免费版可供您免费使用、观看在线电影，但是会在播放器的上方显示一个 234x30 大小的广告条，并且禁止了一些高级功能的使用：Mooovie! 免费版不能切换到全屏幕播放，不能获取电影的源地址。而 Mooovie! 黄金版则不会显示广告，从而节省了 60% 的系统资源，并可以全部使用免费版中所禁止的功能。 ........</p><p>授权方式： 共享</p><p>下载地址：http://www.iredbag.com/cn/mooovie/download.htm</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>破解者：北极熊[DFCG]
破解目的：获得注册码，做出注册机。
破解工具：trw2000
</code></pre></div><p>破解过程：</p><p>1。用FI2.5检查程序的壳，是upx0.89-6-1.21</p><p>2.先熟悉一下程序，调出注册界面，用户名输入jxtour，注册号输入78787878,点注册，让重新启动程序，可以看出要验证注册码。</p><p>3.调出regmon,再次启动在线影院，查出在线影院要调用<code>HKEY_CURRENT_USER\\Software\\iRedBag\\Mooovie!\\1.2\\RegCode</code></p><p>4.CTRL+N调出<code>trw</code>，下断点<code>bpx regqueryvalueexa do &quot;d (esp+14)&quot;</code>启动在线影院中断，按n次F5，当内存数据区显示<code>jxtour</code>时，<code>BC * , PMODULE,</code>继续按F10会来到这里。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0167:004A03A2 E8F972F6FF       CALL     \`USER32!SetWindowPos\`
0167:004A03A7 8B8654030000     MOV      EAX,[ESI+0354]
0167:004A03AD 33D2             XOR      EDX,EDX
0167:004A03AF E8A83BFBFF       CALL     00453F5C
0167:004A03B4 8D4DFC           LEA      ECX,[EBP-04]
0167:004A03B7 BA30084A00       MOV      EDX,004A0830   ASCII &quot;RegName&quot;
0167:004A03BC 8BC3             MOV      EAX,EBX
0167:004A03BE E8A5C9FCFF       CALL     0046CD68
0167:004A03C3 8D4DEC           LEA      ECX,[EBP-14]
0167:004A03C6 BA40084A00       MOV      EDX,004A0840    ASCII &quot;RegCode&quot;
0167:004A03CB 8BC3             MOV      EAX,EBX
0167:004A03CD E896C9FCFF       CALL     0046CD68
0167:004A03D2 8B55EC           MOV      EDX,[EBP-14]
0167:004A03D5 8B45FC           MOV      EAX,[EBP-04]
0167:004A03D8 E86FECFFFF       CALL     0049F04C       关键call，跟进去
0167:004A03DD 84C0             TEST     AL,AL
0167:004A03DF 756D             JNZ      004A044E
0167:004A03E1 C686AC03000000   MOV      BYTE [ESI+03AC],00
0167:004A03E8 C605386F4A0001   MOV      BYTE [004A6F38],01
</code></pre></div><p>好，关键call找到了，我们根进去</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0167:0049F04C 55               PUSH     EBP
0167:0049F04D 8BEC             MOV      EBP,ESP
0167:0049F04F B90D000000       MOV      ECX,0D
0167:0049F054 6A00             PUSH     BYTE +00
0167:0049F056 6A00             PUSH     BYTE +00
0167:0049F058 49               DEC      ECX
0167:0049F059 75F9             JNZ      0049F054
0167:0049F05B 53               PUSH     EBX
0167:0049F05C 8955F8           MOV      [EBP-08],EDX
0167:0049F05F 8945FC           MOV      [EBP-04],EAX
0167:0049F062 8B45FC           MOV      EAX,[EBP-04]
0167:0049F065 E80E5AF6FF       CALL     00404A78
0167:0049F06A 8B45F8           MOV      EAX,[EBP-08]
0167:0049F06D E8065AF6FF       CALL     00404A78
0167:0049F072 33C0             XOR      EAX,EAX
0167:0049F074 55               PUSH     EBP
0167:0049F075 688AF34900       PUSH     DWORD 0049F38A
0167:0049F07A 64FF30           PUSH     DWORD [FS:EAX]
0167:0049F07D 648920           MOV      [FS:EAX],ESP
0167:0049F080 8B45FC           MOV      EAX,[EBP-04]
0167:0049F083 E80858F6FF       CALL     00404890
0167:0049F088 83F803           CMP      EAX,BYTE +03    比较用户名是否小于3
0167:0049F08B 7D07             JNL      0049F094
0167:0049F08D 33DB             XOR      EBX,EBX
0167:0049F08F E9DB020000       JMP      0049F36F
0167:0049F094 8B45F8           MOV      EAX,[EBP-08]
0167:0049F097 E8F457F6FF       CALL     00404890
0167:0049F09C 83F80F           CMP      EAX,BYTE +0F    比较注册码是不是15位
0167:0049F09F 7407             JZ       0049F0A8
0167:0049F0A1 33DB             XOR      EBX,EBX
0167:0049F0A3 E9C7020000       JMP      0049F36F
0167:0049F0A8 8D45E4           LEA      EAX,[EBP-1C]    传送地址参数给eax
0167:0049F0AB 50               PUSH     EAX             保存eax
0167:0049F0AC B905000000       MOV      ECX,05          ecx=$5
0167:0049F0B1 BA01000000       MOV      EDX,01          edx=$1
0167:0049F0B6 8B45F8           MOV      EAX,[EBP-08]    注册码付值给eax
0167:0049F0B9 E82A5AF6FF       CALL     00404AE8        取注册码的前5位到eax
0167:0049F0BE 8B45E4           MOV      EAX,[EBP-1C]
0167:0049F0C1 BAA0F34900       MOV      EDX,0049F3A0     &quot;RBMOV&quot;字符串送edx
0167:0049F0C6 E80959F6FF       CALL     004049D4         比较
0167:0049F0CB 7407             JZ       0049F0D4         前5位注册码不等于&quot;RBMOV&quot;就死
0167:0049F0CD 33DB             XOR      EBX,EBX
0167:0049F0CF E99B020000       JMP      0049F36F
0167:0049F0D4 8D45DC           LEA      EAX,[EBP-24]
0167:0049F0D7 50               PUSH     EAX
0167:0049F0D8 B902000000       MOV      ECX,02           ecx=$2
0167:0049F0DD BA0D000000       MOV      EDX,0D           edx=$D
0167:0049F0E2 8B45F8           MOV      EAX,[EBP-08]   注册码付值给eax
0167:0049F0E5 E8FE59F6FF       CALL     00404AE8       取注册码的13.14位
0167:0049F0EA 8B4DDC           MOV      ECX,[EBP-24]     将取出来的字符串送到ecx
0167:0049F0ED 8D45E0           LEA      EAX,[EBP-20]
0167:0049F0F0 BAB0F34900       MOV      EDX,0049F3B0
0167:0049F0F5 E8E257F6FF       CALL     004048DC        转换成16进制
0167:0049F0FA 8B45E0           MOV      EAX,[EBP-20]
0167:0049F0FD E8529CF6FF       CALL     00408D54
0167:0049F102 8BD8             MOV      EBX,EAX
0167:0049F104 8B45FC           MOV      EAX,[EBP-04]
0167:0049F107 E88457F6FF       CALL     00404890        取得用户名的长度
0167:0049F10C 3BD8             CMP      EBX,EAX       注册码的13.14位必须等于注册名的长度的16进制
0167:0049F10E 7407             JZ       0049F117
0167:0049F110 33DB             XOR      EBX,EBX
0167:0049F112 E958020000       JMP      0049F36F
0167:0049F117 68B0F34900       PUSH     DWORD 0049F3B0
0167:0049F11C 8D45D4           LEA      EAX,[EBP-2C]
0167:0049F11F 50               PUSH     EAX
0167:0049F120 B901000000       MOV      ECX,01
0167:0049F125 BA0A000000       MOV      EDX,0A
0167:0049F12A 8B45F8           MOV      EAX,[EBP-08]
0167:0049F12D E8B659F6FF       CALL     00404AE8      取注册码的第10位
0167:0049F132 FF75D4           PUSH     DWORD [EBP-2C]
0167:0049F135 8D45D0           LEA      EAX,[EBP-30]
0167:0049F138 50               PUSH     EAX
0167:0049F139 B901000000       MOV      ECX,01
0167:0049F13E BA0C000000       MOV      EDX,0C
0167:0049F143 8B45F8           MOV      EAX,[EBP-08]
0167:0049F146 E89D59F6FF       CALL     00404AE8     取注册码的第12位
0167:0049F14B FF75D0           PUSH     DWORD [EBP-30]
0167:0049F14E 8D45D8           LEA      EAX,[EBP-28]
0167:0049F151 BA03000000       MOV      EDX,03
0167:0049F156 E8F557F6FF       CALL     00404950
0167:0049F15B 8B45D8           MOV      EAX,[EBP-28]
0167:0049F15E E8F19BF6FF       CALL     00408D54     两个字符串起来再转换成16进制
0167:0049F163 8BD0             MOV      EDX,EAX
0167:0049F165 8D45F4           LEA      EAX,[EBP-0C]
0167:0049F168 E84B56F6FF       CALL     004047B8
0167:0049F16D 8D45CC           LEA      EAX,[EBP-34]
0167:0049F170 50               PUSH     EAX
0167:0049F171 B901000000       MOV      ECX,01
0167:0049F176 BA01000000       MOV      EDX,01
0167:0049F17B 8B45FC           MOV      EAX,[EBP-04]
0167:0049F17E E86559F6FF       CALL     00404AE8   取用户名的第1位ASCII
0167:0049F183 8B55CC           MOV      EDX,[EBP-34]
0167:0049F186 8B45F4           MOV      EAX,[EBP-0C]
0167:0049F189 E84658F6FF       CALL     004049D4    比较上面得到的16进制值是否和用户名的第1位ASCII相等
0167:0049F18E 740F             JZ       0049F19F
0167:0049F190 33DB             XOR      EBX,EBX
0167:0049F192 8D45F4           LEA      EAX,[EBP-0C]
0167:0049F195 E83E54F6FF       CALL     004045D8
0167:0049F19A E9D0010000       JMP      0049F36F
0167:0049F19F 8D45F4           LEA      EAX,[EBP-0C]
0167:0049F1A2 E83154F6FF       CALL     004045D8
0167:0049F1A7 68B0F34900       PUSH     DWORD 0049F3B0
0167:0049F1AC 8D45C4           LEA      EAX,[EBP-3C]
0167:0049F1AF 50               PUSH     EAX
0167:0049F1B0 B901000000       MOV      ECX,01
0167:0049F1B5 BA08000000       MOV      EDX,08      EDX=&amp;8
0167:0049F1BA 8B45F8           MOV      EAX,[EBP-08]
0167:0049F1BD E82659F6FF       CALL     00404AE8     取注册码第8位
0167:0049F1C2 FF75C4           PUSH     DWORD [EBP-3C]
0167:0049F1C5 8D45C0           LEA      EAX,[EBP-40]
0167:0049F1C8 50               PUSH     EAX
0167:0049F1C9 B901000000       MOV      ECX,01
0167:0049F1CE BA0B000000       MOV      EDX,0B        EDX=$B(11)
0167:0049F1D3 8B45F8           MOV      EAX,[EBP-08]
0167:0049F1D6 E80D59F6FF       CALL     00404AE8      取注册码第11位
0167:0049F1DB FF75C0           PUSH     DWORD [EBP-40]
0167:0049F1DE 8D45C8           LEA      EAX,[EBP-38]
0167:0049F1E1 BA03000000       MOV      EDX,03
0167:0049F1E6 E86557F6FF       CALL     00404950
0167:0049F1EB 8B45C8           MOV      EAX,[EBP-38]
0167:0049F1EE E8619BF6FF       CALL     00408D54   两个字符串起来再转换成16进制
0167:0049F1F3 8BD0             MOV      EDX,EAX
0167:0049F1F5 8D45F0           LEA      EAX,[EBP-10]
0167:0049F1F8 E8BB55F6FF       CALL     004047B8   保存
0167:0049F1FD 8D45B8           LEA      EAX,[EBP-48]
0167:0049F200 50               PUSH     EAX
0167:0049F201 B901000000       MOV      ECX,01
0167:0049F206 BA07000000       MOV      EDX,07     edx=$7
0167:0049F20B 8B45F8           MOV      EAX,[EBP-08]
0167:0049F20E E8D558F6FF       CALL     00404AE8       取注册码的第7位
0167:0049F213 8B45B8           MOV      EAX,[EBP-48]
0167:0049F216 8D55BC           LEA      EDX,[EBP-44]
0167:0049F219 E86697F6FF       CALL     00408984
0167:0049F21E 8B45BC           MOV      EAX,[EBP-44]
0167:0049F221 50               PUSH     EAX
0167:0049F222 8D55B4           LEA      EDX,[EBP-4C]
0167:0049F225 8B45F0           MOV      EAX,[EBP-10]
0167:0049F228 E85797F6FF       CALL     00408984
0167:0049F22D 8B55B4           MOV      EDX,[EBP-4C]
0167:0049F230 58               POP      EAX
0167:0049F231 E89E57F6FF       CALL     004049D4      和用户名到数第二位转成大写比是否相等
0167:0049F236 740F             JZ       0049F247
0167:0049F238 8D45F0           LEA      EAX,[EBP-10]
0167:0049F23B E89853F6FF       CALL     004045D8
0167:0049F240 33DB             XOR      EBX,EBX
0167:0049F242 E928010000       JMP      0049F36F
0167:0049F247 8D45B0           LEA      EAX,[EBP-50]
0167:0049F24A 50               PUSH     EAX
0167:0049F24B 8B45FC           MOV      EAX,[EBP-04]
0167:0049F24E E83D56F6FF       CALL     00404890
0167:0049F253 8BD0             MOV      EDX,EAX
0167:0049F255 4A               DEC      EDX
0167:0049F256 B901000000       MOV      ECX,01
0167:0049F25B 8B45FC           MOV      EAX,[EBP-04]
0167:0049F25E E88558F6FF       CALL     00404AE8    取得用户名到数二位字符ASCII
0167:0049F263 8B55B0           MOV      EDX,[EBP-50]
0167:0049F266 8B45F0           MOV      EAX,[EBP-10]
0167:0049F269 E86657F6FF       CALL     004049D4
0167:0049F26E 740F             JZ       0049F27F
0167:0049F270 8D45F0           LEA      EAX,[EBP-10]
0167:0049F273 E86053F6FF       CALL     004045D8
0167:0049F278 33DB             XOR      EBX,EBX
0167:0049F27A E9F0000000       JMP      0049F36F
0167:0049F27F 8D45E8           LEA      EAX,[EBP-18]
0167:0049F282 8B55F8           MOV      EDX,[EBP-08]
0167:0049F285 0FB6520E         MOVZX    EDX,BYTE [EDX+0E]  注册码的最后一位送edx
0167:0049F289 4A               DEC      EDX
0167:0049F28A E82955F6FF       CALL     004047B8
0167:0049F28F 8D55AC           LEA      EDX,[EBP-54]
0167:0049F292 8B45E8           MOV      EAX,[EBP-18]
0167:0049F295 E8EA96F6FF       CALL     00408984
0167:0049F29A 8B45AC           MOV      EAX,[EBP-54]
0167:0049F29D 50               PUSH     EAX
0167:0049F29E 8D55A8           LEA      EDX,[EBP-58]
0167:0049F2A1 8B45F0           MOV      EAX,[EBP-10]
0167:0049F2A4 E8DB96F6FF       CALL     00408984
0167:0049F2A9 8B55A8           MOV      EDX,[EBP-58]
0167:0049F2AC 58               POP      EAX
0167:0049F2AD E82257F6FF       CALL     004049D4         比较是否相等  
0167:0049F2B2 7417             JZ       0049F2CB
0167:0049F2B4 8D45F0           LEA      EAX,[EBP-10]
0167:0049F2B7 E81C53F6FF       CALL     004045D8
0167:0049F2BC 8D45E8           LEA      EAX,[EBP-18]
0167:0049F2BF E81453F6FF       CALL     004045D8
0167:0049F2C4 33DB             XOR      EBX,EBX
0167:0049F2C6 E9A4000000       JMP      0049F36F
0167:0049F2CB 8D45F0           LEA      EAX,[EBP-10]
0167:0049F2CE E80553F6FF       CALL     004045D8
0167:0049F2D3 8D45E8           LEA      EAX,[EBP-18]
0167:0049F2D6 E8FD52F6FF       CALL     004045D8
0167:0049F2DB 68B0F34900       PUSH     DWORD 0049F3B0
0167:0049F2E0 8D45A0           LEA      EAX,[EBP-60]
0167:0049F2E3 50               PUSH     EAX
0167:0049F2E4 B901000000       MOV      ECX,01
0167:0049F2E9 BA06000000       MOV      EDX,06
0167:0049F2EE 8B45F8           MOV      EAX,[EBP-08]
0167:0049F2F1 E8F257F6FF       CALL     00404AE8   取注册码第6位
0167:0049F2F6 FF75A0           PUSH     DWORD [EBP-60]
0167:0049F2F9 8D459C           LEA      EAX,[EBP-64]
0167:0049F2FC 50               PUSH     EAX
0167:0049F2FD B901000000       MOV      ECX,01
0167:0049F302 BA09000000       MOV      EDX,09
0167:0049F307 8B45F8           MOV      EAX,[EBP-08]
0167:0049F30A E8D957F6FF       CALL     00404AE8    取注册码第9位
0167:0049F30F FF759C           PUSH     DWORD [EBP-64]
0167:0049F312 8D45A4           LEA      EAX,[EBP-5C]  
0167:0049F315 BA03000000       MOV      EDX,03
0167:0049F31A E83156F6FF       CALL     00404950
0167:0049F31F 8B45A4           MOV      EAX,[EBP-5C]   两个字符串起来再转换成16进制
0167:0049F322 E82D9AF6FF       CALL     00408D54
0167:0049F327 8BD0             MOV      EDX,EAX
0167:0049F329 8D45EC           LEA      EAX,[EBP-14]
0167:0049F32C E88754F6FF       CALL     004047B8
0167:0049F331 8D4598           LEA      EAX,[EBP-68]
0167:0049F334 50               PUSH     EAX
0167:0049F335 8B45FC           MOV      EAX,[EBP-04]
0167:0049F338 E85355F6FF       CALL     00404890
0167:0049F33D 8BD0             MOV      EDX,EAX
0167:0049F33F B901000000       MOV      ECX,01
0167:0049F344 8B45FC           MOV      EAX,[EBP-04]
0167:0049F347 E89C57F6FF       CALL     00404AE8    取用户名最后一位
0167:0049F34C 8B5598           MOV      EDX,[EBP-68]
0167:0049F34F 8B45EC           MOV      EAX,[EBP-14]
0167:0049F352 E87D56F6FF       CALL     004049D4   比较用户名最后一个字符的ascii值是否和上面得到的16进制值相等
0167:0049F357 740C             JZ       0049F365
0167:0049F359 8D45EC           LEA      EAX,[EBP-14]
0167:0049F35C E87752F6FF       CALL     004045D8
0167:0049F361 33DB             XOR      EBX,EBX
0167:0049F363 EB0A             JMP      SHORT 0049F36F
0167:0049F365 8D45EC           LEA      EAX,[EBP-14]
0167:0049F368 E86B52F6FF       CALL     004045D8
0167:0049F36D B301             MOV      BL,01
0167:0049F36F 33C0             XOR      EAX,EAX
0167:0049F371 5A               POP      EDX
0167:0049F372 59               POP      ECX
0167:0049F373 59               POP      ECX
0167:0049F374 648910           MOV      [FS:EAX],EDX
0167:0049F377 6891F34900       PUSH     DWORD 0049F391
0167:0049F37C 8D4598           LEA      EAX,[EBP-68]
0167:0049F37F BA1A000000       MOV      EDX,1A
0167:0049F384 E87352F6FF       CALL     004045FC
</code></pre></div><p>5.算法总结</p><p>（1）前五位是固定的,为<code>RBMOV</code><br> （2）第6、第9位组合成用户名最后一个字符的ASCII码<br> （3）第7位是用户名倒数第2个字符转大写!<br> （4）第8位、11位是用户倒数第2个字符的ASCII码<br> （5）第10位、12位是用户名的第1个字符的ASCII码<br> （6）第13、14位是用户名长度（以十六进制表示的）<br> （7）最后一位是用户名倒数第2位字母加1</p>`,19),C=[D];function X(L,P){return E(),A("div",null,C)}const M=F(B,[["render",X],["__file","crack26.html.vue"]]);export{M as default};