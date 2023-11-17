import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as l}from"./app-d9da1b6d.js";const u={},k=l(`<h1 id="创建具有自验证功能的textbox控件" tabindex="-1"><a class="header-anchor" href="#创建具有自验证功能的textbox控件" aria-hidden="true">#</a> 创建具有自验证功能的textbox控件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>kwklover（翻译）
关键字  textbox,控件开发,验证
出处   http://www.codeproject.com/aspnet/selfvalidatingtextbox.asp?target=Self%7CValidating%7CASP...
</code></pre></div><h2 id="导言" tabindex="-1"><a class="header-anchor" href="#导言" aria-hidden="true">#</a> 导言</h2><p>在强大的.NET面前，我有很多的想法，我希望asp.net的web控件内建有验证功能，而不需要在页面中插入太多的验证控件以致代码混乱！现在我们将可以利用.NET来创建一个只允许输入整型数字的的textbox控件或只允许输入货币型数据的textbox控件，等等。当然了，你还可以特别指定textbox控件可否为空或者是否在一个范围内，等等，另外，当我们输入的数据符合要求时，还可以返回一个值，以方便我们觉得是否要干预，甚至我们可以让它运行的时候根据输入数据是否符合要求呈现不同的颜色</p><p>经过一番努力，我终于实现以上的想法</p><h2 id="实现ivalidator接口" tabindex="-1"><a class="header-anchor" href="#实现ivalidator接口" aria-hidden="true">#</a> 实现IValidator接口</h2><p>我在钻研SDK文档时发现，只要实现了IValidator接口，任何的控件都可以具有验证功能，以下是一个继承textbox控件的简单的例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">MyValidatingControls</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TextBox</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">,</span> <span class="token class-name">IValidator</span></span> <span class="token punctuation">{</span>
      <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> _valid <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _errorMessage <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsValid <span class="token punctuation">{</span>
         <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _valid<span class="token punctuation">;</span> <span class="token punctuation">}</span>
         <span class="token keyword">set</span> <span class="token punctuation">{</span> _valid <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ErrorMessage <span class="token punctuation">{</span>
         <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _errorMessage<span class="token punctuation">;</span> <span class="token punctuation">}</span>
         <span class="token keyword">set</span> <span class="token punctuation">{</span> _errorMessage <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当然了，这段程序什么都不做，但是它完全实现了基本的IValidator接口的架构（至少它是可以成功编译的），我使用Private关键字创建两个字段（field）用来保存验证状态和错误信息，为了确保验证控件能被执行，我们必须把我们的验证控件添加到页面中的验证控件集合中来。</p><p>我在阅读SDK文档的时候发现，验证控件是在初始化期间加载他们本身的，IValidators接口主要用来注册他们自己，所以我们需要使用覆盖的方法重新实现OnInit和OnUnload事件，以便我们能从页面中的验证控件集合中添加或者删除它们</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnInit</span><span class="token punctuation">(</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnInit</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
   Page<span class="token punctuation">.</span>Validators<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnUnload</span><span class="token punctuation">(</span><span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>Page <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Page<span class="token punctuation">.</span>Validators<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnUnload</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="完成设置" tabindex="-1"><a class="header-anchor" href="#完成设置" aria-hidden="true">#</a> 完成设置</h2><p>在我们实现我们的验证功能之前，为了使事件更简洁，我设置了一些帮助项目，因为我不想单独分别单独提供验证控件的错误信息，而是希望把他们嵌入到控件中来，以实现我们所期望格式的数据录入，因此，我需要做一些事情，使它可以适当的出现错误提示。</p><p>我将添加一个叫做FriendlyName属性，它将在所有的错误提示信息中出现以提示用户合法的数据类型，所以，如果我们调用的控件ID是RetailPrice，我们将使该控件的riendlyName为Retail Price</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _friendlyName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> FriendlyName <span class="token punctuation">{</span>
   <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _friendlyName<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">set</span> <span class="token punctuation">{</span> _friendlyName <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，我们重写IsValid事件，使它可以在验证不通过时可以改变控件的背景颜色</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsValid <span class="token punctuation">{</span>
   <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _valid<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">set</span> <span class="token punctuation">{</span>
      _valid <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>_valid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>LightCoral<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>BackColor <span class="token operator">=</span> Color<span class="token punctuation">.</span>White<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="不允许出现空格" tabindex="-1"><a class="header-anchor" href="#不允许出现空格" aria-hidden="true">#</a> 不允许出现空格</h2><p>首先我们需要确定，提供一个可选项以决定是否允许为空值，我们在这里需要创建一个属性以判断是否可以为空</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> _blankAllowed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> AllowBlank <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _blankAllowed<span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">set</span> <span class="token punctuation">{</span> _blankAllowed <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，我们可以重写验证函数</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

   <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>AllowBlank<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name"><span class="token keyword">bool</span></span> isBlank <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>isBlank<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>ErrorMessage <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;{0}&#39; cannot be blank.&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FriendlyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="拓展我们的创意" tabindex="-1"><a class="header-anchor" href="#拓展我们的创意" aria-hidden="true">#</a> 拓展我们的创意</h2><p>现在我们已经创建了一个内建基本验证功能的textbox控件，现在我们可以延展我们的想法，创建更多的有趣的具有特定验证功能的textbox控件</p><p>下面以创建一个只允许输入整型数据的textbox控件（IntegerTextBox），并且使该控件具有只允许输入的数据必须在一定的范围内，但我们仍然需要考虑是否允许空值，所以，象上面一样，需要添加一个属性</p><p>在上面我们创建的基本的textbox控件的基础上，我们仅仅需要继承该控件，然后覆盖Validate函数和添加一些新的属性</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _minValue <span class="token operator">=</span> Int32<span class="token punctuation">.</span>MinValue<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> _maxValue <span class="token operator">=</span> Int32<span class="token punctuation">.</span>MaxValue<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> MinValue <span class="token punctuation">{</span>
   <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _minValue<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">set</span> <span class="token punctuation">{</span>
      _minValue <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
      
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_minValue <span class="token operator">&gt;</span> _maxValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name"><span class="token keyword">int</span></span> swap <span class="token operator">=</span> _minValue<span class="token punctuation">;</span>
          _minValue <span class="token operator">=</span> _maxValue<span class="token punctuation">;</span>
          _maxValue <span class="token operator">=</span> swap<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> MaxValue <span class="token punctuation">{</span>
   <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _maxValue<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">set</span> <span class="token punctuation">{</span>
      _maxValue <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
      
      <span class="token keyword">if</span> <span class="token punctuation">(</span>_minValue <span class="token operator">&gt;</span> _maxValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name"><span class="token keyword">int</span></span> swap <span class="token operator">=</span> _minValue<span class="token punctuation">;</span>
          _minValue <span class="token operator">=</span> _maxValue<span class="token punctuation">;</span>
          _maxValue <span class="token operator">=</span> swap<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后，我们扩充该Validate函数，并把编译它为本地代码</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

   <span class="token class-name"><span class="token keyword">bool</span></span> isBlank <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword">if</span> <span class="token punctuation">(</span>isBlank<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>AllowBlank<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>ErrorMessage <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;{0}&#39; &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;cannot be blank.&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FriendlyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
         _value <span class="token operator">=</span> Int32<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span>_value <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MinValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ErrorMessage <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;{0}&#39; cannot &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;be less than {1}&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FriendlyName<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MinValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>

         <span class="token keyword">if</span> <span class="token punctuation">(</span>_value <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MaxValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ErrorMessage <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;{0}&#39; &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;cannot be more than {1}&quot;</span><span class="token punctuation">,</span>  <span class="token keyword">this</span><span class="token punctuation">.</span>FriendlyName<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>MinValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>ErrorMessage <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;{0}&#39; &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;is not a valid integer.&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FriendlyName<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>IsValid <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Value <span class="token punctuation">{</span>
   <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> _value<span class="token punctuation">;</span> <span class="token punctuation">}</span>
   <span class="token keyword">set</span> <span class="token punctuation">{</span> 
      _value <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> _value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>要写就那么多了，现在我们还可以在这个类的基础上创建诸如要求只能输入符合一定时间格式和货币格式，下面我们举一个例子以说明如何使用我们创建的控件</p><p>在此以前我们要实现同样的功能需要写以下的代码：</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>&lt;asp:TextBox id=&quot;Number&quot; runat=&quot;server&quot;/&gt;
&lt;asp:RequiredFieldValidator id=&quot;RequiredFieldValidator2&quot;
   ControlToValidate=&quot;Number&quot; 
   Text=&quot;&#39;Number&#39; cannot be blank.&quot; runat=&quot;server&quot;/&gt;
&lt;asp:RangeValidator id=&quot;Range1&quot; ControlToValidate=&quot;Number&quot;
   MinimumValue=&quot;0&quot; MaximumValue=&quot;100&quot;
   Type=&quot;Integer&quot; Text=&quot;The value must be from 0 to 100!&quot;
   runat=&quot;server&quot;/&gt;
</code></pre></div><p>而现在，我们仅仅需一句：</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>MyControls:IntegerText id=&quot;Number&quot;
    FriendlyName=&quot;Number&quot; MinValue=&quot;0&quot; MaxValue=&quot;100&quot;
    AllowBlank=&quot;false&quot; runat=&quot;server&quot;&gt;
</code></pre></div><p>最后，需要说明的是，我创建的这个类相对与现有的验证来说并不那么完美，一个明显需要改进地方是，我们需要在该类中添加客户端脚本，以使验证行为可以不只在服务器端触发，也可以在客户端触发</p><p>我希望每一个人都能理解它的运行原理，以便你有更好的创意的时候可以修正它，也许有一天我可能会使用你创建的具有完美功能的类集。</p>`,37),i={href:"http://www.codeproject.com/aspnet/selfvalidatingtextbox/selfvalidatingtextbox.zip",target:"_blank",rel:"noopener noreferrer"},r=n("p",null,[s("译注：由于本人的翻译水平有限和时间关系，翻译的不是那么通顺，请见量，如果有什么问题，欢迎给我来信，我们一起探讨"),n("br"),n("code",null,"hisuifeng@etang.com")],-1);function d(y,w){const a=p("ExternalLinkIcon");return o(),e("div",null,[k,n("p",null,[n("a",i,[s("Download source and demo files"),c(a)])]),r])}const h=t(u,[["render",d],["__file","toolbox13.html.vue"]]);export{h as default};
