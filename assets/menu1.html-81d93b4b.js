import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p="/steven-blogs/assets/menu1_1-0101e092.png",o={},e=t(`<h1 id="c-读取xml生成菜单" tabindex="-1"><a class="header-anchor" href="#c-读取xml生成菜单" aria-hidden="true">#</a> C#,读取Xml生成菜单</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>AppleDotnet（原作）
关键字     C#,Xml,菜单
</code></pre></div><p>最近因为写一个小工具,需要从Xml格式配置中读出数据,并动态生成菜单...因为是菜鸟,所以很费了点心思..本来着开放的精神,虽然只是一点小东西,但相信对新手还是有一点点帮助的.现拿出来和大家共享..</p><p>1、要求：从Xml文件中读出数据，并生成菜单，并在点击菜单时根据相关数据进行处理；<br> 2、例子Xml和图片见后。<br> 3、程序代码，及注释：</p><p>a)首先，从MenuItem派生一个DataMenuItem(即包含数据的菜单之意)，因为Xml源文件里可能有很多数据需要保存，而MenuItem没有保存数据的地方</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataMenuItem</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MenuItem</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> AttributeNames<span class="token punctuation">,</span>AttributeValues<span class="token punctuation">;</span><span class="token comment">//保存该菜单的源Xml节点中的所有属性名称和值</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> Value<span class="token punctuation">;</span><span class="token comment">//该节点的值(值这种说法可能不太准确,应该是InnerText)</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetAttributeValueByName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> AttributeName<span class="token punctuation">)</span><span class="token comment">//为以后的程序取得属性值留的一个方法</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>AttributeNames<span class="token operator">==</span><span class="token keyword">null</span><span class="token operator">||</span>AttributeValues<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>AttributeNames<span class="token punctuation">.</span>Length<span class="token operator">!=</span>AttributeValues<span class="token punctuation">.</span>Length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>AttributeNames<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>AttributeNames<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">==</span>AttributeName<span class="token punctuation">)</span> <span class="token keyword">return</span> AttributeValues<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>b)然后是一个把Xml数据添加到菜单的方法，详细说明见注释</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">XmlToMenu</span><span class="token punctuation">(</span><span class="token class-name">XmlNode</span> Node<span class="token punctuation">,</span> <span class="token class-name">MenuItem</span> Menu<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
    <span class="token class-name">DataMenuItem</span> TempMenuItem <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataMenuItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    TempMenuItem<span class="token punctuation">.</span>Index <span class="token operator">=</span> Menu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span>Count<span class="token punctuation">;</span><span class="token comment">// 应该可以省略的.</span>
    TempMenuItem<span class="token punctuation">.</span>Text <span class="token operator">=</span> Node<span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
    TempMenuItem<span class="token punctuation">.</span>Value <span class="token operator">=</span> Node<span class="token punctuation">.</span>InnerText<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token comment">// 如果有属性,就保存了.没有属性就跳过</span>
    <span class="token punctuation">{</span>
        TempMenuItem<span class="token punctuation">.</span>AttributeNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">.</span>Count<span class="token punctuation">]</span><span class="token punctuation">;</span>
        TempMenuItem<span class="token punctuation">.</span>AttributeValues <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span>Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">.</span>Count<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            TempMenuItem<span class="token punctuation">.</span>AttributeNames<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
            TempMenuItem<span class="token punctuation">.</span>AttributeValues<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> Node<span class="token punctuation">.</span>Attributes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    TempMenuItem<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>DataMenu_Click<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 添加处理Click事件的方法,由于DataMenuItem是带有数据的,所以这个处理方法可以根据数据的不同来做不同的处理.</span>
    Menu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>TempMenuItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Node<span class="token punctuation">.</span>ChildNodes<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token comment">// 因为即使没有子节点,Node.ChildNodes.Count也会是1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">XmlNode</span> Nodes <span class="token keyword">in</span> Node<span class="token punctuation">.</span>ChildNodes<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">XmlToMenu</span><span class="token punctuation">(</span>Nodes<span class="token punctuation">,</span> Menu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">[</span>Menu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span>Count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 递归调用自身</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>c)处理Click事件的方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DataMenu_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">DataMenuItem</span> Clicked <span class="token operator">=</span> <span class="token punctuation">(</span>DataMenuItem<span class="token punctuation">)</span>sender<span class="token punctuation">;</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>Clicked<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 这个只是测试一下，实际中可以根据情况的不同随意取用DataMenuItem里的数据；</span>
<span class="token punctuation">}</span>
</code></pre></div><p>d)最后，只需要调用上面的方法就可以了。提供如下代码供参考，其中有些地方为了看起来更易懂，多花了一些步骤；</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>Menu_Xml<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Menu_Xml可自行修改；</span>
<span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
<span class="token class-name">XmlDocument</span> xmldoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">XmlTextReader</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">XmlTextReader</span><span class="token punctuation">(</span><span class="token string">&quot;Ini.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xmldoc<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">XmlNodeList</span> NodeList <span class="token operator">=</span> xmldoc<span class="token punctuation">.</span>DocumentElement<span class="token punctuation">.</span>ChildNodes<span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>NodeList<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">XmlNode</span> Node <span class="token operator">=</span> NodeList<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">XmlToMenu</span><span class="token punctuation">(</span>Node<span class="token punctuation">,</span>Menu_Xml<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>例子Xml:Ini.xml</p><div class="language-xml" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;GB2312&quot; ?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TEST</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test1</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test2</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test2</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test3</span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test3</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test4</span><span class="token punctuation">&gt;</span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test4</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test1</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test1</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test2</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test2</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test3</span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test3</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>List1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test1</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test2</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test2</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>List</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>TEST</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p><img src="`+p+'" alt="menu1_1"></p><hr><hr><p>对该文的评论 人气：442</p><p>ambboy (2003-11-20 19:00:30)</p><blockquote><p>我用过，不错啊！！</p></blockquote><p>eyoexply (2003-11-18 20:50:01)</p><blockquote><p>很好，支持！</p></blockquote>',22),c=[e];function u(l,k){return s(),a("div",null,c)}const r=n(o,[["render",u],["__file","menu1.html.vue"]]);export{r as default};
