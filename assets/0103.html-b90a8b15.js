import{_ as r,r as a,o as i,c as o,b as e,d as n,e as s,a as c}from"./app-d9da1b6d.js";const l={},d=e("h1",{id:"面试题-01-03-url化",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#面试题-01-03-url化","aria-hidden":"true"},"#"),n(" 面试题 01.03. URL化")],-1),u={id:"面试题-01-03-url化-简单",tabindex:"-1"},g=e("a",{class:"header-anchor",href:"#面试题-01-03-url化-简单","aria-hidden":"true"},"#",-1),h={href:"https://leetcode-cn.com/problems/string-to-url-lcci/",target:"_blank",rel:"noopener noreferrer"},p=e("strong",null,"简单",-1),_=c(`<p>URL化。编写一种方法，将字符串中的空格全部替换为%20。假定该字符串尾部有<strong>足够的空间</strong>存放<strong>新增字符</strong>，并且知道字符串的“真实”长度。（注：用Java实现的话，请使用字符数组实现，以便直接在数组上操作。）</p><p>示例 1：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入：&quot;Mr John Smith    &quot;, 13
输出：&quot;Mr%20John%20Smith&quot;
</code></pre></div><p>示例 2：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入：&quot;               &quot;, 5
输出：&quot;%20%20%20%20%20&quot;
</code></pre></div><p>提示：</p><ol><li>从尾到头开始修改字符串通常最容易。</li><li>你可能需要知道空格的数量。你能数一下吗？</li></ol><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2><p>解法一：利用 <code>StringBuilder</code></p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public string ReplaceSpacesV2(string S, int length)
{
    StringBuilder strBuilder = new StringBuilder(length); // 初始化给了部分空间，防止后续增加空间 
    //逐渐遍历字符串
    for (int i = 0; i &lt; length; i++)
    {
        //如果不是空格就加入到StringBuilder中，如果是空格
        //就把&quot;%20&quot;加入到StringBuilder中
        if (S[i] == &#39; &#39;)
            strBuilder.Append(&quot;%20&quot;);
        else
            strBuilder.Append(S[i]);
    }
    return strBuilder.ToString();
}
</code></pre></div><p>解法二： 反向遍历替换插入数组</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public string ReplaceSpaces(string S, int length)
{
    char[] chars = new char[S.Length]; // 空间肯定够用，题目中了说了足够
    int index = S.Length - 1;
    for (int i = length - 1; i &gt;= 0; i--)
    {
        //如果遇到空格就把他转化为&quot;%20&quot;
        if (S[i] == &#39; &#39;)
        {
            chars[index--] = &#39;0&#39;;
            chars[index--] = &#39;2&#39;;
            chars[index--] = &#39;%&#39;;
        }
        else
        {
            chars[index--] = S[i];
        }
    }
    return new String(chars, index + 1, chars.Length - index - 1);
}
</code></pre></div><p>解法三： 内置函数一行流</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public string ReplaceSpaces(string S, int length)
{
    return S.Substring(0,length).Replace(&quot; &quot;, &quot;%20&quot;);
}
</code></pre></div>`,14);function x(S,q){const t=a("ExternalLinkIcon");return i(),o("div",null,[d,e("h2",u,[g,n(),e("a",h,[n("面试题 01.03. URL化"),s(t)]),n(),p]),_])}const v=r(l,[["render",x],["__file","0103.html.vue"]]);export{v as default};
