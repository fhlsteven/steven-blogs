import{_ as e,r as o,o as c,c as l,b as n,d as s,e as t,a as p}from"./app-d9da1b6d.js";const i={},u=n("h1",{id:"c-中的-数组-、arraylist、list",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#c-中的-数组-、arraylist、list","aria-hidden":"true"},"#"),s(" C# 中的 数组"),n("code",null,"[]"),s("、"),n("code",null,"ArrayList"),s("、"),n("code",null,"List")],-1),r={id:"数组",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#数组","aria-hidden":"true"},"#",-1),d={href:"https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/arrays/",target:"_blank",rel:"noopener noreferrer"},m=p(`<p>在 C# 中，数组实际上是对象，而不只是如在 C 和 C++ 中的连续内存的可寻址区域。</p><p>属性：</p><ul><li>数组可以是一维、多维或交错的。</li><li>创建数组实例时，将建立纬度数量和每个纬度的长度。 这些值在实例的生存期内无法更改。</li><li>数值数组元素的默认值设置为零，而引用元素设置为 null。</li><li>交错数组是数组的数组，因此其元素为引用类型且被初始化为 null。</li><li>数组从零开始编制索引：包含 n 元素的数组从 0 索引到 n-1。</li><li>数组元素可以是任何类型，其中包括数组类型。</li><li>数组类型是从抽象的基类型 <code>Array</code> 派生的引用类型。 所有数组都会实现 <code>IList</code> 和 <code>IEnumerable</code>。 可在 C# 中使用 <code>foreach</code> 迭代数组。 原因是单维数组还实现了 <code>IList&lt;T&gt;</code> 和 <code>IEnumerable&lt;T&gt;</code>。</li></ul><ol><li><p>命名空间： <code>System;</code></p></li><li><p>特点<br> 内存连续存储；索引速度快；赋值修改元素简单</p></li><li><p>缺点<br> 插入数据麻烦(连续内存，插入后续的元素都需要移动)；声明数组需指定长度(长了没用完浪费内存，短了可能不够用)；</p></li><li><p>分类</p><ul><li>单维数组 eg: <code>int[] array = new int[5];</code></li><li>多维数组 eg:</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 四行两列的二维数组</span>
<span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> array3Da <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> 
    <span class="token punctuation">{</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>  <span class="token number">4</span><span class="token punctuation">,</span>  <span class="token number">5</span><span class="token punctuation">,</span>  <span class="token number">6</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token punctuation">{</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 三个维度（2、2 和 3）的数组</span>
</code></pre></div><ul><li>交错数组 eg：</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 声明一个具有三个元素的一维数组，其中每个元素都是一维整数数组</span>
<span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> jaggedArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 必须初始化的元素后才可使用它</span>
jaggedArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
jaggedArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
jaggedArray<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>隐式类型的数组<br> 通常用于查询表达式、匿名类型、对象和集合初始值设定项.</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> a <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// int[]</span>
<span class="token class-name"><span class="token keyword">var</span></span> b <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// string[]</span>
</code></pre></div></li></ol>`,4),y={id:"array",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#array","aria-hidden":"true"},"#",-1),w={href:"https://docs.microsoft.com/zh-cn/dotnet/api/system.array?view=net-5.0",target:"_blank",rel:"noopener noreferrer"},g=p(`<p>数组类型(<code>[]</code>)是从抽象的基类型 <code>Array</code> 派生的引用类型。</p><p><code>Array</code> 类提供一些方法，用于创建、处理、搜索数组并对数组进行排序，从而充当公共语言运行时中所有数组的基类。</p><p><code>Array</code>的用法与数组<code>[]</code>几乎一样，可以看做是数组。在定义的时候需要指定长度。</p><p><code>Array</code> 的 公共静态成员(<code>public static</code>)是线程安全的。但不保证所有实例成员都是线程安全的。</p><p><code>Array.SyncRoot</code> 属性，用于同步对 <code>Array</code> 的访问的对象。</p><p>下面的代码示例演示如何使用属性在整个枚举过程中锁定数组 <code>SyncRoot</code></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Array</span> myArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">lock</span><span class="token punctuation">(</span>myArray<span class="token punctuation">.</span>SyncRoot<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> item <span class="token keyword">in</span> myArray<span class="token punctuation">)</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,7),_={id:"arraylist",tabindex:"-1"},b=n("a",{class:"header-anchor",href:"#arraylist","aria-hidden":"true"},"#",-1),f={href:"https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.arraylist?view=net-5.0",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,[s("为了解决数组的一些短板,"),n("code",null,"ArrayList"),s(" 继承了 "),n("code",null,"IList"),s(" 接口，提供了数据存储和检索。 "),n("code",null,"ArrayList"),s(" 对象的大小是按照其中存储的数据来动态扩充与收缩的。在声明 "),n("code",null,"ArrayList"),s(" 对象时并不需要指定它的长度。")],-1),A=n("li",null,[s("命名空间： "),n("code",null,"System.Collections;")],-1),L=n("li",null,[s("特点"),n("br"),s(" 允许插入不同类型的数据(插入"),n("code",null,"object"),s(")，无需指定长度；只有一个维度")],-1),C=n("br",null,null,-1),z={href:"https://www.yuque.com/fhlsteven/clr_via_csharp/mwtm9r#d736fd65",target:"_blank",rel:"noopener noreferrer"},x=p(`<blockquote><p>装箱：就是将<strong>值类型</strong>的数据打包到<strong>引用类型</strong>的实例中<br> 拆箱：就是从<strong>引用数据</strong>中提取<strong>值类型</strong></p></blockquote><p>一些方法：<br><code>public virtual int Add(object? value);</code>:将对象添加到 <code>ArrayList</code> 的结尾处，返回已添加 <code>value</code> 的 <code>ArrayList</code> 索引</p><p><code>public virtual void Remove (object? obj);</code>:从 <code>ArrayList</code> 中移除特定对象的<strong>第一个匹配</strong>项</p><p>ArrayList 是使用 object 数组 实现的，它涉及拆箱和装箱。默认容量 4</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayList</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IList</span><span class="token punctuation">,</span> <span class="token class-name">ICloneable</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">?</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> _items<span class="token punctuation">;</span> <span class="token comment">// Do not rename (binary serialization)</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _size<span class="token punctuation">;</span> <span class="token comment">// Do not rename (binary serialization)</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _version<span class="token punctuation">;</span> <span class="token comment">// Do not rename (binary serialization)</span>

    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> _defaultCapacity <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

    <span class="token comment">// Constructs a ArrayList. The list is initially empty and has a capacity</span>
    <span class="token comment">// of zero. Upon adding the first element to the list the capacity is</span>
    <span class="token comment">// increased to _defaultCapacity, and then increased in multiples of two as required.</span>
    <span class="token keyword">public</span> <span class="token function">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _items <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Empty</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Constructs a ArrayList with a given initial capacity. The list is</span>
    <span class="token comment">// initially empty, but will have room for the given number of elements</span>
    <span class="token comment">// before any reallocations are required.</span>
    <span class="token comment">//</span>
    <span class="token keyword">public</span> <span class="token function">ArrayList</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> capacity<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>capacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentOutOfRangeException</span><span class="token punctuation">(</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>capacity<span class="token punctuation">)</span><span class="token punctuation">,</span> SR<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span>SR<span class="token punctuation">.</span>ArgumentOutOfRange_MustBeNonNegNum<span class="token punctuation">,</span> <span class="token keyword">nameof</span><span class="token punctuation">(</span>capacity<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>capacity <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            _items <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Empty</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            _items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">[</span>capacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>扩容：</p><p><code>ArrayList&lt;T&gt;</code> 在内部有一个存放数据的数组，当新增数据时候，如果该数组有可用，则会将数据放入数组，并将下标向后移动，如果没有足够的数组，则会进行扩容，如果创建的时候没有给定容量，第一次扩容则会使用默认的容量，如果当前有元素，则会扩容至当前容量的两倍。 可以看到扩容 是将原数组的数据拷贝到新创建的数组中</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Adds the given object to the end of this list. The size of the list is</span>
<span class="token comment">// increased by one. If required, the capacity of the list is doubled</span>
<span class="token comment">// before adding the new element.</span>
<span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">?</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_size <span class="token operator">==</span> _items<span class="token punctuation">.</span>Length<span class="token punctuation">)</span> <span class="token function">EnsureCapacity</span><span class="token punctuation">(</span>_size <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    _items<span class="token punctuation">[</span>_size<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    _version<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> _size<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Ensures that the capacity of this list is at least the given minimum</span>
<span class="token comment">// value. If the current capacity of the list is less than min, the</span>
<span class="token comment">// capacity is increased to twice the current capacity or to min,</span>
<span class="token comment">// whichever is larger.</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EnsureCapacity</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> min<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_items<span class="token punctuation">.</span>Length <span class="token operator">&lt;</span> min<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> newCapacity <span class="token operator">=</span> _items<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">?</span> _defaultCapacity <span class="token punctuation">:</span> _items<span class="token punctuation">.</span>Length <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token comment">// Allow the list to grow to maximum possible capacity (~2G elements) before encountering overflow.</span>
        <span class="token comment">// Note that this check works even when _items.Length overflowed thanks to the (uint) cast</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">uint</span><span class="token punctuation">)</span>newCapacity <span class="token operator">&gt;</span> Array<span class="token punctuation">.</span>MaxLength<span class="token punctuation">)</span> newCapacity <span class="token operator">=</span> Array<span class="token punctuation">.</span>MaxLength<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>newCapacity <span class="token operator">&lt;</span> min<span class="token punctuation">)</span> newCapacity <span class="token operator">=</span> min<span class="token punctuation">;</span>
        Capacity <span class="token operator">=</span> newCapacity<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Gets and sets the capacity of this list.  The capacity is the size of</span>
<span class="token comment">// the internal array used to hold items.  When set, the internal</span>
<span class="token comment">// array of the list is reallocated to the given capacity.</span>
<span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Capacity
<span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token operator">=&gt;</span> _items<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&lt;</span> _size<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentOutOfRangeException</span><span class="token punctuation">(</span><span class="token keyword">nameof</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">,</span> SR<span class="token punctuation">.</span>ArgumentOutOfRange_SmallCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// We don&#39;t want to update the version number when we change the capacity.</span>
        <span class="token comment">// Some existing applications have dependency on this.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">!=</span> _items<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> newItems <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">[</span><span class="token keyword">value</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>_size <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>_items<span class="token punctuation">,</span> newItems<span class="token punctuation">,</span> _size<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                _items <span class="token operator">=</span> newItems<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                _items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">[</span>_defaultCapacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,8),I={href:"https://source.dot.net/#System.Private.CoreLib/ArrayList.cs,9df2bbf8d237742e",target:"_blank",rel:"noopener noreferrer"},T={id:"list-t",tabindex:"-1"},O=n("a",{class:"header-anchor",href:"#list-t","aria-hidden":"true"},"#",-1),R={href:"https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.list-1?view=net-6.0",target:"_blank",rel:"noopener noreferrer"},j=n("code",null,"List<T>",-1),E=p(`<p>通过使用大小根据需要动态增加的数组来实现泛型接口。</p><p>相比于<code>ArrayList</code>，<code>List&lt;T&gt;</code>不存在装箱拆箱的缺点，<code>List</code>类是<code>ArrayList</code>类的<strong>泛型</strong>等效类，它的大部分用法都与<code>ArrayList</code>相似，因为<code>List</code>类也继承了<code>IList</code>接口。最关键的区别在于，在声明<code>List</code>集合时，需要为其声明<code>List</code>集合内数据的对象类型。</p><ol><li>命名空间 <code>System.Collections.Generic</code></li><li>特点<br> 插入类型固定(泛型)；无需指定长度，只有一个维度，允许重复元素</li></ol><p>List底层实现使用 泛型数组(Array)，默认容量 4，初始化时候可以指定初始化容量，如果不指定则会给定一个空的泛型数组。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">List<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">IList<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span><span class="token class-name">IList</span><span class="token punctuation">,</span><span class="token class-name">IReadOnlyList<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DefaultCapacity <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">internal</span> <span class="token class-name">T<span class="token punctuation">[</span><span class="token punctuation">]</span></span> _items<span class="token punctuation">;</span>
    <span class="token keyword">internal</span> <span class="token class-name"><span class="token keyword">int</span></span> _size<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _version<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _items <span class="token operator">=</span> s_emptyArray<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> capacity<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>capacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            ThrowHelper<span class="token punctuation">.</span><span class="token function">ThrowArgumentOutOfRangeException</span><span class="token punctuation">(</span>ExceptionArgument<span class="token punctuation">.</span>capacity<span class="token punctuation">,</span> ExceptionResource<span class="token punctuation">.</span>ArgumentOutOfRange_NeedNonNegNum<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>capacity <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            _items <span class="token operator">=</span> s_emptyArray<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            _items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">T</span><span class="token punctuation">[</span>capacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>扩容： <code>List&lt;T&gt;</code> 在内部有一个存放数据的数组，当新增数据时候，如果该数组有可用，则会将数据放入数组，并将下标向后移动，如果没有足够的数组，则会进行扩容，如果创建的时候没有给定容量，第一次扩容则会使用默认的容量，如果当前有元素，则会扩容至当前容量的两倍。 可以看到扩容 是将原数组的数据拷贝到新创建的数组中</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>[MethodImpl(MethodImplOptions.AggressiveInlining)]
public void Add(T item)
{
    _version++;
    T[] array = _items;
    int size = _size;
    if ((uint)size &lt; (uint)array.Length)
    {
        _size = size + 1;
        array[size] = item;
    }
    else
    {
        AddWithResize(item);
    }
}
 
// Non-inline from List.Add to improve its code quality as uncommon path
[MethodImpl(MethodImplOptions.NoInlining)]
private void AddWithResize(T item)
{
    Debug.Assert(_size == _items.Length);
    int size = _size;
    Grow(size + 1);  // 扩容
    _size = size + 1;
    _items[size] = item;
}

private void Grow(int capacity)
{
    Debug.Assert(_items.Length &lt; capacity);

    int newcapacity = _items.Length == 0 ? DefaultCapacity : 2 * _items.Length;

    // Allow the list to grow to maximum possible capacity (~2G elements) before encountering overflow.
    // Note that this check works even when _items.Length overflowed thanks to the (uint) cast
    if ((uint)newcapacity &gt; Array.MaxLength) newcapacity = Array.MaxLength;

    // If the computed capacity is still less than specified, set to the original argument.
    // Capacities exceeding Array.MaxLength will be surfaced as OutOfMemoryException by Array.Resize.
    if (newcapacity &lt; capacity) newcapacity = capacity;

    Capacity = newcapacity;
}

// Gets and sets the capacity of this list.  The capacity is the size of
// the internal array used to hold items.  When set, the internal
// array of the list is reallocated to the given capacity.
public int Capacity
{
    get =&gt; _items.Length;
    set
    {
        if (value &lt; _size)
        {
            ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.value, ExceptionResource.ArgumentOutOfRange_SmallCapacity);
        }

        if (value != _items.Length)
        {
            if (value &gt; 0)
            {
                T[] newItems = new T[value];
                if (_size &gt; 0)
                {
                    Array.Copy(_items, newItems, _size);
                }
                _items = newItems;
            }
            else
            {
                _items = s_emptyArray;
            }
        }
    }
}
</code></pre></div>`,7),N={href:"https://source.dot.net/#System.Private.CoreLib/List.cs,cf7f4095e4de7646",target:"_blank",rel:"noopener noreferrer"},S=n("code",null,"List<T>",-1);function q(M,D){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("h2",r,[k,s(),n("a",d,[s("数组"),t(a)])]),m,n("h2",y,[h,s(),n("a",w,[s("Array"),t(a)])]),g,n("h2",_,[b,s(),n("a",f,[s("ArrayList"),t(a)])]),v,n("ol",null,[A,L,n("li",null,[s("缺点"),C,s(" 处理数据可能会报类型不匹配的错误；在存储或检索值类型时通常发生"),n("a",z,[s("装箱和取消装箱"),t(a)]),s("操作，性能耗损较大")])]),x,n("p",null,[n("a",I,[s("ArrayList源码"),t(a)])]),n("h2",T,[O,s(),n("a",R,[j,t(a)])]),E,n("p",null,[n("a",N,[S,s("源码"),t(a)])])])}const W=e(i,[["render",q],["__file","20210904Array.html.vue"]]);export{W as default};
