import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-57d1f7b1.js";const l={},k={id:"关于异步事件的一个测试及其分析结果",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#关于异步事件的一个测试及其分析结果","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/bigtall/archive/2004/12/20/79348.html",target:"_blank",rel:"noopener noreferrer"},d=u(`<p>因为工作中需要在多线程中使用事件，本来想在事件中抛出一个异常到主程序中，结果可想而知，失败了。于是作了如下的一个测试，看看多线程中的异常处理问题，代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">testAsyncEvent</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。 </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Class1</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Class1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Run<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            t<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;root&quot;</span><span class="token punctuation">;</span>
            t<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">EventRaiser</span> er0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventRaiser</span><span class="token punctuation">(</span><span class="token string">&quot;er0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            er0<span class="token punctuation">.</span>AsyncTextChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextEvent</span><span class="token punctuation">(</span>er0_TextChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
            er0<span class="token punctuation">.</span>SyncTextChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextEvent</span><span class="token punctuation">(</span>er0_TextChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Begin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ThreadStart</span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>er0<span class="token punctuation">.</span>Run<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span> thr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span>ts<span class="token punctuation">)</span><span class="token punctuation">;</span>
            thr<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;child&quot;</span><span class="token punctuation">;</span>
            thr<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Thread Started&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot;: Cycle Print&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>thr<span class="token punctuation">.</span>IsAlive<span class="token punctuation">)</span>
                thr<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Ok&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Press Enter to Exit &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span>In<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">er0_TextChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> id <span class="token operator">+</span> <span class="token string">&quot;):\\t&quot;</span> <span class="token operator">+</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TextEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> <span class="token class-name">EventRaiser</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CYCLES <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TextEvent</span> AsyncTextChanged<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TextEvent</span> SyncTextChanged<span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">string</span></span> _id<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">EventRaiser</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> id<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            _id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">RaiseText</span><span class="token punctuation">(</span><span class="token string">&quot;Enter Thread:&quot;</span> <span class="token operator">+</span> Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> CYCLES<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> CYCLES<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> CYCLES<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">RaiseText</span><span class="token punctuation">(</span><span class="token string">&quot;Exit Thread:&quot;</span> <span class="token operator">+</span> Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RaiseText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            AsyncTextChanged<span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span>_id<span class="token punctuation">,</span> text<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">SyncTextChanged</span><span class="token punctuation">(</span>_id<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RaiseEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">RaiseText</span><span class="token punctuation">(</span>count<span class="token operator">++</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>代码的执行结果如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Begin
Thread Started
root: Cycle Print
child(er0):     Enter Thread:child
(er0):  Enter Thread:child
root: Cycle Print
child(er0):     0
(er0):  0
(er0):  1
child(er0):     1
root: Cycle Print
(er0):  2
child(er0):     2
(er0):  3
child(er0):     3
(er0):  4
child(er0):     4
(er0):  5
child(er0):     5
(er0):  6
child(er0):     6
root: Cycle Print
(er0):  7
child(er0):     7
(er0):  8
child(er0):     8
(er0):  Exit Thread:child
child(er0):     Exit Thread:child
root: Cycle Print
root: Cycle Print
root: Cycle Print
root: Cycle Print
root: Cycle Print
root: Cycle Print
Ok
Press Enter to Exit ...
</code></pre></div><p>从结果分析，发现如果在线程中发生同步事件，则事件的发生源在同一个线程中，如果线程中发生异步事件，则该事件既不在主线程中，也不再子线程中，而是在系统的临时线程中。</p><p>但是这里有一个问题，我无法区分线程的真正不同，哪里可以取得线程号阿？谁能告诉我，这样有线程号的区别，这个例子可以更清楚一些。</p><blockquote><p>posted on 2004-12-20 09:13 老翅寒暑 阅读(1114)</p></blockquote>`,7);function m(y,h){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("关于异步事件的一个测试及其分析结果"),c(a)])]),d])}const g=t(l,[["render",m],["__file","pts1.html.vue"]]);export{g as default};
