import{_ as n,o as s,c as a,d as p}from"./app-3696c600.js";const t={},o=p(`<h1 id="实例看多态-tanrui-原作" tabindex="-1"><a class="header-anchor" href="#实例看多态-tanrui-原作" aria-hidden="true">#</a> 实例看多态 tanrui（原作）</h1><p>关键字:多态性 继承</p><p>近来看了一下多态性，把我的一些感受以例子的形式记录一下。</p><h2 id="一-形象理解" tabindex="-1"><a class="header-anchor" href="#一-形象理解" aria-hidden="true">#</a> 一．形象理解</h2><p>两条理解的原则：</p><ul><li>（1）一个派生类对象可以被声明成一个基类，或者是一个基类指针可以指向一个派生类对象：</li></ul><div class="language-c++" data-ext="c++"><pre class="language-c++"><code>//c++ code
BaseClass *p;
DerivedClass obj;
p = &amp;obj;
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//C# code</span>
<span class="token class-name">BaseClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><ul><li>（2）把一个对象看做是一个独立的个体，调用对象的<code>public</code>成员函数实际上是给这个对象发送一个消息，采取什么样的动作完全由对象自己决定。</li></ul><p><code>Shape</code>是基类，<code>Circle</code>和<code>Line</code>是从<code>Shape</code>继承出来的，<code>Shape</code>有<code>draw()</code>方法，<code>Circle</code>与<code>Line</code>分别自己定义了自己的<code>draw()</code>方法，在下面的代码里：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// Java Code</span>
<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> s<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name"><span class="token namespace">s<span class="token punctuation">.</span></span>Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果发生了这样的调用：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token class-name">Line</span> l <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Line</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Circle</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">func</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">func</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>一个<code>Circle</code>和一个<code>Line</code>被当做<code>Shape</code>传到函数里去了，然后调用<code>Draw()</code>，会发生什么情况？因为对象是独立的个体，在<code>func()</code>里，这两个对象被分别传递了<code>Draw()</code>消息，叫它们绘制自己吧，于是他们分别调用了自己类里定义的<code>Draw()</code>动作。</p><p>通过这两条原则我们可以理解上面的多态。正是由于多态，使得我们不必要这样去做：</p><div class="language-c" data-ext="c"><pre class="language-c"><code>IF 你是一个Circle THEN 调用Circle的<span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
ELSE IF 你是一个Line THEN 调用Line的<span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
ELSE …
</code></pre></div><p>我们只要给这个被声明成为<code>Shape</code>的对象发送<code>Draw</code>消息，怎么样去<code>Draw</code>就由对象自己去决定了。</p><h2 id="二-一切皆因虚函数" tabindex="-1"><a class="header-anchor" href="#二-一切皆因虚函数" aria-hidden="true">#</a> 二．一切皆因虚函数</h2><p>先看看实现多态的基本条件：</p><ul><li>（1）基类含有虚函数</li><li>（2）继承类把这个虚函数重新实现了</li><li>（3）继承类也可能没有重新实现基类的所有虚函数，因此对于这些没有被重新实现的虚函数不能发生多态。</li></ul><p>再看一下几种语言里一些特别的规定：</p><ol><li><p>C++：</p><p>（1）虚函数用<code>virtual</code>关键字声明。<br> （2）<code>virtual void Func(para_list) = 0;</code>这样的虚函数叫做纯虚函数，表示这个函数没有具体实现。包含纯虚函数的类叫做抽象类，如果他的继承类没有对这个纯虚函数具体用代码实现，则这个继承类也是抽象类。抽象类不能被实例话（就是说不能创建出对象）。<br> （3）继承类重新实现基类的虚函数时，不需要做任何特别的声明。<br> （4）如果不用<code>virtual</code>关键字修饰，并且在派生类里重新实现了这个方法，这仅仅是一个简单的覆盖，不会发生多态，我们暂称它非多态吧。</p></li><li><p>Java：</p><p>（1）Java没有virtual关键字，Java把一切类的方法都认为是虚函数。<br> （2）继承类重新实现基类的虚函数时，不需要做任何特别的声明。因此在Java里只要重新实现了基类的方法，并且把继承类对象声明为基类，多态就要发生。因此Java对多态的条件相对是比较低的。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">//Java Code</span>
<span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token keyword">extends</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">BaseClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输入是Hello world!。这样就实现了多态。</p><p>（3）虚函数用abstract声明，含有虚函数的类是抽象类，也要用abstract关键字修饰。</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">//Java Code</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">AbstractClass</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//…</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>C#：</p></li></ol><p>C#对于多态的编写是最为严格和严谨的。</p><p>（1）虚函数用<code>virtual</code>声明。<br> （2）纯虚函数用<code>abstract</code>声明，含纯虚函数的类是抽象类，必须用<code>abstract</code>关键字修饰。<br> （3）如果仅仅是覆盖基类的非虚方法，则需要用<code>new</code>关键字声明：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//C# Code</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BaseClass</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,this come from BaseClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BaseClass</span></span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">new</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello,this is come from DerivedClass&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name">BaseClass</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出为<code>Hello,this come from BaseClass，</code>也就是说这并没有实现多态（非多态）。</p><p>（4）通过<code>virtual – override</code>、<code>abstract – override</code>组合实现多态。<br> 当派生类重新实现基类的虚函数（或纯虚函数）时，必须用<code>override</code>关键字进行修饰。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//C# Code</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbsBaseClass</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AbsBaseClass</span></span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token class-name">AbsBaseClass</span> obj<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name">DerivedClass</span> _obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    DerivedClass<span class="token punctuation">.</span><span class="token function">SayHello</span><span class="token punctuation">(</span>_obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出为<code>Hello world!</code></p><h2 id="三-多态的反溯" tabindex="-1"><a class="header-anchor" href="#三-多态的反溯" aria-hidden="true">#</a> 三．多态的反溯</h2><p>继承类对象在发生多态时，并是不完全抛开基类不管的，它会去查看基类的虚函数列表，在这个列表的范围内才会发生多态。</p><p>让我们来看一个比较复杂的例子：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// Java Code</span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;A - Object&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;B - String&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;B - Object&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                 
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">A</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
        a<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>          
        a<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>输出结果为：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>B – Object
B – Object
</code></pre></div><p>正如上面所说的，由于基类里没有参数类型为<code>String</code>的虚函数，因此<code>B</code>的<code>hello(String)</code>方法不参与多态。调用<code>a.hello(str)</code>时，由于<code>String</code>是<code>Object</code>的继承类，因此这个<code>str</code>被作为一个<code>Object</code>传入了<code>B</code>的<code>hello(Object)</code>，这一点正如我们的原则一所述。</p><h2 id="四-接口——仅仅是更抽象的抽象类" tabindex="-1"><a class="header-anchor" href="#四-接口——仅仅是更抽象的抽象类" aria-hidden="true">#</a> 四．接口——仅仅是更抽象的抽象类</h2><p>接口是类的协定，但由于接口又参与多态性，从这一点说，我们认为它是更为抽象的抽象类，如下：</p><div class="language-java" data-ext="java"><pre class="language-java"><code><span class="token comment">// Java Code</span>
<span class="token keyword">interface</span> <span class="token class-name">IBase</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">DerivedClass</span> <span class="token keyword">implements</span> <span class="token class-name">IBase</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">IBase</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DerivedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在Java与C#中，类只能从一个基类派生出来，但是可以实现多个接口。</p><p>这里有一个小小的问题：如果<code>IBase1</code>与<code>IBase2</code>里都声明了有<code>hello()</code>方法，<code>DerivedClass</code>实现了这两个接口，当然需要具体把<code>hello()</code>实现出来。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IBase1</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">IBase2</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DerivedClass1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IBase1</span><span class="token punctuation">,</span><span class="token class-name">IBase2</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DerivedClass2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IBase1</span><span class="token punctuation">,</span><span class="token class-name">IBase2</span></span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> IBase1<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This come from IBase1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token return-type class-name"><span class="token keyword">void</span></span> IBase2<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;This come from IBase2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">IBase1</span> obj_1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IBase2</span> obj_2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IBase1</span> obj_3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">IBase2</span> obj_4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        obj_1<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj_2<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj_3<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj_4<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出为：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>Hello world<span class="token operator">!</span>
Hello world<span class="token operator">!</span><span class="token punctuation">;</span>
This come from IBase1
This come from IBase2
</code></pre></div><p>有两点注意：</p><p>（1）<code>DerivedClass2</code>的实现方法叫显式实现，这种方法C#才支持，在Java里不能实现。</p><p>（2）进一步测试表明：<code>hello()</code>方法并不属于<code>DerivedClass2</code>：</p><p>加入这样的代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">DerivedClass2</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DerivedClass2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
t<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>编译错误：<code>test.cs(44,3): error CS0117: “DerivedClass2”并不包含对“hello”的定义</code></p><p>那就是说这个方法是属于接口的，但是接口不能含有具体的实现代码，这里是不是存在一定的矛盾呢？</p><p>欢迎与我交流：tanrui@sjtu.edu.cn</p><hr><hr><p>对该文的评论 人气：472</p><p>wr960204 (2004-3-11 17:33:43)</p><blockquote><p>有些观点我不能同意。但也不能说我认为的就是对的</p></blockquote>`,57),c=[o];function e(l,u){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","cspbase18.html.vue"]]);export{i as default};
