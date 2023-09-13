import{_ as n,o as s,c as a,a as o}from"./app-477de5b2.js";const e={},p=o(`<h1 id="如何在windows-form中实现url-encoding-decoding" tabindex="-1"><a class="header-anchor" href="#如何在windows-form中实现url-encoding-decoding" aria-hidden="true">#</a> 如何在Windows Form中实现URL Encoding/Decoding？</h1><p>作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-7-24 17:32:07</p><p>如果你想在Windows Forms中实现URL Encoding，<code>HttpUtility</code>类有一个shared (static)方法实现对字符串的URL 编码。下面就是一个例子：【注意要引用System.Web】</p><div class="language-vbnet" data-ext="vbnet"><pre class="language-vbnet"><code><span class="token keyword">using</span> <span class="token keyword">System</span>.Reflection.Metadata<span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token keyword">System</span>.Web<span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token keyword">System</span>.Windows.Controls<span class="token punctuation">;</span>

<span class="token keyword">Imports</span> <span class="token keyword">System</span>
<span class="token keyword">Imports</span> <span class="token keyword">System</span>.Windows.Forms
<span class="token keyword">Imports</span> <span class="token keyword">System</span>.Drawing
<span class="token keyword">Imports</span> <span class="token keyword">System</span>.Web

<span class="token keyword">Public</span> <span class="token keyword">Class</span> Form1
<span class="token keyword">Inherits</span> <span class="token keyword">System</span>.Windows.Forms.Form

#Region <span class="token string">&quot; Windows 窗体设计器生成的代码 &quot;</span>
<span class="token keyword">Public</span> <span class="token keyword">Sub</span> <span class="token keyword">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">MyBase</span>.<span class="token keyword">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">&#39;该调用是 Windows 窗体设计器所必需的。</span>
    InitializeComponent<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">&#39;在 InitializeComponent() 调用之后添加任何初始化</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token comment">&#39;窗体重写 dispose 以清理组件列表。</span>
<span class="token keyword">Protected</span> <span class="token keyword">Overloads</span> <span class="token keyword">Overrides</span> <span class="token keyword">Sub</span> Dispose<span class="token punctuation">(</span><span class="token keyword">ByVal</span> disposing <span class="token keyword">As</span> <span class="token keyword">Boolean</span><span class="token punctuation">)</span>
<span class="token keyword">If</span> disposing <span class="token keyword">Then</span>
    <span class="token keyword">If</span> <span class="token keyword">Not</span> <span class="token punctuation">(</span>components <span class="token keyword">Is</span> <span class="token keyword">Nothing</span><span class="token punctuation">)</span> <span class="token keyword">Then</span>
        components.Dispose<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">MyBase</span>.Dispose<span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token comment">&#39;Windows 窗体设计器所必需的</span>
<span class="token keyword">Private</span> components <span class="token keyword">As</span> <span class="token keyword">System</span>.ComponentModel.IContainer

<span class="token comment">&#39;注意: 以下过程是 Windows 窗体设计器所必需的</span>
<span class="token comment">&#39;可以使用 Windows 窗体设计器修改此过程。</span>
<span class="token comment">&#39;不要使用代码编辑器修改它。</span>
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> TextBox1 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> Button1 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.Button
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> TextBox2 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> Label1 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.Label
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> Button2 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.Button
<span class="token keyword">FriEnd</span> <span class="token keyword">WithEvents</span> TextBox3 <span class="token keyword">As</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
 <span class="token operator">&lt;</span> <span class="token keyword">System</span>.Diagnostics.DebuggerStepThrough<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token keyword">Private</span> <span class="token keyword">Sub</span> InitializeComponent<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.TextBox1 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
<span class="token keyword">Me</span>.Button1 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.Button
<span class="token keyword">Me</span>.TextBox2 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
<span class="token keyword">Me</span>.Label1 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.Label
<span class="token keyword">Me</span>.Button2 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.Button
<span class="token keyword">Me</span>.TextBox3 <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Windows.Forms.TextBox
<span class="token keyword">Me</span>.SuspendLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;TextBox1</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.TextBox1.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.TextBox1.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">320</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.TextBox1.<span class="token function">Text</span> <span class="token operator">=</span> <span class="token string">&quot;http://xml.sz.luohuedu.net/?ID=Url Encoding 测试&quot;</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;Button1</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.Button1.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">112</span><span class="token punctuation">,</span> <span class="token number">112</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Button1.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">96</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Button1.<span class="token function">Text</span> <span class="token operator">=</span> <span class="token string">&quot; URL Encoding&quot;</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;TextBox2</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.TextBox2.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">48</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.TextBox2.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">320</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span>

<span class="token comment">&#39;</span>
<span class="token comment">&#39;Label1</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.Label1.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Label1.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Label1.<span class="token function">Text</span> <span class="token operator">=</span> <span class="token string">&quot;输入URL：&quot;</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;Button2</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.Button2.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">240</span><span class="token punctuation">,</span> <span class="token number">112</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Button2.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Button2.<span class="token function">Text</span> <span class="token operator">=</span> <span class="token string">&quot;URL Decoding&quot;</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;TextBox3</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.TextBox3.Location <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Point</span><span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.TextBox3.<span class="token function">Size</span> <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">320</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span>
<span class="token comment">&#39;</span>
<span class="token comment">&#39;Form1</span>
<span class="token comment">&#39;</span>
<span class="token keyword">Me</span>.AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.ClientSize <span class="token operator">=</span> <span class="token keyword">New</span> <span class="token keyword">System</span>.Drawing.<span class="token function">Size</span><span class="token punctuation">(</span><span class="token number">416</span><span class="token punctuation">,</span> <span class="token number">149</span><span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.TextBox3<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.Button2<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.Label1<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.TextBox2<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.Button1<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.Controls.Add<span class="token punctuation">(</span><span class="token keyword">Me</span>.TextBox1<span class="token punctuation">)</span>
<span class="token keyword">Me</span>.<span class="token function">Text</span> <span class="token operator">=</span> <span class="token string">&quot;URL Encoding/Decoding 测试&quot;</span>
<span class="token keyword">Me</span>.ResumeLayout<span class="token punctuation">(</span><span class="token keyword">False</span><span class="token punctuation">)</span>

<span class="token keyword">End</span> <span class="token keyword">Sub</span>
<span class="token keyword">#End</span> Region

<span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">System</span>.<span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> <span class="token keyword">System</span>.EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button1.Click
TextBox2.<span class="token function">Text</span> <span class="token operator">=</span> HttpUtility.UrlEncode<span class="token punctuation">(</span>TextBox1.<span class="token function">Text</span><span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button2_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> <span class="token keyword">System</span>.<span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> <span class="token keyword">System</span>.EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button2.Click
TextBox3.<span class="token function">Text</span> <span class="token operator">=</span> HttpUtility.UrlDecode<span class="token punctuation">(</span>TextBox2.<span class="token function">Text</span><span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
<span class="token keyword">End</span> <span class="token keyword">Class</span>
</code></pre></div>`,4),t=[p];function c(k,l){return s(),a("div",null,t)}const u=n(e,[["render",c],["__file","cspbase12.html.vue"]]);export{u as default};
