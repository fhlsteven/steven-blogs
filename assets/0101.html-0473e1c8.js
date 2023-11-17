import{_ as a,r as l,o as i,c as s,b as t,d as n,e as o,a as r}from"./app-d9da1b6d.js";const c={},u=t("h1",{id:"面试题-01-01-判定字符是否唯一",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#面试题-01-01-判定字符是否唯一","aria-hidden":"true"},"#"),n(" 面试题 01.01. 判定字符是否唯一")],-1),d={id:"题目-面试题-01-01-判定字符是否唯一",tabindex:"-1"},g=t("a",{class:"header-anchor",href:"#题目-面试题-01-01-判定字符是否唯一","aria-hidden":"true"},"#",-1),p={href:"https://leetcode-cn.com/problems/is-unique-lcci/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://leetcode-cn.com/problems/is-unique-lcci/",target:"_blank",rel:"noopener noreferrer"},q=t("strong",null,"简单",-1),C=r(`<p>要求：实现一个算法，确定一个字符串 s 的所有字符是否全都不同。</p><p>示例 1：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入: s = &quot;leetcode&quot;
输出: false 
</code></pre></div><p>示例 2：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入: s = &quot;abc&quot;
输出: true
</code></pre></div><p>限制： 0 &lt;= len(s) &lt;= 100 如果你不使用额外的数据结构，会很加分。</p><p>提示：</p><ol><li>试试散列表</li><li>位向量有用吗？</li><li>你能用O(NlogN)的时间复杂度解决它吗？这样的解法会是什么样呢？</li></ol><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2><ol><li>双重循环</li></ol><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public bool IsUnique(string astr) {
    // 冒泡类似的，双重循环 效率不好
    for(int i=0;i&lt;astr.Length;i++){
        for(int j=i+1;j&lt;astr.Length;j++){
            if(astr[j]==astr[i])
                return false;
        }
    }
    return true;
}
</code></pre></div><ol start="2"><li>记字符，参考了答案，使用 bool数组</li></ol><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public bool IsUnique(string astr) {   
    if(astr == null || astr==&quot;&quot;)
        return true;
    
    // ASCII码字符个数为128个
    bool[] charArr = new bool[128]; // 默认值都是false

    for(char c in astr){
        if(charArr[c])  // 如果为true 说明已经有相同的字符了，返回不唯一 false
            return false;
        else
            charArr[c] = true; // 第一次遇到字符，设置当前字符标志为 true
    }
    return true;
}
</code></pre></div><ol start="3"><li>位运算，参考了答案</li></ol><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>/*
常用知识
a &amp; (1&lt;&lt;k) 用于判断a的第k位数字是0是1，其实和我们使用数组差不错。相等于 nums[k];
a | (1&lt;&lt;k) 用于将a的第k位数字赋值为1, 相当于nums[k]=1
*/
public bool isUnique(string astr){
    long low64 = 0;  // long 数据类型长 64； ASCII码字符个数128；使用两个 long来处理所有的字符；
    long high64 = 0;

    foreach(char c in astr)
    {
        if (c &gt;= 64) // ASCII码后 64 个字符
        {
            long bitIndex = 1L &lt;&lt; (c - 64);  // c-64 计算相对位置；注意 1L不能变，原因 long类型； 计算位移后的数据
            if ((high64 &amp; bitIndex) != 0)   // 确定当前位置是否为1
                return false;
            high64 |= bitIndex;  // 不为1 当前位置的值改为 1
        }
        else  // ASCII码前 64 个字符
        {
            long bitIndex = 1L &lt;&lt; c;
            if ((low64 &amp; bitIndex) != 0)
                return false;
            low64 |= bitIndex;
        }
    }
    return true;
}
</code></pre></div><h2 id="反思" tabindex="-1"><a class="header-anchor" href="#反思" aria-hidden="true">#</a> 反思</h2><p>看了答案之后，才明白这道题真正考察的是位运算，这块是自己一个模糊概念。</p><ol><li>计算机处理的都是 0 1 0 1</li><li>编程语言处理数据也都是基于0101的，都是各自有规定。</li></ol><p>不太会组织，大概意思就是想说 计算机底层都是处理0101的，C#的值类型都是0101 看是多少位归于那种类型</p>`,19),v={href:"https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/bitwise-and-shift-operators",target:"_blank",rel:"noopener noreferrer"},_=t("code",null,"<<",-1),f=r(`<div class="language-C#" data-ext="C#"><pre class="language-C#"><code>// Convert.ToString(1L,2) 后面2代表 2进制
Convert.ToString(0L,2)     // &quot;0&quot; 
Convert.ToString(1L,2)     // &quot;1&quot;
Convert.ToString(1L&lt;&lt;1,2)  // &quot;10&quot;
Convert.ToString(1L&lt;&lt;2,2)  // &quot;100&quot;
Convert.ToString(1L&lt;&lt;3,2)  // &quot;1000&quot;
Convert.ToString(1L&lt;&lt;63,2) // &quot;1000000000000000000000000000000000000000000000000000000000000000&quot;
Convert.ToString(0L&lt;&lt;22,2) // &quot;0&quot;
</code></pre></div><p><code>|</code></p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>Convert.ToString(0L,2)          // &quot;0&quot; 
Convert.ToString(1L&lt;&lt;2,2)       // &quot;100&quot;

Convert.ToString(0L|(1L&lt;&lt;2),2)  // &quot;100&quot;
Convert.ToString(1L|(1L&lt;&lt;2),2)  // &quot;101&quot; 
Convert.ToString(3L,2)          // &quot;11&quot;
Convert.ToString(3L|(1L&lt;&lt;2),2)  // &quot;011&quot;|&quot;100&quot;=&quot;111&quot;
</code></pre></div><p><code>&amp;</code></p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>Convert.ToString(0L,2)          // &quot;0&quot; 
Convert.ToString(1L&lt;&lt;2,2)       // &quot;100&quot;

Convert.ToString(0L&amp;(1L&lt;&lt;2),2)  // &quot;0&quot;

Convert.ToString(4L,2)         //&quot;100&quot;
Convert.ToString(4L&amp;(1L&lt;&lt;2),2) //&quot;100&quot;

Convert.ToString(5L,2)         //&quot;101&quot;
Convert.ToString(5L&amp;(1L&lt;&lt;2),2) //&quot;100&quot;
</code></pre></div><p>看完就明白了</p>`,6);function L(x,b){const e=l("ExternalLinkIcon");return i(),s("div",null,[u,t("h2",d,[g,n(" 题目："),t("a",p,[n("面试题 01.01. 判定字符是否唯一"),o(e)])]),t("p",null,[t("a",h,[n("原题链接"),o(e)]),n(","),q,n("。")]),C,t("p",null,[t("a",v,[n("位运算符和移位运算符（C# 参考）"),o(e)]),n(" 先的明白"),_,n("左移运算，如下，一看便知")]),f])}const m=a(c,[["render",L],["__file","0101.html.vue"]]);export{m as default};
