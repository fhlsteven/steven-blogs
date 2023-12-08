import{_ as s,o as n,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="关于销毁-dispose-的问题-简单" tabindex="-1"><a class="header-anchor" href="#关于销毁-dispose-的问题-简单" aria-hidden="true">#</a> 关于销毁(Dispose)的问题--简单</h1><p>主　　题： 关于销毁(Dispose)的问题--简单<br> 作　　者： NewSun99 (旭日) <br> 等　　级：<br> 信 誉 值： 100<br> 所属论坛： .NET技术 C#<br> 问题点数： 100<br> 回复次数： 23<br> 发表时间： 2003-12-2 16:17:49</p><hr><p>我在Form里: <code>private DataSet oraDataSet = new DataSet();</code> 在<code>Dispose</code>我是这样写的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>iCount <span class="token operator">=</span> oraDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>i <span class="token operator">&lt;</span> iCount<span class="token punctuation">;</span>i <span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                oraDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                oraDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            oraDataSet<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            oraCommand<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span> disposing <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我想问一下：直接写<code>oraDataSet.Dispose()</code>，而不做前面的循环是否一样的效果，这样是不是多余？</p><hr><p>回复人： gabriel1(威) ( 四级(中级)) 信誉：100 2003-12-2 16:20:54 得分:0</p><p>基本上是释放窗体资源的意思，不过dataset还是要等它垃圾回收滴。</p><p>从程序严密的角度来考虑，一个open就应该对应一个close，习惯。</p><hr><p>回复人： lbx1979(Love Arsenal) ( 一星(中级)) 信誉：101 2003-12-2 16:21:44 得分:0</p><p>我觉得不用循环了</p><hr><p>回复人： brightheroes(闭关) ( 一星(中级)) 信誉：100 2003-12-2 16:25:29 得分:0</p><p>同上</p><hr><p>回复人： NewSun99(旭日) ( 一级(初级)) 信誉：100 2003-12-2 16:34:44 得分:0</p><p>我还想问一下，就是在Dispose中，是否需要将自己在From中new的对象手工Dispose?</p><hr><p>回复人： lbx1979(Love Arsenal) ( 一星(中级)) 信誉：101 2003-12-02 16:41:00 得分:0</p><p>不用手工dispose</p><hr><p>回复人： qimini(循序渐进) ( 一星(中级)) 信誉：106 2003-12-02 16:50:00 得分:0</p><p>不用释放</p><hr><p>回复人： NewSun99(旭日) ( 一级(初级)) 信誉：100 2003-12-02 16:50:00 得分:0</p><p>问题1：直接写oraDataSet.Dispose()，而不做前面的循环是否一样的效果，这样是不是多余？</p><p>问题2：在Dispose中，是否需要将自己在From中new的对象手工Dispose？</p><p>问题3：在DataTable中，是否能够Group By？</p><hr><p>回复人： ldy(罗大佑) ( 四级(中级)) 信誉：100 2003-12-02 16:58:00 得分:0</p><p>学习</p><hr><p>回复人： wangweixing2000(星) ( 二级(初级)) 信誉：100 2003-12-02 17:12:00 得分:0</p><p>不用释放</p><hr><p>回复人： Edelweissobject(青山绿水) ( 二级(初级)) 信誉：101 2003-12-02 17:29:00 得分:0</p><p>楼主，1、不用循环效果一样。<br> 2、.Net框架有自动回收内存的功能,并不用每个new对象手动Dispose。<br> 　　　 3、DataTable不支持Group by，不过你可以写在以前的查询语句中。</p><hr><p>回复人： NewSun99(旭日) ( 一级(初级)) 信誉：100 2003-12-02 21:01:00 得分:0</p><p>还有什么回答啊</p><hr><p>回复人： ArLi2003(阿利 大家帮我找工作呀) ( 两星(中级)) 信誉：101 2003-12-02 21:33:00 得分:0</p><p>Dispose 是自动的，为什么说是自动的，这是必须要先了解对象作用域才可以说“GC 会帮忙”的</p><p>Dispose 是自动是源自于对象的废弃，比如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">o</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当 o 这个方法结束时，s 这个内存堆会被废弃或者被重用，如果废弃状态在GC 的next timer 到时（可以使用Process Explorer 新版查到 timer），也是一样会被free 掉，在server 级别（win2003）中包括服务、DLL 都会被定时回收的</p><p>所以你的oraDataSet 是否必须要 Dispose，这就取决于它的作用域或父容器（比如当前类、继承的方法、受引用体等）是否已经失效或者已经被销毁</p><p>另外一种情况在于，如果该变量作用域是“类局部”就应该在 不再使用时 进行<code>Dispose</code>，这是一个好的习惯，至于是否需要循环事实上，是不必的，而且上面你的例子连Dispose 都不需要，你的 <code>protected override void Dispose</code> 是 <code>Dispose</code> 方法的重写，如果执行到了这里就说明该类将被销毁，那么事实上对oraDataSet(如果此变量作用域是当前类并且不是静态的) 进行 Dispose 是非必须的。</p><p>不过，对于Dispose 我个人意见还是做在析构里比较安全些，比如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">a</span><span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token class-name">DataSet</span> oraDataSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token keyword">private</span> <span class="token keyword">void</span> 方法<span class="token number">1</span>或其它代码<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token punctuation">}</span>

  <span class="token operator">~</span>a <span class="token punctuation">{</span> <span class="token comment">//这就是析构，它在当前类反构造（销毁实例）时执行</span>
   oraDataSet<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>回复人： qiujoe(迷糊) ( 四级(中级)) 信誉：95 2003-12-02 22:08:00 得分:0</p><p>问题1 不需要，多余<br> 问题2 需要，这是一个好习惯，可以在不用的时候将资源释放出来，我觉得在析构函数中做，完全取决于系统在销毁时才释放资源。感觉不能尽快释放资源，不爽:-)<br> 问题3 不知道</p><hr><p>回复人： Sunmast(速马) ( 五级(中级)) 信誉：100 2003-12-02 22:11:00 得分:0</p><p>但是书上说析构很浪费资源哦<br> .NET里面很少需要使用析构函数的...</p><hr><p>回复人： qiujoe(迷糊) ( 四级(中级)) 信誉：95 2003-12-02 22:12:00 得分:0</p><p>补充：对于问题2 个人觉得是非常重要。对于临界资源，一定需要调用dispose(),否则不能充分利用资源</p><hr><p>回复人： cnicq(HeIsTheOne) ( 二级(初级)) 信誉：99 2003-12-02 22:18:00 得分:0</p><p>gz</p><hr><p>回复人： NewSun99(旭日) ( 一级(初级)) 信誉：100 2003-12-03 08:26:00 得分:0</p><p>谢谢大伙。<br> qiujoe(迷糊)和 ArLi2003(阿利 大家帮我找工作呀) 在观点二上有些冲突。</p><p>qiujoe(迷糊)说的临界资源是什么意思</p><hr><p>回复人： hoyu(心茗) ( 二级(初级)) 信誉：100 2003-12-03 08:56:00 得分:0</p><p>同意 Edelweissobject(青山绿水)<br> 1、不用循环效果一样。<br> 2、.Net框架有自动回收内存的功能,并不用每个new对象手动Dispose。<br> （也可以手动释放！这样执行效率会更高一些）<br> 　　　3、DataTable不支持Group by，不过你可以写在以前的查询语句中。<br></p><hr><p>回复人： 1000000googol(估计) ( 一级(初级)) 信誉：100 2003-12-03 08:58:00 得分:0</p><p>好象析构的时候反而不知道在什么时候析构了，所以微软也建议不要使用析构函数</p><hr><p>回复人： myclife(反方向的钟) ( 一级(初级)) 信誉：100 2003-12-03 09:30:00 得分:0</p><p>我学习。</p><hr><p>回复人： loulanlouzhu(桃花潭水深千尺，不及阿勇念你情) ( 五级(中级)) 信誉：91 2003-12-03 09:38:00 得分:0</p><p>2、.Net框架有自动回收内存的功能,并不用每个new对象手动Dispose。<br> （也可以手动释放！这样执行效率会更高一些）</p><p>--&gt;&gt;效率不一定会更高的!!垃圾回收器会根据应用程序的资源情况判断什么时候该回收资源!!</p><p>因为资源回收操作将耗费系统资源,如果手工回收资源的话有可能影响应用程序的性能!</p><p>===弯弯的月亮小小的船，小小的船，两头尖，我在小小的船里坐，只看见闪闪的星星蓝蓝的天．<br> ===本贴子以“现状”提供且没有任何担保，同时也没有授予任何权利<br> ===我的blog:http://loulanlouzhu.blogone.net</p><hr><p>回复人： realMAX(白色休止符) ( 五级(中级)) 信誉：100 2003-12-03 09:43:00 得分:0</p><p>不用手工Dispose，因为.net有垃圾回收机制，会自动回收的，但有手动Dispose这种习惯也没什么问题呀，看情况而用咯</p><hr><p>回复人： lemong(風之影) ( 五级(中级)) 信誉：100 2003-12-03 09:51:00 得分:0</p><p>楼主，1、不用循环效果一样。<br> 2、.Net框架有自动回收内存的功能,从内存管理的角度，并不用每个new对象手动Dispose；但是，从习惯上说，应该在动态对象的作用期结束后及时释放对象，一面可以及时回收内存，一面，也可以防止重复生成相同的id等其他冲突。<br> 　　　3、DataTable不支持Group by，不过你可以写在以前的查询语句中。</p><hr>`,90),e=[o];function c(u,i){return n(),a("div",null,e)}const r=s(t,[["render",c],["__file","cspbase14.html.vue"]]);export{r as default};