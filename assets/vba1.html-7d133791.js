import{_ as n,o as a,c as s,a as e}from"./app-f0851ed3.js";const o={},t=e(`<h1 id="msoffice开发工具-vba" tabindex="-1"><a class="header-anchor" href="#msoffice开发工具-vba" aria-hidden="true">#</a> MSOffice开发工具--VBA</h1><blockquote><p>2002年12月18日</p></blockquote><h2 id="一、vba的发展过程" tabindex="-1"><a class="header-anchor" href="#一、vba的发展过程" aria-hidden="true">#</a> 一、VBA的发展过程</h2><p>在Office中包含着一种加强Office功能的语言，即为Basic语言。经过发展，在Office97 中，Word、Excel、Access、PowerPoint四个软件都有了自己的程序设计语言，分别称为Microsoft WordVisualBasic、MicrosoftExcelVisualBasic、MicrosoftAccessVisualBasic、Microsoft PowerPointVisualBasic。通常统一称为VBA。在Outlook中的开发语言为VisualBasicScripting Edition，而不是一个完全的VBA。不过，VisualBasicScriptingEdition是VBA的一个较小 的子集，它与VBA兼容。当然，有一些VBA支持的特性,VisualBasicScriptingEdition并不 支持。</p><h2 id="二、vba开发特点" tabindex="-1"><a class="header-anchor" href="#二、vba开发特点" aria-hidden="true">#</a> 二、VBA开发特点</h2><h3 id="_1-microsoftoffice对象模型" tabindex="-1"><a class="header-anchor" href="#_1-microsoftoffice对象模型" aria-hidden="true">#</a> 1.MicrosoftOffice对象模型</h3><p>VisualBasic是一种面向对象的开发语言。VBA 将MicrosoftOffice中的每一个应用程序都看成一个对象。每个应用程序都由各自的Application 对象代表。</p><p>在Word中，Application对象中包容了Word的菜单栏、工具栏、Word命 令等的相应对象，以及文档对象等等。菜单栏对象中包容了所有的菜单及菜单命令。工具栏对 象中包容了各种命令按钮。文档对象中则包容了所有的文字、表格、图像等文档组成部分的相 应对象。文档对象是MicrosoftWordVisualBasic中的主要对象。</p><p>在Excel中， Application对象中包容了Excel的菜单栏、工具栏等的相应对象，以及工作表对象和图表对 象等等。工作表对象和图表对象是MicrosoftExcelVisualBasic中的主要对象。</p><p>在Access 中，Application对象中包容了Access的菜单栏、工具栏等的相应对象，以及报表对象和窗体 对象等等。报表对象和窗体对象是MicrosoftAccessVisualBasic中的主要对象。</p><p>在Power Point中，Application对象中包容了PowerPoint的菜单栏、工具栏等的相应对象，以及演 示文档对象等等。演示文档对象是MicrosoftPowerPointVisualBasic中的主要对象。</p><h3 id="_2-基于对象的开发" tabindex="-1"><a class="header-anchor" href="#_2-基于对象的开发" aria-hidden="true">#</a> 2.基于对象的开发</h3><p>(1)使用MicrosoftOffice对象</p><p>Office已经具有 了强大的功能，Office的对象模型使得可以使用MicrosoftOffice中的对象来完成自己的工 作。程序员可以不必浪费时间开发自己的组件，只需充分地利用Office的功能。Office开发 者可以在Office的基础上进行自己的开发，而不必一切从头开始。例如，Office开发者可以使 用Word的拼写检查器，而不必自己来开发一个拼写检查器。</p><p>(2)用户创建对象</p><p>Office 开发者可以在Office对象 唇ㄗ约旱亩韵螅嚎梢源唇ㄗ约旱牟说ズ凸ぞ呃福砑拥絆ffice 的对象集合中；可以创建一个窗体，并且在窗体中添加控件，等等。例如，在Word中，可以往自 动更正的词库中添加自己的词条。</p><h3 id="_3-vba开发office的功用" tabindex="-1"><a class="header-anchor" href="#_3-vba开发office的功用" aria-hidden="true">#</a> 3.VBA开发Office的功用</h3><p>有人 也许觉得Office的功能已经足够强大了，是否还有必要使用VBA来开发Office。的确，即使根 本不用编写一句语句，Office就可以完成用户所能遇到的各种任务。但是，人们对效率的追求 是永不满足的，这就是使用VBA来开发Offic的原动力。</p><p>（1）VBA可以使Office任 务自动化</p><p>在使用Office的过程中，往往要遇到一些重复性的系列工作，特别是在 处理大批量的文档或数据时。通过录制宏或使用VisualBasic编写宏，使一系列的工作只需 要一个指令便能完成，这就成倍地提高了工作效率。</p><p>（2）VBA可以定制Office满 足自己的需要</p><p>Office是一个功能异常庞杂的软件包，对某一用户来所说，许多 命令可能一辈子也用不着，而另外一些命令可能得经常使用。有时候，功能复杂反而显得多余。</p><p>另外，Office的外观显得异常的繁杂，许多用户面对如此繁杂的界面往往手足无措。</p><p>通过VBA可以设置自己的界面，把自己经常用到的菜单命令和工具栏放置到 显眼的地方，隐藏一些不常用的菜单或工具栏，并且，可以把自己所编写的宏设置为菜单命令 或设置为工具栏中的命令按钮，方便了使用。</p><p>并且，可以根据自己的需要来定制Office 的功能，满足自己的需要。</p><p>（3）VBA可以增强Office的功能</p><p>Office 的功能虽然强大，但它不可能考虑到所有情况，而且情况是千变万化的，各种情况都有特定的 要求。</p><p>通过VBA可以增强Office的功能，以处理各种各样的任务。例如，可以设置Word 拼写检查的词库；可以往词库中添加新的词语；可以设置自动更正，设置自己经常遇到的误拼 等。</p><p>（4）VBA可以增强Office与用户的交互</p><p>在Office中，可以利用Visual Basic创建窗体，并在窗体中添加控件等用户接口元素。通过用户接口，应用程序可以得到用 户的请求，并对其作出响应。</p><p>（5）VBA可以集成Office的功能</p><p>Office 不是几个软件的简单组合，而成为一个有机的整体发挥巨大的作用。VisualBasic提供了集 成Office的功能的一种手段。</p><p>通过OLE（对象的链接和嵌入）和DDE（动态数据交换） 技术的使用可以集成Office的功能。例如，利用VisualBasic，可以在Word文档中链接Excel 数据表，调用Excel来对该数据进行处理。在Excel中处理该数据表，得到结果也要刷新Word文 档中的数据表，保持了数据的更新。这时的文档确切地说应该是一个复合文档。</p><p>OLE 自动化技术则提供了一种在应用程序中控制源文档的方法。OLE自动化的优点是，在单一的环 境中工作，同时可以使用其他应用程序的功能。</p><p>在MicrosoftOffice环境中，利 用VisualBasic开发应用程序时，可以利用OLE自动化组合MicrosoftOffice中的多个应用 程序，建立自动化应用程序。MicrosoftOffice提供了大量的材料，只需把它们拼凑起来。</p><h2 id="三、-简单开发实例" tabindex="-1"><a class="header-anchor" href="#三、-简单开发实例" aria-hidden="true">#</a> 三、 简单开发实例</h2><p>字符统计程序</p><p>有时候，要对某字符在文档中的出现次数进行统计。要完成这一任务，可以在Word中开发 一程序来较快地统计。<br> 打开要统计的文档后，在文本框中输入要统计的字符，如“OK!”，然后选择是否区分大小 写，单击“确定”按钮，便可以进行统计了。</p><p>设计该程序的步骤如下：</p><p>1 ．新建一窗体Userform1，窗体的caption属性设置为“字符统计”。窗体中包容以下控件：</p><p>复 选框控件<code>CheckBox1Caption=&quot;区分大小写&quot;</code><br> 命令按钮控件<code>CommandButton1 Caption=&quot;确定&quot;</code><br> 标签控件<code>Label1Caption=&quot;输入您要统计的字符：&quot;</code></p><p>2．在单击命令按钮控件CommandButton1后便执行统计工作，代码如下：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> SubCommandButton1_Click<span class="token punctuation">(</span><span class="token punctuation">)</span>
DimcountofappearasInteger
Selection<span class="token punctuation">.</span>WholeStory
WithSelection
<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>ClearFormatting
<span class="token keyword">With</span><span class="token punctuation">.</span>Find
<span class="token punctuation">.</span>Text<span class="token operator">=</span>UserForm1<span class="token punctuation">.</span>TextBox1<span class="token punctuation">.</span>Text
IfUserForm1<span class="token punctuation">.</span>CheckBox1<span class="token punctuation">.</span>Value<span class="token operator">=</span>TrueThen
<span class="token punctuation">.</span>MatchCase<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token keyword">Else</span>
<span class="token punctuation">.</span>MatchCase<span class="token operator">=</span><span class="token boolean">False</span>
<span class="token keyword">EndIf</span>
<span class="token punctuation">.</span>Execute
EndWith
EndWith
IfNotSelection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Found<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token keyword">Then</span>
MsgBox<span class="token string">&quot;未找到&quot;</span>
ExitSub
<span class="token keyword">EndIf</span>
WhileSelection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Found<span class="token punctuation">(</span><span class="token punctuation">)</span>
countofappear<span class="token operator">=</span>countofappear＋<span class="token number">1</span>
Selection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Execute
<span class="token keyword">Wend</span>
MsgBox<span class="token string">&quot;找到了&quot;</span>＆countofappear＆<span class="token string">&quot;个&quot;</span>
EndSub
</code></pre></div><p>讲解：首先用语句Selection.WholeStory选定全文。</p><p>使用Selection.find.execute 语句进行一次对字符的查找操作，如下：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>WithSelection
<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>ClearFormatting
<span class="token keyword">With</span><span class="token punctuation">.</span>Find
<span class="token punctuation">.</span>Text<span class="token operator">=</span>UserForm1<span class="token punctuation">.</span>TextBox1<span class="token punctuation">.</span>Text
IfUserForm1<span class="token punctuation">.</span>CheckBox1<span class="token punctuation">.</span>Value<span class="token operator">=</span>TrueThen
<span class="token punctuation">.</span>MatchCase<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token keyword">Else</span>
<span class="token punctuation">.</span>MatchCase<span class="token operator">=</span><span class="token boolean">False</span>
<span class="token keyword">EndIf</span>
<span class="token punctuation">.</span>Execute
EndWith
EndWith
</code></pre></div><p>上述语句中使用Find对象的ClearFormatting方法作用是清除任何为 进行查找或替换操作所指定的格式，相当于“编辑”菜单“查找和替换”对话框中的“不限定格 式”按钮。</p><p>另外，MatchCase属性设置查找操作是否区分大小写。</p><p>如果 没有找到，则弹出一消息框，告知没有找到，并退出子程序，语句为：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>IfNotSelection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Found<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">Then</span>
MsgBox<span class="token string">&quot;未找到&quot;</span>
ExitSub
<span class="token keyword">EndIf</span>
</code></pre></div><p>如果找到一处，然后进行下一次查找，以下如此循环，每找到一次countofappear 变量便加1，来代表指定字符在文档中出现的次数，语句为：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>WhileSelection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Found<span class="token punctuation">(</span><span class="token punctuation">)</span>
countofappear<span class="token operator">=</span>countofappear＋<span class="token number">1</span>
Selection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span>Execute
<span class="token keyword">Wend</span>
</code></pre></div><p>在程序中Selection.Find.Found()函数用来知道是否找到指定的字符。</p><p>最后，弹出一个消息框来告知字符在文档中出现的次数。</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>原作者： 不详
来 源： Internet
共有627位读者阅读过此
</code></pre></div>`,56),p=[t];function c(i,l){return a(),s("div",null,p)}const r=n(o,[["render",c],["__file","vba1.html.vue"]]);export{r as default};
