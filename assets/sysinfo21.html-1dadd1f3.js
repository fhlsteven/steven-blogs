import{_ as n,o as s,c as a,a as e}from"./app-a2b6e588.js";const t={},p=e(`<h1 id="运用-net读写windows注册编辑表" tabindex="-1"><a class="header-anchor" href="#运用-net读写windows注册编辑表" aria-hidden="true">#</a> 运用.NET读写Windows注册编辑表</h1><blockquote><p>2003-3-9 9:18:20</p></blockquote><p>如果你曾经使用过RegOpenKeyEx、RegCreateKeyEx、RegCloseKey等Win32 API函数读写过注册编辑表，你肯定非常熟悉这些复杂的Registry函数。相反，在.NET框架中，Registry和RegistryKey类提供了对Windows注册编辑表的控制，通过这些类你可非常容易地对注册编辑表进行读写。</p><p>这些类被定义在Microsoft.Win32命名空间和mscorlib.dll装配中，使用这些类之前，你必须使用using声明这些命名空间。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#using</span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> Microsoft<span class="token punctuation">::</span>win32<span class="token punctuation">;</span>
</code></pre></div><p>Registry类只有七个字段成员，使得你能够存取注册编辑表中七个特定的键，这同你在注册编辑表中打开一个键非常类似，这些所有的成员均返回一个指向注册键的指针。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>ClassesRoot 对应于HKEY_CLASSES_ROOT
CurrentConfig 对应于HKEY_CURRENT_CONFIG
CurrentUser 对应于HKEY_CURRENT_USER
DynData 对应于HKEY_DYN_DATA
LocalMachine 对应于HKEY_LOCAL_MACHINE
PerformanceData 对应于HKEY_PERFORMANCE_DATA
Users 对应于HKEY_USERS
</code></pre></div><p>比如你想读写<code>HKEY_LOCAL_MACHINE</code>的数据，你可以先获得一个指向该键的指针。</p><p><code>RegistryKey* pRegKey = Registry::LocalMachine;</code></p><p>接着调用RegistryKey的OpenSubKey成员函数，然后再调用Getvalue即可获得一个特定的字符串。</p><div class="language-c" data-ext="c"><pre class="language-c"><code>pRegKey<span class="token operator">-&gt;</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>L<span class="token string">&quot;SOFTWARE\\\\Kruse Inc\\\\Version&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Object <span class="token operator">*</span>pvalue <span class="token operator">=</span> pRegKey<span class="token operator">-&gt;</span><span class="token function">Getvalue</span><span class="token punctuation">(</span>L<span class="token string">&quot;kWise&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>如果你想设置一个键的值，则需要调用它的Setvalue函数。</p><p><code>pRegKey-&gt;Setvalue(L&quot;kWise&quot;, &quot;some value Here&quot;);</code></p><p>删除一个值可以使用：</p><p><code>pRegKey-&gt;Deletevalue(L&quot;kWise&quot;);</code></p><p>其它常用的成员函数还有：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>DeleteSubKey 删除一个子键
CreateSubKey 如果键已经存在就打开该键，否则就创建新键
DeleteSubKeyTree 删除子键及其节点
</code></pre></div><p>下面是程序代码例子（Microsoft Visual c++.net beta2调试通过）：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#using</span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> Microsoft<span class="token punctuation">::</span>Win32<span class="token punctuation">;</span>
<span class="token comment">// 这是应用程序的入口点</span>
<span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    RegistryKey <span class="token operator">*</span> pRegKey <span class="token operator">=</span> Registry<span class="token punctuation">::</span>LocalMachine<span class="token punctuation">;</span> 
    pRegKey <span class="token operator">=</span> pRegKey<span class="token operator">-&gt;</span><span class="token function">OpenSubKey</span><span class="token punctuation">(</span>L<span class="token string">&quot;HARDWARE\\\\DESCRIPTION\\\\System\\\\CentralProcessor\\\\0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Object <span class="token operator">*</span>pvalue <span class="token operator">=</span> pRegKey<span class="token operator">-&gt;</span><span class="token function">Getvalue</span><span class="token punctuation">(</span>L<span class="token string">&quot;VendorIdentifier&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Console<span class="token punctuation">::</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>L<span class="token string">&quot;本机的CPU为: {0}.&quot;</span><span class="token punctuation">,</span> pvalue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>头衔：黑暗圣堂
等级：版主
魅力：250
经验：250
财产：32589
文章：66
积分：250
门派：逍遥派
注册：2002-11-24
</code></pre></div>`,20),o=[p];function c(u,l){return s(),a("div",null,o)}const i=n(t,[["render",c],["__file","sysinfo21.html.vue"]]);export{i as default};
