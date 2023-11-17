import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="c-中如何定义和接收消息" tabindex="-1"><a class="header-anchor" href="#c-中如何定义和接收消息" aria-hidden="true">#</a> C# 中如何定义和接收消息？</h1><blockquote><p>作者： Wason www.ASPCool.com 时间:2001-9-28 18:31:29 阅读次数:2420</p></blockquote><p>业余学习成果: 终于把自定义消息给搞定,好事多多分享!</p><p>在C#中目前我还没有找到发送消息的类成员函数，所以只能采用通过调用WIN 32 API 的 <code>SendMessage()</code> 函数实现。由于 SendMessage的参数中需要得到窗体的句柄(handler) ，所以又要调用另一个API <code>FindWindow()</code>, 两者配合使用，达到在不同窗体之间的消息发送和接收功能。</p><p>另外一个要点是，需要通过重写(Override) 窗体的 DefWndProc() 过程来接收自定义的消息。DefWndProc 的重写：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DefWndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Message</span> m<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span>Msg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">:</span> 
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">DefWndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面是我的C#实践例程。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">///////////////////////////////////////// </span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token doc-comment comment">///file name: Note.cs</span>
<span class="token doc-comment comment">/// </span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Note</span>
<span class="token punctuation">{</span>
    <span class="token comment">//声明 API 函数</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;SendMessage&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">SendMessage</span><span class="token punctuation">(</span>
        <span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token comment">// handle to destination window</span>
        <span class="token class-name"><span class="token keyword">int</span></span> Msg<span class="token punctuation">,</span> <span class="token comment">// message</span>
        <span class="token class-name"><span class="token keyword">int</span></span> wParam<span class="token punctuation">,</span> <span class="token comment">// first message parameter</span>
        <span class="token keyword">int</span> lParam <span class="token comment">// second message parameter</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;FindWindow&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">FindWindow</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> lpClassName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpWindowName<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//定义消息常数</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> USER <span class="token operator">=</span> <span class="token number">0x500</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> TEST <span class="token operator">=</span> USER <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">//向窗体发送消息的函数</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendMsgToMainForm</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> MSG<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> WINDOW_HANDLER <span class="token operator">=</span> <span class="token function">FindWindow</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">@&quot;Note Pad&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>WINDOW_HANDLER <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Could not find Main window!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">SendMessage</span><span class="token punctuation">(</span>WINDOW_HANDLER<span class="token punctuation">,</span> MSG<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">///////////////////////////////////////// </span>
<span class="token doc-comment comment">/// File name : Form1.cs </span>
<span class="token doc-comment comment">/// 接收消息的窗体 </span>
<span class="token doc-comment comment">///</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// </span>
        <span class="token comment">// Required for Windows Form Designer support </span>
        <span class="token comment">// </span>
        <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// </span>
        <span class="token comment">// TODO: Add any constructor code after InitializeComponent call </span>
        <span class="token comment">// </span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/// 重写窗体的消息处理函数 </span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DefWndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Message</span> m<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span>Msg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//接收自定义消息 USER，并显示其参数 </span>
            <span class="token keyword">case</span> Note<span class="token punctuation">.</span>USER<span class="token punctuation">:</span>
                <span class="token class-name"><span class="token keyword">string</span></span> message <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;Received message!parameters are:{0},{1}&quot;</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>WParam<span class="token punctuation">,</span> m<span class="token punctuation">.</span>LParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>
                <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">DefWndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//Console.WriteLine(m.LParam); </span>
    <span class="token punctuation">}</span>
</code></pre></div><p>Wilson Wei</p>`,9),e=[o];function c(l,k){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","sysmsg2.html.vue"]]);export{i as default};
