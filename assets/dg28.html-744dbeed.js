import{_ as n,o as a,c as s,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="datagrid保存时无法提交更新的问题" tabindex="-1"><a class="header-anchor" href="#datagrid保存时无法提交更新的问题" aria-hidden="true">#</a> datagrid保存时无法提交更新的问题</h1><blockquote><p>zwq78（原作） 关键字 焦点，toolbar</p></blockquote><p>如果绑定了datagrid，在datagrid中对数据进行更改后，点击窗体中的toolbar按钮进行保存时，最后输入的那个数据，如果焦点没有移开，在保存的时候就得不到提交，只有移开焦点的时候才能提交！</p><p>在csdn的贴子上搜索了很久，发现很多人都是建议不用toolbar，而是用button控件，网友covis的解释是“用带SELECTED属性的控件提交数据即可。可能你用TOOLBAR的按钮或其它没有SELECTED属性的控件提交数据的。因为他不能被选中，所以他不能接受焦点，一般的按钮或控件可以将其它控件的焦点转移到自己身上。从这里去考虑。”原文在：<code>http://search.csdn.net/expert/topic/52/5201/2003/4/21/1688615.htm</code></p><p>但是由于笔者所有的toolbar都已经做好了，再更改起来麻烦也不美观，能不能找到其它方法来实现呢？</p><p>经过一些摸索，发现了如下的方法可以实现：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Public</span> <span class="token keyword">Sub</span> SaveData<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">&#39;检查当前焦点是否在datagrid上，是就切换单元格，并提交更改。</span>
    <span class="token keyword">If</span> <span class="token keyword">Me</span><span class="token punctuation">.</span>ActiveControl<span class="token punctuation">.</span>Parent<span class="token punctuation">.</span><span class="token keyword">GetType</span> <span class="token keyword">Is</span> <span class="token keyword">GetType</span><span class="token punctuation">(</span>DataGrid<span class="token punctuation">)</span> <span class="token keyword">Then</span>
        <span class="token keyword">Dim</span> dg <span class="token keyword">As</span> DataGrid <span class="token operator">=</span> <span class="token keyword">CType</span><span class="token punctuation">(</span><span class="token keyword">Me</span><span class="token punctuation">.</span>ActiveControl<span class="token punctuation">.</span>Parent<span class="token punctuation">,</span> DataGrid<span class="token punctuation">)</span>
        ChangeCurrentCell<span class="token punctuation">(</span>dg<span class="token punctuation">)</span>
        <span class="token keyword">Me</span><span class="token punctuation">.</span>BindingContext<span class="token punctuation">(</span>dg<span class="token punctuation">.</span>DataSource<span class="token punctuation">)</span><span class="token punctuation">.</span>EndCurrentEdit<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>save代码

<span class="token keyword">End</span> <span class="token keyword">Sub</span>

<span class="token keyword">Public</span> <span class="token keyword">Function</span> ChangeCurrentCell<span class="token punctuation">(</span><span class="token keyword">ByVal</span> dg <span class="token keyword">As</span> DataGrid<span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Boolean</span>
    <span class="token keyword">Try</span>
        <span class="token keyword">Dim</span> temp <span class="token keyword">As</span> DataGridCell <span class="token operator">=</span> dg<span class="token punctuation">.</span>CurrentCell

        dg<span class="token punctuation">.</span>CurrentCell <span class="token operator">=</span> <span class="token keyword">New</span> DataGridCell<span class="token punctuation">(</span>temp<span class="token punctuation">.</span>RowNumber<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
        dg<span class="token punctuation">.</span>CurrentCell <span class="token operator">=</span> temp
        <span class="token keyword">Return</span> <span class="token boolean">True</span>
    <span class="token keyword">Catch</span> ex <span class="token keyword">As</span> Exception
        <span class="token keyword">Return</span> <span class="token boolean">False</span>
    <span class="token keyword">End</span> <span class="token keyword">Try</span>

<span class="token keyword">End</span> <span class="token keyword">Function</span>
</code></pre></div>`,7),e=[o];function c(l,k){return a(),s("div",null,e)}const u=n(p,[["render",c],["__file","dg28.html.vue"]]);export{u as default};
