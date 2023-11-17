import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="environment-类-当前环境和平台的信息" tabindex="-1"><a class="header-anchor" href="#environment-类-当前环境和平台的信息" aria-hidden="true">#</a> Environment 类__当前环境和平台的信息</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> execom<span class="token operator">=</span>Environment<span class="token punctuation">.</span>CommandLine<span class="token punctuation">;</span> <span class="token comment">//获取该进程的命令行</span>
<span class="token class-name"><span class="token keyword">string</span></span> d<span class="token operator">=</span> Environment<span class="token punctuation">.</span>CurrentDirectory<span class="token punctuation">;</span> <span class="token comment">//获取和设置当前目录</span>

<span class="token class-name"><span class="token keyword">string</span></span> ver<span class="token operator">=</span>Environment<span class="token punctuation">.</span>OSVersion<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//获取包含当前平台标识符和版本号的 OperatingSystem 对象</span>
ver <span class="token operator">=</span> Environment<span class="token punctuation">.</span>Version<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//描述公共语言运行库的主版本、次版本、内部版本和修订号。</span>

<span class="token comment">//返回包含当前计算机中的逻辑驱动器名称的字符串数组</span>
<span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> dd<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetLogicalDrives</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span>MachineName<span class="token punctuation">;</span> <span class="token comment">//获取此本地计算机的 NetBIOS 名称</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span>NewLine<span class="token punctuation">;</span> <span class="token comment">//获取为此环境定义的换行字符串</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span>SystemDirectory<span class="token punctuation">;</span> <span class="token comment">//获取系统目录路径。</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span>UserDomainName<span class="token punctuation">;</span><span class="token comment">//获取与当前用户关联的网络域名</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span>UserName<span class="token punctuation">;</span> <span class="token comment">//获取启动当前线程的人的用户名</span>
<span class="token class-name"><span class="token keyword">long</span></span> mem <span class="token operator">=</span> Environment<span class="token punctuation">.</span>WorkingSet<span class="token punctuation">;</span> <span class="token comment">//获取映射到进程上下文的物理内存量</span>

<span class="token comment">//返回所有环境变量及变量值。</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DictionaryEntry</span> EnValue <span class="token keyword">in</span> Environment<span class="token punctuation">.</span><span class="token function">GetEnvironmentVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
    ss<span class="token operator">=</span>EnValue<span class="token punctuation">.</span>Key<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ss<span class="token operator">=</span>EnValue<span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//获取指向由指定枚举标识的系统特殊文件夹的路径</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetFolderPath</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>SpecialFolder<span class="token punctuation">.</span>ApplicationData<span class="token punctuation">)</span><span class="token punctuation">;</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetFolderPath</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>SpecialFolder<span class="token punctuation">.</span>Favorites<span class="token punctuation">)</span><span class="token punctuation">;</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetFolderPath</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>SpecialFolder<span class="token punctuation">.</span>Cookies<span class="token punctuation">)</span><span class="token punctuation">;</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetFolderPath</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>SpecialFolder<span class="token punctuation">.</span>System<span class="token punctuation">)</span><span class="token punctuation">;</span>
ss<span class="token operator">=</span>Environment<span class="token punctuation">.</span><span class="token function">GetFolderPath</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>SpecialFolder<span class="token punctuation">.</span>Desktop<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//获取或设置进程的退出代码</span>
Environment<span class="token punctuation">.</span>ExitCode<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
Environment<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//终止此进程并为基础操作系统提供指定的退出代码</span>
</code></pre></div>`,2),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","sysinfo16.html.vue"]]);export{k as default};
