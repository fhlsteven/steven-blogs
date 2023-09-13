import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},e=p(`<h1 id="c-中的非安全编程" tabindex="-1"><a class="header-anchor" href="#c-中的非安全编程" aria-hidden="true">#</a> C#中的非安全编程</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>这是C/C++程序迷们经常谈论的一个话题，同时也是一个复杂的、难以理解的话题－指针！每次谈到C#，大多数我遇到的人都持这样的观点－C#中没有指针的概念。而实际上，它已经被废除了，取而代之的是C#中的非安全编程－如何在程序中使用指针。不同于其字面意思的是，使用指针编程并没有什么不安全的。</p><p>它如此受关注的根本原因是，非安全编程不同于习惯的.NET开发规范，而需要编程人员进行明确定本地环境设置(仅适用于本地执行)。本文我将从区别两个最容易被疑惑的概念－非安全代码与非受控代码开始讨论非安全编程这个主题。接下来我们将讨论如何编写非安全代码，亦即如何在C#中使用指针。</p><p>非安全还是非受控？</p><p>受控代码是指在CLR管理下执行的代码。CLR负责了许多幕后的工作：</p><ul><li>管理对象的内存</li><li>进行类型验证</li><li>垃圾回收</li></ul><p>说了这些，实际就是要将用户从上述的这些工作中解脱出来了，专心于业务实现。用户不再需要直接手工地进行内存操作，因为这些工作已由CLR完成了。</p><p>另一方面，非受控代码就是在CLR上下文外执行的代码了。最好的例子就是我们平时使用的Win32 DLL，比如kernel32.dll，user32.dll以及安装上我们系统上的各种COM组件。如何为它们分配内存、如何释放这些内存、如何实现类型验证？这些工作都需要它们自己来完成。一个典型的C++程序中分配一个字符指针的语句也是非受控代码的另一类例子，因为作为一名编程者，你要负责：</p><ul><li>调用内存分配函数</li><li>确保类型转换的结果正确</li><li>确保指针在使用完毕后其内存被释放</li></ul><p>如果你留心上面的解释，所有这些工作都是由CLR来完成以减轻编程者的负担。</p><p>非安全代码是介于受控与非受控代码间的一种代码类型</p><p>非安全代码仍然象受控代码一样是在CLR的管理下执行的，但在同时它又象非受控代码一样允许你通过指针直接访问内存。因此你获得了两者的优点。如果你正在编写写一个.NET应用程序，但同时又希望可以广泛使用Win32 DLL中的各种函数－需要使用指针的，那么此时非安全代码就是你的救星了。</p><p>我们已经明确了两者的区别后，就开始编写实际的代码，毫无疑问，这才是最精彩的部分，你还在想什么呢？</p><h2 id="深入非安全代码" tabindex="-1"><a class="header-anchor" href="#深入非安全代码" aria-hidden="true">#</a> 深入非安全代码</h2><p>编写非安全代码需要使用特殊的关键字<code>unsafe</code>与<code>fixed</code>。如果你还记得的话，有三种指针操作符：<code>*</code>,<code>&amp;</code>,<code>-&gt;</code></p><p>任何使用了上述任一指针操作符的语句、语句块或者函数都应用<code>unsafe</code>关键字标记为非安全代码，就象这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">unsafe</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Triple</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>pInt<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
　  <span class="token operator">*</span>pInt<span class="token operator">=</span><span class="token punctuation">(</span><span class="token operator">*</span>pInt<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面这个函数只是将传入的参数的值扩大了两倍。但是请注意，传入的是这个参数的指针！因为这个函数使用了&quot;*&quot;操作符直接进行内存操作，因此被标记为 unsafe。</p><p>但是这里还是有一个问题。回想一下上面的讨论，非安全代码也是在CLR管理下的受控代码，CLR可以自由地将对象移入内存中。于是一个似是而非的原因可能导致内存泄漏。这样做的结果是，对于编程者可能在自觉不自觉中使这个变量的指针指向内存的其他地方。</p><p>因此假设<code>*pInt</code>指向的地址是1001，而CLR的内存重定位过程将会引发内存泄漏。pInt之前指向1001，在重定位后其指向的数据可能被存储在地址2003处。于是大祸临头了！pInt指向的1001处存储的数据在经过重定位过程后无效了。这也许就是.NET很少提及指针的使用的原因吧，你认为呢？</p><h3 id="固定指针" tabindex="-1"><a class="header-anchor" href="#固定指针" aria-hidden="true">#</a> 固定指针</h3><p>在语句块前输入关键字<code>fixed</code>，将会告诉CLR块内的对象不能重定位，这样CLR就不会重定位指针指向的数据存储位置。因此在C#中使用指针时，使用关键字fixed将能阻止程序运行时无效指针的产生。让我们看看它是如何工作的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">CData</span>
<span class="token punctuation">{</span>
　　<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">CProgram</span>
<span class="token punctuation">{</span>
　　<span class="token keyword">unsafe</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetVal</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>pInt<span class="token punctuation">)</span>
　　<span class="token punctuation">{</span>
　　　　<span class="token operator">*</span>pInt<span class="token operator">=</span><span class="token number">1979</span><span class="token punctuation">;</span>
　　<span class="token punctuation">}</span>
　　
　　<span class="token keyword">public</span> <span class="token keyword">unsafe</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
　　<span class="token punctuation">{</span>
　　　　<span class="token class-name">CData</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
　　　　Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Previous value: {0}&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　　　<span class="token keyword">fixed</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>p<span class="token operator">=</span><span class="token operator">&amp;</span>d<span class="token punctuation">.</span>x<span class="token punctuation">)</span>
　　　　<span class="token punctuation">{</span>
　　　　　　<span class="token function">SetVal</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　　　<span class="token punctuation">}</span>
　　　　Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;New value: {0}&quot;</span><span class="token punctuation">,</span> d<span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
　　<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们在这段代码里通过一个<code>fixed</code>块，将<code>CData</code>对象数据成员(域)<code>x</code>的地址赋给了一个整数型指针<code>p</code>。当<code>fixed</code>块中的语句被执行时，这个指针<code>p</code>将一直指向原来的那块内存区域，因为CLR已被指示暂时冻结这个变量直到该<code>fixed</code>块执行完毕。一旦<code>fixed</code>块执行完毕，这个对象就又能被CLR重新定位了。</p><p>以上就是C#中使用指针编程的介绍，关键是要说明语句块是　unsafe　并　fixed　的。希望能因此提高你对C#中指针使用的知识！</p>`,26),o=[e];function c(l,u){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","cspbase22.html.vue"]]);export{k as default};
