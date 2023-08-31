import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},o=t(`<h1 id="net反射技术应用解决对象不同版本方法不同参数的问题" tabindex="-1"><a class="header-anchor" href="#net反射技术应用解决对象不同版本方法不同参数的问题" aria-hidden="true">#</a> .Net反射技术应用解决对象不同版本方法不同参数的问题</h1><p>zlyperson（原作）</p><p>在调用Office的时候，我们发现Office2003与Office2000的一个方法参数个数不同，这样导致我们不能够使用正常手段调用该方法，采用反射技术可以轻松解决问题。以下是我写的应用反射技术调用对象方法之简单原型。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Invoker</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Type</span> myType <span class="token operator">=</span> System<span class="token punctuation">.</span>Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token string">&quot;Demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//取得系统类型</span>
        <span class="token class-name"><span class="token keyword">object</span></span> obj <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">GetAssembly</span><span class="token punctuation">(</span>myType<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span><span class="token string">&quot;Demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//创建实例</span>
        <span class="token class-name">MethodInfo</span> method <span class="token operator">=</span> myType<span class="token punctuation">.</span><span class="token function">GetMethod</span><span class="token punctuation">(</span><span class="token string">&quot;PrintLine&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//提取方法信息</span>
        method<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;Rookie&quot;</span><span class="token punctuation">,</span> <span class="token number">27</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//调用方法</span>

        method <span class="token operator">=</span> myType<span class="token punctuation">.</span><span class="token function">GetMethod</span><span class="token punctuation">(</span><span class="token string">&quot;PrintLine2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//提取另外一个方法，实际应用中是根据不同版本取得同一个方法，而构造不同参数数组</span>
        method<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;Rookie&quot;</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token string">&quot;Rookie personal information.&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//调用方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//实际应用中老版本的方法</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PrintLine</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> age<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Name = &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;; Age = &quot;</span> <span class="token operator">+</span> age<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//实际应用中升级版本的方法（名称相同，只是参数个数不同）</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PrintLine2</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> age<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> description<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        System<span class="token punctuation">.</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Name = &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;; Age = &quot;</span> <span class="token operator">+</span> age<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;; Description = &quot;</span> <span class="token operator">+</span> description<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>关于该文章讨论请到http://202.102.53.36/user3/rookieport/main.asp?id=1377826</p>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netfw4.html.vue"]]);export{i as default};