import{_ as e,o as c,c as o,a as t}from"./app-a2b6e588.js";const r={},d=t(`<h1 id="怎样实现多线程分块下载文件" tabindex="-1"><a class="header-anchor" href="#怎样实现多线程分块下载文件" aria-hidden="true">#</a> 怎样实现多线程分块下载文件？</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎样实现多线程分块下载文件？？
作　　者：  libertysigil (自由魔方.NET)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  1
发表时间：  2003-08-08 15:39:38
</code></pre></div><p>关键是怎样实现分块，怎样在本地申请恰当的空间？</p><hr><hr><p>回复人： carper(卡皮) ( 四级(中级)) 信誉：100 2003-09-20 09:58:00 得分:0</p><blockquote><p><code>http://expert.csdn.net/Expert/topic/1809/1809756.xml?temp=.8900263</code><br><br> 断点续传如果你会http 协议就知道了，不会该协议的也做不出合格的下载软件，所以你必须先学http 和ftp 协议，不会这个协议你问这个东西做什么？就好象你不会吃饭问筷子怎么用做什么？<br><br> HTTP 协议有一个头是：<br><br><code>Range: bytes=1031232-</code><br><br> 这就是要服务器从指定偏移地址开始发送数据，比如<br><br><code>c:\\&gt;nc www.csdn.com 80</code><br><br><code>get /myFile.zip</code><br><code>host: www.csdn.com</code><br><code>Accept: */*</code><br><code>User-Agent: Mozilla/4.0 (compatible; MSIE 5.00; Windows NT 5)</code><br><code>Connection: close</code><br><br> 由回显的<br><code>Content-Length: 2062464</code><br> 得到该文件的大小，然后就可以将文件分段下载，在第二线程用：<br><br><code>c:\\&gt;nc www.csdn.com 80</code><br><br><code>get /myFile.zip</code><br><code>host: www.csdn.com</code><br><code>Accept: */*</code><br><code>User-Agent: Mozilla/4.0 (compatible; MSIE 5.00; Windows NT 5)</code><br><code>Range: bytes=1031232-</code><br><code>Connection: close</code><br><br> 其中的range 就是要开始续传的位置<br> 多线程下载就是用了续传的原理，它告诉服务器我上次下一半断线了，现在我要续传某某段，其实是同一个文件，但服务器并不知道而已</p></blockquote>`,7),n=[d];function b(a,s){return c(),o("div",null,n)}const l=e(r,[["render",b],["__file","netinterdu5.html.vue"]]);export{l as default};
