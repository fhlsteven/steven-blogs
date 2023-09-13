import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},e=p(`<h1 id="全面剖析c-接口编程之定义接口-1" tabindex="-1"><a class="header-anchor" href="#全面剖析c-接口编程之定义接口-1" aria-hidden="true">#</a> 全面剖析C#接口编程之定义接口(1)</h1><p>作者：黎宇 本文选自：赛迪网 2003年03月11日</p><p>从技术上讲，接口是一组包含了函数型方法的数据结构。通过这组数据结构，客户代码可以调用组件对象的功能。</p><p>定义接口的一般形式为： <code>[attributes] [modifiers] interface identifier [:base-list] {interface-body}[;]</code></p><p>说明：</p><ul><li><code>attributes</code>（可选）：附加的定义性信息。</li><li><code>modifiers</code>（可选）：允许使用的修饰符有<code>new</code>和四个访问修饰符。分别是：<code>new</code>、<code>public</code>、<code>protected</code>、<code>internal</code>、<code>private</code>。在一个接口定义中同一修饰符不允许出现多次，<code>new</code>修饰符只能出现在嵌套接口中，表示覆盖了继承而来的同名成员。The public, protected, internal, and private修饰符定义了对接口的访问权限。</li><li>指示器和事件。</li><li><code>identifier</code>：接口名称。</li><li><code>base-list</code>（可选）:包含一个或多个显式基接口的列表，接口间由逗号分隔。</li><li><code>interface-body</code>：对接口成员的定义。</li><li>接口可以是命名空间或类的成员，并且可以包含下列成员的签名： 方法、属性、索引器 。</li><li>一个接口可从一个或多个基接口继承。</li></ul><p>接口这个概念在C#和Java中非常相似。接口的关键词是<code>interface</code>，一个接口可以扩展一个或者多个其他接口。按照惯例，接口的名字以大写字母&quot;I&quot;开头。下面的代码是C#接口的一个例子，它与Java中的接口完全一样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IShape</span>  <span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> Draw <span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果你从两个或者两个以上的接口派生，父接口的名字列表用逗号分隔，如下面的代码所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">INewInterface</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IParent1</span><span class="token punctuation">,</span> <span class="token class-name">IParent2</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre></div><p>然而，与Java不同，C#中的接口不能包含域（Field）。另外还要注意，在C#中，接口内的所有方法默认都是公用方法。在Java中，方法定义可以带有public修饰符（即使这并非必要），但在C#中，显式为接口的方法指定public修饰符是非法的。例如，下面的C#接口将产生一个编译错误。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IShape</span> <span class="token punctuation">{</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Draw</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div><p>下面的例子定义了一个名为<code>IControl</code>的接口，接口中包含一个成员方法<code>Paint</code>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IControl</span> <span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在下例中，接口<code>IInterface</code>从两个基接口 <code>IBase1</code> 和 <code>IBase2</code> 继承：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IInterface</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IBase1</span><span class="token punctuation">,</span> <span class="token class-name">IBase2</span></span> <span class="token punctuation">{</span>
   <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method1</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
   <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Method2</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接口可由类实现。实现的接口的标识符出现在类的基列表中。例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Class1</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Iface1</span><span class="token punctuation">,</span> <span class="token class-name">Iface2</span></span> <span class="token punctuation">{</span>
   <span class="token comment">// class 成员。</span>
<span class="token punctuation">}</span>
</code></pre></div><p>类的基列表同时包含基类和接口时，列表中首先出现的是基类。例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">ClassA</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span><span class="token punctuation">,</span> <span class="token class-name">Iface1</span><span class="token punctuation">,</span> <span class="token class-name">Iface2</span></span> <span class="token punctuation">{</span>
   <span class="token comment">// class成员。</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以下的代码段定义接口<code>IFace</code>，它只有一个方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IFace</span> <span class="token punctuation">{</span>
  <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowMyFace</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不能从这个定义实例化一个对象，但可以从它派生一个类。因此，该类必须实现<code>ShowMyFace</code>抽象方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">CFace</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">IFace</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowMyFace</span><span class="token punctuation">(</span> <span class="token punctuation">)</span>   <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot; implementation &quot;</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
</code></pre></div><h2 id="基接口" tabindex="-1"><a class="header-anchor" href="#基接口" aria-hidden="true">#</a> 基接口</h2><p>一个接口可以从零或多个接口继承，那些被称为这个接口的显式基接口。当一个接口有比零多的显式基接口时，那么在接口的定义中的形式为，接口标识符后面跟着由一个冒号&quot;:&quot;和一个用逗号&quot;,&quot;分开的基接口标识符列表。</p><p>接口基：</p><p>接口类型列表说明：</p><ul><li>一个接口的显式基接口必须至少同接口本身一样可访问。例如，在一个公共接口的基接口中指定一个私有或内部的接口是错误的。</li><li>一个接口直接或间接地从它自己继承是错误的。</li><li>接口的基接口都是显式基接口，并且是它们的基接口。换句话说，基接口的集合完全由显式基接口和它们的显式基接口等等组成。在下面的例子中</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IControl</span> <span class="token punctuation">{</span>
 <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">ITextBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IControl</span></span> <span class="token punctuation">{</span>
 <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">IListBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IControl</span></span> <span class="token punctuation">{</span>
 <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetItems</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> items<span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">IComboBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITextBox</span><span class="token punctuation">,</span> <span class="token class-name">IListBox</span></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre></div><p><code>IComboBox</code> 的基接口是<code>IControl</code>,<code>ITextBox</code>, 和<code>IlistBox</code>。</p><ul><li>一个接口继承它的基接口的所有成员。换句话说，上面的接口<code>IComboBox</code>就像<code>Paint</code>一样继承成员<code>SetText</code> 和 <code>SetItems</code>。</li><li>一个实现了接口的类或结构也隐含地实现了所有接口的基接口。</li></ul><h3 id="接口主体" tabindex="-1"><a class="header-anchor" href="#接口主体" aria-hidden="true">#</a> 接口主体</h3><p>一个接口的接口主体定义接口的成员。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span><span class="token operator">-</span>body<span class="token punctuation">:</span>
<span class="token punctuation">{</span>   <span class="token keyword">interface</span><span class="token operator">-</span>member<span class="token operator">-</span>declarationsopt   <span class="token punctuation">}</span>
</code></pre></div><p>接口可以包含一个和多个成员，这些成员可以是方法、属性、索引指示器和事件，但不能是常量、域、操作符、构造函数或析构函数，而且不能包含任何静态成员。接口定义创建新的定义空间，并且接口定义直接包含的接口成员定义将新成员引入该定义空间。</p><p>说明：</p><ul><li>接口的成员是从基接口继承的成员和由接口本身定义的成员。</li><li>接口定义可以定义零个或多个成员。接口的成员必须是方法、属性、事件或索引器。接口不能包含常数、字段、运算符、实例构造函数、析构函数或类型，也不能包含任何种类的静态成员。</li><li>定义一个接口，该接口对于每种可能种类的成员都包含一个：方法、属性、事件和索引器。</li><li>接口成员默认访问方式是public。接口成员定义不能包含任何修饰符，比如成员定义前不能加abstract，public，protected，internal，private，virtual，override 或static 修饰符。</li><li>接口的成员之间不能相互同名。继承而来的成员不用再定义，但接口可以定义与继承而来的成员同名的成员，这时我们说接口成员覆盖了继承而来的成员，这不会导致错误，但编译器会给出一个警告。关闭警告提示的方式是在成员定义前加上一个new关键字。但如果没有覆盖父接口中的成员，使用new关键字会导致编译器发出警告。</li><li>方法的名称必须与同一接口中定义的所有属性和事件的名称不同。此外，方法的签名必须与同一接口中定义的所有其他方法的签名不同。</li><li>属性或事件的名称必须与同一接口中定义的所有其他成员的名称不同。</li><li>一个索引器的签名必须区别于在同一接口中定义的其他所有索引器的签名。</li><li>接口方法声明中的属性（attributes）, 返回类型（return-type）, 标识符（identifier）和形式参数列表（formal-parameter-lis）与一个类的方法声明中的那些有相同的意义。一个接口方法声明不允许指定一个方法主体，而声明通常用一个分号结束。</li><li>接口属性声明的访问符与类属性声明的访问符相对应，除了访问符主体通常必须用分号。因此，无论属性是读写、只读或只写，访问符都完全确定。</li><li>接口索引声明中的属性（attributes），类型（type）和形式参数列表（formal-parameter-list）与类的索引声明的那些有相同的意义。</li></ul><p>下面例子中接口<code>IMyTest</code>包含了索引指示器、事件E、方法F、属性P这些成员：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IMyTest</span><span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">event</span> <span class="token class-name">EventHandler</span> E <span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>  <span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> P <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre></div><p>下面例子中接口<code>IStringList</code>包含每个可能类型成员的接口：一个方法，一个属性，一个事件和一个索引。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StringListEvent</span><span class="token punctuation">(</span><span class="token class-name">IStringList</span> sender<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IStringList</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">int</span></span> Count <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">event</span> <span class="token class-name">StringListEvent</span> Changed<span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="接口成员的全权名" tabindex="-1"><a class="header-anchor" href="#接口成员的全权名" aria-hidden="true">#</a> 接口成员的全权名</h2><p>使用接口成员也可采用全权名（fully qualified name）。接口的全权名称是这样构成的。接口名加小圆点&quot;.&quot; 再跟成员名比如对于下面两个接口：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IControl</span> <span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">ITextBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IControl</span></span> <span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>其中<code>Paint</code> 的全权名是<code>IControl.Paint</code>，<code>GetText</code>的全权名是<code>ITextBox.GetText</code>。当然，全权名中的成员名称必须是在接口中已经定义过的，比如使用<code>ITextBox.Paint</code>就是不合理的。</p><p>如果接口是名字空间的成员，全权名还必须包含名字空间的名称。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">System</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDataTable</span> <span class="token punctuation">{</span>
        <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">Clone</span><span class="token punctuation">(</span> <span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>那么<code>Clone</code>方法的全权名是<code>System.IDataTable.Clone</code>。 定义好了接口，接下来我们关心的就是怎样实现对接口的访问。这部分内容，我将在下一篇文章中和您进一步探讨。</p><hr><p>什么是接口？其实，接口简单理解就是一种约定，使得实现接口的类或结构在形式上保持一致。个人觉得，使用接口可以使程序更加清晰和条理化，这就是接口的好处，但并不是所有的编程语言都支持接口，C#是支持接口的。注意，虽然在概念上，C#接口类似于COM接口，但他们的底层结构是不同的。那么，我们来看一下如何声明和使用接口。</p><h2 id="声明接口" tabindex="-1"><a class="header-anchor" href="#声明接口" aria-hidden="true">#</a> 声明接口</h2><p>声明接口在语法上和声明抽象类完全相同，例如这里有一个银行账户的接口：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IBankAccount</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token return-type class-name"><span class="token keyword">decimal</span></span> Balance <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意：接口中只能包含方法、属性、索引器和事件的声明。不允许声明成员上的修饰符，即使是pubilc都不行，因为接口成员总是公有的，也不能声明为虚拟和静态的。如果需要修饰符，最好让实现类来声明。</p><h2 id="使用接口的例子" tabindex="-1"><a class="header-anchor" href="#使用接口的例子" aria-hidden="true">#</a> 使用接口的例子</h2><p>这是书上的一个简单的例子，但足以说明接口的使用方法。 一个银行账户的接口，两个不同银行账户的实现类，都继承于这个接口。接口声明如上。下面是两个账户类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">SaverAccount</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">IBankAccount</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> balance<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span></span> Balance
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span><span class="token punctuation">{</span><span class="token keyword">return</span> balance<span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>balance <span class="token operator">&gt;=</span> amount<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            balance <span class="token operator">-=</span> amount<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot; Withdraw failed. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot; Venus Bank Saver:Balance={0,6:C} &quot;</span><span class="token punctuation">,</span> balance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">GoldAccount</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IBankAccount</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> balance<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span></span> Balance
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> balance<span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>balance <span class="token operator">&gt;=</span> amount<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            balance <span class="token operator">-=</span> amount<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot; Withdraw failed. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot; Jupiter Bank Saver:Balance={0,6:C} &quot;</span><span class="token punctuation">,</span> balance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>可见，这两个实现类多继承了<code>IBankAccount</code>接口，因此它们必须要实现接口中的所有声明的方法。要不然，编译就会出错。让我们来测试一下，下面是测试代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IBankAccount</span> venusAccount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SaverAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IBankAccount</span> jupiterAccount <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CurrentAccount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    venusAccount<span class="token punctuation">.</span><span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jupiterAccount<span class="token punctuation">.</span><span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>venusAccount<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jupiterAccount<span class="token punctuation">.</span><span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jupiterAccount<span class="token punctuation">.</span><span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jupiterAccount<span class="token punctuation">.</span><span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>jupiterAccount<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre></div><p>请注意开头两句，我们把它们声明为<code>IBankAccount</code>引用的方式，而没有声明为类的引用，为什么呢？因为，这样我们就可以让它指向执行这个接口的任何类的实例了，比较灵活。但这也有个缺点，如果我们要执行不属于接口的方法，比如这里重载的<code>ToString()</code>方法，就要先把接口的引用强制转换成合适的类型了。</p><h2 id="接口的继承" tabindex="-1"><a class="header-anchor" href="#接口的继承" aria-hidden="true">#</a> 接口的继承</h2><p>接口也可以彼此继承，就象类的继承一样。比如我们又声明一个接口<code>ITransferBankAccount</code>，它继承于<code>IBankAccount</code>接口。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">ITransferBankAccount</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IBankAccount</span></span>
<span class="token punctuation">{</span>    
    <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">TransferTo</span><span class="token punctuation">(</span><span class="token class-name">IBankAccount</span> destination<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在这个接口中，又新增加了一个方法<code>TransferTo()</code>，所以如果我们要写一个类从<code>ITransferBankAccount</code>继承的话，就必须要实现<code>IBankAccount</code>和<code>ITransferBankAccount</code>两个接口所有的方法声明。即：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">CurrentAccount</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITransferBankAccount</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">decimal</span></span> balance<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">decimal</span></span> Balance
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> balance<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PayIn</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        balance <span class="token operator">+=</span> amount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Withdraw</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>balance <span class="token operator">&gt;=</span> amount<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            balance <span class="token operator">-=</span> amount<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Withdraw failed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;Jupiter Bank Saver:Balance={0,6:C}&quot;</span><span class="token punctuation">,</span> balance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">TransferTo</span><span class="token punctuation">(</span><span class="token class-name">IBankAccount</span> destination<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">decimal</span></span> amount<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">Withdraw</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            destination<span class="token punctuation">.</span><span class="token function">PayIn</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>总结起来说，使用C#接口应注意几个问题：</p><ol><li>C#中的接口是独立于类来定义的。这与 C++模型是对立的，在 C++中接口实际上就是抽象基类。</li><li>接口和类都可以继承多个接口。</li><li>类可以继承一个基类，接口根本不能继承类。这种模型避免了 C++的多继承问题，C++中不同基类中的实现可能出现冲突。因此也不再需要诸如虚拟继承和显式作用域这类复杂机制。C#的简化接口模型有助于加快应用程序的开发。</li><li>一个接口定义一个只有抽象成员的引用类型。C#中一个接口实际所做的，仅仅只存在着方法标志，但根本就没有执行代码。这就暗示了不能实例化一个接口，只能实例化一个派生自该接口的对象。</li><li>接口可以定义方法、属性和索引。所以，对比一个类，接口的特殊性是：当定义一个类时，可以派生自多重接口，而你只能可以从仅有的一个类派生。</li></ol>`,68),c=[e];function o(l,u){return s(),a("div",null,c)}const i=n(t,[["render",o],["__file","cspbase7.html.vue"]]);export{i as default};
