import{_ as e,o as a,c as n,a as t}from"./app-477de5b2.js";const l={},i=t(`<h1 id="应用程序设计-命名及编码规范方案" tabindex="-1"><a class="header-anchor" href="#应用程序设计-命名及编码规范方案" aria-hidden="true">#</a> 应用程序设计/命名及编码规范方案</h1><h2 id="架构规范" tabindex="-1"><a class="header-anchor" href="#架构规范" aria-hidden="true">#</a> 架构规范</h2><h3 id="总体设计" tabindex="-1"><a class="header-anchor" href="#总体设计" aria-hidden="true">#</a> 总体设计</h3><p>.NET web forms 应用程序的架构应遵循Microsoft建议的架构方案. 根据项目规模不同, 适当取舍各个基本层次. 将系统划分为多层的目的在于简化隔离各个子系统内部逻辑. 大体上应按照以下规则创建:</p><ul><li>应至少包含表示层与业务</li><li>一般应将应用程序划分为: 表示层, 业务逻辑层, 数据访问三层.</li><li>如果业务过程较复杂, 应增加业务规则层</li><li>应为业务过程中的基本业务对象实现数据实体(一般是DataSet扩充子类)</li><li>应单一地使用存储过程操作数据库</li><li>如果需要与业务无关的基础组件(全局参数配置, 异常处理, 日志), 应包含应用程序框架层(System Framework)</li><li>如果包含Custom Controls, 应单独作为一项project.</li></ul><p>上图是Visual Sudio.NET 所提供的样版应用Duwamish 7.0的系统架构. 其中参与关键数据流程的是web, business façade, business rules, data access. 上图形象说明了各层之间调用关系.</p><h3 id="表示层-asp-net-设计" tabindex="-1"><a class="header-anchor" href="#表示层-asp-net-设计" aria-hidden="true">#</a> 表示层(ASP.NET)设计</h3><p>在整个解决方案中, 只有表示层含有ASPX文件, 即ASP.NET技术. 表示层的任务为将数据以一定格式展示给用户, 而且可以接受用户输入的数据, 处理用户的操作. 表示层由web forms页, user control, 和code behide组成, 一般还包含所需要的其他资源文件. 设计及架构上应遵循以下原则:</p><ol><li>为了最大限度重用页面构图设计, 应将页面的主要公共元素(主菜单, 页眉页脚)构建为ASCX.</li><li>应将主要逻辑模块建立在同一个ASCX中。例如用户注册的过程. 由独立的、嵌入到页面中的、模块来处理该逻辑。这样做的好处是隔离呈现逻辑与业务逻辑。</li><li>ASPX页面仅仅是少量基本HTML, 表现基本页面构图。Code Behind仅仅操作所承载ASCX的显示与隐藏。 不包含业务逻辑</li><li>应从System.Web.UI.Controls.WebControls.Page与 System.Web.UI.Controls.WebControls.UserControl扩展出派生类。本层下所有ASPX与ASCX均扩展该类。基类应包含安全信息，用户状态等基本信息。</li><li>ASPX应可捕获所承载控件的用户事件。 用户事件一般代表ASCX生命周期的各个阶段。例如控件初始化，操作取消，操作完成，操作中止。</li><li>呈现数据的集合时，应尽量使用Repeater.</li></ol><h3 id="数据实体设计" tabindex="-1"><a class="header-anchor" href="#数据实体设计" aria-hidden="true">#</a> 数据实体设计</h3><p>数据实体是系统所处理的核心业务对象。拿一个电子商务应用来说，核心业务对象就是商品，供货方，顾客，订单。数据实体一般为DataSet. 每个DataSet都是被强制定义了表，列以及关系和约束的内存数据库。 表结构的定义是可以和数据库中实际数据有差别的。各个层之间传送的数据就是单纯的DataSet。这样可以是各层对外开发的接口完全统一。 例如当用户要求查询所有某类别的商品时，数据层可以将结果填充进事先设计好的实体中。</p><h3 id="业务层设计" tabindex="-1"><a class="header-anchor" href="#业务层设计" aria-hidden="true">#</a> 业务层设计</h3><p>业务层直接服务于表示层。为表示层提供所需数据。处理表示层的操作需求。实际上，业务层所担当的角色是表示层与数据访问层的中介。 将表示层的需求解析为数据层的数据操作。这应用了FACADE设计模式。即为子系统提供一个统一的接口以简化操作。在实际的设计中。 一般将业务层的类设计为各个核心子系统的各项操作的中心。 可降低系统层次之间的耦合度。 提高灵活性。</p><h3 id="数据层设计" tabindex="-1"><a class="header-anchor" href="#数据层设计" aria-hidden="true">#</a> 数据层设计</h3><p>数据库直接对数据库操作。一般不应该包含任何业务逻辑。好的数据层设计应该是仅包含读写删改等基本操作。提供业务层所需要的数据。</p><h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h2><h3 id="大小写形式" tabindex="-1"><a class="header-anchor" href="#大小写形式" aria-hidden="true">#</a> 大小写形式</h3><p>项目进行前应安排专门人员制定词汇表。开发成员选用词汇时应按照词汇表选用准确的词汇. 以达到风格统一的目的.</p><p>以下规则按照MSDN 推荐的样式表示下列标识符:</p><table><thead><tr><th>Identifier</th><th>Case</th><th>Example</th></tr></thead><tbody><tr><td>Class</td><td>Pascal</td><td>AppDomain</td></tr><tr><td>Enum type</td><td>Pascal</td><td>ErrorLevel</td></tr><tr><td>Enum values</td><td>Pascal</td><td>FatalError</td></tr><tr><td>Event</td><td>Pascal</td><td>ValueChange</td></tr><tr><td>Exception class</td><td>Pascal</td><td>WebException<br>Note Always ends with the suffix Exception.</td></tr><tr><td>Read-only Static field</td><td>Pascal</td><td>RedValue</td></tr><tr><td>Interface</td><td>Pascal</td><td>IDisposable Note Always begins with the prefix I.</td></tr><tr><td>Method</td><td>Pascal</td><td>ToString</td></tr><tr><td>Namespace</td><td>Pascal</td><td>System.Drawing</td></tr><tr><td>Parameter</td><td>Camel</td><td>typeName</td></tr><tr><td>Property</td><td>Pascal</td><td>BackColor</td></tr><tr><td>Protected instance field</td><td>Camel</td><td>redValue<br>Note Rarely used. A property is preferable to using a protected instance field.</td></tr><tr><td>Public instance field</td><td>Pascal</td><td>RedValue<br>Note Rarely used. A property is preferable to using a public instance field.</td></tr></tbody></table><h3 id="大小写敏感设置" tabindex="-1"><a class="header-anchor" href="#大小写敏感设置" aria-hidden="true">#</a> 大小写敏感设置</h3><p>由于.NET平台是跨语言操作, 对于大小写敏感的语言和大小写不敏感的语言都要求适用, 所以绝对不能使用仅依靠大小写识别的标志符.</p><h3 id="缩写形式" tabindex="-1"><a class="header-anchor" href="#缩写形式" aria-hidden="true">#</a> 缩写形式</h3><ol><li>不允许使用任何对于英文单词的简写或者缩写.例如将 GetWindow写成 GetWin.</li><li>不允许使用省去元音字母的缩写形式.例如将Message写成Msg.</li><li>不允许使用尚未被广泛采用的只用首字母的缩写词.</li><li>使用约定俗称的首字母缩写来代替较长的名称. 例如 GetHtml.</li><li>缩写词应当作一个单词使用, 即采用首字母大写其他字母小写的形式. 例如 SqlServer.</li><li>如果缩写词只有两位字符. 应全部大写. 例如 System.Web.UI.</li></ol><h3 id="应遵守的通用规则" tabindex="-1"><a class="header-anchor" href="#应遵守的通用规则" aria-hidden="true">#</a> 应遵守的通用规则</h3><ol><li>必须使用拼写正确的英文单词。不允许使用汉语拼音或者其他任何形式的缩写。</li><li>词汇必须完整。不允许使用任何简写形式。 例如不允许将Message写成Msg.</li><li>如果名字代表复数意义，应使用其正确的复数形式。</li><li>约定俗成的字母缩写，可作为一个单词使用。</li><li>应尽量将标志符的意义描述清楚。即使用一个以上的单词来表示一项内容。</li></ol><h3 id="规避词汇" tabindex="-1"><a class="header-anchor" href="#规避词汇" aria-hidden="true">#</a> 规避词汇</h3><p>避免使用.NET namespace占用的词汇. 避免使用与关键字冲突的词汇:</p><p>关键字列表:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>AddHandler AddressOf Alias And Ansi

As Assembly Auto Base Boolean

ByRef Byte ByVal Call Case

Catch CBool CByte CChar CDate

CDec CDbl Char CInt Class

CLng CObj Const CShort CSng

CStr CType Date Decimal Declare

Default Delegate Dim Do Double

Each Else ElseIf End Enum

Erase Error Event Exit ExternalSource

False Finalize Finally Float For

Friend Function Get GetType Goto

Handles If Implements Imports In

Inherits Integer Interface Is Let

Lib Like Long Loop Me

Mod Module MustInherit MustOverride MyBase

MyClass Namespace New Next Not

Nothing NotInheritable NotOverridable Object On

Option Optional Or Overloads Overridable

Overrides ParamArray Preserve Private Property

Protected Public RaiseEvent ReadOnly ReDim

Region REM RemoveHandler Resume Return

Select Set Shadows Shared Short

Single Static Step Stop String

Structure Sub SyncLock Then Throw

To True Try TypeOf Unicode

Until <span class="token keyword">volatile</span> When While With

WithEvents WriteOnly Xor eval extends

instanceof package <span class="token keyword">var</span>
</code></pre></div><h3 id="文件名、文件目录名" tabindex="-1"><a class="header-anchor" href="#文件名、文件目录名" aria-hidden="true">#</a> 文件名、文件目录名</h3><ol><li>全部单词首字母大写紧靠在一起。第一个单词也必须大写。只有一个单词也必须大写。不允许使用下划线连接。明明中一般不允许出现数字。（特殊情形除外）</li><li>扩展名必须全部小写。</li><li>应用程序缺省首页一定是Default.aspx。</li><li>允许使用修饰性的名词词组，动词-名词的支配结构词组来表示aspx文件名。(例如MemberDetails.aspx) aspx文件名必须用词准确。使用合适的单复数形式及动词时态形式。</li></ol><h3 id="namespace命名" tabindex="-1"><a class="header-anchor" href="#namespace命名" aria-hidden="true">#</a> NameSpace命名</h3><ul><li>采用以下形式命名namespace:<br><code>CompanyName.TechnologyName[.Feature][.Design]</code></li><li>Pascal形式</li><li>应使用解决方案的名称或者开发代号开头.</li><li>如果作为产品出售, 应以公司品牌开头.</li><li>同一个解决方案，应尽量写在同一个顶级NameSpace中。</li><li>每个项目应设置一个二级NameSpace. 并以项目名命名.</li><li>如果名词有复数意义, 应采用其复数形式. 例如 Nestle.Web.UserControls.</li><li>不允许namespace和类重名.</li></ul><h3 id="类命名" tabindex="-1"><a class="header-anchor" href="#类命名" aria-hidden="true">#</a> 类命名</h3><ol><li>必须使用Pascal形式</li><li>类名选词必须可以完全准确地表示其含义。不允许使用晦涩、不常用的词汇。也避免选择意义太广泛容易发生歧异的词。例如表示车辆应选用Vehicles, 而不宜选用Cars. 员工应选用Employees, 而不宜选用Personels. 一般而言，词汇的选用必须在项目开始以前经过充分讨论，列出词汇表。各成员应严格遵守选词规则。避免同一个意义使用两个不同的词汇的情况。</li><li>必须使用名词或者名词复合词，如果仅具有动词含义， 则使用其主语形态。例如Importor.</li><li>谨慎的使用缩写词</li><li>不允许使用表示数据类型的前缀.</li><li>不允许使用下划线连接</li><li>使用复合词来表示派生类. 例如派生自LinkButton的类可命名为 SubmitLink. 又如 DataAccessException.</li><li>接口一般以I为前缀. 并且第二个字母也大写.</li><li>使用相同的词汇表示接口和相关类例如:</li></ol><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IComponent</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Component</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IComponent</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="method命名" tabindex="-1"><a class="header-anchor" href="#method命名" aria-hidden="true">#</a> Method命名</h3><ol><li>使用动词-名词的方法来命名对给定对象执行特定操作的例程，如 CalculateInvoiceTotal(), RemoveAll(), GetCharArray(), Invoke()</li><li>方法名必须可以详尽描述其意义。</li></ol><h3 id="property命名" tabindex="-1"><a class="header-anchor" href="#property命名" aria-hidden="true">#</a> Property命名</h3><ol><li>使用名词或者名词复合词.</li><li>有复数意义时应使用其复数形式.</li><li>不要与其数据类型相同</li><li>在面向对象的语言中，在类属性的名称中包含类名是多余的，如 Book.BookTitle。而是应该使用 Book.Title。</li><li>布尔值属性应该包含 Is，这意味着 Yes/No 或 True/False 值，如 IsFileFound。</li><li>使用#Region将所有Property定义组织在一起. 以便管理源代码.</li><li>注释必须以 &quot;公共特性: &quot;开头</li><li>如果有缺省值则直接赋值给相关私有成员变量</li></ol><h3 id="event命名" tabindex="-1"><a class="header-anchor" href="#event命名" aria-hidden="true">#</a> Event命名</h3><ol><li>使用EventHandler后缀来标识事件处理器.</li><li>通常指定sender和e两个参数. sender类型总是object. 而e与事件所对应的Exception类型相同.</li><li>使用动词表示事件. 例如Click, 或者名词动词组成的复合结构. 例如TaskAbort.</li><li>使用进行时态表示事件发生之前, 使用过去时态表示事件发生之后, 例如TaskAborting和TaskAborted.</li></ol><h3 id="web-control命名" tabindex="-1"><a class="header-anchor" href="#web-control命名" aria-hidden="true">#</a> Web Control命名</h3><ol><li>必须使用有意义的名字来表示所使用的web control。</li><li>控件必须可以说明自身类型。 例如LinkButton类型的控件，其ID必须以Link结尾。以下是基本控件类型与后缀的对应关系：</li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>a)  LinkButton        Link         举例: SaveInformationLink
b)  TextBox           Box          举例: UserNameBox
c)  DropDownList      List         举例: LocaleList
d)  Label             Label        举例: BirthDateLabel
e)  Panel             Panel        举例: DetailFormPanel
f)  Repeater          Repeater     举例: TaskRepeater
g)  其余可依照规则类推
</code></pre></div><h3 id="数据库命名" tabindex="-1"><a class="header-anchor" href="#数据库命名" aria-hidden="true">#</a> 数据库命名</h3><ol><li>表名称, 列名称一律只允许小写. 严禁使用大小写混排的数据库命名</li><li>应使用常用英文词汇的正确完整形式, 不允许任何形式的缩写或简写.</li><li>连接多个单词时, 使用下划线</li><li>表名称具有复数意义时, 使用名词的正确的复数形式。</li><li>一般情况下. 列名称不应包含表名或者表名的任何形式。 列名不允许使用统一的前缀。</li><li>关键数据对象表使用单个名词。 为区别开来, 非关键数据对象表一律使用复合名称. 例如members(会员), member_messages(会员收件箱).</li><li>字典表(仅用来表示索引之和名称对应关系的表)一律以相同的前缀开始. 并且使用名词的单数形式. 例如infr_locale(地域名索引表)</li><li>字典表主键一律使用index_id名称(小写),并且是varchar类型.</li><li>基层非关键表必须包含自动增加类型的Int主键, 而且名称必须是pkid(primary key ID)。例如记录用户登录日志的表.</li><li>视图命名，应以<code>_view</code>词根结尾。</li><li>不允许给存储过程加上<code>sp_</code>前缀。（<code>sp_</code>前缀是系统存储过程。）存储过程应以动词-名词的支配结构词组。并且习惯性地以<code>insert_</code>, <code>update_</code>, <code>select_</code>, <code>delete_</code>开头。</li></ol><h2 id="编码规范" tabindex="-1"><a class="header-anchor" href="#编码规范" aria-hidden="true">#</a> 编码规范</h2><h3 id="c-代码" tabindex="-1"><a class="header-anchor" href="#c-代码" aria-hidden="true">#</a> C#代码</h3><p>在开发中保持良好的编码规范是十分重要的。编码规范和约定必须能明显改善代码可读性，并有助于代码管理、分类。</p><ol><li><p>必须使用智能缩进代码。并且制表符和缩进大小均为4字符。 不允许插入空格缩进。（使用VISUAL STUDIO.NET的缺省设置）。</p></li><li><p>在代码中必须垂直对其左右花括号。不允许将左右花括号写在一行上。</p></li><li><p>同一行仅能容纳一条语句.</p></li><li><p>当一行内容太长而必须换行时，在后面换行代码中要使用缩进格式，如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> inserString <span class="token operator">=</span> &quot;Insert <span class="token return-type class-name">Into</span> TableName
    <span class="token punctuation">(</span>username<span class="token punctuation">,</span>password<span class="token punctuation">,</span>email<span class="token punctuation">,</span>sex<span class="token punctuation">,</span>address<span class="token punctuation">)</span>&quot;
</code></pre></div></li><li><p>推荐每行语句以this开头以便使用代码助手. 加速书写效率与准确性。</p></li><li><p>尽量不给较长语句换行以提高可读性。 (经验证明将一不可分割的语句换行将带来阅读和维护上的困难。)</p></li></ol><h3 id="代码组织结构" tabindex="-1"><a class="header-anchor" href="#代码组织结构" aria-hidden="true">#</a> 代码组织结构</h3><ol><li><p>采用如下顺序组织类中的代码:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>类说明(注释)
名称那空间声明
using语句组
类说明
类声明
私有变量
公共属性与相应私有变量组
方法声明
</code></pre></div></li><li><p>公共属性和相应私有变量必须写在一起. 并且一起被注释注释.例如:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 公共特性(property): 资源文件(图像文件及脚本资源)引用路径</span>
<span class="token doc-comment comment">/// 相对于应用程序根路径的地址, 可不以/符号结尾</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">private</span> <span class="token keyword">string</span> resourcePath
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ResourcePath
<span class="token punctuation">{</span>
    …
<span class="token punctuation">}</span>
</code></pre></div></li></ol><h3 id="code-behidn组织结构" tabindex="-1"><a class="header-anchor" href="#code-behidn组织结构" aria-hidden="true">#</a> CODE BEHIDN组织结构</h3><ol><li><p>采用如下顺序组织类中的代码:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>类说明(注释)
using语句组
名称空间声明
类说明
类声明
ASPX所使用ASPX标准控件
ASPX所使用USER CONTROL
ASPX所使用CUSTOM CONTROL
私有变量
private void Page_Load(object sender, System.EventArgs e)方法实现
#region Web 窗体设计器生成的代: override protected void OnInit(EventArgs e)
自定义事件处理: 方法定义
</code></pre></div></li><li><p>注释某自定义事件处理方法必须注明事件触发时的情景. 比如 ”检查重名”! 事件处理, 其中双引号和惊叹号内引用的词汇为前台所见的控件表现.通常时一个按钮或者一个链接的文本. 可另起一行进一步说明该过程.</p></li></ol><h3 id="空行与空格" tabindex="-1"><a class="header-anchor" href="#空行与空格" aria-hidden="true">#</a> 空行与空格</h3><ol><li>在类定义, 方法定义, 公共属性定义前留一空行</li><li>逻辑代码段前留一空行</li><li>逗号后留一空格</li><li>运算符前后都有一空格. 但用于for循环大短语句除外.(仅在分号后留一空格)</li><li>不允许出现多余空行和空格.</li><li>定义公共属性的get和set过程之间不留空行</li></ol><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><ol><li>注释时连写入三个斜线符号, Visual Studio IDE C#编辑器会自动产生<code>/// &lt;summry&gt;</code> 帮助产生标准XML注释, 在注释模块, 类, 重要特性, 方法时必须使用, 而行间注释不能使用</li><li>注释必须使用完整的中文陈述性语句. 避免注释产生多义性而更难于理解.</li><li>避免多余的或不恰当的注释. 或幽默的可有可无的注释.</li><li>注释中必须使用书面语言. 避免使用口语或非正式的措辞. 注释不可出现错别字或多余的语气词.</li><li>注释用用到的标点符号必须为英文的普通标点符号.</li><li>不允许用一整行星号或者斜线来标记注释.</li><li>模块注释: 书写于.CS文件开头. 分行注明模块名, 意义及功能, 作者, 编写时间. 修改人员须注明修改人姓名及时间. 以上项必须全部使用中文. 日期格式采用 2004-2-29 格式 注明24小时制时间, 精确到分钟.</li><li>类注释: 书写于类定义紧上方. 说明主要功能. 使用的算法以及注意事项. 可分行说明.</li><li>行间注释: 以双斜线开始。必须先于被注释的代码. 并且要紧挨着代码行.许在行尾增加注释. 这一情况在分别注释多行代码时除外.</li><li>注释中如出现中英文混排，应注意使用适当的大小写拼写形式。如果英文做为单字出现，则使用全部小写。 （专有名词，组织、公司名，以及缩写除外。）如出现由多个单词组成的专有名词，则每个单词首字母大写。如Microsoft Internet Explorer.</li></ol><h3 id="t-sql-编程" tabindex="-1"><a class="header-anchor" href="#t-sql-编程" aria-hidden="true">#</a> T-SQL 编程</h3><ol><li>SQL 文本命令关键字必须全部使用大写形式。</li><li>涉及到的数据库命名严格使用其原有形式。</li></ol>`,62),s=[i];function r(d,o){return a(),n("div",null,s)}const p=e(l,[["render",r],["__file","cspcsg14.html.vue"]]);export{p as default};
