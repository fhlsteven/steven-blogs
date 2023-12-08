import{_ as a,o as n,c as s,a as t}from"./app-f0851ed3.js";const e={},p=t(`<h1 id="c-和asp-net命名规范" tabindex="-1"><a class="header-anchor" href="#c-和asp-net命名规范" aria-hidden="true">#</a> C#和ASP.net命名规范</h1><h2 id="c-书写规范" tabindex="-1"><a class="header-anchor" href="#c-书写规范" aria-hidden="true">#</a> C#书写规范</h2><h3 id="一、命名" tabindex="-1"><a class="header-anchor" href="#一、命名" aria-hidden="true">#</a> 一、命名</h3><p>对于理解应用程序的逻辑流，命名方案是最有影响力的一种帮助。名称应该说明“什么”而不是“如何”。通过避免使用公开基础实现（它们会发生改变）的名称，可以保留简化复杂性的抽象层。例如，可以使用 GetNextStudent()，而不是 GetNextArrayElement()。</p><p>命名原则是：<br> 选择正确名称时的困难可能表明需要进一步分析或定义项的目的。使名称足够长以便有一定的意义，并且足够短以避免冗长。唯一名称在编程上仅用于将各项区分开。表现力强的名称是为了帮助人们阅读；因此，提供人们可以理解的名称是有意义的。不过，请确保选择的名称符合适用语言的规则和标准。</p><p>以下几点是推荐的命名方法。</p><p>1、方法、属性、变量规范</p><ul><li>避免容易被主观解释的难懂的名称，如方面名 AnalyzeThis()，或者属性名 xxK8。这样的名称会导致多义性。</li><li>在面向对象的语言中，在类属性的名称中包含类名是多余的，如 Book.BookTitle。而是应该使用 Book.Title。</li><li>使用动词-名词的方法来命名对给定对象执行特定操作的例程，如 CalculateInvoiceTotal()。</li><li>在允许函数重载的语言中，所有重载都应该执行相似的函数。</li><li>只要合适，在变量名的末尾或开头加计算限定符（Avg、Sum、Min、Max、Index）。</li><li>在变量名中使用互补对，如 min/max、begin/end 和 open/close。</li><li>鉴于大多数名称都是通过连接若干单词构造的，请使用大小写混合的格式以简化它们的阅读。另外，为了帮助区分变量和例程，请对例程名称使用 Pascal 大小写处理 (CalculateInvoiceTotal)，其中每个单词的第一个字母都是大写的。对于变量名，请使用 camel 大小写处理 (documentFormatType)，其中除了第一个单词外每个单词的第一个字母都是大写的。</li><li>布尔变量名应该包含 Is，这意味着 Yes/No 或 True/False 值，如 fileIsFound。</li><li>在命名状态变量时，避免使用诸如 Flag 的术语。状态变量不同于布尔变量的地方是它可以具有两个以上的可能值。不是使用 documentFlag，而是使用更具描述性的名称，如 documentFormatType。 （此项只供参考）</li><li>即使对于可能仅出现在几个代码行中的生存期很短的变量，仍然使用有意义的名称。仅对于短循环索引使用单字母变量名，如 i 或 j。</li><li>可能的情况下，尽量不要使用原义数字或原义字符串，如 For i = 1 To 7。而是使用命名常数，如 For i = 1 To NUM_DAYS_IN_WEEK 以便于维护和理解。</li></ul><h3 id="二、代码书写规范" tabindex="-1"><a class="header-anchor" href="#二、代码书写规范" aria-hidden="true">#</a> 二、代码书写规范</h3><p>格式化使代码的逻辑结构很明显。花时间确保源代码以一致的逻辑方式进行格式化，这对于您和你的开发小组，以及以后维护源代码的其他开发人员都有很大的帮助。<br> 以下几点是推荐的格式化方法。</p><ul><li><p>建立标准的缩进大小（如四个空格），并一致地使用此标准。用规定的缩进对齐代码节。</p></li><li><p>在发布源代码的硬拷贝版本时使用特定的字体以及字号（新宋体、小五号）。</p></li><li><p>在括号对对齐的位置垂直对齐左括号和右括号，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>也可以使用倾斜样式，即左括号出现在行尾，右括号出现在行首，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>无论选择哪种样式，请在整个源代码中使用那个样式。</p></li><li><p>沿逻辑结构行缩进代码。没有缩进，代码将变得难以理解，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>expression <span class="token punctuation">)</span>
<span class="token punctuation">{</span>   
    <span class="token comment">//</span>
    <span class="token comment">//此处填写你的代码块;</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>expression <span class="token punctuation">)</span>
<span class="token punctuation">{</span>   
    <span class="token comment">//</span>
    <span class="token comment">//此处填写你的代码块;</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>   
    <span class="token comment">//</span>
    <span class="token comment">//此处填写你的代码块;</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>
</code></pre></div><p>缩进代码会产生出更容易阅读的代码，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>expression <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>expression <span class="token punctuation">)</span>
    <span class="token punctuation">{</span> 
        <span class="token comment">//</span>
        <span class="token comment">//此处填写你的代码块;</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>   
        <span class="token comment">//</span>
        <span class="token comment">//此处填写你的代码块;</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>为注释和代码建立最大的行长度，以避免不得不滚动源代码编辑器，并且可以提供整齐的硬拷贝表示形式。</p></li><li><p>在大多数运算符之前和之后使用空格，这样做时不会改变代码的意图。但是，C++ 中使用的指针表示法是一个例外。</p></li><li><p>使用空白为源代码提供结构线索。这样做会创建代码“段”，有助于读者理解软件的逻辑分段。</p></li><li><p>当一行内容太长而必须换行时，在后面换行代码中要使用缩进格式，如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> inserString <span class="token operator">=</span> <span class="token string">&quot;Insert Into TableName(username,password,email,sex,address)&quot;</span>
<span class="token operator">+</span> <span class="token string">&quot;Values(&#39;Soholife&#39;,&#39;chenyp&#39;,&#39;soholife@sina.com&#39;,&#39;male&#39;,&#39;深圳福田&#39;)&quot;</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>只要合适，每一行上放置的语句避免超过一条。例外是 C、C++、C# 或 JScript 中的循环，如 <code>for (i = 0; i &lt; 100; i++)</code>。</p></li><li><p>编写 HTML 时，建立标准的标记和属性格式，如所有标记都大写或所有属性都小写。另一种方法是，坚持 XHTML 规范以确保所有 HTML 文档都有效。尽管在创建 Web 页时需折中考虑文件大小，但应使用带引号的属性值和结束标记以方便维护。</p></li><li><p>编写 SQL 语句时，对于关键字使用全部大写，对于数据库元素（如表、列和视图）使用大小写混合。</p></li><li><p>在物理文件之间在逻辑上划分源代码。</p></li><li><p>将每个主要的 SQL 子句放在不同的行上，这样更容易阅读和编辑语句，例如：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> LastName
<span class="token keyword">FROM</span> Customers
<span class="token keyword">WHERE</span> State <span class="token operator">=</span> <span class="token string">&#39;WA&#39;</span>
</code></pre></div></li><li><p>将大的复杂代码段分为较小的、易于理解的模块。</p></li></ul><h3 id="三、注释" tabindex="-1"><a class="header-anchor" href="#三、注释" aria-hidden="true">#</a> 三、注释</h3><p>软件文档以两种形式存在：外部的和内部的。外部文档（如规范、帮助文件和设计文档）在源代码的外部维护。内部文档由开发人员在开发时在源代码中编写的注释组成。<br> 不考虑外部文档的可用性，由于硬拷贝文档可能会放错地方，源代码清单应该能够独立存在。外部文档应该由规范、设计文档、更改请求、错误历史记录和使用的编码标准组成。<br> 内部软件文档的一个难题是确保注释的维护与更新与源代码同时进行。尽管正确注释源代码在运行时没有任何用途，但这对于必须维护特别复杂或麻烦的软件片段的开发人员来说却是无价的。</p><p>以下几点是推荐的注释方法：</p><ul><li><p>如果用 C# 进行开发，请使用 XML 文档格式，如下面方法的注释：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">///</span>
<span class="token doc-comment comment">/// 得到某人的年龄</span>
<span class="token doc-comment comment">///</span>
<span class="token doc-comment comment">/// 用户名</span>
<span class="token doc-comment comment">/// 用户年龄</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetUserAge</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> userName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//</span>
    <span class="token comment">//此处写你的程序代码</span>
    <span class="token comment">//</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>修改代码时，总是使代码周围的注释保持最新。</p></li><li><p>在每个例程的开始，提供标准的注释样本以指示例程的用途、假设和限制很有帮助。注释样本应该是解释它为什么存在和可以做什么的简短介绍。</p></li><li><p>避免在代码行的末尾添加注释；行尾注释使代码更难阅读。不过在批注变量声明时，行尾注释是合适的；在这种情况下，将所有行尾注释在公共制表位处对齐。</p></li><li><p>避免杂乱的注释，如一整行星号。而是应该使用空白将注释同代码分开。</p></li><li><p>避免在块注释的周围加上印刷框。这样看起来可能很漂亮，但是难于维护。</p></li><li><p>在部署之前，移除所有临时或无关的注释，以避免在日后的维护工作中产生混乱。</p></li><li><p>如果需要用注释来解释复杂的代码节，请检查此代码以确定是否应该重写它。尽一切可能不注释难以理解的代码，而应该重写它。尽管一般不应该为了使代码更简单以便于人们使用而牺牲性能，但必须保持性能和可维护性之间的平衡。</p></li><li><p>在编写注释时使用完整的句子。注释应该阐明代码，而不应该增加多义性。</p></li><li><p>在编写代码时就注释，因为以后很可能没有时间这样做。另外，如果有机会复查已编写的代码，在今天看来很明显的东西六周以后或许就不明显了。</p></li><li><p>避免多余的或不适当的注释，如幽默的不主要的备注。</p></li><li><p>使用注释来解释代码的意图。它们不应作为代码的联机翻译。</p></li><li><p>注释代码中不十分明显的任何内容。</p></li><li><p>为了防止问题反复出现，对错误修复和解决方法代码总是使用注释，尤其是在团队环境中。</p></li><li><p>对由循环和逻辑分支组成的代码使用注释。这些是帮助源代码读者的主要方面。</p></li><li><p>在整个应用程序中，使用具有一致的标点和结构的统一样式来构造注释。</p></li><li><p>用空白将注释同注释分隔符分开。在没有颜色提示的情况下查看注释时，这样做会使注释很明显且容易被找到。</p></li></ul><h2 id="c-程序编码规范-wirte-原作" tabindex="-1"><a class="header-anchor" href="#c-程序编码规范-wirte-原作" aria-hidden="true">#</a> <a href="./cspcsg11">C#程序编码规范</a> wirte（原作）</h2><hr><p>对该文的评论 人气：1456</p><p>shofee (2003-7-9 9:00:59)</p><blockquote><p>very goog!very good!</p></blockquote><p>nlock (2003-7-5 17:03:22)</p><blockquote><p>规范是必须的</p></blockquote><p>VingoL (2003-5-30 19:14:28)</p><blockquote><p>文档规范应该成为业界的公识！！！</p></blockquote><p>lmdhit (2003-5-26 22:49:03)</p><blockquote><p>支持！！！有了这些规范，文档也规范了</p></blockquote><p>imports (2003-5-24 11:07:25)</p><blockquote><p>不错!</p></blockquote><p>http://www.ai361.com/project/GP007.asp</p><h2 id="c-编程规范-程序员们都应该这样写代码" tabindex="-1"><a class="header-anchor" href="#c-编程规范-程序员们都应该这样写代码" aria-hidden="true">#</a> C#编程规范-程序员们都应该这样写代码</h2><p>-落叶夏日</p><p>为了保证大家使用C#编程和C++的风格的连贯,我在C++的标准备上对C#编程规则作了制定(试用版),在这里感谢大家的支持,特别是Stone Jiang.</p><p>基本要求</p><h3 id="_1程序结构要求" tabindex="-1"><a class="header-anchor" href="#_1程序结构要求" aria-hidden="true">#</a> 1程序结构要求<br></h3><p>1.1 程序结构清晰，简单易懂，单个函数的程序行数不得超过100行。<br> 1.2 打算干什么，要简单，直接了当，代码精简，避免垃圾程序。<br> 1.3 尽量使用.NET库函数和公共函数(无特殊情况不要使用外部方法调用windows的核心动态链接库)。<br> 1.4 不要随意定义全局变量，尽量使用局部变量。<br></p><h3 id="_2-可读性要求" tabindex="-1"><a class="header-anchor" href="#_2-可读性要求" aria-hidden="true">#</a> 2.可读性要求</h3><p>2.1 可读性第一，效率第二(代码是给人读的J)。<br> 2.2 保持注释与代码完全一致。<br> 2.3 每个源程序文件，都有文件头说明，说明规格见规范。<br> 2.4 每个函数，都有函数头说明，说明规格见规范。<br> 2.5 主要变量（结构、联合、类或对象）定义或引用时，注释能反映其含义。<br> 2.6 处理过程的每个阶段都有相关注释说明。<br> 2.7 在典型算法前都有注释, 同时算法在满足要求的情况下尽可能简单。<br> 2.8 利用缩进来显示程序的逻辑结构，缩进量一致并以Tab键为单位，定义Tab为 6个字节。<br> 2.9 循环、分支层次不要超过五层。<br> 2.10 注释可以与语句在同一行，也可以在上行。<br> 2.11 空行和空白字符也是一种特殊注释。<br> 2.12 一目了然的语句不加注释。<br> 2.13 注释的作用范围可以为：定义、引用、条件分支以及一段代码。<br> 2.14 注释行数（不包括程序头和函数头说明部份）应占总行数的 1/5 到 1/3<br> 2.15 常量定义（DEFINE）有相应说明。</p><h3 id="_3-结构化要求" tabindex="-1"><a class="header-anchor" href="#_3-结构化要求" aria-hidden="true">#</a> 3. 结构化要求</h3><p>3.1 禁止出现两条等价的支路。<br> 3.2 禁止GOTO语句。<br> 3.3 用 IF 语句来强调只执行两组语句中的一组。禁止 ELSE GOTO 和 ELSE RETURN。<br> 3.4 用 CASE 实现多路分支。<br> 3.5 避免从循环引出多个出口。<br> 3.6 函数只有一个出口。<br> 3.7 不使用条件赋值语句。<br> 3.8 避免不必要的分支。<br> 3.9 不要轻易用条件分支去替换逻辑表达式。</p><h3 id="_4-正确性与容错性要求" tabindex="-1"><a class="header-anchor" href="#_4-正确性与容错性要求" aria-hidden="true">#</a> 4. 正确性与容错性要求</h3><p>4.1 程序首先是正确，其次是优美<br> 4.2 无法证明你的程序没有错误，因此在编写完一段程序后，应先回头检查。<br> 4.3 改一个错误时可能产生新的错误，因此在修改前首先考虑对其它程序的影响。<br> 4.4 所有变量在调用前必须被初始化。<br> 4.5 对所有的用户输入，必须进行合法性检查。<br> 4.6 不要比较浮点数的相等，如： <code>10.0 * 0.1 == 1.0</code> ， 不可靠<br> 4.7 程序与环境或状态发生关系时，必须主动去处理发生的意外事件，如文件能否逻辑锁定、打印机是否联机等,对于明确的错误,要有明确的容错代码提示用户。<br> 4.8 单元测试也是编程的一部份，提交联调测试的程序必须通过单元测试。<br> 4.9 尽量使用规范的容错语句. 例如:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_5-可重用性要求" tabindex="-1"><a class="header-anchor" href="#_5-可重用性要求" aria-hidden="true">#</a> 5. 可重用性要求</h3><p>5.1 重复使用的完成相对独立功能的算法或代码应抽象为asp.net服务或类。<br> 5.2 asp.net服务或类应考虑OO思想，减少外界联系，考虑独立性或封装性。</p><h3 id="附-c-编程规范" tabindex="-1"><a class="header-anchor" href="#附-c-编程规范" aria-hidden="true">#</a> 附：C#编程规范</h3><h4 id="_1适用范围" tabindex="-1"><a class="header-anchor" href="#_1适用范围" aria-hidden="true">#</a> 1适用范围</h4><p>本标准适用于利用Visul C# ,其余语言作参考.。</p><h4 id="_2变量命名" tabindex="-1"><a class="header-anchor" href="#_2变量命名" aria-hidden="true">#</a> 2变量命名</h4><p>命名必须具有一定的实际意义,形式为<code>xAbcFgh</code>,x由变量类型确定,Abc、Fgh表示连续意义字符串,如果连续意义字符串仅两个,可都大写.如OK.具体例程:</p><table><thead><tr><th>前缀</th><th>类型</th><th>示例</th></tr></thead><tbody><tr><td>b</td><td>BOOL类型</td><td>bEnable;</td></tr><tr><td>sz</td><td>char</td><td>szText</td></tr><tr><td>sb</td><td>sbyte</td><td>sbText</td></tr><tr><td>bt</td><td>byte</td><td>btText</td></tr><tr><td>n</td><td>int</td><td>nText</td></tr><tr><td>ui</td><td>uint</td><td>uiText</td></tr><tr><td>l</td><td>long</td><td>lText</td></tr><tr><td>ul</td><td>ulong</td><td>ulText</td></tr><tr><td>f</td><td>float</td><td>fText</td></tr><tr><td>d</td><td>double</td><td>dText</td></tr><tr><td>b</td><td>bool</td><td>bText</td></tr><tr><td>de</td><td>decimal</td><td>deText</td></tr><tr><td>str</td><td>string</td><td>strText</td></tr><tr><td>x,y</td><td>坐标</td><td></td></tr><tr><td>att</td><td>表属性</td><td></td></tr><tr><td><code>m_</code></td><td>类成员变量</td><td><code>m_nVal</code>, <code>m_bFlag</code></td></tr><tr><td><code>s_</code></td><td>类静态成员变量</td><td><code>s_nVal</code>,<code>s_bFlag</code></td></tr></tbody></table><p>//不提议用全局变量,其于类的实例,尽量选取表示该类特性的字母,例如classText,class体现类的特性.</p><h4 id="_3常量命名和宏定义" tabindex="-1"><a class="header-anchor" href="#_3常量命名和宏定义" aria-hidden="true">#</a> 3常量命名和宏定义</h4><p>常量和宏定义必须具有一定的实际意义;</p><p>常量和宏定义在#include和函数定义之间;</p><p>常量和宏定义必须全部以大写字母来撰写,中间可根据意义的连续性用下划线连接,每一条定义的右侧必须有一简单的注释,说明其作用;</p><h4 id="_4资源名字定义格式-我对-net的资源还没有了解的多-只写几个" tabindex="-1"><a class="header-anchor" href="#_4资源名字定义格式-我对-net的资源还没有了解的多-只写几个" aria-hidden="true">#</a> 4资源名字定义格式(我对.NET的资源还没有了解的多),只写几个</h4><p>菜单:IDM_XX或者CM_XX<br> 位图:IDB_XX<br> 对话框:IDD_XX<br> 字符串:IDS_XX<br> DLGINIT:DIALOG_XX<br> ICON:IDR_XX</p><h4 id="_5函数命名和命名空间-类的命名-接口的命名" tabindex="-1"><a class="header-anchor" href="#_5函数命名和命名空间-类的命名-接口的命名" aria-hidden="true">#</a> 5函数命名和命名空间,类的命名,接口的命名</h4><p>函数原型说明包括引用外来函数及内部函数，外部引用必须在右侧注明函数来源： 模块名及文件名, 如是内部函数，只要注释其定义文件名;第一个字母必须使用大写字母,要求用大小写字母组合规范函数命名,必要时可用下划线间隔,示例如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> PrintTrackData <span class="token punctuation">(</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> ShowChar <span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token punctuation">,</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>事件函数的命名:</p><p><code>void EventH(object sd,Event e) //Event 表示事件响应的函数.</code></p><p>接口的命名</p><p>接口的命名一般都以’I’作为首字母,为了和类区分,例如:</p><p><code>interface IA</code></p><p>命名空间(例如 namespace A)和类的命名规则从原则上和函数命名相同.</p><h4 id="_6结构体命名" tabindex="-1"><a class="header-anchor" href="#_6结构体命名" aria-hidden="true">#</a> 6结构体命名</h4><p>结构体类型命名必须全部用大写字母,原则上前面以下划线开始;结构体变量命名必须用大小写字母组合，第一个字母必须使用大写字母,必要时可用下划线间隔。对于私有数据区，必须注明其所属的进程。全局数据定义只需注意其用途。</p><p>示例如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>typedef <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span> szProductName<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> szAuthor<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> szReleaseDate<span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> szVersion<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
    unsigned <span class="token class-name"><span class="token keyword">long</span></span> MaxTables<span class="token punctuation">;</span>
    unsigned <span class="token class-name"><span class="token keyword">long</span></span> UsedTables<span class="token punctuation">;</span>
<span class="token punctuation">}</span>DBS_DATABASE<span class="token punctuation">;</span>
<span class="token class-name">DBS_DATABASE</span> GdataBase<span class="token punctuation">;</span>
</code></pre></div><h4 id="_7-控件的命名" tabindex="-1"><a class="header-anchor" href="#_7-控件的命名" aria-hidden="true">#</a> 7 控件的命名</h4><p>C#控件规则为了和.net类库统一,分WindowsForm程序和Web程序(也许大家不是很习惯J).</p><ul><li><p>WindowsForm程序</p><p>用小写前缀表示类别</p><table><thead><tr><th>前缀</th><th>描述</th></tr></thead><tbody><tr><td>fm</td><td>窗口</td></tr><tr><td>cmd</td><td>按钮</td></tr><tr><td>cob combo</td><td>下拉式列表框</td></tr><tr><td>txt</td><td>文本输入框</td></tr><tr><td>lab labal</td><td>标签</td></tr><tr><td>img image</td><td>图象</td></tr><tr><td>pic picture</td><td></td></tr><tr><td>grd Grid</td><td>网格</td></tr><tr><td>scr</td><td>滚动条</td></tr><tr><td>lst</td><td>列表框</td></tr><tr><td>frm</td><td>fram</td></tr></tbody></table></li><li><p>Web程序</p><p>用大写前缀表示类别</p><table><thead><tr><th>前缀</th><th>描述</th></tr></thead><tbody><tr><td>Fm</td><td>窗口</td></tr><tr><td>Cmd</td><td>按钮</td></tr><tr><td>Cob combo</td><td>下拉式列表框</td></tr><tr><td>Txt</td><td>文本输入框</td></tr><tr><td>Lab labal</td><td>标签</td></tr><tr><td>Img image</td><td>图象</td></tr><tr><td>Pic picture</td><td></td></tr><tr><td>Grd Grid</td><td>网格</td></tr><tr><td>Scr</td><td>滚动条</td></tr><tr><td>Lst</td><td>列表框</td></tr><tr><td>Frm</td><td>fram</td></tr></tbody></table></li></ul><h4 id="_8注释" tabindex="-1"><a class="header-anchor" href="#_8注释" aria-hidden="true">#</a> 8注释</h4><ul><li>原则上注释要求使用中文;</li><li>文件开始注释内容包括:公司名称、版权、作者名称、时间、模块用途、背景介绍等,复杂的算法需要加上流程说明;</li><li>函数注释包括:输入、输出、函数描述、流程处理、全局变量、调用样例等,复杂的函数需要加上变量用途说明;</li><li>程序中注释包括:修改时间和作者、方便理解的注释等;</li></ul><p>引用一: 文件开头的注释模板</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/******************************************************************
** 文件名:
** Copyright (c) 1998-1999 *********公司技术开发部
** 创建人:
** 日 期:
** 修改人:
** 日 期:
** 描 述:
**
** 版 本:
**----------------------------------------------------------------------------
******************************************************************/</span>
</code></pre></div><p>引用二: 函数开头的注释模板</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*****************************************************************
** 函数名:
** 输 入: a,b,c
** a---
** b---
** c---
** 输 出: x---
** x 为 1, 表示...
** x 为 0, 表示...
** 功能描述:
** 全局变量:
** 调用模块:
** 作 者:
** 日 期:
** 修 改:
** 日 期:
** 版本
****************************************************************/</span>
</code></pre></div><p>引用三: 程序中的注释模板</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*----------------------------------------------------------*/</span>
<span class="token comment">/* 注释内容 */</span>
<span class="token comment">/*----------------------------------------------------------*/</span>
</code></pre></div><h4 id="_9-程序" tabindex="-1"><a class="header-anchor" href="#_9-程序" aria-hidden="true">#</a> 9 程序</h4><p>a. 程序编码力求简洁，结构清晰，避免太多的分支结构及太过于技巧性的程序，尽量不采用递归模式。<br> b. 编写程序时，亦必须想好测试的方法，换句话说，”单元测试” 的测试方案应在程序编写时一并拟好。<br> c. 注释一定要与程序一致。<br> d. 版本封存以后的修改一定要将老语句用<code>/* */</code> 封闭，不能自行删除或修改,并要在文件及函数的修改记录中加以记录。<br> e. 程序中每个block 的开头 ”{&quot; 及 &quot;}” 必须对齐，嵌套的block 每进一套，缩进一个tab，TAB 为4个空格,block类型包括if、for、while、do等关键字引出的。<br> f. 对于比较大的函数，每个block 和特殊的函数调用，都必须注明其功能.</p>`,83),c=[p];function o(d,l){return n(),s("div",null,c)}const i=a(e,[["render",o],["__file","cspcsg13.html.vue"]]);export{i as default};
