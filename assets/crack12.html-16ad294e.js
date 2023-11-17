import{_ as n,o as s,c as a,a as p}from"./app-d9da1b6d.js";const t={},o=p(`<h1 id="tornado2之licence暴力破解" tabindex="-1"><a class="header-anchor" href="#tornado2之licence暴力破解" aria-hidden="true">#</a> Tornado2之Licence暴力破解</h1><blockquote><p>日期：2003年6月8日 作者：1212 人气： 280</p></blockquote><p>Tornado2是VxWorks开发调试工具,试用期为一个月.<br> 超过试用期需要Licence支持,一个Licence需要<code>$6000~$2000</code>.买了软件,还要花钱,真是<code>!@#$%^&amp;*</code>.</p><p>破解如下,希望对大家有用. 😃</p><h2 id="_1-跟踪" tabindex="-1"><a class="header-anchor" href="#_1-跟踪" aria-hidden="true">#</a> 1.跟踪</h2><p>Tornado2的Licence程序主要运行在 ...\\host\\x86-win32\\bin\\tgtsvr.exe(...为Tornado2安装目录)</p><p>经过痛苦的跟踪过程,发现008B5236处为判断鉴权是否成功(该地址是在NT4.0+SP5.0中,可能系统不一样,地址会不一样).跟踪过程就不写了吧.大家都是高手,我的跟踪过程写出来,大家会笑话的.</p><p>在跟踪过程中,我犯了很多愚蠢的错误,甚至死了很多次.后来发现都是可以避免的.</p><p>008B5236前有一系列CALL,是进行计算的.我曾跟进去,但发现是可能一个DLL.该公司用一个DLL进行运算,我是不能通过算法破解了,只好暴力破解.</p><p>写破解代码可能对大家有一些作用,我将详细介绍.</p><h2 id="_2-破解思路" tabindex="-1"><a class="header-anchor" href="#_2-破解思路" aria-hidden="true">#</a> 2.破解思路</h2><p>该程序是通过加壳的,壳比较奇怪,我孤陋寡闻,没有见过.<br> 我的想法是,我也可以在程序中加外壳,先获得控制修改代码,在原来壳结束时,作跳转到我的修改代码.<br> 原来程序入口是00426DF5,原来壳的结束位置是00426F33.</p><p>1)将程序的入口地址改为00400300</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>mov        ebx,426F33h
mov        dword ptr [ebx],0FD93C8E9h
add        ebx,4
mov        byte ptr [ebx],0FFh
jmp        00426DF5
//以上为将00426F33改为jmp 1111.
1111.为自己代码地址
push        ebx
mov        ebx,426F33h
mov        dword ptr [ebx],535BD0FFh
add        ebx,4
mov        byte ptr [ebx],81h
//以上为将00426F33改为
{
    00426F33 FF D0               call        eax
    00426F35 5B                  pop         ebx
    00426F36 53                  push        ebx
    00426F37 81 EB 2E 0D 00 00   sub         ebx,0D2Eh
}
mov        ebx,eax
add        ebx,0E10Ah
mov        dword ptr [ebx],7DEBC033h
//以上将程序改成鉴权成功
{
    008B5236 33 C0                xor        eax, eax
    008B5238 EB 7D                jmp        008B52B5
}
sub        ebx, 0B7h//ebx=008B517F
mov        word ptr [ebx],xxxx
//以上将程序改成98下跳到NT代码中执行
{
    008B517F jmp 008B51C5
}
pop        ebx
jmp        00426F33
</code></pre></div><h2 id="外壳程序详细说明" tabindex="-1"><a class="header-anchor" href="#外壳程序详细说明" aria-hidden="true">#</a> 外壳程序详细说明</h2><p>1)改变程序的入口地址到自己代码,在自己代码地方写跳转代码.该跳转代码将00426F33处程序改成jmp xxxx.</p><p>在该项操作中,需要取硬盘序列号,与jmp xxxx的机器码做xor运算.<br> 取硬盘序列号使用LoadLibrary,GetProcAddress和GetVolumeInformationA.<br> 其中LoadLibrary和GetProcAddress的函数地址需要查原来程序地址.</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>LoadLibrary = 00426FD0
GetProcAddress = 00426FCA
CALL xxxx = E8 + 偏移(4位)
</code></pre></div><p>2)在上面的jmp xxxx的xxxx地方处写代码,改变程序的运行路径.</p><p>需要有如下几个具体操作:</p><p>(1)将00426F33处还原<br> (2)改程序为98下也到NT代码中执行<br> (3)该程序为鉴权成功</p><p>3)需要的固定数据:</p><p>&#39;KERNEL32.DLL&#39;, 0 //13 BYTES,LoadLibraryA用<code>&#39;GetVolumeInformationA&#39;, 0 //22 BYTES,GetProcAddress</code>用<code>&#39;C:\\&#39;, 0 //4 BYTES, GetVolumeInformationA</code>用 总共<code>0x27 = 39个BYTE</code>因此数据从<code>400300</code>开始,代码从<code>00400330</code>开始.</p><h3 id="外壳程序实现" tabindex="-1"><a class="header-anchor" href="#外壳程序实现" aria-hidden="true">#</a> 外壳程序实现</h3><p>1)将几个固定数据写进文件中:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>Raw Address = 0x300
00400300    &#39;KERNEL32.DLL&#39;, 0
0040030D    &#39;GetVolumeInformationA&#39;, 0
00400323    &#39;C:\\&#39;, 0
00400327    4 BYTE 数据
0040032B    0
</code></pre></div><p>2)写跳转代码,将00426F33处程序改成</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>jmp xxxx, Raw Address = 0x330
00400330
00400330 55                  push        ebp
00400331 8B EC                mov        ebp,esp
00400333 83 EC 30            sub        esp,70h  ;实际使用0x22 BYTE
00400336 68 00 03 40 00      push        400300h  ;&#39;KERNEL32.DLL&#39;
0040033B E8 90 6C 02 00      call        426FD0h;LoadLibraryA
00400341 68 0D 03 40 00      push        40030Dh  ;&#39;GetVolumeInformationA&#39;
00400346 50                  push        eax      ;hModule
00400347 E8 7F 6C 02 00      call        426FCAh;GetProcAddress
0040034B 6A 0A                push        0Ah      ;sizeof(lpFileSystemNameBuffer)
0040034D 8D 5D D8            lea        ebx,[ebp-28h]
00400350 53                  push        ebx
00400351 8D 5D D0            lea        ebx,[ebp-30h]
00400354 53                  push        ebx
00400355 8D 5D E4            lea        ebx,[ebp-1Ch]
00400358 53                  push        ebx
00400359 8D 5D E8            lea        ebx,[ebp-18h]
0040035C 53                  push        ebx
0040035D 6A 0C                push        0Ch
0040035F 8D 5D F0            lea        ebx,[ebp-10h]
00400362 53                  push        ebx
00400363 68 23 03 40 00      push        400323
00400368 FF D0                call        eax
0040036A 8B 45 E8            mov        eax,dword ptr [ebp-18h];VolumeSerialNumber
0040036D BB 27 03 40 00      mov        ebx,400327h
00400372 33 03                xor        eax,dword ptr [ebx]
00400374 BB 33 6F 42 00      mov        ebx,426F33h
00400379 89 03                mov        dword ptr [ebx],eax
0040037B 83 C3 04            add        ebx,4
0040037E C6 03 FF            mov        byte ptr [ebx],0FFh;原来是E9 54 94 FD FF jmp 0040038D
00400381 83 C4 70            add        esp,70h
00400384 8B E5                mov        esp,ebp
00400386 5D                  pop        ebp
00400387 E9 69 6A 02 00      jmp        00426DF5;跳转代码完成
0040038C
0040038C 53                  push        ebx
0040038D BB 33 6F 42 00      mov        ebx,426F33h
00400392 C7 03 FF D0 5B 53    mov        dword ptr [ebx],535BD0FFh
00400398 83 C3 04            add        ebx,4
0040039B C6 03 81            mov        byte ptr [ebx],81h
0040039E 8B D8                mov        ebx,eax
004003A0 81 C3 0A E1 00 00    add        ebx,0E10Ah
004003A6 C7 03 33 C0 EB 7D    mov        dword ptr [ebx],7DEBC033h
004003AC 81 EB B7 00 00 00    sub        ebx,0B7h
004003B2 66 C7 03 EB 44      mov        word ptr [ebx],44EBh
004003B7 5B                  pop        ebx
004003B8 E9 76 6B 02 00      jmp        00426F33
004003BD
</code></pre></div><h3 id="实验数据" tabindex="-1"><a class="header-anchor" href="#实验数据" aria-hidden="true">#</a> 实验数据</h3><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>VolumeSerialNumber = 0x283a1709
E9 54 94 FD ^ VolumeSerialNumber = 0xd5ae43e0
</code></pre></div><p>其中的GetVolumeInformationA和变化数据,不是必须的.在写这一段代码时,不能将他放到原来的代码块中,我曾经放过,但程序运行死了.可能有其他检查,但程序死的时候,堆栈已经被破坏了,我无法定位,不知哪位能指点?</p><h2 id="_3-c代码" tabindex="-1"><a class="header-anchor" href="#_3-c代码" aria-hidden="true">#</a> 3.C代码</h2><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;windows.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;shlobj.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;resource.h&quot;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">OPEN_ERROR</span>          <span class="token expression"><span class="token operator">-</span><span class="token number">1</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">READ_ERROR</span>          <span class="token expression"><span class="token operator">-</span><span class="token number">2</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">WRITE_ERROR</span>        <span class="token expression"><span class="token operator">-</span><span class="token number">3</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">FILE_ERROR</span>          <span class="token expression"><span class="token operator">-</span><span class="token number">4</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">NO_KEY</span>              <span class="token expression"><span class="token operator">-</span><span class="token number">5</span></span></span>

<span class="token keyword">int</span> <span class="token function">WriteCrack</span><span class="token punctuation">(</span>HANDLE hFile<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    DWORD dwWrited<span class="token punctuation">;</span>
<span class="token comment">//1.写入口</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0xf0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    DWORD dwEntry <span class="token operator">=</span> <span class="token number">0x330</span><span class="token punctuation">;</span>
    <span class="token function">WriteFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwEntry<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwWrited<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.写固定数据</span>
    LPTSTR tt <span class="token operator">=</span> <span class="token function">MAKEINTRESOURCE</span><span class="token punctuation">(</span>IDR_CRACKDATA1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    HRSRC hRsrc <span class="token operator">=</span> <span class="token function">FindResource</span><span class="token punctuation">(</span><span class="token function">GetModuleHandle</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">MAKEINTRESOURCE</span><span class="token punctuation">(</span>IDR_CRACKDATA1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;CRACKDATA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    HGLOBAL hGlobal <span class="token operator">=</span> <span class="token function">LoadResource</span><span class="token punctuation">(</span><span class="token function">GetModuleHandle</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hRsrc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    LPVOID lpData <span class="token operator">=</span> <span class="token function">LockResource</span><span class="token punctuation">(</span>hGlobal<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0x300</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">WriteFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> lpData<span class="token punctuation">,</span> <span class="token number">0xc0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwWrited<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//3.写变化数据</span>
    DWORD dwChangeData <span class="token operator">=</span> <span class="token number">0xfd9454e9</span><span class="token punctuation">;</span><span class="token comment">//E9 54 94 FD</span>
    BYTE lpRootPathName<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;c:\\\\&quot;</span><span class="token punctuation">;</span> <span class="token comment">//取C盘的序列号</span>
    BYTE lpVolumeNameBuffer<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//磁盘卷标</span>
    DWORD nVolumeNameSize <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
    DWORD VolumeSerialNumber<span class="token punctuation">;</span><span class="token comment">//磁盘序列号</span>
    DWORD MaximumComponentLength<span class="token punctuation">;</span>
    BYTE lpFileSystemNameBuffer<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    DWORD nFileSystemNameSize<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span>
    DWORD FileSystemFlags<span class="token punctuation">;</span>
    <span class="token function">GetVolumeInformation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>lpRootPathName<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>lpVolumeNameBuffer<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> nVolumeNameSize<span class="token punctuation">,</span>
        <span class="token operator">&amp;</span>VolumeSerialNumber<span class="token punctuation">,</span> <span class="token operator">&amp;</span>MaximumComponentLength<span class="token punctuation">,</span>
        <span class="token operator">&amp;</span>FileSystemFlags<span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>lpFileSystemNameBuffer<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> nFileSystemNameSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dwChangeData <span class="token operator">^=</span> VolumeSerialNumber<span class="token punctuation">;</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0x327</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">WriteFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwChangeData<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwWrited<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">WriteCrackData</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> szFileName<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    HANDLE hFile <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> GENERIC_READ <span class="token operator">|</span> GENERIC_WRITE<span class="token punctuation">,</span> FILE_SHARE_READ<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span>
        OPEN_EXISTING<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>hFile <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Please quit TornadoII program!\\r\\n&quot;</span>
            <span class="token string">&quot;Ensure not any program lock TornadoII resource!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OK <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> OPEN_ERROR<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment">//读数据,判断该文件是否可写</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0xf0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    DWORD dwEntry<span class="token punctuation">;</span>
    DWORD dwReaded<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwEntry<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwReaded<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">==</span> FALSE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Please quit TornadoII program!\\r\\n&quot;</span>
            <span class="token string">&quot;Ensure not any program lock TornadoII resource!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OK <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> READ_ERROR<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>dwEntry <span class="token operator">!=</span> <span class="token number">0x330</span><span class="token punctuation">)</span><span class="token comment">//自己写的入口</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>dwEntry <span class="token operator">!=</span> <span class="token number">0x26df5</span><span class="token punctuation">)</span><span class="token comment">//原本的程序入口</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;TornadoII maybe infected by virus!\\r\\nRun the patch maybe destroy TornadoII!\\r\\n&quot;</span>
                <span class="token string">&quot;If you want continue,press OK,CANCEL to quit!\\r\\nDo you want continue?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OKCANCEL <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span>
                <span class="token operator">==</span> IDCANCEL<span class="token punctuation">)</span>
                <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> FILE_ERROR<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">WriteCrack</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">WriteBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    HKEY hKey<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">RegOpenKey</span><span class="token punctuation">(</span>HKEY_CURRENT_USER<span class="token punctuation">,</span> <span class="token string">&quot;TNT TornadoII Patch1&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>hKey<span class="token punctuation">)</span>
        <span class="token operator">!=</span> ERROR_SUCCESS<span class="token punctuation">)</span>
        <span class="token keyword">return</span> NO_KEY<span class="token punctuation">;</span>

    <span class="token keyword">char</span> szFileName<span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">long</span> length <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">;</span> 
    DWORD FileAttribute <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
    BYTE FileTime<span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
    <span class="token function">memset</span><span class="token punctuation">(</span>FileTime<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>BYTE<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    DWORD dwLength<span class="token punctuation">;</span> 

    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">RegQueryValue</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Path&quot;</span><span class="token punctuation">,</span> szFileName<span class="token punctuation">,</span> <span class="token operator">&amp;</span>length<span class="token punctuation">)</span> 
        <span class="token operator">!=</span> ERROR_SUCCESS<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        <span class="token function">RegCloseKey</span><span class="token punctuation">(</span>hKey<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> NO_KEY<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
    dwLength <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span> 
    DWORD type<span class="token punctuation">;</span> 
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">RegQueryValueEx</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Attribute&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>type<span class="token punctuation">,</span> <span class="token punctuation">(</span>BYTE<span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>FileAttribute<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwLength<span class="token punctuation">)</span> 
        <span class="token operator">!=</span> ERROR_SUCCESS<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        <span class="token function">RegCloseKey</span><span class="token punctuation">(</span>hKey<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> NO_KEY<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
    dwLength <span class="token operator">=</span> <span class="token number">255</span><span class="token punctuation">;</span> 
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">RegQueryValueEx</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Time&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>type<span class="token punctuation">,</span> FileTime<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwLength<span class="token punctuation">)</span> 
        <span class="token operator">!=</span> ERROR_SUCCESS<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        <span class="token function">RegCloseKey</span><span class="token punctuation">(</span>hKey<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> NO_KEY<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
    FILETIME<span class="token operator">*</span> temp <span class="token operator">=</span> <span class="token punctuation">(</span>FILETIME<span class="token operator">*</span><span class="token punctuation">)</span>FileTime<span class="token punctuation">;</span> 
    FILETIME CreateTime<span class="token punctuation">;</span> 
    CreateTime <span class="token operator">=</span> <span class="token operator">*</span>temp<span class="token punctuation">;</span> 
    temp <span class="token operator">++</span><span class="token punctuation">;</span> 
    FILETIME LastAccessTime<span class="token punctuation">;</span> 
    LastAccessTime <span class="token operator">=</span> <span class="token operator">*</span>temp<span class="token punctuation">;</span> 
    temp <span class="token operator">++</span><span class="token punctuation">;</span> 
    FILETIME LastWriteTime<span class="token punctuation">;</span> 
    LastWriteTime <span class="token operator">=</span> <span class="token operator">*</span>temp<span class="token punctuation">;</span> 

    HANDLE hFile <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> GENERIC_READ <span class="token operator">|</span> GENERIC_WRITE<span class="token punctuation">,</span> FILE_SHARE_READ<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> 
        OPEN_EXISTING<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">if</span><span class="token punctuation">(</span>hFile <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Please quit TornadoII program!\\r\\n&quot;</span> 
            <span class="token string">&quot;Ensure not any program lock TornadoII resource!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OK <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> OPEN_ERROR<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token comment">//读数据,判断该文件是否可写</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0xf0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    DWORD dwEntry<span class="token punctuation">;</span>
    DWORD dwReaded<span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwEntry<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwReaded<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">==</span> FALSE<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Please quit TornadoII program!\\r\\n&quot;</span>
            <span class="token string">&quot;Ensure not any program lock TornadoII resource!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OK <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> READ_ERROR<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>dwEntry <span class="token operator">!=</span> <span class="token number">0x330</span><span class="token punctuation">)</span><span class="token comment">//自己写的入口</span>
    <span class="token punctuation">{</span>
        <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> FILE_ERROR<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    DWORD dwWrited<span class="token punctuation">;</span>
<span class="token comment">//1.写入口</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0xf0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dwEntry <span class="token operator">=</span> <span class="token number">0x26df5</span><span class="token punctuation">;</span>
    <span class="token function">WriteFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwEntry<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwWrited<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.数据</span>
    BYTE buffer<span class="token punctuation">[</span><span class="token number">0xc0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>BYTE<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0xc0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SetFilePointer</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token number">0x300</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> FILE_BEGIN<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">WriteFile</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> buffer<span class="token punctuation">,</span> <span class="token number">0xc0</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>dwWrited<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">SetFileTime</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>CreateTime<span class="token punctuation">,</span> <span class="token operator">&amp;</span>LastAccessTime<span class="token punctuation">,</span> <span class="token operator">&amp;</span>LastWriteTime<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">RegDeleteKey</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">RegCloseKey</span><span class="token punctuation">(</span>hKey<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">RegDeleteKey</span><span class="token punctuation">(</span>HKEY_CURRENT_USER<span class="token punctuation">,</span> <span class="token string">&quot;TNT TornadoII Patch1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">SetFileAttributes</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> FileAttribute<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    
    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>

<span class="token keyword">int</span> WINAPI <span class="token function">WinMain</span><span class="token punctuation">(</span>HINSTANCE hInstance<span class="token punctuation">,</span> HINSTANCE hPrev<span class="token punctuation">,</span> LPSTR lpCmdLine<span class="token punctuation">,</span> <span class="token keyword">int</span> nShowCmd<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">WriteBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> TRUE<span class="token punctuation">)</span>
        <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span>
    BROWSEINFO  bi<span class="token punctuation">;</span>
    ITEMIDLIST<span class="token operator">*</span> pidl<span class="token punctuation">;</span>
    <span class="token keyword">char</span>        path<span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>hwndOwner <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>pidlRoot <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>pszDisplayName <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>lpszTitle <span class="token operator">=</span> <span class="token string">&quot;Please choose the path of TornadoII installed&quot;</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>ulFlags <span class="token operator">=</span> BIF_BROWSEINCLUDEFILES<span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>lpfn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>lParam <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    bi<span class="token punctuation">.</span>iImage <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    pidl <span class="token operator">=</span> <span class="token function">SHBrowseForFolder</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>bi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">SHGetPathFromIDList</span><span class="token punctuation">(</span>pidl<span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span>        szFileName<span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
    <span class="token keyword">int</span>        length <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> 

    <span class="token keyword">if</span><span class="token punctuation">(</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> 
        <span class="token keyword">return</span> FALSE<span class="token punctuation">;</span> 

    <span class="token keyword">int</span>        temp<span class="token punctuation">;</span> 
    <span class="token keyword">char</span><span class="token operator">*</span>      szName <span class="token operator">=</span> <span class="token string">&quot;\\\\host\\\\x86-win32\\\\bin\\\\tgtsvr.exe&quot;</span><span class="token punctuation">;</span> 
    <span class="token function">memset</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">memcpy</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> path<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    temp <span class="token operator">=</span> length<span class="token punctuation">;</span> 
    length <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>szName<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">memcpy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>szFileName<span class="token punctuation">[</span>temp<span class="token punctuation">]</span><span class="token punctuation">,</span> szName<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span> 

    HANDLE hFile <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> GENERIC_READ<span class="token punctuation">,</span> FILE_SHARE_READ<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> 
        OPEN_EXISTING<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">if</span><span class="token punctuation">(</span>hFile <span class="token operator">==</span> INVALID_HANDLE_VALUE<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        <span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;Please quit TornadoII program!\\r\\n&quot;</span> 
            <span class="token string">&quot;Ensure not any program lock TornadoII resource!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Warnning&quot;</span><span class="token punctuation">,</span> MB_OK <span class="token operator">|</span> MB_ICONHAND<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">return</span> FALSE<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 

    BY_HANDLE_FILE_INFORMATION FileInfo<span class="token punctuation">;</span> 
    <span class="token function">GetFileInformationByHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">,</span> <span class="token operator">&amp;</span>FileInfo<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span> 

    DWORD FileAttribute <span class="token operator">=</span> FileInfo<span class="token punctuation">.</span>dwFileAttributes<span class="token punctuation">;</span> 
    BYTE FileTime<span class="token punctuation">[</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
    <span class="token function">memset</span><span class="token punctuation">(</span>FileTime<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>BYTE<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
    <span class="token function">memcpy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>FileTime<span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>FileInfo<span class="token punctuation">.</span>ftCreationTime<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    length <span class="token operator">+=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">memcpy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>FileTime<span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>FileInfo<span class="token punctuation">.</span>ftLastAccessTime<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    length <span class="token operator">+=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token function">memcpy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>FileTime<span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>FileInfo<span class="token punctuation">.</span>ftLastWriteTime<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    length <span class="token operator">+=</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>FILETIME<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    DWORD newAttribute <span class="token operator">=</span> FileAttribute <span class="token operator">&amp;</span> <span class="token number">0xfffffffe</span><span class="token punctuation">;</span> 
    <span class="token function">SetFileAttributes</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">,</span> newAttribute<span class="token punctuation">)</span><span class="token punctuation">;</span> 


    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">WriteCrackData</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">)</span> <span class="token operator">==</span> TRUE<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span> 
        HKEY hKey<span class="token punctuation">;</span> 
        <span class="token function">RegCreateKey</span><span class="token punctuation">(</span>HKEY_CURRENT_USER<span class="token punctuation">,</span> <span class="token string">&quot;TNT TornadoII Patch1&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>hKey<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token function">RegSetValue</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Path&quot;</span><span class="token punctuation">,</span> 
            REG_SZ<span class="token punctuation">,</span> szFileName<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>szFileName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token function">RegSetValueEx</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Attribute&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> REG_DWORD<span class="token punctuation">,</span> <span class="token punctuation">(</span>BYTE<span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>FileAttribute<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token function">RegSetValueEx</span><span class="token punctuation">(</span>hKey<span class="token punctuation">,</span> <span class="token string">&quot;Time&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> REG_BINARY<span class="token punctuation">,</span> FileTime<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">MessageBox</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token string">&quot;TornadoII Patch1 is OK!\\r\\nYou can run me again when registered,\\r\\n&quot;</span> 
            <span class="token string">&quot;or press yes when you registed.\\r\\nHave you run TornadoII to register?&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;OK!&quot;</span><span class="token punctuation">,</span> MB_YESNO<span class="token punctuation">)</span> <span class="token operator">==</span> IDYES<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span> 
            <span class="token function">WriteBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span> 

    <span class="token keyword">return</span> TRUE<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre></div><p>其中的IDR_CRACKDATA1为:</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>00000000 4B 45 52 4E 45 4C 33 32 2E 44 4C 4C 00 47 65 74    //KERNEL32.DLL Ge
00000010 56 6F 6C 75 6D 65 49 6E 66 6F 72 6D 61 74 69 6F    //VolumeInformati
00000020 6E 41 00 43 3A 5C 00 00 00 00 00 00 00 00 00 00    //nA C:\\
00000030 55 8B EC 83 EC 30 68 00 03 40 00 E8 90 6C 02 00
00000040 68 0D 03 40 00 50 E8 7F 6C 02 00 6A 0A 8D 5D D8
00000050 53 8D 5D D0 53 8D 5D E4 53 8D 5D E8 53 6A 0C 8D
00000060 5D F0 53 68 23 03 40 00 FF D0 8B 45 E8 BB 27 03
00000070 40 00 33 03 BB 33 6F 42 00 89 03 83 C3 04 C6 03
00000080 FF 83 C4 70 8B E5 5D E9 69 6A 02 00 53 BB 33 6F
00000090 42 00 C7 03 FF D0 5B 53 83 C3 04 C6 03 81 8B D8
000000a0 81 C3 0A E1 00 00 C7 03 33 C0 EB 7D 81 EB B7 00
000000b0 00 00 66 C7 03 EB 44 5B E9 76 6B 02 00 00 00 00
</code></pre></div><h2 id="后记" tabindex="-1"><a class="header-anchor" href="#后记" aria-hidden="true">#</a> 后记</h2><p>今年7月底破解该软件,原来想买给xx公司.不过后来失败了.这也是加GeVolumeInformatinA的原因.</p><p>前两天看到贵论坛上一篇文章,深有感触.破解应该是一个业余爱好吧,希望能和大家交个朋友.</p><p>运行该Patch程序注意:</p><p>1.保证您已经安装好TornadoII,且TornadoII的应用程序没有运行.<br> 2.运行程序patch.<br> 3.选择TornadoII的安装路径.<br> 4.将出现如图patch1OK.jpg所示,此时patch1已经成功,这时patch.exe可以按否关闭,或者不关闭,直接运行TornadoII进行注册.<br> 注意:现在一定不能马上按&quot;是&quot;按钮.如果您按下,那么只好从第二步重新来.<br> 5.注册TornadoII将出现如register.jpg所示,此时您可以输入任意的26个数字或字母,可以数字和字母混合.注册成功后,将TornadoII的应用程序退出.<br> 6.如果刚才您没有关闭patch.exe,现在直接按patch1OK.jpg所示的&quot;是&quot;按钮,TornadoII将完全破解.如果您刚才将patch.exe推出了, 现在需要重新运行他.这一步成功的标志是patch2OK.jpg所示.</p><p>注意:如果您的操作系统是98/95,在第5步时将出现如98.jpg所示(98.jpg不能贴上来,见谅), 此时实际已经注册成功.您需要关闭TornadoII的注册程序,按照第六步的指示做.如果您的操作系统是98/95,而且已经过期了,该Patch无能为力.只好重装系统和TII了.😦</p><p>哈哈，这个昂贵的商业软件的保护说穿了实在是不值得一提！</p><p>它是用Crypkey加壳的（www.crypkey.com)，而Crypkey Instant的通用注册机早被Duelist/CORE写出来了，在Keygen Studio上可以得到，用的RSA算法。<br> 至于脱壳，更是简单得不得了，写个ProcDump的script自动把tgtsvr.exe脱壳即可（壳调用cryp*.dll判断时间），得到的exe的import table未做任何手脚，可以在各种版本的32-bit windows上运行！</p><p>所有用Crypkey加壳的大软件如法炮制！</p><p>blowfish</p>`,45),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","crack12.html.vue"]]);export{i as default};
