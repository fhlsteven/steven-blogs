import{_ as t,r as p,o,c,b as n,d as s,e,a as l}from"./app-8e5157a8.js";const u={},i={id:"异步调用",tabindex:"-1"},k=n("a",{class:"header-anchor",href:"#异步调用","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/bigtall/archive/2004/11/15/63945.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>因为程序运行速度比较慢，所以要把长时间运行的代码进行异步处理。所以做了一个如下的测试：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> Using directives</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>Generic</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token keyword">namespace</span> <span class="token namespace">testASycCall</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AsyncCaller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">class</span> <span class="token class-name">Program</span>
    <span class="token punctuation">{</span>
        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Call0</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Call0:Begin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Call0:End&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Call1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Call1:Begin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Call1:End&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Program</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Program</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;ready async call0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">AsyncCaller</span> ac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncCaller</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>Call0<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;invoke async call0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IAsyncResult</span> ar <span class="token operator">=</span> ac<span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;call call1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            p<span class="token punctuation">.</span><span class="token function">Call1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;call1 end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;wait call 0 end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            ar<span class="token punctuation">.</span>AsyncWaitHandle<span class="token punctuation">.</span><span class="token function">WaitOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;call 0 end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>程序运行结果如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>ready async call0
invoke async call0
call call1
Call0:Begin
Call1:Begin
Call0:End
Call1:End
call1 end
wait call 0 end
call 0 end
</code></pre></div><p>看起来并行的还比较明显!</p><p>相同的例子在MSDN上面也有,如果你机器上装了MSDN的话，可以到这里看到原文。不过俺的例子好像比它的更明显些</p><hr><p>1楼</p><blockquote><p>这只是简单的一个异步调用。真正要用好，还要花很多的功夫。<br> 2004-11-15 13:42 | Kain</p></blockquote><p>2楼</p><blockquote><p>我是真看不懂！！！！<br> 2005-11-23 18:10 | 10cn.net</p></blockquote><p>3楼</p><blockquote><p>看懂了<br> 2008-08-29 17:32 | 逖靖寒</p></blockquote>`,13);function y(g,m){const a=p("ExternalLinkIcon");return o(),c("div",null,[n("h1",i,[k,s(),n("a",r,[s("异步调用"),e(a)])]),d])}const C=t(u,[["render",y],["__file","cspbase44.html.vue"]]);export{C as default};
