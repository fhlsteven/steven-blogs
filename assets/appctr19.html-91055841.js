import{_ as n,o as a,c as s,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="获取应用程序路径信息" tabindex="-1"><a class="header-anchor" href="#获取应用程序路径信息" aria-hidden="true">#</a> 获取应用程序路径信息</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">string</span></span> apppath <span class="token operator">=</span> Application<span class="token punctuation">.</span>ExecutablePath<span class="token punctuation">;</span><span class="token comment">//应用程序的可执行文件的路径</span>
<span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetDirectoryName</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//指定路径字符串的父目录信息</span>

str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetExtension</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//指定的路径字符串的扩展名</span>

<span class="token comment">//不带扩展名的指定路径字符串的文件名</span>
str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetFileNameWithoutExtension</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span>

str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetFileName</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//指定路径字符串的文件名和扩展名</span>


<span class="token class-name"><span class="token keyword">bool</span></span> t <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">HasExtension</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//是否包括文件扩展名</span>


str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetFullPath</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//指定路径字符串的绝对路径</span>

str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetPathRoot</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//指定路径的根目录信息</span>

str <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">GetTempPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//当前系统的临时文件夹的路径</span>


t <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">IsPathRooted</span><span class="token punctuation">(</span>apppath<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//是绝对路径信息还是相对路径信息</span>


<span class="token class-name"><span class="token keyword">char</span></span> c <span class="token operator">=</span> Path<span class="token punctuation">.</span>DirectorySeparatorChar<span class="token punctuation">;</span> <span class="token comment">//路径字符串中分隔符</span>

c <span class="token operator">=</span> Path<span class="token punctuation">.</span>PathSeparator<span class="token punctuation">;</span> <span class="token comment">//在环境变量中分隔路径字符串的分隔符</span>
</code></pre></div>`,2),c=[o];function e(l,u){return a(),s("div",null,c)}const i=n(p,[["render",e],["__file","appctr19.html.vue"]]);export{i as default};
