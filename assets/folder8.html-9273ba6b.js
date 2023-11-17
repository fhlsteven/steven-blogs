import{_ as e,o as t,c as n,a}from"./app-d9da1b6d.js";const l={},i=a(`<h1 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h1><p>File 类：提供用于创建、复制、删除、移动和打开文件的静态方法，并协助创建 FileStream 对象<br> FileInfo 类：提供创建、复制、删除、移动和打开文件的实例方法，并且帮助创建 FileStream 对象<br> FileStream 类：以文件为主的 Stream，既支持同步读写操作，也支持异步读写操作</p><p>Directory 类：用于创建、移动和枚举通过目录和子目录的静态方法<br> DirectoryInfo 类：用于创建、移动和枚举目录和子目录的实例方法</p><p>Path 类：对包含文件或目录路径信息的 String 实例执行操作。这些操作是以跨平台的方式执行的。</p><p><code>System.IO.FileInfo</code> 类</p><p>有关使用此类的示例，请参见下面的“示例”部分。下表列出了其他典型或相关的 I/O 任务的示例。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>创建文本文件。 向文件写入文本  
写入文本文件。 向文件写入文本  
读取文本文件。 从文件读取文本
</code></pre></div><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>向文件中追加文本。    打开并附加到日志文件
                     File.AppendText
                     FileInfo.AppendText
</code></pre></div><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>重命名或移动文件。    File.Move
                    FileInfo.MoveTo
</code></pre></div><hr><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>
删除文件。                   File.Delete
                            FileInfo.Delete

复制文件。                   File.Copy 
                            FileInfo.CopyTo 


获取文件大小。                FileInfo.Length  
获取文件属性。                File.GetAttributes  
设置文件属性。                File.SetAttributes  
确定文件是否存在。            File.Exists
  
读取二进制文件。 对刚创建的数据文件进行读取和写入  
写入二进制文件。 对刚创建的数据文件进行读取和写入

检索文件扩展名。               Path.GetExtension  
检索文件的完全限定目录。        Path.GetFullPath  
检索目录中的文件名和扩展名。    Path.GetFileName  
更改文件扩展名。               Path.ChangeExtension  
</code></pre></div>`,13),o=[i];function r(c,s){return t(),n("div",null,o)}const p=e(l,[["render",r],["__file","folder8.html.vue"]]);export{p as default};
