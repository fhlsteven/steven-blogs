import{_ as a,o as n,c as s,a as t}from"./app-a2b6e588.js";const p={},e=t(`<h1 id="windows-forms-xp-style-on-vs-net" tabindex="-1"><a class="header-anchor" href="#windows-forms-xp-style-on-vs-net" aria-hidden="true">#</a> Windows Forms XP style on VS.NET</h1><blockquote><p>你是第41位浏览该文章的人 DennisLan csdn 2003-8-17</p></blockquote><p>不知各位有沒有這樣的痛苦,在用 VS.NET2003 開發 WinForm 應用程式的時候,明明自己的 OS 是 XP,可是做出來的畫面執行出來還是老土的原來的 Windows 的風格,無論屬性怎樣定,還是不起作用. 其實可以用下面的方法作到,不過要自己動手.</p><h2 id="一-畫面上物件屬性的設定" tabindex="-1"><a class="header-anchor" href="#一-畫面上物件屬性的設定" aria-hidden="true">#</a> 一. 畫面上物件屬性的設定</h2><p>把 button,radiobutton,checkbox ... 等等.您要把其顯示風格改為 XP 的都要設定其&quot;外觀&quot; 中的 floatStyle -&gt; &quot;System&quot;</p><h2 id="二-自己加入設定的-assembly" tabindex="-1"><a class="header-anchor" href="#二-自己加入設定的-assembly" aria-hidden="true">#</a> 二. 自己加入設定的 Assembly</h2><ol><li><p>Copy 下面的內容,修改相關內容(&quot;name&quot;-&gt;您應用程式的名稱,如果在開發中它應該在 ../debug/下的 .exe file), 其它內容請不要修改.</p><p>// 以下代碼 (C) by Matthew MacDonald</p><div class="language-xml" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot; standalone=&quot;yes&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assembly</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>urn:schemas-microsoft-com:asm.v1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">manifestVersion</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
<span class="token attr-name">version</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>1.0.0.0<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">name</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>MyOutLook<span class="token punctuation">&quot;</span></span> <span class="token attr-name">&lt;--此處要修改成你自己的程式的名稱--</span><span class="token punctuation">&gt;</span></span>
type=&quot;win32&quot; /&gt;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>assemblyIdentity</span>
<span class="token attr-name">type</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>win32<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Microsoft.Windows.Common-Controls<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">version</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>6.0.0.0<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">processorArchitecture</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X86<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">publicKeyToken</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>6595b64144ccf1df<span class="token punctuation">&quot;</span></span>
<span class="token attr-name">language</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">&quot;</span>*<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependentAssembly</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>assembly</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></li><li><p>把修改好的內容存為以 .manifest 為後綴名的 file,把其放到和您的應用程式相同的 Directory(在開發時應該在../bin/debug/), 如:您的 .exe 程式名稱為 MyApp.exe ,那麼這個文件的名稱就為 MyApp.exe.manifest(看起來有兩個後綴名)</p></li><li><p>重新用 VS.NET2003 打開您的 Project, Compile 執行.有沒有看到,已經是 XP 的風格了!(注: 這個作法只能在 XP OS 起作用,如果您把程式佈置到 Win95/98 2000 或 Nt 上,程式在執行時會忽略,仍是非 XP 風格,如果您想在非 XP 上顯示 XP 風格,請到 http://www.codeproject.com上 Search,那里有一個 Sample).</p></li></ol><p>怎麼樣,您的界面變成 XP 風格了嗎? 祝您好運!</p><h2 id="參考資料" tabindex="-1"><a class="header-anchor" href="#參考資料" aria-hidden="true">#</a> 參考資料</h2><p>Matthew MacDonald 所著的 <code>&lt;&lt;User Interfaces In C#: Windows Forms and Custorm Controls&gt;&gt;</code></p>`,10),o=[e];function c(l,u){return n(),s("div",null,o)}const r=a(p,[["render",c],["__file","win15.html.vue"]]);export{r as default};
