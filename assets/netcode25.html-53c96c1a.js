import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="获得计算机名" tabindex="-1"><a class="header-anchor" href="#获得计算机名" aria-hidden="true">#</a> 获得计算机名</h1><h2 id="获得本地计算机名" tabindex="-1"><a class="header-anchor" href="#获得本地计算机名" aria-hidden="true">#</a> 获得本地计算机名</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> hostName <span class="token operator">=</span> System<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span>MachineName<span class="token punctuation">;</span>
    textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> hostName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> hostName <span class="token operator">=</span> System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Dns<span class="token punctuation">.</span><span class="token function">GetHostName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    textBox2<span class="token punctuation">.</span>Text <span class="token operator">=</span> hostName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="获得网络计算机名" tabindex="-1"><a class="header-anchor" href="#获得网络计算机名" aria-hidden="true">#</a> 获得网络计算机名</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">IPAddress</span> myIP<span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        myIP <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将字符串转换为IPAddress</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token comment">//判断IP地址的合法性</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;输入的IP地址不合法！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;警告！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//通过给定的IP地址，进行DNS查询，得到远程主机名 </span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">IPHostEntry</span> myHost <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>myIP<span class="token punctuation">)</span><span class="token punctuation">;</span>
        textBox2<span class="token punctuation">.</span>Text <span class="token operator">=</span> myHost<span class="token punctuation">.</span>HostName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">{</span>
        MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;错误信息：IP地址为&quot;</span> <span class="token operator">+</span> textBox1<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;的主机没有响应&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;警告！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>IPAddress</code> 类包含计算机在 IP 网络上的地址.</p><p><code>Dns</code> 类是一个静态类，它从 Internet 域名系统 (DNS) 检索关于特定主机的信息。</p><blockquote><p>GetHostByAddress(IPAddress/string) 已重载。获取 IP 地址的 DNS 主机信息。<br> GetHostByName(string) 获取指定 DNS 主机名的 DNS 信息<br> GetHostName() 获取本地计算机的主机名</p></blockquote><p><code>IPHostEntry</code> 类 为 Internet 主机地址信息提供容器类。</p><blockquote><p>IPHostEntry 类将一个域名系统 (DNS) 主机名与一组别名和一组匹配的 IP 地址关联。<br> IPHostEntry 类作为 Helper 类和 Dns 类一起使用</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">IPAddress</span> myIP <span class="token operator">=</span> IPAddress<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.1.2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">IPHostEntry</span> myHost <span class="token operator">=</span> Dns<span class="token punctuation">.</span><span class="token function">GetHostByAddress</span><span class="token punctuation">(</span>myIP<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,11),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netcode25.html.vue"]]);export{i as default};
