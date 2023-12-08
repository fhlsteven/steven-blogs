import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="windows-控件限制用户的基本法门-net-篇" tabindex="-1"><a class="header-anchor" href="#windows-控件限制用户的基本法门-net-篇" aria-hidden="true">#</a> Windows 控件限制用户的基本法门(.NET 篇)</h1><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">/******************************************************************
         Windows 控件限制用户的基本法门(.NET 篇)
                C#.NET 的在下面 
-------------------------------------------------------------------

     本代码演示 控制用户的输入的基本方式（屏蔽非数字字符输入）

     .net 下限制用户输入，看见很多人是在 键盘，或 textBox 的 TextChanged 事件里做

     个人认为那样是不正确的，

     1.不能限制用户的粘贴
     2.严重干扰数据绑定等操作
     3.有时还需要备份原始数据进行还原   

     其实正确的限制输入的时机是在,windows 消息 WM_CHAR 触发时
     但.net 恰恰没有提供这个消息的事件映射.怎么办?     

     提供方案两列:    

     1)继承TextBox 重写 WndProc 函数 (优点点oo编程的优点我不说了)

        处理

            if (m.Msg==WM_CHAR){
                // 然后取 m.WParam 进行判断 m.WParam 就是用户输入的字符的 int 表示方式
                // 如果是被限制的字符 直接 Return
                // 不走 base.WndProc (ref m);
            }
            if(m.Msg==WM_PASTE)
            {
                //判断剪贴板的数据是否是符合要求如果符合不做任何处理
                //否则 Return 不走默然处理即可
            }

            base.WndProc (ref m);

     2)利用API SetWindowLong 替换默认的处理消息的函数进行处理

       本文写的就是这种 ,演示如何声明API 而且本方法很多语言都可以使用,
       但如果程序中有多个需要限制输入的控件而且相做通用类库的话
       使用建议使用方案一

废话不多说了看代码吧.
*******************************************************************/</span>

<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Drawing</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>ComponentModel</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Runtime<span class="token punctuation">.</span>InteropServices</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">SETWNDPROC</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// Form1 的摘要说明。</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Form1</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>Form</span></span>
    <span class="token punctuation">{</span>
        <span class="token comment">//声明一个委托</span>
        <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">NewWndProc</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> msg<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> wParam<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//API 具体帮助请察看 MSDN 或到 MS 网站上去找</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">SetWindowLong</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nIndex<span class="token punctuation">,</span> <span class="token class-name">NewWndProc</span> wndproc<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">SetWindowLong</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nIndex<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> dwNewLong<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//没用到</span>
        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">GetWindowLong</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> nIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DllImport</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;user32.dll&quot;</span><span class="token punctuation">,</span> CharSet <span class="token operator">=</span> CharSet<span class="token punctuation">.</span>Auto<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">extern</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">CallWindowProc</span><span class="token punctuation">(</span><span class="token class-name">IntPtr</span> wndProc<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> hWnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> msg<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> wParam<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//SetWindowLong 用的常数，不知道什么意识的去看 msdn吧</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> GWL_WNDPROC <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">;</span>

        <span class="token comment">//右键菜单消息</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_CONTEXTMENU <span class="token operator">=</span> <span class="token number">0x007b</span><span class="token punctuation">;</span>

        <span class="token comment">//粘贴消息</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_PASTE <span class="token operator">=</span> <span class="token number">0x0302</span><span class="token punctuation">;</span>

        <span class="token comment">//输入字符消息（键盘输入的，输入法输入的好像不是这个消息）</span>
        <span class="token keyword">public</span> <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> WM_CHAR <span class="token operator">=</span> <span class="token number">0x0102</span><span class="token punctuation">;</span>

        <span class="token comment">//一定要声明为实列变量否则，局部变量发送给API后很容易被_u71 ?C 回收，</span>
        <span class="token comment">//会出现根本无法捕获的异常</span>
        <span class="token keyword">private</span> <span class="token class-name">NewWndProc</span> wpr <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token comment">//备份的默然处理函数</span>
        <span class="token keyword">private</span> <span class="token class-name">IntPtr</span> oldWndProc <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span> textBox1<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 必需的设计器变量。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token class-name">System<span class="token punctuation">.</span>ComponentModel<span class="token punctuation">.</span>Container</span> components <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//</span>
            <span class="token comment">// Windows 窗体设计器支持所必需的</span>
            <span class="token comment">//</span>
            <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//</span>
            <span class="token comment">// TODO: 在 InitializeComponent_u-29693 ?用后添加任何构造函数代码</span>
            <span class="token comment">//</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 清理所有正在使用的资源。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
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

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> Windows 窗体设计器生成的代码</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 设计器支持所需的方法 - 不要使用代码编辑器修改</span>
        <span class="token doc-comment comment">/// 此方法的内容。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitializeComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">SuspendLayout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// textBox1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Point</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;textBox1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;555&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">.</span>TextAlign <span class="token operator">=</span> System<span class="token punctuation">.</span>Windows<span class="token punctuation">.</span>Forms<span class="token punctuation">.</span>HorizontalAlignment<span class="token punctuation">.</span>Right<span class="token punctuation">;</span>
            <span class="token comment">// </span>
            <span class="token comment">// Form1</span>
            <span class="token comment">// </span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>AutoScaleBaseSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ClientSize <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Drawing<span class="token punctuation">.</span>Size</span><span class="token punctuation">(</span><span class="token number">152</span><span class="token punctuation">,</span> <span class="token number">53</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Controls<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>textBox1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;Form1&quot;</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Load <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Form1_Load<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>Closed <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>EventHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Form1_Closed<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">ResumeLayout</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token doc-comment comment">/// 应用程序的主入口点。</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
        <span class="token punctuation">[</span>STAThread<span class="token punctuation">]</span>
        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Application<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name">IntPtr</span> <span class="token function">TextBoxWndProc</span><span class="token punctuation">(</span><span class="token class-name">IntPtr_u104<span class="token punctuation">?</span></span> Wnd<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> msg<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> wParam<span class="token punctuation">,</span> <span class="token class-name">IntPtr</span> lParam<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name">IntPtr</span> returnVar <span class="token operator">=</span> IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">;</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//粘贴消息包括 Ctrl+V Or 右键菜单粘贴</span>
                <span class="token keyword">case</span> WM_PASTE<span class="token punctuation">:</span>
                    <span class="token comment">//取剪贴板对象</span>
                    <span class="token class-name">IDataObject</span> iData <span class="token operator">=</span> Clipboard<span class="token punctuation">.</span><span class="token function">GetDataObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//判断是否是Text</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>iData<span class="token punctuation">.</span><span class="token function">GetDataPresent</span><span class="token punctuation">(</span>DataFormats<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token comment">//取数据</span>
                        <span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">;</span>
                        str <span class="token operator">=</span> <span class="token punctuation">(</span>String<span class="token punctuation">)</span>iData<span class="token punctuation">.</span><span class="token function">GetData</span><span class="token punctuation">(</span>DataFormats<span class="token punctuation">.</span>Text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">/*
                          如果需要正负号，先要判断TextBox 上光标的位置
                          如果光标在最前面可以用这个，^(((\\+|-)\\d)?\\d*)$ 
                          下面的 WM_CHAR 也要做相应变化
                        */</span>
                        <span class="token comment">//如果是数字(可以粘贴跳出)</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>Regex<span class="token punctuation">.</span><span class="token function">IsMatch</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">@&quot;^(\\d{1,})$&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">//不可以粘贴</span>
                    <span class="token keyword">return</span> <span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> WM_CHAR<span class="token punctuation">:</span>
                    <span class="token class-name"><span class="token keyword">int</span></span> keyChar <span class="token operator">=</span> wParam<span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    Debug<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>keyChar<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">bool</span></span> charOk <span class="token operator">=</span> <span class="token punctuation">(</span>keyChar <span class="token operator">&gt;</span> <span class="token number">47</span> <span class="token operator">&amp;&amp;</span> keyChar <span class="token operator">&lt;</span> <span class="token number">58</span><span class="token punctuation">)</span> <span class="token operator">||</span>   <span class="token comment">//数字</span>
                         keyChar <span class="token operator">==</span> <span class="token number">8</span> <span class="token operator">||</span>                                 <span class="token comment">//退格</span>
                         keyChar <span class="token operator">==</span> <span class="token number">3</span> <span class="token operator">||</span> keyChar <span class="token operator">==</span> <span class="token number">22</span> <span class="token operator">||</span> keyChar <span class="token operator">==</span> <span class="token number">24</span><span class="token punctuation">;</span><span class="token comment">//拷贝,粘贴,剪切</span>
                    <span class="token comment">//如果不是需要的的字符 wParam 改为字符 0</span>
                    <span class="token comment">//return (IntPtr)0; 也行不过没有禁止输入的 键盘音</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>charOk<span class="token punctuation">)</span> wParam <span class="token operator">=</span> <span class="token punctuation">(</span>IntPtr<span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token comment">//禁止右键菜单（如果需要的话）</span>
                    <span class="token comment">//case WM_CONTEXTMENU:</span>
                    <span class="token comment">//return (IntPtr)0;</span>
            <span class="token punctuation">}</span>
            
            <span class="token comment">//回调备份的默认处理的函数</span>
            returnVar <span class="token operator">=</span> <span class="token function">CallWindowProc</span><span class="token punctuation">(</span>oldWndProc<span class="token punctuation">,</span> hWnd<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> wParam<span class="token punctuation">,</span> lParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> returnVar<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//备份默认处理函数</span>
            <span class="token comment">//oldWndProc=GetWindowLong(textBox1.Handle,GWL_WNDPROC);</span>
            <span class="token comment">//实列化委托（这里就是回调函数）</span>
            wpr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NewWndProc</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>TextBoxWndProc<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//替换控件的默认处理函数（并且返回原始的 默认处理函数,是一个函数指针的地质）</span>
            oldWndProc <span class="token operator">=</span> <span class="token function">SetWindowLong</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Handle<span class="token punctuation">,</span> GWL_WNDPROC<span class="token punctuation">,</span> wpr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form1_Closed</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//还原默认处理函数</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>oldWndProc<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>IntPtr<span class="token punctuation">.</span>Zero<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token function">SetWindowLong</span><span class="token punctuation">(</span>textBox1<span class="token punctuation">.</span>Handle<span class="token punctuation">,</span> GWL_WNDPROC<span class="token punctuation">,</span> oldWndProc<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不错,引自 FlashElf 的文章<br><code>http://blog.csdn.net/flashelf/archive/2004/10/31/161024.aspx</code></p>`,3),c=[o];function e(l,k){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","progmif8.html.vue"]]);export{i as default};
