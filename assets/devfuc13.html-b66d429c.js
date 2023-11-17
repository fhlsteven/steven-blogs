import{_ as n,r,o as t,c as o,b as e,d as p,e as c,a as i}from"./app-a2b6e588.js";const d={},s={id:"观《活用-xp》之心得以及结合上次项目实施的感受",tabindex:"-1"},h=e("a",{class:"header-anchor",href:"#观《活用-xp》之心得以及结合上次项目实施的感受","aria-hidden":"true"},"#",-1),l={href:"https://www.cnblogs.com/etu5/archive/2006/06/29/438986.html",target:"_blank",rel:"noopener noreferrer"},_=i(`<h2 id="一、需求分析和管理" tabindex="-1"><a class="header-anchor" href="#一、需求分析和管理" aria-hidden="true">#</a> 一、需求分析和管理</h2><p>1、XP中采用“用户故事”和“现场客户”来收集需求和分析需求，原文中作者提出了一些质疑和一些改进建议，如客户可能编写不出足够明确清晰、好的“用户故事”，可以使用用例来替代“用户故事”，无论哪种形式，关键是一种足够清楚的简单机制来完成需求的收集和分析。</p><p>2、如何控制和管理需求：需求一开始不必太细节，留到迭代中再精化。</p><p>1). 先把握系统的全貌。需求是不断变化的，一开始定义一个精确的包括全部功能定义的计划，到迭代开发时可能这个需求已经开始变化，或者随着业务领域的不断熟悉，发现以前对这个需求的定义是错误的，就会造成了时间成本的浪费。这个我倒是深有体会，前一个销售管理系统项目，在项目开始时，开发小组花费了两个多星期对整个系统进行详细的分析试图评估出“精确”的开发周期和详细的开发计划。事实上，到了各个迭代中，随着我们对需求的理解和业务的深入，不断的和用户沟通收集需求反馈，很多需求都重新定义了，之前辛辛苦苦制定的开发计划仅仅提供了一个迭代内容划分和周期的参考，其详细需求内容的定义以及功能定义基本上毫无用处，白白浪费了很多时间。虽然说也并不是全无用处，不过这个成本未免也高了点。其实那个时候只需要花时间分析需求的主干部分，并且把握主要风险作为考虑时间成本的参考，将详细的需求分析分布到各个迭代中去，那么项目拖延的时间可以更少。引用原文作为这个小段的结尾：“不要在一开始就精化需求，一开始的工作重点应该是放在尽可能全面的收集用例，了解整体的业务流程，分析主体业务流程等工作上。在获得了系统的全貌之后，你会发现你原先对系统的认识是不充分的，用例需要根据新的思路进行重新排列，用例的优先级需要调整，在UML图中，往往有一张系统的用例概览图，这张图所表示的就是系统行为的一个概述。”</p><p>2). 迭代精化，这个就不多说了，前面已经讲过了。</p><p>3). 用迭代的思路来管理需求。如果迭代中原有需求发生了改变如何处理？一种情况是同一增量过程中（一次小发布）则直接在原有需求上进行补充，另外一种情况是不同增量中，这时候往往会加入新的需求、新的情境，一般来说，有两种方法，一种是对原有的需求进行增补，增补的部分用不同的颜色或标记。另一种方法是为需求建立版本，如为用例建立版本，不同版本的用例对应于不同的增量周期。这样，对应对N个增量周期就有了n个不同版本的用例（n≤N）。</p><p>4). 寻找优先级高的用例进行精化。项目的前几次迭代的主要目的是要识别出项目风险。因此，寻找有代表性、优先级高的用例进行精化，能够帮助开发人员更快的理解领域知识，构建起初步的领域模型。</p><p>5). 形式不是最重要的，采用用例或者用户故事都可以，关键是需求要足够清楚和易于理解。</p><p>3、关于业务知识（领域知识）的管理，我觉得可以用Wiki来进行分类管理。这样的好处在于项目组所有人都可以进行查看以及增加修改这些业务知识，万一不记得相关业务知识了就可以马上进行温习，这个对于没有条件拥有“现场客户”的项目很有用。我们公司的技术经理采用论坛的形式来保证业务知识的积累，用户和开发人员都在论坛上进行需求沟通，这个也不错，不过这种方式有一种缺点，由于论坛的形式的发散型的，所以如果没有一个汇总的机制，很容易造成业务知识的海量堆积，而且各个知识点都分布在一个一个的帖子中没有集中管理，不便于查看。可行的一种方式是一段时间中就将业务知识从各个帖子中汇集起来，集中保存在一个或者几个置顶的帖子中，便于开发人员查看。不过个人感觉这种方式还是没有将业务知识汇总到Wiki中直观。</p><h2 id="二、迭代过程管理" tabindex="-1"><a class="header-anchor" href="#二、迭代过程管理" aria-hidden="true">#</a> 二、迭代过程管理</h2><p>1、简单设计，增量开发。初期不要花太多时间到框架设计上，理想的情况是，你已经拥有了一个可重用的框架（或是架构），这样，可以将项目的需求映射到框架上，而不是在项目一开始的时候花时间来开发框架。如果没有框架，在项目一开始的时候，花费一定的时间来开发架构，但是这个时间不宜过长，这个完全可以在后续的增量中对架构进行改进，所以不用急于一时。</p><p>2、尽可能早的发现所有的问题。这个问题似乎原文作者也没解释清楚如何进行，如何在“尽可能早”的发现“所有的问题”似乎很难有具体方法实践。</p><p>3、结合上次项目实施过程中遇到的问题我的关于迭代概念的疑惑</p><p>1). 老大要求在项目需求分析完成后提供一个内容包括整个发布的迭代划分以及每个迭代的周期的发布计划，这也就是为什么在项目开始的时候花了很多时间来做需求的详细分析和系统详细的功能定义，就是为了得出一份足够准确的发布计划。但结局如上面所说的，实际开发超出了发布计划很多。XP提倡在一开始只是粗略的计划，只要求能够大概的分析出迭代划分和周期，在后面一个一个的迭代中逐渐完善计划，从而得到较为准确的发布周期。这样有必要在一开始花上比较多的精力制定一个后面不能修改调整的发布计划么，这样不是和敏捷思想背道而驰了么？似乎这个发布计划应该是个粗略的计划，应该随着前面几个迭代的进行不断的调整，如根据前几次迭代所花费的时间评估出后面迭代所需要的时间，随着迭代的进行发布计划也越来越准确，用户也就越来越了解项目进展情况和把握总体进度了。</p><p>2). 如果在某个迭代中，由于内部原因或者技术原因导致本应该在此次迭代中完成的功能没有完成怎么办，是延长本次迭代时间还是推迟该功能到下个迭代？XP提倡当到了一个小发布 dead line后就停止所有工作，将可以发布的功能先发布，将未完成的功能延迟到下个迭代。但是事实上，在我们项目中，由于项目组成员还有来自客户公司的职员，出勤率很不稳定，所以他们的工作经常不能按时完成，并且，由于他们没完成导致可发布的内容很少（因为他们都是做用户层的界面，所以即使业务逻辑完成了没有界面也不能发布），我们不得不采取延长迭代时间，由项目组的其他成员来完成未完成的工作。这样做导致了项目进度非常不可控，使得项目经理无法有信心的把握整体进度，项目经理甚至无法正确的评估出这个项目什么时候可以结束，怎样处理这种情况？</p><h2 id="三、测试管理" tabindex="-1"><a class="header-anchor" href="#三、测试管理" aria-hidden="true">#</a> 三、测试管理</h2><p>1、测试应该贯穿项目的整个过程</p><p>1). 需求阶段就开始搭建测试环境，所有的需求是可测试的（比如可测试的用例），准备测试数据；这个不清楚如何具体操作。</p><p>2). 精益编程要求全面质量管理，即生产过程的每一个环节都需要为质量负责，而不是将质量问题留给最后的质检员</p><p>2、测试优先（TDD）</p><p>1). 使得系统结构为可测试的架构，适合于测试的代码，这个可以使得后期维护简单</p><p>2). 坚持测试优先的实践，可以使你从一个外部接口和客户端的角度来考虑问题，这样可以保证系统各个模块之间能够较好的连接在一起</p><p>3). 测试优先的好处在于由于先必须写测试，而测试的难点往往在于难于模拟出环境，因此可以迫使开发人员在测试阶段就考虑将环境因素和业务模型隔离开来，提高业务层的可测试性，设计出与环境低耦合的设计。还可以借助 Mock Object 对一些非主干的领域模型与主干业务逻辑的交互和协作进行测试，降低编写测试用例的成本。原文中提到的“有时候，单元测试或是组件测试是很难进行的。因此，我们需要专门针对类或组件的可测试性进行测试。例如，对于一个实现企业流程的组件，之间涉及到大量的状态、事件、分支选择等等因素。对这样的组件进行组件测试的代价是非常高的。如果能够在组件设计的时候，能够考虑到测试性，例如，将组件拆分为粒度更小的子组件，或是在组件中内嵌供测试使用的方法，能够直接操纵组件的状态。在设计时充分考虑可测试性，是降低测试成本的关键。”蛮有道理的。</p><p>4). 严格按照先改测试代码然后维护设计代码，关键是养成这种测试优先习惯，或者说一种思维方式。</p><p>5). 完善测试网，一开始采用测试驱动的项目，随着项目的进展，后期的测试代码越来越优秀，这时有必要重构以前的测试；如果一开始没有采用测试驱动的项目，在项目的中期也很有必要投入人力将现有的代码加上测试。在这些重构过程中还可能会发现原来代码中一些BUG或者说不合理的设计，这样的好处是明显的。</p><p>6). 现实开发过程的测试数据通常比较复杂，有必要准备单独的数据提供类，当测试用例很多的时候，有必要专门的机制来生成和管理测试数据；甚至花点时间构造一个测试框架也是很有必要的。</p><p>7). 自动化测试，有了自动化测试就可以实现回归测试（版本2出现了版本1不存在的行为称之为回归），持续集成和每日构建必须要加入自动化测试，否则则失去其一大半的意义。</p><p>3、结合上次项目实施过程来谈谈我对测试管理的看法</p><p>1). 没有单元测试，黑盒测试如噩梦一般。项目为C/S三层接口，用户层是用.NET的WinForm开发的，业务逻辑层主要集中在Oracle存储过程，WEB服务只是一层包装，测试的目标锁定在用户层的WinForm和Oracle的存储过程上，由于项目比较紧，又没有找到合适的WinForm和Oracle存储过程的单元测试框架，加之客户公司的项目组成员以往没有这种编程经验，所以没有加入单元测试，更别说自动化测试了，质量是通过项目组成员之间的结对审核和开发人员、测试人员的手工测试来保证的。如上所说的，项目组成员能力和素质的良莠不齐，噩梦开始了。在前几个迭代，项目经理忙于需求分析和主要框架设计，其他成员的能力缺陷体现出来了，已经准备发布的代码，到最后发布测试的时候全部出现了问题，项目经理到最后成了捉虫专家，这个BUG解决了那个BUG又出现了，最后所有人的信心降到谷底，迭代被一次又一次延长。到项目的中后期，为了保证交付的代码的质量以及发布过程的顺利，项目经理在所有人完成集成测试后加班再测试一遍，尽管如此，系统在每个发布后还是存在很多BUG。所以，由此我深深的感到，单元测试非常重要，自动化测试非常重要，完整的测试可以使得质量变得可控，否则仅仅通过黑盒测试一些隐藏的BUG很难发现。单元测试是测试的一个最小单位，最小单位的测试能够做好，全系统的测试就能够做好。</p><p>2). 测试要自动化，持续集成和每日构建中一定要加入自动化测试</p><p>3). 在有能力的情况下项目一开始就要引入测试驱动，任何学习成本的前期投入是值得的，因为这对于后期维护来说的好处是明显的，而且可以更好的对迭代过程中质量进行控制。可测试的设计其实就是松耦合的设计，引入测试驱动可以使得系统架构低耦合，也可以使得开发人员在过程中由单纯实现编码变为理解系统设计、完善设计。</p><p>（未完，待续）</p><div class="language-txt" data-ext="txt"><pre class="language-txt"><code>参考文档：
林星《活用XP 系列》
http://www-128.ibm.com/developerworks/cn/linux/software_engineering/l-xp/index1.html
...
http://www-128.ibm.com/developerworks/cn/linux/software_engineering/l-xp/index8.html
</code></pre></div>`,33);function x(m,f){const a=r("ExternalLinkIcon");return t(),o("div",null,[e("h1",s,[h,p(),e("a",l,[p("观《活用 XP》之心得以及结合上次项目实施的感受"),c(a)])]),_])}const w=n(d,[["render",x],["__file","devfuc13.html.vue"]]);export{w as default};
