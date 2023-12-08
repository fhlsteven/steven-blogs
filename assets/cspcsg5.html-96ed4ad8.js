import{_ as a,o as n,c as s,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="c-编码规范" tabindex="-1"><a class="header-anchor" href="#c-编码规范" aria-hidden="true">#</a> C#编码规范</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>编 写 人:     kkding
日    期:     2003-12-22
当前版本:     V 0.5
</code></pre></div><table><thead><tr><th>版本号</th><th>作者</th><th>日期</th><th>批准日期</th><th>标志</th><th>备注</th></tr></thead><tbody><tr><td>0.5</td><td>kkding</td><td>2003-12-22</td><td></td><td>C</td><td></td></tr></tbody></table><p><em>注:C－创建;　M－修改; D－删除; A－添加</em></p><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>1     目的.... 3
2     范围.... 3
3     规范内容.... 3
3.1       文件规范... 3
3.1.1       文件命名... 3
3.1.2       文件内容格式... 3
3.2       代码格式... 4
3.3       注释（Comment）规范... 5
3.3.1       模块（类）注释规范... 5
3.3.2       类属性注释规范... 6
3.3.3       方法注释规范... 6
3.3.4       代码间注释规范... 6
3.4       变量（Variable）命名规范... 6
3.4.1       程序文件(*.cs)中的变量命名规则... 6
3.4.2       控件命名规则... 8
3.4.3       常量命名规范... 9
3.4.4       类（Class）命名规范... 9
3.4.5       接口（Interface）命名规范... 10
3.4.6       方法（Method）命名规范... 10
3.4.7       命名空间（NameSpace）命名规范... 10
4     实施建议.... 10
</code></pre></div><h2 id="_1-目的" tabindex="-1"><a class="header-anchor" href="#_1-目的" aria-hidden="true">#</a> 1 目的</h2><p>为了保证企业编写出的程序都符合相同的规范，保证一致性、统一性而建立的程序编码规范。<br> 编码规范对于程序员而言尤为重要，有以下几个原因：</p><ul><li>一个软件的生命周期中，80%的花费在于维护</li><li>几乎没有任何一个软件，在其整个生命周期中，均由最初的开发人员来维护</li><li>编码规范可以改善软件的可读性，可以让程序员尽快而彻底地理解新的代码</li><li>如果你将源码作为产品发布，就需要确任它是否被很好的打包并且清晰无误，一如你已构建的其它任何产品</li></ul><p>为了执行规范，每个软件开发人员必须一致遵守编码规范。每个人。</p><h2 id="_2-范围" tabindex="-1"><a class="header-anchor" href="#_2-范围" aria-hidden="true">#</a> 2 范围</h2><p>适用于企业所有基于C#.NET平台的软件开发工作。</p><h2 id="_3-规范内容" tabindex="-1"><a class="header-anchor" href="#_3-规范内容" aria-hidden="true">#</a> 3 规范内容</h2><h3 id="_3-1-文件规范" tabindex="-1"><a class="header-anchor" href="#_3-1-文件规范" aria-hidden="true">#</a> 3.1 文件规范</h3><h4 id="_3-1-1-文件命名" tabindex="-1"><a class="header-anchor" href="#_3-1-1-文件命名" aria-hidden="true">#</a> 3.1.1 文件命名</h4><p>与类名名称相同</p><h3 id="_3-1-2-文件内容格式" tabindex="-1"><a class="header-anchor" href="#_3-1-2-文件内容格式" aria-hidden="true">#</a> 3.1.2 文件内容格式</h3><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>开头注释
引用
命名空间
类体
变量(代理事件)：用#region 变量………#endregion包括
属性：用#region属性………#endregion包括
构造：
方法(事件的实现)：用#region方法………#endregion包括
</code></pre></div><h3 id="_3-2-代码格式" tabindex="-1"><a class="header-anchor" href="#_3-2-代码格式" aria-hidden="true">#</a> 3.2 代码格式</h3><ul><li><p>所有的缩进为4个空格，以空格代替Tab 。选中”插入空格(P)”</p></li><li><p>在代码中垂直对齐左括号和右括号。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;用户编号必须输入！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//不允许以下情况：</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;用户编号必须输入！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//或者：</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>x<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span> Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;用户编号必须输入！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre></div></li><li><p>为了防止在阅读代码时不得不滚动源代码编辑器，每行代码或注释在1024*800的显示频率下不得超过一显示屏</p></li><li><p>当一行被分为几行时，通过将串联运算符放在每一行的末尾而不是开头，清楚地表示没有后面的行是不完整的。</p></li><li><p>每一行上放置的语句避免超过一条。</p></li><li><p>在大多数运算符之前和之后使用空格，这样做时不会改变代码的意图却可以使代码容易阅读。 例：<code>int j = i + k;</code>而不应写为<code>int j=i+k;</code></p></li><li><p>将大的复杂代码节分为较小的、易于理解的模块。</p></li><li><p>编写 SQL 语句时，对于关键字使用全部大写，对于数据库元素（如表、列和视图）使用大小写混合。</p></li><li><p>将每个主要的 SQL 子句放在不同的行上，这样更容易阅读和编辑语句，例如：</p><div class="language-sql" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> FirstName<span class="token punctuation">,</span> LastName
<span class="token keyword">FROM</span> Customers
<span class="token keyword">WHERE</span> State <span class="token operator">=</span> <span class="token string">&#39;WA&#39;</span>
</code></pre></div></li></ul><h3 id="_3-3-注释-comment-规范" tabindex="-1"><a class="header-anchor" href="#_3-3-注释-comment-规范" aria-hidden="true">#</a> 3.3 注释（Comment）规范</h3><p>注释规范包括：模块（类）注释规范、类的属性、方法注释规范、代码间注释</p><h4 id="_3-3-1-模块-类-注释规范" tabindex="-1"><a class="header-anchor" href="#_3-3-1-模块-类-注释规范" aria-hidden="true">#</a> 3.3.1 模块（类）注释规范</h4><p>模块开始必须以以下形式书写模块注释：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">///<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///定义某某类的方法</span>
<span class="token doc-comment comment">///<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>see</span> <span class="token attr-name">cref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Author<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>作者 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>see</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>see</span> <span class="token attr-name">cref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Email<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>email@e-citycard.com <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>see</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>see</span> <span class="token attr-name">cref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Data<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>2003-12-17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>see</span><span class="token punctuation">&gt;</span></span></span>
</code></pre></div><p>如果模块有修改，则每次修改必须添加以下注释：</p><p><code>///&lt;remark&gt;备注版本修改信息，修改了那些，时间，每次依次增加remark&lt;/remark&gt;</code></p><h4 id="_3-3-2-类属性注释规范" tabindex="-1"><a class="header-anchor" href="#_3-3-2-类属性注释规范" aria-hidden="true">#</a> 3.3.2 类属性注释规范</h4><p>在类的属性必须以以下格式编写属性注释：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">///属性说明</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
</code></pre></div><h4 id="_3-3-3-方法注释规范" tabindex="-1"><a class="header-anchor" href="#_3-3-3-方法注释规范" aria-hidden="true">#</a> 3.3.3 方法注释规范</h4><p>在类的方法声明前必须以以下格式编写注释</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 说明：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>对该方法的说明</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>&lt;参数名称&gt;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>参数说明</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span> /<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>对方法返回值的说明，该说明必须明确说明返回的值代表什么含义</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
</code></pre></div><h4 id="_3-3-4-代码间注释规范" tabindex="-1"><a class="header-anchor" href="#_3-3-4-代码间注释规范" aria-hidden="true">#</a> 3.3.4 代码间注释规范</h4><p>代码间注释分为单行注释和多行注释：</p><p>单行注释：<br><code>//&lt;单行注释&gt;</code></p><p>多行注释：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>/*多行注释1
多行注释2
多行注释3*/
</code></pre></div><p>代码中遇到语句块时必须添加注释（if,for,foreach,……）,添加的注释必须能够说明此语句块的作用和实现手段（所用算法等等）。</p><h3 id="_3-4-变量-variable-命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-变量-variable-命名规范" aria-hidden="true">#</a> 3.4 变量（Variable）命名规范</h3><h4 id="_3-4-1-程序文件-cs-中的变量命名规则" tabindex="-1"><a class="header-anchor" href="#_3-4-1-程序文件-cs-中的变量命名规则" aria-hidden="true">#</a> 3.4.1 程序文件(*.cs)中的变量命名规则</h4><p>程序中变量名称 = 变量的前缀 +代表变量含意的英文单词或单词缩写。</p><ol><li><p>类模块级的变量类型的缩写作前缀</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">hello</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> s_Name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">DateTime</span> dt_Date<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>类的属性所对应的变量，采用属性名前加类型的缩写作前缀前缀的形式</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">hello</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> s_Name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> m_Name<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>过程级的变量不使用前缀</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">hello</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> SayWord<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>过程的参数使用“p_”作为参数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">hello</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> p_SayWord<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>补充说明：<br> 针对异常捕获过程中的Exception变量命名，在没有冲突的情况下，统一命名为e；<br> 如果有冲突的情况下，可以重复e，比如：ee。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">//your code</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//code</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> ee<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//your code</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//your code</span>
<span class="token punctuation">}</span>
</code></pre></div><p>补充：如果捕获异常不需要作任何处理，则不需要定义Exception实例,例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token comment">//your code</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span> <span class="token class-name">Exception</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>鉴于大多数名称都是通过连接若干单词构造的，请使用大小写混合的格式以简化它们的阅读。每个单词的第一个字母都是大写.</p></li><li><p>即使对于可能仅出现在几个代码行中的生存期很短的变量，仍然使用有意义的名称。仅对于短循环索引使用单字母变量名，如 i 或 j。</p></li><li><p>在变量名中使用互补对，如 min/max、begin/end 和 open/close。</p></li><li><p>不要使用原义数字或原义字符串，如 <code>for( i = 1,i&lt; 7;i++)</code>。而是使用命名常数，如 <code>for( i = 1,i&lt; NUM_DAYS_IN_WEEK ; i++)</code> 以便于维护和理解。</p></li></ol><h4 id="_3-4-2-控件命名规则" tabindex="-1"><a class="header-anchor" href="#_3-4-2-控件命名规则" aria-hidden="true">#</a> 3.4.2 控件命名规则</h4><p>控件命名=Web控件缩写前缀 + “_” +变量名</p><table><thead><tr><th>控件</th><th>缩写</th></tr></thead><tbody><tr><td>Label</td><td>lbl</td></tr><tr><td>TextBox</td><td>txt</td></tr><tr><td>CheckBox</td><td>chk</td></tr><tr><td>Button</td><td>btn</td></tr><tr><td>ListBox</td><td>lst</td></tr><tr><td>DropDownList</td><td>drp</td></tr></tbody></table><p>等等</p><h4 id="_3-4-3-常量命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-3-常量命名规范" aria-hidden="true">#</a> 3.4.3 常量命名规范</h4><p>常量名也应当有一定的意义，格式为 NOUN 或 NOUN_VERB。常量名均为大写，字之间用下划线分隔。例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">bool</span></span>   WEB_ENABLEPAGECACHE_DEFAULT           <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span>    WEB_PAGECACHEEXPIRESINSECONDS_DEFAULT <span class="token operator">=</span> <span class="token number">3600</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">bool</span></span>   WEB_ENABLESSL_DEFAULT                 <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre></div><p>注：<br> 变量名和常量名最多可以包含 255 个字符，但是，超过 25 到 30 个字符的名称比较笨拙。此外，要想取一个有实际意义的名称，清楚地表达变量或常量的用途，25 或 30 个字符应当足够了。</p><h4 id="_3-4-4-类-class-命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-4-类-class-命名规范" aria-hidden="true">#</a> 3.4.4 类（Class）命名规范</h4><ol><li><p>名字应该能够标识事物的特性。</p></li><li><p>名字尽量不使用缩写，除非它是众所周知的。</p></li><li><p>名字可以有两个或三个单词组成，但通常不应多于三个。</p></li><li><p>在名字中，所有单词第一个字母大写，缩写都要大写。 例如 IsSuperUser，包含ID的，ID全部大写，如CustomerID。</p></li><li><p>使用名词或名词短语命名类。</p></li><li><p>少用缩写。</p></li><li><p>不要使用下划线字符 (_)。<br> 例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileStream</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Button</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">String</span>
</code></pre></div></li></ol><h4 id="_3-4-5-接口-interface-命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-5-接口-interface-命名规范" aria-hidden="true">#</a> 3.4.5 接口（Interface）命名规范</h4><p>和类命名规范相同，唯一区别是 接口在名字前加上“I”前缀</p><p>例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IDBCommand</span><span class="token punctuation">;</span>
<span class="token keyword">interface</span> <span class="token class-name">IButton</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="_3-4-6-方法-method-命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-6-方法-method-命名规范" aria-hidden="true">#</a> 3.4.6 方法（Method）命名规范</h4><p>和类命名规范相同。<br> 另：方法开头尽量使用e文动词表示，<br> 如：GetMoney , SetMoney</p><h4 id="_3-4-7-命名空间-namespace-命名规范" tabindex="-1"><a class="header-anchor" href="#_3-4-7-命名空间-namespace-命名规范" aria-hidden="true">#</a> 3.4.7 命名空间（NameSpace）命名规范</h4><p>和类命名规范相同。</p><h2 id="_4-实施建议" tabindex="-1"><a class="header-anchor" href="#_4-实施建议" aria-hidden="true">#</a> 4 实施建议</h2><ul><li>先对编码人员进行“专题”培训，让他们掌握此编码规则。</li><li>系统设计人员、编码人员、测试人员可以较好的建议，适当地修改完善《C#编码规范》</li><li>对本文档修改要做出记录，变更版本号。</li></ul><hr><p>计算机世界开发者俱乐部 http://www.dev-club.com</p>`,65),c=[e];function o(l,i){return n(),s("div",null,c)}const u=a(p,[["render",o],["__file","cspcsg5.html.vue"]]);export{u as default};
