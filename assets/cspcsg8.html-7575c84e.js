import{_ as n,o as s,c as a,a as p}from"./app-8e5157a8.js";const t={},o=p(`<h1 id="c-编码规范-修订" tabindex="-1"><a class="header-anchor" href="#c-编码规范-修订" aria-hidden="true">#</a> C#编码规范（修订）</h1><ol><li><p>避免将多个类放在一个文件里面。</p></li><li><p>一个文件应该只有一个命名空间，避免将多个命名空间放在同一个文件里面。</p></li><li><p>一个文件最好不要超过500行的代码（不包括IDE产生的代码）。</p></li><li><p>一个方法的代码长度最好不要超过25行。</p></li><li><p>避免方法中有超过5个参数的情况。如果超过了，则应使用 struct 来传递多个参数。</p></li><li><p>每行代码不要超过80个字符。</p></li><li><p>原则上，尽量不要手工的修改机器产生的代码。<br> a) 如果需要编辑机器（IDE）产生的代码，编辑格式和风格要符合该编码标准。<br> b) 尽可能地使用片断类来把被保持的部分分解为各个因素<br> 注：这里的翻译参考了灵感之源老兄的说法，在Visual c#2005中，C#的语法已经支持partial修饰符，它的作用是可以将一个完整的类分解各个部分类，在编译时，编译器会将它们构造为一个类。</p><p>具体请参考<br> http://blog.joycode.com/zhanbos/archive/2004/05/25/22402.aspx <br> http://weblogs.asp.net/jaybaz_ms/archive/2004/04/28/122392.aspx</p></li><li><p>避免利用注释解释显而易见的代码。<br> a) 代码应该可以自解释。好的代码本身就应具体良好的可读性，所使用的变量和方法命名一般情况下不需要注释。</p></li><li><p>文档应该仅用于assumptions, algorithm insights等等.</p></li><li><p>避免使用方法级的文档。<br> a) 使用扩展的API文档进行说明。<br> b) 只有在该方法需要被其他的开发者使用的时候才使用方法级的注释。（在C#中就是<code>///</code>）</p></li><li><p>不要硬编码数字的值，总是使用构造函数设定其值。</p></li><li><p>只有是自然结构才能直接使用const(常量)，比如一个星期的天数。</p></li><li><p>区别只读变量及常量的使用方法，如果想实现只读变量，可以直接使用readonly修饰符。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> Number<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> someValue<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Number <span class="token operator">=</span> someValue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span>  <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span>  DaysInWeek <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>每个假设必须使用Assert检查<br> a) 平均每15行要有一次检查(Assert)</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>

<span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">GetObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
<span class="token class-name"><span class="token keyword">object</span></span> obj <span class="token operator">=</span> <span class="token function">GetObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Debug<span class="token punctuation">.</span><span class="token function">Assert</span><span class="token punctuation">(</span>obj <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>代码的每一行都应该通过白盒方式的测试。</p></li><li><p>只抛出已经显示处理的异常。</p></li><li><p>在捕获(catch)语句的抛出异常子句中(throw)，总是抛出原始异常，用以维护原始错误的堆栈分配。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> exception<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>exception<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> <span class="token punctuation">;</span>  <span class="token comment">//和throw exception一样。</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注：同理，不推荐在循环语句中，进行直接的return操作。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">==</span><span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">//不推荐的方式</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>避免方法的返回值是错误代码。</p></li><li><p>尽量避免定义自定义异常类。</p></li><li><p>当需要定义自定义的异常时：<br> a) 自定义异常要继承于ApplicationException。<br> b) 提供自定义的序列化功能。</p></li><li><p>避免在单个程序集里使用多个Main方法。</p></li><li><p>只对外公布必要的操作，其他的则为internal。</p></li><li><p>避免使用友元程序集，因为它会增加程序集间的耦合度。</p></li><li><p>避免编写从指定的位置加载的程序集的代码。</p></li><li><p>使应用程序集尽量为最小化代码(EXE客户程序)。使用类库来替换包含的商务逻辑。</p></li><li><p>避免给枚举变量提供显式的值。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//正确方法</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Color</span>
<span class="token punctuation">{</span>
    Red<span class="token punctuation">,</span>Green<span class="token punctuation">,</span>Blue
<span class="token punctuation">}</span>

<span class="token comment">//避免</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Color</span>
<span class="token punctuation">{</span>
    Red <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>Green <span class="token operator">=</span>  <span class="token number">2</span><span class="token punctuation">,</span>Blue <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>避免指定特殊类型的枚举变量。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//避免  </span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Color</span>  <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">long</span></span>
<span class="token punctuation">{</span>
    Red<span class="token punctuation">,</span>Green<span class="token punctuation">,</span>Blue
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>即使if语句只有一句，也要将if语句的内容用大括号扩起来。</p></li><li><p>避免使用trinary条件操作符。</p></li><li><p>避免在条件语句中调用返回bool值的函数。可以使用局部变量并检查这些局部变量。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsEverythingOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>

<span class="token comment">//避免</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>IsEverythingOK <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>

<span class="token comment">//替换方案</span>
<span class="token class-name"><span class="token keyword">bool</span></span> ok <span class="token operator">=</span> <span class="token function">IsEverythingOK</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>ok<span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
</code></pre></div></li><li><p>总是使用基于0开始的数组。</p></li><li><p>在循环中总是显式的初始化引用类型的数组。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">MyClass<span class="token punctuation">[</span><span class="token punctuation">]</span></span> array <span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>  index<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    array<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>尽量不要提供public 和 protected的成员变量，使用属性代替他们。</p></li><li><p>避免在继承中使用new而使用override来进行替换。</p></li><li><p>在不是sealed的类中总是将public 和 protected的方法标记成virtual的。</p></li><li><p>除非使用interop(COM+ 或其他的dll)代码否则不要使用不安全的代码(unsafe code)。</p></li><li><p>避免显式的转换，使用as操作符进行兼容类型的转换。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Dog</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GermanShepherd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">GermanShepherd</span> shepherd <span class="token operator">=</span> dog  <span class="token keyword">as</span>  <span class="token class-name">GermanShepherd</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>shepherd <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
</code></pre></div></li><li><p>当类成员包括委托的时候<br> a) 在调用委托前，将它拷贝到一个本地变量中，用以避免并发争用条件。<br> b) 在调用委托之前一定要检查它是否为null</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySource</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">EventHandler</span>  MyEvent<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">FireEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    　　<span class="token comment">//将委托拷到一个本地变量中。</span>
        <span class="token class-name">EventHandler</span> temp <span class="token operator">=</span> MyEvent<span class="token punctuation">;</span>
        <span class="token comment">//确定它是否为空</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>temp <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">temp</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> EventArgs<span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>不要提供公共的事件成员变量，使用事件访问器替换这些变量。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MySource</span>
<span class="token punctuation">{</span>
    <span class="token class-name">MyDelegate</span> m_SomeEvent<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token return-type class-name">MyDelegate</span> SomeEvent
    <span class="token punctuation">{</span>
        <span class="token keyword">add</span>
        <span class="token punctuation">{</span>
            m_SomeEvent <span class="token operator">+=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">remove</span>
        <span class="token punctuation">{</span>
            m_SomeEvent <span class="token operator">-=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>使用一个事件帮助类来公布事件的定义。</p></li><li><p>总是使用接口。</p></li><li><p>类和接口中的方法和属性至少为2:1的比例。</p></li><li><p>避免一个接口中只有一个成员。</p></li><li><p>尽量使每个接口中包含3－5个成员。</p></li><li><p>接口中的成员不应该超过20个。<br> a) 实际情况可能限制为12个</p></li><li><p>避免接口成员中包含事件。</p></li><li><p>避免使用抽象方法而使用接口替换。</p></li><li><p>在类层次中显示接口。</p></li><li><p>推荐使用显式的接口实现。</p></li><li><p>从不假设一个类型兼容一个接口，并应防止查询那些接口。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">SomeType</span> obj1<span class="token punctuation">;</span>
<span class="token class-name">IMyInterface</span> obj2<span class="token punctuation">;</span>

<span class="token comment">/* 假设已有代码初始化过obj1，接下来 */</span>
obj2 <span class="token operator">=</span> obj1 <span class="token keyword">as</span> <span class="token class-name">IMyInterface</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>obj2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    obj2<span class="token punctuation">.</span><span class="token function">Method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token comment">//处理错误</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>表现给最终用户的字符串（一般指UI界面中的部分）不要使用直接编码，而应该要使用资源文件来替换。<br> 注：这样做的目的是方便软件的本地化。</p></li><li><p>不要直接编写可能会更改的基于配置的字符串，比如连接字符串。</p></li><li><p>当需要构建较长的字符串的时候，应该考虑使用StringBuilder不要使用string来处理。<br> 注：string每次要创建一个新的实例，较占用空间，并产生了相对StringBuilder更大的性能消耗。对于过于频繁的字符串操作，采用StringBuilder是一个良好的习惯。</p></li><li><p>避免在结构里面提供方法。<br> a) 建议使用参数化构造函数<br> b) 可以重载操作符</p></li><li><p>总是要给静态变量提供静态构造函数。</p></li><li><p>在能够使用早期绑定的情况下，尽量避免使用后期绑定。<br> 注：后期绑定虽然灵活，但带来的不仅仅是性能上的消耗，更多的是编码上的复杂性和混乱的逻辑。</p></li><li><p>使用应用程序的日志和跟踪。</p></li><li><p>除非在不完全的switch语句中否则不要使用goto语句。<br> 注：原则上不应使用goto语句，除非在能够大大减轻编码的复杂性，并不影响可读性的前提下才允许使用。</p></li><li><p>在switch语句中总是要有default子句来显示信息(Assert)。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> number <span class="token operator">=</span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">switch</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        Trace<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Case 1:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
        Trace<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Case 2:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token punctuation">:</span>
        Debug<span class="token punctuation">.</span><span class="token function">Assert</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>除非在构造函数中调用其他构造函数否则不要使用this指针。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 正确使用this的例子</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>除非你想重写子类中存在名称冲突的成员或者调用基类的构造函数否则不要使用base来访问基类的成员。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 正确使用base的例子</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Dog</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">virtual</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Bark</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> howLong<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GermanShepherd</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Dog</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">GermanShe</span> <span class="token function">pherd</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Bark</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> howLong<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Bark</span><span class="token punctuation">(</span>howLong<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>基于模板的时候要实现Dispose()和Finalize()两个方法。</p></li><li><p>通常情况下避免有从System.Object转换来和由System.Object转换去的代码，而使用强制转换或者as操作符替换。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">SomeClass</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">//避免：</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">object</span></span> temp <span class="token operator">=</span> t<span class="token punctuation">;</span>
        <span class="token class-name">SomeClass</span> obj <span class="token operator">=</span> <span class="token punctuation">(</span>SomeClass<span class="token punctuation">)</span>temp<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 正确：</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">SomeClass</span></span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SomeClass</span> obj <span class="token operator">=</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>在一般情况下不要定义有限制符的接口。接口的限制级别通常可以用强类型来替换之。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Customer</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>

<span class="token comment">//避免：</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IList<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Customer</span></span>  
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>

<span class="token comment">//正确：</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ICustomerList</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IList<span class="token punctuation">&lt;</span>Customer<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
</code></pre></div></li><li><p>不确定在接口内的具体方法的限制条件。</p></li><li><p>总是选择使用C#内置（一般的generics）的数据结构</p></li><li><p>初始化类的实例时，除非十分必要，否则不要赋null值。</p></li><li><p>使用后的实例，尽量不要将该实例的引用赋值和为nul，尤其是采用public来修饰的类成员l。<br> 1）如果该实例是临时引用，请使用using语句，然后在程序块中使用。<br> 2）如果需要释放资源，应可能地使用Dispose，采用null值的方法，该引用在指向下一个实例前，不会被回收。</p></li></ol>`,2),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspcsg8.html.vue"]]);export{i as default};
