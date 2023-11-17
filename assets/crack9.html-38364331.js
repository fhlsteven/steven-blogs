import{_ as n,o as a,c as e,a as c}from"./app-d9da1b6d.js";const t={},d=c(`<h1 id="呼吸小秘-javegirl-的破解过程" tabindex="-1"><a class="header-anchor" href="#呼吸小秘-javegirl-的破解过程" aria-hidden="true">#</a> 呼吸小秘（javegirl）的破解过程</h1><blockquote><p>日期：2003年9月24日 作者： 人气： 71</p></blockquote><p>软件介绍：这是一个做主页特效的小软件。软件不注册有功能限制，感觉其注册检测部分同人物生物节律有点相像，不提示出错信息！</p><p>======这个软件用aspack1.06版压过，我用prodump脱的壳！软件将注册信息写入注册表 <code>HKEY_USER/SOFTWARE/BREATHSOFT/注册/javagirl</code>下 ，每次启动时都做比较。注册码与注册名无关，但必须是13位，而且只要前8位是BSJG08SN，后5位就可以任意啦！</p><p>======破解过程：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>1、trw2000载入脱壳后的javagirl.exe

2、填写注册信息，name:yubing
                code:78787878
&amp;我第一次追时按习惯只输入了8位的注册码，后来发现不对，又改为13位，请注意听，我会慢慢地分析:-)

3、下ctrl-d，进入trw，下
:bpx hmemcpy
:g

4、按“注册键”，程序立即被拦，下指令
:bc *
:pmodule

5、按F10，只到如下程式：
0167:0049A329  MOV EAX,[EBP-04] &amp;下　d eax 可看到你输入的注　　　　　　　　　　　　　　　　　　　　    册码78787878
0167:0049A32C  CALL 00403C00
0167:0049A331  CMP  EAX,BYTE+0D    &amp;此时eax中为注册码个数(8个), 是否为13位。
                JNZ  NEAR 0049A4AF  &amp;如果不相等，则出错。
                LEA  EAX,[EBP-04]
                PUSH EAX
            。。。。。。。

0167:0049A36C  MOV  EAX,[EAX+0508]
0167:0049A372  CALL  0043BAA8
0167:0049A377  MOV  EDX,[EBP-08]    &amp;下d edx 可见到注册码　　　　　　　　　　　　　　　　　　　　　　　　BSJG08SN
              POP 　EAX      &amp;下d eax 可见到输入注册码的前8位。
　　　　　　　　CALL　00403D10　&amp;比较注册码的核心哟，f8追入！
　　　　　　　　JNZ  NEAR 0049A4AF  &amp;不相等则出错。
　　　　　　。。。。。。。。

6、看注册码比较的部分call 00403D10
0167:00403D10     PUSH EBX
                  PUSH ESI
                  PUSH EDI
                  MOV ESI,EAX　　　　　　&amp;下 d eax为你输入的注册码　 
                  MOV EDI,EDX            &amp;下 d edx为正确的注册码
                  CMP EAX,EDX            &amp;比较注册码.
0167:00403d19    JZ NEAR 00403DAE      &amp;相等，则跳转哟，一定要跳哟。
      ...................(略)

7、至此程序追踪完成，由于注册码必须是13位，所以我们前8位输入BSJG08SN之后，还必须要任意填5位。
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>cracker：十三少
scyb@sina.com
http://scyb.yeah.net
</code></pre></div>`,7),p=[d];function r(o,A){return a(),e("div",null,p)}const l=n(t,[["render",r],["__file","crack9.html.vue"]]);export{l as default};
