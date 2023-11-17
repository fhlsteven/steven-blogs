import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="c-创建一个文件的快捷方式" tabindex="-1"><a class="header-anchor" href="#c-创建一个文件的快捷方式" aria-hidden="true">#</a> C#创建一个文件的快捷方式</h1><blockquote><p>www.wenhui.org 11/5/2002 CSharp vs Java</p></blockquote><p>您可以使用Interope,在您的项目中引入&quot;Windows Script Host Object Model&quot; COM library。</p><p>然后运行下面的代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">IWshRuntimeLibrary</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CreateShortcutCOM</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// This class creates a shortcut with COM interoperability</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">ShortcutDemo</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Get the app path and filename</span>
            <span class="token class-name"><span class="token keyword">string</span></span> app <span class="token operator">=</span> Environment<span class="token punctuation">.</span>CurrentDirectory <span class="token operator">+</span> <span class="token string">@&quot;\\CreateShortcutCOM.exe&quot;</span><span class="token punctuation">;</span>

            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// Create a Windows Script Host Shell class</span>
                <span class="token class-name">IWshShell_Class</span> shell <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IWshShell_ClassClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// Define the shortcut file</span>
                <span class="token class-name">IWshShortcut_Class</span> shortcut <span class="token operator">=</span> shell<span class="token punctuation">.</span><span class="token function">CreateShortcut</span><span class="token punctuation">(</span>app <span class="token operator">+</span> <span class="token string">&quot;.lnk&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token class-name">IWshShortcut_Class</span><span class="token punctuation">;</span>
                <span class="token comment">// Set all its properties</span>
                shortcut<span class="token punctuation">.</span>Description <span class="token operator">=</span> <span class="token string">&quot;Smart sample of creating shell shortcut&quot;</span><span class="token punctuation">;</span>
                shortcut<span class="token punctuation">.</span>TargetPath <span class="token operator">=</span> app<span class="token punctuation">;</span>
                shortcut<span class="token punctuation">.</span>IconLocation <span class="token operator">=</span> app <span class="token operator">+</span> <span class="token string">&quot;,0&quot;</span><span class="token punctuation">;</span>
                <span class="token comment">// Save it</span>
                shortcut<span class="token punctuation">.</span><span class="token function">Save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">COMException</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>原作者：痕迹
来 源：本站
共有169位读者阅读过此文
</code></pre></div>`,6),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysop13.html.vue"]]);export{i as default};
