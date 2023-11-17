import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t={},o=p(`<h1 id="treeview的派生类" tabindex="-1"><a class="header-anchor" href="#treeview的派生类" aria-hidden="true">#</a> TreeView的派生类</h1><blockquote><p>你是第153位浏览该文章的人 playyuer csdn 2003-6-28</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">// playyuer@Microshaoft.com invent</span>
<span class="token comment">//一个 TreeView 的派生类: TreeViewEx 实现 NodeShowToolTip、NodeDoubleClick 事件</span>
<span class="token comment">//1.实现了 NodeShowToolTip 事件,结合键盘 Ctrl 键显示及设置 ToolTipText</span>
<span class="token comment">//2.实现了 NodeDoubleClick 事件,可在调用中只响应&quot;叶子&quot;节点</span>
<span class="token comment">//3.点击 TreeView 空白处不选中任何节点</span>
<span class="token comment">//Class1.cs</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeViewEx</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeView</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TreeViewExEventHandler</span> NodeDoubleClick<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TreeViewExEventHandler</span> NodeShowToolTip<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnNodeDoubleClick</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> xx<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>NodeDoubleClick <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">NodeDoubleClick</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeViewExEventArgs</span><span class="token punctuation">(</span>xx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnNodeShowToolTip</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> xx<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span> yy<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>NodeShowToolTip <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>xx <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>toolTip <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">NodeShowToolTip</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeViewExEventArgs</span><span class="token punctuation">(</span>xx<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnDoubleClick</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>SelectedNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">OnNodeDoubleClick</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>SelectedNode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnDoubleClick</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span> toolTip<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">TreeViewEx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        toolTip <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>InitialDelay <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>ReshowDelay <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnClick</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetNodeAt</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeView<span class="token punctuation">.</span>MousePosition<span class="token punctuation">.</span>X<span class="token punctuation">,</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeView<span class="token punctuation">.</span>MousePosition<span class="token punctuation">.</span>Y<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnClick</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseDown</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MouseEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetNodeAt</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>SelectedNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnMouseDown</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> LastTreeNode<span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMouseMove</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MouseEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Cursors<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> treeNode<span class="token punctuation">;</span>
        treeNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetNodeAt</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>X<span class="token punctuation">,</span> e<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>treeNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Control<span class="token punctuation">.</span>ModifierKeys <span class="token operator">&amp;</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Keys<span class="token punctuation">.</span>Control<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Cursors<span class="token punctuation">.</span>Hand<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>treeNode <span class="token operator">!=</span> LastTreeNode <span class="token operator">|</span> LastTreeNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    LastTreeNode <span class="token operator">=</span> treeNode<span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">OnNodeShowToolTip</span><span class="token punctuation">(</span>treeNode<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Cursors<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Cursor <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Cursors<span class="token punctuation">.</span>Default<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>toolTip<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnMouseMove</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TreeViewExEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">TreeViewExEventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeViewExEventArgs</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">TreeViewExEventArgs</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> SelectedNode<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_SelectedNode <span class="token operator">=</span> SelectedNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">TreeViewExEventArgs</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> Node<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span> NodeToolTip<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_NodeToolTip <span class="token operator">=</span> NodeToolTip<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_Node <span class="token operator">=</span> Node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">TreeViewExEventArgs</span><span class="token punctuation">(</span><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> Node<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> ToolTipText<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>m_ToolTipText <span class="token operator">=</span> ToolTipText<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_ToolTipText<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span> m_NodeToolTip<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> m_SelectedNode<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> m_Node<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> SelectedNode
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_SelectedNode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ToolTipText
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ToolTipText<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> m_ToolTipText <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> Node
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_Node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>ToolTip</span> NodeToolTip
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_NodeToolTip<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeNodeEx</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span> xx <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Parent<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>xx <span class="token operator">=</span> xx<span class="token punctuation">.</span>Parent<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> i<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//=================================================================</span>
<span class="token comment">//调用示例</span>
<span class="token keyword">private</span> <span class="token class-name">TreeViewEx</span> treeViewEx1<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    treeViewEx1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeViewEx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>treeViewEx1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    treeViewEx1<span class="token punctuation">.</span>HideSelection <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    treeViewEx1<span class="token punctuation">.</span>NodeDoubleClick <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeViewExEventHandler</span><span class="token punctuation">(</span>treeViewEx1_NodeDoubleClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
    treeViewEx1<span class="token punctuation">.</span>NodeShowToolTip <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TreeViewExEventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>treeViewEx1_NodeShowToolTip<span class="token punctuation">)</span><span class="token punctuation">;</span>
    treeViewEx1<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;Root&quot;</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
        <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;Root1&quot;</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
        <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;a1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TreeNode</span><span class="token punctuation">(</span><span class="token string">&quot;b1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">treeViewEx1_NodeShowToolTip</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">TreeViewExEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    e<span class="token punctuation">.</span>NodeToolTip<span class="token punctuation">.</span><span class="token function">SetToolTip</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>treeViewEx1<span class="token punctuation">,</span> <span class="token string">&quot;[&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Text <span class="token operator">+</span> <span class="token string">&quot;]{&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">treeViewEx1_NodeDoubleClick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">TreeViewExEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span><span class="token function">GetNodeCount</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>SelectedNode<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","tv9.html.vue"]]);export{i as default};
