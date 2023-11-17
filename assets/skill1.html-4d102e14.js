import{_ as p,r as o,o as e,c,b as n,d as s,e as t,a as l}from"./app-a2b6e588.js";const u={},k=n("h1",{id:"提示与技巧",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#提示与技巧","aria-hidden":"true"},"#"),s(" 提示与技巧")],-1),r=n("div",{class:"language-txt","data-ext":"txt"},[n("pre",{class:"language-txt"},[n("code",null,`2002年1月21日
Eric Gunnerson
Microsoft Corporation
`)])],-1),i={href:"http://msdn.microsoft.com/library/en-us/dnsamples/iter.exe",target:"_blank",rel:"noopener noreferrer"},d={href:"http://msdn.microsoft.com/code/default.asp?url=/code/sample.asp?url=/msdn-files/026/002/667/msdncompositedoc.xml",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>在上一讲中，我们使用不安全代码进行了一些图像处理。在本专栏中，原本打算再花一些时间探讨一下不安全代码，但是现在我要做一些小小的改动。改动的原因有二：第一是我还没有着手编写代码；第二是因为我想回答几个常见问题，这样我就不用在别处花大量时间来回答这些问题了。下个月我们将继续讨论不安全代码 - 不过也不能完全肯定。</p><h2 id="windows-窗体和控制台窗口" tabindex="-1"><a class="header-anchor" href="#windows-窗体和控制台窗口" aria-hidden="true">#</a> Windows 窗体和控制台窗口</h2><p>下面回答一个问题，以此开始第一个主题：</p><p><strong>Windows 窗体项目和控制台应用程序项目之间有什么区别</strong>？</p><p>答案很简单。实际上唯一的区别就是控制台应用程序将输出结果发送到控制台窗口，而 Windows 窗体应用程序则不然。当然这只是在默认情况下。至于 Windows 窗体应用程序为什么不能有控制台窗口，则没有解释。</p><p>启用控制台窗口很容易。在 Microsoft Visual Studio? 中，用右键单击项目并选择 <strong>Properties</strong>（属性）。将输出类型从 <strong>Windows Application</strong>（Windows 应用程序）更改为 <strong>Console Application</strong>（控制台应用程序）；或者，在命令行中，使用 <code>/target:exe</code> 而不是 <code>/target:winexe</code>。</p><p>我发现这个方法在调试应用程序时非常有用，而且可以在任务结束后很容易地关闭控制台应用程序。</p><h2 id="intellisense、xml-文档和库" tabindex="-1"><a class="header-anchor" href="#intellisense、xml-文档和库" aria-hidden="true">#</a> IntelliSense、XML 文档和库</h2><p>用 C# 编写代码并使用 XML 文档功能时，Visual Studio IDE 自动在语句结束窗口中显示此信息。例如，如果编写以下代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Vector</span>
<span class="token punctuation">{</span>
   <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
   <span class="token doc-comment comment">/// 计算矢量长度</span>
   <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
   <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> Length
   <span class="token punctuation">{</span>
      <span class="token keyword">get</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">return</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Sqrt</span><span class="token punctuation">(</span>x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后将此类放入我的项目中，声明一个 Vector 变量 v，并键入以下代码：</p><p><code>double l = v.Length;</code></p><p>当键入句点 (.) 时，将出现一个弹出窗口，显示 Vector 的静态函数。如果突出显示 Length，将显示文本“计算矢量长度”以及函数原型。真的很不错。</p><p>我用过 Vector 类一段时间，发现它非常有用，因此决定将其放入一个单独的类库中，以便可以在多个项目中都能使用它。然后，可以将该类库作为一个引用添加到我的项目中。</p><p>不幸的是，这时，语句结束窗口却不再显示摘要文本。要恢复此功能，需要生成一个单独的归档文件。具体步骤是在项目属性中选择 Configuration Properties（配置属性），然后输入 XML 归档文件的文件名。选择的文件名应与类库的名称相同，只是扩展名为 .xml 而不是 .dll。另外，也可以在命令行编译器中使用 /doc 选项。</p><p>得到所需的 XML 文件后，将其置于程序集所在的位置，效果会非常好。这样做还会带来一个意想不到的好处，即编译器将进行检查以确保您已将类中的所有成员归档。</p><h2 id="改进-foreach" tabindex="-1"><a class="header-anchor" href="#改进-foreach" aria-hidden="true">#</a> 改进 Foreach</h2><p>我过去曾提到过，我使用 Perl 编写了大量代码。Perl 具有一些不错的、非常有用的内置列表操作。假如我要列出某个散列表的内容，可以编写如下代码：</p><div class="language-perl" data-ext="perl"><pre class="language-perl"><code><span class="token keyword">my</span> <span class="token variable">%animals</span><span class="token punctuation">;</span>

<span class="token variable">$animals</span><span class="token punctuation">{</span><span class="token string">&quot;狗&quot;</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token number">45</span><span class="token punctuation">;</span>
<span class="token variable">$animals</span><span class="token punctuation">{</span><span class="token string">&quot;猫&quot;</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token number">47</span><span class="token punctuation">;</span>
<span class="token variable">$animals</span><span class="token punctuation">{</span><span class="token string">&quot;土豚&quot;</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token variable">$animals</span><span class="token punctuation">{</span><span class="token string">&quot;鲸&quot;</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token keyword">my</span> <span class="token variable">$key</span> <span class="token punctuation">(</span>keys<span class="token punctuation">(</span><span class="token variable">%animals</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token keyword">print</span> <span class="token string">&quot;$key $animals{$key}\\n&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果用 C# 编写则非常简单。可以这样编写：</p><p><code>foreach (string s in animals.Keys)</code></p><p>运行该代码时，您会发现关键字是按随机顺序列出的。我希望它们能按字母顺序排列。在 Perl 中，您可以编写如下代码并使用内置 sort() 函数对关键字进行排序：</p><p><code>foreach my $key (sort(keys(%animals)))</code></p><p>在 C# 中，似乎没有什么简单的方法，所以我把关键字放到数组列表中，对其进行排序，然后在 Foreach 中使用数组列表。</p><h3 id="隔离" tabindex="-1"><a class="header-anchor" href="#隔离" aria-hidden="true">#</a> 隔离</h3><p>几个月后，我看到一个新闻组的帖子，说有人正考虑用 Foreach 循环从集合中删除项，这个用户想这样编写代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> key <span class="token keyword">in</span> hashtable<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span> <span class="token operator">=</span> hashtable<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      hashtable<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>此代码在运行时出现异常，因为不能在枚举集合的过程对集合进行修改。这是一个相当不错的主意，因为通常我们不希望别人未经允许就更改集合，但这有时也会令人讨厌。</p><p>这使我意识到应该创建一个类，将枚举与集合隔离开。此类将对集合进行完整的枚举，并将数据存储在适当的位置，以公开其自身的可枚举对象。这样，即使在使用对象时也可以更改集合。</p><p>为此，我编写了以下类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IterIsolate</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEnumerable</span></span>
<span class="token punctuation">{</span>
   <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">IterIsolateEnumerator</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEnumerator</span></span>
   <span class="token punctuation">{</span>
      <span class="token class-name">ArrayList</span> items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">int</span></span> currentItem<span class="token punctuation">;</span>

      <span class="token keyword">internal</span> <span class="token function">IterIsolateEnumerator</span><span class="token punctuation">(</span><span class="token class-name">IEnumerator</span> enumerator<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">while</span> <span class="token punctuation">(</span>enumerator<span class="token punctuation">.</span><span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
         <span class="token punctuation">{</span>
            items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>enumerator<span class="token punctuation">.</span>Current<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token class-name">IDisposable</span> disposable <span class="token operator">=</span> enumerator <span class="token keyword">as</span> <span class="token class-name">IDisposable</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span>disposable <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
         <span class="token punctuation">{</span>
            disposable<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         currentItem <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         currentItem <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         currentItem<span class="token operator">++</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span>currentItem <span class="token operator">==</span> items<span class="token punctuation">.</span>Count<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

         <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Current
      <span class="token punctuation">{</span>
         <span class="token keyword">get</span>
         <span class="token punctuation">{</span>
            <span class="token keyword">return</span> items<span class="token punctuation">[</span>currentItem<span class="token punctuation">]</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">public</span> <span class="token function">IterIsolate</span><span class="token punctuation">(</span><span class="token class-name">IEnumerable</span> enumerable<span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>enumerable <span class="token operator">=</span> enumerable<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">public</span> <span class="token return-type class-name">IEnumerator</span> <span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IterIsolateEnumerator</span><span class="token punctuation">(</span>enumerable<span class="token punctuation">.</span><span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token class-name">IEnumerable</span> enumerable<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个代码段中有两个类。使用 IterIsolate，我们可以将实现 IEnumerable 的代码传递到 foreach 语句中。它存储传递给函数构造器的所有 IEnumerable 对象, 并在调用它以进行枚举时返回一个 IterIsolateEnumerator 实例。</p><p>IterIsolateEnumerator 相当简单，它枚举集合中的所有项目，将其存储在 arraylist 中，并实现 IEnumerator。</p><p>有了这些类，我现在可以编写以下代码。以前是将 Keys 集合直接传递给 foreach，现在我利用集合创建一个新的 IterIsolate 对象，然后将其传递给 foreach。您会发现，这样就可以在 foreach 内修改散列表了。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IterIsolateTest</span>
<span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">{</span>
      <span class="token class-name">Hashtable</span> hash <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IterIsolate</span><span class="token punctuation">(</span>hash<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> hash<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            hash<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> hash<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
         Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;值：{0}&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码运行得相当不错，但是还要记住几个与性能有关的问题。本例中：</p><ol><li>必须创建 IterIsolate 和 IterIsolateEnumerator 类的实例。</li><li>原始集合中的所有项目都必须放到临时数组中，如果集合很大，可能会出现问题。</li><li>如果集合返回的值类型使用强制类型语句格式*，则需要进行额外的包装操作。</li><li>如果集合使用了强制类型语句格式，您将失去编译时类型安全性。</li></ol><p>* 在强制类型语句格式中，枚举器不再实现 IEnumerator 并获得类型对象的当前属性，当前属性即为集合中的实际类型。</p><p>如果这些情况都不是大问题，这种方法将非常有效。</p><p>几天后，我意识到可以将这一语句运用到其他操作中。Perl 支持的其他函数之一是 Reverse()，它可以反转列表的顺序。我编写了另一个名为 IterReverse 的迭代程序，其功能类似于 IterIsolate，所不同的是按相反顺序处理列表。这很有意思。</p><h2 id="排序散列表关键字" tabindex="-1"><a class="header-anchor" href="#排序散列表关键字" aria-hidden="true">#</a> 排序散列表关键字</h2><p>反向排序是比较简单的。如果由集合中的对象来实现 IComparable（而且，如果排序有意义，则应当如此），则只需修改 IterIsolate以便在填充数组列表后对其调用 Sort()。这真是太简单了，我现在可以编写如下代码（与 Perl 代码执行同样的操作）：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IterSort</span><span class="token punctuation">(</span>hash<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} = {1}&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">,</span> hash<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>为了使它更具灵活性，IterSort 类还可以采用 IComparer，这样可以在需要时指定不同的顺序。</p><h2 id="子列表迭代" tabindex="-1"><a class="header-anchor" href="#子列表迭代" aria-hidden="true">#</a> 子列表迭代</h2><p>有时，您可能希望在处理列表项时可以跳过一些不需要查看的项。使用 IterSubList 类可以实现这个目的。例如，使用下面的代码可以在处理测试集合时，跳过列表中的第一个元素和最后一个元素。</p><p><code>foreach (string s in new IterSubList(test, 1, 1))</code></p><h2 id="随机迭代" tabindex="-1"><a class="header-anchor" href="#随机迭代" aria-hidden="true">#</a> 随机迭代</h2><p>我曾编写过许多扑克牌游戏，在这些游戏中需要对扑克牌进行随机处理。这可以使用名为IterRandom 类来实现，该类可以按随机顺序调出集合中的项。</p><h2 id="散列表值" tabindex="-1"><a class="header-anchor" href="#散列表值" aria-hidden="true">#</a> 散列表值</h2><p>处理散列表中的数据时，很可能需要基于散列表中的值对项进行排序。这也许可以使用前面用过的 IComparable 方法来实现，但比较费事。我们需要的是这样一个类：具有一个可以查找并比较关键字中的散列表值的IComparable 的实现方案。</p><p>这可以通过再创建一个名为 SortHashValueItem 类来实现。为散列表中的每个关键字都创建此类的一个实例，并存储散列表关键字、散列表引用以及一个 IComparer 对象（如果有）。该类实现 IComparable，而CompareTo() 函数将比较转换成散列表或 IComparer 中的值。</p><p>使用这个迭代程序，现在可以完全实现我的想法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Hashtable</span> hash <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;狗&quot;</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;猫&quot;</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;土豚&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hash<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;鲸&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IterSortHashValue</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
   Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} = {1}&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">,</span> hash<span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>此代码将输出以下内容：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>鲸 = 0
土豚 = 3
狗 = 45
猫 = 46
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>虽然我不能确定我的这一想法是否为首创，但对这一方法仍然感到兴奋不已。如果您对迭代程序有其他看法，请给我写信。您可能已经知道可以通过编写以下代码将迭代程序连接起来：</p><p><code>foreach (string s in new IterReverse(new IterSort(new IterSubList(items, 1, 5))))</code></p><p>在最初的实现方案中，共计生成 3 个临时 ArrayList 对象，但在当前的版本中，这 3 个对象共享一个 ArrayList。</p><hr><p><strong>Eric Gunnerson</strong> 是 C# 编译器组的 QA 主管，C# 设计组的成员，还是 A Programmer&#39;s Introduction to C#（英文）的作者。他从事编程工作的时间很长，使用过 8 英寸磁盘，能熟练地使用磁带机设备。</p>`,62);function m(y,w){const a=o("ExternalLinkIcon");return e(),c("div",null,[k,r,n("p",null,[n("a",i,[s("下载代码示例 单击此处下载示例 - iter.exe"),t(a)]),s("。")]),n("p",null,[n("a",d,[s("从 MSDN Code Center 下载 iter.exe 示例文件"),t(a)]),s("（英文）。")]),h])}const b=p(u,[["render",m],["__file","skill1.html.vue"]]);export{b as default};
