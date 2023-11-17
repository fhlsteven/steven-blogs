import{_ as n,o as s,c as a,a as o}from"./app-a2b6e588.js";const t={},p=o(`<h1 id="在console中输出彩色字体-原码" tabindex="-1"><a class="header-anchor" href="#在console中输出彩色字体-原码" aria-hidden="true">#</a> 在Console中输出彩色字体（原码）</h1><blockquote><p>作者：痕迹</p></blockquote><p>先是<code>consolecolour.cs</code>类，用来调用颜色</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// ConsoleColour.cs </span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token comment">// need this to make API calls </span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">PFitzsimons<span class="token punctuation">.</span>ConsoleColour</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Static class for console colour manipulation. </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConsoleColour</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// constants for console streams </span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> STD_INPUT_HANDLE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> STD_OUTPUT_HANDLE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">11</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> STD_ERROR_HANDLE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">12</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImportAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> GetStdHandle
        <span class="token punctuation">(</span>
            <span class="token keyword">int</span> nStdHandle <span class="token comment">// input, output, or error device </span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImportAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> SetConsoleTextAttribute
        <span class="token punctuation">(</span>
            <span class="token class-name">IntPtr</span> hConsoleOutput<span class="token punctuation">,</span> <span class="token comment">// handle to screen buffer </span>
            <span class="token keyword">int</span> wAttributes  <span class="token comment">// text and background colors </span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// colours that can be set </span>
        <span class="token punctuation">[</span>Flags<span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ForeGroundColour</span>
        <span class="token punctuation">{</span>
            Black <span class="token operator">=</span> <span class="token number">0x0000</span><span class="token punctuation">,</span>
            Blue <span class="token operator">=</span> <span class="token number">0x0001</span><span class="token punctuation">,</span>
            Green <span class="token operator">=</span> <span class="token number">0x0002</span><span class="token punctuation">,</span>
            Cyan <span class="token operator">=</span> <span class="token number">0x0003</span><span class="token punctuation">,</span>
            Red <span class="token operator">=</span> <span class="token number">0x0004</span><span class="token punctuation">,</span>
            Magenta <span class="token operator">=</span> <span class="token number">0x0005</span><span class="token punctuation">,</span>
            Yellow <span class="token operator">=</span> <span class="token number">0x0006</span><span class="token punctuation">,</span>
            Grey <span class="token operator">=</span> <span class="token number">0x0007</span><span class="token punctuation">,</span>
            White <span class="token operator">=</span> <span class="token number">0x0008</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// class can not be created, so we can set colours </span>
        <span class="token comment">// without a variable </span>
        <span class="token keyword">private</span> <span class="token function">ConsoleColour</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// default to a white-grey </span>
            <span class="token keyword">return</span> <span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span>ForeGroundColour<span class="token punctuation">.</span>Grey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span><span class="token class-name">ForeGroundColour</span> foreGroundColour<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// default to a bright white-grey </span>
            <span class="token keyword">return</span> <span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span>foreGroundColour<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span><span class="token class-name">ForeGroundColour</span> foreGroundColour<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> brightColours<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// get the current console handle </span>
            <span class="token class-name">IntPtr</span> nConsole <span class="token operator">=</span> <span class="token function">GetStdHandle</span><span class="token punctuation">(</span>STD_OUTPUT_HANDLE<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> colourMap<span class="token punctuation">;</span>

            <span class="token comment">// if we want bright colours OR it with white </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>brightColours<span class="token punctuation">)</span>
                colourMap <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>foreGroundColour <span class="token operator">|</span>
                <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ForeGroundColour<span class="token punctuation">.</span>White<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                colourMap <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>foreGroundColour<span class="token punctuation">;</span>

            <span class="token comment">// call the api and return the result </span>
            <span class="token keyword">return</span> <span class="token function">SetConsoleTextAttribute</span><span class="token punctuation">(</span>nConsole<span class="token punctuation">,</span> colourMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然后是主程序</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// Console.cs </span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token comment">// we want color output </span>
<span class="token keyword">using</span> <span class="token namespace">PFitzsimons<span class="token punctuation">.</span>ConsoleColour</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">MyApp</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyApp</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ConsoleColour<span class="token punctuation">.</span><span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span>
           ConsoleColour<span class="token punctuation">.</span>ForeGroundColour<span class="token punctuation">.</span>Green<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Text in green&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            ConsoleColour<span class="token punctuation">.</span><span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span>
            ConsoleColour<span class="token punctuation">.</span>ForeGroundColour<span class="token punctuation">.</span>Red<span class="token punctuation">)</span><span class="token punctuation">;</span>

            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Text in red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// reset console back to a default </span>
            ConsoleColour<span class="token punctuation">.</span><span class="token function">SetForeGroundColour</span><span class="token punctuation">(</span>ConsoleColour<span class="token punctuation">.</span>ForeGroundColour<span class="token punctuation">.</span>Yellow<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//ConsoleColour.SetForeGroundColour(); </span>
            <span class="token comment">//ConsoleColour.SetForeGroundColour(ConsoleColour.ForeGroundColour.Yellow,false); </span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>分别存成<code>ConsoleColour.cs</code>和<code>Console.cs</code>,然后提示符下编译</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>CSC /t:library　ConsoleColour.cs
CSC /r:ConsoleColour.dll　Console.cs
</code></pre></div><p>生成console.exe可执行文件<br> 执行后看看效果吧！</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Powered by DvNews.net
来源：uncj.net
阅读：181 次
日期：2003-7-1
</code></pre></div>`,10),e=[p];function c(l,u){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","progmif3.html.vue"]]);export{r as default};
