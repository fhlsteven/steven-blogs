import{_ as n,o as s,c as a,d as t}from"./app-35fb03de.js";const p={},o=t(`<h1 id="字符串操作技巧-zj" tabindex="-1"><a class="header-anchor" href="#字符串操作技巧-zj" aria-hidden="true">#</a> 字符串操作技巧--zj</h1><ol><li><p>如何分隔字符串到数组中</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> total <span class="token operator">=</span> <span class="token string">&quot;aaa,bbb,ccc,dddd&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> strArray<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> charArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token char">&#39;,&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
strArray <span class="token operator">=</span> total<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>charArray<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> <span class="token string">&quot;26,24,25&quot;</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> split <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Char<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token char">&#39;,&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s <span class="token keyword">in</span> split<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>格式化字符串：</p><p><code>String.Format</code>(format项，要格式化的Object)<br> format项格式为： { index,alignment:formatString}<br> index 从零开始的整数，指示对象列表中要格式化的元素<br> alignment 可选整数，指示包含格式化值的区域的最小宽度<br> formatString 格式化代码的可选字符串<br> 必须使用成对的大括号（“{”和“}”）。因为左右大括号分别被解释为格式项的开始和结束</p><p>标准数字格式字符串</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>C 或 c</td><td>货币 数字转换为表示货币金额的字符串。</td></tr><tr><td>D 或 d</td><td>十进制 只有整型才支持此格式。</td></tr><tr><td>E 或 e</td><td>科学计数法（指数）</td></tr><tr><td>F 或 f</td><td>固定点 数字转换为“-ddd.ddd...”形式的字符串，</td></tr><tr><td>G 或 g</td><td>常规</td></tr><tr><td>N 或 n</td><td>数字</td></tr><tr><td>P 或 p</td><td>百分比</td></tr><tr><td>R 或 r</td><td>往返过程</td></tr><tr><td>X 或 x</td><td>十六进制</td></tr></tbody></table><p>自定义数字格式字符串</p><table><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td>0</td><td>零占位符</td><td></td></tr><tr><td>#</td><td>数字占位符</td><td></td></tr><tr><td>.</td><td>小数点</td><td></td></tr><tr><td>,</td><td>千位分隔符和数字比例换算</td><td></td></tr><tr><td>%</td><td>百分比占位符</td><td></td></tr><tr><td>|转义符</td><td></td><td></td></tr><tr><td>&#39;ABC&#39;</td><td>&quot;ABC&quot; 字符串</td><td>引在单引号或双引号中的字符被原样复制到输出字符串中，而且不影响格式化。</td></tr><tr><td>;</td><td>部分分隔符</td><td>用于分隔格式字符串中的正数、负数和零各部分。</td></tr></tbody></table><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> sf<span class="token operator">=</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;{0}年{1}月{2}日 {3}时{4}分&quot;</span><span class="token punctuation">,</span>
            Year<span class="token punctuation">,</span>Month<span class="token punctuation">,</span>Day<span class="token punctuation">,</span>currTime<span class="token punctuation">.</span>TruantTime<span class="token punctuation">.</span>Hour<span class="token punctuation">,</span>currTime<span class="token punctuation">.</span>TruantTime<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>字符串处理</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> fox<span class="token punctuation">;</span>
fox<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//转化成小写字母</span>
fox<span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//转化成大写字母</span>
fox<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//删除前后空格</span>
fox<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span>trimChars<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//删除其它字符</span>
fox<span class="token punctuation">.</span><span class="token function">TrimStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//删除前空格</span>
fox<span class="token punctuation">.</span><span class="token function">TrimEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//删除后空格</span>
fox<span class="token punctuation">.</span><span class="token function">PadLeft</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//增加左边空格，使字串达到某长度。</span>
fox<span class="token punctuation">.</span><span class="token function">PadRight</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//增加右边空格，使字串达到某长度。</span>
fox<span class="token punctuation">.</span><span class="token function">PadX</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token char">&#39;-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//增加其它字符，使字串达到某长度。X指:Left/Right</span>
fox<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">&#39; &#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//将字串分解成数组</span>
</code></pre></div></li><li><p>类型转换</p><p>转换不规则字符串</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Globalization</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> d<span class="token operator">=</span><span class="token string">&quot;2.00&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> s<span class="token operator">=</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span>NumberStyles<span class="token punctuation">.</span>AllowDecimalPoint<span class="token punctuation">)</span><span class="token punctuation">;</span>
s<span class="token operator">=</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//会报错</span>
</code></pre></div></li><li><p>字符串常用的方法</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//获得汉字的区位码</span>
<span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
array <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;啊&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">int</span></span> i1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> i2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//unicode解码方式下的汉字码</span>
array <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">&quot;啊&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
i1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
i2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;\\0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//unicode反解码为汉字</span>
<span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> <span class="token string">&quot;4a55&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s1 <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s2 <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">int</span></span> t1 <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> t2 <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>s2<span class="token punctuation">,</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>t1<span class="token punctuation">;</span>
array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>t2<span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//default方式反解码为汉字</span>
array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token number">196</span><span class="token punctuation">;</span>
array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token number">207</span><span class="token punctuation">;</span>
s <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//取字符串长度</span>
s <span class="token operator">=</span> <span class="token string">&quot;iam方枪枪&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> len <span class="token operator">=</span> s<span class="token punctuation">.</span>Length<span class="token punctuation">;</span><span class="token comment">//will output as 6</span>
<span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sarr <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
len <span class="token operator">=</span> sarr<span class="token punctuation">.</span>Length<span class="token punctuation">;</span><span class="token comment">//will output as 3+3*2=9</span>

<span class="token comment">//字符串相加</span>
<span class="token class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span> sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>StringBuilder</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token string">&quot;i &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token string">&quot;am &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sb<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token string">&quot;方枪枪&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li><li><p>查找</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">DataColumn<span class="token punctuation">[</span><span class="token punctuation">]</span></span> keys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataColumn</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
keys<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> thisDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Intro&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Columns<span class="token punctuation">[</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
thisDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Intro&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>PrimaryKey <span class="token operator">=</span> keys<span class="token punctuation">;</span>
<span class="token class-name">DataRow</span> findRow <span class="token operator">=</span> thisDataSet<span class="token punctuation">.</span>Tables<span class="token punctuation">[</span><span class="token string">&quot;Intro&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Rows<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>findRow <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Not found&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Aleady!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>字符串下标调用控件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//调用</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">11</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">MyCheck</span><span class="token punctuation">(</span><span class="token string">&quot;checkBox&quot;</span> <span class="token operator">+</span> i<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//函数</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyCheck</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> whichone<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Control</span> control <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">CheckBox</span> mycheckbox <span class="token operator">=</span> <span class="token punctuation">(</span>control <span class="token keyword">as</span> <span class="token class-name">CheckBox</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mycheckbox <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> myName <span class="token operator">=</span> mycheckbox<span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>myName <span class="token operator">==</span> whichone<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                mycheckbox<span class="token punctuation">.</span>Checked <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></li><li><p>正则表达式</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> Text <span class="token operator">=</span> <span class="token string">&quot;The software ad,is MeTone,  a,is very gaaad!,Your Need&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//一般</span>
<span class="token comment">//   string Pattern=&quot;is&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,以n开头的单词</span>
<span class="token comment">//   string Pattern=@&quot;\\bn&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,以e结尾的单词</span>
<span class="token comment">//   string Pattern=@&quot;e\\b&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,以M开头,以e结尾，中间是任何数量不为空的字符,\\S表示不是空白的字符,*任何数量</span>
<span class="token comment">//   string Pattern=@&quot;\\bM\\S*e\\b&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,以T只能是总文本中的第一个字符</span>
<span class="token comment">//   string Pattern=@&quot;^T&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,以d只能是总文本中的第一个字符</span>
<span class="token comment">//   string Pattern=@&quot;d$&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,.是除以换行符\\n以外的任何一个字符</span>
<span class="token comment">//   string Pattern=@&quot;g.d&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,+可以重复一次或多次的前导字符</span>
<span class="token comment">//   string Pattern=@&quot;ga+d&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,?可以重复零次或多次的前导字符</span>
<span class="token comment">//   string Pattern=@&quot;ga+d&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//转义,?可以重复零次或多次的前导字符</span>
<span class="token comment">//   string Pattern=@&quot;\\sa&quot;;</span>
<span class="token comment">//   MatchCollection Matches=Regex.Matches(Text,Pattern,RegexOptions.IgnoreCase|RegexOptions.ExplicitCapture);</span>
<span class="token comment">//   foreach(Match NextMatch in Matches)</span>
<span class="token comment">//    Console.WriteLine(NextMatch.Index);</span>
<span class="token comment">//提取网址</span>
Text <span class="token operator">=</span> <span class="token string">&quot;I&#39;found the URL is http://www.emay.net.cn is very good&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> Pattern <span class="token operator">=</span> <span class="token string">@&quot;\\b(\\S+)://(\\S+)(?::(\\S+))?\\b&quot;</span><span class="token punctuation">;</span>
<span class="token class-name">MatchCollection</span> Matches <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Matches</span><span class="token punctuation">(</span>Text<span class="token punctuation">,</span> Pattern<span class="token punctuation">,</span> RegexOptions<span class="token punctuation">.</span>IgnoreCase <span class="token operator">|</span> RegexOptions<span class="token punctuation">.</span>ExplicitCapture<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Match</span> NextMatch <span class="token keyword">in</span> Matches<span class="token punctuation">)</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>NextMatch<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li></ol>`,2),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","cspdsop4.html.vue"]]);export{i as default};
