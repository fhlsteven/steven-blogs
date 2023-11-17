import{_ as t,r as p,o as e,c as o,b as n,d as s,e as c,a as l}from"./app-a2b6e588.js";const u={},k={id:"如何调用只有私有构造函数的类",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#如何调用只有私有构造函数的类","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/jobs/archive/2004/07/07/22196.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>当我试用<code>ObjectSpaces</code>时，<code>ObjectSpaces</code>竟然能够调用只有私有构造函数的类。例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name">Class</span> A
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>ObjectSpaces</code>能够创建<code>A</code>的实例，我刚看到的时候，吃了一惊，呵呵…… 后来，借助<code>Reflector</code>分析整理学会了此技巧。</p><p>你不能通过Reflection直接创建只有私有构造函数的类，但是你可以通过一些偏门技巧绕过此限制。</p><p>其大概思路这样的：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name">CreateInstanceDelegate<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> <span class="token generic-method"><span class="token function">BuildDelegate</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Type</span> type <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">AssemblyName</span> assemblyName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AssemblyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    assemblyName<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;System.Data.ObjectSpaces.Dynamic&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">AssemblyBuilder</span> assemblyBuilder 
    <span class="token operator">=</span> AppDomain<span class="token punctuation">.</span>CurrentDomain<span class="token punctuation">.</span><span class="token function">DefineDynamicAssembly</span><span class="token punctuation">(</span>assemblyName<span class="token punctuation">,</span> AssemblyBuilderAccess<span class="token punctuation">.</span>RunAndSave<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Module</span> module 
    <span class="token operator">=</span> assemblyBuilder<span class="token punctuation">.</span><span class="token function">DefineDynamicModule</span><span class="token punctuation">(</span><span class="token string">&quot;WebData&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;DynamicAssembly.dll&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> paramTypeArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">Type</span> rtnType <span class="token operator">=</span> type<span class="token punctuation">;</span>
    <span class="token class-name">String</span> methodName <span class="token operator">=</span> <span class="token string">&quot;call_privateCtor&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> skipVisibility <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token class-name">DynamicMethod</span> method <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DynamicMethod</span><span class="token punctuation">(</span>
    methodName<span class="token punctuation">,</span>
    rtnType<span class="token punctuation">,</span> 
    paramTypeArray<span class="token punctuation">,</span> 
    module<span class="token punctuation">,</span>
    skipVisibility
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ConstructorInfo</span> ctor <span class="token operator">=</span> type<span class="token punctuation">.</span><span class="token function">GetConstructor</span><span class="token punctuation">(</span>
    BindingFlags<span class="token punctuation">.</span>NonPublic <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Public <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Instance<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ILGenerator</span> ilGen <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">GetILGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ilGen<span class="token punctuation">.</span><span class="token function">Emit</span><span class="token punctuation">(</span>OpCodes<span class="token punctuation">.</span>Newobj<span class="token punctuation">,</span> ctor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ilGen<span class="token punctuation">.</span><span class="token function">Emit</span><span class="token punctuation">(</span>OpCodes<span class="token punctuation">.</span>Ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>以上是思路，我们也来写一段代码，让其能够调用缺省构造函数创建对象实例，具体代码：</p><p>第一步， 定义一个Delegate：</p><p><code>public delegate T CreateInstanceDelegate&lt;T&gt;();</code></p><p>第二步，定义构建Delegate的方法,关键在此：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name">CreateInstanceDelegate<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> <span class="token generic-method"><span class="token function">BuildDelegate</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Type</span> type <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">AssemblyName</span> assemblyName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AssemblyName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    assemblyName<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;System.Data.ObjectSpaces.Dynamic&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">AssemblyBuilder</span> assemblyBuilder 
    <span class="token operator">=</span> AppDomain<span class="token punctuation">.</span>CurrentDomain<span class="token punctuation">.</span><span class="token function">DefineDynamicAssembly</span><span class="token punctuation">(</span>assemblyName<span class="token punctuation">,</span> AssemblyBuilderAccess<span class="token punctuation">.</span>RunAndSave<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Module</span> module 
    <span class="token operator">=</span> assemblyBuilder<span class="token punctuation">.</span><span class="token function">DefineDynamicModule</span><span class="token punctuation">(</span><span class="token string">&quot;WebData&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;DynamicAssembly.dll&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> paramTypeArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">Type</span> rtnType <span class="token operator">=</span> type<span class="token punctuation">;</span>
    <span class="token class-name">String</span> methodName <span class="token operator">=</span> <span class="token string">&quot;call_privateCtor&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> skipVisibility <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token class-name">DynamicMethod</span> method <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DynamicMethod</span><span class="token punctuation">(</span>
    methodName<span class="token punctuation">,</span>
    rtnType<span class="token punctuation">,</span> 
    paramTypeArray<span class="token punctuation">,</span> 
    module<span class="token punctuation">,</span>
    skipVisibility
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ConstructorInfo</span> ctor <span class="token operator">=</span> type<span class="token punctuation">.</span><span class="token function">GetConstructor</span><span class="token punctuation">(</span>
    BindingFlags<span class="token punctuation">.</span>NonPublic <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Public <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Instance<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Type</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">ILGenerator</span> ilGen <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">GetILGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ilGen<span class="token punctuation">.</span><span class="token function">Emit</span><span class="token punctuation">(</span>OpCodes<span class="token punctuation">.</span>Newobj<span class="token punctuation">,</span> ctor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    ilGen<span class="token punctuation">.</span><span class="token function">Emit</span><span class="token punctuation">(</span>OpCodes<span class="token punctuation">.</span>Ret<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>CreateInstanceDelegate<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">)</span> method<span class="token punctuation">.</span><span class="token function">CreateDelegate</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CreateInstanceDelegate<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第三步，定义创建实例的方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">CreateInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">CreateInstanceDelegate<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> createInstDelegate <span class="token operator">=</span> <span class="token generic-method"><span class="token function">BuildDelegate</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">createInstDelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>第四步,如此使用：</p><p>定义一个私有缺省构造函数的类</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>创建实例的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token generic-method"><span class="token function">CreateInstance</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>A<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;create A instance&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><hr><p>2004-09-10 10:59dddddd 回复 引用</p><blockquote><p>&quot; 如何调用只有私有构造函数的类 &quot;</p><p>只论技术而言，挺好，但从另外一个方面，你要完成这个是不是说明设计做的不好？</p></blockquote><p>2004-09-10 11:17玉明熙 回复 引用</p><blockquote><p>这是一段Java5的代码？ 另外，用Java的反射很容易就能访问私有变量和私有函数，要生成A只需要调用Constructor 的setAccessible函数就可以访问A的私有构造函数了啊。</p></blockquote><p>2004-09-10 16:02玉明熙 回复 引用</p><blockquote><p>-_-\`原来是C#的。</p></blockquote><p>2004-09-10 21:12温少 回复 引用</p><blockquote><p>@dddddd 你可以了解一下ObjectSpaces的实现，可能你就不认为这是一个设计问题？</p></blockquote><p>2008-02-02 11:50Saiman 回复 引用</p><blockquote><p>虽然我也常用反射发出, 但是像你这种做法明显是多此一举... 究竟有什么好惊讶的呢? 不就是创建只有私有构造函数的类??? 一句就搞定: <code>A a = Activator.CreateInstance(typeof(A), true);</code></p></blockquote><p>2008-04-12 16:13dddd 回复 引用</p><blockquote><p>dddd我支持</p></blockquote>`,31);function m(y,g){const a=p("ExternalLinkIcon");return e(),o("div",null,[n("h1",k,[i,s(),n("a",r,[s("如何调用只有私有构造函数的类"),c(a)])]),d])}const h=t(u,[["render",m],["__file","cspbase30.html.vue"]]);export{h as default};
