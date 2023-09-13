import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="用c-实现语音技术" tabindex="-1"><a class="header-anchor" href="#用c-实现语音技术" aria-hidden="true">#</a> 用C#实现语音技术</h1><blockquote><p>源作者：追风 人气：5817</p></blockquote><p>“电脑朗读”(英文)一个很好的触发点，通过它可以实现电子小说阅读、英文听力测试、英文单词学习...</p><p>下面的Speech已对MSTTS作了简单封装。</p><p>1.安装好MSTTS（如果你有装金山词霸，系统就已经安装了）,可以在winnt\\speech中打到vtxtauto.tlb文件；</p><p>2.用.Net SDK自带的tlbimp工具把vtxtauto.tlb转换成.dll格式:</p><p><code>tlbimp vtxtauto.tlb /silent /namespace:mstts /out:mstts.dll</code></p><p>这时的mstts.dll已成为.net framework运行库的一个类。</p><p>3.编写一个封装vtxtauto的简单类:Speech.</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//========================Speech.cs======================</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">mstts</span><span class="token punctuation">;</span>  <span class="token comment">//MSTTS名称空间</span>
<span class="token keyword">namespace</span> <span class="token namespace">Bedlang</span> <span class="token punctuation">{</span>      <span class="token comment">//定义名称空间</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Speech</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">VTxtAuto</span> VTxtAutoEx<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">Speech</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            VTxtAutoEx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">VTxtAuto</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
            VTxtAutoEx<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">,</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//注册COM组件</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Speak</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">)</span><span class="token punctuation">{</span>
            VTxtAutoEx<span class="token punctuation">.</span><span class="token function">Speak</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//发音</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//========================Speech.cs======================</span>
</code></pre></div><p>4.编译Bedlang.Speech</p><p><code>csc /target:library /out:Bedlang.dll speech.cs /r:mstts.dll</code></p><p>如果用vs.net开发，可直接生成项目就可以了。</p><p>5.发音实现</p><p>分别加入Label,TextBox,Button控件各一个到windows Form中，修改它们的属性，源代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//========================demo.cs======================</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Bedlang</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">///</span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。</span>
    <span class="token doc-comment comment">///</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">demo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span> label1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// Windows 窗体设计器支持所必需的</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在 InitializeComponent 调用后添加任何构造函数代码</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">///</span>
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
        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Form Designer generated code</span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
        <span class="token doc-comment comment">/// 此方法的内容。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Label</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// label1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;label1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;输入要朗读的文字：&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// textBox1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">48</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Size <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">248</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// button1</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">112</span><span class="token punctuation">,</span> <span class="token number">112</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;button1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;朗读&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>button1_Click<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// demo</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">292</span><span class="token punctuation">,</span> <span class="token number">197</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>button1<span class="token punctuation">,</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">,</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>label1<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;demo&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;demo&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
        <span class="token doc-comment comment">///</span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">///</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Speech</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Speech</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//创建一个Speech对象</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                s<span class="token punctuation">.</span><span class="token function">Speak</span><span class="token punctuation">(</span><span class="token string">&quot;Please input letter.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//发音</span>
            <span class="token keyword">else</span>
                s<span class="token punctuation">.</span><span class="token function">Speak</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//========================demo.cs======================</span>
</code></pre></div><p>6.编译demo.cs</p><p><code>csc demo.cs /r:bedlang.dll</code> Vs.net环境下可直接编译成exe文件。</p><p>7.运行demo.exe</p><p>输入要要朗读的文字，程序就可朗读了啦.</p>`,20),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","mm1.html.vue"]]);export{i as default};
