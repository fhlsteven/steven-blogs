import{_ as n,o as a,c as s,a as e}from"./app-a2b6e588.js";const o={},t=e(`<h1 id="vba的bug-关于vba中调用activex控件" tabindex="-1"><a class="header-anchor" href="#vba的bug-关于vba中调用activex控件" aria-hidden="true">#</a> VBA的bug，关于VBA中调用ActiveX控件</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  VBA的bug，关于VBA中调用ActiveX控件！
作　　者：  lemon801 (lemon)
等　　级：  ^
信 誉 值：  100
所属论坛：  其他开发语言 Office开发/ VBA
问题点数：  10
回复次数：  1
发表时间：  2003-8-12 11:33:05
</code></pre></div><p>我在VBA中调用ActiveX控件，其中有一个方法声明为：</p><p><code>Sub FileIn(nRow As Long, sFieldValue As String)</code></p><p>但我在VBA中写入：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Dim</span> sFiledValue <span class="token keyword">As</span> <span class="token keyword">String</span>
sFiledValue <span class="token operator">=</span> <span class="token string">&quot;MB_NR&quot;</span>
<span class="token keyword">Dim</span> nRow <span class="token keyword">As</span> <span class="token keyword">Long</span>
nRow <span class="token operator">=</span> <span class="token number">0</span>
UserForm1<span class="token punctuation">.</span>KMDocDB21<span class="token punctuation">.</span>FileIn<span class="token punctuation">(</span>nRow<span class="token punctuation">,</span>sFiledValue<span class="token punctuation">)</span>
</code></pre></div><p>为什么会有“编译错误:语法错误”的提示啊？按道理应该是没有问题的，^_^。</p><hr><hr><p>回复人： warmchang(风滑过的痕迹) ( 一级(初级)) 信誉：100 2003-8-13 18:55:54 得分:10</p><blockquote><p><code>UserForm1.KMDocDB21.FileIn nRow,sFiledValue</code><br><br> VBA中调用函数不需要括号！！！</p></blockquote><p>该问题已经结贴 ，得分记录： warmchang (10)、</p>`,12),c=[t];function p(l,r){return a(),s("div",null,c)}const d=n(o,[["render",p],["__file","vba7.html.vue"]]);export{d as default};
