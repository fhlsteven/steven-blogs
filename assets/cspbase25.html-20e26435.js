import{_ as s,o as n,c as a,a as e}from"./app-57d1f7b1.js";const p={},t=e(`<h1 id="c-中结构与类的区别" tabindex="-1"><a class="header-anchor" href="#c-中结构与类的区别" aria-hidden="true">#</a> c#中结构与类的区别</h1><p>目录</p><ul><li>类与结构的实例比较</li><li>类与结构的差别</li><li>如何选择结构还是类</li></ul><h2 id="一-类与结构的示例比较" tabindex="-1"><a class="header-anchor" href="#一-类与结构的示例比较" aria-hidden="true">#</a> 一．类与结构的示例比较</h2><p>结构示例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Name<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span>  height<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span>  weight<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">overWeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//implement something</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>类示例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestTime</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> hours<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> minutes<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> seconds<span class="token punctuation">;</span> 

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">passtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token comment">//implementation of behavior</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>调用过程：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">ovid</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> Myperson <span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//声明结构</span>
        <span class="token class-name">TestTime</span> Mytime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//声明类</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从上面的例子中我们可以看到，类的声明和结构的声明非常类似，只是限定符后面是 <code>struct</code> 还是 <code>class</code> 的区别，而且使用时，定义新的结构和定义新的类的方法也非常类似。那么类和结构的具体区别是什么呢？</p><h2 id="二-类与结构的差别" tabindex="-1"><a class="header-anchor" href="#二-类与结构的差别" aria-hidden="true">#</a> 二 .类与结构的差别</h2><ol><li><p>值类型与引用类型</p><p>结构是值类型：值类型在堆栈上分配地址，所有的基类型都是结构类型，例如：<code>int</code> 对应<code>System.int32</code> 结构，<code>string</code> 对应 <code>system.string</code> 结构 ，通过使用结构可以创建更多的<strong>值类型</strong></p><p>类是引用类型：引用类型在堆上分配地址</p><p>堆栈的执行效率要比堆的执行效率高，可是堆栈的资源有限，不适合处理大的逻辑复杂的对象。所以结构处理作为基类型对待的小对象，而类处理某个商业逻辑</p><p>因为结构是值类型所以结构之间的赋值可以创建新的结构，而类是引用类型，类之间的赋值只是复制引用</p><p>注：</p><p>虽然结构与类的类型不一样，可是他们的基类型都是对象<code>（object）</code>,c#中所有类型的基类型都是<code>object</code></p><p>虽然结构的初始化也使用了 <code>new</code> 操作符可是结构对象依然分配在堆栈上而不是堆上，如果不使用“新建”(new)，那么在初始化所有字段之前，字段将保持未赋值状态，且对象不可用</p></li><li><p>继承性</p><p>结构：不能从另外一个结构或者类继承，本身也不能被继承，虽然结构没有明确的用<code>sealed</code>声明，可是结构是隐式的<code>sealed</code>.</p><p>类：完全可扩展的，除非显示的声明<code>sealed</code>否则类可以继承其他类和接口，自身也能被继承</p><p>注：虽然结构不能被继承 可是结构能够继承接口，方法和类继承接口一样</p><p>例如:结构实现接口</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IImage</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">Picture</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IImage</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Paint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// painting code goes here</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">;</span>  <span class="token comment">// other struct members</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>内部结构：</p><p>结构：</p><ul><li>没有默认的构造函数，但是可以添加构造函数</li><li>没有析构函数</li><li>没有 <code>abstract</code> 和 <code>sealed</code>(因为不能继承)</li><li>不能有<code>protected</code>修饰符</li><li>可以不使用<code>new</code>初始化</li></ul><p>在结构中初始化实例字段是错误的</p><p>类：</p><ul><li>有默认的构造函数</li><li>有析构函数</li><li>可以使用 <code>abstract</code> 和 <code>sealed</code></li><li>可以有<code>protected</code>修饰符</li><li>必须使用<code>new</code>初始化</li></ul></li></ol><h2 id="三-如何选择结构还是类" tabindex="-1"><a class="header-anchor" href="#三-如何选择结构还是类" aria-hidden="true">#</a> 三．如何选择结构还是类</h2><p>讨论了结构与类的相同之处和差别之后，下面讨论如何选择使用结构还是类：</p><ol><li>堆栈的空间有限，对于大量的逻辑的对象，创建类要比创建结构好一些</li><li>结构表示如点、矩形和颜色这样的轻量对象，例如，如果声明一个含有 1000 个点对象的数组，则将为引用每个对象分配附加的内存。在此情况下，结构的成本较低。</li><li>在表现抽象和多级别的对象层次时，类是最好的选择</li><li>大多数情况下该类型只是一些数据时，结构时最佳的选择</li></ol>`,16),c=[t];function o(l,i){return n(),a("div",null,c)}const k=s(p,[["render",o],["__file","cspbase25.html.vue"]]);export{k as default};
