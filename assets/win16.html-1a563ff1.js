import{_ as n,o as s,c as a,a as p}from"./app-a2b6e588.js";const t="/steven-blogs/assets/win16_1-3983dea4.png",o="/steven-blogs/assets/win16_2-8fce89d9.png",e="/steven-blogs/assets/win16_3-a685260d.png",c={},l=p('<h1 id="用vc-编写仿msn-messager的滚动提示窗口" tabindex="-1"><a class="header-anchor" href="#用vc-编写仿msn-messager的滚动提示窗口" aria-hidden="true">#</a> 用VC#编写仿MSN Messager的滚动提示窗口</h1><h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h2><p>大家一定都用过MSN Messager了吧？每当有新邮件或者是新消息到来的时候，MSN Messager便会从右下角升起一个小窗口提醒您，然后又降下去。当你在聚精会神的在电脑上做一件事的时候，一定不会喜欢突然被&quot;咚&quot;一下出现在屏幕中心的对话框打扰，它的这种设计不但非常体贴用户，而且效果还很酷。如果您写了一个程序驻留在后台并要求在需要的时候会提醒用户，并且希望也能实现这种效果，那么请跟我一步一步来做下图所示的这个仿MSN Messager的滚动提示窗口。</p><hr><h2 id="实现方法" tabindex="-1"><a class="header-anchor" href="#实现方法" aria-hidden="true">#</a> 实现方法</h2><p>效果示例图</p><p><img src="'+t+'" alt="win16_1"></p><p><strong>第一步</strong>，建立一个Windows Application，然后在主form中放置一个Button，如下图所示：</p><p><img src="'+o+'" alt="win16_2"></p><p><strong>第二步</strong>，给这个Application添加一个窗体（Form2），</p><p>把窗体的<code>FormBorderStyle=None</code>（无边框模式），</p><p>然后把<code>TopMost=True</code>，</p><p>把<code>ShowInTaskbar=False</code>(是否在 Windows 任务栏中显示窗体)，</p><p>并在窗体上加上你打算要显示的文字（实际应用中一般是在程序中动态加载），</p><p>将窗体的背景设置为你想要的图片和合适的大小。</p><p>最后再放上三个Timer控件，</p><p>其中，timer1控制窗体滚出的动画，</p><p>timer2控制窗体停留时间，</p><p>timer3控制窗体的滚入动画，将它们的Interval属性设置为10。参见下图</p><p><img src="'+e+`" alt="win16_3"></p><p><strong>第四步</strong>，编写代码，在Form2中添加两个属性用来设置窗体的显示大小：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> heightMax<span class="token punctuation">,</span> widthMax<span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> HeightMax
<span class="token punctuation">{</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        heightMax <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> heightMax<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> WidthMax
<span class="token punctuation">{</span>
    <span class="token keyword">set</span>
    <span class="token punctuation">{</span>
        widthMax <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">get</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> widthMax<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//添加一个ScrollShow的公共方法：</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ScrollShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Width <span class="token operator">=</span> widthMax<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Height <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//添加一个StayTime属性设置窗体停留时间（默认为5秒）：</span>
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> StayTime <span class="token operator">=</span> <span class="token number">5000</span><span class="token punctuation">;</span>

<span class="token comment">//添加ScrollUp和ScrollDown方法来编写窗体如何滚出和滚入：</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ScrollUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Height <span class="token operator">&lt;</span> heightMax<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Height <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span>X<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span>Y <span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer1<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer2<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ScrollDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Height <span class="token operator">&gt;</span> <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Height <span class="token operator">-=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span>X<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>Location<span class="token punctuation">.</span>Y <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer3<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">//在三个Timer的Tick方法中分别写入：</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer1_Tick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">ScrollUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer2_Tick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    timer2<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    timer3<span class="token punctuation">.</span>Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">timer3_Tick</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">ScrollDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在Form2的Load事件中初始化窗体变量：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Form2_Load</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Screen<span class="token punctuation">[</span><span class="token punctuation">]</span></span> screens <span class="token operator">=</span> Screen<span class="token punctuation">.</span>AllScreens<span class="token punctuation">;</span>
    <span class="token class-name">Screen</span> screen <span class="token operator">=</span> screens<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//获取屏幕变量</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>Location <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Point</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span>WorkingArea<span class="token punctuation">.</span>Width <span class="token operator">-</span> widthMax <span class="token operator">-</span> <span class="token number">20</span><span class="token punctuation">,</span> screen<span class="token punctuation">.</span>WorkingArea<span class="token punctuation">.</span>Height <span class="token operator">-</span> <span class="token number">34</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//WorkingArea为Windows桌面的工作区</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>timer2<span class="token punctuation">.</span>Interval <span class="token operator">=</span> StayTime<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，滚动窗体的代码编写到这里就完成了，当然，它本身只实现了一个比较简单的窗体滚动滚出效果，具体如何去应用还应该配合你的程序来完成。当然，你还可以为它添加更多的功能，比如从窗体的任意位置显示（这里只是从右下角显示），淡入淡出效果，加上声音等等。最常用的就是写一个托盘程序，然后采用这种提醒效果。如何用Ｃ＃编写托盘程序请参见：用Visual C#做托盘程序http://www.yesky.com/20020110/213425.shtml</p><p>最后，我们再回到Form1，在Button的Click事件中写如下代码来测试一下效果：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">button1_Click</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">System<span class="token punctuation">.</span>EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Form2</span> form <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Form2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    form<span class="token punctuation">.</span>HeightMax <span class="token operator">=</span> <span class="token number">120</span><span class="token punctuation">;</span><span class="token comment">//窗体滚动的高度</span>
    form<span class="token punctuation">.</span>WidthMax <span class="token operator">=</span> <span class="token number">148</span><span class="token punctuation">;</span><span class="token comment">//窗体滚动的宽度</span>
    form<span class="token punctuation">.</span><span class="token function">ScrollShow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>编译并运行程序，点击按纽，怎么样？是不是跟MSN Messager的效果一样，很酷吧？：）</p>`,28),k=[l];function u(i,r){return s(),a("div",null,k)}const m=n(c,[["render",u],["__file","win16.html.vue"]]);export{m as default};
