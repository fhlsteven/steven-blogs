import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t={},o=p(`<h1 id="初探c-8-9-10" tabindex="-1"><a class="header-anchor" href="#初探c-8-9-10" aria-hidden="true">#</a> 初探c#--8,9,10</h1><p>作者： 依栏望海[17731168] 2000-10-31 15:27:54 修改 删除 [回复]</p><h2 id="_1。8-类-classes" tabindex="-1"><a class="header-anchor" href="#_1。8-类-classes" aria-hidden="true">#</a> 1。8 类（Classes）</h2><p>类用于定义一个新的引用类型。c#不支持多重继承，但支持一个类多重界面（“interfaces”）。</p><p>类的成员包括常量、位域、方法、属性、索引（indexers）、事件、操作符、构造器、析构器和嵌套类型声明。（一口气说这么多，呼——）</p><p>对类中得所有成员有五种访问权限：</p><ul><li>“public” 可以被所有代码访问；</li><li>“protected” 只可以被继承类访问；</li><li>“internal” 只可以被同一个项目的代码访问;</li><li>“protected internal”只可以被同一个项目的代码或继承类访问；</li><li>“private” 只可以被本类中的代码访问。</li></ul><p>缺省状态是“private”。</p><h2 id="_1。9-结构-structs" tabindex="-1"><a class="header-anchor" href="#_1。9-结构-structs" aria-hidden="true">#</a> 1。9 结构（Structs）</h2><p>结构和类又非常多的相似之处，如结构可以实现界面，和可以拥有和类一样的成员。结构与类也有一些重要的区别：结构是值类型，而不是引用类型，所以不支持继承！</p><p>结构被存在堆栈中或者是内联。结构在精心下可以提高存储效能。例如，定义一个与类有着相同信息的结构可以大大地减少存储空间。在下例中，程序创建并初始化100个points。在类“Point”中需要分配101个独立的对象（object）。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Point</span> 
<span class="token punctuation">{</span> 
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span> 
<span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span> 
<span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
<span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token class-name">Point<span class="token punctuation">[</span><span class="token punctuation">]</span></span> points <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> 
points<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token operator">*</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token comment">/* 
如果“Point”被作为一个结构，就可以这样啦：*/</span> 
<span class="token keyword">struct</span> <span class="token class-name">Point</span> 
<span class="token punctuation">{</span> 
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span> 
<span class="token keyword">public</span> <span class="token function">Point</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span> 
<span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>因为Point在内联中实例化，所以得到了优化。当然，错误运用的只会适得其反。比如，当我们传递结构的时候就会比传递类要慢。因为结构的传递是拷贝值，类是引用值的地址。数据量越大差距就越明显。所以“There is no substitute for careful data structure and algorithm design.”（实在是不想译了 ^_^ ）。</p><h2 id="_1。10-界面-interfaces" tabindex="-1"><a class="header-anchor" href="#_1。10-界面-interfaces" aria-hidden="true">#</a> 1。10 界面（Interfaces）</h2><p>界面用来定义一种程序的契约。有了这个契约，就可以跑开编程语言的限制了（理论上）。而实现界面的类或者结构要与界面的定义严格一致。界面可以包含以下成员：方法、属性、索引和事件。</p><p>例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IExample</span> 
<span class="token punctuation">{</span> 
<span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> 
<span class="token keyword">event</span> <span class="token class-name">EventHandler</span> E<span class="token punctuation">;</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token return-type class-name"><span class="token keyword">string</span></span> P <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">Event</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">/* 
例子中的界面包含一个索引、一个事件E、一个方法F和一个属性P。 
界面可以支持多重继承。就像在下例中，界面“IComboBox”同时从“ITextBox”和“IListBox”继承。 
*/</span> 
<span class="token keyword">interface</span> <span class="token class-name">IControl</span> 
<span class="token punctuation">{</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">interface</span> <span class="token class-name">ITextBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IControl</span></span> 
<span class="token punctuation">{</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">interface</span> <span class="token class-name">IListBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IControl</span></span> 
<span class="token punctuation">{</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetItems</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> items<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">interface</span> <span class="token class-name">IComboBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ITextBox</span><span class="token punctuation">,</span> <span class="token class-name">IListBox</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token comment">/* 
类和结构可以多重实例化界面。 就像在下例中，类“EditBox”继承了类“Control”，同时从“IDataBound” 
和“IControl”继承。 
*/</span> 
<span class="token keyword">interface</span> <span class="token class-name">IDataBound</span> 
<span class="token punctuation">{</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Bind</span><span class="token punctuation">(</span><span class="token class-name">Binder</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EditBox</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Control</span><span class="token punctuation">,</span> <span class="token class-name">IControl</span><span class="token punctuation">,</span> <span class="token class-name">IDataBound</span></span> 
<span class="token punctuation">{</span> 
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Bind</span><span class="token punctuation">(</span><span class="token class-name">Binder</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token comment">/* 在上面的代码中，“Paint”方法从“IControl”界面而来；
   “Bind”方法从“IDataBound”界面而来，都以“public”的身份在“EditBox”类中实现。*/</span>
</code></pre></div>`,17),e=[o];function c(l,k){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspct8.html.vue"]]);export{i as default};
