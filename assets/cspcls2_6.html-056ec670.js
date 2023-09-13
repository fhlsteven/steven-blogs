import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="第六章-控制语句" tabindex="-1"><a class="header-anchor" href="#第六章-控制语句" aria-hidden="true">#</a> 第六章 控制语句</h1><p>有一种语句，你在每种编程语言控制流程语句中都可以找到。在这一章中，我介绍了C#的控制语句，它们分为两个主要部分：</p><ul><li>选择语句</li><li>循环语句</li></ul><p>如果你是C或C++程序员，很多信息会让你感到似曾相似；但是，你必须知道它们还存在着一些差别。</p><h2 id="_6-1-选择语句" tabindex="-1"><a class="header-anchor" href="#_6-1-选择语句" aria-hidden="true">#</a> 6.1 选择语句</h2><p>当运用选择语句时，你定义了一个控制语句，它的值控制了哪个语句被执行。在C#中用到两个选择语句：</p><ul><li><code>if</code> 语句</li><li><code>switch</code> 语句</li></ul><h3 id="_6-1-1-if-语句" tabindex="-1"><a class="header-anchor" href="#_6-1-1-if-语句" aria-hidden="true">#</a> 6.1.1 <code>if</code> 语句</h3><p>最先且最常用到的语句是 <code>if</code> 语句。内含语句是否被执行取决于布尔表达式：</p><p><code>if (布尔表达式) 内含语句</code></p><p>当然，也可以有<code>else</code>分枝，当布尔表达式的值为假时，该分枝就被执行：</p><p><code>if (布尔表达式) 内含语句 else 内含语句</code></p><p>在执行某些语句之前就检查一个非零长字符串的例子：</p><p><code>if (0 != strTest.Length){ }</code></p><p>这是一个布尔表达式。（!=表示不等于。） 但是，如果你来自C或者C++，可能会习惯于编写象这样的代码：</p><p><code>if (strTest.Length){}</code></p><p>这在C#中不再工作，因为 <code>if</code> 语句仅允许布尔（bool） 数据类型的结果，而字符串的Length属性对象返回一个整形（integer）。编译器将出现以下错误信息：</p><p><code>error CS0029: Cannot implicitly convert type &#39;int&#39; to &#39;bool&#39;</code><br>（不能隐式地转换类型 &#39;int&#39; 为 &#39;bool&#39;。）</p><p>上边是你必须改变的习惯，而下边将不会再在 <code>if</code> 语句中出现赋值错误：</p><p><code>if (nMyValue = 5) ...</code></p><p>正确的代码应为</p><p><code>if (nMyValue == 5) ...</code></p><p>因为相等比较由<code>==</code>实行，就象在C和C++中一样。看以下有用的对比操作符（但并不是所有的数据类型都有效）：</p><ul><li><code>==</code> ——如果两个值相同，返回真。</li><li><code>!=</code> ——如果两个值不同，返回假。</li><li><code>&lt;</code>,<code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code> —— 如果满足了关系（小于、小于或等于、大于、大于或等于），返回真。</li></ul><p>每个操作符是通过重载操作符被执行的，而且这种执行对数据类型有规定。如果你比较两个不同的类型，对于编译器，必须存在着一个隐式的转换，以便自动地创建必要的代码。但是，你可以执行一个显式的类型转换。</p><p>清单 6.1 中的代码演示了 <code>if</code> 语句的一些不同的使用场合，同时也演示了如何使用字符串数据类型。这个程序的主要思想是，确定传递给应用程序的第一个参数是否以大写字母、小写字母或者数字开始。</p><p>清单 6.1 确定字符的形态</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">NestedIfApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Usage: one argument&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// error level</span>
        <span class="token punctuation">}</span>

        <span class="token class-name"><span class="token keyword">char</span></span> chLetter <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>chLetter <span class="token operator">&gt;=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>chLetter <span class="token operator">&lt;=</span> <span class="token char">&#39;Z&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} is uppercase&quot;</span><span class="token punctuation">,</span> chLetter<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        
        chLetter <span class="token operator">=</span> Char<span class="token punctuation">.</span><span class="token function">FromString</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>chLetter <span class="token operator">&gt;=</span> <span class="token char">&#39;a&#39;</span> <span class="token operator">&amp;&amp;</span> chLetter <span class="token operator">&lt;=</span> <span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} is lowercase&quot;</span><span class="token punctuation">,</span> chLetter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsDigit</span><span class="token punctuation">(</span><span class="token punctuation">(</span>chLetter <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} is a digit&quot;</span><span class="token punctuation">,</span> chLetter<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>始于第7行的第一个 <code>if</code> 语段检测参数数组是否只有一个字符串。如果不满足条件，程序就在屏幕上显示用法信息，并终止运行。</p><p>可以采取多种方法从一个字符串中提取出单个字符——既可象第13行那样利用字符索引，也可以使用<code>Char</code>类的静态 <code>FromString</code> 方法，它返回字符串的第一个字符。</p><p>第16～20行的 <code>if</code> 语句块使用一个嵌套 的<code>if</code> 语句块检查大写字母。用逻辑“与”操作符（&amp;&amp;）可以胜任小写字母的检测，而最后通过使用<code>Char</code>类的静态函数<code>IsDigit</code>，就可以完成对数字的检测。</p><p>除了“&amp;&amp;”操作符之外，还有另一个条件逻辑操作符，它就是代表“或”的“||”。两个逻辑操作符都 是“短路”式的。对于“&amp;&amp;”操作符，意味着如果条件“与”表达式的第一个结果返回一个假值，余下的条件“与”表达式就不会再被求值了。相对应，“||”操作符当第一个真条件满足时，它就“短路”了。</p><p>我想让大家理解的是，要减少计算时间，你应该把最有可能使求值“短路”的表达式放在前面。同样你应该清楚，计算 <code>if</code> 语句中的某些值会存在着替在的危险。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">==</span> <span class="token punctuation">(</span>strLength<span class="token operator">=</span>str<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当然，这是一个极其夸张的例子，但它说明了这样的观点：第一条语句求值为真，那么第二条语句就不会被执行，它使变量<code>strLength</code>维持原值。给大家一个忠告：决不要在具有条件逻辑操作符的 <code>if</code> 语句中赋值。</p><h3 id="_6-1-2-switch-语句" tabindex="-1"><a class="header-anchor" href="#_6-1-2-switch-语句" aria-hidden="true">#</a> 6.1.2 switch 语句</h3><p>和 if 语句相比，<code>switch</code>语句有一个控制表达式，而且内含语句按它们所关联的控制表达式的常量运行。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>switch (控制表达式)
{
    case 常量表达式:
        内含语句
    default:
        内含语句
}
</code></pre></div><p>控制表达式所允许的数据类型 为： sbyte, byte, short, ushort, uint, long, ulong, char, string, 或者枚举类型。只要使其它不同数据类型能隐式转换成上述的任何类型，用它作为控制表达式也很不错。</p><p><code>switch</code> 语句接以下顺序执行：</p><ol><li>控制表达式求值</li><li>如果 case 标签后的常量表达式符合控制语句所求出的值，内含语句被执行。</li><li>如果没有常量表达式符合控制语句，在default 标签内的内含语句被执行。</li><li>如果没有一个符合case 标签，且没有default 标签，控制转向switch 语段的结束端。</li></ol><p>在继续更详细地探讨switch语句之前，请看清单 6.2 ，它演示用 switch语句来显示一个月的天数（忽略跨年度）</p><p>清单 6.2 使用switch语句显示一个月的天数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">FallThrough</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">int</span></span> nMonth <span class="token operator">=</span> Int32<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nMonth <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> nMonth <span class="token operator">&gt;</span> <span class="token number">12</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nDays <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span>nMonth<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span> nDays <span class="token operator">=</span> <span class="token number">28</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
            <span class="token keyword">case</span> <span class="token number">6</span><span class="token punctuation">:</span>
            <span class="token keyword">case</span> <span class="token number">9</span><span class="token punctuation">:</span>
            <span class="token keyword">case</span> <span class="token number">11</span><span class="token punctuation">:</span> nDays <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span> nDays <span class="token operator">=</span> <span class="token number">31</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} days in this month&quot;</span><span class="token punctuation">,</span> nDays<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>switch</code> 语段包含于第13~21行。对于C程序员，这看起来非常相似，因为它不使用<code>break</code>语句。因此，存在着一个更具生命力的重要差别。你必须加上一个<code>break</code>语句（或一个不同的跳转语句），因为编译器会提醒，不允许直达下一部分。</p><p>何谓直达？在C（和C++）中，忽略<code>break</code>并且按以下编写代码是完全合法的：</p><div class="language-c" data-ext="c"><pre class="language-c"><code>nVar <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>nVar<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
        <span class="token function">DoMore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个例子中，在执行了第一个<code>case</code>语句的代码后，将直接执行到其它<code>case</code>标签的代码，直到一个<code>break</code>语句退出<code>switch</code>语段为止。尽管有时这是一个强大的功能，但它更经常地产生难于发现的缺陷。</p><p>可如果你想执行其它case标签的代码，那怎么办？ 有一种办法，它显示于清单6.3中。</p><p>清单 6.3　在swtich语句中使用 goto 标签　和 goto default</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">SwitchApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Random</span> objRandom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dRndNumber <span class="token operator">=</span> objRandom<span class="token punctuation">.</span><span class="token function">NextDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nRndNumber <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>dRndNumber <span class="token operator">*</span> <span class="token number">10.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span>nRndNumber<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
                <span class="token comment">//什么也不做</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
                <span class="token keyword">goto</span> <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">3</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Handler for 2 and 3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">4</span><span class="token punctuation">:</span>
                <span class="token keyword">goto</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
            <span class="token comment">// everything beyond a goto will be warned as</span>
            <span class="token comment">// unreachable code</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Random number {0}&quot;</span><span class="token punctuation">,</span> nRndNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个例子中，通过Random类产生用于控制表达式的值（第７～９行）。<code>switch</code>语段包含两个对<code>switch</code>语句有效的跳转语句。</p><ul><li><code>goto case</code> 　标签：跳转到所说明的标签</li><li><code>goto default:</code> 跳转到 default　标签</li></ul><p>有了这两个跳转语句，你可以创建同Ｃ一样的功能，但是，直达不再是自动的。你必须明确地请求它。</p><p>不再使用直达功能的更深的含义为：你可任意排列标签，如把default标签放在其它所有标签的前面。为了说明它，我创建了一个例子，故意不结束循环：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>nSomething<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
        <span class="token keyword">goto</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我已经保留了其中一个<code>switch</code> 语句功能的讨论直至结束——事实上你可以使用字符串作为常量表达式。这对于VB程序员，可能听起来不象是什么大的新闻，但来自Ｃ或Ｃ++的程序员将会喜欢这个新功能。</p><p>现在，一个 <code>switch</code> 语句可以如以下所示检查字符串常量了。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> strTest <span class="token operator">=</span> <span class="token string">&quot;Chris&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>strTest<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;Chris&quot;</span><span class="token punctuation">:</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Chris!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="_6-2-循环语句" tabindex="-1"><a class="header-anchor" href="#_6-2-循环语句" aria-hidden="true">#</a> 6.2 循环语句</h2><p>当你想重复执行某些语句或语段时，依据当前不同的任务，Ｃ＃提供４个不同的循环语句选择给你使用：</p><ul><li><code>for</code> 语句</li><li><code>foreach</code> 语句</li><li><code>while</code> 语句</li><li><code>do</code> 语句</li></ul><h3 id="_6-2-1-for-语句" tabindex="-1"><a class="header-anchor" href="#_6-2-1-for-语句" aria-hidden="true">#</a> 6.2.1 for 语句</h3><p>当你预先知道一个内含语句应要执行多少次时，<code>for</code> 语句特别有用。当条件为真时，常规语法允许重复地执行内含语句（和循环表达式）：</p><p><code>for (初始化;条件;循环) 内含语句</code></p><p>请注意，初始化、条件和循环都是可选的。如果忽略了条件，你就可以产生一个死循环，要用到跳转语句（break 或goto）才能退出。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">// 由于某些原因</span>
<span class="token punctuation">}</span>
</code></pre></div><p>另外一个重点是，你可以同时加入多条由逗号隔开的语句到for循环的所有三个参数。例如，你可以初始化两个变量、拥有三个条件语句，并重复4个变量。</p><p>作为C或C++程序员，你必须了解仅有的一个变化：条件语句必须为布尔表达式，就象 if 语句一样。</p><p>清单6.4 包含使用 for 语句的一个例子。它显示了如何计算一个阶乘，比使用递归函数调用还要快。</p><p>清单 6.4 在for 循环里计算一个阶乘</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Factorial</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nFactorial <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">long</span></span> nComputeTo <span class="token operator">=</span> Int64<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">long</span></span> nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>nCurDig <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span> nCurDig<span class="token operator">++</span><span class="token punctuation">)</span>
            nFactorial <span class="token operator">*=</span> nCurDig<span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}! is {1}&quot;</span><span class="token punctuation">,</span> nComputeTo<span class="token punctuation">,</span> nFactorial<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>尽管该例子过于拖沓，但它作为如何使用<code>for</code>语句的一个开端。首先，我本应在初始化内部声明变量<code>nCurDig</code>：</p><p><code>for (long nCurDig=1;nCurDig &lt;= nComputeTo; nCurDig++) nFactorial *= nCurDig;</code></p><p>另一种忽略初始化的选择如下行，因为第10行在<code>for</code>语句的外部初始化了变量。（记住C#需要初始化变量）：</p><p><code>for (;nCurDig &lt;= nComputeTo; nCurDig++) nFactorial *= nCurDig;</code></p><p>另一种改变是把<code>++</code>操作符移到内含语句中：</p><p><code>for ( ;nCurDig &lt;= nComputeTo; ) nFactorial *= nCurDig++;</code></p><p>如果我也想摆脱条件语句，全部要做的是增加一条<code>if</code>语句，用<code>break</code> 语句中止循环：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nCurDig <span class="token operator">&gt;</span> nComputeTo<span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    nFactorial <span class="token operator">*=</span> nCurDig<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>除了用于退出for语句的break语句外，你还可以用continue 跳过当前循环，并继续下一次循环。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span>nCurDig <span class="token operator">&lt;=</span> nComputeTo<span class="token punctuation">;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">==</span> nCurDig<span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span> <span class="token comment">// 这行跳过了余下的代码</span>
    nFactorial <span class="token operator">*=</span> nCurDig<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_6-2-2-foreach-语句" tabindex="-1"><a class="header-anchor" href="#_6-2-2-foreach-语句" aria-hidden="true">#</a> 6.2.2 foreach 语句</h3><p>已经在Visual Basic 语言中存在了很久的一个功能是，通过使用For Each 语句收集枚举。C#通过foreach 语句，也有一个用来收集枚举的命令：</p><p><code>foreach(表达式中的类型标识符） 内含语句</code></p><p>循环变量由类型和标识符声明，且表达式与收集相对应。循环变量代表循环正在为之运行的收集元素。</p><p>你应该知道不能赋一个新值给循环变量，也不能把它当作<code>ref</code> 或<code>out</code> 参数。这样引用在内含语句中被执行的代码。</p><p>你如何说出某些类支持<code>foreach</code> 语句？ 简而言之，类必须支持具有 <code>GetEnumerator()</code>名字的方法，而且由其所返回的结构、类或者接口必须具有<code>public</code> 方法<code>MoveNext()</code> 和<code>public</code> 属性<code>Current</code>。如果你想知道更多，请阅读语言参考手册，它有很多关于这个话题的详细内容。</p><p>对于清单 6.5 中的例子，我恰好偶然选了一个类，实现了所有这些需要。我用它来列举被定义过的所有的环境变量。</p><p>清单 6.5 读所有的环境变量</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">EnvironmentDumpApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">IDictionary</span> envvars <span class="token operator">=</span> Environment<span class="token punctuation">.</span><span class="token function">GetEnvironmentVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;There are {0} environment variables declared&quot;</span><span class="token punctuation">,</span> envvars<span class="token punctuation">.</span>Keys<span class="token punctuation">.</span>Count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">String</span> strKey <span class="token keyword">in</span> envvars<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} = {1}&quot;</span><span class="token punctuation">,</span> strKey<span class="token punctuation">,</span> envvars<span class="token punctuation">[</span>strKey<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对<code>GetEnvironmentVariables</code>的调用返回一个<code>IDictionary</code>类型接口，它是由.NET框架中的许多类实现了的字典接口。通过 <code>IDictionary</code> 接口，可以访问两个收集：<code>Keys</code> 和 <code>Values</code>。在这个例子里，我在foreach语句中使用Keys，接着查找基于当前key值的值（第12行）。</p><p>当使用foreach时，只要注意一个问题：当确定循环变量的类型时，应该格外小心。选择错误的类型并没有受到编译器的检测，但它会在运行时受检测，且会引发一个异常。</p><h3 id="_6-2-3-while-语句" tabindex="-1"><a class="header-anchor" href="#_6-2-3-while-语句" aria-hidden="true">#</a> 6.2.3 while 语句</h3><p>当你想执行一个内含语句0次或更多次时，while语句正是你所盼望的：</p><p><code>while (条件) 内含语句</code></p><p>条件语句——它也是一个布尔表达式 ——控制内含语句被执行的次数。你可以使用 break 和continue语句来控制while语句中的执行语句，它的运行方式同在for语句中的完全相同。</p><p>为了举例while的用法，清单 6.6 说明如何使用一个 StreamReader类输出C#源文件到屏幕。</p><p>清单 6.6 显示一个文件的内容</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">WhileDemoApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token string">&quot;whilesample.cs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> strLine <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> <span class="token punctuation">(</span>strLine <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        sr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码打开文件 <code>whilesample.cs</code>, 接着当<code>ReadLine</code> 方法返回一个不等于<code>null</code>的值时，就在屏幕上显示所读取的值。注意，我在while条件语句中用到一个赋值。如果有更多的用<code>&amp;&amp;</code>和<code>||</code>连接起来的条件语句，我不能保证它们是否会被执行，因为存在着“短路”的可能。</p><h3 id="_6-2-4-do-语句" tabindex="-1"><a class="header-anchor" href="#_6-2-4-do-语句" aria-hidden="true">#</a> 6.2.4 do 语句</h3><p>C#最后可利用的循环语句是do语句。它与while语句十分相似，仅当经过最初的循环之后，条件才被验证。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">do</span>
<span class="token punctuation">{</span>
    内含语句
<span class="token punctuation">}</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>条件<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>do语句保证内含语句至少被执行过一次，而且只要条件求值等于真，它们继续被执行。通过使用break语句，你可以迫使运行退出 do 语块。如果你想跳过这一次循环，使用continue语句。</p><p>一个如何使用do语句的例子显示在清单 6.7中。它向用户请求一个或多个数字，并且当执行程序退出do循环后计算平均值。</p><p>清单 6.7 在do 循环中计算平均值</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ComputeAverageApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">ComputeAverageApp</span> theApp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ComputeAverageApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        theApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">double</span></span> dSum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nNoOfValues <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">char</span></span> chContinue <span class="token operator">=</span> <span class="token char">&#39;y&#39;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strInput<span class="token punctuation">;</span>

        <span class="token keyword">do</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Enter a value: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            strInput <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dValue <span class="token operator">=</span> Double<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>strInput<span class="token punctuation">)</span><span class="token punctuation">;</span>
            dSum <span class="token operator">+=</span> dValue<span class="token punctuation">;</span>
            nNoOfValues<span class="token operator">++</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Read another value?&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            strInput <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            chContinue <span class="token operator">=</span> Char<span class="token punctuation">.</span><span class="token function">FromString</span><span class="token punctuation">(</span>strInput<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token char">&#39;y&#39;</span> <span class="token operator">==</span> chContinue<span class="token punctuation">)</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The average is {0}&quot;</span><span class="token punctuation">,</span> dSum <span class="token operator">/</span> nNoOfValues<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个例子里，我在静态 Main函数中实例化 <code>ComputeAverageApp</code>类型的一个对象。它同样接着调用实例的Run方法，该方法包含了计算平均值所有必要的功能。</p><p>do 循环跨越第19~31行。条件是这样设定的：分别回答各个问题 “y”，以决定是否要增加另一个值。输入任何其它字符会引起程序退出 do语块，且平均值被计算。</p><p>正如你可以从提到的例子看出，do语句和while语句差别不太大——仅有的差别就是条件在什么时候被求值。</p><h2 id="_6-3-小结" tabindex="-1"><a class="header-anchor" href="#_6-3-小结" aria-hidden="true">#</a> 6.3 小结</h2><p>这章解释了如何使用C#中用到的各种选择和循环语句。 if 语句在应用程序中可能是最为常用的语句。当在布尔表达式中使用计算时，编译器会为你留意。但是，你一定要确保条件语句的短路不会阻止必要代码的运行。</p><p><code>switch</code> 语句——尽管同样与C语言的相应部分相似——但也被改善了。直达不再被支持，而且你可以使用字符串标签，对于C程序员，这是一种新的用法。</p><p>在这一章的最后部分，我说明如何使用<code>for</code>、<code>foreach</code>、<code>while</code>和<code>do</code>语句。语句完成各种需要，包括执行固定次数的循环、列举收集元素和执行基于某些条件的任意次数的语句。</p>`,115),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspcls2_6.html.vue"]]);export{i as default};
