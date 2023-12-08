import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-实现web文件的上传" tabindex="-1"><a class="header-anchor" href="#c-实现web文件的上传" aria-hidden="true">#</a> C#实现Web文件的上传</h1><p>作者：不详 整理日期：2002-8-6 2:00:00 阅读：237 加入收藏</p><p>在Web编程中,我们常需要把一些本地文件上传到Web服务器上,上传后,用户可以通过浏览器方便地浏览这些文件，应用十分广泛。</p><p>那么使用C#如何实现文件上传的功能呢?下面笔者简要介绍一下。</p><p>首先,在你的Visual C# web project 中增加一个上传用的Web Form,为了要上传文件,需要在ToolBox中选择HTML类的File Field控件,将此控件加入到Web Form中,然而此时该控件还不是服务端控件,我们需要为它加上如下一段代码:</p><p><code>＜input id=uploadfile1 type=file size=49 runat=&quot;server&quot;＞，</code></p><p>这样它就成为服务端控件了,如果需要同时上传数个文件时,我们可以相应增加此控件。</p><p>需要注意的是代码中一定要把＜form＞的属性设置成为：</p><p><code>＜form method=post encType=multipart/ form-data runat=&quot;server&quot;＞</code></p><p>如果没有这个属性,就不能实现上传。</p><p>然后在此Web Form中增加一个Web Form类的Button,双击Button添加如下代码:</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//上传图片的程序段</span>
<span class="token class-name">DateTime</span> now <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now <span class="token punctuation">;</span><span class="token comment">//取现在时间到DataTime类的对象now中</span>
<span class="token class-name"><span class="token keyword">string</span></span> strBaseLocation <span class="token operator">=</span> <span class="token string">&quot;D:\\\\web\\\\FC\\\\pic\\\\&quot;</span><span class="token punctuation">;</span><span class="token comment">//这是文件将上传到的服务器的绝对目录</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>uploadfile1<span class="token punctuation">.</span>PostedFile<span class="token punctuation">.</span>ContentLength <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">//判断选取对话框选取的文件长度是否为0</span>
<span class="token punctuation">{</span>
    uploadfile1<span class="token punctuation">.</span>PostedFile<span class="token punctuation">.</span><span class="token function">SaveAs</span><span class="token punctuation">(</span>strBaseLocation<span class="token operator">+</span>now<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>uploadfile1<span class="token punctuation">.</span>PostedFile<span class="token punctuation">.</span>ContentLength<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//执行上传,并自动根据日期和文件大小不同为文件命名,确保不重复</span>
    Label1<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;图片1已经上传,文件名为:&quot;</span><span class="token operator">+</span>now<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>uploadfile1<span class="token punctuation">.</span>PostedFile<span class="token punctuation">.</span>ContentLength<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">;</span>
    navigator<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Xml<span class="token punctuation">.</span>TreePosition<span class="token punctuation">.</span>After<span class="token punctuation">,</span> XmlNodeType<span class="token punctuation">.</span>Element<span class="token punctuation">,</span><span class="token string">&quot;pic1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    navigator<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Xml<span class="token punctuation">.</span>TreePosition<span class="token punctuation">.</span>FirstChild<span class="token punctuation">,</span> XmlNodeType<span class="token punctuation">.</span>Text<span class="token punctuation">,</span><span class="token string">&quot;pic1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    navigator<span class="token punctuation">.</span>Value<span class="token operator">=</span> now<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>uploadfile1<span class="token punctuation">.</span>PostedFile<span class="token punctuation">.</span>ContentLength<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;.jpg&quot;</span><span class="token punctuation">;</span>
    navigator<span class="token punctuation">.</span><span class="token function">MoveToParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面的代码用于笔者开发的一个使用XML文件存储新闻信息的系统中,后面几句代码作用是写上传文件信息到XML文件中。如果要上传其他类型文件,只需要将jpg改为相应类型的后缀名即可,如改为doc即可上传Word文件,浏览器即可直接浏览上传的Word文件。</p><p>【注意事项】</p><ol><li>上传文件不可以无限大;</li><li>要注意IIS的安全性方面的配合;</li><li>用Visual Studio 的安装项目做安装程序的时候,请注意安装程序所在的绝对路径问题;</li><li>注意文件上传后的重名问题。</li></ol>`,15),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","netinterdu8.html.vue"]]);export{k as default};