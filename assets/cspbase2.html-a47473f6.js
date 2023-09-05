import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="通过事件-在两窗体间传递数据" tabindex="-1"><a class="header-anchor" href="#通过事件-在两窗体间传递数据" aria-hidden="true">#</a> 通过事件，在两窗体间传递数据</h1><p>www.chinacs.net 2002-5-9 中文C#技术站</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//---------------------------------------</span>
<span class="token comment">// form1.cs</span>
<span class="token comment">//----------------------------------------</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span> 

<span class="token keyword">namespace</span> <span class="token namespace">FormConmunicate</span>
<span class="token punctuation">{</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// Form1 的摘要说明。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 必需的设计器变量。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// Windows 窗体设计器支持所必需的</span>
<span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">bool</span></span> disposing <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span> disposing <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span> disposing <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
<span class="token doc-comment comment">/// 此方法的内容。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// textBox1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// button1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">104</span><span class="token punctuation">,</span> <span class="token number">168</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">96</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//this.button1.Click += new System.EventHandler(this.button1_Click);</span>

<span class="token comment">// Form1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">292</span><span class="token punctuation">,</span> <span class="token number">273</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">,</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

FormHandel<span class="token punctuation">.</span>myFormHandel<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">;</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 应用程序的主入口点。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
<span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
    <span class="token class-name">Form1</span> f1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Form2</span> f2<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    f2<span class="token punctuation">.</span>TextChange<span class="token operator">+=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextChangeEventHander</span><span class="token punctuation">(</span>f1<span class="token punctuation">.</span>ontextchange<span class="token punctuation">)</span><span class="token punctuation">;</span>
    f2<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>f1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ontextchange</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span><span class="token class-name">Form2EventArg</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token operator">=</span>e<span class="token punctuation">.</span>MyText <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FormHandel</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> myFormHandel<span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//-----------------------------------------------</span>
<span class="token comment">// form2.cs</span>
<span class="token comment">//-----------------------------------------------</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">FormConmunicate</span>
<span class="token punctuation">{</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// Form2 的摘要说明。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TextChangeEventHander</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span><span class="token class-name">Form2EventArg</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TextChangeEventHander</span> TextChange<span class="token punctuation">;</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 必需的设计器变量。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token function">Form2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token comment">// Windows 窗体设计器支持所必需的</span>
<span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span> <span class="token class-name"><span class="token keyword">bool</span></span> disposing <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span> disposing <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span> disposing <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
<span class="token doc-comment comment">/// 此方法的内容。</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// textBox1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">168</span><span class="token punctuation">,</span> <span class="token number">56</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// button1</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">168</span><span class="token punctuation">,</span> <span class="token number">136</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Form2</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">292</span><span class="token punctuation">,</span> <span class="token number">273</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">,</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

FormHandel<span class="token punctuation">.</span>myFormHandel<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form2&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form2&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//引发事件，并传递数据</span>
    <span class="token function">TextChange</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form2EventArg</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//事件数据</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form2EventArg</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span></span> 
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> mytext <span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Form2EventArg</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        mytext<span class="token operator">=</span>str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> MyText
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> mytext<span class="token punctuation">;</span>
         <span class="token punctuation">}</span>

     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre></div>`,4),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","cspbase2.html.vue"]]);export{i as default};
