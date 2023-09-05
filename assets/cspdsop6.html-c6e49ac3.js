import{_ as t,o,c as e,a as c}from"./app-57d1f7b1.js";const r={},d=c(`<h1 id="c-操作技巧的数据类型之间的转换" tabindex="-1"><a class="header-anchor" href="#c-操作技巧的数据类型之间的转换" aria-hidden="true">#</a> C#操作技巧的数据类型之间的转换</h1><p>www.chinacs.net 2001-4-26 19:23:00 中文C#技术站</p><ol><li><p><code>int</code>和<code>String</code>之间的转换</p><p><code>int</code>-&gt;<code>String</code>,使用<code>ToString</code>函数,大家看看这个例子 <code>1.ToString()</code>,老天，这样的语法都可以通过鉴定:)</p><p>这就是C#语言</p><p><code>String</code>-&gt;<code>int</code> 就有很多的选择了（其实就是一个）,比如:<code>&quot;12345&quot;.ToInt16()</code>,函数,当然还有<code>ToInt32</code>,<code>ToInt64</code>等等的类似的函数，用法都是一样的</p></li><li><p>如何把<code>String</code>根据指定的规则转换成数组类型,</p><p><code>&quot;http://www.asp888.net 豆腐技术站&quot;.split(&quot; &quot;.ToCharAray())</code></p></li><li><p>如何在一个<code>String</code>中将指定的<code>String</code>转换成另外的<code>String</code>,</p><p>例如: 将 <code>&quot;&#39;&quot;</code> 转换成 <code>&quot;&#39;&#39;&quot;</code></p><p>我们在这里需要引入一个新的 Class StringBuilder,我们来看看这个函数</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>&lt;script language=&quot;C#&quot; runat=server&gt;
    function replaceStr1ToStr2(String str1,String str2,String str3){
    //str1 是包含有要替换的字符串的 原字符串
    //str2 是要替换的字符串
    //str3 是要将 str2 替换成的 str3
    StringBuilder d=new StringBuilder(str1);
    d=d.Replace(str2,str3);
    return d.ToString();
}
&lt;/script&gt;
</code></pre></div><p>然后，我们就可以通过 <code>replaceStr1ToStr2(str,&quot;&#39;&quot;,&quot;&#39;&#39;&quot;)</code>处理SQL语句的时候处理&quot;&#39;&quot;符号了！另外</p><p>还可以通过<code>replaceStr1ToStr2(str,&quot;\\n&quot;,&quot;&lt;br&gt;&quot;)</code> 来处理输出数据的时候的回车了！！！</p></li></ol>`,3),n=[d];function s(i,p){return o(),e("div",null,n)}const u=t(r,[["render",s],["__file","cspdsop6.html.vue"]]);export{u as default};
