import{_ as n,o as s,c as a,a as t}from"./app-a2b6e588.js";const p={},e=t(`<h1 id="c-中treeview组件使用方法初步" tabindex="-1"><a class="header-anchor" href="#c-中treeview组件使用方法初步" aria-hidden="true">#</a> C#中TreeView组件使用方法初步</h1><blockquote><p>未知 aspxcn.com 2002-09-01</p></blockquote><p>TreeView组件是由多个类来定义的，TreeView组件是由命名空间&quot;System.Windows.Forms&quot;中的&quot;TreeView&quot;类来定义的，而其中的节点(即Node)，是由命名空间&quot;System.Windows.Forms&quot;中的&quot;TreeNode&quot;来定义的。所以当在程序中创建一个TreeView对象，其实只是创建了一个可以放置节点的&quot;容器&quot;。而在这个容器中加入一个节点，其实就是加入了从&quot;TreeNode&quot;类中创建的一个节点对象；同样删除一个节点，也就是删除一个&quot;TreeNode&quot;节点对象。</p><h2 id="一-本文中介绍的程序设计及运行环境" tabindex="-1"><a class="header-anchor" href="#一-本文中介绍的程序设计及运行环境" aria-hidden="true">#</a> 一． 本文中介绍的程序设计及运行环境</h2><p>（1）.微软视窗2000 服务器版<br> （2）..Net Framework SDK 正式版</p><h2 id="二-c-操作treeview组件中的一些常用方法以及具体实现" tabindex="-1"><a class="header-anchor" href="#二-c-操作treeview组件中的一些常用方法以及具体实现" aria-hidden="true">#</a> 二． C＃操作TreeView组件中的一些常用方法以及具体实现</h2><p>TreeView组件虽然是一个操作起来比较麻烦的组件，但归根到底，可以总结为三种基本操作：加入子节点、加入兄弟节点和删除节点。掌握了这三种常用操作，对于在编程中灵活运用TreeView组件是十分必要的。下面就分别来加以介绍。</p><p>（1）.加入子节点：</p><p>所谓子节点，就是处于选定节点的下一级节点。加入子节点的具体过程是：首先要在TreeView组件中定位要加入的子节点的位置，然后创建一个节点对象，然后利用TreeVeiw类中对节点的加入方法（即：Add()方法），加入此节点对象。下面就是在treeView1组件中加入一个子节点的具体代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//首先判断是否选定组件中的位置</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请选择一个节点&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token comment">//创建一个节点对象，并初始化</span>
    <span class="token class-name">TreeNode</span> tmp<span class="token punctuation">;</span>
    tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;节点名称&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//在TreeView组件中加入子节点</span>
    treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
    treeView1<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（2）.加入兄弟节点：</p><p>所谓兄弟节点，就是在选定的节点的平级的节点。加入兄弟节点的方法和加入子节点的方法基本一致，只是在最后的实现方法上有着略微的区别。加入兄弟节点的具体步骤，首先也是要确定要加入的兄弟节点所处的位置，接着定义一个节点对象，最后调用TreeView类中对兄弟节点加入的方法，加入此节点对象。加入兄弟节点和加入子节点的最大区别就在于这最后一步。希望读者能够注意。下面是在TreeView组件加入一个兄弟节点的具体代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//首先判断是否选定组件中节点的位置</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请选择一个节点&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span>
<span class="token punctuation">{</span>
    <span class="token comment">//创建一个节点对象，并初始化 </span>
    <span class="token class-name">TreeNode</span> tmp<span class="token punctuation">;</span>
    tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//在TreeView组件中加入兄弟节点</span>
    treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Parent<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    treeView1<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（3）.删除节点：</p><p>删除节点就是删除TreeView组件中选定的节点，删除节点可以是子节点，也可以是兄弟节点，但无论节点的性质如何，必须保证要删除的节点没有下一级节点，否则必须先删除此节点中的所有下一级节点，然后再删除此节点。删除节点比起上面的二个操作要显得略微简单，具体方法是：首先判断要删除的节点是否存在下一级节点，如果不存在，就调用TreeView类中的Remove()方法，就可以删除节点了。下面是删除TreeView组件中节点的具体代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//判断选定的节点是否存在下一级节点</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment">//删除节点</span>
    treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请先删除此节点中的子节点！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>（4）.TreeView组件的一些其他常用操作：</p><p>其他的一些常用操作比起上面的三种操作，在具体实现上要显得简单许多。这些常用操作无非是，展开所有节点，展开指定的节点、和折叠所有节点。下面就来具体介绍一下：</p><p>&lt; I &gt; .展开所有节点：</p><p>要展开TreeView组件中的所有节点，首先就要把选定的节点指针定位在TreeView组件的根节点上，然后调用选定组件的ExpandAll方法就可以了，下面是具体代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//定位根节点 </span>
treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">//展开组件中的所有节点 </span>
treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>&lt; II &gt; .展开选定节点的下一级节点：</p><p>由于只是展开下一级节点，所以就没有必要用ExpandAll ( )方法了。展开下一级节点只需要调用Expand()方法就可以了，下面是具体的实现代码：</p><p><code>treeView1.SelectedNode.Expand();</code></p><p>&lt; III &gt; .折叠所有节点：</p><p>折叠所有节点和展开所有节点是一组互操作，具体实现的思路也大致相同，折叠所有节点也是首先要把选定的节点指针定位在根节点上，然后调用选定组件的Collapse()就可以了，下面是具体的实现代码：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//定位根节点</span>
treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">//折叠组件中所有节点</span>
treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">Collapse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>至此已经把在C＃操作TreeView组件的常用方法和一般方法基本都介绍完了。</p><h2 id="三-c-编写的一个完整操作treeview组件的例子" tabindex="-1"><a class="header-anchor" href="#三-c-编写的一个完整操作treeview组件的例子" aria-hidden="true">#</a> 三． C＃编写的一个完整操作TreeView组件的例子</h2><p>下面是C＃编写一个的关于TreeView组件的例子，在这个例子中，结合以上介绍的常用方法和一般方法，基本覆盖来TreeView组件的一些最常用的操作。譬如可以灵活的程序中的TreeView组件中，进行加入子节点、兄弟节点、删除节点、折叠、展开等操作。其中前三种基本操作是通过程序中弹出菜单中的功能来实现的，后面操作是通过程序中的按钮来实现的。下面是此程序的代码节略（TreeView.cs）：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> 全面掌握TreeView组件的使用方法
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。 </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">TreeView</span> treeView1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Button</span> button1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Button</span> button2<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Button</span> button3<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">MenuItem</span> menuItem2<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">MenuItem</span> menuItem3<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">MenuItem</span> menuItem4<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">ContextMenu</span> contextMenu1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">TextBox</span> textBox1<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Label</span> label1<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// 必需的设计器变量。 </span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//初始化窗体中的组件 </span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// 清理所有正在使用的资源。 </span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> disposing<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>disposing<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>components <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    components<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span>disposing<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//初始化代码（略) </span>
        <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddChildNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//首先判断是否选定组件中的位置 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请选择一个节点&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//创建一个节点对象，并初始化 </span>
                    <span class="token class-name">TreeNode</span> tmp<span class="token punctuation">;</span>
                    tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//在TreeView组件中加入子节点 </span>
                    treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> tmp<span class="token punctuation">;</span>
                    treeView1<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;TextBox组件必须填入节点名称！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//首先判断是否选定组件中节点的位置 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请选择一个节点&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//创建一个节点对象，并初始化 </span>
                    <span class="token class-name">TreeNode</span> tmp<span class="token punctuation">;</span>
                    tmp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//在TreeView组件中加入兄弟节点 </span>
                    treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Parent<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    treeView1<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;TextBox组件必须填入节点名称！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">TreeNode</span> tnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeNode</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">treeView1_MouseDown</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MouseEventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>Button <span class="token operator">==</span> MouseButtons<span class="token punctuation">.</span>Right<span class="token punctuation">)</span>
                contextMenu1<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">Expand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">menuItem2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">AddChildNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">menuItem3_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">AddParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">menuItem4_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//判断选定的节点是否存在下一级节点 </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span>Count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token comment">//删除节点 </span>
                treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;请先删除此节点中的子节点！&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;提示信息&quot;</span><span class="token punctuation">,</span> MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span> MessageBoxIcon<span class="token punctuation">.</span>Information<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button2_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//定位根节点 </span>
            treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//展开组件中的所有节点 </span>
            treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">ExpandAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button3_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//定位根节点 </span>
            treeView1<span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> treeView1<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">//折叠组件中所有节点 </span>
            treeView1<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">Collapse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在成功编译TreeView.cs后，运行的程序界面如下：</p><p>图01：C＃编写的操作TreeView组件的程序运行界面</p><h2 id="四-总结" tabindex="-1"><a class="header-anchor" href="#四-总结" aria-hidden="true">#</a> 四． 总结</h2><p>TreeView组件是一个既令程序员头痛，又令程序员难以割舍的组件。这是因为TreeView组件使用非常灵活，显示内容有层次，并且&quot;容量&quot;相对又比较大。但同时在实际的编程比起其他组件又相对麻烦。掌握了本文介绍的这些用C＃操作TreeView组件的基本方法后，我想对于在使用TreeView组件中的一般的问题，应该都能够克服了吧</p>`,35),o=[e];function c(u,l){return s(),a("div",null,o)}const i=n(p,[["render",c],["__file","tv7.html.vue"]]);export{i as default};
