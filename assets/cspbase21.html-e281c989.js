import{_ as s,o as n,c as a,d as p}from"./app-3696c600.js";const e={},t=p(`<h1 id="随机数的使用" tabindex="-1"><a class="header-anchor" href="#随机数的使用" aria-hidden="true">#</a> 随机数的使用</h1><p>大家可能都用过Chinaren的校友录，不久前它的留言簿上加了一个防止灌水的方法，就是系统每次产生一个由随机的数字和字母组成的图片，每次留言必须正确地输入这些随机产生的字符，否则不能添加留言。这是一个很好的防止恶意攻击的方法，其核心的技术就是如何产生随机数。Chinaren网站是使用PHP实现的，而我们可以充分利用ASP.net的强大功能很轻易地实现。</p><p>在.net Framework中提供了一个专门用来产生随机数的类<code>System.Random</code>,使用这个类时必须导入System命名空间。当然，命名空间System在每个ASP.net页面中都是自动导入的，所以我们可以直接使用这个类。</p><p>对于随机数，大家都知道，计算机不可能产生完全随机的数字，所谓的随机数发生器都是通过一定的算法对事先选定的随机种子做复杂的运算，用产生的结果来近似的模拟完全随机数，这种随机数被称作伪随机数。伪随机数是以相同的概率从一组有限的数字中选取的。所选数字并不具有完全的随机性，但是从实用的角度而言，其随机程度已足够了。伪随机数的选择是从随机种子开始的，所以为了保证每次得到的伪随机数都足够地“随机”，随机种子的选择就显得非常重要。如果随机种子一样，那么同一个随机数发生器产生的随机数也会一样。一般地，我们使用同系统时间有关的参数作为随机种子，这也是.net Framework中的随机数发生器默认采用的方法。</p><p>我们可以使用两种方式初始化一个随机数发生器：</p><p>第一种方法不指定随机种子，系统自动选取当前时间作为随机种子：</p><p><code>Random ro = new Random();</code></p><p>第二种方法可以指定一个int型参数作为随机种子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> iSeed<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
<span class="token class-name">Random</span> ro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Random</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre></div><p>之后，我们就可以使用这个Random类的对象来产生随机数，这时候要用到<code>Random.Next()</code>方法。这个方法使用相当灵活，你甚至可以指定产生的随机数的上下限。</p><p>不指定上下限的使用如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> iResult<span class="token punctuation">;</span>
iResult<span class="token operator">=</span>ro<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre></div><p>下面的代码指定返回小于100的随机数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> iResult<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> iUp<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">;</span>
iResult<span class="token operator">=</span>ro<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>iUp<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre></div><p>而下面这段代码则指定返回值必须在50-100的范围之内：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> iResult<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> iUp<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> iDown<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">;</span>
iResult<span class="token operator">=</span>ro<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span>iDown<span class="token punctuation">,</span>iUp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>除了<code>Random.Next()</code>方法之外，Random类还提供了<code>Random.NextDouble()</code>方法产生一个范围在0.0-1.0之间的随机的双精度浮点数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">double</span></span> dResult<span class="token punctuation">;</span>
dResult<span class="token operator">=</span>ro<span class="token punctuation">.</span><span class="token function">NextDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,18),o=[t];function c(l,u){return n(),a("div",null,o)}const i=s(e,[["render",c],["__file","cspbase21.html.vue"]]);export{i as default};
