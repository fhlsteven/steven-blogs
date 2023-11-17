import{_ as e,o,c as d,a as n}from"./app-a2b6e588.js";const c={},a=n(`<h1 id="一个拨号软件的win32dasm暴力破解法" tabindex="-1"><a class="header-anchor" href="#一个拨号软件的win32dasm暴力破解法" aria-hidden="true">#</a> 一个拨号软件的Win32Dasm暴力破解法</h1><blockquote><p>日期：2003年9月23日 作者：ddcrack 人气： 34</p></blockquote><p>这里演示的是一个叫“中国用户专用拨号软件”的程序的暴力破解法，这个拨号软件在拨号上网后会打开IE窗口并将默认网址改为：<code>http://www.chinauser.com</code>，这根本就是违背用户的自由强迫用户访问那个网址，实在是对用户权力的一种侵害。</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>程序名　：中国用户专用拨号软件
版本 　 ：无
大小 　 ：99KB
运行平台：Windows 98/Me/NT/2000
保护方式：无
破解方式：暴力破解
破解难度：中等
</code></pre></div><h2 id="破解步骤" tabindex="-1"><a class="header-anchor" href="#破解步骤" aria-hidden="true">#</a> 破解步骤</h2><ol><li><p>破解方法：对付这种情况通常我们会有两种方法——一种是跳过相应的程序段，另外一种就是屏蔽掉原来的相应程序段。具体对于这个程序，因为拨号跟时间很有关系，所以我们不太方便使用SOFTICE的动态调试工具去跟踪它，而可以借助静态反编译工具Win32Dasm来分析它。按照通常的思维我们破解时首先会选择第1种方法，即认为程序中肯定有某个地方进行判断然后可以绕过弹出IE窗口的子程序，但是事实证明第2种方法比较适合于这个程序。本文的主要目的是讲述暴力破解和Win32Dasm的使用方法，所以为了能更深入的讲解破解方法，我按照通常的思维模式来讲解，即先用第1总种方法，然后自然而然的导出使用第2种方法的必要，以此来提高大家的破解经验；</p></li><li><p>首先，用Win32Dasm中“Disassemmbler”菜单下的“Open File to Disassembler...”打开userdial.exe；</p></li><li><p>选择“Refs”下的“String Data Reference”查看程序中的字符串信息；</p></li><li><p>仔细浏览你将会发现有“<code>Program Files\\Internet Explorer\\IEXPLORE.EXE</code>”及“<code>http://www.chinauser.com</code>”的字符串，显然程序会用这两串字符来调用IE并打开“<code>http://www.chinauser.com</code>”的网址，从而打开可恶的广告窗；；</p></li><li><p>双击字符串“<code>Program Files\\Internet Explorer\\IEXPLORE.EXE</code>”来到程序中调用它的地方：</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Possible StringData Ref from Data Obj -&gt;&quot;Program Files\\Internet Explorer\\IEXPLORE.EXE&quot;
                                  |
:0041C78E 68047B4300              push 00437B04                &lt;-- 我们来到这里
:0041C793 8D542410                lea edx, dword ptr [esp+10]
:0041C797 8D442418                lea eax, dword ptr [esp+18]
:0041C79B 52                      push edx
:0041C79C 50                      push eax

* Reference To: MFC42.Ordinal:039C, Ord:039Ch
                                  |
:0041C79D E80C040000              Call 0041CBAE
</code></pre></div><p>从程序可以看出<code>push 00437B04</code>这条指令的作用是将IE程序的路径压栈，那么后面的<code>Call 0041CBAE</code>自然就是打开IE窗口的子程序了；</p><ol start="6"><li>让我们往上搜索，看看有没有跳转指令可以跳过这里，中间你还可以看到调用字符串“<code>http://www.chinauser.com</code>”的地方：</li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Possible StringData Ref from Data Obj -&gt;&quot;http://www.chinauser.com/&quot;
                                  |
:0041C683 BE787B4300              mov esi, 00437B78
:0041C688 8D7C2418                lea edi, dword ptr [esp+18]
:0041C68C F3                      repz
:0041C68D A5                      movsd
:0041C68E 66A5                    movsw
:0041C690 B93A000000              mov ecx, 0000003A
:0041C695 33C0                    xor eax, eax
:0041C697 8D7C2432                lea edi, dword ptr [esp+32]
</code></pre></div><p>指令<code>mov esi, 00437B78</code>将字符串“<code>http://www.chinauser.com</code>”的地址压栈，说明这里以下的程序段都是在为打开IE做准备，继续往上看，就在上面我们可以看到：</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a CALL at Address:
|:0041B74A
|
:0041C660 6AFF                    push FFFFFFFF
:0041C662 6871D74100              push 0041D771
:0041C667 64A100000000            mov eax, dword ptr fs:[00000000]
:0041C66D 50                      push eax
:0041C66E 64892500000000          mov dword ptr fs:[00000000], esp
:0041C675 81EC10030000            sub esp, 00000310
:0041C67B 55                      push ebp
:0041C67C 56                      push esi
:0041C67D 57                      push edi
:0041C67E B906000000              mov ecx, 00000006
</code></pre></div><p>从这里我们可以知道始终没有跳转指令可以跳过这段程序，只是发现这段打开IE窗口的程序被<code>0041B74A</code>处的<code>CALL</code>所调用；</p><ol start="7"><li>按SHIFT+F12组合键，输入地址<code>0041B74A</code>，我们跳到那里的程序去看看：</li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0041B674(C)
|
:0041B70F F6C720                  test bh, 20
:0041B712 7442                    je 0041B756
:0041B714 8B4620                  mov eax, dword ptr [esi+20]

* Reference To: USER32.KillTimer, Ord:0195h
                                  |
:0041B717 8B3DA4E34100            mov edi, dword ptr [0041E3A4]
:0041B71D 6A4A                    push 0000004A
:0041B71F 50                      push eax
:0041B720 FFD7                    call edi
:0041B722 8B4E20                  mov ecx, dword ptr [esi+20]

* Possible Reference to String Resource ID=00103: &quot;Windows .犸??1%.&quot;
                                  |
:0041B725 6A67                    push 00000067
:0041B727 51                      push ecx
:0041B728 FFD7                    call edi
:0041B72A 51                      push ecx
:0041B72B 8D566C                  lea edx, dword ptr [esi+6C]
:0041B72E 8BCC                    mov ecx, esp
:0041B730 89642424                mov dword ptr [esp+24], esp
:0041B734 52                      push edx
:0041B735 C7466801000000          mov [esi+68], 00000001

* Reference To: MFC42.Ordinal:0217, Ord:0217h
                                  |
:0041B73C E8E9130000              Call 0041CB2A
:0041B741 8BCE                    mov ecx, esi
:0041B743 E868FCFFFF              call 0041B3B0
:0041B748 8BCE                    mov ecx, esi
:0041B74A E8110F0000              call 0041C660                &lt;-- 我们来到这里
:0041B74F 8BCE                    mov ecx, esi
:0041B751 E82A000000              call 0041B780

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:0041B6DB(U), :0041B70D(U), :0041B712(C)
|
:0041B756 8D4C240C                lea ecx, dword ptr [esp+0C]
:0041B75A C7442418FFFFFFFF        mov [esp+18], FFFFFFFF
</code></pre></div><ol start="8"><li><p>现在已经知道<code>0041B74A</code>处的<code>CALL 0041C660</code>跟打开IE窗口有很大关系，让我们从这里往上看，可以发现上面<code>0041B712</code>处的<code>je 0041B756</code>指令可以跳过<code>CALL 0041C660</code>；</p></li><li><p>为了验证这里是否是破解的关键点，我们首先将程序userdial.exe备份一下，以免将源程序改了之后又未能达到目的，可以重来嘛^_^。接下来我们要将指令<code>je 0041B756</code>改为 <code>jne 0041B756</code>，即改变程序原本的运行方向，使其跳过打开IE的程序段。那么怎样改程序代码呢？首先我们看看<code>0041B712</code>处的<code>je 0041B756</code>其机器码是<code>7442</code>，我们要用HIEW打开userdial.exe并找到 <code>je 0041B756</code>这条指令，然后将其改为<code>jne 0041B756</code>（对应的机器码为<code>7542</code>，因为<code>je</code>的指令码为<code>74</code>，而<code>jne</code>的指令码为<code>75</code>）。因为程序中程序中很可能会有很多地方其机器码是7442，为了能准确的找到这里，我们将这条指令前后的机器码一起<code>F6 C7 20 74 42 8B 46 20</code> 作为搜索对象，将HIEW的显示模式设为“Decode”，然后按F7输入<code>F6 C7 20 74 42 8B 46 20</code> ，找到之后按F3将<code>74</code>改为<code>75</code>，按F9存盘退出（其实也可以用TAB键直接用汇编语句将<code>je 0041B756</code>改为<code>jne 0041B756</code>，但是很多时候你会发现用汇编语句并不能达到预期的目的，很可能会使相应的机器码长度前后不一样，尽管汇编指令看起来是一样的）。注意：修改源程序代码时要保证被修改的指令机器码其长度前后一致，否则会影响被修改指令以后的程序，例如<code>je 0041B756</code>的机器码是<code>7442</code>，为两个字节，修改为<code>jne 0041B756</code>之后其机器码为<code>7542</code>，也是两个字节，千万不能出现被修改指令修改前后的字节程度不一样，这样的话程序肯定会死掉的；</p></li><li><p>修改完程序之后运行它试试，你会发现当一开始拨号（还没有连接上网）时程序就开始打开IE，默认网址为“<code>http://www.chinauser.com</code>”，更有趣的是连续打开了3个同样的IE窗口，哎！失败了！改动的地方不对！重来！</p></li><li><p>现在知道<code>0041B712</code>处的<code>je 0041B756</code>并不是破解的关键点，往上看，我们可以发现这里的程序段被0041B674处的跳转指令调用（你也许不明白为什么我知道这里的程序被跳转指令所调用？因为Win32Dasm中的“<code>* Referenced by a (U)nconditional or (C)onditional Jump at Address:</code>”信息指示出了程序的来龙去脉^_^）；</p></li><li><p>按SHIFT+F12组合键，输入地址0041B674，跳过去看看：</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: MFC42.Ordinal:1741, Ord:1741h
                                  |
:0041B669 E892140000              Call 0041CB00
:0041B66E 8B442424                mov eax, dword ptr [esp+24]
:0041B672 85C0                    test eax, eax
:0041B674 0F8495000000            je 0041B70F                &lt;-- 我们来到这里
:0041B67A 8B860C010000            mov eax, dword ptr [esi+0000010C]
:0041B680 85C0                    test eax, eax
:0041B682 7406                    je 0041B68A
:0041B684 50                      push eax
</code></pre></div><p>可以看出指令<code>je 0041B70F</code>将会使程序跳到打开IE的程序段，现在我们要使程序不跳到<code>0041B70F</code>去，一种办法是将<code>je</code>改成<code>jne</code>，另外一种办法是将<code>je 0041B70F</code>改成空指令<code>nop</code>。这里我们采用第2中方法，由于<code>je 0041B70F</code>的机器码是<code>0F8495000000</code>，所以我们用nop的机器码90添满<code>0F8495000000</code>，在HIEW中搜索<code>85 C0 0F 84 95 00 00 00 8B 86</code>（注意将刚才改坏的userdial.exe删掉，用原始的userdial.exe来修改^_^），然后将<code>0F 84 95 00 00 00</code>改成<code>90 90 90 90 90 90</code>，存盘退出后运行userdial.exe，你会发现按“连接”后程序没有打开IE窗口，哈。。。有戏唱了！不过虽然可恶的IE窗口没有打开，但是程序却不工作了，有问题？？？</p><ol start="13"><li><p>再看看上面的程序，发现<code>je 0041B70F</code>的下面紧接着有另外一个跳转指令<code>je 0041B68A</code>，是不是它在作怪呢？试一下就知道了：将<code>je 0041B68A</code>改成<code>jne 0041B68A</code>（方法不用具体再叙述了吧^_^）；</p></li><li><p>修改完之后重新启动userdial.exe，按“连接”键，哈哈。。。程序开始拨号，而且没有再打开IE窗口。可是拨号上网以后你会发现有点不对劲，程序界面不会自动最小化并进入后台运行，而且“连接状态”显示“不能接通, 已经断开.”的信息，虽然去掉了可恶的IE窗口，但是却使程序的运行出现了一些问题，尽管这些问题并不影响程序的正常使用；</p></li><li><p>选择“Refs”下的“String Data Reference”，找到字符串“不能接通, 已经断开.”并双击来到调用它的地方：</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:0041B69C(C), :0041B6B5(C)
|
:0041B6DD 8B5620                  mov edx, dword ptr [esi+20]

* Possible Reference to String Resource ID=00103: &quot;Windows .犸??1%.&quot;
                                  |
:0041B6E0 6A67                    push 00000067
:0041B6E2 52                      push edx

* Reference To: USER32.KillTimer, Ord:0195h
                                  |
:0041B6E3 FF15A4E34100            Call dword ptr [0041E3A4]
:0041B6E9 6A01                    push 00000001
:0041B6EB 8BCE                    mov ecx, esi
:0041B6ED E8DED6FFFF              call 00418DD0

* Possible StringData Ref from Data Obj -&gt;&quot;不能接通, 已经断开.&quot; （注意：在Win32Dasm中你看到的将是一堆乱码，不过并不影响我们）
                                  |
:0041B6F2 68347A4300              push 00437A34                &lt;-- 我们来到这里
:0041B6F7 68F4030000              push 000003F4
:0041B6FC 8BCE                    mov ecx, esi

* Reference To: MFC42.Ordinal:1741, Ord:1741h
                                  |
:0041B6FE E8FD130000              Call 0041CB00
:0041B703 C7861801000000000000    mov dword ptr [esi+00000118], 00000000
:0041B70D EB47                    jmp 0041B756
</code></pre></div><p>在将字符串“不能接通, 已经断开.”的地址压栈指令 push 00437A34的上面我们可以看到这段程被两个相互很近的地方0041B69C和0041B6B5所调用；</p><ol start="16"><li>按SHIFT+F12组合键，输入地址0041B69C，跳过去看看：</li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: MFC42.Ordinal:1741, Ord:1741h
                                  |
:0041B669 E892140000              Call 0041CB00
:0041B66E 8B442424                mov eax, dword ptr [esp+24]
:0041B672 85C0                    test eax, eax
:0041B674 0F8495000000            je 0041B70F
:0041B67A 8B860C010000            mov eax, dword ptr [esi+0000010C]
:0041B680 85C0                    test eax, eax
:0041B682 7406                    je 0041B68A
:0041B684 50                      push eax

* Reference To: RASAPI32.RasHangUpA, Ord:0039h
                                  |
:0041B685 E816180000              Call 0041CEA0

* Referenced by a (U)nconditional or (C)onditional Jump at Address:
|:0041B682(C)
|
:0041B68A 8B8614010000            mov eax, dword ptr [esi+00000114]
:0041B690 C7860C01000000000000    mov dword ptr [esi+0000010C], 00000000
:0041B69A 85C0                    test eax, eax
:0041B69C 753F                    jne 0041B6DD                &lt;-- 我们来到这里
:0041B69E 8B9618010000            mov edx, dword ptr [esi+00000118]
:0041B6A4 8B8E04010000            mov ecx, dword ptr [esi+00000104]
:0041B6AA 42                      inc edx
:0041B6AB 8BC2                    mov eax, edx
:0041B6AD 899618010000            mov dword ptr [esi+00000118], edx
:0041B6B3 3BC1                    cmp eax, ecx
:0041B6B5 7D26                    jge 0041B6DD
</code></pre></div><p>哦！原来调用字符串“不能接通, 已经断开.”的地方就在刚才修改的程序的下面，<code>0041B69C</code>处的<code>jne 0041B6DD</code>和<code>0041B6B5</code>处的<code>jge 0041B6DD</code>都会让程序去调用显示字符串“不能接通, 已经断开.”。那么我们就不让程序去显示这个字符串：将<code>jne 0041B6DD</code>（对应的机器码<code>753F</code>）用空指令<code>nop</code>填充（对应的机器码为<code>9090</code>），将<code>jge 0041B6DD</code>（对应的机器码<code>7D26</code>）用空指令<code>nop</code>填充（对应的机器码为<code>9090</code>），然后存盘退出（要在刚才修改过的程序的基础上改噢）；</p><ol start="17"><li><p>再一次重新启动userdial.exe，你会发现除了“连接状态”信息由“不能接通, 已经断开.”变为“准备重拨”之外，程序依然如故。现在我们应该想一想：在<code>0041B674</code>处我们将<code>je 0041B70F</code>用空指令<code>nop</code>填充后虽然跳过了打开IE窗口的程序段，而且程序也能成功拨号使用，但是却出现了一些不正常的状态（不能最小化进入后台运行，“连接状态”信息不对）。那么我们能不能让程序<code>je 0041B70F</code>有效走到<code>0041B70F</code>去而又不使其弹出IE窗口呢？</p></li><li><p>在第7步骤时我们已经知道call 0041C660这条指令是直接打开IE的地方（但也不是百分之百的正确，至少这个CALL是主要的部分吧）：</p></li></ol><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>* Reference To: MFC42.Ordinal:0217, Ord:0217h
                                  |
:0041B73C E8E9130000              Call 0041CB2A
:0041B741 8BCE                    mov ecx, esi
:0041B743 E868FCFFFF              call 0041B3B0
:0041B748 8BCE                    mov ecx, esi
:0041B74A E8110F0000              call 0041C660                &lt;-- 这个CALL打开IE窗口
:0041B74F 8BCE                    mov ecx, esi
:0041B751 E82A000000              call 0041B780

* Referenced by a (U)nconditional or (C)onditional Jump at Addresses:
|:0041B6DB(U), :0041B70D(U), :0041B712(C)
|
:0041B756 8D4C240C                lea ecx, dword ptr [esp+0C]
:0041B75A C7442418FFFFFFFF        mov [esp+18], FFFFFFFF
</code></pre></div><p>现在我们试试用空指令<code>nop</code>将<code>call 0041C660</code>屏蔽掉，看看程序是否既能不弹出IE窗口又能正常工作（注意：使用原始的userdial.exe喔^_^，刚才修改的程序证明不太成功啦:-(，将<code>call 0041C660</code>的机器码<code>E8110F0000</code>改成<code>9090909090</code>）；</p><ol start="19"><li><p>修改完后打开userdial.exe，选择“连接”后等待运行结果——哈哈。。。成功了，没有了可恶的IE弹出窗口，程序运行和原始程序完全一样^<em>^！（破解就是这样，经常会走一些弯路才会发现正确的方向^</em>^，这就要求我们要开拓思路，不能一条道走到底，不知去另寻它路，这样会极大的限制自己的视野。）</p></li><li><p>有一点要提醒大家：在用Win32Dasm观察分析程序时始终要用原始程序，不要打开修改过的程序进行分析。你可以在打开原始程序后选择“Disassember”下的“Save Disassembler Text File and Create Project File”将反汇编结果存盘，以后再次启动Win32Dasm时可以直接选择“Project”下的“Open Project File...”来打开原先保存的反汇编结果。</p></li></ol>`,28),t=[a];function s(l,r){return o(),d("div",null,t)}const i=e(c,[["render",s],["__file","crack20.html.vue"]]);export{i as default};
