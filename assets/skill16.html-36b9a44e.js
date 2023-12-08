import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="c-的四个基本技巧" tabindex="-1"><a class="header-anchor" href="#c-的四个基本技巧" aria-hidden="true">#</a> C#的四个基本技巧</h1><blockquote><p>作者： 天极论坛 www.ASPCool.com 时间:2003-3-30 17:33:19 阅读次数:8824</p></blockquote><h2 id="_1-如果可能尽量使用接口来编程" tabindex="-1"><a class="header-anchor" href="#_1-如果可能尽量使用接口来编程" aria-hidden="true">#</a> 1．如果可能尽量使用接口来编程</h2><p>.NET框架包括类和接口，在编写程序的时候，你可能知道正在用.NET的哪个类。然而，在这种情况下如果你用.NET支持的接口而不是它的类来编程时，代码会变得更加稳定、可用性会更高。请分析下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> LoadList <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span> items<span class="token punctuation">,</span> <span class="token class-name">ListBox</span> l<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
　<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> items<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
　　l<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add <span class="token punctuation">(</span>items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>ToString <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个函数从一个可为任何对象的数组中加载<code>ListBox</code>，这段代码被限定为只能使用数组。假想过些时候你发现那些对象存在数据库中，或别的集合中。那么你需要修改程序来使用不同的集合类型。如果你用ICollection接口来写那段程序，你就不用修改那段程序了，对于任何实现<code>ICollection</code>接口的类型它都能很好的工作:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> LoadList <span class="token punctuation">(</span><span class="token class-name">ICollection</span> items<span class="token punctuation">,</span><span class="token class-name">ListBox</span> l<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
　　<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> o <span class="token keyword">in</span> items<span class="token punctuation">)</span>
　　l<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Add <span class="token punctuation">(</span>o<span class="token punctuation">.</span>ToString <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>ICollection</code>被数组和所有<code>System.Collection</code>中的集合实现。此外，多维数组也支持ICollection接口。如果那还不够的话，数据库.NET类同样支持ICollection接口。用接口写的这个函数不用需改就可以才许多中情况下使用。</p><h2 id="_2-使用属性代替原始数据" tabindex="-1"><a class="header-anchor" href="#_2-使用属性代替原始数据" aria-hidden="true">#</a> 2. 使用属性代替原始数据</h2><p>因为属性已经成为语言本身的元素，所以声明数据元素时它的作用域等级没有必要大于private。因为代码本身会把属性看成数据元素，你并没有失去使用简单数据类型的便利性 。相反它会使你的代码更加灵活功能更加强大。属性使你的数据元素封装性更好。属性可以让你使用lazy evaluation来返回数据。lazy evaluation的意思是当用户请求时才计算它的值，而不是一直保留着它。</p><p>最后，属性可以是<code>virtual</code>也可以是<code>abstract</code>。你也可以在接口中定义属性。</p><p>这里还有维护方面的因素应当注意：尽管操作两者的方法是一样的，但是你把一个数据元素变成属性，那么原先客户端的程序便不能访问服务端的新版本程序了。实际上对于在Web service中你想实现序列化的值你可以把它们变成属性来使用：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> TheMonth <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">XmlAttribute</span> <span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Month&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Month
<span class="token punctuation">{</span>
　<span class="token keyword">get</span> <span class="token punctuation">{</span>
　　<span class="token keyword">return</span> TheMonth<span class="token punctuation">;</span>
　<span class="token punctuation">}</span>
　<span class="token keyword">set</span> <span class="token punctuation">{</span>
　　TheMonth <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
　<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>简单通过属性就可以使你的所有数据元素私有化。</p><h2 id="_3-在producer-consumer-的idiom中使用delegate" tabindex="-1"><a class="header-anchor" href="#_3-在producer-consumer-的idiom中使用delegate" aria-hidden="true">#</a> 3. 在Producer/Consumer 的Idiom中使用Delegate</h2><p>当你生成一个实现producer idiom类的时候，使用deletate来通知consumer。这种方法相对于用接口更加灵活。Delegate是多点传送的，所以不用加额外的代码你就何以支持多用户。相对于用接口这样做可使类之间的耦合性降低。</p><p>下面的类处理键盘输入并把它传给所有的registered listeners：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeyboardProcessor</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">OnGetLine</span> theFunc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">OnGetLine</span> OnGetLineCallback
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> theFunc<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            theFunc <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Read input.</span>
        <span class="token comment">// If there is any listeners, publish:</span>
        <span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">;</span>
        <span class="token keyword">do</span>
        <span class="token punctuation">{</span>
            s <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>theFunc <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">System<span class="token punctuation">.</span>Delegate<span class="token punctuation">[</span><span class="token punctuation">]</span></span> funcs <span class="token operator">=</span> theFunc<span class="token punctuation">.</span><span class="token function">GetInvocationList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">OnGetLine</span> f <span class="token keyword">in</span> funcs<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">try</span>
                    <span class="token punctuation">{</span>
                        <span class="token function">f</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Caught Exception: {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>任何数目的listeners都可注册到producer，它们所要做的只是提供一个特定的函数：deletate。</p><h2 id="_4-注意初始化顺序" tabindex="-1"><a class="header-anchor" href="#_4-注意初始化顺序" aria-hidden="true">#</a> 4. 注意初始化顺序</h2><p>C＃中对于一些变量声明加入了initializer的概念。它们在构造函数之前被执行，实际上变量在基类的构造函数执行前之前被初始化。</p><p>所以，在初始化变量的时候不要用基类中的数据，因为它们还没有被构造。</p>`,22),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(p,[["render",c],["__file","skill16.html.vue"]]);export{i as default};
