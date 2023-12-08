import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as l}from"./app-f0851ed3.js";const u="/steven-blogs/assets/sysmsg4_1-4e4705d2.png",k={},i=n("h1",{id:"在c-中使用热键隐含窗口",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#在c-中使用热键隐含窗口","aria-hidden":"true"},"#"),s(" 在C#中使用热键隐含窗口")],-1),r=n("blockquote",null,[n("p",null,"作者：热键")],-1),m={href:"http://www.codeproject.com/csharp/WindowHider/WindowHiderSource.zip",target:"_blank",rel:"noopener noreferrer"},d=l('<p><img src="'+u+`" alt="img_1"></p><p>我们曾经想过能够在我们的计算机上将窗口隐蔽起来，不想被从身边走过的老板看见。尝试便捷的Windows隐藏并定义热键来控制它们。下面我们将演示如何通过热键，我们将会用到DllImports of Win32 API、CallBacks/Delegates，定制事件与事件的句柄。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WindowHider</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Object used to control a Windows Form. </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Window</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Win32 API Imports </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nCmdShow<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsIconic</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsZoomed</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetForegroundWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetWindowThreadProcessId</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> ProcessId<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">AttachThreadInput</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> idAttach<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> idAttachTo<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> fAttach<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Win32 API Constants for ShowWindowAsync() </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_HIDE <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_SHOWNORMAL <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_SHOWMINIMIZED <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_SHOWMAXIMIZED <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_SHOWNOACTIVATE <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_RESTORE <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SW_SHOWDEFAULT <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Private Fields </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">private</span> <span class="token class-name">IntPtr</span> m_hWnd<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_Title<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_Process<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_WasMax <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Window Object&#39;s Public Properties </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token return-type class-name">IntPtr</span> hWnd
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_hWnd<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_Title<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Process
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_Process<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Sets this Window Object&#39;s visibility </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> Visible
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> m_Visible<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//show the window </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>m_WasMax<span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> SW_SHOWMAXIMIZED<span class="token punctuation">)</span><span class="token punctuation">)</span>
                            m_Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> SW_SHOWNORMAL<span class="token punctuation">)</span><span class="token punctuation">)</span>
                            m_Visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token comment">//hide the window </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    m_WasMax <span class="token operator">=</span> <span class="token function">IsZoomed</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> SW_HIDE<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        m_Visible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Constructs a Window Object </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Title Caption<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hWnd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Handle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Process<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Owning Process<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token function">Window</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Title<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> Process<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_Title <span class="token operator">=</span> Title<span class="token punctuation">;</span>
            m_hWnd <span class="token operator">=</span> hWnd<span class="token punctuation">;</span>
            m_Process <span class="token operator">=</span> Process<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//Override ToString()  </span>
        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//return the title if it has one, if not return the process name </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>m_Title<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> m_Title<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> m_Process<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Sets focus to this Window Object </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>m_hWnd <span class="token operator">==</span> <span class="token function">GetForegroundWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>

            <span class="token class-name">IntPtr</span> ThreadID1 <span class="token operator">=</span> <span class="token function">GetWindowThreadProcessId</span><span class="token punctuation">(</span><span class="token function">GetForegroundWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">IntPtr</span> ThreadID2 <span class="token operator">=</span> <span class="token function">GetWindowThreadProcessId</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>ThreadID1 <span class="token operator">!=</span> ThreadID2<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">AttachThreadInput</span><span class="token punctuation">(</span>ThreadID1<span class="token punctuation">,</span> ThreadID2<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">AttachThreadInput</span><span class="token punctuation">(</span>ThreadID1<span class="token punctuation">,</span> ThreadID2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">IsIconic</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> SW_RESTORE<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>m_hWnd<span class="token punctuation">,</span> SW_SHOWNORMAL<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Collection used to enumerate Window Objects </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Windows</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEnumerable</span><span class="token punctuation">,</span> <span class="token class-name">IEnumerator</span></span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Win32 API Imports </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetWindowText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> title<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetWindowModuleFileName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> title<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">EnumWindows</span><span class="token punctuation">(</span><span class="token class-name">EnumWindowsProc</span> ewp<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsWindowVisible</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//delegate used for EnumWindows() callback function </span>
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">EnumWindowsProc</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> m_Position <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// holds current index of wndArray,  </span>
                                     <span class="token comment">// necessary for IEnumerable </span>

        <span class="token class-name">ArrayList</span> wndArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//array of windows </span>

        <span class="token comment">//Object&#39;s private fields </span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_invisible <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> m_notitle <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Collection Constructor with additional options </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Invisible<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Include invisible Windows<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Untitled<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Include untitled Windows<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token function">Windows</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> Invisible<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> Untitled<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_invisible <span class="token operator">=</span> Invisible<span class="token punctuation">;</span>
            m_notitle <span class="token operator">=</span> Untitled<span class="token punctuation">;</span>

            <span class="token comment">//Declare a callback delegate for EnumWindows() API call </span>
            <span class="token class-name">EnumWindowsProc</span> ewp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EnumWindowsProc</span><span class="token punctuation">(</span>EvalWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Enumerate all Windows </span>
            <span class="token function">EnumWindows</span><span class="token punctuation">(</span>ewp<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// Collection Constructor </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">public</span> <span class="token function">Windows</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Declare a callback delegate for EnumWindows() API call </span>
            <span class="token class-name">EnumWindowsProc</span> ewp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EnumWindowsProc</span><span class="token punctuation">(</span>EvalWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Enumerate all Windows </span>
            <span class="token function">EnumWindows</span><span class="token punctuation">(</span>ewp<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//EnumWindows CALLBACK function </span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">EvalWindow</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> lParam<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>m_invisible <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">IsWindowVisible</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">StringBuilder</span> title <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">StringBuilder</span> module <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">GetWindowModuleFileName</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> module<span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">GetWindowText</span><span class="token punctuation">(</span>hWnd<span class="token punctuation">,</span> title<span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>m_notitle <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token operator">&amp;&amp;</span> title<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            wndArray<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Window</span><span class="token punctuation">(</span>title<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span>hWnd<span class="token punctuation">,</span> module<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//implement IEnumerable </span>
        <span class="token keyword">public</span> <span class="token return-type class-name">IEnumerator</span> <span class="token function">GetEnumerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>IEnumerator<span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//implement IEnumerator </span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_Position<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>m_Position <span class="token operator">&lt;</span> wndArray<span class="token punctuation">.</span>Count<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_Position <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Current
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> wndArray<span class="token punctuation">[</span>m_Position<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Powered by DvNews.net
来源：网络
阅读：43 次
日期：2003-8-10
</code></pre></div>`,4);function w(y,g){const a=p("ExternalLinkIcon");return o(),e("div",null,[i,r,n("p",null,[n("a",m,[s("Download source - 17.5 Kb"),c(a)])]),d])}const W=t(k,[["render",w],["__file","sysmsg4.html.vue"]]);export{W as default};
