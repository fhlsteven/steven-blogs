import{_ as p,r as o,o as e,c,b as n,d as s,e as t,a as l}from"./app-d9da1b6d.js";const u="/steven-blogs/assets/43_b_1-4485ebe3.png",k="/steven-blogs/assets/43_b_2-c54c74a0.png",i="/steven-blogs/assets/43_b_3-737c1ad6.png",r="/steven-blogs/assets/43_b_4-15e8ae87.png",d="/steven-blogs/assets/43_b_5-a052e4a0.png",m={},g={id:"c-实现动态灵活调用业务方法的机制",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#c-实现动态灵活调用业务方法的机制","aria-hidden":"true"},"#",-1),y={href:"https://www.cnblogs.com/windsails/archive/2004/09/07/40574.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.cnblogs.com/windsails/",target:"_blank",rel:"noopener noreferrer"},b=l(`<h2 id="问题的提出" tabindex="-1"><a class="header-anchor" href="#问题的提出" aria-hidden="true">#</a> 问题的提出</h2><p>在某些应用中往往会遇到这样的情况，例如最近遇到一个应用大致需要做这样的事情：</p><ol><li>有几个比较类似的业务，但是每个的处理方法和输出不同；</li><li>需要动态的处理这些业务，例如某个时间可能需要处理甲业务，某个时间需要处理乙业务；</li><li>需要处理的业务数量不确定，随时可能有增减情况；</li><li>希望主体程序比较固定；</li></ol><h2 id="问题的分析" tabindex="-1"><a class="header-anchor" href="#问题的分析" aria-hidden="true">#</a> 问题的分析</h2><p>我的想法是将这些业务规范为一些类库，固定好规范的接口。然后将这些Dll统一放在某个目录下面，目录中的Dll可以采取简单的XCopy方式来增删，并且需要保证主体程序不会长时间占用某个Dll资源，调用完就释放。</p><h2 id="解决方法实验" tabindex="-1"><a class="header-anchor" href="#解决方法实验" aria-hidden="true">#</a> 解决方法实验</h2><p>先将主要技术关键点抽取出来，关键就是建立一个可以动态调用某个目录下面的Dll中的某个方法的机制，因此先做一些简单的测试，将这个机制的建立弄清晰。</p><p>下面是这个简单的机制：</p><p>先建立了三个简单的类库，<code>ADll</code>，<code>BDll</code>，<code>CDll</code>。主体调用程序是<code>testReadDll</code>，它需要调用相对目录Dlls下面的全部Dll中的<code>makeStr</code>，没有输出错误信息继续执行下一个Dll。其中ADll和BDll都有类似的接口(这里并没有将接口抽象出来)，但<code>CDll</code>为了测试，并没有实现类似的接口。</p><p>假设ADll和BDll实现了方法makeStr，CDll没有实现这个方法。</p><p>由于.NET的强大的反射机制，实现这些功能并不困难。</p><p>主体程序中调用Dll指定方法的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnInvoke_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    lstValue<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">DirectoryInfo</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectoryInfo</span><span class="token punctuation">(</span><span class="token string">&quot;Dlls&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 目录和当前EXE在同一个目录下</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">FileInfo</span> file <span class="token keyword">in</span> d<span class="token punctuation">.</span><span class="token function">GetFiles</span><span class="token punctuation">(</span><span class="token string">&quot;*.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> pathName <span class="token operator">=</span> d<span class="token punctuation">.</span>FullName <span class="token operator">+</span> &quot;\\&quot; <span class="token operator">+</span> file<span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
        <span class="token comment">// 根据文件名获取程序集信息</span>
        <span class="token class-name">Assembly</span> assembly <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">LoadFrom</span><span class="token punctuation">(</span>pathName<span class="token punctuation">)</span><span class="token punctuation">;</span>                
        lstValue<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>assembly<span class="token punctuation">.</span>FullName <span class="token operator">+</span> <span class="token string">&quot;的调用结果：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> 
        <span class="token punctuation">{</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Type</span> t <span class="token keyword">in</span> assembly<span class="token punctuation">.</span><span class="token function">GetTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">Object</span> obj <span class="token operator">=</span> t<span class="token punctuation">.</span><span class="token function">InvokeMember</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span>
                    BindingFlags<span class="token punctuation">.</span>Public <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Instance <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>CreateInstance<span class="token punctuation">,</span>
                    <span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>t<span class="token punctuation">.</span><span class="token function">InvokeMember</span><span class="token punctuation">(</span><span class="token string">&quot;makeStr&quot;</span><span class="token punctuation">,</span>
                    BindingFlags<span class="token punctuation">.</span>Public <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>InvokeMethod <span class="token operator">|</span> BindingFlags<span class="token punctuation">.</span>Instance<span class="token punctuation">,</span>
                    <span class="token keyword">null</span><span class="token punctuation">,</span>obj<span class="token punctuation">,</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                lstValue<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> 
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            lstValue<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>ex<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>ADll相关代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">ADll</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AClass</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">AClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">makeStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> retStr<span class="token punctuation">;</span>
            retStr <span class="token operator">=</span> <span class="token string">&quot;ADll make String&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> retStr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>BDll相关代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">BDll</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BClass</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">BClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">makeStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> retStr<span class="token punctuation">;</span>
            retStr <span class="token operator">=</span> <span class="token string">&quot;BDll make StringModifyAdd..ok2&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> retStr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>CDll相关代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">CDll</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CClass</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">CClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">makeStr2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> retStr<span class="token punctuation">;</span>
            retStr <span class="token operator">=</span> <span class="token string">&quot;cDll make StringModify&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> retStr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="机制测试" tabindex="-1"><a class="header-anchor" href="#机制测试" aria-hidden="true">#</a> 机制测试</h2><ol><li>先将ADll，BDll编译通过放到Dlls下面，运行testReadDll调用makeStr结果如下： <img src="`+u+'" alt="43_b_1"></li><li>不需要退出testReadDll，将ADll删除，运行testReadDll调用makeStr结果如下： <img src="'+k+'" alt="43_b_2"></li><li>不需要退出testReadDll，将ADll和CDll再次放入Dlls，运行testReadDll调用makeStr结果如下： <img src="'+i+'" alt="43_b_3"></li><li>那么如果ADll和BDll增加一个副本又如何呢？<br> 不需要退出testReadDll，为ADll和BDll增加一个副本在Dlls如下图： <img src="'+r+'" alt="43_b_4"><br> 运行testReadDll调用makeStr结果如下： <img src="'+d+'" alt="43_b_5"></li></ol><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>由此可以看出，这样的机制是十分灵活的，只要将业务相关的Dll放入这个目录下面就可以了。<br> 另外，对于副本的调用结果是一样的，当然这些可以在程序中再做一些限制，避免重复调用。<br> 调用的顺序和时间规则也可以在程序中做定义或者用一个配置文件来限制。</p>',23),w={href:"https://files.cnblogs.com/windsails/testDll.rar",target:"_blank",rel:"noopener noreferrer"},D=n("hr",null,null,-1),f=n("p",null,"1楼",-1),S=n("br",null,null,-1),v={href:"https://www.cnblogs.com/workjie/",target:"_blank",rel:"noopener noreferrer"};function C(B,x){const a=o("ExternalLinkIcon");return e(),c("div",null,[n("h1",g,[h,s(),n("a",y,[s("C#实现动态灵活调用业务方法的机制"),t(a)])]),n("p",null,[s("posted on 2004-09-07 10:15 "),n("a",_,[s("风前絮~~"),t(a)]),s(" 阅读(1895) 评论(1)")]),b,n("p",null,[n("a",w,[s("这里"),t(a)]),s("下载相关代码。")]),D,f,n("blockquote",null,[n("p",null,[s("如果实际遇到这种情况，应该采用接口，而不是反射！呵呵"),S,s(" 2005-10-17 15:59 | "),n("a",v,[s("workjie"),t(a)])])])])}const q=p(m,[["render",C],["__file","cspbase43.html.vue"]]);export{q as default};
