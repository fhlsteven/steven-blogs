import{_ as n,o as s,c as a,a as t}from"./app-57d1f7b1.js";const p={},o=t(`<h1 id="利用c-制作简单的留言板" tabindex="-1"><a class="header-anchor" href="#利用c-制作简单的留言板" aria-hidden="true">#</a> 利用c#制作简单的留言板</h1><p>首先要感谢bigeagle的帮助，这个也是参考她的bbs做成的</p><p>留言板分三个模块：列出留言列表、显示详细内容、发表留言</p><p>notepage.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">notpage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SQL</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Xml<span class="token punctuation">.</span>XPath</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">////////////////////////////////////////////////////////////////////</span>
    <span class="token comment">//</span>
    <span class="token comment">// Class Name : 留言板</span>
    <span class="token comment">//</span>
    <span class="token comment">// Description: 构造一个留言板对象</span>
    <span class="token comment">//</span>
    <span class="token comment">// date: 2000/06/06</span>
    <span class="token comment">//</span>
    <span class="token comment">// 作者： 天啦</span>
    <span class="token doc-comment comment">/// ////////////////////////////////////////////////////////////////</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for notepage.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">notepage</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//私有变量</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> n_intID<span class="token punctuation">;</span> <span class="token comment">//ID编号</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> n_strTitle<span class="token punctuation">;</span> <span class="token comment">//主题</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> n_strAuthor<span class="token punctuation">;</span> <span class="token comment">//留言人</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> n_strContent<span class="token punctuation">;</span> <span class="token comment">//留言内容</span>
        <span class="token keyword">private</span> <span class="token class-name">DateTime</span> n_dateTime<span class="token punctuation">;</span> <span class="token comment">//留言时间</span>

        <span class="token comment">//属性</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ID
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n_intID<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                n_intID <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n_strTitle<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                n_strTitle <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Author
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n_strAuthor<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                n_strAuthor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Content
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n_strContent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                n_strContent <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> adddate
        <span class="token punctuation">{</span>

            <span class="token keyword">get</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n_dateTime<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span>
                n_dateTime <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//构造函数</span>
        <span class="token keyword">public</span> <span class="token function">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add Constructor Logic here</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>n_intID <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>n_strTitle <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>n_strAuthor <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>n_strContent <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>n_dateTime <span class="token operator">=</span> System<span class="token punctuation">.</span>DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 取得留言的内容</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a_intID<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name">notepage</span> <span class="token function">GetTopic</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a_intID<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add Constructor Logic here</span>
            <span class="token comment">//</span>
            <span class="token comment">//读取数据库</span>
            <span class="token class-name">myconn</span> myConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">myconn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">SQLCommand</span> myCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>ActiveConnection <span class="token operator">=</span> myConn<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;n_GetTopicInfo&quot;</span><span class="token punctuation">;</span> <span class="token comment">//调用存储过程</span>
            myCommand<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> CommandType<span class="token punctuation">.</span>StoredProcedure<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@a_intTopicID&quot;</span><span class="token punctuation">,</span> SQLDataType<span class="token punctuation">.</span>Int<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">[</span><span class="token string">&quot;@a_intTopicID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> a_intID<span class="token punctuation">;</span>
            <span class="token class-name">notepage</span> objNp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                myConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">SQLDataReader</span> myReader<span class="token punctuation">;</span>
                myCommand<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token keyword">out</span> myReader<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    objNp<span class="token punctuation">.</span>ID <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>myReader<span class="token punctuation">[</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Title <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>myReader<span class="token punctuation">[</span><span class="token string">&quot;Title&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Author <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>myReader<span class="token punctuation">[</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Content <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span>myReader<span class="token punctuation">[</span><span class="token string">&quot;Content&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>adddate <span class="token operator">=</span> <span class="token punctuation">(</span>DateTime<span class="token punctuation">)</span>myReader<span class="token punctuation">[</span><span class="token string">&quot;adddate&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">//清场</span>
                myReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                myConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;取贴子失败:&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> objNp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 目的：将留言的内容入库</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// 利用构造函数来传递信息</span>
        <span class="token doc-comment comment">/// </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>n_Topic<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">AddTopic</span><span class="token punctuation">(</span><span class="token class-name">notepage</span> n_Topic<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add Constructor Logic here</span>
            <span class="token comment">//</span>

            <span class="token comment">//读取数据库</span>
            <span class="token class-name">myconn</span> myConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">myconn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">SQLCommand</span> myCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>ActiveConnection <span class="token operator">=</span> myConn<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;n_addTopic&quot;</span><span class="token punctuation">;</span> <span class="token comment">//调用存储过程</span>
            myCommand<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> CommandType<span class="token punctuation">.</span>StoredProcedure<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@a_strTitle&quot;</span><span class="token punctuation">,</span> SQLDataType<span class="token punctuation">.</span>VarChar<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">[</span><span class="token string">&quot;@a_strTitle&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> n_Topic<span class="token punctuation">.</span>Title<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@a_strAuthor&quot;</span><span class="token punctuation">,</span> SQLDataType<span class="token punctuation">.</span>VarChar<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">[</span><span class="token string">&quot;@a_strAuthor&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> n_Topic<span class="token punctuation">.</span>Author<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@a_strContent&quot;</span><span class="token punctuation">,</span> SQLDataType<span class="token punctuation">.</span>VarChar<span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>Parameters<span class="token punctuation">[</span><span class="token string">&quot;@a_strContent&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token operator">=</span> n_Topic<span class="token punctuation">.</span>Content<span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                myConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                myCommand<span class="token punctuation">.</span><span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">//清场</span>
                myConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;取贴子失败:&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 取的贴子列表</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>remarks</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 返回一个Topic数组</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>remarks</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name">ArrayList</span> <span class="token function">GetTopicList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//定义一个forum数组做为返回值</span>
            <span class="token class-name">ArrayList</span> arrForumList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//从数据库中读取留言列表</span>
            <span class="token class-name">myconn</span> myConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">myconn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">SQLCommand</span> myCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>ActiveConnection <span class="token operator">=</span> myConn<span class="token punctuation">;</span>
            myCommand<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> <span class="token string">&quot;n_GetTopicList&quot;</span><span class="token punctuation">;</span> <span class="token comment">//调用存储过程</span>
            myCommand<span class="token punctuation">.</span>CommandType <span class="token operator">=</span> CommandType<span class="token punctuation">.</span>StoredProcedure<span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                myConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">SQLDataReader</span> myReader<span class="token punctuation">;</span>
                myCommand<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token keyword">out</span> myReader<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> myReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">notepage</span> objItem <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objItem<span class="token punctuation">.</span>ID <span class="token operator">=</span> myReader<span class="token punctuation">[</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objItem<span class="token punctuation">.</span>Title <span class="token operator">=</span> myReader<span class="token punctuation">[</span><span class="token string">&quot;Title&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objItem<span class="token punctuation">.</span>Author <span class="token operator">=</span> myReader<span class="token punctuation">[</span><span class="token string">&quot;Author&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objItem<span class="token punctuation">.</span>adddate <span class="token operator">=</span> myReader<span class="token punctuation">[</span><span class="token string">&quot;adddate&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToDateTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objItem<span class="token punctuation">.</span>Content <span class="token operator">=</span> myReader<span class="token punctuation">[</span><span class="token string">&quot;Content&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    arrForumList<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>objItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">//清场</span>
                myReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                myConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;数据库出错:&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//return null ;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> arrForumList<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>myconn.cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">notpage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SQL</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for myconn.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">myconn</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>SQL<span class="token punctuation">.</span>SQLConnection</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> InitializeComponent <span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span> 

        <span class="token keyword">public</span> <span class="token function">myconn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: Add Constructor Logic here</span>
            <span class="token comment">//</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Database <span class="token operator">=</span> <span class="token string">&quot;back&quot;</span> <span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>DataSource <span class="token operator">=</span> <span class="token string">&quot;LUOCHANG&quot;</span> <span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>UserID <span class="token operator">=</span> <span class="token string">&quot;sa&quot;</span> <span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Password <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>添加留言addTopic.aspx</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;%@ Page language=&quot;c#&quot; Codebehind=&quot;AddTopic.cs&quot; AutoEventWireup=&quot;false&quot; Inherits=&quot;notpage.AddTopic&quot; %&gt;
&lt;html&gt;&lt;head&gt;
&lt;meta content=&quot;Microsoft Visual Studio 7.0&quot; name=GENERATOR&gt;
&lt;meta content=C# name=CODE_LANGUAGE&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form method=post runat=&quot;server&quot;&gt;
&lt;table cellSpacing=1 cellPadding=1 width=&quot;88%&quot; border=0&gt;
&lt;tr&gt;
&lt;td&gt;留言主题：&lt;/TD&gt;
&lt;td&gt;&lt;asp:textbox id=txtTitle runat=&quot;server&quot; maxlength=&quot;80&quot; columns=&quot;65&quot;&gt;&lt;/asp:textbox&gt;&lt;/TD&gt;&lt;/TR&gt;
&lt;tr&gt;
&lt;td&gt;姓名：&lt;/TD&gt;
&lt;td&gt;&lt;asp:textbox id=txtAuthor runat=&quot;server&quot; maxlength=&quot;40&quot; columns=&quot;20&quot;&gt;&lt;/asp:textbox&gt;&lt;/TD&gt;&lt;/TR&gt;
&lt;tr&gt;
&lt;td&gt;留言内容&lt;/TD&gt;
&lt;td&gt;&lt;asp:textbox id=txtContent runat=&quot;server&quot; maxlength=&quot;2000&quot; columns=&quot;50&quot; rows=&quot;20&quot; TextMode=&quot;MultiLine&quot;&gt;&lt;/asp:textbox&gt;&lt;asp:button 
id=btnSubmit runat=&quot;Server&quot;
text=&quot;确认&quot;&gt;&lt;/asp:button&gt;&lt;/TD&gt;&lt;/TR&gt;&lt;/TABLE&gt;&lt;/FORM&gt;

&lt;/body&gt;&lt;/html&gt;
</code></pre></div><p>对应的cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">notpage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>SessionState</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>HtmlControls</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for AddTopic.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddTopic</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>Page</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>TextBox</span> txtContent<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>TextBox</span> txtAuthor<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>TextBox</span> txtTitle<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Button</span> btnSubmit<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">AddTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Page<span class="token punctuation">.</span>Init <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>Page_Init<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>IsPostBack<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//</span>
                <span class="token comment">// Evals true first time browser hits the page</span>
                <span class="token comment">//</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Init</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// CODEGEN: This call is required by the ASP+ Windows Form Designer.</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            btnSubmit<span class="token punctuation">.</span>Click <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>OnSubmit<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Page_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnSubmit</span><span class="token punctuation">(</span><span class="token class-name">Object</span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Page<span class="token punctuation">.</span>IsValid<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//数据入库</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">notepage</span> objNp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Title <span class="token operator">=</span> txtTitle<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Author <span class="token operator">=</span> txtAuthor<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>Content <span class="token operator">=</span> txtContent<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
                    objNp<span class="token punctuation">.</span>adddate <span class="token operator">=</span> System<span class="token punctuation">.</span>DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
                    <span class="token class-name">notepage</span> objNp1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>objNp1<span class="token punctuation">.</span><span class="token function">AddTopic</span><span class="token punctuation">(</span>objNp<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;p align=center class=cn&gt;成功留言，点击&lt;a href = list.aspx&gt;此处&lt;/a&gt;查看留言列表！。&lt;/p&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exp<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
<span class="token preprocessor property">#<span class="token directive keyword">if</span> </span><span class="token return-type class-name">DEBUG</span>
                    Response<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;出现异常：&quot;</span> <span class="token operator">+</span> exp<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token preprocessor property">#<span class="token directive keyword">endif</span></span><span class="token comment">//DEBUG</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>*********************</code></p><p>显示列表list.aspx</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;%@ Page language=&quot;c#&quot; Codebehind=&quot;list.cs&quot; AutoEventWireup=&quot;false&quot; Inherits=&quot;notpage.list&quot; %&gt;
&lt;html&gt;&lt;head&gt;
&lt;meta name=&quot;GENERATOR&quot; Content=&quot;Microsoft Visual Studio 7.0&quot;&gt;
&lt;meta name=&quot;CODE_LANGUAGE&quot; Content=&quot;C#&quot;&gt;&lt;/head&gt;
&lt;body&gt; 

&lt;form method=&quot;post&quot; runat=&quot;server&quot;&gt;&lt;/P&gt;&lt;P&gt; &lt;/form&gt;&lt;a href = &quot;addTopic.aspx&quot;&gt;发表留言&lt;/a&gt;&lt;br&gt;
&lt;TABLE WIDTH=&quot;90%&quot; HEIGHT=&quot;1&quot; BORDER=&quot;0&quot; CELLSPACING=&quot;2&quot; CELLPADDING=&quot;2&quot; id=liuyan&gt;
&lt;TR&gt;
&lt;TD&gt;主题&lt;/TD&gt;
&lt;TD&gt;留言人&lt;/TD&gt;
&lt;TD&gt;留言时间&lt;/TD&gt;
&lt;/TR&gt;

&lt;asp:label id=&quot;n_tdtitle&quot; runat=Server&gt;&lt;/asp:label&gt;

&lt;/TABLE&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre></div><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">notpage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>SessionState</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>HtmlControls</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for list.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">list</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>Page</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_tdtitle<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Page<span class="token punctuation">.</span>Init <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>Page_Init<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>IsPostBack<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//</span>
                <span class="token comment">// Evals true first time browser hits the page</span>
                <span class="token comment">//</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Init</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// CODEGEN: This call is required by the ASP+ Windows Form Designer.</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">Init_tdtitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Page_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init_tdtitle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// CODEGEN: This call is required by the ASP+ Windows Form Designer.</span>
            <span class="token comment">//</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">notepage</span> np <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">ArrayList</span> arrTopic <span class="token operator">=</span> np<span class="token punctuation">.</span><span class="token function">GetTopicList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arrTopic<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">notepage</span> objTopic <span class="token operator">=</span> <span class="token punctuation">(</span>notepage<span class="token punctuation">)</span>arrTopic<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> str <span class="token operator">=</span> <span class="token string">&quot;&lt;tr&gt;&lt;td&gt;&lt;a href = showTopic.aspx?id=&quot;</span> <span class="token operator">+</span> objTopic<span class="token punctuation">.</span>ID<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&gt;&quot;</span> <span class="token operator">+</span> objTopic<span class="token punctuation">.</span>Title<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&lt;/a&gt;&lt;/td&gt;&quot;</span><span class="token punctuation">;</span>
                    str <span class="token operator">=</span> str <span class="token operator">+</span> <span class="token string">&quot;&lt;td&gt;&quot;</span> <span class="token operator">+</span> objTopic<span class="token punctuation">.</span>Author<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&lt;/td&gt;&quot;</span><span class="token punctuation">;</span>
                    str <span class="token operator">=</span> str <span class="token operator">+</span> <span class="token string">&quot;&lt;td&gt;&quot;</span> <span class="token operator">+</span> objTopic<span class="token punctuation">.</span>adddate<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&lt;/td&gt;&lt;/tr&gt;&quot;</span><span class="token punctuation">;</span>
                    n_tdtitle<span class="token punctuation">.</span>Text <span class="token operator">=</span> str <span class="token operator">+</span> n_tdtitle<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token string">&quot;取得贴子列表出错：&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>*******************</code></p><p>查看留言内容showtopic.aspx</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;%@ Page language=&quot;c#&quot; Codebehind=&quot;showTopic.cs&quot; AutoEventWireup=&quot;false&quot; Inherits=&quot;notpage.showTopic&quot; %&gt;
&lt;html&gt;&lt;head&gt;
&lt;meta content=&quot;Microsoft Visual Studio 7.0&quot; name=GENERATOR&gt;
&lt;meta content=C# name=CODE_LANGUAGE&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form method=post runat=&quot;server&quot;&gt;
&lt;p align=center&gt;&lt;font color=red&gt;&lt;b&gt;察看留言&lt;/b&gt;&lt;/font&gt;&lt;/p&gt;&lt;br&gt;
&lt;p align=left&gt;&lt;font color=blue&gt;留言主题：&lt;asp:label id=n_tdtitle runat=&quot;Server&quot; forecolor=&quot;Black&quot;&gt;&lt;/asp:label&gt; 
&lt;br&gt;留言时间：&lt;asp:label id=n_tdAdddate runat=&quot;Server&quot; forecolor=&quot;Black&quot;&gt;&lt;/asp:label&gt;&lt;br&gt;&lt;/font&gt;&lt;font color=blue&gt;留言人：
&lt;asp:label 
id=n_tdAuthor runat=&quot;server&quot; forecolor=&quot;Black&quot;&gt;&lt;/asp:label&gt;&lt;br&gt;留言内容：&lt;asp:label id=n_tdContent
runat=&quot;Server&quot; forecolor=&quot;Black&quot;&gt;&lt;/asp:label&gt; &lt;/font&gt;&lt;/p&gt;&lt;/form&gt;

&lt;/body&gt;&lt;/html&gt;
</code></pre></div><p>对应的cs</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">notpage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>SessionState</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>HtmlControls</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Summary description for showTopic.</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">showTopic</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>Page</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_tdAuthor<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> td<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_tdContent<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_tdAdddate<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_tdtitle<span class="token punctuation">;</span>
        <span class="token keyword">protected</span> <span class="token class-name">System<span class="token punctuation">.</span>Web<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>WebControls<span class="token punctuation">.</span>Label</span> n_ttitle<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">showTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Page<span class="token punctuation">.</span>Init <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span>Page_Init<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>IsPostBack<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//</span>
                <span class="token comment">// Evals true first time browser hits the page</span>
                <span class="token comment">//</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Page_Init</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// CODEGEN: This call is required by the ASP+ Windows Form Designer.</span>
            <span class="token comment">//</span>
            <span class="token class-name"><span class="token keyword">int</span></span> int_ID<span class="token punctuation">;</span>
            int_ID <span class="token operator">=</span> Request<span class="token punctuation">.</span>QueryString<span class="token punctuation">[</span><span class="token string">&quot;ID&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">notepage</span> np <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">notepage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">notepage</span> objNp <span class="token operator">=</span> np<span class="token punctuation">.</span><span class="token function">GetTopic</span><span class="token punctuation">(</span>int_ID<span class="token punctuation">)</span><span class="token punctuation">;</span>
            n_tdtitle<span class="token punctuation">.</span>Text <span class="token operator">=</span> objNp<span class="token punctuation">.</span>Title<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            n_tdContent<span class="token punctuation">.</span>Text <span class="token operator">=</span> objNp<span class="token punctuation">.</span>Content<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            n_tdAuthor<span class="token punctuation">.</span>Text <span class="token operator">=</span> objNp<span class="token punctuation">.</span>Author<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            n_tdAdddate<span class="token punctuation">.</span>Text <span class="token operator">=</span> objNp<span class="token punctuation">.</span>adddate<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Required method for Designer support - do not modify</span>
        <span class="token doc-comment comment">/// the contents of this method with the code editor.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Page_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,20),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netcode37.html.vue"]]);export{i as default};
