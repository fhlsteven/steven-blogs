import{_ as n,o as s,c as a,d as p}from"./app-3696c600.js";const t={},o=p(`<h1 id="c-中使用指针" tabindex="-1"><a class="header-anchor" href="#c-中使用指针" aria-hidden="true">#</a> C#中使用指针</h1><p>作者： 飞刀 www.ASPCool.com 时间:2001-11-12 12:08:20 阅读次数:1328</p><p>我想许多C程序员不愿意学习Java的原因就是Java不支持指针，但是现在类似于Java的C#却已经支持了指针，你可以使用<code>unsafe</code>关键字来告诉编译器下面的函数或者代码是不安全的。一旦你使用了<code>unsafe</code>，那么你就可以在<code>unsafe</code>区域中使用指针。</p><p>程序1</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">nish</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsafe</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Increment</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//increment the int pointed to by p </span>
        <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token operator">*</span>p <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">//we pass the address of the int to the function as it expects a pointer </span>
        <span class="token keyword">unsafe</span> <span class="token function">Increment</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//now we print out the value of i </span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>  
</code></pre></div><p>当你运行这个程序，你将会看到输出结果<code>2</code>。这是因为你已经将变量<code>i</code>的地址送给了函数<code>Increment</code>来处理。变量<code>i</code>建立于栈，<code>&amp;i</code>则表示它在栈中的地址。这样在函数<code>Increment</code>中，<code>p</code>就指向<code>i</code>的地址，当我们对<code>*p</code>加<code>1</code>时，实际上是对变量<code>i</code>进行增加。</p><p>程序2</p><p>下面的程序将会让你更清楚的了解：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">nish</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsafe</span> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> k <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;address of j={0} and address of k={1}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>j<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;j={0} k={1}&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token operator">*</span> p<span class="token punctuation">;</span>
        p <span class="token operator">=</span> <span class="token operator">&amp;</span>j<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;p now points to {0}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;j={0} k={1}&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
        p <span class="token operator">=</span> <span class="token operator">&amp;</span>k<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;p now points to {0}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;j={0} k={1}&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当运行上面的程序，我们将得到下面的结果。你会看到一些你熟悉的东东，下面的输出结果将会清楚的看到程序执行的过：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>address of <span class="token assign-left variable">j</span><span class="token operator">=</span><span class="token number">1244312</span> and address of <span class="token assign-left variable">k</span><span class="token operator">=</span><span class="token number">1244308</span> 
<span class="token assign-left variable">j</span><span class="token operator">=</span><span class="token number">100</span> <span class="token assign-left variable">k</span><span class="token operator">=</span><span class="token number">100</span> 
p now points to <span class="token number">1244312</span> 
<span class="token assign-left variable">j</span><span class="token operator">=</span><span class="token number">200</span> <span class="token assign-left variable">k</span><span class="token operator">=</span><span class="token number">100</span> 
p now points to <span class="token number">1244308</span> 
<span class="token assign-left variable">j</span><span class="token operator">=</span><span class="token number">200</span> <span class="token assign-left variable">k</span><span class="token operator">=</span><span class="token number">300</span> 
</code></pre></div><p>首先将变量的<code>j</code>的地址赋给<code>p</code>，这样当我们改变<code>*p</code>时，j的值也将自动改变。接着我们将<code>p</code>指向变量<code>k</code>的地址，这时改变<code>*p</code>则是在改变<code>k</code>。</p><p>同样需要清楚的就是变量<code>p</code>也有自己的地址，下面的程序将会清楚的告诉您一切。</p><p>程序 3</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">nish</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">unsafe</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span><span class="token operator">*</span> p<span class="token punctuation">;</span>
            p <span class="token operator">=</span> <span class="token operator">&amp;</span>a<span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;address of a is {0}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;p now points to {0}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;address of the pointer variable p is {0}&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>一运行上面的代码，我们将获得下面显示的输出。你将同样获得一些类似的输出，注意这里<code>unsafe</code>关键字的使用。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>address of a is <span class="token number">1244312</span> 
p now points to <span class="token number">1244312</span> 
address of the pointer variable p is <span class="token number">1244308</span> 
</code></pre></div><p><code>1244308</code>是指针变量<code>p</code>的地址，而<code>1244312</code>则是指针<code>p</code>所指向的地址，我们使用<code>*p</code>来获得。</p><p>程序 4</p><p>Okey。在最后的一个程序中，我将向大家介绍如何使用指针来操作字符串。在这个程序中存在一个程序来将一段字符串通过异或运算进行编码解码的操作。如果您将一段字符串送入这个函数这个字符串将会被编码，如果您将一段已经编码的字符送入这个函数，这段字符串将会被解码。当这并不是一个安全的加密方法，我仅仅是想通过这个例子来演示一下指针的作用。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">nish</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token string">&quot;Code Project is cool&quot;</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;the original string : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}\\r\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span></span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        s<span class="token punctuation">.</span><span class="token function">CopyTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;the encoded string : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">unsafe</span> <span class="token keyword">fixed</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> b<span class="token punctuation">)</span> <span class="token function">NEncodeDecode</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> t <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> t <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> t<span class="token operator">++</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span>t<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;the decoded string : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">unsafe</span> <span class="token keyword">fixed</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> b<span class="token punctuation">)</span> <span class="token function">NEncodeDecode</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> t <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> t <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> t<span class="token operator">++</span><span class="token punctuation">)</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span>t<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">unsafe</span> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">NEncodeDecode</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> s<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> w<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> y <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> y<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            w <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">(</span>s <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
            w <span class="token operator">=</span> w <span class="token operator">^</span> <span class="token number">5</span><span class="token punctuation">;</span>
            <span class="token operator">*</span><span class="token punctuation">(</span>s <span class="token operator">+</span> y<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>w<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面是我得到的输出，你也同样可以得到：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>  the original string <span class="token builtin class-name">:</span> Code Project is cool 
   
  the encoded string <span class="token builtin class-name">:</span> Fja<span class="token variable"><span class="token variable">\`</span>%Uwjo<span class="token variable">\`</span></span>fq%lv%fjji 
   
  the decoded string <span class="token builtin class-name">:</span> Code Project is cool 

</code></pre></div><p>本例中，你会发现一个新的关键字--<code>fixed</code>。当你在语句或函数之前使用<code>fixed</code>时，你是在告诉.Net平台的垃圾回收器，在这个语句或函数执行完毕前，不得回收其所占的内存空间。<code>fixed</code>关键字只能在不安全的代码中使用。本例中如果不使用<code>fixed</code>关键字，那么这段程序的执行的结果是不可预知的，因为垃圾回收器会不断的回收这些可控制代码的所占用的内存空间。幸运的是，编译器不会允许您指向可控制变量，除非您使用了<code>fixed</code>关键字。</p><p>在这个函数中，你看到我使用了<code>*(s+y)</code>表达式。<code>s</code>是指向字符串的地址（注意是首地址）。<code>y</code>则通过循环从0增加到19。这样<code>*(s)</code>给我们的地址是1000,<code>*(s+1)</code>则是1002，<code>*(s+2)</code>则是1004，以此类推。编译器知道我指向的是一个字符数据，因此第次就向前移动两个字节，因为<code>char</code>是16位的（这与c是不同的，c中char只占8位）。</p><p>结论</p><p>使用不安全代码时，必须十分小心，任何细小的错误，甚至是类型错误，都会导致输出结果的不可遇知，而且这种错误是很难调试发现。当然如果您是C/C++程序员，您已经对指针了解得十分透彻，那么当我的话没有说。呵呵，祝好运。 (编译：http://www.aspcn.com 飞刀)</p>`,27),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspusepointer.html.vue"]]);export{i as default};
