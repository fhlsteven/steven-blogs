import{_ as p,o,c as t,a}from"./app-f0851ed3.js";const e={},n=a(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  求助：关于网络文件传输的问题，200分，假设A是一台服务器，位于公网，有固定IP,B、C是两台位于不同局域网的客户端机器 
作　　者：  jhlcss (阿龙)  
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  100
回复次数：  10
发表时间：  2003-09-25 10:23:13
</code></pre></div><p>分别通过代理服务器上internet，当B想通过A将一个文件传给C时，面临着net通讯的问题，请问如何解决，请提供思路。</p><hr><hr><p>回复人： buffaloes(牛野) ( 一级(初级)) 信誉：100 2003-09-25 13:57:00 得分:0</p><blockquote></blockquote><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token function">B</span><span class="token punctuation">(</span>Ftp put<span class="token punctuation">)</span> <span class="token operator">==</span><span class="token operator">&gt;</span>A<span class="token punctuation">;</span>
<span class="token function">C</span><span class="token punctuation">(</span>Ftp get<span class="token punctuation">)</span> <span class="token operator">&lt;=</span><span class="token operator">=</span>A<span class="token punctuation">.</span>
</code></pre></div><p>回复人： snof(雪狼) ( 两星(中级)) 信誉：105 2003-09-25 14:00:00 得分:0</p><blockquote><p>使用remoteing技术，可以实现</p></blockquote><p>回复人： jhlcss(阿龙) ( 一级(初级)) 信誉：100 2003-09-26 08:22:00 得分:0</p><blockquote><p>up一下，对于B和C来说是通过代理服务器获得临时IP的，能不能详细叙述一下，谢谢</p></blockquote><p>回复人： jjcccc() ( 一星(中级)) 信誉：100 2003-09-26 08:41:00 得分:0</p><blockquote><p>如果一定要做个程序实现的话：<br> 做一个服务程序放在A上，B和C都连到A上的服务程序，实现文件传输。就象QQ传送文件一样，不管客户端从哪儿连过来都可以。</p></blockquote><p>回复人： skykevin(蓝屿) ( 三级(初级)) 信誉：100 2003-09-26 08:42:00 得分:0</p><blockquote><p>1）A中存有B和C的标识和动态IP：{b_flag,b_ip},{c_flag,c_ip},其中b_flag和c_flag是固定的，b_ip和c_ip是每次连接动态生成的。<br> 2）B和C每次连接就自动更新A中自己的动态IP信息。B和C中要做一个更新A中信息的小程序。<br> 3）有了前两步，转发数据就比较方便了。B连上A找C的c_ip,即可建立B和C的连接，实现数据传递。同理，C——&gt;B也一样。</p></blockquote><p>回复人： wolve(我是一个中专生) ( 五级(中级)) 信誉：101 2003-09-26 09:27:00 得分:0</p><blockquote><p>问题是实现c,b的直接连接，可以在b,c上设置反向代理就行了。像我现在的ip的动态的，并且我的机子也是通过proxy上网的，我在proxy上设置了反向代理，比如把从外网来的21的端口的数据包都发向内网的192.168.1.15(我的IP)，这样b,c的连接就建立起来了。<br> 由于b的Ip不固定，这时又要b与a可以通信，在b的外网ip改变的时候通知a,这样，c通过a得到b的ip后就可以直接与b通信了。<br> 这个具体和什么语言，平台无关，是一个底层通信的问题。</p></blockquote><p>回复人： realMAX(不让我的眼泪陪我过夜) ( 四级(中级)) 信誉：100 2003-09-26 09:57:00 得分:0</p><blockquote><p>前一段时间这个问题困绕了我好久，现在那么多高手在这里<br> 偶努力学习ing......</p></blockquote><p>回复人： jhlcss(阿龙) ( 一级(初级)) 信誉：100 2003-09-26 15:23:00 得分:0</p><blockquote><p>up</p></blockquote><p>回复人： gggitxai(whd) ( 一级(初级)) 信誉：99 2003-09-28 06:56:00 得分:0</p><blockquote><p>up</p></blockquote><p>回复人： rqxiang(翔子) ( 五级(中级)) 信誉：100 2003-09-28 09:00:00 得分:0</p><blockquote><p>wolve(我是一个中专生) ：分析的好！</p></blockquote>`,26),c=[n];function s(l,u){return o(),t("div",null,c)}const b=p(e,[["render",s],["__file","netcode23.html.vue"]]);export{b as default};