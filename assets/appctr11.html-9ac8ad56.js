import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},e=t(`<h1 id="如何确保只有一个应用程序实例在运行" tabindex="-1"><a class="header-anchor" href="#如何确保只有一个应用程序实例在运行" aria-hidden="true">#</a> 如何确保只有一个应用程序实例在运行？</h1><blockquote><p>作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-6-16 6:58:22</p></blockquote><p>用System.Diagnostics 的Process类</p><p>[C#]</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Process</span> <span class="token function">RunningInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Process</span> current <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Process<span class="token punctuation">[</span><span class="token punctuation">]</span></span> processes <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetProcessesByName</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>ProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Loop through the running processes in with the same name </span>

    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Process</span> process <span class="token keyword">in</span> processes<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Ignore the current process </span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>Id <span class="token operator">!=</span> current<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Make sure that the process is running from the exe file. </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span> current<span class="token punctuation">.</span>MainModule<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//Return the other process instance. </span>
                <span class="token keyword">return</span> process<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//No other instance was found, return null. </span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>[VB.NET]</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Public</span> <span class="token keyword">Shared</span> <span class="token keyword">Function</span> RunningInstance<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">As</span> Process

     <span class="token keyword">Dim</span> current <span class="token keyword">As</span> Process <span class="token operator">=</span> Process<span class="token punctuation">.</span>GetCurrentProcess<span class="token punctuation">(</span><span class="token punctuation">)</span>  
     <span class="token keyword">Dim</span> processes <span class="token keyword">As</span> Process<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> Process<span class="token punctuation">.</span>GetProcessesByName<span class="token punctuation">(</span>current<span class="token punctuation">.</span>ProcessName<span class="token punctuation">)</span> 
 
     <span class="token comment">&#39;Loop through the running processes in with the same name  </span>
     <span class="token keyword">Dim</span> process <span class="token keyword">As</span> Process 
 
     <span class="token keyword">For</span> <span class="token keyword">Each</span> process <span class="token keyword">In</span> processes  
          <span class="token comment">&#39;Ignore the current process  </span>
          <span class="token keyword">If</span> process<span class="token punctuation">.</span>Id <span class="token operator">&lt;</span><span class="token operator">&gt;</span> current<span class="token punctuation">.</span>Id <span class="token keyword">Then</span> 
 
               <span class="token comment">&#39;Make sure that the process is running from the exe file.  </span>
               <span class="token keyword">If</span> [Assembly]<span class="token punctuation">.</span>GetExecutingAssembly<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span>Replace<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\&quot;</span><span class="token punctuation">)</span> <span class="token operator">=</span> current<span class="token punctuation">.</span>MainModule<span class="token punctuation">.</span>FileName <span class="token keyword">Then</span>  
                    <span class="token comment">&#39;Return the other process instance.  </span>
                    <span class="token keyword">Return</span> process  
               <span class="token keyword">End</span> <span class="token keyword">If</span>  
          <span class="token keyword">End</span> <span class="token keyword">If</span> 
 
     <span class="token keyword">Next</span> process 
 
     <span class="token comment">&#39;No other instance was found, return null.  </span>
     <span class="token keyword">Return</span> <span class="token boolean">Nothing</span> 

<span class="token keyword">End</span> <span class="token keyword">Function</span> <span class="token comment">&#39;RunningInstance</span>
</code></pre></div>`,7),o=[e];function c(u,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","appctr11.html.vue"]]);export{k as default};
