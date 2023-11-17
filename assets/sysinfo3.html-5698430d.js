import{_ as s,o as n,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="如何读取windows注册表信息" tabindex="-1"><a class="header-anchor" href="#如何读取windows注册表信息" aria-hidden="true">#</a> 如何读取Windows注册表信息</h1><blockquote><p>转载自：ASP中华网 人气：4290</p></blockquote><p>在介绍如何读取注册表信息前，先解释如何增加注册条目。</p><h2 id="_1、增加注册表数据" tabindex="-1"><a class="header-anchor" href="#_1、增加注册表数据" aria-hidden="true">#</a> 1、增加注册表数据</h2><p>以下文本是实际的注册信息。将这个内容复制并粘贴到一个文本文件中，将其保存扩展名为.reg的文件，然后双击这个文件进行注册表内容的输入操作。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/*Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\\Software\\TAW\\BSE]
&quot;DSN&quot;=&quot;TAWReports&quot;
&quot;User&quot;=&quot;TAW1&quot;
&quot;Password&quot;=&quot;taw1.1&quot;
&quot;Server&quot;=&quot;dbserver&quot;
&quot;IP&quot;=&quot;&quot;
*/</span>
</code></pre></div><h2 id="_2、阅读注册数据" tabindex="-1"><a class="header-anchor" href="#_2、阅读注册数据" aria-hidden="true">#</a> 2、阅读注册数据</h2><p>2.1 创建两个RegistryKey变量。</p><p>2.2 创建一个内含od对象的类，第一个参数为HKEY（主根关键字名），第二个为&quot;&quot;，表示本地机器。</p><p>2.3 在要阅读信息的地方创建子关键字。</p><p>2.4 用RegistryKey类的Getvalue方法来读取某一特定节点关键字信息的数据。在这里，DSN,Server,Password就是节点。</p><p>以下代码读取刚才加入到注册表中的注册数据：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">CONAPP</span> <span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Class1</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">Class1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// TODO: Add Constructor Logic here</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">RegistryKey</span> SUBKEY<span class="token punctuation">;</span>
            <span class="token class-name">RegistryKey</span> TAWKAY <span class="token operator">=</span> RegistryKey<span class="token punctuation">.</span><span class="token function">OpenRemoteBaseKey</span><span class="token punctuation">(</span>Microsoft<span class="token punctuation">.</span>Win32<span class="token punctuation">.</span>RegistryHive<span class="token punctuation">.</span>CurrentUser<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">string</span></span> subkey <span class="token operator">=</span> <span class="token string">&quot;Software\\\\TAW\\\\BSE&quot;</span><span class="token punctuation">;</span>
            SUBKEY <span class="token operator">=</span> TAWKAY<span class="token punctuation">.</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>subkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> dsn <span class="token operator">=</span> SUBKEY<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token string">&quot;DSN&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> user <span class="token operator">=</span> SUBKEY<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> password <span class="token operator">=</span> SUBKEY<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> server <span class="token operator">=</span> SUBKEY<span class="token punctuation">.</span><span class="token function">GetValue</span><span class="token punctuation">(</span><span class="token string">&quot;server&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,13),e=[o];function c(u,l){return n(),a("div",null,e)}const i=s(p,[["render",c],["__file","sysinfo3.html.vue"]]);export{i as default};
