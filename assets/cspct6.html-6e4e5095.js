import{_ as n,o as s,c as a,a as p}from"./app-382facc7.js";const t={},o=p(`<h1 id="初探c-6" tabindex="-1"><a class="header-anchor" href="#初探c-6" aria-hidden="true">#</a> 初探c#-6</h1><p>作者： 依栏望海[17731168] 2000-10-27 15:27:30 修改 删除 [回复]</p><p>赶出一编！请指正！</p><h2 id="_1。6-统一系统类型-type-system-unification" tabindex="-1"><a class="header-anchor" href="#_1。6-统一系统类型-type-system-unification" aria-hidden="true">#</a> 1。6 统一系统类型（Type system unification）</h2><p>c#独创了一种类型——统一系统类型（为了这个累刑，我头疼死了。谁有更好的名字，请务必告诉我）。总之，所有的其他类型，包括值和引用，都可以被当作统一系统类型来对待。从概念上说，所有的类型都从它派生。这样，其他的类型就可以使用统一系统类型的属性和方法。包括一些“简单”类型，如：int。还是给个例子吧：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token comment">/*“3.ToString()”调用了object的“ToString()”方法。相信学过c/c++的朋友都知道要输出一个
数字有多麻烦，现在就省事了。再看一个：*/</span> 
<span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> 
    <span class="token class-name"><span class="token keyword">object</span></span> o <span class="token operator">=</span> i<span class="token punctuation">;</span>    <span class="token comment">// boxing </span>
    <span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> o<span class="token punctuation">;</span>  <span class="token comment">// unboxing </span>
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token comment">/* 这个像帽子戏法的例子中，从“int”转换成“object”，又转换回来。这样一来，在值和引用 
之间就架起了一座桥梁。这样有什么用呢。即兴举一个常见的例子...就min把。在c/c++中：*/</span> 
<span class="token comment">// c/c++ code </span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> j<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">?</span> i <span class="token punctuation">:</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 

<span class="token comment">/* 如果比较的不是int，或者说可能是int，也可能是float、double呢？可以这样：*/</span> 

template<span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token operator">&gt;</span> 
<span class="token return-type class-name">T</span> min <span class="token punctuation">(</span><span class="token class-name">T</span> i<span class="token punctuation">,</span> <span class="token class-name">T</span> j<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">?</span> i <span class="token punctuation">:</span> j<span class="token punctuation">)</span> 
<span class="token punctuation">}</span> 

<span class="token comment">/* 用c#可以：*/</span> 
<span class="token return-type class-name"><span class="token keyword">void</span></span> swap <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">object</span></span> b<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">?</span> i <span class="token punctuation">:</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
</code></pre></div><p>我想大家一定看出来第二个例子要比较一个<code>int</code>和一个<code>float</code>的话，还需要一些转换，而第三个例子就可以比较所有的变量！这个灵活度简直太大了。所以，我私以为，大家使用时一定要小心！</p><p>它在比较一个<code>int</code>和一个<code>class</code>的时候决不会报错的。呵呵，我发现我的翻译总是越跑越远，总是扣不住原文。篡改甚多，敬请原谅！</p><hr><p>作者： 王志清[21847847] 2000-10-27 21:33:44 [回复]</p><blockquote><p>好！今天上这一课大有收获！ 以前在 C/C++ 输出数字，可真是麻烦…… 后来用 Java 后，输出可就好多了。 看到现在 C# 可以调用object的“ToString()”方法，真是高兴！</p></blockquote><p>作者： 依栏望海[17731168] 2000-10-27 22:00:50 修改 删除 [回复]</p><blockquote><p>（王志清[21847847]在大作中提到:） &gt;好！今天上这一课大有收获！ &gt;以前在 C/C++ 输出数字，可真是麻烦…… &gt;后来用 Java 后，输出可就好多了。 &gt;看到现在 C# 可以调用object的“ToString()”方法，真是高兴！</p><p>呜呜哇~~~~~~~~~~~~！第一次有人说有收获哦！俺~~~~~~~~</p></blockquote><p>作者： 王志清[21847847] 2000-10-27 22:12:35 [回复]<br> （依栏望海[17731168]在大作中提到:）</p><blockquote><p>&gt;呜呜哇~~~~~~~~~~~~！第一次有人说有收获哦！俺~~~~~~~~</p><p>依栏望海别激动啊，我刚刚把你给出卖了……</p><p>See:<br> 我说依栏望海[17731168]啊,这样会掉死人的 动感男孩[15042848]</p><p>如果你有意见，请在 12 小时内提出抗议！我就删除它 否则，过期无效啦！</p></blockquote>`,15),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","cspct6.html.vue"]]);export{i as default};
