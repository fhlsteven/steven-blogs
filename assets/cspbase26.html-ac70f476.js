import{_ as t,r as o,o as e,c,b as n,d as s,e as l,a}from"./app-d9da1b6d.js";const u={},k=a(`<h1 id="c-中的委托样例代码" tabindex="-1"><a class="header-anchor" href="#c-中的委托样例代码" aria-hidden="true">#</a> C#中的委托样例代码</h1><h2 id="c-中的委托样例代码-一" tabindex="-1"><a class="header-anchor" href="#c-中的委托样例代码-一" aria-hidden="true">#</a> C#中的委托样例代码(一)</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Wrox<span class="token punctuation">.</span>ProCSharp<span class="token punctuation">.</span>AdvancedCSharp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">DoubleOp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> <span class="token class-name">MainEntryPoint</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">DoubleOp<span class="token punctuation">[</span><span class="token punctuation">]</span></span> operations <span class="token operator">=</span>
            <span class="token punctuation">{</span>
               <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DoubleOp</span><span class="token punctuation">(</span>MathsOperations<span class="token punctuation">.</span>MultiplyByTwo<span class="token punctuation">)</span><span class="token punctuation">,</span>
               <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DoubleOp</span><span class="token punctuation">(</span>MathsOperations<span class="token punctuation">.</span>Square<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> operations<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Using operations[{0}]:&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">7.94</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1.414</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span><span class="token class-name">DoubleOp</span> action<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">double</span></span> result <span class="token operator">=</span> <span class="token function">action</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Value is {0}, result of operation is {1}&quot;</span><span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span> <span class="token class-name">MathsOperations</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">MultiplyByTwo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">value</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">Square</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">value</span> <span class="token operator">*</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),i={id:"c-中的委托样例代码-二",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#c-中的委托样例代码-二","aria-hidden":"true"},"#",-1),d={href:"http://www.cnblogs.com/cngis/archive/2004/06/04/13386.aspx",target:"_blank",rel:"noopener noreferrer"},y=a(`<p>Posted on 2004-06-04 14:17 集思 阅读(505)</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Wrox<span class="token punctuation">.</span>ProCSharp<span class="token punctuation">.</span>AdvancedCSharp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoubleOp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> <span class="token class-name">MainEntryPoint</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">DoubleOp</span> operations <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DoubleOp</span><span class="token punctuation">(</span>MathsOperations<span class="token punctuation">.</span>MultiplyByTwo<span class="token punctuation">)</span><span class="token punctuation">;</span>
            operations <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DoubleOp</span><span class="token punctuation">(</span>MathsOperations<span class="token punctuation">.</span>Square<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">,</span> <span class="token number">7.94</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span>operations<span class="token punctuation">,</span> <span class="token number">1.414</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessAndDisplayNumber</span><span class="token punctuation">(</span><span class="token class-name">DoubleOp</span> action<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot; ProcessAndDisplayNumber called with value = &quot;</span> <span class="token operator">+</span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">action</span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span> <span class="token class-name">MathsOperations</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MultiplyByTwo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">double</span></span> result <span class="token operator">=</span> <span class="token keyword">value</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Multiplying by 2: {0} gives {1}&quot;</span><span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Square</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">double</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">double</span></span> result <span class="token operator">=</span> <span class="token keyword">value</span><span class="token operator">*</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Squaring: {0} gives {1}&quot;</span><span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2);function w(m,b){const p=o("ExternalLinkIcon");return e(),c("div",null,[k,n("h2",i,[r,s(),n("a",d,[s("C#中的委托样例代码(二)"),l(p)])]),y])}const v=t(u,[["render",w],["__file","cspbase26.html.vue"]]);export{v as default};
