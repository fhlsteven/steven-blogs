import{_ as e,r as o,o as r,c as a,b as t,d as s,e as u,a as q}from"./app-d9da1b6d.js";const c="/steven-blogs/assets/ccsv_testresult-ba9925a3.png",l={},i=q(`<h1 id="c-csv-双引号处理" tabindex="-1"><a class="header-anchor" href="#c-csv-双引号处理" aria-hidden="true">#</a> C# CSV 双引号处理</h1><p>直接上代码，自己写的，有问题可以随时联系</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>// 没有保证所有的都能对上，目前只处理了自己所遇见的格式
public static string[] SplitStr(string strdata)
{
    if (!strdata.Contains(&quot;\\&quot;&quot;)) // 不包含 双引号 直接返回 split数组
        return strdata.Split(&#39;,&#39;);

    ArrayList cells = new ArrayList();
    string str = &quot;&quot;;
    bool flag = false; // 双引号开始标记
    for (int i = 0; i &lt; strdata.Length; i++)
    {
        char ch = strdata[i];
        if (ch == &#39;,&#39;)
        {
            if (i + 1 &lt; strdata.Length &amp;&amp; strdata[i + 1] == &#39;,&#39;) // 处理为空的情况
            {
                cells.Add(str);
                str = &quot;&quot;;
            }
            else if (!flag) // 如果没有双引号开始标记，就是一列的结束
            {
                cells.Add(str);
                str = &quot;&quot;;
            }
            else
                str += ch;
        }
        else if (ch == &#39;\\&quot;&#39;)
        {
            if (i + 1 &lt; strdata.Length)
            {
                if (strdata[i + 1] == &#39;&quot;&#39;) // 字段内部的双引号
                {
                    // 
                    i++;
                    str += &quot;\\&quot;&quot;;
                }
                else if (strdata[i + 1] == &#39;,&#39;) // 后面是逗号要结尾了
                {
                    flag = !flag;
                }
                else
                {
                    flag = !flag;
                }
            }
        }
        else
        {
            str += ch;
        }
    }
    cells.Add(str); // 最后一个数据
    return (string[])cells.ToArray(typeof(string));
}
</code></pre></div><p>测试代码：</p><div class="language-C#" data-ext="C#"><pre class="language-C#"><code>[TestMethod]
public void SplitTest()
{
    const string data = &quot;\\&quot;Bob said, \\&quot;\\&quot;Hey!\\&quot;\\&quot;\\&quot;,2, 3 &quot;;
    var csv = Csv.SplitStr(data);
    Assert.AreEqual(@&quot;Bob said, &quot;&quot;Hey!&quot;&quot;&quot;, csv[0]);
    Assert.AreEqual(&quot;2&quot;, csv[1]);
    Assert.AreEqual(&quot; 3 &quot;, csv[2]);
}

[TestMethod]
public void SplitTest2()
{
    const string data = &quot;\\&quot;\\n\\r\\n\\n\\r\\r\\&quot;,,\\t,\\n&quot;;
    var csv = Csv.SplitStr(data);
    Assert.AreEqual(&quot;\\n\\r\\n\\n\\r\\r&quot;, csv[0]);
    Assert.AreEqual(&quot;&quot;, csv[1]);
    Assert.AreEqual(&quot;\\t&quot;, csv[2]);
    Assert.AreEqual(&quot;\\n&quot;, csv[3]);
}

//2022-01-17 01:04:28,60562331,&quot;rc international logistics pty, ltd&quot;,22.65,22.65,13249762,SCHEDULED1206945092,SCHEDULED,DR,2022-01-19 06:41:38,S,,,0,62184466,,60562331,7948840

[TestMethod]
public void SplitTest3()
{
    const string data = &quot;2022-01-17 01:04:28,60562331,\\&quot;rc international logistics pty, ltd\\&quot;,22.65,22.65,13249762,SCHEDULED1206945092,SCHEDULED,DR,2022-01-19 06:41:38,S,,,0,62184466,,60562331,7948840&quot;;
    var csv = Csv.SplitStr(data);
    Assert.AreEqual(&quot;2022-01-17 01:04:28&quot;, csv[0]);
    Assert.AreEqual(&quot;60562331&quot;, csv[1]);
    Assert.AreEqual(&quot;rc international logistics pty, ltd&quot;, csv[2]);
    Assert.AreEqual(&quot;22.65&quot;, csv[3]);
    Assert.AreEqual(&quot;22.65&quot;, csv[4]);
    Assert.AreEqual(&quot;13249762&quot;, csv[5]);
    Assert.AreEqual(&quot;SCHEDULED1206945092&quot;, csv[6]);
    Assert.AreEqual(&quot;SCHEDULED&quot;, csv[7]);
    Assert.AreEqual(&quot;DR&quot;, csv[8]);
    Assert.AreEqual(&quot;2022-01-19 06:41:38&quot;, csv[9]);
    Assert.AreEqual(&quot;S&quot;, csv[10]);
    Assert.AreEqual(&quot;&quot;, csv[11]);
    Assert.AreEqual(&quot;&quot;, csv[12]);
    Assert.AreEqual(&quot;0&quot;, csv[13]);
    Assert.AreEqual(&quot;62184466&quot;, csv[14]);
    Assert.AreEqual(&quot;&quot;, csv[15]);
    Assert.AreEqual(&quot;60562331&quot;, csv[16]);
    Assert.AreEqual(&quot;7948840&quot;, csv[17]);
}
</code></pre></div><p>测试结果截图：</p><p><img src="`+c+'" alt="c#_csv_test"></p>',7),d={href:"https://www.codeproject.com/Articles/9258/A-Fast-CSV-Reader",target:"_blank",rel:"noopener noreferrer"};function A(v,p){const n=o("ExternalLinkIcon");return r(),a("div",null,[i,t("p",null,[s("其他参考 "),t("a",d,[s("https://www.codeproject.com/Articles/9258/A-Fast-CSV-Reader"),u(n)])])])}const g=e(l,[["render",A],["__file","C_Cvs双引号处理.html.vue"]]);export{g as default};
