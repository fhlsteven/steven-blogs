import{_ as e,o as n,c as a,a as t}from"./app-8e5157a8.js";const r={},i=t('<h1 id="在-net开发中几个重要的认识误区-1" tabindex="-1"><a class="header-anchor" href="#在-net开发中几个重要的认识误区-1" aria-hidden="true">#</a> 在.net开发中几个重要的认识误区(1)</h1><p>在.net开发中几个重要的认识误区</p><p>.net如今已经很流行，成为赶时髦的程序员的首选。但是，大量刚刚接触.net的程序员的确存在一定的认识误区，这里先介绍一部分。</p><h2 id="一、-net程序再运行一次就会更快" tabindex="-1"><a class="header-anchor" href="#一、-net程序再运行一次就会更快" aria-hidden="true">#</a> 一、.net程序再运行一次就会更快</h2><p>许多人对此的解释是：.net程序第一次运行时会被编译成本地代码，所以再次运行会更快。但遗憾的是，其实每次运行，那些IL都会被翻译一次，不会保留下来。所以并不会变快。但为什么有时候真的觉得快了呢？其实所有程序都是这样，这是Windows再为你缓存用过的组件。真正需要CPU时间的程序，多运行是不会加快速度的。</p><h2 id="二、-net程序运行起来一定很慢" tabindex="-1"><a class="header-anchor" href="#二、-net程序运行起来一定很慢" aria-hidden="true">#</a> 二、.net程序运行起来一定很慢</h2><p>由于存在IL被翻译成本地代码的过程，.net程序的确要消耗一部分时间。但是.net程序仍然具有很高的效率，这一点许多Java虚拟机都比不上，这是为什么呢？因为多数.net程序内含的代码很少，几乎都是调用.net Framework中的类库，而这些类库在.net Framework安装的时候全部编译成为本机优化的本地码，并保存在程序集缓存里面。有了这个程序集缓存，你程序事实上的大部分已经是高效的本地代码，所以当然快了。但是，如果你进行大量数值计算类的操作，还是能够感到第一次运算的速度明显下降。所以建议大家将计算密集型的程序分离出来，编译成本地代码并保存在程序集缓存中，以后使用起来就很快了。</p><h2 id="三、c-比vb-net快-功能更强大" tabindex="-1"><a class="header-anchor" href="#三、c-比vb-net快-功能更强大" aria-hidden="true">#</a> 三、C#比VB.net快，功能更强大</h2><p>必须得承认，C#编译器和VB.net编译器在处理某些细节上确实有些不同，导致两者编译功能类似的程序效率通常会有差异。但对于一个编制完整的项目，是不会有任何差别的。原因是首先VB.net编译器并没有比C#有实质上的缺陷，其次大部分代码都是.net Framework类库中的代码，两者调用起来没有差别。至于C#比VB.net功能强大，这牵扯到心理学问题。VB并不比C#差，也没有“语法混乱”、“为了兼容而设计”之类传说中的毛病。用VB.net一样可以写出出色的、结构完美的应用程序。而且VB.net也是Visual Studio.net唯一的宏语言。</p><p>这里面还有一个问题，著名的Linux下的.net——Mono中是否只支持C#？当然不是，用VB.net开发出的程序一样可以在Mono中正确运行。而且最新的Mono将包含Mono Basic语言，这样，掌握VB.net语法的人，就可以完全在Linux等系统下开发。</p><h2 id="四、微软只想推广c-他想放弃vb-net" tabindex="-1"><a class="header-anchor" href="#四、微软只想推广c-他想放弃vb-net" aria-hidden="true">#</a> 四、微软只想推广C#，他想放弃VB.net</h2><p>不要听信杞人忧天的话。微软无时无刻不在推广VB.net上用心。MSDN上关于.net开发的文章，用VB.net做例子的比用C#还要多。微软还专门推出VB技术节目——VBTV，帮助开发者更好地了解VB.net。微软在列出Visaual Studio中的开发工具时，Visual Basic总是排在第一个——这是微软5年来的传统。所以担心VB.net会被淘汰的人，现在该松口气了。</p><h2 id="五、微软用-net对抗java-所以我也要支持-net-反对java" tabindex="-1"><a class="header-anchor" href="#五、微软用-net对抗java-所以我也要支持-net-反对java" aria-hidden="true">#</a> 五、微软用.net对抗Java，所以我也要支持.net，反对Java</h2><p>千万不要有这种想法，MS当然想占领Java的市场，Sun当然不愿意，但这不关你的事。哪一方赢了你都不会有实质上的好处。还是两个都学吧。与其在网上挑起争论，不如多学一个本事，你马上就会看到回报的。</p><p>好了，从下一次开始，将着重介绍技术上的误区。祝大家好运。</p>',15),h=[i];function d(o,c){return n(),a("div",null,h)}const p=e(r,[["render",d],["__file","netfw5.html.vue"]]);export{p as default};
