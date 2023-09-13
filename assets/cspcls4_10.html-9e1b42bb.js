import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const o={},t=p(`<h1 id="c-教程第十课-属性" tabindex="-1"><a class="header-anchor" href="#c-教程第十课-属性" aria-hidden="true">#</a> C＃教程第十课：属性</h1><p>（Joe Mayo　2001年06月08日 10:59）</p><p>本节课将介绍C#的属性，其目的包括：</p><ol><li>理解什么是属性</li><li>如何实现属性</li><li>创建一个只读属性</li><li>创建一个只写属性</li></ol><p>属性是C#中独具特色的新功能。通过属性来读写类中的域，这具有一定的保护功能。在其它语言中，这是通过实现特定的getter和setter方法来实现的。C#的属性具有保护功能，可以让你就象访问域一样访问属性。要了解属性的用法，我们先来看看如何用传统的方法对域进行封装。</p><p>1.清单 10-1. 传统的访问类的域的例子：Accessors.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyHolder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> someProperty <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getSomeProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> someProperty<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setSomeProperty</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> propValue<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        someProperty <span class="token operator">=</span> propValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyTester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">PropertyHolder</span> propHold <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PropertyHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        propHold<span class="token punctuation">.</span><span class="token function">setSomeProperty</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Property Value: {0}&quot;</span><span class="token punctuation">,</span> propHold<span class="token punctuation">.</span><span class="token function">getSomeProperty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单 10-1 演示了用传统方法访问类的域的例子。</p><p>PropertyHolder类有个我们感兴趣的域someProperty， PropertyHolder类带有两个方法：getSomeProperty和setSomeProperty。getSomeProperty方法返回someProperty域的值。SetSomeProperty方法设置域someProperty的值。</p></li><li><p>类PropertyTester使用类PropertyHolder中的方法来获取someProperty域的值。</p><p>Main方法中新创建了一个PropertyHolder对象，之后通过使用setSomeProperty方法，调用propHold对象的setSomeProperty方法，设置其值为5。之后，调用Console.WriteLine方法输出属性值。对propHold对象的getSomeProperty的调用，是用来获取属性值的。它输出&quot;Property Value: 5&quot;到控制台。</p></li><li><p>这种传统的访问域的信息的方法是很好的，因为它支持面向对象的封装的概念。</p></li></ol><p>如果在对域someProperty的实现中，域的类型从int 类型变为byte类型，上述的方法仍然适用。现在，如果采用属性的话，其实现会做得更为平滑。</p><p>2.清单 10-2. 使用属性访问类的域：Properties.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyHolder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> someProperty <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SomeProperty
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> someProperty<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            someProperty <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyTester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">PropertyHolder</span> propHold <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PropertyHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        propHold<span class="token punctuation">.</span>SomeProperty <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Property Value: {0}&quot;</span><span class="token punctuation">,</span> propHold<span class="token punctuation">.</span>SomeProperty<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单 10-2 演示了如何创建和使用属性。</p><p>PropertyHolder类中有个&quot;SomeProperty&quot; 属性的实现。注意：属性名的首字母必须大写，这是属性名&quot;SomeProperty&quot;和域名&quot;someProperty&quot;的唯一区别。属性有两种访问操作：get和set。Get访问操作返回的是someProperty域的值。Set访问操作是设置someProperty域的值，其值为&quot;value&quot;的内容。Set访问符号后面的&quot;value&quot;是C#中的保留字。通常，在其他场合下使用&quot;value&quot;关键字会出错。</p></li><li><p>PropertyTester 类使用PropertyHolder类中的SomeProperty属性。</p><p>在Main方法的第一行中，创建了PropertyHolder对象propHold。之后，把propHold对象的 someProperty 域的值设置为5，很简单，就象对域赋值一样，给属性赋值。</p></li><li><p>Console.WriteLine方法输出 propHold对象的someProperty域的值。</p></li></ol><p>这是通过使用propHold对象的SomeProperty属性来完成的。很简单，就象对域赋值一样，赋值给属性。属性可以设置为只读的，这可以通过在属性的实现中只设一个get访问符号来实现。</p><p>3.清单 10-3. 只读属性： ReadOnlyProperty.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyHolder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> someProperty <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">PropertyHolder</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> propVal<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        someProperty <span class="token operator">=</span> propVal<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SomeProperty
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> someProperty<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyTester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">PropertyHolder</span> propHold <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PropertyHolder</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Property Value: {0}&quot;</span><span class="token punctuation">,</span> propHold<span class="token punctuation">.</span>SomeProperty<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单10-3 演示了如何实现只读属性。</p><p>PropertyHolder类中，SomeProperty 属性只有一个get访问操作，没有用到set访问操作。PropertyHolder类中还有个接受整型参数的构造函数。</p></li><li><p>在PropertyTester类的Main方法中，创建了新名为propHold的PropertyHolder类的对象。</p><p>propHold对象在实例化时，调用了带参数的PropertyHolder构造函数。在本例中，参数值为5，这对propHold 对象的someProperty域的值进行了初始化。</p></li><li><p>因为PropertyHolder 类的SomeProperty属性是只读的，所以没有其他的方法来设置someProperty域的值。</p></li></ol><p>如果你插入了&quot;propHold.SomeProperty = 7&quot;语句到程序清单中，该程序编译将不会通过，因为SomeProperty是只读属性。在Console.WriteLine 方法中使用SomeProperty属性时，程序执行正常。这是因为该方法调用了SomeProperty属性的get访问操作，这是个只读操作。</p><p>4.清单 10-4. 只写属性： WriteOnlyProperty.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyHolder</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> someProperty <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SomeProperty
    <span class="token punctuation">{</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            someProperty <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;someProperty is equal to {0}&quot;</span><span class="token punctuation">,</span> someProperty<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PropertyTester</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">PropertyHolder</span> propHold <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PropertyHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        propHold<span class="token punctuation">.</span>SomeProperty <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明</p><ol><li><p>清单 10-4 演示了如何创建和使用只写属性。</p><p>这一次，在PropertyHolder类中的SomeProperty属性中，去掉了get访问操作，而加上了set访问操作。其功能是输出someProperty域的值。</p></li><li><p>在PropertyTester 类中的Main方法中，用缺省的构造函数对PropertyTester类进行初始化。</p></li></ol><p>之后，使用propHold 对象的SomeProperty属性，设置该域的值为5。这就调用了propHold 对象的set访问操作, 把someProperty 域的值设置为5，最后，把&quot;someProperty is equal to 5&quot;的信息输出到控制台。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>现在，你已经了解了什么是属性，以及属性的使用方法，你也了解了使用属性和使用传统的类的方法之间的区别。属性可以是只读的，也可以是只写的，每种场合下的使用方法，你都有所了解。</p>`,27),e=[t];function c(l,r){return s(),a("div",null,e)}const k=n(o,[["render",c],["__file","cspcls4_10.html.vue"]]);export{k as default};
