import{_ as n,o as s,c as a,a as t}from"./app-d9da1b6d.js";const p={},o=t(`<h1 id="c-的系统调用-控制面板中的选项" tabindex="-1"><a class="header-anchor" href="#c-的系统调用-控制面板中的选项" aria-hidden="true">#</a> C#的系统调用：控制面板中的选项</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>主　　题：  [推荐]C#的系统调用：控制面板中的选项。
作　　者：  cocosoft (pengyun)
等　　级：  ^^
信 誉 值：  116
所属论坛：  .NET技术 C#
问题点数：  0
回复次数：  23
发表时间：  2003-4-18 22:59:37
</code></pre></div><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Internet选项：                    inetcpl.cpl
ODBC数据源管理：                  odbccp32.cpl
电话和调制解调器选项：            telephon.cpl
电源选项：                        powercfg.cpl
辅助功能选项：                    access.cpl
区域和语言选项：                  intl.cpl
日期和时间：                      timedate.cpl
声音和音频设备：                  mmsys.cpl
鼠标：                            main.cpl
添加或删除程序：                  appwiz.cpl
添加硬件：                        hdwwiz.cpl
网络连接：                        ncpa.cpl
系统：                            sysdm.cpl
显示：                            desk.cpl
用户帐户：                        nusrmgr.cpl
游戏控制器：                      joy.cpl
语音：                            sapi.cpl
字体：                            Fonts
</code></pre></div><p>这些是常用的控制面板中的选项。</p><p>我们在C#中可以用以下方式打开操作：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span><span class="token comment">//在调用命名空间时调用。</span>
<span class="token comment">//在事件处理中我们可以采用如下方式：</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;[带上以上的文件名全称]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Win32Exception</span> win32ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;出错原因：&quot;</span><span class="token operator">+</span>win32ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span><span class="token string">&quot;出错&quot;</span><span class="token punctuation">,</span>MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span>MessageBoxIcon<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><hr><hr><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-4-19 0:08:18 得分:0</p><blockquote><p>在以后，我将推出更多的关于系统或其它控件的学习总结，希望大家批评指正。</p></blockquote><p>回复人： fyfok(饿人谷) ( 一级(初级)) 信誉：100 2003-4-22 0:23:31 得分:0</p><blockquote></blockquote><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Diagnostics</span><span class="token punctuation">;</span><span class="token comment">//在调用命名空间时调用。</span>
<span class="token comment">//在事件处理中我们可以采用如下方式：</span>
<span class="token keyword">try</span>
<span class="token punctuation">{</span>
    Process<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;inetcpl.cpl&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Win32Exception</span> win32ex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MessageBox<span class="token punctuation">.</span><span class="token function">Show</span><span class="token punctuation">(</span><span class="token string">&quot;出错原因：&quot;</span><span class="token operator">+</span>win32ex<span class="token punctuation">.</span>Message<span class="token punctuation">,</span><span class="token string">&quot;出错&quot;</span><span class="token punctuation">,</span>MessageBoxButtons<span class="token punctuation">.</span>OK<span class="token punctuation">,</span>MessageBoxIcon<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>请问楼主会出现社么效果？我是菜鸟，别笑哈:)</p></blockquote><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-4-22 8:59:53 得分:0</p><blockquote><p>一般情况下，它会打开计算机中的Internet属性窗口。当然，如果你的计算机中的inetcpl.cpl文件出错，或找不到该文件。那么，它会弹出一个对话框，提示你。</p></blockquote><p>回复人： cocosoft(pengyun) ( 两星(中级)) 信誉：116 2003-4-22 9:55:36 得分:0</p><blockquote><p>另外，可以在一些选项中加入参数：<br> 请参看：http://expert.csdn.net/Expert/topic/1689/1689666.xml中Knight94(愚翁) 的答案。</p></blockquote><p>该问题已经结贴</p>`,19),c=[o];function e(u,l){return s(),a("div",null,c)}const k=n(p,[["render",e],["__file","sysop2.html.vue"]]);export{k as default};
