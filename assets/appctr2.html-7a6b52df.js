import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-f0851ed3.js";const l={},k={id:"利用mutex实现应用程序的单实例运行",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#利用mutex实现应用程序的单实例运行","aria-hidden":"true"},"#",-1),r={href:"http://www.cnblogs.com/dudu/archive/2004/05/22/10908.html",target:"_blank",rel:"noopener noreferrer"},m=u(`<p><code>System.Threading.Mutex</code> ：同步基元，它只向一个线程授予对共享资源的独占访问权。[MSDN]</p><p>实现原理: 在程序启动时，请求一个互斥体，如果能获取对指定互斥的访问权，就继续运行程序，否则就退出程序。</p><p>测试代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Mutex</span> mutex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Mutex</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&quot;Test&quot;</span><span class="token punctuation">,</span> <span class="token keyword">out</span> flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第一个参数:true--给调用线程赋予互斥体的初始所属权</span>
        <span class="token comment">//第一个参数:互斥体的名称</span>
        <span class="token comment">//第三个参数:返回值,如果调用线程已被授予互斥体的初始所属权,则返回true</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Running&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Another is Running&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//线程挂起5秒钟</span>
            Environment<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//退出程序</span>
        <span class="token punctuation">}</span>
        Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>运行结果：</p><p>第一次运行，输出&quot;Running&quot;。<br> 不关闭第一次运行的程序, 进行第二次运行，输出&quot;Another is Running&quot;，五秒钟后，程序自动退出。</p><blockquote><p>posted @ 2004-05-22 13:38 dudu 阅读(8362) 评论(13)</p></blockquote>`,7);function d(g,h){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("利用Mutex实现应用程序的单实例运行"),c(a)])]),m])}const f=t(l,[["render",d],["__file","appctr2.html.vue"]]);export{f as default};
