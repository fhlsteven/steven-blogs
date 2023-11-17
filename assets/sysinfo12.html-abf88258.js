import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="获取系统中可用的驱动器列表" tabindex="-1"><a class="header-anchor" href="#获取系统中可用的驱动器列表" aria-hidden="true">#</a> 获取系统中可用的驱动器列表</h1><p><strong>实现</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">SHFILEINFO</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> hIcon<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> iIcon<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dwAttributes<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szDisplayName<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> szTypeName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;shell32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">SHGetFileInfo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> pszPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwFileAttributes<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">SHFILEINFO</span> psfi<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> cbFileInfo<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> uFlags<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SHGFI_ICON <span class="token operator">=</span> <span class="token number">0x0100</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SHGFI_LARGEICON <span class="token operator">=</span> <span class="token number">0x0000</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> drives<span class="token punctuation">;</span>
<span class="token class-name">ImageList</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ImageList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><strong>获得列表</strong>：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>LargeImageList <span class="token operator">=</span> img<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>SmallImageList <span class="token operator">=</span> img<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>StateImageList <span class="token operator">=</span> img<span class="token punctuation">;</span>

    drives <span class="token operator">=</span> Environment<span class="token punctuation">.</span><span class="token function">GetLogicalDrives</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> drives<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>  <span class="token comment">//枚举驱动器</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> str_temp <span class="token operator">=</span> drives<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>str_temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>listView1<span class="token punctuation">.</span>Items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>ImageIndex <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//获得相应的图标</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> drives<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">SHFILEINFO</span> FileInfo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SHFILEINFO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">SHGetFileInfo</span><span class="token punctuation">(</span>drives<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">ref</span> FileInfo<span class="token punctuation">,</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>FileInfo<span class="token punctuation">)</span><span class="token punctuation">,</span> SHGFI_ICON <span class="token operator">|</span> SHGFI_LARGEICON<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Icon</span> myIcon<span class="token punctuation">;</span>
        myIcon <span class="token operator">=</span> Icon<span class="token punctuation">.</span><span class="token function">FromHandle</span><span class="token punctuation">(</span>FileInfo<span class="token punctuation">.</span>hIcon<span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>Images<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>myIcon<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","sysinfo12.html.vue"]]);export{i as default};
