import{_ as p,r as e,o as t,c as o,b as n,d as s,e as c,a as l}from"./app-f0851ed3.js";const r={},k={id:"net建议使用的大小写命名原则",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#net建议使用的大小写命名原则","aria-hidden":"true"},"#",-1),i={href:"https://www.cnblogs.com/windsails/archive/2004/09/13/42547.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>posted on 2004-09-13 11:41 风前絮~~ 阅读(4342) 评论(5)</p><p>在托管类库中要保证可预见性和可发现性的其中一个重要因素就是使用一致的命名原则。的确，在团队中如果可以使用一致的命名原则可以避免许多常见的问题。</p><p>例如大小写原则，如果以前是使用VC的就会发现，.NET提供的例子和我们习惯看到的大小写原则不同的。在VC中喜欢用匈牙利命名方式，即用一个小写的前缀来说明变量的类型或者使用目的，如m_nSize等，这种原则在以前用VC来编写ATL时候还觉得十分好的，因为这里的变量包含了变量类型，确实也可以避免了好些问题。</p><p>但到了.NET中呢，.NET框架建议使用的是另外两种大小写风格，而匈牙利方式被建议不要使用了，不知道是否因为数据类型在这里的处理已经由框架来代为处理的缘故？</p><p>Pascal大小写方式：学过Pascal的应该不陌生了。每个单词的第一个字母都大写。如FontColor。<br> Camel大小写方式：除第一个字母外，其它都将第一个字母大写。如fontColor。</p><p>而不同的地方也建议统一使用不同的命名规则：</p><ol><li>所有的标识符（类型名称或者成员名称）用Pascal方式；</li><li>参数和本地变量应该使用Camel方式；</li></ol><hr><p>1楼 2004-09-13 15:15 | fans1</p><blockquote><p>我喜欢类的private变量用 myVarName 或者m_VarName(固定前缀m_，不因为变量类型变化而变，实际是my的意思)来表示，局部变量用最简短的单词全小写，而Attribute和函数名则喜欢Pascal方式</p></blockquote><p>2楼 2004-09-13 17:04 | xport</p><blockquote><p>1.所有的标识符（类型名称或者成员名称）用Pascal方式；<br> 這個有問題, 因為C#中有Properties, 通常我採用:<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>成員名稱<span class="token punctuation">:</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _UserName<span class="token punctuation">;</span>

Property<span class="token punctuation">:</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> UserName
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_UserName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>3楼 2004-09-13 17:35 | 风前絮~~</p><blockquote><p>To xport,<br> 对于属性对应的private，可以用myXXX的方式啊...<br> 不过这些都是见仁见智的啦，关键自己用得方便，人家看得明白...<br> 这里是MSDN中的微软用属性时的命名规则例子：private使用Camel<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> myName <span class="token operator">=</span><span class="token string">&quot;N/A&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> myAge <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// Declare a Name property of type string:</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> 
        <span class="token punctuation">{</span>
           <span class="token keyword">return</span> myName<span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> 
        <span class="token punctuation">{</span>
           myName <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Declare an Age property of type int:</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Age
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> 
        <span class="token punctuation">{</span> 
           <span class="token keyword">return</span> myAge<span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> 
        <span class="token punctuation">{</span> 
           myAge <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>4楼 2004-09-13 21:42 | juqiang</p><blockquote><p>M$之所以放弃匈牙利命名法，似乎是因为M$以前搞的变量类型太多了。放弃这个命名方法，只是一个放弃以前混乱类型的由头。<br> 其实上面的property，我们更习惯于这么写了：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token function">MyClass</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name<span class="token punctuation">{</span>
    <span class="token keyword">get</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>details，%program files%下面的.net framework有一个非常详细地word文档，大家可以参考。</p></blockquote><p>5楼 2004-09-14 13:43 | 灵感之源</p><blockquote><p>我仍然喜欢匈牙利l;)</p></blockquote>`,22);function m(y,w){const a=e("ExternalLinkIcon");return t(),o("div",null,[n("h1",k,[u,s(),n("a",i,[s(".NET建议使用的大小写命名原则"),c(a)])]),d])}const b=p(r,[["render",m],["__file","cspcsg1.html.vue"]]);export{b as default};
