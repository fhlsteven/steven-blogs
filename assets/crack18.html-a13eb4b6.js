import{_ as t,o as n,c as e,a}from"./app-f0851ed3.js";const r={},F=a(`<h1 id="记事本xp-v2-3破解-我和p-code的第一次" tabindex="-1"><a class="header-anchor" href="#记事本xp-v2-3破解-我和p-code的第一次" aria-hidden="true">#</a> 记事本xp v2.3破解--我和P-code的第一次</h1><blockquote><p>日期：2003年9月12日 作者：<code>newlaos[CCG][DFCG]</code> 人气： 321</p></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>软件名称：记事本xp v2.3
文件大小：475KB
软件授权：共享软件
使用平台：Win9x/Me/NT/2000/XP
发布公司： http://www.yaguo.com/~qswb2002 
软件简介：一个增强型的记事本软件。破它只是因为它是P-code的，想着软件小应该很简单。
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>加密方式：注册码
功能限制：未注册信息提示
PJ工具：WKT-VBDebuger1.4，FI2.5，pe-scan3.31
PJ日期：2003-04-13
作者newlaos申明：只是学习，请不用于商业用途或是将本文方法制作的注册机任意传播，造成后果，本人一概不负。
</code></pre></div><p>1、先用FI2.5看一下主文件“notepad.exe”，加ASPACK2.11壳。手动或是用pe-scan3.31脱壳，很快搞定生成文件unpack.exe</p><p>2、用WKT-VBDebuger1.4对unpack.exe进行跟踪调试，程序载入运行后，点出注册对话框。输入假码: 78787878，先不要按“确定”，返回WKT-VBDebuger1.4，点击“On Execution”或是CTRL+E，下断点40821D，这时再回到unpack.exe，按“确定”，很多被WKT-VBDebuger1.4断下，来到下列代码段：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>.......
.......
004081F0: 4B OnErrorGoto 00408295h
004081F3: 27 LitVar_Missing 0064F5FCh
004081F6: 27 LitVar_Missing 0064F61Ch
004081F9: 27 LitVar_Missing 0064F63Ch
004081FC: 27 LitVar_Missing 0064F65Ch
004081FF: 04 FLdRfVar 0064F6BCh
00408202: 3A LitVarStr &#39;软件注册&#39;
00408207: 4E FStVarCopyObj 0064F67Ch
0040820A: 04 FLdRfVar 0064F67Ch
0040820D: 3A LitVarStr &#39; 要注册本产品，请先告诉作者您的E-Mail及计算机用户名（可通过查看开始菜单上的注销****看到您的用户名），作者会在收到您的注册费后24小时内告诉您注册码，然后您再在以下输入框中输入注册码! &#39;
00408212: 4E FStVarCopyObj 0064F69Ch
00408215: 04 FLdRfVar 0064F69Ch
00408218: 0B ImpAdCallI2 rtcInputBox on address 660E21C1h0　&lt;===程序停在这，等待接收输入的注册码
0040821D: 23 FStStrNoPop 0064F5F8h &lt;===放了一个地址指针(42a5e0)78787878宽字符形式
00408220: 08 FLdPr &lt;===520928
00408223: FD Lead2/MemStStrCopy
00408227: 2F FFree1Str &lt;===42B216&lt;===释放了6处内存空间
0040822A: 36 FFreeVar -&gt; 6
00408239: 04 FLdRfVar 0064F5F6h
0040823C: 08 FLdPr &lt;===520928
0040823F: 06 MemLdRfVar
00408242: 10 ThisVCallHresult 00407AB4-&gt;00407A40 &lt;===关键的CALL，F8跟进(程序段也出来了)
00408247: 6B FLdI2
0040824A: 1C BranchF 00408264 &lt;===如果是F就跳走，如果输入的注册码的中有&quot;雪影无痕&quot;，则这里就不跳了?br&gt; 0040824D: 08 FLdPr
00408250: 8A MemLdStr
00408253: 1B LitStr: &#39;regnumber&#39;
00408256: 1B LitStr: &#39;regist&#39;
00408259: 1B LitStr: &#39;notepad&#39;
0040825C: 0A ImpAdCallFPR4 rtcSaveSetting on address 660F8762h &lt;===这里保存设置的CALL
00408261: 1E Branch 00408295 &lt;===信息保存完后跳走。?br&gt; 00408264: 27 LitVar_Missing 0064F63Ch &lt;===如果注册码就正确则跳到这里，也就是OVER了




------F8跟进来到下面代码段----------------
00407A40: F4 LitI2_Byte: -&gt; 1h 1
00407A42: 08 FLdPr 520928h
00407A45: 06 MemLdRfVar
00407A48: 80 ILdI4 -&gt; 430BACh 4393900 &lt;===(430BAC位置上是宽字符的78787878)
00407A4B: 4A FnLenStr 430BA8h, 8 chars &lt;===检测注册码字符串长度
00407A4C: E4 CI2I4 &lt;===将integer类型转为word？
00407A4D: FE Lead3/ForI2: &lt;===是不是说的循环结构，然后以NextI2结尾的
00407A53: 28 LitVarI2 0064F524h 4h , 4
00407A58: 08 FLdPr 520928h
00407A5B: 89 MemLdI2
00407A5E: E7 CI4UI1 &lt;===这也是数据类型的轮换
00407A5F: 6C ILdRf 0052097Ch &lt;===位置是一个指针，指向430BAC位置上是宽字符的78787878
00407A62: 4D CVarRef:
00407A67: 04 FLdRfVar 0064F514h
00407A6A: 0A ImpAdCallFPR4 rtcMidCharVar on address 660EA557h
00407A6F: 04 FLdRfVar 0064F514h
00407A72: 3A LitVarStr &#39;雪影无痕&#39;
00407A77: 5D HardType &lt;===这是什么硬件类型？在64F504上的值是8008
00407A78: 33 EqVarBool &lt;===要相等？ 就填上&quot;雪影无痕&quot;，进行注册，呵呵通过。再没有未注册提示!
00407A7A: 36 FFreeVar -&gt; 2 &lt;===释放了两个内存位置上的值64F524h和64F514h(分别对应的值是02，08)
00407A81: 1C BranchF 00407AA0 &lt;===这里不相等就意味着一跳走就OVER了?br&gt; 00407A84: F4 LitI2_Byte: -&gt; FFh 255
00407A86: 70 FStI2 0064F55A -&gt;ffffffffh -1 &lt;===在0064F55A位置上放上两个FF
00407A89: F4 LitI2_Byte: -&gt; 0h 0
00407A8B: 21 FLdPrThis 00520928h
00407A8C: 0F VCallAd Frmmain.regist 40EF24h &lt;===这里才是真正的算法CALL？F8跟进
00407A8F: 19 FStAdFunc
00407A92: 08 FLdPr
00407A95: 0D VCallHresult put__ipropVISIBLEMENU &lt;===使注册菜单不可见的CALL，也就是说已经注册
407A9A: 1a FFree1Ad local_00F0
407A9D: 1e Branch: 407aab &lt;===我跳走，就不再循环了
407AA0: 08 FLdPr local_param_0008 &lt;===如果不相等，就从上面跳到这里
407AA3: 06 MemLdRfVar local_param_0058
407AA6: 64 NextI2: (continue) 407A53 &lt;===到这里是一整个循环结构
</code></pre></div><p>3、有点地方，我还不是很明白，还请高手指点!</p>`,8),l=[F];function d(A,o){return n(),e("div",null,l)}const i=t(r,[["render",d],["__file","crack18.html.vue"]]);export{i as default};
