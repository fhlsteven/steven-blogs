import{_ as e,o as t,c as s,b as n,d as c}from"./app-f0851ed3.js";const o={},a=n("h1",{id:"侠客系统修改1-21-的破解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#侠客系统修改1-21-的破解","aria-hidden":"true"},"#"),c(" ‘侠客系统修改1.21’的破解")],-1),C=n("blockquote",null,[n("p",null,"日期：2003年9月24日 作者：十三少 人气： 39")],-1),l=n("p",null,"今天终于完成了《侠客系统修改1。21》的破解!这个软件把注册信息写入在当前目录一个名为sysset.cfg的文件中。这个软件的注册检验部分比较有意思，它是把输入的注册码分别作比较，一个不对便GAME OVER了，我费了好长时间才找到的:)。注册码与用户名有关，用户名必须是大于或等于3位，且注册码个数是用户名字符数的2倍。比如用户名为3位，那么它的注册码就有6位。",-1),d=n("div",{class:"language-txt","data-ext":"txt"},[n("pre",{class:"language-txt"},[n("code",null,`*****想知道如何破解的朋友，请注意听下去!
===========步骤与方法：========================
1、用trw载入sysset.exe
  填写注册信息：用户名：123        (3位)
                注册码：787878    (6位)
下断点：
:bpx getwindowtexta
:g

2、按确定，程序被拦，
:bc *            &清除断点
:pmodule        &回到程序领空

3、按F10追，到
0167:00424124    CALL 0042CAE0      &注册比较部分，以后要按F8追入!
0167:00424129    TEST EAX,EAX      &注册标记，很多软件常用的保护手法!
0167:0042412B    JZ NEAR 00424288  &为0，则去死!!
          ...............(略)

4、在CALL 0042CAE0处，按F8追入，按F10继续追，直到如下代码

0167:0042CC4C  CMP [EAX+EDX],BL  &此处分个比较注册码:)，在此处设断!
0167:0042CC4F  JNZ 0042CC8B      &不正确,则去死!，
0167:0042CC51  INC ESI
              ........(略)

5、最为关键的一步，
0167:0042CC4C  CMP [EAX+EDX],BL
:bc *  &清除以前断点，
按F9在此处设断点，
:g

6、程序被拦

0167：00424CC4C  CMP [EAX+EDX],BL  ，记下BL的值，按F10执行一步，到了0167:0042CC4F  JNZ 0042CC8B  !!!此时一定要修改标志(r fl z)，骗过程序,使其继续比较下去，不然注册出错哟:)，如此循环6次，每次观察BL的值，拿笔记下吧，这就是你要的东西!不过你记下的可只是ASCII码，需要转换哟:)，(由于我们的用户名为3位，注册码有6位，所以要记6次)

6次BL的值分别为 64,31,59,65,66,31
转换为字符分别是d  1  Y  e  f  1
整理得注册信息：
Name :  123
RegCode :d1Yef1
****若不想求出注册码，只须将JNZ 0042CC8B  nop掉即可!*****

7、以上完成了《侠客系统修改1。21》的破解，由于本人表达能力水平有限，不知大家能不能看懂，若有错误之处，还望高手指点!
`)])],-1),_=n("p",null,"《以上破解欢迎转载，但不要修改其内容。现在是凌晨2点啦，呜呜，",-1),r=n("p",null,"我还在写破解文章，看来又要少活5年了，唉》",-1),i=[a,C,l,d,_,r];function u(E,h){return t(),s("div",null,i)}const f=e(o,[["render",u],["__file","crack8.html.vue"]]);export{f as default};
