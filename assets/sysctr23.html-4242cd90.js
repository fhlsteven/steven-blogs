import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-f0851ed3.js";const l={},k={id:"如何获得-windows-版本-c-版",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#如何获得-windows-版本-c-版","aria-hidden":"true"},"#",-1),r={href:"http://blog.csdn.net/uponce/archive/2004/12/20/223305.aspx",target:"_blank",rel:"noopener noreferrer"},d=u(`<div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">GetWindowsVersion</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OSVersionInfo</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> OSVersionInfoSize<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> MajorVersion<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> MinorVersion<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> BuildNumber<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> PlatformId<span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> versionString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">OSVersionInfo2</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> OSVersionInfoSize<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> MajorVersion<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> MinorVersion<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> BuildNumber<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> PlatformId<span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token class-name">String</span> versionString<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LibWrap</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">GetVersionEx</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">In</span><span class="token punctuation">,</span> <span class="token class-name">Out</span></span><span class="token punctuation">]</span> <span class="token class-name">OSVersionInfo</span> osvi<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;GetVersionEx&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">GetVersionEx2</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">OSVersionInfo2</span> osvi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">App</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nPassing OSVersionInfo as class&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">OSVersionInfo</span> osvi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OSVersionInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            osvi<span class="token punctuation">.</span>OSVersionInfoSize <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>osvi<span class="token punctuation">)</span><span class="token punctuation">;</span>

            LibWrap<span class="token punctuation">.</span><span class="token function">GetVersionEx</span><span class="token punctuation">(</span>osvi<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Class size: {0} \\nOperation System : {1}\\nPack: {2}&quot;</span><span class="token punctuation">,</span> osvi<span class="token punctuation">.</span>OSVersionInfoSize<span class="token punctuation">,</span> <span class="token function">OpSysName</span><span class="token punctuation">(</span>osvi<span class="token punctuation">.</span>MajorVersion<span class="token punctuation">,</span> osvi<span class="token punctuation">.</span>MinorVersion<span class="token punctuation">,</span> osvi<span class="token punctuation">.</span>PlatformId<span class="token punctuation">)</span><span class="token punctuation">,</span> osvi<span class="token punctuation">.</span>versionString<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;{0}&quot;</span><span class="token punctuation">,</span> osvi<span class="token punctuation">.</span>PlatformId<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nPassing OSVersionInfo as struct&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">OSVersionInfo2</span> osvi2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OSVersionInfo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            osvi2<span class="token punctuation">.</span>OSVersionInfoSize <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span>osvi2<span class="token punctuation">)</span><span class="token punctuation">;</span>

            LibWrap<span class="token punctuation">.</span><span class="token function">GetVersionEx2</span><span class="token punctuation">(</span><span class="token keyword">ref</span> osvi2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Static size: {0} \\nOperation System : {1}\\nPack: {2}&quot;</span><span class="token punctuation">,</span> osvi2<span class="token punctuation">.</span>OSVersionInfoSize<span class="token punctuation">,</span> <span class="token function">OpSysName</span><span class="token punctuation">(</span>osvi2<span class="token punctuation">.</span>MajorVersion<span class="token punctuation">,</span> osvi2<span class="token punctuation">.</span>MinorVersion<span class="token punctuation">,</span> osvi2<span class="token punctuation">.</span>PlatformId<span class="token punctuation">)</span><span class="token punctuation">,</span> osvi2<span class="token punctuation">.</span>versionString<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">String</span> <span class="token function">OpSysName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> MajorVersion<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> MinorVersion<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> PlatformId<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">String</span> str_opn <span class="token operator">=</span> String<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;{0}.{1}&quot;</span><span class="token punctuation">,</span> MajorVersion<span class="token punctuation">,</span> MinorVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">switch</span> <span class="token punctuation">(</span>str_opn<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">&quot;4.0&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token function">win95_nt40</span><span class="token punctuation">(</span>PlatformId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;4.10&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows 98&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;4.90&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows Me&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;3.51&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows NT 3.51&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;5.0&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windwos 2000&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;5.1&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windwos XP&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">&quot;5.2&quot;</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows Server 2003 family&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;This windows version is not distinguish!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">String</span> <span class="token function">win95_nt40</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> PlatformId<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>PlatformId<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows 95&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token number">2</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;Windows NT 4.0&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token punctuation">:</span>
                    <span class="token keyword">return</span> <span class="token string">&quot;This windows version is not distinguish!&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,1);function y(w,m){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("如何获得 WINDOWS 版本[C# 版]"),c(a)])]),d])}const g=t(l,[["render",y],["__file","sysctr23.html.vue"]]);export{g as default};
