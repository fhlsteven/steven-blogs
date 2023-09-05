import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p="/steven-blogs/assets/netcode45_1-937779ac.png",e={},o=t(`<h1 id="利用directoryentry组件来查看网络" tabindex="-1"><a class="header-anchor" href="#利用directoryentry组件来查看网络" aria-hidden="true">#</a> 利用DirectoryEntry组件来查看网络</h1><h2 id="摘要" tabindex="-1"><a class="header-anchor" href="#摘要" aria-hidden="true">#</a> 摘要</h2><p><code>System.DirectoryServices.DirectoryEntry</code>组件提供了对Active Directory的访问。本文以两个简单的小程序为例，阐述了如何利用此组件查看网络的各节点的信息。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>目录
问题的提出
问题的初步解决
改进后的Windows Forms方案
总结
参考文献
附注
作者
</code></pre></div><h2 id="问题的提出" tabindex="-1"><a class="header-anchor" href="#问题的提出" aria-hidden="true">#</a> 问题的提出</h2><p>刚接触.Net网络编程的时候，我常想，有没有办法列出局域网中的所有计算机呢？直到最近看了MSDN中关于DirectoryEntry 类的介绍，这才找到了答案。</p><h2 id="问题的初步解决" tabindex="-1"><a class="header-anchor" href="#问题的初步解决" aria-hidden="true">#</a> 问题的初步解决</h2><p>DirectoryEntry组件提供了Path属性，根据文档，此属性指定了目录服务中用来访问对象的对象名，其格式如下：</p><p><code>protocol://servername:port number/distinguished name</code></p><p>此语句的第一部分定义了访问将使用的协议，如</p><p>LDAP: (Lightweight Directory Access Protocol)<br> IIS: (提供IIS元数据来读及配置Internet Infomation Server)<br> WinNT: (提供在非常有限的性能下对Windows NT域的访问)<br> NDS: (提供对Novell Directory Service的访问)<br> 等等（详细信息清参考MSDN）。</p><p>据此，我们构造了一个DirectoryEntry实例，将它的Path设为&quot;WinNT:&quot;，以通过对它的所有子项的枚举来发现网络上的所有域（以及工作组）。这样，再对所发现的域（以及工作组）的子项进行枚举，就可以发现网络上的所有计算机。下面的一个控制台小程序演示了这一点。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>DirectoryServices</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">TempClass</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">EnumComputers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EnumComputers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectoryEntry</span><span class="token punctuation">(</span><span class="token string">&quot;WinNT:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> domain <span class="token keyword">in</span> root<span class="token punctuation">.</span>Children<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Domain | WorkGroup:\\t&quot;</span> <span class="token operator">+</span> domain<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> computer <span class="token keyword">in</span> domain<span class="token punctuation">.</span>Children<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Computer:\\t&quot;</span> <span class="token operator">+</span> computer<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="改进后的windows-forms方案" tabindex="-1"><a class="header-anchor" href="#改进后的windows-forms方案" aria-hidden="true">#</a> 改进后的Windows Forms方案</h2><p>上面代码中两个嵌套的foreach循环看起来并不是太好，并且控制台的显示效果也并不那么美观。下面，我将对代码进行一些改动，并将它移植到WinForm上。<br> 新建一个<code>Windows Application[C#]</code>,在Form上添加一个TreeView,命名为treeView1。</p><p>添加以下几个函数：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//用指定的文本构造一个节点，将其添加为参数parant的子节点，并返回刚构造的节点</span>
<span class="token keyword">private</span> <span class="token return-type class-name">TreeNode</span> <span class="token function">AddNode</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> parant<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TreeNode</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    parant<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//递归地找到参数entry的所有子节点，并在treeView1中显示；这里的entry与entryNode需相对应</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EnumChildren</span><span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> entry<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> entryNode<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>Children <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>     <span class="token comment">//如果无子节点则结束</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> i <span class="token keyword">in</span> entry<span class="token punctuation">.</span>Children<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//将各子节点加入TreeView,并进行递归</span>
            <span class="token function">EnumChildren</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token function">AddNode</span><span class="token punctuation">(</span>entryNode<span class="token punctuation">,</span> i<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//用给定的字符串构造根节点，并列出其所有子节点</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Enumerate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name">DirectoryEntry</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectoryEntry</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">TreeNode</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">EnumChildren</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样，通过传递 &quot;WinNT:&quot; 给函数Enumerate(string),就可以在TreeView中看到网络上的所有计算机，以及每台计算机上的用户、组、服务等资源，效果如图：</p><p><img src="`+p+'" alt="netcode45_1"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文主要介绍了用DirectoryEntry组件来浏览网络中的各节点计算机的信息，实际上，DirectoryEntry组件功能强大，例如将&quot;IIS:&quot;作为DirectoryEntry的Path属性，就可以列出域中运行着IIS(Internet Infomation Server)的服务器，并可获得IIS元数据等属性；此外，还可以用它来对网络进行远程管理与配置，有兴趣者不妨一试。</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><p>Windows Forms 高级编程 Wrox Press,清华大学出版社</p><h2 id="附注" tabindex="-1"><a class="header-anchor" href="#附注" aria-hidden="true">#</a> 附注</h2><p>如果你编译并运行了第一个例子（记得添加对System.DirectoryServices.dll的引用），你会发现它会在列出计算机名的同时，还输出了 Computer: Schema 这并不是出了什么错误，对这个叫做Schema的DirectoryEntry得子项进行枚举可以发现，它正如其名，描述了Computer项的模式。当然，为了结果的有效性，我们可以滤掉它。</p><hr><p>作者:张义</p>',27),c=[o];function r(u,i){return s(),a("div",null,c)}const k=n(e,[["render",r],["__file","netcode45.html.vue"]]);export{k as default};
