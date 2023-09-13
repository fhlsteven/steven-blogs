import{_ as s,o as n,c as a,a as t}from"./app-477de5b2.js";const p={},e=t(`<h1 id="c-中用winrar和winzip解压缩zip文件" tabindex="-1"><a class="header-anchor" href="#c-中用winrar和winzip解压缩zip文件" aria-hidden="true">#</a> C#中用winrar和winzip解压缩zip文件</h1><h2 id="winrar的方法如下" tabindex="-1"><a class="header-anchor" href="#winrar的方法如下" aria-hidden="true">#</a> winrar的方法如下</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">string</span></span> saves<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span><span class="token comment">//要解压的文件路径</span>
<span class="token class-name"><span class="token keyword">string</span></span> sharepath2<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">;</span><span class="token comment">//解压后存放的路径</span>

filePath<span class="token operator">=</span><span class="token string">&quot;e &quot;</span> <span class="token operator">+</span>saves<span class="token operator">+</span><span class="token string">&quot;　&quot;</span><span class="token operator">+</span>sharepath2；
<span class="token class-name">Process</span> tt <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>winrarPath<span class="token punctuation">,</span>filePath<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//winrarPath=&quot;***&quot;;-------------&gt;winrar.exe的完整路径</span>
<span class="token comment">//filePath=&quot;****&quot;;-------------&gt;要解压文件的路径</span>

<span class="token class-name"><span class="token keyword">string</span></span> temp<span class="token punctuation">;</span>
temp<span class="token operator">=</span><span class="token string">&quot;x -o+ &quot;</span><span class="token operator">+</span><span class="token string">&quot; &quot;</span><span class="token operator">+</span><span class="token string">&quot;111.zip&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> a<span class="token operator">=</span><span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> b<span class="token operator">=</span><span class="token string">&quot;\\\\\\\\&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">string</span></span> temp1<span class="token operator">=</span>temp<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
System<span class="token punctuation">.</span>Diagnostics<span class="token punctuation">.</span>Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;g:\\\\winrar.exe&quot;</span><span class="token punctuation">,</span>temp1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="winzip的方法如下" tabindex="-1"><a class="header-anchor" href="#winzip的方法如下" aria-hidden="true">#</a> winzip的方法如下</h2><p>winzip现在完全支持命令行方式的了，只需要下个WinZip Command Line Support Add-On Version 1.0（<code>http://www.winzip.com/wzcline.htm</code> 下载wzcline.exe）下载安装后有两个文件WZZIP.exe,WZUNZIP.EXE，一个是压缩，一个是解压。</p><h3 id="压缩文件用-wzzip-exe" tabindex="-1"><a class="header-anchor" href="#压缩文件用-wzzip-exe" aria-hidden="true">#</a> 压缩文件用 WZZIP.exe</h3><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>通用格式：wzzip [options] zipfile [@listfile] [files...]
[options]包括：
-a　　　　　　　 默认的操作，压缩文件
-a+　　　　　　  压缩文件，并删除要压缩的文件
-b[drive|path]　是在另外的驱动器上创建临时压缩文件
-d　　　　　　　 删除zip文件中指定的目标文件
-e&lt;x|n|f|s|0&gt;　 是设置压缩比率，x最大，0最小
-f　　　　　　　 替换zip文件中存在的文件
-h|-?　　　　　  察看帮助
-v　　　　　　　 创建一个压缩文件的列表信息
-@list　　　　　 先创建一个包含所有要解压的文件的文件，然后按所包含的的文件名压缩
...............（其他具体看帮助文件）
[@listfile]　　 是压缩文件的列表信息纪录
[files...]　　　则是要压缩的多个文件，用空格隔开，也可以用通配符
</code></pre></div><p>例：</p><p>压缩当前目录的所有文件</p><p><code>wzzip test.zip *.*</code></p><p>压缩类型为txt的所有文件</p><p><code>wzzip test.zip *.txt</code></p><p>压缩两个文件</p><p><code>wzzip test.zip abc.txt def.txt</code></p><p>压缩类型为txt的所有文件除了abc.txt</p><p><code>wzzip -xABC.TXT test.zip *.txt</code></p><p>压缩D:\\docs下的所有类型为txt的文件及子目录</p><p><code>wzzip -rp test.zip d:\\docs\\*.txt</code></p><p>把zipit.1st里的文件更新到test.zip</p><p><code>wzzip -u test.zip @Zipit.lst</code></p><p>列出一个压缩文件的列表内容</p><p><code>wzzip -v test.zip</code></p><h3 id="解压文件用wzunzip-exe" tabindex="-1"><a class="header-anchor" href="#解压文件用wzunzip-exe" aria-hidden="true">#</a> 解压文件用WZUNZIP.exe</h3><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>通过格式：wzunzip [options] zipfile [@listfile] [path] [files...]
[options]包括：
-c[m]　　　　　　解压是显示文件列表在dos屏幕中
-d　　　　　　　 重建zip文件中的目录结构
-f　　　　　　　 只解压在zip文件里同目前文件夹存在的同名的文件，如果没有则不解压
-jhrs　　　　　　忽视zip文件里的文件的隐藏、只读、系统属性
-Jhrs　　　　　　只解压带有隐藏、只读、系统属性的文件
-n　　　　　　　 只解压叫新的文件，如果要解压的文件比已存在的新则替换。
-o　　　　　　　 不用通过yes来确定是否要替换文件
-v　　　　　　　 创建一个压缩文件的列表信息
-@list　　　　　 先创建一个包含所有要解压的文件的文件，然后按所包含的的文件名解压
...............（其他具体看帮助文件）
</code></pre></div><p>例如：</p><p>创建所有文件到当前目录下</p><p><code>wzunzip test.zip</code></p><p>从test.zip中创建abc.txt到当前目录下</p><p><code>wzunzip test.zip abc.txt</code></p><p>创建在test.zip中的目录结构及文件到当前目录下</p><p><code>wzunzip -d test.zip</code></p><p>创建在test.zip中的目录结构及文件到c:\\docs下</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>wzunzip -d test.zip c:\\docs从test.zip中创建包含在files.ist中的文件名的文件
wzunzip test.zip @files.lst
</code></pre></div><p>显示test.zip的文件列表内容</p><p><code>wzunzip -v test.zip</code></p><p>显示压缩文件中所有类型为txt的文件列表内容</p><p><code>wzunzip -v test.zip *.txt</code></p><p>[以上摘自阿舜的文章:http://www.dev-club.com/club/bbs/showEssence.asp?id=17712]</p><p>启动进程可以用<code>System.Diagnostics.Process</code>的重载方法:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Process</span> <span class="token function">Start</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">,</span>
    <span class="token class-name"><span class="token keyword">string</span></span> arguments
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>记得要及时关闭进程(Kill方法)</p>`,41),o=[e];function c(i,l){return n(),a("div",null,o)}const u=s(p,[["render",c],["__file","folder2.html.vue"]]);export{u as default};
