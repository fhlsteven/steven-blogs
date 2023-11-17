import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const o={},t=p(`<h1 id="设置treeview控件的背景色" tabindex="-1"><a class="header-anchor" href="#设置treeview控件的背景色" aria-hidden="true">#</a> 设置TreeView控件的背景色</h1><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> <span class="token keyword">Declare</span> <span class="token keyword">Function</span> SendMessage <span class="token keyword">Lib</span> <span class="token string">&quot;User32&quot;</span> <span class="token keyword">Alias</span> <span class="token string">&quot;SendMessageA&quot;</span> <span class="token punctuation">(</span>ByVa l hWnd <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> wMsg <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> wParam <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> lParam <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Long</span>
<span class="token keyword">Private</span> <span class="token keyword">Declare</span> <span class="token keyword">Function</span> GetWindowLong <span class="token keyword">Lib</span> <span class="token string">&quot;User32&quot;</span> <span class="token keyword">Alias</span> <span class="token string">&quot;GetWindowLongA&quot;</span> <span class="token punctuation">(</span>
<span class="token keyword">ByVal</span> hWnd <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> nIndex <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Long</span>
<span class="token keyword">Private</span> <span class="token keyword">Declare</span> <span class="token keyword">Function</span> SetWindowLong <span class="token keyword">Lib</span> <span class="token string">&quot;User32&quot;</span> <span class="token keyword">Alias</span> <span class="token string">&quot;SetWindowLongA&quot;</span> <span class="token punctuation">(</span>
<span class="token keyword">ByVal</span> hWnd <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> nIndex <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> dwNewLong <span class="token keyword">As</span> <span class="token keyword">Long</span><span class="token punctuation">)</span> <span class="token keyword">As</span> <span class="token keyword">Long</span>
<span class="token keyword">Private</span> <span class="token keyword">Const</span> GWL_STYLE <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">16</span><span class="token operator">&amp;</span>
<span class="token keyword">Private</span> <span class="token keyword">Const</span> TVM_SETBKCOLOR <span class="token operator">=</span> <span class="token number">4381</span><span class="token operator">&amp;</span>
<span class="token keyword">Private</span> <span class="token keyword">Const</span> TVM_GETBKCOLOR <span class="token operator">=</span> <span class="token number">4383</span><span class="token operator">&amp;</span>
<span class="token keyword">Private</span> <span class="token keyword">Const</span> TVS_HASLINES <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">&amp;</span>
<span class="token keyword">Dim</span> frmlastForm <span class="token keyword">As</span> Form
<span class="token keyword">Private</span> <span class="token keyword">Sub</span> Form_Load<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> nodX <span class="token keyword">As</span> Node
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Root&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> tvwChild<span class="token punctuation">,</span> <span class="token string">&quot;C1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Child 1&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> tvwChild<span class="token punctuation">,</span> <span class="token string">&quot;C2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Child 2&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> tvwChild<span class="token punctuation">,</span> <span class="token string">&quot;C3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Child 3&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">Set</span> nodX <span class="token operator">=</span> TreeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">&quot;R&quot;</span><span class="token punctuation">,</span> tvwChild<span class="token punctuation">,</span> <span class="token string">&quot;C4&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Child 4&quot;</span><span class="token punctuation">)</span>
nodX<span class="token punctuation">.</span>EnsureVisible
TreeView1<span class="token punctuation">.</span>style <span class="token operator">=</span> tvwTreelinesText <span class="token comment">&#39; Style 4.</span>
TreeView1<span class="token punctuation">.</span>BorderStyle <span class="token operator">=</span> vbFixedSingle
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
<span class="token keyword">Private</span> <span class="token keyword">Sub</span> Command1_Click<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">Dim</span> lngStyle <span class="token keyword">As</span> <span class="token keyword">Long</span>
<span class="token keyword">Call</span> SendMessage<span class="token punctuation">(</span>TreeView1<span class="token punctuation">.</span>hWnd<span class="token punctuation">,</span> TVM_SETBKCOLOR<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> RGB<span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">&#39;改变背景到红色</span>
lngStyle <span class="token operator">=</span> GetWindowLong<span class="token punctuation">(</span>TreeView1<span class="token punctuation">.</span>hWnd<span class="token punctuation">,</span> GWL_STYLE<span class="token punctuation">)</span>
<span class="token keyword">Call</span> SetWindowLong<span class="token punctuation">(</span>TreeView1<span class="token punctuation">.</span>hWnd<span class="token punctuation">,</span> GWL_STYLE<span class="token punctuation">,</span> lngStyle <span class="token operator">-</span> TVS_HASLINES<span class="token punctuation">)</span>
<span class="token keyword">Call</span> SetWindowLong<span class="token punctuation">(</span>TreeView1<span class="token punctuation">.</span>hWnd<span class="token punctuation">,</span> GWL_STYLE<span class="token punctuation">,</span> lngStyle<span class="token punctuation">)</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div>`,2),e=[t];function c(k,l){return s(),a("div",null,e)}const r=n(o,[["render",c],["__file","vba6.html.vue"]]);export{r as default};
