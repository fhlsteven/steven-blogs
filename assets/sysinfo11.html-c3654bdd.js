import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="文件关联" tabindex="-1"><a class="header-anchor" href="#文件关联" aria-hidden="true">#</a> 文件关联</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>  <span class="token comment">//判断启动程序是否带参数</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> FileExt <span class="token operator">=</span> <span class="token string">&quot;.test&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> FileType <span class="token operator">=</span> <span class="token string">&quot;Test File&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> MIMEType <span class="token operator">=</span> <span class="token string">&quot;text/plain&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> ExeApp <span class="token operator">=</span> Application<span class="token punctuation">.</span>ExecutablePath <span class="token operator">+</span> <span class="token string">&quot; %1&quot;</span><span class="token punctuation">;</span>

        <span class="token class-name">RegistryKey</span> RegKey<span class="token punctuation">;</span>
        RegKey <span class="token operator">=</span> Registry<span class="token punctuation">.</span>ClassesRoot<span class="token punctuation">;</span>
        RegKey <span class="token operator">=</span> RegKey<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span>FileExt<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//创建.test项</span>

        RegKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> FileType<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//设置默认 </span>
        RegKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;Content Type&quot;</span><span class="token punctuation">,</span> MIMEType<span class="token punctuation">)</span><span class="token punctuation">;</span>

        RegKey <span class="token operator">=</span> RegKey<span class="token punctuation">.</span><span class="token function">CreateSubKey</span><span class="token punctuation">(</span><span class="token string">&quot;shell\\\\open\\\\command&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//在.test下创建执行程序的键值分支</span>
        RegKey<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> ExeApp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        RegKey<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    strFile <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">//将参数指定的文件名赋给变量</span>
    Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>richTextBox1<span class="token punctuation">.</span><span class="token function">LoadFile</span><span class="token punctuation">(</span>strFile<span class="token punctuation">,</span> RichTextBoxStreamType<span class="token punctuation">.</span>PlainText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysinfo11.html.vue"]]);export{i as default};
