import{_ as n,o as s,c as a,a as o}from"./app-a2b6e588.js";const t={},p=o(`<h1 id="请教-如何多个窗口之间传递参数" tabindex="-1"><a class="header-anchor" href="#请教-如何多个窗口之间传递参数" aria-hidden="true">#</a> 请教：如何多个窗口之间传递参数</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  请教：如何多个窗口之间传递参数？
作　　者：  uscool (小小风)
等　　级：  ^
信 誉 值：  100
所属论坛：  .NET技术 C#
问题点数：  50
回复次数：  11
发表时间：  2003-12-05 08:28:04
</code></pre></div><p>如：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">main_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Window<span class="token punctuation">.</span>welcome</span> welcome<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Window<span class="token punctuation">.</span>welcome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    welcome<span class="token punctuation">.</span>Location<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    welcome<span class="token punctuation">.</span>ShowInTaskbar<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>
    welcome<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>WindowState <span class="token operator">=</span> FormWindowState<span class="token punctuation">.</span>Maximized<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>ShowInTaskbar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我想得到welcome窗体运行后返回的结果来判断是否登陆该怎么做？还有如果有多个数据传送又该怎么传送数据？谢谢！我是新手，最好能给个例子！非常感谢！</p><hr><hr><p>回复人： mableboy() ( 一级(初级)) 信誉：100 2003-12-05 08:44:00 得分:0</p><blockquote><p>你可以定义 public static 类型的变量！</p></blockquote><p>回复人： KentYu(恳鱼) ( 二级(初级)) 信誉：100 2003-12-05 08:45:00 得分:0</p><blockquote><p>http://expert.csdn.net/Expert/topic/2506/2506557.xml?temp=.4740564<br> http://expert.csdn.net/Expert/topic/2493/2493260.xml?temp=.9665644<br> 都可以实现：）</p></blockquote><p>回复人： JoeM(Tao) ( 三级(初级)) 信誉：100 2003-12-05 08:46:00 得分:0</p><blockquote><p>在多个窗口定义<code>internal</code>或<code>public</code>借口<br> eg:<br> Form2中定义<br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">123456</span><span class="token punctuation">;</span> <span class="token comment">// the value that you want to return.</span>
<span class="token punctuation">}</span><span class="token comment">//方法.</span>
</code></pre></div><blockquote><p>在Form1中 <code>Form2 frm2 = new Form2();</code><br><code> frm2.ShowDialog();</code><br><code> int retVal = frm2.getResult();</code></p></blockquote><p>回复人： KentYu(恳鱼) ( 二级(初级)) 信誉：100 2003-12-05 08:47:00 得分:0</p><blockquote><p>mableboy() 说的不错，定义public static类型的变量，不需要form的实例。</p></blockquote><p>回复人： saucer(思归) ( 五星(高级)) 信誉：335 2003-12-05 08:49:00 得分:0</p><blockquote><p>expose some property from welcome form, say Login and Password</p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">class</span> <span class="token class-name">welcome</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Form</span></span>
<span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Login
   <span class="token punctuation">{</span>
     <span class="token keyword">get</span> <span class="token punctuation">{</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
     <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Password
   <span class="token punctuation">{</span>
     <span class="token keyword">get</span> <span class="token punctuation">{</span><span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
     <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token range operator">..</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">main_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Window<span class="token punctuation">.</span>welcome</span> welcome<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Window<span class="token punctuation">.</span>welcome</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    welcome<span class="token punctuation">.</span>Location<span class="token operator">=</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    welcome<span class="token punctuation">.</span>ShowInTaskbar<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>DialogResult<span class="token punctuation">.</span>OK <span class="token operator">==</span> welcome<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> sLogin <span class="token operator">=</span> welcome<span class="token punctuation">.</span>Login<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">string</span></span> sPassword <span class="token operator">=</span> welcome<span class="token punctuation">.</span>Password<span class="token punctuation">;</span>
        <span class="token comment">//do you login here</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>WindowState <span class="token operator">=</span> FormWindowState<span class="token punctuation">.</span>Maximized<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>ShowInTaskbar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： mableboy() ( 一级(初级)) 信誉：100 2003-12-05 08:49:00 得分:0</p><blockquote><p>你在welcome对话框中的button的DialogResult属性中可以选择他被按下后的返回值的，比如返回&quot;OK&quot;.<br> 然后在你调用他的函数中这么写<br><br></p></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">if</span><span class="token punctuation">(</span> welcome<span class="token punctuation">.</span><span class="token function">ShowDialog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span>DialogResult<span class="token punctuation">.</span>OK<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre></div><p>回复人： uscool(小小风) ( 一级(初级)) 信誉：100 2003-12-05 09:29:00 得分:0</p><blockquote><p>非常感谢！但是定义public static类型的变量该怎么定义阿？我在main主窗体定义后，在welcome窗体里不能调用（也是）！如何来作？谢谢！</p></blockquote><p>回复人： zhengguoc(爱之海洋) ( 二级(初级)) 信誉：100 2003-12-05 09:47:00 得分:0</p><blockquote><p>上面方法有点小题大作<br> 这样：<br> 在<code>Window.welcome welcome=new Window.welcome();</code><br> 中加入参数变为<br><code>Window.welcome welcome=new Window.welcome(ref string val);</code><br> 或<br><code>Window.welcome welcome=new Window.welcome(out string val);</code><br> 在welcom类的构造函数中，接入这个参数，退出welcom类时改变<br> val为相应的值。<br> 之后你就收到从welcom传递来的参数值了就是val</p></blockquote><p>回复人： yqydaful(无边落木) ( 一级(初级)) 信誉：100 2003-12-05 10:02:00 得分:0</p><blockquote><ol><li>要定义public static类型的变量，可以先创建一个静态的类，再在这个类中定义一些公共的变量，以备在不同的窗体中使用。</li><li>第二个方法 是在窗口中定义一些公共属性或方法，用于传递参数据用</li><li>第三个方法 同楼上差不多，是在窗体的构造函数中定义一些参数</li></ol></blockquote><p>回复人： zhengguoc(爱之海洋) ( 二级(初级)) 信誉：100 2003-12-05 10:06:00 得分:0</p><blockquote><p>最好不要用全局变量，静态变量，这样容易产生逻辑混乱，聚合性不好<br> 也不易读。<br> 最好用我说的方法，也就是楼上的第三种方法。</p></blockquote><p>回复人： qiaobaba(一路坎杀) ( 三级(初级)) 信誉：100 2003-12-05 10:08:00 得分:0</p><blockquote><p>此类问题我已回过贴<br><br> 最简单的方法你可以设welcome.tag属性，在welcome.ShowDialog();后检查，其它方法见：<br> http://expert.csdn.net/Expert/topic/2491/2491396.xml?temp=.1861994</p></blockquote>`,33),e=[p];function c(l,u){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","win2.html.vue"]]);export{i as default};
