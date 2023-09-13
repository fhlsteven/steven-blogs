import{_ as n,o as s,c as a,a as p}from"./app-477de5b2.js";const t={},o=p(`<h1 id="由文件名获取文件图标-原码" tabindex="-1"><a class="header-anchor" href="#由文件名获取文件图标-原码" aria-hidden="true">#</a> 由文件名获取文件图标（原码）</h1><blockquote><p>作者：痕迹</p></blockquote><p>核心代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">WindowsAppTmp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExtractIcon</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Shell32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SHGetFileInfo
         <span class="token punctuation">(</span>
         <span class="token class-name"><span class="token keyword">string</span></span> pszPath<span class="token punctuation">,</span>
         <span class="token class-name"><span class="token keyword">uint</span></span> dwFileAttributes<span class="token punctuation">,</span>
         <span class="token keyword">out</span> <span class="token class-name">SHFILEINFO</span> psfi<span class="token punctuation">,</span>
         <span class="token class-name"><span class="token keyword">uint</span></span> cbfileInfo<span class="token punctuation">,</span>
         <span class="token class-name">SHGFI</span> uFlags
         <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">struct</span> <span class="token class-name">SHFILEINFO</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token function">SHFILEINFO</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> b<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                hIcon <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span> iIcon <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> dwAttributes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> szDisplayName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span> szTypeName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> hIcon<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> iIcon<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> dwAttributes<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> <span class="token number">260</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szDisplayName<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szTypeName<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token function">ExtractIcon</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">enum</span> <span class="token class-name">SHGFI</span>
        <span class="token punctuation">{</span>
            SmallIcon <span class="token operator">=</span> <span class="token number">0x00000001</span><span class="token punctuation">,</span>
            LargeIcon <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
            Icon <span class="token operator">=</span> <span class="token number">0x00000100</span><span class="token punctuation">,</span>
            DisplayName <span class="token operator">=</span> <span class="token number">0x00000200</span><span class="token punctuation">,</span>
            Typename <span class="token operator">=</span> <span class="token number">0x00000400</span><span class="token punctuation">,</span>
            SysIconIndex <span class="token operator">=</span> <span class="token number">0x00004000</span><span class="token punctuation">,</span>
            UseFileAttributes <span class="token operator">=</span> <span class="token number">0x00000010</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Icon</span> <span class="token function">GetIcon</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bSmall<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">SHFILEINFO</span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SHFILEINFO</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> cbFileInfo <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SHGFI</span> flags<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bSmall<span class="token punctuation">)</span>
                flags <span class="token operator">=</span> SHGFI<span class="token punctuation">.</span>Icon <span class="token operator">|</span> SHGFI<span class="token punctuation">.</span>SmallIcon <span class="token operator">|</span> SHGFI<span class="token punctuation">.</span>UseFileAttributes<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                flags <span class="token operator">=</span> SHGFI<span class="token punctuation">.</span>Icon <span class="token operator">|</span> SHGFI<span class="token punctuation">.</span>LargeIcon <span class="token operator">|</span> SHGFI<span class="token punctuation">.</span>UseFileAttributes<span class="token punctuation">;</span>

            <span class="token function">SHGetFileInfo</span><span class="token punctuation">(</span>strPath<span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">,</span> <span class="token keyword">out</span> info<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">uint</span><span class="token punctuation">)</span>cbFileInfo<span class="token punctuation">,</span> flags<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> Icon<span class="token punctuation">.</span><span class="token function">FromHandle</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>hIcon<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Powered by DvNews.net
来源：uncj.net
阅读：197 次
日期：2003-7-1
</code></pre></div>`,5),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","folder5.html.vue"]]);export{i as default};
