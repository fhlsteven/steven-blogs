import{_ as n,o as s,c as a,a as p}from"./app-f0851ed3.js";const t={},o=p(`<h1 id="用c-获取浏览文件夹对话框" tabindex="-1"><a class="header-anchor" href="#用c-获取浏览文件夹对话框" aria-hidden="true">#</a> 用C#获取浏览文件夹对话框</h1><blockquote><p>作者：上海 曾奕 发文时间：2003.07.24 10:30:00</p></blockquote><p>我们知道，C#里面有选择文件的对话框控件，却没有选择文件夹的对话框控件，不少人为了选择一个文件夹只好自己用TreeView类来处理，其实在C#里面完全不用那么麻烦，我们可以用C#的FolderNameEditor类的子类FolderBrowser类来实现获取浏览文件夹对话框的功能。</p><p>下面来看看具体是怎么实现的。</p><p>首先新建一个winform的项目，再新建一个类文件（File-&gt;AddNewItem-&gt;Class）。</p><p>因为FolderNameEditor是在System.Windows.Forms.Design命名空间下的，此命名空间位于动态链接库system.design.dll，所以我们要先在解决方案中添加新的引用（reference）System.Design。然后在代码中添加</p><p><code>using System.Windows.Forms.Design;</code></p><p>接着，我们新建一个FolderDialog类，此类从FolderNameEditor类继承，在此类中新建一个FolderBrowser类的实例。DisplayDialog(string description)函数用于设置实例fDialog的属性，并且显示浏览文件夹对话框。为了取得文件夹的路径，设置一个Path属性，返回选取文件夹的路径。</p><p>代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FolderDialog</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">FolderNameEditor</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">FolderNameEditor<span class="token punctuation">.</span>FolderBrowser</span> fDialog <span class="token operator">=</span> <span class="token keyword">new</span>
    <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Design<span class="token punctuation">.</span>FolderNameEditor<span class="token punctuation">.</span>FolderBrowser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">FolderDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">DialogResult</span> <span class="token function">DisplayDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">DisplayDialog</span><span class="token punctuation">(</span><span class="token string">&quot;请选择一个文件夹&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">DialogResult</span> <span class="token function">DisplayDialog</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> description<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        fDialog<span class="token punctuation">.</span>Description <span class="token operator">=</span> description<span class="token punctuation">;</span>
        <span class="token keyword">return</span> fDialog<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Path
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> fDialog<span class="token punctuation">.</span>DirectoryPath<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token operator">~</span><span class="token function">FolderDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        fDialog<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>利用这个新建的类，就可以显示浏览文件夹对话框。</p><p>在Form1中添加一个TextBox控件，在Form1的构造函数里添加下面代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name">FolderDialog</span> openFolder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FolderDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>openFolder<span class="token punctuation">.</span><span class="token function">DisplayDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span>DialogResult<span class="token punctuation">.</span>OK<span class="token punctuation">)</span>
    textBox1<span class="token punctuation">.</span>Text<span class="token operator">=</span>openFolder<span class="token punctuation">.</span>Path<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    textBox1<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;你没有选择目录&quot;</span><span class="token punctuation">;</span>
</code></pre></div><p>运行这个工程，就会弹出如下的浏览文件夹对话框，是不是和Windows自带的一摸一样？</p><p>点击确定之后会显示你选择的文件夹的路径，点击取消则显示你没有选择目录。</p>`,15),e=[o];function c(l,u){return s(),a("div",null,e)}const k=n(t,[["render",c],["__file","diag4.html.vue"]]);export{k as default};
