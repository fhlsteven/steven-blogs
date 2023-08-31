import{_ as n,o as s,c as a,a as t}from"./app-8e5157a8.js";const p={},o=t(`<h1 id="如何用winform程序登录网页" tabindex="-1"><a class="header-anchor" href="#如何用winform程序登录网页" aria-hidden="true">#</a> 如何用winform程序登录网页</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  如何用winform程序登录网页
作　　者：  cdyj (老大)  
等　　级：
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  50
回复次数：  5
发表时间：  2003-9-7 15:57:57
</code></pre></div><p>正在编写一个用winform的程序登录网页，想法是给登录页面发送用户名和密码等登录信息，得到返回页面，根据其中的内容来进行下一步操作，最好是一直保持这个认证到winform程序关闭。</p><p>现在的情况是一般的页面可以这样，但是碰上服务器用Session变量记录登录信息的情况好像就不行了，还要一些页面好像连发送数据都不正确。不知该如何解决，请教各位高人</p><hr><hr><p>回复人： zjroland(孤独侠客) ( 二级(初级)) 信誉：100 2003-9-7 16:17:42 得分:0</p><blockquote><p>第一个例子<br> 数据库是SQLSERVER，你看看吧！！<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">loginSql</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> userId<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> pass<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;Select cPassword from users where cId=&#39;&quot;</span> <span class="token operator">+</span> userId <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> result <span class="token operator">=</span> objDP<span class="token punctuation">.</span><span class="token function">myLogin</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>pass<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name">OleDbConnection</span> <span class="token function">myConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> <span class="token string">&quot;Provider=SQLOLEDB;data source=localhost;database=mybank;uid=sa&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">OleDbConnection</span> myConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OleDbConnection</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    myConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> myConn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">myLogin</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> sql<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">OleDbCommand</span> dbComm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OleDbCommand</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">myConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">OleDbDataReader</span> dbReader <span class="token operator">=</span> dbComm<span class="token punctuation">.</span><span class="token function">ExecuteReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>dbReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> result <span class="token operator">=</span> dbReader<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>dbReader<span class="token punctuation">.</span><span class="token function">GetOrdinal</span><span class="token punctuation">(</span><span class="token string">&quot;cPassword&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;False&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>第二个例子：<br> 用System.Data.OleDb<br><br> 把你登陆界面的输入框的内容(用户名txtname.text和密码txtpass.text)作为你的commandtext中SQL的条件，<br><br></p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">dim</span> myconnection <span class="token keyword">as</span> oledbconnection<span class="token punctuation">(</span><span class="token string">&quot;Provider=Microsoft.Jet.OLEDB.4.0;Data Source=mmedia.mdb&quot;</span><span class="token punctuation">)</span>

myconnection<span class="token punctuation">.</span>open<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">dim</span> commandtext <span class="token keyword">as</span> <span class="token keyword">string</span> <span class="token operator">=</span><span class="token string">“select * from pass where name = &quot;</span> <span class="token operator">&amp;</span> <span class="token string">&quot;&#39;&quot;</span> <span class="token operator">&amp;</span> txtname<span class="token punctuation">.</span>text <span class="token operator">&amp;</span> <span class="token string">&quot; and pass = &quot;</span> <span class="token operator">&amp;</span> <span class="token string">&quot;&#39;&quot;</span> <span class="token operator">&amp;</span> txtpass<span class="token punctuation">.</span>text <span class="token operator">&amp;</span> <span class="token string">&quot;&#39;&quot;</span>

<span class="token keyword">dim</span> mydataadapter <span class="token keyword">as</span> <span class="token keyword">new</span> oledbdatadapter<span class="token punctuation">(</span>commandtext<span class="token punctuation">,</span>myconnection<span class="token punctuation">)</span>
<span class="token keyword">dim</span> mydataset <span class="token keyword">as</span> <span class="token keyword">new</span> dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span>  mydataset<span class="token punctuation">.</span>tables<span class="token punctuation">(</span><span class="token string">&quot;mmedia.mdb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>rows<span class="token punctuation">.</span>count<span class="token operator">=</span><span class="token number">0</span> <span class="token keyword">then</span>
messagebox<span class="token punctuation">(</span><span class="token string">&quot;密码或用户名输入错误&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;错误&quot;</span><span class="token punctuation">,</span>button<span class="token punctuation">.</span>ok<span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
txtname<span class="token punctuation">.</span>text<span class="token operator">=</span><span class="token string">&quot;&quot;</span>
txtpass<span class="token punctuation">.</span>text<span class="token operator">=</span><span class="token string">&quot;&quot;</span>
txtname<span class="token punctuation">.</span>focus<span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">&#39;聚焦</span>
myconnection<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
mydataadapter<span class="token operator">=</span><span class="token boolean">nothing</span>
mydataset<span class="token operator">=</span><span class="token boolean">nothing</span>
<span class="token keyword">else</span>
formmain<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">&#39;显示主窗口</span>
<span class="token keyword">end</span> <span class="token keyword">if</span> 
</code></pre></div><p>回复人： cdyj(老大) ( 一级(初级)) 信誉：100 2003-9-7 16:55:43 得分:0</p><blockquote><p>解答的不对哟，我是说用一个应用程序来登录网页，不是编网页了</p></blockquote><p>回复人： nehc(青义居士) ( 四级(中级)) 信誉：106 2003-9-7 22:49:17 得分:50</p><blockquote><p>使用http请求吧.<br> 你向服务器发送post或者get请求,请求网页.一切都是没有问题的.我试过.不过,怎么通过session继续下面的请求,我可就凡难了.</p></blockquote><p>回复人： lirenzhao(赵立仁) ( 一级(初级)) 信誉：100 2003-9-7 22:58:20 得分:0</p><blockquote><p>get http://host/login.aspx?name=username&amp;password=password</p></blockquote><p>回复人： cdyj(老大) ( 一级(初级)) 信誉：100 2003-9-12 21:55:29 得分:0</p><blockquote><p>我知道了，用Cookie保存返回的信息就可以了。谢谢各位</p></blockquote><p>该问题已经结贴 ，得分记录： nehc (50)、</p>`,20),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","netinter11.html.vue"]]);export{i as default};
