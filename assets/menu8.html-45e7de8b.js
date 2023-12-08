import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="向窗体的系统菜单添加菜单项" tabindex="-1"><a class="header-anchor" href="#向窗体的系统菜单添加菜单项" aria-hidden="true">#</a> 向窗体的系统菜单添加菜单项</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices<span class="token punctuation">.</span>DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetSystemMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hwnd<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">bool</span></span> bRevert<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices<span class="token punctuation">.</span>DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">AppendMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hMenu<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">int</span></span> wFlags<span class="token punctuation">,</span><span class="token class-name">IntPtr</span> wIDNewItem<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> lpNewItem<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MF_POPUP <span class="token operator">=</span> <span class="token number">0x0010</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MF_SEPARATOR <span class="token operator">=</span> <span class="token number">0x0800</span><span class="token punctuation">;</span>
</code></pre></div><p>将 mainMenu1 菜单添加到系统菜单</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IntPtr</span> mnuSystem<span class="token punctuation">;</span>
    mnuSystem<span class="token operator">=</span><span class="token function">GetSystemMenu</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">,</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">AppendMenu</span><span class="token punctuation">(</span>mnuSystem<span class="token punctuation">,</span> MF_SEPARATOR<span class="token punctuation">,</span> <span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token keyword">this</span><span class="token punctuation">.</span>mainMenu1<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">AppendMenu</span><span class="token punctuation">(</span>mnuSystem<span class="token punctuation">,</span>MF_POPUP<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>mainMenu1<span class="token punctuation">.</span>MenuItems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Handle<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>mainMenu1<span class="token punctuation">.</span>MenuItems<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">////////////////////////////////////////////////////////////////</span>
<span class="token comment">// MSDN Magazine — January 2004</span>
<span class="token comment">// If this code works, it was written by Paul DiLascia.</span>
<span class="token comment">// If not, I don&#39;t know who wrote it.</span>
<span class="token comment">// Compiles with Visual Studio .NET on Windows XP. Tab size=3.</span>
<span class="token comment">//</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">TraceWin</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">//////////////////</span>
<span class="token comment">// This class shows how to add items to the system menu in C#/.NET</span>
<span class="token comment">//</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SysMenu</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">// menu flags (from WinUser.h)</span>
    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MenuFlags</span> <span class="token punctuation">{</span>
        MF_INSERT <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_CHANGE <span class="token operator">=</span> <span class="token number">0x00000080</span><span class="token punctuation">,</span>
        MF_APPEND <span class="token operator">=</span> <span class="token number">0x00000100</span><span class="token punctuation">,</span>
        MF_DELETE <span class="token operator">=</span> <span class="token number">0x00000200</span><span class="token punctuation">,</span>
        MF_REMOVE <span class="token operator">=</span> <span class="token number">0x00001000</span><span class="token punctuation">,</span>
        MF_BYCOMMAND <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_BYPOSITION <span class="token operator">=</span> <span class="token number">0x00000400</span><span class="token punctuation">,</span>
        MF_SEPARATOR <span class="token operator">=</span> <span class="token number">0x00000800</span><span class="token punctuation">,</span>
        MF_ENABLED <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_GRAYED <span class="token operator">=</span> <span class="token number">0x00000001</span><span class="token punctuation">,</span>
        MF_DISABLED <span class="token operator">=</span> <span class="token number">0x00000002</span><span class="token punctuation">,</span>
        MF_UNCHECKED <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_CHECKED <span class="token operator">=</span> <span class="token number">0x00000008</span><span class="token punctuation">,</span>
        MF_USECHECKBITMAPS <span class="token operator">=</span> <span class="token number">0x00000200</span><span class="token punctuation">,</span>
        MF_STRING <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_BITMAP <span class="token operator">=</span> <span class="token number">0x00000004</span><span class="token punctuation">,</span>
        MF_OWNERDRAW <span class="token operator">=</span> <span class="token number">0x00000100</span><span class="token punctuation">,</span>
        MF_POPUP <span class="token operator">=</span> <span class="token number">0x00000010</span><span class="token punctuation">,</span>
        MF_MENUBARBREAK <span class="token operator">=</span> <span class="token number">0x00000020</span><span class="token punctuation">,</span>
        MF_MENUBREAK <span class="token operator">=</span> <span class="token number">0x00000040</span><span class="token punctuation">,</span>
        MF_UNHILITE <span class="token operator">=</span> <span class="token number">0x00000000</span><span class="token punctuation">,</span>
        MF_HILITE <span class="token operator">=</span> <span class="token number">0x00000080</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// WM_SYSCOMAND value from WinUser.h</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_SYSCOMMAND <span class="token operator">=</span> <span class="token number">0x0112</span><span class="token punctuation">;</span>

    <span class="token comment">// Windows API fns imported</span>
    <span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetSystemMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hwnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> bRevert<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">AppendMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hMenu<span class="token punctuation">,</span> <span class="token class-name">MenuFlags</span> uFlags<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> uIDNewItem<span class="token punctuation">,</span> <span class="token class-name">String</span> lpNewItem<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// My new command ID.</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IDC_MYCOMMAND <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">SysMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Check out the system menu, dude.&quot;</span><span class="token punctuation">;</span>
        Debug<span class="token punctuation">.</span>Listeners<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">TraceWinListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">IntPtr</span> hSysMenu <span class="token operator">=</span> <span class="token function">GetSystemMenu</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Handle<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// get handle to </span>
                                                        <span class="token comment">// system menu </span>
        <span class="token function">AppendMenu</span><span class="token punctuation">(</span>hSysMenu<span class="token punctuation">,</span> MenuFlags<span class="token punctuation">.</span>MF_SEPARATOR<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">AppendMenu</span><span class="token punctuation">(</span>hSysMenu<span class="token punctuation">,</span>
            MenuFlags<span class="token punctuation">.</span>MF_BYCOMMAND<span class="token operator">|</span>MenuFlags<span class="token punctuation">.</span>MF_STRING<span class="token operator">|</span>MenuFlags<span class="token punctuation">.</span>MF_CHECKED<span class="token punctuation">,</span>
            IDC_MYCOMMAND<span class="token punctuation">,</span> <span class="token string">&quot;Do you like interop?&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SysMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Message</span> msg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>msg<span class="token punctuation">.</span>Msg<span class="token operator">==</span>WM_SYSCOMMAND<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>WParam<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> IDC_MYCOMMAND<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            Trace<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Got IDC_MYCOMMAND&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Yeah, baby!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            msg<span class="token punctuation">.</span>Result <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span> <span class="token comment">// (not really necessary)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","menu8.html.vue"]]);export{i as default};
