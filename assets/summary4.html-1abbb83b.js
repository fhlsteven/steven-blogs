import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},e=t(`<h1 id="几个c-编程的小技巧" tabindex="-1"><a class="header-anchor" href="#几个c-编程的小技巧" aria-hidden="true">#</a> 几个C#编程的小技巧</h1><h2 id="几个c-编程的小技巧-一" tabindex="-1"><a class="header-anchor" href="#几个c-编程的小技巧-一" aria-hidden="true">#</a> 几个C#编程的小技巧 (一)</h2><blockquote><p>作者：wyhw 发表时间：2003-5-11 推荐程度： ★ 查看作者信息以及作者文集</p></blockquote><h3 id="一、最小化窗口" tabindex="-1"><a class="header-anchor" href="#一、最小化窗口" aria-hidden="true">#</a> 一、最小化窗口</h3><p>点击“X”或“Alt+F4”时，最小化窗口，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Message</span> m<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_SYSCOMMAND <span class="token operator">=</span> <span class="token number">0x0112</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> SC_CLOSE <span class="token operator">=</span> <span class="token number">0xF060</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">.</span>Msg <span class="token operator">==</span> WM_SYSCOMMAND <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> m<span class="token punctuation">.</span>WParam <span class="token operator">==</span> SC_CLOSE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// User clicked close button</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>WindowState <span class="token operator">=</span> FormWindowState<span class="token punctuation">.</span>Minimized<span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">WndProc</span><span class="token punctuation">(</span><span class="token keyword">ref</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="二、如何让foreach-循环运行的更快" tabindex="-1"><a class="header-anchor" href="#二、如何让foreach-循环运行的更快" aria-hidden="true">#</a> 二、如何让Foreach 循环运行的更快</h3><p><code>foreach</code>是一个对集合中的元素进行简单的枚举及处理的现成语句，用法如下例所示：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">LoopTest</span>
<span class="token punctuation">{</span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// create an ArrayList of strings</span>
            <span class="token class-name">ArrayList</span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            array<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Marty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            array<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Bill&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            array<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;George&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// print the value of every item</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> item <span class="token keyword">in</span> array<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>你可以将foreach语句用在每个实现了Ienumerable接口的集合里。如果想了解更多foreach的用法，你可以查看.NET Framework SDK文档中的C# Language Specification。</p><p>在编译的时候，C＃编辑器会对每一个foreach 区域进行转换。<code>IEnumerator enumerator = array.GetEnumerator();</code></p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">try</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> item<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>enumerator<span class="token punctuation">.</span><span class="token function">MoveNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        item <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span> enumerator<span class="token punctuation">.</span>Current<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IDisposable</span> d <span class="token operator">=</span> enumerator <span class="token keyword">as</span> <span class="token class-name">IDisposable</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> d<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这说明在后台，foreach的管理会给你的程序带来一些增加系统开销的额外代码。</p><h3 id="三、将图片保存到一个xml文件" tabindex="-1"><a class="header-anchor" href="#三、将图片保存到一个xml文件" aria-hidden="true">#</a> 三、将图片保存到一个XML文件</h3><p>WinForm的资源文件中，将PictureBox的Image属性等非文字内容都转变成文本保存，这是通过序列化（Serialization）实现的，例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>Serialization<span class="token punctuation">.</span>Formatters<span class="token punctuation">.</span>Soap</span><span class="token punctuation">;</span>
<span class="token class-name">Stream</span> stream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span><span class="token string">&quot;E:\\\\Image.xml&quot;</span><span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Create<span class="token punctuation">,</span>FileAccess<span class="token punctuation">.</span>Write<span class="token punctuation">,</span>FileShare<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SoapFormatter</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SoapFormatter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Image</span> img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span><span class="token string">&quot;E:\\\\Image.bmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
f<span class="token punctuation">.</span><span class="token function">Serialize</span><span class="token punctuation">(</span>stream<span class="token punctuation">,</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
stream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="四、屏蔽ctrl-v" tabindex="-1"><a class="header-anchor" href="#四、屏蔽ctrl-v" aria-hidden="true">#</a> 四、屏蔽CTRL-V</h3><p>在WinForm中的TextBox控件没有办法屏蔽CTRL-V的剪贴板粘贴动作，如果需要一个输入框，但是不希望用户粘贴剪贴板的内容，可以改用RichTextBox控件，并且在KeyDown中屏蔽掉CTRL-V键，例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">richTextBox1_KeyDown</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>KeyEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Control <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">.</span>KeyCode<span class="token operator">==</span>Keys<span class="token punctuation">.</span>V<span class="token punctuation">)</span>
        e<span class="token punctuation">.</span>Handled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><blockquote><p><code>http://www.uncj.net/ </code></p></blockquote><h2 id="几个c-编程的小技巧-二" tabindex="-1"><a class="header-anchor" href="#几个c-编程的小技巧-二" aria-hidden="true">#</a> 几个C#编程的小技巧 (二)</h2><h3 id="一、判断文件或文件夹是否存在" tabindex="-1"><a class="header-anchor" href="#一、判断文件或文件夹是否存在" aria-hidden="true">#</a> 一、判断文件或文件夹是否存在</h3><p>使用System.IO.File，要检查一个文件是否存在非常简单：</p><p><code>bool exist = System.IO.File.Exists(fileName);</code></p><p>如果需要判断目录（文件夹）是否存在，可以使用<code>System.IO.Directory</code>：</p><p><code>bool exist = System.IO.Directory.Exists(folderName);</code></p><h3 id="二、使用delegate类型设计自定义事件" tabindex="-1"><a class="header-anchor" href="#二、使用delegate类型设计自定义事件" aria-hidden="true">#</a> 二、使用delegate类型设计自定义事件</h3><p>在C#编程中，除了Method和Property，任何Class都可以有自己的事件（Event）。定义和使用自定义事件的步骤如下：</p><p>（1）在Class之外定义一个delegate类型，用于确定事件程序的接口<br> （2）在Class内部，声明一个public event变量，类型为上一步骤定义的delegate类型<br> （3）在某个Method或者Property内部某处，触发事件<br> （4）Client程序中使用+=操作符指定事件处理程序</p><p>例子：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 定义Delegate类型，约束事件程序的参数</span>
<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> lineNumber<span class="token punctuation">)</span> <span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataImports</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 定义新事件NewLineRead</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">MyEventHandler</span> NewLineRead <span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ImportData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">long</span></span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> <span class="token comment">// 事件参数</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            i<span class="token operator">++</span> <span class="token punctuation">;</span>
            <span class="token comment">// 触发事件</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span> NewLineRead <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span> <span class="token function">NewLineRead</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//...</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 以下为Client代码</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CallMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 声明Class变量，不需要WithEvents</span>
    <span class="token keyword">private</span> <span class="token class-name">DataImports</span> _da <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 指定事件处理程序</span>
    _da<span class="token punctuation">.</span>NewLineRead <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MyEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>DA_EnterNewLine<span class="token punctuation">)</span> <span class="token punctuation">;</span>
    <span class="token comment">// 调用Class方法，途中会触发事件</span>
    _da<span class="token punctuation">.</span><span class="token function">ImportData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 事件处理程序</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DA_EnterNewLine</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> lineNumber<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="三、ip与主机名解析" tabindex="-1"><a class="header-anchor" href="#三、ip与主机名解析" aria-hidden="true">#</a> 三、IP与主机名解析</h3><p>使用<code>System.Net</code>可以实现与Ping命令行类似的IP解析功能，例如将主机名解析为IP或者反过来：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetHostNameByIP</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ipAddress<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPHostEntry</span> hostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>ipAddress<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> hostInfo<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetIPByHostName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> hostName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>IPHostEntry</span> hostInfo <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByName</span><span class="token punctuation">(</span>hostName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> hostInfo<span class="token punctuation">.</span>AddressList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,35),o=[e];function c(l,u){return s(),a("div",null,o)}const i=n(p,[["render",c],["__file","summary4.html.vue"]]);export{i as default};
