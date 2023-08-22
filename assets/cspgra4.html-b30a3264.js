import{_ as o,r as c,o as a,c as s,a as e,b as t,e as n,d as i}from"./app-35fb03de.js";const p={},d={id:"实现interface的方法不能使用static修饰符",tabindex:"-1"},l=e("a",{class:"header-anchor",href:"#实现interface的方法不能使用static修饰符","aria-hidden":"true"},"#",-1),u={href:"https://www.cnblogs.com/dudu/archive/2004/03/24/4025.html",target:"_blank",rel:"noopener noreferrer"},b=i("<p>Posted on 2004-03-24 10:15 dudu 评论(3) 收藏</p><p>今天在写程序时, 在一个方法前加了static, 而这个方法实现了interface中的一个成员。编译时，总是出现“不会实现接口成员”的错误，百思不得其解，后来将static去掉，编译就成功。</p><p>在www.asprelated.com上看到这么一段话：&quot;It is a compile-time error for an explicit interface member implementation to include access modifiers, and it is a compile-time error to include the modifiers abstract, virtual, override, or static.&quot;</p><p>详细内容请看: http://www.asprelated.com/csharp/sharp-13_4.aspx。</p><hr><hr><p>1楼 2004-03-24 10:48 Meyer</p><blockquote><p>你的接口不是使用的显示实现。关于显示实现接口的这一段话应该不足以解释这个编译时错误。<br> 出错原因在于，实现接口方法都应该non-static方法。只有非静态方法才可能具备多态性。你加上了static还怎么实现接口的方法?</p></blockquote><p>2楼 2004-03-24 11:19 dudu</p><blockquote><p>你说的有道理。刚刚弄明白“显示实现接口”是怎么回事?<br> 由此想到, C#中接口为什么不支持static成员, 请看这里的讨论:<br> http://www.dotnet247.com/247reference/msgs/41/207853.aspx</p></blockquote><p>3楼 2004-03-24 11:33 Ninputer</p><blockquote><p>如果你对显式实现感兴趣，可以看看这篇<br> VB关于接口实现的语法比C#更强大<br><br> http://dotnet.blogger.cn/ninputer/archive/2004/03/18/417.aspx</p></blockquote><p>4楼 2008-05-26 01:21 KyLi</p><blockquote><p>类型成员应该是公有的吧<br> 显示接口成员有时公有，有时私有，取决于referrence的方式。<br> 所以不能加modifier<br> 没记错的话，<br> 接口里的成员方法，<br> 在C#里默认的是sealed virtual。<br> 乱弹一下，呵呵，刚刚开始学习.net。</p></blockquote>",14);function h(m,_){const r=c("ExternalLinkIcon");return a(),s("div",null,[e("h1",d,[l,t(),e("a",u,[t("实现Interface的方法不能使用static修饰符"),n(r)])]),b])}const k=o(p,[["render",h],["__file","cspgra4.html.vue"]]);export{k as default};
