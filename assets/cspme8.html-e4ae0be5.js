import{_ as n,o as s,c as a,d as t}from"./app-35fb03de.js";const p={},o=t(`<h1 id="c-事件" tabindex="-1"><a class="header-anchor" href="#c-事件" aria-hidden="true">#</a> C#事件</h1><p>作者：魂特 摘自：aspxcn.com 2002-09-02</p><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>任何编写过图形用户界面（GUI）软件的开发人员都熟悉事件处理编程，当用户与GUI控制进行交互时（例如点击表格上的按钮），作为上述事件的反应，就会执行一个或多个方法。没有用户的参与，事件也可能执行。事件处理程序是对象的方法，是根据应用程序中发生的事件而执行的。为了理解.Net框架下的事件处理模式，我们需要理解代理的概念。</p><h2 id="c-中的代理" tabindex="-1"><a class="header-anchor" href="#c-中的代理" aria-hidden="true">#</a> C#中的代理</h2><p>C#中的代理允许我们将一个类中的方法传递给其他类的对象。我们能够将类A中的方法m封装为一个代理，传递给类B，类B能够调用类A中的方法m，静态和实例方法都可以传送。C++软件开发人员应该对这一概念非常熟悉，在C++中，开发人员能够以参数的形式使用函数指针将函数传递给同理个类或其他类中的方法。代理的概念是在Visulal J++中引入的，然后又被带到了C#中。在.Net框架中C#的代理是以从System.Delegate中继承的类的形式实现的。使用代理需要4个步骤</p><ol><li>定义一个输入参数与要进行封装的方法完全相同的代理对象</li><li>定义所有输入参数与在第1步中定义的代理对象相同的方法</li><li>创建代理对象，并与希望封装的方法进行连接</li><li>通过代理对象调用封装的方法</li></ol><p>下面的C#代码通过实现一个代理、4个类举例说明了上面的4个步骤：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token comment">//步骤1：定义一个具有被封装方法输入参数的代理对象 </span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyDelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//步骤2：定义与定义的代理对象具有相同输入参数的方法 </span>
<span class="token keyword">class</span> <span class="token class-name">MyClass1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">delegateMethod1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is delegateMethod1 and the input to the method is {0}&quot;</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">delegateMethod2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This is delegateMethod2 and the input to the method is {0}&quot;</span><span class="token punctuation">,</span> input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//步骤3：创建代理对象，插入方法 </span>
<span class="token keyword">class</span> <span class="token class-name">MyClass2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">MyDelegate</span> <span class="token function">createDelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyClass1</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyDelegate</span> d1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDelegate</span><span class="token punctuation">(</span>c2<span class="token punctuation">.</span>delegateMethod1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyDelegate</span> d2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyDelegate</span><span class="token punctuation">(</span>c2<span class="token punctuation">.</span>delegateMethod2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyDelegate</span> d3 <span class="token operator">=</span> d1 <span class="token operator">+</span> d2<span class="token punctuation">;</span>
        <span class="token keyword">return</span> d3<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//步骤4：通过代理调用被封装的方法。 </span>
<span class="token keyword">class</span> <span class="token class-name">MyClass3</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">callDelegate</span><span class="token punctuation">(</span><span class="token class-name">MyDelegate</span> d<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">d</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Driver</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyClass2</span> c2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyDelegate</span> d <span class="token operator">=</span> c2<span class="token punctuation">.</span><span class="token function">createDelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyClass3</span> c3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c3<span class="token punctuation">.</span><span class="token function">callDelegate</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span> <span class="token string">&quot;Calling the delegate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-中的事件处理程序" tabindex="-1"><a class="header-anchor" href="#c-中的事件处理程序" aria-hidden="true">#</a> C#中的事件处理程序</h2><p>C#中的事件处理程序是一个带有特定输入参数的代理，如下所示：</p><p><code>public delegate void MyEventHandler(object sender, MyEventArgs e);</code></p><p>上面定义中的第一个参数（sender）指定了发生事件的对象，第二个参数（e）存储着在事件处理程序中要用到的数据。MyEventArgs类是继承EventArgs类得来的，EventArgs类是MouseEventArgs、ListChangedEventArgs等更专业化的类的基础类。对于GUI事件，我们可以使用这些特定的EventArgs类的对象，而无需自己创建特定的EventArgs类。然而，对于非GUI事件而言，我们仍然需要创建自己的特定的EventArgs类，存储希望向代理对象传递的数据。我们可以通过继承EventArgs类创建自己特定的EventArgs类：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token return-type class-name">MyEventArgs</span> EventArgs<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> m_myEventArgumentdata<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在事件处理程序中，代理对象的调用需要用到event关健字，如下所示：</p><p><code>public event MyEventHandler MyEvent;</code></p><p>下面我们将建立二个类，体会.Net框架中事件处理机制的工作原理。在对代理的讨论的第二个步骤中，要求我们定义与定义的代理有完全相同的输入参数的方法。在我们的例子中，类A将提供事件处理程序（与代理对象具有相同输入参数的方法。），它将创建代理对象（对代理讨论中的第三步）并安装事件处理程序。类A然后会将代理对象传递给类B。当类B中有事件出现时，它就会执行类A中的事件处理程序方法。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token comment">//步骤1：创建代理对象 </span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyHandler1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyHandler2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//步骤2：创建事件处理程序方法 </span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> m_id <span class="token operator">=</span> <span class="token string">&quot;Class A&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnHandler1</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I am in OnHandler1 and MyEventArgs is {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>m_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnHandler2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;I am in OnHandler2 and MyEventArgs is {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>m_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//步骤3：创建代理，安装事件处理程序，并向启动事件的对象注册。 </span>
    <span class="token keyword">public</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token class-name">B</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">MyHandler1</span> d1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyHandler1</span><span class="token punctuation">(</span>OnHandler1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyHandler2</span> d2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyHandler2</span><span class="token punctuation">(</span>OnHandler2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span>Event1 <span class="token operator">+=</span> d1<span class="token punctuation">;</span>
        b<span class="token punctuation">.</span>Event2 <span class="token operator">+=</span> d2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//步骤4：通过代理调用封装的方法。 </span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">MyHandler1</span> Event1<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">MyHandler2</span> Event2<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">FireEvent1</span><span class="token punctuation">(</span><span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Event1 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">Event1</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">FireEvent2</span><span class="token punctuation">(</span><span class="token class-name">MyEventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Event2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">Event2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyEventArgs</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">EventArgs</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> m_id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Driver</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">B</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyEventArgs</span> e1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">MyEventArgs</span> e2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        e1<span class="token punctuation">.</span>m_id <span class="token operator">=</span> <span class="token string">&quot;Event args for event 1&quot;</span><span class="token punctuation">;</span>
        e2<span class="token punctuation">.</span>m_id <span class="token operator">=</span> <span class="token string">&quot;Event args for event 2&quot;</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">FireEvent1</span><span class="token punctuation">(</span>e1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        b<span class="token punctuation">.</span><span class="token function">FireEvent2</span><span class="token punctuation">(</span>e2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="c-中的gui事件处理" tabindex="-1"><a class="header-anchor" href="#c-中的gui事件处理" aria-hidden="true">#</a> C#中的GUI事件处理</h2><p>Windows Forms（支持GUI应用程序的.NET框架）中的事件处理使用.NET事件处理模式。我们下面将应用这种模式编写一个简单的应用程序，该应用程序有一个继承自System.Windows.Forms.Form类的MyForm类。如果仔细地研究一下代码和其中的三行注释，就会发现其实我们无须定义代理和使用event关健字调用这些代理，因为我们已经可以使用GUI控制（表格、按钮等）的事件（鼠标点击等），代理就是System.EventHandler。当然了，我们仍然需要定义方法，创建代理对象（System.EventHandler），并在代理对象中安装方法，一旦有事件发生，方法就会开始执行。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span> 
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span> 

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyForm</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> m_nameButton<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Button</span> m_clearButton<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Label</span> m_nameLabel<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Container</span> m_components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">MyForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">initializeComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">initializeComponents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        m_nameLabel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_nameButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_clearButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        m_nameLabel<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_nameLabel<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Click NAME button, please&quot;</span><span class="token punctuation">;</span>
        m_nameLabel<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        m_nameButton<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_nameButton<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">176</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_nameButton<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;NAME&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//创建代理，并安装方法，将代理捆绑在按钮的Click事件上 </span>
        m_nameButton<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>NameButtonClicked<span class="token punctuation">)</span><span class="token punctuation">;</span>

        m_clearButton<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">152</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_clearButton<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">176</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m_clearButton<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;CLEAR&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//创建代理，并安装方法，将代理捆绑在按钮的Click事件上 </span>
        m_clearButton<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>ClearButtonClicked<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Size</span><span class="token punctuation">(</span><span class="token number">292</span><span class="token punctuation">,</span> <span class="token number">271</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> m_nameLabel<span class="token punctuation">,</span> m_nameButton<span class="token punctuation">,</span> m_clearButton <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//定义输入参数与代理完全相同的方法 </span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">NameButtonClicked</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        m_nameLabel<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;My name is john, please click CLEAR button to clear it&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ClearButtonClicked</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        m_nameLabel<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Click NAME button, please&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>结束语</p><p>Java和Smalltalk等其他的面向对象的编程语言中都没有代理的概念，这一概念是在C#中新引进的，它源自于C++和J++。我希望上面的讨论使第一次使用面向对象的编程语言时就使用C#语言的编程人员能够弄明白代理的概念。如果使用Visual Studio IDE作为C# GUI的开发环境，无需编写代码就能够将代理中的方法与由GUI控制生成的事件（例如用鼠标点击按钮等）连接在一起，当然了，我们还是应当知道这是怎么回事</p>`,23),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","cspme8.html.vue"]]);export{i as default};
