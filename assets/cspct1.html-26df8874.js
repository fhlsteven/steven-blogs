import{_ as n,o as s,c as a,a as p}from"./app-8e5157a8.js";const e={},c=p(`<h1 id="初探c-1" tabindex="-1"><a class="header-anchor" href="#初探c-1" aria-hidden="true">#</a> 初探C#-1</h1><h2 id="_1-绪论" tabindex="-1"><a class="header-anchor" href="#_1-绪论" aria-hidden="true">#</a> 1 绪论</h2><p>c# 是一种简练，时髦（？），面向对象（object oriented），类型可靠（type-safe）的编程语言。它（发音：C sharp）是从c/c++发展而来的（？俺觉得更象是java），和c/c++ 是一个语系。所以，很容易被c/c++的程序员接受。c#的目标是结合Visual Basic的高产和C++质朴的力量。</p><p>c#将会是vs7的一分子。vs7还支持vb,vc和标记语言——VBScript和JScript。所有这些语言都会在Next Generation Windows Services (NWGS) platform 中得到支持（c#就需要一个NWGS SDK包，可以在m$的网站上下载）。有了这个东东（NWGS），c#就不需要自己的类库， 而使用vc或vb这样一些成熟的库。c#也确实没有自己的类库。废话完了</p><p>1。1 一个老土的例子（就不能换换吗？</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/* idontlikeHelloworld.cs : such a out sample :(*/</span> 
<span class="token number">1</span><span class="token punctuation">:</span> <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token number">2</span><span class="token punctuation">:</span> <span class="token keyword">class</span> <span class="token class-name">idontlikeHelloworld</span> 
<span class="token number">3</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> 
<span class="token number">4</span><span class="token punctuation">:</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token number">5</span><span class="token punctuation">:</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i dont like Hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">6</span><span class="token punctuation">:</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">7</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
<span class="token number">8</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
</code></pre></div><p>如果俺要出书的话，会考虑换个好点的例子。 ^&amp;^</p><p>先说说怎样运行。首先，你需要windows2000！（是的，就是它，请各位不要随地丢果皮——整个香蕉丢给俺就可以了。）然后，需要NWGS SDK！（82.4mb，不算很大噢。嘿嘿，好在它没有自己的类库。）安装后，在你的程序所在的目录下键入：</p><p><code>csc idontlikeHelloworld.cs (加上一个回车键）</code></p><p>是不是有点复古的味道？这个操作会在和你的*.cs相同目录下产生一个idontlikeHelloworld.exe文件。双击它，可以看见：</p><p><code>i dont like Hello world</code></p><p>回车就可以结束它，非常简单。不过，也可以这样：把它存成后缀为.c的文件更好（即：idontlikeHelloworld.c）。这样就可以用vc的IDE进行打字，编辑。vc的txt editor是最棒的噢（又要vc，NO!!!）。然后：</p><p><code>csc idontlikeHelloworld.c (加上一个回车键）</code></p><p>最终效果是完全一样的。好，现在分析语法：（c#在语法上完全没有新意）</p><p><code>1: using System;</code></p><p>using 其实是c++的关键字，在c#中的含义也相仿（就是说俺还不敢100%肯定，抱歉）。using 用在另一个关键字namespace之后。还是先看看namespace。</p><p>语法（syntax）：（from MSDN）</p><p>namespace [identifier] { namespace-body }</p><p>俺的理解：</p><p>identifier：在这里就是System（请记住：c#和c/c++一样，是区分大小写的！）。System 必须在使用它的范围内是唯一的。即，不能够有第二个<code>System</code>，但可以有<code>system</code>。而“它的范围”，俺不想详细解说，只有在实践中才可能掌握。而且，初学者根本不必知道！俺也是近来才知道还有个<code>namespace</code>和<code>using</code>。</p><p>在{ namespace-body }中的是真正有用的东东，包括第五行的“Console.WriteLine”的声明和定义（后面还会提到）。System是由NWGS定义的，咱们只需用（using）它即可。至于System在什么文件里定义，咱就不用管了！交给编译器（就是刚才那个“csc.exe”）去寻找。这就代替了c/c++中的“#include”，可以说是近了一步，避免大量烦人的细节。如果你没学过c/c++，就不用理会。namespace 在后面还会谈到。</p><p><code>2: class idontlikeHelloworld</code></p><p><code>class</code>：是c语系中另一个关键字“类”。表示一系列的特性（官方说法：属性）和行为方法，有了它你的程序就可以“另类”，创造与别不同的有你特色的东东噢！在这里，俺就定义了“idontlikeHelloworld”。注意：这也是c#强制的，对于每一个可执行的程序都必须有。你想干的事就可以记录在紧跟着你定义的class后面的一对花括号。注意：“{”和“}”一一对应的，“(”和“)”同样。</p><p><code>4: static void Main() {</code></p><p><code>Main()</code>是本例子第一个动作（行为方法），干的第一件事。它是属于俺定义的idontlikeHelloworld类的方法。并且是c#强制的，是程序的真正开始！在紧跟在它后面的“{}”中的语句顺序，就是程序的运行顺序！本例中只有一行（第六行干嘛用？你可以去掉再编译一次看看），输出一句话。</p><p><code>5: Console.WriteLine(&quot;i dont like Hello world&quot;);</code></p><p>非常奇怪，Console（再次提醒：注意大小写）不是俺定义的，从何而来？它其实是属于System namespace 的一个class。WriteLine()是Console类中的一个方法，用来显示一句话（字符串）。 这里只是用了这个方法的1/18！并且是最简单之一！其他的有机会再说。你也可以用 “Console.WriteLine”在“NGWS SDK Documentaion”中搜索“Console.WriteLine”，记住复选 “仅搜索标题”，它会列出19项。好啦，完了！其实，还有“.”没说呢！呵呵...lei si la!!!!</p><p>语句不通顺，俺会在以后改进（update），敬请原谅！--“请先用叉子喝汤”</p><p>（续前） “.”被称为分隔符（separator），用来连接名字，如上面的“Console.WriteLine”，就把类和它的方法连接。通过这种方式，咱们就可以使用现成方法集合。这里再回顾一下俺的例子，看看namespace和“.”是如何连用的，还有为什么要使用namespace这个关键字。把例子稍微改一下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/* idontlikeHelloworld.cs */</span> 
<span class="token number">1</span><span class="token punctuation">:</span> <span class="token comment">//using System; </span>
<span class="token number">2</span><span class="token punctuation">:</span> <span class="token keyword">class</span> <span class="token class-name">idontlikeHelloworld</span> 
<span class="token number">3</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> 
<span class="token number">4</span><span class="token punctuation">:</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token number">5</span><span class="token punctuation">:</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;i dont like Hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">6</span><span class="token punctuation">:</span> System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">7</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
<span class="token number">8</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
</code></pre></div><p>看见了，当俺注销掉“using System;”后，在第五行和第六行加了“System”。程序的结果不会改变。但是，很明显的这样比较罗嗦，所以引入了“namespace”。其实，class应该可以完成同样的功能。 不过，设计者可能不想让一个关键字涵盖太多的功能。记得在c向c++发展的时候，引入了“class”，而不是扩展“struct”关键字的功能；又比如“=”只用于赋值，“==”只用于判断相等。这是c/c++和c# 在语法上其中一个重要的特点。这样设计的好处很多。有机会再聊噢。</p><p>如果你没学过c/c++，以下的内容可以跳过。c#与c/c++在语法上还是有区别的，比如：</p><ol><li>c#根本没有“::”；“-&gt;”只在程序中很小的片断中。在c#中应采用“.”。</li><li>c#无须先声明定义，再使用。与java相同。</li><li>c#取消了用“#include”导入其他的程序文本文件，而采用象征性的句柄引入他人的代码。这样一来，就排除了编程语言间的障碍，方便地使用其它语言编写的库。如“Console”类可以是c#或者是其他任一种语言编写的。</li></ol><hr><p>作者： 王志清[21847847] 2000-10-13 21:38:30 [回复]</p><blockquote><p>第一个来这里报到听课，呵呵！我够学习认真吧！！！</p><p>可是就不怎么听得懂……</p></blockquote><p>作者： Burn[5151599] 2000-10-14 09:57:19 [回复]<br> （Dinosaur_[17731168]在大作中提到:）</p><blockquote><p>/* 1 绪论 c# 是一种简练，时髦（？），面向对象（object oriented），类型可靠（type-safe）的编程语言。它（发音：C sharp）是从c/c++发展而来的（？俺觉得更象是java），和c/c+ ...</p><p>大侠高见，俺早就听说c#了，可就是不知道他什么样，望大侠继续，俺还想知道更多。 顺便一句，俺好喜欢，把他转贴了，大侠一定不会反对吧。谢谢。</p><p>我是个盖世英雄，有一天我会驾着七彩降云杀入敌营去救我的情人，我猜对了前头也猜对了这结果。（Zzzz....)</p></blockquote><p>作者： Dinosaur_[17731168] 2000-10-15 11:43:21 修改 删除 [回复]<br> （王志清[21847847]在大作中提到:）</p><blockquote><p>第一个来这里报到听课，呵呵！我够学习认真吧！！！</p><p>可是就不怎么听得懂…… 俺早就说过，请大虾指教噢！俺的脸皮贼厚，直说即可！</p><p>俺一定改，还不行吗？ ^-*</p><p>赶紧说啊！俺就快要翻译第二篇了。快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快快！！！！！！！！！好心急！！！！！！！！！！！！！</p><p>再看了一次俺自己的嬉戏，果然语句极为不顺畅！俺真想把它杀掉！请各位先不要转载噢！俺一定改，还不行吗？ ^-*</p></blockquote><p>作者： Dinosaur_[17731168] 2000-10-17 17:11:51 修改 删除 [回复]</p><blockquote><p>（续前） “.”被称为分隔符（separator），用来连接名字，如上面的“Console.WriteLine”，就把类和它的方法连接。通过这种方式，咱们就可以使用现成方法集合。这里再回顾一下俺的例子，看看namespace和“.”是如何连用的，还有为什么要使用namespace这个关键字。把例子稍微改一下:</p><p>/* idontlikeHelloworld.cs */</p><p>1: //using System;</p><p>2: class idontlikeHelloworld</p><p>3: {</p><p>4: static void Main() {</p><p>5: System.Console.WriteLine(&quot;i dont like Hello world&quot;);</p><p>6: System.Console.ReadLine();</p><p>7: }</p><p>8: }</p><p>看见了，当俺注销掉“using System;”后，在第五行和第六行加了“System”。程序的结果不会改变。但是，很明显的这样比较罗嗦，所以引入了“namespace”。其实，class应该可以完成同样的功能。 不过，设计者可能不想让一个关键字涵盖太多的功能。记得在c向c++发展的时候，引入了“class”，而不是扩展“struct”关键字的功能；又比如“=”只用于赋值，“==”只用于判断相等。这是c/c++和c#在语法上其&gt;中一个重要的特点。这样设计的好处很多。有机会再聊噢。</p><p>如果你没学过c/c++，以下的内容可以跳过。c#与c/c++在语法上还是有区别的，比如：</p><ol><li>c#根本没有“::”；“-&gt;”只在程序中很小的片断中。在c#中应采用“.”。</li><li>c#无须先声明定义，再使用。与java相同。</li><li>c#取消了用“#include”导入其他的程序文本文件，而采用象征性的句柄引入他人的代码。这样一来，就排除了编程语言间的障碍，方便地使用其它语言编写的库。如“Console”类可以是c#或者是其他任一种语言编写的。</li></ol></blockquote>`,42),o=[c];function t(l,i){return s(),a("div",null,o)}const k=n(e,[["render",t],["__file","cspct1.html.vue"]]);export{k as default};