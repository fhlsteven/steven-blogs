import{_ as s,o as n,c as a,a as p}from"./app-57d1f7b1.js";const c={},e=p(`<h1 id="讲解c-的namespace" tabindex="-1"><a class="header-anchor" href="#讲解c-的namespace" aria-hidden="true">#</a> 讲解C#的Namespace</h1><p>www.chinacs.net 2001-5-21 21:55:00 中文C#技术站</p><p>我现在感到学好C#就是就是要知道，C#的基本语法，C#的新的特点，C#能干什么！</p><p>其中我感到不管如何，NAMESPACE都是很关键的，可以说不是只对C#而言，而是整个。NET都是由NAMESPACE组成的，所以我在看了C#的基本语法后，就直奔NAMESPACE来了，在这里写下自己的一些感觉，希望能对后面学习的人有所帮助。</p><p>NAMESPACE在新的NET环境下编程可以说是无所不在，总之，给我的感觉就是MS的新一代的语言的核心就是NAMESPACE，我们可以通过已经有的NAMESPACE，做我们想做的和愿意做的，当然如果你感觉现有的还不够你的使用的话，你也可以自己来使用现有的来扩展，创建自己的NAMESPACE！（感觉怎么很象以前的COM、DCOM呢？）</p><p>下面我门说说如何建立一个NAMESPACE！</p><p>定义一个NAMESPACE首先需要包含关键词：<code>namespace</code></p><p>格式如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Your_nsname</span>
<span class="token punctuation">{</span>
    <span class="token comment">//namespase主体内容；</span>
<span class="token punctuation">}</span>
</code></pre></div><p>呵呵，给我的感觉就好象和Class或Struct一样。不过他们除了形式有类似外，确实在很多方面都不相同，具体我们以后会慢慢说到！先往下看。。。</p><p>在一个NAMESPACE的主体内，可以引用其他的NAMESPACE！例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Your_nsname</span><span class="token punctuation">{</span>
<span class="token comment">//下面引用System和System.Xml着两个NAMESPACE；</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Xml</span><span class="token punctuation">;</span>
<span class="token comment">//namespase主体内容；</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在上面有一个需要注意的就是，如果要引用NAMESPACE的话，那么应该在申明其它类型前引用，如下是错误的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Your_nsname</span><span class="token punctuation">{</span>
<span class="token comment">//其它一些内容；</span>
<span class="token comment">//由于引用System和System.Xml放到了其它语句之后，所以。。。</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Xml</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>另外对于NAMESPACE还有一个有趣的地方，就是。。。</p><p>我们先看一下下面的的两个方式：</p><p>方式一、</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N1<span class="token punctuation">.</span>N2</span>
<span class="token punctuation">{</span> 
    <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>方式二、</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">namespace</span> <span class="token namespace">N2</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在上面的良种方式中，第二种很容易就能看懂，是在NAMESPACE N1中再创建一个NAMESPACE N2，而N2中有两个类（class）A、B！那么第一种呢？其实上面两个方式定义的其实是一模一样的。NAMESPACE是可以嵌套定义的，我们可以使用第二种方式，层次感觉比较清楚，也可以使用第一种方式，所不同的是，第一中方式中，在N1和N2之间必须用分隔符“.”来表明他们两者之间的层次关系！</p><p>在使用的时候用如下的方式：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>N1<span class="token punctuation">.</span>N2<span class="token punctuation">.</span>A<span class="token punctuation">;</span>
N1<span class="token punctuation">.</span>N2<span class="token punctuation">.</span>B<span class="token punctuation">;</span>
</code></pre></div><p>在一个NAMESPACE中，我们也可以用一个别名指代现有的NAMESPACE或是一些其他类型数据。</p><p>别名的使用格式如下：</p><p><code>using 别名 = 一个已经存在的类型；</code></p><p>例如：<code>using soholife = System;</code></p><p>下面我们通过几个例子来加深一下理解：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N1<span class="token punctuation">.</span>N2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token class-name">A</span> <span class="token operator">=</span> <span class="token class-name">N1<span class="token punctuation">.</span>N2<span class="token punctuation">.</span>A</span><span class="token punctuation">;</span>
    <span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这里，在N3中，A是N1.N2.A的别名，而N3.B则继承于N1.N2.A!同样的我们也可以用下面的方式来取得同样的效果：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token class-name">R</span> <span class="token operator">=</span> <span class="token class-name">N1<span class="token punctuation">.</span>N2</span><span class="token punctuation">;</span>
    <span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">R<span class="token punctuation">.</span>A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说道这里，我想提个问题，先看下面的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N1<span class="token punctuation">.</span>N2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token class-name">A</span> <span class="token operator">=</span> <span class="token class-name">N1<span class="token punctuation">.</span>N2<span class="token punctuation">.</span>A</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果我们这样写，会有问题吗？</p><p>答案当然是肯定的了，错！因为一个别名必须是在NAMESPACE中唯一的，而上面由于已经有了</p><p><code>class a{}</code>，我们在用<code>using A =N1.NE.A;</code>就所以肯定要出错了！不过如果我们该成:</p><p><code>using B =N1.N2.A;</code>那么结果如何呢？朋友门自己想想吧！我就不多说了！</p><p>本来以为可以结束了，突然发现还有一个地方还没有说清楚，可以说是就没有说，呵呵，看来只能晚些回家了，我门还是从问题看起吧：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">N1<span class="token punctuation">.</span>N2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token class-name">R</span> <span class="token operator">=</span> <span class="token class-name">N1<span class="token punctuation">.</span>N2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">R<span class="token punctuation">.</span>A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面的例子中，不知道大家觉得如何，正确？错误？</p><p>如果我来回答的话，错！（呵呵，以前做选择题养成的习惯，凡是这样问的答案就是错！不过原因是说不出来的了！）</p><p>真的上面这个程序，先开始看我也以为是正确的，后来才知道。。。，唉，看来还是要多看书的！</p><p>原来在一个分开的单元中使用别名的时候，别名只是在它所在的单元中（NAMESPACE或其它）可以使用，而在其他单元中是不能够用的，所以上面的那个例子中，在第二个N3中使用R的时候，会提示R未知！当然了，如果我们想使用这样的方式，我们还是有办法的，就是把别名R写到N3的外面：如下</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token class-name">R</span> <span class="token operator">=</span> <span class="token class-name">N1<span class="token punctuation">.</span>N2</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">N3</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">B</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">R<span class="token punctuation">.</span>A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了说了这么多，如果能全部理解的话，我想应该能适当的对NAMESPACE有一些概念了！如果能这样的话，我的目的也达到了！</p>`,45),t=[e];function o(l,k){return n(),a("div",null,t)}const i=s(c,[["render",o],["__file","cspcls8.html.vue"]]);export{i as default};
