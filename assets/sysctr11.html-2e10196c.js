import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="在-net中读写ini文件-——兼谈正则表达式的应用" tabindex="-1"><a class="header-anchor" href="#在-net中读写ini文件-——兼谈正则表达式的应用" aria-hidden="true">#</a> 在.NET中读写INI文件 ——兼谈正则表达式的应用</h1><blockquote><p>sam1111（原作） 关键字:正则表达式</p></blockquote><p>INI文件是Windows平台上的一种较常用的软件配置文件格式，Windows应用程序常常使用它来保存一些配置信息。它一般是由数个包含key-value对的Section组成，每个key-value对保存着一些软件配置信息。例如最典型的NT系列的启动配置文件boot.ini：</p><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>[boot loader]
timeout=30
default=multi(0)disk(0)rdisk(0)partition(2)\\WINDOWS
[operating systems]
multi(0)disk(0)rdisk(0)partition(2)\\WINDOWS=&quot;Microsoft Windows XP Professional&quot; /fastdetect
multi(0)disk(0)rdisk(0)partition(1)\\WINDOWS=&quot;Microsoft Windows XP Professional&quot; /fastdetect
</code></pre></div><hr><p>在这个文件中，方括号中的字符串是Section的名字，两个方括号之间的内容为一个Section。Section的内容是一些key-value对，每个key-value对占据一行，例如timeout=30就是一对key-value对，timeout是key，对应的value是30。Windows平台专门提供了一组API可以方便地操作INI文件，例如GetPrivateProfileSection()、GetPrivateProfileInt()等。</p><p>随着Windows系列操作系统的不断发展，INI文件的作用逐渐被注册表、XML格式的config文件等所取代，很少再用于系统配置，但我们仍可以在应用程序中使用它。在.NET平台上推荐使用的软件配置文件格式是基于XML的config文件，因此在.NET Framework中并没有提供对INI文件读写的特殊支持，使得我们有时在需要读写INI文件时不是很方便。本文将探讨如何使INI文件的读写在.NET平台上变得更加容易。当然，我们可以直接引入上述的API，但本文将不使用API，而是完全基于.NET Framework。</p><h2 id="创建ini文件读写类" tabindex="-1"><a class="header-anchor" href="#创建ini文件读写类" aria-hidden="true">#</a> 创建INI文件读写类</h2><p>要在.NET平台上处理INI文件，很自然的想法就是创建一个专门的class来负责INI文件的读写工作，这个class暴露适当的接口供外部调用。一般的INI文件的尺寸很小，因此最简单的做法就是以文本的方式将整个文件读入一个string变量中。类定义如下：</p><hr><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileIni</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> fileContents <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">FileIni</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">StreamReader</span> r <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            fileContents <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">ReadToEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            r<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>接下来我们要提供一些方法来操作这个字符串，比如从中返回所有的Section Name、取得特定的key所对应的value等。我们可以使用字符串查找之类的方法来完成这些工作，但是.NET Framework为我们提供了更好的方法，那就是正则表达式。</p><h2 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h2><p>所谓正则表达式是一种被设计用来优化字符串操作的语言。它使用一组元字符（Metacharacters）来实现强劲的字符串操作能力。这组元字符最早来自于对DOS文件系统中?和<em>的扩展。在DOS文件系统中，?和</em>分别被用来代替单个字符和字符群组，它们可以被认为是最早的元字符。正则表达式在它们的基础上不断扩充，形成了一套元字符集，能够表达非常复杂的字符串。</p><p>举例来说，网上注册时常常需要用户输入一个有效的Email地址。当用户输入一个字符串后，我们如何验证这个Email地址是否合法呢？使用下面这个正则表达式可以轻易地实现目的：</p><hr><p><code>@&quot;^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$&quot;</code></p><hr><p>关于这个正则比表达式的含义，在此不做过多解释，有兴趣的朋友可以参考相关的正则表达式资料。这个正则表达式虽不能保证用户输入的Email地址100%的真实有效，但至少可以保证用户输入的Email地址看上去是合法有效的。</p><p>.NET Framework中提供了一些使用正则表达式的类，这些类位于System.Text.RegularExpressions名字空间下。</p><h2 id="使用正则表达式实现fileini类的功能" tabindex="-1"><a class="header-anchor" href="#使用正则表达式实现fileini类的功能" aria-hidden="true">#</a> 使用正则表达式实现FileIni类的功能</h2><p>现在我们可以使用正则表达式来实现FileIni类的相应功能了。为了返回INI文件中所有Section的名字，我们可以使用一个只读属性SectionNames来返回一个Section Name的字符串数组。</p><hr><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> SectionNames
<span class="token punctuation">{</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Using regular expression to get all section names.</span>
        <span class="token class-name"><span class="token keyword">string</span></span> regexPattern <span class="token operator">=</span> <span class="token string">@&quot;\\[(?&lt;SectionName&gt;\\w*)\\]&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">Regex</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Regex</span><span class="token punctuation">(</span>regexPattern<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Match &quot;[anywords]&quot;</span>
        <span class="token class-name">MatchCollection</span> matches <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">Matches</span><span class="token punctuation">(</span>fileContents<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// Writing all section names to a string array.</span>
        <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> results <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>matches<span class="token punctuation">.</span>Count<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> matches<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            results<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> matches<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token string">&quot;\${SectionName}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> results<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>在上面的代码中，我们使用一个正则表达式：<code>@&quot;\\[(?&lt;SectionName&gt;\\w*)\\]&quot;</code>，对源字符串进行一次匹配就取出了所有的Section Name。</p><p>为了取得特定Section下的特定的key的value，我们先要取得此Section下的所有内容，然后再从中取出特定key的value。</p><hr><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetSectionString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sectionName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> regexPattern <span class="token operator">=</span> <span class="token string">@&quot;(\\[&quot;</span> <span class="token operator">+</span> sectionName <span class="token operator">+</span> <span class="token string">@&quot;\\]&quot;</span>
        <span class="token operator">+</span> <span class="token string">@&quot;(?&lt;SectionString&gt;.*)\\[)&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Regex</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Regex</span><span class="token punctuation">(</span>regexPattern<span class="token punctuation">,</span> RegexOptions<span class="token punctuation">.</span>Singleline<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">IsMatch</span><span class="token punctuation">(</span>fileContents<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> r<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>fileContents<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token string">&quot;\${SectionString}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>GetSectionString()根据特定的sectionName取得此Section的全部内容。假设sectionName为字符串boot loader，此时的正则表达式为<code>@&quot;(\\[boot loader\\](?&lt;SetionString&gt;.*)\\[]&quot;</code>。得到Section下的所有内容后，我们再从其中得到我们想要的value值。</p><hr><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetKeyString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sectionName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> keyName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sectionString <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetSectionString</span><span class="token punctuation">(</span>sectionName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> regexPattern <span class="token operator">=</span> <span class="token string">@&quot;(&quot;</span> <span class="token operator">+</span> keyName <span class="token operator">+</span> <span class="token string">@&quot;=(?&lt;value&gt;.*)\\r\\n)&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Regex</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Regex</span><span class="token punctuation">(</span>regexPattern<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">IsMatch</span><span class="token punctuation">(</span>fileContents<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> r<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>fileContents<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token string">&quot;\${value}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><p>在此基础上，可以得到更多的诸如GetKeyInt()之类的方法。至于写方法，利用Regex的Replace()方法也是很容易实现的，在此就不做过多的叙述了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文着重演示了正则表达式在读写INI文件时的应用。所实现的INI文件读写类FileIni扩展性稍显不足，例如，这个类只能处理通用格式的INI文件，对于格式稍有变化的INI文件，此类中的正则表达式就需要修改了。总之，正则表达式是处理字符串的强大工具，掌握了它</p><p>对我们更高效地处理字符串是绝对有好处的。</p><hr><hr><p><strong>对该文的评论</strong> 人气：3040</p><p>sam1111 (2003-9-20 22:00:29)</p><blockquote><p>上面的正则表达式是经过测试的。但是，由于我是直接写来处理一种固定格式的INI文件，因此通用性不是很强。可能需要根据你的INI文件的格式做适当的修改。</p></blockquote><p>boy9732 (2003-9-18 17:50:39)</p><blockquote><p>正则表达式好东东..一定得学会</p></blockquote><p>diaopeng (2003-9-18 11:48:49)</p><blockquote><p>这上面写的正则表达式有没有测试过的？？？为什么我用了没有结果的？？？谁能解释一下？？？</p></blockquote><p>Zane (2003-9-17 11:04:41)</p><blockquote><p>^_^，终于知道 正则表达式 的妙用，谢谢！</p></blockquote>`,51),e=[o];function c(l,u){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","sysctr11.html.vue"]]);export{k as default};