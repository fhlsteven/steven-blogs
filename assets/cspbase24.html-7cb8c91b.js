import{_ as n,o as s,c as a,d as p}from"./app-3696c600.js";const t={},o=p(`<h1 id="用c-开发程序应用框架" tabindex="-1"><a class="header-anchor" href="#用c-开发程序应用框架" aria-hidden="true">#</a> 用C#开发程序应用框架</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>框架是一种定制的通用的应用程序开发基础软件，在其基础上可以开发完整的关且功能完善的软件。在最近几年里，已经成功实现了某些应用领域的开发框架,比如说用户介面开发及数据访问开发等。如果能成功的开发出一个框架，这将是一个突破，因为这意味着开发将不再从头开始实现某个功能：比如一个框架如果可以成功的生成一个用户介面，哪么它也能生成做任意的用户介面。例如，假如我们使用java Applets 和servlets，我们仅仅需要重写某些方法，就可以实现我们自己的代码。这其中java Applets和servlets就是我们所使用的框架平台。Microsoft也实现了MFC类库存，还有本文涉及的.net Framework (当然还用Borland的vcl)。</p><h2 id="先决条件" tabindex="-1"><a class="header-anchor" href="#先决条件" aria-hidden="true">#</a> 先决条件</h2><p>本文的读者应该有c#的使用经验，或者对java applet 和 servlet有基础的了解，以便可以理解本文所涉及的一些基本概念。</p><h2 id="工具" tabindex="-1"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h2><p>本文所写代码在windows 2000+.net Framework 发行版下测试。因为本文不需要图形介面，所以我使用写字板及c#命令行编译器实现。</p><h2 id="正文" tabindex="-1"><a class="header-anchor" href="#正文" aria-hidden="true">#</a> 正文</h2><p>在下面，你将看到如何实现一个应用程序框架模型的基础构造。开发应用框架时的基本核心就是<code>template</code>方法，它被隐藏在应用程序里面，控制应用程序的运行。它只在基类里面实现并且不能被改变。</p><p>第一步就是构建框架的基类。在构建框架时基类是最重要的类。</p><p>它里面有可以被重写的方法，最终用户可以重写这些方法以实现他们自己的应用程序。除了这些，这里还有一个<code>template</code>方法用于在框架进程中控制。我们将要构建的框架包括三个需要最终用户实现的抽象方法。他们是<code>init</code>,<code>run</code>和<code>destroy</code>.,它们必须要顺序实现。下面就是我们实现的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 这个类之所以被定义为抽象类，是因为用户方法还没有被实现</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AppFramework</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 构造器调用template方法</span>
    <span class="token keyword">public</span> <span class="token function">AppFramework</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 下面的方法需要最终用户实现</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//template方法是框架的核心</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Initializing Template Engine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// template 方法顺序调用所需要的方法</span>
        <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Ending Template Engine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>请不要将<code>template</code>方法写为虚方法，因为这将给最终用户修改<code>template</code>方法的能力从而改变了整个框架的基础。也就是说这仅是框架开发都需要完成的任务，最终用户要做的就是从框架基类继承并重写这些在框架中定义的抽象类以实现自己定制的功能。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 从基类继承</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AppFramework</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">// 将抽象方法重写以实现定制的功能</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::init&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::run&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::destroy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// the main method defined</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> arg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass</span> myClass <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>尽管<code>Main()</code>函数与这些重写的函授放在一个类中是可行的，但最好是放在一个单独的类中。下面是全部的代码.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AppFramework</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">AppFramework</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">templateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Initializing Template Engine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Ending Template Engine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AppFramework</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::init&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::run&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;MyClass::destroy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> arg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">MyClass</span> myClass <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,16),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","cspbase24.html.vue"]]);export{i as default};
