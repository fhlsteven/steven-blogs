import{_ as n,o as s,c as a,a as o}from"./app-a2b6e588.js";const p="/steven-blogs/assets/vba13_1-5bf8d3be.png",t="/steven-blogs/assets/vba13_2-8723921b.png",e="/steven-blogs/assets/vba13_3-9904560f.png",c="/steven-blogs/assets/vba13_4-a1b16e95.png",l="/steven-blogs/assets/vba13_5-068abd8b.png",r={},k=o('<h1 id="使用vb-6和vb-net为office应用添加工具栏和按钮" tabindex="-1"><a class="header-anchor" href="#使用vb-6和vb-net为office应用添加工具栏和按钮" aria-hidden="true">#</a> 使用vb 6和vb.net为Office应用添加工具栏和按钮</h1><p>在Office应用中，有可我们可能需要利用word进行一系列的操作，比如执行一段宏，通过点击一个工具栏按钮执行宏的代码段，下面的实例正是为office应用添加一个工具栏和按钮，类似可应用到excel和aceess等Office应用程序。</p><h2 id="_1-在vb6中的应用" tabindex="-1"><a class="header-anchor" href="#_1-在vb6中的应用" aria-hidden="true">#</a> 1. 在VB6中的应用</h2><p>在VB6中引用Micosoft Word X.0（版本号） Object Library 和Micosoft Office X.0（版本号） Object Library，如下图：（笔者使用Office XP）</p><p><img src="'+p+`" alt="img_1"></p><p>添加如下代码：</p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> <span class="token keyword">Sub</span> Command1_Click<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">&#39;定义word应用</span>
    <span class="token keyword">Dim</span> wordApp <span class="token keyword">As</span> <span class="token keyword">New</span> Word<span class="token punctuation">.</span>Application
    <span class="token keyword">Dim</span> myDoc <span class="token keyword">As</span> Word<span class="token punctuation">.</span>Document

    <span class="token comment">&#39;定义工具栏</span>
    <span class="token keyword">Dim</span> myBar <span class="token keyword">As</span> Office<span class="token punctuation">.</span>CommandBar

    <span class="token comment">&#39;定义工具栏按钮</span>
    <span class="token keyword">Dim</span> myButton <span class="token keyword">As</span> Office<span class="token punctuation">.</span>CommandBarButton

    <span class="token keyword">Dim</span> IsExist <span class="token keyword">As</span> <span class="token keyword">Boolean</span>
    IsExist <span class="token operator">=</span> <span class="token boolean">False</span>    

    <span class="token comment">&#39;打开一个word文档</span>
    <span class="token keyword">Set</span> myDoc <span class="token operator">=</span> wordApp<span class="token punctuation">.</span>Documents<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token string">&quot;f:\\test.doc&quot;</span><span class="token punctuation">)</span>
    wordApp<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>    

    <span class="token comment">&#39;如果存在这个工具栏，就显示这个工具栏</span>
    <span class="token keyword">For</span> <span class="token keyword">Each</span> myBar <span class="token keyword">In</span> wordApp<span class="token punctuation">.</span>CommandBars
        <span class="token keyword">If</span> myBar<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;文件操作&quot;</span> <span class="token keyword">Then</span>
            myBar<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
            IsExist <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">Next</span>    

    <span class="token comment">&#39;如果不存在,就创建工具栏及按钮</span>
    <span class="token keyword">If</span> <span class="token keyword">Not</span> IsExist <span class="token keyword">Then</span>
         <span class="token keyword">Set</span> myBar <span class="token operator">=</span> wordApp<span class="token punctuation">.</span>CommandBars<span class="token punctuation">.</span>Add<span class="token punctuation">(</span> <span class="token operator">_</span>
                     Name<span class="token punctuation">:</span><span class="token operator">=</span><span class="token string">&quot;文件操作&quot;</span><span class="token punctuation">,</span> <span class="token operator">_</span>
                     Position<span class="token punctuation">:</span><span class="token operator">=</span>msoBarTop<span class="token punctuation">,</span> <span class="token operator">_</span>
                     Temporary<span class="token punctuation">:</span><span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>        

         <span class="token keyword">Set</span> myButton <span class="token operator">=</span> CommandBars<span class="token punctuation">(</span><span class="token string">&quot;文件操作&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span>Add
             <span class="token keyword">With</span> myButton
                 <span class="token punctuation">.</span>Caption <span class="token operator">=</span> <span class="token string">&quot;文件保存&quot;</span>
                 <span class="token punctuation">.</span>ToolTipText <span class="token operator">=</span> <span class="token string">&quot;lihonggen create&quot;</span>
                <span class="token comment">&#39; .Picture =LoadPicture(&quot;f:\\cd.ICO&quot;)</span>
                 <span class="token comment">&#39;指定表面图片序号</span>
                 <span class="token punctuation">.</span>FaceId <span class="token operator">=</span> <span class="token number">10</span>
                 <span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
                 <span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">True</span>
                 <span class="token comment">&#39;指定此按钮宏的名称</span>
                 <span class="token punctuation">.</span>OnAction <span class="token operator">=</span> <span class="token string">&quot;lihonggen&quot;</span>
             <span class="token keyword">End</span> <span class="token keyword">With</span>
        myBar<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div><h2 id="_2-在vb-net中的应用" tabindex="-1"><a class="header-anchor" href="#_2-在vb-net中的应用" aria-hidden="true">#</a> 2. 在VB.NET中的应用</h2><p>同样，需要添加Micosoft Word X.0（版本号） Object Library 和Micosoft Office X.0（版本号） Object Library 这两个对象库的引用</p><p><img src="`+t+`" alt="img_2"></p><div class="language-vb" data-ext="vb"><pre class="language-vb"><code><span class="token keyword">Private</span> <span class="token keyword">Sub</span> Button1_Click<span class="token punctuation">(</span><span class="token keyword">ByVal</span> sender <span class="token keyword">As</span> System<span class="token punctuation">.</span><span class="token keyword">Object</span><span class="token punctuation">,</span> <span class="token keyword">ByVal</span> e <span class="token keyword">As</span> System<span class="token punctuation">.</span>EventArgs<span class="token punctuation">)</span> <span class="token keyword">Handles</span> Button1<span class="token punctuation">.</span>Click
    <span class="token comment">&#39;定义word应用</span>
    <span class="token keyword">Dim</span> wordApp <span class="token keyword">As</span> <span class="token keyword">New</span> Word<span class="token punctuation">.</span>Application<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">Dim</span> myDoc <span class="token keyword">As</span> Word<span class="token punctuation">.</span>Document

        <span class="token comment">&#39;定义工具栏</span>
    <span class="token keyword">Dim</span> myBar <span class="token keyword">As</span> Microsoft<span class="token punctuation">.</span>Office<span class="token punctuation">.</span>Core<span class="token punctuation">.</span>CommandBar

        <span class="token comment">&#39;定义工具栏按钮</span>
    <span class="token keyword">Dim</span> myButton <span class="token keyword">As</span> Microsoft<span class="token punctuation">.</span>Office<span class="token punctuation">.</span>Core<span class="token punctuation">.</span>CommandBarButton 

    <span class="token keyword">Dim</span> isExist <span class="token keyword">As</span> <span class="token keyword">Boolean</span>
    isExist <span class="token operator">=</span> <span class="token boolean">False</span>
        <span class="token comment">&#39;打开一个word文档</span>
    myDoc <span class="token operator">=</span> wordApp<span class="token punctuation">.</span>Documents<span class="token punctuation">.</span>Open<span class="token punctuation">(</span><span class="token string">&quot;f:\\test.doc&quot;</span><span class="token punctuation">)</span>
    wordApp<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span> 

        <span class="token comment">&#39;如果存在这个工具栏，就显示这个工具栏</span>
    <span class="token keyword">For</span> <span class="token keyword">Each</span> myBar <span class="token keyword">In</span> wordApp<span class="token punctuation">.</span>CommandBars
        <span class="token keyword">If</span> myBar<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;文件操作&quot;</span> <span class="token keyword">Then</span>
            myBar<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
            isExist <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">End</span> <span class="token keyword">If</span>
    <span class="token keyword">Next</span>

    <span class="token comment">&#39;如果不存在,就创建工具栏及按钮</span>
    <span class="token keyword">If</span> <span class="token keyword">Not</span> isExist <span class="token keyword">Then</span>
        myBar <span class="token operator">=</span> wordApp<span class="token punctuation">.</span>CommandBars<span class="token punctuation">.</span>Add<span class="token punctuation">(</span> <span class="token operator">_</span>
                    Name<span class="token punctuation">:</span><span class="token operator">=</span><span class="token string">&quot;文件操作&quot;</span><span class="token punctuation">,</span> <span class="token operator">_</span>
                    Temporary<span class="token punctuation">:</span><span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span> 

        myButton <span class="token operator">=</span> myBar<span class="token punctuation">.</span>CommandBars<span class="token punctuation">(</span><span class="token string">&quot;文件操作&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span>Add

        <span class="token keyword">With</span> myButton
            <span class="token punctuation">.</span>Caption <span class="token operator">=</span> <span class="token string">&quot;文件保存&quot;</span>
            <span class="token punctuation">.</span>TooltipText <span class="token operator">=</span> <span class="token string">&quot;lihonggen create&quot;</span>

            <span class="token comment">&#39;指定图片序号</span>
            <span class="token punctuation">.</span>FaceId <span class="token operator">=</span> <span class="token number">10</span>
            <span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
            <span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">True</span>

            <span class="token comment">&#39;指定此按钮宏的名称</span>
            <span class="token punctuation">.</span>OnAction <span class="token operator">=</span> <span class="token string">&quot;lihonggen&quot;</span>

        <span class="token keyword">End</span> <span class="token keyword">With</span>
        myBar<span class="token punctuation">.</span>Visible <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">End</span> <span class="token keyword">If</span>
<span class="token keyword">End</span> <span class="token keyword">Sub</span>
</code></pre></div><p>在word中录制的宏：</p><p><img src="`+e+'" alt="img3"></p><p>生成的工具栏及按钮：</p><p><img src="'+c+'" alt="img4"></p><p>宏的运行结果：</p><p><img src="'+l+`" alt="img5"></p><p>读者可以在写基础上进行扩展！</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Author : lihonggen0
个人专栏：http://www.csdn.net/develop/author/netauthor/lihonggen0/
</code></pre></div><hr><hr><p><strong>对该文的评论</strong> 人气：321</p><p>lihonggen0 (2003-8-13 16:54:32)</p><blockquote><p>金山词霸2002在word工具栏放了一个图标，用的是word插件技术。具体做法：添加到注册表：<code>HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\word\\Addins\\&lt;ProgID&gt;</code> ProgID表示内部COM插件程序的唯一标识符的字符串表示形式。 ProgID键值下主要有四个键值： FriendlyName: 字符串类型，插件的名称，将在相应程序的COM加载对话框中看到。 Description 字符串类型，插件的描述信息。 LoadBehavior: DWORD类型，决定插件将以什么形式被装载。当其值为0x03时，为应用程序装载时被自动装载(一般使用此值)、当其值为0x08时，为用户控制激活装载。 CommandLineSafe: DWORD类型，命令行方式，可以设置为0x01(真)或0x00(假)。 你自己写的内部COM插件需要提供IDTExtensibility2接口，具体的做法你可以自己找资料去。 IE下的做法是在<code>HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Internet Explorer\\Extensions</code>下面添加你写的com控件.当然你写的com控件也要符合IE的规范</p></blockquote><p>lihonggen0 (2003-8-13 16:50:33)</p><blockquote><p>在标准工具栏上添加按钮，如下： <code>Set setButton = CommandBars(&quot;standard&quot;).Controls.Add With setButton .Caption = &quot;文件保存&quot; .ToolTipText = &quot;aaaa&quot; .Visible = True .OnAction = &quot;bbbb&quot; End With</code></p></blockquote>`,26),u=[k];function i(d,m){return s(),a("div",null,u)}const w=n(r,[["render",i],["__file","vba13.html.vue"]]);export{w as default};
