import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const e={},p=t(`<h1 id="c-中读取数据库中image数据" tabindex="-1"><a class="header-anchor" href="#c-中读取数据库中image数据" aria-hidden="true">#</a> C#中读取数据库中Image数据</h1><blockquote><p>未知 未知 2002-05-19</p></blockquote><h2 id="从数据库中获取-blob-值" tabindex="-1"><a class="header-anchor" href="#从数据库中获取-blob-值" aria-hidden="true">#</a> 从数据库中获取 BLOB 值</h2><p><code>DataReader</code> 的默认行为是在整个数据行可用时立即以行的形式加载传入数据。但是，对于二进制大对象 (BLOB) 则需要进行不同的处理，因为它们可能包含数十亿字节的数据，而单个行中无法包含如此多的数据。<code>Command.ExecuteReader</code> 方法具有一个重载，它将采用 <code>CommandBehavior</code> 参数来修改 <code>DataReader</code> 的默认行为。您可以将 <code>CommandBehavior.SequentialAccess</code> 传递到 <code>ExecuteReader</code> 方法来修改 <code>DataReader</code> 的默认行为，以便让 <code>DataReader</code> 按照顺序在接收到数据时立即将其加载，而不是加载数据行。这是加载 BLOB 或其他大数据结构的理想方案。</p><p>在将 <code>DataReader</code> 设置为使用 <code>SequentialAccess</code> 时，务必要注意访问所返回字段的顺序。<code>DataReader</code> 的默认行为是在整个行可用时立即加载该行，这使您能够在读取下一行之前按任何顺序访问所返回的字段。但是，当使用 <code>SequentialAccess</code> 时，必须按顺序访问由 <code>DataReader</code> 返回的不同字段。例如，如果查询返回三个列，其中第三列是 BLOB，则必须在访问第三个字段中的 BLOB 数据之前返回第一个和第二个字段的值。如果在访问第一个或第二个字段之前访问第三个字段，则第一个和第二个字段值将不再可用。这是因为 <code>SequentialAccess</code> 已修改 <code>DataReader</code>，使其按顺序返回数据，当 <code>DataReader</code> 已经读取超过特定数据时，该数据将不可用。</p><p>当访问 BLOB 字段中的数据时，请使用 <code>DataReader</code> 的 <code>GetBytes</code> 类型化访问器，该访问器将使用二进制数据填充 <code>byte</code> 数组。您可以指定要返回的特定数据缓冲区大小以及从返回的数据中读取的第一个字节的起始位置。<code>GetBytes</code> 将返回 long 值，它表示所返回的字节数。如果向 <code>GetBytes</code> 传递空的 <code>byte</code> 数组，所返回的长值将是 BLOB 中字节的总数。您可以选择将字节数组中的某索引指定为所读取数据的起始位置。</p><p>以下示例从 Microsoft SQL Server 中的 pubs 示例数据库中返回发行者 ID 和徽标。发行者 ID (pub_id) 是字符字段，而徽标则是图形，即 BLOB。请注意，由于必须按顺序访问字段，所以将在访问徽标之前访问当前数据行的发行者 ID。</p><h2 id="visual-basic" tabindex="-1"><a class="header-anchor" href="#visual-basic" aria-hidden="true">#</a> [Visual Basic]</h2><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Dim</span> pubsConn <span class="token keyword">As</span> SqlConnection <span class="token operator">=</span> <span class="token keyword">New</span> SqlConnection<span class="token punctuation">(</span><span class="token string">&quot;Data Source=localhost;Integrated Security=SSPI;Initial Catalog=pubs;&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> logoCMD <span class="token keyword">As</span> SqlCommand <span class="token operator">=</span> <span class="token keyword">New</span> SqlCommand<span class="token punctuation">(</span><span class="token string">&quot;SELECT pub_id, logo FROM pub_info&quot;</span><span class="token punctuation">,</span> pubsConn<span class="token punctuation">)</span>

<span class="token keyword">Dim</span> fs <span class="token keyword">As</span> FileStream                 <span class="token comment">&#39; Writes the BLOB to a file (*.bmp).</span>
<span class="token keyword">Dim</span> bw <span class="token keyword">As</span> BinaryWriter               <span class="token comment">&#39; Streams the binary data to the FileStream object.</span>

<span class="token keyword">Dim</span> bufferSize <span class="token keyword">As</span> <span class="token keyword">Integer</span> <span class="token operator">=</span> <span class="token number">100</span>      <span class="token comment">&#39; The size of the BLOB buffer.</span>
<span class="token keyword">Dim</span> outbyte<span class="token punctuation">(</span>bufferSize <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Byte</span>  <span class="token comment">&#39; The BLOB byte() buffer to be filled by GetBytes.</span>
<span class="token keyword">Dim</span> retval <span class="token keyword">As</span> <span class="token keyword">Long</span>                   <span class="token comment">&#39; The bytes returned from GetBytes.</span>
<span class="token keyword">Dim</span> startIndex <span class="token keyword">As</span> <span class="token keyword">Long</span> <span class="token operator">=</span> <span class="token number">0</span>           <span class="token comment">&#39; The starting position in the BLOB output.</span>

<span class="token keyword">Dim</span> pub_id <span class="token keyword">As</span> <span class="token keyword">String</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>            <span class="token comment">&#39; The publisher id to use in the file name.</span>

<span class="token comment">&#39; Open the connection and read data into the DataReader.</span>
pubsConn<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> myReader <span class="token keyword">As</span> SqlDataReader <span class="token operator">=</span> logoCMD<span class="token punctuation">.</span>ExecuteReader<span class="token punctuation">(</span>CommandBehavior<span class="token punctuation">.</span>SequentialAccess<span class="token punctuation">)</span>

<span class="token keyword">Do</span> <span class="token keyword">While</span> myReader<span class="token punctuation">.</span>Read<span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">&#39; Get the publisher id, which must occur before getting the logo.</span>
  pub_id <span class="token operator">=</span> myReader<span class="token punctuation">.</span>GetString<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

  <span class="token comment">&#39; Create a file to hold the output.</span>
  fs <span class="token operator">=</span> <span class="token keyword">New</span> FileStream<span class="token punctuation">(</span><span class="token string">&quot;logo&quot;</span> <span class="token operator">&amp;</span> pub_id <span class="token operator">&amp;</span> <span class="token string">&quot;.bmp&quot;</span><span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>OpenOrCreate<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Write<span class="token punctuation">)</span>
  bw <span class="token operator">=</span> <span class="token keyword">New</span> BinaryWriter<span class="token punctuation">(</span>fs<span class="token punctuation">)</span>

  <span class="token comment">&#39; Reset the starting byte for a new BLOB.</span>
  startIndex <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token comment">&#39; Read bytes into outbyte() and retain the number of bytes returned.</span>
  retval <span class="token operator">=</span> myReader<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> outbyte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bufferSize<span class="token punctuation">)</span>

  <span class="token comment">&#39; Continue reading and writing while there are bytes beyond the size of the buffer.</span>
  <span class="token keyword">Do</span> <span class="token keyword">While</span> retval <span class="token operator">=</span> bufferSize
    bw<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>outbyte<span class="token punctuation">)</span>
    bw<span class="token punctuation">.</span>Flush<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">&#39; Reposition the start index to the end of the last buffer and fill the buffer. </span>
    startIndex <span class="token operator">=</span> startIndex <span class="token operator">+</span> bufferSize 
    retval <span class="token operator">=</span> myReader<span class="token punctuation">.</span>GetBytes<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> outbyte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bufferSize<span class="token punctuation">)</span> 
  <span class="token keyword">Loop</span>

  <span class="token comment">&#39; Write the remaining buffer.</span>
  bw<span class="token punctuation">.</span>Write<span class="token punctuation">(</span>outbyte<span class="token punctuation">)</span>
  bw<span class="token punctuation">.</span>Flush<span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">&#39; Close the output file.</span>
  bw<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
  fs<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Loop</span>

<span class="token comment">&#39; Close the reader and the connection.</span>
myReader<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
pubsConn<span class="token punctuation">.</span>Close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> [C#]</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">SqlConnection</span> pubsConn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlConnection</span><span class="token punctuation">(</span><span class="token string">&quot;Data Source=localhost;Integrated Security=SSPI;Initial Catalog=pubs;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SqlCommand</span> logoCMD <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT pub_id, logo FROM pub_info&quot;</span><span class="token punctuation">,</span> pubsConn<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">FileStream</span> fs<span class="token punctuation">;</span>                          <span class="token comment">// Writes the BLOB to a file (*.bmp).</span>
<span class="token class-name">BinaryWriter</span> bw<span class="token punctuation">;</span>                        <span class="token comment">// Streams the BLOB to the FileStream object.</span>

<span class="token class-name"><span class="token keyword">int</span></span> bufferSize <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>                   <span class="token comment">// Size of the BLOB buffer.</span>
<span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> outbyte <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>bufferSize<span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// The BLOB byte[] buffer to be filled by GetBytes.</span>
<span class="token class-name"><span class="token keyword">long</span></span> retval<span class="token punctuation">;</span>                            <span class="token comment">// The bytes returned from GetBytes.</span>
<span class="token class-name"><span class="token keyword">long</span></span> startIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>                    <span class="token comment">// The starting position in the BLOB output.</span>

<span class="token class-name"><span class="token keyword">string</span></span> pub_id <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>                     <span class="token comment">// The publisher id to use in the file name.</span>

<span class="token comment">// Open the connection and read data into the DataReader.</span>
pubsConn<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">SqlDataReader</span> myReader <span class="token operator">=</span> logoCMD<span class="token punctuation">.</span><span class="token function">ExecuteReader</span><span class="token punctuation">(</span>CommandBehavior<span class="token punctuation">.</span>SequentialAccess<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>myReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">// Get the publisher id, which must occur before getting the logo.</span>
  pub_id <span class="token operator">=</span> myReader<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Create a file to hold the output.</span>
  fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span><span class="token string">&quot;logo&quot;</span> <span class="token operator">+</span> pub_id <span class="token operator">+</span> <span class="token string">&quot;.bmp&quot;</span><span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>OpenOrCreate<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Write<span class="token punctuation">)</span><span class="token punctuation">;</span>
  bw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BinaryWriter</span><span class="token punctuation">(</span>fs<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Reset the starting byte for the new BLOB.</span>
  startIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token comment">// Read the bytes into outbyte[] and retain the number of bytes returned.</span>
  retval <span class="token operator">=</span> myReader<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> outbyte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bufferSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Continue reading and writing while there are bytes beyond the size of the buffer.</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>retval <span class="token operator">==</span> bufferSize<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    bw<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>outbyte<span class="token punctuation">)</span><span class="token punctuation">;</span>
    bw<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Reposition the start index to the end of the last buffer and fill the buffer.</span>
    startIndex<span class="token operator">+=</span> bufferSize<span class="token punctuation">;</span> 
    retval <span class="token operator">=</span> myReader<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> startIndex<span class="token punctuation">,</span> outbyte<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bufferSize<span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span>

  <span class="token comment">// Write the remaining buffer.</span>
  bw<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>outbyte<span class="token punctuation">)</span><span class="token punctuation">;</span>
  bw<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Close the output file.</span>
  bw<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Close the reader and the connection.</span>
myReader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pubsConn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,11),o=[p];function c(u,l){return s(),a("div",null,o)}const k=n(e,[["render",c],["__file","pic_img2.html.vue"]]);export{k as default};
