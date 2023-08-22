import{_ as n,o as s,c as a,d as t}from"./app-35fb03de.js";const p={},o=t(`<h1 id="引用类型参数传递测试" tabindex="-1"><a class="header-anchor" href="#引用类型参数传递测试" aria-hidden="true">#</a> 引用类型参数传递测试</h1><p>posted on 2004-08-13 13:28 hill 阅读(893) 评论(0)</p><p>引用类型参数传递测试（内容主要来自MSDN)</p><p>更详细的说明请参照MSDN&quot;传递参数&quot;</p><ol><li><p>通过值传递引用类型</p><p>例如传递数组<code>change(string[] str)</code>,这种方式可以改变数组的值，相当于使用了<code>ref</code>,但是它和<code>ref</code>还是有区别的,这时如果使用<code>new</code>重新定义数组的维数，则改变是<code>local</code>的，不会影响到函数<code>change</code>以外的<code>str</code></p></li><li><p>通过引用传递引用类型</p><p>这种传递是明确使用<code>ref</code>,例如<code>change(ref string[] str)</code>,这种方式和上面唯一的区别在于即使在函数内使用<code>new</code>重新定义数组也会影响到被引用的原始值,也就是<code>change</code>以外的<code>str</code>也随着<code>change</code>的改变而改变，是绝对的指针引用方式</p></li></ol><p>以下是我的总结</p><p>-------------------------</p><ol start="3"><li>对象是通过引用传递的,相当于前面使用<code>ref</code></li><li>你可以在对象引用前加<code>ref</code>,这种调用和3的结果是一样的</li><li>对结构类型的参数是通过值传递的,函数内的改变不会影响函数外的原始值</li><li>接口相当于对象也是通过引用传递的,他的情况和3完全相同</li></ol><p>具体测试代码如下:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SqlClient</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication1</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//1.通过值传递引用类型</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;1.通过值传递引用类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TestValueRef</span> tvr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestValueRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tvr<span class="token punctuation">.</span><span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//2.通过引用传递引用类型</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;2.通过引用传递引用类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TestValueRefByRef</span> tvrbr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestValueRefByRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tvrbr<span class="token punctuation">.</span><span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//3.交换字符串</span>

            <span class="token comment">//4.测试传递对象是否是引用类型</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;4.测试传递对象是否是引用类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TestTest2</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestTest2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            t<span class="token punctuation">.</span><span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//5.测试传递结构是否是引用类型</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;5.测试传递结构是否是引用类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TestStruct</span> testStruct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            testStruct<span class="token punctuation">.</span><span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//6.测试传递接口是否是引用类型</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;6.测试传递接口是否是引用类型&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TestInterface</span> testInterface <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestInterface</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            testInterface<span class="token punctuation">.</span><span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">TestValueRef</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;原始数据&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">change</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;333&quot;</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改数组的一个值&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改函数内改变数组的维数&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> strMsg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> str<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span> <span class="token class-name">TestValueRefByRef</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;原始数据&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">change</span><span class="token punctuation">(</span><span class="token keyword">ref</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;333&quot;</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改数组的一个值&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;5&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">&quot;更改函数内改变数组的维数&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> str<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> strMsg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> str<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">TestObjectRef</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> strTest <span class="token operator">=</span> <span class="token string">&quot;this is a test&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">TestTest2</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">TestObjectRef</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestObjectRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>strTest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Change</span><span class="token punctuation">(</span><span class="token keyword">ref</span> o<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>strTest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Change</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">TestObjectRef</span> o<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            o<span class="token punctuation">.</span>strTest <span class="token operator">=</span> <span class="token string">&quot;change object&quot;</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>strTest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">struct</span> <span class="token class-name">MyStruct</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> str1<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> str2<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> str3<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">TestStruct</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">MyStruct</span> myStruct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myStruct<span class="token punctuation">.</span>str1 <span class="token operator">=</span> <span class="token string">&quot;str1&quot;</span><span class="token punctuation">;</span>
            myStruct<span class="token punctuation">.</span>str2 <span class="token operator">=</span> <span class="token string">&quot;str2&quot;</span><span class="token punctuation">;</span>
            myStruct<span class="token punctuation">.</span>str3 <span class="token operator">=</span> <span class="token string">&quot;str3&quot;</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">,</span> <span class="token string">&quot;更改前&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Change</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">,</span> <span class="token string">&quot;更改后&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Change</span><span class="token punctuation">(</span><span class="token class-name">MyStruct</span> myStruct<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            myStruct<span class="token punctuation">.</span>str1 <span class="token operator">=</span> <span class="token string">&quot;change1&quot;</span><span class="token punctuation">;</span>
            myStruct<span class="token punctuation">.</span>str2 <span class="token operator">=</span> <span class="token string">&quot;change2&quot;</span><span class="token punctuation">;</span>
            myStruct<span class="token punctuation">.</span>str3 <span class="token operator">=</span> <span class="token string">&quot;Change3&quot;</span><span class="token punctuation">;</span>
            <span class="token function">print</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">,</span> <span class="token string">&quot;更改中&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">MyStruct</span> myStruct<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> strMsg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>strMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">.</span>str1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">.</span>str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myStruct<span class="token punctuation">.</span>str3<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> <span class="token class-name">TestInterface</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">SqlCommand</span> cmd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>CommandText<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IDbCommand</span> Icmd <span class="token operator">=</span> <span class="token punctuation">(</span>IDbCommand<span class="token punctuation">)</span>cmd<span class="token punctuation">;</span>
            <span class="token function">Change</span><span class="token punctuation">(</span>Icmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>CommandText<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Change</span><span class="token punctuation">(</span><span class="token class-name">IDbCommand</span> iDb<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            iDb<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>iDb<span class="token punctuation">.</span>CommandText<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,10),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","cspbase39.html.vue"]]);export{i as default};
