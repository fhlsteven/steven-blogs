import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="建立自己的资源管理器" tabindex="-1"><a class="header-anchor" href="#建立自己的资源管理器" aria-hidden="true">#</a> 建立自己的资源管理器</h1><blockquote><p>renyx（原作） 关键字:csharp,c#，ｅｘｐｌｏｒｅｒ</p></blockquote><p>这篇文章介绍了如何得到本地系统信息，通过使用System.Management和Sysetm.IO 来得到文件夹和文件信息，并且把它们显示到TreeView、ListView控件z之中。</p><p>首先可以使用ManagementObjectSearcher类来查询system.management域，来获取返回ManagementOjbectCollection，在这个对象中，包含了我们所需要的信息，包括盘，文件夹，文件，现在让我们来看一下整个源码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Splitter</span> splitter1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MainMenu</span> mainMenu1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MenuItem</span> menuItem1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MenuItem</span> menuItem2<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MenuItem</span> menuItem3<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MenuItem</span> menuItem4<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeView</span> tvFolders<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ListView</span> lvFiles<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ImageList</span> m_imageListTreeView<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>IContainer</span> components<span class="token punctuation">;</span>

<span class="token doc-comment comment">///</span>
<span class="token doc-comment comment">/// 这里是ide自动产生的</span>
<span class="token doc-comment comment">///</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateDriveList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TreeNode</span> nodeTreeNode<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> imageIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> selectIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> Removable <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> LocalDisk <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> Network <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> CD <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> Cursors<span class="token punctuation">.</span>WaitCursor<span class="token punctuation">;</span>

    tvFolders<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//清空树</span>
    nodeTreeNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;My Computer&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//</span>
    tvFolders<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>nodeTreeNode<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">TreeNodeCollection</span> nodeCollection <span class="token operator">=</span> nodeTreeNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">;</span>

    <span class="token class-name">ManagementObjectCollection</span> queryCollection <span class="token operator">=</span> <span class="token function">getDrives</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ManagementObject</span> mo <span class="token keyword">in</span> queryCollection<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>mo<span class="token punctuation">[</span><span class="token string">&quot;DriveType&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">case</span> Removable<span class="token punctuation">:</span>     <span class="token comment">//可移动盘</span>
                imageIndex <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
                selectIndex <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> LocalDisk<span class="token punctuation">:</span>     <span class="token comment">//本地磁盘</span>
                imageIndex <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
                selectIndex <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> CD<span class="token punctuation">:</span>            <span class="token comment">//光盘</span>
                imageIndex <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
                selectIndex <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> Network<span class="token punctuation">:</span>       <span class="token comment">//网络驱动盘</span>
                imageIndex <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
                selectIndex <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token punctuation">:</span>            <span class="token comment">//默认</span>
                imageIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
                selectIndex <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//建立驱动盘的节点</span>
        nodeTreeNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>mo<span class="token punctuation">[</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">,</span> imageIndex<span class="token punctuation">,</span> selectIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>

        nodeCollection<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>nodeTreeNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//Init files ListView</span>
    <span class="token function">InitListView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> Cursors<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">tvFolders_AfterSelect</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeViewEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> Cursors<span class="token punctuation">.</span>WaitCursor<span class="token punctuation">;</span>

    <span class="token comment">//获取当前选择的节点或则文件夹</span>
    <span class="token class-name">TreeNode</span> nodeCurrent <span class="token operator">=</span> e<span class="token punctuation">.</span>Node<span class="token punctuation">;</span>

    <span class="token comment">//清除掉所有的节点</span>
    nodeCurrent<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>SelectedImageIndex <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">PopulateDriveList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token function">PopulateDirectory</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">,</span> nodeCurrent<span class="token punctuation">.</span>Nodes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> Cursors<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitListView</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//开始初始化 ListView 控件</span>
    lvFiles<span class="token punctuation">.</span><span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//为察看列表框建立头信息栏</span>
    lvFiles<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Name&quot;</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>HorizontalAlignment<span class="token punctuation">.</span>Left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    lvFiles<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Size&quot;</span><span class="token punctuation">,</span> <span class="token number">75</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>HorizontalAlignment<span class="token punctuation">.</span>Right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    lvFiles<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Created&quot;</span><span class="token punctuation">,</span> <span class="token number">140</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>HorizontalAlignment<span class="token punctuation">.</span>Left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    lvFiles<span class="token punctuation">.</span>Columns<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Modified&quot;</span><span class="token punctuation">,</span> <span class="token number">140</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>HorizontalAlignment<span class="token punctuation">.</span>Left<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateDirectory</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> nodeCurrent<span class="token punctuation">,</span> <span class="token class-name">TreeNodeCollection</span> nodeCurrentCollection<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">TreeNode</span> nodeDir<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> imageIndex <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> selectIndex <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>SelectedImageIndex <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span><span class="token function">getFullPath</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>FullPath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Directory or path &quot;</span> <span class="token operator">+</span> nodeCurrent<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; does not exist.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token function">PopulateFiles</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> stringDirectories <span class="token operator">=</span> Directory<span class="token punctuation">.</span><span class="token function">GetDirectories</span><span class="token punctuation">(</span><span class="token function">getFullPath</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>FullPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> stringFullPath <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> stringPathName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

                <span class="token comment">//循环搜索整个目录</span>
                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stringDir <span class="token keyword">in</span> stringDirectories<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    stringFullPath <span class="token operator">=</span> stringDir<span class="token punctuation">;</span>
                    stringPathName <span class="token operator">=</span> <span class="token function">GetPathName</span><span class="token punctuation">(</span>stringFullPath<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token comment">//创建目录节点</span>
                    nodeDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>stringPathName<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> imageIndex<span class="token punctuation">,</span> selectIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    nodeCurrentCollection<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>nodeDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: Drive not ready or directory does not exist.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnauthorizedAccessException</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: Drive or directory access denided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetPathName</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stringPath<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//得到文件的数目</span>
    <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> stringSplit <span class="token operator">=</span> stringPath<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">&#39;\\\\&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> _maxIndex <span class="token operator">=</span> stringSplit<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
    <span class="token keyword">return</span> stringSplit<span class="token punctuation">[</span>_maxIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateFiles</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> nodeCurrent<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> lvData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">InitListView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>SelectedImageIndex <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//检查路径</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Directory<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">)</span><span class="token function">getFullPath</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>FullPath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Directory or path &quot;</span> <span class="token operator">+</span> nodeCurrent<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; does not exist.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> stringFiles <span class="token operator">=</span> Directory<span class="token punctuation">.</span><span class="token function">GetFiles</span><span class="token punctuation">(</span><span class="token function">getFullPath</span><span class="token punctuation">(</span>nodeCurrent<span class="token punctuation">.</span>FullPath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">string</span></span> stringFileName <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name">DateTime</span> dtCreateDate<span class="token punctuation">,</span> dtModifyDate<span class="token punctuation">;</span>
                <span class="token class-name">Int64</span> lFileSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

                <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stringFile <span class="token keyword">in</span> stringFiles<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    stringFileName <span class="token operator">=</span> stringFile<span class="token punctuation">;</span>
                    <span class="token class-name">FileInfo</span> objFileSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>stringFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    lFileSize <span class="token operator">=</span> objFileSize<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
                    dtCreateDate <span class="token operator">=</span> objFileSize<span class="token punctuation">.</span>CreationTime<span class="token punctuation">;</span> <span class="token comment">//得到建立文件时候的时间;</span>
                    dtModifyDate <span class="token operator">=</span> objFileSize<span class="token punctuation">.</span>LastWriteTime<span class="token punctuation">;</span> <span class="token comment">//得到最后修改文件时候的时间;</span>

                    lvData<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">GetPathName</span><span class="token punctuation">(</span>stringFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    lvData<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">formatSize</span><span class="token punctuation">(</span>lFileSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token keyword">if</span> <span class="token punctuation">(</span>TimeZone<span class="token punctuation">.</span>CurrentTimeZone<span class="token punctuation">.</span><span class="token function">IsDaylightSavingTime</span><span class="token punctuation">(</span>dtCreateDate<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        lvData<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">formatDate</span><span class="token punctuation">(</span>dtCreateDate<span class="token punctuation">.</span><span class="token function">AddHours</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">{</span>
                        lvData<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">formatDate</span><span class="token punctuation">(</span>dtCreateDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    <span class="token keyword">if</span> <span class="token punctuation">(</span>TimeZone<span class="token punctuation">.</span>CurrentTimeZone<span class="token punctuation">.</span><span class="token function">IsDaylightSavingTime</span><span class="token punctuation">(</span>dtModifyDate<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        lvData<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">formatDate</span><span class="token punctuation">(</span>dtModifyDate<span class="token punctuation">.</span><span class="token function">AddHours</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">{</span>
                        lvData<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">formatDate</span><span class="token punctuation">(</span>dtModifyDate<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    <span class="token class-name">ListViewItem</span> lvItem <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ListViewItem</span><span class="token punctuation">(</span>lvData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    lvFiles<span class="token punctuation">.</span>Items<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>lvItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: Drive not ready or directory does not exist.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UnauthorizedAccessException</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: Drive or directory access denided.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;Error: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">getFullPath</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stringPath<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//得到完整的路径</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stringParse <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token comment">//移除掉“My Computer&quot;名称</span>
    stringParse <span class="token operator">=</span> stringPath<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;My Computer\\\\&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> stringParse<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name">ManagementObjectCollection</span> <span class="token function">getDrives</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//收集驱动</span>
    <span class="token class-name">ManagementObjectSearcher</span> query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ManagementObjectSearcher</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT * From Win32_LogicalDisk &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ManagementObjectCollection</span> queryCollection <span class="token operator">=</span> query<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> queryCollection<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">formatDate</span><span class="token punctuation">(</span><span class="token class-name">DateTime</span> dtDate<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//以短格式得到日期和时间</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stringDate <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    stringDate <span class="token operator">=</span> dtDate<span class="token punctuation">.</span><span class="token function">ToShortDateString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> dtDate<span class="token punctuation">.</span><span class="token function">ToShortTimeString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> stringDate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">formatSize</span><span class="token punctuation">(</span><span class="token class-name">Int64</span> lSize<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stringSize <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">NumberFormatInfo</span> myNfi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NumberFormatInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//根据区域定义如何设置数字格式和如何显示数字格式</span>

    <span class="token class-name">Int64</span> lKBSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>lSize <span class="token operator">&lt;</span> <span class="token number">1024</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lSize <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            stringSize <span class="token operator">=</span> <span class="token string">&quot;0&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            stringSize <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        lKBSize <span class="token operator">=</span> lSize <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">;</span>
        stringSize <span class="token operator">=</span> lKBSize<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token string">&quot;n&quot;</span><span class="token punctuation">,</span> myNfi<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//移除掉浮点数</span>
        stringSize <span class="token operator">=</span> stringSize<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;.00&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> stringSize <span class="token operator">+</span> <span class="token string">&quot; KB&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">menuItem2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//退出应用程序</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p><strong>对该文的评论</strong> 人气：346</p><p>bineon (2004-2-29 18:30:43)</p><blockquote><p>一大堆代码！难道不能给个效果界图先？</p></blockquote>`,10),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysctr13.html.vue"]]);export{i as default};
