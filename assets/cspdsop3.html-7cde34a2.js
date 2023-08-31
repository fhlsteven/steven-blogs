import{_ as t,r as o,o as p,c as e,b as n,d as s,e as c,a as l}from"./app-8e5157a8.js";const r={},u={id:"system-string是不可变的字符串吗",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#system-string是不可变的字符串吗","aria-hidden":"true"},"#",-1),k={href:"https://www.cnblogs.com/Hush/archive/2004/12/07/74098.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>在学习.net编程时，你一定有听到过这样的说法，<code>System.String</code>类是不可变字符串，也就是说你不能修改一个字符串的值。</p><p>比如以下这段代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
s <span class="token operator">=</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span>
</code></pre></div><p>你并不是把<code>s</code>的值修改为<code>world</code>，而是生成了一个新的包含&quot;world&quot;的字符串，然后令s这个字符串的引用指向新的字符串，而原来的那个字符串就被抛弃掉了。</p><p>也正是基于<code>String</code>类的不可修改性，CLR采用了<strong>String Interning</strong>的技术来共享相同的字符串，以达到减少内存使用的目的。比如以下这段代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> s1 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s2 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span><span class="token punctuation">)</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;They are same&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code>s1</code>和<code>s2</code>其实指向相同的字符串。</p><p>那么是不是我们真的没有办法改变一个string的值呢？当然不是，在C++/CLI中，我们可以使用一些特殊的手段来达到我们的目的！</p><div class="language-cpp" data-ext="cpp"><pre class="language-cpp"><code>String<span class="token operator">^</span> s1 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
String<span class="token operator">^</span> s2 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>

interior_ptr<span class="token operator">&lt;</span>Char<span class="token operator">&gt;</span> p <span class="token operator">=</span> <span class="token generic-function"><span class="token function">const_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>interior_ptr<span class="token operator">&lt;</span>Char<span class="token operator">&gt;</span> <span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token function">PtrToStringChars</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span> <span class="token operator">*</span>p<span class="token punctuation">;</span> <span class="token operator">*</span>p<span class="token operator">++</span><span class="token operator">=</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            

<span class="token class-name">Console</span><span class="token double-colon punctuation">::</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0} and {1}&quot;</span><span class="token punctuation">,</span>s1<span class="token punctuation">,</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code>PtrToStringChars(String^)</code>是一个定义在<code>vcclr.h</code>头文件中的一个helper function，它返回一个类型为<code>interior_ptr&lt;const Char&gt;</code>的内部指针，指向String实例内部所包含的字符串，之所以返回类型是<code>interior_ptr&lt;const Char&gt;</code>而不是<code>interior_ptr&lt;Char&gt;</code>是因为不希望我们改变<code>String</code>实例内的字符串，不过既然我们执意要这么做，那么就让我们用一个<code>const_cast&lt;T&gt;</code>来把这个<code>const</code>搞掉！</p><p>运行以上代码你会发现，<code>s2</code>现在的内容已经是<code>aaaaa</code>，而不是<code>hello</code>了。</p><p>当然，以上例子只是说明存在修改<code>string</code>实例的内容的可能，并不是鼓励大家这么做。虽然直接访问<code>string</code>实例内部的字符串，可能会带来一些性能上的好处。但是由于String Interning的存在，修改String实例内部的字符串是相当危险的行为，比如上面的那个例子中，你会发现，s1的输出也变成aaaaa了！</p><p>posted on 2004-12-07 22:15 Justin Shen 阅读(2415) 评论(4)</p><hr><h2 id="feedback" tabindex="-1"><a class="header-anchor" href="#feedback" aria-hidden="true">#</a> Feedback</h2><p>1楼 2004-12-07 22:49 林</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> s1 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s2 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span><span class="token punctuation">)</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;They are same&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p><code>s1</code>和<code>s2</code>其实指向相同的字符串。<br> 你说错了，或者是你说的比较含糊<br><code>ReferenceEquals</code>对于引用类型来说，完全和<code>==</code>等同<br> 这点必须明白<br> 对值类型来说，是把他们box成oject对象在进行<code>==</code>比较<br></p></blockquote><p>2楼 [楼主] 2004-12-07 23:05 Justin Shen</p><blockquote><p>string的==操作是重载过的，其结果取决于string引用所指向的字符串的内容是否相同，而不仅当指向同一个字符串时，才会返回true，这并不同于Object.<br>ReferenceEquals()，考虑以下的代码：<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> s1 <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">StringBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> s2 <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Object<span class="token punctuation">.</span><span class="token function">ReferenceEquals</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span><span class="token punctuation">)</span>
Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;the two string references don&#39;t refer to the same string object, &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;whereas the two strings themselves are equal.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote></blockquote><p>3楼 2004-12-07 23:07 林</p><blockquote><p>不好意思我说错了<br> 原谅</p></blockquote><p>4楼 2004-12-08 09:23 fans1</p><blockquote><p>C#也可以用指针达到修改的目的，不一定需要c++/cli来</p></blockquote>`,27);function g(h,q){const a=o("ExternalLinkIcon");return p(),e("div",null,[n("h1",u,[i,s(),n("a",k,[s("System.String是不可变的字符串吗？"),c(a)])]),d])}const b=t(r,[["render",g],["__file","cspdsop3.html.vue"]]);export{b as default};
