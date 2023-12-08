import{_ as n,o as s,c as a,a as o}from"./app-f0851ed3.js";const e={},t=o(`<h1 id="关于showopen控件" tabindex="-1"><a class="header-anchor" href="#关于showopen控件" aria-hidden="true">#</a> 关于ShowOpen控件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  关于ShowOpen控件
作　　者：  Andy_hyou (碎羽)
等　　级：  ^
信 誉 值：  98
所属论坛：  VB VBA
问题点数：  50
回复次数：  7
发表时间：  2003-7-9 13:07:21
</code></pre></div><p>当用ShowOpen控件让用户选择打开文件的时候，怎么获得用户选择了“打开”还是“取消”？或者是“X”？多谢！</p><hr><hr><p>回复人： cdknet(VB版主) ( 一星(中级)) 信誉：99 2003-7-10 11:46:08 得分:0</p><blockquote><p>判断 FileName属性咯</p></blockquote><p>回复人： alicky(周松) ( 五级(中级)) 信誉：100 2003-7-10 11:50:23 得分:0</p><blockquote></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">With</span> CommonDialog1
    <span class="token punctuation">.</span>CancelError <span class="token operator">=</span> <span class="token boolean">False</span>
    <span class="token punctuation">.</span>InitDir <span class="token operator">=</span> StrAppPath
    <span class="token punctuation">.</span>DialogTitle <span class="token operator">=</span> <span class="token string">&quot;请选择数据库&quot;</span>
    <span class="token punctuation">.</span>Filter <span class="token operator">=</span> <span class="token string">&quot;*.mdb|*.MDB&quot;</span>
    <span class="token punctuation">.</span>ShowOpen
<span class="token keyword">End</span> <span class="token keyword">With</span>
<span class="token keyword">If</span> CommonDialog1<span class="token punctuation">.</span>FileTitle <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
    msgbox <span class="token string">&quot;取消&quot;</span>
<span class="token keyword">else</span>
    msgbox <span class="token string">&quot;已选择&quot;</span>
<span class="token keyword">end</span> <span class="token keyword">if</span>
</code></pre></div><p>回复人： lxqlogo0(群子) ( 一星(中级)) 信誉：92 2003-7-10 11:52:38 得分:0</p><blockquote></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">With</span> dlgCommonDialog
    <span class="token punctuation">.</span>DialogTitle <span class="token operator">=</span> <span class="token string">&quot;Open&quot;</span>
    <span class="token punctuation">.</span>Flags <span class="token operator">=</span> <span class="token number">&amp;H4</span>
    <span class="token punctuation">.</span>CancelError <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token comment">&#39;ToDo: set the flags and attributes of the common dialog control</span>
    <span class="token punctuation">.</span>Filter <span class="token operator">=</span> <span class="token string">&quot;java文件(*.java)|*.java|HTML文件(*.html;*.htm)|*.html;*.htm|文本文件(*.txt)|*.txt|All Files (*.*)|*.*&quot;</span>
    <span class="token punctuation">.</span>ShowOpen
    <span class="token keyword">If</span> Len<span class="token punctuation">(</span><span class="token punctuation">.</span>FileName<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">Then</span>
        <span class="token keyword">Exit</span> <span class="token keyword">Sub</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>
    sFile <span class="token operator">=</span> <span class="token punctuation">.</span>FileName
<span class="token keyword">End</span> <span class="token keyword">With</span>
</code></pre></div><p>回复人： cdknet(VB版主) ( 一星(中级)) 信誉：99 2003-7-10 11:57:41 得分:0</p><blockquote><p>如果 Object.FileName 为空，说明没选择文件或点了取消或是 &quot;X&quot;，呵呵呵，反之就是……</p></blockquote><p>回复人： Andy_hyou(碎羽) ( 一级(初级)) 信誉：98 2003-7-10 13:50:40 得分:0</p><blockquote><p>有问题，第一次运行正常，但是当选中并打开过一个文件后，FileName和FileTitle里似乎就都保存了刚才的文件名，第二次运行时，无论是否输入文件名，是否选择打开，FileName和FileTitle都不为空。而且FileTitle是只读属性，不能设其为空。<br> 咋办？</p></blockquote><p>回复人： Andy_hyou(碎羽) ( 一级(初级)) 信誉：98 2003-7-10 13:57:51 得分:0</p><blockquote><p>另外，</p></blockquote><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">If</span> CommonDialog1<span class="token punctuation">.</span>FileTitle <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
         Workbooks<span class="token punctuation">.</span>Open<span class="token punctuation">(</span>FileTitle<span class="token punctuation">)</span>
    <span class="token keyword">else</span>
         msgbox <span class="token string">&quot;cancel&quot;</span>
<span class="token keyword">end</span> <span class="token keyword">If</span>
</code></pre></div><blockquote><p>如果用户选择的文件已处于打开状态，系统会弹出对话框说“此文件已打开，是否要二次打开”之类的，如果此时用户选择否，那么Workbooks.Open(FileTitle)语句就无法执行，就会出现错误，怎么办？<br> 请高手指点！！！</p></blockquote><p>回复人： appleliuwei(小苹果) ( 一级(初级)) 信誉：100 2003-7-10 15:41:39 得分:50</p><blockquote><p>我的做法是不显示系统提示，自己做这个对话框，因为不知道如何取得系统对话框的属性<br> 不知道高手有没有别的办法</p></blockquote><p>该问题已经结贴 ，得分记录： appleliuwei (50)、</p>`,24),p=[t];function l(c,k){return s(),a("div",null,p)}const u=n(e,[["render",l],["__file","vba10.html.vue"]]);export{u as default};
