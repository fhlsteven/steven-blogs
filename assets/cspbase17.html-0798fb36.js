import{_ as n,o as s,c as a,d as p}from"./app-35fb03de.js";const t={},o=p(`<h1 id="c-轻松解决世纪迷题-hadelu-原作" tabindex="-1"><a class="header-anchor" href="#c-轻松解决世纪迷题-hadelu-原作" aria-hidden="true">#</a> C#轻松解决世纪迷题 hadelu（原作）</h1><p>关键字:c# 爱因斯坦 算法</p><p>作者：李志勇 发表于赛迪网。e-mail: netsafe@sina.com;转载请注明出处。</p><p>下面的问题相信很多人都听过：</p><ol><li>有五栋五种颜色的房子</li><li>每一位房子的主人国籍都不同</li><li>这五个人每人只喝一种饮料，只抽一种牌子的香烟，只养一种宠物</li><li>没有人有相同的宠物，抽相同牌子的香烟，喝相同的饮料</li></ol><p>提示：</p><ol><li><strong>英国人</strong>住在红房子里</li><li><strong>瑞典人</strong>养了一条狗</li><li><strong>丹麦人</strong>喝茶</li><li>绿房子在白房子左边</li><li>绿房子主人喝咖啡</li><li>抽PALL MALL烟的人养了一只鸟</li><li>黄房子主人抽DUNHILL烟</li><li>住在中间那间房子的人喝牛奶</li><li><strong>挪威人</strong>住第一间房子</li><li>抽混合烟的人住在养鱼人的旁边</li><li>养马人住在DUNHILL烟的人旁边</li><li>抽BLUE MASTER烟的人喝啤酒</li><li><strong>德国人</strong>抽PRINCE烟</li><li>挪威人住在蓝房子旁边</li><li>抽混合烟的人的邻居喝矿泉水</li></ol><p>问题是： 谁养鱼？</p><p>这道迷题出自1981年柏林的德国逻辑思考学院。据说世界上只有2%的人能出答案。就连大名鼎鼎的爱因斯坦也成为此题大伤脑筋，所以这道题也经常被国内外知名公司用做面试题目，相信许多朋友都只做出过一个答案，如果碰巧你属于那98%该怎么办呢。没关系，如果这个问题用电脑来解决就非常easy了。</p><p>程序代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">namespace</span> <span class="token namespace">netsafe<span class="token punctuation">.</span>math</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ayst</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 问题中的所有元素</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token string">&quot;黄房子&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;蓝房子&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;白房子&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;红房子&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;绿房子&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span><span class="token string">&quot;挪威人&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;英国人&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;德国人&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;丹麦人&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;瑞典人&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span><span class="token string">&quot;DUNHILL&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PRINCE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;混合烟&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;PALL MALL&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;BLUE MASTER&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span><span class="token string">&quot;咖 啡&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;矿泉水&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;茶&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;牛奶&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; 啤酒 &quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
       <span class="token punctuation">{</span><span class="token string">&quot;鱼&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; 恐龙&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;马&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;鸟&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;狗&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// answer用来存放答案</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> answer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">]</span></span> ALL <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">122</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> nLevel <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> List <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span></span><span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">ayst</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ayst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            c<span class="token punctuation">.</span><span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token doc-comment comment">///生成全排列到all</span>
            c<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token doc-comment comment">/// 按任意键继续</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i1<span class="token punctuation">,</span> i2<span class="token punctuation">,</span> i3<span class="token punctuation">,</span> i4<span class="token punctuation">,</span> i5<span class="token punctuation">;</span>
            <span class="token doc-comment comment">///通过逻辑条件顺序的有效选择来优化程序</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i1 <span class="token operator">&lt;=</span> <span class="token number">120</span><span class="token punctuation">;</span> i1<span class="token operator">++</span><span class="token punctuation">)</span>    <span class="token doc-comment comment">///房子</span>
            <span class="token punctuation">{</span>
                <span class="token doc-comment comment">/// 9 、挪威人住第一间房子</span>
                <span class="token doc-comment comment">/// 14 、挪威人住在蓝房子旁边</span>
                <span class="token doc-comment comment">/// 不满足条件就短路</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>ALL<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> i1<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> ALL<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i1<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>i2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i2 <span class="token operator">&lt;=</span> <span class="token number">120</span><span class="token punctuation">;</span> i2<span class="token operator">++</span><span class="token punctuation">)</span>   <span class="token doc-comment comment">///人种</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> ALL<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
                    <span class="token doc-comment comment">/// 9 、挪威人住第一间房子</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>ALL<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> i2<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token doc-comment comment">///1、 英国人住在红房子里</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token doc-comment comment">/// 4 、绿房子在白房子左边 </span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                    <span class="token keyword">for</span> <span class="token punctuation">(</span>i3 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i3 <span class="token operator">&lt;=</span> <span class="token number">120</span><span class="token punctuation">;</span> i3<span class="token operator">++</span><span class="token punctuation">)</span>     <span class="token doc-comment comment">/// 烟</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> ALL<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i3<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
                        <span class="token doc-comment comment">///  13、 德国人抽PRINCE烟 </span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                        <span class="token doc-comment comment">///  7 、黄房子主人抽DUNHILL烟</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                        <span class="token keyword">for</span> <span class="token punctuation">(</span>i4 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i4 <span class="token operator">&lt;=</span> <span class="token number">120</span><span class="token punctuation">;</span> i4<span class="token operator">++</span><span class="token punctuation">)</span>   <span class="token doc-comment comment">/// 饮料</span>
                        <span class="token punctuation">{</span>
                            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> ALL<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i4<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
                            <span class="token doc-comment comment">///  8 、住在中间那间房子的人喝牛奶</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span>ALL<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> i4<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                            <span class="token doc-comment comment">/// 5 、绿房子主人喝咖啡 </span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                            <span class="token doc-comment comment">///  3 、丹麦人喝茶 </span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                            <span class="token doc-comment comment">///  15 、抽混合烟的人的邻居喝矿泉水 </span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                            
                            <span class="token doc-comment comment">///  12 、抽BLUE MASTER烟的人喝啤酒</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                            <span class="token keyword">for</span> <span class="token punctuation">(</span>i5 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i5 <span class="token operator">&lt;=</span> <span class="token number">120</span><span class="token punctuation">;</span> i5<span class="token operator">++</span><span class="token punctuation">)</span>   <span class="token doc-comment comment">///宠物</span>
                            <span class="token punctuation">{</span>

                                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> ALL<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i5<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
                                <span class="token doc-comment comment">/// 10 、抽混合烟的人住在养鱼人的旁边</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>

                                <span class="token doc-comment comment">///  2 、瑞典人养了一条狗 </span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                                <span class="token doc-comment comment">///  6 、抽PALL MALL烟的人养了一只鸟 </span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                                <span class="token doc-comment comment">/// 11 、养马人住在DUNHILL烟的人旁边 </span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
                                
                                <span class="token doc-comment comment">///能活到这里的data,当然是答案喽</span>
                                <span class="token function">write_answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 非常典型的用递归实现排列组合算法。5!</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nCount<span class="token punctuation">,</span> nJudge<span class="token punctuation">,</span> key<span class="token punctuation">;</span>
            nLevel<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nLevel <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">writeall</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token doc-comment comment">///有一种排列就写到All数组里</span>
                nLevel<span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span>nCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> nCount <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> nCount<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                key <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span>nJudge <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> nJudge <span class="token operator">&lt;=</span> nLevel <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> nJudge<span class="token operator">++</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>nCount <span class="token operator">==</span> List<span class="token punctuation">[</span>nJudge<span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        key <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    List<span class="token punctuation">[</span>nLevel<span class="token punctuation">]</span> <span class="token operator">=</span> nCount<span class="token punctuation">;</span>
                    <span class="token function">p</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            nLevel<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 写入all数组</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">writeall</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                ALL<span class="token punctuation">[</span>i<span class="token punctuation">,</span> count<span class="token punctuation">]</span> <span class="token operator">=</span> List<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> j<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> k<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>answer<span class="token punctuation">[</span>k<span class="token punctuation">,</span> i<span class="token punctuation">]</span> <span class="token operator">==</span> j<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> k<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 将答案打印出来</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">write_answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> answer<span class="token punctuation">[</span>j<span class="token punctuation">,</span> i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明：程序使用C#，在Microsoft Visual Studio.net下编译执行通过。如果你没有Microsoft Visual C# 需要安装Microsoft(r) .NET Framework SDK ,把上述代码保存到<code>ayst.cs</code>,然后在命令行模式下执行<code>csc ayst.cs</code> ,然后执行<code>ayst.exe</code>也可以。这个程序是很久之前写的。当时只是为了得到答案，所以程序写的比较乱。让同行见笑了。以下是程序的运行结果（答案一总7种，没想到吧）：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>黄房子,蓝房子,红房子,绿房子,白房子,
挪威人,丹麦人,英国人,德国人,瑞典人,
DUNHILL,混合烟,PALL MALL,PRINCE,BLUE MASTER,
矿泉水,茶,牛奶,咖 啡, 啤酒 ,
鱼,马,鸟, 恐龙,狗,

绿房子,蓝房子,黄房子,红房子,白房子,
挪威人,德国人,瑞典人,英国人,丹麦人,
混合烟,PRINCE,DUNHILL,BLUE MASTER,PALL MALL,
咖 啡,矿泉水,牛奶, 啤酒 ,茶,
 恐龙,鱼,狗,马,鸟,

绿房子,蓝房子,白房子,黄房子,红房子,
挪威人,德国人,瑞典人,丹麦人,英国人,
PALL MALL,PRINCE,混合烟,DUNHILL,BLUE MASTER,
咖 啡,矿泉水,牛奶,茶, 啤酒 ,
鸟,鱼,狗, 恐龙,马,

绿房子,蓝房子,白房子,黄房子,红房子,
挪威人,德国人,瑞典人,丹麦人,英国人,
PALL MALL,PRINCE,混合烟,DUNHILL,BLUE MASTER,
咖 啡,矿泉水,牛奶,茶, 啤酒 ,
鸟, 恐龙,狗,鱼,马,

绿房子,蓝房子,白房子,红房子,黄房子,
挪威人,德国人,瑞典人,英国人,丹麦人,
PALL MALL,PRINCE,混合烟,BLUE MASTER,DUNHILL,
咖 啡,矿泉水,牛奶, 啤酒 ,茶,
鸟,鱼,狗,马, 恐龙,

绿房子,蓝房子,红房子,黄房子,白房子,
挪威人,德国人,英国人,丹麦人,瑞典人,
PALL MALL,PRINCE,混合烟,DUNHILL,BLUE MASTER,
咖 啡,矿泉水,牛奶,茶, 啤酒 ,
鸟,鱼,马, 恐龙,狗,

绿房子,蓝房子,红房子,黄房子,白房子,
挪威人,德国人,英国人,丹麦人,瑞典人,
PALL MALL,PRINCE,混合烟,DUNHILL,BLUE MASTER,
咖 啡,矿泉水,牛奶,茶, 啤酒 ,
鸟, 恐龙,马,鱼,狗,
</code></pre></div><hr><p>对该文的评论 人气：341</p><p>lubaixu (2004-3-11 8:32:54)</p><blockquote><p>呵呵天才.</p></blockquote><p>BinzyWu (2004-3-9 16:37:28)</p><blockquote><p>不错不错 鼓掌鼓掌</p></blockquote>`,19),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(t,[["render",e],["__file","cspbase17.html.vue"]]);export{i as default};
