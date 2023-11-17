import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="实现键盘和鼠标的模拟" tabindex="-1"><a class="header-anchor" href="#实现键盘和鼠标的模拟" aria-hidden="true">#</a> 实现键盘和鼠标的模拟</h1><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ConsoleApplication8</span><span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span><span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// Display current status of keys.</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;**BEFORE**\\r\\nCAP: {0}\\r\\nSCR: {1}\\r\\nNUM: {2}&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_CAPITAL<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_SCROLL<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_NUMLOCK<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//Toggle all the keys:</span>
            Keyboard<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span>
                VirtualKeys<span class="token punctuation">.</span>VK_CAPITAL<span class="token punctuation">,</span> <span class="token operator">!</span>Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_CAPITAL<span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>

            Keyboard<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span>
                VirtualKeys<span class="token punctuation">.</span>VK_SCROLL<span class="token punctuation">,</span> <span class="token operator">!</span>Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_SCROLL<span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>

            Keyboard<span class="token punctuation">.</span><span class="token function">SetState</span><span class="token punctuation">(</span>
                VirtualKeys<span class="token punctuation">.</span>VK_NUMLOCK<span class="token punctuation">,</span> <span class="token operator">!</span>Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_NUMLOCK<span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// Display new status of keys.</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n**AFTER**\\r\\nCAP: {0}\\r\\nSCR: {1}\\r\\nNUM: {2}&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_CAPITAL<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_SCROLL<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span><span class="token punctuation">,</span>
                Keyboard<span class="token punctuation">.</span><span class="token function">GetState</span><span class="token punctuation">(</span>VirtualKeys<span class="token punctuation">.</span>VK_NUMLOCK<span class="token punctuation">)</span><span class="token punctuation">?</span><span class="token string">&quot;ON&quot;</span><span class="token punctuation">:</span><span class="token string">&quot;OFF&quot;</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">VirtualKeys</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">byte</span></span><span class="token punctuation">{</span>
        VK_NUMLOCK <span class="token operator">=</span> <span class="token number">0x90</span><span class="token punctuation">,</span>
        VK_SCROLL <span class="token operator">=</span> <span class="token number">0x91</span><span class="token punctuation">,</span>
        VK_CAPITAL <span class="token operator">=</span> <span class="token number">0x14</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">class</span> <span class="token class-name">Keyboard</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">uint</span></span> KEYEVENTF_EXTENDEDKEY <span class="token operator">=</span> <span class="token number">0x1</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">uint</span></span> KEYEVENTF_KEYUP <span class="token operator">=</span> <span class="token number">0x2</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">short</span></span> <span class="token function">GetKeyState</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nVirtKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">keybd_event</span><span class="token punctuation">(</span>
            <span class="token class-name"><span class="token keyword">byte</span></span> bVk<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">byte</span></span> bScan<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">uint</span></span> dwFlags<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">uint</span></span> dwExtraInfo
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">GetState</span><span class="token punctuation">(</span><span class="token class-name">VirtualKeys</span> Key<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token function">GetKeyState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Key<span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetState</span><span class="token punctuation">(</span><span class="token class-name">VirtualKeys</span> Key<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> State<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>State<span class="token operator">!=</span><span class="token function">GetState</span><span class="token punctuation">(</span>Key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">keybd_event</span><span class="token punctuation">(</span>
                    <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>Key<span class="token punctuation">,</span>
                    <span class="token number">0x45</span><span class="token punctuation">,</span>
                    KEYEVENTF_EXTENDEDKEY <span class="token operator">|</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token number">0</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">keybd_event</span><span class="token punctuation">(</span>
                    <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>Key<span class="token punctuation">,</span>
                    <span class="token number">0x45</span><span class="token punctuation">,</span>
                    KEYEVENTF_EXTENDEDKEY <span class="token operator">|</span> KEYEVENTF_KEYUP<span class="token punctuation">,</span>
                    <span class="token number">0</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//and you can do mouse_event operation like it.</span>

</code></pre></div><p>对于模拟键盘，除了利用keybd_event，更简单的是使用sendkeys，而且keybd_event已经被sendinput取代。</p><h2 id="具体代码参考" tabindex="-1"><a class="header-anchor" href="#具体代码参考" aria-hidden="true">#</a> 具体代码参考</h2><p>请问，用C#如何实现模拟键盘输入<br><code>http://expert.csdn.net/Expert/topic/1055/1055110.xml?temp=.1404993</code></p><p>对于模拟鼠标，只好用SendInput，<br><code>http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/WinUI/WindowsUserInterface/UserInput/KeyboardInput/KeyboardInputReference/KeyboardInputFunctions/SendInput.asp</code></p><p>具体代码参考:</p><p><code>http://groups.google.com/groups?hl=zh-CN&amp;lr=&amp;ie=UTF-8&amp;oe=UTF-8&amp;threadm=665201c200e8%24e3a1f550%2435ef2ecf%40TKMSFTNGXA11&amp;rnum=3&amp;prev=/groups%3Fq%3Dsendinput%2Bmouse%2Bc%2523%26hl%3Dzh-CN%26lr%3D%26ie%3DUTF-8%26oe%3DUTF-8%26selm%3D665201c200e8%2524e3a1f550%252435ef2ecf%2540TKMSFTNGXA11%26rnum%3D3</code></p>`,9),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","hardctr11.html.vue"]]);export{i as default};
