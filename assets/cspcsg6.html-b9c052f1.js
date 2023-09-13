import{_ as a,r as s,o as t,c as o,b as n,d as p,e as i,a as l}from"./app-477de5b2.js";const c={},r=l(`<h1 id="c-编码规范和编程好习惯" tabindex="-1"><a class="header-anchor" href="#c-编码规范和编程好习惯" aria-hidden="true">#</a> C# 编码规范和编程好习惯</h1><p>撰文：DotNetSpider.com（http://www.dotnetspider.com） 翻译：杨贺宏</p><p>谁都会写代码！几个月的编程经验可以让你写出“可运行应用程序”。让它可运行容易，但是以最有效率的方式编码就需要下更多的功夫！</p><p>要知道，大多数程序员在写”可运行代码，“而不是”高效代码“。我们在这个指南课程前面提到，你想成为你们公司”最尊贵的专业人员“吗？写”高效代码“是一项艺术，你必须学习和实践它。</p><h2 id="命名惯例和规范" tabindex="-1"><a class="header-anchor" href="#命名惯例和规范" aria-hidden="true">#</a> 命名惯例和规范</h2><p>注记:<br> Pascal 大小写形式－所有单词第一个字母大写，其他字母小写。<br> Camel 大小写形式－除了第一个单词，所有单词第一个字母大写，其他字母小写。</p><ul><li><p>类名使用Pascal 大小写形式</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>方法使用Pascal 大小写形式</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>变量和方法参数使用Camel 大小写形式</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> totalCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SayHello</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> fullMessage <span class="token operator">=</span> <span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
        <span class="token range operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>不要使用匈牙利方法来命名变量</p><p>以前，多数程序员喜欢它－把数据类型作为变量名的前缀而m_作为成员变量的前缀。例如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> m_sName<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> nAge<span class="token punctuation">;</span>
</code></pre></div><p>然而，这种方式在.NET编码规范中是不推荐的。所有变量都用camel 大小写形式，而不是用数据类型和m_来作前缀。</p></li><li><p>用有意义的，描述性的词语来命名变量</p><p>- 别用缩写。用name, address, salary等代替 nam, addr, sal<br> - 别使用单个字母的变量象i, n, x 等. 使用 index, temp等</p><p>用于循环迭代的变量例外：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果变量只用于迭代计数，没有在循环的其他地方出现，许多人还是喜欢用单个字母的变量(i) ，而不是另外取名。<br> - 变量名中不使用下划线 (_) 。<br> - 命名空间需按照标准的模式命名</p><p>...</p></li><li><p>文件名要和类名匹配</p><p>例如，对于类HelloWorld, 相应的文件名应为 helloworld.cs (或, helloworld.vb)</p></li></ul><h2 id="缩进和间隔" tabindex="-1"><a class="header-anchor" href="#缩进和间隔" aria-hidden="true">#</a> 缩进和间隔</h2><ul><li><p>缩进用 TAB . 不用 SPACES。</p></li><li><p>注释需和代码对齐。</p></li><li><p>花括弧 ( <code>{}</code> ) 需和括号外的代码对齐。</p></li><li><p>用一个空行来分开代码的逻辑分组。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">bool</span></span> SayHello <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name"><span class="token keyword">string</span></span> fullMessage <span class="token operator">=</span> <span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
  <span class="token class-name">DateTime</span> currentTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
  <span class="token class-name"><span class="token keyword">string</span></span> message <span class="token operator">=</span> fullMessage <span class="token operator">+</span> <span class="token string">&quot;, the time is : &quot;</span> <span class="token operator">+</span> currentTime<span class="token punctuation">.</span><span class="token function">ToShortTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span> message <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// Do something</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这段代码看起来比上面的好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">bool</span></span> SayHello <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name"><span class="token keyword">string</span></span> fullMessage <span class="token operator">=</span> <span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> name<span class="token punctuation">;</span>
  <span class="token class-name">DateTime</span> currentTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>

  <span class="token class-name"><span class="token keyword">string</span></span> message <span class="token operator">=</span> fullMessage <span class="token operator">+</span> <span class="token string">&quot;, the time is : &quot;</span> <span class="token operator">+</span> currentTime<span class="token punctuation">.</span><span class="token function">ToShortTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span> message <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// Do something</span>
    <span class="token comment">// ...</span>

    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>在一个类中，各个方法需用一空行，也只能是一行分开。</p></li><li><p>花括弧需独立一行，而不象if, for 等可以跟括号在同一行。</p><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Do something</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token range operator">..</span><span class="token punctuation">.</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Do something</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>在每个运算符和括号的前后都空一格。</p><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span> <span class="token punctuation">(</span> showResult <span class="token operator">==</span> <span class="token boolean">true</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">//</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>showResult<span class="token operator">==</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">//</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li></ul><h2 id="良好的编程习惯" tabindex="-1"><a class="header-anchor" href="#良好的编程习惯" aria-hidden="true">#</a> 良好的编程习惯</h2><h3 id="遵从以下良好的习惯以写出好程序" tabindex="-1"><a class="header-anchor" href="#遵从以下良好的习惯以写出好程序" aria-hidden="true">#</a> 遵从以下良好的习惯以写出好程序</h3><ul><li><p>避免使用大文件。如果一个文件里的代码超过300～400行，必须考虑将代码分开到不同类中。</p></li><li><p>避免写太长的方法。一个典型的方法代码在1～25行之间。如果一个方法发代码超过25行，应该考虑将其分解为不同的方法。</p></li><li><p>方法名需能看出它作什么。别使用会引起误解的名字。如果名字一目了然，就无需用文档来解释方法的功能了。</p><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> SavePhoneNumber <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> phoneNumber <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Save the phone number.</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// This method will save the phone number.</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> SaveData <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> phoneNumber <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Save the phone number.</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>一个方法只完成一个任务。不要把多个任务组合到一个方法中，即使那些任务非常小。</p><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Save the address.</span>
SaveAddress <span class="token punctuation">(</span>  address <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Send an email to the supervisor to inform that the address is updated.</span>
SendEmail <span class="token punctuation">(</span> address<span class="token punctuation">,</span> email <span class="token punctuation">)</span><span class="token punctuation">;</span>  

<span class="token return-type class-name"><span class="token keyword">void</span></span> SaveAddress <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> address <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Save the address.</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token return-type class-name"><span class="token keyword">void</span></span> SendEmail <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> address<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> email <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Send an email to inform the supervisor that the address is changed.</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Save address and send an email to the supervisor to inform that the address is updated.</span>
SaveAddress <span class="token punctuation">(</span> address<span class="token punctuation">,</span> email <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> SaveAddress <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> address<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> email <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Job 1.</span>
  <span class="token comment">// Save the address.</span>
  <span class="token comment">// ...</span>
  <span class="token comment">// Job 2.</span>
  <span class="token comment">// Send an email to inform the supervisor that the address is changed.</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>使用C# 或 VB.NET的特有类型，而不是System命名空间中定义的别名类型。</p><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> age<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">object</span></span> contactInfo<span class="token punctuation">;</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">Int16</span> age<span class="token punctuation">;</span>
<span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token class-name">Object</span> contactInfo<span class="token punctuation">;</span>
</code></pre></div></li><li><p>别在程序中使用固定数值，用常量代替。</p></li><li><p>别用字符串常数。用资源文件。</p></li><li><p>避免使用很多成员变量。声明局部变量，并传递给方法。不要在方法间共享成员变量。如果在几个方法间共享一个成员变量，那就很难知道是哪个方法在什么时候修改了它的值。</p></li><li><p>必要时使用enum 。别用数字或字符串来指示离散值。</p></li></ul><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">enum</span> <span class="token class-name">MailType</span>
<span class="token punctuation">{</span>
  Html<span class="token punctuation">,</span>
  PlainText<span class="token punctuation">,</span>
  Attachment
<span class="token punctuation">}</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> SendMail <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">,</span> <span class="token class-name">MailType</span> mailType<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span> mailType <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">case</span> MailType<span class="token punctuation">.</span>Html<span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> MailType<span class="token punctuation">.</span>PlainText<span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> MailType<span class="token punctuation">.</span>Attachment<span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> SendMail <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> message<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> mailType<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span> mailType <span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;Html&quot;</span><span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;PlainText&quot;</span><span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;Attachment&quot;</span><span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
      <span class="token comment">// Do something</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>别把成员变量声明为 public 或 protected。都声明为 private 而使用 public/protected 的Properties.</li><li>不在代码中使用具体的路径和驱动器名。 使用相对路径，并使路径可编程。</li><li>永远别设想你的代码是在“C:”盘运行。你不会知道，一些用户在网络或“Z:”盘运行程序。</li><li>应用程序启动时作些“自检”并确保所需文件和附件在指定的位置。必要时检查数据库连接。出现任何问题给用户一个友好的提示。</li><li>如果需要的配置文件找不到，应用程序需能自己创建使用默认值的一份。</li><li>如果在配置文件中发现错误值，应用程序要抛出错误，给出提示消息告诉用户正确值。</li><li>错误消息需能帮助用户解决问题。永远别用象&quot;应用程序出错&quot;, &quot;发现一个错误&quot; 等错误消息。而应给出象 &quot;更新数据库失败。请确保登陆id和密码正确。&quot; 的具体消息。</li><li>显示错误消息时，除了说哪里错了，还应提示用户如何解决问题。不要用 象 &quot;更新数据库失败。&quot;这样的，要提示用户怎么做：&quot;更新数据库失败。请确保登陆id和密码正确。&quot;</li><li>显示给用户的消息要简短而友好。但要把所有可能的信息都记录下来，以助诊断问题。</li></ul><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><ul><li>别每行代码，每个声明的变量都做注释。</li><li>在需要的地方注释。可读性强的代码需要很少的注释。如果所有的变量和方法的命名都很有意义，会使代码可读性很强并无需太多注释。</li><li>行数不多的注释会使代码看起来优雅。但如果代码不清晰，可读性差，那就糟糕。</li><li>如果应为某种原因使用了复杂艰涩的原理，为程序配备良好的文档和重分的注释。</li><li>对一个数值变量采用不是0,-1等的数值初始化，给出选择该值的理由。</li><li>简言之，要写清晰，可读的代码以致无须什么注释就能理解。</li><li>对注释做拼写检查，保证语法和标点符号的正确使用。</li></ul><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理" aria-hidden="true">#</a> 异常处理</h3><ul><li>不要“捕捉了异常却什么也不做“。如果隐藏了一个异常，你将永远不知道异常到底发生了没有。</li><li>发生异常时，给出友好的消息给用户，但要精确记录错误的所有可能细节，包括发生的时间，和相关方法，类名等。</li><li>只捕捉特定的异常，而不是一般的异常。</li></ul><p>好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> ReadFromFile <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">try</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// read from file.</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileIOException</span> ex<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// log error.</span>
    <span class="token comment">//  re-throw exception depending on your case.</span>
    <span class="token keyword">throw</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不好：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> ReadFromFile <span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">try</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// read from file.</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// Catching general exception is bad... we will never know whether it</span>
    <span class="token comment">// was a file error or some other error.</span>

    <span class="token comment">// Here you are hiding an exception.</span>
    <span class="token comment">// In this case no one will ever know that an exception happened.</span>
    <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>  
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>不必在所有方法中捕捉一般异常。不管它，让程序崩溃。这将帮助你在开发周期发现大多数的错误。</li><li>你可以用应用程序级（线程级）错误处理器处理所有一般的异常。遇到”以外的一般性错误“时，此错误处理器应该捕捉异常，给用户提示消息，在应用程序关闭或 用户选择”忽略并继续“之前记录错误信息。</li><li>不必每个方法都用try-catch。当特定的异常可能发生时才使用。比如，当你写文件时，处理异常FileIOException.</li><li>别写太大的 try-catch 模块。如果需要，为每个执行的任务编写单独的 try-catch 模块。 这将帮你找出哪一段代码产生异常，并给用户发出特定的错误消息</li><li>如果应用程序需要，可以编写自己的异常类。自定义异常不应从基类SystemException派生，而要继承于. IApplicationException。</li></ul>`,26),u={href:"http://www.dotnetspider.com/attachments/forum/274869-10220-codingstandard.txt",target:"_blank",rel:"noopener noreferrer"},d=n("div",{class:"language-txt","data-ext":"txt"},[n("pre",{class:"language-txt"},[n("code",null,`Naming Conventions and Standards
Note : 
The terms Pascal Casing and Camel Casing are used throughout this document. 
Pascal Casing - First character of all words are Upper Case and other characters are lower case. 
Example: BackColor
Camel Casing - First character of all words, except the first word are Upper Case and other characters are lower case.
Example: backColor

The following table summarizes the capitalization rules and provides examples for the different types of identifiers
Identifier  Case  Example
Class Pascal  AppDomain
Enum type Pascal  ErrorLevel
Enum values Pascal  FatalError
Event Pascal  ValueChange
Exception class	Pascal	WebException 
Note   Always ends with the suffix Exception.
Read-only Static field	Pascal	RedValue
Interface	Pascal	IDisposable 
Note   Always begins with the prefix I.
Method  Pascal  ToString
Namespace	Pascal	System.Drawing
Parameter	Camel	typeName
Property	Pascal	BackColor
Protected instance field	Camel	redValue 
Note   Rarely used. A property is preferable to using a protected instance field.
Public instance field	Pascal	RedValue 
Note   Rarely used. A property is preferable to using a public instance field.

1.  Use Pascal casing for Class names 

public class HelloWorld
{
  ...
}

2.	Use Pascal casing for Method names 

void SayHello(string name)
{
	...
}


3.	Use Camel casing for variables and method parameters 

int totalCount = 0;
void SayHello(string name)
{
	string fullMessage = "Hello " + name;
	...
}

4.	Use the prefix “I” with Camel Casing for interfaces ( Example: IEntity )

5.	Do not use Hungarian notation to name variables. 

In earlier days most of the programmers liked it - having the data type as a prefix for the variable name and using m_ as prefix for member variables. Eg: 

string m_sName;
int nAge;

However, in .NET coding standards, this is not recommended. Usage of data type and m_ to represent member variables should not be used. All variables should use camel casing. 

Some programmers still prefer to use the prefix m_ to represent member variables, since there is no other easy way to identify a member variable.


6.	Use Meaningful, descriptive words to name variables. Do not use abbreviations. 

Good:
string address
int salary 

Not Good:
string nam
string addr
int sal 

7.	Do not use single character variable names like i, n, s etc. Use names like index, temp 

One exception in this case would be variables used for iterations in loops: 
for ( int i = 0; i < count; i++ )
{
	...
}
If the variable is used only as a counter for iteration and is not used anywhere else in the loop, many people still like to use a single char variable (i) instead of inventing a different suitable name. 

8.	Do not use underscores (_) for local variable names. 

9.	All member variables must be prefixed with underscore (_) so that they can be identified from other local variables.

10.	Do not use variable names that resemble keywords.

11.	Prefix boolean variables, properties and methods with “is” or similar prefixes.
Ex: private bool _isFinished
12.	Namespace names should follow the standard pattern 

<company name>.<product name>.<top level module>.<bottom level module>

13.	Use appropriate prefix for the UI elements so that you can identify them from the rest of the variables.

There are 2 different approaches recommended here.
a.	Use a common prefix ( ui_ ) for all UI elements. This will help you group all of the UI elements together and easy to access all of them from the intellisense.

b.	Use appropriate prefix for each of the ui element. A brief list is given below. Since .NET has given several controls, you may have to arrive at a complete list of standard prefixes for each of the controls (including third party controls) you are using.

Control	Prefix
Button	btn
Checkbox	chk
CheckBoxList	cbl
DataGrid	dtg
DataList	dtl
Dropdown List	ddl
Hyperlink	hlk
Image	img
ImageButton	imb
Label		lbl
LinkButton	lbtn
ListBox	lst
Panel	pnl
PlaceHolder	phd
RadioButton	rdo
RadioButtonList	rbl
Repeater	rep
Table	tbl
TextBox	txt
Validators	val


14.	File name should match with class name.

For example, for the class HelloWorld, the file name should be helloworld.cs (or, helloworld.vb) 

15.	Use Pascal Case for file names.

1.	Indentation and Spacing

1.	Use TAB for indentation. Do not use SPACES.  Define the Tab size as 4.

2.	Comments should be in the same level as the code (use the same level of indentation). 

Good:

// Format a message and display

string fullMessage = "Hello " + name;
DateTime currentTime = DateTime.Now;
string message = fullMessage + ", the time is : " + currentTime.ToShortTimeString();
MessageBox.Show ( message );

Not Good:
// Format a message and display
string fullMessage = "Hello " + name;
DateTime currentTime = DateTime.Now;
string message = fullMessage + ", the time is : " + currentTime.ToShortTimeString();
MessageBox.Show ( message );

3.	Curly braces ( {} ) should be in the same level as the code outside the braces. 
 
4.	Use one blank line to separate logical groups of code. 

Good:
	bool SayHello ( string name )
	{
		string fullMessage = "Hello " + name;
		DateTime currentTime = DateTime.Now;

		string message = fullMessage + ", the time is : " + currentTime.ToShortTimeString();

		MessageBox.Show ( message );

		if ( ... )
		{
			// Do something
			// ...

			return false;
		}

		return true;
	}

Not Good:
	bool SayHello (string name)
	{
		string fullMessage = "Hello " + name;
		DateTime currentTime = DateTime.Now;
		string message = fullMessage + ", the time is : " + currentTime.ToShortTimeString();
		MessageBox.Show ( message );
		if ( ... )
		{
			// Do something
			// ...
			return false;
		}
		return true;
	}

5.	There should be one and only one single blank line between each method inside the class. 

6.	The curly braces should be on a separate line and not in the same line as if, for etc. 

Good: 
		if ( ... )	
		{
			// Do something
		}
Not Good: 
		if ( ... )	{
			// Do something
		}
7.	Use a single space before and after each operator and brackets. 

Good: 
		if ( showResult == true )
		{
			for ( int i = 0; i < 10; i++ )
			{
				//
			}
		}

Not Good: 
		if(showResult==true)
		{
			for(int	   i= 0;i<10;i++)
			{
				//
			}
		}


8.	Use #region to group related pieces of code together. If you use proper grouping using #region, the page should like this when all definitions are collapsed.

 

9.	Keep private member variables, properties and methods in the top of the file and public members in the bottom.  

2.	Good Programming practices

1.	Avoid writing very long methods. A method should typically have 1~25 lines of code. If a method has more than 25 lines of code, you must consider re factoring into separate methods. 

2.	Method name should tell what it does. Do not use mis-leading names. If the method name is obvious, there is no need of documentation explaining what the method does. 

Good: 
	void SavePhoneNumber ( string phoneNumber )
	{
		// Save the phone number.
	}

Not Good: 

	// This method will save the phone number.
	void SaveDetails ( string phoneNumber )
	{
		// Save the phone number.
	}

3.	A method should do only 'one job'. Do not combine more than one job in a single method, even if those jobs are very small. 

Good: 
	// Save the address.
	SaveAddress (  address );
	
	// Send an email to the supervisor to inform that the address is updated.
	SendEmail ( address, email );		

void SaveAddress ( string address )
	{
		// Save the address.
		// ...
	}
	
	void SendEmail ( string address, string email )
	{
		// Send an email to inform the supervisor that the address is changed.
		// ...
	}

Not Good: 

	// Save address and send an email to the supervisor to inform that 
// the address is updated.
	SaveAddress ( address, email );

	void SaveAddress ( string address, string email )
	{
		// Job 1.
		// Save the address.
		// ...

		// Job 2.
		// Send an email to inform the supervisor that the address is changed.
		// ...
	}

4.	Use the c# or VB.NET specific types (aliases), rather than the types defined in System namespace. 

	int age;   (not Int16)
	string name;  (not String)
	object contactInfo; (not Object)

	
Some developers prefer to use types in Common Type System than language specific aliases.

5.	Always watch for unexpected values. For example, if you are using a parameter with 2 possible values, never assume that if one is not matching then the only possibility is the other value.
Good:
If ( memberType == eMemberTypes.Registered )
{
	// Registered user… do something…
}
else if ( memberType == eMemberTypes.Guest )
{
	// Guest user... do something…
}
else
{
		// Un expected user type. Throw an exception
		throw new Exception (“Un expected value “ + memberType.ToString() + “’.”)

		// If we introduce a new user type in future, we can easily find 

// the problem here.
}

Not Good:

If ( memberType == eMemberTypes.Registered )
{
		// Registered user… do something…
}
else
{
		// Guest user... do something…

// If we introduce another user type in future, this code will 
// fail and will not be noticed.
}

6.	Do not hardcode numbers. Use constants instead. Declare constant in the top of the file and use it in your code.

However, using constants are also not recommended. You should use the constants in the config file or database so that you can change it later. Declare them as constants only if you are sure this value will never need to be changed.

7.	Do not hardcode strings. Use resource files. 

8.	Convert strings to lowercase or upper case before comparing. This will ensure the string will match even if the string being compared has a different case.

if ( name.ToLower() == “john” )
{
	    //…
}

9.	Use String.Empty instead of “”

Good:

If ( name == String.Empty )
{
	// do something
}

Not Good:

If ( name == “” )
{
	// do something
}


10.	Avoid using member variables. Declare local variables wherever necessary and pass it to other methods instead of sharing a member variable between methods. If you share a member variable between methods, it will be difficult to track which method changed the value and when. 

11.	Use enum wherever required. Do not use numbers or strings to indicate discrete values. 

Good: 
	enum MailType

{
		Html,
		PlainText,
		Attachment
	}

	void SendMail (string message, MailType mailType)
	{
		switch ( mailType )
		{
			case MailType.Html:
				// Do something
				break;
			case MailType.PlainText:
				// Do something
				break;
			case MailType.Attachment:
				// Do something
				break;
			default:
				// Do something
				break;
		}
	}


Not Good: 

	void SendMail (string message, string mailType)
	{
		switch ( mailType )
		{
			case "Html":
				// Do something
				break;
			case "PlainText":
				// Do something
				break;
			case "Attachment":
				// Do something
				break;
			default:
				// Do something
				break;
		}
	}
12.	Do not make the member variables public or protected. Keep them private and expose public/protected Properties. 

13.	The event handler should not contain the code to perform the required action. Rather call another method from the event handler.

14.	Do not programmatically click a button to execute the same action you have written in the button click event. Rather, call the same method which is called by the button click event handler.

15.	Never hardcode a path or drive name in code. Get the application path programmatically and use relative path. 

16.	Never assume that your code will run from drive "C:". You may never know, some users may run it from network or from a "Z:". 

17.	In the application start up, do some kind of "self check" and ensure all required files and dependancies are available in the expected locations. Check for database connection in start up, if required. Give a friendly message to the user in case of any problems. 

18.	If the required configuration file is not found, application should be able to create one with default values. 

19.	If a wrong value found in the configuration file, application should throw an error or give a message and also should tell the user what are the correct values. 

20.	Error messages should help the user to solve the problem. Never give error messages like "Error in Application", "There is an error" etc. Instead give specific messages like "Failed to update database. Please make sure the login id and password are correct." 

21.	When displaying error messages, in addition to telling what is wrong, the message should also tell what should the user do to solve the problem. Instead of message like "Failed to update database.", suggest what should the user do: "Failed to update database. Please make sure the login id and password are correct." 

22.	Show short and friendly message to the user. But log the actual error with all possible information. This will help a lot in diagnosing problems. 

23.	Do not have more than one class in a single file.

24.	Have your own templates for each of the file types in Visual Studio. You can include your company name, copy right information etc in the template. You can view or edit the Visual Studio file templates in the folder C:\\Program Files\\Microsoft Visual Studio 8\\Common7\\IDE\\ItemTemplatesCache\\CSharp\\1033. (This folder has the templates for C#, but you can easily find the corresponding folders or any other language)

25.	Avoid having very large files. If a single file has more than 1000 lines of code, it is a good candidate for refactoring. Split them logically into two or more classes.

26.	Avoid public methods and properties, unless they really need to be accessed from outside the class. Use “internal” if they are accessed only within the same assembly.

27.	Avoid passing too many parameters to a method. If you have more than 4~5 parameters, it is a good candidate to define a class or structure.

28.	If you have a method returning a collection, return an empty collection instead of null, if you have no data to return. For example, if you have a method returning an ArrayList, always return a valid ArrayList. If you have no items to return, then return a valid ArrayList with 0 items. This will make it easy for the calling application to just check for the “count” rather than doing an additional check for “null”.

29.	Use the AssemblyInfo file to fill information like version number, description, company name, copyright notice etc.

30.	Logically organize all your files within appropriate folders. Use 2 level folder hierarchies. You can have up to 10 folders in the root folder and each folder can have up to 5 sub folders. If you have too many folders than cannot be accommodated with the above mentioned 2 level hierarchy, you may need re factoring into multiple assemblies.

16.	Make sure you have a good logging class which can be configured to log errors, warning or traces. If you configure to log errors, it should only log errors. But if you configure to log traces, it should record all (errors, warnings and trace). Your log class should be written such a way that in future you can change it easily to log to Windows Event Log, SQL Server, or Email to administrator or to a File etc without any change in any other part of the application. Use the log class extensively throughout the code to record errors, warning and even trace messages that can help you trouble shoot a problem.

17.	If you are opening database connections, sockets, file stream etc, always close them in the finally block. This will ensure that even if an exception occurs after opening the connection, it will be safely closed in the finally block.

18.	Declare variables as close as possible to where it is first used. Use one variable declaration per line.

19.	Use StringBuilder class instead of String when you have to manipulate string objects in a loop. The String object works in weird way in .NET. Each time you append a string, it is actually discarding the old string object and recreating a new object, which is a relatively expensive operations.

Consider the following example:

public string ComposeMessage (string[] lines)
{ 
   string message = String.Empty; 

   for (int i = 0; i < lines.Length; i++)
   { 
      message += lines [i]; 
   }

   return message;
}

In the above example, it may look like we are just appending to the string object ‘message’. But what is happening in reality is, the string object is discarded in each iteration and recreated and appending the line to it.

If your loop has several iterations, then it is a good idea to use StringBuilder class instead of String object.

See the example where the String object is replaced with StringBuilder.

public string ComposeMessage (string[] lines)
{
    StringBuilder message = new StringBuilder();

    for (int i = 0; i < lines.Length; i++)
    {
       message.Append( lines[i] ); 
    }

    return message.ToString();
}


3.	Architecture

1.	Always use multi layer (N-Tier) architecture. 

2.	Never access database from the UI pages. Always have a data layer class which performs all the database related tasks. This will help you support or migrate to another database back end easily.

3.	Use try-catch in your data layer to catch all database exceptions. This exception handler should record all exceptions from the database. The details recorded should include the name of the command being executed, stored proc name, parameters, connection string used etc. After recording the exception, it could be re thrown so that another layer in the application can catch it and take appropriate action.

4.	Separate your application into multiple assemblies. Group all independent utility classes into a separate class library. All your database related files can be in another class library.

4.	ASP.NET

1.	Do not use session variables throughout the code. Use session variables only within the classes and expose methods to access the value stored in the session variables. A class can access the session using System.Web.HttpCOntext.Current.Session

2.	Do not store large objects in session. Storing large objects in session may consume lot of server memory depending on the number of users.

3.	Always use style sheet to control the look and feel of the pages. Never specify font name and font size in any of the pages. Use appropriate style class. This will help you to change the UI of your application easily in future. Also, if you like to support customizing the UI for each customer, it is just a matter of developing another style sheet for them

5.	Comments

Good and meaningful comments make code more maintainable. However, 

1.	Do not write comments for every line of code and every variable declared. 

2.	Use // or /// for comments. Avoid using /* … */

3.	Write comments wherever required. But good readable code will require very less comments. If all variables and method names are meaningful, that would make the code very readable and will not need many comments. 

4.	Do not write comments if the code is easily understandable without comment. The drawback of having lot of comments is, if you change the code and forget to change the comment, it will lead to more confusion.

5.	Fewer lines of comments will make the code more elegant. But if the code is not clean/readable and there are less comments, that is worse. 

6.	If you have to use some complex or weird logic for any reason, document it very well with sufficient comments. 

7.	If you initialize a numeric variable to a special number other than 0, -1 etc, document the reason for choosing that value. 

8.	The bottom line is, write clean, readable code such a way that it doesn't need any comments to understand. 
9.	Perform spelling check on comments and also make sure proper grammar and punctuation is used. 

6.	Exception Handling

1.	Never do a 'catch exception and do nothing'. If you hide an exception, you will never know if the exception happened or not. Lot of developers uses this handy method to ignore non significant errors. You should always try to avoid exceptions by checking all the error conditions programmatically. In any case, catching an exception and doing nothing is not allowed. In the worst case, you should log the exception and proceed.

2.	In case of exceptions, give a friendly message to the user, but log the actual error with all possible details about the error, including the time it occurred, method and class name etc. 

3.	Always catch only the specific exception, not generic exception. 

Good: 


	void ReadFromFile ( string fileName )
	{
		try
		{
			// read from file.
		}
		catch (FileIOException ex)
		{
			// log error.
			//  re-throw exception depending on your case.
			throw;
		}
	}

Not Good: 


void ReadFromFile ( string fileName )
{
   try
   {
      // read from file.
   }
   catch (Exception ex)	
   {
      // Catching general exception is bad... we will never know whether 
      // it was a file error or some other error.		
      // Here you are hiding an exception. 
      // In this case no one will ever know that an exception happened.

      return "";		
   }
}
	

4.	No need to catch the general exception in all your methods. Leave it open and let the application crash. This will help you find most of the errors during development cycle. You can have an application level (thread level) error handler where you can handle all general exceptions. In case of an 'unexpected general error', this error handler should catch the exception and should log the error in addition to giving a friendly message to the user before closing the application, or allowing the user to 'ignore and proceed'. 

5.	When you re throw an exception, use the throw statement without specifying the original exception. This way, the original call stack is preserved.

Good:

catch
{
	// do whatever you want to handle the exception 

	throw;	
}

Not Good:

catch (Exception ex)
{
	// do whatever you want to handle the exception 

	throw ex;
}

6.	Do not write try-catch in all your methods. Use it only if there is a possibility that a specific exception may occur and it cannot be prevented by any other means. For example, if you want to insert a record if it does not already exists in database, you should try to select record using the key. Some developers try to insert a record without checking if it already exists. If an exception occurs, they will assume that the record already exists. This is strictly not allowed. You should always explicitly check for errors rather than waiting for exceptions to occur. On the other hand, you should always use exception handlers while you communicate with external systems like network, hardware devices etc. Such systems are subject to failure anytime and error checking is not usually reliable. In those cases, you should use exception handlers and try to recover from error.

7.	Do not write very large try-catch blocks. If required, write separate try-catch for each task you perform and enclose only the specific piece of code inside the try-catch. This will help you find which piece of code generated the exception and you can give specific error message to the user. 

8.	Write your own custom exception classes if required in your application. Do not derive your custom exceptions from the base class SystemException. Instead, inherit from ApplicationException.
`)])],-1);function h(m,k){const e=s("ExternalLinkIcon");return t(),o("div",null,[r,n("p",null,[n("a",u,[p("以下txt来自 Click Me"),i(e)])]),d])}const y=a(c,[["render",h],["__file","cspcsg6.html.vue"]]);export{y as default};
