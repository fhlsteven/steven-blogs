import{_ as t,o as e,c as o,d as a}from"./app-e911b801.js";const d={},r=a(`<h1 id="日期类型的转换问题" tabindex="-1"><a class="header-anchor" href="#日期类型的转换问题" aria-hidden="true">#</a> 日期类型的转换问题?</h1><p>主　　题： 一个关于数据库数据类型的转换问题?<br> 作　　者： dgt (ttn)<br> 等　　级：<br> 信 誉 值： 100<br> 所属论坛： .NET技术 ASP.NET<br> 问题点数： 30<br> 回复次数： 5<br> 发表时间： 2004-2-6 10:52:42<br></p><hr><p>把一个Sql server2000当中的一个数据库中的某表按字段在DataGrid中放入:</p><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>&lt;asp:datagrid id=&quot;dg&quot; runat=server&gt;
&lt;Columns&gt;
&lt;asp:BoundColumn DataField=&quot;time&quot; HeaderText=&quot;时间&quot;&gt;&lt;HeaderStyle HorizontalAlign=&quot;Center&quot; Width=&quot;60px&quot;&gt;&lt;/HeaderStyle&gt;
&lt;/Columns&gt;
&lt;/asp:datagrid&gt;
</code></pre></div><p><code>time</code>字段为<code>datatime</code>格式,我要的是年月日,为什么会出现<code>xxxx-xx-xx 0:00:00</code>这种格式.</p><p>如何才能为后面的０去掉,请大侠们帮忙~!</p><hr><p>回复人： huny98(程欣) ( 一级(初级)) 信誉：100 2004-2-6 11:15:23 得分:5</p><blockquote><p>有一个<code>SelectedDate.ToShortDateString()</code>这样就可以了！<code>SelectedDate</code>必须是日期格式的！<br> 或者你可以在数据库从查询的时候可以：</p><p><code>SELECT CONVERT(char(12), GETDATE(), 3)</code></p><p>此语句把当前日期转换为样式 3，dd/mm/yy。</p></blockquote><p>回复人： pp4u(方便面（当天结贴）) ( 五级(中级)) 信誉：100 2004-2-6 11:30:53 得分:5</p><blockquote><p>在绑定列的数据字段表达式一栏加入：{0:d}</p></blockquote><p>回复人： xiafish(xiami) ( 二级(初级)) 信誉：99 2004-2-6 11:36:46 得分:5</p><blockquote><p>datagrid属性控制器,列,绑定列,选中你的日期绑定列,数据格式设置表达式(T):填写{0:D}</p></blockquote><p>回复人： redbb(....Dotneter....) ( 两星(中级)) 信誉：101 2004-2-6 11:48:00 得分:5</p><blockquote><p><code>SelectedDate.ToShortDateString()</code></p></blockquote><p>回复人： cchon() ( 一级(初级)) 信誉：100 2004-2-6 12:09:15 得分:10</p><blockquote><p>加：<code>DataFormatString=&quot;{0:yyyy-MM-dd}&quot;</code><br> 如:</p></blockquote><div class="language-asp" data-ext="asp"><pre class="language-asp"><code>&lt;asp:datagrid id=&quot;dg&quot; runat=server&gt;
&lt;Columns&gt;
&lt;asp:BoundColumn DataField=&quot;time&quot; HeaderText=&quot;时间&quot; DataFormatString=&quot;{0:yyyy-MM-dd}&quot;&gt; &lt;HeaderStyle HorizontalAlign=&quot;Center&quot; Width=&quot;60px&quot;&gt;&lt;/HeaderStyle&gt;
&lt;/Columns&gt;
&lt;/asp:datagrid&gt;
</code></pre></div>`,19),l=[r];function c(p,u){return e(),o("div",null,l)}const s=t(d,[["render",c],["__file","cspdsop11.html.vue"]]);export{s as default};
