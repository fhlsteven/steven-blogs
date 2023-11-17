import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-d9da1b6d.js";const l="/steven-blogs/assets/netcode49_1-6ae7915a.png",k={},i={id:"基于不可靠数据报的文件传输",tabindex:"-1"},r=n("a",{class:"header-anchor",href:"#基于不可靠数据报的文件传输","aria-hidden":"true"},"#",-1),d={href:"https://www.cnblogs.com/thomas/archive/2005/01/30/99427.html",target:"_blank",rel:"noopener noreferrer"},m=u(`<div class="language-txt" data-ext="txt"><pre class="language-txt"><code>目录:
    引言
    数据报格式
    协议
    实现
    总结
</code></pre></div><h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h2><p>这个学期学习了一下&lt;&lt;计算机网络&gt;&gt;，在此把它的一个小部分应用一下。大家都知道在TCP/IP中的运输层，有两种协议，那就是TCP和UDP。它们的区别，大家一定很清楚了，TCP面向连接的数据报传输，而UDP是无连接的数据报传输，从而TCP可以提供可靠的传输（不会出现包丢失，包错位等等，当然这只是站在应用层角度来看，其实TCP提供了完善的重传机制），UDP则只是尽最大努力交付，它是不可靠的（也即可能出现包丢失，包的路由不同而错位等等），但它比TCP小巧快捷。</p><p>FTP就是基于TCP的文件传输协议。但，最近我遇到了一种网络环境，它没有TCP，而只有UDP；现在，我们想通过这种网络环境实现文件传输。大家可能和我一样想到是用TFTP（基于UDP的文件传输协议），TFTP的包只有四种，实现起来也并不复杂，但是，它是基于停止等待协议，这种协议，数据传输的吞吐率太低。接着，我想到了把在数据链路层最实用的连续重传协议应用到文件传输中来。以下就来介始，我的实现过程。</p><h2 id="数据报报头格式" tabindex="-1"><a class="header-anchor" href="#数据报报头格式" aria-hidden="true">#</a> 数据报报头格式</h2><p>首先，我们把我们文件传输协议称为UFTP（Unlinked File Transfer Protocol），接着我们来自定义UFTP的报头格式。</p><table><thead><tr><th>类型</th><th>文件标号</th></tr></thead><tbody><tr><td>块号</td><td>检验和</td></tr></tbody></table><p>以上，每个区都是16位。</p><p>1．类型：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">UFTPEnum</span> <span class="token punctuation">:</span><span class="token type-list"><span class="token keyword">ushort</span></span>
<span class="token punctuation">{</span>
    WRITE<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>WRITE_OK<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>TRANSFER<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span>ACK<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">,</span>REC_ALL<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span>MSG<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">,</span>ERROR<span class="token operator">=</span><span class="token number">7</span><span class="token punctuation">,</span>PING<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">,</span>PING_OK<span class="token operator">=</span><span class="token number">9</span> <span class="token punctuation">,</span>ABORT<span class="token operator">=</span><span class="token number">10</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>MSG：聊天信息
PING： 检查对方主机是否在线
PING_OK： 在线确认包
WRITE：写请求（也即上传）
WRITE_OK： 表示同意上传
TRANSFER： 表示文件传输数据包
ACK： 确认包
REC_ALL： 表示收到了文件所有数据.
ERROR：表示错误包（如检验和不对的包）
ABORT： 请求立即中止
</code></pre></div><p>2.文件标号：唯一标志要传输的文件。</p><p>3．块号：唯一标志所传输的块.</p><p>4.检验和：用来检查包是否正确.</p><h2 id="a协议" tabindex="-1"><a class="header-anchor" href="#a协议" aria-hidden="true">#</a> A协议</h2><p>我们约定：请求上传的主机叫为A，作出响应的主机叫为B。现在A要上传文件给B：</p><p><img src="`+l+`" alt="数据流程"></p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>（1）A主动去PING(发送类型为PING的包) B,若失败（超时），则报告“对方主机不在线”而退出；否则，转到（2）。
（2）A主动发送写请求给B，若失败（超时），则报告错误而退出；否则记下目的文件当前大小,并转到（3）。
（3）A打开源文件（且定位到要开始传送的位置）并载入数据到缓存中。
（4）从缓存中循环发送窗口大小个的数据包；若收到OVER(指的是REC_ALL 或 ABORT)，则立即退出；若超过循环次数，则报告超时错误而退出。
（5）收到ACK+块号时，设置块号（若块号为0，则载入数据到缓存）并重置循环次数。
（6）收到ABORT 或 REC_ALL，则退出。
</code></pre></div><p>相关说明：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>（1）每次从源文件中载入数据都要记下载入长度，以便控制文件结尾的数据包大小。
（2）ACK 中块号标志“需要收到的包”。
（3）由于协议（5）不断修改块号和重置循环次数，从而协议（4）的窗口不断移动。
（4）到了缓存末端，可能循环发送小于窗口大小个的数据包。
（5）写请求包中含有文件名，文件大小，数据内容大小。
</code></pre></div><h2 id="b协议" tabindex="-1"><a class="header-anchor" href="#b协议" aria-hidden="true">#</a> B协议</h2><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>(1) 若收到PING，则立即发送PING_OK。
(2) 若收到WRITE，则记下文件标号.文件名.文件大小.数据内容大小，并做好接收数据准备(打开或新建文件)，并发送WRITE_OK 。
(3) 若收到TRANSFER，则重置计数器，检查长度是否正确，再检查是不是当前要的包，若是则写入文件中且块号加一，接着检查文件数据是否接收完毕，若完毕则发送REC_ALL并退出，否则发送ACK+块号。
</code></pre></div><p>相关说明：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>（1）WRITE_OK 中载有目的文件的当前大小，这样可以做到续传。
（2）若计数器到时，则报告超时且发送ABORT而退出。
</code></pre></div><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><p>以下给出部分协议实现代码:</p><p>(1)A端</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> 打开和关闭流  </span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyStream <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>FileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MyStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>FileName<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">,</span> FileShare<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
            MyStream<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span>_Position<span class="token punctuation">,</span> SeekOrigin<span class="token punctuation">.</span>Begin<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>FileName <span class="token operator">+</span> <span class="token string">&quot; 不存在!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyStream <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MyStream<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        MyStream <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">HandleWRITE_OK</span><span class="token punctuation">(</span><span class="token class-name">UFTP_Packet</span> packet<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>WRITE_OK<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>WRITE_OK <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_Position <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">ToInt64</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span>MessageBuffer<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">HandleACK</span><span class="token punctuation">(</span><span class="token class-name">UFTP_Packet</span> packet<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>packet<span class="token punctuation">.</span>AliceID <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_AliceID <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">LoadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_AliceID <span class="token operator">=</span> packet<span class="token punctuation">.</span>AliceID<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_Time <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// 把文件数据发出去  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SendWRITE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">ShowError</span><span class="token punctuation">(</span><span class="token string">&quot;Ping or Write Fail&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//  </span>
    <span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">LoadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//  </span>
    <span class="token class-name">UFTP_Packet</span> packet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UFTP_Packet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    packet<span class="token punctuation">.</span>FileID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FileID<span class="token punctuation">;</span>
    packet<span class="token punctuation">.</span>UFTPType <span class="token operator">=</span> UFTP_Packet<span class="token punctuation">.</span>UFTPEnum<span class="token punctuation">.</span>TRANSFER<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>_Time <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">uint</span></span> start <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">ushort</span><span class="token punctuation">)</span><span class="token punctuation">(</span>_AliceID <span class="token operator">*</span> Multi<span class="token punctuation">.</span>UnitSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">uint</span></span> file_end <span class="token operator">=</span> _FileEnd<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">uint</span></span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> start <span class="token operator">+</span> WindowSize <span class="token operator">*</span> Multi<span class="token punctuation">.</span>UnitSize <span class="token operator">&amp;&amp;</span> i <span class="token operator">&lt;</span> file_end<span class="token punctuation">;</span> i <span class="token operator">+=</span> Multi<span class="token punctuation">.</span>UnitSize<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>OVER<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
            packet<span class="token punctuation">.</span>AliceID <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">ushort</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i <span class="token operator">/</span> Multi<span class="token punctuation">.</span>UnitSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">uint</span></span> len <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span>Multi<span class="token punctuation">.</span>UnitSize<span class="token punctuation">,</span> file_end <span class="token operator">-</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            packet<span class="token punctuation">.</span>MessageBuffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>len<span class="token punctuation">]</span><span class="token punctuation">;</span>
            Array<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Buffe<span class="token punctuation">,</span> i<span class="token punctuation">,</span> packet<span class="token punctuation">.</span>MessageBuffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">SendPacket</span><span class="token punctuation">(</span>packet<span class="token punctuation">.</span><span class="token function">ToBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        _Time<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>OVER<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">ShowError</span><span class="token punctuation">(</span><span class="token string">&quot;对方主机失去响应,超时退出&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//  </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// 从源文件中载入数据  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LoadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_FileEnd <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">uint</span><span class="token punctuation">)</span>MyStream<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Buffe<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Buffe<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// 发送PING  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">UFTP_Packet</span> ping <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UFTP_Packet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ping<span class="token punctuation">.</span>FileID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FileID<span class="token punctuation">;</span>
    ping<span class="token punctuation">.</span>UFTPType <span class="token operator">=</span> UFTP_Packet<span class="token punctuation">.</span>UFTPEnum<span class="token punctuation">.</span>PING<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">SendPacket</span><span class="token punctuation">(</span>ping<span class="token punctuation">.</span><span class="token function">ToBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>PING_OK<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// 发送写操作  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SendWRITE</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">FileInfo</span> info <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>FileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">UFTP_Packet</span> packet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UFTP_Packet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    packet<span class="token punctuation">.</span>FileID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FileID<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">ushort</span></span> len <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">ushort</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Buffe<span class="token punctuation">.</span>Length <span class="token operator">/</span> Multi<span class="token punctuation">.</span>UnitSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> write <span class="token operator">=</span> packet<span class="token punctuation">.</span><span class="token function">ToBytes</span><span class="token punctuation">(</span>UFTP_Packet<span class="token punctuation">.</span>UFTPEnum<span class="token punctuation">.</span>WRITE<span class="token punctuation">,</span>
        System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Unicode<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot;|&quot;</span> <span class="token operator">+</span> info<span class="token punctuation">.</span>Length<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;|&quot;</span> <span class="token operator">+</span> len<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">SendPacket</span><span class="token punctuation">(</span>write<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>WRITE_OK<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// 创建文件标志号  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span>  </span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">ushort</span></span> <span class="token function">CreateFileId</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">ushort</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">ushort</span><span class="token punctuation">.</span>MaxValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>(2)B端</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">HandleWRITE</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyStream <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            MyStream <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>SavePath <span class="token operator">+</span> <span class="token string">@&quot;\\&quot; + FileName, FileMode.Append, FileAccess.Write, FileShare.Read);
            _Count = _Position = MyStream.Position;
            SendWRITE_OK();
        }
        catch (Exception ex)
        {
            this.Dispose(ex.Message);
        }
    }
}

public void SendWRITE_OK()
{
    if (MyStream != null)
    {
        _UFTP.FileID = this.FileId;
        _UFTP.AliceID = this.AliceId;
        _UFTP.UFTPType = UFTP_Packet.UFTPEnum.WRITE_OK;
        _UFTP.MessageBuffer = System.Text.Encoding.Unicode.GetBytes(_Position.ToString());
        SendPacket(_UFTP.ToBytes());
    }
}

#region 处理传输
public void HandleTRANSFER(UFTP_Packet packet)
{
    if (packet.MessageLength != Multi.UnitSize &amp;&amp; packet.MessageLength != (FileLen % Multi.UnitSize)) return;
    // 
    _IsTimeOut = false;
    // 
    if (packet.AliceID == this.AliceId)
    {
        WriteData(packet.MessageBuffer);
        this.AliceId = (ushort)((this.AliceId + 1) % this.BuffeLen);
    }
    // 
    if (this._Count &lt; FileLen)
    {
        SendAck();
    }
    else if (this._Count == FileLen)
    {
        Console.WriteLine(&quot;</span><span class="token operator">=</span>&quot;<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_Count <span class="token operator">&gt;</span> FileLen<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SendAck</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    _UFTP<span class="token punctuation">.</span>FileID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FileId<span class="token punctuation">;</span>
    _UFTP<span class="token punctuation">.</span>AliceID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>AliceId<span class="token punctuation">;</span>
    _UFTP<span class="token punctuation">.</span>UFTPType <span class="token operator">=</span> UFTP_Packet<span class="token punctuation">.</span>UFTPEnum<span class="token punctuation">.</span>ACK<span class="token punctuation">;</span>
    <span class="token function">SendPacket</span><span class="token punctuation">(</span>_UFTP<span class="token punctuation">.</span><span class="token function">ToBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">WriteData</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> data<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>MyStream <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        MyStream<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_Count <span class="token operator">+=</span> data<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//告诉对方文件传输完毕 </span>
    _UFTP<span class="token punctuation">.</span>FileID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>FileId<span class="token punctuation">;</span>
    _UFTP<span class="token punctuation">.</span>AliceID <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>AliceId<span class="token punctuation">;</span>
    _UFTP<span class="token punctuation">.</span>UFTPType <span class="token operator">=</span> UFTP_Packet<span class="token punctuation">.</span>UFTPEnum<span class="token punctuation">.</span>REC_ALL<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token function">SendPacket</span><span class="token punctuation">(</span>_UFTP<span class="token punctuation">.</span><span class="token function">ToBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// </span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文的目的是改进TFTP，主要是在传输机制上（TFTP是用的是停止等待，而UFTP用的是连续重传），这样传输吞吐率有了提高。</p><p>UFTP调试成功，运行的结果还较理想。但它还有很多不足,它只实现了上传，没有下载；而且由于本人能力还有限，上传协议可能还不够完善，在此恳请大家提议。</p><p>posted on 2005-01-30 02:52 THOMAS 阅读(160) 评论(3)</p><hr><p>re: 基于不可靠数据报的文件传输 2005-01-30 03:01 THOMAS</p><blockquote><p>我的第一篇文章终于完成了，哈哈哈~~~</p></blockquote><p>re: 基于不可靠数据报的文件传输 2005-01-30 03:16 THOMAS</p><blockquote><p>说实话吧，为什么要写一个基于不可靠数据报的文件传输？<br> 是这样的，我们学校上网还要认证。有一次，帐号没钱了，不能上网，闲着，就用自己写的截包工具去截包，发现此时还可以收到多播包（IGMP），它是基于UDP的。然后，我想到用这个学期的学的网络知识去实现一个基于IGMP的文件传输工具，这样，就可以在没有认证情况下同学之间传输文件.昨天，就用它传一个电影而还能边传边看还能续传，哈哈，爽呆了！！！</p></blockquote><p>re: 基于不可靠数据报的文件传输 2005-01-30 03:42 fang</p><blockquote><p>不过～～～～～～～～～～～～～～～～～～～～～～<br> 好歹是你的一番心血<br> 我会看的啊<br> 放心<br> 对我以后的学习肯定有好处啊</p></blockquote>`,41);function y(w,g){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",i,[r,s(),n("a",d,[s("基于不可靠数据报的文件传输"),c(a)])]),m])}const f=t(k,[["render",y],["__file","netcode49.html.vue"]]);export{f as default};
