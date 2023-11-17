import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="c-中实现改变显示器的分辨率-原码" tabindex="-1"><a class="header-anchor" href="#c-中实现改变显示器的分辨率-原码" aria-hidden="true">#</a> C#中实现改变显示器的分辨率(原码)</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ScreenResolution</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">DMDO</span>
        <span class="token punctuation">{</span>
            DEFAULT <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
            D90 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
            D180 <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
            D270 <span class="token operator">=</span> <span class="token number">3</span>
        <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">struct</span> <span class="token class-name">DEVMODE</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_DISPLAYFREQUENCY <span class="token operator">=</span> <span class="token number">0x400000</span><span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_PELSWIDTH <span class="token operator">=</span> <span class="token number">0x80000</span><span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> DM_PELSHEIGHT <span class="token operator">=</span> <span class="token number">0x100000</span><span class="token punctuation">;</span>
            <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CCHDEVICENAME <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>
            <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CCHFORMNAME <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>

            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> CCHDEVICENAME<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> dmDeviceName<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmSpecVersion<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDriverVersion<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmSize<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDriverExtra<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmFields<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPositionX<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPositionY<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name">DMDO</span> dmDisplayOrientation<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFixedOutput<span class="token punctuation">;</span>

            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmColor<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmDuplex<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmYResolution<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmTTOption<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmCollate<span class="token punctuation">;</span>
            <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValTStr<span class="token punctuation">,</span> SizeConst <span class="token operator">=</span> CCHFORMNAME<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> dmFormName<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">short</span></span> dmLogPixels<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmBitsPerPel<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPelsWidth<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPelsHeight<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFlags<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDisplayFrequency<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmICMMethod<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmICMIntent<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmMediaType<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmDitherType<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmReserved1<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmReserved2<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPanningWidth<span class="token punctuation">;</span>
            <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> dmPanningHeight<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token comment">//static extern int ChangeDisplaySettings( DEVMODE lpDevMode, int dwFlags); </span>

        <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">ChangeDisplaySettings</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">In</span></span><span class="token punctuation">]</span> <span class="token keyword">ref</span> <span class="token class-name">DEVMODE</span> lpDevMode<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwFlags<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">292</span><span class="token punctuation">,</span> <span class="token number">273</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;改变屏幕分辨率的例子&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Form1</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            r<span class="token punctuation">.</span><span class="token function">ChangeRes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ChangeRes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Form1</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">long</span></span> RetVal <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">DEVMODE</span> dm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DEVMODE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmSize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span>Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">DEVMODE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmPelsWidth <span class="token operator">=</span> <span class="token number">1024</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmPelsHeight <span class="token operator">=</span> <span class="token number">768</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmDisplayFrequency <span class="token operator">=</span> <span class="token number">85</span><span class="token punctuation">;</span>
            dm<span class="token punctuation">.</span>dmFields <span class="token operator">=</span> DEVMODE<span class="token punctuation">.</span>DM_PELSWIDTH <span class="token operator">|</span> DEVMODE<span class="token punctuation">.</span>DM_PELSHEIGHT <span class="token operator">|</span> DEVMODE<span class="token punctuation">.</span>DM_DISPLAYFREQUENCY<span class="token punctuation">;</span>
            RetVal <span class="token operator">=</span> <span class="token function">ChangeDisplaySettings</span><span class="token punctuation">(</span><span class="token keyword">ref</span> dm<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(l,k){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","hardctr5.html.vue"]]);export{i as default};
