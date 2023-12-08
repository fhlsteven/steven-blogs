import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const o="/steven-blogs/assets/toolbox22_1-89eb373e.png",p="/steven-blogs/assets/toolbox22_2-b8e32e4c.png",e={},c=t(`<h1 id="ip地址输入控件-v1-0-1-1版-for-win-form" tabindex="-1"><a class="header-anchor" href="#ip地址输入控件-v1-0-1-1版-for-win-form" aria-hidden="true">#</a> IP地址输入控件 V1.0.1.1版(FOR Win Form)</h1><blockquote><p>guoyan19811021（原作） 关键字 IP地址 控件 Win Form usercontrol</p></blockquote><p><strong>核心代码</strong>:</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code> <span class="token comment">&#39;只允许输入数字、&quot;.&quot;</span>
    <span class="token keyword">Private</span> <span class="token keyword">Sub</span> txtField_KeyPress<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>KeyPressEventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> txtField0<span class="token punctuation">.</span>KeyPress<span class="token punctuation">,</span> txtField1<span class="token punctuation">.</span>KeyPress<span class="token punctuation">,</span> txtField2<span class="token punctuation">.</span>KeyPress<span class="token punctuation">,</span> txtField3<span class="token punctuation">.</span>KeyPress
        <span class="token keyword">If</span> e<span class="token punctuation">.</span>KeyChar <span class="token operator">=</span> <span class="token string">&quot;.&quot;</span> <span class="token keyword">Then</span>
            <span class="token keyword">Dim</span> tx <span class="token keyword">As</span> TextBox <span class="token operator">=</span> <span class="token keyword">CType</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> TextBox<span class="token punctuation">)</span>
            <span class="token comment">&#39;最后的文本框不可以输入&quot;.&quot;</span>
            <span class="token comment">&#39;在其它文本框输入&quot;.&quot;，相当于输入&quot;Tab&quot;键，即光标到下一文本框</span>
            <span class="token keyword">If</span> tx<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Or</span> tx<span class="token punctuation">.</span>SelectedText <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
                e<span class="token punctuation">.</span>Handled <span class="token operator">=</span> <span class="token boolean">True</span>
            <span class="token keyword">End</span> <span class="token keyword">If</span>
            <span class="token keyword">If</span> tx<span class="token punctuation">.</span>Name <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;txtField3&quot;</span> <span class="token keyword">Then</span>
                SendKeys<span class="token punctuation">.</span>Send<span class="token punctuation">(</span><span class="token string">&quot;{TAB}&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">Else</span>
                <span class="token comment">&#39;最后的文本框不可以输入&quot;.&quot;</span>
                e<span class="token punctuation">.</span>Handled <span class="token operator">=</span> <span class="token boolean">True</span>
            <span class="token keyword">End</span> <span class="token keyword">If</span>
        <span class="token keyword">ElseIf</span> <span class="token punctuation">(</span><span class="token keyword">Not</span> IsNumeric<span class="token punctuation">(</span>e<span class="token punctuation">.</span>KeyChar<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">And</span> e<span class="token punctuation">.</span>KeyChar <span class="token operator">&lt;</span><span class="token operator">&gt;</span> ControlChars<span class="token punctuation">.</span>Back <span class="token keyword">Then</span>
            e<span class="token punctuation">.</span>Handled <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">Else</span>
            <span class="token keyword">Dim</span> tx <span class="token keyword">As</span> TextBox <span class="token operator">=</span> <span class="token keyword">CType</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> TextBox<span class="token punctuation">)</span>
            <span class="token keyword">If</span> <span class="token punctuation">(</span>Len<span class="token punctuation">(</span>tx<span class="token punctuation">.</span>Text<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">And</span> e<span class="token punctuation">.</span>KeyChar <span class="token operator">&lt;</span><span class="token operator">&gt;</span> ControlChars<span class="token punctuation">.</span>Back <span class="token keyword">And</span> tx<span class="token punctuation">.</span>SelectedText<span class="token punctuation">.</span>Length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">Then</span>
                <span class="token keyword">If</span> tx<span class="token punctuation">.</span>Name <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&quot;txtField3&quot;</span> <span class="token keyword">Then</span>
                    SendKeys<span class="token punctuation">.</span>Send<span class="token punctuation">(</span><span class="token string">&quot;{TAB}&quot;</span><span class="token punctuation">)</span>
                <span class="token keyword">End</span> <span class="token keyword">If</span>
            <span class="token keyword">End</span> <span class="token keyword">If</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>
        <span class="token comment">&#39;控制ControlChars.Back退格键</span>
        <span class="token keyword">Dim</span> tx1 <span class="token keyword">As</span> TextBox <span class="token operator">=</span> <span class="token keyword">CType</span><span class="token punctuation">(</span>sender<span class="token punctuation">,</span> TextBox<span class="token punctuation">)</span>
        <span class="token keyword">If</span> <span class="token punctuation">(</span>Len<span class="token punctuation">(</span>tx1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">And</span> e<span class="token punctuation">.</span>KeyChar <span class="token operator">=</span> ControlChars<span class="token punctuation">.</span>Back<span class="token punctuation">)</span> <span class="token keyword">Then</span>
            <span class="token keyword">Select</span> <span class="token keyword">Case</span> tx1<span class="token punctuation">.</span>Name
                <span class="token keyword">Case</span> <span class="token string">&quot;txtField3&quot;</span>
                    <span class="token keyword">If</span> txtField3<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
                        txtField2<span class="token punctuation">.</span>Focus<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">End</span> <span class="token keyword">If</span>
                <span class="token keyword">Case</span> <span class="token string">&quot;txtField2&quot;</span>
                    <span class="token keyword">If</span> txtField2<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
                        txtField1<span class="token punctuation">.</span>Focus<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">End</span> <span class="token keyword">If</span>
                <span class="token keyword">Case</span> <span class="token string">&quot;txtField1&quot;</span>
                    <span class="token keyword">If</span> txtField1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token keyword">Then</span>
                        txtField0<span class="token punctuation">.</span>Focus<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">End</span> <span class="token keyword">If</span>
            <span class="token keyword">End</span> <span class="token keyword">Select</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div><p><strong>当运行时</strong>：</p><p><img src="`+o+'" alt="img_1"></p><p><strong>当出现错误时</strong>：</p><p><img src="'+p+'" alt="img_2"></p><hr><hr><p><strong>对该文的评论</strong> 人气：204</p><p>guoyan19811021 (2004-3-2 10:43:50)</p><blockquote><p>下载地址： http://zo.real-hosts.com/guoyan19811021/YuJiaControls.rar</p></blockquote><p>wtadminxjeri (2004-3-2 0:28:59)</p><blockquote><p>怎么不提供全部?dll也可以呀</p></blockquote>',15),k=[c];function l(r,u){return s(),a("div",null,k)}const i=n(e,[["render",l],["__file","toolbox22.html.vue"]]);export{i as default};