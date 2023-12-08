import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-常用代码" tabindex="-1"><a class="header-anchor" href="#c-常用代码" aria-hidden="true">#</a> c#常用代码</h1><h2 id="随机密码" tabindex="-1"><a class="header-anchor" href="#随机密码" aria-hidden="true">#</a> 随机密码</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Security<span class="token punctuation">.</span>Cryptography</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">sealed</span> <span class="token keyword">class</span> <span class="token class-name">RandomStr</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/********
        * Const and Function
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">int</span></span> defaultLength <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> rndBytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">RNGCryptoServiceProvider</span> rng <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RNGCryptoServiceProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            rng<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>rndBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> BitConverter<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>rndBytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/********
        * getRndCode of all char .
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> strLen<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Random</span> RandomObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Random</span><span class="token punctuation">(</span><span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> buildRndCodeReturn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                buildRndCodeReturn <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>RandomObj<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> buildRndCodeReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOfAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span>defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOfAll</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeAll</span><span class="token punctuation">(</span>LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/********
        * getRndCode of only .
        * ********/</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sCharLow <span class="token operator">=</span> <span class="token string">&quot;abcdefghijklmnopqrstuvwxyz&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sCharUpp <span class="token operator">=</span> <span class="token string">&quot;ABCDEFGHIJKLMNOPQRSTUVWXYZ&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> sNumber <span class="token operator">=</span> <span class="token string">&quot;0123456789&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> StrOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> strLen<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">System<span class="token punctuation">.</span>Random</span> RandomObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Random</span><span class="token punctuation">(</span><span class="token function">GetNewSeed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> buildRndCodeReturn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> strLen<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                buildRndCodeReturn <span class="token operator">+=</span> StrOf<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>RandomObj<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> StrOf<span class="token punctuation">.</span>Length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> buildRndCodeReturn<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>sCharLow <span class="token operator">+</span> sNumber<span class="token punctuation">,</span> defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>sCharLow <span class="token operator">+</span> sNumber<span class="token punctuation">,</span> LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> bUseUpper<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseNumber<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strTmp <span class="token operator">=</span> sCharLow<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseUpper<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sCharUpp<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseNumber<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sNumber<span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>strTmp<span class="token punctuation">,</span> defaultLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetRndStrOnlyFor</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> LenOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseUpper<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bUseNumber<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> strTmp <span class="token operator">=</span> sCharLow<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseUpper<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sCharUpp<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>bUseNumber<span class="token punctuation">)</span> strTmp <span class="token operator">+=</span> sNumber<span class="token punctuation">;</span>

            <span class="token keyword">return</span> <span class="token function">BuildRndCodeOnly</span><span class="token punctuation">(</span>strTmp<span class="token punctuation">,</span> LenOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:52:21 得分:0</p></blockquote><h2 id="文件夹选择对话框" tabindex="-1"><a class="header-anchor" href="#文件夹选择对话框" aria-hidden="true">#</a> 文件夹选择对话框</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this?</span>
    <span class="token comment">/*
    FolderBrowser fbObj = new FolderBrowser();
    fbObj.Title = &quot;Select a Folder&quot;;
    fbObj.Flags = 
        BrowseFlags.BIF_NEWDIALOGSTYLE|
        BrowseFlags.BIF_EDITBOX|
        BrowseFlags.BIF_STATUSTEXT;
    DialogResult result = fbObj.ShowFolderBrowser();
    if (result == DialogResult.OK ) {
        MessageBox.Show(fbObj.DirectoryPath);
    }
    */</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token punctuation">[</span><span class="token function">StructLayout</span><span class="token punctuation">(</span>LayoutKind<span class="token punctuation">.</span>Sequential<span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ComVisible</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BROWSEINFO</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> hwndOwner<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> pidlRoot<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> pszDisplayName<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> lpszTitle<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> ulFlags<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> lpfn<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">IntPtr</span> lParam<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> iImage<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Flags</span><span class="token punctuation">,</span> <span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">BrowseFlags</span>
    <span class="token punctuation">{</span>
        BIF_DEFAULT <span class="token operator">=</span> <span class="token number">0x0000</span><span class="token punctuation">,</span>
        BIF_BROWSEFORCOMPUTER <span class="token operator">=</span> <span class="token number">0x1000</span><span class="token punctuation">,</span>
        BIF_BROWSEFORPRINTER <span class="token operator">=</span> <span class="token number">0x2000</span><span class="token punctuation">,</span>
        BIF_BROWSEINCLUDEFILES <span class="token operator">=</span> <span class="token number">0x4000</span><span class="token punctuation">,</span>
        BIF_BROWSEINCLUDEURLS <span class="token operator">=</span> <span class="token number">0x0080</span><span class="token punctuation">,</span>
        BIF_DONTGOBELOWDOMAIN <span class="token operator">=</span> <span class="token number">0x0002</span><span class="token punctuation">,</span>
        BIF_EDITBOX <span class="token operator">=</span> <span class="token number">0x0010</span><span class="token punctuation">,</span>
        BIF_NEWDIALOGSTYLE <span class="token operator">=</span> <span class="token number">0x0040</span><span class="token punctuation">,</span>
        BIF_NONEWFOLDERBUTTON <span class="token operator">=</span> <span class="token number">0x0200</span><span class="token punctuation">,</span>
        BIF_RETURNFSANCESTORS <span class="token operator">=</span> <span class="token number">0x0008</span><span class="token punctuation">,</span>
        BIF_RETURNONLYFSDIRS <span class="token operator">=</span> <span class="token number">0x0001</span><span class="token punctuation">,</span>
        BIF_SHAREABLE <span class="token operator">=</span> <span class="token number">0x8000</span><span class="token punctuation">,</span>
        BIF_STATUSTEXT <span class="token operator">=</span> <span class="token number">0x0004</span><span class="token punctuation">,</span>
        BIF_UAHINT <span class="token operator">=</span> <span class="token number">0x0100</span><span class="token punctuation">,</span>
        BIF_VALIDATE <span class="token operator">=</span> <span class="token number">0x0020</span><span class="token punctuation">,</span>
        BIF_NOTRANSLATETARGETS <span class="token operator">=</span> <span class="token number">0x0400</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">API</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;shell32.dll&quot;</span><span class="token punctuation">,</span> PreserveSig <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">SHBrowseForFolder</span><span class="token punctuation">(</span><span class="token class-name">BROWSEINFO</span> bi<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;shell32.dll&quot;</span><span class="token punctuation">,</span> PreserveSig <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SHGetPathFromIDList</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> pidl<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> pszPath<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;shell32.dll&quot;</span><span class="token punctuation">,</span> PreserveSig <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">SHGetSpecialFolderLocation</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hwnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> csidl<span class="token punctuation">,</span> <span class="token keyword">ref</span> <span class="token class-name">IntPtr</span> ppidl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FolderBrowser</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_strDirectoryPath<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_strTitle<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> m_strDisplayName<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">BrowseFlags</span> m_Flags<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token function">FolderBrowser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            m_Flags <span class="token operator">=</span> BrowseFlags<span class="token punctuation">.</span>BIF_DEFAULT<span class="token punctuation">;</span>
            m_strTitle <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> DirectoryPath
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_strDirectoryPath<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> DisplayName
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_strDisplayName<span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title
        <span class="token punctuation">{</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_strTitle <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">BrowseFlags</span> Flags
        <span class="token punctuation">{</span>
            <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_Flags <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">DialogResult</span> <span class="token function">ShowFolderBrowser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">BROWSEINFO</span> bi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BROWSEINFO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            bi<span class="token punctuation">.</span>pszDisplayName <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            bi<span class="token punctuation">.</span>lpfn <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            bi<span class="token punctuation">.</span>lParam <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            bi<span class="token punctuation">.</span>lpszTitle <span class="token operator">=</span> <span class="token string">&quot;Select Folder&quot;</span><span class="token punctuation">;</span>
            <span class="token class-name">IntPtr</span> idListPtr <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            <span class="token class-name">IntPtr</span> pszPath <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_strTitle<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    bi<span class="token punctuation">.</span>lpszTitle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>m_strTitle<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                bi<span class="token punctuation">.</span>ulFlags <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span>m_Flags<span class="token punctuation">;</span>
                bi<span class="token punctuation">.</span>pszDisplayName <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">AllocHGlobal</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                idListPtr <span class="token operator">=</span> API<span class="token punctuation">.</span><span class="token function">SHBrowseForFolder</span><span class="token punctuation">(</span>bi<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>idListPtr <span class="token operator">==</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> DialogResult<span class="token punctuation">.</span>Cancel<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                pszPath <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">AllocHGlobal</span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">bool</span></span> bRet <span class="token operator">=</span> API<span class="token punctuation">.</span><span class="token function">SHGetPathFromIDList</span><span class="token punctuation">(</span>idListPtr<span class="token punctuation">,</span> pszPath<span class="token punctuation">)</span><span class="token punctuation">;</span>

                m_strDirectoryPath <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">PtrToStringAuto</span><span class="token punctuation">(</span>pszPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>m_strDisplayName <span class="token operator">=</span> Marshal<span class="token punctuation">.</span><span class="token function">PtrToStringAuto</span><span class="token punctuation">(</span>bi<span class="token punctuation">.</span>pszDisplayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                Trace<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> DialogResult<span class="token punctuation">.</span>Abort<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">finally</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>idListPtr <span class="token operator">!=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>idListPtr<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>pszPath <span class="token operator">!=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>pszPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>bi <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    Marshal<span class="token punctuation">.</span><span class="token function">FreeHGlobal</span><span class="token punctuation">(</span>bi<span class="token punctuation">.</span>pszDisplayName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> DialogResult<span class="token punctuation">.</span>OK<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="获取资源文件内容" tabindex="-1"><a class="header-anchor" href="#获取资源文件内容" aria-hidden="true">#</a> 获取资源文件内容</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Resources</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span> <span class="token punctuation">{</span>
    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">getResPrj</span> <span class="token punctuation">{</span>
        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> <span class="token function">GetResOf</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> resFullName<span class="token punctuation">,</span><span class="token class-name"><span class="token keyword">string</span></span> resItemName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Assembly</span> myAssem <span class="token operator">=</span> Assembly<span class="token punctuation">.</span><span class="token function">GetEntryAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ResourceManager</span> rm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ResourceManager</span><span class="token punctuation">(</span>resFullName<span class="token punctuation">,</span>myAssem<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> rm<span class="token punctuation">.</span><span class="token function">GetObject</span><span class="token punctuation">(</span>resItemName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:53:01 得分:0</p></blockquote><h2 id="获取硬盘序列号" tabindex="-1"><a class="header-anchor" href="#获取硬盘序列号" aria-hidden="true">#</a> 获取硬盘序列号</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this?</span>
    <span class="token comment">/*
    string sVol = GetVolOf(&quot;C&quot;);
    */</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">getvol</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;kernel32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetVolumeInformation</span><span class="token punctuation">(</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpRootPathName<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpVolumeNameBuffer<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nVolumeNameSize<span class="token punctuation">,</span>
            <span class="token keyword">ref</span> <span class="token class-name"><span class="token keyword">int</span></span> lpVolumeSerialNumber<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpMaximumComponentLength<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> lpFileSystemFlags<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">string</span></span> lpFileSystemNameBuffer<span class="token punctuation">,</span>
            <span class="token class-name"><span class="token keyword">int</span></span> nFileSystemNameSize
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetVolOf</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> drvID<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_FILENAME_LEN <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> retVal <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> str1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> str2 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token function">GetVolumeInformation</span><span class="token punctuation">(</span>
                drvID <span class="token operator">+</span> <span class="token string">@&quot;:\\&quot;,
                str1,
                MAX_FILENAME_LEN,
                ref retVal,
                a,
                b,
                str2,
                MAX_FILENAME_LEN
            );

            return retVal.ToString(&quot;</span>x&quot;<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:53:36 得分:0</p></blockquote><h2 id="禁止程序重复运行限制" tabindex="-1"><a class="header-anchor" href="#禁止程序重复运行限制" aria-hidden="true">#</a> 禁止程序重复运行限制</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">one_instance_Check</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token function">one_instance_Check</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this?</span>
        <span class="token comment">/*
        using ArLi.CommonPrj;

        if (one_instance_Check.goCheck(&quot;Process Exist !&quot;)) {
            Application.Run (new Form1());
        }
        */</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> cmdShow<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;User32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WS_SHOWNORMAL <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">GoCheck</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> waringMessage_ifExist<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Process</span> instance <span class="token operator">=</span> <span class="token function">RunningInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>waringMessage_ifExist <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span>
                        <span class="token keyword">null</span><span class="token punctuation">,</span>
                        waringMessage_ifExist<span class="token punctuation">,</span>
                        System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Application<span class="token punctuation">.</span>ProductName<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                        System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span>
                        System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>MessageBoxIcon<span class="token punctuation">.</span>Exclamation
                    <span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token punctuation">}</span>
                <span class="token function">HandleRunningInstance</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">Process</span> <span class="token function">RunningInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Process</span> current <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Process<span class="token punctuation">[</span><span class="token punctuation">]</span></span> processes <span class="token operator">=</span> Process<span class="token punctuation">.</span><span class="token function">GetProcessesByName</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>ProcessName<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//Loop through the running processes in with the same name</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">Process</span> process <span class="token keyword">in</span> processes<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//Ignore the current process</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>Id <span class="token operator">!=</span> current<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token comment">//Make sure that the process is running from the exe file.</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\\\\&quot;</span><span class="token punctuation">)</span> <span class="token operator">==</span>
                    current<span class="token punctuation">.</span>MainModule<span class="token punctuation">.</span>FileName<span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token comment">//Return the other process instance.</span>
                        <span class="token keyword">return</span> process<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">//No other instance was found, return null.</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">HandleRunningInstance</span><span class="token punctuation">(</span><span class="token class-name">Process</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Make sure the window is not minimized or maximized</span>
            <span class="token function">ShowWindowAsync</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>MainWindowHandle<span class="token punctuation">,</span> WS_SHOWNORMAL<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//Set the real intance to foreground window</span>
            <span class="token function">SetForegroundWindow</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>MainWindowHandle<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:53:47 得分:0</p></blockquote><h2 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作" aria-hidden="true">#</a> 文件操作</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">FileOp</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ReadFileOf</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> fileFullName<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">string</span></span> fileBody <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">FileStream</span> ObjFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>fileFullName<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">,</span> FileShare<span class="token punctuation">.</span>ReadWrite<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">StreamReader</span> sw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>ObjFile<span class="token punctuation">,</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">;</span>
                fileBody <span class="token operator">=</span> sw<span class="token punctuation">.</span><span class="token function">ReadToEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                sw<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                ObjFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                fileBody <span class="token operator">=</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> fileBody<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">SaveFileOf</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> fileFullName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> fileBody<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">FileStream</span> ObjFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>fileFullName<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Create<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Write<span class="token punctuation">,</span> FileShare<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">StreamWriter</span> sw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>ObjFile<span class="token punctuation">,</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sw<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>fileBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
                sw<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                ObjFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">return</span> e<span class="token punctuation">.</span>Message<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:54:44 得分:0</p></blockquote><h2 id="播放声音" tabindex="-1"><a class="header-anchor" href="#播放声音" aria-hidden="true">#</a> 播放声音</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">sndPlay</span>
    <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;winmm.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;PlaySound&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">PlaySound</span><span class="token punctuation">(</span><span class="token keyword">ref</span> <span class="token class-name">Byte</span> snd<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> hmod<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">uint</span></span> fdwSound<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this ?</span>
        <span class="token comment">/* 
        //get wav byte[] from ResourceFile to sound
        ArLi.CommonPrj.sndPlay.sound=(System.Byte[])ArLi.CommonPrj.getResPrj.getResOf(&quot;namespace.ResourceFileName&quot;,&quot;ResourceItemName&quot;);
        //play of:
        ArLi.CommonPrj.sndPlay.PlaySound(ref ArLi.CommonPrj.sndPlay.sound[0],IntPtr.Zero,(uint)ArLi.CommonPrj.sndPlay.PlayingFlags.SND_MEMORY | (uint)ArLi.CommonPrj.sndPlay.PlayingFlags.SND_ASYNC);
        //stop of;
        ArLi.CommonPrj.sndPlay.sound = new System.Byte[]{0};
        ArLi.CommonPrj.sndPlay.PlaySound(ref ArLi.CommonPrj.sndPlay.sound[0],IntPtr.Zero,(uint)ArLi.CommonPrj.sndPlay.PlayingFlags.SND_MEMORY | (uint)ArLi.CommonPrj.sndPlay.PlayingFlags.SND_PURGE | (uint)ArLi.CommonPrj.sndPlay.PlayingFlags.SND_NODEFAULT);
        */</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token punctuation">[</span><span class="token function">DllImport</span><span class="token punctuation">(</span><span class="token string">&quot;winmm.dll&quot;</span><span class="token punctuation">,</span> EntryPoint <span class="token operator">=</span> <span class="token string">&quot;mciSendString&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">mciSendString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> lpstrCommand<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpstrReturnstring<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> uReturnLength<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> hwndCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this ?</span>
        <span class="token comment">/*
        int i = sndPlay.mciSendString(@&quot;play D:\\Media\\Midi\\bg1.mid&quot;,null,0,0);
        int i = sndPlay.mciSendString(@&quot;close D:\\Media\\Midi\\bg1.mid&quot;,null,0,0);
        */</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token class-name">System<span class="token punctuation">.</span>Byte<span class="token punctuation">[</span><span class="token punctuation">]</span></span> sound <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">internal</span> <span class="token keyword">enum</span> <span class="token class-name">PlayingFlags</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">uint</span></span>
        <span class="token punctuation">{</span>
            SND_SYNC <span class="token operator">=</span> <span class="token number">0x00</span><span class="token punctuation">,</span>
            SND_ASYNC <span class="token operator">=</span> <span class="token number">0x01</span><span class="token punctuation">,</span>
            SND_NODEFAULT <span class="token operator">=</span> <span class="token number">0x02</span><span class="token punctuation">,</span>
            SND_MEMORY <span class="token operator">=</span> <span class="token number">0x04</span><span class="token punctuation">,</span>
            SND_ALIAS <span class="token operator">=</span> <span class="token number">0x010000</span><span class="token punctuation">,</span>
            SND_FILENAME <span class="token operator">=</span> <span class="token number">0x020000</span><span class="token punctuation">,</span>
            SND_RESOURCE <span class="token operator">=</span> <span class="token number">0x040004</span><span class="token punctuation">,</span>
            SND_ALIAS_ID <span class="token operator">=</span> <span class="token number">0x0110000</span><span class="token punctuation">,</span>
            SND_ALIAS_START <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
            SND_LOOP <span class="token operator">=</span> <span class="token number">0x08</span><span class="token punctuation">,</span>
            SND_NOSTOP <span class="token operator">=</span> <span class="token number">0x010</span><span class="token punctuation">,</span>
            SND_VALID <span class="token operator">=</span> <span class="token number">0x01F</span><span class="token punctuation">,</span>
            SND_NOWAIT <span class="token operator">=</span> <span class="token number">0x02000</span><span class="token punctuation">,</span>
            SND_PURGE <span class="token operator">=</span> <span class="token number">0x40</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>补充：SND_PURGE 参数很重要，很多人漏掉了，可以用来中止一些用sndplay 循环播放的声音</p><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:55:02 得分:0</p></blockquote><h2 id="加系统菜单" tabindex="-1"><a class="header-anchor" href="#加系统菜单" aria-hidden="true">#</a> 加系统菜单</h2><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ArLi<span class="token punctuation">.</span>CommonPrj</span>
<span class="token punctuation">{</span>
    <span class="token preprocessor property">#<span class="token directive keyword">region</span> how use this?</span>
    <span class="token comment">/*
    * append this to Form Code body
    *
    using ArLi.CommonPrj;

    internal const Int32 aboutID = 1000;
    protected override void WndProc(ref Message m) {
    if(m.Msg == CommonPrj.sysMenu.WM_SYSCOMMAND)
    switch(m.WParam.ToInt32()) {
    case aboutID :
    fm_About Obj = new fm_About();
    Obj.ShowDialog(this);
    return;
    default:
    break;
    }
    base.WndProc(ref m);
    }
    *
    * appendmenu on form_load
    *
    //add menuLine 
    sysMenu.AddMenu(this.Handle,0,null);
    //add menuItem
    sysMenu.AddMenu(this.Handle,IDM_ABOUT,&quot;About ...&quot;);
    */</span>
    <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

    <span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">sysMenu</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">internal</span> <span class="token function">sysMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetSystemMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> bRevert<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">AppendMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hMenu<span class="token punctuation">,</span> <span class="token class-name">Int32</span> wFlags<span class="token punctuation">,</span> <span class="token class-name">Int32</span> wIDNewItem<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lpNewItem<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">internal</span> <span class="token keyword">const</span> <span class="token class-name">Int32</span> WM_SYSCOMMAND <span class="token operator">=</span> <span class="token number">0x112</span><span class="token punctuation">;</span>
        <span class="token keyword">internal</span> <span class="token keyword">const</span> <span class="token class-name">Int32</span> MF_SEPARATOR <span class="token operator">=</span> <span class="token number">0x800</span><span class="token punctuation">;</span>
        <span class="token keyword">internal</span> <span class="token keyword">const</span> <span class="token class-name">Int32</span> MF_STRING <span class="token operator">=</span> <span class="token number">0x0</span><span class="token punctuation">;</span>

        <span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AddMenu</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> handleOf<span class="token punctuation">,</span> <span class="token class-name">Int32</span> menuID<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> menuStrOf<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">IntPtr</span> sysMenuHandle <span class="token operator">=</span> <span class="token function">GetSystemMenu</span><span class="token punctuation">(</span>handleOf<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>menuStrOf <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">AppendMenu</span><span class="token punctuation">(</span>sysMenuHandle<span class="token punctuation">,</span> MF_SEPARATOR<span class="token punctuation">,</span> menuID<span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token function">AppendMenu</span><span class="token punctuation">(</span>sysMenuHandle<span class="token punctuation">,</span> MF_STRING<span class="token punctuation">,</span> menuID<span class="token punctuation">,</span> menuStrOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:56:03 得分:0</p></blockquote><p><strong>以下是程序</strong>：</p><p>此为资源文件生成器，支持二进制</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Resources</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyVersion</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;1.2.*&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyTitle</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Resource Build&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyDescription</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Resource with Binary&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyConfiguration</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCompany</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;ArLi&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyProduct</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Resource Build&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCopyright</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;ArLi build on C#&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyTrademark</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCulture</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>

<span class="token keyword">class</span> <span class="token class-name">resAdd</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">AssemblyCopyrightAttribute</span> objCopyright <span class="token operator">=</span> <span class="token punctuation">(</span>AssemblyCopyrightAttribute<span class="token punctuation">)</span>AssemblyCopyrightAttribute<span class="token punctuation">.</span><span class="token function">GetCustomAttribute</span><span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AssemblyCopyrightAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myCopyright <span class="token operator">=</span> objCopyright<span class="token punctuation">.</span>Copyright<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myExeName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>Application<span class="token punctuation">.</span>ExecutablePath<span class="token punctuation">)</span><span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> mySwitch <span class="token operator">=</span> <span class="token string">&quot;[Switch]:\\n&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/fn,fileFullName\\t\\tResource FileName(no Extension)\\n&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/img,itemName,fileFullName\\tImage Type Add of Filename \\n\\t\\t\\t\\t(support gif/png/jpg/bmp/ico)\\n&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/ico,itemName,fileFullName\\tIcon Type Add of Filename \\n&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/bin,itemName,fileFullName\\tBinary Type Add of FileName&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myExemple <span class="token operator">=</span> <span class="token string">&quot;[Exemple]: Create c:\\\\tst.resources\\n&quot;</span> <span class="token operator">+</span>
        myExeName <span class="token operator">+</span>
        <span class="token string">&quot;/fn,c:\\\\tst &quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/bin,wav1,wav1.wav &quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/bin,wav2,c:\\\\wav2.wav &quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;/img,img1,bmp1.bmp&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> myExeName <span class="token operator">+</span> <span class="token string">&quot;/fn,c:\\\\tst /bin,wav1,\\&quot;c:\\\\winnt\\\\media\\\\The Microsoft Sound.wav\\&quot;&quot;</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/?&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> filenameOf <span class="token operator">=</span> args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>filenameOf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/fn&quot;</span> <span class="token operator">&amp;&amp;</span> filenameOf<span class="token punctuation">.</span>Length <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>filenameOf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token string">&quot;u must input filename of /fn,fileFullName !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">{</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> theResourcesFileName <span class="token operator">=</span> filenameOf<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;.resources&quot;</span><span class="token punctuation">;</span>
                        <span class="token class-name">ResourceWriter</span> rw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ResourceWriter</span><span class="token punctuation">(</span>theResourcesFileName<span class="token punctuation">)</span><span class="token punctuation">;</span>

                        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> args<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                        <span class="token punctuation">{</span>
                            <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> addBody <span class="token operator">=</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span>addBody<span class="token punctuation">.</span>Length <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span>
                            <span class="token punctuation">{</span>
                                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Invalid switch on: &quot;</span> <span class="token operator">+</span> args<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                            <span class="token keyword">else</span>
                            <span class="token punctuation">{</span>
                                <span class="token class-name">FileInfo</span> ObjFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>addBody<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ObjFile<span class="token punctuation">.</span>Exists<span class="token punctuation">)</span>
                                <span class="token punctuation">{</span>
                                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;File &quot;</span> <span class="token operator">+</span> ObjFile<span class="token punctuation">.</span>FullName <span class="token operator">+</span> <span class="token string">&quot; no Exists!!! skip this.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                                <span class="token keyword">else</span>
                                <span class="token punctuation">{</span>
                                    <span class="token keyword">switch</span> <span class="token punctuation">(</span>addBody<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">ToUpper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">{</span>
                                        <span class="token keyword">case</span> <span class="token string">&quot;/IMG&quot;</span><span class="token punctuation">:</span>
                                            <span class="token function">ImageAdd</span><span class="token punctuation">(</span>rw<span class="token punctuation">,</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ObjFile<span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;append Type:Image of &quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot; (&quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                                        <span class="token keyword">case</span> <span class="token string">&quot;/ICO&quot;</span><span class="token punctuation">:</span>
                                            <span class="token function">IconAdd</span><span class="token punctuation">(</span>rw<span class="token punctuation">,</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ObjFile<span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;append Type:Icon of &quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot; (&quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                                        <span class="token keyword">case</span> <span class="token string">&quot;/BIN&quot;</span><span class="token punctuation">:</span>
                                            <span class="token function">BinaryAdd</span><span class="token punctuation">(</span>rw<span class="token punctuation">,</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ObjFile<span class="token punctuation">.</span>FullName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;append Type:Binary of &quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot; (&quot;</span> <span class="token operator">+</span> addBody<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                                        <span class="token keyword">default</span><span class="token punctuation">:</span>
                                            <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token string">&quot;u must input resources type !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                                    <span class="token punctuation">}</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nbuild of &quot;</span> <span class="token operator">+</span> theResourcesFileName <span class="token operator">+</span> <span class="token string">&quot; complete.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        rw<span class="token punctuation">.</span><span class="token function">Generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token string">&quot;need filename of /fn,fileFullName !&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nPress Enter to end ..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ErrMsg<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Version</span> PrjVer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Version</span><span class="token punctuation">(</span>Application<span class="token punctuation">.</span>ProductVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> <span class="token operator">+</span> Application<span class="token punctuation">.</span>ProductName<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; v&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Major<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
            <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Minor<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Build<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span>
            <span class="token string">&quot; Studio: &quot;</span> <span class="token operator">+</span> Application<span class="token punctuation">.</span>CompanyName <span class="token operator">+</span> <span class="token string">&quot; Copyright: &quot;</span> <span class="token operator">+</span> myCopyright <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>ErrMsg <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Waring !!\\n&quot;</span> <span class="token operator">+</span> ErrMsg <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myExemple <span class="token operator">+</span> <span class="token string">&quot;\\n\\n&quot;</span> <span class="token operator">+</span> mySwitch<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">BinaryAdd</span><span class="token punctuation">(</span><span class="token class-name">ResourceWriter</span> rw<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> itemnameOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filenameOf<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">FileStream</span> fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>filenameOf<span class="token punctuation">,</span> FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> byteLength <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> wf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>byteLength<span class="token punctuation">]</span><span class="token punctuation">;</span>
            fs<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>wf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> byteLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
            fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            rw<span class="token punctuation">.</span><span class="token function">AddResource</span><span class="token punctuation">(</span>itemnameOf<span class="token punctuation">,</span> wf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ImageAdd</span><span class="token punctuation">(</span><span class="token class-name">ResourceWriter</span> rw<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> itemnameOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filenameOf<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Image</span> b <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token function">FromFile</span><span class="token punctuation">(</span>filenameOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
            rw<span class="token punctuation">.</span><span class="token function">AddResource</span><span class="token punctuation">(</span>itemnameOf<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">IconAdd</span><span class="token punctuation">(</span><span class="token class-name">ResourceWriter</span> rw<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> itemnameOf<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filenameOf<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">Icon</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Icon</span><span class="token punctuation">(</span>filenameOf<span class="token punctuation">)</span><span class="token punctuation">;</span>
            rw<span class="token punctuation">.</span><span class="token function">AddResource</span><span class="token punctuation">(</span>itemnameOf<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>回复人： ArLi2003(阿利，失业+失恋 努力中) ( ) 信誉：100 2003-4-25 0:57:46 得分:0</p></blockquote><p>程序，我以前有个习惯不使用资源而是将内容二进制打进程序</p><p>直接使用 <code>byte[] bgSound = new byte[]{....}</code> //此为声音文件二进制，原来是用vc 现在特用c# 重写了一个</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token comment">//using System.Drawing;</span>
<span class="token comment">//using System.Resources;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyVersion</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;1.5.*&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyTitle</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;string Build&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyDescription</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;System.byte[] to string&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyConfiguration</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCompany</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;ArLi&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyProduct</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;string Build&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCopyright</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;ArLi build on C#&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyTrademark</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>AssemblyCulture</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>

<span class="token keyword">class</span> <span class="token class-name">resAdd</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">AssemblyCopyrightAttribute</span> objCopyright <span class="token operator">=</span> <span class="token punctuation">(</span>AssemblyCopyrightAttribute<span class="token punctuation">)</span>AssemblyCopyrightAttribute<span class="token punctuation">.</span><span class="token function">GetCustomAttribute</span><span class="token punctuation">(</span>Assembly<span class="token punctuation">.</span><span class="token function">GetExecutingAssembly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AssemblyCopyrightAttribute</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myCopyright <span class="token operator">=</span> objCopyright<span class="token punctuation">.</span>Copyright<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myExeName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>Application<span class="token punctuation">.</span>ExecutablePath<span class="token punctuation">)</span><span class="token punctuation">.</span>Name <span class="token operator">+</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> myHelpBody <span class="token operator">=</span> <span class="token string">&quot;&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;[Syntax]:\\n&quot;</span> <span class="token operator">+</span> myExeName <span class="token operator">+</span> <span class="token string">&quot;formFile variableName toFile \\tsave string to file\\n&quot;</span> <span class="token operator">+</span>
        myExeName <span class="token operator">+</span> <span class="token string">&quot;formFile variableName /copy \\tcopy string to clipboard.\\n&quot;</span> <span class="token operator">+</span>
        myExeName <span class="token operator">+</span> <span class="token string">&quot;formFile variableName /copy /s \\tcopy string &amp; show stats.\\n\\n&quot;</span> <span class="token operator">+</span>
        <span class="token string">&quot;[Exemple]:\\n&quot;</span> <span class="token operator">+</span> myExeName <span class="token operator">+</span> <span class="token string">&quot;c:\\\\1.ico ico_1 /copy /s&quot;</span><span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">STAThread</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length<span class="token operator">&gt;</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/?&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span><span class="token punctuation">{</span>
                    <span class="token class-name">FileInfo</span> fi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Match</span> MatchVariableName <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token string">@&quot;\\b([a-zA-Z]\\w*)&quot;</span><span class="token punctuation">,</span>RegexOptions<span class="token punctuation">.</span>IgnoreCase<span class="token operator">|</span>RegexOptions<span class="token punctuation">.</span>IgnorePatternWhitespace<span class="token operator">|</span>RegexOptions<span class="token punctuation">.</span>ExplicitCapture<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">string</span></span> variableName <span class="token operator">=</span> MatchVariableName<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;don&#39;t forget VariableName!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span> fi<span class="token punctuation">.</span>Exists<span class="token punctuation">)</span><span class="token punctuation">{</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;File &quot;</span> <span class="token operator">+</span> fi<span class="token punctuation">.</span>FullName <span class="token operator">+</span> <span class="token string">&quot; no Exists!!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>variableName <span class="token operator">==</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;invalid variableName!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token class-name">FileStream</span> fs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileStream</span><span class="token punctuation">(</span>fi<span class="token punctuation">.</span>FullName<span class="token punctuation">,</span>FileMode<span class="token punctuation">.</span>Open<span class="token punctuation">,</span> FileAccess<span class="token punctuation">.</span>Read<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name"><span class="token keyword">int</span></span> byteLength <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>fs<span class="token punctuation">.</span>Length<span class="token punctuation">;</span>
                        <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> wf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">byte</span></span><span class="token punctuation">[</span>byteLength<span class="token punctuation">]</span><span class="token punctuation">;</span>
                        fs<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>wf<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>byteLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        fs<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        fs <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

                        <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                        <span class="token class-name"><span class="token keyword">byte</span></span> iCr <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                        <span class="token class-name"><span class="token keyword">bool</span></span> ShowStats <span class="token operator">=</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>Length<span class="token operator">&gt;</span><span class="token number">3</span> <span class="token operator">&amp;&amp;</span> args<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/s&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                        <span class="token class-name"><span class="token keyword">string</span></span> s <span class="token operator">=</span> <span class="token string">&quot;System.Byte[] &quot;</span> <span class="token operator">+</span> variableName <span class="token operator">+</span> <span class="token string">&quot; = new System.Byte[] {&quot;</span><span class="token punctuation">;</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> sp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span></span><span class="token punctuation">(</span><span class="token char">&#39; &#39;</span><span class="token punctuation">,</span>byteLength<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">;</span>

                        Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Poc &quot;</span> <span class="token operator">+</span> s <span class="token operator">+</span> <span class="token string">&quot;&quot;</span> <span class="token operator">+</span> byteLength<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; byte} ...\\nuse CTRL+Break can stop ...\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                        s <span class="token operator">+=</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>

                        <span class="token keyword">if</span> <span class="token punctuation">(</span>ShowStats<span class="token punctuation">)</span><span class="token punctuation">{</span>
                            <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> byteLength<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                s <span class="token operator">+=</span> wf<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">;</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>iCr <span class="token operator">==</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                                    s <span class="token operator">+=</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
                                    iCr<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                                i<span class="token operator">++</span><span class="token punctuation">;</span>
                                iCr<span class="token operator">++</span><span class="token punctuation">;</span>
                                Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\\r&quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> sp<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                            <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> byteLength<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                s <span class="token operator">+=</span> wf<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">;</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>iCr <span class="token operator">==</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                                    s <span class="token operator">+=</span> <span class="token string">&quot;\\r\\n&quot;</span><span class="token punctuation">;</span>
                                    iCr<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                                i<span class="token operator">++</span><span class="token punctuation">;</span>
                                iCr<span class="token operator">++</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>

                        s <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>Length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\r\\n};&quot;</span><span class="token punctuation">;</span>
                        s <span class="token operator">=</span> <span class="token string">&quot;\\t#region System.Byte[] &quot;</span> <span class="token operator">+</span> variableName <span class="token operator">+</span> <span class="token string">&quot; = new System.Byte[] {...}\\r\\n&quot;</span> <span class="token operator">+</span> s <span class="token operator">+</span> <span class="token string">&quot;\\r\\n\\t#endregion&quot;</span><span class="token punctuation">;</span>

                        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&quot;/copy&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            Clipboard<span class="token punctuation">.</span><span class="token function">SetDataObject</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                            <span class="token class-name">FileInfo</span> ObjFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FileInfo</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">StreamWriter</span> sw <span class="token operator">=</span> ObjFile<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            sw<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            sw<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\rdone.. ^o^&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Message<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;\\nPress Enter to end ..&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowHelp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ErrMsg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Version</span> PrjVer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Version</span><span class="token punctuation">(</span>Application<span class="token punctuation">.</span>ProductVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> <span class="token operator">+</span> Application<span class="token punctuation">.</span>ProductName<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; v&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Major<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
            <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Minor<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span> PrjVer<span class="token punctuation">.</span>Build<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; Studio: &quot;</span> 
            <span class="token operator">+</span> Application<span class="token punctuation">.</span>CompanyName <span class="token operator">+</span> <span class="token string">&quot; Copyright: &quot;</span> <span class="token operator">+</span> myCopyright <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>ErrMsg <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Waring !!\\n&quot;</span> <span class="token operator">+</span> ErrMsg <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>myHelpBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,32),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","sysctr21.html.vue"]]);export{i as default};
