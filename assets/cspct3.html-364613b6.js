import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},e=p(`<h1 id="初探c-3" tabindex="-1"><a class="header-anchor" href="#初探c-3" aria-hidden="true">#</a> 初探c#-3</h1><p>最近很忙，抽空写了这篇。见谅！王先生该不会又是第一个吧！哈哈</p><h2 id="_1。3-类型" tabindex="-1"><a class="header-anchor" href="#_1。3-类型" aria-hidden="true">#</a> 1。3 类型</h2><p>c#支持两种基本的类型：一种是值（value types），一种是引用（reference types）。</p><p>值包括简单类型（char、int、和float），枚举（enum）和结构（struct）。</p><p>引用包括类（class），界面（interface），代表（delegate）和数组阵列（array）。</p><p>值与引用不同之处在于：值直接存储它的数据内容；而引用存储对象的引用。是不是粉费解？！打个比方吧。你在某地买了套别墅（好棒噢）。却从未去过，只知道地址，怎么办？你可以坐出租车，司机看了地址就知道怎样走不用你操心。你手里的地址就好像对象的名字，你把它写在程序中，就好像把地址给了司机。司机就是你的编译器，它知道该去哪。你豪华的房子就好比那个NGWS SDK开发包（82mb噢，够豪华了！俺的m啊--就这样烧喽）。房子里有你想要的东东，比如你想写一句话（i dont like Hello world），就好像上面例子，要用到“WriteLine”。于是，你就给出“WriteLine”的地址，比如：“Console.WriteLine”。明白？！俺可累了。zzz... （强打精神）不知道你想到没有，值和引用的区别可以引出一个重要特性。值的变量和变量存储的数据是一一对应的，唯一性。而引用则不然。引用中不同的变量可以引用同一个对象的实例。当其中一个变量改变实例的值时，其他引用这个实例的变量也会受到影响（当然，变量本身并没有改变，即，地址没变）。瞧，变量只是说明存储对象的位置（地址），而不是对象本身。就好像你漂亮的房子被烧了，但你的地址并没有改变，但地址对应的房子就没了。也许是别人也有这个地址，他去烧了你的房子！</p><p>好了，在给个例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token number">1</span><span class="token punctuation">:</span> <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token number">2</span><span class="token punctuation">:</span> <span class="token keyword">class</span> <span class="token class-name">CValue</span> 
<span class="token number">3</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> 
<span class="token number">4</span><span class="token punctuation">:</span> <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Value <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token number">5</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
<span class="token number">6</span><span class="token punctuation">:</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> 
<span class="token number">7</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> 
<span class="token number">8</span><span class="token punctuation">:</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token number">9</span><span class="token punctuation">:</span> <span class="token class-name"><span class="token keyword">int</span></span> val1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token number">10</span><span class="token punctuation">:</span> <span class="token class-name"><span class="token keyword">int</span></span> val2 <span class="token operator">=</span> val1<span class="token punctuation">;</span> 
<span class="token number">11</span><span class="token punctuation">:</span> val2 <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> 
<span class="token number">12</span><span class="token punctuation">:</span> <span class="token class-name">CValue</span> ref1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">13</span><span class="token punctuation">:</span> <span class="token class-name">CValue</span> ref2 <span class="token operator">=</span> ref1<span class="token punctuation">;</span> 
<span class="token number">14</span><span class="token punctuation">:</span> ref2<span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> 
<span class="token number">15</span><span class="token punctuation">:</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Values: {0}, {1}&quot;</span><span class="token punctuation">,</span> val1<span class="token punctuation">,</span> val2<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">16</span><span class="token punctuation">:</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Refs: {0}, {1}&quot;</span><span class="token punctuation">,</span> ref1<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> ref2<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token number">17</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
<span class="token number">18</span><span class="token punctuation">:</span> <span class="token punctuation">}</span> 
</code></pre></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>下面是输出的结果： 
Values: <span class="token number">0</span>, <span class="token number">123</span> 
Refs: <span class="token number">123</span>, <span class="token number">123</span> 
</code></pre></div><p>啊哈，应该粉清楚了吧。变量<code>val1</code>和变量<code>val2</code>互不影响,它们各自有自己的存储空间。而<code>ref2</code>复制了<code>ref1</code>，所以，它们引用了同一个对象的实例。当改变它们其中一个的时候，就会影响到另一个的值。</p><hr><p>作者： Burn[5151599] 2000-10-25 10:10:49 [回复]</p><blockquote><p>呵呵，这回我是第一个了，哈哈，好高兴呀！ 我支持你，兄弟，继续写呀！！！</p><p>我是个盖世英雄，有一天我会驾着七彩降云杀入敌营去救我的情人，我猜对了前头 也猜对了这结果。（Zzzz....)</p></blockquote>`,14),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","cspct3.html.vue"]]);export{r as default};
