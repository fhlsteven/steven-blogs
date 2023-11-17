import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},o=t(`<h1 id="利用pop3收取邮件" tabindex="-1"><a class="header-anchor" href="#利用pop3收取邮件" aria-hidden="true">#</a> 利用POP3收取邮件</h1><p>作者：网际浪子</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> 利用POP3协议收取电子邮件
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// Class1 的摘要说明。 </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">class</span> <span class="token class-name">Class1</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。 </span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">TcpClient</span> tpServer<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> byData<span class="token punctuation">;</span>
        <span class="token comment">//设定一个字节数组，用以存放向POP3服务器传送的命令 </span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> CRLF <span class="token operator">=</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//定义回车换行符 </span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sRec<span class="token punctuation">;</span>
        <span class="token comment">//定义一个字符串，用以存放从POP3服务器反馈数据 </span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sData<span class="token punctuation">;</span>
        <span class="token comment">//定义一个字符串，用以存放向POP3服务器传送的命令字符串 </span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">NetworkStream</span> nsStream<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">StreamReader</span> rdStream<span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">LoadPOP</span><span class="token punctuation">(</span><span class="token string">&quot;pop.21cn.com&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;majinhu&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                sData <span class="token operator">=</span> <span class="token string">&quot;RETR 1&quot;</span> <span class="token operator">+</span> CRLF<span class="token punctuation">;</span>
                <span class="token comment">//定义获取帐户中邮件数目和占用空间的命令 </span>
                byData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>sData<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                nsStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>byData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//向POP3服务器传送获取帐户中邮件数目和占用空间的命令 </span>
                sRec <span class="token operator">=</span> rdStream<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//接收服务器反馈的数据 </span>
                <span class="token comment">/* 
              　　以下代码是收取帐户中的第一封邮件，并提取数据 
              　*/</span>
                <span class="token class-name"><span class="token keyword">bool</span></span> strBody <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> arrRet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> arrTemp<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>sRec <span class="token operator">!=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span>sRec <span class="token operator">!=</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        arrTemp <span class="token operator">=</span> sRec<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;:&quot;</span><span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>sRec <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                            strBody <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>arrTemp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;Date&quot;</span><span class="token punctuation">)</span>
                            arrRet<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> arrTemp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>arrTemp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;From&quot;</span><span class="token punctuation">)</span>
                            arrRet<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> arrTemp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>arrTemp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;To&quot;</span><span class="token punctuation">)</span>
                            arrRet<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> arrTemp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>arrTemp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;Subject&quot;</span><span class="token punctuation">)</span>
                            arrRet<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> arrTemp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>strBody<span class="token punctuation">)</span>
                            arrRet<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> arrRet<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">+</span> sRec<span class="token punctuation">;</span>
                        sRec <span class="token operator">=</span> rdStream<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;发送时间：&quot;</span> <span class="token operator">+</span> arrRet<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//显示邮件发送时间信息 </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;发送者：&quot;</span> <span class="token operator">+</span> arrRet<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//显示发信人 </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;接收者：&quot;</span> <span class="token operator">+</span> arrRet<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//显示目的地址 </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;主题：&quot;</span> <span class="token operator">+</span> arrRet<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//显示邮件主题 </span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;内容：&quot;</span> <span class="token operator">+</span> arrRet<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//显示邮件内容 </span>
            <span class="token comment">// </span>
            <span class="token comment">// TODO: 在此处添加代码以启动应用程序 </span>
            <span class="token comment">// </span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">LoadPOP</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> POPServer<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> POPUser<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> POPPsw<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sPOPServer <span class="token operator">=</span> POPServer<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sPOPUser <span class="token operator">=</span> POPUser<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sPOPPass <span class="token operator">=</span> POPPsw<span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                tpServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TcpClient</span><span class="token punctuation">(</span>sPOPServer<span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//和POP3服务器的110端口号建立TCP连接 </span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;无法和指定的POP3服务器建立连接！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            nsStream <span class="token operator">=</span> tpServer<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//获取客户机和服务器会话的数据流 </span>
            rdStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>tpServer<span class="token punctuation">.</span><span class="token function">GetStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sRec <span class="token operator">=</span> rdStream<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sData <span class="token operator">=</span> <span class="token string">&quot;USER &quot;</span> <span class="token operator">+</span> sPOPUser <span class="token operator">+</span> CRLF<span class="token punctuation">;</span>
            <span class="token comment">//定义向POP3服务器传送帐户对应的命令行 </span>
            byData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>sData<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            nsStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>byData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//向POP3服务器传送帐户 </span>
            sRec <span class="token operator">=</span> rdStream<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//接收POP3服务器反馈数据 </span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;向POP3服务器传送帐户后，服务器返回的信息：&quot;</span> <span class="token operator">+</span> sRec<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sUserString <span class="token operator">=</span> sRec<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sUserString<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;-ERR&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;该POP3服务器中没有此帐户！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            sData <span class="token operator">=</span> <span class="token string">&quot;PASS &quot;</span> <span class="token operator">+</span> sPOPPass <span class="token operator">+</span> CRLF<span class="token punctuation">;</span>
            <span class="token comment">//定义向POP3服务器传送帐户口令对应的命令行 </span>
            byData <span class="token operator">=</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>sData<span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            nsStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>byData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byData<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//向POP3服务器传送帐户对应口令 </span>
            sRec <span class="token operator">=</span> rdStream<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//接收POP3服务器反馈数据 </span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;向POP3服务器传送帐户口令后，服务器返回的信息：&quot;</span> <span class="token operator">+</span> sRec<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> sPassString <span class="token operator">=</span> sRec<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">.</span><span class="token function">ToCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>sPassString<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;-ERR&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;帐户对应的口令有误！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Powered by DvNews.net
来源：uncj.net
阅读：141 次
日期：2003-6-30
</code></pre></div>`,4),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","netinter8.html.vue"]]);export{i as default};
