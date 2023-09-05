import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},e=t(`<h1 id="在-net环境下用c-操纵活动目录" tabindex="-1"><a class="header-anchor" href="#在-net环境下用c-操纵活动目录" aria-hidden="true">#</a> 在．Net环境下用C#操纵活动目录</h1><p>Windows 2000 Server在Windows NT Server 4.0的基础上，进一步发展了&quot;活动目录（Active Directory）&quot;。活动目录是从一个数据存储开始的。它采用了类似Exchange Server的数据存储，称为：Extensible Storage Service （ESS）。其特点是不需要事先定义数据库的参数，可以做到动态地增长，性能非常优良。这个数据存储之上已建立索引的，可以方便快速地搜索和定位。活动目录的分区是&quot;域（Domain）&quot;，一个域可以存储上百万的对象。域之间还有层次关系，可以建立域树和域森林，无限地扩展。</p><p>活动目录充分体现了微软产品的&quot;ICE&quot;，即集成性（Integration），深入性(Comprehensive)，和易用性(Ease of Use)等优点。活动目录是一个完全可扩展，可伸缩的目录服务，既能满足商业ISP的需要，又能满足企业内部网和外联网的需要。</p><p>在．Net环境下操纵活动目录非常容易，其中提供了很多封装好的类用来操纵活动目录，这些类都存放在System.DirectoryServicess名称空间里。本文见简要介绍一下如何使用这些类来读取活动目录中的信息。</p><blockquote><p>注：我们假设您已经对活动目录的概念有了基本的了解。</p></blockquote><p>我的网络环境由两个域控制器，和数台win2000工作站组成，安装了活动目录用来保存域里的一切信息，域名是szcs。</p><p>下面我们开始建立一个简单的控制台应用程序，来读取活动目录的信息。</p><h2 id="第一步-建立项目" tabindex="-1"><a class="header-anchor" href="#第一步-建立项目" aria-hidden="true">#</a> 第一步：建立项目</h2><p>（这就不多说了）</p><h2 id="第二步-添加引用" tabindex="-1"><a class="header-anchor" href="#第二步-添加引用" aria-hidden="true">#</a> 第二步：添加引用</h2><p>由于操纵活动目录的类都存放在System.DirectoryServices.dll文件里。所以，我们必须在项目中添加对它的引用。<br> 方法：在菜单中，选择 项目－引用，选择System.DirectoryServices.dll，确定。</p><h2 id="第三步-引用名称空间" tabindex="-1"><a class="header-anchor" href="#第三步-引用名称空间" aria-hidden="true">#</a> 第三步：引用名称空间</h2><p>方法：在程序的开头出添加下面程序</p><p><code>using System.DirectoryServices;</code></p><h2 id="第四步-编写程序" tabindex="-1"><a class="header-anchor" href="#第四步-编写程序" aria-hidden="true">#</a> 第四步：编写程序</h2><p>下面是一个范例程序</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>PortableExecutable</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ADsample</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for Class1.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add code to start application here</span>
            <span class="token comment">//</span>
            <span class="token function">GetAllOU</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//获取目录中需要的组织单元(OU)</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetAllOU</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">DirectoryEntry</span> entry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectoryEntry</span><span class="token punctuation">(</span><span class="token string">&quot;LDAP://szcs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">DirectorySearcher</span> mySearcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DirectorySearcher</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
            mySearcher<span class="token punctuation">.</span>Filter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token string">&quot;(objectClass=organizationalUnit)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">SearchResult</span> resEnt <span class="token keyword">in</span> mySearcher<span class="token punctuation">.</span><span class="token function">FindAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>resEnt<span class="token punctuation">.</span><span class="token function">GetDirectoryEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\t&quot;</span>resEnt<span class="token punctuation">.</span><span class="token function">GetDirectoryEntry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token comment">//end foreach</span>
        <span class="token punctuation">}</span><span class="token comment">//end GetAllOU</span>
    <span class="token punctuation">}</span><span class="token comment">//end class</span>
<span class="token punctuation">}</span><span class="token comment">//end namespace</span>
</code></pre></div><p>程序注解:</p><ul><li><p>程序开始，实例化了一个DirectoryEntry类，其构造函数的参数是&quot;LDAP://szcs&quot;，这里szcs是域名。</p></li><li><p>然后又实例化了一个DirectorySearcher类，用来查询szcs域中活动目录中的信息，其构造函数的参数是一个DirectoryEntry类的实例对象。</p></li><li><p>DirectorySearcher类的Filter属性用来设置查询的过滤条件，一般有以下三种：</p><ol><li>objectClass=organizationalUnit 查询条件是所有的组织单元（OU）</li><li>objectClass=group 查询条件是所有的组（GROUP）</li><li>objectClass=user 查询条件是所有的用户（USER）</li></ol><p>当然还可以设置其他的过滤条件，而且可以使用逻辑运算符，详情请参加MSDN</p></li><li><p>DirectorySearcher类的Findall方法用来递归的查找所有符合条件的对象。其返回结果是一个SearchResult类型的对象，这是一个集合类型。</p></li><li><p>用Foreach语句访问集合中的所有对象，获得对象的信息。</p></li></ul>`,19),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","netcode48.html.vue"]]);export{r as default};