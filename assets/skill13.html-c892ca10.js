import{_ as e,o as t,c as r,a}from"./app-f0851ed3.js";const n={},p=a(`<h1 id="it高手是这样练成的" tabindex="-1"><a class="header-anchor" href="#it高手是这样练成的" aria-hidden="true">#</a> IT高手是这样练成的</h1><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>文章来源：软件工程专家网
作者：beiyan
发布时间：2003.09.02
</code></pre></div><p>要成为武林高手，需要长时间的勤学苦练。要成为软件开发高手，又需要多长时间呢？《Modern C++ Design》的作者Andrei Alexandrescu认为：一个人有可能在20几岁就成为编程高手，但要成为设计高手却需要熬到35岁左右。以23岁大学毕业计算，要经过漫长的12年时间。</p><p>以我个人为例（我尚不敢自认是设计高手），22岁大学毕业后，在某研究所用8086汇编语言写一些小规模的程序，颇觉得心应手。凡是能用流程图表示的问题，都似乎不在话下。工作中，与同事共同切磋结构化程序设计，并能有意识地用于实践中。</p><p>三年后，承接一个纵向课题：在Windows上开发一个交互式排版系统。用Windows SDK开发。兴奋之余，自然想起用结构化方法进行设计：把整个系统当成一个黑盒子（black box），输出当然是排版。结果，不管是什么格式，输入是???。我卡住了。难道用户操作是输入吗？但用户操作有那么多，怎么表示呢？系统的数据流图该怎么画？数据字典该怎么写？和同事讨论n次后，仍不得其解。懊丧之余，先模仿Quark Express搭个界面吧。然后研究排版算法。程序结构经过至少三次大规模修改，终于能排出一些版式，并在两年后通过了鉴定（鉴定后当然是将其束之高阁）。我从中体会到结构化开发方法不适合开发交互式系统。在开发初期，你不太可能正确地画出数据流图，而结构化设计方法完全依赖数据流图。数据流图发生改变，整个程序结构就要随之改变。</p><p>后来，加入一家合资公司，担任开发组长，有五、六个组员。这时我已读过了邵维忠等译的《面向对象的分析》、杨芙清等编译的《面向对象的设计》和《Code Complete》中译本。对面向对象的程序设计虽有所了解但仍是一知半解。</p><p>首先，我们用MSVC 1.5开发一个图形编辑软件。我用纸画了20几张对象图，与同事讨论通过后，开始编程。有人负责数据模型，有人负责用户界面，有人负责图形显示。几个月后，老板已可向潜在用户进行展示，反应良好。老板和开发人员都被一种兴奋的心情笼罩着。我们不断地加新功能，老板不时地到展览会上做演示。功能加齐了，开始让潜在用户试用。老板和我们都松了一口气：就剩下改错了，咱们是兵来将挡、水来土屯，没什么可怕的。错误报告来了。我们信心满满地开始查错改错。有些错误很快地被改掉了。但最后我们发现错误源源不断。改了一个错误有可能引起别的错误。软件永远达不到能用的地步。最后，时机被错过。该软件不得不被砍掉。懊丧之余，我们做了反省。大家都认为应尽早改错。同时模模糊糊地觉得数据模型和用户界面的程序一定要严格分开，否则程序极难修改。</p><p>回想十几年蹒跚走过的路，好像也略有所悟。试总结出以供参考：</p><p>1）要熟练掌握至少一种编程语言。我觉得最好是C++。掌握了C++，学习其它语言如Java或C#等并非难事，因为各种面向对象的程序语言尽管在语法上可能有很大区别，在语义上却大同小异。</p><p>2）不要寄希望于一次就把软件设计好。在开发初期，要尽量用最简单的设计实现最基本的功能，以使你的软件尽早地能实际运行，不要过于拘泥于细节。这样你才能尽早得到反馈，才能更直观更全面地理解你所面对的问题。你所关注的重点应依次是Make it work, make it right, make it fast。</p><p>3）软件结构要分块分层。低层模块不要依赖于上层模块。一个类、一个接口或一个函数都应只做一件事。没有本质联系的类或接口就不应有耦合关系。举例而言，要用MVC（Model View Controller）Design Pattern切断用户界面与数据模型之间的直接关联。</p><p>4）软件设计的主要工作是给类分配责任（responsibilities）。尽量不要把类设计成控制者（controller），而要设计成协调者（coordinator）。控制者凡事自己做，协调者让别人做。控制者的逻辑往往很复杂，难于维护；协调者逻辑简单，易于维护。要站在类的使用者角度设计类的外部行为。要讲究一点软件美学，即简单、清晰、一致、平衡等。</p><p>5）了解并运用UML、Design Patterns、Unit Test、Design by Contract等。</p><p>6）使用代码管理系统和质量跟踪系统。</p><p>7）了解各种软件开发过程控制方法，并找出适合你的方法。</p><p>8）阅读经典书籍，研读经典代码，订阅杂志，与同行切磋。</p><p>在这行越久越觉得软件开发难。软件开发历史还很短，才50年，还不是一门系统化的学科。有些人甚至认为软件设计与编程是一门艺术。但软件艺术大师还太少，而且我们很难直接欣赏到他们的杰作，除非所有的设计文档和代码都公开。软件更容易藏污纳垢。一个用户界面很漂亮的软件，内部设计和代码却很可能臭不可闻。一个地板倾斜、墙壁裂缝、屋顶漏水的房子没有人会买。一个设计很烂的软件却可能卖得不错。但这样的软件能撑多久呢？</p><p>软件设计与编程已经很难，而这仅仅是软件开发的一个方面，软件开发过程控制也很难，也许更难。成为软件开发高手要走一条漫长的路，何日才能仗剑走天涯？</p><p>后来，我们又开发一个类似Adobe Acrobat Exchange的PDF文件浏览器兼编辑器（当时Acrobat Exchange还不能显示中、日、韩文）。这时，老板带来一些过期的《C/C++ Users’ Journal》《Dr. Dobbs’ Journal》杂志。从书评中，我被几本书吸引住了。一本是James Rumbough等著的《Object-Oriented Modeling andDesign》，一本是现在大名鼎鼎的《Design Patterns》，还有就是Scott Meyers著的《Effective C++》和《More Effective C++》。我劝说老板买了这几本书，并撺掇他买了一个CASE（计算机辅助软件工程）工具：Select OMT。</p><p>仔细研读这几本书后，颇有顿开茅塞之感。最大的收获在于了解到降低类之间耦合度的重要性。一个类的实现细节发生变化，不应该影响使用该类的其它类的内部实现。更妙的是有不少Design Pattern能马上用到我们的软件中。</p><p>我用Select OMT软件画了一些高层的类图、状态图和数据流图等，并让同事们审查。同事们都觉得通过这些图对软件的总体设计有了更好的把握。在写程序的过程中，我们不断调整程序结构以尽可能减小类之间的耦合度。老板很早就安排了专职测试人员。发现问题，马上修改。一年后，我们的软件终于通过了用户的试用，卖出去了。当时，我可说是信心满满。</p><p>此后，我做了一年半多媒体编程。发现还是对系统开发更感兴趣。于是加入了Quark软件公司，开发一个基于CORBA的文件管理系统。这是我第一次参与异地开发，也是第一次大规模使用STL。我惊叹于STL设计之妙，同时也对自己的信心打了折扣。此后，我阅读了Martin Fowler著的《UML Distilled》、Bertrand Meyer著的《Object Oriented Software Construction》等书籍。并开始使用Rational Rose。Quark公司的技术文档管理、设计复查、代码复查、质量管理以及德国人（Quark公司德国分公司）严谨的工作态度都给我留下了深刻印象。</p><p>项目组下分开发组和测试组。开发组中有一个４到５人组成的设计小组负责软件总体设计，其中一个人负责技术文档，确保文档反映最新的设计。定期进行设计复查。复查时，项目组成员全部参加，并可提出问题或建议。得出结论后，马上付诸实施。</p><p>开发组下又设若干小组。小组内定期进行代码复查。由组长选出每个组员的源文件，交其他组员复查，尽量挑出所有的毛病。如果代码太次，要打回从新写过。代码复查既能保证软件质量，又是大家学习的一个机会。</p><p>一年半后，我离开Quark，加盟Sybase，参与Power Builder的维护和新版本的开发。这是我第一次参与软件维护，令我认识到软件维护的重要性，认识到编写可维护的代码是软件开发的一个重要课题。</p><p>Sybase系统化的质量跟踪系统和用户支援系统让我获益匪浅。在此期间，我阅读了《Large-scale Software Development in C++》、Martin Fowler著的《Refactoring》、Andrei Alexandrescu著的《Modern C++ Design》，Herb Sutter著的《Exceptional C++》和《More exceptional C++》，以及Kent Beck著的《Extreme Programming Explained》等书籍。对软件开发与维护有了进一步了解，但同时也更认识到软件开发之难。</p><p>最后，还要唐僧一下：要成为一个武林高手，虽然需要长期的锻练，但其更重要的是其的领悟能力。同样要成为编程高手，最重要的是领悟能力的训练。有志不在年高，无志空活百岁。要有明确的目标，有针对的对象才能有的放矢。计算机知识更新换代很快，这要求我们要放出眼光，知道哪些该学，哪些学了也是浪费时间。</p>`,27),o=[p];function i(s,c){return t(),r("div",null,o)}const d=e(n,[["render",i],["__file","skill13.html.vue"]]);export{d as default};