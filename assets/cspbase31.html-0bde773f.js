import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as l}from"./app-477de5b2.js";const u={},k={id:"关于for和foreach-兼顾效率与安全",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#关于for和foreach-兼顾效率与安全","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/jobs/archive/2004/07/17/25218.html",target:"_blank",rel:"noopener noreferrer"},d=n("code",null,"for",-1),m=n("code",null,"foreach",-1),y=l(`<p>对于数组的访问，是应该使用<code>for</code>的方式的，因为这样性能更高。以下代码是恰当的。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Object<span class="token punctuation">[</span><span class="token punctuation">]</span></span> objArray <span class="token operator">=</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> objArrayLength <span class="token operator">=</span> objArray<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> objArrayLength<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// do something ...</span>
<span class="token punctuation">}</span>

<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> strLength <span class="token operator">=</span> str<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strLength<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
   <span class="token comment">// do something ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对<code>ArrayList</code>这样的可使用下标进行随机访问的数据结构，使用下标访问，要比<code>foreach</code>的方式进行顺序访问，速度要快一些。<code>foreach</code>这样写法，使用的过程产生一个额外的对象<code>Enumerator</code>，而且每次访问需要更多的操作，降低性能。下面的两种写法编译出的代码是一样的：</p><p>第一种写法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">IList</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IEnumerator</span> iter <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> iter<span class="token punctuation">.</span>Current<span class="token punctuation">;</span>
        <span class="token comment">//do something ...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IDisposable</span> disposableObj <span class="token operator">=</span> iter <span class="token keyword">as</span> <span class="token class-name">IDisposable</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>disposableObj <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        disposableObj<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第二种写法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">IList</span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> obj <span class="token keyword">in</span> list<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//do something ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对比这两种写法，第一种写法非常罗嗦，所以C#引入了<code>foreach</code>的语法。通过观察第一种写法，<code>foreach</code>是通过<code>GetEnumerator</code>获得一个<code>IEnumerator</code>对象，通过<code>IEnumerator</code>对象执行<code>MoveNext()</code>方法和获取<code>Current</code>属性进行遍历的。</p><p>我们再通过Reflector工具，查看<code>mscorlib.dll</code>中<code>System.Collection.ArrayList</code>的实现：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//为了简单起见，我只列出ArrayList的Add、Clear、GetEnumerator的代码</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayList</span>
<span class="token punctuation">{</span>
    <span class="token comment">//这是一个版本标识，ArrayList对象，每做一个修改操作，_version都会加1</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _version<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> num1<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">==</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_items<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">EnsureCapacity</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_items<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>_version<span class="token punctuation">;</span> <span class="token comment">//注意此处</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>num1 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> num1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Array<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_items<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>_version<span class="token punctuation">;</span> <span class="token comment">//注意此处</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//每次调用GetEnumerator方法，都会构造一个FastArrayListEnumerator</span>
    <span class="token comment">//或者ArrayListEnumeratorSimple对象。</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name">IEnumerator</span> <span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ArrayList</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList<span class="token punctuation">.</span>FastArrayListEnumerator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList<span class="token punctuation">.</span>ArrayListEnumeratorSimple</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>通过上述代码可以看到，<code>ArrayList</code>是通过<code>_version</code>成员变量作版本标识的，每次执行<code>Add</code>、<code>Clear</code>等修改<code>ArrayList</code>内容的操作，都会将版本号加1，而每次调用<code>GetEnumerator</code>方法，都会构造一个<code>FastArrayListEnumerator</code>或者<code>ArrayListEnumeratorSimple</code>对象。我们再看<code>FastArrayListEnumerator</code>的实现：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">FastArrayListEnumerator</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> version<span class="token punctuation">;</span>

    <span class="token keyword">internal</span> <span class="token function">FastArrayListEnumerator</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span> list<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> list<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token comment">//获取构建FastArrayListEnumerator对象时ArrayList的版本号</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>version <span class="token operator">=</span> list<span class="token punctuation">.</span>_version<span class="token punctuation">;</span> 

        <span class="token keyword">this</span><span class="token punctuation">.</span>lastIndex <span class="token operator">=</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span>_size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> num1<span class="token punctuation">;</span>

        <span class="token comment">//比较ArrayList当前的版本号，</span>
        <span class="token comment">//是否和构建FastArrayListEnumerator对象时的版本号一致</span>
        <span class="token comment">//如果不一致，则抛出异常。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>version <span class="token operator">!=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>_version<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvalidOperationException</span><span class="token punctuation">(</span>
                Environment<span class="token punctuation">.</span><span class="token function">GetResourceString</span><span class="token punctuation">(</span><span class="token string">&quot;InvalidOperation_EnumFailedVersion&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//... ... </span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>FastArrayListEnumerator</code>对象构建时，当时时<code>ArrayList</code>的版本号。当执行<code>MoveNext()</code>操作时，检查<code>ArrayList</code>当前的版本号是否和<code>FastArrayListEnumerator</code>对象构建时的版本号一致，如果不一致就会抛出异常。</p><p>由于<code>Enumerator</code>中，做了版本检查处理的工作，所以使用<code>foreach</code>是线程安全，而使用<code>for</code>则不时。为什么呢？如果在使用<code>foreach</code>遍历对象的过程中，其他线程修改了<code>List</code>的内容，例如添加或者删除，就会出现不可知的错误，而使用<code>foreach</code>则能够正确抛出错误信息。</p><p>综上所述，结论如下：</p><ul><li>使用<code>for</code>，更高效率。</li><li>使用<code>foreach</code>，更安全。</li></ul><p>那么如何选择呢？我的建议是，在一些全局的，多线程可以访问的数据结构对象，使用<code>foreach</code>。而对本地变量，则使用<code>for</code>，效率和安全兼顾！例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F1</span><span class="token punctuation">(</span><span class="token class-name">IList</span> globalList<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IList</span> waitForDeleteList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//全局变量，使用foreach，保证线程</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> item <span class="token keyword">in</span> globalList<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            waitForDeleteList<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//本地变量使用for，保证效率</span>
    <span class="token class-name"><span class="token keyword">int</span></span> waitForDeleteListCount <span class="token operator">=</span> waitForDeleteList<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> waitForDeleteListCount<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        globalList<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>waitForDeleteList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上建议，对于在Java环境下也使用，我阅读过JDK 1.4的<code>java.util.ArrayList</code>的实现，.NET Framework的实现和JDK的实现，几乎是一样的，是否抄袭，见仁见智。上述的C#代码在Java环境中应为：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token class-name">List</span> globalList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span> waitForDeleteList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//全局变量，使用Iterator遍历，保证线程</span>
    <span class="token class-name">Iterator</span> iter <span class="token operator">=</span> globalList<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> item <span class="token operator">=</span> iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            waitForDeleteList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//本地变量使用for，保证效率</span>
    <span class="token keyword">int</span> waitForDeleteListCount <span class="token operator">=</span> waitForDeleteList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> waitForDeleteListCount<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        globalList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>waitForDeleteList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，以上代码并不是做该项工作的最优算法，如果需要更高的效率，修改如下：</p><p>C#版本</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">F1</span><span class="token punctuation">(</span><span class="token class-name">IList</span> globalList<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> condition <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token class-name">IList</span> waitForDeleteList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//全局变量，使用foreach，保证线程</span>
    <span class="token class-name"><span class="token keyword">int</span></span> itemIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> item <span class="token keyword">in</span> globalList<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            waitForDeleteList<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">++</span>itemIndex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//本地变量使用for，保证效率</span>
    <span class="token class-name"><span class="token keyword">int</span></span> waitForDeleteListCount <span class="token operator">=</span> waitForDeleteList<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> waitForDeleteListCount <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">--</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        index <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> waitForDeleteList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        globalList<span class="token punctuation">.</span><span class="token function">RemoveAt</span><span class="token punctuation">(</span>itemIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Java版本：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token class-name">List</span> globalList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span> waitForDeleteList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//全局变量，使用Iterator遍历，保证线程</span>
    <span class="token class-name">Iterator</span> iter <span class="token operator">=</span> globalList<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>iter<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> item <span class="token operator">=</span> iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            waitForDeleteList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Integer</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token operator">++</span>index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//本地变量使用for，保证效率</span>
    <span class="token keyword">int</span> waitForDeleteListCount <span class="token operator">=</span> waitForDeleteList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> waitForDeleteListCount <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">--</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       index <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> waitForDeleteList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        globalList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>1楼 回复 引用</p><blockquote><p>...hoho,不错.. 分析的有道理.. 😃 2004-07-18 00:41 | hBifTs</p></blockquote><p>2楼 回复 引用</p><blockquote><p>呵呵，你说的意思我明白，不过有一些东西我还是觉得不能够完全认同你的。</p><p>1、线程安全。 这里其实不涉及线程安全，所谓线程安全在<code>foreach</code>里面可以部分的保证，但是不能够完全保证。<code>SyncRoot</code>才是保证线程安全的东西，<code>_version</code>所保护的并不是线程安全，而是类似<code>iterator</code>模式里面的“安全遍历”问题。.NET Framework在这里有点“偷懒”并不能够保证“安全遍历”，如果在遍历期间修改了元素的内容，则会引发异常。既然是引发异常，那就不是“XX安全”或者“安全XX”，因为他认为这是一种异常情况，而不是“安全”情况。</p><p>你可以分析一下<code>SyncRoot</code>属性的行为，应该可以看到有一个什么特殊的类型，用于“线程安全”操作的。（这个是我估计的，因为在绝大多数的集合类型里面都会采用一个内部嵌套的类来提供线程安全问题。不过在.NET 2.0里面的<code>Generic</code>集合类型里面不提供这样的操作了，也就是不提供<code>SyncRoot</code>了，因为实际上还是有可能线程不安全的。）在这里面你会看到实际上是通过<code>lock</code>（或者类似的其它东西，目前我没有见到除了<code>lock</code>之外的其他东西，但不排除）来达到线程安全的，实际上并不会引发任何的exception。</p><p>试想一下，如果说一个操作能够引发异常，那么这个操作无论如何都不能够说是“安全”的操作。如果你的程序在<code>foreach</code>外面没有<code>try...catch</code>，甚至会让你的程序崩溃掉，试问，这样是安全的吗？不是吧？我宁愿认为for是“安全的”，尽管他不完全正确。</p><p>实际上如果你在for里面进行add/insert/remove操作，是完全可以判断应该怎么修改index的值，以达到安全遍历的效果。（例如对于add，index完全不需要修改；对于insert，如果insert_index &lt; index 那么 index++ 否则不处理；remove和insert一样，除了把++换成--）</p><p>2、另外，我在你那篇文章里面回复的内容，实际上不会有安全问题，因为我把它copy出来了再进行操作。或者说，遍历的是keys和values数组，修改的是ht哈希表，对哈希表的修改不会影响keys和values，所以完全不会构成冲突。</p><p>不知道我说的是否有理呢？ 2004-07-18 10:50 | sumtec</p></blockquote><p>3楼 回复 引用</p><blockquote><p>分析得好。 2004-07-18 10:56 | 笨牛</p></blockquote><p>4楼 回复 引用</p><blockquote><p>@sumtec 你的回复中，对于安全的描述，你说的也有一定道理，既然引发了异常就不是安全了。 其实我想表达的安全，就是你所说的安全遍历。一般编写多线程程序时，使用<code>for</code>都要很小心，因为<code>for</code>无法保证安全遍历，一旦出错，谁也不知道为什么，这种错误，可能极难被人发现。 记得以前刚学多线程编程的时候，在一本Java关于多线程编程的书上，就介绍，多线程慎用<code>for</code>，常识呀。</p><p>你对<code>Dictionay</code>数据结构的遍历方式，我对此还是持保留态度。我认为，这种方式，数据量小，不一定快，大数据量肯定慢，如果中途有<code>break</code>退出，就更不值得了，因此不推荐使用。 2004-07-18 15:45 | 温少</p></blockquote><p>5楼 回复 引用</p><blockquote><p>学习！ 2004-07-19 08:25 | wngwz</p></blockquote><p>6楼 回复 引用</p><blockquote><p>如果在使用<code>foreach</code>遍历对象的过程中，其他线程修改了<code>List</code>的内容，例如添加或者删除，就会出现不可知的错误，而使用<code>foreach</code>则能够正确抛出错误信息。 2013-07-19 17:18 | 陈大欠</p></blockquote><p>7楼 回复 引用</p><blockquote><p>学习了,谢谢楼主. 我的感觉是,能用<code>while</code>就用<code>while</code>,能用<code>for</code>就用<code>for</code>. 毕竟多线程这个原因就有点飘了,况且C上面没有<code>foreach</code> 它处理并发问题照样利索. 还是自己变懒了,现在常年<code>foreach</code>了,鄙视自己 2013-11-11 09:28 | 喜欢兰花山丘</p></blockquote><p>8楼 回复 引用</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">//本地变量使用for，保证效率</span>
<span class="token keyword">int</span> waitForDeleteListCount <span class="token operator">=</span> waitForDeleteList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> waitForDeleteListCount <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">--</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    index <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">)</span> waitForDeleteList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    globalList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>最后这段代码，如何保证在进行这循环时<code>globalList</code>保持不变？如果<code>globalList</code>被改写，索引产生变化，不就不对了么。 2014-09-26 21:33 | Tekkaman</p></blockquote>`,43);function w(f,h){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("关于"),d,s("和"),m,s("，兼顾效率与安全"),c(a)])]),y])}const b=t(u,[["render",w],["__file","cspbase31.html.vue"]]);export{b as default};
