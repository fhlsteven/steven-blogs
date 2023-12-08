import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="几个比较好用的-windows-api-在c-中的用法" tabindex="-1"><a class="header-anchor" href="#几个比较好用的-windows-api-在c-中的用法" aria-hidden="true">#</a> 几个比较好用的 Windows API 在C#中的用法</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows Api 定义</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 模拟鼠标事件</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 鼠标事件的Enum</span>
<span class="token doc-comment comment">/// X座标</span>
<span class="token doc-comment comment">/// Y座标</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// </span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">mouse_event</span><span class="token punctuation">(</span><span class="token class-name">MouseEvents</span> dwFlags<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> dx<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> dy<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> cButtons<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> dwExtraInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 定义模拟鼠标的常数</span>
<span class="token doc-comment comment">/// </span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MouseEvents</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
<span class="token punctuation">{</span>
    MOUSEEVENTF_LEFTDOWN <span class="token operator">=</span> <span class="token number">0x2</span><span class="token punctuation">,</span>
    MOUSEEVENTF_LEFTUP <span class="token operator">=</span> <span class="token number">0x4</span><span class="token punctuation">,</span>
    MOUSEEVENTF_MIDDLEDOWN <span class="token operator">=</span> <span class="token number">0x20</span><span class="token punctuation">,</span>
    MOUSEEVENTF_MIDDLEUP <span class="token operator">=</span> <span class="token number">0x40</span><span class="token punctuation">,</span>
    MOUSEEVENTF_MOVE <span class="token operator">=</span> <span class="token number">0x1</span><span class="token punctuation">,</span>
    MOUSEEVENTF_ABSOLUTE <span class="token operator">=</span> <span class="token number">0x8000</span><span class="token punctuation">,</span>
    MOUSEEVENTF_RIGHTDOWN <span class="token operator">=</span> <span class="token number">0x8</span><span class="token punctuation">,</span>
    MOUSEEVENTF_RIGHTUP <span class="token operator">=</span> <span class="token number">0x10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 按指定标题寻找窗口，以获得指定窗口的句柄，为空则返回零。</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 如未知则设置为NULL</span>
<span class="token doc-comment comment">/// 窗口名</span>
<span class="token doc-comment comment">/// 整型数据，代表窗口句柄</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">FindWindow</span><span class="token punctuation">(</span><span class="token class-name">String</span> lpClassName<span class="token punctuation">,</span> <span class="token class-name">String</span> lpWindowName<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 根据窗口句柄，获得窗口的类名</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 窗口句柄</span>
<span class="token doc-comment comment">/// 缓冲区</span>
<span class="token doc-comment comment">/// 最大字节数</span>
<span class="token doc-comment comment">/// 整型，代表类名</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetClassName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hwnd<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span> buf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nMaxCount<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 根据窗口句柄，获得指定窗口的标题。</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 窗口句柄</span>
<span class="token doc-comment comment">/// 缓冲区</span>
<span class="token doc-comment comment">/// 最大字节数</span>
<span class="token doc-comment comment">/// 返回标题</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetWindowText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hwnd<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span> buf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nMaxCount<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 根据窗口句柄，设置指定窗口为前置窗口。</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 窗口句柄</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hwnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 根据窗口句柄和显示的样式，显示窗口。</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 窗口句柄</span>
<span class="token doc-comment comment">/// 显示窗口的样式。</span>
<span class="token doc-comment comment">/// 成功与否。</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ShowWindow</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name">nCmdShow</span> nCmdShow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">nCmdShow</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
<span class="token punctuation">{</span>
    SW_FORCEMINIMIZE <span class="token operator">=</span> <span class="token number">0x0</span><span class="token punctuation">,</span>
    SW_HIDE <span class="token operator">=</span> <span class="token number">0x1</span><span class="token punctuation">,</span>
    SW_MAXIMIZE <span class="token operator">=</span> <span class="token number">0x2</span><span class="token punctuation">,</span>
    SW_MINIMIZE <span class="token operator">=</span> <span class="token number">0x3</span><span class="token punctuation">,</span>
    SW_RESTORE <span class="token operator">=</span> <span class="token number">0x4</span><span class="token punctuation">,</span>
    SW_SHOW <span class="token operator">=</span> <span class="token number">0x5</span><span class="token punctuation">,</span>
    SW_SHOWDEFAULT <span class="token operator">=</span> <span class="token number">0x6</span><span class="token punctuation">,</span>
    SW_SHOWMAXIMIZED <span class="token operator">=</span> <span class="token number">0x7</span><span class="token punctuation">,</span>
    SW_SHOWMINIMIZED <span class="token operator">=</span> <span class="token number">0x8</span><span class="token punctuation">,</span>
    SW_SHOWMINNOACTIVE <span class="token operator">=</span> <span class="token number">0x9</span><span class="token punctuation">,</span>
    SW_SHOWNA <span class="token operator">=</span> <span class="token number">0xA</span><span class="token punctuation">,</span>
    SW_SHOWNOACTIVATE <span class="token operator">=</span> <span class="token number">0xB</span><span class="token punctuation">,</span>
    SW_SHOWNORMAL <span class="token operator">=</span> <span class="token number">0xC</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 捕捉当前鼠标位置</span>
<span class="token doc-comment comment">/// </span>
<span class="token doc-comment comment">/// 传入参数，代表鼠标的当前位置</span>
<span class="token doc-comment comment">/// </span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> <span class="token function">GetCursorPos</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span> lpPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
</code></pre></div>`,2),e=[o];function c(l,k){return s(),a("div",null,e)}const m=n(p,[["render",c],["__file","cspapi1.html.vue"]]);export{m as default};
