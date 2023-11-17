import{_ as p,r as t,o,c as e,b as n,d as s,e as c,a as l}from"./app-a2b6e588.js";const u={},k={id:"在-c-中处理结构内的数组",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#在-c-中处理结构内的数组","aria-hidden":"true"},"#",-1),r={href:"https://www.cnblogs.com/flier/archive/2004/08/14/33245.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>Posted on 2004-08-14 01:04 Flier Lu 阅读(6744) 评论(6)</p><p>原文：<code>http://www.blogcn.com/User8/flier_lu/index.html?id=3318394</code></p><p>在 C/C++ 代码中，大量掺杂着包括普通类型和数组的结构，如定义 PE 文件头结构的 IMAGE_OPTIONAL_HEADER 结构定义如下：</p><div class="language-cpp" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_IMAGE_DATA_DIRECTORY</span>
<span class="token punctuation">{</span>
    DWORD VirtualAddress<span class="token punctuation">;</span>
    DWORD Size<span class="token punctuation">;</span>
<span class="token punctuation">}</span> IMAGE_DATA_DIRECTORY<span class="token punctuation">,</span> <span class="token operator">*</span>PIMAGE_DATA_DIRECTORY<span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">IMAGE_NUMBEROF_DIRECTORY_ENTRIES</span> <span class="token expression"><span class="token number">16</span></span></span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>

    WORD Magic<span class="token punctuation">;</span>
    <span class="token comment">// ……</span>
    DWORD NumberOfRvaAndSizes<span class="token punctuation">;</span>
    IMAGE_DATA_DIRECTORY DataDirectory<span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span> IMAGE_OPTIONAL_HEADER32<span class="token punctuation">,</span> <span class="token operator">*</span>PIMAGE_OPTIONAL_HEADER32<span class="token punctuation">;</span>
</code></pre></div><p>在 C/C++ 中这样在结构中使用数组是完全正确的，因为这些数组将作为整个结构的一部分，在对结构操作时直接访问结构所在内存块。但在 C# 这类语言中，则无法直接如此使用，因为数组是作为一种特殊的引用类型存在的，如定义：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_DATA_DIRECTORY</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> VirtualAddress<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> Size<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token comment">// ……</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> IMAGE_DATA_DIRECTORY DataDirectory<span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 C# 中这样定义结构中的数组是错误的，会在编译时获得一个 CS0650 错误：</p><p>以下为引用：</p><blockquote><p>error CS0650: 语法错误，错误的数组声明符。若要声明托管数组，秩说明符应位于变量标识符之前</p></blockquote><p>如果改用 C# 中引用类型的类似定义语法，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token comment">// ……</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY<span class="token punctuation">[</span><span class="token punctuation">]</span></span> DataDirectory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IMAGE_DATA_DIRECTORY</span><span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>则得到一个 CS0573 错误：</p><p>以下为引用：</p><blockquote><p>error CS0573: “IMAGE_OPTIONAL_HEADER.DataDirectory” : 结构中不能有实例字段初始值设定项</p></blockquote><p>因为结构内是不能够有引用类型的初始化的，这与 class 的初始化工作不同。如此一来只能将数组的初始化放到构造函数中，而且结构还不能有无参数的缺省构造函数，真是麻烦，呵呵</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY<span class="token punctuation">[</span><span class="token punctuation">]</span></span> DataDirectory<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">IMAGE_OPTIONAL_HEADER</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> ptr<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Magic <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        NumberOfRvaAndSizes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        DataDirectory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IMAGE_DATA_DIRECTORY</span><span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样一来看起来似乎能使了，但如果使用<code>Marshal.SizeOf(typeof(IMAGE_OPTIONAL_HEADER))</code> 看看就会发现，其长度根本就跟 C/C++ 中定义的长度不同。问题还是在于结构中数组，虽然看起来此数组是定义在结构内，但实际上在此结构中只有一个指向 <code>IMAGE_DATA_DIRECTORY[]</code> 数组类型的指针而已，本应保存在 <code>DataDirectory</code> 未知的数组内容，是在托管堆中。 于是问题就变成如何将引用类型的数组，放在一个值类型的结构中。</p><p>解决的方法有很多，如通过 <code>StructLayout</code> 显式指定结构的长度来限定内容：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> Size<span class="token operator">=</span>XXX<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY</span> DataDirectory<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意这儿 <code>StructLayout</code> 中 <code>Size</code> 指定的是整个结构的长度，因为 <code>DataDirectory</code> 已经是最后一个字段，故而数组的后 15 个元素被保存在未命名的堆栈空间内。使用的时候稍微麻烦一点，需要一次性读取整个结构，然后通过 <code>unsafe</code> 代码的指针操作来访问 <code>DataDirectory</code> 字段后面的其他数组元素。 这种方法的优点是定义简单，但使用时需要依赖 <code>unsafe</code> 的指针操作代码，且受到数组字段必须是在最后的限制。当然也可以通过 <code>LayoutKind.Explicit</code> 显式指定每个字段的未知来模拟多个结构内嵌数组，但这需要手工计算每个字段偏移，比较麻烦。</p><p>另外一种解决方法是通过 <code>Marshal</code> 的支持，显式定义数组元素所占位置，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">StructLayout</span><span class="token attribute-arguments"><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> Pack<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">MarshalAs</span><span class="token attribute-arguments"><span class="token punctuation">(</span>UnmanagedType<span class="token punctuation">.</span>ByValArray<span class="token punctuation">,</span> SizeConst<span class="token operator">=</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY<span class="token punctuation">[</span><span class="token punctuation">]</span></span> DataDirectory<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这种方法相对来说要优雅一些，通过 <code>Marshal</code> 机制支持的属性来定义值数组语义，使用起来与普通的数组区别不算太大。上述数组定义被编译成 IL 定义：</p><p>以下内容为程序代码:</p><p><code>.field public marshal( fixed array [16]) valuetype IMAGE_DATA_DIRECTORY[] DataDirectory</code></p><p>虽然类型还是 <code>valuetype IMAGE_DATA_DIRECTORY[]</code>，但因为 <code>marshal( fixed array [16])</code> 的修饰，此数组已经从引用语义改为值语义。不过这样做还是会受到一些限制，如不能多层嵌套、使用时性能受到影响等等。</p><p>除了上述两种在结构定义本身做文章的解决方法，还可以从结构的操作上做文章。</p><p>此类结构除了对结构内数组的访问外，主要的操作类型就是从内存块或输入流中读取整个结构，因此完全可以使用 CLR 提高的二进制序列化支持，通过实现自定义序列化函数来完成数据的载入和保存，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">struct</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ISerializable</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY<span class="token punctuation">[</span><span class="token punctuation">]</span></span> DataDirectory<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">IMAGE_OPTIONAL_HEADER</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> ptr<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Magic <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        NumberOfRvaAndSizes <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        DataDirectory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IMAGE_DATA_DIRECTORY</span><span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">SecurityPermissionAttribute</span><span class="token attribute-arguments"><span class="token punctuation">(</span>SecurityAction<span class="token punctuation">.</span>Demand<span class="token punctuation">,</span> SerializationFormatter <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetObjectData</span><span class="token punctuation">(</span><span class="token class-name">SerializationInfo</span> info<span class="token punctuation">,</span> <span class="token class-name">StreamingContext</span> context<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 完成序列化操作</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这种解决方法可以将结构的载入和存储，与结构的内部表现完全分离开来。虽然结构内部保存的只是数组引用，但用户并不需关心。但缺点是必须为每个结构都编写相应的序列化支持代码，编写和维护都比较麻烦。</p><p>与此思路类似的是我比较喜欢的一种解决方法，通过一个公共工具基类以 <code>Reflection</code> 的方式统一处理，如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IMAGE_OPTIONAL_HEADER</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BinaryBlock</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> IMAGE_NUMBEROF_DIRECTORY_ENTRIES <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">ushort</span></span> Magic<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">uint</span></span> NumberOfRvaAndSizes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">IMAGE_DATA_DIRECTORY<span class="token punctuation">[</span><span class="token punctuation">]</span></span> DataDirectory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IMAGE_DATA_DIRECTORY</span><span class="token punctuation">[</span>IMAGE_NUMBEROF_DIRECTORY_ENTRIES<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意原本的 <code>struct</code> 在这儿已经改为 <code>class</code>，因为通过这种方式已经没有必要非得固守值类型的内存模型。<code>BinaryBlock</code> 是一个公共的工具基类，负责通过 <code>Reflection</code> 提供类型的载入和存储功能，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BinaryBlock</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">ILog</span> _log <span class="token operator">=</span> LogManager<span class="token punctuation">.</span><span class="token function">GetLogger</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">BinaryBlock</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">BinaryBlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">LoadFromStream</span><span class="token punctuation">(</span><span class="token class-name">BinaryReader</span> reader<span class="token punctuation">,</span> <span class="token class-name">Type</span> objType<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>objType<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name"><span class="token keyword">char</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">ReadChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>objType<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name"><span class="token keyword">byte</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>objType<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name"><span class="token keyword">double</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">ReadDouble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>objType<span class="token punctuation">.</span>IsArray<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 处理数组的情况</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">FieldInfo</span> field <span class="token keyword">in</span> ClassType<span class="token punctuation">.</span><span class="token function">GetFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                field<span class="token punctuation">.</span><span class="token function">SetValue</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token function">LoadFromStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">LoadFromStream</span><span class="token punctuation">(</span><span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">LoadFromStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryReader</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>LoadFromStream</code> 是一个嵌套方法，负责根据指定字段类型从流中载入相应的值。使用时只需要对整个类型调用此方法，则会自动以 <code>Reflection</code> 机制，遍历类的所有字段进行处理，如果有嵌套定义的情况也可以直接处理。使用此方法，类型本身的定义基本上就无需担心载入和存储机制，只要从 <code>BinaryBlock</code> 类型继承即可。有兴趣的朋友还可以对此类进一步扩展，支持二进制序列化机制。</p><p>此外 C# 2.0 中为了解决此类问题提供了一个新的 <code>fixed array</code> 机制，支持在结构中直接定义内嵌值语义的数组，如</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">struct</span> <span class="token class-name">data</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">int</span></span> header<span class="token punctuation">;</span>
    <span class="token keyword">fixed</span> <span class="token keyword">int</span> values<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>此结构在编译时由编译器将数组字段翻译成一个外部值类型结构，以实现合适的空间布局，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token class-name"><span class="token keyword">private</span></span> sequential ansi <span class="token keyword">sealed</span> beforefieldinit data
extends <span class="token punctuation">[</span>mscorlib<span class="token punctuation">]</span>System<span class="token punctuation">.</span>ValueType
<span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token class-name">sequential</span> ansi <span class="token keyword">sealed</span> nested <span class="token keyword">public</span> beforefieldinit &#39;<span class="token operator">&lt;</span>values<span class="token operator">&gt;</span>e__FixedBuffer0&#39;
extends <span class="token punctuation">[</span>mscorlib<span class="token punctuation">]</span>System<span class="token punctuation">.</span>ValueType
<span class="token punctuation">{</span>
<span class="token punctuation">.</span>pack <span class="token number">0</span>
<span class="token punctuation">.</span>size <span class="token number">40</span>
<span class="token punctuation">.</span>custom instance <span class="token keyword">void</span> <span class="token punctuation">[</span>mscorlib<span class="token punctuation">]</span>System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>CompilerServices<span class="token punctuation">.</span>CompilerGeneratedAttribute<span class="token punctuation">::</span><span class="token punctuation">.</span><span class="token function">ctor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token number">01</span> <span class="token number">00</span> <span class="token number">00</span> <span class="token number">00</span> <span class="token punctuation">[</span>img<span class="token punctuation">]</span><span class="token operator">/</span>images<span class="token operator">/</span>wink<span class="token punctuation">.</span>gif<span class="token punctuation">[</span><span class="token operator">/</span>img<span class="token punctuation">]</span>
<span class="token punctuation">.</span>field <span class="token keyword">public</span> int32 FixedElementField
<span class="token punctuation">}</span> <span class="token comment">// end of class &#39;&lt;values&gt;e__FixedBuffer0&#39;</span>

<span class="token punctuation">.</span>field <span class="token keyword">public</span> int32 header
<span class="token punctuation">.</span>field <span class="token keyword">public</span> valuetype data<span class="token operator">/</span>&#39;<span class="token operator">&lt;</span>values<span class="token operator">&gt;</span>e__FixedBuffer0&#39; values
<span class="token punctuation">.</span>custom instance <span class="token keyword">void</span> <span class="token punctuation">[</span>mscorlib<span class="token punctuation">]</span>System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>CompilerServices<span class="token punctuation">.</span>FixedBufferAttribute<span class="token punctuation">::</span><span class="token punctuation">.</span><span class="token function">ctor</span><span class="token punctuation">(</span><span class="token keyword">class</span> <span class="token punctuation">[</span>mscorlib<span class="token punctuation">]</span>System<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> int32<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token comment">// end of class data</span>
</code></pre></div><p>可以看到 <code>values</code> 字段被编译成一个值类型，而值类型本身使用的是类似于上述第一种解决方法的思路，强行限制结构长度。而在使用时，也完全是类似于第一种解决方法的 <code>unsafe</code> 操作，如对此数组的访问被编译成 <code>unsafe</code> 的指针操作：</p><p>以下内容为程序代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 编译前</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
d<span class="token punctuation">.</span>values<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token operator">&amp;</span>data1<span class="token punctuation">.</span>values<span class="token punctuation">.</span>FixedElementField<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span> i<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
</code></pre></div><p>不幸的是这种方式必须通过 <code>unsafe</code> 方式编译，因为其内部都是通过 <code>unsafe</code> 方式实现的。而且也只能处理一级的嵌套定义，如果将 <code>IMAGE_OPTIONAL_HEADER</code> 的定义转换过来会得到一个 CS1663 错误： 以下内容为程序代码:</p><p><code>error CS1663: Fixed sized buffer type must be one of the following: bool, byte, short, int, long, char, sbyte, ushort, uint, ulong, float or double</code></p><hr><p>1楼</p><blockquote><p>2004-08-14 09:55 by wayfarer<br> 以前在使用结构时，没有用到数组，不曾想到值类型中使用引用类型的问题。看了本文，真是学到不少东西。不过确实太麻烦了，与其如此，还是将结构改为类最好：）</p><p>在结构中使用普通数组是如此，那么使用<code>ArrayList</code>、<code>Stack</code>等数据结构似乎也有这样的限制了？</p></blockquote><p>2楼</p><blockquote><p>2004-08-14 12:00 by Flier Lu<br> en,在结构中使用所有引用类型都存在类似的问题。不过好在这种问题一般只出在与现有系统交互或者移植现有系统的时候，对大多数使用者来说并不需要关心。</p></blockquote><p>3楼</p><blockquote><p>2004-08-14 16:13 by wayfarer<br> 确实，我也只有在遇到构建特别小的对象时，才会用到结构。否则通常还是使用类比较好。毕竟类对象支持的功能更强。</p><p>也许，在结构只有使用<code>String</code>引用类型，可以不受这种限制，毕竟<code>string</code>引用类型与一般的引用类型是不一样的：）</p></blockquote><p>4楼</p><blockquote><p>2004-08-16 01:11 by unruledboy（灵感之源）<br> 过去在非.net中一直坚持先考虑type/structure，因为它“轻”，class重。现在在.net中考虑到box/unbox的性能问题，一般都先考虑class，呵呵。</p></blockquote><p>5楼</p><blockquote><p>2004-08-16 03:39 by Flier Lu<br> nod,而且因为现在对象的分配效率已经跟结构差不了太远了，除非是大量分配频繁释放的情况，否则结构并不能带来太多性能上的优势。相对类的使用方便，结构受到太多的限制了 😦</p></blockquote><p>6楼</p><blockquote><p>2004-08-16 08:45 by Unruled Boy(灵感之源)<br> 晕，连在vb中最能体现type轻量级的，在vb.net中竟然不“继承”vb6的特性，反而用上了.NET Framework的笨重...</p></blockquote>`,58);function y(m,E){const a=t("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("在 C# 中处理结构内的数组"),c(a)])]),d])}const w=p(u,[["render",y],["__file","cspbase42.html.vue"]]);export{w as default};
