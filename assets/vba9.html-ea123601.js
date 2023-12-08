import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="单元格中的字符串有回车符怎么办" tabindex="-1"><a class="header-anchor" href="#单元格中的字符串有回车符怎么办" aria-hidden="true">#</a> 单元格中的字符串有回车符怎么办</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  单元格中的字符串有回车符怎么办？
作　　者：  shining0219 ()
等　　级：  ^
信 誉 值：  100
所属论坛：  其他开发语言 Office开发/ VBA
问题点数：  20
回复次数：  3
发表时间：  2003-7-18 9:00:06
</code></pre></div><p>其中的内容需要做对比判断，如何去除一个字符串中的不可打印字符呢？字符串可能含有中文或日文。</p><hr><hr><p>回复人： icansaymyabc(学习与进步) ( 四级(中级)) 信誉：105 2003-7-18 14:03:45 得分:10</p><blockquote></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>a<span class="token operator">=</span>range<span class="token punctuation">(</span><span class="token string">&quot;A1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text
a<span class="token operator">=</span>replace<span class="token punctuation">(</span>a<span class="token punctuation">,</span>vbcrlf<span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
</code></pre></div><p>回复人： zuing(zuing) ( 一级(初级)) 信誉：100 2003-7-20 16:45:58 得分:10</p><blockquote><p><code>replace(string,vbcrlf,&quot;&quot;)</code></p></blockquote><p>回复人： shining0219() ( 一级(初级)) 信誉：100 2003-7-29 9:52:08 得分:0</p><blockquote><p>谢谢二位，我是这样做的。</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code>str_ <span class="token operator">=</span> Trim<span class="token punctuation">(</span>str_<span class="token punctuation">)</span>
<span class="token keyword">If</span> str_ <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
    MyTrim <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">Exit</span> <span class="token keyword">Function</span>
<span class="token keyword">Else</span>
    <span class="token keyword">Do</span> <span class="token keyword">While</span> Asc<span class="token punctuation">(</span>Right<span class="token punctuation">(</span>str_<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span><span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">And</span> Asc<span class="token punctuation">(</span>Right<span class="token punctuation">(</span>str_<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span><span class="token operator">=</span> <span class="token number">31</span>
        str_ <span class="token operator">=</span> Left<span class="token punctuation">(</span>str_<span class="token punctuation">,</span> Len<span class="token punctuation">(</span>str_<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">If</span> Len<span class="token punctuation">(</span>str_<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">Then</span>
            MyTrim <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
        <span class="token keyword">Exit</span> <span class="token keyword">Function</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">Loop</span>
<span class="token keyword">End</span> <span class="token keyword">If</span>
MyTrim <span class="token operator">=</span> str_
</code></pre></div><blockquote><p>虽然只考虑了字符串尾部，不过已经够用了。</p></blockquote><p>该问题已经结贴 ，得分记录： icansaymyabc (10)、 zuing (10)、</p>`,15),e=[o];function c(l,r){return s(),a("div",null,e)}const u=n(p,[["render",c],["__file","vba9.html.vue"]]);export{u as default};
