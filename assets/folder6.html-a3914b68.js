import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as l}from"./app-477de5b2.js";const u={},k={id:"文件改名",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#文件改名","aria-hidden":"true"},"#",-1),r={href:"https://blog.csdn.net/bosses/article/details/209797",target:"_blank",rel:"noopener noreferrer"},m=l(`<p>其实很简单了，不过这里还是说一下，希望能给和我一样的C#新手带来帮助</p><p>背景：本人很爱看动画片和漫画，近日下载了火影忍者的漫画，结果目录中的图片文件命名方式是<code>1，2，.....，10，....99，100，</code>这样在acdsee中观看的顺序就是<code>1，10，100....</code>不是按照数字的顺序，看起来比较郁闷。故此就动手写一个批量文件改名的小程序，把文件名补齐为3位，按照<code>001，002，...，009，010，...</code>这样的顺序。</p><p>涉及到的知识：string的函数；File和Directory函数；Environment和一些界面类</p><p>核心代码如下：十分简单</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// 清空log</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>listBoxLog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 获取当前路径下全部文件名</span>
<span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> files <span class="token operator">=</span> Directory<span class="token punctuation">.</span><span class="token function">GetFiles</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>CurrentDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">String</span> filename <span class="token keyword">in</span> files<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 最后一个&quot;\\&quot;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> lastpath <span class="token operator">=</span> filename<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 最后一个&quot;.&quot;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> lastdot <span class="token operator">=</span> filename<span class="token punctuation">.</span><span class="token function">LastIndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//  纯文件名字长度</span>
    <span class="token class-name"><span class="token keyword">int</span></span> length <span class="token operator">=</span> lastdot <span class="token operator">-</span> lastpath <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">//  文件目录字符串 xx\\xx\\xx\\</span>
    <span class="token class-name">String</span> beginpart <span class="token operator">=</span> filename<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> lastpath <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//   纯文件名字</span>
    <span class="token class-name">String</span> namenoext <span class="token operator">=</span> filename<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>lastpath <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//   扩展名</span>
    <span class="token class-name">String</span> ext <span class="token operator">=</span> filename<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>lastdot<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 补齐为3位，组成新的文件名</span>
        <span class="token class-name">String</span> namenew<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
            namenew <span class="token operator">=</span> <span class="token string">&quot;00&quot;</span> <span class="token operator">+</span> namenoext<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            namenew <span class="token operator">=</span> <span class="token string">&quot;0&quot;</span> <span class="token operator">+</span> namenoext<span class="token punctuation">;</span>
        <span class="token class-name">String</span> fullnewname <span class="token operator">=</span> beginpart <span class="token operator">+</span> namenew <span class="token operator">+</span> ext<span class="token punctuation">;</span>

        <span class="token comment">// 改名</span>
        File<span class="token punctuation">.</span><span class="token function">Move</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> fullnewname<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// log</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>listBoxLog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>namenoext <span class="token operator">+</span> <span class="token string">&quot;---&gt;&quot;</span> <span class="token operator">+</span> namenew<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>listBoxLog<span class="token punctuation">.</span>SelectedIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listBoxLog<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>Count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,5);function d(f,g){const a=p("ExternalLinkIcon");return o(),e("div",null,[n("h1",k,[i,s(),n("a",r,[s("文件改名"),c(a)])]),m])}const x=t(u,[["render",d],["__file","folder6.html.vue"]]);export{x as default};
