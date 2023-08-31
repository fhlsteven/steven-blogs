import{_ as s,o as n,c as a,a as e}from"./app-8e5157a8.js";const p={},t=e(`<h1 id="概述c-中的索引器" tabindex="-1"><a class="header-anchor" href="#概述c-中的索引器" aria-hidden="true">#</a> 概述C#中的索引器</h1><p>未知 新一代技术网 2002-05-15</p><p>C#语言一个最令人感兴趣的地方就是类的索引器（<code>indexer</code>）。简单说来，所谓索引器就是一类特殊的属性，通过它们你就可以像引用数组一样引用自己的类。显然，这一功能在创建集合类的场合特别有用，而在其他某些情况下，比如处理大型文件或者抽象某些有限资源等，能让类具有类似数组的行为当然也是非常有用的。本文就会引领你设置类来采用索引器。但是，首先让我们概述下属性这个概念以便了解些必要的背景知识。</p><h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h2><p>假如你曾经用VB6编写过程序，那么你应该很熟悉属性方法才对，所谓属性方法其实就是特殊的类成员，它实现了对私有类域的受控访问。在C#语言中有两种属性方法，其一是<code>get</code>，通过它可以返回私有域的值，其二是<code>set</code>，通过它就可以设置私有域的值。比如说，以下面的代码为例，其间创建了一个<code>FirstName</code>属性，由它控制对私有类成员<code>firstname</code>的访问：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> firstname<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> FirstName <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span><span class="token keyword">return</span> firstname<span class="token punctuation">;</span><span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span>firstname <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>属性声明可以如下编码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Person</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>FirstName <span class="token operator">=</span> <span class="token string">&quot;Lamont&quot;</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span>WriteLine <span class="token punctuation">(</span>p<span class="token punctuation">.</span>FirstName<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>如你你所看到的那样，属性声明倒更像是域声明，只不过它还声明了两个特殊的成员，按照微软的说法就是所谓的访问函数（accessor）。当某一表达式的右边调用属性或者属性用作其他子程序（或者函数）的参数时即会调用<code>get</code>访问函数。反之，当表达式左边调用属性并且通过隐式传递<code>value</code>参数设置私有域值的情况下就会调用set访问函数。你可以创建只读属性，方法是省略<code>set</code>访问函数，这样任何设置属性的尝试都会产生编译错误。</p><h2 id="采用索引器的益处" tabindex="-1"><a class="header-anchor" href="#采用索引器的益处" aria-hidden="true">#</a> 采用索引器的益处</h2><p>说了半天咱们转到正题上来，那么为什么我要兜这个圈子呢？其实，这是因为类的索引器非常像属性，从代码上看也是这样。以下是具有索引器的类示例，通过索引器会返回一个字符串：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Sample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span> <span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span> <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token string">&quot;You passed &quot;</span> <span class="token operator">+</span> index<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，这里的属性名是<code>this</code>，意思是回引类的当前实例，参数列表包含在方括号而非括号之内。还有，这是一个只读索引器。为了把它改成读/写类型，我又添加了一个<code>set</code>访问函数。在定义索引器的时候，你不一定只采用一个参数。索引器参数可以采用任何类型，不过<code>int</code>是通常采用也是最为合理的类型。同一类中还可能拥有一个以上的索引器（重载）。</p><p>如上定义了Sample类之后，我们就可以把索引器用作某种默认的属性，如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Sample</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Sample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span><span class="token number">55</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="属性和索引器" tabindex="-1"><a class="header-anchor" href="#属性和索引器" aria-hidden="true">#</a> 属性和索引器</h2><p>属性和索引器之间有好些差别：</p><p>类的每一个属性都必须拥有唯一的名称，而类里定义的每一个索引器都必须拥有唯一的签名（signature）或者参数列表（这样就可以实现索引器重载）。 属性可以是<code>static</code>（静态的）而索引器则必须是实例成员。 为索引器定义的访问函数可以访问传递给索引器的参数，而属性访问函数则没有参数。</p><h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2><p>类似数组的行为常受到程序实现者的喜爱，所以你还可以为接口定义索引器，<code>IList</code>和<code>IDictionary</code>集合接口都声明了索引器以便访问其存储的项目。</p><p>在为接口声明索引器的时候，记住声明只是表示索引器的存在。你只需要提供恰当的访问函数即可，不必包括范围修饰符。以下代码把索引器声明为接口<code>IImplementMe</code>的一部分：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IImplementMe</span> <span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token keyword">this</span><span class="token punctuation">[</span><span class="token class-name"><span class="token keyword">int</span></span> index<span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span><span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>相应实现的类则必须为<code>IimplementMe</code>的索引器具体定义<code>get</code>和<code>set</code>访问函数。</p><p>以上就是有关索引器的一些基本概述了。现在你应该对索引器在你的开发中所具有的作用有了较深入的了解。</p>`,24),c=[t];function o(l,u){return n(),a("div",null,c)}const i=s(p,[["render",o],["__file","cspbase3.html.vue"]]);export{i as default};
