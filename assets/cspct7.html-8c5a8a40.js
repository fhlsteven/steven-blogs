import{_ as n,o as s,c as a,a as p}from"./app-8e5157a8.js";const t={},c=p(`<h1 id="初探c-7" tabindex="-1"><a class="header-anchor" href="#初探c-7" aria-hidden="true">#</a> 初探c#-7</h1><p>作者： 依栏望海[17731168] 2000-10-31 10:55:20 修改 删除 [回复]</p><h2 id="_1。7-语句-statements" tabindex="-1"><a class="header-anchor" href="#_1。7-语句-statements" aria-hidden="true">#</a> 1。7 语句（Statements）</h2><p>c#借用了c/c++大多数的语句方法，不过仍然有些值得注意的地方。还有些地方是有所改动的。在这里，我只提一些c#特有的东东。</p><h3 id="_1。7。10-foreach-语句" tabindex="-1"><a class="header-anchor" href="#_1。7。10-foreach-语句" aria-hidden="true">#</a> 1。7。10 “foreach”语句</h3><p>“foreach”语句列举一个集合内的所有元素，并对这些元素执行一系列的操作。还是看看例子吧：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span> 
<span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WriteList</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> o <span class="token keyword">in</span> list<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
      <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span><span class="token comment">//如果是for语句，这里一定会报错！ </span>
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token operator">++</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token class-name">ArrayList</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> 
      list<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">WriteList</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>这个例子用“foreach”扫描了整个“list”，并把“list”中所有的元素打印出来。有时候还是挺方便的。</p><h3 id="_1。7。15-安全检查开关-the-checked-and-unchecked-statements" tabindex="-1"><a class="header-anchor" href="#_1。7。15-安全检查开关-the-checked-and-unchecked-statements" aria-hidden="true">#</a> 1。7。15 安全检查开关（The checked and unchecked statements）</h3><p>“checked”和“unchecked”语句用来控制数学运算和完整类型转换的检查工作。“checked”检查它作用的域中可能出现的违例，并抛出一个异常；而“unchecked”则阻止所有的检查。举个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
   <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span> 
   <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">checked</span> <span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>     <span class="token comment">// 抛出 OverflowException </span>
   <span class="token punctuation">}</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">unchecked</span> <span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>   <span class="token comment">// 返回 -727379968 </span>
   <span class="token punctuation">}</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">H</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>              <span class="token comment">// 缺省状态。 </span>
   <span class="token punctuation">}</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
     <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                        <span class="token comment">//可以注销掉此行试试。 </span>
     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">H</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>在编译过程中不会有任何错误出现。因为“checked”和“unchecked”只在运行时才起作用。值得一说的是<code>H()</code>。它的缺省状态和编译器当前的缺省溢出检查的状态有关。但返回的结果肯定和<code>F()</code>或<code>G()</code>中的任一个相同</p><p>再看一个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
   <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span>
   <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> <span class="token number">1000000</span><span class="token punctuation">;</span>
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">checked</span> <span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>    <span class="token comment">// 编译器警告（Compile warning）：溢出（overflow）</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">unchecked</span> <span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>  <span class="token comment">// 返回 -727379968</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">H</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>                <span class="token comment">// 编译器警告（Compile warning）：溢出（overflow） </span>
   <span class="token punctuation">}</span>
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">//可以注销掉此行试试。 </span>
     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">G</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
     Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token function">H</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">//可以注销掉此行试试。 </span>
   <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>当<code>F()</code>和<code>H()</code>求值的时候，就会引起一个编译警告。而在<code>G()</code>中，因为有了“unchecked”，屏蔽了这个警告。要注意的是“checked”和“unchecked”都不能对函数的返回值进行操作！比如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Multiply</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> x<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">return</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span> 
   <span class="token punctuation">}</span> 
   <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">checked</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">Multiply</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">,</span> <span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token comment">// 与 return Multiply(1000000, 1000000); </span>
   <span class="token punctuation">}</span>                                                <span class="token comment">// 有相同的效果。 </span>
<span class="token punctuation">}</span> 
</code></pre></div><p>其实大家稍微想一下知道为什么m$没有这么做！对这个内容的讨论超出本文的范围和俺的能力之外哦</p><p>在c#中，所有的十六进制数都是uint。如果用强制类型转换会引起编译器报错。用“unchecked”则可以跳过这个机制，把uint的十六进制数转化为int。如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
   <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> AllBits <span class="token operator">=</span> <span class="token keyword">unchecked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token number">0xFFFFFFFF</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> HighBit <span class="token operator">=</span> <span class="token keyword">unchecked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token number">0x80000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 

</code></pre></div><p>上例所有的常数都是<code>uint</code>，而且超过了int的范围，没有“unchecked”，这种转换会引发一个编译器错误。注意：上面用的是“unchecked”操作符。不是语句。不过它们之间除了一个用“()”，另一个用“{}”以外，几乎一样。BTW，“checked”同样。</p><h3 id="_1。7。16-lock-语句-the-lock-statement" tabindex="-1"><a class="header-anchor" href="#_1。7。16-lock-语句-the-lock-statement" aria-hidden="true">#</a> 1。7。16 “lock”语句（The lock statement）</h3><p>“lock”获得一个相互排斥的对象锁定。（俺查过一些资料，但都没有清晰说明，暂不介绍）</p>`,22),o=[c];function e(k,l){return s(),a("div",null,o)}const i=n(t,[["render",e],["__file","cspct7.html.vue"]]);export{i as default};
