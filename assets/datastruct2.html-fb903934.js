import{_ as l,o as n,c as t,b as s,d as a,a as e}from"./app-57d1f7b1.js";const m={},c=s("h1",{id:"再谈kmp算法",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#再谈kmp算法","aria-hidden":"true"},"#"),a(" 再谈KMP算法")],-1),i=s("p",null,[a("KMP算法是串匹配中的经典算法，算法复杂度为"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"+"),s("mi",null,"n"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m+n)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},")")])])]),a("。我们熟悉的"),s("code",null,"str"),a("函数一般是用简单匹配算法实现的，最坏情况下的复杂度是"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"∗"),s("mi",null,"n"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m*n)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},")")])])]),a("。KMP算法的特点是，每当匹配时出现字符不同时，不需要回溯主串指针，整个匹配过程中只需要对主串从头到尾扫描一遍就可以了。")],-1),o=e("<p>KMP算法的思想很简单。假设主串为<code>S1S2...Sn</code>，模式串为<code>P1P2...Pm</code>。如果<code>P1P2...Pi （1 &lt;= i &lt;= n</code>）和主串中的某一子串<code>SjSj+1...Sj+i-1</code>匹配，而<code>Pi+1 &lt;&gt; Sj+i</code>，如果我们发现<code>P1P2...Pk = Pi-k+1...Pi（1 &lt;= k &lt; i）</code>，那么显然我们可以从<code>Pk+1</code>和<code>Sj+i</code>开始继续匹配了。简单吧。</p><p>现在问题的关键就时对于<code>i (1 &lt;= i &lt;= m)</code>怎么求出最大的<code>k</code>使得<code>P1P2...Pk = Pi-k+1...Pi</code>。我们可以用一个数组：</p><p><code>int next[m];</code> 预先计算出值。</p>",3),r=s("p",null,[a("计算"),s("code",null,"next"),a("数组最简单的方法就是穷举法，算法的复杂度为"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"∗"),s("mi",null,"m"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m*m)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mclose"},")")])])]),a("，整个算法的复杂度为"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"∗"),s("mi",null,"m"),s("mo",null,"+"),s("mi",null,"n"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m*m+n)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},")")])])]),a("。")],-1),p=s("p",null,[a("不过还有复杂度为"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mclose"},")")])])]),a("的算法，思想如下：假设"),s("code",null,"P1P2...Pk = Pi-k+1...Pi"),a("，那么"),s("code",null,"next[i] = k + 1"),a(" 。当我们计算"),s("code",null,"next[i+1]"),a("时，如果发现"),s("code",null,"Pk+1 = Pi+1"),a(", 也就是"),s("code",null,"P1P2...PkPk+1 = Pi-k+1...PiPi+1"),a("，那么"),s("code",null,"next[i+1] = next[i] + 1 = k + 2"),a("。 但是如果"),s("code",null,"Pk+1 <> Pi+1"),a(", 则比较"),s("code",null,"next[k]"),a("和"),s("code",null,"Pi+1"),a("（找下一个满足"),s("code",null,"P1P2...Pk' = Pi-k'+1...Pi"),a("的"),s("code",null,"k'"),a("）,一直到匹配成功为止。")],-1),h=s("p",null,[a("最后：简单匹配算法虽然最坏情况下的复杂度是"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"∗"),s("mi",null,"n"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m*n)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"∗"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},")")])])]),a("，但一般情况下复杂度接近"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"O"),s("mo",{stretchy:"false"},"("),s("mi",null,"m"),s("mo",null,"+"),s("mi",null,"n"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"O(m+n)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"O"),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mclose"},")")])])]),a("，所以现在还在大量使用。")],-1),d=[c,i,o,r,p,h];function u(g,x){return n(),t("div",null,d)}const k=l(m,[["render",u],["__file","datastruct2.html.vue"]]);export{k as default};