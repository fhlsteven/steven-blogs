import{_ as n,o as s,c as a,a as t}from"./app-382facc7.js";const p={},o=t(`<h1 id="c-调用win32api系列二列举局网内共享打印机" tabindex="-1"><a class="header-anchor" href="#c-调用win32api系列二列举局网内共享打印机" aria-hidden="true">#</a> C#调用WIN32API系列二列举局网内共享打印机</h1><blockquote><p>你是第56位浏览该文章的人 romatic(收藏) csdn 2003-8-3</p></blockquote><p>首先我们看看<code>EnumPrinters</code>函数的定义</p><div class="language-c" data-ext="c"><pre class="language-c"><code>BOOL <span class="token function">EnumPrinters</span><span class="token punctuation">(</span>
    DWORD Flags<span class="token punctuation">,</span> <span class="token comment">// printer object types</span>
    LPTSTR Name<span class="token punctuation">,</span> <span class="token comment">// name of printer object</span>
    DWORD Level<span class="token punctuation">,</span> <span class="token comment">// information level</span>
    LPBYTE pPrinterEnum<span class="token punctuation">,</span> <span class="token comment">// printer information buffer</span>
    DWORD cbBuf<span class="token punctuation">,</span> <span class="token comment">// size of printer information buffer</span>
    LPDWORD pcbNeeded<span class="token punctuation">,</span> <span class="token comment">// bytes received or required</span>
    LPDWORD pcReturned <span class="token comment">// number of printers enumerated</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这个api有几个返回参数, 其中最重要的是pPrinterEnum所指的缓冲区中，是一个<code>PRINTER_INFO_N</code>的结构数组, 这里N根据Level参数而变化, 这里我们用的是1, 所以用到的结构是</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_PRINTER_INFO_1</span> <span class="token punctuation">{</span>
    DWORD Flags<span class="token punctuation">;</span>
    LPTSTR pDescription<span class="token punctuation">;</span>
    LPTSTR pName<span class="token punctuation">;</span>
    LPTSTR pComment<span class="token punctuation">;</span>
<span class="token punctuation">}</span> PRINTER_INFO_1
</code></pre></div><p>C#要调用API首先要引入动态库，EnumPrinters在winspool.drv这个动态库中。引入语句如下</p><p><code>[DllImport(&quot;winspool.drv&quot;, CharSet=CharSet.Auto)]</code></p><p>然后是定义<code>PRINTER_INFO_1</code>结构</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> CharSet<span class="token operator">=</span>CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">struct</span> <span class="token class-name">PRINTER_INFO_1</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> flags<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pDescription<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pName<span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pComment<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，全部的源代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Printing</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuickTest</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;winspool.drv&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">EnumPrinters</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> flags<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> level<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> pPrinterEnum<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> cbBuf<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> pcbNeeded<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">int</span></span> pcReturned<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> PRINTER_ENUM_NETWORK <span class="token operator">=</span> <span class="token number">0x00000040</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> PRINTER_ENUM_LOCAL <span class="token operator">=</span> <span class="token number">0x00000002</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> PRINTER_ENUM_REMOTE <span class="token operator">=</span> <span class="token number">0x00000010</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">struct</span> <span class="token class-name">PRINTER_INFO_1</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> flags<span class="token punctuation">;</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pDescription<span class="token punctuation">;</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pName<span class="token punctuation">;</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>LPTStr<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> pComment<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EnumeratePrintersWin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> Success<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> cbRequired<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nEntries<span class="token punctuation">;</span>

        <span class="token class-name">IntPtr</span> outb <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>

        Success <span class="token operator">=</span> <span class="token function">EnumPrinters</span><span class="token punctuation">(</span>PRINTER_ENUM_NETWORK <span class="token operator">|</span> PRINTER_ENUM_LOCAL <span class="token operator">|</span> PRINTER_ENUM_REMOTE<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> outb<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">out</span> cbRequired<span class="token punctuation">,</span> <span class="token keyword">out</span> nEntries<span class="token punctuation">)</span><span class="token punctuation">;</span>
        outb <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">AllocHGlobal</span><span class="token punctuation">(</span>cbRequired<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Success <span class="token operator">=</span> <span class="token function">EnumPrinters</span><span class="token punctuation">(</span>PRINTER_ENUM_NETWORK <span class="token operator">|</span> PRINTER_ENUM_LOCAL <span class="token operator">|</span> PRINTER_ENUM_REMOTE<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> outb<span class="token punctuation">,</span> cbRequired<span class="token punctuation">,</span> <span class="token keyword">out</span> cbRequired<span class="token punctuation">,</span> <span class="token keyword">out</span> nEntries<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">PRINTER_INFO_1<span class="token punctuation">[</span><span class="token punctuation">]</span></span> portsArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PRINTER_INFO_1</span><span class="token punctuation">[</span>cbRequired<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token class-name">IntPtr</span> current <span class="token operator">=</span> outb<span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> portsArray<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                portsArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>PRINTER_INFO_1<span class="token punctuation">)</span>Marshal<span class="token punctuation">.</span><span class="token function">PtrToStructure</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">PRINTER_INFO_1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                current <span class="token operator">=</span> <span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>current <span class="token operator">+</span> Marshal<span class="token punctuation">.</span><span class="token function">SizeOf</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">PRINTER_INFO_1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">&quot;: \\n&quot;</span> <span class="token operator">+</span> portsArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pName <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> portsArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pDescription <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> portsArray<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pComment <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Console.WriteLine(exp.StackTrace);</span>
        <span class="token punctuation">}</span>
        Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>outb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token function">QuickTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">QuickTest</span> qt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">QuickTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        qt<span class="token punctuation">.</span><span class="token function">EnumeratePrintersWin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,12),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode12.html.vue"]]);export{i as default};
