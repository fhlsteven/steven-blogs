import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as l}from"./app-a2b6e588.js";const u={},k={id:"c-学习笔记-多态-重写",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#c-学习笔记-多态-重写","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/caca/archive/2004/07/27/27842.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>以继承为基础,继承举例:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Sayhello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,I am a person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>Student</code>类继承与<code>Person</code>类</p><p>我们想改变<code>Student</code>里面继承<code>Person</code>的<code>SayHello()</code>方法,使其具有自己的特性.这里使用<code>new</code>关键字.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,I am a person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello,I am a student&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Person</span> aPerson<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> aStudent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">aStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        aPerson<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        aStudent<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>hello,I am a person
hello,I am a student
</code></pre></div><p>这个过程在多数英文原版书籍里面(例如:Inside C#-MSPress)称为<code>override</code>:</p><p>you want to derive a class from (Person) and you want to override the (SayHello) method to do something specific to the derived class. To do this, you need to use the new keyword with the derived class&#39;s method definition.</p><p>但在翻译成中文时,称为:隐藏(?).</p><h2 id="多态-polymorphism" tabindex="-1"><a class="header-anchor" href="#多态-polymorphism" aria-hidden="true">#</a> 多态(Polymorphism)</h2><p>当使用关键字<code>new</code>来<code>override</code>基类的方法时,程序运行很尽人意.</p><p>(Method overriding with the new keyword works fine if you have a reference to the derived object)</p><p>语言的每个概念的产生都是需要理由的(你不防问问自己为什么c#会有<code>Class</code>,<code>Method</code>...这些概念),这里,我们要问:<br> 为什么会有多态这个概念的出现?有什么用处呢?<br> (看了很多.NET书籍,好像没有这样来解释各个概念的)</p><p>从实际出发,看下面例子:<code>Student</code>,<code>Teacher</code>都是<code>Person</code>,在实际应用中,我们需要把所有<code>Person</code>的派生类组装(populate)到一个数组里面,这个数组的数据类型必定是<code>Person</code>了,而且,通过这个<code>Person[]</code>数组来重新调用数组元素(Person的派生类)的<code>SayHello</code>方法.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,I am a person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello,I am a student&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Teacher</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello,I am a teacher&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Person<span class="token punctuation">[</span><span class="token punctuation">]</span></span> persons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输入结果:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>hello,I am a person
hello,I am a person
</code></pre></div><p>(Obviously, this is not what we wanted)对,在实际应用中,我们不希望出现这种结果. 希望输出:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>hello,I am a student
hello,I am a teacher
</code></pre></div><p>上面的例子,为什么会出现我们所不希望的结果呢?<br> 看看Inside C#的解释:</p><p>What happened here is an example of a phenomenon called early binding. When the code was compiled, the C# compiler looked at the call to <code>Persons[].SayHello()</code> and determined the address in memory that it would need to jump to when the call is made. In this case, that would be the memory location of the Person.SayHello method.<br> Take a look at the following MSIL that was generated from the Test application, and specifically take note of line IL_0014 and the fact that it explicitly calls the <code>Employee.CalculatePay</code> method:</p><p>....<br> IL_0014: call instance void Employee::CalculatePay()<br> ....</p><p>That call to the (Person.SayHello) method is the problem. What we want instead is for late binding to occur. Late binding means that the compiler does not select the method to execute until run time. To force the compiler to call the correct version of an upcasted object&#39;s method, we use two new keywords: virtual and override. The virtual keyword must be used on the base class&#39;s method, and the override keyword is used on the derived class&#39;s implementation of the method.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">virtual</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,I am a person&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello,I am a student&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Teacher</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;hello,I am a teacher&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Person<span class="token punctuation">[</span><span class="token punctuation">]</span></span> persons<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Before running this application, let&#39;s take a peek at the IL code that&#39;s generated, this time noting that line IL_0014 uses the MSIL opcode callvirt,which tells the compiler that the exact method to be called won&#39;t be known until run time because it&#39;s dependent on which derived object is being used:</p><p>.....<br> IL_0014: callvirt instance void Employee::CalculatePay()<br> .....</p><p>输出为:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>hello,I am a student
hello,I am a teacher
</code></pre></div><p>要深刻理解这个过程,必须搞明白什么是&quot;Early Binding&amp;Late Binding&quot;,&quot;run time&quot;,具有&quot;编译原理&quot;相关知识.<br> 本人还没有学习&quot;编译原理&quot;以及&quot;汇编程序&quot;,这一点还是没有搞彻底,不再引用这方面的资料,可以查阅MSDN</p><p>BTW,我们还可以用类型转换来得到我们想要的:<br><code>class Test</code>修改为:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Person<span class="token punctuation">[</span><span class="token punctuation">]</span></span> persons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Person</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Student</span> s<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Teacher</span> t<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        s<span class="token operator">=</span><span class="token punctuation">(</span>Student<span class="token punctuation">)</span>persons<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        t<span class="token operator">=</span><span class="token punctuation">(</span>Teacher<span class="token punctuation">)</span>Persons<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        s<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>以上文章参考(部分字句为直接翻译)<br> [1]Inside C# / Tom Archer.(Microsoft Press)<br> [2]Visual C# .NET:A Gudie for VB6 Develops/Brand Maiani,James Still...(Wrax)</p><hr><p>[楼主] 2007-04-26 01:49 cacard <br></p><blockquote><p>有继承，才会有多态<br> 早绑定就是编译时候确定，晚就是运行时确定。</p></blockquote>`,38);function y(m,h){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("C#学习笔记:多态,重写"),c(a)])]),d])}const b=t(u,[["render",y],["__file","cspbase35.html.vue"]]);export{b as default};
