import{_ as n,o as s,c as a,a as p}from"./app-8e5157a8.js";const t={},e=p(`<h1 id="初探c-12-13-14" tabindex="-1"><a class="header-anchor" href="#初探c-12-13-14" aria-hidden="true">#</a> 初探c#--12,13,14</h1><p>作者： 依栏望海[17731168] 2000-10-31 15:30:06 修改 删除 [回复]</p><h2 id="_1。12-枚举-enums" tabindex="-1"><a class="header-anchor" href="#_1。12-枚举-enums" aria-hidden="true">#</a> 1。12 枚举（Enums）</h2><p>枚举声明为一组属性相同的常量定义一个统一的类别名字。它常用于一些在编译时已知范围的常量。但这些常量的具体值要在执行时才能确定。比如，已知三原色是红蓝绿，它们同属于颜色。可以定义如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">enum</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span> 
        Red<span class="token punctuation">,</span> 
        Blue<span class="token punctuation">,</span> 
        Green 
<span class="token punctuation">}</span> 
</code></pre></div><p>我们创建一个shape（形体）类，每一个形体都会有颜色。颜色是属于“shape”的属性。但具体的颜色就要在执行时才能决定：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Shape</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Fill</span><span class="token punctuation">(</span><span class="token class-name">Color</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">switch</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">case</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">:</span> 
      <span class="token range operator">..</span><span class="token punctuation">.</span> 
      <span class="token keyword">break</span><span class="token punctuation">;</span> 
    <span class="token keyword">case</span> Color<span class="token punctuation">.</span>Blue<span class="token punctuation">:</span> 
      <span class="token range operator">..</span><span class="token punctuation">.</span> 
      <span class="token keyword">break</span><span class="token punctuation">;</span> 
    <span class="token keyword">case</span> Color<span class="token punctuation">.</span>Green<span class="token punctuation">:</span> 
      <span class="token range operator">..</span><span class="token punctuation">.</span> 
      <span class="token keyword">break</span><span class="token punctuation">;</span> 
    <span class="token keyword">default</span><span class="token punctuation">:</span> 
      <span class="token keyword">break</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>这个File方法地说明了如何将一种给定的颜色赋予shape类。枚举比起普通整数常量的优胜之处在于：它使得代码更容易阅读理解和更安全。枚举的常量可以由编译器决定。使用时编译器还可以检查它的有效性。枚举其实不是c#特有的。嘿嘿，我就不详细介绍喽。趁机投篮！如果有人感兴趣——自己看书！（为了避免香蕉吃的太多就介绍本书《c语言编程常见问题解答》清华1996。29.00人民币。虽然古老，俺在书店还能见到）</p><h2 id="_1。13-名字空间-namespaces" tabindex="-1"><a class="header-anchor" href="#_1。13-名字空间-namespaces" aria-hidden="true">#</a> 1。13 名字空间（Namespaces）</h2><p>我们在前面已对namespace花了不少笔墨（俺都忘了该如何接上了！O.K.请大家看完再倒）。我们曾经说“i not like the hello world”。但是在程序中要经常说就会很累，如果要在别的代码中用就更繁了，这时可以用namespace搭救。我把第一个例子切开，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">MyOpinion</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Message</span> 
  <span class="token punctuation">{</span> 
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">return</span> <span class="token string">&quot;i dont like Hello world&quot;</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>如果我想用namespace建立一个自己的库，就要对我的自定义函数和类进行分类，并填入相应的namespace中。</p><p>如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Mylib<span class="token punctuation">.</span>Csharp<span class="token punctuation">.</span>MyOpinion</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Message</span> 
  <span class="token punctuation">{</span> 
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">return</span> <span class="token string">&quot;i dont like Hello world&quot;</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>namespace是分等级的，“Mylib.Csharp.MyOpinion”其实是缩写，每个“.”后面的namespace都被它前面的包含。如果拆开：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">Mylib</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">namespace</span> <span class="token namespace">Csharp</span> 
  <span class="token punctuation">{</span> 
    <span class="token keyword">namespace</span> <span class="token namespace">MyOpinion</span> 
    <span class="token punctuation">{</span><span class="token range operator">..</span><span class="token range operator">..</span><span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>  
</code></pre></div><p>然后，我们就可以用自己的库了：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">Mylib<span class="token punctuation">.</span>Csharp<span class="token punctuation">.</span>MyOpinion</span><span class="token punctuation">;</span> 
<span class="token keyword">class</span> <span class="token class-name">test</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token class-name">Message</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>不过无论我们命名如何小心都会出现重名，即命名冲突。这时可以用别名来解决，比如上面的代码可以这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token class-name">MessageSource</span> <span class="token operator">=</span> <span class="token class-name">Mylib<span class="token punctuation">.</span>Csharp<span class="token punctuation">.</span>MyOpinion</span><span class="token punctuation">;</span> 
<span class="token keyword">class</span> <span class="token class-name">test</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token class-name">MessageSource</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">GetMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><h2 id="_1-14-属性-properties" tabindex="-1"><a class="header-anchor" href="#_1-14-属性-properties" aria-hidden="true">#</a> 1.14 属性（Properties）</h2><p>关于属性就不用多说了。可能有点特别的是如何得到一个属性和设置一个属性。请诸位看下例：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Button</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Control</span></span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> caption<span class="token punctuation">;</span> 
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Caption <span class="token punctuation">{</span> 
    <span class="token keyword">get</span> <span class="token punctuation">{</span> 
      <span class="token keyword">return</span> caption<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
    <span class="token keyword">set</span> <span class="token punctuation">{</span> 
      caption <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> 
      <span class="token function">Repaint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>有了上面的定义，我们就可以对Button进行读取和设置它的Caption属性：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Button</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
b<span class="token punctuation">.</span>Caption <span class="token operator">=</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">;</span>          <span class="token comment">// 设置 </span>
<span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> b<span class="token punctuation">.</span>Caption<span class="token punctuation">;</span>       <span class="token comment">// 读取 </span>
b<span class="token punctuation">.</span>Caption <span class="token operator">+=</span> &quot;DEF”<span class="token punctuation">;</span>        <span class="token comment">// 读取 &amp; 设置</span>
</code></pre></div>`,25),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","cspct12.html.vue"]]);export{i as default};
