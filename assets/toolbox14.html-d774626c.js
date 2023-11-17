import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="装载外部dll全攻略" tabindex="-1"><a class="header-anchor" href="#装载外部dll全攻略" aria-hidden="true">#</a> 装载外部DLL全攻略</h1><blockquote><p>ArLi2003（原作） 关键字 装载外部DLL,Assembly,Type,反射,装配件</p></blockquote><p>例DLL 文件内容如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShowAboutBox</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowOn</span><span class="token punctuation">(</span><span class="token class-name">Form</span> fm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;OK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译后文件名叫 AboutBox.dll</p><p>主程序里调用方法如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//定义文件名</span>
<span class="token class-name">FileInfo</span> aBoxFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span>Application<span class="token punctuation">.</span>StartupPath<span class="token punctuation">,</span> <span class="token string">&quot;AboutBox.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>aBoxFile<span class="token punctuation">.</span>Exists<span class="token punctuation">)</span>
<span class="token punctuation">{</span> <span class="token comment">//如果存在</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span> <span class="token comment">//预防意外，比如不载不完整，非法DLL</span>
      <span class="token comment">// 开始载入</span>
        <span class="token class-name">Assembly</span> aBox <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">LoadFrom</span><span class="token punctuation">(</span>aBoxFile<span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Type<span class="token punctuation">[</span><span class="token punctuation">]</span></span> _t <span class="token operator">=</span> aBox<span class="token punctuation">.</span><span class="token function">GetTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获得全部Type</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Type</span> t <span class="token keyword">in</span> _t<span class="token punctuation">)</span>
        <span class="token punctuation">{</span> <span class="token comment">//遍历</span>
          <span class="token comment">//如果发现名称空间和类名有相符的</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>Namespace <span class="token operator">==</span> <span class="token string">&quot;ArLi.CommonPrj&quot;</span> <span class="token operator">&amp;&amp;</span> t<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;ShowAboutBox&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//载入方法</span>
                <span class="token class-name">MethodInfo</span> m <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">GetMethod</span><span class="token punctuation">(</span><span class="token string">&quot;ShowOn&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span> <span class="token comment">//如果要载入的方法存在</span>
                  <span class="token comment">//创建实例</span>
                    <span class="token class-name"><span class="token keyword">object</span></span> o <span class="token operator">=</span> Activator<span class="token punctuation">.</span><span class="token function">CreateInstance</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//执行该方法，后面的this 是参数</span>
                    m<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token keyword">this</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span> <span class="token comment">//载入的方法不存在</span>
                    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;File \\&quot;AboutBox.dll\\&quot; Invalid!\\n\\nMethod Error.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;File \\&quot;AboutBox.dll\\&quot; Invalid!\\n\\nAssembly Name Error.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token comment">//文件、命名空间、方法都相符，但执行该DLL 内容出错</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>NullReferenceException</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;File \\&quot;AboutBox.dll\\&quot; Invalid!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token comment">//文件非正常DLL</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;File \\&quot;AboutBox.dll\\&quot; Error: \\n\\n&quot;</span> <span class="token operator">+</span> ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span> <span class="token comment">//文件没找到</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;File \\&quot;AboutBox.dll\\&quot; Missing!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明1：如果直接用 <code>type t = gettype(&quot;arli.comm...&quot;)</code> 这样也可以但如果此 <code>class</code> 不存在就会出Exception<br> 说明2：这种逆向反射动态载入无需定义装配件信息<br> 说明3：此方法已经最大程度的进行了潜在的检测，除非非合法的WinDLL（比如下载的不完整），否则不会进入到很慢的 try catch</p>`,8),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","toolbox14.html.vue"]]);export{i as default};
