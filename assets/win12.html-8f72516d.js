import{_ as p,r as t,o,c as e,b as n,d as s,e as c,a as l}from"./app-f0851ed3.js";const u="/steven-blogs/assets/win12_1-47067dbb.gif",k={},r={id:"窗体间传递复杂数据",tabindex:"-1"},i=n("a",{class:"header-anchor",href:"#窗体间传递复杂数据","aria-hidden":"true"},"#",-1),b={href:"http://www.cnblogs.com/zhenyulu/articles/34044.html",target:"_blank",rel:"noopener noreferrer"},d=l(`<p>源代码下载请点这里</p><p>在设计窗体程序时往往需要相互调用的窗体间传递复杂的数据，有时候甚至需要子窗体修改父窗体的内容。前一阵在博客园中看到很多人讨论这个问题，在海天一鸥《窗体间传值和窗体间互操作》的评论中，我看到有这么几种做法：1）公开一个静态变量；2）在子窗体中创建一个公有字段；3）在父窗体中使用委托与事件；4）将子窗体作为父窗体成员。</p><p>这些办法我感觉都不是特别好，会导致父窗体与子窗体耦合过于紧密，对任何一个窗体的修改需要重新编译另外一个窗体。根据“依赖倒置”的原则，通过引入一个结果对象，就可以避免这种紧耦合，同时也可以传递任意复杂的数据。如果需要在子窗体中改变父窗体状态，也可以在这个结果对象中定义委托与事件来达到目的。我在这里给出我的解决方案。</p><p>首先定义一个结果对象，用来存放子窗体返回的结果。同时定义一些事件，可以让子窗体修改父窗体的状态。代码如下：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">WinParam</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TextChangedHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">cResult</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> Result1 <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> Result2 <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">TextChangedHandler</span> TextChanged<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ChangeText</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>TextChanged <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token function">TextChanged</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>添加一子窗体构造函数，允许接收一结果对象：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name">cResult</span> r<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token function">frmChild</span><span class="token punctuation">(</span><span class="token class-name">cResult</span> r<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token keyword">this</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>r <span class="token operator">=</span> r<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在父窗体中创建子窗体，并订阅cResult事件：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnCallChild_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">cResult</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">cResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    r<span class="token punctuation">.</span>TextChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextChangedHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>EventResultChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">frmChild</span> fc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">frmChild</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
    fc<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    txtCallResult<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;The Result is: &quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span>Result1 <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span>Result2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">EventResultChanged</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> s<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    txtEventResult<span class="token punctuation">.</span>Text <span class="token operator">=</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样确保父窗体知道子窗体，而子窗体不知道父窗体。父窗体改变后不需要重新编译子窗体。同时两个窗体都依赖于结果对象，结果对象的稳定性也决定了父窗体与子窗体关系的稳定性。下面是程序运行结果：</p><p><img src="`+u+`" alt="img12_1"></p><p>注：提供的代码仅仅是功能演示，如果实际使用需要添加一些额外辅助代码（对象释放、取消事件订阅等）。<br> posted on 2004-08-17 10:28 吕震宇 阅读(720) 评论(14)</p><hr><hr><p>2004-08-17 11:19 浪淘沙.xpilot</p><blockquote><p>收藏</p></blockquote><p>2004-08-17 11:34 吕震宇</p><blockquote><p>很怀念Visual FoxPro，上面的这种做法是从VFP提供的数据导航工具条源码中学到的。VFP用这种办法一次返回多个结果。</p></blockquote><p>2004-08-17 12:06 海天一鸥</p><blockquote><p>这个办法真好啊！<br><br> 最近作一个MDA工具的开发，将模型导出为XML，然后用生成器将XML导出为JSP＋serverlet或者 ASP.NET页面。<br><br> 其中 ，建模器是典型的将UI信息转入到后台模型对象，这个过程涉及很多窗体间信息的传递，但都是操作同一个对象。<br><br> 目前为了赶进度，整个框架设计的并不好，冗余代码多，复用的少，解决方案并不好。<br><br> 我希望在1.0版完成后，在下一个版本中，大幅度更改架构：<br> 1.使用 对象管理器 的概念，UI完全与后台XML数据模型对象解偶。<br> 2.对象的序列化功能使用模版方法，因为大多数对象的字段序列化代码都是差不多的，如果有模版方法，可以少写很多代码。<br> 3.改进窗体传值</p></blockquote><p>2004-08-21 16:03 阿森</p><blockquote><p>好东西</p></blockquote><p>2004-08-27 16:49 愚公</p><blockquote><p>收藏</p></blockquote><p>2004-09-03 16:21 寻</p><blockquote><p>收藏</p></blockquote><p>2004-09-03 16:28 寻</p><blockquote><p>好东西</p></blockquote><p>2004-09-20 16:49 千度</p><blockquote><p>好</p></blockquote><p>2004-09-20 16:55 千度</p><blockquote><p>不行，我得多夸两句，这个东西我做了两天还没做出来。真感谢!</p></blockquote><p>2004-10-17 14:48 C#初学</p><blockquote><p>我是初学者，冒昧问一句，这样做跟改变一个变量的值比不是多了好多代码了，这样有什么好处？？</p></blockquote><p>2004-10-17 14:51 C#初学</p><blockquote><p>对象释放、取消事件订阅等这样又是放在什么地方，需要怎么做呢？？</p></blockquote><p>2004-10-17 19:15 吕震宇</p><blockquote><p>@C#初学<br><br> 为了让系统更为稳定，通常程序在编写时都遵循高内聚，松耦合的原则。虽然代码复杂了很多，但保证了松耦合。这样当两个窗体的代码发生变化时，不至于对另外一个窗体产生影响。<br><br> 释放、取消事件订阅通常在子窗体释放时调用。</p></blockquote><p>2004-10-22 09:39 Eric Joe</p><blockquote><p>Ping Back来自：blog.csdn.net<br> Eric Joe引用了该文章,地址:http://blog.csdn.net/qiaov/archive/2004/10/22/146681.aspx</p></blockquote><p>2004-11-09 17:05 新手</p><blockquote><p>真是好</p></blockquote><p>2005-03-29 22:51 nicolas</p><blockquote><p>这种方法早用过，还有内存共享，比如memo，剪贴板等</p></blockquote><p>2005-03-29 23:00 nicolas</p><blockquote><p>唯一缺陷就是缺少内敛性，就是说一个类的对象的一些属性或者方法需要其他类的对象来控制实现，这也是低级错误的根源。比如用户忘了调用该方法，他也不会知道错在哪里，呵呵，其实最好的方法是创建一个线程来监视窗体间的交互，好比警察一样，这样对象之间的交互比较自然，就好象经济活动需要税务局，社会治安需要警察一样，呵呵</p></blockquote><p>2005-04-20 12:12 stef</p><blockquote><p>非常棒的方法</p></blockquote><p>2005-07-11 09:27 jhtchina</p><blockquote><p>学习</p></blockquote><p>2005-08-15 22:50 IT</p><blockquote><p>还有其他方法</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Form2</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">From</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">Form</span> frm<span class="token punctuation">;</span>
    <span class="token function">Form2</span><span class="token punctuation">(</span><span class="token class-name">Form</span> _frm<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        frm<span class="token operator">=</span>_frm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">button_click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        frm<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;传出数据&quot;</span><span class="token punctuation">;</span><span class="token comment">//能改变Form1的Text属性</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>Form1的调用</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Form1</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">From</span></span>
<span class="token punctuation">{</span>
    <span class="token function">button_click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Form2</span> frm<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这里的this指针特别重要啊</span>
        frm<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>2005-08-15 22:51 IT</p><blockquote><p>上边的兄弟是用了事件的方法</p></blockquote><p>2005-08-16 13:45 <strong>吕震宇</strong></p><blockquote><p>@IT<br><br> 这种方法确实可以实现窗体间参数的传递，但也会面临一些问题：<br><br> 1、两窗体耦合过于紧密<br> 2、参数传递的类型是Form，这导致如果你希望调用一自定义窗体例如MyForm，必须修改参数类型，否则MyForm中的自定义属性是无法访问的。如此导致系统弹性不足。</p></blockquote><p>2005-10-19 11:37 pdy</p><blockquote><p>我也使用<br> ++++++++++++++++++++++<br> 还有其他方法</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Form2</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">From</span></span>
<span class="token punctuation">{</span>
    <span class="token class-name">Form</span> frm<span class="token punctuation">;</span>
    <span class="token function">Form2</span><span class="token punctuation">(</span><span class="token class-name">Form</span> _frm<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        frm<span class="token operator">=</span>_frm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">button_click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        frm<span class="token punctuation">.</span>Text<span class="token operator">=</span><span class="token string">&quot;传出数据&quot;</span><span class="token punctuation">;</span><span class="token comment">//能改变Form1的Text属性</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>Form1的调用</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">Form1</span><span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">From</span></span>
<span class="token punctuation">{</span>
    <span class="token function">button_click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">Form2</span> frm<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这里的this指针特别重要啊</span>
        frm<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>++++++++++++++++++++++<br> 简单不是挺好吗？<br> 有什么缺陷？</p></blockquote><p>2005-10-20 10:57 <strong>吕震宇</strong></p><blockquote><p>@pdy<br><br> 我认为这种做法尽管可行，但还是存在很多缺陷：<br><br> 1）回传数据用的是Form.Text属性，这样就限制了回传的数据类型只能是字符串形，尽管可以强制类型转换，但总有Bad Smell在里面。<br><br> 2）Form.Text属性是用来控制窗体的标题的，现在却被拿作它用，你总不会希望调用一个子窗体后，主窗体的标题发生变化吧？为什么不用Tag属性呢，至少要比Text强。<br><br> 3）注意Form2的构造函数：<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token function">Form2</span><span class="token punctuation">(</span><span class="token class-name">Form</span> _frm<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    frm<span class="token operator">=</span>_frm<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>你接受的是一个Form类型的数据，因此通过frm属性，只能对Form类提供的属性方法进行操作，如果你想修改Form1里面某个TextBox中的值恐怕就无能为力了。<br><br> 4）当然，你可以更改构造函数，接受某个SpecialForm类型，但这时两个窗体的耦合就过于紧密，当SpecialForm发生变化，就不得不重新编译Form2。<br><br> 5）如果你希望回传多个复杂数据，并且数据无法串行化成XML，这种做法无能为力<br><br> 6）如果你希望实时联动，就像你修改了属性窗口的值，对应控件的形态也随之发生变化一样，这种做法无能为力<br><br> 等等，因此，我认为这种做法在系统规模小，应用简单的情况下可以使用Tag属性传递数据，但在复杂应用下，尽量避免这种做法。</p></blockquote><p>2005-10-20 16:37 howcanido</p><blockquote><p>good ! 另外还有一个方法：<br> 在frmParent中声明frmCHild<br><code>child = new FrmChild();</code><br><code>child.showdialog();</code><br> 在frmChild中也可以声明一个frmParent<br><code>parent = new frmParent();</code><br><code>parent.xx =....</code><br> 其实parent和Application创建的parent是一个东西吧，只不过new了两次，</p></blockquote><p>2005-10-21 14:05 howcanido</p><blockquote><p>上面的方法有问题，两个parent要“＝”一下，不是好办法：）</p></blockquote><p>2006-02-15 16:49 wangdewind</p><blockquote><p>不错 支持</p></blockquote><p>2006-02-15 20:14 吕震宇</p><blockquote><p>@howcanido<br><br> new了两次就是两个对象了。修改其中一个实例的属性，另外一个实例是不知道的。除非使用静态属性，但这几乎和全局变量的做法没有什么区别，我不建议使用。</p></blockquote><p>2006-04-24 10:48 我本善良2</p><blockquote><p>隔离2个form对象，通过cResult对象关联他们之间的关系，巧妙的使用event ，动态的取得改变的结果，并执行相应处理，真的是很优雅<br> 谢谢老师，受益匪浅</p></blockquote><p>2006-07-21 15:39 xc#</p><blockquote><p>感觉这两个窗体间传递数据的接口应该不是&quot;易变的吧&quot;,暂时还没感受到这样做的好处</p></blockquote><p>2006-09-11 18:23 tom[匿名]</p><blockquote><p>用单选钮的CheckedChanged事件，会多执行一次操作。比如先选择Show &quot;One&quot;，然后又选择Show &quot;Two&quot;。这时，Show &quot;One&quot;的事件又要执行一次了。不如直接使用Click事件。<br><br> 这种方法不错，多谢！</p></blockquote><p>2006-11-01 17:09 何鑫</p><blockquote><p>窗体终究只是“表示”。为什么不用MVC？</p></blockquote><p>2007-01-08 16:21 bill024</p><blockquote><p>收藏！啊</p></blockquote><p>2007-03-07 23:49 czj_earth</p><blockquote><p>我以为 结果对象　中用　object 代替 string 成员是否更好！<br><br> 毕竟 窗体中传的是未知的 复杂的数据,<br><br> 而且这样的话，可以使用 BaseForm 基类来统一处理。</p></blockquote><p>2007-08-02 10:25 阿伟</p><blockquote><p>此方法只适用于，这个子窗体仅供一个父窗体使用，不能解决多个父窗体共同使用一个子窗体的问题</p></blockquote><p>2007-09-05 15:50 vevi</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//=======</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">btnCallChild_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">cResult</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">cResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    r<span class="token punctuation">.</span>TextChanged <span class="token operator">+=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TextChangedHandler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>EventResultChanged<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">frmChild</span> fc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">frmChild</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
    fc<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    txtCallResult<span class="token punctuation">.</span>Text <span class="token operator">=</span> <span class="token string">&quot;The Result is: &quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span>Result1 <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> r<span class="token punctuation">.</span>Result2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//============</span>
</code></pre></div><blockquote><p>在上面的事件中你又new了一个cResult--r，那么它就应该和原来的WinForm不是一个对象，但是在cResult类中new一个自己，这样可以吗？</p></blockquote><p>2007-09-05 16:05 vevi</p><blockquote><p>不好意思，刚才没看你的程序，看了以后明白了。<br><code>---------</code><br> 但是本人觉得委托，绕来绕去的比较麻烦。想来c++的指针也就是这个样子吧。</p></blockquote><p>2007-11-06 19:04 张张</p><blockquote><p>其实是mvc的一个精简本，使用mvc本身就可以避免此问题？</p></blockquote><p>2007-11-06 19:06 张张</p><blockquote><p>当然这种方法更好，在mvc中可以采用观察者模式，是没有问题的，我很久已经实现了</p></blockquote><p>2008-02-09 21:18 goldant</p><blockquote><p>如果一个主窗口对应着多个子窗口怎么解决?不会要N个中间态吧?我就碰到这种问题,不知如何解决</p></blockquote><p>2008-02-20 17:15 <strong>吕震宇</strong></p><blockquote><p>@goldant<br> 如果真是这样的话，我觉得就需要一个自建的MessageService来协调多个窗体间的通讯了。毕竟传递消息与交换数据并不完全一样。</p></blockquote><p>2008-02-26 11:20 jazz</p><blockquote><p>你好，我是初学者，我看了代码，为什么点击子窗体的确定后，子窗体也会关闭呢。请指教。</p></blockquote><p>2008-03-25 20:50 VB.NET学习者</p><blockquote><p>您好！我是一个新手，现在学习VB.net。今天我花了很大的功夫，才把您的代码翻译成vb.net的。正在学习中……<br> 不过我遇到的问题是，将主窗体的结果传递给子窗体。是否也适合用这种方法呢？<br> 谢谢！</p></blockquote><p>2008-06-16 23:11 gfxtdm</p><blockquote><p>我看就使用观察者模式</p></blockquote><p>2008-06-20 00:23 StephenJu</p><blockquote><p>非常不错！</p></blockquote><p>2008-07-04 02:27 yellowyu</p><blockquote><p>想问一下楼主,我的程序里面现在出现好多好多事件,多的时候一个窗体里面可能包含着十多个委托事件,通过发消息传递,我想知道,发生这种情况,我该怎么去管理我这些事件呢!<br><br> 因为我现在基本上每个事件,都写一个委托,实在想不出什么好解决的办法,谢谢</p></blockquote><p>2009-07-23 19:02 青狐</p><blockquote><p>@ jazz<br> 因为楼主把那个按钮的DialogResult设成ok啦，就相当于返回结果为点了ok确定，所以会关闭自己</p></blockquote><p>2009-08-19 14:52 Funeral</p><blockquote><p>我一般都是用伪缓存</p></blockquote><p>2011-09-15 12:00 莫为然</p><blockquote><p>非常不错！<br> 学习了。</p></blockquote><p>2014-08-14 22:54 蒲苇吥弃</p><blockquote><p>相当不错呀，刚好项目中用到</p></blockquote>`,123);function m(q,g){const a=t("ExternalLinkIcon");return o(),e("div",null,[n("h1",r,[i,s(),n("a",b,[s("窗体间传递复杂数据"),c(a)])]),d])}const w=p(k,[["render",m],["__file","win12.html.vue"]]);export{w as default};