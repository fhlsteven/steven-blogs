import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="关于硬盘序列号的类" tabindex="-1"><a class="header-anchor" href="#关于硬盘序列号的类" aria-hidden="true">#</a> 关于硬盘序列号的类</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Win32</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">Wjb<span class="token punctuation">.</span>ReadOrWriteIniAndReg</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// HardDiskVal 的摘要说明。</span>
    <span class="token doc-comment comment">/// 读取指定盘符的硬盘序列号</span>
    <span class="token doc-comment comment">/// 功能：读取指定盘符的硬盘序列号</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HardDiskVal</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetVolumeInformation</span><span class="token punctuation">(</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpRootPathName<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpVolumeNameBuffer<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nVolumeNameSize<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lpVolumeSerialNumber<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpMaximumComponentLength<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpFileSystemFlags<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpFileSystemNameBuffer<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nFileSystemNameSize
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 获得盘符为drvID的硬盘序列号，缺省为C</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>drvID<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">HDVal</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> drvID<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_FILENAME_LEN <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> retVal <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> str1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> str2 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token function">GetVolumeInformation</span><span class="token punctuation">(</span>
                drvID <span class="token operator">+</span> <span class="token string">@&quot;:\\&quot;,
                str1,
                MAX_FILENAME_LEN,
                ref retVal,
                a,
                b,
                str2,
                MAX_FILENAME_LEN
            );
            return retVal.ToString();
        }

        public string HDVal()
        {
            const int MAX_FILENAME_LEN = 256;
            int retVal = 0;
            int a = 0;
            int b = 0;
            string str1 = null;
            string str2 = null;
            int i = GetVolumeInformation(
                &quot;</span>c<span class="token punctuation">:</span>\\\\&quot;<span class="token punctuation">,</span>
                str1<span class="token punctuation">,</span>
                MAX_FILENAME_LEN<span class="token punctuation">,</span>
                <span class="token keyword">ref</span> retVal<span class="token punctuation">,</span>
                a<span class="token punctuation">,</span>
                b<span class="token punctuation">,</span>
                str2<span class="token punctuation">,</span>
                MAX_FILENAME_LEN
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> retVal<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(l,k){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","hardctr6.html.vue"]]);export{r as default};
