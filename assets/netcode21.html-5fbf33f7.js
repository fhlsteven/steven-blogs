import{_ as e,o,c as t,a as c}from"./app-477de5b2.js";const p={},n=c(`<h1 id="为什么在ntfs分区的系统中不能够新建web应用程序-在fat32下可" tabindex="-1"><a class="header-anchor" href="#为什么在ntfs分区的系统中不能够新建web应用程序-在fat32下可" aria-hidden="true">#</a> 为什么在NTFS分区的系统中不能够新建WEB应用程序？？？在FAT32下可</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  为什么在NTFS分区的系统中不能够新建WEB应用程序？？？在FAT32下可
作　　者：  WantGoWorld (碧海蓝天)  
等　　级：  ^^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  50
回复次数：  6
发表时间：  2003-9-15 20:17:41
</code></pre></div><p>为什么在NTFS分区的系统中不能够新建WEB应用程序？？？提示内容如下：</p><p>无法创建Web项目“WebApplication1”.文件路径&quot;d:\\inetpub\\wwwroot\\WebApplication1&quot;与URL “<code>http://localhost/WebApplication1</code>”不相符。这两者需要映射相同的服务器位置。<br> http错误500:internam server Error</p><hr><hr><p>回复人： freecs(^=^) ( 一星(中级)) 信誉：100 2003-9-15 20:27:48 得分:20</p><blockquote><p>不是分区的问题，我就是NTFS<br> 根据错误提示，是物理路径和虚拟目录路径的对应错误，你检查一下IIS</p></blockquote><p>回复人： qiuji(忆秋季) ( 一星(中级)) 信誉：99 2003-9-15 20:28:00 得分:10</p><blockquote><p>在NTFS分区的系统中是可以创建WEB应用程序的。<br> 你把localhost换成你的IP地址或者你的计算机名试试。</p></blockquote><p>回复人： freecs(^=^) ( 一星(中级)) 信誉：100 2003-9-15 20:29:32 得分:10</p><blockquote><p>把IIS里的默认web站点的 属性 =〉主目录 =〉本地路径 改为:c:\\inetpub\\wwwroot 看看</p></blockquote><p>回复人： WantGoWorld(碧海蓝天) ( 二级(初级)) 信誉：100 2003-9-15 20:34:26 得分:0</p><blockquote><p>不是啊，物理路径和虚拟目录路径是正确的对应的<br> 我的系统装在D盘了，现在问题是为什么不能新建Web项目</p></blockquote><p>回复人： cnhgj(戏子.Com？俺真TMD够菜) ( 两星(中级)) 信誉：100 2003-9-15 20:41:04 得分:10</p><blockquote><p>要赋予权限啊,把everyone的权限开了</p></blockquote><p>回复人： qiuji(忆秋季) ( 一星(中级)) 信誉：99 2003-9-15 20:45:35 得分:0</p><blockquote><p>你把localhost换成你的IP地址或者你的计算机名<br> 试试看！</p></blockquote><p>该问题已经结贴 ，得分记录： freecs (20)、 qiuji (10)、 freecs (10)、 cnhgj (10)、</p>`,19),r=[n];function a(l,s){return o(),t("div",null,r)}const b=e(p,[["render",a],["__file","netcode21.html.vue"]]);export{b as default};
