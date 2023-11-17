import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-a2b6e588.js";const l={},k={id:"线程的暂停、恢复和终止",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#线程的暂停、恢复和终止","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/wdxinren/archive/2004/12/09/74891.html",target:"_blank",rel:"noopener noreferrer"},d=u(`<p>要是一个线程进行到一半，想终止了，怎么办呢？请看代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ThreadTest</span>
<span class="token punctuation">{</span>
    <span class="token comment">//工作线程的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WorkerThreadMethod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//获得当前正在执行的线程对象</span>
        <span class="token class-name">Thread</span> w1 <span class="token operator">=</span> Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">;</span>
        w1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;工人1号正在工作中...&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span> <span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>w1<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">4</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;累死我了,不想做了&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//终止线程</span>
                w1<span class="token punctuation">.</span><span class="token function">Interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//用于封装工作线程的委托</span>
        <span class="token class-name">ThreadStart</span> worker1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>WorkerThreadMethod1<span class="token punctuation">)</span><span class="token punctuation">;</span>        
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;[主函数]开始创建工作线程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//新建一个线程实例，使用worker1委托作为参数，说明这个线程执行的是委托worker1封装的方法</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span>worker1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//启动线程    </span>
        t1<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//阻塞当前的主线程,直到t1线程终止</span>
        t1<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
        
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;[主函数]工作线程结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果是：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>[主函数]开始创建工作线程
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
累死我了,不想做了
[主函数]工作线程结束
</code></pre></div><p>如你所见，Thread.Interrupt()方法就可以让它终止。那么我不想让它终止，只是想让它暂停一下，怎么办呢？只能用Thread.Sleep(...)吗？那样不好控制，还要看时间，真麻烦，那么我们就这样：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">ThreadTest</span>
<span class="token punctuation">{</span>
    <span class="token comment">//工作线程的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WorkerThreadMethod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//获得当前正在执行的线程对象</span>
        <span class="token class-name">Thread</span> w1 <span class="token operator">=</span> Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">;</span>
        w1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;工人1号正在工作中...&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span> <span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>w1<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//用于封装工作线程的委托</span>
        <span class="token class-name">ThreadStart</span> worker1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>WorkerThreadMethod1<span class="token punctuation">)</span><span class="token punctuation">;</span>        
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;[主函数]开始创建工作线程&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//新建一个线程实例，使用worker1委托作为参数，说明这个线程执行的是委托worker1封装的方法</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span>worker1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//启动线程    </span>
        t1<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;我要先来,你给我停下!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">Suspend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span><span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;这部电影真好看,享受ing...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;好了,我做完事了,你开始吧&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">Resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        t1<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;[主函数]工作线程结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果是：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>[主函数]开始创建工作线程
我要先来,你给我停下!
这部电影真好看,享受ing...
这部电影真好看,享受ing...
这部电影真好看,享受ing...
这部电影真好看,享受ing...
这部电影真好看,享受ing...
好了,我做完事了,你开始吧
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
工人1号正在工作中...
[主函数]工作线程结束
</code></pre></div><p>我们用<code>Thread.Suspend</code>方法把指定线程暂停了，然后可以用<code>Thread.Resume</code>方法恢复。</p><p>注意一下Sleep方法跟Suspend方法的差异吧：</p><p>1.Suspend方法没有参数，被它终止的线程只能被另一个线程恢复执行（同过Thread.Resume方法）。（相对应的，Sleep方法要是传递Timeout.Infinite值，那么不能恢复了，只能让另一个线程调用被暂停线程的Thread.Interrupt方法使它终止）</p><p>2.可以在当前执行的线程上或者另一个线程上调用Thread.Suspend方法，而Thread.Sleep方法只能在当前线程上调用。</p><p>（所以我们把t1.Suspend()语句去掉，加到WorkerThreadMethod1里</p><p>如下所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//获得当前正在执行的线程对象</span>
<span class="token class-name">Thread</span> w1 <span class="token operator">=</span> Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">;</span>
w1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;工人1号正在工作中...&quot;</span><span class="token punctuation">;</span>
w1<span class="token punctuation">.</span><span class="token function">Suspend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>效果跟本来是一样的</p><p>）</p><p>3.当一个线程使用Suspend方法暂停另一个线程时，第一个线程不被锁定。调用立即返回。</p><p>另外，无论对一个给定的线程调用多少次Thread.Suspend方法，调用一次Thread.Resume方法就可使线程恢复执行。</p><blockquote><p>posted on 2004-12-09 15:28 小新0574 阅读(23278) 评论(2)</p></blockquote>`,20);function m(h,w){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("线程的暂停、恢复和终止"),c(a)])]),d])}const T=t(l,[["render",m],["__file","pts10.html.vue"]]);export{T as default};
