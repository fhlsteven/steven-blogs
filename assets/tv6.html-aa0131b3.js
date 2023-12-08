import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="将treeview存储、写入数据库的扩展类treeviewex" tabindex="-1"><a class="header-anchor" href="#将treeview存储、写入数据库的扩展类treeviewex" aria-hidden="true">#</a> 将TreeView存储、写入数据库的扩展类TreeViewEx</h1><p>在一个项目中用到了读取、生成并保存TreeView内容到数据库的应用，经过研究，并着重参考了planet-source-code上的一篇文章<code>&lt;TreeView Interface (Drag and Drop; Add, Rename, and Delete Nodes; Save Tree to Database)&gt;</code>，将原文的VB.NET代码改造成了C#代码，与大家共同分享。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data<span class="token punctuation">.</span>OleDb</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">CallingCenterAdmin</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token doc-comment comment">/// TreeViewToDB 的摘要说明。 </span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span> </span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TreeViewToDB</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// m_alDeletedNodes is used to store node deletions in memory.  A call to </span>
        <span class="token comment">// CTreeView.SaveNodeCollection() will commit the deletions, and other changes, </span>
        <span class="token comment">// to the database.  </span>
        <span class="token keyword">public</span> <span class="token class-name">ArrayList</span> m_alDeletedNodes<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">OleDbConnection</span> m_conn<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">TreeViewToDB</span><span class="token punctuation">(</span><span class="token class-name">OleDbConnection</span> conn<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// Initialize the DeletedNodes collection. </span>
            m_alDeletedNodes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            m_conn <span class="token operator">=</span> conn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">DeleteNode</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tnStart<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will delete the designated node (tnStart) and all </span>
            <span class="token comment">// of its children.  The deletions will be stored in a collection.  This will </span>
            <span class="token comment">// keep the deletions in memory, which configuration will allow us to rollback </span>
            <span class="token comment">// deletions.  </span>

            <span class="token comment">// Get a reference to the start node parent. </span>
            <span class="token class-name">TreeNode</span> tnParent <span class="token operator">=</span> tnStart<span class="token punctuation">.</span>Parent<span class="token punctuation">;</span>

            <span class="token comment">// Delete the start node&#39;s children.  This is performed via </span>
            <span class="token comment">// recursion, which will walk through all children regardless of number or </span>
            <span class="token comment">// arrangement.  Walking through each and every child of the start node will </span>
            <span class="token comment">// allow us to synchronize node deletions with the database.  Simply calling </span>
            <span class="token comment">// the remove function will remove the node and its children, but </span>
            <span class="token comment">// will leave orphan records in the database. </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">DeleteNodeRecursive</span><span class="token punctuation">(</span>tnStart<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Record the deletion of the start node. </span>
            m_alDeletedNodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tnStart<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Remove the start node from the TreeNodeCollection. </span>
            tnStart<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>tnStart<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">DeleteNodeRecursive</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tnParent<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will walk through all the child nodes for a given </span>
            <span class="token comment">// node.  It will remove all the nodes from the TreeNodeCollection and will </span>
            <span class="token comment">// record all deletions in memory.  Deletions will be committed to the </span>
            <span class="token comment">// database when the user calls the CTreeView.SaveNodeCollection() method. </span>
            <span class="token class-name">TreeNode</span> tn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                nCount <span class="token operator">=</span> tnParent<span class="token punctuation">.</span><span class="token function">GetNodeCount</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>nCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    tn <span class="token operator">=</span> tnParent<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    <span class="token keyword">do</span>
                    <span class="token punctuation">{</span>
                        nCount <span class="token operator">=</span> tn<span class="token punctuation">.</span><span class="token function">GetNodeCount</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>nCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                        <span class="token punctuation">{</span>
                            <span class="token function">DeleteNodeRecursive</span><span class="token punctuation">(</span>tn<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        m_alDeletedNodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tn<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        tn <span class="token operator">=</span> tn<span class="token punctuation">.</span>NextNode<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span>tn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsDropAllowed</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tnStart<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> tnDrop<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will determine if a drop will cause a circular </span>
            <span class="token comment">// reference.  A circular reference occurs when a node is dropped onto one </span>
            <span class="token comment">// of its children. </span>
            <span class="token class-name">TreeNode</span> tnCurrent <span class="token operator">=</span> tnDrop<span class="token punctuation">;</span>
            <span class="token keyword">do</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>tnCurrent <span class="token operator">==</span> tnStart<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                tnCurrent <span class="token operator">=</span> tnCurrent<span class="token punctuation">.</span>Parent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>tnCurrent <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PopulateTree</span><span class="token punctuation">(</span><span class="token class-name">TreeView</span> oTv<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will populate a TreeView control from the </span>
            <span class="token comment">// database. </span>

            <span class="token comment">// Clear the DeletedNodes collection; thereby rolling back any deletes </span>
            <span class="token comment">// that were made since the last call of the CTreeView.SaveTreeNodeCollection() </span>
            <span class="token comment">// method. </span>
            m_alDeletedNodes <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            m_alDeletedNodes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Retrieve a list of node items from the database. </span>
            <span class="token class-name"><span class="token keyword">string</span></span> strSql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM [TreeViewItems] ORDER By iSort;&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">OleDbDataReader</span> rdr <span class="token operator">=</span> <span class="token function">GetDataReader</span><span class="token punctuation">(</span>strSql<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// collNodeIDs is used to store a relationship between keys </span>
            <span class="token comment">// (in this case uids) and Nodes.  The collection is used to </span>
            <span class="token comment">// maintain parent-child relationships when populating the </span>
            <span class="token comment">// TreeView control. </span>
            <span class="token class-name">ArrayList</span> collNodeKeys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TreeNode</span> tnNew<span class="token punctuation">;</span>
            <span class="token class-name">TreeNode</span> tnParent<span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>rdr<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>rdr<span class="token punctuation">.</span><span class="token function">GetBoolean</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//&quot;bRoot&quot; </span>
                <span class="token punctuation">{</span>
                    tnNew <span class="token operator">=</span> oTv<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>rdr<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//&quot;sName&quot; </span>
                    tnNew<span class="token punctuation">.</span>Tag <span class="token operator">=</span> rdr<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//&quot;uid&quot; </span>

                    <span class="token comment">// Record the relationship of uid to node.  This will allow </span>
                    <span class="token comment">// us to retrieve a given node by providing the uid as a </span>
                    <span class="token comment">// key. </span>
                    collNodeKeys<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tnNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">// Get the parent node based on the relationship stored in the </span>
                    <span class="token comment">// database.  This relationship is recorded or updated when a </span>
                    <span class="token comment">// call is made to CTreeView.SaveTreeNodeCollection(). </span>
                    tnParent <span class="token operator">=</span> <span class="token punctuation">(</span>TreeNode<span class="token punctuation">)</span>collNodeKeys<span class="token punctuation">[</span>rdr<span class="token punctuation">.</span><span class="token function">GetInt32</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//&quot;iParentID&quot; </span>
                                                                       <span class="token comment">// Add the child to the parent; </span>
                    tnNew <span class="token operator">=</span> tnParent<span class="token punctuation">.</span>Nodes<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>rdr<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//&quot;sName&quot; </span>
                    tnNew<span class="token punctuation">.</span>Tag <span class="token operator">=</span> rdr<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//&quot;uid&quot; </span>
                                                 <span class="token comment">// Record the relationship of uid to node.  This will allow </span>
                                                 <span class="token comment">// us to retrieve a given node by providing the uid as a </span>
                                                 <span class="token comment">// key. </span>
                    collNodeKeys<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>tnNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            rdr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SaveNodeCollection</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tnRootNode<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE;  This method will save the TreeNodeCollection to the </span>
            <span class="token comment">// database.  It uses recursion to walk through the tree.  It must </span>
            <span class="token comment">// be called for each root node, if there is more than one root </span>
            <span class="token comment">// node. </span>
            <span class="token class-name"><span class="token keyword">int</span></span> iCntr <span class="token operator">=</span> m_alDeletedNodes<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iRecordID<span class="token punctuation">;</span>
            <span class="token class-name">TreeNode</span> tn<span class="token punctuation">;</span>

            <span class="token comment">// Synch all deleted nodes with the database. </span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> iCntr<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                tn <span class="token operator">=</span> <span class="token punctuation">(</span>TreeNode<span class="token punctuation">)</span>m_alDeletedNodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    iRecordID <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">DeleteRecord</span><span class="token punctuation">(</span>iRecordID<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>tnRootNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// Clear the deleted nodes collection because the references </span>
                <span class="token comment">// are no longer required. </span>
                m_alDeletedNodes <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                m_alDeletedNodes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Save all records to the database, starting with the root node.  We </span>
                <span class="token comment">// maintain the sort order so that the nodes can be restored in the </span>
                <span class="token comment">// order that they were read.  This will prevent adding a node before </span>
                <span class="token comment">// adding its parent. </span>
                <span class="token function">SaveNodeToDb</span><span class="token punctuation">(</span>tnRootNode<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">SaveNodeCollectionRecursive</span><span class="token punctuation">(</span>tnRootNode<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SaveNodeCollectionRecursive</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tnParent<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> iSort<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will save all child nodes in a given order </span>
            <span class="token comment">// starting with the root node and working out towards the child nodes. </span>
            <span class="token comment">// This function uses recursion, and will walk through any tree structure </span>
            <span class="token comment">// regardless of node count or arrangement. </span>
            <span class="token class-name">TreeNode</span> tn<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nCount <span class="token operator">=</span> tnParent<span class="token punctuation">.</span><span class="token function">GetNodeCount</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>nCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                tn <span class="token operator">=</span> tnParent<span class="token punctuation">.</span>Nodes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                tn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">do</span>
            <span class="token punctuation">{</span>
                iSort<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token function">SaveNodeToDb</span><span class="token punctuation">(</span>tn<span class="token punctuation">,</span> iSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
                nCount <span class="token operator">=</span> tn<span class="token punctuation">.</span><span class="token function">GetNodeCount</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>nCount <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token function">SaveNodeCollectionRecursive</span><span class="token punctuation">(</span>tn<span class="token punctuation">,</span> iSort<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                tn <span class="token operator">=</span> tn<span class="token punctuation">.</span>NextNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>tn <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SaveNodeToDb</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> tn<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> iSort<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: The following method will save the designated node to the </span>
            <span class="token comment">// database. </span>

            <span class="token class-name"><span class="token keyword">bool</span></span> bRoot<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iNewRecordID<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iParentID<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sName<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> sFullPath<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strSql<span class="token punctuation">;</span>
            <span class="token class-name">OleDbCommand</span> cmd <span class="token operator">=</span> m_conn<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Parent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                iParentID <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Parent<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                bRoot <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                iParentID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
                bRoot <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Need to escape single and double quotes; otherwise, they will cause </span>
            <span class="token comment">// exceptions when posting to the database. </span>
            sName <span class="token operator">=</span> tn<span class="token punctuation">.</span>Text<span class="token punctuation">;</span>
            sFullPath <span class="token operator">=</span> tn<span class="token punctuation">.</span>FullPath<span class="token punctuation">;</span>

            <span class="token comment">// I use the tag value to determine if a record for the node exists </span>
            <span class="token comment">// in the database and to hold the value of the primary key if the </span>
            <span class="token comment">// the record exists in the database.  If the tag value is empty, then </span>
            <span class="token comment">// I know the record is newly created and not yet saved in the database. </span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// Insert a record into the database for the node. </span>
                strSql <span class="token operator">=</span> <span class="token string">&quot;INSERT INTO [TreeViewItems] (bRoot, dLastModified, iImageIndex,&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;iParentID, iSelectedImageIndex, iSort, sName, sFullName) VALUES &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> bRoot <span class="token operator">+</span> <span class="token string">&quot;,&#39;&quot;</span> <span class="token operator">+</span> DateTime<span class="token punctuation">.</span>Now <span class="token operator">+</span> <span class="token string">&quot;&#39;,&quot;</span> <span class="token operator">+</span> tn<span class="token punctuation">.</span>ImageIndex <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span> <span class="token operator">+</span>
                iParentID <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span> tn<span class="token punctuation">.</span>SelectedImageIndex <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span> <span class="token operator">+</span> iSort <span class="token operator">+</span> <span class="token string">&quot;,&#39;&quot;</span> <span class="token operator">+</span>
                sName <span class="token operator">+</span> <span class="token string">&quot;&#39;, &#39;&quot;</span> <span class="token operator">+</span> sFullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;)&quot;</span><span class="token punctuation">;</span>
                <span class="token comment">// Execute the INSERT statement against the database. </span>
                <span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span>strSql<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Get the record ID for the newly created record.  This assumes that </span>
                <span class="token comment">// only one person is using the database. </span>
                iNewRecordID <span class="token operator">=</span> <span class="token function">GetScalar</span><span class="token punctuation">(</span><span class="token string">&quot;SELECT Max(uid) FROM [TreeViewItems]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// Place the record ID in the node&#39;s tag. </span>
                tn<span class="token punctuation">.</span>Tag <span class="token operator">=</span> iNewRecordID<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// Update the corresponding record in the database for the node. </span>
                strSql <span class="token operator">=</span> <span class="token string">&quot;UPDATE [TreeViewItems] &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;SET sName=&#39;&quot;</span> <span class="token operator">+</span> sName <span class="token operator">+</span> <span class="token string">&quot;&#39;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;bRoot=&quot;</span> <span class="token operator">+</span> bRoot <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;iImageIndex=&quot;</span> <span class="token operator">+</span> tn<span class="token punctuation">.</span>ImageIndex <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;iParentID=&quot;</span> <span class="token operator">+</span> iParentID <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;iSelectedImageIndex=&quot;</span> <span class="token operator">+</span> tn<span class="token punctuation">.</span>SelectedImageIndex <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;iSort=&quot;</span> <span class="token operator">+</span> iSort <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;sFullName=&#39;&quot;</span> <span class="token operator">+</span> sFullPath <span class="token operator">+</span> <span class="token string">&quot;&#39; &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;WHERE uid=&quot;</span> <span class="token operator">+</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>tn<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// Execute the INSERT statement against the database. </span>
                <span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span>strSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">OleDbDataReader</span> <span class="token function">GetDataReader</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strSql<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">OleDbCommand</span> cmd <span class="token operator">=</span> m_conn<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> strSql<span class="token punctuation">;</span>
            <span class="token class-name">OleDbDataReader</span> rdr <span class="token operator">=</span> cmd<span class="token punctuation">.</span><span class="token function">ExecuteReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">return</span> rdr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DeleteRecord</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> nID<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: The following function will delete the designated record from </span>
            <span class="token comment">// the database. </span>

            <span class="token comment">// NOTE: The brackets &#39;[]&#39; are not required around the table name.  They </span>
            <span class="token comment">// are only required if the table name contains spaces.  I have included </span>
            <span class="token comment">// them as a matter of style. </span>
            <span class="token class-name"><span class="token keyword">string</span></span> strSql <span class="token operator">=</span> <span class="token string">&quot;DELETE FROM [TreeViewItems] WHERE uid=&quot;</span> <span class="token operator">+</span> nID <span class="token operator">+</span> <span class="token string">&quot;;&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">OleDbCommand</span> cmd <span class="token operator">=</span> m_conn<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> strSql<span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span><span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token class-name">String</span> strSql<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// PURPOSE: This function will execute a non-query SQL statement such </span>
            <span class="token comment">// as an INSERT or UPDATE or DELETE statement. </span>
            <span class="token class-name">OleDbCommand</span> cmd <span class="token operator">=</span> m_conn<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> strSql<span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span><span class="token function">ExecuteNonQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetScalar</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> strSql<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">OleDbCommand</span> cmd <span class="token operator">=</span> m_conn<span class="token punctuation">.</span><span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cmd<span class="token punctuation">.</span>CommandText <span class="token operator">=</span> strSql<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iNewRecordID<span class="token punctuation">;</span>
            iNewRecordID <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span><span class="token function">ExecuteScalar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> iNewRecordID<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,3),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","tv6.html.vue"]]);export{i as default};
