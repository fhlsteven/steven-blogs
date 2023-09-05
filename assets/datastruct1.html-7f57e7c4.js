import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="在c-中应用哈希表-hashtable" tabindex="-1"><a class="header-anchor" href="#在c-中应用哈希表-hashtable" aria-hidden="true">#</a> 在C#中应用哈希表(Hashtable)</h1><p>kwklover（原作） Hashtable,哈希表</p><h2 id="一-哈希表-hashtable-简述" tabindex="-1"><a class="header-anchor" href="#一-哈希表-hashtable-简述" aria-hidden="true">#</a> 一,哈希表(Hashtable)简述</h2><p>在.NET Framework中，Hashtable是System.Collections命名空间提供的一个容器，用于处理和表现类似key/value的键值对，其中key通常可用来快速查找，同时key是区分大小写；value用于存储对应于key的值。Hashtable中key/value键值对均为object类型，所以Hashtable可以支持任何类型的key/value键值对.</p><h2 id="二-哈希表的简单操作" tabindex="-1"><a class="header-anchor" href="#二-哈希表的简单操作" aria-hidden="true">#</a> 二,哈希表的简单操作</h2><ul><li>在哈希表中添加一个key/value键值对：<code>HashtableObject.Add(key,value);</code></li><li>在哈希表中去除某个key/value键值对：<code>HashtableObject.Remove(key);</code></li><li>从哈希表中移除所有元素： <code>HashtableObject.Clear();</code></li><li>判断哈希表是否包含特定键key： <code>HashtableObject.Contains(key);</code></li></ul><p>下面控制台程序将包含以上所有操作：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span> <span class="token comment">//使用Hashtable时，必须引入这个命名空间</span>
<span class="token keyword">class</span> <span class="token class-name">hashtable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Hashtable</span> ht <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Hashtable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//创建一个Hashtable实例</span>
        ht<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;E&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//添加key/value键值对</span>
        ht<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ht<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ht<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>ht<span class="token punctuation">[</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ht<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;E&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//判断哈希表是否包含特定键,其返回值为true或false</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;the E key:exist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ht<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//移除一个key/value键值对</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ht<span class="token punctuation">[</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//此处输出a</span>
        ht<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//移除所有元素</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ht<span class="token punctuation">[</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//此处将不会有任何输出</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="三-遍历哈希表" tabindex="-1"><a class="header-anchor" href="#三-遍历哈希表" aria-hidden="true">#</a> 三,遍历哈希表</h2><p>遍历哈希表需要用到DictionaryEntry Object，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">DictionaryEntry</span> de <span class="token keyword">in</span> ht<span class="token punctuation">)</span> <span class="token comment">//ht为一个Hashtable实例</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>de<span class="token punctuation">.</span>Key<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//de.Key对应于key/value键值对key</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>de<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//de.Key对应于key/value键值对value</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="四-对哈希表进行排序" tabindex="-1"><a class="header-anchor" href="#四-对哈希表进行排序" aria-hidden="true">#</a> 四,对哈希表进行排序</h2><p>对哈希表进行排序在这里的定义是对key/value键值对中的key按一定规则重新排列，但是实际上这个定义是不能实现的，因为我们无法直接在Hashtable进行对key进行重新排列，如果需要Hashtable提供某种规则的输出，可以采用一种变通的做法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">ArrayList</span> akeys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span>ht<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//别忘了导入System.Collections</span>
akeys<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//按字母顺序进行排序</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> skey <span class="token keyword">in</span> akeys<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>skey <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ht<span class="token punctuation">[</span>skey<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//排序后输出</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>iamsoloist (2004-3-2 9:03:40)</p><blockquote><p>谢谢楼主，我觉得挺好的!</p></blockquote><p>musicllm (2004-2-28 20:15:01)</p><blockquote><p>哈哈。。。别这么苛刻吗。。。人家初学者也比你多的多。呵呵又不是专门写给你看的。。。</p></blockquote><p>Sunmast (2004-2-28 0:29:28)</p><blockquote><p>to kevin2102: 这样的文章似乎就算对初学者也没有价值,还不如写个System.Collections Namespace在MSDN或者SDK哪里可以找到比较有用 这个文章居然出现在首页上?? CSDN的管理员在做啥?</p></blockquote><p>Sunmast (2004-2-28 0:23:04)</p><blockquote><p>我的天哪...这文章居然也...</p></blockquote><p>redbirdli (2004-2-27 17:56:24)</p><blockquote><p>真不要脸,这是MSDN上的原文,也敢挂在首页上</p></blockquote><p>sportdog (2004-2-27 13:21:21)</p><blockquote><p>写的不好! 不过还是支持你!</p></blockquote><p>Fusuli (2004-2-27 11:47:45)</p><blockquote><p>csdn文章的水平越来越....</p></blockquote><p>spgoal (2004-2-26 16:55:10)</p><blockquote><p>可读的东西太少，如果能来一个比较可能会好点</p></blockquote><p>udonome (2004-2-26 16:03:58)</p><blockquote><p>无聊，不如看帮助，至少没有错误！</p></blockquote><p>zj492 (2004-2-25 15:49:40)</p><blockquote><p>精神可嘉</p></blockquote><p>mazhenlin88 (2004-2-25 14:25:19)</p><blockquote><p>我学到点东西啊看帮助老是看不明白可现在一下就都懂了</p></blockquote><p>bingfox (2004-2-25 10:01:28)</p><blockquote><p>垃圾</p></blockquote><p>zhouqi66 (2004-2-25 9:47:25)</p><blockquote><p>正适合我读,谢谢楼主!</p></blockquote><p>Taxion (2004-2-24 21:04:19)</p><blockquote><p>不同水平的人有不同的需求,不算垃圾只能说离经典还差很远.</p></blockquote><p>hunter4500 (2004-2-24 21:00:02)</p><blockquote><p>有点笔误，现帮你改正如下：）应该加上 <code>using System.Collections.Specialized;</code> 把<code>for</code>改为<code>foreach</code>，</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name">DictionaryEntry</span> de <span class="token keyword">in</span> ht<span class="token punctuation">)</span> <span class="token comment">//ht为一个Hashtable实例</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>de<span class="token punctuation">.</span>Key<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//de.Key对应于key/value键值对key</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>de<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//de.Key对应于key/value键值对value</span>
<span class="token punctuation">}</span>
<span class="token class-name">ArrayList</span> akeys<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span>ht<span class="token punctuation">.</span>Keys<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//别忘了导入System.Collections</span>
akeys<span class="token punctuation">.</span><span class="token function">Sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//按字母顺序进行排序</span>
<span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> skey <span class="token keyword">in</span> akeys<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>skey <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ht<span class="token punctuation">[</span>skey<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//排序后输出</span>
<span class="token punctuation">}</span>
</code></pre></div><p>wahahasnail (2004-2-24 17:20:40)</p><blockquote><p>一个人不可能面面俱到,虽然你搞了好久的.net可能还有很多未知域,也许有一天你看到的这样的文章时而你又不了解的,那你就进步了...</p></blockquote><p>Strayman (2004-2-24 14:54:28)</p><blockquote><p>9494</p></blockquote><p>cloudred (2004-2-24 13:32:17)</p><blockquote><p>很好</p></blockquote><p>bearontree (2004-2-24 13:23:17)</p><blockquote><p>浅显易懂有何不可？不过感觉csdn应该把文章按照难度分类，比如弄个星级，这样看的人也好根据自己的水平有点方向</p></blockquote><p>kevin2102 (2004-2-24 11:46:46)</p><blockquote><p>说是垃圾的朋友们，那你自己写一篇！哪怕是抄的也无所谓啦！鼓励楼主！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！</p></blockquote><p>test7979 (2004-2-24 10:35:57)</p><blockquote><p>同意这是垃圾，SDK中都写得明明白白了， 还再来说一遍，竟然还打着原创的旗号 多此一举！</p></blockquote><p>invalid (2004-2-24 9:12:32)</p><blockquote><p>写的很好!</p></blockquote><p>zkjbeyond (2004-2-24 9:00:46)</p><blockquote><p>作者应该扩展下去，比如与别的容器的比较，可以从List,Map接口讲下来。把泛型什么的加进去。呵。鼓励</p></blockquote><p>sunhw998 (2004-2-24 8:59:10)</p><blockquote><p>就是,这些所谓的高手真很讨厌.</p></blockquote><p>ceocio (2004-2-24 0:20:31)</p><blockquote><p>我觉得挺好啊，文章不是给你一个人看的，是给大家看的，你不愿意看可以安静的走开，何必在这里大放厥词，总之我支持楼主。</p></blockquote><p>huxizhong (2004-2-24 0:13:20)</p><blockquote><p>可以撒,对于我这样的初学者来说有点价值,不过太水浅了,...</p></blockquote><p>wkkevin (2004-2-23 23:09:23)</p><blockquote><p>这样的文章是垃圾</p></blockquote>`,71),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","datastruct1.html.vue"]]);export{i as default};