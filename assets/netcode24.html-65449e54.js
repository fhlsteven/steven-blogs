import{_ as e,o as t,c as n,a as c}from"./app-477de5b2.js";const a={},o=c(`<h1 id="如何用c-侦听已经开放的端口" tabindex="-1"><a class="header-anchor" href="#如何用c-侦听已经开放的端口" aria-hidden="true">#</a> 如何用C＃侦听已经开放的端口？？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何用C＃侦听已经开放的端口？？
作　　者：  Firestone2003 ()  
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  1
发表时间：  2003-8-11 21:10:32
</code></pre></div><p>使用Socket.Listen（）不能监测80端口等特定的地址和端口组合，在使用的端口<br> 为什么？？怎么样才能监测？？？</p><hr><hr><p>回复人： qhgary(Shining) ( 二级(初级)) 信誉：99 2003-8-11 22:21:47 得分:20</p><blockquote><p>不能监测是因为已经被占用了，你可以通过netstat看看就知道了，实际上所有的端口如果系统不用，你都是可以用的。但是最好不要用系统默认服务的端口。象你这样80不能用的，多半是开了web服务器，可能你自己都不知道罢了，你打开控制面板，看看你的iis，里面是不是web服务器已经打开了，如果打开了，那你当然不能用了，简单点测试，你在ie中输入<code>http://127.0.0.1</code>看看有没有什么该网站正在建设中的字样，如果有证明已经被系统占用了，只要你停掉服务你就可以用了</p></blockquote><p>该问题已经结贴 ，得分记录： qhgary (20)、</p>`,8),r=[o];function s(d,i){return t(),n("div",null,r)}const l=e(a,[["render",s],["__file","netcode24.html.vue"]]);export{l as default};
