import{_ as r,r as d,o as i,c as o,b as t,d as n,e as s,a}from"./app-a2b6e588.js";const l={},c=t("h1",{id:"面试题-01-02-判定是否互为字符重排",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#面试题-01-02-判定是否互为字符重排","aria-hidden":"true"},"#"),n(" 面试题 01.02. 判定是否互为字符重排")],-1),h={id:"_01-02-判定是否互为字符重排-简单",tabindex:"-1"},u=t("a",{class:"header-anchor",href:"#_01-02-判定是否互为字符重排-简单","aria-hidden":"true"},"#",-1),g={href:"https://leetcode-cn.com/problems/check-permutation-lcci/",target:"_blank",rel:"noopener noreferrer"},f=t("strong",null,"简单",-1),p=a(`<p>给定两个字符串 <code>s1</code> 和 <code>s2</code>，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。</p><p>示例 1：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入: s1 = &quot;abc&quot;, s2 = &quot;bca&quot;
输出: true 
</code></pre></div><p>示例 2：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>输入: s1 = &quot;abc&quot;, s2 = &quot;bad&quot;
输出: false
</code></pre></div><p>说明：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>0 &lt;= len(s1) &lt;= 100
0 &lt;= len(s2) &lt;= 100
</code></pre></div><p>提示：</p><ol><li>描述两个字符串是否互为字符重排的含义。现在，看看你提供的定义，你能否根据这个定义检查字符串</li><li>有一种解法需要O(NlogN)的时间。另一种解法需要使用一些.空间，但需要运行时间为O(N)</li><li>散列表有用吗</li><li>两个重排的字符串应该具有相同的字符，但顺序不同。你可以让它们的顺序一样吗？</li></ol><h2 id="解答" tabindex="-1"><a class="header-anchor" href="#解答" aria-hidden="true">#</a> 解答</h2><p>“重新排列后，变成另一个字符串” 根据题干提供的信息，得知</p><ol><li>s1 和 s2 应该长度相同</li><li>s1 和 s2 中出现的字符的数量和类型应该相同</li></ol><p>解法一： 自己写的，仅供参考；两次循环，标记符号，没有出现过的直接返回</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public bool CheckPermutation(string s1, string s2) {
    if(s1.Length!=s2.Length)  // 长度不同返回false
        return false;
    bool isExist;  // 标记字符是否在第二个字符串出现过
    byte[] flags = new byte[s2.Length]; // 存储s1 在 s2中出现时的标记
    foreach(char ch in s1){ // 循环s1中的字符，在s2中出现位置后标记其位置
        isExist = false;
        for(int i=0;i&lt;s2.Length;i++){
            if(ch==s2[i] &amp;&amp; flags[i]==0) // 相等时且对应的标记位置为0 时，标记对应位置为 1，跳出当前循环
            {
                isExist=true;
                flags[i] = 1;
                break;
            }                    
        }
        if(!isExist)
            return false;
    }
    return true;
    /*
        bool[] flags = new bool[s2.Length]; // 存储s1 在 s2中出现时的标记
        foreach(char ch in s1){ // 循环s1中的字符，在s2中出现位置后标记其位置
            for(int i=0;i&lt;s2.Length;i++){
                if(ch==s2[i] &amp;&amp; !flags[i]){
                    flags[i] = true;
                    break;
                }                    
            }
        }
        foreach(bool isExist in flags){
            if(!isExist)
                return false;
        }
        return true;
    */
}
</code></pre></div><p>解法2： 来自大家的结合，统计字符数，最后保证所有的字符都是 0</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public bool CheckPermutationV2(string s1, string s2)
{
    if (s1.Length != s2.Length)
        return false;

    byte[] flags = new byte[128];
    for (int i = 0; i &lt; s1.Length; i++)
    {
        flags[s1[i]]++;
        flags[s2[i]]--;
    }

    for (int i = 0; i &lt; flags.Length; i++)
    {
        if (flags[i] != 0)
            return false;
    }

    return true;
}
</code></pre></div><p>解法三：</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>public bool CheckPermutationV3(string s1, string s2)
{
    if (s1.Length != s2.Length)
        return false;

    Dictionary&lt;char, byte&gt; countDict = new Dictionary&lt;char, byte&gt;(s1.Length);
    for (int i = 0; i &lt; s1.Length; i++)
    {
        if (countDict.ContainsKey(s1[i]))
            countDict[s1[i]]++;
        else
            countDict.Add(s1[i], 1);  
    }

    for (int i = 0; i &lt; s2.Length; i++)
    {
        if (countDict.ContainsKey(s2[i]))
            countDict[s2[i]]--;
        else
            return false;
    }

    foreach (char curChar in countDict.Keys){
        if(countDict[curChar] != 0)
            return false;
    }

    return true;
}
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>第二种是我目前觉得比较完善的，但是具体的需求还得看具体的分析啦。</p>`,20),_={href:"https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/integral-numeric-types",target:"_blank",rel:"noopener noreferrer"},b=a("<table><thead><tr><th>C# 类型/关键字</th><th>范围</th><th>大小</th><th>.NET 类型</th></tr></thead><tbody><tr><td>sbyte</td><td>-128 到 127</td><td>8 位带符号整数</td><td>System.SByte</td></tr><tr><td>byte</td><td>0 到 255</td><td>无符号的 8 位整数</td><td>System.Byte</td></tr><tr><td>short</td><td>-32,768 到 32,767</td><td>有符号 16 位整数</td><td>System.Int16</td></tr><tr><td>ushort</td><td>0 到 65,535</td><td>无符号 16 位整数</td><td>System.UInt16</td></tr><tr><td>int</td><td>-2,147,483,648 到 2,147,483,647</td><td>带符号的 32 位整数</td><td>System.Int32</td></tr><tr><td>uint</td><td>0 到 4,294,967,295</td><td>无符号的 32 位整数</td><td>System.UInt32</td></tr><tr><td>long</td><td>-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807</td><td>64 位带符号整数</td><td>System.Int64</td></tr><tr><td>ulong</td><td>0 到 18,446,744,073,709,551,615</td><td>无符号 64 位整数</td><td>System.UInt64</td></tr><tr><td>nint</td><td>取决于平台</td><td>带符号的 32 位或 64 位整数</td><td>System.IntPtr</td></tr><tr><td>nuint</td><td>取决于平台</td><td>无符号的 32 位或 64 位整数</td><td>System.UIntPtr</td></tr></tbody></table>",1);function m(x,y){const e=d("ExternalLinkIcon");return i(),o("div",null,[c,t("h2",h,[u,n(),t("a",g,[n("01.02. 判定是否互为字符重排"),s(e)]),n(),f]),p,t("p",null,[t("a",_,[n("C# 支持以下预定义整型类型"),s(e)]),n("：")]),b])}const L=r(l,[["render",m],["__file","0102判定是否互为字符重排.html.vue"]]);export{L as default};
