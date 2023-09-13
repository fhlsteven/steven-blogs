import{_ as n,o as s,c as a,a as t}from"./app-477de5b2.js";const p={},o=t(`<h1 id="在web应用程序中执行计划任务-多线程" tabindex="-1"><a class="header-anchor" href="#在web应用程序中执行计划任务-多线程" aria-hidden="true">#</a> 在Web应用程序中执行计划任务（多线程）</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>你是第29位浏览该文章的人 net_lover   csdn   2003-8-28
作者： 孟宪会 出自： 【孟宪会之精彩世界】 发布日期： 2003-8-26 23:41:13
</code></pre></div><p>在业务复杂的应用程序中，有时候会要求一个或者多个任务在一定的时间或者一定的时间间隔内计划进行，比如定时备份或同步数据库，定时发送电子邮件等，我们称之为计划任务。实现计划任务的方法也有很多，可以采用SQLAgent执行存储过程来实现，也可以采用Windows任务调度程序来实现，也可以使用Windows服务来完成我们的计划任务，这些方法都是很好的解决方案。但是，对于Web应用程序来说，这些方法实现起来并不是很简单的，主机服务提供商或者不能直接提供这样的服务，或者需要你支付许多额外的费用。 本文就介绍一个直接在Web应用程序中使用的简单的方法，这个方法不需要任何额外的配置即可轻松实现。</p><p>由于ASP.NET站点是作为Web应用程序运行的，它并不受线程的限制，因此我们可以非常方便地在Application_Start和Application_End事件中建立和销毁一个计划任务。下面就简单介绍一下在Web站点实现计划任务的方法。我们的例子是定时往文件里添加信息，作为例子，这里把当前的时间定时地写入文件中。</p><p>一个计划任务的工作单元称之为一个任务（Job），下面的代码描述了对所有任务都可以被调度引擎计划执行的一个通用的接口，这里的每个任务实现了Execute方法，供调度引擎进行调用：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ISchedulerJob</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如前所述，我们的例子是实现往文件写如字符日期，下面就是实现这一任务的方法：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SampleJob</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ISchedulerJob</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//文件保存的物理路径，CSTest为虚拟目录名称，F:\\Inetpub\\wwwroot\\CSTest为物理路径</span>
        <span class="token class-name"><span class="token keyword">string</span></span> p <span class="token operator">=</span> <span class="token string">@&quot;F:\\Inetpub\\wwwroot\\CSTest&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//我们在虚拟目录的根目录下建立SchedulerJob文件夹，并设置权限为匿名可修改，</span>
        <span class="token comment">//SchedulerJob.txt就是我们所写的文件</span>
        <span class="token class-name"><span class="token keyword">string</span></span> FILE_NAME <span class="token operator">=</span> p <span class="token operator">+</span> <span class="token string">&quot;\\\\SchedulerJob\\\\SchedulerJob.txt&quot;</span><span class="token punctuation">;</span>
        <span class="token comment">//取得当前服务器时间，并转换成字符串</span>
        <span class="token class-name"><span class="token keyword">string</span></span> c <span class="token operator">=</span> System<span class="token punctuation">.</span>DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token string">&quot;yyyy-mm-dd hh:MM:ss&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//标记是否是新建文件的标量</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token comment">//如果文件不存在，就新建该文件</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>File<span class="token punctuation">.</span><span class="token function">Exists</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token class-name">StreamWriter</span> sr <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">CreateText</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>
            sr<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//向文件写入内容</span>
        <span class="token class-name">StreamWriter</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamWriter</span><span class="token punctuation">(</span>FILE_NAME<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>Encoding<span class="token punctuation">.</span>Default<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>flag<span class="token punctuation">)</span> x<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;计划任务测试开始：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        x<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;\\r\\n&quot;</span> <span class="token operator">+</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        x<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来，我们建立一个配置对象，告诉调度引擎执行什么任务和执行的时间间隔。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SchedulerConfiguration</span>
<span class="token punctuation">{</span>
    <span class="token comment">//时间间隔</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> sleepInterval<span class="token punctuation">;</span>
    <span class="token comment">//任务列表</span>
    <span class="token keyword">private</span> <span class="token class-name">ArrayList</span> jobs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> SleepInterval <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> sleepInterval<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">ArrayList</span> Jobs <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> jobs<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>

    <span class="token comment">//调度配置类的构造函数</span>
    <span class="token keyword">public</span> <span class="token function">SchedulerConfiguration</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> newSleepInterval<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        sleepInterval <span class="token operator">=</span> newSleepInterval<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>下面就是调度引擎，定时执行配置对象的任务</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Scheduler</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">SchedulerConfiguration</span> configuration <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Scheduler</span><span class="token punctuation">(</span><span class="token class-name">SchedulerConfiguration</span> config<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        configuration <span class="token operator">=</span> config<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//执行每一个任务</span>
            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name">ISchedulerJob</span> job <span class="token keyword">in</span> configuration<span class="token punctuation">.</span>Jobs<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name">ThreadStart</span> myThreadDelegate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ThreadStart</span><span class="token punctuation">(</span>job<span class="token punctuation">.</span>Execute<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Thread</span> myThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Thread</span><span class="token punctuation">(</span>myThreadDelegate<span class="token punctuation">)</span><span class="token punctuation">;</span>
                myThread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>configuration<span class="token punctuation">.</span>SleepInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>所有的准备工作已经完成，下面就是激活引擎的工作了。为了让我们的任务计划执行，我们在Global.asax.cs文件里的Applicatio_Start和Application_End里进行建立和销毁工作，首先建立一个调度进程运行的线程，我们这里的运行间隔时间为3秒钟。</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span> schedulerThread <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Application_Start</span><span class="token punctuation">(</span><span class="token class-name">Object</span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">SchedulerConfiguration</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SchedulerConfiguration</span><span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    config<span class="token punctuation">.</span>Jobs<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SampleJob</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Scheduler</span> scheduler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Scheduler</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>ThreadStart</span> myThreadStart <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>ThreadStart</span><span class="token punctuation">(</span>scheduler<span class="token punctuation">.</span>Start<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span> schedulerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread</span><span class="token punctuation">(</span>myThreadStart<span class="token punctuation">)</span><span class="token punctuation">;</span>
    schedulerThread<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后还需要在程序退出时进行销毁：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Application_End</span><span class="token punctuation">(</span><span class="token class-name">Object</span> sender<span class="token punctuation">,</span> <span class="token class-name">EventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">!=</span> schedulerThread<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        schedulerThread<span class="token punctuation">.</span><span class="token function">Abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>好了，在VS.NET里建立一个C#的Web应用程序工程，建立<code>TaskScheduler.cs</code>类，并修改相应的<code>Global.asax.cs</code>文件。为了能看到效果，我们再建立一个表单<code>WebForm1.aspx</code>，定时刷新来检查我们所记录的数据：</p><div class="language-aspx" data-ext="aspx"><pre class="language-aspx"><code>&lt;%@ Page language=&quot;c#&quot; Codebehind=&quot;WebForm1.aspx.cs&quot; AutoEventWireup=&quot;false&quot;
Inherits=&quot;CSTest.WebForm1&quot; %&gt;
&lt;!DOCTYPE HTML PUBLIC &quot;-//W3C//DTD HTML 4.0 Transitional//EN&quot; &gt;
&lt;HTML&gt;
&lt;HEAD&gt;
&lt;title&gt;在Web应用程序中执行计划任务的例子&lt;/title&gt;
&lt;meta http-equiv=&quot;refresh&quot; content=&quot;10&quot;&gt;
&lt;meta name=&quot;GENERATOR&quot; Content=&quot;Microsoft Visual Studio 7.0&quot;&gt;
&lt;meta name=&quot;CODE_LANGUAGE&quot; Content=&quot;C#&quot;&gt;
&lt;meta name=&quot;vs_defaultClientScript&quot; content=&quot;JavaScript&quot;&gt;
&lt;meta name=&quot;vs_targetSchema&quot; content=&quot;http://schemas.microsoft.com/intellisense/ie5&quot;&gt;
&lt;/HEAD&gt;
&lt;body MS_POSITIONING=&quot;GridLayout&quot;&gt;
&lt;form id=&quot;Form1&quot; method=&quot;post&quot; runat=&quot;server&quot;&gt;
&lt;iframe style=&quot;width:100%;height:100%&quot; src=&quot;SchedulerJob/SchedulerJob.txt&quot;&gt;&lt;/iframe&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/HTML&gt;
</code></pre></div><p>对工程进行编译并运行，就可以看到结果了，结果如下：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>计划任务测试开始：
2003-13-10 11:08:15
2003-13-10 11:08:18
2003-13-10 11:08:21
2003-13-10 11:08:24
2003-13-10 11:08:27
2003-13-10 11:08:30
</code></pre></div><p>需要说明的是，以上只是在Web应用程序中执行计划任务的简单例子，对于多个任务来说，需要在不同的线程内进行工作，对计划的安排也是很简单的，实际还需要站点堵塞，当机的情况。另外这里也没有进行错误的处理等工作，相信大家会写出更加完美的代码的。</p>`,21),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","pts17.html.vue"]]);export{i as default};
