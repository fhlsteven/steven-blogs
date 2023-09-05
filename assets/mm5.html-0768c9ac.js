import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="播放声音" tabindex="-1"><a class="header-anchor" href="#播放声音" aria-hidden="true">#</a> 播放声音</h1><p>C#中没有声音类。<br> 播放声音请参阅API！<br> 比如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Winmm.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> <span class="token function">PlaySound</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">long</span></span>  module<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">long</span></span> flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="播放声音-1" tabindex="-1"><a class="header-anchor" href="#播放声音-1" aria-hidden="true">#</a> 播放声音</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">musicplay</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;winmm.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> <span class="token function">mciSendString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> lpstrCommand<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpstrReturnString<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> length<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> hwndcallback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">musicplay</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        filename <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        t <span class="token operator">=</span> <span class="token function">mciSendString</span><span class="token punctuation">(</span><span class="token string">@&quot;open &quot;</span> <span class="token operator">+</span> filename<span class="token punctuation">,</span> m<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t <span class="token operator">=</span> <span class="token function">mciSendString</span><span class="token punctuation">(</span><span class="token string">@&quot;play &quot;</span> <span class="token operator">+</span> filename <span class="token operator">+</span> <span class="token string">@&quot; wait&quot;</span><span class="token punctuation">,</span> m<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t <span class="token operator">=</span> <span class="token function">mciSendString</span><span class="token punctuation">(</span><span class="token string">@&quot;close &quot;</span> <span class="token operator">+</span> filename<span class="token punctuation">,</span> m<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> filename<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m <span class="token operator">=</span> <span class="token string">@&quot;                                  &quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">long</span></span> t<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;请输入你要播放的歌曲的路径&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">musicplay</span> mpl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">musicplay</span><span class="token punctuation">(</span>Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mpl<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;播放完毕,再见&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>================================================================================================</code></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">double</span></span> shu<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> temps1<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> temps2<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> jg<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> save<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">double</span></span> zf<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> js<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> gl<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button2<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button3<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button4<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button5<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button6<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button7<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button8<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button9<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button10<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button11<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button12<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button13<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button14<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button15<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button16<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button17<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button18<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button19<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button20<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button21<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button22<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Button</span> button23<span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;winmm.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;PlaySound&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">PlaySound</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Byte</span> snd<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> hmod<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> fdwSound<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;winmm.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;PlaySound&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">PlaySound</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> lpszName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> hModule<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> dwFlags<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">PlayingFlags</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
    <span class="token punctuation">{</span>
        SND_SYNC <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">,</span>
        SND_ASYNC <span class="token operator">=</span> <span class="token number">0x01</span><span class="token punctuation">,</span>
        SND_NODEFAULT <span class="token operator">=</span> <span class="token number">0x02</span><span class="token punctuation">,</span>
        SND_MEMORY <span class="token operator">=</span> <span class="token number">0x04</span><span class="token punctuation">,</span>
        SND_ALIAS <span class="token operator">=</span> <span class="token number">0x010000</span><span class="token punctuation">,</span>
        SND_FILENAME <span class="token operator">=</span> <span class="token number">0x020000</span><span class="token punctuation">,</span>
        SND_RESOURCE <span class="token operator">=</span> <span class="token number">0x040004</span><span class="token punctuation">,</span>
        SND_ALIAS_ID <span class="token operator">=</span> <span class="token number">0x0110000</span><span class="token punctuation">,</span>
        SND_ALIAS_START <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        SND_LOOP <span class="token operator">=</span> <span class="token number">0x08</span><span class="token punctuation">,</span>
        SND_NOSTOP <span class="token operator">=</span> <span class="token number">0x010</span><span class="token punctuation">,</span>
        SND_VALID <span class="token operator">=</span> <span class="token number">0x01F</span><span class="token punctuation">,</span>
        SND_NOWAIT <span class="token operator">=</span> <span class="token number">0x02000</span><span class="token punctuation">,</span>
        SND_PURGE <span class="token operator">=</span> <span class="token number">0x40</span>
    <span class="token punctuation">}</span>
<span class="token comment">//...................................................省略</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Form1<span class="token punctuation">.</span><span class="token function">PlaySound</span><span class="token punctuation">(</span>filename<span class="token punctuation">.</span>wav<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Form1<span class="token punctuation">.</span>PlayingFlags<span class="token punctuation">.</span>SND_SYNC<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Button</span> btn <span class="token operator">=</span> <span class="token punctuation">(</span>Button<span class="token punctuation">)</span>sender<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>gl<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> btn<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
            gl <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">==</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> btn<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
            gl <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> btn<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
            gl <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        shu <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToDouble</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre></div>`,7),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","mm5.html.vue"]]);export{i as default};
