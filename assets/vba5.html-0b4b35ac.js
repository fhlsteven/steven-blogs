import{_ as e,o as t,c as n,a}from"./app-d9da1b6d.js";const o={},d=a(`<h1 id="treeview-控件应用详解" tabindex="-1"><a class="header-anchor" href="#treeview-控件应用详解" aria-hidden="true">#</a> TreeView 控件应用详解</h1><p>TreeView控件是在VBA的数据处理中很有用的一个ActiveX 控件,但是VBA的帮助中却没有相关的说明，为帮助大家对这一控件有一个详细的了解，现将TreeView控件应用详解如下：</p><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2><p>TreeView控件显示Node对象的分层列表，每个Node对象均由一个标签和一个可选的位图组成。TreeView 一般用于显示文档标题、索引入口、磁盘上的文件和目录、或能被有效地分层显示的其它种类信息。创建了TreeView控件之后，可以通过设置属性与调用方法对各Node对象进行操作，这些操作包括添加、删除、对齐和其它操作。可以编程展开与折回 Node 对象来显示或隐藏所有子节点。Collapse、Expand和NodeClick三个事件也提供编程功能。</p><p>Node对象使用Root、Parent、Child、FirstSibling、Next、Previous和 LastSibling属性。在代码中可通过检索对Node对象的引用，从而在树上定位。也可以使用键盘定位。UP ARROW键和DOWN ARROW键向下循环穿过所有展开的Node对象。从左到右、从上到下地选择Node对象。若在树的底部，选择便跳回树的顶部，必要时滚动窗口。RIGHT ARROW键和LEFT ARROW键也穿过所有展开的Node对象，但是如果选择了未展开的 Node之后再按RIGHT ARROW键，该Node便展开；第二次按该键，选择将移向下一个Node。相反，若扩展的Node有焦点，这时再按LEFT ARROW键，该Node便折回。如果按下ANSI字符集中的键，焦点将跳转至以那个字母开头的最近的Node。后续的按该键的动作将使选择向下循环，穿过以那个字母开头的所有展开节点。</p><p>控件的外观有八种可用的替换样式，它们是文本、位图、直线和+/-号的组合，Node 对象可以任一种组合出现。</p><p>TreeView控件使用由ImageList属性指定的ImageList控件，来存储显示于Node对象的位图和图标。任何时刻，TreeView 控件只能使用一个ImageList。这意味着，当 TreeView控件的Style属性被设置成显示图象的样式时，TreeView控件中每一项的旁边都有一个同样大小的图象。</p><p>发行注意TreeView控件是COMCTL32.OCX文件中的一组ActiveX控件的一部分。为了在应用程序中使用TreeView控件，必须将COMCTL32.OCX文件添加到工程中。在发行应用程序时，要在用户的Microsoft Windows System或System32目录中安装COMCTL32.OCX文件。</p><h2 id="二、常用属性" tabindex="-1"><a class="header-anchor" href="#二、常用属性" aria-hidden="true">#</a> 二、常用属性</h2><p>1、Nodes属性返回对TreeView控件的Node对象的集合的引用。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：object.Nodes
ject所在处代表一个对象表达式，其值是“应用于”列表中的一个对象。
说明：可以使用标准的集合方法（例如：Add和Remove方法）操作Node对象。可以按其索引或存储在Key属性中的唯一键来访问集合中的每个元素。
</code></pre></div><p>2、Style属性返回或设置图形类型（图象、文本、+/-号、直线）以及出现在 TreeView 控件中每一Node对象上的文本的类型。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：object.Style [ = number]
Style 语法包含下面部分：
部分 描述
object 对象表达式，其值是“应用于”列表中的一个对象。
number 指定图形类型的整数，请参阅“设置值”中的描述。
设置值
number 的设置值是：
设置值 描述
0 仅为文本。
1 图象和文本。
2 +/- 号和文本。
3 +/- 号，图象和文本。
4 直线和文本。
5 直线，图象和文本。
6 直线，+/- 号和文本。
7 （缺省）直线，+/- 号，图象和文本。
　　说明：若Style属性设置为包含直线的值，则LineStyle属性就确定了直线的外观。如果Style属性设置为不含直线的值，则LineStyle属性将被忽略。
</code></pre></div><p>3、Sorted属性返回或设置一值，此值确定Node对象的子节点是否按字母顺序排列；返回或设置一值，此值确定TreeView控件的根层节点是否按字母顺序排列。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：object.Sorted [ = boolean]
Sorted属性语法包含下面部分：
部分 描述
object 对象表达式，其值是“应用于”列表中的一个对象。
boolean 布尔表达式，表示 Node 对象是否已被排序如“设置值”中描述。
boolean的设置值是：
设置值 描述
True Node 对象根据它们的 Text 属性按字母顺序排列。其 Text 属性由数字开始的 Node 对象也作为字符串排序，第一个数字确定在排序中的初始位置，后面的数字确定以后的排序。
False Node 对象不排序。
　　说明：Sorted属性有两种用法，第一，在TreeView控件的根（顶）层排列Node对象，第二，对任何单个Node对象的立即子节点排序。
　　例如，下面的代码是对TreeView控件的根节点排序：
TreeView1.Sorted = True 顶层Node对象被排序。
</code></pre></div><p>下面的例子表示创建Node对象时如何设置Sorted属性：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Dim</span> nodX <span class="token keyword">As</span> Node
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token punctuation">,</span><span class="token punctuation">,</span><span class="token punctuation">,</span><span class="token string">&quot;Parent Node&quot;</span><span class="token punctuation">)</span>
nodX<span class="token punctuation">.</span>Sorted <span class="token operator">=</span> <span class="token boolean">True</span>
</code></pre></div><p>设置 Sorted 属性为True仅对当前Nodes集合排序。在TreeView控件中添加新的Node对象时，必须再次设置 Sorted 属性为 True，以便对添加的 Node 对象排列。</p><h2 id="三、常用方法" tabindex="-1"><a class="header-anchor" href="#三、常用方法" aria-hidden="true">#</a> 三、常用方法</h2><p>1、Add 方法在Treeview控件的Nodes集合中添加一个Node对象。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：
object.Add(relative, relationship, key, text, image, selectedimage)
Add 方法的语法包含下面部分：
部分 描述
object 必需的。对象表达式，其值是“应用于”列表中的一个对象
relative 可选的。已存在的 Node 对象的索引号或键值。新节点与已存在的节点间的关系，可在下一个参数 relationship 中找到。
relationship 可选的。指定的 Node 对象的相对位置，如设置值中所述。
key 可选的。唯一的字符串，可用于用 Item 方法检索 Node。
text 必需的。在 Node 中出现的字符串。
image 可选的。在关联的 ImageList 控件中的图象的索引。
selectedimage 可选的。在关联的 ImageList 控件中的图象的索引，在 Node 被选中时显示。
设置值
relationship 的设置值是：
常数 值 描述
tvwFirst 0 首的节点。该 Node 和在 relative 中被命名的节点位于同一层，并 位于所有同层节点之前。
tvwLast 1 最后的节点。该 Node 和在 relative 中被命名的节点位于同一层，并 位于所有同层节点之后。任何连续地添加的节点可能位于最后添加的节点之后
tvwNext 2 （缺省）下一个节点。该 Node 位于在 relative 中被命名的节点之后。
tvwPrevious 3 前一个节点。该 Node 位于在 relative 中被命名的节点之前。
tvwChild 4 （缺省）子节点。该 Node 成为在 relative 中被命名的节点的子节点。
注意：如果在relative中没有被命名的Node对象，则新节点被放在节点顶层的最后位置。
说明：Nodes 集合是一个基于 1 的集合。在添加Node对象时，它被指派一个索引号，该索引号被存储在Node对象的Index属性中。这个最新成员的Index属性值就是Node集合的Count属性的值。因为Add方法返回对新建立的Node对象的引用，所以使用这个引用来设置新Node的属性十分方便。
</code></pre></div><p>2、GetVisibleCount方法返回固定在 TreeView 控件的内部区域的 Node 对象的个数。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：object.GetVisibleCount
object 所在处代表一个对象表达式，其值是“应用于”列表中的一个对象。
说明： Node 对象的个数取决于在一个窗口中能固定多少行。总的行数取决于控件的高度和 Font 对象的 Size 属性。该计数包括列表底部的只能看到一局部的项。可以使用 GetVisibleCount 属性确保可视的最小行数，这样可以精确地访问一个层。如果最小行数是不可视的，可以用Height属性重新设置TreeView的大小。
</code></pre></div><h2 id="四、常用事件" tabindex="-1"><a class="header-anchor" href="#四、常用事件" aria-hidden="true">#</a> 四、常用事件</h2><p>NodeClick事件在一个Node对象被单击时，这个事件便发生。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>语法：Private Sub object_NodeClick(ByVal node As Node)
　　NodeClick事件的语法包含下面部分：
部分 描述
object 对象表达式，其值是“应用于”列表中的一个对象。
node 对被点取的 Node 对象的引用。
　　说明：在单击节点对象之外的TreeView控件的任何部位，标准的Click事件发生。当单击某个特定的Node对象时，NodeClick事件发生；NodeClick事件也返回对特定的Node对象的引用，在下一步操作之前，这个引用可用来使这个Node对象可用。 NodeClick事件发生在标准的Click事件之前。
</code></pre></div>`,26),s=[d];function i(r,c){return t(),n("div",null,s)}const p=e(o,[["render",i],["__file","vba5.html.vue"]]);export{p as default};
