import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="关于如何将word文件读入richtextbox" tabindex="-1"><a class="header-anchor" href="#关于如何将word文件读入richtextbox" aria-hidden="true">#</a> 关于如何将word文件读入RichTextBox</h1><p>我在别的论坛经常看到有的朋友们问怎么样将word文件读入到richtextbox,（包括图片）而且要求如要修改后能保存，我想的一个办法：使用剪贴板的办法。我做了一个类，可以用于我们以后开发WORD的程序：</p><p>1、在运行这个程序之前请先导入三个dll　 它们是：Interop.Microsoft.Office.Core.dll、Interop.VBIDE.dll、Interop.Word.dll）它们如何得到请查看一下以前的贴子，有很多是讲如何将com组件转为受限代码的。如果实现找不到也可以和我联系，我发给你！<code>huanghai@bdfsz.com.cn</code></p><p>2、其实我们可以这样控制word ,在启动word后选录制新宏，开始我们的动作，比如我们想看一下用VBA如何控制全选－复制－剪切，就可以用这个办法。停止录制。用VBA编辑器看一下代码吧！</p><p>3 、废话不说了，看我的程序吧！</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WordApplication</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>RichTextBox</span> richTextBox1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>OpenFileDialog</span> openFileDialog1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button2<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify </span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor. </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>RichTextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>openFileDialog1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>OpenFileDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// button1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">72</span><span class="token punctuation">,</span> <span class="token number">296</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;开始读取&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// richTextBox1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;richTextBox1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">432</span><span class="token punctuation">,</span> <span class="token number">264</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// openFileDialog1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>openFileDialog1<span class="token punctuation">.</span>DefaultExt <span class="token operator">=</span> <span class="token string">&quot;*.doc&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>openFileDialog1<span class="token punctuation">.</span>Filter <span class="token operator">=</span> <span class="token string">&quot;Word文件|*.doc&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// button2 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">248</span><span class="token punctuation">,</span> <span class="token number">296</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button2&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;修改后保存&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button2_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// Form1 </span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">496</span><span class="token punctuation">,</span> <span class="token number">365</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;这是一个用于读取WORD文件到RICHEDIT的例子&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            richTextBox1<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            openFileDialog1<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>openFileDialog1<span class="token punctuation">.</span>FileName <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">CCWordApp</span> test<span class="token punctuation">;</span>
                test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CCWordApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                test<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>openFileDialog1<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                test<span class="token punctuation">.</span><span class="token function">CopyAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                richTextBox1<span class="token punctuation">.</span><span class="token function">Paste</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                test<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            richTextBox1<span class="token punctuation">.</span><span class="token function">SelectAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            richTextBox1<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">CCWordApp</span> test<span class="token punctuation">;</span>
            test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CCWordApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//上面代码正常</span>

            test<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>openFileDialog1<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            test<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            test<span class="token punctuation">.</span><span class="token function">PasetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            test<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            test<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CCWordApp</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Word<span class="token punctuation">.</span>ApplicationClass</span> oWordApplic<span class="token punctuation">;</span> <span class="token comment">// a reference to Word application </span>
        <span class="token keyword">private</span> <span class="token class-name">Word<span class="token punctuation">.</span>Document</span> oDoc<span class="token punctuation">;</span>   <span class="token comment">// a reference to the document </span>

        <span class="token keyword">public</span> <span class="token function">CCWordApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Word<span class="token punctuation">.</span>ApplicationClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Open</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strFileName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> fileName <span class="token operator">=</span> strFileName<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> readOnly <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> isVisible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>

            oDoc <span class="token operator">=</span> oWordApplic<span class="token punctuation">.</span>Documents<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token keyword">ref</span> fileName<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> readOnly<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> isVisible<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>

            oDoc<span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            oDoc <span class="token operator">=</span> oWordApplic<span class="token punctuation">.</span>Documents<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>

            oDoc<span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Quit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Application<span class="token punctuation">.</span><span class="token function">Quit</span><span class="token punctuation">(</span><span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oDoc<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SaveAs</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strFileName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> fileName <span class="token operator">=</span> strFileName<span class="token punctuation">;</span>

            oDoc<span class="token punctuation">.</span><span class="token function">SaveAs</span><span class="token punctuation">(</span><span class="token keyword">ref</span> fileName<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SaveAsHtml</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strFileName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> fileName <span class="token operator">=</span> strFileName<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> Format <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Word<span class="token punctuation">.</span>WdSaveFormat<span class="token punctuation">.</span>wdFormatHTML<span class="token punctuation">;</span>
            oDoc<span class="token punctuation">.</span><span class="token function">SaveAs</span><span class="token punctuation">(</span><span class="token keyword">ref</span> fileName<span class="token punctuation">,</span> <span class="token keyword">ref</span> Format<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
            oDoc<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CopyAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">WholeStory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PasetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">PasteAndFormat</span><span class="token punctuation">(</span>Word<span class="token punctuation">.</span>WdRecoveryType<span class="token punctuation">.</span>wdPasteDefault<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> Unit <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdCharacter<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> Count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">WholeStory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token keyword">ref</span> Unit<span class="token punctuation">,</span> <span class="token keyword">ref</span> Count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InsertText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strText<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">TypeText</span><span class="token punctuation">(</span>strText<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InsertLineBreak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">TypeParagraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InsertLineBreak</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nline<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nline<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">TypeParagraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetAlignment</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strType<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>strType<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Center&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>ParagraphFormat<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdParagraphAlignment<span class="token punctuation">.</span>wdAlignParagraphCenter<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Left&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>ParagraphFormat<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdParagraphAlignment<span class="token punctuation">.</span>wdAlignParagraphLeft<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Right&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>ParagraphFormat<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdParagraphAlignment<span class="token punctuation">.</span>wdAlignParagraphRight<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Justify&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>ParagraphFormat<span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdParagraphAlignment<span class="token punctuation">.</span>wdAlignParagraphJustify<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetFont</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strType<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>strType<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Bold&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Bold <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Italic&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Italic <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Underlined&quot;</span><span class="token punctuation">:</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Subscript <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Bold <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Italic <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Subscript <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetFontName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strType<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Name <span class="token operator">=</span> strType<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetFontSize</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nSize<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Font<span class="token punctuation">.</span>Size <span class="token operator">=</span> nSize<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InsertPagebreak</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> pBreak <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Word<span class="token punctuation">.</span>WdBreakType<span class="token punctuation">.</span>wdPageBreak<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">InsertBreak</span><span class="token punctuation">(</span><span class="token keyword">ref</span> pBreak<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GotoBookMark</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strBookMarkName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">object</span></span> Bookmark <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Word<span class="token punctuation">.</span>WdGoToItem<span class="token punctuation">.</span>wdGoToBookmark<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> NameBookMark <span class="token operator">=</span> strBookMarkName<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">GoTo</span><span class="token punctuation">(</span><span class="token keyword">ref</span> Bookmark<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> NameBookMark<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToTheEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> unit<span class="token punctuation">;</span>
            unit <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdStory<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">EndKey</span><span class="token punctuation">(</span><span class="token keyword">ref</span> unit<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToTheBeginning</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> unit<span class="token punctuation">;</span>
            unit <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdStory<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">HomeKey</span><span class="token punctuation">(</span><span class="token keyword">ref</span> unit<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToTheTable</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> ntable<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> what<span class="token punctuation">;</span>
            what <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdTable<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> which<span class="token punctuation">;</span>
            which <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdGoToDirection<span class="token punctuation">.</span>wdGoToFirst<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> count<span class="token punctuation">;</span>
            count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">GoTo</span><span class="token punctuation">(</span><span class="token keyword">ref</span> what<span class="token punctuation">,</span> <span class="token keyword">ref</span> which<span class="token punctuation">,</span> <span class="token keyword">ref</span> count<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Find<span class="token punctuation">.</span><span class="token function">ClearFormatting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToRightCell</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> direction<span class="token punctuation">;</span>
            direction <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdCell<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">MoveRight</span><span class="token punctuation">(</span><span class="token keyword">ref</span> direction<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToLeftCell</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>

            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> direction<span class="token punctuation">;</span>
            direction <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdCell<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">MoveLeft</span><span class="token punctuation">(</span><span class="token keyword">ref</span> direction<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToDownCell</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> direction<span class="token punctuation">;</span>
            direction <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdLine<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">MoveDown</span><span class="token punctuation">(</span><span class="token keyword">ref</span> direction<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GoToUpCell</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> direction<span class="token punctuation">;</span>
            direction <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdUnits<span class="token punctuation">.</span>wdLine<span class="token punctuation">;</span>
            oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span><span class="token function">MoveUp</span><span class="token punctuation">(</span><span class="token keyword">ref</span> direction<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">,</span> <span class="token keyword">ref</span> missing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InsertPageNumber</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strType<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bHeader<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> missing <span class="token operator">=</span> System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>Missing<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> alignment<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> bFirstPage <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> bF <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>strType<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Center&quot;</span><span class="token punctuation">:</span>
                    alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdPageNumberAlignment<span class="token punctuation">.</span>wdAlignPageNumberCenter<span class="token punctuation">;</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>HeaderFooter<span class="token punctuation">.</span>PageNumbers<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdPageNumberAlignment<span class="token punctuation">.</span>wdAlignPageNumberCenter<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Right&quot;</span><span class="token punctuation">:</span>
                    alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdPageNumberAlignment<span class="token punctuation">.</span>wdAlignPageNumberRight<span class="token punctuation">;</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>HeaderFooter<span class="token punctuation">.</span>PageNumbers<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdPageNumberAlignment<span class="token punctuation">.</span>wdAlignPageNumberRight<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;Left&quot;</span><span class="token punctuation">:</span>
                    alignment <span class="token operator">=</span> Word<span class="token punctuation">.</span>WdPageNumberAlignment<span class="token punctuation">.</span>wdAlignPageNumberLeft<span class="token punctuation">;</span>
                    oWordApplic<span class="token punctuation">.</span>Selection<span class="token punctuation">.</span>HeaderFooter<span class="token punctuation">.</span>PageNumbers<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">ref</span> alignment<span class="token punctuation">,</span> <span class="token keyword">ref</span> bFirstPage<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,6),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","filerw1.html.vue"]]);export{i as default};
