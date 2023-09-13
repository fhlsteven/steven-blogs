import{_ as e,r as o,o as c,c as l,b as s,d as n,e as t,a as p}from"./app-477de5b2.js";const i={},r={id:"cs0019-c-中移位操作符的语法陷阱",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#cs0019-c-中移位操作符的语法陷阱","aria-hidden":"true"},"#",-1),k={href:"https://www.cnblogs.com/flier/archive/2004/08/08/31277.html",target:"_blank",rel:"noopener noreferrer"},d=p(`<p>Posted on 2004-08-08 20:40 Flier Lu 阅读(45) 评论(0) 编辑 收藏</p><p>为了在一个标志字段中保存多种类型的标志，C 语言中定常见模式之一，是先定义一个 <code>XXX_MASK</code>，再定义一个 <code>XXX_SHIFT</code>，然后通过移位操作定义这段位上的标志，如 <code>WinCrypt.h</code> 中定义证书存储位置标志时，将位置标志位放在高16位中：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token comment">// Includes flags and location</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_MASK</span>                  <span class="token expression"><span class="token number">0xFFFF0000</span></span></span>

<span class="token comment">// Location of the system store:</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_LOCATION_MASK</span>         <span class="token expression"><span class="token number">0x00FF0000</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_LOCATION_SHIFT</span>        <span class="token expression"><span class="token number">16</span></span></span>

<span class="token comment">//  Registry: HKEY_CURRENT_USER or HKEY_LOCAL_MACHINE</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_CURRENT_USER_ID</span>       <span class="token expression"><span class="token number">1</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_LOCAL_MACHINE_ID</span>      <span class="token expression"><span class="token number">2</span></span></span>

<span class="token comment">// ……</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_CURRENT_USER</span>          </span>
    <span class="token punctuation">(</span>CERT_SYSTEM_STORE_CURRENT_USER_ID <span class="token operator">&lt;&lt;</span> CERT_SYSTEM_STORE_LOCATION_SHIFT<span class="token punctuation">)</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">CERT_SYSTEM_STORE_LOCAL_MACHINE</span>         </span>
    <span class="token punctuation">(</span>CERT_SYSTEM_STORE_LOCAL_MACHINE_ID <span class="token operator">&lt;&lt;</span> CERT_SYSTEM_STORE_LOCATION_SHIFT<span class="token punctuation">)</span>
</code></pre></div><p>而在 C# 中一般使用以 <code>FlagsAttribute</code> 标记后的 <code>Enum</code> 来模拟类似语义，如</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Flags</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">CertSystemStoreFlag</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
<span class="token punctuation">{</span>    
  <span class="token comment">// Registry: HKEY_CURRENT_USER or HKEY_LOCAL_MACHINE</span>
  CERT_SYSTEM_STORE_CURRENT_USER_ID               <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  CERT_SYSTEM_STORE_LOCAL_MACHINE_ID              <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>

  <span class="token comment">// Includes flags and location</span>
  CERT_SYSTEM_STORE_MASK                          <span class="token operator">=</span> <span class="token number">0xFFFF0000</span><span class="token punctuation">,</span>

  <span class="token comment">// Set if pvPara points to a CERT_SYSTEM_STORE_RELOCATE_PARA structure</span>
  CERT_SYSTEM_STORE_RELOCATE_FLAG                 <span class="token operator">=</span> <span class="token number">0x80000000</span><span class="token punctuation">,</span>
  
  CERT_SYSTEM_STORE_LOCATION_MASK                 <span class="token operator">=</span> <span class="token number">0x00FF0000</span><span class="token punctuation">,</span>    
  CERT_SYSTEM_STORE_LOCATION_SHIFT                <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">,</span>
  
  CERT_SYSTEM_STORE_CURRENT_USER                  <span class="token operator">=</span> ……
<span class="token punctuation">}</span>
</code></pre></div><p><code>FlagsAttribute</code> 标记使得此 <code>Enum</code> 能够以位域(bit field)形式进行操作，既有 <code>Flags</code> 的类型安全特性，又有进行位操作的灵活性。同时还能定义此 <code>Enum</code> 的基本类型，如上面指定的 <code>uint</code>，以最大限度兼容现有 C 代码。</p><p>不过这样组合使用 <code>Enum</code> 的多个特性时有一个小小的语法陷阱，不能将 C# 完全等同于 C++ 的语法，例如要这样照搬 C++ 定义语法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Flags</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">CertSystemStoreFlag</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
<span class="token punctuation">{</span> 
  CERT_SYSTEM_STORE_CURRENT_USER_ID               <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  
  CERT_SYSTEM_STORE_LOCATION_SHIFT                <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">,</span>
  
  CERT_SYSTEM_STORE_CURRENT_USER <span class="token operator">=</span> CERT_SYSTEM_STORE_CURRENT_USER_ID <span class="token operator">&lt;&lt;</span> CERT_SYSTEM_STORE_LOCATION_SHIFT<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译时就会获得一个让人困惑的警告消息：</p><p>以下为引用：</p><blockquote><p>CS0019: Operator &#39;&lt;&lt;&#39; cannot be applied to operands of type &#39;uint&#39; and &#39;uint&#39;</p></blockquote>`,11),_=s("code",null,"uint",-1),E={href:"http://www.jaggersoft.com/csharp_standard/14.8.htm",target:"_blank",rel:"noopener noreferrer"},S=p(`<p>以下为引用：</p><blockquote></blockquote><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>The &lt;&lt; and &gt;&gt; operators are used to perform bit shifting operations.
  
    shift-expression :
        additive-expression
        shift-expression &lt;&lt; additive-expression
        shift-expression &gt;&gt; additive-expression
        
...

The predefined shift operators are listed below.

    2 Shift left:

        int operator &lt;&lt;(int x, int count);  
        uint operator &lt;&lt;(uint x, int count);  
        long operator &lt;&lt;(long x, int count);  
        ulong operator &lt;&lt;(ulong x, int count);  

    3 The &lt;&lt; operator shifts x left by a number of bits computed as described below. 4 The high-order bits outside the range of the result type of x are discarded, the remaining bits are shifted left, and the low-order empty bit positions are set to zero. 
    
    5 Shift right: 
    
        int operator &gt;&gt;(int x, int count);  
        uint operator &gt;&gt;(uint x, int count);  
        long operator &gt;&gt;(long x, int count);  
        ulong operator &gt;&gt;(ulong x, int count);  
    
    6 The &gt;&gt; operator shifts x right by a number of bits computed as described below. 7 When x is of type int or long, the low-order bits of x are discarded, the remaining bits are shifted right, and the high-order empty bit positions are set to zero if x is non-negative and set to one if x is negative. 8 When x is of type uint or ulong, the low-order bits of x are discarded, the remaining bits are shifted right, and the high-order empty bit positions are set to zero.        
</code></pre></div><p>可以看到，双目移位操作符的两个参数实际上是不一样的，操作符左的参数可以是有/无符号的<code>int</code>和<code>long</code>，但操作符右边的则都是 <code>int</code>。因此上面那个错误的表达式中，移位操作符右边数字应该被显式转换为 <code>int</code> 来符合 C# 的语法要求。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Flags</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">CertSystemStoreFlag</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
<span class="token punctuation">{</span> 
  CERT_SYSTEM_STORE_CURRENT_USER_ID               <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>   
  
  CERT_SYSTEM_STORE_LOCATION_SHIFT                <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">,</span>
  
  CERT_SYSTEM_STORE_CURRENT_USER <span class="token operator">=</span> CERT_SYSTEM_STORE_CURRENT_USER_ID <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>CERT_SYSTEM_STORE_LOCATION_SHIFT<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>呵呵，虽然比较别扭，但没办法，谁让 C# 定义得这么严谨呢 😛</p><p>btw: 感谢 Junfeng Zhang 帮忙指出问题所在</p><hr><p>1楼</p><blockquote><p>2004-08-09 10:02 by 笨笨蜗牛<br> 没有实验过，不过当我对<code>ulong</code>数据移位时好象没发现这样的问题（估计我只是在解决问题的时候看运行结果了）</p><p>呵呵。</p><p><code>long</code>型整数的每个字节存放到一个数组元素里？？？请教高手来讨论一下～～～～！<br> http://community.csdn.net/Expert/TopicView.asp?id=3251848</p></blockquote><p>2楼 2004-08-09 15:31 by Flier Lu</p><blockquote><p>to 笨笨蜗牛:</p><pre><code>我的解决方法，呵呵，有点小题大做了
</code></pre></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">EntryPoint</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">long</span></span> l1 <span class="token operator">=</span> <span class="token number">1234567890123456</span><span class="token punctuation">,</span> l2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token class-name">GCHandle</span> h1 <span class="token operator">=</span> GCHandle<span class="token punctuation">.</span><span class="token function">Alloc</span><span class="token punctuation">(</span>l1<span class="token punctuation">,</span> GCHandleType<span class="token punctuation">.</span>Pinned<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Marshal<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>h1<span class="token punctuation">.</span><span class="token function">AddrOfPinnedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    h1<span class="token punctuation">.</span><span class="token function">Free</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">GCHandle</span> h2 <span class="token operator">=</span> GCHandle<span class="token punctuation">.</span><span class="token function">Alloc</span><span class="token punctuation">(</span>l2<span class="token punctuation">,</span> GCHandleType<span class="token punctuation">.</span>Pinned<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Marshal<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> h2<span class="token punctuation">.</span><span class="token function">AddrOfPinnedObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">long</span></span> l3 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span>h2<span class="token punctuation">.</span>Target<span class="token punctuation">;</span>
    h2<span class="token punctuation">.</span><span class="token function">Free</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;{0} -&gt; {1} -&gt; {2}&quot;</span><span class="token punctuation">,</span> l1<span class="token punctuation">,</span> l2<span class="token punctuation">,</span> l3<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><blockquote><p>回头我写篇blog详细说说</p></blockquote>`,14);function T(m,R){const a=o("ExternalLinkIcon");return c(),l("div",null,[s("h1",r,[u,n(),s("a",k,[n("CS0019: C#中移位操作符的语法陷阱"),t(a)])]),d,s("p",null,[n("以一个 C++ 背景的程序员角度来看，实在是无法想像为什么移位操作竟然不能对 "),_,n(" 进行处理，不过在 C# 中这恰恰是语法所要求的。ECMA-334 C# Language Specification 的"),s("a",E,[n("第 14.8 节 Shift operators"),t(a)]),n(" 是这样定义 C# 的移位操作符的：")]),S])}const h=e(i,[["render",T],["__file","cspbase37.html.vue"]]);export{h as default};
