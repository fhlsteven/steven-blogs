import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const e={},t=p(`<h1 id="使用delegate类型设计自定义事件" tabindex="-1"><a class="header-anchor" href="#使用delegate类型设计自定义事件" aria-hidden="true">#</a> 使用delegate类型设计自定义事件</h1><p>作者：罗会涛</p><p>在C#编程中，除了Method和Property，任何Class都可以有自己的事件（Event）。定义和使用自定义事件的步骤如下：</p><ul><li>（1）在Class之外定义一个delegate类型，用于确定事件程序的接口</li><li>（2）在Class内部，声明一个public event变量，类型为上一步骤定义的delegate类型</li><li>（3）在某个Method或者Property内部某处，触发事件</li><li>（4）Client程序中使用+=操作符指定事件处理程序</li></ul><p>例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 定义Delegate类型，约束事件程序的参数</span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> lineNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataImports</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 定义新事件NewLineRead</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">MyEventHandler</span> NewLineRead<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ImportData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 事件参数</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 触发事件</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>NewLineRead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token function">NewLineRead</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//...</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
<span class="token comment">// 以下为Client代码</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CallMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 声明Class变量，不需要WithEvents</span>
    <span class="token keyword">private</span> <span class="token class-name">DataImports</span> _da <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 指定事件处理程序</span>
    _da<span class="token punctuation">.</span>NewLineRead <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>DA_EnterNewLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用Class方法，途中会触发事件</span>
    _da<span class="token punctuation">.</span><span class="token function">ImportData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 事件处理程序</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DA_EnterNewLine</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> lineNumber<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>关于作者:</p><p>罗会涛是GrapeCity公司的技术总监。曾与他人合作著有<code>《精通MS SQL Server 7.0》</code>和<code>《会计电算化实用技术》</code>等书，在《计算机世界报》发表文章数篇。并曾在两届微软DevDays技术大会上授课。</p>`,8),o=[t];function c(l,k){return s(),a("div",null,o)}const i=n(e,[["render",c],["__file","cspme4.html.vue"]]);export{i as default};
