import{_ as t,r as p,o,c as e,b as n,d as s,e as c,a as u}from"./app-a2b6e588.js";const l="/steven-blogs/assets/toolbox15_1-67e40a53.png",k="/steven-blogs/assets/toolbox15_2-a2bf5003.png",i="/steven-blogs/assets/toolbox15_3-a5d58e8a.png",r={},m=u('<h1 id="不是人啊-不是人-——-net-风格菜单组件" tabindex="-1"><a class="header-anchor" href="#不是人啊-不是人-——-net-风格菜单组件" aria-hidden="true">#</a> 不是人啊！不是人！——.NET 风格菜单组件</h1><blockquote><p>xlfancy 2003-9-24 15:59:00</p></blockquote><p>.NET 风格菜单组件。是哦所见最酷的一个。</p><p>没用一个 WIN32 API，纯 C# 搞定——主菜单、子菜单、快捷菜单的 .NET 菜单风格！</p><p>鬼佬真的是鬼呀，不是人！</p><p>哦花了两天时间，才搞明白这个组件的用法（别笑哦蠢啊，至少会用哈...）</p><p>此主题相关图片如下：</p><p><img src="'+l+`" alt="img_1"></p><p>源码出处：.NET 风格菜单组件</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//============.NET 风格菜单组件源码欣赏===============</span>

<span class="token comment">/* ***************************************
 *           NiceMenu.cs (v 1.1)
 *  --------------------------------------
 *  This is an improvement by Francesco Natali (fn.varie@libero.it)
 *  over an improvement by Sajith M
 *  of the &quot;Visual Studio .NET Menu Style&quot;
 *  by Carlos H. Perez that appeared on CodeProject
 *  (http://www.codeproject.com)
 * ---------------------------------------
 *       How to use it
 *  You have to add:
 *  using Utility.NiceMenu;
 *  and after the &quot;InitializeComponent()&quot; code:
 *   NiceMenu myNiceMenu = new NiceMenu();
 *  myNiceMenu.UpdateMenu(this.nameofyourmainmenu, new NiceMenuClickEvent(nameofyourclickfunction));
 * ---------------------------------------
 *  With only three lines of code your menu
 *    will be AUTOMATICALLY updated with
 *       a new great .Net style menu!
 * ****************************************/</span>
<span class="token keyword">namespace</span> <span class="token namespace">Utility<span class="token punctuation">.</span>NiceMenu</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Text</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>
    <span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>

    <span class="token comment">/* ******************************************************
    *   NiceMenuClickEvent(object sender, System.EventArgs e)
    * ------------------------------------------------------
    * this is a delegate event that will be initializate with
    *  the user function to handle the click event on the menu
    * ******************************************************/</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">NiceMenuClickEvent</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* ******************************************************
    *  This is a simple example of a function
    *  to handle the click event:  
    *  -----------------------------------------------------
    public void myClickMenuEvent(object sender, System.EventArgs e)
    {
        if (typeof(NiceMenu).IsInstanceOfType(sender))
        {
            NiceMenu item = (NiceMenu)sender;
            MessageBox.Show(item.Text); //example
        }
    }
    * ******************************************************/</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// A great and free improvement menu class!</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NiceMenu</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MenuItem</span></span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* If you want to add some incons in your menu 
        * you have to:
        * 1. add an imagelist control in your form
        * 2. add your icons in your imagelist control
        * 3. add in your menu items the index of the icon 
        *    in the first two characters. For example:
        *    00New
        *    01Open
        *    02Close
        * 4. After the &quot;NiceMenu myNiceMenu = new NiceMenu();&quot; code
        *    you have to add this simple line of code: 
        *    myNiceMenu.MenuImages = nameofyourimagelist; 
        * */</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// Set &quot;MenuImages&quot; with the your ImageList to add icons in your menu.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token class-name">ImageList</span> MenuImages<span class="token punctuation">;</span>

        <span class="token comment">// NiceMenu array to save the main menu item</span>
        <span class="token comment">// so at runtime i can search an item and modify it</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">NiceMenu<span class="token punctuation">[</span><span class="token punctuation">]</span></span> myModifyNiceMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">NiceMenu<span class="token punctuation">[</span><span class="token punctuation">]</span></span> myModifyContextNiceMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> contModify <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> contModifyContext <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> window<span class="token punctuation">;</span>
        <span class="token comment">// Some useful properties to change the color of your menu</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> backcolor<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> barcolor<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> selectioncolor<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Color</span> framecolor<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> iconSize <span class="token operator">=</span> SystemInformation<span class="token punctuation">.</span>SmallIconSize<span class="token punctuation">.</span>Width <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> itemHeight<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">bool</span></span> doColorUpdate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> shortcuttext <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Image</span> icon   <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> BITMAP_SIZE <span class="token operator">=</span> <span class="token number">16</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> STRIPE_WIDTH <span class="token operator">=</span> iconSize <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span>
  
        <span class="token keyword">public</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
  
        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// public for the AddRecentFile function</span>
        <span class="token keyword">public</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> handler<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> handler<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">NiceMenu<span class="token punctuation">[</span><span class="token punctuation">]</span></span> items<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> items<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> handler<span class="token punctuation">,</span> <span class="token class-name">Shortcut</span> shortcut<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> shortcut<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name">MenuMerge</span> mergeType<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> mergeOrder<span class="token punctuation">,</span> <span class="token class-name">Shortcut</span> shortcut<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> onClick<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> onPopup<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> onSelect<span class="token punctuation">,</span> <span class="token class-name">NiceMenu<span class="token punctuation">[</span><span class="token punctuation">]</span></span> items<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>mergeType<span class="token punctuation">,</span> mergeOrder<span class="token punctuation">,</span> shortcut<span class="token punctuation">,</span> name<span class="token punctuation">,</span> onClick<span class="token punctuation">,</span> onPopup<span class="token punctuation">,</span> onSelect<span class="token punctuation">,</span> items<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            OwnerDraw <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">Image</span> img<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            icon <span class="token operator">=</span> img<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> handler<span class="token punctuation">,</span> <span class="token class-name">Image</span> img<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> handler<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            icon <span class="token operator">=</span> img<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token function">NiceMenu</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">EventHandler</span> handler<span class="token punctuation">,</span> <span class="token class-name">Shortcut</span> shortcut<span class="token punctuation">,</span> <span class="token class-name">Image</span> img<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> shortcut<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            icon <span class="token operator">=</span> img<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
 
        <span class="token comment">// *********************************************************</span>

        <span class="token keyword">private</span> <span class="token return-type class-name">Image</span> Icon 
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> 
            <span class="token punctuation">{</span> <span class="token keyword">return</span> icon<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>    
            <span class="token punctuation">{</span> icon <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> ShortcutText 
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span> 
            <span class="token punctuation">{</span> <span class="token keyword">return</span> shortcuttext<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span> 
            <span class="token punctuation">{</span> shortcuttext <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">Color</span> SelectionColor
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span> <span class="token keyword">return</span> selectioncolor<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span> selectioncolor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">Color</span> BackColor
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span> <span class="token keyword">return</span> backcolor<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span> backcolor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">Color</span> BarColor
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span> <span class="token keyword">return</span> barcolor<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span> barcolor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name">Color</span> FrameColor
        <span class="token punctuation">{</span>
            <span class="token keyword">get</span>
            <span class="token punctuation">{</span> <span class="token keyword">return</span> framecolor<span class="token punctuation">;</span> <span class="token punctuation">}</span>
            <span class="token keyword">set</span>
            <span class="token punctuation">{</span> framecolor <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//************************************************************************</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            window <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>Window<span class="token punctuation">;</span>
            backcolor  <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>ControlLightLight<span class="token punctuation">;</span>
            barcolor <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>Control<span class="token punctuation">;</span>
            selectioncolor  <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>Highlight<span class="token punctuation">;</span>
            framecolor <span class="token operator">=</span> SystemColors<span class="token punctuation">.</span>Highlight<span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> wa <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>window<span class="token punctuation">.</span>A<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> wr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>window<span class="token punctuation">.</span>R<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> wg <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>window<span class="token punctuation">.</span>G<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> wb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>window<span class="token punctuation">.</span>B<span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> mna <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>backcolor<span class="token punctuation">.</span>A<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> mnr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>backcolor<span class="token punctuation">.</span>R<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> mng <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>backcolor<span class="token punctuation">.</span>G<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> mnb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>backcolor<span class="token punctuation">.</span>B<span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> sta <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>barcolor<span class="token punctuation">.</span>A<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> str <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>barcolor<span class="token punctuation">.</span>R<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> stg <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>barcolor<span class="token punctuation">.</span>G<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> stb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>barcolor<span class="token punctuation">.</span>B<span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">int</span></span> sla <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>selectioncolor<span class="token punctuation">.</span>A<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> slr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>selectioncolor<span class="token punctuation">.</span>R<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> slg <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>selectioncolor<span class="token punctuation">.</span>G<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> slb <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>selectioncolor<span class="token punctuation">.</span>B<span class="token punctuation">;</span>

            backcolor <span class="token operator">=</span> Color<span class="token punctuation">.</span><span class="token function">FromArgb</span><span class="token punctuation">(</span>wr<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wr<span class="token operator">-</span>mnr<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wg<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wg<span class="token operator">-</span>mng<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wb<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wb<span class="token operator">-</span>mnb<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            barcolor <span class="token operator">=</span> Color<span class="token punctuation">.</span><span class="token function">FromArgb</span><span class="token punctuation">(</span>wr<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wr<span class="token operator">-</span>str<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wg<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wg<span class="token operator">-</span>stg<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wb<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wb<span class="token operator">-</span>stb<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            selectioncolor <span class="token operator">=</span> Color<span class="token punctuation">.</span><span class="token function">FromArgb</span><span class="token punctuation">(</span>wr<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wr<span class="token operator">-</span>slr<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wg<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wg<span class="token operator">-</span>slg<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wb<span class="token operator">-</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>wb<span class="token operator">-</span>slb<span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateMenuColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>            
            doColorUpdate <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoUpdateMenuColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">UpdateColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            doColorUpdate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMeasureItem</span><span class="token punctuation">(</span><span class="token class-name">MeasureItemEventArgs</span> e<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnMeasureItem</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>Shortcut <span class="token operator">!=</span> Shortcut<span class="token punctuation">.</span>None<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">string</span></span> text <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> key <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Shortcut<span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">int</span></span> ch <span class="token operator">=</span> key <span class="token operator">&amp;</span> <span class="token number">0xFF</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Keys<span class="token punctuation">.</span>Control <span class="token operator">&amp;</span> key<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> text <span class="token operator">+=</span> <span class="token string">&quot;Ctrl+&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Keys<span class="token punctuation">.</span>Shift <span class="token operator">&amp;</span> key<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> text <span class="token operator">+=</span> <span class="token string">&quot;Shift+&quot;</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Keys<span class="token punctuation">.</span>Alt <span class="token operator">&amp;</span> key<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> text <span class="token operator">+=</span> <span class="token string">&quot;Alt+&quot;</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>ch <span class="token operator">&gt;=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Shortcut<span class="token punctuation">.</span>F1 <span class="token operator">&amp;&amp;</span> ch <span class="token operator">&lt;=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Shortcut<span class="token punctuation">.</span>F12<span class="token punctuation">)</span>
                    text <span class="token operator">+=</span> <span class="token string">&quot;F&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>ch <span class="token operator">-</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Shortcut<span class="token punctuation">.</span>F1 <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span> 
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span> Shortcut <span class="token operator">==</span> Shortcut<span class="token punctuation">.</span>Del<span class="token punctuation">)</span> 
                    <span class="token punctuation">{</span>
                        text <span class="token operator">+=</span> <span class="token string">&quot;Del&quot;</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> 
                    <span class="token punctuation">{</span>
                        text <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>ch<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                shortcuttext <span class="token operator">=</span> text<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> 

            <span class="token keyword">if</span> <span class="token punctuation">(</span>Text <span class="token operator">==</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span>ItemHeight <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
                e<span class="token punctuation">.</span>ItemWidth  <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token class-name"><span class="token keyword">bool</span></span> topLevel <span class="token operator">=</span> Parent <span class="token operator">==</span> Parent<span class="token punctuation">.</span><span class="token function">GetMainMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> tempShortcutText <span class="token operator">=</span> shortcuttext<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>topLevel<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                tempShortcutText <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name"><span class="token keyword">int</span></span> textwidth <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>Graphics<span class="token punctuation">.</span><span class="token function">MeasureString</span><span class="token punctuation">(</span>Text <span class="token operator">+</span> tempShortcutText<span class="token punctuation">,</span> SystemInformation<span class="token punctuation">.</span>MenuFont<span class="token punctuation">)</span><span class="token punctuation">.</span>Width<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> extraHeight <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span>ItemHeight <span class="token operator">=</span> SystemInformation<span class="token punctuation">.</span>MenuHeight <span class="token operator">+</span> extraHeight<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>topLevel<span class="token punctuation">)</span>
                e<span class="token punctuation">.</span>ItemWidth  <span class="token operator">=</span> textwidth <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">;</span> 
            <span class="token keyword">else</span>
                e<span class="token punctuation">.</span>ItemWidth   <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Max</span><span class="token punctuation">(</span><span class="token number">160</span><span class="token punctuation">,</span> textwidth <span class="token operator">+</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            itemHeight <span class="token operator">=</span> e<span class="token punctuation">.</span>ItemHeight<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
  
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnDrawItem</span><span class="token punctuation">(</span><span class="token class-name">DrawItemEventArgs</span> e<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>doColorUpdate<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token function">DoUpdateMenuColors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnDrawItem</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">Graphics</span> g <span class="token operator">=</span> e<span class="token punctuation">.</span>Graphics<span class="token punctuation">;</span>
            <span class="token class-name">Rectangle</span> bounds <span class="token operator">=</span> e<span class="token punctuation">.</span>Bounds<span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> selected <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>State <span class="token operator">&amp;</span> DrawItemState<span class="token punctuation">.</span>Selected<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> toplevel <span class="token operator">=</span> <span class="token punctuation">(</span>Parent <span class="token operator">==</span> Parent<span class="token punctuation">.</span><span class="token function">GetMainMenu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> hasicon  <span class="token operator">=</span> Icon <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> enabled <span class="token operator">=</span> Enabled<span class="token punctuation">;</span>

            <span class="token function">DrawBackground</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> e<span class="token punctuation">.</span>State<span class="token punctuation">,</span> toplevel<span class="token punctuation">,</span> hasicon<span class="token punctuation">,</span> enabled<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>hasicon<span class="token punctuation">)</span>
                <span class="token function">DrawIcon</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> Icon<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> selected<span class="token punctuation">,</span> Enabled<span class="token punctuation">,</span> Checked<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>Checked<span class="token punctuation">)</span>
                    <span class="token function">DrawCheckmark</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> selected<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>RadioCheck<span class="token punctuation">)</span>
                    <span class="token function">DrawRadioCheckmark</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> selected<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>Text <span class="token operator">==</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span> <span class="token function">DrawSeparator</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> 
            <span class="token keyword">else</span> 
            <span class="token punctuation">{</span> <span class="token function">DrawMenuText</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">,</span> Text<span class="token punctuation">,</span> shortcuttext<span class="token punctuation">,</span> Enabled<span class="token punctuation">,</span> toplevel<span class="token punctuation">,</span> e<span class="token punctuation">.</span>State<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* ******************************
        *  DrawRadioCheckmark
        * ******************************/</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawRadioCheckmark</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> selected<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> checkTop <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Top <span class="token operator">+</span> <span class="token punctuation">(</span>itemHeight <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> checkLeft <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> <span class="token punctuation">(</span> STRIPE_WIDTH <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            ControlPaint<span class="token punctuation">.</span><span class="token function">DrawMenuGlyph</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span>checkLeft<span class="token punctuation">,</span> checkTop<span class="token punctuation">,</span> BITMAP_SIZE<span class="token punctuation">,</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token punctuation">,</span> MenuGlyph<span class="token punctuation">.</span>Bullet<span class="token punctuation">)</span><span class="token punctuation">;</span>
            g<span class="token punctuation">.</span><span class="token function">DrawRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Pen</span><span class="token punctuation">(</span>framecolor<span class="token punctuation">)</span><span class="token punctuation">,</span> checkLeft<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> checkTop<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> BITMAP_SIZE<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> BITMAP_SIZE<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawCheckmark</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> selected<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> checkTop <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Top <span class="token operator">+</span> <span class="token punctuation">(</span>itemHeight <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> checkLeft <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> <span class="token punctuation">(</span> STRIPE_WIDTH <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            ControlPaint<span class="token punctuation">.</span><span class="token function">DrawMenuGlyph</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rectangle</span><span class="token punctuation">(</span>checkLeft<span class="token punctuation">,</span> checkTop<span class="token punctuation">,</span> BITMAP_SIZE<span class="token punctuation">,</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token punctuation">,</span> MenuGlyph<span class="token punctuation">.</span>Checkmark<span class="token punctuation">)</span><span class="token punctuation">;</span>
            g<span class="token punctuation">.</span><span class="token function">DrawRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Pen</span><span class="token punctuation">(</span>framecolor<span class="token punctuation">)</span><span class="token punctuation">,</span> checkLeft<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> checkTop<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> BITMAP_SIZE<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> BITMAP_SIZE<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawIcon</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Image</span> icon<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> selected<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> enabled<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> ischecked<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iconTop <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Top <span class="token operator">+</span> <span class="token punctuation">(</span>itemHeight <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> iconLeft <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> <span class="token punctuation">(</span>STRIPE_WIDTH <span class="token operator">-</span> BITMAP_SIZE<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>selected<span class="token punctuation">)</span> 
                <span class="token punctuation">{</span>
                    ControlPaint<span class="token punctuation">.</span><span class="token function">DrawImageDisabled</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> icon<span class="token punctuation">,</span> iconLeft <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> iconTop<span class="token punctuation">,</span> Color<span class="token punctuation">.</span>Black<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    g<span class="token punctuation">.</span><span class="token function">DrawImage</span><span class="token punctuation">(</span>icon<span class="token punctuation">,</span> iconLeft<span class="token punctuation">,</span> iconTop<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> 
                <span class="token keyword">else</span> 
                <span class="token punctuation">{</span>
                    g<span class="token punctuation">.</span><span class="token function">DrawImage</span><span class="token punctuation">(</span>icon<span class="token punctuation">,</span> iconLeft <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> iconTop<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> 
            <span class="token keyword">else</span> 
            <span class="token punctuation">{</span>
                ControlPaint<span class="token punctuation">.</span><span class="token function">DrawImageDisabled</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> icon<span class="token punctuation">,</span> iconLeft <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> iconTop<span class="token punctuation">,</span> SystemColors<span class="token punctuation">.</span>HighlightText<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
 
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawSeparator</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Y <span class="token operator">+</span> bounds<span class="token punctuation">.</span>Height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            g<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Pen</span><span class="token punctuation">(</span>SystemColors<span class="token punctuation">.</span>ControlDark<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>X <span class="token operator">+</span> iconSize <span class="token operator">+</span> <span class="token number">7</span><span class="token punctuation">,</span> y<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>X <span class="token operator">+</span> bounds<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
  
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawBackground</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name">DrawItemState</span> state<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> toplevel<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> hasicon<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> enabled<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">bool</span></span> selected <span class="token operator">=</span> <span class="token punctuation">(</span>state <span class="token operator">&amp;</span> DrawItemState<span class="token punctuation">.</span>Selected<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>selected <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>state <span class="token operator">&amp;</span> DrawItemState<span class="token punctuation">.</span>HotLight<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>toplevel <span class="token operator">&amp;&amp;</span> selected<span class="token punctuation">)</span> 
                <span class="token punctuation">{</span>
                    bounds<span class="token punctuation">.</span><span class="token function">Inflate</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>barcolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    ControlPaint<span class="token punctuation">.</span><span class="token function">DrawBorder3D</span><span class="token punctuation">(</span>g<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Left<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Width<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Height<span class="token punctuation">,</span> Border3DStyle<span class="token punctuation">.</span>Flat<span class="token punctuation">,</span> Border3DSide<span class="token punctuation">.</span>Top <span class="token operator">|</span> Border3DSide<span class="token punctuation">.</span>Left <span class="token operator">|</span> Border3DSide<span class="token punctuation">.</span>Right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> 
                <span class="token keyword">else</span> 
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span> enabled <span class="token punctuation">)</span> 
                    <span class="token punctuation">{</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>selectioncolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    g<span class="token punctuation">.</span><span class="token function">DrawRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Pen</span><span class="token punctuation">(</span>framecolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>X<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Y<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Height <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">else</span> 
                    <span class="token punctuation">{</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>barcolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    bounds<span class="token punctuation">.</span>X <span class="token operator">+=</span> STRIPE_WIDTH<span class="token punctuation">;</span>
                    bounds<span class="token punctuation">.</span>Width <span class="token operator">-=</span> STRIPE_WIDTH<span class="token punctuation">;</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>backcolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> 
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>toplevel<span class="token punctuation">)</span> 
                <span class="token punctuation">{</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>barcolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    bounds<span class="token punctuation">.</span>X <span class="token operator">+=</span> STRIPE_WIDTH<span class="token punctuation">;</span>
                    bounds<span class="token punctuation">.</span>Width <span class="token operator">-=</span> STRIPE_WIDTH<span class="token punctuation">;</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>backcolor<span class="token punctuation">)</span><span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> 
                <span class="token keyword">else</span> 
                <span class="token punctuation">{</span>
                    g<span class="token punctuation">.</span><span class="token function">FillRectangle</span><span class="token punctuation">(</span>SystemBrushes<span class="token punctuation">.</span>Control<span class="token punctuation">,</span> bounds<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DrawMenuText</span><span class="token punctuation">(</span><span class="token class-name">Graphics</span> g<span class="token punctuation">,</span> <span class="token class-name">Rectangle</span> bounds<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> shortcut<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> enabled<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> toplevel<span class="token punctuation">,</span> <span class="token class-name">DrawItemState</span> state <span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token class-name">StringFormat</span> stringformat <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            stringformat<span class="token punctuation">.</span>HotkeyPrefix <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>state <span class="token operator">&amp;</span> DrawItemState<span class="token punctuation">.</span>NoAccelerator<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">?</span> HotkeyPrefix<span class="token punctuation">.</span>Hide <span class="token punctuation">:</span> HotkeyPrefix<span class="token punctuation">.</span>Show<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span> toplevel <span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">int</span></span> index <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">IndexOf</span><span class="token punctuation">(</span><span class="token string">&quot;&amp;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span> index <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">)</span> 
                <span class="token punctuation">{</span>
                    text <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
   
            <span class="token class-name"><span class="token keyword">int</span></span> textwidth <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">MeasureString</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> SystemInformation<span class="token punctuation">.</span>MenuFont<span class="token punctuation">)</span><span class="token punctuation">.</span>Width<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> x <span class="token operator">=</span> toplevel <span class="token punctuation">?</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> <span class="token punctuation">(</span>bounds<span class="token punctuation">.</span>Width <span class="token operator">-</span> textwidth<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">:</span> bounds<span class="token punctuation">.</span>Left <span class="token operator">+</span> iconSize <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> topGap <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>toplevel<span class="token punctuation">)</span> topGap <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">int</span></span> y <span class="token operator">=</span> bounds<span class="token punctuation">.</span>Top <span class="token operator">+</span> topGap<span class="token punctuation">;</span>
            <span class="token class-name">Brush</span> brush <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>enabled<span class="token punctuation">)</span>
                brush <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>SystemColors<span class="token punctuation">.</span>GrayText<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                brush <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SolidBrush</span><span class="token punctuation">(</span>SystemColors<span class="token punctuation">.</span>MenuText<span class="token punctuation">)</span><span class="token punctuation">;</span>

            g<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> SystemInformation<span class="token punctuation">.</span>MenuFont<span class="token punctuation">,</span> brush<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> stringformat<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token operator">!</span>toplevel <span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                stringformat<span class="token punctuation">.</span>FormatFlags <span class="token operator">|=</span> StringFormatFlags<span class="token punctuation">.</span>DirectionRightToLeft<span class="token punctuation">;</span>
                g<span class="token punctuation">.</span><span class="token function">DrawString</span><span class="token punctuation">(</span>shortcut<span class="token punctuation">,</span> SystemInformation<span class="token punctuation">.</span>MenuFont<span class="token punctuation">,</span> brush<span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Width <span class="token operator">-</span> <span class="token number">10</span> <span class="token punctuation">,</span> bounds<span class="token punctuation">.</span>Top <span class="token operator">+</span> topGap<span class="token punctuation">,</span> stringformat<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* ******************************************************
        *  UpdateMenu(MainMenu yourOldMenu)
        *  UpdateMenu(ContextMenu yourOldMenu)
        * ------------------------------------------------------
        *  this function will update the user old menu
        * ******************************************************/</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// this function will update your Main Menu.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateMenu</span><span class="token punctuation">(</span><span class="token class-name">MainMenu</span> yourOldMenu<span class="token punctuation">,</span> <span class="token class-name">NiceMenuClickEvent</span> yourClickFunction<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">IList</span> myMenuList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Menu<span class="token punctuation">.</span>MenuItemCollection</span><span class="token punctuation">(</span>yourOldMenu<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span>myMenuList<span class="token punctuation">,</span> yourOldMenu<span class="token punctuation">,</span> yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// this function will update your Context Menu.</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">UpdateMenu</span><span class="token punctuation">(</span><span class="token class-name">ContextMenu</span> yourOldMenu<span class="token punctuation">,</span> <span class="token class-name">NiceMenuClickEvent</span> yourClickFunction<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">IList</span> myMenuList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Menu<span class="token punctuation">.</span>MenuItemCollection</span><span class="token punctuation">(</span>yourOldMenu<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span>myMenuList<span class="token punctuation">,</span> yourOldMenu<span class="token punctuation">,</span> yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/* ***********************************************************
        *  BuildMenuTree (IList myMenu, MenuItem parentMenu)
        * -----------------------------------------------------------
        *  build the new submenu item 
        * ***********************************************************/</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span><span class="token class-name">IList</span> myMenu<span class="token punctuation">,</span> <span class="token class-name">MenuItem</span> parentMenu<span class="token punctuation">,</span> <span class="token class-name">NiceMenuClickEvent</span> yourClickFunction<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">MenuItem</span> myMenuItem <span class="token keyword">in</span> myMenu<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token comment">// Declaration</span>
                <span class="token class-name">NiceMenu</span> newSubMenu<span class="token punctuation">;</span>

                <span class="token class-name"><span class="token keyword">string</span></span> IndexImage <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">bool</span></span> AddMenuImage <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

                <span class="token comment">/* If in the first two characters of the menu item text 
                    * there is a number I set AddMenuImage = true and the 
                    * IndexImage to get the icon in the image list control. */</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    IndexImage <span class="token operator">=</span> myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsNumber</span><span class="token punctuation">(</span>IndexImage<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        AddMenuImage <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        <span class="token comment">// I have to delete first two characters</span>
                        myMenuItem<span class="token punctuation">.</span>Text <span class="token operator">=</span> myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>AddMenuImage <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                    newSubMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">,</span> myMenuItem<span class="token punctuation">.</span>Shortcut<span class="token punctuation">,</span> MenuImages<span class="token punctuation">.</span>Images<span class="token punctuation">[</span>Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>IndexImage<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    newSubMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">,</span> myMenuItem<span class="token punctuation">.</span>Shortcut<span class="token punctuation">)</span><span class="token punctuation">;</span> 
                <span class="token comment">// I add the new menu item to its parent</span>
                parentMenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>newSubMenu<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// Checked </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Checked <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> newSubMenu<span class="token punctuation">.</span>Checked <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token comment">// RadioCheck </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>RadioCheck <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> 
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Checked <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> newSubMenu<span class="token punctuation">.</span>RadioCheck <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token comment">// DefaultItem </span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>DefaultItem <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> newSubMenu<span class="token punctuation">.</span>DefaultItem <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token comment">// Enabled</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Enabled <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> newSubMenu<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token comment">// If this menu item contains child menu items</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>IsParent <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">IList</span> mySubMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Menu<span class="token punctuation">.</span>MenuItemCollection</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span>mySubMenu<span class="token punctuation">,</span> newSubMenu<span class="token punctuation">,</span> yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* ***********************************************************
        * BuildMenuTree (IList myMenu, MainMenu parentMenu)
        *  BuildMenuTree (IList myMenu, ContextMenu parentMenu, NiceMenuClickEvent yourClickFunction)
        * -----------------------------------------------------------
        *  build the new main menus and delete the old ones
        * ***********************************************************/</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span><span class="token class-name">IList</span> myMenu<span class="token punctuation">,</span> <span class="token class-name">MainMenu</span> parentMenu<span class="token punctuation">,</span> <span class="token class-name">NiceMenuClickEvent</span> yourClickFunction<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> numOldMenu <span class="token operator">=</span> myMenu<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>

            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">MenuItem</span> myMenuItem <span class="token keyword">in</span> myMenu<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token class-name">NiceMenu</span> newMainMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                parentMenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>newMainMenu<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>myModifyNiceMenu<span class="token punctuation">[</span>contModify<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    myModifyNiceMenu<span class="token punctuation">[</span>contModify<span class="token punctuation">]</span> <span class="token operator">=</span> newMainMenu<span class="token punctuation">;</span>
                    contModify <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>IsParent <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">IList</span> mySubMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Menu<span class="token punctuation">.</span>MenuItemCollection</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span>mySubMenu<span class="token punctuation">,</span> newMainMenu<span class="token punctuation">,</span> yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// Now I have to delete the old menus</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>numOldMenu<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>   parentMenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">RemoveAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* ****************************************************
        * With the context menu I need the yourClickFunction
        * because also the main menu shall be clickable !       
        * ****************************************************/</span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span><span class="token class-name">IList</span> myMenu<span class="token punctuation">,</span> <span class="token class-name">ContextMenu</span> parentMenu<span class="token punctuation">,</span> <span class="token class-name">NiceMenuClickEvent</span> yourClickFunction<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">int</span></span> numOldMenu <span class="token operator">=</span> myMenu<span class="token punctuation">.</span>Count<span class="token punctuation">;</span>

            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">MenuItem</span> myMenuItem <span class="token keyword">in</span> myMenu<span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>
                <span class="token comment">// Declaration</span>
                <span class="token class-name">NiceMenu</span> newMainMenu<span class="token punctuation">;</span>

                <span class="token class-name"><span class="token keyword">string</span></span> IndexImage <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">bool</span></span> AddMenuImage <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

                <span class="token comment">/* If in the first two characters of the menu item text 
                * there is a number I set AddMenuImage = true and the 
                * IndexImage to get the icon in the image list control. */</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Length <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    IndexImage <span class="token operator">=</span> myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>Char<span class="token punctuation">.</span><span class="token function">IsNumber</span><span class="token punctuation">(</span>IndexImage<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        AddMenuImage <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        <span class="token comment">// I have to delete first two characters</span>
                        myMenuItem<span class="token punctuation">.</span>Text <span class="token operator">=</span> myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>AddMenuImage <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                    newMainMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">,</span> myMenuItem<span class="token punctuation">.</span>Shortcut<span class="token punctuation">,</span> MenuImages<span class="token punctuation">.</span>Images<span class="token punctuation">[</span>Convert<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span>IndexImage<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    newMainMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NiceMenu</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>Text<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventHandler</span><span class="token punctuation">(</span>yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">,</span> myMenuItem<span class="token punctuation">.</span>Shortcut<span class="token punctuation">)</span><span class="token punctuation">;</span> 

                parentMenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>newMainMenu<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>myModifyContextNiceMenu<span class="token punctuation">[</span>contModifyContext<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    myModifyContextNiceMenu<span class="token punctuation">[</span>contModifyContext<span class="token punctuation">]</span> <span class="token operator">=</span> newMainMenu<span class="token punctuation">;</span>
                    contModifyContext <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span>myMenuItem<span class="token punctuation">.</span>IsParent <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token class-name">IList</span> mySubMenu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Menu<span class="token punctuation">.</span>MenuItemCollection</span><span class="token punctuation">(</span>myMenuItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token function">BuildMenuTree</span><span class="token punctuation">(</span>mySubMenu<span class="token punctuation">,</span> newMainMenu<span class="token punctuation">,</span> yourClickFunction<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// Now I have to delete the old menus</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>numOldMenu<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> 
            <span class="token punctuation">{</span>   parentMenu<span class="token punctuation">.</span>MenuItems<span class="token punctuation">.</span><span class="token function">RemoveAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>曾半仙 2003-9-24 20:37:29</p><blockquote><p>这样好像才是比较像吧....</p></blockquote><p><img src="`+k+'" alt="img2"></p><blockquote><p>你地那个逊了</p></blockquote><p>MengXP 2003-9-24 21:10:23</p><blockquote><p>呵呵~~~~:)</p></blockquote><p>azmore 2003-9-24 21:32:30</p><blockquote><p>我这儿也有一个，嘻嘻</p></blockquote><p><img src="'+i+'" alt="img3"></p><p>eym 2003-9-24 22:18:32</p><blockquote><p>xlfancy<br> 问个愚蠢的问题.......C#的正确发音是什么? 是 c sharp 吗?<br><br> 我怎么听有人 就是发 C# 的音? (我不会拼#的发音)</p></blockquote><p>曾半仙 2003-9-24 22:31:21</p><blockquote><p>微软地呢就是C sharp,不过,有时候必须念C 井</p></blockquote><p>eym 2003-9-25 7:15:01</p><blockquote><p>那在什么情况下念 C 井 呢?</p></blockquote><p>xlfancy 2003-9-25 8:55:19</p><blockquote><p>To:曾半仙、azmore<br><br> 你们两的的确不错，如果是没调用一个 WIN32 API，纯 C# 搞定的，可不可以给出源码或出处？<br><br> 另外，我希望看到的是“没用一个 WIN32 API，纯 C# 搞定”<br><br> 如果是通过调用 WIN32 API 的，哦这还有好几种</p></blockquote><p>曾半仙 2003-9-25 16:56:28</p><blockquote><p>啊????偶的源码是Delphi的,基本上是纯API搞定,没用一个VCL<br> 作界面,用API当然是为了速度,如果改写为纯C#的,我保证在一般性能的机器上都会忽闪忽闪的啊.<br> 忽闪忽闪的意思就象用486跑VB写的skin窗口差不多吧</p></blockquote><p>xlfancy 2003-9-26 9:46:24</p>',32),d=n("br",null,null,-1),y=n("br",null,null,-1),w={href:"http://www.luocong.com/bbs/viewfile.asp?ID=849",target:"_blank",rel:"noopener noreferrer"};function b(M,g){const a=p("ExternalLinkIcon");return o(),e("div",null,[m,n("blockquote",null,[n("p",null,[s("可哦这个C#的，在P II上跑的爽歪歪，就是不会忽闪忽闪的"),d,y,s(" 要是在高性能的G上跑...不信你可看看，执行文件如下（VS 2003版） "),n("a",w,[s("文件"),c(a)])])])])}const f=t(r,[["render",b],["__file","toolbox15.html.vue"]]);export{f as default};
