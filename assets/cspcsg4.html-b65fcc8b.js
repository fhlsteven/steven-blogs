import{_ as p,r as t,o as e,c as o,b as n,d as s,e as c,a as l}from"./app-8e5157a8.js";const u={},k={id:"c-编码标准-命名约定和风格",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#c-编码标准-命名约定和风格","aria-hidden":"true"},"#",-1),r={href:"http://blog.csdn.net/cuike519/archive/2004/03/08/19334.aspx",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>1．使用Pascal的命名规范命名类型和方法的名字。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2． 使用camel命名规范命名局部变量和方法的参数。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> number<span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> someNumber<span class="token punctuation">)</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>3． 在命名接口的时候使用I作为前缀。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">interface</span> <span class="token class-name">IMyInterface</span>
<span class="token punctuation">{</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
</code></pre></div><p>4． 私有成员变量使用m_作为前缀。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_Number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>5． 自定义的属性类使用Attribute作为其后缀。</p><p>6． 自定义的异常类使用Exception作为其后缀。</p><p>7． 在命名方法的时候使用动宾结构的短语，比如：ShowDialog()。</p><p>8． 有返回值的方法应该有一个可以描述其返回值的名字，比如：GetObjectState()。</p><p>9． 使用有意义的变量名称。</p><p>10． 使用C#的预定义的类型而不使用System命名空间中其别名来申明变量。</p><p>使用object 而不是 Object<br> 使用string 而不是 String<br> 使用 int 而不是 Int32</p><p>11． 通常情况下，类型使用大写字母。当处理.NET的类型的时候使用Type作为其后缀。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//正确的是：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LinkedList<span class="token punctuation">&lt;</span>K<span class="token punctuation">,</span>T<span class="token punctuation">&gt;</span></span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
<span class="token comment">//避免使用：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LinkedList<span class="token punctuation">&lt;</span>KeyType<span class="token punctuation">,</span>DataType<span class="token punctuation">&gt;</span></span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
</code></pre></div><p>12． 使用有意义的命名空间，比如使用公司的名称以及产品的名称。</p><p>13． 避免使用完全限定名。而使用using语句替换之。</p><p>14． 避免将using语句写在命名空间的内部。</p><p>15． 将所有的框架定义的命名空间为一组，自定义的和第三方的命名空间放在另一组。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> MyCompany<span class="token punctuation">.</span>
<span class="token keyword">using</span> <span class="token namespace">MyControls</span><span class="token punctuation">;</span>
</code></pre></div><p>16． 使用委托的引用替换显式的委托实例。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeDelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
<span class="token class-name">SomeDelegate</span> someDelegate <span class="token operator">=</span> SomeMethod<span class="token punctuation">;</span>
</code></pre></div><p>17． 保持严格的缩进风格。</p><p>a. 使用3个空格缩进<br> b. 不要使用tabs或者其他不标准的缩进，比如1、2、4个空格。</p><p>18． 在编写注释的时候注释的缩进和编码的缩进必须是相同级别的。</p><p>19． 所有的注释都要通过拼写检查，错误的拼写是粗糙的开发。（针对汉语则要语句通顺易于理解）</p><p>20． 所有的成员变量都应该声明在顶部，同时使用一个空行来将他们和属性以及方法分开。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> m_Number<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> m_Name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeMethod2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>21． 尽可能在第一次使用局部变量的时候申明它。</p><p>22． 文件名称应该可以反映出它所包含的类。</p><p>23． 当使用不完整的类并且将部分分配到每个文件中，用P+序数作为后缀命名文件。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// in myClassP1.cs</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
<span class="token comment">// in myClassP2.cs</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">MyClass</span>
<span class="token punctuation">{</span>…<span class="token punctuation">}</span>
</code></pre></div><p>24． 总是将大括号放在一个新行上。</p><p>25． 匿名方法和一般（正规）的方法代码使用相似的代码布局</p><p>a. 规定：大括号（方法体的括号）必须使用新行</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeDelegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> someString<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 正确的是：</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">SomeDelegate</span> someDelegate <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">someDelegate</span><span class="token punctuation">(</span>“Juval”<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 避免使用：</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InvokeMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">SomeDelegate</span> someDelegate <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span><span class="token punctuation">{</span> MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">someDelegate</span><span class="token punctuation">(</span>“Juval”<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>26． 在匿名无参方法中要使用空的括号。</p><p>a. 如果匿名方法有可能被使用在任何委托中那么可以省略括号。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SomeDelegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 正确的方法是：</span>
<span class="token class-name">SomeDelegate</span> someDelegate1 <span class="token operator">=</span> <span class="token keyword">delegate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>“Hello”<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 避免使用：</span>
<span class="token class-name">SomeDelegate</span> someDelegate1 <span class="token operator">=</span> <span class="token keyword">delegate</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>“Hello”<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,41);function m(g,y){const a=t("ExternalLinkIcon");return e(),o("div",null,[n("h1",k,[i,s(),n("a",r,[s("C#编码标准－－命名约定和风格"),c(a)])]),d])}const h=p(u,[["render",m],["__file","cspcsg4.html.vue"]]);export{h as default};
