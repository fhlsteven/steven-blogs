import{_ as n,o as s,c as a,a as t}from"./app-f0851ed3.js";const p={},o=t(`<h1 id="c-中的日期数据类型的使用" tabindex="-1"><a class="header-anchor" href="#c-中的日期数据类型的使用" aria-hidden="true">#</a> C#中的日期数据类型的使用</h1><p>痕迹 程序员大联盟 2003-4-9</p><p>详细代码请参看：</p><div class="language-csharp" data-ext="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">DOB</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">DateTime</span> dtDob<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">DateTime</span> dtNow<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">DateTime</span> dtAge<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intDay<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intMonth<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intYear<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intHour<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intMinute<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">TimeSpan</span> tsAge<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intAgeYear<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intAgeMonths<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intAgeDays<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intAgeHours<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> intAgeMinutes<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name">String<span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">DOB</span> objDob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DOB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        objDob<span class="token punctuation">.</span><span class="token function">getDob</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        objDob<span class="token punctuation">.</span><span class="token function">createDateObjects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Age in Years :&quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Age in Months :&quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInMonths</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Age in Days :&quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Age in Hours : &quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Age in Minutes : &quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your Accurate Age is : &quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getAgeInYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; Years &quot;</span> <span class="token operator">+</span>
        objDob<span class="token punctuation">.</span><span class="token function">getMonthDiff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; months &quot;</span> <span class="token operator">+</span> objDob<span class="token punctuation">.</span><span class="token function">getDayDiff</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; days&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* get the date */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">getDob</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Enter the Day u were born : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            intDay <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Month : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            intMonth <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Year(yyyy) : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            intYear <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Hour(0-23) : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            intHour <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Console<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token string">&quot;Minute(0-59) : &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            intMinute <span class="token operator">=</span> Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToInt32</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>StackTrace<span class="token punctuation">)</span><span class="token punctuation">;</span>
            Environment<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* create the date objects */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">createDateObjects</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        dtDob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DateTime</span><span class="token punctuation">(</span>intYear<span class="token punctuation">,</span> intMonth<span class="token punctuation">,</span> intDay<span class="token punctuation">,</span> intHour<span class="token punctuation">,</span> intMinute<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dtNow <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span><span class="token function">Compare</span><span class="token punctuation">(</span>dtNow<span class="token punctuation">,</span> dtDob<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
            tsAge <span class="token operator">=</span> dtNow<span class="token punctuation">.</span><span class="token function">Subtract</span><span class="token punctuation">(</span>dtDob<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Future dates cannot be entered.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Environment<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        dtAge <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DateTime</span><span class="token punctuation">(</span>tsAge<span class="token punctuation">.</span>Ticks<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;Your date of birth :&quot;</span> <span class="token operator">+</span> dtDob<span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;F&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*  calculates the age in Years */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getAgeInYears</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        intAgeYear <span class="token operator">=</span> dtAge<span class="token punctuation">.</span>Year <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> intAgeYear<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the age in months */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getAgeInMonths</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        intAgeMonths <span class="token operator">=</span> intAgeYear <span class="token operator">*</span> <span class="token number">12</span><span class="token punctuation">;</span>
        intAgeMonths <span class="token operator">=</span> intAgeMonths <span class="token operator">+</span> <span class="token punctuation">(</span>dtAge<span class="token punctuation">.</span>Month <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> intAgeMonths<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the age in days */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dtDob<span class="token punctuation">.</span>Year <span class="token operator">==</span> dtNow<span class="token punctuation">.</span>Year<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            intAgeDays <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>DayOfYear <span class="token operator">-</span> dtDob<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span><span class="token function">IsLeapYear</span><span class="token punctuation">(</span>dtDob<span class="token punctuation">.</span>Year<span class="token punctuation">)</span><span class="token punctuation">)</span>
                intAgeDays <span class="token operator">=</span> <span class="token number">366</span> <span class="token operator">-</span> dtDob<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                intAgeDays <span class="token operator">=</span> <span class="token number">365</span> <span class="token operator">-</span> dtDob<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> dtDob<span class="token punctuation">.</span>Year <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dtNow<span class="token punctuation">.</span>Year<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>DateTime<span class="token punctuation">.</span><span class="token function">IsLeapYear</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
                    intAgeDays <span class="token operator">+=</span> <span class="token number">366</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    intAgeDays <span class="token operator">+=</span> <span class="token number">365</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            intAgeDays <span class="token operator">+=</span> dtNow<span class="token punctuation">.</span>DayOfYear<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> intAgeDays<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the age in Hours */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getAgeInHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        intAgeHours <span class="token operator">=</span> <span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">;</span>
        intAgeHours <span class="token operator">=</span> intAgeHours <span class="token operator">+</span> <span class="token punctuation">(</span>dtNow<span class="token punctuation">.</span>Hour <span class="token operator">-</span> dtDob<span class="token punctuation">.</span>Hour<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> intAgeHours<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the age in Minutes */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getAgeInMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        intAgeMinutes <span class="token operator">=</span> <span class="token function">getAgeInHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">;</span>
        intAgeMinutes <span class="token operator">=</span> intAgeMinutes <span class="token operator">+</span> <span class="token punctuation">(</span>dtNow<span class="token punctuation">.</span>Minute <span class="token operator">-</span> dtDob<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> intAgeMinutes<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the month part of the accurate Age */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getMonthDiff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getAgeInMonths</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">12</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* calculates the day part of the accurate Age */</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getDayDiff</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intDayTemp1 <span class="token operator">=</span> <span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intDayTemp2<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intTempYear<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intTempMonth<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">int</span></span> intTempDay <span class="token operator">=</span> intDay<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dtNow<span class="token punctuation">.</span>Year <span class="token operator">!=</span> dtDob<span class="token punctuation">.</span>Year<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> dtNow<span class="token punctuation">.</span>Month<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                intTempYear <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Year <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
                intTempMonth <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>dtNow<span class="token punctuation">.</span>Day <span class="token operator">&lt;</span> intTempDay<span class="token punctuation">)</span>
                    intTempMonth <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Month <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    intTempMonth <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Month<span class="token punctuation">;</span>
                    intTempDay <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                intTempYear <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Year<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">==</span> dtNow<span class="token punctuation">.</span>Month <span class="token operator">||</span> dtDob<span class="token punctuation">.</span>Month <span class="token operator">==</span> dtNow<span class="token punctuation">.</span>Month<span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>dtNow<span class="token punctuation">.</span>Day <span class="token operator">&lt;</span> intTempDay<span class="token punctuation">)</span>
                    intTempMonth <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Month <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                <span class="token punctuation">{</span>
                    intTempMonth <span class="token operator">=</span> dtNow<span class="token punctuation">.</span>Month<span class="token punctuation">;</span>
                    intTempDay <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            intTempYear <span class="token operator">=</span> intYear<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        dtNow <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DateTime</span><span class="token punctuation">(</span>intTempYear<span class="token punctuation">,</span> intTempMonth<span class="token punctuation">,</span> intDay<span class="token punctuation">)</span><span class="token punctuation">;</span>
        intDayTemp2 <span class="token operator">=</span> <span class="token function">getAgeInDays</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> intDayTemp1 <span class="token operator">-</span> intDayTemp2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
Result
    --
D:\\progs&gt;dob
Enter the Day u were born : 1
Month : 1
Year(yyyy) : 2000
Hour(0-23) : 1
Minute(0-59) : 4
Your date of birth :Saturday, January 01, 2000 1:04:00 AM
Your Age in Years :1
Your Age in Months :17
Your Age in Days :520
Your Age in Hours : 12489
Your Age in Minutes : 749375
Your Accurate Age is : 1 Years 5 months 3 days
*/</span>
</code></pre></div>`,4),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","cspdsop8.html.vue"]]);export{i as default};
