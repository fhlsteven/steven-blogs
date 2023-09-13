import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="怎么读取文本文件" tabindex="-1"><a class="header-anchor" href="#怎么读取文本文件" aria-hidden="true">#</a> 怎么读取文本文件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  怎么读取文本文件？
作　　者：  wushengshan (wushengshan)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  20
回复次数：  11
发表时间：  2003-8-29 13:39:16
</code></pre></div><p>怎么读取一个指定路径下的一个文本文件里的内容赋给一个字符串变量（string aa）呢？</p><hr><hr><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：111 2003-8-29 13:43:09 得分:0</p><blockquote><p>通过流来实现。</p></blockquote><p>回复人： cnhgj(戏子) ( 五级(中级)) 信誉：100 2003-8-29 13:45:01 得分:0</p><blockquote><p>读出内容后赋值给aa不就行了？</p></blockquote><p>回复人： benzite(小禾) ( 二级(初级)) 信誉：100 2003-8-29 13:46:44 得分:1</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token class-name">StreamReader</span> sr<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;path+fileName&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
aa<span class="token operator">=</span>sr<span class="token punctuation">.</span><span class="token function">ReadToEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>回复人： albert2000(albert) ( 二级(初级)) 信誉：100 2003-8-29 13:47:06 得分:1</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> path <span class="token operator">=</span> <span class="token string">@&quot;c:\\temp\\MyTest.txt&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// Delete the file if it exists.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token comment">// Create the file.</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">FileStream</span> fs <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UTF8Encoding</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;This is some text in the file.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Add some information to the file.</span>
                fs<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>info<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> info<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Open the stream and read it back.</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">FileStream</span> fs <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">,</span> FileShare<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">UTF8Encoding</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UTF8Encoding</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>b<span class="token punctuation">.</span>Length<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>temp<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">try</span> 
            <span class="token punctuation">{</span>
                <span class="token comment">// Try to get another handle to the same file.</span>
                <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">FileStream</span> fs2 <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">)</span><span class="token punctuation">)</span> 
                <span class="token punctuation">{</span>
                    <span class="token comment">// Do some task here.</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> 
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Opening the file twice is disallowed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;, as expected: {0}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： superzuoluo(球星) ( 三级(初级)) 信誉：100 2003-8-29 13:48:07 得分:1</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">StreamReader</span> sReader <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    sReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\1.txt&quot;</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">string</span></span> strText <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>sReader<span class="token punctuation">.</span><span class="token function">Peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
        strText <span class="token operator">+=</span> sReader<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\r&quot;</span><span class="token punctuation">;</span>

    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>strText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sReader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        sReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： gujianxin(木头象) ( 五级(中级)) 信誉：100 2003-8-29 13:57:56 得分:1</p><blockquote><p>1,full context read</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span><span class="token string">&quot;TestFile.txt&quot;</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">String</span> line<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;The file could not be read:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>还要注意的就是字符集的问题,如果你的txt是ascii编码的话,就要注意了,一定要指明字符集<br><br><code>StreamReader sr = new StreamReader(@&quot;c:\\test1.txt&quot;,System.Text.Encoding.GetEncoding(&quot;GB2312&quot;));</code></p></blockquote><p>回复人： gujianxin(木头象) ( 五级(中级)) 信誉：100 2003-8-29 13:58:27 得分:1</p><blockquote><p>2,如果你指的是读取有格式的ini文件,可以使用GetPrivateProfile* 系列API</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 从配置文件中取得数据库连接字符串 </span>
<span class="token doc-comment comment">/// 默认:Web方式,从Web.config 中取 GetConnStrWeb()</span>
<span class="token doc-comment comment">/// 桌面方式:从Windows目录下的eii.ini 中取 GetConnStrDeskTop()</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SQLConnString</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> USER <span class="token operator">=</span> <span class="token string">&quot;User id&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> PASS <span class="token operator">=</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> SOURCE <span class="token operator">=</span> <span class="token string">&quot;data source&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> CATALOG <span class="token operator">=</span> <span class="token string">&quot;catalog&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> SIZE <span class="token operator">=</span> <span class="token string">&quot;size&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> SECTION <span class="token operator">=</span> <span class="token string">&quot;DataBase&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> INI_FILE <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span><span class="token function">GetEnvironmentVariable</span><span class="token punctuation">(</span><span class="token string">&quot;WINDIR&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\\\eii.ini&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">// @&quot;C:\\Winnt\\system32\\ini.dll&quot;;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetPrivateProfileString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> section<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> def<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> retVal<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> size<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">uint</span></span> <span class="token function">GetPrivateProfileInt</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> section<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> size<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">SQLConnString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//</span>
        <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 取得web程序的数据库连接字符串</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetConnStrWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ConfigurationSettings<span class="token punctuation">.</span>AppSettings<span class="token punctuation">[</span><span class="token string">&quot;Tiny_Dust_DL_DataBase_Conn_String&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 取得CS程序的连接字符串</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetConnStrDeskTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> ReturnText<span class="token punctuation">;</span>
        ReturnText <span class="token operator">=</span> <span class="token string">&quot;persist security info=False; packet size=&quot;</span> <span class="token operator">+</span> <span class="token function">GetPrivateProfileInt</span><span class="token punctuation">(</span>SECTION<span class="token punctuation">,</span> SIZE<span class="token punctuation">,</span> <span class="token number">4096</span><span class="token punctuation">,</span> INI_FILE<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;;data source=&quot;</span> <span class="token operator">+</span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span>SOURCE<span class="token punctuation">)</span>
            <span class="token operator">+</span> <span class="token string">&quot;;initial catalog=&quot;</span> <span class="token operator">+</span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span>CATALOG<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;;user id=&quot;</span>
            <span class="token operator">+</span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span>USER<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;;password=&quot;</span> <span class="token operator">+</span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span>PASS<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// ReturnText=&quot;provider=SQLOLEDB;data source=172.16.36.222&quot;+</span>
        <span class="token comment">// &quot;;initial catalog=RemoteEdu;user id=sa&quot;</span>
        <span class="token comment">// +&quot;;password=1234567890&quot;;</span>

        <span class="token keyword">return</span> ReturnText<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 取得连接字符串</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetConnStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
<span class="token preprocessor property">#<span class="token directive keyword">if</span> WEB</span>
        <span class="token keyword">return</span> <span class="token function">GetConnStrWeb</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token preprocessor property">#<span class="token directive keyword">else</span></span>
        <span class="token keyword">return</span> <span class="token function">GetConnStrDeskTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token preprocessor property">#<span class="token directive keyword">endif</span></span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// 从配置文件中取配置</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Key<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>键<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">IniReadValue</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Key<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">StringBuilder</span> temp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token function">GetPrivateProfileString</span><span class="token punctuation">(</span>SECTION<span class="token punctuation">,</span> Key<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> temp<span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> INI_FILE<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> temp<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： wushengshan(wushengshan) ( 一级(初级)) 信誉：100 2003-9-1 12:10:22 得分:0</p><blockquote><p>当读取中文内容时读出来的是乱码，谁能帮我看看！下面是我的代码:</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">OpenFileDialog</span> fileName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenFileDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fileName<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span>fileName<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">;</span>

<span class="token comment">//str = sr.ReadToEnd();</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>str <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： gujianxin(木头象) ( 五级(中级)) 信誉：100 2003-9-1 13:54:39 得分:0</p><blockquote><p><code>StreamReader sr = new StreamReader(@&quot;c:\\test1.txt&quot;,System.Text.Encoding.GetEncoding(&quot;GB2312&quot;));</code></p></blockquote><p>回复人： xixigongzhu(夕夕公主) ( 一星(中级)) 信誉：105 2003-9-1 17:26:31 得分:1</p><blockquote><p>默认的编码是UTF8。<br> 这样试试：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">OpenFileDialog</span> fileName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenFileDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fileName<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>fileName<span class="token punctuation">.</span>FileName<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span><span class="token function">GetEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;gb2312&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">;</span>

<span class="token comment">//str = sr.ReadToEnd();</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>str <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBox1<span class="token punctuation">.</span><span class="token function">AppendText</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： wkyjob(流星划過...) ( 二级(初级)) 信誉：100 2003-9-12 15:30:41 得分:14</p><blockquote><p>写：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">StreamWriter</span> sw <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span><span class="token string">@&quot;d:\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sw<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;KK:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sw<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
sw<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><blockquote><p>读：</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">StreamReader</span> sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">OpenText</span><span class="token punctuation">(</span><span class="token string">@&quot;d:\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>str <span class="token operator">=</span> sr<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    textBox2<span class="token punctuation">.</span>Text <span class="token operator">=</span> str<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,38),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","filerw6.html.vue"]]);export{i as default};
