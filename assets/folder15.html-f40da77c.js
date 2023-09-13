import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="用c-实现生成pdf文档-原码" tabindex="-1"><a class="header-anchor" href="#用c-实现生成pdf文档-原码" aria-hidden="true">#</a> 用C#实现生成PDF文档（原码）</h1><blockquote><p>未知 www.wenhui.org 2002-11-17</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//write by wenhui.org</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">PDFGenerator</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PDFGenerator</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">float</span></span> pageWidth <span class="token operator">=</span> <span class="token number">594.0f</span><span class="token punctuation">;</span>
        <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">float</span></span> pageDepth <span class="token operator">=</span> <span class="token number">828.0f</span><span class="token punctuation">;</span>
        <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">float</span></span> pageMargin <span class="token operator">=</span> <span class="token number">30.0f</span><span class="token punctuation">;</span>
        <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">float</span></span> fontSize <span class="token operator">=</span> <span class="token number">20.0f</span><span class="token punctuation">;</span>
        <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">float</span></span> leadSize <span class="token operator">=</span> <span class="token number">10.0f</span><span class="token punctuation">;</span>

        <span class="token keyword">static</span> <span class="token class-name">StreamWriter</span> pPDF <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span><span class="token string">&quot;E:\\\\myPDF.pdf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">static</span> <span class="token class-name">MemoryStream</span> mPDF <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MemoryStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strMsg<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> buffer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            buffer <span class="token operator">=</span> ASCIIEncoding<span class="token punctuation">.</span>ASCII<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>strMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            mPDF<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffer<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            buffer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">xRefFormatting</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">long</span></span> xValue<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strMsg <span class="token operator">=</span> xValue<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iLen <span class="token operator">=</span> strMsg<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>iLen <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">StringBuilder</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">-</span> iLen<span class="token punctuation">;</span>
                s<span class="token punctuation">.</span><span class="token function">Append</span><span class="token punctuation">(</span><span class="token char">&#39;0&#39;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                strMsg <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> strMsg<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> strMsg<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">ArrayList</span> xRefs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Byte[] buffer=null;</span>
            <span class="token class-name"><span class="token keyword">float</span></span> yPos <span class="token operator">=</span> <span class="token number">0f</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">long</span></span> streamStart <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">long</span></span> streamEnd <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">long</span></span> streamLen <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strPDFMessage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">//PDF文档头信息</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;%PDF-1.1\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;1 0 obj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;&lt;&lt; /Length 2 0 R &gt;&gt;\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;stream\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token doc-comment comment">////////PDF文档描述</span>
            streamStart <span class="token operator">=</span> mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
            <span class="token comment">//字体</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;BT\\n/F0 &quot;</span> <span class="token operator">+</span> fontSize <span class="token operator">+</span> <span class="token string">&quot; Tf\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//PDF文档实体高度</span>
            yPos <span class="token operator">=</span> pageDepth <span class="token operator">-</span> pageMargin<span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> pageMargin <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> yPos <span class="token operator">+</span> <span class="token string">&quot; Td\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> leadSize <span class="token operator">+</span> <span class="token string">&quot; TL\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//实体内容</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;(http://www.wenhui.org)Tj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;ET\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            streamEnd <span class="token operator">=</span> mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>

            streamLen <span class="token operator">=</span> streamEnd <span class="token operator">-</span> streamStart<span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;endstream\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//PDF文档的版本信息</span>
            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;2 0 obj\\n&quot;</span> <span class="token operator">+</span> streamLen <span class="token operator">+</span> <span class="token string">&quot;\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;3 0 obj\\n&lt;&lt;/Type/Page/Parent 4 0 R/Contents 1 0 R&gt;&gt;\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;4 0 obj\\n&lt;&lt;/Type /Pages /Count 1\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;/Kids[\\n3 0 R\\n]\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;/Resources&lt;&lt;/ProcSet[/PDF/Text]/Font&lt;&lt;/F0 5 0 R&gt;&gt; &gt;&gt;\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;/MediaBox [ 0 0 &quot;</span> <span class="token operator">+</span> pageWidth <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> pageDepth <span class="token operator">+</span> <span class="token string">&quot; ]\\n&gt;&gt;\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;5 0 obj\\n&lt;&lt;/Type/Font/Subtype/Type1/BaseFont/Courier/Encoding/WinAnsiEncoding&gt;&gt;\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            xRefs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;6 0 obj\\n&lt;&lt;/Type/Catalog/Pages 4 0 R&gt;&gt;\\nendobj\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            streamStart <span class="token operator">=</span> mPDF<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;xref\\n0 7\\n0000000000 65535 f \\n&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> xRefs<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                strPDFMessage <span class="token operator">+=</span> <span class="token function">xRefFormatting</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span>xRefs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; 00000 n \\n&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;trailer\\n&lt;&lt;\\n/Size &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>xRefs<span class="token punctuation">.</span>Count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n/Root 6 0 R\\n&gt;&gt;\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>

            strPDFMessage <span class="token operator">=</span> <span class="token string">&quot;startxref\\n&quot;</span> <span class="token operator">+</span> streamStart <span class="token operator">+</span> <span class="token string">&quot;\\n%%EOF\\n&quot;</span><span class="token punctuation">;</span>
            <span class="token function">ConvertToByteAndAddtoStream</span><span class="token punctuation">(</span>strPDFMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
            mPDF<span class="token punctuation">.</span><span class="token function">WriteTo</span><span class="token punctuation">(</span>pPDF<span class="token punctuation">.</span>BaseStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

            mPDF<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            pPDF<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","folder15.html.vue"]]);export{r as default};
