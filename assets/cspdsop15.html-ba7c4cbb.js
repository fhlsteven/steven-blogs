import{_ as n,o as s,c as a,d as t}from"./app-35fb03de.js";const p={},o=t(`<h1 id="c-中一些字符串操作的常用用法-fuxingboy-转贴" tabindex="-1"><a class="header-anchor" href="#c-中一些字符串操作的常用用法-fuxingboy-转贴" aria-hidden="true">#</a> C#中一些字符串操作的常用用法 fuxingboy（转贴）</h1><p>关键字 C# 字符串操作</p><p>出处 http://www.wrclub.net/study/listarticle.aspx?id=1235</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//获得汉字的区位码</span>
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
<span class="token class-name"><span class="token keyword">string</span></span> s1 <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> s2 <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">int</span></span> t1 <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">int</span></span> t2 <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>s2<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

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
</code></pre></div>`,4),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","cspdsop15.html.vue"]]);export{i as default};
