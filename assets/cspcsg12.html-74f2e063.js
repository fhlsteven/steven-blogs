import{_ as e,r as t,o as p,c as o,b as n,d as s,e as c,a as l}from"./app-382facc7.js";const i={},u=n("h1",{id:"idesign-c-编程规范",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#idesign-c-编程规范","aria-hidden":"true"},"#"),s(" IDesign C#编程规范")],-1),r={href:"http://www.only4gurus.com/v2/download.asp?id=5149",target:"_blank",rel:"noopener noreferrer"},k=l(`<p>目录内容如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>1  命名规则和风格 naming conventions and style
2  编码惯例 coding practices
3  项目设置和结构 project settings and structure
4  framework特别指导 framework specific guidelines
4.1  数据访问 data access
4.2  asp.net和web service asp.net and web services
4.3  序列化 serialization
4.4  多线程 multithreading
4.5  remoting remoting
4.6  安全 security
4.7  服务组件 enterprise services
5  资源 resources
</code></pre></div><p>今天只翻译了命名规则部分，译文及原文对照如下，其中的tip是附加的，😃</p><h2 id="命名规则和风格-naming-conventions-and-style" tabindex="-1"><a class="header-anchor" href="#命名规则和风格-naming-conventions-and-style" aria-hidden="true">#</a> 命名规则和风格(naming conventions and style)</h2><ol><li><p>类和方法名采用pascal风格<br> use pascal casing for type and method names</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">someclass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">somemethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>局部变量和方法参数采用camel风格<br> use camel casing for local variable names and method arguments</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> number<span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">mymethod</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> somenumber<span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div></li><li><p>接口名采用i作为前缀<br> prefix interface name with i</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">imyinterface</span>
<span class="token punctuation">{</span><span class="token range operator">..</span><span class="token punctuation">}</span>
</code></pre></div></li><li><p>私有成员变量采用<code>m_</code>作为前缀<br> prefix private member variables with m_</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">someclass</span>
<span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>自定义属性类名采用attribute作为后缀<br> suffix custom attribute classes with attribute.</p></li><li><p>自定义异常类名采用exception作为后缀<br> suffix custom exception classes with exception.</p></li><li><p>采用动词-对象对命名方法，例如<code>showdialog()</code><br> name methods using verb-object pair, such as <code>showdialog()</code></p></li><li><p>有返回值的方法应该取名表示其返回值，例如<code>getobjectstate()</code><br> methods with return values should have a name describing the value returned, such as <code>getobjectstate()</code>.</p></li><li><p>采用描述性的变量名。<br> use descriptive variable names.<br> a) 避免采用单字母的变量名，如i或t；而是采用index或temp。<br> avoid single character variable names, such as i or t. use index or temp instead. <br> b) 对public和protected成员避免采用用匈牙利命名法。<br> avoid using hungarian notation for public or protected members. <br> c) 不要采用缩写（例如将number缩写为num）。<br> do not abbreviate words (such as num instead of number).<br></p></li><li><p>总是使用c#预定义的类型，而不是使用system命名空间中的别名。例如：采用object不用object，采用string不用string,采用int不用int32。<br> always use c# predefined types rather than the aliases in the system namespace. for example:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">object</span> <span class="token keyword">not</span> <span class="token keyword">object</span>
<span class="token keyword">string</span> <span class="token keyword">not</span> <span class="token keyword">string</span>
<span class="token keyword">int</span>    <span class="token keyword">not</span> int32
</code></pre></div></li><li><p>对于泛型，类型采用大写字母。当处理.net类型type时保留后缀type。<br> with generics, use capital letters for types. reserve suffixing type when dealing with the .net type type.<br></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 正确：</span>
<span class="token comment">//correct:</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">linkedlist</span>
<span class="token comment">// 避免使用：</span>
<span class="token comment">//avoid:  </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">linkedlist</span>  
</code></pre></div></li><li><p>采用有意义的命名空间名，例如产品名称或公司名称。<br> use meaningful namespaces such as the product name or the company name.</p></li><li><p>避免使用类的全称，而是采用using语句。<br> avoid fully qualified type names. use the using statement instead.</p></li><li><p>避免在命名空间内使用using语句。<br> avoid putting a using statement inside a namespace.</p></li><li><p>将所有framework命名空间名放在一起，后面放自定义或第三方的命名空间名。<br> group all framework namespaces together and put custom or third party namespaces underneath.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">system</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">system<span class="token punctuation">.</span>collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">system<span class="token punctuation">.</span>componentmodel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">system<span class="token punctuation">.</span>data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">mycompany</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">mycontrols</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>采用委托推断，不要显式实例化委托。<br> use delegate inference instead of explicit delegate instantiation</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somedelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somemethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">somedelegate</span> somedelegate <span class="token operator">=</span> somemethod<span class="token punctuation">;</span> 
</code></pre></div></li><li><p>严格遵守缩进格式。<br> maintain strict indentation.<br> a) 缩进采用3个空格。<br> use 3 spaces for indentation.<br> b) 不用采用tab或非标准的缩进，如1、2或4个空格。<br> do not use tabs or non-standard indentation like 1, 2 or 4 spaces.</p></li><li><p>注释缩进和其注释的代码在同一层次。<br> indent comment at the same level of indentation as the code you are documenting.</p></li><li><p>所有注释要经过拼写检查。拼写错误的注释表明开发的草率。<br> all comments should pass spell checking. misspelled comments indicate sloppy development.</p></li><li><p>所有成员变量应该定义在前面，和属性或方法间空开一行。<br> all member variables should be declared at the top, with one line separating them from the properties or methods.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">myclass</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> m_number<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> m_name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somemethod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somemethod2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>局部变量的定义尽可能靠近它的初次使用。<br> declare a local variable as close as possible to its first use.</p></li><li><p>文件名应该体现其包含的类。<br> a file name should reflect the class it contains.</p></li><li><p>当使用partial类型且每部分分配一个文件时，以类型名加p和序数命名每个文件。<br> when using partial types and allocating a part per file, name each file after the type suffixed with a p and an ordinal number:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//in myclassp1.cs</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">myclass</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">//in myclassp2.cs</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">myclass</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div></li><li><p>左大括号总是放在新行中。<br> always place an open curly brace (<code>{</code>) in a new line.</p></li><li><p>匿名方法模仿普通方法的布局，和匿名委托定义放在一行。<br> with anonymous methods mimic the code layout of a regular method, aligned with the anonymous delegate declaration.<br> a) 遵守将左大括号放在新行的规则。<br> comply with placing an open curly brace in a new line</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somedelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> somestring<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//正确</span>
<span class="token comment">//correct: </span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">invokemethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">somedelegate</span> somedelegate <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
                                <span class="token punctuation">{</span>
                                    messagebox<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">somedelegate</span><span class="token punctuation">(</span><span class="token string">&quot;juval&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//避免采用：</span>
<span class="token comment">//avoid</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">invokemethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">somedelegate</span> somedelegate <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>messagebox<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">somedelegate</span><span class="token punctuation">(</span><span class="token string">&quot;juval&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>没有参数的匿名方法使用空括号。<br> use empty parenthesis on parameter-less anonymous methods<br> a) 仅当匿名方法可能被用于任何委托时省略括号。<br> omit the parenthesis only if the anonymous method could have been used on any delegate.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">somedelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//correct</span>
<span class="token class-name">somedelegate</span> somedelegate1 <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">{</span> 
                                messagebox<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//avoid</span>
<span class="token class-name">somedelegate</span> somedelegate1 <span class="token operator">=</span> <span class="token keyword">delegate</span>
                            <span class="token punctuation">{</span>
                                messagebox<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div></li></ol>`,5);function d(m,g){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("idesign发布了c#编程规范，小鸡射手从"),n("a",r,[s("only4gurus"),c(a)]),s("下载浏览后决心抽时间翻译一下，以更好地学习。")]),k])}const y=e(i,[["render",d],["__file","cspcsg12.html.vue"]]);export{y as default};
