import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="一个用com管理dns的简单类" tabindex="-1"><a class="header-anchor" href="#一个用com管理dns的简单类" aria-hidden="true">#</a> 一个用Com管理DNS的简单类</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DNS</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>IDisposable</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> server <span class="token operator">=</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> userName <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> Password <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemLocatorClass</span> sc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemServices</span> svs <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemObject</span> dnsSrv <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> isConneced <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Server
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> server<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span>
        <span class="token punctuation">{</span>
            server <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DNS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//</span>
        <span class="token comment">// TODO: 在此处添加构造函数逻辑</span>
        <span class="token comment">//</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DNS</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> server<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>server <span class="token operator">=</span> server<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">DNS</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> server<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> username<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> pwd<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>server <span class="token operator">=</span> server<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userName <span class="token operator">=</span> username<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Password <span class="token operator">=</span> pwd<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token operator">~</span><span class="token function">DNS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        svs <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        dnsSrv <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">WbemScripting<span class="token punctuation">.</span>SWbemLocatorClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            svs <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">ConnectServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token string">@&quot;\\root\\MicrosoftDNS&quot;</span><span class="token punctuation">,</span> userName<span class="token punctuation">,</span> Password<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            dnsSrv <span class="token operator">=</span> svs<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;MicrosoftDNS_Server.Name=&#39;&quot;</span> <span class="token operator">+</span> server <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>isConneced <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//System.Web.HttpContext.Current.Response.Write(e);</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>isConneced <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>isConneced<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">Exception</span> <span class="token function">AddARecord</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Domain<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> HostName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> IPAddress<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>isConneced<span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;Not Connected!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">object</span></span> strRR <span class="token operator">=</span> HostName <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> Domain <span class="token operator">+</span> <span class="token string">&quot;. IN A &quot;</span> <span class="token operator">+</span> IPAddress<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> srv <span class="token operator">=</span> server <span class="token keyword">as</span> <span class="token class-name">Object</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">object</span></span> dm <span class="token operator">=</span> Domain <span class="token keyword">as</span> <span class="token class-name">Object</span><span class="token punctuation">;</span>
            <span class="token comment">//System.Web.HttpContext.Current.Response.Write(strRR+&quot;&lt;br&gt;&quot;);</span>
            <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemObject</span> objRR <span class="token operator">=</span> svs<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;MicrosoftDNS_ResourceRecord&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemMethod</span> method <span class="token operator">=</span> objRR<span class="token punctuation">.</span>Methods_<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token string">&quot;CreateInstanceFromTextRepresentation&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">WbemScripting<span class="token punctuation">.</span>SWbemObject</span> inparam <span class="token operator">=</span> method<span class="token punctuation">.</span>InParameters<span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;DnsServerName&quot;</span><span class="token punctuation">,</span> WbemScripting<span class="token punctuation">.</span>WbemCimtypeEnum<span class="token punctuation">.</span>wbemCimtypeString<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;ContainerName&quot;</span><span class="token punctuation">,</span> WbemScripting<span class="token punctuation">.</span>WbemCimtypeEnum<span class="token punctuation">.</span>wbemCimtypeString<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;TextRepresentation&quot;</span><span class="token punctuation">,</span> WbemScripting<span class="token punctuation">.</span>WbemCimtypeEnum<span class="token punctuation">.</span>wbemCimtypeString<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token string">&quot;DnsServerName&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set_Value</span><span class="token punctuation">(</span><span class="token keyword">ref</span> srv<span class="token punctuation">)</span><span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token string">&quot;ContainerName&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set_Value</span><span class="token punctuation">(</span><span class="token keyword">ref</span> dm<span class="token punctuation">)</span><span class="token punctuation">;</span>
            inparam<span class="token punctuation">.</span>Properties_<span class="token punctuation">.</span><span class="token function">Item</span><span class="token punctuation">(</span><span class="token string">&quot;TextRepresentation&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set_Value</span><span class="token punctuation">(</span><span class="token keyword">ref</span> strRR<span class="token punctuation">)</span><span class="token punctuation">;</span>

            objRR<span class="token punctuation">.</span><span class="token function">ExecMethod_</span><span class="token punctuation">(</span><span class="token string">&quot;CreateInstanceFromTextRepresentation&quot;</span><span class="token punctuation">,</span> inparam<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> ex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">finally</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StartDNSService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dnsSrv<span class="token punctuation">.</span><span class="token function">ExecMethod_</span><span class="token punctuation">(</span><span class="token string">&quot;StartService&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StopDNSService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dnsSrv<span class="token punctuation">.</span><span class="token function">ExecMethod_</span><span class="token punctuation">(</span><span class="token string">&quot;StopService&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StartScavenging</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>dnsSrv<span class="token punctuation">.</span><span class="token function">ExecMethod_</span><span class="token punctuation">(</span><span class="token string">&quot;StartScavenging&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token preprocessor property">#<span class="token directive keyword">region</span> IDisposable 成员</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sc <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        svs <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        dnsSrv <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
<span class="token punctuation">}</span>
</code></pre></div>`,2),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","netcode31.html.vue"]]);export{i as default};
