import{_ as p,r as t,o as e,c as o,b as n,d as s,e as c,a as l}from"./app-d9da1b6d.js";const u={},k=n("h1",{id:"c-中的异常处理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#c-中的异常处理","aria-hidden":"true"},"#"),s(" C#中的异常处理")],-1),i=n("h2",{id:"前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前言","aria-hidden":"true"},"#"),s(" 前言")],-1),r={href:"http://www.jaggersoft.com/",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>PS:这篇文章非常简单，如果你感觉到自己已经到达一定的水平，那么，请不要浪费时间了</p><h2 id="一-、令人痛苦的程式化错误处理" tabindex="-1"><a class="header-anchor" href="#一-、令人痛苦的程式化错误处理" aria-hidden="true">#</a> 一 、令人痛苦的程式化错误处理</h2><p>异常还没出现前，处理错误最经典的方式就是使用错误代码检查语句了。例如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">Painful</span>
<span class="token punctuation">{</span>  
    <span class="token range operator">..</span><span class="token punctuation">.</span>  
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCode <span class="token operator">==</span> <span class="token number">2342</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> handler<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>  
        <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCode <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">734</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> handler<span class="token punctuation">;</span>
        <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCode <span class="token operator">==</span> <span class="token number">2664</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> handler<span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>errorCode <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">5227</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> handler<span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Process</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> source<span class="token punctuation">;</span>
        handler<span class="token punctuation">:</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这种编码方式单调乏味，翻来复去，难以使用，看起来非常的复杂，而且还使得基本功能很不清晰。并且还很容易忽略错误（故意或者偶尔的遗忘）。现在好了，有很多来处理这种情况，但是其中必有一些处理方式要好过其他的。</p><h3 id="二、关系分离" tabindex="-1"><a class="header-anchor" href="#二、关系分离" aria-hidden="true">#</a> 二、关系分离</h3><p>异常所能做到的最基本的事情就是允许你将错误和基本功能分离开来。换句话，我们能将上面的改写如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">PainLess</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
           <span class="token class-name"><span class="token keyword">string</span></span> filename <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
           <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token function">ReadSource</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token function">Process</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> source<span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SecurityException</span>    caught<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span>          caught<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">OutOfMemoryException</span> caught<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> source<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在转化过程中，需要注意以下几点：</p><ol><li>以前使用数字作为错误代码来描述错误（很失败的一种做法，谁知道2342是什么意思呢？），现在使用命名的异常类来描述（例如：<code>SecurityException</code>）。</li><li>异常类彼此之间的关系并没有紧密的联系在一起。相反的，用来描述某一类错误的整数代码在整个错误描述代码中必须是唯一。</li><li>在<code>ReadSource</code>方法中没有没有抛出详细说明。在C＃中抛出说明并不是必须的。</li></ol><p>然而，最值得注意是：比较两段代码，ReadSource变得非常的清晰、简单、明了。它现在仅包含需要实现其基本功能的语句，没有表现出明显的错误处理。这是可以的，因为如果出现异常，调用堆栈就会自我展开。这个版本是我们想要的“理想”版本。</p><p>然而，异常允许我们接近这个ReadSource的理想版本，同时，又阻止我们到达它。ReadSource是一个编码例子，它请求资源（一个TextReader），使用了资源（Read），并且释放了资源（Close）。问题是如果在请求资源的过程中出现了异常，那么资源将不会被释放。这个问题的解决是本文的一部分。不过，“理想“中的ReadSource版本仍然是有用的。我们将使用它做为下面几个版本的ReadSource评价的参照物。</p><hr><h3 id="三、finally" tabindex="-1"><a class="header-anchor" href="#三、finally" aria-hidden="true">#</a> 三、finally?</h3><p>解决释放问题的方法依靠你现在使用的语言。在C++中，你可以使用构建于堆栈上的析构函数。Java中，你能构使用finally程序块。C＃允许你创造自定义的结构类型但是不允许结构中的析构函数（只是因为一个C＃析构函数其实是一个Finally方法，Finally被垃圾回收器调用。结构类，是一种值类型，并不归属于垃圾回收器回收的范围）。因而，只是在开始，C＃必须追循Java的道路，使用finally程序块。首先，我们的finally程序块开起来如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个版本不得不引入一个try程序块（既然一个finally程序快必须跟随在一个try程序块后），这将是一个合理的解决方案，如果它奏效的话。但是，它没有做到。问题是try程序块构建成一个范围，所以在finally程序块中的reader并不在这个范围内并且返回语句中的source也不在这个范围。</p><p><strong>finally?</strong></p><p>为了解决这个问题，你不得不将reader和source的声明移到try程序块的外面，第二次尝试如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TextReader</span> reader<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个版本将reader和source的声明移到了try程序块的外面，接着指派给reader和source但没有初始化它们。这是和开始的“理想”版本不同的另外一个地方（出现两个多余行）。然而，你可能认为如果它工作，那将是一个合理的解决方案。但是它没有。问题是委派并不等同于初始化及让编译器知道它。如果在reader被分配之前出现一个异常，这是在finally程序块中对reader.close()的调用 将根据没有被分配的reader，C#,像Java一样，不允许那样。</p><p><strong>finally?</strong></p><p>很明显，你必须要初始化reader，第三次尝试如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个版本引入了空值，这没有出现在最初的“理想版本”中。不过，如果你仍然认为如果它起作用这将是一个合理的解决方式，然而它不是（虽然它能通过编译）。问题是你在调用reader.close()的时候很容易抛出NullReferenceException异常。</p><p><strong>finally?</strong></p><p>一种解决方法是对eader.close（）方法进行保护，下面做第四次尝试：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
        source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>reader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当然，对reader.close()的保护并不是ReadSource的理想版本。但是，如果仅从它的效果上看，这将是一个合理的版本。最终，工作。它和最初的版本已经大不相同。稍微努力，你能复用下面这段代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>reader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在某些情况下，你可以在finally程序块中对可能出现空值进行判断（上面就是一个这样的例子），但是一般说来，你最好还是在finally程序块中判断一下（考虑到如果file.OpenText返回空值，或者如果reader被放进了try程序块中，或者reader作为ref/out参数被传递到try程序块中）。你不得不增加一个try程序块，一个finally程序块，和一个if防护。如果你正在使用Java，你不得不每一次都去做这些事情。在那里是个最大的问题。如果这个解决方案非常令人厌烦且完全偏离于最初的“完美”方案，这没有关系，你能够将这些异常提取到一块。在Java中，你不能这么做。遇到异常，Java将停止运行，而C#则将继续。</p><h3 id="四、using语句" tabindex="-1"><a class="header-anchor" href="#四、using语句" aria-hidden="true">#</a> 四、using语句</h3><p>在C#中，最接近于“理想”版本的是使用using语句：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token function">ReadSource</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">FileInfo</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>file<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>Reader</code>将会被恰当的关闭。简单说来，<code>using</code>语句有大量的特征能够改善开始的“理想”版本。首先，我们看一下它内在的运行机制到底是怎样的。</p><h4 id="using语句转换" tabindex="-1"><a class="header-anchor" href="#using语句转换" aria-hidden="true">#</a> using语句转换</h4><p>C＃ECMA标准描述<code>using</code>声明：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">type</span> variable <span class="token operator">=</span> initialization<span class="token punctuation">)</span>
    embeddedStatement
</code></pre></div><p>它等同于</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">{</span>
    <span class="token class-name">type</span> variable <span class="token operator">=</span> initialization<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        embeddedStatement
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>variable <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>IDisposable<span class="token punctuation">)</span>variable<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它依赖于<code>System</code>命名空间中的<code>IDisposable</code>接口：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">System</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDisposable</span>
    <span class="token punctuation">{</span>
        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意：<code>finally</code>程序块中的牵制转换意味着，这个变量必须是一个支持<code>IDisposable</code>接口的类（通过继承或转换操作）。如果它不是，你就会得到一个编译时错误。</p><h4 id="using-textreader-转换" tabindex="-1"><a class="header-anchor" href="#using-textreader-转换" aria-hidden="true">#</a> <code>using TextReader</code> 转换</h4><p>不出乎意料，<code>TextReader</code>支持<code>IDisposable</code>接口，并且实现了<code>Dispose</code>来调用关闭。这意味着：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>相当于下面：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">{</span>
    <span class="token class-name">TextReader</span> reader <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>reader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token punctuation">(</span><span class="token punctuation">(</span>IDisposable<span class="token punctuation">)</span>reader<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>除了对<code>IDisposable</code>的强制转换外，这和最通用的Java解决方式是相同的。这个强制转换是必须的因为这是一个通用解决方式。</p><hr><h2 id="五、以自定义方式处理" tabindex="-1"><a class="header-anchor" href="#五、以自定义方式处理" aria-hidden="true">#</a> 五、以自定义方式处理</h2><p>这是有益的当你去考虑如果<code>TextReader</code>没有实现<code>IDisposable</code>接口将会出现什么情况。这篇教程从此处开始将知道我们如何在我们自己的类里实现<code>Dispose</code>的处理。一种方式是使用对象适配器（Object Adapter）模式。例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">AutoTextReader</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDisposable</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">AutoTextReader</span><span class="token punctuation">(</span><span class="token class-name">TextReader</span> target<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// PreCondition(target != null);</span>
        adaptee <span class="token operator">=</span> target<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">public</span> <span class="token return-type class-name">TextReader</span> TextReader
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> adaptee<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span> 
        adaptee<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">TextReader</span> adaptee<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre></div><p>你可以这样使用你自己的类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">AutoTextReader</span> scoped <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoTextReader</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>你能够使用隐式转换操作符使问题变得更简单一些：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">AutoTextReader</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDisposable</span></span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">implicit</span> <span class="token keyword">operator</span> <span class="token function">AutoTextReader</span><span class="token punctuation">(</span><span class="token class-name">TextReader</span> target<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AutoTextReader</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这将允许你这样使用：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">AutoTextReader</span> scoped <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="struct-另一种选择" tabindex="-1"><a class="header-anchor" href="#struct-另一种选择" aria-hidden="true">#</a> struct ：另一种选择</h3><p><code>AutoTextReader</code>有意使用为密封类，就想它的名字建议的，以用作本地变量。使用一个结构来代替类更加有意义：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">AutoTextReader</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDisposable</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">// exactly as before</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用一个结构代替类也提供给你几种自由优化。既然一个结构是一个值类型，它能构一直都不是空值。这意味着编译器必须对生成的<code>finally</code>程序块做空值的检测。并且，既然你不能继承于一个结构，它的运行时将和编译时的类型一致。这意味着编译器一般在生成的<code>finally</code>程序块中做强制转换并因而避免了一次装箱操作（特别的，如果<code>Dispose</code>是一个公开的隐式接口实现而不是一个不公开的显示接口实现，这将避免强制转换）。</p><p>换句话，就是这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">AutoTextReader</span> scoped <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>被转换为：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">{</span>
    <span class="token class-name">AutoTextReader</span> scoped <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">file<span class="token punctuation">.</span>OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span>
    <span class="token punctuation">{</span>
        scoped<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由此，我更喜欢使用<code>using</code>语句代替<code>finally</code>程序开来处理。事实上，<code>using</code>语句解决方式相较于开始的“理想“版本还有如下额外的几个优点，一个<code>using</code>语句：</p><ul><li>运行中，它能够一直释放资源</li><li>是一个扩展机制。它允许你创建一个资源释放的集合。创建你自己的资源释放类例如<code>AutoTextReader</code>是容易的。</li><li>允许你将资源获取和资源释放配对使用。释放资源最好的时刻就是你获得资源的一刻。就像如果你从图书馆借了一本书，你能在你借的时候被告知什么时候归还。</li><li>根据句法构造，能够清楚的告诉你你正在使用一个资源。</li><li>为拥有资源的变量创造一个范围。仔细观察对<code>using</code>语句的编译器转换，你将发现它聪明的使用了一对外部括号。</li></ul><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">AutoTextReader</span> scoped <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
scoped<span class="token punctuation">.</span>TextReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// scoped is not in scope here</span>
</code></pre></div><p>这是对C＋＋中依据条件声明的追溯。允许你限制变量使用的范围，仅仅在这个范围内，变量是有用的，当变量能够使用，它只能存在于这个范围内。</p>`,71);function y(w,g){const a=t("ExternalLinkIcon");return e(),o("div",null,[k,i,n("p",null,[s("Jon Jagger先生是一个经历丰富的人，写的文章简单而发人深省。大家可以到"),n("a",r,[s("他的网站"),c(a)]),s("上浏览一番，必然受益匪浅。这篇文章虽然比较简单，翻译当中难免出现错误，希望大家多多指教。")]),d])}const h=p(u,[["render",y],["__file","cspcls6.html.vue"]]);export{h as default};
