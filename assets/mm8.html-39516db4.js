import{_ as e,o as i,c as o,a as s}from"./app-f0851ed3.js";const d={},a=s('<h1 id="谈asf文件及其应用" tabindex="-1"><a class="header-anchor" href="#谈asf文件及其应用" aria-hidden="true">#</a> 谈ASF文件及其应用</h1><blockquote><p>[ 时间:2003-11-12 来源:流氏论坛 ]</p></blockquote><p>在传输音频和视频时将占用大量的网络带宽。通过压缩内容，就可以通过普通的 internet 带宽进行广播。您可以通过对数据应用压缩算法来压缩内容，请考虑期望的输出质量和可用带宽。用播放器播放流之前，要使用解压缩算法解压内容。这些压缩和解压缩算法被称为编解码器。</p><p>编解码器被设计为将流压缩到特定的比特率。目标比特率决定了将应用的压缩量。经编解码器压缩后的内容没有未经压缩的内容在声音和视觉上丰富和有动感，而传输未压缩的内容要求更多的带宽。</p><p>以下列表为您提供了在使用“windows media 编码器”配置文件时关于编解码器的详细信息：</p><p>microsoft windows media audio 版本 7.0 编解码器。用来编码大部分音频流。它为 internet 上的窄带传输提供了无比的音频质量和高保真的可下载音乐。16 kbps（千比特每秒）到 192 kbps 范围内的各种数据速率使得质量要超过以前的编解码器。最新的 windows media audio codec 支持使用 windows media audio 版本 2.0 编码的内容。</p><p>sipro labs acelp 编解码器。提供低比特率的优质声音压缩。根据您选择的网络带宽，该编解码器自带有几种音频格式。</p><p>microsoft windows media video 版本 7.0 编解码器。用于大多数编码方案。支持大范围的带宽，并为宽带 internet 用户增强了视频质量。支持多比特率配置文件，并能以 700 kbps 传送电视质量的压缩内容。</p><p>microsoft mpeg-4 版本 3.0 编解码器。与“windows media 编码器”版本 4.0 包括在一起。</p><p>iso mpeg-4 视频编解码器版本 1.0 基于。iso（国际标准化组织）mpeg-4 标准。您可以使用这种编解码器来编码由很多消费类电子产品产生的内容，例如数字摄像机和移动电话。</p><p>microsoft windows media screen 版本 7.0 编解码器。该屏幕捕获编解码器允许以低至 15 kbps 的数据速率传输无损的计算机屏幕图像。您可以将其用于点播培训，软件演示和帮助应用程序。它非常适用于在生产应用程序（例如，microsoft word、excel 和 visual studio®）中捕获屏幕。windows media screen codec 同时为传输和下载方案做了全面优化，并能使用 digital rights management (drm) 技术来加密编码的屏幕内容。它与 windows media player 7 包括在一起。</p><p>注意 要编码用于 windows media 编码器 4.0 的音频和视频内容，请使用 windows media audio codec 7.0 和 mpeg-4 3.0 编解码器。</p>',12),t=[a];function n(p,c){return i(),o("div",null,t)}const r=e(d,[["render",n],["__file","mm8.html.vue"]]);export{r as default};